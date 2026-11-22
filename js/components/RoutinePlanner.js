// Taskio - Apple Liquid Glass Daily Routine Planner

const RoutinePlanner = ({
  state,
  selectedDate,
  setSelectedDate,
  onOpenTaskModal,
  onEditTask,
  onDeleteTask,
  onDuplicateTask,
  onRescheduleTask,
  onToggleTaskComplete,
  onToggleSubtask,
  onAddSubtask,
  onToggleTimer,
  activeTimerId,
  onClearDayTasks,
  onStartFresh
}) => {
  const [filterCategory, setFilterCategory] = React.useState('All');
  const [filterPriority, setFilterPriority] = React.useState('All');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState('timeline');
  const [newSubtaskInputs, setNewSubtaskInputs] = React.useState({});

  const handlePrevDay = () => {
    window.audioService.playButtonTap();
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const handleNextDay = () => {
    window.audioService.playButtonTap();
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const handleTodayJump = () => {
    window.audioService.playButtonTap();
    setSelectedDate(new Date().toISOString().slice(0, 10));
  };

  // Filter tasks for the selected date
  const dayTasks = state.tasks.filter((t) => {
    if (t.date !== selectedDate) return false;
    if (filterCategory !== 'All' && t.category !== filterCategory) return false;
    if (filterPriority !== 'All' && t.priority !== filterPriority) return false;
    if (filterStatus === 'pending' && t.completed) return false;
    if (filterStatus === 'completed' && !t.completed) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = (t.description || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  const sortedTasks = [...dayTasks].sort((a, b) => {
    const timeA = a.startTime || '99:99';
    const timeB = b.startTime || '99:99';
    return timeA.localeCompare(timeB);
  });

  const completedCount = sortedTasks.filter(t => t.completed).length;
  const progressPercent = sortedTasks.length > 0 ? Math.round((completedCount / sortedTasks.length) * 100) : 0;

  const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const isToday = selectedDate === new Date().toISOString().slice(0, 10);

  const handleSubtaskKeyDown = (taskId, e) => {
    if (e.key === 'Enter') {
      const val = (newSubtaskInputs[taskId] || '').trim();
      if (val) {
        window.audioService.playTaskCreate();
        onAddSubtask(taskId, val);
        setNewSubtaskInputs(prev => ({ ...prev, [taskId]: '' }));
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* 1. Glass Header & Date Navigation */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)] font-mono">
                Routine Timeline
              </span>
              {isToday && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                  Today
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              {formattedDate}
            </h2>
          </div>

          {/* Date Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              title="Previous Day"
            >
              <Icon name="chevron-left" size={17} />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl liquid-glass-subtle text-xs font-mono font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleNextDay}
              className="p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              title="Next Day"
            >
              <Icon name="chevron-right" size={17} />
            </button>
            {!isToday && (
              <button
                onClick={handleTodayJump}
                className="px-3.5 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Jump to Today
              </button>
            )}
          </div>
        </div>

        {/* Daily Progress Ribbon */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[var(--text-primary)] font-mono tabular-nums">
              {completedCount} of {sortedTasks.length} Completed
            </span>
            <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="font-mono font-bold text-emerald-500 tabular-nums">
              {progressPercent}%
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                setViewMode('timeline');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'timeline' ? 'bg-blue-600 text-white shadow-sm' : 'liquid-glass-subtle text-[var(--text-secondary)]'
              }`}
            >
              Timeline Ribbon
            </button>
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                setViewMode('cards');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'cards' ? 'bg-blue-600 text-white shadow-sm' : 'liquid-glass-subtle text-[var(--text-secondary)]'
              }`}
            >
              Cards Grid
            </button>
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                onOpenTaskModal(selectedDate);
              }}
              className="flex items-center space-x-1 px-3.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm ml-2 active:scale-95 transition-all"
            >
              <Icon name="plus" size={13} /> <span>Add Task</span>
            </button>
            {/* Clear Day */}
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                onClearDayTasks(selectedDate);
              }}
              title="Delete all tasks for this day"
              className="flex items-center space-x-1 px-3 py-1 rounded-xl liquid-glass-button text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 active:scale-95 transition-all"
            >
              <Icon name="trash-2" size={13} /> <span>Clear Day</span>
            </button>
            {/* Start Fresh */}
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                onStartFresh();
              }}
              title="Wipe all data and start a blank fresh Taskio"
              className="flex items-center space-x-1 px-3 py-1 rounded-xl liquid-glass-button text-xs font-semibold text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 border border-orange-500/20 active:scale-95 transition-all"
            >
              <Icon name="refresh-cw" size={13} /> <span>Start Fresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Frosted Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl liquid-glass">
        <div className="flex items-center space-x-1.5">
          {['all', 'pending', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => {
                window.audioService.playButtonTap();
                setFilterStatus(st);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 rounded-xl liquid-glass-subtle text-xs text-[var(--text-secondary)] focus:outline-none"
          >
            <option value="All">All Categories</option>
            {window.PLANNER_CONSTANTS.CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1 rounded-xl liquid-glass-subtle text-xs text-[var(--text-secondary)] focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Filter tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-3 py-1 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none w-36 sm:w-44"
            />
            <span className="absolute left-2.5 top-1.5 text-[var(--text-muted)]">
              <Icon name="search" size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Task List: Liquid Glass Cards */}
      {sortedTasks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl liquid-glass space-y-3">
          <div className="w-12 h-12 rounded-2xl liquid-glass-subtle text-[var(--text-muted)] flex items-center justify-center mx-auto">
            <Icon name="sunrise" size={24} />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            A Clean Canvas for {formattedDate}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
            No tasks found with current filters. Create an intentional schedule for this day.
          </p>
          <button
            onClick={() => {
              window.audioService.playButtonTap();
              onOpenTaskModal(selectedDate);
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
          >
            <Icon name="plus" size={14} /> <span>Create New Task</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => {
            const project = state.projects.find(p => p.id === task.projectId);
            const isRunning = activeTimerId === task.id;
            const completedSubtasks = (task.subtasks || []).filter(s => s.completed).length;
            const totalSubtasks = (task.subtasks || []).length;

            return (
              <div
                key={task.id}
                className={`p-5 rounded-3xl transition-all relative overflow-hidden ${
                  task.completed
                    ? 'liquid-glass-subtle opacity-75'
                    : isRunning
                    ? 'liquid-glass-elevated border-rose-500/40 apple-active-pulse'
                    : 'liquid-glass-card'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        window.audioService.playCheckbox();
                        onToggleTaskComplete(task.id);
                      }}
                      className="apple-checkbox mt-1"
                      aria-label={`Mark task ${task.title} as completed`}
                    />

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`text-base font-bold leading-snug break-words ${task.completed ? 'apple-task-completed' : 'text-[var(--text-primary)]'}`}>
                          {task.title}
                        </h3>

                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                          task.priority === 'Urgent'
                            ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                            : task.priority === 'High'
                            ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                        }`}>
                          {task.priority}
                        </span>

                        <span className="text-[11px] px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)] font-medium flex items-center gap-1 shrink-0">
                          <Icon name="tag" size={11} /> {task.category}
                        </span>

                        {project && (
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/30 font-medium flex items-center gap-1 shrink-0">
                            <Icon name="folder-kanban" size={11} /> {project.name}
                          </span>
                        )}
                      </div>

                      {task.description && (
                        <p className={`text-xs leading-relaxed ${task.completed ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-secondary)]'}`}>
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[var(--text-muted)] font-mono tabular-nums">
                        {task.startTime && task.endTime && (
                          <span className="flex items-center gap-1 liquid-glass-subtle px-2 py-0.5 rounded-lg border border-white/10">
                            <Icon name="clock" size={12} className="text-amber-500" /> {task.startTime} – {task.endTime}
                          </span>
                        )}
                        {task.deadline && (
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-lg ${task.deadline < selectedDate && !task.completed ? 'text-rose-500 bg-rose-500/15 font-bold border border-rose-500/30' : ''}`}>
                            <Icon name="alert-circle" size={12} /> Deadline: {task.deadline}
                          </span>
                        )}
                        {task.timeSpent > 0 && (
                          <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                            <Icon name="timer" size={12} className="text-blue-500" /> Logged: {Math.floor(task.timeSpent / 60)}m
                          </span>
                        )}
                      </div>

                      {/* Subtasks Checklist */}
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                        {totalSubtasks > 0 && (
                          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium mb-1">
                            <span>Checklist ({completedSubtasks}/{totalSubtasks})</span>
                            <div className="w-24 bg-white/10 rounded-full h-1 overflow-hidden">
                              <div
                                className="bg-emerald-400 h-full rounded-full"
                                style={{ width: `${Math.round((completedSubtasks / totalSubtasks) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          {(task.subtasks || []).map((st) => (
                            <div key={st.id} className="flex items-center space-x-2 text-xs">
                              <input
                                type="checkbox"
                                checked={st.completed}
                                onChange={() => {
                                  window.audioService.playCheckbox();
                                  onToggleSubtask(task.id, st.id);
                                }}
                                className="w-3.5 h-3.5 rounded border-white/20 text-emerald-500 focus:ring-0 cursor-pointer"
                              />
                              <span className={st.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}>
                                {st.title}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                          <Icon name="plus" size={12} className="text-[var(--text-muted)]" />
                          <input
                            type="text"
                            placeholder="Add subtask (press Enter)..."
                            value={newSubtaskInputs[task.id] || ''}
                            onChange={(e) => setNewSubtaskInputs({ ...newSubtaskInputs, [task.id]: e.target.value })}
                            onKeyDown={(e) => handleSubtaskKeyDown(task.id, e)}
                            className="bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Timer */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    {!task.completed && (
                      <button
                        onClick={() => {
                          window.audioService.playTimerStart();
                          onToggleTimer(task.id);
                        }}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                          isRunning
                            ? 'bg-rose-600 text-white shadow-md'
                            : 'liquid-glass-button text-[var(--text-primary)] hover:text-rose-500'
                        }`}
                        title={isRunning ? 'Pause Timer' : 'Start Task Stopwatch'}
                      >
                        <Icon name={isRunning ? 'pause' : 'play'} size={13} />
                        <span>{isRunning ? 'Running' : 'Track'}</span>
                      </button>
                    )}

                    <div className="flex items-center space-x-1 text-[var(--text-muted)]">
                      <button
                        onClick={() => {
                          window.audioService.playButtonTap();
                          onEditTask(task);
                        }}
                        className="p-1.5 rounded-lg hover:text-[var(--text-primary)] hover:bg-white/10"
                        title="Edit Task"
                      >
                        <Icon name="edit3" size={14} />
                      </button>

                      <button
                        onClick={() => {
                          window.audioService.playTaskCreate();
                          onDuplicateTask(task);
                        }}
                        className="p-1.5 rounded-lg hover:text-[var(--text-primary)] hover:bg-white/10"
                        title="Duplicate Task"
                      >
                        <Icon name="copy" size={14} />
                      </button>

                      <button
                        onClick={() => {
                          window.audioService.playButtonTap();
                          onRescheduleTask(task);
                        }}
                        className="p-1.5 rounded-lg hover:text-amber-500 hover:bg-white/10"
                        title="Reschedule to Tomorrow"
                      >
                        <Icon name="calendar" size={14} />
                      </button>

                      <button
                        onClick={() => {
                          window.audioService.playTaskDelete();
                          onDeleteTask(task.id);
                        }}
                        className="p-1.5 rounded-lg hover:text-rose-500 hover:bg-white/10"
                        title="Delete Task"
                      >
                        <Icon name="trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

window.RoutinePlanner = RoutinePlanner;
