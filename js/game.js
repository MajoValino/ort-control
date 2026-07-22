'use strict';

const gameState = {
  currentScreen: 'start', currentDay: 1, currentCharacterIndex: 0, score: 0,
  decisions: [], isPaused: false, dayCharacters: [], pendingAdvance: false,
  instructionsSeen: new Set(), conversationHistory: [], localResponseIndex: {},
  receptionist: { strictness: 0, compassion: 0, errors: 0 }, transcript: []
};

const charAreaEl = document.getElementById('character-area');
const chatHistoryEl = document.getElementById('chat-history');
const chatInputEl = document.getElementById('chat-input');
const chatSendEl = document.getElementById('chat-send');
const hudDayEl = document.getElementById('hud-day');
const hudDateEl = document.getElementById('hud-date');
const turnNotifEl = document.getElementById('turn-notification');
const requirementsEl = document.getElementById('document-requirements');
const quickQuestionsEl = document.getElementById('quick-questions');
const instructionEl = document.getElementById('day-instructions');
const instructionContextEl = document.getElementById('instructions-context');
const instructionListEl = document.getElementById('instructions-list');
const citationEl = document.getElementById('citation-notice');
const citationMessageEl = document.getElementById('citation-message');
const bulletinDayNum = document.getElementById('bulletin-day-num');
const bulletinDateVal = document.getElementById('bulletin-date-val');
const bulletinRule = document.getElementById('bulletin-rule');
const bulletinObs = document.getElementById('bulletin-obs');
const bulletinReminders = document.getElementById('bulletin-reminders');
const bulletinLore = document.getElementById('bulletin-lore');
const bulletinNewDocs = document.getElementById('bulletin-new-docs');
const summaryList = document.getElementById('summary-list');
const summaryScore = document.getElementById('summary-score');
const receptionistLoreEl = document.getElementById('receptionist-lore');
const endingPreviewEl = document.getElementById('ending-preview');
const btnNextDay = document.getElementById('btn-next-day');
const evidenceListEl = document.getElementById('evidence-list');
const rulebookOverlayEl = document.getElementById('rulebook-overlay');
const rulebookRulesLeftEl = document.getElementById('rulebook-rules-left');
const rulebookRulesRightEl = document.getElementById('rulebook-rules-right');
const rulebookDayTitleEl = document.getElementById('rulebook-day-title');
const decisionControlsEl = document.getElementById('decision-controls');
const decisionToggleEl = document.getElementById('decision-drawer-toggle');
const transcriptToggleEl = document.getElementById('transcript-toggle');
const transcriptOverlayEl = document.getElementById('transcript-overlay');
const btnCloseTranscriptEl = document.getElementById('btn-close-transcript');
const transcriptContentEl = document.getElementById('transcript-content');
const transcriptCharacterNameEl = document.getElementById('transcript-character-name');
const endingTitleEl = document.getElementById('ending-title');
const endingStoryEl = document.getElementById('ending-story');
const endingStatsEl = document.getElementById('ending-stats');
const endingHighlightsEl = document.getElementById('ending-highlights');
const endingStampEl = document.getElementById('ending-stamp');

if (transcriptToggleEl) transcriptToggleEl.addEventListener('click', () => transcriptOverlayEl.classList.remove('hidden'));
if (btnCloseTranscriptEl) btnCloseTranscriptEl.addEventListener('click', () => transcriptOverlayEl.classList.add('hidden'));

function initGameSession() {
  gameState.currentDay = 1;
  gameState.currentCharacterIndex = 0;
  gameState.score = 0;
  gameState.decisions = [];
  gameState.instructionsSeen.clear();
  gameState.receptionist = { strictness: 0, compassion: 0, errors: 0 };
  CHARACTERS.forEach(character => {
    if (character.documents) delete character.documents.missingDocumentRecord;
  });
  loadDay(1);
}
function getDayData() { return DAYS.find(day => day.day === gameState.currentDay); }
function getCurrentCharacter() { return gameState.dayCharacters[gameState.currentCharacterIndex] || null; }

