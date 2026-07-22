'use strict';

const gameContEl = document.getElementById('game-container');
const layerEl = document.getElementById('document-layer');
let docZIndex = 30;
let selectedDocument = null;
let selectedEvidence = [];

function localPointer(event) {
  const rect = gameContEl.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (1600 / rect.width),
    y: (event.clientY - rect.top) * (900 / rect.height)
  };
}
function getSelectedDocument() { return selectedDocument; }
function getSelectedEvidence() { return [...selectedEvidence]; }
function getSelectedIssue() { return selectedEvidence.find(item => item.source === 'document') || null; }
function clearSelectedEvidence() {
  document.querySelectorAll('.selected-error-field,.selected-rule-evidence').forEach(node => node.classList.remove('selected-error-field', 'selected-rule-evidence'));
  selectedEvidence = [];
  if (typeof updateEvidencePanel === 'function') updateEvidencePanel();
}
function removeEvidenceForElement(element) {
  selectedEvidence = selectedEvidence.filter(item => item.element !== element);
  element.classList.remove('selected-error-field', 'selected-rule-evidence');
}
function addEvidence(item) {
  const existing = selectedEvidence.find(e => e.element === item.element);
  if (existing) {
    removeEvidenceForElement(item.element);
  } else {
    if (selectedEvidence.length >= 2) {
      const removed = selectedEvidence.shift();
      removed.element?.classList.remove('selected-error-field', 'selected-rule-evidence');
    }
    selectedEvidence.push(item);
    item.element.classList.add(item.source === 'rule' ? 'selected-rule-evidence' : 'selected-error-field');
  }
  if (typeof updateEvidencePanel === 'function') updateEvidencePanel();
  if (typeof refreshQuickQuestions === 'function') refreshQuickQuestions();
}

function renderDocument(type, data, uid, index) {
  const config = DOCUMENT_TYPES[type];
  if (!config) return null;
  const wrapper = document.createElement('div');
  wrapper.className = 'doc-wrapper in-tray';
  wrapper.id = `doc-${uid}`;
  wrapper.dataset.type = type;
  wrapper.dataset.state = 'tray';
  wrapper.style.zIndex = ++docZIndex;

  /* Cuatro ranuras pequeñas dentro de la mesa marrón izquierda. */
  const traySlots = [
    { x: 20, y: 690 }, { x: 132, y: 690 }, { x: 244, y: 690 }, { x: 356, y: 690 }
  ];
  const slot = traySlots[index % traySlots.length];
  wrapper.style.left = `${slot.x}px`;
  wrapper.style.top = `${slot.y}px`;
  wrapper.dataset.initialLeft = String(slot.x);
  wrapper.dataset.initialTop = String(slot.y);

  const card = document.createElement('div');
  card.className = `document-card ${config.cssClass}`;
  if (config.image) {
    const bg = document.createElement('img');
    bg.className = 'document-background';
    bg.src = config.image;
    bg.alt = config.label;
    bg.draggable = false;
    card.appendChild(bg);
  } else {
    card.classList.add('generated-document');
  }

  for (const field of config.fields) {
    const value = data[field];
    if (value === undefined || value === null || value === '') continue;
    const node = field === 'photo' ? document.createElement('img') : document.createElement('div');
    if (field === 'photo') {
      node.src = value;
      node.alt = 'Fotografía';
      node.draggable = false;
    } else {
      node.textContent = value;
    }
    node.className = `doc-field field-${field}`;
    node.dataset.field = field;
    node.dataset.documentType = type;
    node.title = 'Clic para marcar como evidencia';
    node.addEventListener('click', event => {
      event.stopPropagation();
      selectDocument(wrapper);
      const issue = (data.issues || []).find(i => i.field === field);
      addEvidence({
        source: 'document', element: node, documentElement: wrapper,
        documentType: type, documentLabel: config.label,
        field, fieldLabel: FIELD_LABELS[field] || field,
        value: field === 'photo' ? 'Fotografía del titular' : String(value), isActualError: Boolean(issue), issueMessage: issue?.message || ''
      });
    });
    card.appendChild(node);
  }
  renderInstitutionalStamps(card, type, data.stamps || [], data.issues || [], wrapper);
  wrapper.appendChild(card);
  layerEl.appendChild(wrapper);
  setupDocumentInteractions(wrapper);
  return wrapper;
}

