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

function envGain(ctx, startTime, duration, gainValue, attack = 0.03) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainValue, startTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  gain.connect(ctx.destination);
  return gain;
}

// Two oscillators a few Hz apart, played together — the slight beating
// between them gives a soft "shimmer" rather than a flat, single tone.
function detunedTone(ctx, freq, startTime, duration, gainValue, detuneHz = 2, attack) {
  const gain = envGain(ctx, startTime, duration, gainValue, attack);
  [freq, freq + detuneHz].forEach((f) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    osc.connect(gain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  });
}

// A tone with a slow pitch wobble (an LFO modulating frequency), giving a
// breathy, synthesized-voice quality instead of a static beep.
function vibratoTone(ctx, freq, startTime, duration, gainValue, vibRate, vibDepth, attack) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = vibRate;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = vibDepth;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  lfo.start(startTime);
  lfo.stop(startTime + duration + 0.05);

  const gain = envGain(ctx, startTime, duration, gainValue, attack);
  osc.connect(gain);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// "process_complete" — an AI-assistant-style confirm. Switching to light
// rises through two soft detuned notes into a bright shimmering sustain;
// switching to dark mirrors it, descending into a lower, quieter, longer
// shimmer. Purely synthesized, no audio assets required.
export function playThemeChime(theme) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = getContext();
  const now = ctx.currentTime;

  if (theme === 'light') {
    detunedTone(ctx, 659.25, now, 0.15, 0.08, 2, 0.02); // E5
    detunedTone(ctx, 880.0, now + 0.12, 0.18, 0.08, 2, 0.02); // A5
    vibratoTone(ctx, 1174.66, now + 0.26, 0.7, 0.07, 5, 7, 0.04); // D6, shimmer
  } else {
    detunedTone(ctx, 880.0, now, 0.15, 0.08, 2, 0.02); // A5
    detunedTone(ctx, 659.25, now + 0.12, 0.18, 0.08, 2, 0.02); // E5
    vibratoTone(ctx, 440.0, now + 0.26, 0.8, 0.06, 5, 7, 0.04); // A4, lower shimmer
  }
}
