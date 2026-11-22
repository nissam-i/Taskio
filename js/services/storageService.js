// Taskio - Storage Service & Sample Data Generator

const STORAGE_KEY = 'TASKIO_PLANNER_DATA_V1';
const LEGACY_STORAGE_KEY = 'ZENITH_PLANNER_DATA_V1';

const getInitialSampleData = () => {
  const today = '2026-11-22';
  const yesterday = '2026-11-21';
  const tomorrow = '2026-11-23';

  // Generate historical completion dates for the 52-week activity heatmap
  const completedDates = {};
  const sampleDays = [
    '2026-11-22', '2026-11-21', '2026-11-20', '2026-11-19', '2026-11-18', '2026-11-17', '2026-11-16',
    '2026-11-15', '2026-11-14', '2026-11-13', '2026-11-12', '2026-11-10', '2026-11-09', '2026-11-08',
    '2026-11-07', '2026-11-06', '2026-11-05', '2026-11-03', '2026-11-02', '2026-11-01', '2026-10-31',
    '2026-10-30', '2026-10-28', '2026-10-27', '2026-10-26', '2026-10-25', '2026-10-23', '2026-10-22',
    '2026-10-21', '2026-10-20', '2026-10-18', '2026-10-17', '2026-10-15', '2026-10-14', '2026-10-12'
  ];
  sampleDays.forEach(d => {
    completedDates[d] = Math.floor(Math.random() * 5) + 2;
  });
  completedDates[today] = 2; // Today 2 tasks already finished

  const projects = [
    {
      id: 'proj-1',
      name: 'SaaS Platform Redesign',
      description: 'Revamping user experience, modern design tokens, dashboard workflows and component library.',
      color: 'purple',
      icon: 'layers',
      startDate: '2026-11-10',
      finalDeadline: '2026-11-27',
      priority: 'Urgent',
      status: 'In Progress',
      notes: 'Key focus on mobile responsiveness and accessibility audits.'
    },
    {
      id: 'proj-2',
      name: 'Q4 Growth & Marketing Sprint',
      description: 'Conversion funnel optimization, newsletter automation, and social media campaign launch.',
      color: 'blue',
      icon: 'trending-up',
      startDate: '2026-11-15',
      finalDeadline: '2026-12-05',
      priority: 'High',
      status: 'In Progress',
      notes: 'Collaborating with design team for visual assets.'
    },
    {
      id: 'proj-3',
      name: 'Personal Fitness & Marathon Prep',
      description: 'Endurance training program, daily nutrition tracking, and weekly long-distance runs.',
      color: 'emerald',
      icon: 'activity',
      startDate: '2026-11-01',
      finalDeadline: '2026-12-20',
      priority: 'Medium',
      status: 'In Progress',
      notes: 'Maintain 4 runs per week and proper hydration.'
    },
    {
      id: 'proj-4',
      name: 'Antigravity AI Planner Integration',
      description: 'Integrated intelligent rule-based coaching and Gemini API assistance for routine management.',
      color: 'amber',
      icon: 'sparkles',
      startDate: '2026-11-12',
      finalDeadline: '2026-11-22',
      priority: 'High',
      status: 'Completed',
      notes: 'Delivered free-tier Gemini API client with smart local fallback.'
    }
  ];

  const tasks = [
    {
      id: 'task-1',
      title: 'Morning Mindful Walk & Hydration',
      description: 'Brisk 30-minute outdoor walk without screens, followed by 500ml water and light stretches.',
      date: today,
      startTime: '07:30',
      endTime: '08:15',
      deadline: today,
      priority: 'Low',
      category: 'Daily Routine',
      projectId: 'proj-3',
      notes: 'Felt energized and clear-headed. Excellent start to the morning.',
      subtasks: [
        { id: 'st-1-1', title: '500ml lemon water', completed: true },
        { id: 'st-1-2', title: '30 min brisk walk in park', completed: true },
        { id: 'st-1-3', title: '5 min breathing meditation', completed: true }
      ],
      completed: true,
      completedAt: '2026-11-22T08:15:00Z',
      timeSpent: 2700,
      timerRunning: false
    },
    {
      id: 'task-2',
      title: 'Review Core User Experience Flow & Wireframes',
      description: 'Audit Figma component states, onboarding checklist, and modal interactions with designer notes.',
      date: today,
      startTime: '09:00',
      endTime: '10:30',
      deadline: today,
      priority: 'Urgent',
      category: 'Deep Work',
      projectId: 'proj-1',
      notes: 'Verify contrast ratios for dark mode palettes and touch targets on mobile.',
      subtasks: [
        { id: 'st-2-1', title: 'Check sign-up funnel drop-off points', completed: true },
        { id: 'st-2-2', title: 'Validate mobile sidebar drawer states', completed: false },
        { id: 'st-2-3', title: 'Review empty-state microcopy', completed: false }
      ],
      completed: false,
      completedAt: null,
      timeSpent: 1800,
      timerRunning: false
    },
    {
      id: 'task-3',
      title: 'Draft Technical Architecture Specification',
      description: 'Document database schemas, API contracts, local storage synchronization, and performance targets.',
      date: today,
      startTime: '11:00',
      endTime: '12:30',
      deadline: today,
      priority: 'High',
      category: 'Deep Work',
      projectId: 'proj-1',
      notes: 'Include diagram for state store and service architecture.',
      subtasks: [
        { id: 'st-3-1', title: 'Define data persistence schema', completed: true },
        { id: 'st-3-2', title: 'Outline Gemini AI fallback flow', completed: true },
        { id: 'st-3-3', title: 'Document Web Audio synthesis pipeline', completed: false }
      ],
      completed: false,
      completedAt: null,
      timeSpent: 900,
      timerRunning: false
    },
    {
      id: 'task-4',
      title: 'Product Team Sync on Sprint Milestones',
      description: 'Review blocked items, align on Q4 marketing launch deliverables, and assign review owners.',
      date: today,
      startTime: '13:30',
      endTime: '14:15',
      deadline: today,
      priority: 'Medium',
      category: 'Project Sprint',
      projectId: 'proj-2',
      notes: 'Prep bullet list of achievements from this week.',
      subtasks: [
        { id: 'st-4-1', title: 'Share sprint burndown chart', completed: false },
        { id: 'st-4-2', title: 'Review marketing copy deadlines', completed: false }
      ],
      completed: false,
      completedAt: null,
      timeSpent: 0,
      timerRunning: false
    },
    {
      id: 'task-5',
      title: 'Implement Gamification & Streak Logic',
      description: 'Build XP calculation formula, level thresholds, and automatic badge achievement triggers.',
      date: today,
      startTime: '15:00',
      endTime: '16:30',
      deadline: today,
      priority: 'Urgent',
      category: 'Deep Work',
      projectId: 'proj-4',
      notes: 'Completed with full 12 badge definitions and GitHub-style activity matrix.',
      subtasks: [
        { id: 'st-5-1', title: 'Write XP award algorithms', completed: true },
        { id: 'st-5-2', title: 'Build badge evaluator service', completed: true },
        { id: 'st-5-3', title: 'Add confetti celebration trigger', completed: true }
      ],
      completed: true,
      completedAt: '2026-11-22T16:30:00Z',
      timeSpent: 5400,
      timerRunning: false
    },
    {
      id: 'task-6',
      title: 'Finalize Q4 Marketing Copy & Creative Assets',
      description: 'Deliver finalized copy for hero headlines, onboarding welcome emails, and social banners.',
      date: yesterday,
      startTime: '16:00',
      endTime: '17:30',
      deadline: yesterday,
      priority: 'High',
      category: 'Project Sprint',
      projectId: 'proj-2',
      notes: 'Needs immediate review so design team can finalize visual assets.',
      subtasks: [
        { id: 'st-6-1', title: 'Draft email onboarding sequence', completed: true },
        { id: 'st-6-2', title: 'Review with growth team', completed: false }
      ],
      completed: false,
      completedAt: null,
      timeSpent: 1200,
      timerRunning: false
    },
    {
      id: 'task-7',
      title: 'User Testing Session & Feedback Synthesis',
      description: 'Run 45-minute moderated usability interview with beta user; synthesize pain points.',
      date: tomorrow,
      startTime: '10:00',
      endTime: '11:15',
      deadline: tomorrow,
      priority: 'High',
      category: 'Deep Work',
      projectId: 'proj-1',
      notes: 'Prepare prototype link and questionnaire beforehand.',
      subtasks: [
        { id: 'st-7-1', title: 'Prepare testing script', completed: false },
        { id: 'st-7-2', title: 'Record key user friction moments', completed: false }
      ],
      completed: false,
      completedAt: null,
      timeSpent: 0,
      timerRunning: false
    },
    {
      id: 'task-8',
      title: 'Evening Reading: Atomic Habits Chapter 8',
      description: 'Read 25 pages on habit stacking and environmental cues for sustained productivity.',
      date: today,
      startTime: '21:00',
      endTime: '21:45',
      deadline: today,
      priority: 'Low',
      category: 'Learning & Growth',
      projectId: null,
      notes: 'Take 3 bullet notes in personal notebook.',
      subtasks: [],
      completed: false,
      completedAt: null,
      timeSpent: 0,
      timerRunning: false
    }
  ];

  const notifications = [
    {
      id: 'notif-1',
      title: '🔥 7-Day Streak Achieved!',
      message: 'You have maintained your productivity streak for 7 consecutive days. You earned 150 bonus XP!',
      type: 'achievement',
      timestamp: '2026-11-22T10:00:00Z',
      read: false
    },
    {
      id: 'notif-2',
      title: '⚠️ Overdue Task Alert',
      message: '"Finalize Q4 Marketing Copy & Creative Assets" was due yesterday. Would you like the AI Coach to reschedule?',
      type: 'deadline',
      timestamp: '2026-11-22T08:00:00Z',
      read: false
    },
    {
      id: 'notif-3',
      title: '✨ Welcome to Taskio',
      message: 'Your personal AI-powered productivity diary is ready. Let us make today extraordinarily fulfilling.',
      type: 'system',
      timestamp: '2026-11-22T07:00:00Z',
      read: true
    }
  ];

  return {
    user: {
      name: 'Nissan',
      title: 'Senior Developer & Creative Architect',
      avatarEmoji: '✨',
      dailyGoalTasks: 5,
      dailyGoalHours: 4,
      workingHoursStart: '08:00',
      workingHoursEnd: '19:00',
      geminiApiKey: ''
    },
    theme: 'dark', // Apple Liquid Glass: 'dark' (obsidian) | 'light' (platinum glass)
    soundSettings: {
      masterEnabled: true,
      volume: 0.75,
      interfaceSounds: true,
      notificationSounds: true
    },
    enableSound: true,
    enableBrowserNotifications: false,
    tasks,
    projects,
    notifications,
    gamification: {
      streak: 7,
      bestStreak: 14,
      xp: 875,
      level: 3,
      completedDates,
      badges: window.PLANNER_CONSTANTS.INITIAL_BADGES
    },
    pomodoro: {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      sessionsCompleted: 11,
      totalFocusSeconds: 16500
    }
  };
};

class StorageService {
  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return { ...getInitialSampleData(), ...parsed };
      }
    } catch (e) {
      console.error('Failed to load stored state:', e);
    }
    const initial = getInitialSampleData();
    this.save(initial);
    return initial;
  }

  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  exportData(state) {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskio-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.tasks && parsed.projects) {
        this.save(parsed);
        return { success: true, data: parsed };
      }
      return { success: false, error: 'Invalid file format: missing tasks or projects.' };
    } catch (e) {
      return { success: false, error: 'Failed to parse JSON file: ' + e.message };
    }
  }

  reset() {
    const initial = getInitialSampleData();
    this.save(initial);
    return initial;
  }
}

window.storageService = new StorageService();
