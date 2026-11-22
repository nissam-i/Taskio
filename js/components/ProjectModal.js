// Taskio - Apple Liquid Glass Project Creation & Editing Modal

const ProjectModal = ({
  isOpen,
  onClose,
  onSave,
  projectToEdit
}) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [finalDeadline, setFinalDeadline] = React.useState('');
  const [priority, setPriority] = React.useState('High');
  const [status, setStatus] = React.useState('In Progress');
  const [color, setColor] = React.useState('purple');
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name || '');
      setDescription(projectToEdit.description || '');
      setStartDate(projectToEdit.startDate || new Date().toISOString().slice(0, 10));
      setFinalDeadline(projectToEdit.finalDeadline || '');
      setPriority(projectToEdit.priority || 'High');
      setStatus(projectToEdit.status || 'In Progress');
      setColor(projectToEdit.color || 'purple');
      setNotes(projectToEdit.notes || '');
    } else {
      setName('');
      setDescription('');
      setStartDate(new Date().toISOString().slice(0, 10));
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 14);
      setFinalDeadline(targetDate.toISOString().slice(0, 10));
      setPriority('High');
      setStatus('In Progress');
      setColor('purple');
      setNotes('');
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    window.audioService.playTaskCreate();

    onSave({
      ...(projectToEdit || {}),
      id: projectToEdit ? projectToEdit.id : 'proj-' + Date.now(),
      name: name.trim(),
      description: description.trim(),
      startDate,
      finalDeadline: finalDeadline || startDate,
      priority,
      status,
      color,
      icon: 'folder-kanban',
      notes: notes.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 glass-modal-backdrop" onClick={onClose}></div>
      <div className="relative w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-5 z-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            {projectToEdit ? 'Edit Project Initiative' : 'Create New Project'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Icon name="x" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mobile Application V2 Launch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3.5 py-2.5 rounded-xl liquid-glass-subtle text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Strategic Goal & Scope</label>
            <textarea
              rows="2"
              placeholder="Outline deliverables and impact criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Start Date</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Final Deadline</label>
              <input
                type="date"
                required
                value={finalDeadline}
                onChange={(e) => setFinalDeadline(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
              >
                {window.PLANNER_CONSTANTS.PROJECT_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Notes & Documentation Links</label>
            <textarea
              rows="2"
              placeholder="Design tokens, repository link, team contacts..."
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
              {projectToEdit ? 'Save Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.ProjectModal = ProjectModal;
