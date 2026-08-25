import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  FileText, 
  Bookmark, 
  Sparkles, 
  GraduationCap, 
  MessageSquare, 
  HelpCircle, 
  Settings as SettingsIcon, 
  Bell, 
  Menu, 
  X, 
  Globe, 
  Sun, 
  Moon, 
  User as UserIcon,
  CheckCircle2,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { 
  UserProfile, 
  AppNotification, 
  SupportedLanguage, 
  ThemeMode 
} from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { DEMO_PROFILES, DemoAccount } from '../../data/demoProfiles';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  profile: UserProfile | null;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  onSelectDemoProfile: (demo: DemoAccount) => void;
  onLogout: () => void;
  hasAssessmentResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  language,
  onChangeLanguage,
  theme,
  onChangeTheme,
  onSelectDemoProfile,
  onLogout,
  hasAssessmentResult,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const unreadNotifs = notifications.filter((n) => !n.read);

  const navItems = [
    { id: 'dashboard', label: t.nav_dashboard, icon: Layers, requiresResult: true },
    { id: 'assessment', label: t.nav_assessment, icon: Compass, requiresResult: false },
    { id: 'report', label: t.nav_report, icon: FileText, requiresResult: true },
    { id: 'saved_careers', label: t.nav_saved_careers, icon: Bookmark, requiresResult: false },
    { id: 'counsellor', label: t.nav_counsellor, icon: Sparkles, requiresResult: true },
    { id: 'opportunities', label: t.nav_opportunities, icon: GraduationCap, requiresResult: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo (Apple-level restraint) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('landing')}
            className="flex items-center gap-2.5 group text-left transition-opacity hover:opacity-90 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 group-hover:border-zinc-500 transition-colors shadow-sm">
              <span className="font-mono text-sm font-semibold tracking-tighter text-blue-400">r\</span>
            </div>
            <div>
              <span className="font-heading text-base font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                re\start my career
              </span>
              <span className="hidden sm:block text-[10px] text-zinc-400 font-mono tracking-tighter">
                intelligence · signals · pathways
              </span>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isDisabled = item.requiresResult && !hasAssessmentResult;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onSelectTab(item.id)}
                disabled={isDisabled}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : isDisabled
                    ? 'text-zinc-600 cursor-not-allowed opacity-50'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80'
                }`}
                title={isDisabled ? 'Complete assessment to unlock this section' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
                {isDisabled && (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions (Language, Notifs, Demo Personas, Profile/Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Demo Persona Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setDemoMenuOpen(!demoMenuOpen);
                setNotifPopoverOpen(false);
              }}
              className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-tight bg-blue-950/60 border border-blue-800/60 text-blue-300 hover:bg-blue-900/60 hover:text-blue-200 transition-all flex items-center gap-1.5 shadow-sm"
              title="Quick test with 4 distinct evaluation personas"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">Demo Personas</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1.5 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">Evaluation Personas</span>
                  <span className="text-[10px] font-mono text-zinc-400">1-Click Load</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {DEMO_PROFILES.map((dp) => (
                    <button
                      key={dp.id}
                      onClick={() => {
                        onSelectDemoProfile(dp);
                        setDemoMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-zinc-800 transition-colors flex flex-col gap-0.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-100 group-hover:text-blue-300">
                          {dp.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                          {dp.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight">
                        {dp.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => onChangeLanguage(language === 'en' ? 'hi' : 'en')}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors text-xs font-mono flex items-center gap-1"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span className="uppercase text-[11px] font-semibold">{language}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifPopoverOpen(!notifPopoverOpen);
                setDemoMenuOpen(false);
              }}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-zinc-950" />
              )}
            </button>

            {notifPopoverOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-200">Notifications</span>
                    {unreadNotifs.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-900/60 text-blue-300 text-[10px] font-mono">
                        {unreadNotifs.length} new
                      </span>
                    )}
                  </div>
                  {unreadNotifs.length > 0 && (
                    <button
                      onClick={onMarkAllNotificationsRead}
                      className="text-[11px] text-zinc-400 hover:text-blue-400 font-mono transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto space-y-2 divide-y divide-zinc-800/40">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-zinc-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => onMarkNotificationRead(n.id)}
                        className={`pt-2 first:pt-0 cursor-pointer p-1.5 rounded-lg transition-colors ${
                          n.read ? 'opacity-70 hover:bg-zinc-800/40' : 'bg-zinc-800/30 hover:bg-zinc-800/70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-zinc-200">{n.title}</p>
                          <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile / Auth Avatar */}
          {profile ? (
            <button
              onClick={() => onSelectTab('settings')}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title="Settings & Profile"
            >
              <div className="w-6 h-6 rounded-full bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-blue-200 text-xs font-bold font-mono">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-zinc-200 truncate max-w-[100px]">
                {profile.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('onboarding')}
              className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-medium tracking-tight transition-all shadow-sm"
            >
              {t.nav_login}
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          <div className="space-y-2">
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Navigation
            </p>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isDisabled = item.requiresResult && !hasAssessmentResult;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!isDisabled) {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }
                  }}
                  disabled={isDisabled}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : isDisabled
                      ? 'text-zinc-600 cursor-not-allowed'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isDisabled ? (
                    <span className="text-[10px] font-mono text-zinc-400">Locked</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-zinc-800/80 space-y-1">
              <button
                onClick={() => {
                  onSelectTab('feedback');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-zinc-400 hover:bg-zinc-900"
              >
                <MessageSquare className="w-4 h-4 text-zinc-500" />
                <span>{t.nav_feedback}</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('help');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-zinc-400 hover:bg-zinc-900"
              >
                <HelpCircle className="w-4 h-4 text-zinc-500" />
                <span>{t.nav_help}</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-zinc-400 hover:bg-zinc-900"
              >
                <SettingsIcon className="w-4 h-4 text-zinc-500" />
                <span>{t.nav_settings}</span>
              </button>
            </div>
          </div>

          {profile && (
            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-blue-200 text-sm font-bold font-mono">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">{profile.name}</p>
                  <p className="text-[10px] font-mono text-zinc-400">{profile.segment.replace('_', ' ').toUpperCase()}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
