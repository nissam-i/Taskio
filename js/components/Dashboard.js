// Taskio - Apple Liquid Glass Executive Dashboard View

const Dashboard = ({
  state,
  setActiveTab,
  onOpenTaskModal,
  onToggleTaskComplete,
  onToggleTimer,
  activeTimerId
}) => {
  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const quotes = window.PLANNER_CONSTANTS.MOTIVATIONAL_QUOTES;

  const rotateQuote = () => {
    window.audioService.playButtonTap();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  // Determine greeting based on current local hour
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  let greetingIcon = 'sunrise';
  if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';
    greetingIcon = 'sun';
  } else if (hour >= 17 && hour < 22) {
    greeting = 'Good evening';
    greetingIcon = 'coffee';
  } else if (hour >= 22 || hour < 5) {
    greeting = 'Late night focus';
    greetingIcon = 'moon';
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter(t => t.date === todayStr);
  const completedToday = todayTasks.filter(t => t.completed);
  const pendingToday = todayTasks.filter(t => !t.completed);
  const overdueTasks = state.tasks.filter(t => !t.completed && t.deadline && t.deadline < todayStr);
  const activeProjects = state.projects.filter(p => p.status !== 'Completed');

  const productivityRate = todayTasks.length > 0
    ? Math.round((completedToday.length / todayTasks.length) * 100)
    : 0;

  const totalSecondsToday = todayTasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
  const hours = Math.floor(totalSecondsToday / 3600);
  const minutes = Math.floor((totalSecondsToday % 3600) / 60);
  const workTimeFormatted = `${hours}h ${minutes}m`;

  const upcomingDeadlines = state.tasks
    .filter(t => !t.completed && t.deadline && t.deadline >= todayStr)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  const levelInfo = window.gamificationService.getLevelInfo(state.gamification.xp);

  // SVG Ring Progress Calculations (Apple Watch style)
  const ringRadius = 26;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (productivityRate / 100) * ringCircumference;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Hero Banner: visionOS Glass Card with Greeting & Dynamic Quotes */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Soft specular highlight reflection */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full liquid-glass-subtle text-xs font-semibold text-[var(--text-secondary)] border border-white/10">
              <Icon name={greetingIcon} size={14} className="text-amber-500" />
              <span>{greeting}, {state.user.name || 'Friend'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Focus & High-Performance Space
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
              You have {pendingToday.length} tasks scheduled today across {activeProjects.length} active initiatives.
            </p>
          </div>

          {/* Dynamic Motivational Quote Card */}
          <div
            onClick={rotateQuote}
            className="group cursor-pointer p-4 rounded-2xl liquid-glass-subtle max-w-sm hover:border-white/30 transition-all active:scale-[0.98] shrink-0 border border-white/10 shadow-sm"
            title="Click to cycle next motivational thought"
          >
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1">
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <Icon name="sparkles" size={12} /> Thought of the Day
              </span>
              <span className="text-[10px] group-hover:text-blue-500 font-mono">refresh ↻</span>
            </div>
            <p className="italic text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
              &ldquo;{quotes[quoteIndex].quote}&rdquo;
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5 text-right font-semibold">
              — {quotes[quoteIndex].author}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Core Metrics Grid (4 Liquid Glass Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Tasks Today with Apple Ring */}
        <div className="liquid-glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Today's Tasks</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Icon name="check-circle-2" size={17} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                  {completedToday.length}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">/ {todayTasks.length}</span>
              </div>
              <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
                {pendingToday.length} pending
              </span>
            </div>

            {/* Apple Activity Progress Ring */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r={ringRadius} stroke="rgba(120, 120, 128, 0.2)" strokeWidth="5" fill="none" />
                <circle
                  cx="30" cy="30" r={ringRadius}
                  stroke="#34C759"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-[var(--text-primary)]">
                {productivityRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Productivity Rate */}
        <div className="liquid-glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Productivity Rate</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Icon name="activity" size={17} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                {productivityRate}%
              </span>
              <span className="text-xs text-blue-500 font-semibold">
                {productivityRate >= 70 ? '★ Flow State' : 'In Progress'}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-2 truncate font-mono">
              {state.pomodoro.sessionsCompleted} Pomodoro intervals
            </p>
          </div>
        </div>

        {/* Metric 3: Active Streak */}
        <div
          onClick={() => {
            window.audioService.playButtonTap();
            setActiveTab('gamification');
          }}
          className="liquid-glass-card p-5 flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Streak Momentum</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 animate-pulse">
              <Icon name="flame" size={17} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-500">
                {state.gamification.streak}
              </span>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Days</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
              <span>Lv.{levelInfo.level} {levelInfo.title.split(' ')[0]}</span>
              <span>{state.gamification.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Focus Time Logged */}
        <div
          onClick={() => {
            window.audioService.playButtonTap();
            setActiveTab('timer');
          }}
          className="liquid-glass-card p-5 flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Focus Time</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Icon name="timer" size={17} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                {workTimeFormatted}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-2 font-mono">
              Target: {state.user.dailyGoalHours || 4}h daily goal
            </p>
          </div>
        </div>
      </div>

      {/* 3. Overdue Tasks Alert (if any) */}
      {overdueTasks.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl liquid-glass border-rose-500/30 bg-rose-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-500 shrink-0">
              <Icon name="shield-alert" size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''} Require Attention
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                &ldquo;{overdueTasks[0].title}&rdquo; is past its deadline. Rescue it today to earn the Overdue Crusher badge!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                setActiveTab('routine');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              Open in Planner
            </button>
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                setActiveTab('ai');
              }}
              className="px-3.5 py-1.5 rounded-xl liquid-glass-subtle border border-rose-500/30 text-[var(--text-primary)] text-xs font-semibold hover:bg-rose-500/15 transition-all active:scale-95"
            >
              Ask AI to Rescue
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Two-Column Layout: Today's Priorities vs Upcoming Deadlines & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Scheduled Routine Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Icon name="sunrise" size={18} className="text-blue-500" />
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Today's Priority Routine
              </h3>
            </div>
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                setActiveTab('routine');
              }}
              className="text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              Full Daily Timeline <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="liquid-glass rounded-3xl p-5 space-y-3">
            {todayTasks.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] space-y-2">
                <Icon name="calendar" size={32} className="mx-auto text-[var(--text-muted)]" />
                <p className="text-sm font-medium">No tasks scheduled for today yet.</p>
                <button
                  onClick={() => {
                    window.audioService.playButtonTap();
                    onOpenTaskModal();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-medium"
                >
                  Create First Task
                </button>
              </div>
            ) : (
              todayTasks.slice(0, 5).map((task) => {
                const isRunning = activeTimerId === task.id;

                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      task.completed
                        ? 'liquid-glass-subtle opacity-70'
                        : isRunning
                        ? 'bg-rose-500/10 border-rose-500/40 shadow-sm apple-active-pulse'
                        : 'liquid-glass-subtle hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5 overflow-hidden">
                      {/* Apple Squircle Checkbox */}
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          window.audioService.playCheckbox();
                          onToggleTaskComplete(task.id);
                        }}
                        className="apple-checkbox mt-0.5"
                        aria-label={`Mark "${task.title}" as complete`}
                      />

                      <div className="overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-bold truncate ${task.completed ? 'apple-task-completed' : 'text-[var(--text-primary)]'}`}>
                            {task.title}
                          </h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                            task.priority === 'Urgent'
                              ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                              : task.priority === 'High'
                              ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                              : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-[var(--text-muted)] mt-1 font-mono tabular-nums">
                          {task.startTime && task.endTime && (
                            <span className="flex items-center gap-1">
                              <Icon name="clock" size={12} /> {task.startTime} – {task.endTime}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Icon name="tag" size={12} /> {task.category}
                          </span>
                          {task.subtasks && task.subtasks.length > 0 && (
                            <span className="text-[11px] font-sans">
                              {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timer Trigger Button */}
                    {!task.completed && (
                      <button
                        onClick={() => {
                          window.audioService.playTimerStart();
                          onToggleTimer(task.id);
                        }}
                        className={`p-2 rounded-xl transition-all shrink-0 active:scale-95 ${
                          isRunning
                            ? 'bg-rose-600 text-white shadow-md'
                            : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-rose-500'
                        }`}
                        title={isRunning ? 'Pause Timer' : 'Start Task Timer'}
                      >
                        <Icon name={isRunning ? 'pause' : 'play'} size={14} />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Deadlines */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="liquid-glass rounded-3xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Icon name="zap" size={15} className="text-amber-500" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  window.audioService.playButtonTap();
                  onOpenTaskModal();
                }}
                className="p-3 rounded-2xl liquid-glass-subtle hover:border-blue-500/40 text-left transition-all active:scale-95"
              >
                <Icon name="plus" size={16} className="text-blue-500 mb-1" />
                <p className="text-xs font-bold text-[var(--text-primary)]">New Task</p>
                <p className="text-[10px] text-[var(--text-muted)]">Add to routine</p>
              </button>

              <button
                onClick={() => {
                  window.audioService.playButtonTap();
                  setActiveTab('timer');
                }}
                className="p-3 rounded-2xl liquid-glass-subtle hover:border-rose-500/40 text-left transition-all active:scale-95"
              >
                <Icon name="timer" size={16} className="text-rose-500 mb-1" />
                <p className="text-xs font-bold text-[var(--text-primary)]">Pomodoro</p>
                <p className="text-[10px] text-[var(--text-muted)]">25m sprint</p>
              </button>

              <button
                onClick={() => {
                  window.audioService.playButtonTap();
                  setActiveTab('ai');
                }}
                className="p-3 rounded-2xl liquid-glass-subtle hover:border-purple-500/40 text-left transition-all active:scale-95"
              >
                <Icon name="bot" size={16} className="text-purple-500 mb-1" />
                <p className="text-xs font-bold text-[var(--text-primary)]">AI Assistant</p>
                <p className="text-[10px] text-[var(--text-muted)]">Plan & organize</p>
              </button>

              <button
                onClick={() => {
                  window.audioService.playButtonTap();
                  setActiveTab('projects');
                }}
                className="p-3 rounded-2xl liquid-glass-subtle hover:border-indigo-500/40 text-left transition-all active:scale-95"
              >
                <Icon name="folder-kanban" size={16} className="text-indigo-500 mb-1" />
                <p className="text-xs font-bold text-[var(--text-primary)]">Projects</p>
                <p className="text-[10px] text-[var(--text-muted)]">Deliverables</p>
              </button>
            </div>
          </div>

          {/* Upcoming Deadlines Widget */}
          <div className="liquid-glass rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icon name="clock" size={15} className="text-rose-500" /> Upcoming Deadlines
              </h3>
              <button
                onClick={() => {
                  window.audioService.playButtonTap();
                  setActiveTab('calendar');
                }}
                className="text-xs text-blue-500 hover:text-blue-600 font-semibold"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-2">
              {upcomingDeadlines.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)] italic py-2">No pressing deadlines this week.</p>
              ) : (
                upcomingDeadlines.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-xl liquid-glass-subtle flex items-center justify-between border border-white/5">
                    <div className="overflow-hidden pr-2">
                      <p className="text-xs font-bold text-[var(--text-primary)] truncate">{t.title}</p>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">{t.category}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30 shrink-0">
                      Due {t.deadline === todayStr ? 'Today' : t.deadline}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
