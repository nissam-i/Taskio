/* --- File: js/types.js --- */
// Taskio - Data Models, Enums & Initial Constants

const PRIORITIES = {
  Urgent: {
    label: 'Urgent',
    color: 'rose',
    bg: 'var(--pastel-rose-bg)',
    text: 'var(--pastel-rose-text)',
    border: '#FDA4AF',
    dot: '#E11D48'
  },
  High: {
    label: 'High',
    color: 'apricot',
    bg: 'var(--pastel-apricot-bg)',
    text: 'var(--pastel-apricot-text)',
    border: '#FDBA74',
    dot: '#EA580C'
  },
  Medium: {
    label: 'Medium',
    color: 'lavender',
    bg: 'var(--pastel-lavender-bg)',
    text: 'var(--pastel-lavender-text)',
    border: '#C4B5FD',
    dot: '#7C3AED'
  },
  Low: {
    label: 'Low',
    color: 'sage',
    bg: 'var(--pastel-sage-bg)',
    text: 'var(--pastel-sage-text)',
    border: '#86EFAC',
    dot: '#16A34A'
  }
};
const CATEGORIES = [{
  id: 'Deep Work',
  name: 'Deep Work',
  icon: 'zap',
  color: 'purple'
}, {
  id: 'Project Sprint',
  name: 'Project Sprint',
  icon: 'folder-kanban',
  color: 'blue'
}, {
  id: 'Daily Routine',
  name: 'Daily Routine',
  icon: 'sun',
  color: 'amber'
}, {
  id: 'Learning & Growth',
  name: 'Learning & Growth',
  icon: 'book-open',
  color: 'emerald'
}, {
  id: 'Wellness & Health',
  name: 'Wellness & Health',
  icon: 'heart',
  color: 'rose'
}, {
  id: 'Administrative',
  name: 'Administrative',
  icon: 'inbox',
  color: 'slate'
}];
const PROJECT_STATUSES = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Overdue'];
const MOTIVATIONAL_QUOTES = [{
  quote: "Small daily improvements over time lead to stunning results.",
  author: "Robin Sharma"
}, {
  quote: "One task at a time. Breathe, focus, and let momentum carry you.",
  author: "Taskio Coach"
}, {
  quote: "Your future self will thank you for the disciplined choices you make today.",
  author: "James Clear"
}, {
  quote: "The secret of getting ahead is getting started. Break complex tasks into small bite-sized steps.",
  author: "Mark Twain"
}, {
  quote: "Don't stop now. You're far closer to your breakthrough than you think!",
  author: "Productivity Diary"
}, {
  quote: "Focus is a muscle. Every Pomodoro interval makes your mind stronger.",
  author: "Cal Newport"
}, {
  quote: "Consistency beats intensity every single day. Keep showing up.",
  author: "Daily Stoic"
}];
const INITIAL_BADGES = [{
  id: 'first_step',
  name: 'First Step',
  desc: 'Complete your first task',
  icon: 'check-circle-2',
  unlockedAt: '2026-11-15T09:12:00Z'
}, {
  id: 'streak_3',
  name: 'Momentum Starter',
  desc: 'Maintain a 3-day streak',
  icon: 'flame',
  unlockedAt: '2026-11-18T18:00:00Z'
}, {
  id: 'streak_7',
  name: 'Habit Builder',
  desc: 'Maintain a 7-day streak',
  icon: 'trophy',
  unlockedAt: '2026-11-22T10:00:00Z'
}, {
  id: 'streak_30',
  name: 'Unstoppable Force',
  desc: 'Maintain a 30-day streak',
  icon: 'crown',
  unlockedAt: null
}, {
  id: 'deadline_master',
  name: 'Deadline Master',
  desc: 'Complete 5 tasks on or before deadline',
  icon: 'clock',
  unlockedAt: '2026-11-20T16:30:00Z'
}, {
  id: 'deep_diver',
  name: 'Deep Diver',
  desc: 'Log 4+ hours of focused work in a single day',
  icon: 'target',
  unlockedAt: null
}, {
  id: 'pomodoro_pro',
  name: 'Pomodoro Pro',
  desc: 'Complete 10 Pomodoro intervals',
  icon: 'timer',
  unlockedAt: '2026-11-21T15:00:00Z'
}, {
  id: 'project_champion',
  name: 'Project Champion',
  desc: 'Complete 100% of tasks in an entire project',
  icon: 'award',
  unlockedAt: '2026-11-19T14:20:00Z'
}, {
  id: 'early_bird',
  name: 'Early Bird',
  desc: 'Complete a scheduled task before 9:00 AM',
  icon: 'sunrise',
  unlockedAt: '2026-11-22T08:15:00Z'
}, {
  id: 'overdue_crusher',
  name: 'Overdue Crusher',
  desc: 'Rescue and complete an overdue task',
  icon: 'shield-alert',
  unlockedAt: null
}, {
  id: 'taskio_perfection',
  name: 'Flawless Day',
  desc: 'Complete 100% of all scheduled tasks in a day',
  icon: 'sparkles',
  unlockedAt: null
}, {
  id: 'productivity_sage',
  name: 'Productivity Sage',
  desc: 'Ascend to Level 5 Productivity Master',
  icon: 'gem',
  unlockedAt: null
}];
window.PLANNER_CONSTANTS = {
  PRIORITIES,
  CATEGORIES,
  PROJECT_STATUSES,
  MOTIVATIONAL_QUOTES,
  INITIAL_BADGES
};

/* --- File: js/services/audioService.js --- */
// Taskio - Apple-Inspired Synthesized Sound & Haptics Engine
// Pure Web Audio API synthesized audio assets (100% original, zero external MP3/WAV files)

class AudioService {
  constructor() {
    this.ctx = null;
    this.masterEnabled = true;
    this.volume = 0.7; // 0.0 to 1.0
    this.interfaceSoundsEnabled = true;
    this.notificationSoundsEnabled = true;
  }
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Master Gain helper
  getMasterGain(now, specificVolume = 1.0) {
    const gainNode = this.ctx.createGain();
    const effectiveVolume = Math.max(0, Math.min(1, this.volume * specificVolume));
    gainNode.gain.setValueAtTime(effectiveVolume, now);
    gainNode.connect(this.ctx.destination);
    return gainNode;
  }

  // 1. Checkbox Completion: Soft tactile glass / wooden pop
  playCheckbox() {
    if (!this.masterEnabled || !this.interfaceSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.45);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      // Quick pitch drop creates tactile "pop"
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {
      console.warn('Audio checkbox error:', e);
    }
  }

  // 2. Task Creation: Gentle modern ascending glass two-tone chime
  playTaskCreate() {
    if (!this.masterEnabled || !this.notificationSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.35);

      // F#5 (739.99 Hz) to A5 (880.00 Hz)
      const notes = [739.99, 880.00];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.38);
      });
    } catch (e) {
      console.warn('Audio task create error:', e);
    }
  }

  // 3. Task Deletion: Subtle soft low drop / paper whoosh
  playTaskDelete() {
    if (!this.masterEnabled || !this.interfaceSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.3);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.07);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.085);
    } catch (e) {
      console.warn('Audio task delete error:', e);
    }
  }

  // 4. Timer Start: Minimal confirmation click / pulse
  playTimerStart() {
    if (!this.masterEnabled || !this.interfaceSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.4);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      console.warn('Audio timer start error:', e);
    }
  }

  // 5. Timer Completion: Pleasant Apple-inspired Bell Chime
  playTimerComplete() {
    if (!this.masterEnabled || !this.notificationSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.5);

      // F5 (698.46 Hz) + harmonic overtone (1396.91 Hz)
      const freqs = [698.46, 1396.91, 2093.00];
      const weights = [0.35, 0.15, 0.06];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(weights[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 2.3);
      });
    } catch (e) {
      console.warn('Audio timer complete error:', e);
    }
  }

  // 6. Streak Achievement: Rich celebratory crystal glass arpeggio
  playStreakAchievement() {
    if (!this.masterEnabled || !this.notificationSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.45);

      // C5, E5, G5, B5, C6 (Lydian sparkle)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.9);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.95);
      });
    } catch (e) {
      console.warn('Audio streak achievement error:', e);
    }
  }

  // 7. Daily Goal Completion: Joyful success chord with shimmer
  playGoalComplete() {
    if (!this.masterEnabled || !this.notificationSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.5);
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.4);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 1.5);
      });
    } catch (e) {
      console.warn('Audio goal complete error:', e);
    }
  }

  // 8. Button interactions: Subtle tactile micro-click (2ms haptic feel)
  playButtonTap() {
    if (!this.masterEnabled || !this.interfaceSoundsEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.getMasterGain(now, 0.2);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.015);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.016);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.018);
    } catch (e) {
      // Ignore background button audio failures silently
    }
  }
}
window.audioService = new AudioService();

/* --- File: js/services/storageService.js --- */
// Taskio - Storage Service & Sample Data Generator

const STORAGE_KEY = 'TASKIO_PLANNER_DATA_V1';
const LEGACY_STORAGE_KEY = 'ZENITH_PLANNER_DATA_V1';
const getInitialSampleData = () => {
  const today = '2026-11-22';
  const yesterday = '2026-11-21';
  const tomorrow = '2026-11-23';

  // Generate historical completion dates for the 52-week activity heatmap
  const completedDates = {};
  const sampleDays = ['2026-11-22', '2026-11-21', '2026-11-20', '2026-11-19', '2026-11-18', '2026-11-17', '2026-11-16', '2026-11-15', '2026-11-14', '2026-11-13', '2026-11-12', '2026-11-10', '2026-11-09', '2026-11-08', '2026-11-07', '2026-11-06', '2026-11-05', '2026-11-03', '2026-11-02', '2026-11-01', '2026-10-31', '2026-10-30', '2026-10-28', '2026-10-27', '2026-10-26', '2026-10-25', '2026-10-23', '2026-10-22', '2026-10-21', '2026-10-20', '2026-10-18', '2026-10-17', '2026-10-15', '2026-10-14', '2026-10-12'];
  sampleDays.forEach(d => {
    completedDates[d] = Math.floor(Math.random() * 5) + 2;
  });
  completedDates[today] = 2; // Today 2 tasks already finished

  const projects = [{
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
  }, {
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
  }, {
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
  }, {
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
  }];
  const tasks = [{
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
    subtasks: [{
      id: 'st-1-1',
      title: '500ml lemon water',
      completed: true
    }, {
      id: 'st-1-2',
      title: '30 min brisk walk in park',
      completed: true
    }, {
      id: 'st-1-3',
      title: '5 min breathing meditation',
      completed: true
    }],
    completed: true,
    completedAt: '2026-11-22T08:15:00Z',
    timeSpent: 2700,
    timerRunning: false
  }, {
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
    subtasks: [{
      id: 'st-2-1',
      title: 'Check sign-up funnel drop-off points',
      completed: true
    }, {
      id: 'st-2-2',
      title: 'Validate mobile sidebar drawer states',
      completed: false
    }, {
      id: 'st-2-3',
      title: 'Review empty-state microcopy',
      completed: false
    }],
    completed: false,
    completedAt: null,
    timeSpent: 1800,
    timerRunning: false
  }, {
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
    subtasks: [{
      id: 'st-3-1',
      title: 'Define data persistence schema',
      completed: true
    }, {
      id: 'st-3-2',
      title: 'Outline Gemini AI fallback flow',
      completed: true
    }, {
      id: 'st-3-3',
      title: 'Document Web Audio synthesis pipeline',
      completed: false
    }],
    completed: false,
    completedAt: null,
    timeSpent: 900,
    timerRunning: false
  }, {
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
    subtasks: [{
      id: 'st-4-1',
      title: 'Share sprint burndown chart',
      completed: false
    }, {
      id: 'st-4-2',
      title: 'Review marketing copy deadlines',
      completed: false
    }],
    completed: false,
    completedAt: null,
    timeSpent: 0,
    timerRunning: false
  }, {
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
    subtasks: [{
      id: 'st-5-1',
      title: 'Write XP award algorithms',
      completed: true
    }, {
      id: 'st-5-2',
      title: 'Build badge evaluator service',
      completed: true
    }, {
      id: 'st-5-3',
      title: 'Add confetti celebration trigger',
      completed: true
    }],
    completed: true,
    completedAt: '2026-11-22T16:30:00Z',
    timeSpent: 5400,
    timerRunning: false
  }, {
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
    subtasks: [{
      id: 'st-6-1',
      title: 'Draft email onboarding sequence',
      completed: true
    }, {
      id: 'st-6-2',
      title: 'Review with growth team',
      completed: false
    }],
    completed: false,
    completedAt: null,
    timeSpent: 1200,
    timerRunning: false
  }, {
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
    subtasks: [{
      id: 'st-7-1',
      title: 'Prepare testing script',
      completed: false
    }, {
      id: 'st-7-2',
      title: 'Record key user friction moments',
      completed: false
    }],
    completed: false,
    completedAt: null,
    timeSpent: 0,
    timerRunning: false
  }, {
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
  }];
  const notifications = [{
    id: 'notif-1',
    title: '🔥 7-Day Streak Achieved!',
    message: 'You have maintained your productivity streak for 7 consecutive days. You earned 150 bonus XP!',
    type: 'achievement',
    timestamp: '2026-11-22T10:00:00Z',
    read: false
  }, {
    id: 'notif-2',
    title: '⚠️ Overdue Task Alert',
    message: '"Finalize Q4 Marketing Copy & Creative Assets" was due yesterday. Would you like the AI Coach to reschedule?',
    type: 'deadline',
    timestamp: '2026-11-22T08:00:00Z',
    read: false
  }, {
    id: 'notif-3',
    title: '✨ Welcome to Taskio',
    message: 'Your personal AI-powered productivity diary is ready. Let us make today extraordinarily fulfilling.',
    type: 'system',
    timestamp: '2026-11-22T07:00:00Z',
    read: true
  }];
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
    theme: 'dark',
    // Apple Liquid Glass: 'dark' (obsidian) | 'light' (platinum glass)
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
        return {
          ...getInitialSampleData(),
          ...parsed
        };
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
    const blob = new Blob([jsonStr], {
      type: 'application/json'
    });
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
        return {
          success: true,
          data: parsed
        };
      }
      return {
        success: false,
        error: 'Invalid file format: missing tasks or projects.'
      };
    } catch (e) {
      return {
        success: false,
        error: 'Failed to parse JSON file: ' + e.message
      };
    }
  }
  reset() {
    const initial = getInitialSampleData();
    this.save(initial);
    return initial;
  }
  getBlankState() {
    return {
      tasks: [],
      projects: [],
      theme: 'dark',
      soundSettings: {
        masterEnabled: true,
        volume: 0.75,
        interfaceSounds: true,
        notificationSounds: true
      },
      notifications: [],
      pomodoro: {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        sessionsCompleted: 0,
        totalFocusSeconds: 0
      },
      gamification: {
        xp: 0,
        level: 1,
        streak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        completedDates: {},
        badges: window.PLANNER_CONSTANTS ? window.PLANNER_CONSTANTS.INITIAL_BADGES.map(b => ({
          ...b,
          unlockedAt: null
        })) : []
      }
    };
  }
}
window.storageService = new StorageService();

