// Taskio - Apple Liquid Glass Navigation Bar

const Navbar = ({
  activeTab,
  setActiveTab,
  state,
  activeTimer,
  toggleTimer,
  onOpenTaskModal,
  onOpenSettings,
  onOpenNotifications,
  unreadNotificationsCount,
  onToggleTheme,
  onToggleMobileMenu
}) => {
  const [timeStr, setTimeStr] = React.useState('');
  const [dateStr, setDateStr] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const levelInfo = window.gamificationService.getLevelInfo(state.gamification.xp);
  const isDark = state.theme === 'dark';

  return (
    <header className="sticky top-0 z-30 px-4 sm:px-8 py-3.5 transition-all">
      <div className="liquid-glass rounded-2xl px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Drawer Trigger & Live Digital Clock */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              onToggleMobileMenu();
            }}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 md:hidden transition-all active:scale-95"
            title="Navigation Menu"
          >
            <Icon name="folder-kanban" size={20} />
          </button>

          {/* Live Tabular Apple Clock Pill */}
          <div className="hidden sm:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl liquid-glass-subtle">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium tracking-tight tabular-nums text-[var(--text-primary)]">
              {timeStr}
            </span>
            <span className="text-xs text-[var(--text-muted)] border-l border-white/10 pl-2">
              {dateStr}
            </span>
          </div>
        </div>

        {/* Center: Running Focus Timer Pill */}
        <div className="flex items-center">
          {activeTimer ? (
            <div
              onClick={() => {
                window.audioService.playButtonTap();
                setActiveTab('timer');
              }}
              className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 apple-active-pulse cursor-pointer backdrop-blur-md transition-all hover:bg-rose-500/15"
            >
              <Icon name="timer" size={14} className="animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-tight tabular-nums text-rose-500">
                {activeTimer.displayTime}
              </span>
              <span className="text-xs font-medium max-w-[120px] sm:max-w-[220px] truncate text-[var(--text-primary)]">
                {activeTimer.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.audioService.playButtonTap();
                  toggleTimer(activeTimer.taskId);
                }}
                className="p-1 rounded-full hover:bg-rose-500/20 text-rose-500"
                title="Pause Timer"
              >
                <Icon name="pause" size={12} />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-2 text-xs text-[var(--text-muted)] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60"></span>
              <span>Focus state active</span>
            </div>
          )}
        </div>

        {/* Right side: Quick Task, Level Pill, Notifications, Theme Toggle, Settings */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Quick Add Task Glass Button */}
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              onOpenTaskModal();
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <Icon name="plus" size={15} />
            <span className="hidden sm:inline">New Task</span>
          </button>

          {/* Gamification Level Glass Pill */}
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              setActiveTab('gamification');
            }}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl liquid-glass-subtle hover:border-amber-400/40 transition-all text-xs"
            title={`Level ${levelInfo.level}: ${levelInfo.title} (${state.gamification.xp} XP)`}
          >
            <Icon name="flame" size={14} className="text-amber-500" />
            <span className="font-mono font-bold text-amber-500">{state.gamification.streak}d</span>
            <span className="font-semibold text-[var(--text-secondary)] border-l border-white/10 pl-1.5">Lv.{levelInfo.level}</span>
          </button>

          {/* Notification Center Bell */}
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              onOpenNotifications();
            }}
            className="relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all active:scale-95"
            title="Notifications"
          >
            <Icon name="bell" size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Apple Animated Dark/Light Sliding Pill Switcher */}
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              onToggleTheme();
            }}
            className="relative p-1.5 rounded-xl liquid-glass-subtle hover:bg-white/15 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95 flex items-center justify-center"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <Icon name="moon" size={17} className="text-indigo-400" />
            ) : (
              <Icon name="sun" size={17} className="text-amber-500" />
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              onOpenSettings();
            }}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all active:scale-95"
            title="Settings"
          >
            <Icon name="settings" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

window.Navbar = Navbar;
