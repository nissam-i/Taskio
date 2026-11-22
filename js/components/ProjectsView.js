// Taskio - Apple Liquid Glass Project Management Section

const ProjectsView = ({
  state,
  onOpenProjectModal,
  onEditProject,
  onDeleteProject,
  onToggleTaskComplete,
  onOpenTaskModal
}) => {
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [statusFilter, setStatusFilter] = React.useState('All');

  const todayStr = new Date().toISOString().slice(0, 10);

  const filteredProjects = state.projects.filter(p => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  const selectedProject = state.projects.find(p => p.id === selectedProjectId);
  const selectedProjectTasks = selectedProject
    ? state.tasks.filter(t => t.projectId === selectedProject.id)
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header & Controls */}
      <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Project Deliverables
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Track strategic initiatives, milestone velocity, and completion deadlines.
          </p>
        </div>

        <button
          onClick={() => {
            window.audioService.playButtonTap();
            onOpenProjectModal();
          }}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          <Icon name="plus" size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['All', 'In Progress', 'Completed', 'On Hold', 'Not Started'].map((st) => (
          <button
            key={st}
            onClick={() => {
              window.audioService.playButtonTap();
              setStatusFilter(st);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === st
                ? 'bg-blue-600 text-white shadow-sm'
                : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const pTasks = state.tasks.filter(t => t.projectId === project.id);
          const completedCount = pTasks.filter(t => t.completed).length;
          const totalCount = pTasks.length;
          const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          const totalSeconds = pTasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
          const hours = (totalSeconds / 3600).toFixed(1);

          let countdownText = 'No deadline';
          let isOverdue = false;
          if (project.finalDeadline) {
            const diffDays = Math.ceil((new Date(project.finalDeadline) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
            if (diffDays < 0) {
              countdownText = `${Math.abs(diffDays)}d overdue`;
              isOverdue = true;
            } else if (diffDays === 0) {
              countdownText = 'Due today!';
            } else {
              countdownText = `${diffDays} days left`;
            }
          }

          return (
            <div
              key={project.id}
              className="liquid-glass-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Icon, Status, Priority */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl liquid-glass-subtle flex items-center justify-center text-blue-500 border border-white/10 shadow-sm">
                    <Icon name={project.icon || 'folder-kanban'} size={20} />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      project.status === 'Completed'
                        ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                        : project.status === 'Overdue'
                        ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                        : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)]">
                      {project.priority}
                    </span>
                  </div>
                </div>

                {/* Project Title & Description */}
                <div>
                  <h3
                    className="text-lg font-bold text-[var(--text-primary)] hover:text-blue-500 cursor-pointer transition-colors"
                    onClick={() => {
                      window.audioService.playButtonTap();
                      setSelectedProjectId(project.id);
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                    {project.description || 'No description provided.'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--text-secondary)]">Milestone Progress</span>
                    <span className="font-mono font-bold text-[var(--text-primary)] tabular-nums">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Bottom Meta & Actions */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono tabular-nums text-[var(--text-muted)]">
                  <span className="flex items-center gap-1 font-sans">
                    <Icon name="check-circle-2" size={13} className="text-emerald-500" /> {completedCount}/{totalCount} tasks
                  </span>
                  <span className={`flex items-center gap-1 ${isOverdue ? 'text-rose-500 font-bold' : ''}`}>
                    <Icon name="clock" size={13} /> {countdownText}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="timer" size={13} className="text-purple-500" /> {hours}h
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      window.audioService.playButtonTap();
                      setSelectedProjectId(project.id);
                    }}
                    className="text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    Open Tasks ({pTasks.length}) <Icon name="arrow-right" size={12} />
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        window.audioService.playButtonTap();
                        onEditProject(project);
                      }}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10"
                      title="Edit Project"
                    >
                      <Icon name="edit3" size={14} />
                    </button>
                    <button
                      onClick={() => {
                        window.audioService.playTaskDelete();
                        onDeleteProject(project.id);
                      }}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-white/10"
                      title="Delete Project"
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

      {/* Project Detail Glass Modal Sheet */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 glass-modal-backdrop" onClick={() => setSelectedProjectId(null)}></div>
          <div className="relative w-full max-w-2xl liquid-glass-elevated rounded-3xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)]">
                    {selectedProject.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Deadline: {selectedProject.finalDeadline}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                  {selectedProject.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  {selectedProject.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            {selectedProject.notes && (
              <div className="p-4 rounded-2xl liquid-glass-subtle text-xs text-[var(--text-secondary)]">
                <span className="font-semibold block text-[var(--text-primary)] mb-1">Project Notes:</span>
                {selectedProject.notes}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[var(--text-primary)]">
                  Project Tasks ({selectedProjectTasks.length})
                </h4>
                <button
                  onClick={() => {
                    window.audioService.playButtonTap();
                    onOpenTaskModal(todayStr, selectedProject.id);
                  }}
                  className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-95 transition-all"
                >
                  <Icon name="plus" size={13} /> <span>Add Task</span>
                </button>
              </div>

              {selectedProjectTasks.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)] italic py-4 text-center">
                  No tasks linked to this project yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedProjectTasks.map(t => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-2xl liquid-glass-subtle flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => {
                            window.audioService.playCheckbox();
                            onToggleTaskComplete(t.id);
                          }}
                          className="apple-checkbox"
                        />
                        <span className={`text-sm font-medium truncate ${t.completed ? 'apple-task-completed' : 'text-[var(--text-primary)]'}`}>
                          {t.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-muted)]">
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.ProjectsView = ProjectsView;