/* --- File: js/services/gamificationService.js --- */
// Taskio - Gamification Engine (XP, Levels, Badges, Streaks)

class GamificationService {
  getLevelInfo(xp) {
    const level = Math.floor(Math.sqrt(xp / 100)) + 1;
    const currentLevelBaseXP = Math.pow(level - 1, 2) * 100;
    const nextLevelXP = Math.pow(level, 2) * 100;
    const xpIntoLevel = xp - currentLevelBaseXP;
    const xpNeededForNext = nextLevelXP - currentLevelBaseXP;
    const progressPercent = Math.min(100, Math.max(0, Math.round(xpIntoLevel / xpNeededForNext * 100)));
    const titles = ["Novice Initiate", "Disciplined Apprentice", "Focus Practitioner", "Productivity Alchemist", "Master of Time", "Flow State Sage", "Productivity Grandmaster"];
    const title = titles[Math.min(titles.length - 1, level - 1)];
    return {
      level,
      title,
      xp,
      currentLevelBaseXP,
      nextLevelXP,
      xpIntoLevel,
      xpNeededForNext,
      progressPercent
    };
  }
  calculateTaskXP(task, isOverdue) {
    let earned = 25; // base
    if (task.priority === 'High') earned += 25;
    if (task.priority === 'Urgent') earned += 50;
    if (isOverdue) earned += 35; // bonus for clearing overdue task!
    if (task.subtasks && task.subtasks.length > 0) {
      earned += task.subtasks.length * 5;
    }
    return earned;
  }
  evaluateBadges(state, completedTask) {
    const newlyUnlocked = [];
    const nowISO = new Date().toISOString();
    const badges = [...state.gamification.badges];
    const completedTasksCount = state.tasks.filter(t => t.completed).length;
    const streak = state.gamification.streak;
    const checkAndUnlock = badgeId => {
      const idx = badges.findIndex(b => b.id === badgeId);
      if (idx !== -1 && !badges[idx].unlockedAt) {
        badges[idx] = {
          ...badges[idx],
          unlockedAt: nowISO
        };
        newlyUnlocked.push(badges[idx]);
      }
    };

    // First Step
    if (completedTasksCount >= 1) checkAndUnlock('first_step');

    // Streaks
    if (streak >= 3) checkAndUnlock('streak_3');
    if (streak >= 7) checkAndUnlock('streak_7');
    if (streak >= 30) checkAndUnlock('streak_30');

    // Deadline Master
    const onTimeCount = state.tasks.filter(t => t.completed && t.deadline && t.completedAt && t.completedAt.slice(0, 10) <= t.deadline).length;
    if (onTimeCount >= 5) checkAndUnlock('deadline_master');

    // Pomodoro Pro
    if (state.pomodoro.sessionsCompleted >= 10) checkAndUnlock('pomodoro_pro');

    // Early Bird
    if (completedTask && completedTask.completedAt) {
      const hour = new Date(completedTask.completedAt).getHours();
      if (hour < 9) checkAndUnlock('early_bird');
    }

    // Overdue Crusher
    if (completedTask && completedTask.deadline && completedTask.completedAt) {
      if (completedTask.deadline < completedTask.completedAt.slice(0, 10)) {
        checkAndUnlock('overdue_crusher');
      }
    }

    // Project Champion
    state.projects.forEach(proj => {
      const pTasks = state.tasks.filter(t => t.projectId === proj.id);
      if (pTasks.length >= 2 && pTasks.every(t => t.completed)) {
        checkAndUnlock('project_champion');
      }
    });

    // Productivity Sage (Level 5)
    const levelInfo = this.getLevelInfo(state.gamification.xp);
    if (levelInfo.level >= 5) checkAndUnlock('productivity_sage');
    return {
      updatedBadges: badges,
      newlyUnlocked
    };
  }
  triggerConfetti() {
    if (window.confetti) {
      // Dual cannon burst
      window.confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          y: 0.65
        }
      });
      setTimeout(() => {
        window.confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: {
            x: 0
          }
        });
        window.confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: {
            x: 1
          }
        });
      }, 180);
    }
  }
}
window.gamificationService = new GamificationService();

/* --- File: js/services/aiService.js --- */
// Taskio - Free AI Productivity Assistant
// Supports Google Gemini 2.0 Flash Free Tier + Context-Aware Local Heuristic Coach

