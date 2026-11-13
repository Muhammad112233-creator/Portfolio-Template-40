'use client';

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function blip(freq: number, dur = 0.08, type: OscillatorType = 'square', gain = 0.04) {
  const c = getCtx();
  if (!c) return;
  if (c.state === 'suspended') c.resume().catch(() => {});
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + dur);
}

export const sfx = {
  hover: () => blip(880, 0.04, 'square', 0.02),
  select: () => {
    blip(660, 0.07);
    setTimeout(() => blip(990, 0.09), 60);
  },
  back: () => blip(330, 0.09, 'triangle', 0.04),
  start: () => {
    blip(523, 0.08);
    setTimeout(() => blip(659, 0.08), 90);
    setTimeout(() => blip(784, 0.12), 180);
  },
  coin: () => {
    blip(988, 0.06);
    setTimeout(() => blip(1319, 0.14), 60);
  },
};
