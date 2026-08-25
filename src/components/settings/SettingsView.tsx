import React, { useState } from 'react';
import { 
  Bell, 
  Download, 
  Trash2, 
  LogOut,
  AlertTriangle,
  Check
} from 'lucide-react';
import { 
  UserProfile, 
  NotificationSettings, 
  AISettings, 
  ThemeMode, 
  AuthUser 
} from '../../types';

interface SettingsViewProps {
  profile: UserProfile | null;
  authUser: AuthUser | null;
  notificationSettings: NotificationSettings;
  onUpdateNotificationSettings: (settings: NotificationSettings) => void;
  aiSettings: AISettings;
  onUpdateAISettings: (settings: AISettings) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  onExportData: () => void;
  onDeleteAllData: () => void;
  onSignOut: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  authUser,
  notificationSettings,
  onUpdateNotificationSettings,
  theme,
  onChangeTheme,
  onExportData,
  onDeleteAllData,
  onSignOut,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const toggleNotif = (key: keyof NotificationSettings) => {
    onUpdateNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen pb-32 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/80 dark:bg-black/60 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your account credentials, preferences, and psychometric records.
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 pt-10 space-y-12">
        
        {savedNotice && (
          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Preferences saved.</span>
          </div>
        )}

        {/* 1. ACCOUNT SECTION */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Account
          </h2>
          
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 space-y-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-800 dark:border dark:border-zinc-700 flex items-center justify-center text-lg font-semibold shadow-sm">
                {(authUser?.displayName || profile?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-zinc-950 dark:text-white">
                  {authUser?.displayName || profile?.name || 'Candidate'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {authUser?.email || authUser?.phoneNumber || profile?.email || 'No email attached'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-900 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 shadow-sm">
                <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Life Stage / Segment</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium capitalize mt-0.5 block">
                  {profile?.segment?.replace('_', ' ') || 'Career Switch'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 shadow-sm">
                <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Location</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium mt-0.5 block">
                  {profile?.city || 'India'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PREFERENCES (Appearance & Notifications) */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Preferences
          </h2>

          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-900 text-xs shadow-sm">
            
            {/* Appearance (Theme) */}
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-950 dark:text-white">Appearance</p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">Visual theme and contrast scheme</p>
              </div>
              <div className="flex rounded-xl bg-zinc-200 dark:bg-zinc-900 p-1 border border-zinc-300 dark:border-zinc-800">
                {[
                  { id: 'dark', label: 'Dark' },
                  { id: 'light', label: 'Light' },
                  { id: 'system', label: 'System' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => onChangeTheme(th.id as ThemeMode)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      theme === th.id 
                        ? 'bg-white text-black dark:bg-zinc-800 dark:text-white shadow-sm' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="p-5 space-y-3">
              <div>
                <p className="font-semibold text-zinc-950 dark:text-white">Notifications</p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">Control reminders and opportunity announcements</p>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { key: 'assessmentReminders', label: 'Assessment & Progress Reminders' },
                  { key: 'careerUpdates', label: 'Career & Industry Pathway Updates' },
                  { key: 'thirtyDayActionReminders', label: '30-Day Execution Milestones' },
                  { key: 'scholarshipOpportunities', label: 'Scholarship & Exam Deadlines' },
                ].map((item) => {
                  const isChecked = notificationSettings[item.key as keyof NotificationSettings];
                  return (
                    <label
                      key={item.key}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors"
                    >
                      <span className="text-zinc-700 dark:text-zinc-300">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleNotif(item.key as keyof NotificationSettings)}
                        className="w-4 h-4 rounded bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:ring-0 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* 3. DATA & EXPORT */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Data Portability
          </h2>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 space-y-4 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">Export Psychometric Record</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Download a clean JSON archive containing your responses, calculated Holland scores, and saved pathways.
              </p>
            </div>

            <button
              onClick={onExportData}
              className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Record (JSON)</span>
            </button>
          </div>
        </section>

        {/* 4. ACCOUNT MANAGEMENT (Sign Out) */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Account Management
          </h2>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">Sign Out</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Safely end your session on this device.
              </p>
            </div>

            <button
              onClick={onSignOut}
              className="px-5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border dark:border-zinc-800 text-xs font-semibold transition-all inline-flex items-center gap-2 active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5 text-zinc-300" />
              <span>Sign Out</span>
            </button>
          </div>
        </section>

        {/* 5. DANGER ZONE */}
        <section className="pt-8 border-t border-zinc-200 dark:border-zinc-900 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-zinc-400">
            Danger Zone
          </h2>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">Delete Account & Data</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-md">
                Permanently purge all assessment responses, Holland scores, and candidate data from this device.
              </p>
            </div>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-red-50 dark:bg-zinc-950 dark:hover:bg-red-950/40 border border-zinc-300 dark:border-zinc-800 hover:border-red-400 dark:hover:border-red-900 text-zinc-700 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </section>

      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-zinc-900 border border-red-200 dark:border-zinc-800 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Delete Account?
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                This action is permanent and cannot be undone. All your psychometric results, responses, and saved career items will be permanently erased.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-zinc-600 dark:text-zinc-400 text-center">
                Type <strong className="text-black dark:text-white font-mono">DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full text-center px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono text-black dark:text-white uppercase focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="w-1/2 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium cursor-pointer"
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
                className={`w-1/2 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  deleteConfirmText === 'DELETE'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                    : 'bg-zinc-200 dark:bg-zinc-900 text-zinc-400 cursor-not-allowed'
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