class AIService {
  constructor() {
    this.geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  // Prepares real-time productivity context summary for the AI
  buildContext(state) {
    const today = new Date().toISOString().slice(0, 10);
    const todayTasks = state.tasks.filter(t => t.date === today);
    const completedToday = todayTasks.filter(t => t.completed);
    const pendingToday = todayTasks.filter(t => !t.completed);
    const overdueTasks = state.tasks.filter(t => !t.completed && t.deadline && t.deadline < today);
    const activeProjects = state.projects.filter(p => p.status !== 'Completed');
    return {
      today,
      userName: state.user.name || 'Friend',
      totalTasksToday: todayTasks.length,
      completedTodayCount: completedToday.length,
      pendingTodayCount: pendingToday.length,
      overdueCount: overdueTasks.length,
      streak: state.gamification.streak,
      xp: state.gamification.xp,
      level: state.gamification.level,
      todayTasks,
      overdueTasks,
      activeProjects,
      totalHoursWorkedToday: (todayTasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0) / 3600).toFixed(1)
    };
  }
  async processMessage(userMessage, state) {
    const context = this.buildContext(state);
    const apiKey = state.user.geminiApiKey ? state.user.geminiApiKey.trim() : '';

    // If Gemini API Key is available, attempt free-tier call
    if (apiKey) {
      try {
        const response = await this.callGeminiAPI(userMessage, context, apiKey);
        if (response && response.text) {
          return response;
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to Local Heuristic AI:', err);
      }
    }

    // Default & offline fallback: Local Heuristic AI Engine
    return this.runLocalHeuristicEngine(userMessage, context, state);
  }
  async callGeminiAPI(userMessage, context, apiKey) {
    const systemInstruction = `You are the Taskio Productivity Coach, an empathetic, highly structured personal productivity diary assistant.
Current Date: ${context.today}
User: ${context.userName}
Current Streak: ${context.streak} days | Level: ${context.level}
Tasks Today: ${context.completedTodayCount} completed, ${context.pendingTodayCount} pending, ${context.overdueCount} overdue.
Active Projects: ${context.activeProjects.map(p => `${p.name} (Deadline: ${p.finalDeadline}, Priority: ${p.priority})`).join('; ')}
Pending Tasks: ${context.todayTasks.filter(t => !t.completed).map(t => `${t.title} [${t.priority}, ${t.category}]`).join('; ')}
Overdue Tasks: ${context.overdueTasks.map(t => `${t.title} (Due: ${t.deadline})`).join('; ')}

Instructions:
1. Provide actionable, supportive, concise advice inspired by high-performance time-blocking and Stoic mindfulness.
2. If you suggest new tasks or rescheduling, structure them clearly.
3. If proposing concrete tasks to add, you may end your message with a JSON code block with key "proposal":
\`\`\`json
{
  "action": "create_tasks",
  "tasks": [
    { "title": "Example task", "priority": "High", "category": "Deep Work", "startTime": "10:00", "endTime": "11:00" }
  ]
}
\`\`\``;
    const requestBody = {
      contents: [{
        role: 'user',
        parts: [{
          text: `${systemInstruction}\n\nUser Message: ${userMessage}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    };
    const res = await fetch(`${this.geminiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}`);
    }
    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extract optional JSON proposal if present
    let proposal = null;
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        proposal = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.warn('Failed to parse AI proposal JSON:', e);
      }
    }
    return {
      text: rawText.replace(/```json[\s\S]*?```/, '').trim(),
      proposal,
      source: 'gemini'
    };
  }

  // Local Rule-Based Engine: Works 100% free, offline, with zero API key
  runLocalHeuristicEngine(userMessage, context, state) {
    const q = userMessage.toLowerCase().trim();

    // 1. Plan Today / Daily Routine Generator
    if (q.includes('plan') || q.includes('routine') || q.includes('schedule') || q.includes('day')) {
      const urgent = context.todayTasks.filter(t => !t.completed && t.priority === 'Urgent');
      const high = context.todayTasks.filter(t => !t.completed && t.priority === 'High');
      const other = context.todayTasks.filter(t => !t.completed && t.priority !== 'Urgent' && t.priority !== 'High');
      let text = `Here is your optimized, time-blocked daily routine for today, ${context.userName}:\n\n`;
      text += `🌅 **Morning Focus (09:00 - 12:30)**\n`;
      if (urgent.length > 0) {
        text += `• **09:00 - 10:30 (Deep Work)**: ${urgent[0].title} *(Priority: Urgent — Tackle before mental fatigue sets in)*\n`;
      } else {
        text += `• **09:00 - 10:30 (Deep Work)**: Key project milestone sprint\n`;
      }
      text += `• **10:30 - 10:45**: Mindful hydration & stretch break (leave your desk)\n`;
      if (high.length > 0) {
        text += `• **10:45 - 12:15 (High Impact)**: ${high[0].title}\n`;
      } else {
        text += `• **10:45 - 12:15 (Focus Sprint)**: High leverage technical task\n`;
      }
      text += `\n☀️ **Midday & Collaborative Work (13:30 - 16:30)**\n`;
      text += `• **13:30 - 14:30**: Team alignment, quick communication, and reviews\n`;
      if (other.length > 0) {
        text += `• **14:45 - 16:00 (Execution)**: ${other[0].title}\n`;
      } else {
        text += `• **14:45 - 16:00 (Execution)**: Secondary tasks and administrative follow-ups\n`;
      }
      text += `\n🌙 **Evening Wind-down (17:00 - 18:00)**\n`;
      text += `• **17:00 - 17:30**: Review completed tasks, update notes, and clear tomorrow's agenda\n`;
      text += `• **17:30 onwards**: Rest, recharge, and celebrate your ${context.streak}-day streak! 🔥`;
      return {
        text,
        proposal: {
          action: 'create_tasks',
          title: 'Suggested Daily Routine Blocks',
          tasks: [{
            title: 'Morning Deep Work Block',
            priority: 'Urgent',
            category: 'Deep Work',
            startTime: '09:00',
            endTime: '10:30'
          }, {
            title: 'Midday Collaborative Sprint',
            priority: 'Medium',
            category: 'Project Sprint',
            startTime: '13:30',
            endTime: '14:30'
          }, {
            title: 'Daily Review & Tomorrow Prep',
            priority: 'Low',
            category: 'Daily Routine',
            startTime: '17:00',
            endTime: '17:30'
          }]
        },
        source: 'local'
      };
    }

    // 2. Break down a project
    if (q.includes('break') || q.includes('project') || q.includes('decompose') || q.includes('subtask')) {
      const targetProj = context.activeProjects[0] || {
        name: 'New Initiative',
        id: null
      };
      const text = `I've analyzed your project **"${targetProj.name}"** and broken it down into actionable, high-velocity steps:\n\n` + `1. **Phase 1: Architecture & Requirements Discovery** (Est: 2 hours) [High Priority]\n` + `   • Map user journeys and audit current edge-cases.\n\n` + `2. **Phase 2: Core Implementation Sprint** (Est: 4 hours) [Urgent Priority]\n` + `   • Build foundational components and reactive state stores.\n\n` + `3. **Phase 3: Integration & Edge-Case Testing** (Est: 1.5 hours) [Medium Priority]\n` + `   • Verify responsive layout, keyboard navigation, and theme switches.\n\n` + `4. **Phase 4: Polish & Production Release** (Est: 1 hour) [High Priority]\n` + `   • Finalize documentation, celebrate milestone, and log retrospective.\n\n` + `Would you like me to automatically create these 4 milestone tasks under "${targetProj.name}"? Click **Apply to Planner** below!`;
      return {
        text,
        proposal: {
          action: 'create_tasks',
          title: `Milestones for ${targetProj.name}`,
          projectId: targetProj.id,
          tasks: [{
            title: `${targetProj.name}: Discovery & UX Mapping`,
            priority: 'High',
            category: 'Deep Work',
            startTime: '10:00',
            endTime: '11:30',
            projectId: targetProj.id
          }, {
            title: `${targetProj.name}: Core Implementation Sprint`,
            priority: 'Urgent',
            category: 'Deep Work',
            startTime: '11:45',
            endTime: '13:15',
            projectId: targetProj.id
          }, {
            title: `${targetProj.name}: Testing & Responsive Audit`,
            priority: 'Medium',
            category: 'Project Sprint',
            startTime: '14:30',
            endTime: '15:30',
            projectId: targetProj.id
          }, {
            title: `${targetProj.name}: Release & Retrospective`,
            priority: 'High',
            category: 'Project Sprint',
            startTime: '16:00',
            endTime: '17:00',
            projectId: targetProj.id
          }]
        },
        source: 'local'
      };
    }

    // 3. What to work on next / Prioritization
    if (q.includes('next') || q.includes('priority') || q.includes('prioritize') || q.includes('now') || q.includes('what to do')) {
      // Find highest leverage task: Overdue first, then Urgent, then High
      let nextTask = context.overdueTasks[0];
      let reason = 'it is currently overdue and clearing it will remove cognitive debt and protect your streak!';
      if (!nextTask) {
        nextTask = context.todayTasks.find(t => !t.completed && t.priority === 'Urgent');
        reason = 'it is marked as Urgent with the highest leverage on your core project objectives.';
      }
      if (!nextTask) {
        nextTask = context.todayTasks.find(t => !t.completed && t.priority === 'High');
        reason = 'it moves your critical deliverables forward today.';
      }
      if (!nextTask) {
        nextTask = context.todayTasks.find(t => !t.completed);
        reason = 'it is your next scheduled item on today\'s planner timeline.';
      }
      if (nextTask) {
        return {
          text: `🎯 **Your #1 Next Recommended Task:**\n\n` + `👉 **"${nextTask.title}"**\n` + `• **Category**: ${nextTask.category}\n` + `• **Priority**: ${nextTask.priority}\n` + `• **Time Allocation**: ${nextTask.startTime || 'Flexible'} - ${nextTask.endTime || 'Flexible'}\n\n` + `**Why tackle this now?** ${reason}\n\n` + `💡 *Pro-tip: Start a 25-minute Pomodoro session right now. Turn on Do Not Disturb and focus on just the first 5 minutes.*`,
          proposal: {
            action: 'start_timer',
            taskId: nextTask.id,
            taskTitle: nextTask.title
          },
          source: 'local'
        };
      } else {
        return {
          text: `🎉 **Incredible work, ${context.userName}!** You have completed all scheduled tasks for today!\n\n` + `You can take a well-deserved rest, enjoy personal creative time, or plan tomorrow's victories in advance.`,
          source: 'local'
        };
      }
    }

    // 4. Overdue Task Rescue
    if (q.includes('overdue') || q.includes('behind') || q.includes('late') || q.includes('missed')) {
      if (context.overdueCount === 0) {
        return {
          text: `✨ **Clear Skies!** You have **0 overdue tasks**! Your execution consistency is top-tier. Keep protecting your calendar boundaries.`,
          source: 'local'
        };
      }
      const overdueList = context.overdueTasks.map(t => `• **${t.title}** (Was due: ${t.deadline})`).join('\n');
      return {
        text: `⚠️ **Overdue Recovery Plan:**\n\n` + `You currently have **${context.overdueCount} overdue item(s)**:\n${overdueList}\n\n` + `Falling behind happens to everyone. The best antidote is a swift, realistic rescue schedule:\n` + `1. Reschedule these into today's dedicated catch-up block.\n` + `2. Trim scope down to the essential minimum viable deliverable.\n` + `3. Complete them to earn the **"Overdue Crusher"** badge and +60 bonus XP!`,
        proposal: {
          action: 'reschedule_overdue',
          tasks: context.overdueTasks.map(t => t.id)
        },
        source: 'local'
      };
    }

    // 5. Weekly Productivity Report
    if (q.includes('report') || q.includes('weekly') || q.includes('analytics') || q.includes('summary')) {
      const completionRate = context.totalTasksToday > 0 ? Math.round(context.completedTodayCount / context.totalTasksToday * 100) : 100;
      return {
        text: `📊 **Weekly Productivity Executive Summary:**\n\n` + `• **Current Daily Streak**: ${context.streak} Days 🔥\n` + `• **Total Productive XP**: ${context.xp} XP (Level ${context.level} ${window.gamificationService.getLevelInfo(context.xp).title})\n` + `• **Today's Completion Rate**: ${completionRate}%\n` + `• **Logged Focus Hours**: ${context.totalHoursWorkedToday} hours\n` + `• **Active Projects**: ${context.activeProjects.length} projects advancing\n\n` + `**Coach's Key Insights:**\n` + `1. Your focus consistency during morning hours is your highest-leverage advantage.\n` + `2. Deep Work accounts for the majority of your output; keep defending that morning time-block.\n` + `3. Remember to log short 5-minute pauses between 25-minute Pomodoro sessions to sustain stamina without burnout.`,
        source: 'local'
      };
    }

    // 6. Motivation & Encouragement
    if (q.includes('motivate') || q.includes('tired') || q.includes('exhausted') || q.includes('procrastinat') || q.includes('stuck')) {
      return {
        text: `💪 **A message from your Taskio Coach:**\n\n` + `"${context.userName}, remember that momentum is built in small, low-friction increments. You don't have to conquer the whole mountain in this exact hour.\n\n` + `You already have an active **${context.streak}-day streak**. That proves your resilience and capacity.\n\n` + `Do just **two minutes** of one pending task right now. Open the document, write one sentence, or check off one tiny subtask. Once you start, flow naturally follows."`,
        source: 'local'
      };
    }

    // General helpful response
    return {
      text: `Hello ${context.userName}! I am your Taskio AI Productivity Coach. I can help you with:\n\n` + `• 📅 **"Plan today"** — Generate an optimized, time-blocked schedule\n` + `• 🎯 **"What to work on next"** — Identify your highest-leverage task\n` + `• 📁 **"Break down project"** — Split projects into actionable subtasks\n` + `• ⚠️ **"Review overdue tasks"** — Rescue overdue items without burnout\n` + `• 📊 **"Weekly report"** — Executive analytics & performance review\n` + `• 💪 **"Motivate me"** — Focus reframing and mindset coaching\n\n` + `*(Running on free built-in local intelligence. You can also add your free Gemini API key in Settings anytime!)*`,
      source: 'local'
    };
  }
}
window.aiService = new AIService();

/* --- File: js/components/Icons.js --- */
// Taskio - Lucide Precision SVG Icons Component

const LucideIcons = {
  check: `<polyline points="20 6 9 17 4 12"></polyline>`,
  'check-circle-2': `<circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path>`,
  clock: `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`,
  calendar: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>`,
  flame: `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>`,
  bot: `<rect width="18" height="12" x="3" y="6" rx="2"></rect><circle cx="9" cy="10" r="1"></circle><circle cx="15" cy="10" r="1"></circle><path d="M12 2v4"></path><path d="M2 14h1"></path><path d="M21 14h1"></path><path d="M15 18v2"></path><path d="M9 18v2"></path>`,
  plus: `<path d="M5 12h14"></path><path d="M12 5v14"></path>`,
  trash2: `<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line>`,
  edit3: `<path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>`,
  play: `<polygon points="6 3 20 12 6 21 6 3"></polygon>`,
  pause: `<rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect>`,
  rotateccw: `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>`,
  barchart3: `<path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>`,
  settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>`,
  moon: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`,
  sun: `<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>`,
  'folder-kanban': `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path><path d="M8 10v4"></path><path d="M12 10v2"></path><path d="M16 10v6"></path>`,
  sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path>`,
  filter: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>`,
  search: `<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>`,
  'arrow-right': `<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>`,
  'chevron-down': `<path d="m6 9 6 6 6-6"></path>`,
  'chevron-left': `<path d="m15 18-6-6 6-6"></path>`,
  'chevron-right': `<path d="m9 18 6-6-6-6"></path>`,
  'alert-circle': `<circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line>`,
  award: `<circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>`,
  'book-open': `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>`,
  heart: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>`,
  inbox: `<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>`,
  'trending-up': `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline>`,
  activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
  sunrise: `<path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m8 6 4-4 4 4"></path><path d="M16 18a4 4 0 0 0-8 0"></path>`,
  'shield-alert': `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line>`,
  gem: `<path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M11 3 8 9l4 13 4-13-3-6"></path><path d="M2 9h20"></path>`,
  crown: `<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>`,
  target: `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>`,
  timer: `<line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle>`,
  copy: `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>`,
  x: `<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>`,
  download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line>`,
  upload: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line>`,
  'file-text': `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>`,
  compass: `<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>`,
  coffee: `<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" x2="6" y1="1" y2="4"></line><line x1="10" x2="10" y1="1" y2="4"></line><line x1="14" x2="14" y1="1" y2="4"></line>`
};
const Icon = ({
  name,
  size = 18,
  className = '',
  strokeWidth = 2,
  color = 'currentColor'
}) => {
  const normalized = (name || '').toLowerCase().replace(/_/g, '-');
  const svgContent = LucideIcons[normalized] || LucideIcons['sparkles'];
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `inline-block shrink-0 ${className}`,
    dangerouslySetInnerHTML: {
      __html: svgContent
    }
  });
};
window.Icon = Icon;

/* --- File: js/components/Navbar.js --- */
// Taskio - Apple Liquid Glass Navigation Bar

const Navbar = ({
  activeTab,
  setActiveTab,
  state,
  activeTimer,
  toggleTimer,
  onOpenTaskModal,
  onOpenSettings,
  onOpenNotifications,
  unreadNotificationsCount,
  onToggleTheme,
  onToggleMobileMenu
}) => {
  const [timeStr, setTimeStr] = React.useState('');
  const [dateStr, setDateStr] = React.useState('');
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      setDateStr(now.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  const levelInfo = window.gamificationService.getLevelInfo(state.gamification.xp);
  const isDark = state.theme === 'dark';
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-30 px-4 sm:px-8 py-3.5 transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-2xl px-4 py-2.5 flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onToggleMobileMenu();
    },
    className: "p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 md:hidden transition-all active:scale-95",
    title: "Navigation Menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-kanban",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl liquid-glass-subtle"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative flex h-2 w-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
  }), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono font-medium tracking-tight tabular-nums text-[var(--text-primary)]"
  }, timeStr), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] border-l border-white/10 pl-2"
  }, dateStr))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, activeTimer ? /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('timer');
    },
    className: "flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 apple-active-pulse cursor-pointer backdrop-blur-md transition-all hover:bg-rose-500/15"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "timer",
    size: 14,
    className: "animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono font-bold tracking-tight tabular-nums text-rose-500"
  }, activeTimer.displayTime), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium max-w-[120px] sm:max-w-[220px] truncate text-[var(--text-primary)]"
  }, activeTimer.title), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      window.audioService.playButtonTap();
      toggleTimer(activeTimer.taskId);
    },
    className: "p-1 rounded-full hover:bg-rose-500/20 text-rose-500",
    title: "Pause Timer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 12
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center space-x-2 text-xs text-[var(--text-muted)] font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-blue-500/60"
  }), /*#__PURE__*/React.createElement("span", null, "Focus state active"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 sm:space-x-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenTaskModal();
    },
    className: "flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "New Task")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('gamification');
    },
    className: "hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl liquid-glass-subtle hover:border-amber-400/40 transition-all text-xs",
    title: `Level ${levelInfo.level}: ${levelInfo.title} (${state.gamification.xp} XP)`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 14,
    className: "text-amber-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-amber-500"
  }, state.gamification.streak, "d"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[var(--text-secondary)] border-l border-white/10 pl-1.5"
  }, "Lv.", levelInfo.level)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenNotifications();
    },
    className: "relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all active:scale-95",
    title: "Notifications"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18
  }), unreadNotificationsCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm"
  }, unreadNotificationsCount)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onToggleTheme();
    },
    className: "relative p-1.5 rounded-xl liquid-glass-subtle hover:bg-white/15 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95 flex items-center justify-center",
    title: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`
  }, isDark ? /*#__PURE__*/React.createElement(Icon, {
    name: "moon",
    size: 17,
    className: "text-indigo-400"
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 17,
    className: "text-amber-500"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenSettings();
    },
    className: "p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all active:scale-95",
    title: "Settings"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18
  })))));
};
window.Navbar = Navbar;

/* --- File: js/components/Sidebar.js --- */
// Taskio - Apple Liquid Glass Sidebar Navigation

const Sidebar = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  state
}) => {
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'compass',
    badge: null
  }, {
    id: 'routine',
    label: 'Daily Planner',
    icon: 'sunrise',
    badge: state.tasks.filter(t => t.date === new Date().toISOString().slice(0, 10) && !t.completed).length
  }, {
    id: 'projects',
    label: 'Projects',
    icon: 'folder-kanban',
    badge: state.projects.filter(p => p.status !== 'Completed').length
  }, {
    id: 'timer',
    label: 'Focus & Timers',
    icon: 'timer',
    badge: null
  }, {
    id: 'calendar',
    label: 'Calendar',
    icon: 'calendar',
    badge: state.tasks.filter(t => !t.completed && t.deadline && t.deadline < new Date().toISOString().slice(0, 10)).length ? '!' : null,
    alert: true
  }, {
    id: 'analytics',
    label: 'Analytics',
    icon: 'barchart3',
    badge: null
  }, {
    id: 'gamification',
    label: 'Streaks & Rewards',
    icon: 'trophy',
    badge: `${state.gamification.streak}d`
  }, {
    id: 'ai',
    label: 'AI Assistant',
    icon: 'bot',
    badge: 'AI',
    siri: true
  }];
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter(t => t.date === todayStr);
  const completedToday = todayTasks.filter(t => t.completed).length;
  const targetTasks = state.user.dailyGoalTasks || 5;
  const goalProgress = Math.min(100, Math.round(completedToday / targetTasks * 100));
  const handleNavClick = tabId => {
    window.audioService.playButtonTap();
    setActiveTab(tabId);
    setMobileOpen(false);
  };
  const content = /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col h-full justify-between p-3.5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-3 py-3 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 cursor-pointer group",
    onClick: () => handleNavClick('dashboard')
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 20
  })), !isCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-bold text-base tracking-tight text-[var(--text-primary)] leading-tight"
  }, "Taskio"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] tracking-wider uppercase text-[var(--text-muted)] font-semibold"
  }, "Productivity Glass"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setIsCollapsed(!isCollapsed);
    },
    className: "hidden lg:flex p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors",
    title: isCollapsed ? 'Expand' : 'Collapse'
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isCollapsed ? 'chevron-right' : 'chevron-left',
    size: 15
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "space-y-1"
  }, navItems.map(item => {
    const isActive = activeTab === item.id;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => handleNavClick(item.id),
      className: `w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all ${isActive ? 'liquid-glass-elevated text-[var(--text-primary)] border-white/20 shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'}`,
      title: item.label
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `${isActive ? 'text-blue-500 dark:text-blue-400' : item.siri ? 'text-purple-500 dark:text-purple-400' : 'text-[var(--text-muted)]'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: item.icon,
      size: 18
    })), !isCollapsed && /*#__PURE__*/React.createElement("span", {
      className: "font-semibold"
    }, item.label)), !isCollapsed && item.badge !== null && /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-blue-500/15 text-blue-500 dark:text-blue-400 border border-blue-500/30' : item.alert ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30' : item.siri ? 'bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/30' : 'bg-white/10 text-[var(--text-muted)]'}`
    }, item.badge));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-3"
  }, !isCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 rounded-2xl liquid-glass-subtle space-y-2.5 border border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[var(--text-secondary)] flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "target",
    size: 13,
    className: "text-amber-500"
  }), " Daily Target"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-[var(--text-primary)]"
  }, completedToday, "/", targetTasks)), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white/10 rounded-full h-1.5 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500",
    style: {
      width: `${goalProgress}%`
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-[var(--text-muted)] text-right"
  }, goalProgress >= 100 ? 'Goal Conquered! 🌟' : `${targetTasks - completedToday} more to hit goal`)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-2 rounded-2xl liquid-glass-subtle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2.5 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-sm shrink-0"
  }, state.user.avatarEmoji || '✨'), !isCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)] truncate"
  }, state.user.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-[var(--text-muted)] truncate"
  }, state.user.title))))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("aside", {
    className: `hidden md:block shrink-0 h-screen sticky top-0 p-3 transition-all duration-300 z-20 ${isCollapsed ? 'w-24' : 'w-64'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-3xl liquid-glass overflow-hidden shadow-2xl"
  }, content)), mobileOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 md:hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: () => setMobileOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-y-0 left-0 max-w-xs w-full p-3 z-50 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-3xl liquid-glass-elevated shadow-2xl overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end p-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMobileOpen(false),
    className: "p-1.5 rounded-xl text-[var(--text-secondary)] hover:bg-white/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), content))));
};
window.Sidebar = Sidebar;

