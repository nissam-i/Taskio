// Taskio - Apple Liquid Glass Streaks & Gamification View

const GamificationView = ({ state }) => {
  const levelInfo = window.gamificationService.getLevelInfo(state.gamification.xp);
  const badges = state.gamification.badges || window.PLANNER_CONSTANTS.INITIAL_BADGES;
  const completedBadgesCount = badges.filter(b => b.unlockedAt).length;

  const today = new Date();
  const weeks = [];
  const completedDates = state.gamification.completedDates || {};

  for (let w = 51; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - (w * 7 + (6 - d)));
      const dateStr = targetDate.toISOString().slice(0, 10);
      const count = completedDates[dateStr] || 0;
      days.push({ dateStr, count, dayOfWeek: d });
    }
    weeks.push(days);
  }

  const getHeatmapColor = (count) => {
    if (!count || count === 0) return 'bg-white/5 border-white/5';
    if (count === 1 || count === 2) return 'bg-emerald-500/30 border-emerald-500/40';
    if (count === 3 || count === 4) return 'bg-emerald-500/60 border-emerald-500/70 shadow-sm';
    return 'bg-emerald-500 border-emerald-400 shadow-md';
  };

  const handleManualConfetti = () => {
    window.audioService.playStreakAchievement();
    window.gamificationService.triggerConfetti();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Level & XP Hero Banner */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-500">
              <Icon name="crown" size={14} />
              <span>Level {levelInfo.level} — {levelInfo.title}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Productivity Momentum & Milestones
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl">
              Consistent execution builds personal mastery. Every completed routine fuels your momentum.
            </p>
          </div>

          {/* Streak Counter Glass Widget */}
          <div className="flex items-center space-x-4 liquid-glass-subtle p-4 sm:p-5 rounded-2xl border border-white/10 shrink-0">
            <div className="p-3.5 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center animate-bounce">
              <Icon name="flame" size={32} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold block">Current Streak</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-amber-500">{state.gamification.streak}</span>
                <span className="text-xs font-bold text-[var(--text-muted)]">Days</span>
              </div>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">Personal Best: {state.gamification.bestStreak} days</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-medium">
            <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
              <Icon name="sparkles" size={13} className="text-amber-500" /> Total Discipline XP: {levelInfo.xp}
            </span>
            <span className="text-[var(--text-muted)] tabular-nums">
              {levelInfo.xpIntoLevel} / {levelInfo.xpNeededForNext} XP to Level {levelInfo.level + 1} ({levelInfo.progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${levelInfo.progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. Apple-Style 52-Week Activity Heatmap */}
      <div className="liquid-glass rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Icon name="activity" size={18} className="text-emerald-500" /> 52-Week Activity Matrix
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Daily completed tasks frequency mapped across the entire year.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-[var(--text-muted)] font-mono">
            <span>Less</span>
            <span className="w-3 h-3 rounded-xs bg-white/5 border border-white/5"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-500/30"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-500/60"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-500"></span>
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((cell, dIdx) => (
                  <div
                    key={dIdx}
                    className={`w-3.5 h-3.5 rounded-sm border transition-all hover:scale-125 cursor-pointer ${getHeatmapColor(cell.count)}`}
                    title={`${cell.dateStr}: ${cell.count} task${cell.count !== 1 ? 's' : ''} completed`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 12 Achievement Badges Grid */}
      <div className="liquid-glass rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Icon name="trophy" size={18} className="text-amber-500" /> Achievement Badges ({completedBadgesCount}/{badges.length})
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Unlock honors through consistency, on-time delivery, and deep work intervals.
            </p>
          </div>

          <button
            onClick={handleManualConfetti}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/25 transition-all active:scale-95"
            title="Trigger celebration"
          >
            <Icon name="sparkles" size={14} /> <span>Celebrate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
          {badges.map((badge) => {
            const isUnlocked = !!badge.unlockedAt;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'liquid-glass-elevated border-amber-500/30 shadow-sm'
                    : 'liquid-glass-subtle opacity-45'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-600 text-white shadow-md'
                      : 'liquid-glass-subtle text-[var(--text-muted)]'
                  }`}
                >
                  <Icon name={badge.icon || 'trophy'} size={20} />
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2 leading-relaxed">
                    {badge.desc}
                  </p>
                  <span className="text-[10px] font-mono mt-1.5 block">
                    {isUnlocked ? (
                      <span className="text-emerald-500 font-semibold">
                        ✓ Unlocked {badge.unlockedAt.slice(0, 10)}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)]">🔒 Locked</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

window.GamificationView = GamificationView;
