# ✨ Taskio — AI-Powered Routine Tracker, Project Manager & Productivity Diary

> A modern, responsive productivity web application inspired by luxury paper planners, bullet journals, and personal productivity diaries, supercharged with intelligent AI assistance and gamified momentum.

---

## 🌟 Overview & Key Highlights

Taskio merges the tactile, disciplined elegance of a luxury physical daily planner (warm ivory tones, subtle paper textures, refined typography, and soft pastel badges) with modern digital capabilities:

- 🌅 **Daily Routine Planner**: Chronological timeline ribbon with time-blocking (morning deep work, collaborative midday, evening wind-down), interactive checkboxes, and subtask trees.
- 📁 **Project Management**: Comprehensive milestone tracking, progress percentages, countdown to deadlines, time invested, and linked tasks.
- ⏱️ **Focus & Time Tracking**: Built-in Pomodoro timer (25m focus, 5m short break, 15m long break, customizable durations) plus task-level stopwatches with live tickers and Web Audio synthesized chimes.
- 🏆 **Gamification & Streak Engine**: GitHub-style 52-week activity heatmap, XP points, leveling system (from Novice Initiate to Productivity Grandmaster), and 12 unlockable achievement badges.
- 🤖 **Free AI Productivity Assistant**:
  - Direct integration with **Google Gemini 2.0 Flash Free Tier** (enter your free API key in Settings).
  - In addition, an intelligent, context-aware **Local Heuristic AI Coach** that works 100% offline with zero API key!
  - Capabilities: Generates routines, breaks projects into actionable tasks, suggests deadlines, prioritizes next steps, flags overdue bottlenecks, and provides interactive action proposals you can apply with one click.
- 🗓️ **Calendar & Deadlines**: Monthly, weekly, and daily grid views with color-coded priorities and overdue alerts.
- 📊 **Productivity Analytics & Reports**: Live Productivity Score (0–100), weekly task velocity charts, category focus donuts, and focus hours breakdown.
- 🔔 **Notifications System**: In-app notification center for upcoming deadlines, overdue tasks, and streak milestones.
- 🎨 **Theme & Customization**: Warm Paper (Default physical diary style), Clean Light, and Midnight Velvet Dark Mode.
- 💾 **Data Portability & Zero-lock-in**: Complete JSON export/import backups and instant offline persistence in `localStorage`.

---

## 🚀 Quick Start Guide

### Option 1: One-Click Launch (Windows)
Double-click `start.bat` in this folder. It will automatically build the assets, open `http://localhost:3000` in your browser, and launch the server.

### Option 2: Run via Command Line
```bash
# Start the local server
node server.js

# Or if you make edits to js/ source files, rebuild bundle:
node build.js
```
Open **`http://localhost:3000`** in Chrome, Edge, Brave, or Safari.

### Option 3: Direct File Launch (Zero Server Required)
You can also directly double-click **`index.html`** or open `file:///.../index.html` in any web browser. All scripts, fonts, and assets are pre-bundled and self-contained!

---

## 📁 Project Structure

```
zenith-planner/
├── index.html                   # Master entry point
├── server.js                    # Zero-dependency local Node.js HTTP server
├── build.js                     # Offline bundler & JSX compiler
├── start.bat                    # Windows one-click startup script
├── README.md                    # Documentation & user guide
├── dist/
│   └── bundle.js                # Pre-compiled, production-ready application bundle
├── css/
│   └── style.css                # Physical paper themes, custom checkboxes, animations
├── vendor/
│   ├── react.min.js             # React 18 production runtime
│   ├── react-dom.min.js         # ReactDOM 18 production runtime
│   ├── babel.min.js             # Babel Standalone offline compiler
│   ├── tailwind.min.js          # Tailwind CSS engine
│   └── confetti.min.js          # Canvas Confetti celebration engine
└── js/
    ├── types.js                 # Constants, priorities, categories, badges, quotes
    ├── app.js                   # Root App controller & reactive state store
    ├── services/
    │   ├── audioService.js      # Web Audio API synthetic gentle chimes
    │   ├── storageService.js    # LocalStorage persistence & sample data generator
    │   ├── gamificationService.js# XP, leveling, streak calculation & badge evaluator
    │   └── aiService.js         # Gemini API client & Local Heuristic AI engine
    └── components/
        ├── Icons.js             # Lucide precision SVG icon set
        ├── Navbar.js            # Top header with live clock, active timer pill, actions
        ├── Sidebar.js           # Desktop collapsible sidebar & mobile drawer
        ├── Dashboard.js         # Executive overview, dynamic quotes, stats grid
        ├── RoutinePlanner.js    # Chronological daily timeline & checkbox task lists
        ├── ProjectsView.js      # Project cards, progress rings, milestone modals
        ├── FocusTimer.js        # Pomodoro circular countdown & task stopwatches
        ├── CalendarView.js      # Monthly, weekly, and daily deadline calendars
        ├── AnalyticsView.js     # Productivity score & Recharts-style SVG charts
        ├── GamificationView.js  # 52-week activity heatmap & 12 achievement badges
        ├── AIAssistant.js       # Modern AI chat interface & action proposal applicator
        ├── TaskModal.js         # Full-featured task creation & editing modal
        ├── ProjectModal.js      # Project creation & editing modal
        ├── SettingsModal.js     # Profile, themes, Gemini key, export/import
        └── NotificationsModal.js# Notification center & reminders drawer
```

---

## 🎨 Design Philosophy: The Digital Luxury Notebook

- **Warm Paper Canvas**: `#FAF8F5` background mimicking premium, unbleached cotton paper.
- **Micro-Interactions**: Custom spring checkboxes with animated checkmarks, task strikethrough transitions, and celebratory particle bursts.
- **Synthesized Audio Chimes**: Gentle, high-fidelity arpeggio notes synthesized directly via the Web Audio API without needing external MP3 files.
- **Thoughtful Typography**: Merges classical editorial serif titles with crisp monospace timecodes and clean modern sans-serif body text.

---

## 🔒 Privacy & Free-Tier Assurance

- **100% Free**: No paid APIs or subscriptions required.
- **Local Data Only**: All routines, project deliverables, and time logs remain stored in your browser's `localStorage`.
- **Gemini Free Tier Ready**: If an API key is entered, it talks directly to Google's official Gemini endpoint and is stored strictly on your device.
