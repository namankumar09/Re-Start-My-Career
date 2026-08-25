import { AuthUser, Segment, UserProfile } from '../types';
import { StorageService } from './storage';

const AUTH_STORAGE_KEYS = {
  CURRENT_USER: 'restart_auth_user',
  REGISTERED_USERS: 'restart_registered_users',
  ACTIVE_OTPS: 'restart_active_otps',
};

interface RegisteredAccount {
  user: AuthUser;
  passwordHash?: string;
  segment?: Segment;
}

export class AuthService {
  private static listeners: Array<(user: AuthUser | null) => void> = [];

  static subscribe(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private static notify(user: AuthUser | null) {
    this.listeners.forEach((cb) => cb(user));
  }

  static getCurrentUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private static saveCurrentUser(user: AuthUser | null): void {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER);
      }
      this.notify(user);
    } catch {}
  }

  private static getRegisteredAccounts(): Record<string, RegisteredAccount> {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_USERS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private static saveRegisteredAccounts(accounts: Record<string, RegisteredAccount>): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(accounts));
    } catch {}
  }

  /**
   * Real Google Authentication Flow
   */
  static async signInWithGoogle(): Promise<AuthUser> {
    try {
      const response = await fetch(`/api/auth/google/url?origin=${encodeURIComponent(window.location.origin)}`);
      if (!response.ok) {
        throw new Error('Failed to get auth URL. Check API configuration.');
      }
      const { url } = await response.json();

      return new Promise((resolve, reject) => {
        const authWindow = window.open(url, 'oauth_popup', 'width=600,height=700');
        if (!authWindow) {
          reject(new Error('Please allow popups to connect your Google account.'));
          return;
        }

        const handleMessage = (event: MessageEvent) => {
          if (!event.origin.endsWith('.run.app') && !event.origin.includes('localhost')) {
            return;
          }

          if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
            window.removeEventListener('message', handleMessage);
            const { email, name, picture } = event.data.payload;
            
            const uid = 'google_' + btoa(email).replace(/=/g, '').slice(0, 16);
            
            const user: AuthUser = {
              uid,
              email,
              displayName: name,
              provider: 'google',
              photoURL: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=18181b&textColor=ffffff`,
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString(),
            };

            const accounts = this.getRegisteredAccounts();
            accounts[user.uid] = { user };
            this.saveRegisteredAccounts(accounts);
            this.saveCurrentUser(user);
            this.syncProfileWithAuth(user);
            resolve(user);
          }
        };

        window.addEventListener('message', handleMessage);

        const checkClosed = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(checkClosed);
            window.removeEventListener('message', handleMessage);
            reject(new Error('Sign-in cancelled'));
          }
        }, 500);
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Phone Authentication: Step 1 - Send 6-digit OTP
   */
  static async sendPhoneOtp(rawPhone: string): Promise<{ success: boolean; testCode: string; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleaned = rawPhone.replace(/[^\d+]/g, '');
    if (cleaned.length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }

    // Standardized verification code (123456 or generated for verification)
    const code = '123456';
    const otps = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEYS.ACTIVE_OTPS) || '{}');
    otps[cleaned] = {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min expiry
    };
    localStorage.setItem(AUTH_STORAGE_KEYS.ACTIVE_OTPS, JSON.stringify(otps));

    return {
      success: true,
      testCode: code,
      message: `OTP sent to ${cleaned}. Enter verification code.`,
    };
  }

  /**
   * Phone Authentication: Step 2 - Verify OTP & Authenticate
   */
  static async verifyPhoneOtp(rawPhone: string, otp: string, displayName?: string): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleaned = rawPhone.replace(/[^\d+]/g, '');
    const otps = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEYS.ACTIVE_OTPS) || '{}');
    const stored = otps[cleaned];

    // Accept test code 123456 or valid stored OTP
    if (otp.trim() !== '123456' && (!stored || stored.code !== otp.trim() || stored.expiresAt < Date.now())) {
      throw new Error('Invalid or expired verification code. Please try code 123456.');
    }

    const uid = 'phone_' + cleaned.replace('+', '');
    const accounts = this.getRegisteredAccounts();
    const existing = accounts[uid]?.user;

    const user: AuthUser = {
      uid,
      phoneNumber: cleaned.startsWith('+') ? cleaned : `+91 ${cleaned}`,
      displayName: displayName || existing?.displayName || `User ${cleaned.slice(-4)}`,
      provider: 'phone',
      createdAt: existing?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    accounts[uid] = { user };
    this.saveRegisteredAccounts(accounts);
    this.saveCurrentUser(user);
    this.syncProfileWithAuth(user);
    return user;
  }

  /**
   * Email & Password: Sign In
   */
  static async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalized = email.trim().toLowerCase();
    if (!normalized || !password) {
      throw new Error('Please provide both email and password.');
    }

    const accounts = this.getRegisteredAccounts();
    const found = Object.values(accounts).find((acc) => acc.user.email?.toLowerCase() === normalized);

    if (!found) {
      // Auto-provision if initial sign in or demo
      const user: AuthUser = {
        uid: 'email_' + btoa(normalized).replace(/=/g, '').slice(0, 16),
        email: normalized,
        displayName: normalized.split('@')[0].replace(/[0-9.]/g, ' ').trim() || 'Candidate',
        provider: 'password',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      accounts[user.uid] = { user, passwordHash: password };
      this.saveRegisteredAccounts(accounts);
      this.saveCurrentUser(user);
      this.syncProfileWithAuth(user);
      return user;
    }

    if (found.passwordHash && found.passwordHash !== password) {
      throw new Error('Incorrect password. Please verify or reset your credentials.');
    }

    found.user.lastLoginAt = new Date().toISOString();
    accounts[found.user.uid] = found;
    this.saveRegisteredAccounts(accounts);
    this.saveCurrentUser(found.user);
    this.syncProfileWithAuth(found.user);
    return found.user;
  }

  /**
   * Email & Password: Sign Up
   */
  static async signUpWithEmail(name: string, email: string, password: string, segment?: Segment): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalized = email.trim().toLowerCase();
    if (!name.trim()) throw new Error('Please provide your full name.');
    if (!normalized.includes('@')) throw new Error('Please provide a valid email address.');
    if (password.length < 6) throw new Error('Password must be at least 6 characters.');

    const accounts = this.getRegisteredAccounts();
    const existing = Object.values(accounts).find((acc) => acc.user.email?.toLowerCase() === normalized);

    if (existing) {
      throw new Error('An account with this email already exists. Please Sign In.');
    }

    const uid = 'email_' + btoa(normalized).replace(/=/g, '').slice(0, 16);
    const user: AuthUser = {
      uid,
      email: normalized,
      displayName: name.trim(),
      provider: 'password',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    accounts[uid] = { user, passwordHash: password, segment };
    this.saveRegisteredAccounts(accounts);
    this.saveCurrentUser(user);
    this.syncProfileWithAuth(user, segment);
    return user;
  }

  /**
   * Password Reset Flow
   */
  static async resetPassword(email: string, newPassword?: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const normalized = email.trim().toLowerCase();
    const accounts = this.getRegisteredAccounts();
    const found = Object.values(accounts).find((acc) => acc.user.email?.toLowerCase() === normalized);

    if (found && newPassword) {
      found.passwordHash = newPassword;
      accounts[found.user.uid] = found;
      this.saveRegisteredAccounts(accounts);
      return { success: true, message: 'Password has been updated. You can now Sign In.' };
    }

    return {
      success: true,
      message: `Password reset instructions and verification code sent to ${normalized}.`,
    };
  }

  /**
   * Sign Out
   */
  static setSessionUser(user: AuthUser): void {
    this.saveCurrentUser(user);
  }

  static saveUser(user: AuthUser): void {
    this.saveCurrentUser(user);
  }

  static signOut(): void {
    this.saveCurrentUser(null);
  }

  static logout(): void {
    this.signOut();
  }

  /**
   * Delete Account (Danger Zone)
   */
  static deleteAccount(uid: string): void {
    const accounts = this.getRegisteredAccounts();
    delete accounts[uid];
    this.saveRegisteredAccounts(accounts);
    this.saveCurrentUser(null);
    StorageService.clearAll();
  }

  /**
   * Synchronize Auth user with active candidate UserProfile
   */
  static syncProfileWithAuth(user: AuthUser, initialSegment?: Segment): UserProfile {
    const existingProfile = StorageService.getProfile();
    if (existingProfile) {
      const updated: UserProfile = {
        ...existingProfile,
        name: user.displayName || existingProfile.name,
        email: user.email || existingProfile.email,
        phone: user.phoneNumber || existingProfile.phone,
        updatedAt: new Date().toISOString(),
      };
      StorageService.saveProfile(updated);
      return updated;
    } else {
      const newProfile: UserProfile = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        age: 22,
        gender: 'Prefer not to say',
        city: 'India',
        currentEducation: initialSegment === 'class_10' ? 'Class 10' : initialSegment === 'class_12' ? 'Class 12' : 'Graduate',
        segment: initialSegment || 'career_switch',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      StorageService.saveProfile(newProfile);
      return newProfile;
    }
  }
}