/* --- File: js/components/Dashboard.js --- */
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
    setQuoteIndex(prev => (prev + 1) % quotes.length);
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
  const productivityRate = todayTasks.length > 0 ? Math.round(completedToday.length / todayTasks.length * 100) : 0;
  const totalSecondsToday = todayTasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
  const hours = Math.floor(totalSecondsToday / 3600);
  const minutes = Math.floor(totalSecondsToday % 3600 / 60);
  const workTimeFormatted = `${hours}h ${minutes}m`;
  const upcomingDeadlines = state.tasks.filter(t => !t.completed && t.deadline && t.deadline >= todayStr).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 3);
  const levelInfo = window.gamificationService.getLevelInfo(state.gamification.xp);

  // SVG Ring Progress Calculations (Apple Watch style)
  const ringRadius = 26;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - productivityRate / 100 * ringCircumference;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-7xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center space-x-2 px-3 py-1 rounded-full liquid-glass-subtle text-xs font-semibold text-[var(--text-secondary)] border border-white/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: greetingIcon,
    size: 14,
    className: "text-amber-500"
  }), /*#__PURE__*/React.createElement("span", null, greeting, ", ", state.user.name || 'Friend')), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
  }, "Focus & High-Performance Space"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-[var(--text-secondary)] max-w-xl"
  }, "You have ", pendingToday.length, " tasks scheduled today across ", activeProjects.length, " active initiatives.")), /*#__PURE__*/React.createElement("div", {
    onClick: rotateQuote,
    className: "group cursor-pointer p-4 rounded-2xl liquid-glass-subtle max-w-sm hover:border-white/30 transition-all active:scale-[0.98] shrink-0 border border-white/10 shadow-sm",
    title: "Click to cycle next motivational thought"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs text-[var(--text-muted)] mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1 font-semibold text-amber-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 12
  }), " Thought of the Day"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] group-hover:text-blue-500 font-mono"
  }, "refresh \u21BB")), /*#__PURE__*/React.createElement("p", {
    className: "italic text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed"
  }, "\u201C", quotes[quoteIndex].quote, "\u201D"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-[var(--text-muted)] mt-1.5 text-right font-semibold"
  }, "\u2014 ", quotes[quoteIndex].author)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-card p-5 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Today's Tasks"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-emerald-500/10 text-emerald-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]"
  }, completedToday.length), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] font-mono"
  }, "/ ", todayTasks.length)), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-[var(--text-muted)] mt-1 block"
  }, pendingToday.length, " pending")), /*#__PURE__*/React.createElement("div", {
    className: "relative w-14 h-14 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full transform -rotate-90",
    viewBox: "0 0 60 60"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "30",
    cy: "30",
    r: ringRadius,
    stroke: "rgba(120, 120, 128, 0.2)",
    strokeWidth: "5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "30",
    cy: "30",
    r: ringRadius,
    stroke: "#34C759",
    strokeWidth: "5",
    strokeLinecap: "round",
    fill: "none",
    strokeDasharray: ringCircumference,
    strokeDashoffset: ringOffset,
    className: "transition-all duration-700"
  })), /*#__PURE__*/React.createElement("span", {
    className: "absolute text-[10px] font-mono font-bold text-[var(--text-primary)]"
  }, productivityRate, "%")))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-card p-5 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Productivity Rate"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-blue-500/10 text-blue-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "activity",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]"
  }, productivityRate, "%"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-blue-500 font-semibold"
  }, productivityRate >= 70 ? '★ Flow State' : 'In Progress')), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-[var(--text-muted)] mt-2 truncate font-mono"
  }, state.pomodoro.sessionsCompleted, " Pomodoro intervals"))), /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('gamification');
    },
    className: "liquid-glass-card p-5 flex flex-col justify-between cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Streak Momentum"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-amber-500/10 text-amber-500 animate-pulse"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-500"
  }, state.gamification.streak), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider"
  }, "Days")), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono"
  }, /*#__PURE__*/React.createElement("span", null, "Lv.", levelInfo.level, " ", levelInfo.title.split(' ')[0]), /*#__PURE__*/React.createElement("span", null, state.gamification.xp, " XP")))), /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('timer');
    },
    className: "liquid-glass-card p-5 flex flex-col justify-between cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Focus Time"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-purple-500/10 text-purple-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "timer",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline space-x-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]"
  }, workTimeFormatted)), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-[var(--text-muted)] mt-2 font-mono"
  }, "Target: ", state.user.dailyGoalHours || 4, "h daily goal")))), overdueTasks.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 rounded-3xl liquid-glass border-rose-500/30 bg-rose-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 rounded-2xl bg-rose-500/20 text-rose-500 shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-alert",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-[var(--text-primary)]"
  }, overdueTasks.length, " Overdue Task", overdueTasks.length > 1 ? 's' : '', " Require Attention"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-secondary)]"
  }, "\u201C", overdueTasks[0].title, "\u201D is past its deadline. Rescue it today to earn the Overdue Crusher badge!"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('routine');
    },
    className: "px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
  }, "Open in Planner"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('ai');
    },
    className: "px-3.5 py-1.5 rounded-xl liquid-glass-subtle border border-rose-500/30 text-[var(--text-primary)] text-xs font-semibold hover:bg-rose-500/15 transition-all active:scale-95"
  }, "Ask AI to Rescue"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sunrise",
    size: 18,
    className: "text-blue-500"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-[var(--text-primary)]"
  }, "Today's Priority Routine")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('routine');
    },
    className: "text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
  }, "Full Daily Timeline ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 12
  }))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-5 space-y-3"
  }, todayTasks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8 text-[var(--text-muted)] space-y-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 32,
    className: "mx-auto text-[var(--text-muted)]"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium"
  }, "No tasks scheduled for today yet."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenTaskModal();
    },
    className: "px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-medium"
  }, "Create First Task")) : todayTasks.slice(0, 5).map(task => {
    const isRunning = activeTimerId === task.id;
    return /*#__PURE__*/React.createElement("div", {
      key: task.id,
      className: `p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${task.completed ? 'liquid-glass-subtle opacity-70' : isRunning ? 'bg-rose-500/10 border-rose-500/40 shadow-sm apple-active-pulse' : 'liquid-glass-subtle hover:border-white/30'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start space-x-3.5 overflow-hidden"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: task.completed,
      onChange: () => {
        window.audioService.playCheckbox();
        onToggleTaskComplete(task.id);
      },
      className: "apple-checkbox mt-0.5",
      "aria-label": `Mark "${task.title}" as complete`
    }), /*#__PURE__*/React.createElement("div", {
      className: "overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement("h4", {
      className: `text-sm font-bold truncate ${task.completed ? 'apple-task-completed' : 'text-[var(--text-primary)]'}`
    }, task.title), /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${task.priority === 'Urgent' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30' : task.priority === 'High' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'}`
    }, task.priority)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 text-xs text-[var(--text-muted)] mt-1 font-mono tabular-nums"
    }, task.startTime && task.endTime && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 12
    }), " ", task.startTime, " \u2013 ", task.endTime), /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "tag",
      size: 12
    }), " ", task.category), task.subtasks && task.subtasks.length > 0 && /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-sans"
    }, task.subtasks.filter(s => s.completed).length, "/", task.subtasks.length, " subtasks")))), !task.completed && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTimerStart();
        onToggleTimer(task.id);
      },
      className: `p-2 rounded-xl transition-all shrink-0 active:scale-95 ${isRunning ? 'bg-rose-600 text-white shadow-md' : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-rose-500'}`,
      title: isRunning ? 'Pause Timer' : 'Start Task Timer'
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isRunning ? 'pause' : 'play',
      size: 14
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-5 space-y-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-[var(--text-primary)] flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 15,
    className: "text-amber-500"
  }), " Quick Actions"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenTaskModal();
    },
    className: "p-3 rounded-2xl liquid-glass-subtle hover:border-blue-500/40 text-left transition-all active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16,
    className: "text-blue-500 mb-1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)]"
  }, "New Task"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-[var(--text-muted)]"
  }, "Add to routine")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('timer');
    },
    className: "p-3 rounded-2xl liquid-glass-subtle hover:border-rose-500/40 text-left transition-all active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "timer",
    size: 16,
    className: "text-rose-500 mb-1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)]"
  }, "Pomodoro"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-[var(--text-muted)]"
  }, "25m sprint")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('ai');
    },
    className: "p-3 rounded-2xl liquid-glass-subtle hover:border-purple-500/40 text-left transition-all active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bot",
    size: 16,
    className: "text-purple-500 mb-1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)]"
  }, "AI Assistant"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-[var(--text-muted)]"
  }, "Plan & organize")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('projects');
    },
    className: "p-3 rounded-2xl liquid-glass-subtle hover:border-indigo-500/40 text-left transition-all active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-kanban",
    size: 16,
    className: "text-indigo-500 mb-1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)]"
  }, "Projects"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-[var(--text-muted)]"
  }, "Deliverables")))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-5 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-[var(--text-primary)] flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 15,
    className: "text-rose-500"
  }), " Upcoming Deadlines"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setActiveTab('calendar');
    },
    className: "text-xs text-blue-500 hover:text-blue-600 font-semibold"
  }, "Calendar")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, upcomingDeadlines.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)] italic py-2"
  }, "No pressing deadlines this week.") : upcomingDeadlines.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "p-2.5 rounded-xl liquid-glass-subtle flex items-center justify-between border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden pr-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)] truncate"
  }, t.title), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-[var(--text-muted)] font-mono"
  }, t.category)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30 shrink-0"
  }, "Due ", t.deadline === todayStr ? 'Today' : t.deadline))))))));
};
window.Dashboard = Dashboard;