function loadDay(dayNumber) {
  const day = DAYS.find(item => item.day === dayNumber);
  if (!day) { showScreen('start'); return; }
  gameState.currentDay = dayNumber;
  gameState.currentCharacterIndex = 0;
  gameState.dayCharacters = day.characterIds.map(id => CHARACTERS.find(character => character.id === id)).filter(Boolean);
  bulletinDayNum.textContent = day.day;
  bulletinDateVal.textContent = day.date;
  const bulletinRules = Array.isArray(day.newRule) ? day.newRule : [day.newRule];
  bulletinRule.innerHTML = bulletinRules.map(rule => `<span>${rule}</span>`).join('');
  bulletinObs.innerHTML = day.observations.map(item => `<li>${item}</li>`).join('');
  bulletinReminders.innerHTML = day.reminder.map(item => `<li>${item}</li>`).join('');
  bulletinLore.textContent = day.lore;
  bulletinNewDocs.innerHTML = day.introducedDocuments.length
    ? day.introducedDocuments.map(type => `<span>${DOCUMENT_LABELS[type]}</span>`).join('')
    : '<span>Se mantienen todos los documentos anteriores.</span>';
  hudDayEl.textContent = `DÍA ${day.day}`;
  hudDateEl.textContent = day.date;
  document.querySelectorAll('.stamp-date').forEach(node => { node.textContent = day.date; });
  renderRulebook(day);
  showScreen('bulletin');
  if (typeof playGameSound === 'function') playGameSound('day');
}

function beginWorkDay() {
  const day = getDayData();
  showScreen('game');
  clearDocuments();
  charAreaEl.innerHTML = '';
  chatHistoryEl.innerHTML = '';
  requirementsEl.innerHTML = '';
  quickQuestionsEl.innerHTML = '';
  setChatEnabled(false);
  instructionContextEl.textContent = day.lore;
  instructionListEl.innerHTML = day.instructionSteps.map(step => `<li>${step}</li>`).join('');
  instructionEl.classList.remove('hidden');
  decisionControlsEl.classList.add('decision-collapsed');
  decisionToggleEl.setAttribute('aria-expanded', 'false');
}
function startCurrentDayAfterInstructions() {
  instructionEl.classList.add('hidden');
  gameState.instructionsSeen.add(gameState.currentDay);
  loadCharacter(0);
}

function loadCharacter(index) {
  clearDocuments();
  chatHistoryEl.innerHTML = '';
  gameState.conversationHistory = [];
  gameState.transcript = [];
  if (transcriptContentEl) transcriptContentEl.innerHTML = '';
  gameState.localResponseIndex = {};
  setChatEnabled(false);
  const character = gameState.dayCharacters[index];
  if (!character) { showEndDaySummary(); return; }
  charAreaEl.innerHTML = '';
  if (transcriptContentEl) transcriptContentEl.innerHTML = '';
  if (transcriptCharacterNameEl) transcriptCharacterNameEl.textContent = character.displayName || 'Sujeto';
  
  const image = new Image();
  image.className = 'character-img';
  image.alt = character.displayName;
  image.src = character.image;
  charAreaEl.appendChild(image);
  renderDocumentRequirements(character);
  refreshQuickQuestions();
  if (character.documents) delete character.documents.missingDocumentRecord;
  const entries = Object.entries(character.documents).sort(([a], [b]) => a === 'identity' ? -1 : b === 'identity' ? 1 : 0);
  setTimeout(() => {
    addChatMessage(character.greeting, 'npc');
    setChatEnabled(true);
  }, 250);
  setTimeout(() => entries.forEach(([type, data], documentIndex) => renderDocument(type, data, `${character.id}-${documentIndex}`, documentIndex)), 420);
}

