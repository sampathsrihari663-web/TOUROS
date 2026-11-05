// Web Audio API Procedural Sound Engine for TOUROS
// 100% client-side, zero external audio assets, works instantly offline

let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Mute / Unmute state with LocalStorage persistence
let isMuted = false;
if (typeof window !== 'undefined') {
  isMuted = localStorage.getItem('touros_sound_muted') === 'true';
}

export const soundService = {
  isMuted() {
    return isMuted;
  },

  toggleSound() {
    isMuted = !isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('touros_sound_muted', isMuted ? 'true' : 'false');
    }
    if (!isMuted) {
      // Play a quick confirmation pop
      this.playPop();
    }
    return !isMuted;
  },

  // 1. Task Created — Bouncy Cloud Pop
  playPop() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;

      // Frequency sweeps up quickly
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

      // Volume envelope
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore audio errors if blocked by browser policy
    }
  },

  // 2. Task Completed — Uplifting 3-tone Major Harmonic Chime (C5 - E5 - G5)
  playSuccessChime() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.16, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch {}
  },

  // 3. Stampede Start — Deep Charging Rush Tone
  playStampedeStart() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  },

  // 4. Timer Tick — Soft subtle droplet
  playTick() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  },

  // 5. Victory Fanfare — Triumphant 5-note retro fanfare
  playVictoryFanfare() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // G4 -> C5 -> E5 -> G5 -> High C6
      const fanfare = [
        { f: 392.00, d: 0.12, pause: 0.0 },
        { f: 523.25, d: 0.12, pause: 0.12 },
        { f: 659.25, d: 0.12, pause: 0.24 },
        { f: 783.99, d: 0.22, pause: 0.36 },
        { f: 1046.50, d: 0.45, pause: 0.60 },
      ];

      const now = ctx.currentTime;

      fanfare.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.pause);

        gain.gain.setValueAtTime(0, now + n.pause);
        gain.gain.linearRampToValueAtTime(0.22, now + n.pause + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.pause + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.pause);
        osc.stop(now + n.pause + n.d);
      });
    } catch {}
  }
};

export default soundService;

