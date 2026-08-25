import { 
  UserProfile, 
  AssessmentResult, 
  Recommendation, 
  SavedCareerItem, 
  ChatMessage, 
  AppNotification, 
  NotificationSettings, 
  AISettings, 
  FeedbackSubmission, 
  ThemeMode, 
  SupportedLanguage 
} from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'restart_user_profile',
  ASSESSMENT_ANSWERS: 'restart_assessment_answers',
  ASSESSMENT_INDEX: 'restart_assessment_index',
  ASSESSMENT_RESULT: 'restart_assessment_result',
  RECOMMENDATIONS: 'restart_recommendations',
  SAVED_CAREERS: 'restart_saved_careers',
  CHAT_HISTORY: 'restart_chat_history',
  NOTIFICATIONS: 'restart_notifications',
  NOTIFICATION_SETTINGS: 'restart_notification_settings',
  AI_SETTINGS: 'restart_ai_settings',
  FEEDBACK: 'restart_feedback',
  THEME: 'restart_theme',
  LANGUAGE: 'restart_language',
  AUTH_TOKEN: 'restart_auth_token',
};

export const defaultNotificationSettings: NotificationSettings = {
  assessmentReminders: true,
  careerUpdates: true,
  thirtyDayActionReminders: true,
  scholarshipOpportunities: true,
  aiFollowUps: true,
};

export const defaultAISettings: AISettings = {
  provider: 'gemini',
  model: 'gemini-2.5-flash',
  apiKey: '',
  isConnected: true,
};

export const defaultNotifications: AppNotification[] = [
  {
    id: 'notif_welcome',
    title: 'Welcome to re\\start my career',
    message: 'Find the direction you are drawn to and identify your interest vs confidence signals.',
    type: 'assessment',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 'notif_sch_reminder',
    title: 'Scholarships & Schemes Active',
    message: 'Explore Indian central & state funding support aligned with higher education pathways.',
    type: 'opportunity',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
];

// In-memory + LocalStorage unified sync manager
export class StorageService {
  static getProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      // Optional async sync to server
      fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      }).catch(() => {});
    } catch {}
  }

  static getAnswers(): Record<string, number> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_ANSWERS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  static saveAnswers(answers: Record<string, number>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT_ANSWERS, JSON.stringify(answers));
    } catch {}
  }

  static getAssessmentIndex(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_INDEX);
      return data ? parseInt(data, 10) : 0;
    } catch {
      return 0;
    }
  }

  static saveAssessmentIndex(index: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT_INDEX, index.toString());
    } catch {}
  }

  static getResult(): AssessmentResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_RESULT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static saveResult(result: AssessmentResult): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT_RESULT, JSON.stringify(result));
      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      }).catch(() => {});
    } catch {}
  }

  static getRecommendations(): Recommendation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveRecommendations(recs: Recommendation[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(recs));
    } catch {}
  }

  static getSavedCareers(): SavedCareerItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_CAREERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveSavedCareers(items: SavedCareerItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_CAREERS, JSON.stringify(items));
    } catch {}
  }

  static getChatHistory(): ChatMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveChatHistory(messages: ChatMessage[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
    } catch {}
  }

  static getNotifications(): AppNotification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : defaultNotifications;
    } catch {
      return defaultNotifications;
    }
  }

  static saveNotifications(notifs: AppNotification[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    } catch {}
  }

  static getNotificationSettings(): NotificationSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
      return data ? JSON.parse(data) : defaultNotificationSettings;
    } catch {
      return defaultNotificationSettings;
    }
  }

  static saveNotificationSettings(settings: NotificationSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
    } catch {}
  }

  static getAISettings(): AISettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AI_SETTINGS);
      return data ? JSON.parse(data) : defaultAISettings;
    } catch {
      return defaultAISettings;
    }
  }

  static saveAISettings(settings: AISettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AI_SETTINGS, JSON.stringify(settings));
    } catch {}
  }

  static getTheme(): ThemeMode {
    try {
      return (localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode) || 'dark';
    } catch {
      return 'dark';
    }
  }

  static saveTheme(theme: ThemeMode): void {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch {}
  }

  static getLanguage(): SupportedLanguage {
    try {
      return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as SupportedLanguage) || 'en';
    } catch {
      return 'en';
    }
  }

  static saveLanguage(lang: SupportedLanguage): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch {}
  }

  static saveFeedback(feedback: FeedbackSubmission): void {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
      list.push(feedback);
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(list));
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      }).catch(() => {});
    } catch {}
  }

  static clearAll(): void {
    try {
      localStorage.clear();
      document.documentElement.classList.add('dark');
    } catch {}
  }
}