/* --- File: js/components/RoutinePlanner.js --- */
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
  const dayTasks = state.tasks.filter(t => {
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
  const progressPercent = sortedTasks.length > 0 ? Math.round(completedCount / sortedTasks.length * 100) : 0;
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
        setNewSubtaskInputs(prev => ({
          ...prev,
          [taskId]: ''
        }));
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-5xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)] font-mono"
  }, "Routine Timeline"), isToday && /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
  }, "Today")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
  }, formattedDate)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrevDay,
    className: "p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    title: "Previous Day"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: selectedDate,
    onChange: e => setSelectedDate(e.target.value),
    className: "px-3.5 py-1.5 rounded-xl liquid-glass-subtle text-xs font-mono font-medium text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleNextDay,
    className: "p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    title: "Next Day"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17
  })), !isToday && /*#__PURE__*/React.createElement("button", {
    onClick: handleTodayJump,
    className: "px-3.5 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }, "Jump to Today"))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[var(--text-primary)] font-mono tabular-nums"
  }, completedCount, " of ", sortedTasks.length, " Completed"), /*#__PURE__*/React.createElement("div", {
    className: "w-32 bg-white/10 rounded-full h-2 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500",
    style: {
      width: `${progressPercent}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-emerald-500 tabular-nums"
  }, progressPercent, "%")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setViewMode('timeline');
    },
    className: `px-3 py-1 rounded-xl text-xs font-semibold transition-all ${viewMode === 'timeline' ? 'bg-blue-600 text-white shadow-sm' : 'liquid-glass-subtle text-[var(--text-secondary)]'}`
  }, "Timeline Ribbon"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setViewMode('cards');
    },
    className: `px-3 py-1 rounded-xl text-xs font-semibold transition-all ${viewMode === 'cards' ? 'bg-blue-600 text-white shadow-sm' : 'liquid-glass-subtle text-[var(--text-secondary)]'}`
  }, "Cards Grid"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenTaskModal(selectedDate);
    },
    className: "flex items-center space-x-1 px-3.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm ml-2 active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " ", /*#__PURE__*/React.createElement("span", null, "Add Task")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onClearDayTasks(selectedDate);
    },
    title: "Delete all tasks for this day",
    className: "flex items-center space-x-1 px-3 py-1 rounded-xl liquid-glass-button text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    size: 13
  }), " ", /*#__PURE__*/React.createElement("span", null, "Clear Day")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onStartFresh();
    },
    title: "Wipe all data and start a blank fresh Taskio",
    className: "flex items-center space-x-1 px-3 py-1 rounded-xl liquid-glass-button text-xs font-semibold text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 border border-orange-500/20 active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh-cw",
    size: 13
  }), " ", /*#__PURE__*/React.createElement("span", null, "Start Fresh"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl liquid-glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5"
  }, ['all', 'pending', 'completed'].map(st => /*#__PURE__*/React.createElement("button", {
    key: st,
    onClick: () => {
      window.audioService.playButtonTap();
      setFilterStatus(st);
    },
    className: `px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${filterStatus === st ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:bg-white/5'}`
  }, st))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: filterCategory,
    onChange: e => setFilterCategory(e.target.value),
    className: "px-3 py-1 rounded-xl liquid-glass-subtle text-xs text-[var(--text-secondary)] focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All Categories"), window.PLANNER_CONSTANTS.CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.name))), /*#__PURE__*/React.createElement("select", {
    value: filterPriority,
    onChange: e => setFilterPriority(e.target.value),
    className: "px-3 py-1 rounded-xl liquid-glass-subtle text-xs text-[var(--text-secondary)] focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All Priorities"), /*#__PURE__*/React.createElement("option", {
    value: "Urgent"
  }, "Urgent"), /*#__PURE__*/React.createElement("option", {
    value: "High"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "Medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "Low"
  }, "Low")), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Filter tasks...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    className: "pl-7 pr-3 py-1 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none w-36 sm:w-44"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute left-2.5 top-1.5 text-[var(--text-muted)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 12
  }))))), sortedTasks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-12 text-center rounded-3xl liquid-glass space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-2xl liquid-glass-subtle text-[var(--text-muted)] flex items-center justify-center mx-auto"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sunrise",
    size: 24
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-[var(--text-primary)]"
  }, "A Clean Canvas for ", formattedDate), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-secondary)] max-w-sm mx-auto"
  }, "No tasks found with current filters. Create an intentional schedule for this day."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenTaskModal(selectedDate);
    },
    className: "inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " ", /*#__PURE__*/React.createElement("span", null, "Create New Task"))) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, sortedTasks.map(task => {
    const project = state.projects.find(p => p.id === task.projectId);
    const isRunning = activeTimerId === task.id;
    const completedSubtasks = (task.subtasks || []).filter(s => s.completed).length;
    const totalSubtasks = (task.subtasks || []).length;
    return /*#__PURE__*/React.createElement("div", {
      key: task.id,
      className: `p-5 rounded-3xl transition-all relative overflow-hidden ${task.completed ? 'liquid-glass-subtle opacity-75' : isRunning ? 'liquid-glass-elevated border-rose-500/40 apple-active-pulse' : 'liquid-glass-card'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start space-x-3.5 flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: task.completed,
      onChange: () => {
        window.audioService.playCheckbox();
        onToggleTaskComplete(task.id);
      },
      className: "apple-checkbox mt-1",
      "aria-label": `Mark task ${task.title} as completed`
    }), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center gap-2"
    }, /*#__PURE__*/React.createElement("h3", {
      className: `text-base font-bold leading-snug break-words ${task.completed ? 'apple-task-completed' : 'text-[var(--text-primary)]'}`
    }, task.title), /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${task.priority === 'Urgent' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30' : task.priority === 'High' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'}`
    }, task.priority), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)] font-medium flex items-center gap-1 shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "tag",
      size: 11
    }), " ", task.category), project && /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/30 font-medium flex items-center gap-1 shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "folder-kanban",
      size: 11
    }), " ", project.name)), task.description && /*#__PURE__*/React.createElement("p", {
      className: `text-xs leading-relaxed ${task.completed ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-secondary)]'}`
    }, task.description), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center gap-3 pt-1 text-xs text-[var(--text-muted)] font-mono tabular-nums"
    }, task.startTime && task.endTime && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1 liquid-glass-subtle px-2 py-0.5 rounded-lg border border-white/10"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 12,
      className: "text-amber-500"
    }), " ", task.startTime, " \u2013 ", task.endTime), task.deadline && /*#__PURE__*/React.createElement("span", {
      className: `flex items-center gap-1 px-2 py-0.5 rounded-lg ${task.deadline < selectedDate && !task.completed ? 'text-rose-500 bg-rose-500/15 font-bold border border-rose-500/30' : ''}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert-circle",
      size: 12
    }), " Deadline: ", task.deadline), task.timeSpent > 0 && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1 text-[var(--text-secondary)]"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "timer",
      size: 12,
      className: "text-blue-500"
    }), " Logged: ", Math.floor(task.timeSpent / 60), "m")), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 pt-3 border-t border-white/10 space-y-2"
    }, totalSubtasks > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs text-[var(--text-muted)] font-medium mb-1"
    }, /*#__PURE__*/React.createElement("span", null, "Checklist (", completedSubtasks, "/", totalSubtasks, ")"), /*#__PURE__*/React.createElement("div", {
      className: "w-24 bg-white/10 rounded-full h-1 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-emerald-400 h-full rounded-full",
      style: {
        width: `${Math.round(completedSubtasks / totalSubtasks * 100)}%`
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5"
    }, (task.subtasks || []).map(st => /*#__PURE__*/React.createElement("div", {
      key: st.id,
      className: "flex items-center space-x-2 text-xs"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: st.completed,
      onChange: () => {
        window.audioService.playCheckbox();
        onToggleSubtask(task.id, st.id);
      },
      className: "w-3.5 h-3.5 rounded border-white/20 text-emerald-500 focus:ring-0 cursor-pointer"
    }), /*#__PURE__*/React.createElement("span", {
      className: st.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
    }, st.title)))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 pt-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12,
      className: "text-[var(--text-muted)]"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Add subtask (press Enter)...",
      value: newSubtaskInputs[task.id] || '',
      onChange: e => setNewSubtaskInputs({
        ...newSubtaskInputs,
        [task.id]: e.target.value
      }),
      onKeyDown: e => handleSubtaskKeyDown(task.id, e),
      className: "bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none w-full"
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10"
    }, !task.completed && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTimerStart();
        onToggleTimer(task.id);
      },
      className: `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${isRunning ? 'bg-rose-600 text-white shadow-md' : 'liquid-glass-button text-[var(--text-primary)] hover:text-rose-500'}`,
      title: isRunning ? 'Pause Timer' : 'Start Task Stopwatch'
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isRunning ? 'pause' : 'play',
      size: 13
    }), /*#__PURE__*/React.createElement("span", null, isRunning ? 'Running' : 'Track')), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1 text-[var(--text-muted)]"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playButtonTap();
        onEditTask(task);
      },
      className: "p-1.5 rounded-lg hover:text-[var(--text-primary)] hover:bg-white/10",
      title: "Edit Task"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit3",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTaskCreate();
        onDuplicateTask(task);
      },
      className: "p-1.5 rounded-lg hover:text-[var(--text-primary)] hover:bg-white/10",
      title: "Duplicate Task"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playButtonTap();
        onRescheduleTask(task);
      },
      className: "p-1.5 rounded-lg hover:text-amber-500 hover:bg-white/10",
      title: "Reschedule to Tomorrow"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTaskDelete();
        onDeleteTask(task.id);
      },
      className: "p-1.5 rounded-lg hover:text-rose-500 hover:bg-white/10",
      title: "Delete Task"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash2",
      size: 14
    }))))));
  })));
};
window.RoutinePlanner = RoutinePlanner;

/* --- File: js/components/ProjectsView.js --- */
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
  const selectedProjectTasks = selectedProject ? state.tasks.filter(t => t.projectId === selectedProject.id) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-7xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
  }, "Project Deliverables"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[var(--text-secondary)] mt-1"
  }, "Track strategic initiatives, milestone velocity, and completion deadlines.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenProjectModal();
    },
    className: "flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "New Project"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 overflow-x-auto pb-1"
  }, ['All', 'In Progress', 'Completed', 'On Hold', 'Not Started'].map(st => /*#__PURE__*/React.createElement("button", {
    key: st,
    onClick: () => {
      window.audioService.playButtonTap();
      setStatusFilter(st);
    },
    className: `px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${statusFilter === st ? 'bg-blue-600 text-white shadow-sm' : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, st))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, filteredProjects.map(project => {
    const pTasks = state.tasks.filter(t => t.projectId === project.id);
    const completedCount = pTasks.filter(t => t.completed).length;
    const totalCount = pTasks.length;
    const progressPercent = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
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
    return /*#__PURE__*/React.createElement("div", {
      key: project.id,
      className: "liquid-glass-card p-6 flex flex-col justify-between space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 rounded-2xl liquid-glass-subtle flex items-center justify-center text-blue-500 border border-white/10 shadow-sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: project.icon || 'folder-kanban',
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${project.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' : project.status === 'Overdue' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30' : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'}`
    }, project.status), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-semibold px-2 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)]"
    }, project.priority))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold text-[var(--text-primary)] hover:text-blue-500 cursor-pointer transition-colors",
      onClick: () => {
        window.audioService.playButtonTap();
        setSelectedProjectId(project.id);
      }
    }, project.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed"
    }, project.description || 'No description provided.')), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 pt-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-[var(--text-secondary)]"
    }, "Milestone Progress"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono font-bold text-[var(--text-primary)] tabular-nums"
    }, progressPercent, "%")), /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-white/10 rounded-full h-2 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500",
      style: {
        width: `${progressPercent}%`
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "pt-3 border-t border-white/10 space-y-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs font-mono tabular-nums text-[var(--text-muted)]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1 font-sans"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle-2",
      size: 13,
      className: "text-emerald-500"
    }), " ", completedCount, "/", totalCount, " tasks"), /*#__PURE__*/React.createElement("span", {
      className: `flex items-center gap-1 ${isOverdue ? 'text-rose-500 font-bold' : ''}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 13
    }), " ", countdownText), /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "timer",
      size: 13,
      className: "text-purple-500"
    }), " ", hours, "h")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between pt-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playButtonTap();
        setSelectedProjectId(project.id);
      },
      className: "text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1"
    }, "Open Tasks (", pTasks.length, ") ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 12
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playButtonTap();
        onEditProject(project);
      },
      className: "p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10",
      title: "Edit Project"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit3",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTaskDelete();
        onDeleteProject(project.id);
      },
      className: "p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-white/10",
      title: "Delete Project"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash2",
      size: 14
    }))))));
  })), selectedProject && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: () => setSelectedProjectId(null)
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-2xl liquid-glass-elevated rounded-3xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-secondary)]"
  }, selectedProject.status), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-[var(--text-muted)]"
  }, "Deadline: ", selectedProject.finalDeadline)), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-[var(--text-primary)] mt-1"
  }, selectedProject.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[var(--text-secondary)] mt-1"
  }, selectedProject.description)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedProjectId(null),
    className: "p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), selectedProject.notes && /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl liquid-glass-subtle text-xs text-[var(--text-secondary)]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold block text-[var(--text-primary)] mb-1"
  }, "Project Notes:"), selectedProject.notes), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-base font-bold text-[var(--text-primary)]"
  }, "Project Tasks (", selectedProjectTasks.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onOpenTaskModal(todayStr, selectedProject.id);
    },
    className: "flex items-center space-x-1 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " ", /*#__PURE__*/React.createElement("span", null, "Add Task"))), selectedProjectTasks.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)] italic py-4 text-center"
  }, "No tasks linked to this project yet.") : /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, selectedProjectTasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "p-3.5 rounded-2xl liquid-glass-subtle flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 overflow-hidden"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: t.completed,
    onChange: () => {
      window.audioService.playCheckbox();
      onToggleTaskComplete(t.id);
    },
    className: "apple-checkbox"
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-medium truncate ${t.completed ? 'apple-task-completed' : 'text-[var(--text-primary)]'}`
  }, t.title)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono px-2 py-0.5 rounded-full liquid-glass-subtle text-[var(--text-muted)]"
  }, t.priority))))))));
};
window.ProjectsView = ProjectsView;

/* --- File: js/components/FocusTimer.js --- */
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
  const handleSaveSettings = e => {
    e.preventDefault();
    window.audioService.playButtonTap();
    onUpdatePomodoroSettings({
      workDuration: parseInt(workMins) || 25,
      shortBreakDuration: parseInt(shortMins) || 5,
      longBreakDuration: parseInt(longMins) || 15
    });
    setShowSettings(false);
  };
  const totalDuration = mode === 'work' ? state.pomodoro.workDuration * 60 : mode === 'shortBreak' ? state.pomodoro.shortBreakDuration * 60 : state.pomodoro.longBreakDuration * 60;
  const progressPercent = Math.round((totalDuration - timeLeft) / totalDuration * 100);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressPercent / 100 * circumference;
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter(t => t.date === todayStr);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-5xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
  }, "Focus & Time Management"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[var(--text-secondary)] mt-1"
  }, "Apple visionOS inspired circular glass focus tracker & task stopwatch.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setShowSettings(true);
    },
    className: "flex items-center space-x-1.5 px-3.5 py-2 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 15
  }), " ", /*#__PURE__*/React.createElement("span", null, "Timer Settings"))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center space-y-7 relative overflow-hidden shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1 p-1 rounded-2xl liquid-glass-subtle"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setMode('work');
    },
    className: `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${mode === 'work' ? 'bg-rose-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, "Focus (25m)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setMode('shortBreak');
    },
    className: `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, "Short Break (5m)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setMode('longBreak');
    },
    className: `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${mode === 'longBreak' ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, "Long Break (15m)")), /*#__PURE__*/React.createElement("div", {
    className: "relative w-72 h-72 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full transform -rotate-90",
    viewBox: "0 0 260 260"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "130",
    r: radius,
    stroke: "rgba(120, 120, 128, 0.2)",
    strokeWidth: "10",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "130",
    r: radius,
    stroke: mode === 'work' ? '#FF2D55' : mode === 'shortBreak' ? '#34C759' : '#0071E3',
    strokeWidth: "10",
    strokeLinecap: "round",
    fill: "none",
    strokeDasharray: circumference,
    strokeDashoffset: strokeDashoffset,
    className: "transition-all duration-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute flex flex-col items-center justify-center text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-5xl sm:text-6xl font-bold tracking-tight tabular-nums text-[var(--text-primary)]"
  }, timeFormatted), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mt-1.5"
  }, mode === 'work' ? 'Deep Work Interval' : 'Mindful Pause'), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-[var(--text-muted)] mt-1 font-mono"
  }, "Completed #", state.pomodoro.sessionsCompleted))), /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm space-y-1.5 text-center"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Link to Scheduled Task"), /*#__PURE__*/React.createElement("select", {
    value: selectedTaskId,
    onChange: e => setSelectedTaskId(e.target.value),
    className: "w-full px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "General Focus (No specific task)"), state.tasks.filter(t => !t.completed).map(t => /*#__PURE__*/React.createElement("option", {
    key: t.id,
    value: t.id
  }, t.title)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: resetPomodoro,
    className: "p-3.5 rounded-2xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    title: "Reset Timer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotateccw",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    onClick: togglePomodoro,
    className: `px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center space-x-2 ${isRunning ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25' : mode === 'work' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isRunning ? 'pause' : 'play',
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, isRunning ? 'Pause Session' : 'Start Focus')))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-6 sm:p-7 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "timer",
    size: 18,
    className: "text-rose-500"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-[var(--text-primary)]"
  }, "Task Stopwatches")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] italic"
  }, "Single active timer policy enforced")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2.5"
  }, todayTasks.filter(t => !t.completed).length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)] italic py-4 text-center"
  }, "All tasks for today are completed or no tasks scheduled.") : todayTasks.filter(t => !t.completed).map(t => {
    const isRunning = activeTimerId === t.id;
    const mins = Math.floor((t.timeSpent || 0) / 60);
    const secs = (t.timeSpent || 0) % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: `p-3.5 rounded-2xl border flex items-center justify-between transition-all ${isRunning ? 'bg-rose-500/10 border-rose-500/30 shadow-sm apple-active-pulse' : 'liquid-glass-subtle'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "overflow-hidden pr-3"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-[var(--text-primary)] truncate"
    }, t.title), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] text-[var(--text-muted)] font-mono"
    }, t.category, " \u2022 ", t.priority)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 shrink-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-sm font-bold text-[var(--text-primary)] tabular-nums"
    }, formatted), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTimerStart();
        onToggleTimer(t.id);
      },
      className: `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 active:scale-95 ${isRunning ? 'bg-rose-600 text-white' : 'liquid-glass-button text-[var(--text-primary)] hover:text-rose-500'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isRunning ? 'pause' : 'play',
      size: 13
    }), /*#__PURE__*/React.createElement("span", null, isRunning ? 'Pause' : 'Track'))));
  }))), showSettings && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: () => setShowSettings(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-md liquid-glass-elevated rounded-3xl p-6 space-y-5 z-10 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-[var(--text-primary)]"
  }, "Custom Pomodoro Durations"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSettings(false),
    className: "p-1 rounded-lg text-[var(--text-muted)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveSettings,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Work Interval (Minutes)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "120",
    value: workMins,
    onChange: e => setWorkMins(e.target.value),
    className: "w-full mt-1 px-3 py-2 rounded-xl liquid-glass-subtle text-sm focus:outline-none"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Short Break (Minutes)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "30",
    value: shortMins,
    onChange: e => setShortMins(e.target.value),
    className: "w-full mt-1 px-3 py-2 rounded-xl liquid-glass-subtle text-sm focus:outline-none"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Long Break (Minutes)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "60",
    value: longMins,
    onChange: e => setLongMins(e.target.value),
    className: "w-full mt-1 px-3 py-2 rounded-xl liquid-glass-subtle text-sm focus:outline-none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowSettings(false),
    className: "px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)]"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
  }, "Save Settings"))))));
};
window.FocusTimer = FocusTimer;

/* --- File: js/components/CalendarView.js --- */
// Taskio - Apple Liquid Glass Calendar & Deadline Management

