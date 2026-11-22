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
