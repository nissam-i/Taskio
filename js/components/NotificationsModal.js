// Taskio - Apple Liquid Glass In-App Notification Center Drawer

const NotificationsModal = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 glass-modal-backdrop" onClick={onClose}></div>
      <div className="relative w-full max-w-sm sm:max-w-md liquid-glass-elevated border-l border-white/20 shadow-2xl h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="bell" size={18} className="text-blue-500" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Notifications & Reminders
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>{notifications.filter(n => !n.read).length} unread updates</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                window.audioService.playButtonTap();
                onMarkAllAsRead();
              }}
              className="text-blue-500 hover:underline font-semibold"
            >
              Mark all read
            </button>
            <button
              onClick={() => {
                window.audioService.playTaskDelete();
                onClearAll();
              }}
              className="text-rose-500 hover:underline font-semibold"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)] space-y-2">
              <Icon name="bell" size={28} className="mx-auto text-[var(--text-muted)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">All caught up</p>
              <p className="text-xs">No pending reminders right now.</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const iconMap = {
                achievement: { name: 'trophy', color: 'text-amber-500', bg: 'bg-amber-500/15' },
                deadline: { name: 'shield-alert', color: 'text-rose-500', bg: 'bg-rose-500/15' },
                reminder: { name: 'clock', color: 'text-blue-500', bg: 'bg-blue-500/15' },
                system: { name: 'sparkles', color: 'text-purple-500', bg: 'bg-purple-500/15' }
              };
              const config = iconMap[notif.type] || iconMap.system;

              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                    notif.read
                      ? 'liquid-glass-subtle opacity-70'
                      : 'liquid-glass border-white/20 shadow-xs'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${config.bg} ${config.color} shrink-0 mt-0.5`}>
                    <Icon name={config.name} size={16} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                      {notif.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                      {notif.timestamp ? new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

window.NotificationsModal = NotificationsModal;
