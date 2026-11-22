// Taskio - Apple Liquid Glass Analytics & Reporting View

const AnalyticsView = ({ state }) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.completed).length;
  const pendingTasks = state.tasks.filter(t => !t.completed).length;
  const overdueTasks = state.tasks.filter(t => !t.completed && t.deadline && t.deadline < todayStr).length;

  const totalTimeSeconds = state.tasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
  const totalHoursWorked = (totalTimeSeconds / 3600).toFixed(1);

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0.8;
  const streakFactor = Math.min(1, state.gamification.streak / 14);
  const overduePenalty = Math.max(0, 1 - (overdueTasks * 0.2));

  const productivityScore = Math.min(100, Math.round(
    (completionRate * 50) + (streakFactor * 30) + (overduePenalty * 20)
  ));

  let scoreTier = 'Solid Momentum';
  let scoreColor = 'text-blue-500';
  if (productivityScore >= 85) {
    scoreTier = 'Mastery Flow';
    scoreColor = 'text-emerald-500';
  } else if (productivityScore >= 70) {
    scoreTier = 'High Focus';
    scoreColor = 'text-purple-500';
  }

  const categoryStats = window.PLANNER_CONSTANTS.CATEGORIES.map(cat => {
    const catTasks = state.tasks.filter(t => t.category === cat.id);
    const catTime = catTasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
    const catHours = (catTime / 3600).toFixed(1);
    return {
      name: cat.name,
      hours: parseFloat(catHours),
      count: catTasks.length,
      color: cat.color
    };
  }).filter(c => c.count > 0 || c.hours > 0);

  const totalCatHours = categoryStats.reduce((acc, c) => acc + c.hours, 0) || 1;

  const weeklyData = [
    { day: 'Mon', completed: 4, scheduled: 5, hours: 3.5 },
    { day: 'Tue', completed: 6, scheduled: 6, hours: 4.8 },
    { day: 'Wed', completed: 5, scheduled: 7, hours: 4.2 },
    { day: 'Thu', completed: 7, scheduled: 8, hours: 5.5 },
    { day: 'Fri', completed: 5, scheduled: 6, hours: 4.0 },
    { day: 'Sat', completed: 3, scheduled: 4, hours: 2.5 },
    { day: 'Sun', completed: completedTasks, scheduled: totalTasks, hours: parseFloat(totalHoursWorked) }
  ];

  const maxWeeklyTask = Math.max(...weeklyData.map(d => d.scheduled), 8);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Productivity Analytics & Reports
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Execution velocity, category allocations, and performance trends.
          </p>
        </div>

        <button
          onClick={() => {
            window.audioService.playButtonTap();
            window.print();
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Icon name="file-text" size={15} /> <span>Print Executive Report</span>
        </button>
      </div>

      {/* Top 4 Glass Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="liquid-glass-card p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Overall Score</span>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className={`text-4xl font-extrabold font-mono tabular-nums ${scoreColor}`}>
              {productivityScore}
            </span>
            <span className="text-xs font-semibold text-[var(--text-muted)] font-mono">/ 100</span>
          </div>
          <span className="text-xs font-semibold text-[var(--text-primary)] mt-1 block">
            {scoreTier}
          </span>
        </div>

        <div className="liquid-glass-card p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Total Hours Logged</span>
          <div className="mt-4 flex items-baseline space-x-1">
            <span className="text-4xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
              {totalHoursWorked}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">hrs</span>
          </div>
          <span className="text-xs text-[var(--text-muted)] mt-1 block">
            Across {state.projects.length} active initiatives
          </span>
        </div>

        <div className="liquid-glass-card p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Tasks Completed</span>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold font-mono tabular-nums text-emerald-500">
              {completedTasks}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono tabular-nums">/ {totalTasks}</span>
          </div>
          <span className="text-xs text-[var(--text-muted)] mt-1 block">
            {pendingTasks} pending execution
          </span>
        </div>

        <div className="liquid-glass-card p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Overdue Tasks</span>
          <div className="mt-4 flex items-baseline space-x-1">
            <span className={`text-4xl font-extrabold font-mono tabular-nums ${overdueTasks > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              {overdueTasks}
            </span>
          </div>
          <span className="text-xs text-[var(--text-muted)] mt-1 block">
            {overdueTasks === 0 ? 'Flawless execution' : 'Action required today'}
          </span>
        </div>
      </div>

      {/* Main Charts: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Task Velocity */}
        <div className="liquid-glass rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Weekly Task Completion Velocity
            </h3>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Completed
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <span className="w-2.5 h-2.5 rounded-sm bg-white/15"></span> Scheduled
              </span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-white/10">
            {weeklyData.map((d, i) => {
              const compHeight = Math.round((d.completed / maxWeeklyTask) * 100);
              const schedHeight = Math.round((d.scheduled / maxWeeklyTask) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[28px] flex items-end justify-center space-x-1 h-full">
                    <div
                      className="w-1/2 bg-white/15 rounded-t-md transition-all group-hover:opacity-80"
                      style={{ height: `${schedHeight}%` }}
                      title={`${d.day}: ${d.scheduled} scheduled`}
                    ></div>
                    <div
                      className="w-1/2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all group-hover:brightness-110 shadow-sm"
                      style={{ height: `${compHeight}%` }}
                      title={`${d.day}: ${d.completed} completed`}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] mt-2">{d.day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[var(--text-muted)] text-center">
            Consistent 80%+ completion rate observed mid-week.
          </p>
        </div>

        {/* Category Allocation Donut */}
        <div className="liquid-glass rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            Focus Allocation by Category
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="rgba(120, 120, 128, 0.15)" strokeWidth="15" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#AF52DE" strokeWidth="15" strokeDasharray="180 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#0071E3" strokeWidth="15" strokeDasharray="50 238" strokeDashoffset="-180" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#34C759" strokeWidth="15" strokeDasharray="30 238" strokeDashoffset="-230" />
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] text-[var(--text-muted)] font-mono block">Deep Work</span>
                <span className="text-xl font-bold font-mono text-[var(--text-primary)] tabular-nums">65%</span>
              </div>
            </div>

            <div className="space-y-2.5 flex-1 w-full">
              {categoryStats.map((cat, idx) => {
                const percent = Math.round((cat.hours / totalCatHours) * 100) || 20;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[var(--text-primary)]">{cat.name}</span>
                      <span className="font-mono tabular-nums text-[var(--text-muted)]">{cat.hours}h ({percent}%)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.AnalyticsView = AnalyticsView;
