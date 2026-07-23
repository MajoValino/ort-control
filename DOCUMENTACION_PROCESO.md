# Documentación del proceso — ORT Control

Obligatorio 2 · Producto digital, IA, comunicación y automatización · Diseño Interactivo

> Este documento sigue la estructura pedida en la consigna. Las secciones técnicas están completas
> a partir del código real del proyecto. Las secciones marcadas **[A COMPLETAR]** necesitan tu
> palabra en primera persona — no las inventé porque la consigna pide que el trabajo refleje tu
> propia comprensión y proceso, no una reconstrucción hecha por la IA.

## 1. Modalidad elegida

**Opción 2 — Crear un proyecto nuevo desde cero.**

ORT Control se empezó de cero para este Obligatorio 2 (no es una revisión de un proyecto anterior).
Se construyó directamente con la estructura modular actual (`data.js`, `game.js`, `documents.js`,
`ai.js`, `screens.js`, `audio.js`, `app.js`), 5 jornadas con reglas acumulativas, un personaje
recurrente con arco propio, un sistema de actas por documentación faltante, y una integración real
de IA. `README_CAMBIOS.md` y `README_REVISION_4.md` documentan las revisiones internas del propio
desarrollo de este proyecto (no de un obligatorio previo).

## 2. Problema o necesidad abordada

No partió de un problema o necesidad de mercado: nació de una motivación personal y creativa.
*Papers, Please* es uno de mis juegos favoritos, y quise reversionar esa misma dinámica —revisar
documentos, detectar inconsistencias, decidir bajo presión— pero trasladada a un contexto que
conozco de primera mano y que le agrega un ángulo de humor propio: la facultad. La "necesidad" que
cubre es más de propuesta de valor lúdica que de mercado: llevar un género que me encanta a una
ambientación con la que el público uruguayo/estudiantil se identifica al instante.

## 3. Público objetivo

