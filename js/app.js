/**
 * app.js
 * ─────────────────────────────────────────────
 * Punto de entrada principal. Se ejecuta cuando el DOM está listo.
 * Responsabilidades:
 *   - Escalar el game-container para mantener relación 16:9
 *   - Bindear todos los eventos de UI a las funciones de lógica
 *   - Validar que los assets críticos existen (advertencias de consola)
 *
 * Depende de: data.js, screens.js, documents.js, game.js
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   ESCALADO 16:9 DEL GAME CONTAINER
   El contenedor es siempre 1600×900 px internamente.
   Se escala con CSS transform para ajustarse a cualquier viewport.
═══════════════════════════════════════════════════════════════ */
const GAME_W = 1600;
const GAME_H = 900;

function scaleGameContainer() {
  const container = document.getElementById('game-container');
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const scaleX = winW / GAME_W;
  const scaleY = winH / GAME_H;
  const scale  = Math.min(scaleX, scaleY);  // escala uniforme sin distorsión

  // Centrar el container escalado en la ventana
  const offsetX = (winW - GAME_W * scale) / 2;
  const offsetY = (winH - GAME_H * scale) / 2;

  container.style.transform       = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  container.style.transformOrigin = 'top left';
}

/* ═══════════════════════════════════════════════════════════════
   VALIDACIÓN DE ASSETS (solo advertencias, no bloquea el juego)
   Intenta cargar las imágenes críticas y avisa si faltan.
═══════════════════════════════════════════════════════════════ */
function validateCriticalAssets() {
  const criticalImages = [
    'assets/pantallas/inicio.png',
    'assets/pantallas/boletin.png',
    'assets/pantallas/pantalla-principal.jpg',
    'assets/pantallas/pausa.png',
    'assets/sellos/aporbado.png',
    'assets/sellos/denegado.png'
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.onerror = () => {
      console.error(`[app.js] Asset crítico no encontrado: ${src}`);
    };
    img.src = src;
  });
}

/* ═══════════════════════════════════════════════════════════════
   NAVEGACIÓN CON TECLADO EN MENÚ INICIO
   Permite navegar con flechas ↑↓ y confirmar con Enter
═══════════════════════════════════════════════════════════════ */
function setupStartMenuKeyboard() {
  const menuButtons = [
    document.getElementById('btn-play'),
    document.getElementById('btn-credits')
  ];
  let focusIdx = 0;

  function updateFocus() {
    menuButtons.forEach((btn, i) => {
      if (i === focusIdx) btn.focus();
    });
  }

  document.getElementById('screen-start').addEventListener('keydown', (e) => {
    if (gameState.currentScreen !== 'start') return;

    if (e.key === 'ArrowDown') {
      focusIdx = (focusIdx + 1) % menuButtons.length;
      updateFocus();
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      focusIdx = (focusIdx - 1 + menuButtons.length) % menuButtons.length;
      updateFocus();
      e.preventDefault();
    }
    // Enter dispara el click del botón enfocado automáticamente
  });
}

/* ═══════════════════════════════════════════════════════════════
   INICIALIZACIÓN PRINCIPAL
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Escalar container y re-escalar en resize de ventana
  scaleGameContainer();
  window.addEventListener('resize', scaleGameContainer);

  // 2. Mostrar pantalla inicial
  showScreen('start');

  // 3. Validar assets (no blocante)
  validateCriticalAssets();

  // ─── PANTALLA DE INICIO ─────────────────────────────────────
  document.getElementById('btn-play').addEventListener('click', () => {
    initGameSession();
  });

  document.getElementById('btn-credits').addEventListener('click', () => {
    showCredits();
  });

  document.getElementById('btn-close-credits').addEventListener('click', () => {
    hideCredits();
  });

  // Cerrar créditos también con Escape
  document.getElementById('credits-overlay').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideCredits();
  });

  // ─── BOLETÍN Y FIN DE DÍA ─────────────────────────────────────
  document.getElementById('btn-start-day').addEventListener('click', () => {
    beginWorkDay();
  });

  document.getElementById('btn-next-day').addEventListener('click', () => {
    if (gameState.currentDay >= DAYS.length) {
      showScreen('start');
      return;
    }
    loadDay(gameState.currentDay + 1);
  });

  // ─── DIÁLOGO ────────────────────────────────────────────────
  document.getElementById('chat-send').addEventListener('click', () => {
    sendQuestion(document.getElementById('chat-input').value);
  });

  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion(document.getElementById('chat-input').value);
    }
  });

  // ─── SELLOS ─────────────────────────────────────────────────
  document.getElementById('btn-approve').addEventListener('click', () => {
    if (gameState.currentScreen !== 'game' || gameState.isPaused) return;
    makeDecision('approved');
  });

  document.getElementById('btn-deny').addEventListener('click', () => {
    if (gameState.currentScreen !== 'game' || gameState.isPaused) return;
    makeDecision('denied');
  });

  // ─── PAUSA (Escape) ──────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    // Ignorar si está en la pantalla de inicio o boletín
    if (gameState.currentScreen === 'start' || gameState.currentScreen === 'bulletin') return;

    if (gameState.currentScreen === 'pause') {
      closePause();
    } else if (gameState.currentScreen === 'game') {
      showScreen('pause');
    }
  });

  // ─── MENÚ DE PAUSA ───────────────────────────────────────────
  document.getElementById('btn-resume').addEventListener('click', () => {
    closePause();
  });

  document.getElementById('btn-restart-day').addEventListener('click', () => {
    restartDay();
  });

  document.getElementById('btn-main-menu').addEventListener('click', () => {
    closePause();
    showScreen('start');
  });

  document.getElementById('btn-quit').addEventListener('click', () => {
    // En navegador no se puede cerrar la pestaña; confirmación y vuelta al inicio
    if (confirm('¿Deseas salir al menú principal?\n(No es posible cerrar la pestaña desde el juego)')) {
      closePause();
      showScreen('start');
    }
  });

  // ─── Teclado en menú inicio ──────────────────────────────────
  setupStartMenuKeyboard();


  document.getElementById('btn-close-instructions').addEventListener('click', startCurrentDayAfterInstructions);

  document.getElementById('btn-dismiss-citation').addEventListener('click', dismissCitation);
  document.getElementById('rulebook-toggle').addEventListener('click', openRulebook);
  document.getElementById('btn-close-rulebook').addEventListener('click', closeRulebook);
  document.getElementById('btn-compare-evidence').addEventListener('click', compareEvidence);
  document.getElementById('decision-drawer-toggle').addEventListener('click', toggleDecisionDrawer);
  document.getElementById('btn-configure-ai').addEventListener('click', () => {
    try {
      const saved = configureAIKey();
      if (saved) alert('IA configurada para esta pestaña. La clave no se guardará en el ZIP.');
    } catch (error) {
      alert(error.message);
    }
  });

  console.log('[app.js] ORT Control inicializado correctamente.');
});
