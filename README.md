# ORT Control

Un simulador de admisiones universitarias inspirado en *Papers, Please*: revisá documentos, comparé
datos contra el reglamento y decidí quién entra, jornada a jornada.

Proyecto de Diseño Interactivo — Universidad ORT Uruguay.

**Jugar:** [ort-control.vercel.app](https://ort-control.vercel.app/)

## Cómo correrlo localmente

1. Cloná el repositorio.
2. Serví la carpeta con cualquier servidor estático (por ejemplo `npx serve .`), ya que el juego usa
   módulos y fetch relativos que no funcionan abriendo `index.html` directo con `file://`.
3. Abrí la URL local en el navegador.

No hace falta configurar nada para jugar: si no hay conexión con la IA, el juego cae automáticamente
a respuestas locales predefinidas.

## Estructura del proyecto

| Archivo | Responsabilidad |
|---|---|
| `js/data.js` | Base de datos del juego: 5 días, personajes, documentos, reglas |
| `js/game.js` | Lógica principal: turnos, comparación de evidencia, decisiones, finales |
| `js/documents.js` | Renderizado y arrastre de documentos, sellos, evidencia por campo |
| `js/ai.js` | Cliente del chat con IA: caché, límite de consultas, envío al endpoint |
| `api/gemini.js` | Función serverless: arma el prompt de personaje y consulta el proxy de Gemini |
| `js/screens.js` / `js/app.js` | Navegación entre pantallas y listeners de UI |
| `js/audio.js` | Música y efectos generados por navegador |
| `css/styles.css` | Estilos del juego (revisiones sucesivas agregadas al final del archivo) |

## Integración de IA

Los personajes responden preguntas libres del jugador usando **Google Gemini** (`gemini-2.5-flash`),
consultado a través de un proxy académico. La API key vive únicamente como variable de entorno en
Vercel (`GEMINI_PROXY_API_KEY`, ver `.env.example`) y se lee del lado del servidor en
`api/gemini.js` — nunca se expone en el frontend ni en el repositorio.

- Máximo 3 consultas de IA por personaje, con caché de preguntas repetidas.
- Las preguntas rápidas predefinidas se responden con datos locales, sin gastar cuota de IA.
- Los personajes nunca revelan si su documentación es válida ni sugieren la decisión correcta.
- Si el proxy no responde en 8 segundos, el juego cae a una respuesta local para no bloquear al jugador.

Para desarrollo local con IA activa, creá un archivo `.env.local` (excluido por `.gitignore`) con la
misma variable que `.env.example`.

## Créditos

Inspirado en la lógica de *Papers, Please* (Lucas Pope, 3909 LLC).

## Historial de revisiones

- **Revisión 3:** documento de identidad obligatorio, checklist de documentación, códigos cruzados
  entre documentos, preguntas rápidas predefinidas.
- **Revisión 4:** integración de Gemini vía proxy académico, límite de consultas de IA y caché,
  progresión documental gradual, cuaderno de reglas interactivo, comparación de evidencia con botón
  COMPARAR, tres finales según desempeño.
- **Revisión 5 (actual):** cinco jornadas con reglas acumulativas, personaje recurrente con arco
  propio a lo largo de los cinco días, actas de documentación faltante, corrección de bugs de
  comparación de evidencia y de alineación visual de documentos, instrucciones diarias reescritas.