function renderDocumentRequirements(character) {
  requirementsEl.innerHTML = '<h3>DOCUMENTACIÓN</h3>';
  character.requiredDocuments.forEach(type => {
    const present = Boolean(character.documents[type]);
    const row = document.createElement('button');
    row.type = 'button';
    row.className = `requirement-row ${present ? 'present' : 'missing'}`;
    row.innerHTML = `<span>${present ? '✓' : '!'}</span>${DOCUMENT_LABELS[type]}`;
    row.title = present ? 'Documento entregado' : 'Clic para marcar el documento faltante';
    if (!present) {
      row.addEventListener('click', () => addEvidence({
        source: 'document', element: row, documentElement: null,
        documentType: type, documentLabel: 'Documentación requerida',
        field: type === 'identity' ? 'missingIdentity' : 'missingDocument',
        fieldLabel: DOCUMENT_LABELS[type], value: 'AUSENTE', isActualError: true,
        issueMessage: `Falta ${DOCUMENT_LABELS[type]}.`
      }));
    }
    requirementsEl.appendChild(row);
  });
}

function refreshQuickQuestions() {
  const character = getCurrentCharacter();
  if (!character) return;
  const evidence = getSelectedEvidence();
  const questions = [];
  if (!character.documents.identity) questions.push('¿Dónde está su documento de identidad?');
  if (evidence.length) questions.push('¿Puede explicar los datos que marqué?');
  questions.push('¿Cuál es su nombre completo?', '¿Qué documentos presentó?', '¿Cuál es el motivo de su ingreso?');
  quickQuestionsEl.innerHTML = [...new Set(questions)].slice(0, 4).map(question => `<button type="button" class="quick-question">${question}</button>`).join('');
  quickQuestionsEl.querySelectorAll('.quick-question').forEach(button => button.addEventListener('click', () => sendQuestion(button.textContent, { quick: true })));
}

function addChatMessage(text, who, metadata = null) {
  const div = document.createElement('div');
  div.className = `chat-msg ${who === 'player' ? 'msg-player' : who === 'system' ? 'msg-system' : 'msg-npc'}`;
  const character = getCurrentCharacter();
  div.textContent = who === 'player' ? `> Tú: ${text}` : who === 'system' ? `> SISTEMA: ${text}` : `> ${character?.displayName || 'Persona'}: ${text}`;
  chatHistoryEl.appendChild(div);
  chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;

  if (who !== 'system') {
    gameState.transcript.push({
      id: Date.now() + Math.random().toString(),
      speaker: who === 'player' ? 'inspector' : 'character',
      speakerLabel: who === 'player' ? 'Inspector' : (character?.displayName || 'Sujeto'),
      text: text,
      evidenceMetadata: metadata
    });
    renderTranscript();
  }
}

function renderTranscript() {
  const transcriptContent = document.getElementById('transcript-content');
  if (!transcriptContent) return;
  transcriptContent.innerHTML = '';
  
  gameState.transcript.forEach(entry => {
    const line = document.createElement('div');
    line.className = 'transcript-line';
    
    if (entry.evidenceMetadata) {
      line.classList.add('selectable-transcript');
      line.style.cursor = 'crosshair';
      line.addEventListener('click', (e) => {
        addEvidence({
          source: 'transcript', element: line, ruleId: null, ruleType: null,
          documentLabel: 'Transcripción', fieldLabel: 'Declaración',
          value: entry.text, isActualError: entry.evidenceMetadata.isActualError,
          issueMessage: '', metadata: entry.evidenceMetadata
        });
      });
    } else if (entry.speaker === 'character') {
      if (entry.text.length > 20) {
        line.classList.add('selectable-transcript');
        line.style.cursor = 'crosshair';
        line.addEventListener('click', (e) => {
          addEvidence({
            source: 'transcript', element: line, ruleId: null, ruleType: null,
            documentLabel: 'Transcripción', fieldLabel: 'Declaración',
            value: entry.text, isActualError: false,
            issueMessage: ''
          });
        });
      }
    }
    line.textContent = `${entry.speakerLabel}: ${entry.text}`;
    transcriptContent.appendChild(line);
  });
}
function setChatEnabled(enabled) { chatInputEl.disabled = !enabled; chatSendEl.disabled = !enabled; }

