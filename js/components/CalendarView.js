// Taskio - Apple Liquid Glass Calendar & Deadline Management

const CalendarView = ({
  state,
  onSelectDate,
  onOpenTaskModal,
  onRescheduleTask
}) => {
  const [viewMode, setViewMode] = React.useState('month');
  const [currentYear, setCurrentYear] = React.useState(2026);
  const [currentMonth, setCurrentMonth] = React.useState(10); // 10 is November

  const todayStr = new Date().toISOString().slice(0, 10);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    window.audioService.playButtonTap();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    window.audioService.playButtonTap();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleCurrentMonthJump = () => {
    window.audioService.playButtonTap();
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  };

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ dayNumber: d, dateStr, isCurrentMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ dayNumber: d, dateStr, isCurrentMonth: true });
  }

  const remaining = (7 - (calendarDays.length % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ dayNumber: d, dateStr, isCurrentMonth: false });
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header & Controls */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Deadlines, scheduled commitments, and milestone allocations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center p-1 rounded-2xl liquid-glass-subtle mr-2">
            {['month', 'week', 'day'].map((m) => (
              <button
                key={m}
                onClick={() => {
                  window.audioService.playButtonTap();
                  setViewMode(m);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                  viewMode === m ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="Previous Month"
          >
            <Icon name="chevron-left" size={17} />
          </button>
          <button
            onClick={handleCurrentMonthJump}
            className="px-3.5 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Current
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="Next Month"
          >
            <Icon name="chevron-right" size={17} />
          </button>
        </div>
      </div>

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="liquid-glass rounded-3xl p-5 overflow-hidden">
          <div className="grid grid-cols-7 gap-1 text-center pb-3 border-b border-white/10 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-3">
            {calendarDays.map((cell, idx) => {
              const isToday = cell.dateStr === todayStr;
              const cellTasks = state.tasks.filter(t => t.date === cell.dateStr);
              const cellDeadlines = state.tasks.filter(t => t.deadline === cell.dateStr);
              const overdueTasks = cellTasks.filter(t => !t.completed && cell.dateStr < todayStr);

              return (
                <div
                  key={idx}
                  onClick={() => {
                    window.audioService.playButtonTap();
                    onSelectDate(cell.dateStr);
                  }}
                  className={`min-h-[100px] sm:min-h-[115px] p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isToday
                      ? 'liquid-glass-elevated border-blue-500/50 shadow-md ring-1 ring-blue-500/20'
                      : cell.isCurrentMonth
                      ? 'liquid-glass-subtle hover:border-white/30 hover:scale-[1.01]'
                      : 'bg-transparent border-transparent opacity-35'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center tabular-nums ${
                        isToday
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {overdueTasks.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" title={`${overdueTasks.length} overdue task`}></span>
                    )}
                  </div>

                  <div className="space-y-1 mt-1 overflow-hidden">
                    {cellTasks.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold truncate ${
                          t.completed
                            ? 'line-through opacity-60 bg-white/5 text-[var(--text-muted)]'
                            : t.priority === 'Urgent'
                            ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                            : t.priority === 'High'
                            ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                        }`}
                        title={t.title}
                      >
                        {t.title}
                      </div>
                    ))}
                    {cellTasks.length > 2 && (
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block pl-1">
                        +{cellTasks.length - 2} more
                      </span>
                    )}
                  </div>

                  {cellDeadlines.length > 0 && (
                    <div className="pt-1 text-[9px] font-mono text-rose-500 font-semibold truncate flex items-center gap-0.5">
                      <Icon name="clock" size={10} /> {cellDeadlines.length} due
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode !== 'month' && (
        <div className="p-8 text-center rounded-3xl liquid-glass space-y-3">
          <Icon name="calendar" size={32} className="mx-auto text-blue-500" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Viewing {viewMode === 'week' ? 'Weekly Time Grid' : 'Daily Schedule View'}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
            Switch back to Month view or open today directly in the Daily Planner.
          </p>
          <button
            onClick={() => onSelectDate(todayStr)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
          >
            Open Today in Daily Planner
          </button>
        </div>
      )}
    </div>
  );
};

window.CalendarView = CalendarView;
