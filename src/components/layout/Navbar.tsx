import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Settings as SettingsIcon,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { 
  UserProfile, 
  AppNotification, 
  ThemeMode,
  AuthUser 
} from '../../types';
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
  theme,
  onChangeTheme,
  onSelectDemoProfile,
  onOpenAuth,
  onLogout,
  hasAssessmentResult,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read);

  // Requirement 5: Hide signed-in navigation when logged out
  // Assessment, Careers, Opportunities and Notification Bell are strictly hidden if user is not logged in.
  const primaryNavItems = authUser ? [
    { id: 'assessment', label: 'Assessment' },
    { id: 'dashboard', label: 'Careers' },
    { id: 'opportunities', label: 'Opportunities' },
    ...(hasAssessmentResult ? [
      { id: 'report', label: 'My Report' },
      { id: 'counsellor', label: 'AI Counsellor' },
      { id: 'saved_careers', label: 'Saved Careers' },
    ] : [])
  ] : [];

  const handleLogoClick = () => {
    if (!authUser) {
      onSelectTab('landing');
    } else {
      if (hasAssessmentResult) {
        onSelectTab('dashboard');
      } else {
        onSelectTab('assessment');
      }
    }
  };

  const toggleTheme = () => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const nextTheme: ThemeMode = isDark ? 'light' : 'dark';
    onChangeTheme(nextTheme);
  };

  const isCurrentDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Requirement 1: Clickable Re\Start My Career Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            aria-label="Re\Start My Career Home"
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-80 focus:outline-none cursor-pointer group"
          >
            <BrandLogo className="h-6 sm:h-7 w-auto text-zinc-900 dark:text-white transition-transform group-hover:scale-105" />
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-white">
              Re\Start My Career
            </span>
          </button>
        </div>

        {/* Center Desktop Navigation (Visible ONLY when logged in) */}
        {authUser && primaryNavItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-150 ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white font-semibold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions: Demo, Theme Toggle, (Notifications if logged in), (Sign In / User Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Demo Button - strictly labeled "Demo" */}
          <div className="relative">
            <button
              onClick={() => {
                setDemoMenuOpen(!demoMenuOpen);
                setNotifPopoverOpen(false);
                setUserMenuOpen(false);
              }}
              className="px-3 py-1 rounded-full text-xs font-medium tracking-tight bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Test with one-click evaluation personas"
            >
              <span>Demo</span>
              <ChevronDown className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2.5 py-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">Evaluation Profiles</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">1-Click Load</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {DEMO_PROFILES.map((dp) => (
                    <button
                      key={dp.id}
                      onClick={() => {
                        onSelectDemoProfile(dp);
                        setDemoMenuOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors flex flex-col gap-0.5 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white">
                          {dp.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 font-mono">
                          {dp.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                        {dp.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Requirement 2: Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            title={isCurrentDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Light and Dark Mode"
          >
            {isCurrentDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          {/* Requirement 5: Notifications (ONLY when signed in) */}
          {authUser && (
            <div className="relative">
              <button
                onClick={() => {
                  setNotifPopoverOpen(!notifPopoverOpen);
                  setDemoMenuOpen(false);
                  setUserMenuOpen(false);
                }}
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-white ring-2 ring-white dark:ring-black" />
                )}
              </button>

              {notifPopoverOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">Notifications</span>
                      {unreadNotifs.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 text-[10px] font-mono">
                          {unreadNotifs.length} new
                        </span>
                      )}
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={onMarkAllNotificationsRead}
                        className="text-[11px] text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
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
                            n.read 
                              ? 'opacity-60 hover:bg-zinc-100 dark:hover:bg-zinc-800/40' 
                              : 'bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/70'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200">{n.title}</p>
                            <span className="text-[10px] text-zinc-400 whitespace-nowrap">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Account Action: Sign In button OR User Profile menu */}
          {authUser ? (
            <div className="relative">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setDemoMenuOpen(false);
                  setNotifPopoverOpen(false);
                }}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
                title="Account & Settings"
              >
                <div className="w-6 h-6 rounded-full bg-zinc-900 text-white dark:bg-zinc-800 dark:border dark:border-zinc-700 flex items-center justify-center text-xs font-semibold">
                  {(authUser?.displayName || profile?.name || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-zinc-900 dark:text-zinc-200 truncate max-w-[100px]">
                  {(authUser?.displayName || profile?.name || 'Account').split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-500 dark:text-zinc-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                      {authUser?.displayName || profile?.name || 'Candidate'}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {authUser?.email || authUser?.phoneNumber || profile?.email || 'Logged in'}
                    </p>
                  </div>

                  <div className="pt-1 space-y-0.5">
                    <button
                      onClick={() => {
                        onSelectTab('settings');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span>Settings</span>
                    </button>
                    {hasAssessmentResult && (
                      <button
                        onClick={() => {
                          onSelectTab('report');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                        <span>My Report</span>
                      </button>
                    )}
                    {/* Requirement 4: Real Sign Out */}
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all active:scale-[0.98] shadow-sm cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Hamburger (Only needed if logged in or for settings) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 sm:top-16 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-t border-zinc-200 dark:border-zinc-800/80 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-150">
          <div className="space-y-4">
            {authUser && primaryNavItems.length > 0 && (
              <div className="space-y-1">
                {primaryNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-900 space-y-2">
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between cursor-pointer"
              >
                <span>Settings</span>
                <SettingsIcon className="w-4 h-4 text-zinc-400" />
              </button>

              {!authUser ? (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm text-center cursor-pointer"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-900 flex items-center justify-between cursor-pointer"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-xs text-zinc-400 pt-6">
            Re\Start My Career · Career Guidance & Pathways
          </div>
        </div>
      )}
    </header>
  );
};
