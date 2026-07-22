'use strict';

const SCREENS = {
  start: document.getElementById('screen-start'),
  bulletin: document.getElementById('screen-bulletin'),
  game: document.getElementById('screen-game'),
  endDay: document.getElementById('screen-end-day'),
  ending: document.getElementById('screen-ending'),
  pause: document.getElementById('screen-pause')
};
const creditsOverlay = document.getElementById('credits-overlay');

function showScreen(screenName) {
  if (screenName === 'pause') {
    SCREENS.pause.classList.remove('hidden');
    SCREENS.pause.classList.add('active');
    gameState.isPaused = true;
    gameState.currentScreen = 'pause';
    return;
  }

  Object.entries(SCREENS).forEach(([name, screen]) => {
    if (name === 'pause') return;
    screen.classList.add('hidden');
    screen.classList.remove('active');
  });
  SCREENS.pause.classList.add('hidden');
  SCREENS.pause.classList.remove('active');

  const target = SCREENS[screenName];
  if (!target) {
    console.error(`[screens] Pantalla desconocida: ${screenName}`);
    return;
  }
  target.classList.remove('hidden');
  target.classList.add('active');
  gameState.currentScreen = screenName;
  gameState.isPaused = false;
}

function closePause() {
  SCREENS.pause.classList.add('hidden');
  SCREENS.pause.classList.remove('active');
  SCREENS.game.classList.remove('hidden');
  SCREENS.game.classList.add('active');
  gameState.isPaused = false;
  gameState.currentScreen = 'game';
}

function showCredits() {
  document.getElementById('credits-title').textContent = CREDITS.projectName;
  document.getElementById('credits-subtitle').textContent = CREDITS.subtitle;
  document.getElementById('credits-subject').textContent = `${CREDITS.subject} · ${CREDITS.year}`;
  document.getElementById('credits-institution').textContent = CREDITS.institution;
  document.getElementById('credits-ack').textContent = CREDITS.acknowledgements;
  document.getElementById('credits-authors').innerHTML = CREDITS.authors.map(a => `<div>${a}</div>`).join('');
  creditsOverlay.classList.remove('hidden');
}
function hideCredits() { creditsOverlay.classList.add('hidden'); }
