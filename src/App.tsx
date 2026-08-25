import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  AssessmentResult, 
  Recommendation, 
  SavedCareerItem, 
  ChatMessage, 
  AppNotification, 
  NotificationSettings, 
  AISettings, 
  ThemeMode, 
  SupportedLanguage, 
  Segment,
  AuthUser 
} from './types';
import { StorageService } from './services/storage';
import { AuthService } from './services/auth';
import { generateRecommendations } from './services/assessmentEngine';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { AssessmentView } from './components/assessment/AssessmentView';
import { ReportView } from './components/report/ReportView';
import { DashboardView } from './components/dashboard/DashboardView';
import { SavedCareersView } from './components/saved/SavedCareersView';
import { AICounsellorView } from './components/chat/AICounsellorView';
import { OpportunitiesView } from './components/opportunities/OpportunitiesView';
import { HelpFAQView } from './components/help/HelpFAQView';
import { FeedbackView } from './components/feedback/FeedbackView';
import { SettingsView } from './components/settings/SettingsView';
import { AuthView } from './components/auth/AuthView';
import { DemoAccount } from './data/demoProfiles';

export default function App() {
  // Authentication State
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => AuthService.getCurrentUser());

  // Global App State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile | null>(() => StorageService.getProfile());
  const [answers, setAnswers] = useState<Record<string, number>>(() => StorageService.getAnswers());
  const [assessmentIndex, setAssessmentIndex] = useState<number>(() => StorageService.getAssessmentIndex());
  const [result, setResult] = useState<AssessmentResult | null>(() => StorageService.getResult());
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    const savedRecs = StorageService.getRecommendations();
    if (savedRecs.length > 0) return savedRecs;
    const existingRes = StorageService.getResult();
    const existingProf = StorageService.getProfile();
    if (existingRes && existingProf) {
      return generateRecommendations(existingRes, existingProf);
    }
    return [];
  });
  const [savedCareers, setSavedCareers] = useState<SavedCareerItem[]>(() => StorageService.getSavedCareers());
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => StorageService.getChatHistory());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => StorageService.getNotifications());
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => StorageService.getNotificationSettings());
  const [aiSettings, setAiSettings] = useState<AISettings>(() => StorageService.getAISettings());
  const [theme, setTheme] = useState<ThemeMode>(() => StorageService.getTheme());
  const [language, setLanguage] = useState<SupportedLanguage>(() => StorageService.getLanguage());

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (StorageService.getResult()) return 'dashboard';
    return 'landing';
  });

  const [onboardingInitialSegment, setOnboardingInitialSegment] = useState<Segment | undefined>(undefined);
  const [counsellorInitialQuery, setCounsellorInitialQuery] = useState<string | undefined>(undefined);

  // Subscribe to AuthService changes
  useEffect(() => {
    const unsubscribe = AuthService.subscribe((user) => {
      setAuthUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Sync theme
  useEffect(() => {
    StorageService.saveTheme(theme);
  }, [theme]);

  // Handle Starting Assessment from Landing
  const handleStartAssessment = (targetSegment?: Segment) => {
    setOnboardingInitialSegment(targetSegment);
    if (!profile || targetSegment) {
      setActiveTab('onboarding');
    } else {
      setActiveTab('assessment');
    }
  };

  // Complete Onboarding & Begin Assessment
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    StorageService.saveProfile(newProfile);
    // Reset answers if new profile created
    setAnswers({});
    setAssessmentIndex(0);
    StorageService.saveAnswers({});
    StorageService.saveAssessmentIndex(0);
    setActiveTab('assessment');
  };

  // Save Progress during Assessment
  const handleSaveAnswer = (questionId: string, value: number, nextIndex: number) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    setAssessmentIndex(nextIndex);
    StorageService.saveAnswers(updated);
    StorageService.saveAssessmentIndex(nextIndex);
  };

  // Complete Assessment
  const handleAssessmentComplete = (newResult: AssessmentResult, finalAnswers: Record<string, number>) => {
    setResult(newResult);
    StorageService.saveResult(newResult);
    StorageService.saveAnswers(finalAnswers);

    if (profile) {
      const recs = generateRecommendations(newResult, profile);
      setRecommendations(recs);
      StorageService.saveRecommendations(recs);
    }

    // Add completion notification
    const completionNotif: AppNotification = {
      id: 'notif_complete_' + Date.now(),
      title: 'Assessment Complete: Holland Code ' + newResult.hollandCode,
      message: 'Your report and Interest vs. Confidence signals are now generated.',
      type: 'assessment',
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updatedNotifs = [completionNotif, ...notifications];
    setNotifications(updatedNotifs);
    StorageService.saveNotifications(updatedNotifs);

    setActiveTab('report');
  };

  // Load a 1-Click Evaluation Demo Persona
  const handleSelectDemoProfile = (demo: DemoAccount) => {
    setProfile(demo.profile);
    StorageService.saveProfile(demo.profile);

    setAnswers(demo.answers);
    StorageService.saveAnswers(demo.answers);

    setResult(demo.result);
    StorageService.saveResult(demo.result);

    const recs = generateRecommendations(demo.result, demo.profile);
    setRecommendations(recs);
    StorageService.saveRecommendations(recs);

    // Seed top recommendation as saved career
    if (recs[0]) {
      const demoSaved: SavedCareerItem[] = [
        {
          id: 'sc_demo_' + recs[0].career.id,
          careerId: recs[0].career.id,
          recommendation: recs[0],
          savedAt: new Date().toISOString(),
        }
      ];
      setSavedCareers(demoSaved);
      StorageService.saveSavedCareers(demoSaved);
    }

    setActiveTab('dashboard');
  };

  // Handle Authentication Success
  const handleAuthSuccess = (user: AuthUser) => {
    setAuthUser(user);
    const existing = StorageService.getProfile();
    const synced = AuthService.syncProfileWithAuth(user, existing?.segment);
    setProfile(synced);

    if (result) {
      setActiveTab('dashboard');
    } else {
      setActiveTab('landing');
    }
  };

  // Save / Bookmark Career Toggle
  const handleToggleSaveCareer = (rec: Recommendation) => {
    const exists = savedCareers.some((sc) => sc.careerId === rec.career.id);
    let updated: SavedCareerItem[];
    if (exists) {
      updated = savedCareers.filter((sc) => sc.careerId !== rec.career.id);
    } else {
      const newItem: SavedCareerItem = {
        id: 'sc_' + Date.now(),
        careerId: rec.career.id,
        recommendation: rec,
        savedAt: new Date().toISOString(),
      };
      updated = [newItem, ...savedCareers];
    }
    setSavedCareers(updated);
    StorageService.saveSavedCareers(updated);
  };

  const handleRemoveSavedCareer = (careerId: string) => {
    const updated = savedCareers.filter((sc) => sc.careerId !== careerId);
    setSavedCareers(updated);
    StorageService.saveSavedCareers(updated);
  };

  // Open AI Counsellor with Pre-filled Query
  const handleOpenAICounsellor = (careerTitle?: string) => {
    if (careerTitle) {
      setCounsellorInitialQuery(`What are the specific trade-offs and daily routine realities of pursuing ${careerTitle}?`);
    } else {
      setCounsellorInitialQuery(undefined);
    }
    setActiveTab('counsellor');
  };

  // Retake Assessment
  const handleRetakeAssessment = () => {
    setAnswers({});
    setAssessmentIndex(0);
    StorageService.saveAnswers({});
    StorageService.saveAssessmentIndex(0);
    setActiveTab('assessment');
  };

  // Notifications Management
  const handleMarkNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    StorageService.saveNotifications(updated);
  };

  const handleMarkAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    StorageService.saveNotifications(updated);
  };

  // Language & Theme Changes
  const handleChangeLanguage = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    StorageService.saveLanguage(newLang);
  };

  const handleChangeTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    StorageService.saveTheme(newTheme);
  };

  // Data Export & Delete
  const handleExportData = () => {
    const fullData = {
      authUser,
      profile,
      answers,
      result,
      recommendations,
      savedCareers,
      chatHistory,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `restart_career_record_${profile?.name?.toLowerCase().replace(/\s+/g, '_') || 'candidate'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Real Account Sign Out
  const handleSignOut = () => {
    AuthService.logout();
    setAuthUser(null);
    setActiveTab('landing');
  };

  // Danger Zone - Purge all data
  const handleDeleteAllData = () => {
    AuthService.logout();
    StorageService.clearAll();
    setAuthUser(null);
    setProfile(null);
    setAnswers({});
    setAssessmentIndex(0);
    setResult(null);
    setRecommendations([]);
    setSavedCareers([]);
    setChatHistory([]);
    setNotifications([]);
    setActiveTab('landing');
  };

  // If Auth Screen is open, render isolated Apple-inspired Auth View
  if (activeTab === 'auth') {
    return (
      <AuthView
        onAuthSuccess={handleAuthSuccess}
        onCancel={() => setActiveTab(result ? 'dashboard' : 'landing')}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans antialiased selection:bg-zinc-800 selection:text-white">
      
      {/* Top Apple-styled Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
        authUser={authUser}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        language={language}
        onChangeLanguage={handleChangeLanguage}
        theme={theme}
        onChangeTheme={handleChangeTheme}
        onSelectDemoProfile={handleSelectDemoProfile}
        onOpenAuth={() => setActiveTab('auth')}
        onLogout={handleSignOut}
        hasAssessmentResult={!!result}
      />

      {/* Main Content Area Based on Active Tab */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'landing' && (
          <LandingPage
            onStartAssessment={handleStartAssessment}
            onSelectDemoProfile={handleSelectDemoProfile}
            onExploreHowItWorks={() => {
              const el = document.getElementById('how-it-works');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActiveTab('help');
              }
            }}
            language={language}
          />
        )}

        {activeTab === 'onboarding' && (
          <OnboardingFlow
            initialSegment={onboardingInitialSegment}
            onComplete={handleOnboardingComplete}
            onCancel={() => setActiveTab(result ? 'dashboard' : 'landing')}
            language={language}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentView
            segment={profile?.segment || onboardingInitialSegment || 'career_switch'}
            userId={profile?.id || 'usr_guest'}
            initialAnswers={answers}
            initialIndex={assessmentIndex}
            onSaveAnswer={handleSaveAnswer}
            onComplete={handleAssessmentComplete}
            onCancel={() => setActiveTab(result ? 'dashboard' : 'landing')}
            language={language}
          />
        )}

        {activeTab === 'report' && result && profile && (
          <ReportView
            result={result}
            profile={profile}
            recommendations={recommendations}
            savedCareerIds={savedCareers.map((sc) => sc.careerId)}
            onToggleSaveCareer={handleToggleSaveCareer}
            onOpenAICounsellor={() => handleOpenAICounsellor()}
            onRetakeAssessment={handleRetakeAssessment}
            language={language}
          />
        )}

        {activeTab === 'dashboard' && result && profile && (
          <DashboardView
            profile={profile}
            result={result}
            recommendations={recommendations}
            savedCareers={savedCareers}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetakeAssessment={handleRetakeAssessment}
            language={language}
          />
        )}

        {activeTab === 'saved_careers' && (
          <SavedCareersView
            savedCareers={savedCareers}
            onRemoveCareer={handleRemoveSavedCareer}
            onNavigateToReport={() => setActiveTab('report')}
            onOpenAICounsellor={handleOpenAICounsellor}
            language={language}
          />
        )}

        {activeTab === 'counsellor' && result && profile && (
          <AICounsellorView
            profile={profile}
            result={result}
            recommendations={recommendations}
            savedCareerTitles={savedCareers.map((sc) => sc.recommendation.career.title)}
            chatHistory={chatHistory}
            onSaveChatHistory={(msgs) => {
              setChatHistory(msgs);
              StorageService.saveChatHistory(msgs);
            }}
            language={language}
            initialQuery={counsellorInitialQuery}
          />
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesView
            userCategory={profile?.reservationCategory}
            userIncome={profile?.annualFamilyIncome}
            language={language}
          />
        )}

        {activeTab === 'help' && (
          <HelpFAQView language={language} />
        )}

        {activeTab === 'feedback' && (
          <FeedbackView
            onSubmitFeedback={(fb) => {
              StorageService.saveFeedback(fb);
            }}
            onBack={() => setActiveTab(result ? 'dashboard' : 'landing')}
            language={language}
            userEmail={profile?.email || authUser?.email}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            authUser={authUser}
            notificationSettings={notificationSettings}
            onUpdateNotificationSettings={(s) => {
              setNotificationSettings(s);
              StorageService.saveNotificationSettings(s);
            }}
            aiSettings={aiSettings}
            onUpdateAISettings={(s) => {
              setAiSettings(s);
              StorageService.saveAISettings(s);
            }}
            theme={theme}
            onChangeTheme={handleChangeTheme}
            language={language}
            onChangeLanguage={handleChangeLanguage}
            onExportData={handleExportData}
            onDeleteAllData={handleDeleteAllData}
            onSignOut={handleSignOut}
          />
        )}

        {activeTab === 'privacy' && (
          <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Privacy Architecture
            </h1>
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4 text-xs text-zinc-400 leading-relaxed">
              <p>
                Re\Start My Career operates under strict data sovereignty principles. Your psychometric responses, Interest vs Confidence signals, and life stage details are stored securely to generate your personalized career intelligence report.
              </p>
              <p>
                Optional demographic indicators are strictly utilized to compute eligibility for Indian central, state, and corporate educational scholarships. They are never shared or sold to external third-party coaching institutes.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Terms of Service
            </h1>
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4 text-xs text-zinc-400 leading-relaxed">
              <p>
                Re\Start My Career is a career intelligence and pathway modeling platform based on the Holland RIASEC psychometric framework and Indian higher education entrance datasets.
              </p>
              <p>
                The outputs generated are intended for directional educational guidance and exploration. They do not constitute psychological, psychiatric, or diagnostic evaluation.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
      />

    </div>
  );
}
