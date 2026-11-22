// Taskio - Apple Liquid Glass Task Creation & Editing Modal

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
  defaultDate,
  defaultProjectId,
  projects
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(defaultDate || new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = React.useState('09:00');
  const [endTime, setEndTime] = React.useState('10:00');
  const [deadline, setDeadline] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');
  const [category, setCategory] = React.useState('Deep Work');
  const [projectId, setProjectId] = React.useState(defaultProjectId || '');
  const [notes, setNotes] = React.useState('');
  const [subtasks, setSubtasks] = React.useState([]);
  const [newSubtaskInput, setNewSubtaskInput] = React.useState('');

  React.useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setDate(taskToEdit.date || new Date().toISOString().slice(0, 10));
      setStartTime(taskToEdit.startTime || '09:00');
      setEndTime(taskToEdit.endTime || '10:00');
      setDeadline(taskToEdit.deadline || '');
      setPriority(taskToEdit.priority || 'Medium');
      setCategory(taskToEdit.category || 'Deep Work');
      setProjectId(taskToEdit.projectId || '');
      setNotes(taskToEdit.notes || '');
      setSubtasks(taskToEdit.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setDate(defaultDate || new Date().toISOString().slice(0, 10));
      setStartTime('09:00');
      setEndTime('10:00');
      setDeadline(defaultDate || new Date().toISOString().slice(0, 10));
      setPriority('Medium');
      setCategory('Deep Work');
      setProjectId(defaultProjectId || '');
      setNotes('');
      setSubtasks([]);
    }
  }, [taskToEdit, defaultDate, defaultProjectId, isOpen]);

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    const val = newSubtaskInput.trim();
    if (val) {
      window.audioService.playTaskCreate();
      setSubtasks([...subtasks, { id: 'st-' + Date.now(), title: val, completed: false }]);
      setNewSubtaskInput('');
    }
  };

  const handleRemoveSubtask = (id) => {
    window.audioService.playTaskDelete();
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    window.audioService.playTaskCreate();

    onSave({
      ...(taskToEdit || {}),
      id: taskToEdit ? taskToEdit.id : 'task-' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      date,
      startTime,
      endTime,
      deadline: deadline || date,
      priority,
      category,
      projectId: projectId || null,
      notes: notes.trim(),
      subtasks,
      completed: taskToEdit ? taskToEdit.completed : false,
      completedAt: taskToEdit ? taskToEdit.completedAt : null,
      timeSpent: taskToEdit ? taskToEdit.timeSpent : 0,
      timerRunning: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 glass-modal-backdrop" onClick={onClose}></div>
      <div className="relative w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-5 z-10 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            {taskToEdit ? 'Edit Task Details' : 'Create New Routine Task'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Icon name="x" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Task Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Conduct usability research on onboarding"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-3.5 py-2.5 rounded-xl liquid-glass-subtle text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Description</label>
            <textarea
              rows="2"
              placeholder="Add key objectives or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
              >
                {window.PLANNER_CONSTANTS.CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
              >
                <option value="">No Project (Standalone)</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-white/10">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Checklist / Subtasks</label>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {subtasks.map((st) => (
                <div key={st.id} className="flex items-center justify-between p-2 rounded-xl liquid-glass-subtle text-xs">
                  <span>{st.title}</span>
                  <button type="button" onClick={() => handleRemoveSubtask(st.id)} className="text-[var(--text-muted)] hover:text-rose-500">
                    <Icon name="x" size={13} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add subtask..."
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubtask(); } }}
                className="flex-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Notes & Documentation</label>
            <textarea
              rows="2"
              placeholder="Reflections, blockers, or links..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.TaskModal = TaskModal;