function getLocalCharacterResponse(question, character) {
  const lower = question.toLowerCase();
  const evidence = getSelectedEvidence();
  let key = 'default';
  const keywordMap = {
    nombre: ['nombre', 'llam'], identidad: ['identidad', 'cédula'], carrera: ['carrera', 'estudi'],
    documentos: ['document', 'papel'], procedencia: ['origen', 'dónde vive'], motivo: ['motivo', 'ingreso'],
    orden: ['orden', 'servicio'], área: ['área', 'departamento']
  };
  for (const [candidate, words] of Object.entries(keywordMap)) {
    if (words.some(word => lower.includes(word)) && character.responses[candidate]) { key = candidate; break; }
  }
  if (evidence.length && lower.includes('marqué')) {
    const direct = evidence.find(item => character.issueResponses?.[item.field]);
    if (direct) return character.issueResponses[direct.field];
    return 'No estoy seguro de por qué le llama la atención. Es la información que me entregaron.';
  }
  const raw = character.responses[key] || character.responses.default || 'No tengo más información para agregar.';
  
  if (typeof raw === 'object' && raw.text) {
    return raw;
  }
  
  const variants = Array.isArray(raw) ? raw : [raw, `${raw} Eso es todo lo que sé.`, `Hasta donde entiendo, ${raw.charAt(0).toLowerCase()}${raw.slice(1)}`];
  const index = gameState.localResponseIndex[key] || 0;
  gameState.localResponseIndex[key] = index + 1;
  return variants[index % variants.length];
}
function shouldUseAI(question, options) {
  if (!hasAIKey()) return false;
  if (!options.quick) return true;
  const lower = question.toLowerCase();
  return lower.includes('marqué') || lower.includes('explicar') || lower.includes('por qué');
}
async function sendQuestion(question, options = {}) {
  const character = getCurrentCharacter();
  const cleanQuestion = String(question || '').trim();
  if (!character || !cleanQuestion) return;
  addChatMessage(cleanQuestion, 'player');
  chatInputEl.value = '';
  setChatEnabled(false);
  let responseText = '';
  let responseMetadata = null;
  
  try {
    if (shouldUseAI(cleanQuestion, options)) {
      showTurnNotification('CONSULTANDO...', 'warning-notif');
      const aiResp = await askCharacterAI({
        question: cleanQuestion, character,
        selectedEvidence: getSelectedEvidence(),
        conversationHistory: gameState.conversationHistory
      });
      responseText = aiResp;
    } else {
      const localResp = getLocalCharacterResponse(cleanQuestion, character);
      if (typeof localResp === 'object') {
        responseText = localResp.text;
        responseMetadata = localResp.metadata;
      } else {
        responseText = localResp;
      }
    }
  } catch (error) {
    console.warn('[IA] Se utilizó respuesta local:', error.message);
    const localResp = getLocalCharacterResponse(cleanQuestion, character);
    if (typeof localResp === 'object') {
      responseText = localResp.text;
      responseMetadata = localResp.metadata;
    } else {
      responseText = localResp;
    }
    if (error.message.includes('API key')) showTurnNotification('IA SIN CONFIGURAR — RESPUESTA LOCAL', 'warning-notif');
  }
  showTurnNotification('', '');
  addChatMessage(responseText, 'npc', responseMetadata);
  gameState.conversationHistory.push({ role: 'Inspector', content: cleanQuestion }, { role: character.displayName, content: responseText });
  setChatEnabled(true);
}