const CalendarView = ({
  state,
  onSelectDate,
  onOpenTaskModal,
  onRescheduleTask
}) => {
  const [viewMode, setViewMode] = React.useState('month');
  const [currentYear, setCurrentYear] = React.useState(2026);
  const [currentMonth, setCurrentMonth] = React.useState(10); // 10 is November

  const todayStr = new Date().toISOString().slice(0, 10);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const handlePrevMonth = () => {
    window.audioService.playButtonTap();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };
  const handleNextMonth = () => {
    window.audioService.playButtonTap();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };
  const handleCurrentMonthJump = () => {
    window.audioService.playButtonTap();
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  };
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  const calendarDays = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: false
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: true
    });
  }
  const remaining = (7 - calendarDays.length % 7) % 7;
  for (let d = 1; d <= remaining; d++) {
    const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: false
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-7xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
  }, monthNames[currentMonth], " ", currentYear), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[var(--text-secondary)] mt-1"
  }, "Deadlines, scheduled commitments, and milestone allocations.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center p-1 rounded-2xl liquid-glass-subtle mr-2"
  }, ['month', 'week', 'day'].map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => {
      window.audioService.playButtonTap();
      setViewMode(m);
    },
    className: `px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${viewMode === m ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, m))), /*#__PURE__*/React.createElement("button", {
    onClick: handlePrevMonth,
    className: "p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    title: "Previous Month"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 17
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleCurrentMonthJump,
    className: "px-3.5 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }, "Current"), /*#__PURE__*/React.createElement("button", {
    onClick: handleNextMonth,
    className: "p-2 rounded-xl liquid-glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    title: "Next Month"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17
  })))), viewMode === 'month' && /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-5 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1 text-center pb-3 border-b border-white/10 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider"
  }, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "py-1"
  }, d))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1.5 pt-3"
  }, calendarDays.map((cell, idx) => {
    const isToday = cell.dateStr === todayStr;
    const cellTasks = state.tasks.filter(t => t.date === cell.dateStr);
    const cellDeadlines = state.tasks.filter(t => t.deadline === cell.dateStr);
    const overdueTasks = cellTasks.filter(t => !t.completed && cell.dateStr < todayStr);
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      onClick: () => {
        window.audioService.playButtonTap();
        onSelectDate(cell.dateStr);
      },
      className: `min-h-[100px] sm:min-h-[115px] p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${isToday ? 'liquid-glass-elevated border-blue-500/50 shadow-md ring-1 ring-blue-500/20' : cell.isCurrentMonth ? 'liquid-glass-subtle hover:border-white/30 hover:scale-[1.01]' : 'bg-transparent border-transparent opacity-35'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center tabular-nums ${isToday ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-primary)]'}`
    }, cell.dayNumber), overdueTasks.length > 0 && /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full bg-rose-500 animate-ping",
      title: `${overdueTasks.length} overdue task`
    })), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1 mt-1 overflow-hidden"
    }, cellTasks.slice(0, 2).map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: `px-1.5 py-0.5 rounded-md text-[10px] font-semibold truncate ${t.completed ? 'line-through opacity-60 bg-white/5 text-[var(--text-muted)]' : t.priority === 'Urgent' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30' : t.priority === 'High' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' : 'bg-blue-500/15 text-blue-500 border border-blue-500/30'}`,
      title: t.title
    }, t.title)), cellTasks.length > 2 && /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[var(--text-muted)] font-mono block pl-1"
    }, "+", cellTasks.length - 2, " more")), cellDeadlines.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "pt-1 text-[9px] font-mono text-rose-500 font-semibold truncate flex items-center gap-0.5"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 10
    }), " ", cellDeadlines.length, " due"));
  }))), viewMode !== 'month' && /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center rounded-3xl liquid-glass space-y-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 32,
    className: "mx-auto text-blue-500"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-[var(--text-primary)]"
  }, "Viewing ", viewMode === 'week' ? 'Weekly Time Grid' : 'Daily Schedule View'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-secondary)] max-w-md mx-auto"
  }, "Switch back to Month view or open today directly in the Daily Planner."), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelectDate(todayStr),
    className: "px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
  }, "Open Today in Daily Planner")));
};
window.CalendarView = CalendarView;

/* --- File: js/components/AnalyticsView.js --- */
// Taskio - Apple Liquid Glass Analytics & Reporting View

const AnalyticsView = ({
  state
}) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.completed).length;
  const pendingTasks = state.tasks.filter(t => !t.completed).length;
  const overdueTasks = state.tasks.filter(t => !t.completed && t.deadline && t.deadline < todayStr).length;
  const totalTimeSeconds = state.tasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
  const totalHoursWorked = (totalTimeSeconds / 3600).toFixed(1);
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0.8;
  const streakFactor = Math.min(1, state.gamification.streak / 14);
  const overduePenalty = Math.max(0, 1 - overdueTasks * 0.2);
  const productivityScore = Math.min(100, Math.round(completionRate * 50 + streakFactor * 30 + overduePenalty * 20));
  let scoreTier = 'Solid Momentum';
  let scoreColor = 'text-blue-500';
  if (productivityScore >= 85) {
    scoreTier = 'Mastery Flow';
    scoreColor = 'text-emerald-500';
  } else if (productivityScore >= 70) {
    scoreTier = 'High Focus';
    scoreColor = 'text-purple-500';
  }
  const categoryStats = window.PLANNER_CONSTANTS.CATEGORIES.map(cat => {
    const catTasks = state.tasks.filter(t => t.category === cat.id);
    const catTime = catTasks.reduce((acc, t) => acc + (t.timeSpent || 0), 0);
    const catHours = (catTime / 3600).toFixed(1);
    return {
      name: cat.name,
      hours: parseFloat(catHours),
      count: catTasks.length,
      color: cat.color
    };
  }).filter(c => c.count > 0 || c.hours > 0);
  const totalCatHours = categoryStats.reduce((acc, c) => acc + c.hours, 0) || 1;
  const weeklyData = [{
    day: 'Mon',
    completed: 4,
    scheduled: 5,
    hours: 3.5
  }, {
    day: 'Tue',
    completed: 6,
    scheduled: 6,
    hours: 4.8
  }, {
    day: 'Wed',
    completed: 5,
    scheduled: 7,
    hours: 4.2
  }, {
    day: 'Thu',
    completed: 7,
    scheduled: 8,
    hours: 5.5
  }, {
    day: 'Fri',
    completed: 5,
    scheduled: 6,
    hours: 4.0
  }, {
    day: 'Sat',
    completed: 3,
    scheduled: 4,
    hours: 2.5
  }, {
    day: 'Sun',
    completed: completedTasks,
    scheduled: totalTasks,
    hours: parseFloat(totalHoursWorked)
  }];
  const maxWeeklyTask = Math.max(...weeklyData.map(d => d.scheduled), 8);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-7xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
  }, "Productivity Analytics & Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[var(--text-secondary)] mt-1"
  }, "Execution velocity, category allocations, and performance trends.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      window.print();
    },
    className: "flex items-center space-x-1.5 px-3.5 py-2 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 15
  }), " ", /*#__PURE__*/React.createElement("span", null, "Print Executive Report"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-card p-5 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Overall Score"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-baseline space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-4xl font-extrabold font-mono tabular-nums ${scoreColor}`
  }, productivityScore), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-muted)] font-mono"
  }, "/ 100")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-primary)] mt-1 block"
  }, scoreTier)), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-card p-5 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Total Hours Logged"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-baseline space-x-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-4xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]"
  }, totalHoursWorked), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] font-mono"
  }, "hrs")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] mt-1 block"
  }, "Across ", state.projects.length, " active initiatives")), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-card p-5 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Tasks Completed"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-baseline space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-4xl font-extrabold font-mono tabular-nums text-emerald-500"
  }, completedTasks), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] font-mono tabular-nums"
  }, "/ ", totalTasks)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] mt-1 block"
  }, pendingTasks, " pending execution")), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-card p-5 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Overdue Tasks"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-baseline space-x-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-4xl font-extrabold font-mono tabular-nums ${overdueTasks > 0 ? 'text-rose-500' : 'text-emerald-500'}`
  }, overdueTasks)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[var(--text-muted)] mt-1 block"
  }, overdueTasks === 0 ? 'Flawless execution' : 'Action required today'))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-[var(--text-primary)]"
  }, "Weekly Task Completion Velocity"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 text-xs font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 text-emerald-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-sm bg-emerald-500"
  }), " Completed"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 text-[var(--text-muted)]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-sm bg-white/15"
  }), " Scheduled"))), /*#__PURE__*/React.createElement("div", {
    className: "h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-white/10"
  }, weeklyData.map((d, i) => {
    const compHeight = Math.round(d.completed / maxWeeklyTask * 100);
    const schedHeight = Math.round(d.scheduled / maxWeeklyTask * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full max-w-[28px] flex items-end justify-center space-x-1 h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-1/2 bg-white/15 rounded-t-md transition-all group-hover:opacity-80",
      style: {
        height: `${schedHeight}%`
      },
      title: `${d.day}: ${d.scheduled} scheduled`
    }), /*#__PURE__*/React.createElement("div", {
      className: "w-1/2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all group-hover:brightness-110 shadow-sm",
      style: {
        height: `${compHeight}%`
      },
      title: `${d.day}: ${d.completed} completed`
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-mono text-[var(--text-muted)] mt-2"
    }, d.day));
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)] text-center"
  }, "Consistent 80%+ completion rate observed mid-week.")), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-[var(--text-primary)]"
  }, "Focus Allocation by Category"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center justify-between gap-6 pt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-44 h-44 shrink-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full transform -rotate-90",
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    fill: "transparent",
    stroke: "rgba(120, 120, 128, 0.15)",
    strokeWidth: "15"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    fill: "transparent",
    stroke: "#AF52DE",
    strokeWidth: "15",
    strokeDasharray: "180 238",
    strokeDashoffset: "0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    fill: "transparent",
    stroke: "#0071E3",
    strokeWidth: "15",
    strokeDasharray: "50 238",
    strokeDashoffset: "-180"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    fill: "transparent",
    stroke: "#34C759",
    strokeWidth: "15",
    strokeDasharray: "30 238",
    strokeDashoffset: "-230"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-[var(--text-muted)] font-mono block"
  }, "Deep Work"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-bold font-mono text-[var(--text-primary)] tabular-nums"
  }, "65%"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2.5 flex-1 w-full"
  }, categoryStats.map((cat, idx) => {
    const percent = Math.round(cat.hours / totalCatHours * 100) || 20;
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "space-y-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs font-semibold"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-primary)]"
    }, cat.name), /*#__PURE__*/React.createElement("span", {
      className: "font-mono tabular-nums text-[var(--text-muted)]"
    }, cat.hours, "h (", percent, "%)")), /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-white/10 rounded-full h-1.5 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-blue-600 h-full rounded-full",
      style: {
        width: `${percent}%`
      }
    })));
  }))))));
};
window.AnalyticsView = AnalyticsView;

/* --- File: js/components/GamificationView.js --- */
// Taskio - Apple Liquid Glass Streaks & Gamification View

