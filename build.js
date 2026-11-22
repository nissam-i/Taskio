// Taskio - Build & Transpilation Script
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('⚡ Starting Taskio build...');

// 1. Load Babel Standalone
const babelPath = path.join(__dirname, 'vendor', 'babel.min.js');
const babelCode = fs.readFileSync(babelPath, 'utf8');
const sandbox = { window: {}, console: console, process: { env: {} } };
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);
const Babel = sandbox.Babel || sandbox.window.Babel;

if (!Babel) {
  console.error('❌ Failed to load Babel standalone.');
  process.exit(1);
}

// 2. Define ordered list of source files
const sourceFiles = [
  'js/types.js',
  'js/services/audioService.js',
  'js/services/storageService.js',
  'js/services/gamificationService.js',
  'js/services/aiService.js',
  'js/components/Icons.js',
  'js/components/Navbar.js',
  'js/components/Sidebar.js',
  'js/components/Dashboard.js',
  'js/components/RoutinePlanner.js',
  'js/components/ProjectsView.js',
  'js/components/FocusTimer.js',
  'js/components/CalendarView.js',
  'js/components/AnalyticsView.js',
  'js/components/GamificationView.js',
  'js/components/AIAssistant.js',
  'js/components/TaskModal.js',
  'js/components/ProjectModal.js',
  'js/components/SettingsModal.js',
  'js/components/NotificationsModal.js',
  'js/app.js'
];

let concatenatedCode = '';
sourceFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  + Bundling ${file}`);
    concatenatedCode += `\n/* --- File: ${file} --- */\n` + fs.readFileSync(filePath, 'utf8') + '\n';
  } else {
    console.warn(`  ⚠️ Missing ${file}`);
  }
});

// Append mounting code
concatenatedCode += `
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
`;

console.log('🔄 Transpiling JSX to production JavaScript...');
try {
  const transformed = Babel.transform(concatenatedCode, {
    presets: ['react']
  }).code;

  const outputPath = path.join(__dirname, 'dist', 'bundle.js');
  fs.writeFileSync(outputPath, transformed, 'utf8');
  console.log(`✅ Successfully compiled to ${outputPath} (${(transformed.length / 1024).toFixed(1)} KB)!`);
} catch (err) {
  console.error('❌ Transpilation error:', err);
  process.exit(1);
}
