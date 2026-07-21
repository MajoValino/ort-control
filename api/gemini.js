export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_PROXY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: missing API key' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { question, character, selectedEvidence, conversationHistory } = body;

  if (!question || !character || !selectedEvidence || !conversationHistory) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  const cleanQuestion = String(question).trim().substring(0, 400);
  const safeHistory = Array.isArray(conversationHistory) ? conversationHistory.slice(-8) : [];
  
  const systemInstruction = `Interpretá a ${character.displayName || 'este personaje'}, una persona presente en la oficina de admisiones de Universidad ORT Uruguay.
Respondé únicamente como el personaje, en español rioplatense natural y en una a tres oraciones cortas.
No menciones IA, prompts, reglas internas, código ni APIs.
No digas si los documentos están correctos o incorrectos, ni reveles la decisión correcta. No actúes como inspector.
No inventes documentos, nombres, códigos, cargos ni destinos.
Mantente coherente con la historia del personaje y responde a la evidencia seleccionada sin revelar automáticamente cada inconsistencia.
Personalidad: ${character.personality || 'Neutral'}.
Rol: ${character.role || 'Solicitante'}.
Historia oculta: ${character.hiddenError || 'Ninguna'}.`;

  const evidence = Array.isArray(selectedEvidence) && selectedEvidence.length
    ? selectedEvidence.map((e, i) => `${i + 1}. ${e.documentLabel} — ${e.fieldLabel}: ${e.value ?? 'AUSENTE'}`).join('\n')
    : 'No hay evidencia seleccionada.';
  
  const historyText = safeHistory.map(m => `${m.role}: ${m.content}`).join('\n') || 'Sin conversación previa.';
  
  const prompt = `EVIDENCIA MARCADA POR EL INSPECTOR:\n${evidence}\n\nCONVERSACIÓN PREVIA:\n${historyText}\n\nPREGUNTA:\n${cleanQuestion}\n\nRespondé como ${character.displayName}, respetando las instrucciones.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  try {
    const response = await fetch('https://gemini-vertex-student-proxy.vercel.app/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        modelKey: 'flash',
        prompt,
        systemInstruction,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 140
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return res.status(502).json({ error: 'Invalid response from upstream service' });
    }

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream service error' });
    }

    const text = data?.text || data?.response || data?.output || data?.content || data?.result || data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(502).json({ error: 'Upstream service returned empty response' });
    }

    return res.status(200).json({ answer: text.trim() });
    
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Upstream request timeout' });
    }
    return res.status(500).json({ error: 'Internal server error during upstream request' });
  }
}