function renderInstitutionalStamps(card, type, stamps, issues, wrapper) {
  stamps.forEach((stamp, index) => {
    if (!stamp.valid || !STAMP_ASSETS[stamp.type]) return;
    const img = document.createElement('img');
    img.className = `institutional-stamp institutional-stamp-${index} stamp-${stamp.type}`;
    img.src = STAMP_ASSETS[stamp.type];
    img.alt = `Sello ${stamp.type}`;
    img.draggable = false;
    img.title = 'Clic para marcar este sello';
    img.addEventListener('click', event => {
      event.stopPropagation();
      selectDocument(wrapper);
      addEvidence({
        source: 'document', element: img, documentElement: wrapper,
        documentType: type, documentLabel: DOCUMENT_LABELS[type],
        field: 'stamp', fieldLabel: 'Sello institucional', value: stamp.type,
        isActualError: false, issueMessage: ''
      });
    });
    card.appendChild(img);
  });
  const missing = issues.find(issue => issue.field === 'stamp');
  if (missing) {
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'stamp-error-marker';
    marker.textContent = '';
    marker.title = 'Clic para marcar el área vacía';
    marker.addEventListener('click', event => {
      event.stopPropagation();
      selectDocument(wrapper);
      addEvidence({
        source: 'document', element: marker, documentElement: wrapper,
        documentType: type, documentLabel: DOCUMENT_LABELS[type],
        field: 'stamp', fieldLabel: 'Sello institucional', value: 'AUSENTE',
        isActualError: true, issueMessage: missing.message
      });
    });
    card.appendChild(marker);
  }
}

function selectDocument(element) {
  selectedDocument?.classList.remove('selected-document');
  selectedDocument = element;
  if (element) {
    element.classList.add('selected-document');
    element.style.zIndex = ++docZIndex;
  }
}

function setupDocumentInteractions(element) {
  let dragging = false;
  let pointerId = null;
  let offsetX = 0;
  let offsetY = 0;
  element.addEventListener('click', event => { event.stopPropagation(); selectDocument(element); });
  element.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('.doc-field,.stamp-error-marker,.institutional-stamp')) return;
    event.preventDefault();
    event.stopPropagation();
    selectDocument(element);
    const point = localPointer(event);
    offsetX = point.x - (parseFloat(element.style.left) || 0);
    offsetY = point.y - (parseFloat(element.style.top) || 0);
    dragging = true;
    pointerId = event.pointerId;
    element.setPointerCapture(pointerId);
    element.classList.add('dragging');
  });
  element.addEventListener('pointermove', event => {
    if (!dragging || event.pointerId !== pointerId) return;
    const point = localPointer(event);
    const scale = element.dataset.state === 'inspection' ? 0.78 : 0.18;
    const width = 480 * scale;
    const height = 620 * scale;
    const x = Math.max(0, Math.min(1600 - width, point.x - offsetX));
    const y = Math.max(292, Math.min(900 - height, point.y - offsetY));
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
  const finish = event => {
    if (!dragging) return;
    dragging = false;
    element.classList.remove('dragging');
    try { element.releasePointerCapture(pointerId); } catch (_) {}
    pointerId = null;
    const left = parseFloat(element.style.left) || 0;
    const top = parseFloat(element.style.top) || 0;
    const currentScale = element.dataset.state === 'inspection' ? 0.78 : 0.18;
    const centerX = left + (480 * currentScale / 2);
    if (centerX >= 520) {
      element.classList.remove('in-tray');
      element.classList.add('in-inspection');
      element.dataset.state = 'inspection';
      element.style.left = `${Math.max(530, Math.min(1200, left))}px`;
      element.style.top = `${Math.max(305, Math.min(470, top))}px`;
    } else {
      returnToTray(element);
    }
  };
  element.addEventListener('pointerup', finish);
  element.addEventListener('pointercancel', finish);
  element.addEventListener('dblclick', event => {
    if (event.target.closest('.doc-field,.stamp-error-marker,.institutional-stamp')) return;
    event.preventDefault();
    returnToTray(element);
  });
}

function returnToTray(element) {
  element.classList.remove('in-inspection', 'selected-document');
  element.classList.add('in-tray');
  element.dataset.state = 'tray';
  element.style.left = `${element.dataset.initialLeft}px`;
  element.style.top = `${element.dataset.initialTop}px`;
  if (selectedDocument === element) selectedDocument = null;
}
function applyDecisionStamp(element, decision, dateText) {
  if (!element) return false;
  const card = element.querySelector('.document-card');
  if (!card) return false;
  card.querySelector('.decision-stamp-overlay')?.remove();
  const wrap = document.createElement('div');
  wrap.className = `decision-stamp-overlay decision-${decision}`;
  const img = document.createElement('img');
  img.src = STAMP_ASSETS[decision];
  img.alt = decision === 'approved' ? 'Aprobado' : 'Denegado';
  img.draggable = false;
  const date = document.createElement('span');
  date.textContent = dateText;
  wrap.append(img, date);
  card.appendChild(wrap);
  return true;
}
function clearDocuments() {
  layerEl.innerHTML = '';
  selectedDocument = null;
  selectedEvidence = [];
  docZIndex = 30;
  if (typeof updateEvidencePanel === 'function') updateEvidencePanel();
}