const GamificationView = ({
  state
}) => {
  const levelInfo = window.gamificationService.getLevelInfo(state.gamification.xp);
  const badges = state.gamification.badges || window.PLANNER_CONSTANTS.INITIAL_BADGES;
  const completedBadgesCount = badges.filter(b => b.unlockedAt).length;
  const today = new Date();
  const weeks = [];
  const completedDates = state.gamification.completedDates || {};
  for (let w = 51; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - (w * 7 + (6 - d)));
      const dateStr = targetDate.toISOString().slice(0, 10);
      const count = completedDates[dateStr] || 0;
      days.push({
        dateStr,
        count,
        dayOfWeek: d
      });
    }
    weeks.push(days);
  }
  const getHeatmapColor = count => {
    if (!count || count === 0) return 'bg-white/5 border-white/5';
    if (count === 1 || count === 2) return 'bg-emerald-500/30 border-emerald-500/40';
    if (count === 3 || count === 4) return 'bg-emerald-500/60 border-emerald-500/70 shadow-sm';
    return 'bg-emerald-500 border-emerald-400 shadow-md';
  };
  const handleManualConfetti = () => {
    window.audioService.playStreakAchievement();
    window.gamificationService.triggerConfetti();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-7xl mx-auto pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "Level ", levelInfo.level, " \u2014 ", levelInfo.title)), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
  }, "Productivity Momentum & Milestones"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl"
  }, "Consistent execution builds personal mastery. Every completed routine fuels your momentum.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4 liquid-glass-subtle p-4 sm:p-5 rounded-2xl border border-white/10 shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center animate-bounce"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 32
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold block"
  }, "Current Streak"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl sm:text-4xl font-black font-mono tabular-nums text-amber-500"
  }, state.gamification.streak), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-[var(--text-muted)]"
  }, "Days")), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-[var(--text-muted)] font-mono"
  }, "Personal Best: ", state.gamification.bestStreak, " days")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 pt-6 border-t border-white/10 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs font-mono font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[var(--text-secondary)] flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 13,
    className: "text-amber-500"
  }), " Total Discipline XP: ", levelInfo.xp), /*#__PURE__*/React.createElement("span", {
    className: "text-[var(--text-muted)] tabular-nums"
  }, levelInfo.xpIntoLevel, " / ", levelInfo.xpNeededForNext, " XP to Level ", levelInfo.level + 1, " (", levelInfo.progressPercent, "%)")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-sm",
    style: {
      width: `${levelInfo.progressPercent}%`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-[var(--text-primary)] flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "activity",
    size: 18,
    className: "text-emerald-500"
  }), " 52-Week Activity Matrix"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)] mt-0.5"
  }, "Daily completed tasks frequency mapped across the entire year.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 text-xs text-[var(--text-muted)] font-mono"
  }, /*#__PURE__*/React.createElement("span", null, "Less"), /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-xs bg-white/5 border border-white/5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-xs bg-emerald-500/30"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-xs bg-emerald-500/60"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-xs bg-emerald-500"
  }), /*#__PURE__*/React.createElement("span", null, "More"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto pb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex gap-1"
  }, weeks.map((week, wIdx) => /*#__PURE__*/React.createElement("div", {
    key: wIdx,
    className: "flex flex-col gap-1"
  }, week.map((cell, dIdx) => /*#__PURE__*/React.createElement("div", {
    key: dIdx,
    className: `w-3.5 h-3.5 rounded-sm border transition-all hover:scale-125 cursor-pointer ${getHeatmapColor(cell.count)}`,
    title: `${cell.dateStr}: ${cell.count} task${cell.count !== 1 ? 's' : ''} completed`
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass rounded-3xl p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-[var(--text-primary)] flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    size: 18,
    className: "text-amber-500"
  }), " Achievement Badges (", completedBadgesCount, "/", badges.length, ")"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)] mt-0.5"
  }, "Unlock honors through consistency, on-time delivery, and deep work intervals.")), /*#__PURE__*/React.createElement("button", {
    onClick: handleManualConfetti,
    className: "flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/25 transition-all active:scale-95",
    title: "Trigger celebration"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14
  }), " ", /*#__PURE__*/React.createElement("span", null, "Celebrate"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2"
  }, badges.map(badge => {
    const isUnlocked = !!badge.unlockedAt;
    return /*#__PURE__*/React.createElement("div", {
      key: badge.id,
      className: `p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${isUnlocked ? 'liquid-glass-elevated border-amber-500/30 shadow-sm' : 'liquid-glass-subtle opacity-45'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-gradient-to-tr from-amber-400 to-amber-600 text-white shadow-md' : 'liquid-glass-subtle text-[var(--text-muted)]'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: badge.icon || 'trophy',
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "overflow-hidden"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-sm font-bold text-[var(--text-primary)] truncate"
    }, badge.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2 leading-relaxed"
    }, badge.desc), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-mono mt-1.5 block"
    }, isUnlocked ? /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-500 font-semibold"
    }, "\u2713 Unlocked ", badge.unlockedAt.slice(0, 10)) : /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-muted)]"
    }, "\uD83D\uDD12 Locked"))));
  }))));
};
window.GamificationView = GamificationView;

/* --- File: js/components/AIAssistant.js --- */
// Taskio - Apple Liquid Glass AI Productivity Assistant

const AIAssistant = ({
  state,
  onApplyAIProposal,
  onStartTimerForTask
}) => {
  const [messages, setMessages] = React.useState([{
    id: 'welcome',
    sender: 'ai',
    text: `Hello ${state.user.name || 'Friend'}. I am your Taskio AI Intelligence Coach.\n\nI have synthesized your active projects, today's schedule, and pending priorities.\n\nHow can I help optimize your focus today? Tap any recommendation below or type your question.`,
    source: 'system',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const quickPrompts = [{
    label: 'Plan today 🌅',
    prompt: 'I have pending tasks and active projects. Help me plan today with an optimal time-blocked routine.'
  }, {
    label: 'What to work on next? 🎯',
    prompt: 'What is the single highest leverage task I should work on right now?'
  }, {
    label: 'Break down a project 📁',
    prompt: 'Please break down my SaaS Platform Redesign project into actionable milestone subtasks.'
  }, {
    label: 'Rescue overdue tasks ⚠️',
    prompt: 'Review my overdue tasks and suggest a realistic recovery schedule without burnout.'
  }, {
    label: 'Weekly executive report 📊',
    prompt: 'Generate an executive weekly productivity review of my logged hours and velocity.'
  }, {
    label: 'Motivate me 💪',
    prompt: 'I am feeling a bit tired and struggling with focus. Give me a productivity mindset reframe.'
  }];
  const handleSend = async textToSend => {
    const query = (textToSend || input).trim();
    if (!query) return;
    window.audioService.playButtonTap();
    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const result = await window.aiService.processMessage(query, state);
      window.audioService.playTaskCreate();
      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: result.text,
        proposal: result.proposal,
        source: result.source,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        sender: 'ai',
        text: 'I ran into an issue processing that request. Please try again or check your settings.',
        source: 'error',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      }]);
    } finally {
      setIsTyping(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col rounded-3xl liquid-glass-elevated overflow-hidden shadow-2xl relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 right-0 h-1 siri-glow opacity-80"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 border-b border-white/10 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-2xl siri-glow text-white flex items-center justify-center shadow-md shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-base text-[var(--text-primary)]"
  }, "Taskio Intelligence"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/30"
  }, "Active & Local Ready")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-muted)]"
  }, state.user.geminiApiKey ? 'Connected to Gemini 2.0 Flash Free Tier' : 'Powered by Context-Aware Local Heuristic Engine'))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      setMessages([messages[0]]);
    },
    className: "p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors",
    title: "Clear Conversation"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotateccw",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
  }, messages.map(msg => {
    const isUser = msg.sender === 'user';
    return /*#__PURE__*/React.createElement("div", {
      key: msg.id,
      className: `flex ${isUser ? 'justify-end' : 'justify-start'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-sm space-y-2.5 shadow-sm leading-relaxed ${isUser ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none' : 'liquid-glass text-[var(--text-primary)] rounded-tl-none border-white/15'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "whitespace-pre-wrap text-xs sm:text-sm"
    }, msg.text), msg.proposal && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 p-4 rounded-2xl liquid-glass-elevated space-y-2.5 text-xs border border-white/20"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between font-bold text-[var(--text-primary)]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1.5 text-purple-500 dark:text-purple-400"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 14
    }), " Action Proposal"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-muted)]"
    }, "Confirmation Required")), msg.proposal.action === 'create_tasks' && /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[var(--text-secondary)] font-medium"
    }, msg.proposal.title || 'Suggested Tasks:'), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1"
    }, msg.proposal.tasks.map((t, idx) => /*#__PURE__*/React.createElement("div", {
      key: idx,
      className: "flex items-center justify-between p-2 rounded-xl liquid-glass-subtle text-[11px]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-[var(--text-primary)] truncate max-w-[220px]"
    }, t.title), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[var(--text-muted)]"
    }, t.startTime || t.priority)))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playGoalComplete();
        onApplyAIProposal(msg.proposal);
      },
      className: "w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all active:scale-95"
    }, "Apply to My Planner (", msg.proposal.tasks.length, " tasks)")), msg.proposal.action === 'start_timer' && /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[var(--text-secondary)]"
    }, "Ready to tackle \u201C", msg.proposal.taskTitle, "\u201D?"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        window.audioService.playTimerStart();
        onStartTimerForTask(msg.proposal.taskId);
      },
      className: "w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 active:scale-95"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 13
    }), /*#__PURE__*/React.createElement("span", null, "Start 25-Minute Focus Session")))), /*#__PURE__*/React.createElement("div", {
      className: `text-[10px] font-mono flex items-center justify-between pt-1 ${isUser ? 'text-white/70' : 'text-[var(--text-muted)]'}`
    }, /*#__PURE__*/React.createElement("span", null, msg.timestamp), !isUser && msg.source && /*#__PURE__*/React.createElement("span", {
      className: "italic uppercase text-[9px]"
    }, msg.source === 'gemini' ? 'Gemini 2.0 API' : 'Local Intelligence'))));
  }), isTyping && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 rounded-2xl liquid-glass flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-blue-500 animate-bounce"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]"
  }))), /*#__PURE__*/React.createElement("div", {
    ref: messagesEndRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 border-t border-white/10 bg-white/5 overflow-x-auto flex items-center space-x-2"
  }, quickPrompts.map((qp, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => handleSend(qp.prompt),
    className: "px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 whitespace-nowrap transition-all shadow-xs font-semibold active:scale-95"
  }, qp.label))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleSend(input);
    },
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ask your AI coach: e.g. 'Plan my day' or 'What should I do next?'",
    value: input,
    onChange: e => setInput(e.target.value),
    className: "flex-1 px-4 py-3 rounded-2xl liquid-glass-subtle text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !input.trim(),
    className: "p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-40 shadow-md active:scale-95"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 18
  })))));
};
window.AIAssistant = AIAssistant;

/* --- File: js/components/TaskModal.js --- */
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
      setSubtasks([...subtasks, {
        id: 'st-' + Date.now(),
        title: val,
        completed: false
      }]);
      setNewSubtaskInput('');
    }
  };
  const handleRemoveSubtask = id => {
    window.audioService.playTaskDelete();
    setSubtasks(subtasks.filter(s => s.id !== id));
  };
  const handleSubmit = e => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-5 z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[var(--text-primary)]"
  }, taskToEdit ? 'Edit Task Details' : 'Create New Routine Task'), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Task Title *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "e.g. Conduct usability research on onboarding",
    value: title,
    onChange: e => setTitle(e.target.value),
    className: "w-full mt-1 px-3.5 py-2.5 rounded-xl liquid-glass-subtle text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    placeholder: "Add key objectives or notes...",
    value: description,
    onChange: e => setDescription(e.target.value),
    className: "w-full mt-1 px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    required: true,
    value: date,
    onChange: e => setDate(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Priority"), /*#__PURE__*/React.createElement("select", {
    value: priority,
    onChange: e => setPriority(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Urgent"
  }, "Urgent"), /*#__PURE__*/React.createElement("option", {
    value: "High"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "Medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "Low"
  }, "Low")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Start Time"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: startTime,
    onChange: e => setStartTime(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "End Time"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: endTime,
    onChange: e => setEndTime(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Deadline"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: deadline,
    onChange: e => setDeadline(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] font-mono"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    value: category,
    onChange: e => setCategory(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
  }, window.PLANNER_CONSTANTS.CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Project"), /*#__PURE__*/React.createElement("select", {
    value: projectId,
    onChange: e => setProjectId(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "No Project (Standalone)"), projects.map(p => /*#__PURE__*/React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.name))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 pt-1 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Checklist / Subtasks"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5 max-h-32 overflow-y-auto"
  }, subtasks.map(st => /*#__PURE__*/React.createElement("div", {
    key: st.id,
    className: "flex items-center justify-between p-2 rounded-xl liquid-glass-subtle text-xs"
  }, /*#__PURE__*/React.createElement("span", null, st.title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => handleRemoveSubtask(st.id),
    className: "text-[var(--text-muted)] hover:text-rose-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 13
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Add subtask...",
    value: newSubtaskInput,
    onChange: e => setNewSubtaskInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddSubtask();
      }
    },
    className: "flex-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleAddSubtask,
    className: "px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold"
  }, "Add"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Notes & Documentation"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    placeholder: "Reflections, blockers, or links...",
    value: notes,
    onChange: e => setNotes(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-3 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-white/10"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
  }, taskToEdit ? 'Save Changes' : 'Create Task')))));
};
window.TaskModal = TaskModal;

/* --- File: js/components/ProjectModal.js --- */
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
  const handleSubmit = e => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-5 z-10 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[var(--text-primary)]"
  }, projectToEdit ? 'Edit Project Initiative' : 'Create New Project'), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Project Name *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "e.g. Mobile Application V2 Launch",
    value: name,
    onChange: e => setName(e.target.value),
    className: "w-full mt-1 px-3.5 py-2.5 rounded-xl liquid-glass-subtle text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Strategic Goal & Scope"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    placeholder: "Outline deliverables and impact criteria...",
    value: description,
    onChange: e => setDescription(e.target.value),
    className: "w-full mt-1 px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Start Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    required: true,
    value: startDate,
    onChange: e => setStartDate(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs font-mono"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Final Deadline"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    required: true,
    value: finalDeadline,
    onChange: e => setFinalDeadline(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs font-mono"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    value: status,
    onChange: e => setStatus(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
  }, window.PLANNER_CONSTANTS.PROJECT_STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Priority"), /*#__PURE__*/React.createElement("select", {
    value: priority,
    onChange: e => setPriority(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Urgent"
  }, "Urgent"), /*#__PURE__*/React.createElement("option", {
    value: "High"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "Medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "Low"
  }, "Low")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Notes & Documentation Links"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    placeholder: "Design tokens, repository link, team contacts...",
    value: notes,
    onChange: e => setNotes(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs text-[var(--text-primary)]"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-3 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-white/10"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
  }, projectToEdit ? 'Save Project' : 'Create Project')))));
};
window.ProjectModal = ProjectModal;

/* --- File: js/components/SettingsModal.js --- */
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
  const handleSave = e => {
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
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          onImportData(content);
        }
      };
      reader.readAsText(file);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-7 space-y-5 z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 20,
    className: "text-blue-500"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[var(--text-primary)]"
  }, "Settings & Preferences")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono"
  }, "Profile"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: userName,
    onChange: e => setUserName(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs focus:outline-none"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Role / Subtitle"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: userTitle,
    onChange: e => setUserTitle(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs focus:outline-none"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-2 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono"
  }, "Daily Goals"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Target Tasks / Day"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "30",
    value: dailyGoalTasks,
    onChange: e => setDailyGoalTasks(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-[var(--text-secondary)]"
  }, "Target Focus Hours"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "16",
    value: dailyGoalHours,
    onChange: e => setDailyGoalHours(e.target.value),
    className: "w-full mt-1 px-3 py-1.5 rounded-xl liquid-glass-subtle text-xs"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 pt-2 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block"
  }, "Liquid Glass Appearance"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setTheme('dark'),
    className: `p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center space-x-2 ${theme === 'dark' ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon",
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "Obsidian Dark Mode \uD83C\uDF19")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setTheme('light'),
    className: `p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center space-x-2 ${theme === 'light' ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'liquid-glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "Frosted Light Mode \u2600\uFE0F")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-2 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono"
  }, "Sound Effects & Audio Feedback"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleTestSound,
    className: "text-[11px] font-semibold text-blue-500 hover:text-blue-400"
  }, "Test Sound Chime \uD83C\uDFB5")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-2.5 rounded-2xl liquid-glass-subtle"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-[var(--text-primary)]"
  }, "Master Audio"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-[var(--text-muted)]"
  }, "Enable all synthesized acoustic effects")), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: soundMaster,
    onChange: e => setSoundMaster(e.target.checked),
    className: "apple-checkbox"
  })), soundMaster && /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-2xl liquid-glass-subtle space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[var(--text-secondary)]"
  }, "Master Volume"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-xs text-[var(--text-primary)] tabular-nums"
  }, Math.round(volume * 100), "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.05",
    value: volume,
    onChange: e => {
      const newVol = parseFloat(e.target.value);
      setVolume(newVol);
      window.audioService.volume = newVol;
    },
    className: "w-full accent-blue-600 cursor-pointer"
  })), soundMaster && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center space-x-2 p-2 rounded-xl liquid-glass-subtle cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: interfaceSounds,
    onChange: e => setInterfaceSounds(e.target.checked),
    className: "apple-checkbox w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-medium text-[var(--text-secondary)]"
  }, "Interface & Clicks")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center space-x-2 p-2 rounded-xl liquid-glass-subtle cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: notificationSounds,
    onChange: e => setNotificationSounds(e.target.checked),
    className: "apple-checkbox w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-medium text-[var(--text-secondary)]"
  }, "Notifications & Chimes")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 pt-2 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono"
  }, "Google Gemini API Key (Free Tier)"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowApiKey(!showApiKey),
    className: "text-[11px] text-blue-500 hover:underline"
  }, showApiKey ? 'Hide' : 'Reveal')), /*#__PURE__*/React.createElement("input", {
    type: showApiKey ? 'text' : 'password',
    placeholder: "AIzaSy... (Leave blank to use built-in local heuristic coach)",
    value: geminiApiKey,
    onChange: e => setGeminiApiKey(e.target.value),
    className: "w-full px-3.5 py-2 rounded-xl liquid-glass-subtle text-xs font-mono text-[var(--text-primary)] focus:outline-none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 pt-3 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono"
  }, "Data Management & Backup"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onExportData(),
    className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "Export JSON Backup")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => fileInputRef.current?.click(),
    className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "Import Backup")), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: ".json",
    onChange: handleFileChange,
    className: "hidden"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onResetSampleData,
    className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotateccw",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "Reset Demo Data")))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-4 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-white/10"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md active:scale-95"
  }, "Save Preferences")))));
};
window.SettingsModal = SettingsModal;

/* --- File: js/components/NotificationsModal.js --- */
// Taskio - Apple Liquid Glass In-App Notification Center Drawer

const NotificationsModal = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex justify-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 glass-modal-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-sm sm:max-w-md liquid-glass-elevated border-l border-white/20 shadow-2xl h-full flex flex-col z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-5 border-b border-white/10 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18,
    className: "text-blue-500"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-[var(--text-primary)]"
  }, "Notifications & Reminders")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-[var(--text-secondary)]"
  }, /*#__PURE__*/React.createElement("span", null, notifications.filter(n => !n.read).length, " unread updates"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playButtonTap();
      onMarkAllAsRead();
    },
    className: "text-blue-500 hover:underline font-semibold"
  }, "Mark all read"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.audioService.playTaskDelete();
      onClearAll();
    },
    className: "text-rose-500 hover:underline font-semibold"
  }, "Clear all"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto p-4 space-y-3"
  }, notifications.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12 text-[var(--text-muted)] space-y-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 28,
    className: "mx-auto text-[var(--text-muted)]"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-[var(--text-primary)]"
  }, "All caught up"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs"
  }, "No pending reminders right now.")) : notifications.map(notif => {
    const iconMap = {
      achievement: {
        name: 'trophy',
        color: 'text-amber-500',
        bg: 'bg-amber-500/15'
      },
      deadline: {
        name: 'shield-alert',
        color: 'text-rose-500',
        bg: 'bg-rose-500/15'
      },
      reminder: {
        name: 'clock',
        color: 'text-blue-500',
        bg: 'bg-blue-500/15'
      },
      system: {
        name: 'sparkles',
        color: 'text-purple-500',
        bg: 'bg-purple-500/15'
      }
    };
    const config = iconMap[notif.type] || iconMap.system;
    return /*#__PURE__*/React.createElement("div", {
      key: notif.id,
      className: `p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${notif.read ? 'liquid-glass-subtle opacity-70' : 'liquid-glass border-white/20 shadow-xs'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-2 rounded-xl ${config.bg} ${config.color} shrink-0 mt-0.5`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: config.name,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0 space-y-1"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-xs font-bold text-[var(--text-primary)] leading-tight"
    }, notif.title), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-[var(--text-secondary)] leading-relaxed"
    }, notif.message), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[var(--text-muted)] font-mono block"
    }, notif.timestamp ? new Date(notif.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Recently')));
  }))));
};
window.NotificationsModal = NotificationsModal;

/* --- File: js/app.js --- */
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

  // Confirm Dialog
  const [confirmDialog, setConfirmDialog] = React.useState(null); // { title, body, danger, onConfirm }

  const showConfirm = (title, body, onConfirm, danger = true) => {
    setConfirmDialog({
      title,
      body,
      onConfirm,
      danger
    });
  };
  const closeConfirm = () => setConfirmDialog(null);
  const showToast = (message, subtext = null) => {
    setToast({
      message,
      subtext
    });
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
              return {
                ...t,
                timeSpent: (t.timeSpent || 0) + 1
              };
            }
            return t;
          });
          return {
            ...prev,
            tasks: updatedTasks
          };
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
        document.title = `[${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}] ⏱️ ${activeTask.title} | Taskio`;
      }
    } else {
      document.title = 'Taskio — Apple Liquid Glass Productivity Diary';
    }
  }, [activeTimerId, state.tasks]);

  // Handler: Toggle Task Completed
  const handleToggleTaskComplete = taskId => {
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
      const updatedCompletedDates = {
        ...(prev.gamification.completedDates || {})
      };
      if (willBeCompleted) {
        updatedCompletedDates[taskDate] = (updatedCompletedDates[taskDate] || 0) + 1;
      } else {
        updatedCompletedDates[taskDate] = Math.max(0, (updatedCompletedDates[taskDate] || 1) - 1);
      }
      const newXP = Math.max(0, prev.gamification.xp + (willBeCompleted ? xpGained : -25));
      const newLevel = window.gamificationService.getLevelInfo(newXP).level;
      const evalResult = window.gamificationService.evaluateBadges({
        ...prev,
        tasks: updatedTasks,
        gamification: {
          ...prev.gamification,
          xp: newXP
        }
      }, willBeCompleted ? {
        ...task,
        completed: true,
        completedAt: nowISO
      } : null);
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
  const handleToggleTimer = taskId => {
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
              return {
                ...st,
                completed: !st.completed
              };
            }
            return st;
          });
          return {
            ...t,
            subtasks: updatedSubtasks
          };
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
          const newSubtask = {
            id: 'st-' + Date.now(),
            title,
            completed: false
          };
          return {
            ...t,
            subtasks: [...(t.subtasks || []), newSubtask]
          };
        }
        return t;
      })
    }));
  };

  // Task CRUD operations
  const handleSaveTask = taskData => {
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
  const handleDeleteTask = taskId => {
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
  const handleDuplicateTask = task => {
    const copy = {
      ...task,
      id: 'task-' + Date.now(),
      title: `${task.title} (Copy)`,
      completed: false,
      completedAt: null,
      timeSpent: 0
    };
    setState(prev => ({
      ...prev,
      tasks: [copy, ...prev.tasks]
    }));
    showToast('Task Duplicated', `Created a copy of "${task.title}".`);
  };
  const handleRescheduleTask = task => {
    const targetDate = new Date(task.date || new Date());
    targetDate.setDate(targetDate.getDate() + 1);
    const newDateStr = targetDate.toISOString().slice(0, 10);
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === task.id ? {
        ...t,
        date: newDateStr
      } : t)
    }));
    showToast('Task Rescheduled', `Moved "${task.title}" to ${newDateStr}.`);
  };
  const handleClearDayTasks = date => {
    const count = state.tasks.filter(t => t.date === date).length;
    if (count === 0) {
      showToast('No tasks to clear', 'This day is already empty.');
      return;
    }
    showConfirm('Clear All Tasks for This Day?', `This will permanently delete all ${count} task${count > 1 ? 's' : ''} scheduled for ${new Date(date + 'T00:00:00').toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })}. This cannot be undone.`, () => {
      window.audioService.playTaskDelete();
      if (activeTimerId) {
        const activeIsOnDate = state.tasks.find(t => t.id === activeTimerId)?.date === date;
        if (activeIsOnDate) setActiveTimerId(null);
      }
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.date !== date)
      }));
      showToast('Day Cleared 🗑️', `All ${count} tasks removed. Fresh slate!`);
      closeConfirm();
    });
  };
  const handleStartFresh = () => {
    showConfirm('Start Fresh — Reset Everything?', 'This will permanently delete ALL tasks, projects, streaks, XP, and badges. Your Taskio will reset to a clean blank slate. This action cannot be undone.', () => {
      if (activeTimerId) setActiveTimerId(null);
      window.audioService.playTaskDelete();
      const freshState = window.storageService.getBlankState();
      freshState.theme = state.theme; // keep current theme
      freshState.soundSettings = state.soundSettings; // keep sound prefs
      setState(freshState);
      window.storageService.save(freshState);
      showToast('Fresh Start! 🌱', 'All data cleared. Your journey begins now.');
      closeConfirm();
      setActiveTab('dashboard');
    }, true);
  };

  // Project CRUD
  const handleSaveProject = projectData => {
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
  const handleDeleteProject = projectId => {
    const proj = state.projects.find(p => p.id === projectId);
    if (window.confirm(`Delete project "${proj?.name || 'this project'}" and unlink its tasks?`)) {
      window.audioService.playTaskDelete();
      setState(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projectId),
        tasks: prev.tasks.map(t => t.projectId === projectId ? {
          ...t,
          projectId: null
        } : t)
      }));
      showToast('Project Removed', 'Initiative cleared.');
    }
  };

  // Pomodoro sessions
  const handleCompletePomodoroSession = linkedTaskId => {
    setState(prev => {
      let updatedTasks = prev.tasks;
      if (linkedTaskId) {
        updatedTasks = prev.tasks.map(t => {
          if (t.id === linkedTaskId) {
            return {
              ...t,
              timeSpent: (t.timeSpent || 0) + prev.pomodoro.workDuration * 60
            };
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
          totalFocusSeconds: prev.pomodoro.totalFocusSeconds + prev.pomodoro.workDuration * 60
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
  const handleApplyAIProposal = proposal => {
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
    setState(prev => ({
      ...prev,
      theme: nextTheme
    }));
    showToast(`${nextTheme === 'dark' ? 'Obsidian Dark' : 'Frosted Light'} Mode Active`);
  };
  const activeTimerTask = state.tasks.find(t => t.id === activeTimerId);
  const activeTimer = activeTimerTask ? {
    taskId: activeTimerTask.id,
    title: activeTimerTask.title,
    displayTime: `${String(Math.floor((activeTimerTask.timeSpent || 0) / 60)).padStart(2, '0')}:${String((activeTimerTask.timeSpent || 0) % 60).padStart(2, '0')}`
  } : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col transition-colors duration-500"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-1"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    isCollapsed: isSidebarCollapsed,
    setIsCollapsed: setIsSidebarCollapsed,
    mobileOpen: mobileMenuOpen,
    setMobileOpen: setMobileMenuOpen,
    state: state
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col min-w-0"
  }, /*#__PURE__*/React.createElement(Navbar, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    state: state,
    activeTimer: activeTimer,
    toggleTimer: handleToggleTimer,
    onOpenTaskModal: () => {
      setTaskToEdit(null);
      setTaskModalDefaultDate(selectedDate);
      setTaskModalDefaultProjectId(null);
      setTaskModalOpen(true);
    },
    onOpenSettings: () => setSettingsModalOpen(true),
    onOpenNotifications: () => setNotificationsModalOpen(true),
    unreadNotificationsCount: state.notifications.filter(n => !n.read).length,
    onToggleTheme: handleToggleTheme,
    onToggleMobileMenu: () => setMobileMenuOpen(true)
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"
  }, activeTab === 'dashboard' && /*#__PURE__*/React.createElement(Dashboard, {
    state: state,
    setActiveTab: setActiveTab,
    onOpenTaskModal: () => {
      setTaskToEdit(null);
      setTaskModalDefaultDate(selectedDate);
      setTaskModalOpen(true);
    },
    onToggleTaskComplete: handleToggleTaskComplete,
    onToggleTimer: handleToggleTimer,
    activeTimerId: activeTimerId
  }), activeTab === 'routine' && /*#__PURE__*/React.createElement(RoutinePlanner, {
    state: state,
    selectedDate: selectedDate,
    setSelectedDate: setSelectedDate,
    onOpenTaskModal: dt => {
      setTaskToEdit(null);
      setTaskModalDefaultDate(dt || selectedDate);
      setTaskModalDefaultProjectId(null);
      setTaskModalOpen(true);
    },
    onEditTask: task => {
      setTaskToEdit(task);
      setTaskModalOpen(true);
    },
    onDeleteTask: handleDeleteTask,
    onDuplicateTask: handleDuplicateTask,
    onRescheduleTask: handleRescheduleTask,
    onToggleTaskComplete: handleToggleTaskComplete,
    onToggleSubtask: handleToggleSubtask,
    onAddSubtask: handleAddSubtask,
    onToggleTimer: handleToggleTimer,
    activeTimerId: activeTimerId,
    onClearDayTasks: handleClearDayTasks,
    onStartFresh: handleStartFresh
  }), activeTab === 'projects' && /*#__PURE__*/React.createElement(ProjectsView, {
    state: state,
    onOpenProjectModal: () => {
      setProjectToEdit(null);
      setProjectModalOpen(true);
    },
    onEditProject: proj => {
      setProjectToEdit(proj);
      setProjectModalOpen(true);
    },
    onDeleteProject: handleDeleteProject,
    onToggleTaskComplete: handleToggleTaskComplete,
    onOpenTaskModal: (dt, pId) => {
      setTaskToEdit(null);
      setTaskModalDefaultDate(dt);
      setTaskModalDefaultProjectId(pId);
      setTaskModalOpen(true);
    }
  }), activeTab === 'timer' && /*#__PURE__*/React.createElement(FocusTimer, {
    state: state,
    activeTimerId: activeTimerId,
    onToggleTimer: handleToggleTimer,
    onUpdatePomodoroSettings: settings => {
      setState(prev => ({
        ...prev,
        pomodoro: {
          ...prev.pomodoro,
          ...settings
        }
      }));
      showToast('Timer Preferences Updated');
    },
    onCompletePomodoroSession: handleCompletePomodoroSession
  }), activeTab === 'calendar' && /*#__PURE__*/React.createElement(CalendarView, {
    state: state,
    onSelectDate: dt => {
      setSelectedDate(dt);
      setActiveTab('routine');
    },
    onOpenTaskModal: dt => {
      setTaskToEdit(null);
      setTaskModalDefaultDate(dt);
      setTaskModalOpen(true);
    },
    onRescheduleTask: handleRescheduleTask
  }), activeTab === 'analytics' && /*#__PURE__*/React.createElement(AnalyticsView, {
    state: state
  }), activeTab === 'gamification' && /*#__PURE__*/React.createElement(GamificationView, {
    state: state
  }), activeTab === 'ai' && /*#__PURE__*/React.createElement(AIAssistant, {
    state: state,
    onApplyAIProposal: handleApplyAIProposal,
    onStartTimerForTask: taskId => {
      setActiveTimerId(taskId);
      setActiveTab('timer');
      showToast('Focus Session Ready', 'Timer engaged on priority task.');
    }
  })))), toast && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-50 p-4 rounded-2xl liquid-glass-elevated border-white/20 shadow-2xl flex items-center space-x-3.5 max-w-sm animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-[var(--text-primary)]"
  }, toast.message), toast.subtext && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[var(--text-secondary)] mt-0.5"
  }, toast.subtext))), confirmDialog && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[200] flex items-center justify-center p-4",
    style: {
      backdropFilter: 'blur(20px)',
      background: 'rgba(0,0,0,0.5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "liquid-glass-elevated rounded-3xl p-7 max-w-md w-full shadow-2xl border border-white/15 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${confirmDialog.danger ? 'bg-rose-500/15' : 'bg-blue-500/15'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: confirmDialog.danger ? 'triangle-alert' : 'info',
    size: 26,
    className: confirmDialog.danger ? 'text-rose-500' : 'text-blue-500'
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[var(--text-primary)] text-center mb-2 tracking-tight"
  }, confirmDialog.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-[var(--text-secondary)] text-center leading-relaxed mb-7"
  }, confirmDialog.body), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: closeConfirm,
    className: "flex-1 py-3 rounded-2xl liquid-glass-button text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: confirmDialog.onConfirm,
    className: `flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95 shadow-lg ${confirmDialog.danger ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'}`
  }, confirmDialog.danger ? 'Yes, Delete' : 'Confirm')))), /*#__PURE__*/React.createElement(TaskModal, {
    isOpen: taskModalOpen,
    onClose: () => setTaskModalOpen(false),
    onSave: handleSaveTask,
    taskToEdit: taskToEdit,
    defaultDate: taskModalDefaultDate,
    defaultProjectId: taskModalDefaultProjectId,
    projects: state.projects
  }), /*#__PURE__*/React.createElement(ProjectModal, {
    isOpen: projectModalOpen,
    onClose: () => setProjectModalOpen(false),
    onSave: handleSaveProject,
    projectToEdit: projectToEdit
  }), /*#__PURE__*/React.createElement(SettingsModal, {
    isOpen: settingsModalOpen,
    onClose: () => setSettingsModalOpen(false),
    state: state,
    onUpdateSettings: newSettings => {
      setState(prev => ({
        ...prev,
        ...newSettings
      }));
      showToast('Settings Saved', 'Preferences updated.');
    },
    onExportData: () => {
      window.storageService.exportData(state);
      showToast('Backup Exported', 'Downloaded backup JSON file.');
    },
    onImportData: jsonStr => {
      const res = window.storageService.importData(jsonStr);
      if (res.success) {
        setState(res.data);
        showToast('Backup Restored! ✨', 'Planner state restored successfully.');
      } else {
        alert(res.error);
      }
    },
    onResetSampleData: () => {
      if (window.confirm('Reset all tasks and projects to rich default sample data?')) {
        const fresh = window.storageService.reset();
        setState(fresh);
        showToast('Sample Data Loaded', 'Restored default template.');
      }
    }
  }), /*#__PURE__*/React.createElement(NotificationsModal, {
    isOpen: notificationsModalOpen,
    onClose: () => setNotificationsModalOpen(false),
    notifications: state.notifications,
    onMarkAllAsRead: () => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => ({
          ...n,
          read: true
        }))
      }));
    },
    onClearAll: () => {
      setState(prev => ({
        ...prev,
        notifications: []
      }));
    }
  }));
};
window.App = App;

/* --- Mounting Root --- */
function mountTaskio() {
  const container = document.getElementById('root');
  if (container && window.ReactDOM && window.App) {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(window.App));
    console.log('✨ Taskio App mounted successfully!');
  } else {
    console.error('Mounting failed: container, ReactDOM, or App missing', {
      container: !!container,
      ReactDOM: !!window.ReactDOM,
      App: !!window.App
    });
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountTaskio);
} else {
  mountTaskio();
}