function renderRulebook(day) {
  rulebookDayTitleEl.textContent = `DÍA ${day.day}`;
  const requirementsByDay = {
    1: [['category','INGRESO: estudiantes y docentes.'],['identity','ESTUDIANTE: documento de identidad.'],['identity','DOCENTE: documento de identidad.']],
    2: [['category','INGRESO: estudiantes y docentes.'],['identity','ASPIRANTE NUEVO: identidad + carta de admisión.'],['identity','ESTUDIANTE REGULAR: identidad + constancia + certificado.'],['identity','DOCENTE: documento de identidad.']],
    3: [['category','INGRESO: estudiantes, docentes, visitantes y proveedores.'],['identity','ASPIRANTE: identidad + carta de admisión.'],['identity','ESTUDIANTE REGULAR: identidad + constancia + certificado.'],['identity','DOCENTE: identidad.'],['identity','VISITANTE: identidad + pase.'],['identity','PROVEEDOR: identidad + orden de servicio.']],
    4: [['category','INGRESO: estudiantes, docentes, visitantes, proveedores y excepciones.'],['identity','ASPIRANTE: identidad + carta de admisión.'],['identity','ESTUDIANTE REGULAR: identidad + constancia + certificado.'],['identity','DOCENTE: identidad.'],['identity','VISITANTE: identidad + pase.'],['identity','PROVEEDOR: identidad + orden.'],['identity','EXCEPCIÓN: identidad + permiso especial.']],
    5: [['category','AUDITORÍA: todas las categorías están habilitadas.'],['identity','ASPIRANTE: identidad + carta de admisión.'],['identity','ESTUDIANTE REGULAR: identidad + constancia + certificado.'],['identity','DOCENTE: identidad.'],['identity','VISITANTE: identidad + pase.'],['identity','PROVEEDOR: identidad + orden.'],['identity','EXCEPCIÓN: identidad + permiso especial.']]
  };
  const validations = [['identity','IDENTIDAD: nombre y apellido deben coincidir.'],['code','CÓDIGOS: compare solamente los 4 dígitos finales.']];
  if (day.day >= 2) validations.push(['academic','ACADÉMICOS: carrera y período deben coincidir.'],['stamp','CONSTANCIA: sello de Admisiones. CERTIFICADO: sello de Facultad.']);
  if (day.day >= 3) validations.push(['external','PASE Y ORDEN: área, motivo y fecha vigentes.'],['stamp','PASE Y ORDEN: sello de Administración.']);
  if (day.day >= 4) validations.push(['permit','PERMISO ESPECIAL: fecha vigente y autoridad Rectorado.'],['stamp','PERMISO ESPECIAL: sello Institucional auténtico.']);
  const makeRules = (rules, side) => rules.map((rule,index) => ({id:`${side}-${day.day}-${index}`,type:rule[0],label:rule[1]}));
  const renderRules = rules => rules.map(rule => `<button type="button" class="rule-evidence" data-rule-id="${rule.id}" data-rule-type="${rule.type}">${rule.label}</button>`).join('');
  rulebookRulesLeftEl.innerHTML = renderRules(makeRules(requirementsByDay[day.day] || requirementsByDay[1],'req'));
  rulebookRulesRightEl.innerHTML = renderRules(makeRules(validations,'val'));
  document.querySelectorAll('#rulebook-overlay .rule-evidence').forEach(button => button.addEventListener('click', () => addEvidence({source:'rule',element:button,ruleId:button.dataset.ruleId,ruleType:button.dataset.ruleType,documentLabel:'Reglamento',fieldLabel:'Regla',value:button.textContent,isActualError:false})));
}
function openRulebook() { rulebookOverlayEl.classList.remove('hidden'); }
function closeRulebook() { rulebookOverlayEl.classList.add('hidden'); }
function generateMissingDocumentRecord(character) {
  if (document.querySelector('.missing-document-record')) return null; // Prevent duplicate

  const dateStr = getDayData().date;
  const missingData = {
    name: character.displayName,
    documentType: 'Documento de identidad',
    statement: 'No presentó el documento.',
    date: dateStr,
    status: 'Pendiente de resolución'
  };
  if (!character.documents) character.documents = {};
  delete character.documents.missingDocumentRecord;
  const wrapper = renderDocument('missingDocumentRecord', missingData, character.id + '-missing', Object.keys(character.documents).length);

  if (!wrapper) {
    console.error('[ACTA] No se pudo renderizar el acta.');
    showTurnNotification('ERROR AL GENERAR EL ACTA', 'denied-notif');
    return null;
  }

  wrapper.classList.add('generated-missing-document-record', 'in-tray');
  wrapper.dataset.state = 'tray';
  wrapper.style.left = '260px';
  wrapper.style.top = '690px';
  wrapper.dataset.initialLeft = '260';
  wrapper.dataset.initialTop = '690';
  selectDocument(wrapper);
  return wrapper;
}

