// Taskio - Apple Liquid Glass Root Application Controller

const App = () => {
  const [state, setState] = React.useState(() => {
    const loaded = window.storageService.load();
    // Default to dark mode or system preference if not set
    if (!loaded.theme || loaded.theme === 'paper') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      loaded.theme = prefersDark ? 'dark' : 'light';
    }
    return loaded;
  });

  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedDate, setSelectedDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Active Timer state
  const [activeTimerId, setActiveTimerId] = React.useState(null);

  // Modals state
  const [taskModalOpen, setTaskModalOpen] = React.useState(false);
  const [taskToEdit, setTaskToEdit] = React.useState(null);
  const [taskModalDefaultDate, setTaskModalDefaultDate] = React.useState(null);
  const [taskModalDefaultProjectId, setTaskModalDefaultProjectId] = React.useState(null);

  const [projectModalOpen, setProjectModalOpen] = React.useState(false);
  const [projectToEdit, setProjectToEdit] = React.useState(null);

  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = React.useState(false);

  // Toast
  const [toast, setToast] = React.useState(null);

  const showToast = (message, subtext = null) => {
    setToast({ message, subtext });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync state changes to storage
  React.useEffect(() => {
    window.storageService.save(state);
  }, [state]);

  // Sync theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme || 'dark');
  }, [state.theme]);

  // Sync audio engine settings
  React.useEffect(() => {
    if (window.audioService) {
      const sound = state.soundSettings || {
        masterEnabled: state.enableSound !== false,
        volume: 0.75,
        interfaceSounds: true,
        notificationSounds: true
      };
      window.audioService.masterEnabled = sound.masterEnabled;
      window.audioService.volume = sound.volume !== undefined ? sound.volume : 0.75;
      window.audioService.interfaceSoundsEnabled = sound.interfaceSounds !== false;
      window.audioService.notificationSoundsEnabled = sound.notificationSounds !== false;
    }
  }, [state.soundSettings, state.enableSound]);

  // Live Task Stopwatch Interval
  React.useEffect(() => {
    let interval = null;
    if (activeTimerId) {
      interval = setInterval(() => {
        setState(prev => {
          const updatedTasks = prev.tasks.map(t => {
            if (t.id === activeTimerId) {
              return { ...t, timeSpent: (t.timeSpent || 0) + 1 };
            }
            return t;
          });
          return { ...prev, tasks: updatedTasks };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimerId]);

  // Update document title with live ticker if timer is active
  React.useEffect(() => {
    if (activeTimerId) {
      const activeTask = state.tasks.find(t => t.id === activeTimerId);
      if (activeTask) {
        const mins = Math.floor((activeTask.timeSpent || 0) / 60);
        const secs = (activeTask.timeSpent || 0) % 60;
        document.title = `[${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}] ⏱️ ${activeTask.title} | Taskio`;
      }
    } else {
      document.title = 'Taskio — Apple Liquid Glass Productivity Diary';
    }
  }, [activeTimerId, state.tasks]);

  // Handler: Toggle Task Completed
  const handleToggleTaskComplete = (taskId) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    const willBeCompleted = !task.completed;
    const nowISO = new Date().toISOString();
    const taskDate = task.date || nowISO.slice(0, 10);
    const isOverdue = task.deadline && task.deadline < nowISO.slice(0, 10);

    let xpGained = 0;
    if (willBeCompleted) {
      xpGained = window.gamificationService.calculateTaskXP(task, isOverdue);
      window.audioService.playCheckbox();
    }

    setState(prev => {
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            completed: willBeCompleted,
            completedAt: willBeCompleted ? nowISO : null,
            timerRunning: false
          };
        }
        return t;
      });

      const updatedCompletedDates = { ...(prev.gamification.completedDates || {}) };
      if (willBeCompleted) {
        updatedCompletedDates[taskDate] = (updatedCompletedDates[taskDate] || 0) + 1;
      } else {
        updatedCompletedDates[taskDate] = Math.max(0, (updatedCompletedDates[taskDate] || 1) - 1);
      }

      const newXP = Math.max(0, prev.gamification.xp + (willBeCompleted ? xpGained : -25));
      const newLevel = window.gamificationService.getLevelInfo(newXP).level;

      const evalResult = window.gamificationService.evaluateBadges(
        { ...prev, tasks: updatedTasks, gamification: { ...prev.gamification, xp: newXP } },
        willBeCompleted ? { ...task, completed: true, completedAt: nowISO } : null
      );

      const todayStr = new Date().toISOString().slice(0, 10);
      const todayTasks = updatedTasks.filter(t => t.date === todayStr);
      const allTodayDone = todayTasks.length > 0 && todayTasks.every(t => t.completed);

      if (willBeCompleted && allTodayDone) {
        setTimeout(() => {
          window.gamificationService.triggerConfetti();
          window.audioService.playGoalComplete();
        }, 150);
      }

      if (evalResult.newlyUnlocked.length > 0) {
        setTimeout(() => {
          window.gamificationService.triggerConfetti();
          window.audioService.playStreakAchievement();
        }, 200);
      }

      return {
        ...prev,
        tasks: updatedTasks,
        gamification: {
          ...prev.gamification,
          xp: newXP,
          level: newLevel,
          completedDates: updatedCompletedDates,
          badges: evalResult.updatedBadges
        }
      };
    });

    if (activeTimerId === taskId) {
      setActiveTimerId(null);
    }

    if (willBeCompleted) {
      showToast('Task Conquered! ✨', `+${xpGained} XP awarded to your discipline score.`);
    }
  };

  // Handler: Toggle Task Stopwatch
  const handleToggleTimer = (taskId) => {
    if (activeTimerId === taskId) {
      setActiveTimerId(null);
      window.audioService.playButtonTap();
      showToast('Timer Paused', 'Focus duration saved.');
    } else {
      setActiveTimerId(taskId);
      window.audioService.playTimerStart();
      const targetTask = state.tasks.find(t => t.id === taskId);
      showToast('Focus Timer Started ⏱️', `Tracking: "${targetTask?.title || 'Task'}"`);
    }
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          const updatedSubtasks = (t.subtasks || []).map(st => {
            if (st.id === subtaskId) {
              return { ...st, completed: !st.completed };
            }
            return st;
          });
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      })
    }));
  };

  const handleAddSubtask = (taskId, title) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          const newSubtask = { id: 'st-' + Date.now(), title, completed: false };
          return { ...t, subtasks: [...(t.subtasks || []), newSubtask] };
        }
        return t;
      })
    }));
  };

  // Task CRUD operations
  const handleSaveTask = (taskData) => {
    setState(prev => {
      const exists = prev.tasks.some(t => t.id === taskData.id);
      if (exists) {
        return {
          ...prev,
          tasks: prev.tasks.map(t => t.id === taskData.id ? taskData : t)
        };
      }
      return {
        ...prev,
        tasks: [taskData, ...prev.tasks]
      };
    });
    showToast('Task Scheduled', `"${taskData.title}" added to routine.`);
  };

  const handleDeleteTask = (taskId) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (window.confirm(`Delete "${task?.title || 'this task'}"?`)) {
      window.audioService.playTaskDelete();
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      }));
      if (activeTimerId === taskId) setActiveTimerId(null);
      showToast('Task Deleted', 'Removed from your routine.');
    }
  };

  const handleDuplicateTask = (task) => {
    const copy = {
      ...task,
      id: 'task-' + Date.now(),
      title: `${task.title} (Copy)`,
      completed: false,
      completedAt: null,
      timeSpent: 0
    };
    setState(prev => ({ ...prev, tasks: [copy, ...prev.tasks] }));
    showToast('Task Duplicated', `Created a copy of "${task.title}".`);
  };

  const handleRescheduleTask = (task) => {
    const targetDate = new Date(task.date || new Date());
    targetDate.setDate(targetDate.getDate() + 1);
    const newDateStr = targetDate.toISOString().slice(0, 10);
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === task.id ? { ...t, date: newDateStr } : t)
    }));
    showToast('Task Rescheduled', `Moved "${task.title}" to ${newDateStr}.`);
  };

  // Project CRUD
  const handleSaveProject = (projectData) => {
    setState(prev => {
      const exists = prev.projects.some(p => p.id === projectData.id);
      if (exists) {
        return {
          ...prev,
          projects: prev.projects.map(p => p.id === projectData.id ? projectData : p)
        };
      }
      return {
        ...prev,
        projects: [projectData, ...prev.projects]
      };
    });
    showToast('Project Saved', `"${projectData.name}" updated.`);
  };

  const handleDeleteProject = (projectId) => {
    const proj = state.projects.find(p => p.id === projectId);
    if (window.confirm(`Delete project "${proj?.name || 'this project'}" and unlink its tasks?`)) {
      window.audioService.playTaskDelete();
      setState(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projectId),
        tasks: prev.tasks.map(t => t.projectId === projectId ? { ...t, projectId: null } : t)
      }));
      showToast('Project Removed', 'Initiative cleared.');
    }
  };

  // Pomodoro sessions
  const handleCompletePomodoroSession = (linkedTaskId) => {
    setState(prev => {
      let updatedTasks = prev.tasks;
      if (linkedTaskId) {
        updatedTasks = prev.tasks.map(t => {
          if (t.id === linkedTaskId) {
            return { ...t, timeSpent: (t.timeSpent || 0) + (prev.pomodoro.workDuration * 60) };
          }
          return t;
        });
      }
      const newSessions = prev.pomodoro.sessionsCompleted + 1;
      const newXP = prev.gamification.xp + 40;
      return {
        ...prev,
        tasks: updatedTasks,
        pomodoro: {
          ...prev.pomodoro,
          sessionsCompleted: newSessions,
          totalFocusSeconds: prev.pomodoro.totalFocusSeconds + (prev.pomodoro.workDuration * 60)
        },
        gamification: {
          ...prev.gamification,
          xp: newXP
        }
      };
    });
    showToast('Pomodoro Interval Complete! 🍅', '+40 XP earned. Take a refreshing pause.');
  };

  // AI Proposals Application
  const handleApplyAIProposal = (proposal) => {
    if (proposal.action === 'create_tasks') {
      const todayStr = new Date().toISOString().slice(0, 10);
      const newTasks = proposal.tasks.map((t, i) => ({
        id: 'task-' + Date.now() + '-' + i,
        title: t.title,
        description: t.description || 'Generated by Taskio Intelligence',
        date: t.date || todayStr,
        startTime: t.startTime || '10:00',
        endTime: t.endTime || '11:00',
        deadline: t.deadline || todayStr,
        priority: t.priority || 'Medium',
        category: t.category || 'Deep Work',
        projectId: t.projectId || proposal.projectId || null,
        notes: 'Created via AI Coach optimization.',
        subtasks: [],
        completed: false,
        completedAt: null,
        timeSpent: 0,
        timerRunning: false
      }));

      setState(prev => ({
        ...prev,
        tasks: [...newTasks, ...prev.tasks]
      }));

      window.gamificationService.triggerConfetti();
      showToast('AI Plan Applied! ✨', `Added ${newTasks.length} tasks directly to your planner.`);
      setActiveTab('routine');
    }
  };

  // Theme Switching: Dark (Obsidian Glass) <-> Light (Frosted Platinum)
  const handleToggleTheme = () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    setState(prev => ({ ...prev, theme: nextTheme }));
    showToast(`${nextTheme === 'dark' ? 'Obsidian Dark' : 'Frosted Light'} Mode Active`);
  };

  const activeTimerTask = state.tasks.find(t => t.id === activeTimerId);
  const activeTimer = activeTimerTask ? {
    taskId: activeTimerTask.id,
    title: activeTimerTask.title,
    displayTime: `${String(Math.floor((activeTimerTask.timeSpent || 0) / 60)).padStart(2, '0')}:${String((activeTimerTask.timeSpent || 0) % 60).padStart(2, '0')}`
  } : null;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <div className="flex flex-1">
        {/* Apple Glass Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
          state={state}
        />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            state={state}
            activeTimer={activeTimer}
            toggleTimer={handleToggleTimer}
            onOpenTaskModal={() => {
              setTaskToEdit(null);
              setTaskModalDefaultDate(selectedDate);
              setTaskModalDefaultProjectId(null);
              setTaskModalOpen(true);
            }}
            onOpenSettings={() => setSettingsModalOpen(true)}
            onOpenNotifications={() => setNotificationsModalOpen(true)}
            unreadNotificationsCount={state.notifications.filter(n => !n.read).length}
            onToggleTheme={handleToggleTheme}
            onToggleMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {activeTab === 'dashboard' && (
              <Dashboard
                state={state}
                setActiveTab={setActiveTab}
                onOpenTaskModal={() => {
                  setTaskToEdit(null);
                  setTaskModalDefaultDate(selectedDate);
                  setTaskModalOpen(true);
                }}
                onToggleTaskComplete={handleToggleTaskComplete}
                onToggleTimer={handleToggleTimer}
                activeTimerId={activeTimerId}
              />
            )}

            {activeTab === 'routine' && (
              <RoutinePlanner
                state={state}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onOpenTaskModal={(dt) => {
                  setTaskToEdit(null);
                  setTaskModalDefaultDate(dt || selectedDate);
                  setTaskModalDefaultProjectId(null);
                  setTaskModalOpen(true);
                }}
                onEditTask={(task) => {
                  setTaskToEdit(task);
                  setTaskModalOpen(true);
                }}
                onDeleteTask={handleDeleteTask}
                onDuplicateTask={handleDuplicateTask}
                onRescheduleTask={handleRescheduleTask}
                onToggleTaskComplete={handleToggleTaskComplete}
                onToggleSubtask={handleToggleSubtask}
                onAddSubtask={handleAddSubtask}
                onToggleTimer={handleToggleTimer}
                activeTimerId={activeTimerId}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsView
                state={state}
                onOpenProjectModal={() => {
                  setProjectToEdit(null);
                  setProjectModalOpen(true);
                }}
                onEditProject={(proj) => {
                  setProjectToEdit(proj);
                  setProjectModalOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
                onToggleTaskComplete={handleToggleTaskComplete}
                onOpenTaskModal={(dt, pId) => {
                  setTaskToEdit(null);
                  setTaskModalDefaultDate(dt);
                  setTaskModalDefaultProjectId(pId);
                  setTaskModalOpen(true);
                }}
              />
            )}

            {activeTab === 'timer' && (
              <FocusTimer
                state={state}
                activeTimerId={activeTimerId}
                onToggleTimer={handleToggleTimer}
                onUpdatePomodoroSettings={(settings) => {
                  setState(prev => ({
                    ...prev,
                    pomodoro: { ...prev.pomodoro, ...settings }
                  }));
                  showToast('Timer Preferences Updated');
                }}
                onCompletePomodoroSession={handleCompletePomodoroSession}
              />
            )}

            {activeTab === 'calendar' && (
              <CalendarView
                state={state}
                onSelectDate={(dt) => {
                  setSelectedDate(dt);
                  setActiveTab('routine');
                }}
                onOpenTaskModal={(dt) => {
                  setTaskToEdit(null);
                  setTaskModalDefaultDate(dt);
                  setTaskModalOpen(true);
                }}
                onRescheduleTask={handleRescheduleTask}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView state={state} />
            )}

            {activeTab === 'gamification' && (
              <GamificationView state={state} />
            )}

            {activeTab === 'ai' && (
              <AIAssistant
                state={state}
                onApplyAIProposal={handleApplyAIProposal}
                onStartTimerForTask={(taskId) => {
                  setActiveTimerId(taskId);
                  setActiveTab('timer');
                  showToast('Focus Session Ready', 'Timer engaged on priority task.');
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* Floating Apple Liquid Glass Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl liquid-glass-elevated border-white/20 shadow-2xl flex items-center space-x-3.5 max-w-sm animate-fade-in">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0">
            <Icon name="sparkles" size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">{toast.message}</p>
            {toast.subtext && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{toast.subtext}</p>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        defaultDate={taskModalDefaultDate}
        defaultProjectId={taskModalDefaultProjectId}
        projects={state.projects}
      />

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        state={state}
        onUpdateSettings={(newSettings) => {
          setState(prev => ({ ...prev, ...newSettings }));
          showToast('Settings Saved', 'Preferences updated.');
        }}
        onExportData={() => {
          window.storageService.exportData(state);
          showToast('Backup Exported', 'Downloaded backup JSON file.');
        }}
        onImportData={(jsonStr) => {
          const res = window.storageService.importData(jsonStr);
          if (res.success) {
            setState(res.data);
            showToast('Backup Restored! ✨', 'Planner state restored successfully.');
          } else {
            alert(res.error);
          }
        }}
        onResetSampleData={() => {
          if (window.confirm('Reset all tasks and projects to rich default sample data?')) {
            const fresh = window.storageService.reset();
            setState(fresh);
            showToast('Sample Data Loaded', 'Restored default template.');
          }
        }}
      />

      <NotificationsModal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        notifications={state.notifications}
        onMarkAllAsRead={() => {
          setState(prev => ({
            ...prev,
            notifications: prev.notifications.map(n => ({ ...n, read: true }))
          }));
        }}
        onClearAll={() => {
          setState(prev => ({ ...prev, notifications: [] }));
        }}
      />
    </div>
  );
};

window.App = App;
