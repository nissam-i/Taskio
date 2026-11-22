// Taskio - Apple Liquid Glass Settings & Audio Feedback Modal

const SettingsModal = ({
  isOpen,
  onClose,
  state,
  onUpdateSettings,
  onExportData,
  onImportData,
  onResetSampleData
}) => {
  const [userName, setUserName] = React.useState(state.user.name || '');
  const [userTitle, setUserTitle] = React.useState(state.user.title || '');
  const [dailyGoalTasks, setDailyGoalTasks] = React.useState(state.user.dailyGoalTasks || 5);
  const [dailyGoalHours, setDailyGoalHours] = React.useState(state.user.dailyGoalHours || 4);
  const [theme, setTheme] = React.useState(state.theme || 'dark');

  // Sound settings
  const initialSound = state.soundSettings || {
    masterEnabled: state.enableSound !== false,
    volume: 0.75,
    interfaceSounds: true,
    notificationSounds: true
  };
  const [soundMaster, setSoundMaster] = React.useState(initialSound.masterEnabled);
  const [volume, setVolume] = React.useState(initialSound.volume || 0.75);
  const [interfaceSounds, setInterfaceSounds] = React.useState(initialSound.interfaceSounds !== false);
  const [notificationSounds, setNotificationSounds] = React.useState(initialSound.notificationSounds !== false);

  const [geminiApiKey, setGeminiApiKey] = React.useState(state.user.geminiApiKey || '');
  const [showApiKey, setShowApiKey] = React.useState(false);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setUserName(state.user.name || '');
      setUserTitle(state.user.title || '');
      setDailyGoalTasks(state.user.dailyGoalTasks || 5);
      setDailyGoalHours(state.user.dailyGoalHours || 4);
      setTheme(state.theme || 'dark');

      const s = state.soundSettings || {
        masterEnabled: state.enableSound !== false,
        volume: 0.75,
        interfaceSounds: true,
        notificationSounds: true
      };
      setSoundMaster(s.masterEnabled);
      setVolume(s.volume);
      setInterfaceSounds(s.interfaceSounds);
      setNotificationSounds(s.notificationSounds);
      setGeminiApiKey(state.user.geminiApiKey || '');
    }
  }, [isOpen, state]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    window.audioService.playButtonTap();

    // Sync AudioService instance
    window.audioService.masterEnabled = soundMaster;
    window.audioService.volume = volume;
    window.audioService.interfaceSoundsEnabled = interfaceSounds;
    window.audioService.notificationSoundsEnabled = notificationSounds;

    onUpdateSettings({
      user: {
        ...state.user,
        name: userName.trim() || 'Friend',
        title: userTitle.trim() || 'Productivity Practitioner',
        dailyGoalTasks: parseInt(dailyGoalTasks) || 5,
        dailyGoalHours: parseInt(dailyGoalHours) || 4,
        geminiApiKey: geminiApiKey.trim()
      },
      theme,
      enableSound: soundMaster,
      soundSettings: {
        masterEnabled: soundMaster,
        volume,
        interfaceSounds,
        notificationSounds
      }
    });
    onClose();
  };

  const handleTestSound = () => {
    window.audioService.masterEnabled = soundMaster;
    window.audioService.volume = volume;
    window.audioService.interfaceSoundsEnabled = interfaceSounds;
    window.audioService.notificationSoundsEnabled = notificationSounds;
    window.audioService.playStreakAchievement();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          onImportData(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 glass-modal-backdrop" onClick={onClose}></div>
      <div className="relative w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-5 z-10 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Icon name="settings" size={20} className="text-blue-500" />
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              Settings & Preferences
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Icon name="x" size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* User Profile */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Profile
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Role / Subtitle</label>
                <input
                  type="text"
                  value={userTitle}
                  onChange={(e) => setUserTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Daily Goals
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Target Tasks / Day</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={dailyGoalTasks}
                  onChange={(e) => setDailyGoalTasks(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Target Focus Hours</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={dailyGoalHours}
                  onChange={(e) => setDailyGoalHours(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
                />
              </div>
            </div>
          </div>

          {/* Theme Switcher: Apple Liquid Glass */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Liquid Glass Appearance
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center space-x-2 ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon name="moon" size={15} />
                <span>Obsidian Dark Mode 🌙</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center space-x-2 ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon name="sun" size={15} />
                <span>Frosted Light Mode ☀️</span>
              </button>
            </div>
          </div>

          {/* Premium Audio & Haptics Feedback Controls */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Sound Effects & Audio Feedback
              </h4>
              <button
                type="button"
                onClick={handleTestSound}
                className="text-[11px] font-semibold text-blue-500 hover:text-blue-400"
              >
                Test Sound Chime 🎵
              </button>
            </div>

            {/* Master Sound Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl liquid-glass-subtle">
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Master Audio</p>
                <p className="text-[10px] text-[var(--text-muted)]">Enable all synthesized acoustic effects</p>
              </div>
              <input
                type="checkbox"
                checked={soundMaster}
                onChange={(e) => setSoundMaster(e.target.checked)}
                className="apple-checkbox"
              />
            </div>

            {/* Volume Slider */}
            {soundMaster && (
              <div className="p-3 rounded-2xl liquid-glass-subtle space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-secondary)]">Master Volume</span>
                  <span className="font-mono text-xs text-[var(--text-primary)] tabular-nums">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    const newVol = parseFloat(e.target.value);
                    setVolume(newVol);
                    window.audioService.volume = newVol;
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            )}

            {/* Separate Channel Toggles */}
            {soundMaster && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center space-x-2 p-2 rounded-xl liquid-glass-subtle cursor-pointer">
                  <input
                    type="checkbox"
                    checked={interfaceSounds}
                    onChange={(e) => setInterfaceSounds(e.target.checked)}
                    className="apple-checkbox w-4 h-4"
                  />
                  <span className="text-[11px] font-medium text-[var(--text-secondary)]">Interface & Clicks</span>
                </label>

                <label className="flex items-center space-x-2 p-2 rounded-xl liquid-glass-subtle cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSounds}
                    onChange={(e) => setNotificationSounds(e.target.checked)}
                    className="apple-checkbox w-4 h-4"
                  />
                  <span className="text-[11px] font-medium text-[var(--text-secondary)]">Notifications & Chimes</span>
                </label>
              </div>
            )}
          </div>

          {/* Gemini API Key */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Google Gemini API Key (Free Tier)
              </label>
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-[11px] text-blue-500 hover:underline"
              >
                {showApiKey ? 'Hide' : 'Reveal'}
              </button>
            </div>
            <input
              type={showApiKey ? 'text' : 'password'}
              placeholder="AIzaSy... (Leave blank to use built-in local heuristic coach)"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs font-mono text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          {/* Backup & Persistence */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Data Management & Backup
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onExportData()}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <Icon name="download" size={13} />
                <span>Export JSON Backup</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <Icon name="upload" size={13} />
                <span>Import Backup</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={onResetSampleData}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
              >
                <Icon name="rotateccw" size={13} />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-white/10">
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
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.SettingsModal = SettingsModal;
