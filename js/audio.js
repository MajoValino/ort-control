'use strict';

let audioContext = null;
let audioEnabled = true;
let musicTimer = null;
let musicStep = 0;

function ensureAudioContext() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, volume = 0.025, type = 'square', delay = 0) {
  if (!audioEnabled) return;
  const ctx = ensureAudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(ctx.currentTime + delay);
  oscillator.stop(ctx.currentTime + delay + duration + 0.02);
}

function playGameSound(name) {
  if (!audioEnabled) return;
  const sounds = {
    approve: () => { tone(220, .08, .045); tone(330, .11, .04, 'square', .08); },
    deny: () => { tone(180, .1, .05, 'sawtooth'); tone(110, .18, .04, 'square', .08); },
    compare: () => { tone(420, .05, .025); tone(520, .07, .02, 'square', .05); },
    paper: () => { tone(95, .035, .018, 'triangle'); tone(125, .025, .012, 'triangle', .025); },
    day: () => { tone(196, .12, .025, 'triangle'); tone(247, .12, .02, 'triangle', .12); tone(294, .2, .018, 'triangle', .24); },
    ending: () => { tone(147, .22, .03, 'triangle'); tone(220, .3, .025, 'triangle', .18); tone(294, .5, .02, 'triangle', .38); }
  };
  sounds[name]?.();
}

function startBackgroundMusic() {
  if (!audioEnabled || musicTimer) return;
  ensureAudioContext();
  const notes = [110, 110, 131, 98, 110, 147, 131, 98];
  musicTimer = setInterval(() => {
    if (audioEnabled && gameState?.currentScreen !== 'pause') tone(notes[musicStep++ % notes.length], .34, .008, 'triangle');
  }, 560);
}

function setAudioEnabled(enabled) {
  audioEnabled = enabled;
  const button = document.getElementById('audio-toggle');
  if (button) {
    button.textContent = `SONIDO: ${enabled ? 'SÍ' : 'NO'}`;
    button.setAttribute('aria-pressed', String(enabled));
  }
  if (enabled) startBackgroundMusic();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('audio-toggle')?.addEventListener('click', () => setAudioEnabled(!audioEnabled));
  document.getElementById('btn-play')?.addEventListener('click', () => { startBackgroundMusic(); playGameSound('day'); }, { once: false });
});