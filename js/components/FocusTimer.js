// Taskio - Apple Liquid Glass Focus & Pomodoro Time Tracker

const FocusTimer = ({
  state,
  activeTimerId,
  onToggleTimer,
  onUpdatePomodoroSettings,
  onCompletePomodoroSession
}) => {
  const [mode, setMode] = React.useState('work');
  const [timeLeft, setTimeLeft] = React.useState(state.pomodoro.workDuration * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState('');
  const [showSettings, setShowSettings] = React.useState(false);

  const [workMins, setWorkMins] = React.useState(state.pomodoro.workDuration);
  const [shortMins, setShortMins] = React.useState(state.pomodoro.shortBreakDuration);
  const [longMins, setLongMins] = React.useState(state.pomodoro.longBreakDuration);

  React.useEffect(() => {
    let duration = state.pomodoro.workDuration;
    if (mode === 'shortBreak') duration = state.pomodoro.shortBreakDuration;
    if (mode === 'longBreak') duration = state.pomodoro.longBreakDuration;
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [mode, state.pomodoro]);

  React.useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      window.audioService.playTimerComplete();
      if (mode === 'work') {
        onCompletePomodoroSession(selectedTaskId);
        setMode('shortBreak');
      } else {
        setMode('work');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const togglePomodoro = () => {
    if (!isRunning) {
      window.audioService.playTimerStart();
    } else {
      window.audioService.playButtonTap();
    }
    setIsRunning(!isRunning);
  };

  const resetPomodoro = () => {
    window.audioService.playButtonTap();
    setIsRunning(false);
    let duration = state.pomodoro.workDuration;
    if (mode === 'shortBreak') duration = state.pomodoro.shortBreakDuration;
    if (mode === 'longBreak') duration = state.pomodoro.longBreakDuration;
    setTimeLeft(duration * 60);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    window.audioService.playButtonTap();
    onUpdatePomodoroSettings({
      workDuration: parseInt(workMins) || 25,
      shortBreakDuration: parseInt(shortMins) || 5,
      longBreakDuration: parseInt(longMins) || 15
    });
    setShowSettings(false);
  };

  const totalDuration = mode === 'work'
    ? state.pomodoro.workDuration * 60
    : mode === 'shortBreak'
    ? state.pomodoro.shortBreakDuration * 60
    : state.pomodoro.longBreakDuration * 60;

  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter(t => t.date === todayStr);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Focus & Time Management
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Apple visionOS inspired circular glass focus tracker & task stopwatch.
          </p>
        </div>

        <button
          onClick={() => {
            window.audioService.playButtonTap();
            setShowSettings(true);
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Icon name="settings" size={15} /> <span>Timer Settings</span>
        </button>
      </div>

      {/* Main Circular Glass Focus Display */}
      <div className="liquid-glass-elevated rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center space-y-7 relative overflow-hidden shadow-2xl">
        {/* Soft specular light arc */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Interval Mode Selector Pill */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl liquid-glass-subtle">
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              setMode('work');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'work' ? 'bg-rose-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              setMode('shortBreak');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              setMode('longBreak');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'longBreak' ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* VisionOS Circular Liquid Gauge */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
            {/* Background Frosted Ring */}
            <circle
              cx="130" cy="130" r={radius}
              stroke="rgba(120, 120, 128, 0.2)"
              strokeWidth="10"
              fill="none"
            />
            {/* Glowing Gradient Liquid Arc */}
            <circle
              cx="130" cy="130" r={radius}
              stroke={mode === 'work' ? '#FF2D55' : mode === 'shortBreak' ? '#34C759' : '#0071E3'}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          </svg>

          {/* Centered Numbers */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tight tabular-nums text-[var(--text-primary)]">
              {timeFormatted}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mt-1.5">
              {mode === 'work' ? 'Deep Work Interval' : 'Mindful Pause'}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">
              Completed #{state.pomodoro.sessionsCompleted}
            </span>
          </div>
        </div>

        {/* Link to Task */}
        <div className="w-full max-w-sm space-y-1.5 text-center">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Link to Scheduled Task</label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
          >
            <option value="">General Focus (No specific task)</option>
            {state.tasks.filter(t => !t.completed).map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={resetPomodoro}
            className="p-3.5 rounded-2xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="Reset Timer"
          >
            <Icon name="rotateccw" size={18} />
          </button>

          <button
            onClick={togglePomodoro}
            className={`px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center space-x-2 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25'
                : mode === 'work'
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
            }`}
          >
            <Icon name={isRunning ? 'pause' : 'play'} size={18} />
            <span>{isRunning ? 'Pause Session' : 'Start Focus'}</span>
          </button>
        </div>
      </div>

      {/* Task Stopwatch List */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="timer" size={18} className="text-rose-500" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Task Stopwatches
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)] italic">
            Single active timer policy enforced
          </span>
        </div>

        <div className="space-y-2.5">
          {todayTasks.filter(t => !t.completed).length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic py-4 text-center">
              All tasks for today are completed or no tasks scheduled.
            </p>
          ) : (
            todayTasks.filter(t => !t.completed).map(t => {
              const isRunning = activeTimerId === t.id;
              const mins = Math.floor((t.timeSpent || 0) / 60);
              const secs = (t.timeSpent || 0) % 60;
              const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

              return (
                <div
                  key={t.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isRunning
                      ? 'bg-rose-500/10 border-rose-500/30 shadow-sm apple-active-pulse'
                      : 'liquid-glass-subtle'
                  }`}
                >
                  <div className="overflow-hidden pr-3">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{t.title}</p>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">{t.category} • {t.priority}</span>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="font-mono text-sm font-bold text-[var(--text-primary)] tabular-nums">
                      {formatted}
                    </span>
                    <button
                      onClick={() => {
                        window.audioService.playTimerStart();
                        onToggleTimer(t.id);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 active:scale-95 ${
                        isRunning
                          ? 'bg-rose-600 text-white'
                          : 'liquid-glass-button text-[var(--text-primary)] hover:text-rose-500'
                      }`}
                    >
                      <Icon name={isRunning ? 'pause' : 'play'} size={13} />
                      <span>{isRunning ? 'Pause' : 'Track'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Settings Modal Sheet */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 glass-modal-backdrop" onClick={() => setShowSettings(false)}></div>
          <div className="relative w-full max-w-md liquid-glass-elevated rounded-3xl p-6 space-y-5 z-10 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Custom Pomodoro Durations
              </h3>
              <button onClick={() => setShowSettings(false)} className="p-1 rounded-lg text-[var(--text-muted)]">
                <Icon name="x" size={17} />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Work Interval (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={workMins}
                  onChange={(e) => setWorkMins(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl liquid-glass-subtle text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Short Break (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={shortMins}
                  onChange={(e) => setShortMins(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl liquid-glass-subtle text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Long Break (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={longMins}
                  onChange={(e) => setLongMins(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl liquid-glass-subtle text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

window.FocusTimer = FocusTimer;
