// Taskio - Gamification Engine (XP, Levels, Badges, Streaks)

class GamificationService {
  getLevelInfo(xp) {
    const level = Math.floor(Math.sqrt(xp / 100)) + 1;
    const currentLevelBaseXP = Math.pow(level - 1, 2) * 100;
    const nextLevelXP = Math.pow(level, 2) * 100;
    const xpIntoLevel = xp - currentLevelBaseXP;
    const xpNeededForNext = nextLevelXP - currentLevelBaseXP;
    const progressPercent = Math.min(100, Math.max(0, Math.round((xpIntoLevel / xpNeededForNext) * 100)));

    const titles = [
      "Novice Initiate",
      "Disciplined Apprentice",
      "Focus Practitioner",
      "Productivity Alchemist",
      "Master of Time",
      "Flow State Sage",
      "Productivity Grandmaster"
    ];
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

    const checkAndUnlock = (badgeId) => {
      const idx = badges.findIndex(b => b.id === badgeId);
      if (idx !== -1 && !badges[idx].unlockedAt) {
        badges[idx] = { ...badges[idx], unlockedAt: nowISO };
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

    return { updatedBadges: badges, newlyUnlocked };
  }

  triggerConfetti() {
    if (window.confetti) {
      // Dual cannon burst
      window.confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 }
      });
      setTimeout(() => {
        window.confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        window.confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 180);
    }
  }
}

window.gamificationService = new GamificationService();
