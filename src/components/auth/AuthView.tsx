import React, { useState } from 'react';
import { 
  AuthMode, 
  AuthUser, 
  Segment 
} from '../../types';
import { AuthService } from '../../services/auth';
import { ArrowLeft, Check, AlertCircle, Loader2, Smartphone, Mail } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface AuthViewProps {
  initialMode?: AuthMode;
  onSuccess: (user: AuthUser) => void;
  onCancel?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'signup',
  onSuccess,
  onCancel,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [method, setMethod] = useState<'google' | 'phone' | 'email'>('email');
  
  // Phone OTP states
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneOtpMessage, setPhoneOtpMessage] = useState('');
  
  // Email / Password states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [segment, setSegment] = useState<Segment>('career_switch');
  
  // Forgot Password
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  // Status & loading
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => {
    setErrorMessage('');
    setResetSuccessMessage('');
  };

  // 1. Google Authentication
  const handleGoogleSignIn = async () => {
    clearError();
    setIsLoading(true);
    try {
      const user = await AuthService.signInWithGoogle();
      onSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Google authentication encountered an issue.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Phone OTP: Step 1 (Send)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      const res = await AuthService.sendPhoneOtp(phone);
      setOtpSent(true);
      setPhoneOtpMessage(`Verification code sent. For immediate testing, enter ${res.testCode}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Phone OTP: Step 2 (Verify)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      const user = await AuthService.verifyPhoneOtp(phone, otp, fullName);
      onSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid OTP verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Email & Password: Sign In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      const user = await AuthService.signInWithEmail(email, password);
      onSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Sign in failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Email & Password: Sign Up
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      const user = await AuthService.signUpWithEmail(fullName, email, password, segment);
      onSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Sign up failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Password Reset Request
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      const res = await AuthService.resetPassword(resetEmail);
      setResetSuccessMessage(res.message);
    } catch (err: any) {
      setErrorMessage(err.message || 'Password reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Clean Apple-style Header */}
      <header className="w-full pt-8 pb-6 px-6 sm:px-12 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-2.5">
          <BrandLogo className="h-6 sm:h-7 w-auto text-zinc-950 dark:text-white" />
          <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
            Re\Start My Career
          </span>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        )}
      </header>

      {/* Focused Authentication Container */}
      <main className="w-full max-w-[420px] mx-auto px-6 py-12 flex-1 flex flex-col justify-center animate-in fade-in duration-200">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {mode === 'signup' 
              ? 'Create your account' 
              : mode === 'forgot_password'
              ? 'Reset password'
              : 'Welcome back'}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
            {mode === 'signup'
              ? 'Sign up to begin your psychometric assessment and get personalized career signals.'
              : mode === 'forgot_password'
              ? 'Enter your email to receive password recovery instructions.'
              : 'Sign in to access your assessment report, saved careers, and recommendations.'}
          </p>
        </div>

        {/* Error / Status Notices */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5 leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500 dark:text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {resetSuccessMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 dark:bg-zinc-900 border border-emerald-200 dark:border-zinc-800 text-emerald-800 dark:text-zinc-200 text-xs flex items-start gap-2.5 leading-relaxed">
            <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
            <span>{resetSuccessMessage}</span>
          </div>
        )}

        {mode !== 'forgot_password' ? (
          <div className="space-y-6">
            
            {/* 1. Continue with Google */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-white transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.7 0 3 .6 4 1.5l3-3C17.2 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.4-.4-2.2 0-.8.2-1.5.4-2.2L1.6 7.4C.6 9.4 0 10.6 0 12.5s.6 3.1 1.6 5.1l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16.9C3.5 20.7 7.4 24 12 24z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Subtle Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-zinc-200 dark:border-zinc-900 w-full" />
              <span className="bg-white dark:bg-black px-3 text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
                or
              </span>
              <div className="border-t border-zinc-200 dark:border-zinc-900 w-full" />
            </div>

            {/* Method Switcher (Email vs Mobile) */}
            <div className="flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900">
              <button
                type="button"
                onClick={() => {
                  setMethod('email');
                  clearError();
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'email'
                    ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email & password</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod('phone');
                  clearError();
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'phone'
                    ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile number</span>
              </button>
            </div>

            {/* A. EMAIL & PASSWORD FLOW */}
            {method === 'email' && (
              <div>
                {mode === 'signin' ? (
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setMode('forgot_password');
                            clearError();
                          }}
                          className="text-xs text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !email || !password}
                      className="w-full h-11 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40 shadow-sm cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-current" />
                      ) : (
                        <span>Sign In</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        Target Stage / Segment
                      </label>
                      <select
                        value={segment}
                        onChange={(e) => setSegment(e.target.value as Segment)}
                        className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white focus:outline-none"
                      >
                        <option value="career_switch">Career Switch (Working Professional)</option>
                        <option value="class_12">Class 12 (Degrees & College Entrance)</option>
                        <option value="class_10">Class 10 (Stream & Board Selection)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        Create Password (min 6 characters)
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !fullName || !email || password.length < 6}
                      className="w-full h-11 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40 shadow-sm cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-current" />
                      ) : (
                        <span>Create Account & Continue</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* B. MOBILE NUMBER + OTP FLOW */}
            {method === 'phone' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        Mobile Number
                      </label>
                      <div className="flex rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-500 transition-colors overflow-hidden">
                        <div className="px-3.5 py-3 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 flex items-center bg-zinc-100 dark:bg-zinc-950/40">
                          +91
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter 10-digit mobile number"
                          className="w-full px-3.5 py-3 bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !phone}
                      className="w-full h-11 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40 shadow-sm cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-current" />
                      ) : (
                        <span>Continue</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-zinc-600 dark:text-zinc-400">+91 {phone}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtp('');
                            clearError();
                          }}
                          className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white underline text-[11px] cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{phoneOtpMessage}</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                        6-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 text-center font-mono text-lg tracking-widest text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otp.length < 6}
                      className="w-full h-11 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40 shadow-sm cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-current" />
                      ) : (
                        <span>Verify & Sign In</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Bottom Toggle between Sign In / Sign Up (Requirement 6) */}
            <div className="pt-4 text-center border-t border-zinc-100 dark:border-zinc-900">
              {mode === 'signup' ? (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      clearError();
                    }}
                    className="text-black dark:text-white hover:underline font-semibold ml-1 cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      clearError();
                    }}
                    className="text-black dark:text-white hover:underline font-semibold ml-1 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>

          </div>
        ) : (
          /* Forgot Password View */
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-500 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !resetEmail}
              className="w-full h-11 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40 shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-current" />
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  clearError();
                }}
                className="text-xs text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

      </main>

      {/* Footer Note */}
      <footer className="w-full py-6 text-center text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900">
        Re\Start My Career · Secure Candidate Authentication & Data Sovereignty
      </footer>

    </div>
  );
};
