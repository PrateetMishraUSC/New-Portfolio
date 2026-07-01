let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(ctx, freq, startTime, duration, gainValue = 0.09) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// "access_on" — a bright ascending four-note confirm for switching to
// light. "access_off" — the same notes reordered into a descending,
// muted-ending run for switching to dark. Purely synthesized, no audio
// assets required.
export function playThemeChime(theme) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = getContext();
  const now = ctx.currentTime;

  if (theme === 'light') {
    playTone(ctx, 659.25, now, 0.08); // E5
    playTone(ctx, 880.0, now + 0.1, 0.08); // A5
    playTone(ctx, 659.25, now + 0.2, 0.08); // E5
    playTone(ctx, 1046.5, now + 0.3, 0.14); // C6
  } else {
    playTone(ctx, 1046.5, now, 0.08); // C6
    playTone(ctx, 659.25, now + 0.1, 0.08); // E5
    playTone(ctx, 880.0, now + 0.2, 0.08); // A5
    playTone(ctx, 440.0, now + 0.3, 0.18, 0.08); // A4, quieter/muted ending
  }
}
