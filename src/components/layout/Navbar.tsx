import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  FileText, 
  Bookmark, 
  MessageSquare, 
  GraduationCap, 
  Bell, 
  Menu, 
  X, 
  Globe, 
  User as UserIcon,
  ChevronDown,
  LogOut,
  Settings as SettingsIcon
} from 'lucide-react';
import { 
  UserProfile, 
  AppNotification, 
  SupportedLanguage, 
  ThemeMode,
  AuthUser 
} from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { DEMO_PROFILES, DemoAccount } from '../../data/demoProfiles';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  profile: UserProfile | null;
  authUser: AuthUser | null;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  onSelectDemoProfile: (demo: DemoAccount) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  hasAssessmentResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  authUser,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  language,
  onChangeLanguage,
  onSelectDemoProfile,
  onOpenAuth,
  onLogout,
  hasAssessmentResult,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const unreadNotifs = notifications.filter((n) => !n.read);

  const primaryNavItems = [
    { id: 'assessment', label: t.nav_assessment, requiresResult: false },
    { id: 'dashboard', label: 'Careers', requiresResult: false },
    { id: 'opportunities', label: t.nav_opportunities, requiresResult: false },
    ...(hasAssessmentResult ? [
      { id: 'report', label: t.nav_report, requiresResult: true },
      { id: 'counsellor', label: t.nav_counsellor, requiresResult: true },
      { id: 'saved_careers', label: t.nav_saved_careers, requiresResult: false },
    ] : [])
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/80 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand (Apple-style restraint) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('landing')}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 focus:outline-none"
          >
            <BrandLogo className="h-6 sm:h-7 w-auto text-white" />
            <span className="font-semibold text-sm sm:text-base tracking-tight text-white">
              Re\Start My Career
            </span>
          </button>
        </div>

        {/* Center Desktop Navigation (Clean, minimal typography) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-150 ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Demo, Language, Notifications, Sign In / Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Demo Button - strictly labeled "Demo" */}
          <div className="relative">
            <button
              onClick={() => {
                setDemoMenuOpen(!demoMenuOpen);
                setNotifPopoverOpen(false);
                setUserMenuOpen(false);
              }}
              className="px-3 py-1 rounded-full text-xs font-medium tracking-tight bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-1.5 shadow-sm"
              title="Test with one-click evaluation personas"
            >
              <span>Demo</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2.5 py-2 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">Evaluation Profiles</span>
                  <span className="text-[11px] text-zinc-400 font-mono">1-Click Load</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {DEMO_PROFILES.map((dp) => (
                    <button
                      key={dp.id}
                      onClick={() => {
                        onSelectDemoProfile(dp);
                        setDemoMenuOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-800/80 transition-colors flex flex-col gap-0.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-100 group-hover:text-white">
                          {dp.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
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
            <span className="uppercase text-[11px] font-medium">{language}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifPopoverOpen(!notifPopoverOpen);
                setDemoMenuOpen(false);
                setUserMenuOpen(false);
              }}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white ring-2 ring-black" />
              )}
            </button>

            {notifPopoverOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-200">Notifications</span>
                    {unreadNotifs.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                        {unreadNotifs.length} new
                      </span>
                    )}
                  </div>
                  {unreadNotifs.length > 0 && (
                    <button
                      onClick={onMarkAllNotificationsRead}
                      className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto space-y-1.5">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-zinc-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => onMarkNotificationRead(n.id)}
                        className={`cursor-pointer p-2.5 rounded-xl transition-colors ${
                          n.read ? 'opacity-60 hover:bg-zinc-800/40' : 'bg-zinc-800/40 hover:bg-zinc-800/70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-zinc-200">{n.title}</p>
                          <span className="text-[10px] text-zinc-400 whitespace-nowrap">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Account Action: Sign In button OR User Profile menu */}
          {authUser || profile ? (
            <div className="relative">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setDemoMenuOpen(false);
                  setNotifPopoverOpen(false);
                }}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                title="Account & Settings"
              >
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white text-xs font-semibold">
                  {(authUser?.displayName || profile?.name || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-zinc-200 truncate max-w-[100px]">
                  {(authUser?.displayName || profile?.name || 'Account').split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 border-b border-zinc-800">
                    <p className="text-xs font-semibold text-white truncate">
                      {authUser?.displayName || profile?.name || 'Candidate'}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {authUser?.email || authUser?.phoneNumber || profile?.email || 'Logged in'}
                    </p>
                  </div>

                  <div className="pt-1 space-y-0.5">
                    <button
                      onClick={() => {
                        onSelectTab('settings');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Settings</span>
                    </button>
                    {hasAssessmentResult && (
                      <button
                        onClick={() => {
                          onSelectTab('report');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        <span>My Report</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-zinc-800 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all active:scale-[0.98] shadow-sm"
            >
              Sign In
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 sm:top-16 z-40 bg-black/95 backdrop-blur-2xl border-t border-zinc-800/80 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-150">
          <div className="space-y-4">
            <div className="space-y-1">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-900 space-y-2">
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 flex items-center justify-between"
              >
                <span>Settings & Profile</span>
                <SettingsIcon className="w-4 h-4 text-zinc-400" />
              </button>

              {!authUser && !profile ? (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm text-center"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-xl text-sm font-medium text-red-400 hover:bg-zinc-900 flex items-center justify-between"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-xs text-zinc-400 pt-6">
            Re\Start My Career
          </div>
        </div>
      )}
    </header>
  );
};
