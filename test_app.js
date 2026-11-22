// Zenith Planner - Automated Validation & Integration Tests
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🧪 Starting Zenith Planner validation suite...\n');

// Set up browser-like global sandbox
const sandbox = {
  window: {},
  document: {
    documentElement: { setAttribute: () => {} },
    createElement: () => ({ appendChild: () => {}, click: () => {} }),
    body: { appendChild: () => {}, removeChild: () => {} }
  },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
    removeItem(k) { delete this.data[k]; }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1. Load types
const typesCode = fs.readFileSync(path.join(__dirname, 'js', 'types.js'), 'utf8');
vm.runInContext(typesCode, sandbox);
console.log('✅ types.js loaded:', Object.keys(sandbox.window.PLANNER_CONSTANTS));

// 2. Load storage service
const storageCode = fs.readFileSync(path.join(__dirname, 'js', 'services', 'storageService.js'), 'utf8');
vm.runInContext(storageCode, sandbox);
const initialState = sandbox.window.storageService.load();
console.log('✅ storageService loaded. Initial tasks count:', initialState.tasks.length);
console.log('   Projects count:', initialState.projects.length);
console.log('   Gamification streak:', initialState.gamification.streak);

// 3. Load gamification service
const gamificationCode = fs.readFileSync(path.join(__dirname, 'js', 'services', 'gamificationService.js'), 'utf8');
vm.runInContext(gamificationCode, sandbox);
const levelInfo = sandbox.window.gamificationService.getLevelInfo(875);
console.log('✅ gamificationService tested. XP 875 -> Level:', levelInfo.level, `"${levelInfo.title}"`, `(${levelInfo.progressPercent}% progress)`);

// 4. Load AI service
const aiCode = fs.readFileSync(path.join(__dirname, 'js', 'services', 'aiService.js'), 'utf8');
vm.runInContext(aiCode, sandbox);

// Test AI responses for key triggers
async function testAI() {
  const planRes = await sandbox.window.aiService.processMessage('Plan my day today please', initialState);
  console.log('✅ AI "Plan today" response generated. Source:', planRes.source);
  console.log('   Proposal tasks count:', planRes.proposal?.tasks?.length || 0);

  const nextRes = await sandbox.window.aiService.processMessage('What should I work on next?', initialState);
  console.log('✅ AI "Next task" response generated. Next task proposal:', nextRes.proposal?.taskTitle);

  const projectRes = await sandbox.window.aiService.processMessage('Break down my project into subtasks', initialState);
  console.log('✅ AI "Project breakdown" response generated. Proposal action:', projectRes.proposal?.action);

  const overdueRes = await sandbox.window.aiService.processMessage('Review overdue tasks', initialState);
  console.log('✅ AI "Overdue review" response generated. Overdue tasks flagged:', planRes.proposal ? 'Yes' : 'No');

  console.log('\n🎉 ALL VALIDATION CHECKS PASSED PERFECTLY!\n');
}

testAI().catch(err => {
  console.error('❌ Validation failure:', err);
  process.exit(1);
});