Jóvenes adultos (aprox. 18–28 años) que son fans de juegos como *Papers, Please* y de simuladores
narrativos indie en general, y que además van a la facultad o pasaron por ella — el público ideal
se siente identificado con la ambientación (Rectorado, bedelía, admisiones, "el trámite que falta
un papel") porque la vivió en carne propia. Juegan principalmente en PC/navegador, en sesiones
cortas (una jornada del juego se resuelve en pocos minutos), y valoran el humor cómplice sobre la
vida universitaria más que la dificultad o la duración.

## 4. User persona

```
Nombre:        Nico Ferreira
Edad:          22 años
Ocupación:     Estudiante de facultad (tercer año), combina el estudio con un trabajo de medio
               tiempo. Vive con dos compañeros de piso y se mueve en transporte público.

Personalidad: Sociable pero con la agenda ajustada entre clases, trabajo y entregas — valora
               mucho los momentos cortos de desconexión durante el día. Perfeccionista con los
               detalles pero impaciente con la burocracia lenta o poco clara (bancos, papeleo,
               filas); prefiere resolver las cosas rápido y de forma directa. Tiene un sentido
               del humor autocrítico y sarcástico: se ríe de las situaciones cotidianas absurdas
               en vez de enojarse, y comparte esas anécdotas con amigos como forma de descargarse.

Objetivo:      una experiencia corta y divertida entre clases, que lo haga reír reconociendo
               situaciones típicas de la facultad
Frustración:   le cansan los trámites reales (que rechacen algo por un detalle mínimo, hacer cola,
               que un papel no coincida con otro) — pero le resulta divertido ese mismo absurdo
               cuando se convierte en juego
Cómo ORT Control le aporta valor:
               le da el placer de estar "del otro lado del mostrador" por primera vez, con el
               mismo humor y tensión de Papers, Please pero en un escenario que reconoce al
               instante y con un personaje recurrente que sigue jornada a jornada
```

## 5. Pain points y propuesta de valor

**Pain points del público objetivo:**
- Casi no existen juegos de este género (simulación burocrática tipo *Papers, Please*) ambientados
  en Uruguay/Latinoamérica o en español — casi todo lo disponible es en inglés y con ambientación
  distópica genérica, lejana a lo cotidiano.
- *Papers, Please* tiene más de 10 años; quienes lo aman ya lo jugaron muchas veces y buscan la
  misma mecánica con humor y referencias nuevas.
- Los trámites universitarios reales son tediosos y frustrantes; no hay una forma lúdica de
  procesarlos o reírse de ellos desde otro lugar.

**Propuesta de valor:** ORT Control toma la mecánica que hizo célebre a *Papers, Please* y la trae
a un contexto 100% reconocible para cualquier estudiante uruguayo, con humor propio, un personaje
recurrente con arco narrativo y una IA que responde en personaje durante el interrogatorio — todo
en partidas de pocos minutos, gratis y sin instalar nada.

**Diferencial frente a otras soluciones** (empezando por el propio *Papers, Please*): ambientación
universitaria uruguaya en vez de distopía ficticia, personaje recurrente (Valerys) con arco propio
a lo largo de 5 días, IA conversacional que sostiene el personaje en el interrogatorio (algo que
*Papers, Please* no tiene, al ser de 2013 y sin diálogo libre), y acceso inmediato en navegador.

## 6. Investigación o análisis de competencia

Más que "competencia" en sentido de mercado, ORT Control es una reversión declarada de *Papers,
Please* — así que la investigación fue sobre ese género (simulación de revisión documental /
"bureaucratic dystopia sim") para entender qué lugar quedaba libre:

- **Papers, Please** (Lucas Pope / 3909 LLC, 2013) — el origen directo, reconocido en los créditos
  del juego. Sella documentos comparando datos entre sí en la ficticia Arstotzka; sin diálogo libre
  con IA y sin ambientación local.
- **Not Tonight** (No More Robots, 2018) — misma mecánica de revisar identificaciones, aplicada a
  la puerta de un boliche con sátira política post-Brexit.
- **Beholder** (Warm Lamp Games / Alawar, 2016) — otro exponente del género, pero centrado en
  vigilar vecinos como conserje bajo un régimen autoritario, más de gestión que de revisión de datos.
- Numerosos clones móviles genéricos ("revisar pasaportes/IDs") sin arco narrativo ni personajes
  recurrentes, de calidad muy inferior.

Ningún referente está ambientado en un entorno universitario latinoamericano ni integra IA
conversacional para el interrogatorio — ese es el espacio que ocupa ORT Control.

## 7. Ideación inicial

La idea surgió directamente de la admiración por *Papers, Please* (ver punto 2): en vez de partir
de un problema a resolver, se partió de "quiero hacer mi propia versión de esto, en mi facultad".
De ahí en más la ideación fue de traducción de mecánicas: qué es el "pasaporte" en un contexto
universitario (documento de identidad, carta de admisión, constancia), qué es el "guardia
fronterizo" (el/la inspector/a de admisiones), y qué reemplaza a la escalada de reglas de
Arstotzka (las 5 jornadas con reglas acumulativas de ORT Control).

## 8. Bocetos, wireframes o prototipos

*(a completar por la estudiante con capturas o bocetos propios, si los tiene)*

## 9. Definición de tecnologías

- **Frontend:** HTML, CSS y JavaScript sin frameworks (vanilla), pensado para correr como página
  estática servida por Vercel.
- **Backend/IA:** función serverless de Vercel (`api/gemini.js`) que actúa de proxy seguro hacia un
  servicio intermedio (`gemini-vertex-student-proxy`), que a su vez consulta el modelo
  `gemini-2.5-flash` de Google.
- **Persistencia de estado:** en memoria (objeto `gameState` en `game.js`), sin base de datos —
  coherente con que el juego es de una sesión, sin cuentas de usuario.
- **Hosting:** Vercel (despliegue automático desde GitHub).
- **Assets:** imágenes pixel-art generadas/curadas para personajes, documentos, sellos y pantallas
  (carpeta `assets/`); tipografías `VT323` y `Share Tech Mono` vía Google Fonts para reforzar la
  estética retro-administrativa.

## 10. Decisiones de diseño

- **Progresión por jornadas con reglas acumulativas:** cada día agrega una capa de complejidad
  (Día 1: solo identidad → Día 5: todas las categorías y documentos combinados), para que el
  aprendizaje del sistema sea gradual en vez de abrumar desde el inicio.
- **Evidencia por comparación, no por "sentir":** el jugador debe seleccionar dos datos concretos
  (dos campos, o un campo y una regla) y pulsar COMPARAR; el sistema determina si hay discrepancia
  real. Esto obliga a justificar cada decisión con datos, no con intuición.
- **Acta de Documentación Faltante:** cuando una persona no presenta un documento obligatorio, no
  hay nada físico para sellar — el juego genera un acta a partir de la declaración de la persona
  (tomada de la transcripción) cruzada con la regla de identidad del reglamento, para que la
  ausencia de un documento sea, en sí misma, una pieza de evidencia manipulable.
- **Personaje recurrente (Valerys):** aparece los 5 días con un problema distinto cada vez (dato
  mal escrito, documento a nombre de otra persona, sello casero, autorización autofirmada, y un
  último día sin errores). Se decidió no señalizarla como "caso especial" en las instrucciones para
  que el jugador la trate como a cualquier otra persona y descubra el patrón jugando, no leyendo.
- **IA que no delata la respuesta correcta:** el `systemInstruction` enviado a Gemini prohíbe
  explícitamente que el personaje revele si sus documentos están bien o mal — la IA solo sostiene
  el personaje, la decisión de aprobar/denegar sigue siendo enteramente del jugador.

## 11. Desarrollo e implementación

Estructura del código (ver también `README_CAMBIOS.md`):

| Archivo | Responsabilidad |
|---|---|
| `js/data.js` | Base de datos del juego: 5 días, personajes, documentos, reglas, reacciones |
| `js/game.js` | Lógica principal: turnos, comparación de evidencia, decisiones, puntaje, finales |
| `js/documents.js` | Renderizado y arrastre de documentos, sellos, evidencia por campo |
| `js/ai.js` | Cliente del chat con IA: caché, límite de consultas, envío al endpoint |
| `api/gemini.js` | Función serverless: arma el prompt de personaje y consulta el proxy de Gemini |
| `js/screens.js` / `js/app.js` | Navegación entre pantallas y listeners de UI |
| `js/audio.js` | Música y efectos generados por navegador (sin archivos con derechos de autor) |

Parte del pulido final del proyecto se hizo con asistencia de **Claude Code** (Anthropic) trabajando
directamente sobre el repositorio: lectura del código existente, corrección de bugs de alineación
visual (documento de Permiso Especial), corrección de un bug de lógica en la comparación de
evidencia de identidad, y reescritura de las instrucciones diarias para que fueran más claras sin
revelar de antemano la trama del personaje recurrente.

## 12. Integración de inteligencia artificial

- **Servicio/modelo:** Google Gemini (`gemini-2.5-flash`), consultado a través de un proxy
  académico intermedio (`gemini-vertex-student-proxy`), nunca directamente desde el navegador.
- **Rol dentro del proyecto:** interpretar en personaje a la persona que el jugador está
  interrogando, respondiendo preguntas libres (texto escrito por el jugador) durante la inspección
  de documentos. Es una feature jugable, no una herramienta usada solo durante el desarrollo.
- **Integración técnica:**
  1. El frontend (`js/ai.js`) arma la pregunta, hasta 4 evidencias seleccionadas y hasta 8 turnos
     de historial de conversación, y hace `POST` a `/api/gemini`.
  2. La función serverless (`api/gemini.js`) arma un `systemInstruction` con el nombre, personalidad,
     rol e "historia oculta" (el error real del personaje) y un `prompt` con la evidencia marcada y
     el historial, y llama al proxy con la API key guardada en las variables de entorno de Vercel.
  3. La respuesta de texto vuelve al frontend y se agrega al chat como si el personaje hablara.
- **Datos que recibe el modelo:** la pregunta del jugador, metadatos del personaje (nombre,
  personalidad, rol, cuál es su error oculto), la evidencia que el jugador marcó, y el historial
  reciente de la conversación. **Nunca** recibe la API key del proxy externo ni datos de otros
  personajes o partidas.
- **Qué respuesta genera:** una a tres oraciones en personaje, en español rioplatense, sin revelar
  si la documentación es válida ni sugerir la decisión correcta.
- **Decisiones de diseño y curaduría:**
  - Límite de 3 consultas de IA por personaje y caché de preguntas repetidas, para cuidar el saldo
    de créditos y evitar respuestas inconsistentes ante la misma pregunta.
  - Preguntas predefinidas ("¿Cuál es su nombre?", etc.) se responden con datos locales
    (`character.responses` en `data.js`) sin gastar cuota de IA; la IA se reserva para preguntas
    libres o pedidos de explicación sobre evidencia marcada.
  - El prompt prohíbe explícitamente mencionar IA, prompts, reglas internas o inventar documentos,
    para mantener la inmersión y evitar alucinaciones que rompan la coherencia del caso.
- **Limitaciones y posibles errores:**
  - Si el proxy tarda más de 8 segundos, se corta la consulta (timeout) y el juego cae a una
    respuesta local predefinida, para que el jugador nunca se quede bloqueado esperando.
  - El modelo puede, en preguntas muy abiertas, responder de forma genérica o repetir frases; el
    límite de 140 tokens de salida y la temperatura baja (0.6) buscan mitigar esto.
  - Como toda IA generativa, no hay garantía absoluta de que nunca revele información sensible; por
    eso las preguntas críticas del gameplay (qué documentos exige cada día, cuál es la decisión
    correcta) están resueltas por lógica determinística en `game.js`, no por el modelo.

## 13. Estrategia de comunicación

- **Tono:** humor cómplice y nostálgico dirigido a quien cursa o cursó la facultad — sin golpe bajo,
  apoyado en la estética retro-pixel/institucional que el juego ya tiene (tipografía `VT323`, sellos,
  papeles color crema, jerga de Rectorado/bedelía).
- **Naming:** ya resuelto — "ORT Control" juega con la sigla de la universidad y el rol de
  inspección/control del jugador, sin necesidad de un nombre adicional.
- **Concepto/tagline sugerido:** *"Del otro lado del mostrador."* — invierte el rol habitual del
  estudiante (quien sufre el trámite) al de quien lo controla.
- **Storytelling:** se apoya en el lore ya existente en el juego (boletines diarios, lore del
  recepcionista, el arco de Valerys) como material de campaña en sí mismo — cada jornada puede
  funcionar como una pieza corta independiente para redes.
- **Canales sugeridos:** Instagram/TikTok con clips cortos mostrando el "gotcha" de descubrir un
  error o una decisión absurda; grupos/redes de estudiantes; itch.io para llegar a la comunidad
  indie que ya sigue juegos inspirados en *Papers, Please*.

## 14. Piezas de comunicación generadas

Tres piezas para Instagram, en `docs/comunicacion/`, construidas reutilizando los assets reales del
juego (sello institucional, sellos de aprobado/denegado, retratos de personajes, tipografías `VT323`
y `Share Tech Mono`) para que se sientan parte del mismo universo visual:

- **`post-1-lanzamiento.html`** (1080×1350, feed) — anuncio del juego: sello institucional a modo de
  membrete, título "ORT CONTROL" como sello de goma, tagline "Del otro lado del mostrador.", una
  fila de personajes como si hicieran cola, y CTA "Jugá gratis → link en bio".
- **`post-2-mecanica.html`** (1080×1350, feed) — explica la mecánica central mostrando un campo de
  documento que no coincide con lo declarado ("¿COINCIDE O NO?"), con los sellos de aprobado/denegado
  como cierre.
- **`historia-cta.html`** (1080×1920, story) — pieza vertical de llamado a la acción con el sello
  institucional en grande, headline "Tu turno de controlar" y CTA "Deslizá para jugar".

Para exportarlas como imagen: abrir el archivo `.html` correspondiente en el navegador (doble clic,
o servirlas con un servidor local), ajustar el zoom/ventana al tamaño indicado, y capturar pantalla
o imprimir a PDF/PNG.

## 15. Automatizaciones implementadas

**[PENDIENTE / OPCIONAL]** — No se implementó automatización de marketing (formularios, Google
Sheets, n8n). Es un punto opcional de la consigna que suma si se agrega, pero no es obligatorio.

## 16. Prompts principales utilizados

**Para el personaje dentro del juego** (prompt de sistema real, `api/gemini.js`):

> "Interpretá a {nombre del personaje}, una persona presente en la oficina de admisiones de
> Universidad ORT Uruguay. Respondé únicamente como el personaje, en español rioplatense natural y
> en una a tres oraciones cortas. No menciones IA, prompts, reglas internas, código ni APIs. No
> digas si los documentos están correctos o incorrectos, ni reveles la decisión correcta..."

**Para el desarrollo asistido por IA** (prompts dados a Claude Code durante esta etapa, resumidos):
- "Hacé las instrucciones más intuitivas... cómo hacer cuando el personaje no trajo los papeles y
  la dinámica de Valerys no se comprende muy bien."
- "¿Cómo se sabe que los datos del documento de identidad son válidos [el primer día]?"
- "Sacá las líneas que revelan el error de Valerys de antemano — la idea es descubrirlo jugando, sin
  spoilear lo que pasa en los días siguientes."
- "Hay que corregir el Permiso Especial porque está toda la información puesta mal."

## 17. Aprendizajes, dificultades y decisiones tomadas

**[A COMPLETAR]** — Algunos hallazgos técnicos concretos de esta etapa que podés retomar y ampliar
con tu propia reflexión:
- Un bug de alineación visual (el documento de Permiso Especial) resultó no ser solo estético: se
  debía a coordenadas CSS que no coincidían con la imagen de fondo real, medidas después pixel por
  pixel para corregirlo con precisión.
- Un bug de lógica (`compareEvidence` en `game.js`) hacía que comparar el dato erróneo de un
  personaje contra la regla de "IDENTIDAD" del reglamento devolviera un falso "no contradice" —
  justo el camino más intuitivo para el jugador. Corregirlo mejoró tanto la jugabilidad como la
  confianza en el sistema de evidencia.
- Reflexión personal: **[completar — qué te costó más, qué decisión te generó más dudas, qué
  cambiarías si arrancaras de nuevo]**.

## 18. Consideraciones de API Keys y seguridad

La API key del proxy de Gemini vive únicamente como variable de entorno en Vercel
(`GEMINI_PROXY_API_KEY`, ver `.env.example`) y se lee del lado del servidor en `api/gemini.js`
(`process.env.GEMINI_PROXY_API_KEY`). Nunca se expone en el frontend, en el repositorio ni en
`sessionStorage` del navegador — el frontend solo llama a `/api/gemini`, que actúa de intermediario.
Para desarrollo local se usa un archivo `.env.local` (excluido por `.gitignore`) con la misma
variable.

## 19. Entrega

- **Código fuente:** este repositorio (`https://github.com/MajoValino/ort-control`).
- **Enlace desplegado:** **[A COMPLETAR — confirmar URL de Vercel]**.
- **Instrucciones de instalación y ejecución:** ver `README_REVISION_4.md`, sección "Configurar la IA".
- **Datos de ejemplo:** los 5 días y ~24 personajes están precargados en `js/data.js`, no requiere
  credenciales de prueba para jugar sin IA (cae a respuestas locales automáticamente).
