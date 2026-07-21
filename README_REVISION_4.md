# ORT Control — Revisión 4

## Cambios principales
- No se reemplazó el CSS existente: todos los ajustes nuevos fueron agregados al final de `css/styles.css`.
- Integración de Gemini mediante el proxy académico (`modelKey: flash`).
- La API key se ingresa desde PAUSA > CONFIGURAR IA y se guarda únicamente en `sessionStorage`.
- Máximo de 3 consultas de IA por personaje, respuestas cortas y caché de preguntas repetidas para cuidar el saldo.
- Las preguntas básicas usan respuestas locales; la IA se usa en preguntas libres o explicaciones de evidencia.
- Los personajes no emiten veredictos sobre sus propios documentos.
- Personajes e identidades reorganizados para evitar nombres femeninos en avatares masculinos y viceversa.
- Documentos iniciales más pequeños y limitados a la mesa marrón izquierda.
- Progresión documental gradual por día.
- Lore diario en el boletín y relato del recepcionista al final de cada jornada.
- El personaje aparece recién después de pulsar ENTENDIDO.
- Cuaderno rojo interactivo con reglas acumuladas.
- Selección de hasta dos evidencias y botón COMPARAR.
- Regla explícita de coincidencia de los últimos cuatro dígitos.
- Sellos de decisión en bandeja desplegable.
- Tres finales provisionales según decisiones y porcentaje de aciertos.
- Función de producción para generar sellos defectuosos con image-to-image, desactivada durante la partida para no consumir saldo automáticamente.

## Configurar la IA
1. Abra el juego mediante un servidor local.
2. Inicie una partida y pulse Escape.
3. Pulse `CONFIGURAR IA`.
4. Pegue la API key personal.
5. La clave permanece únicamente mientras la pestaña esté abierta y no queda escrita en el proyecto.

## Uso del saldo
- `gemini-2.5-flash`.
- Máximo 3 llamadas por personaje.
- Máximo 140 tokens de salida.
- Preguntas básicas y fallback funcionan localmente.
- Las preguntas repetidas se recuperan de caché.
