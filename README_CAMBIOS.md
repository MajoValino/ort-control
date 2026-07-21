# ORT Control — cambios de esta versión

## Cambios funcionales

- Los días 1, 2 y 3 usan doce personajes diferentes, sin repetir retratos ni identidades.
- Cada personaje conserva un único objeto con nombre, imagen, rol, documentos, respuestas y decisión correcta.
- Los documentos aparecen inicialmente sobre la mesa derecha.
- Cada dato dinámico de un documento puede seleccionarse con clic para marcarlo como sospechoso.
- Al hacer una pregunta con un dato marcado, el personaje responde de acuerdo con ese campo cuando existe una inconsistencia preparada.
- Los errores por ausencia de sello también se pueden seleccionar mediante el área punteada de sello.
- Una decisión incorrecta genera inmediatamente una citación de “ERROR DE INSPECCIÓN” antes de avanzar al siguiente personaje.
- Al comenzar cada día se muestra una ventana de instrucciones claras.
- La pantalla de fin de jornada es autónoma, con fondo negro, y no reutiliza el boletín.
- Se preparó `js/ai.js` para la futura integración con el proxy académico de Gemini, pero permanece desactivado hasta confirmar el endpoint y formato exactos de su documentación.

## CSS

No se eliminó ni reescribió ninguna regla CSS existente. Las nuevas reglas se agregaron al final de `css/styles.css` como overrides y extensiones.

## Integración de IA pendiente

El proxy informado es:

`https://gemini-vertext-student-proxy.vercel.app`

La API key personal no debe escribirse en el repositorio. `js/ai.js` la buscará en `sessionStorage` cuando se active la integración.


## Revisión 3
- Documentos depositados inicialmente sobre la mesa izquierda.
- Documento de identidad obligatorio y caso controlado sin identidad.
- Checklist de documentación requerida/entregada.
- Constancia de inscripción con campos y sello recalibrados.
- Códigos cruzados en identidad, carta, certificado, constancia, pase, orden y permiso.
- Preguntas rápidas predefinidas además del campo libre.
