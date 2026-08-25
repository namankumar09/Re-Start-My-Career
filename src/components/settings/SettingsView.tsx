import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Check, 
  AlertTriangle,
  User
} from 'lucide-react';
import { 
  UserProfile, 
  NotificationSettings, 
  AISettings, 
  ThemeMode, 
  SupportedLanguage 
} from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

interface SettingsViewProps {
  profile: UserProfile | null;
  notificationSettings: NotificationSettings;
  onUpdateNotificationSettings: (settings: NotificationSettings) => void;
  aiSettings: AISettings;
  onUpdateAISettings: (settings: AISettings) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  onExportData: () => void;
  onDeleteAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  notificationSettings,
  onUpdateNotificationSettings,
  aiSettings,
  onUpdateAISettings,
  theme,
  onChangeTheme,
  language,
  onChangeLanguage,
  onExportData,
  onDeleteAllData,
}) => {
  const t = TRANSLATIONS[language];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const toggleNotif = (key: keyof NotificationSettings) => {
    onUpdateNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-24 selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <SettingsIcon className="w-4 h-4" />
            <span>Preferences & Data Governance</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {t.settings_title}
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Profile Snapshot */}
        {profile && (
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 font-mono font-bold flex items-center justify-center">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-zinc-100">
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  {profile.city} · {profile.segment.replace('_', ' ').toUpperCase()} · {profile.currentEducation}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">
              Active Candidate Record
            </span>
          </div>
        )}

        {/* 1. Appearance & Theme */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="font-heading text-base font-bold text-zinc-100 flex items-center gap-2">
            <Sun className="w-4 h-4 text-blue-400" />
            <span>{t.appearance_label}</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'dark', label: 'Dark Mode', icon: Moon },
              { id: 'light', label: 'Light Mode', icon: Sun },
              { id: 'system', label: 'System Match', icon: Globe },
            ].map((th) => {
              const Icon = th.icon;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => onChangeTheme(th.id as ThemeMode)}
                  className={`p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                    theme === th.id
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{th.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Language */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="font-heading text-base font-bold text-zinc-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>{t.language_label}</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'en', label: 'English (Default)' },
              { id: 'hi', label: 'हिन्दी (Hindi)' },
            ].map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onChangeLanguage(l.id as SupportedLanguage)}
                className={`p-3.5 rounded-xl border text-xs font-medium transition-all text-center ${
                  language === l.id
                    ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="font-heading text-base font-bold text-zinc-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-400" />
            <span>{t.notifications_label}</span>
          </h3>

          <div className="space-y-3 divide-y divide-zinc-800/60 text-xs">
            {[
              { key: 'assessmentReminders', label: 'Assessment & Gap Analysis Reminders', desc: 'Alerts if you leave an evaluation in progress.' },
              { key: 'careerUpdates', label: 'Career Pathway Updates', desc: 'Notifies when Indian entrance criteria or deadlines change.' },
              { key: 'thirtyDayActionReminders', label: '30-Day Action Plan Prompts', desc: 'Weekly milestone checkpoints for low-risk testing.' },
              { key: 'scholarshipOpportunities', label: 'Scholarship & Fee Waiver Alerts', desc: 'Matches for central & state financial assistance.' },
              { key: 'aiFollowUps', label: 'AI Counsellor Follow-ups', desc: 'Suggested prompts grounded in your saved careers.' },
            ].map((item) => (
              <div key={item.key} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-zinc-200">{item.label}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotif(item.key as keyof NotificationSettings)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    notificationSettings[item.key as keyof NotificationSettings]
                      ? 'bg-blue-600'
                      : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notificationSettings[item.key as keyof NotificationSettings]
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. AI Service Configuration */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{t.ai_config_label}</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono">
              Hybrid Server Engine Active
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            The AI Counsellor operates with server-side proxies, grounded in your exact mathematical RIASEC scores and deterministic Indian education databases.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-400 text-[10px]">Model Target</span>
              <p className="text-zinc-200 font-semibold mt-0.5">{aiSettings.model}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-400 text-[10px]">Deterministic Rule Fallback</span>
              <p className="text-emerald-400 font-semibold mt-0.5">High-Precision Rule Writer Ready</p>
            </div>
          </div>
        </div>

        {/* 5. Data Export & Privacy Management */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="font-heading text-base font-bold text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.privacy_label}</span>
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed">
            We believe you own your psychometric signal. Your data is never sold to private coaching centers or third-party lead generators.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onExportData}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Full Candidate Record (JSON)</span>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.btn_delete_all}</span>
            </button>
          </div>
        </div>

      </main>

      {/* Delete All Data Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-heading text-xl font-bold text-zinc-100">
                Delete All Candidate Data?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                This will permanently delete your profile, assessment responses, calculated Holland RIASEC scores, and saved careers from this device.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-zinc-400 text-center">
                Type <strong>DELETE</strong> below to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full text-center px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-100 uppercase focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="w-1/2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteConfirmText !== 'DELETE'}
                onClick={() => {
                  onDeleteAllData();
                  setShowDeleteModal(false);
                }}
                className={`w-1/2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  deleteConfirmText === 'DELETE'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                Confirm Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
