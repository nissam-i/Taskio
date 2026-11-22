// Taskio - Data Models, Enums & Initial Constants

const PRIORITIES = {
  Urgent: { label: 'Urgent', color: 'rose', bg: 'var(--pastel-rose-bg)', text: 'var(--pastel-rose-text)', border: '#FDA4AF', dot: '#E11D48' },
  High: { label: 'High', color: 'apricot', bg: 'var(--pastel-apricot-bg)', text: 'var(--pastel-apricot-text)', border: '#FDBA74', dot: '#EA580C' },
  Medium: { label: 'Medium', color: 'lavender', bg: 'var(--pastel-lavender-bg)', text: 'var(--pastel-lavender-text)', border: '#C4B5FD', dot: '#7C3AED' },
  Low: { label: 'Low', color: 'sage', bg: 'var(--pastel-sage-bg)', text: 'var(--pastel-sage-text)', border: '#86EFAC', dot: '#16A34A' }
};

const CATEGORIES = [
  { id: 'Deep Work', name: 'Deep Work', icon: 'zap', color: 'purple' },
  { id: 'Project Sprint', name: 'Project Sprint', icon: 'folder-kanban', color: 'blue' },
  { id: 'Daily Routine', name: 'Daily Routine', icon: 'sun', color: 'amber' },
  { id: 'Learning & Growth', name: 'Learning & Growth', icon: 'book-open', color: 'emerald' },
  { id: 'Wellness & Health', name: 'Wellness & Health', icon: 'heart', color: 'rose' },
  { id: 'Administrative', name: 'Administrative', icon: 'inbox', color: 'slate' }
];

const PROJECT_STATUSES = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Overdue'];

const MOTIVATIONAL_QUOTES = [
  { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { quote: "One task at a time. Breathe, focus, and let momentum carry you.", author: "Taskio Coach" },
  { quote: "Your future self will thank you for the disciplined choices you make today.", author: "James Clear" },
  { quote: "The secret of getting ahead is getting started. Break complex tasks into small bite-sized steps.", author: "Mark Twain" },
  { quote: "Don't stop now. You're far closer to your breakthrough than you think!", author: "Productivity Diary" },
  { quote: "Focus is a muscle. Every Pomodoro interval makes your mind stronger.", author: "Cal Newport" },
  { quote: "Consistency beats intensity every single day. Keep showing up.", author: "Daily Stoic" }
];

const INITIAL_BADGES = [
  { id: 'first_step', name: 'First Step', desc: 'Complete your first task', icon: 'check-circle-2', unlockedAt: '2026-11-15T09:12:00Z' },
  { id: 'streak_3', name: 'Momentum Starter', desc: 'Maintain a 3-day streak', icon: 'flame', unlockedAt: '2026-11-18T18:00:00Z' },
  { id: 'streak_7', name: 'Habit Builder', desc: 'Maintain a 7-day streak', icon: 'trophy', unlockedAt: '2026-11-22T10:00:00Z' },
  { id: 'streak_30', name: 'Unstoppable Force', desc: 'Maintain a 30-day streak', icon: 'crown', unlockedAt: null },
  { id: 'deadline_master', name: 'Deadline Master', desc: 'Complete 5 tasks on or before deadline', icon: 'clock', unlockedAt: '2026-11-20T16:30:00Z' },
  { id: 'deep_diver', name: 'Deep Diver', desc: 'Log 4+ hours of focused work in a single day', icon: 'target', unlockedAt: null },
  { id: 'pomodoro_pro', name: 'Pomodoro Pro', desc: 'Complete 10 Pomodoro intervals', icon: 'timer', unlockedAt: '2026-11-21T15:00:00Z' },
  { id: 'project_champion', name: 'Project Champion', desc: 'Complete 100% of tasks in an entire project', icon: 'award', unlockedAt: '2026-11-19T14:20:00Z' },
  { id: 'early_bird', name: 'Early Bird', desc: 'Complete a scheduled task before 9:00 AM', icon: 'sunrise', unlockedAt: '2026-11-22T08:15:00Z' },
  { id: 'overdue_crusher', name: 'Overdue Crusher', desc: 'Rescue and complete an overdue task', icon: 'shield-alert', unlockedAt: null },
  { id: 'taskio_perfection', name: 'Flawless Day', desc: 'Complete 100% of all scheduled tasks in a day', icon: 'sparkles', unlockedAt: null },
  { id: 'productivity_sage', name: 'Productivity Sage', desc: 'Ascend to Level 5 Productivity Master', icon: 'gem', unlockedAt: null }
];

window.PLANNER_CONSTANTS = {
  PRIORITIES,
  CATEGORIES,
  PROJECT_STATUSES,
  MOTIVATIONAL_QUOTES,
  INITIAL_BADGES
};
