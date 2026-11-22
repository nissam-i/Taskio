// Taskio - Apple Liquid Glass Sidebar Navigation

const Sidebar = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  state
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'compass', badge: null },
    { id: 'routine', label: 'Daily Planner', icon: 'sunrise', badge: state.tasks.filter(t => t.date === new Date().toISOString().slice(0,10) && !t.completed).length },
    { id: 'projects', label: 'Projects', icon: 'folder-kanban', badge: state.projects.filter(p => p.status !== 'Completed').length },
    { id: 'timer', label: 'Focus & Timers', icon: 'timer', badge: null },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', badge: state.tasks.filter(t => !t.completed && t.deadline && t.deadline < new Date().toISOString().slice(0,10)).length ? '!' : null, alert: true },
    { id: 'analytics', label: 'Analytics', icon: 'barchart3', badge: null },
    { id: 'gamification', label: 'Streaks & Rewards', icon: 'trophy', badge: `${state.gamification.streak}d` },
    { id: 'ai', label: 'AI Assistant', icon: 'bot', badge: 'AI', siri: true }
  ];

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter(t => t.date === todayStr);
  const completedToday = todayTasks.filter(t => t.completed).length;
  const targetTasks = state.user.dailyGoalTasks || 5;
  const goalProgress = Math.min(100, Math.round((completedToday / targetTasks) * 100));

  const handleNavClick = (tabId) => {
    window.audioService.playButtonTap();
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  const content = (
    <div className="flex flex-col h-full justify-between p-3.5">
      {/* Brand & Collapse Header */}
      <div>
        <div className="flex items-center justify-between px-3 py-3 mb-2">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <Icon name="sparkles" size={20} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-base tracking-tight text-[var(--text-primary)] leading-tight">
                  Taskio
                </h1>
                <p className="text-[10px] tracking-wider uppercase text-[var(--text-muted)] font-semibold">
                  Productivity Glass
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              window.audioService.playButtonTap();
              setIsCollapsed(!isCollapsed);
            }}
            className="hidden lg:flex p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <Icon name={isCollapsed ? 'chevron-right' : 'chevron-left'} size={15} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'liquid-glass-elevated text-[var(--text-primary)] border-white/20 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                }`}
                title={item.label}
              >
                <div className="flex items-center space-x-3">
                  <span className={`${
                    isActive
                      ? 'text-blue-500 dark:text-blue-400'
                      : item.siri
                      ? 'text-purple-500 dark:text-purple-400'
                      : 'text-[var(--text-muted)]'
                  }`}>
                    <Icon name={item.icon} size={18} />
                  </span>
                  {!isCollapsed && <span className="font-semibold">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-blue-500/15 text-blue-500 dark:text-blue-400 border border-blue-500/30'
                        : item.alert
                        ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                        : item.siri
                        ? 'bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/30'
                        : 'bg-white/10 text-[var(--text-muted)]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: Goal Ring Widget & User Profile */}
      <div className="space-y-3 pt-3">
        {!isCollapsed && (
          <div className="p-3.5 rounded-2xl liquid-glass-subtle space-y-2.5 border border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
                <Icon name="target" size={13} className="text-amber-500" /> Daily Target
              </span>
              <span className="font-mono font-bold text-[var(--text-primary)]">{completedToday}/{targetTasks}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] text-right">
              {goalProgress >= 100 ? 'Goal Conquered! 🌟' : `${targetTasks - completedToday} more to hit goal`}
            </p>
          </div>
        )}

        {/* User Profile Pill */}
        <div className="flex items-center justify-between p-2 rounded-2xl liquid-glass-subtle">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-sm shrink-0">
              {state.user.avatarEmoji || '✨'}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[var(--text-primary)] truncate">{state.user.name}</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">{state.user.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 h-screen sticky top-0 p-3 transition-all duration-300 z-20 ${
          isCollapsed ? 'w-24' : 'w-64'
        }`}
      >
        <div className="h-full rounded-3xl liquid-glass overflow-hidden shadow-2xl">
          {content}
        </div>
      </aside>

      {/* Mobile Slide-Over Drawer with VisionOS Blur */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 glass-modal-backdrop" onClick={() => setMobileOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full p-3 z-50 flex flex-col">
            <div className="h-full rounded-3xl liquid-glass-elevated shadow-2xl overflow-y-auto">
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-xl text-[var(--text-secondary)] hover:bg-white/10"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

window.Sidebar = Sidebar;
