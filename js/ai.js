'use strict';

const AI_CONFIG = {
  endpoint: '/api/gemini',
  maxCallsPerCharacter: 3
};

const aiUsageState = {
  totalCalls: 0,
  callsByCharacter: new Map(),
  responseCache: new Map()
};

function normalizeQuestion(question) {
  return String(question || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/*
 * La API key ahora está protegida en Vercel.
 * Estas funciones se mantienen para no romper código antiguo.
 */
function hasAIKey() {
  return true;
}

function getStoredAIKey() {
  return '';
}

function saveAIKey() {
  console.warn(
    '[AI] La API key se configura en Vercel, no en el navegador.'
  );

  return false;
}

function clearAIKey() {
  console.warn(
    '[AI] No hay ninguna API key guardada en el navegador.'
  );
}

function configureAIKey() {
  window.alert(
    'La IA se configura de forma segura desde Vercel. ' +
    'No es necesario pegar una clave dentro del juego.'
  );

  return true;
}

function getCharacterId(character) {
  return (
    character?.id ||
    character?.displayName ||
    'unknown-character'
  );
}

function buildCacheKey(character, question, selectedEvidence) {
  const characterId = getCharacterId(character);

  const evidenceKey = selectedEvidence
    .map((evidence) => {
      const documentType =
        evidence.documentType ||
        evidence.documentLabel ||
        evidence.document ||
        '';

      const field =
        evidence.field ||
        evidence.fieldLabel ||
        '';

      const value = evidence.value ?? 'AUSENTE';

      return `${documentType}:${field}:${value}`;
    })
    .join('|');

  return [
    characterId,
    normalizeQuestion(question),
    evidenceKey
  ].join('|');
}

async function askCharacterAI({
  question,
  character,
  selectedEvidence = [],
  conversationHistory = []
}) {
  const cleanQuestion = String(question || '').trim();

  if (!cleanQuestion) {
    throw new Error('La pregunta está vacía.');
  }

  if (!character) {
    throw new Error('No hay un personaje activo.');
  }

  const characterId = getCharacterId(character);

  const usedCalls =
    aiUsageState.callsByCharacter.get(characterId) || 0;

  if (usedCalls >= AI_CONFIG.maxCallsPerCharacter) {
    throw new Error(
      'Límite de consultas de IA alcanzado para este personaje.'
    );
  }

  const safeEvidence = Array.isArray(selectedEvidence)
    ? selectedEvidence.slice(0, 4)
    : [];

  const safeHistory = Array.isArray(conversationHistory)
    ? conversationHistory.slice(-8)
    : [];

  const cacheKey = buildCacheKey(
    character,
    cleanQuestion,
    safeEvidence
  );

  if (aiUsageState.responseCache.has(cacheKey)) {
    return aiUsageState.responseCache.get(cacheKey);
  }

  const response = await fetch(AI_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: cleanQuestion,
      character: {
        id: character.id,
        displayName: character.displayName,
        personality: character.personality,
        role: character.role,
        hiddenError: character.hiddenError
      },
      selectedEvidence: safeEvidence,
      conversationHistory: safeHistory
    })
  });

  const rawResponse = await response.text();

  let data;

  try {
    data = JSON.parse(rawResponse);
  } catch {
    throw new Error(
      'El servidor devolvió una respuesta inválida.'
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      `Error HTTP ${response.status}`
    );
  }

  const answer = data?.answer;

  if (typeof answer !== 'string' || !answer.trim()) {
    console.error(
      '[AI] Respuesta del servidor sin texto:',
      data
    );

    throw new Error(
      'La respuesta de la IA no contiene texto.'
    );
  }

  const finalAnswer = answer.trim();

  aiUsageState.callsByCharacter.set(
    characterId,
    usedCalls + 1
  );

  aiUsageState.totalCalls += 1;
  aiUsageState.responseCache.set(
    cacheKey,
    finalAnswer
  );

  return finalAnswer;
}

function resetAIUsageForCharacter(characterId) {
  if (!characterId) {
    return;
  }

  aiUsageState.callsByCharacter.delete(characterId);

  for (const cacheKey of aiUsageState.responseCache.keys()) {
    if (cacheKey.startsWith(`${characterId}|`)) {
      aiUsageState.responseCache.delete(cacheKey);
    }
  }
}

function getAIUsage() {
  return {
    totalCalls: aiUsageState.totalCalls,
    callsByCharacter: new Map(
      aiUsageState.callsByCharacter
    )
  };
}

/*
 * La generación de sellos necesita una función privada separada.
 * Por ahora se mantiene desactivada para no gastar saldo durante
 * las partidas ni exponer la API key.
 */
async function generateInvalidStampVariant() {
  throw new Error(
    'La generación de sellos todavía no está habilitada.'
  );
}