function updateEvidencePanel() {
  const evidence = getSelectedEvidence();
  evidenceListEl.innerHTML = evidence.length ? evidence.map((item, index) => `<div>${index + 1}. <strong>${item.documentLabel}</strong><br>${item.fieldLabel}: ${item.value}</div>`).join('') : 'Seleccione hasta 2 datos.';
}
function normalizeComparable(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function lastFour(value) { const digits = String(value || '').match(/\d/g) || []; return digits.slice(-4).join(''); }
function compareEvidence() {
  const evidence = getSelectedEvidence();
  if (evidence.length !== 2) { showTurnNotification('SELECCIONE 2 EVIDENCIAS', 'warning-notif'); return; }
  const [a, b] = evidence;
  let discrepancy = false;
  let comparable = true;
  let message = '';
  if (a.source === 'rule' || b.source === 'rule') {
    const rule = a.source === 'rule' ? a : b;
    const field = a.source === 'rule' ? b : a;
    
    // TRANSCRIPT MISSING DOCUMENT COMPARISON
    if (rule.ruleType === 'identity' && field.source === 'transcript' && field.metadata) {
      if (field.metadata.issueType === 'missingDocument' && field.metadata.missingDocumentType === 'identity') {
        clearSelectedEvidence();
        if (rulebookOverlayEl) rulebookOverlayEl.classList.add('hidden');
        if (transcriptOverlayEl) transcriptOverlayEl.classList.add('hidden');
        generateMissingDocumentRecord(getCurrentCharacter());
        showTurnNotification('ACTA GENERADA — ARRASTRE Y SELLE LA RESOLUCIÓN', 'warning-notif');
        return;
      }
    }

    if (rule.ruleType === 'identity') {
      discrepancy = field.field === 'missingIdentity' || field.value === 'AUSENTE';
      message = discrepancy ? 'DISCREPANCIA: falta la identidad obligatoria.' : 'La evidencia no contradice esta regla.';
    } else if (rule.ruleType === 'code') {
      comparable = /code|number|file/i.test(field.field || '');
      discrepancy = field.isActualError;
      message = comparable ? (discrepancy ? 'DISCREPANCIA EN EL CÓDIGO.' : 'El código seleccionado respeta la regla conocida.') : 'Esta evidencia no es un código.';
    } else {
      discrepancy = field.isActualError;
      message = discrepancy ? 'DISCREPANCIA CON LA REGLA VIGENTE.' : 'No se detecta contradicción con esta regla.';
    }
  } else {
    const codeLike = [a, b].every(item => /code|number|file/i.test(item.field || ''));
    const sameField = a.field === b.field || ['name', 'surname', 'applicantName'].includes(a.field) && ['name', 'surname', 'applicantName'].includes(b.field);
    if (codeLike) {
      discrepancy = lastFour(a.value) !== lastFour(b.value);
      message = discrepancy ? `DISCREPANCIA: ${lastFour(a.value)} ≠ ${lastFour(b.value)}` : `COINCIDE: ambos terminan en ${lastFour(a.value)}.`;
    } else if (sameField) {
      discrepancy = normalizeComparable(a.value) !== normalizeComparable(b.value);
      message = discrepancy ? 'DISCREPANCIA ENTRE LOS DATOS.' : 'LOS DATOS COINCIDEN.';
    } else if (a.isActualError || b.isActualError) {
      discrepancy = true;
      message = 'DISCREPANCIA DETECTADA.';
    } else {
      comparable = false;
      message = 'ESOS DATOS NO SE PUEDEN COMPARAR ENTRE SÍ.';
    }
  }
  showTurnNotification(message, discrepancy ? 'denied-notif' : comparable ? 'approved-notif' : 'warning-notif');
  if (typeof playGameSound === 'function') playGameSound('compare');
  setTimeout(() => showTurnNotification('', ''), 1800);
}

function toggleDecisionDrawer() {
  const collapsed = decisionControlsEl.classList.toggle('decision-collapsed');
  decisionToggleEl.textContent = collapsed ? 'SELLOS ▲' : 'SELLOS ▼';
  decisionToggleEl.setAttribute('aria-expanded', String(!collapsed));
}
function pickReaction(character, key) {
  const list = character.reactions[key];
  return Array.isArray(list) ? list[Math.floor(Math.random() * list.length)] : list;
}
function makeDecision(decision) {
  const character = getCurrentCharacter();
  if (!character || gameState.pendingAdvance) return;
  const selected = getSelectedDocument();
  if (!selected) { showTurnNotification('SELECCIONE UN DOCUMENTO PARA SELLAR', 'warning-notif'); return; }
  applyDecisionStamp(selected, decision, getDayData().date);
  if (typeof playGameSound === 'function') playGameSound(decision === 'approved' ? 'approve' : 'deny');
  const isCorrect = character.correctDecision === decision;
  const points = isCorrect ? 50 : -20;
  gameState.score += points;
  if (decision === 'denied') gameState.receptionist.strictness += 1;
  else gameState.receptionist.compassion += 1;
  if (!isCorrect) gameState.receptionist.errors += 1;
  gameState.decisions.push({ characterId: character.id, characterName: character.displayName, decision, correctDecision: character.correctDecision, isCorrect, points, day: gameState.currentDay, finalCase: Boolean(character.finalCase), hiddenError: character.hiddenError });
  const key = decision === 'approved' ? (isCorrect ? 'approvedCorrect' : 'approvedWrong') : (isCorrect ? 'deniedCorrect' : 'deniedWrong');
  gameState.pendingAdvance = true;
  setChatEnabled(false);
  addChatMessage(pickReaction(character, key), 'npc');
  showTurnNotification(decision === 'approved' ? 'APROBADO' : 'DENEGADO', decision === 'approved' ? 'approved-notif' : 'denied-notif');
  if (!isCorrect) setTimeout(() => showCitation(character, decision), 700);
  else setTimeout(advanceCharacter, 1500);
}
function showCitation(character, decision) {
  showTurnNotification('', '');
  citationMessageEl.textContent = `Decisión incorrecta: ${decision === 'approved' ? 'se aprobó' : 'se denegó'} a ${character.displayName}. ${character.hiddenError || 'La documentación estaba en regla.'}`;
  citationEl.classList.remove('hidden');
}
function dismissCitation() { citationEl.classList.add('hidden'); advanceCharacter(); }
function advanceCharacter() {
  charAreaEl.querySelector('.character-img')?.classList.add('exiting');
  setTimeout(() => {
    showTurnNotification('', '');
    gameState.currentCharacterIndex += 1;
    gameState.pendingAdvance = false;
    loadCharacter(gameState.currentCharacterIndex);
  }, 450);
}
function showTurnNotification(text, className) {
  turnNotifEl.className = 'hidden';
  if (!text) return;
  turnNotifEl.textContent = text;
  turnNotifEl.classList.remove('hidden');
  if (className) turnNotifEl.classList.add(className);
}

function getEndingData() {
  const total = gameState.decisions.length || 1;
  const correct = gameState.decisions.filter(item => item.isCorrect).length;
  const incorrect = total - correct;
  const approvedErrors = gameState.decisions.filter(item => item.decision === 'approved' && !item.isCorrect).length;
  const accuracy = correct / total;
  if (accuracy >= 0.85 && approvedErrors === 0) return { key:'model', title:'INSPECTOR MODELO', stamp:'ASCENSO APROBADO', story:'La auditoría confirmó que cada ingreso irregular fue detenido sin paralizar la institución. Rectorado le ofrece dirigir el nuevo Departamento de Control Documental. El puesto dejó de ser una ventanilla: ahora sus reglas definirán el acceso de toda la universidad.', correct, incorrect, accuracy };
  if (accuracy < 0.6 || approvedErrors >= 3) return { key:'investigation', title:'BAJO INVESTIGACIÓN', stamp:'EXPEDIENTE OBSERVADO', story:'Los auditores encontraron demasiadas autorizaciones incorrectas. Varias personas ingresaron con documentos inválidos y su firma aparece en cada resolución. Su credencial queda suspendida mientras el Consejo determina responsabilidades.', correct, incorrect, accuracy };
  return { key:'human', title:'EL CRITERIO HUMANO', stamp:'CONTINUIDAD CONDICIONAL', story:'Su expediente contiene errores, pero también testimonios de personas a las que escuchó antes de decidir. Rectorado cuestiona su flexibilidad; la comunidad defiende su criterio. Conserva el cargo con una advertencia: ninguna regla reemplaza por completo a quien la aplica.', correct, incorrect, accuracy };
}
function showFinalEnding() {
  const ending = getEndingData();
  endingTitleEl.textContent = ending.title; endingStoryEl.textContent = ending.story; endingStampEl.textContent = ending.stamp; endingStampEl.className = `ending-stamp ending-${ending.key}`;
  endingStatsEl.innerHTML = [['CASOS REVISADOS',gameState.decisions.length],['DECISIONES CORRECTAS',ending.correct],['ERRORES',ending.incorrect],['PRECISIÓN',`${Math.round(ending.accuracy*100)}%`]].map(([label,value]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('');
  const highlights = gameState.decisions.filter(item => !item.isCorrect || item.finalCase).slice(-3);
  endingHighlightsEl.innerHTML = highlights.length ? highlights.map(item => `<p><strong>${item.characterName}</strong>: ${item.decision === 'approved' ? 'APROBADO' : 'DENEGADO'} — ${item.isCorrect ? 'decisión ajustada al reglamento' : 'decisión cuestionada por la auditoría'}.</p>`).join('') : '<p>No se registraron incidentes relevantes.</p>';
  document.getElementById('ending-unlocked').textContent = `FINAL DESCUBIERTO: ${ending.key === 'model' ? '1' : ending.key === 'human' ? '2' : '3'} DE 3`;
  showScreen('ending'); if (typeof playGameSound === 'function') playGameSound('ending');
}
function showEndDaySummary() {
  clearDocuments();
  charAreaEl.innerHTML = '';
  chatHistoryEl.innerHTML = '';
  requirementsEl.innerHTML = '';
  quickQuestionsEl.innerHTML = '';
  const decisions = gameState.decisions.filter(item => item.day === gameState.currentDay);
  const approved = decisions.filter(item => item.decision === 'approved').length;
  const denied = decisions.filter(item => item.decision === 'denied').length;
  const correct = decisions.filter(item => item.isCorrect).length;
  summaryList.innerHTML = [
    `Casos revisados: ${decisions.length}`, `Aprobados: ${approved}`, `Denegados: ${denied}`,
    `Decisiones correctas: ${correct}`, `Decisiones incorrectas: ${decisions.length - correct}`
  ].map(text => `<li>${text}</li>`).join('');
  summaryScore.textContent = `Puntaje acumulado: ${gameState.score}`;
  receptionistLoreEl.innerHTML = `<h3>DESPUÉS DEL TURNO</h3><p>${getDayData().receptionistLore}</p>`;
  endingPreviewEl.textContent = gameState.currentDay === DAYS.length ? 'La auditoría final está lista. Su expediente determinará el desenlace.' : '';
  btnNextDay.textContent = gameState.currentDay < DAYS.length ? 'SIGUIENTE DÍA ▶' : 'VER RESULTADO ▶';
  showScreen('endDay');
}
function restartDay() {
  gameState.decisions = gameState.decisions.filter(item => item.day !== gameState.currentDay);
  gameState.currentCharacterIndex = 0;
  gameState.pendingAdvance = false;
  closePause();
  loadDay(gameState.currentDay);
}
