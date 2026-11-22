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
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemInstruction}\n\nUser Message: ${userMessage}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    };

    const res = await fetch(`${this.geminiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
          tasks: [
            { title: 'Morning Deep Work Block', priority: 'Urgent', category: 'Deep Work', startTime: '09:00', endTime: '10:30' },
            { title: 'Midday Collaborative Sprint', priority: 'Medium', category: 'Project Sprint', startTime: '13:30', endTime: '14:30' },
            { title: 'Daily Review & Tomorrow Prep', priority: 'Low', category: 'Daily Routine', startTime: '17:00', endTime: '17:30' }
          ]
        },
        source: 'local'
      };
    }

    // 2. Break down a project
    if (q.includes('break') || q.includes('project') || q.includes('decompose') || q.includes('subtask')) {
      const targetProj = context.activeProjects[0] || { name: 'New Initiative', id: null };
      const text = `I've analyzed your project **"${targetProj.name}"** and broken it down into actionable, high-velocity steps:\n\n` +
        `1. **Phase 1: Architecture & Requirements Discovery** (Est: 2 hours) [High Priority]\n` +
        `   • Map user journeys and audit current edge-cases.\n\n` +
        `2. **Phase 2: Core Implementation Sprint** (Est: 4 hours) [Urgent Priority]\n` +
        `   • Build foundational components and reactive state stores.\n\n` +
        `3. **Phase 3: Integration & Edge-Case Testing** (Est: 1.5 hours) [Medium Priority]\n` +
        `   • Verify responsive layout, keyboard navigation, and theme switches.\n\n` +
        `4. **Phase 4: Polish & Production Release** (Est: 1 hour) [High Priority]\n` +
        `   • Finalize documentation, celebrate milestone, and log retrospective.\n\n` +
        `Would you like me to automatically create these 4 milestone tasks under "${targetProj.name}"? Click **Apply to Planner** below!`;

      return {
        text,
        proposal: {
          action: 'create_tasks',
          title: `Milestones for ${targetProj.name}`,
          projectId: targetProj.id,
          tasks: [
            { title: `${targetProj.name}: Discovery & UX Mapping`, priority: 'High', category: 'Deep Work', startTime: '10:00', endTime: '11:30', projectId: targetProj.id },
            { title: `${targetProj.name}: Core Implementation Sprint`, priority: 'Urgent', category: 'Deep Work', startTime: '11:45', endTime: '13:15', projectId: targetProj.id },
            { title: `${targetProj.name}: Testing & Responsive Audit`, priority: 'Medium', category: 'Project Sprint', startTime: '14:30', endTime: '15:30', projectId: targetProj.id },
            { title: `${targetProj.name}: Release & Retrospective`, priority: 'High', category: 'Project Sprint', startTime: '16:00', endTime: '17:00', projectId: targetProj.id }
          ]
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
          text: `🎯 **Your #1 Next Recommended Task:**\n\n` +
            `👉 **"${nextTask.title}"**\n` +
            `• **Category**: ${nextTask.category}\n` +
            `• **Priority**: ${nextTask.priority}\n` +
            `• **Time Allocation**: ${nextTask.startTime || 'Flexible'} - ${nextTask.endTime || 'Flexible'}\n\n` +
            `**Why tackle this now?** ${reason}\n\n` +
            `💡 *Pro-tip: Start a 25-minute Pomodoro session right now. Turn on Do Not Disturb and focus on just the first 5 minutes.*`,
          proposal: {
            action: 'start_timer',
            taskId: nextTask.id,
            taskTitle: nextTask.title
          },
          source: 'local'
        };
      } else {
        return {
          text: `🎉 **Incredible work, ${context.userName}!** You have completed all scheduled tasks for today!\n\n` +
            `You can take a well-deserved rest, enjoy personal creative time, or plan tomorrow's victories in advance.`,
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
        text: `⚠️ **Overdue Recovery Plan:**\n\n` +
          `You currently have **${context.overdueCount} overdue item(s)**:\n${overdueList}\n\n` +
          `Falling behind happens to everyone. The best antidote is a swift, realistic rescue schedule:\n` +
          `1. Reschedule these into today's dedicated catch-up block.\n` +
          `2. Trim scope down to the essential minimum viable deliverable.\n` +
          `3. Complete them to earn the **"Overdue Crusher"** badge and +60 bonus XP!`,
        proposal: {
          action: 'reschedule_overdue',
          tasks: context.overdueTasks.map(t => t.id)
        },
        source: 'local'
      };
    }

    // 5. Weekly Productivity Report
    if (q.includes('report') || q.includes('weekly') || q.includes('analytics') || q.includes('summary')) {
      const completionRate = context.totalTasksToday > 0 ? Math.round((context.completedTodayCount / context.totalTasksToday) * 100) : 100;
      return {
        text: `📊 **Weekly Productivity Executive Summary:**\n\n` +
          `• **Current Daily Streak**: ${context.streak} Days 🔥\n` +
          `• **Total Productive XP**: ${context.xp} XP (Level ${context.level} ${window.gamificationService.getLevelInfo(context.xp).title})\n` +
          `• **Today's Completion Rate**: ${completionRate}%\n` +
          `• **Logged Focus Hours**: ${context.totalHoursWorkedToday} hours\n` +
          `• **Active Projects**: ${context.activeProjects.length} projects advancing\n\n` +
          `**Coach's Key Insights:**\n` +
          `1. Your focus consistency during morning hours is your highest-leverage advantage.\n` +
          `2. Deep Work accounts for the majority of your output; keep defending that morning time-block.\n` +
          `3. Remember to log short 5-minute pauses between 25-minute Pomodoro sessions to sustain stamina without burnout.`,
        source: 'local'
      };
    }

    // 6. Motivation & Encouragement
    if (q.includes('motivate') || q.includes('tired') || q.includes('exhausted') || q.includes('procrastinat') || q.includes('stuck')) {
      return {
        text: `💪 **A message from your Taskio Coach:**\n\n` +
          `"${context.userName}, remember that momentum is built in small, low-friction increments. You don't have to conquer the whole mountain in this exact hour.\n\n` +
          `You already have an active **${context.streak}-day streak**. That proves your resilience and capacity.\n\n` +
          `Do just **two minutes** of one pending task right now. Open the document, write one sentence, or check off one tiny subtask. Once you start, flow naturally follows."`,
        source: 'local'
      };
    }

    // General helpful response
    return {
      text: `Hello ${context.userName}! I am your Taskio AI Productivity Coach. I can help you with:\n\n` +
        `• 📅 **"Plan today"** — Generate an optimized, time-blocked schedule\n` +
        `• 🎯 **"What to work on next"** — Identify your highest-leverage task\n` +
        `• 📁 **"Break down project"** — Split projects into actionable subtasks\n` +
        `• ⚠️ **"Review overdue tasks"** — Rescue overdue items without burnout\n` +
        `• 📊 **"Weekly report"** — Executive analytics & performance review\n` +
        `• 💪 **"Motivate me"** — Focus reframing and mindset coaching\n\n` +
        `*(Running on free built-in local intelligence. You can also add your free Gemini API key in Settings anytime!)*`,
      source: 'local'
    };
  }
}

window.aiService = new AIService();
