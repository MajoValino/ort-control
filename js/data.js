'use strict';

const DAYS = [
  {
    day: 1,
    date: '18/07/2026',
    lore: 'Tras varios ingresos irregulares, Rectorado limita el acceso de hoy a estudiantes y docentes. Toda persona deberá acreditar su identidad antes de pasar.',
    newRule: ['1. Solo pueden ingresar ESTUDIANTES y DOCENTES.', '2. Toda persona debe presentar documento de identidad.'],
    observations: [
      'Revise primero la categoría de la persona.',
      'Exija documento de identidad en todos los casos.'
    ],
    reminder: [
      'Cualquier otro documento no es requerido hoy.',
      'Seleccione dos datos o una regla y un dato para compararlos.'
    ],
    introducedDocuments: ['identity'],
    allowedRoles: ['estudiante', 'docente'],
    instructionSteps: [
      'Quiénes pueden ingresar: Solo estudiantes y docentes.',
      'Documentos: Estudiantes y docentes solo necesitan su documento de identidad.',
      'Campos a comparar: Asegúrese de que los datos personales coincidan.',
      '¿Cómo se sabe si el documento es válido? Verifique que esté presente y que el nombre que la persona declara (pregúntele) coincida con el nombre impreso. Si no encuentra ninguna contradicción, corresponde APROBAR.',
      'Sellos obligatorios: No se requieren sellos adicionales hoy.',
      'Cómo seleccionar evidencia: Haga clic en un dato del documento y luego en otro para compararlos.',
      'Cuaderno de reglas: Abra el cuaderno rojo inferior para revisar reglas y usarlas como evidencia.',
      '¿Y si NO trajo el documento? Mire el panel "DOCUMENTACIÓN": un "!" en rojo indica lo que falta. Paso a paso: 1) Pregúntele con la pregunta rápida "¿Dónde está su documento de identidad?". 2) Abra la TRANSCRIPCIÓN (papel blanco) y haga clic en su respuesta para tomarla como evidencia. 3) Abra el CUADERNO y haga clic en la regla de identidad correspondiente. 4) Pulse COMPARAR: esto genera un "Acta de Documentación Faltante". 5) Arrastre esa acta a la mesa de inspección, selecciónela y aplíquele el sello DENEGADO.',
      'Sellar: Abra la bandeja de sellos abajo a la derecha y aplique APROBADO o DENEGADO.'
    ],
    receptionistLore: 'Primer día en Admisiones. El flujo fue tranquilo, pero Rectorado dejó claro que cada omisión quedará registrada en su legajo.',
    characterIds: ['student-01', 'student-03', 'teacher-01', 'student-04', 'valerys-01']
  },
  {
    day: 2,
    date: '19/07/2026',
    lore: 'Una constancia falsa circuló por los grupos estudiantiles. Rectorado ahora distingue aspirantes nuevos de estudiantes regulares.',
    newRule: ['Reglas del Día 1 activas. Aspirante nuevo: identidad y carta de admisión. Estudiante regular: identidad, constancia y certificado de estudios. Docente: solo identidad.'],
    observations: [
      'El código puede tener prefijos distintos, pero debe terminar igual.',
      'Compruebe carrera y período académico.',
      'Revise el sello de la facultad o de Admisiones.'
    ],
    reminder: [
      'Un estudiante regular con identidad y constancia pero sin certificado debe ser denegado.',
      'Solo exija los documentos indicados por el caso y las reglas del día.'
    ],
    introducedDocuments: ['studyCertificate', 'enrollment'],
    allowedRoles: ['estudiante', 'docente'],
    instructionSteps: [
      'Aplique todas las reglas del Día 1.',
      'Identifique si es aspirante nuevo o estudiante regular.',
      'Aspirante nuevo requiere carta de admisión.',
      'Estudiante regular requiere constancia de inscripción y certificado de estudios.',
      'Los códigos ORT-, ADM-, ACA- e INS- deben compartir los mismos 4 dígitos finales.',
      'Use el cuaderno para comparar evidencias antes de decidir.',
      'Recordatorio — documento faltante: si falta un documento entero (no solo un dato mal), repita el procedimiento del Día 1: pregunte, use la transcripción y el reglamento, genere el Acta, séllela.'
    ],
    receptionistLore: 'El rumor sobre documentos alterados aumentó la tensión. Algunos aspirantes culpan al sistema; otros parecen conocer demasiado bien sus fallas.',
    characterIds: ['student-02', 'student-05', 'student-06', 'student-09', 'valerys-02']
  },
  {
    day: 3,
    date: '20/07/2026',
    lore: 'Un proveedor accedió ayer a un área restringida con un pase equivocado. Seguridad delega en Admisiones la revisión de visitantes y servicios externos.',
    newRule: ['Ingresan VISITANTES autorizados con Identidad y Pase.', 'Ingresan PROVEEDORES con Identidad y Orden de Servicio.', 'El área, la fecha, el motivo y los 4 dígitos deben coincidir.'],
    observations: [
      'Visitante: Pase de visitante.',
      'Proveedor: Orden de servicio.',
      'Controle área autorizada, fecha y sello de Administración.'
    ],
    reminder: [
      'Un pase no reemplaza una orden de servicio.',
      'Los documentos de días anteriores siguen siendo válidos solo para sus categorías.'
    ],
    introducedDocuments: ['visitorPass', 'serviceOrder'],
    allowedRoles: ['visitante', 'proveedor'],
    instructionSteps: [
      'Identifique si se trata de visitante o proveedor.',
      'Exija identidad y el permiso exacto para su categoría.',
      'Compare área, motivo, fecha y los últimos 4 dígitos.',
      'Verifique el sello de Administración.',
      'Use la evidencia y el cuaderno antes de sellar.',
      'Recordatorio — documento faltante: mismo procedimiento que el Día 1 (preguntar, transcripción, cuaderno, comparar, Acta).'
    ],
    receptionistLore: 'La oficina ya no parece una simple recepción. Sus decisiones empezaron a afectar a estudiantes, docentes y personal externo, y Dirección observa sus resultados.',
    characterIds: ['visitor-01', 'visitor-02', 'provider-01', 'provider-02', 'valerys-03']
  },
  {
    day: 4,
    date: '21/07/2026',
    lore: 'Auditoría encontró permisos especiales copiados. Desde hoy, toda excepción debe incluir identidad, permiso vigente y sello institucional auténtico.',
    newRule: ['Toda excepción requiere Identidad y Permiso especial.', 'Compare autoridad, fecha, código y sello con los modelos del reglamento.'],
    observations: ['El permiso especial usa código AUT-.', 'El sello válido es Institucional.', 'Los cuatro dígitos deben coincidir con la identidad.'],
    reminder: ['Un espacio vacío no equivale a un sello válido.', 'Seleccione el sello o el campo sospechoso y compárelo con la regla.'],
    introducedDocuments: ['specialPermit'],
    allowedRoles: ['estudiante', 'docente', 'administrativo', 'visitante'],
    instructionSteps: ['Revise las reglas acumuladas en el cuaderno.', 'Toda excepción exige identidad y permiso especial.', 'Compare nombre, fecha, autoridad y cuatro dígitos.', 'Verifique visualmente el sello Institucional válido.', 'Los permisos sin sello o con autoridad incorrecta deben denegarse.', 'Recordatorio — documento faltante: mismo procedimiento que el Día 1 (preguntar, transcripción, cuaderno, comparar, Acta).'],
    receptionistLore: 'Los permisos falsos no parecían obra de estudiantes improvisados. Alguien conocía los formularios internos y Dirección comenzó a revisar cada decisión de la oficina.',
    characterIds: ['admin-01', 'visitor-03', 'student-07', 'teacher-02', 'valerys-04']
  },
  {
    day: 5,
    date: '22/07/2026',
    lore: 'Rectorado inicia la auditoría final. Todas las categorías quedan habilitadas, pero cada documento y cada conversación serán incorporados a su expediente laboral.',
    newRule: ['AUDITORÍA FINAL: se mantienen todas las reglas.', 'Estudiantes, docentes, visitantes, proveedores y excepciones deben presentar la documentación exacta de su categoría.'],
    observations: ['Revise identidad, categoría, fechas, códigos y sellos.', 'No acepte permisos de una categoría para otra.', 'Sus decisiones de hoy definirán el informe final.'],
    reminder: ['Consulte el cuaderno antes de decidir.', 'Una decisión humana también deja consecuencias.'],
    introducedDocuments: [],
    allowedRoles: ['estudiante', 'docente', 'visitante', 'proveedor', 'administrativo'],
    instructionSteps: ['Aplique todas las reglas de los días anteriores.', 'Identifique primero la categoría de cada persona.', 'Exija los documentos exactos indicados en el cuaderno.', 'Compare los cuatro dígitos, fechas, áreas y sellos.', 'La auditoría evaluará precisión, seguridad y criterio.', 'Recordatorio — documento faltante: mismo procedimiento de siempre (preguntar, transcripción, cuaderno, comparar, Acta).'],
    receptionistLore: 'La oficina quedó en silencio cuando llegó el último expediente. Ya no se evaluaban únicamente documentos: también se evaluaba la forma en que usted había usado el poder del puesto.',
    characterIds: ['student-10', 'visitor-04', 'provider-03', 'admin-02', 'valerys-05']
  }
];

function reactions() {
  return {
    approvedCorrect: ['Gracias. Que tenga buen día.', 'Perfecto, muchas gracias.', 'Bien, continuaré con el trámite.'],
    deniedCorrect: ['Entiendo. Volveré con la documentación correcta.', 'De acuerdo, voy a solucionar el problema.', 'Comprendo. Regresaré cuando esté corregido.'],
    approvedWrong: ['¿Seguro? Creí que habría un problema.', 'Ah... bien. Gracias.', 'Pensé que iba a pedirme una corrección.'],
    deniedWrong: ['Pero mis documentos están en regla.', '¿Puede revisarlo nuevamente?', 'No entiendo el motivo del rechazo.']
  };
}

function identity(firstName, lastName, number, origin, recordId, photo) {
  return {
    name: firstName.toUpperCase(), surname: lastName.toUpperCase(), documentNumber: number,
    origin: origin.toUpperCase(), securityCode: `ORT-${recordId}`, photo, stamps: [], issues: []
  };
}
function admission(fullName, career, faculty, date, recordId, valid = true) {
  return {
    applicantName: fullName.toUpperCase(), career: career.toUpperCase(), faculty: faculty.toUpperCase(),
    fileNumber: `ADM-2026-${recordId}`, issueDate: date, signature: 'ADMISIONES',
    stamps: valid ? [{ type: 'admissions', valid: true }] : [],
    issues: valid ? [] : [{ field: 'stamp', message: 'Falta el sello obligatorio de Admisiones.' }]
  };
}
function certificate(fullName, institution, status, date, recordId, valid = true) {
  return {
    applicantName: fullName.toUpperCase(), originInstitution: institution.toUpperCase(),
    academicStatus: status.toUpperCase(), certificateCode: `ACA-${recordId}-26`, issueDate: date,
    signature: 'SECRETARÍA ACADÉMICA', stamps: valid ? [{ type: 'faculty', valid: true }] : [],
    issues: valid ? [] : [{ field: 'stamp', message: 'Falta el sello de Facultad.' }]
  };
}
function enrollment(fullName, career, semester, date, recordId, valid = true) {
  return {
    name: fullName.toUpperCase(), studentNumber: `EST-${recordId}`, career: career.toUpperCase(), semester: semester.toUpperCase(),
    category: 'REGULAR', issueDate: date, code: `INS-26-${recordId}`,
    stamps: valid ? [{ type: 'admissions', valid: true }] : [], issues: []
  };
}

function specialPermit(fullName, exceptionType, date, authority, observations, recordId, valid = true) {
  return {
    name: fullName.toUpperCase(), exceptionType: exceptionType.toUpperCase(), date,
    authorizingAuthority: authority.toUpperCase(), observations: observations.toUpperCase(),
    authorizationCode: `AUT-${recordId}`, signature: authority.toUpperCase(),
    stamps: valid ? [{ type: 'institutional', valid: true }] : [],
    issues: valid ? [] : [{ field: 'stamp', message: 'Falta el sello Institucional obligatorio.' }]
  };
}
const CHARACTERS = [
  {
    id: 'student-01', image: 'assets/personajes/estudiantes/estudiante_01.png', gender: 'male', role: 'estudiante',
    firstName: 'Lucas', lastName: 'Pereira', displayName: 'Lucas Pereira', age: 19,
    careerOrDepartment: 'Diseño Gráfico', personality: 'nervioso y respetuoso', recordId: '2814',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buenos días... vine a entregar mis documentos para la inscripción.', reactions: reactions(),
    responses: { nombre: 'Mi nombre es Lucas Pereira.', carrera: 'Me inscribí en Diseño Gráfico.', documentos: 'Entregué mi identidad.', default: 'Puede revisar los documentos.' },
    issueResponses: {}, requiredDocuments: ['identity'],
    documents: {
      identity: identity('Lucas', 'Pereira', '4.859.214-7', 'Tacuarembó', '2814', 'assets/personajes/estudiantes/estudiante_01.png')
    }
  },
  {
    id: 'student-03', image: 'assets/personajes/estudiantes/estudiante_03.png', gender: 'female', role: 'estudiante',
    firstName: 'Valentina', lastName: 'Silva', displayName: 'Valentina Silva', age: 20,
    careerOrDepartment: 'Comunicación', personality: 'amable y segura', recordId: '1874',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buen día. Vengo a completar mi ingreso a Comunicación.', reactions: reactions(),
    responses: { nombre: 'Soy Valentina Silva.', carrera: 'Comunicación.', documentos: 'Presenté identidad.', default: 'Claro, pregunte lo que necesite.' },
    issueResponses: {}, requiredDocuments: ['identity'],
    documents: {
      identity: identity('Valentina', 'Silva', '5.024.115-1', 'Canelones', '1874', 'assets/personajes/estudiantes/estudiante_03.png')
    }
  },
  {
    id: 'teacher-01', image: 'assets/personajes/docentes/profe_3.png', gender: 'male', role: 'docente',
    firstName: 'Alberto', lastName: 'Fernández', displayName: 'Prof. Alberto Fernández', age: 52,
    careerOrDepartment: 'Ciencias Exactas', personality: 'meticuloso', recordId: '3306',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buen día. Soy docente de Ciencias Exactas y necesito ingresar al edificio.', reactions: reactions(),
    responses: { nombre: 'Alberto Fernández.', documentos: 'Hoy solo me solicitaron el documento de identidad.', default: 'Estoy a disposición.' },
    issueResponses: {}, requiredDocuments: ['identity'],
    documents: {
      identity: identity('Alberto', 'Fernández', '3.771.642-9', 'Montevideo', '3306', 'assets/personajes/docentes/profe_3.png')
    }
  },
  {
    id: 'student-04', image: 'assets/personajes/estudiantes/estudiante_04.png', gender: 'male', role: 'estudiante',
    firstName: 'Mateo', lastName: 'Ramos', displayName: 'Mateo Ramos', age: 18,
    careerOrDepartment: 'Arquitectura', personality: 'apurado', recordId: '8402',
    correctDecision: 'denied', hiddenError: 'Falta documento de identidad.',
    greeting: 'Hola, estoy un poco apurado.', reactions: reactions(),
    responses: { 
      nombre: 'Mateo Ramos.', 
      carrera: 'Arquitectura.', 
      documentos: 'Ay, me olvidé mi documento.', 
      identidad: {
        text: 'Olvidé mi documento de identidad.',
        metadata: {
          evidenceType: 'statement',
          issueType: 'missingDocument',
          missingDocumentType: 'identity',
          isActualError: true
        }
      },
      default: 'No sé si falta algo.' 
    },
    issueResponses: {},
    requiredDocuments: ['identity'],
    documents: {}
  },
  {
    id: 'student-02', image: 'assets/personajes/estudiantes/estudiante_02.png', gender: 'female', role: 'estudiante',
    firstName: 'Sofía', lastName: 'Acosta', displayName: 'Sofía Acosta', age: 21,
    careerOrDepartment: 'Diseño Digital', personality: 'serena y reservada', recordId: '1190',
    correctDecision: 'denied', hiddenError: 'El apellido de la carta de admisión no coincide con la identidad.',
    greeting: 'Buenos días. Traje la documentación de ingreso.', reactions: reactions(),
    responses: { nombre: 'Sofía Acosta.', carrera: 'Diseño Digital.', documentos: 'Identidad y carta de admisión.', default: 'Soy aspirante nueva.' },
    issueResponses: { applicantName: 'Mi apellido es Acosta, con T. La carta debe tener un error de tipeo.' }, requiredDocuments: ['identity', 'admission'],
    documents: {
      identity: identity('Sofía', 'Acosta', '4.692.104-3', 'Montevideo', '1190', 'assets/personajes/estudiantes/estudiante_02.png'),
      admission: { ...admission('Sofía Acosa', 'Diseño Digital', 'Facultad de Diseño', '19/07/2026', '1190'), issues: [{ field: 'applicantName', message: 'El apellido difiere por una letra respecto de la identidad.' }] }
    }
  },
  {
    id: 'student-05', image: 'assets/personajes/estudiantes/estudiante_05.png', gender: 'female', role: 'estudiante',
    firstName: 'Camila', lastName: 'Méndez', displayName: 'Camila Méndez', age: 22,
    careerOrDepartment: 'Psicología', personality: 'confiada', recordId: '5539',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Hola. Vengo a confirmar mi calidad de estudiante regular.', reactions: reactions(),
    responses: { nombre: 'Camila Méndez.', carrera: 'Psicología.', documentos: 'Identidad, constancia y certificado.', default: 'Los documentos están en regla.' },
    issueResponses: {}, requiredDocuments: ['identity', 'enrollment', 'studyCertificate'],
    documents: {
      identity: identity('Camila', 'Méndez', '4.123.987-2', 'Montevideo', '5539', 'assets/personajes/estudiantes/estudiante_05.png'),
      enrollment: enrollment('Camila Méndez', 'Psicología', '2º semestre', '19/07/2026', '5539'),
      studyCertificate: certificate('Camila Méndez', 'Universidad Central', 'Promedio 8,2', '12/07/2026', '5539')
    }
  },
  {
    id: 'student-06', image: 'assets/personajes/estudiantes/estudiante_06.png', gender: 'male', role: 'estudiante',
    firstName: 'Bruno', lastName: 'Costa', displayName: 'Bruno Costa', age: 23,
    careerOrDepartment: 'Analítica de Datos', personality: 'evasivo', recordId: '1985',
    correctDecision: 'denied', hiddenError: 'La constancia tiene un código de expediente diferente.',
    greeting: 'Hola. Necesito confirmar mi inscripción de regular.', reactions: reactions(),
    responses: { nombre: 'Bruno Costa.', carrera: 'Analítica de Datos.', documentos: 'Identidad, constancia y certificado.', default: 'Los descargué del sistema.' },
    issueResponses: { code: 'Mi expediente termina en 1985. Si ve otro número, debe ser un error del sistema.' }, requiredDocuments: ['identity', 'enrollment', 'studyCertificate'],
    documents: {
      identity: identity('Bruno', 'Costa', '4.086.710-8', 'Uruguay', '1985', 'assets/personajes/estudiantes/estudiante_06.png'),
      enrollment: {
        ...enrollment('Bruno Costa', 'Analítica de Datos', '2º semestre', '19/07/2026', '1985'),
        code: 'INS-26-9288', issues: [{ field: 'code', message: 'Los 4 dígitos finales no coinciden con identidad.' }]
      },
      studyCertificate: certificate('Bruno Costa', 'Instituto Tecnológico', 'Promedio 7,5', '18/07/2026', '1985')
    }
  },
  {
    id: 'student-09', image: 'assets/personajes/estudiantes/estudiante_09.png', gender: 'female', role: 'estudiante',
    firstName: 'Julieta', lastName: 'López', displayName: 'Julieta López', age: 20,
    careerOrDepartment: 'Gestión Académica', personality: 'formal', recordId: '2022',
    correctDecision: 'denied', hiddenError: 'Falta certificado de estudios.',
    greeting: 'Buen día. Traigo mi constancia de estudiante regular.', reactions: reactions(),
    responses: { nombre: 'Julieta López.', documentos: 'Identidad y constancia de inscripción.', default: 'Pensé que con la constancia era suficiente.' },
    issueResponses: { studyCertificate: 'No traje el certificado, nadie me avisó.' }, requiredDocuments: ['identity', 'enrollment', 'studyCertificate'],
    documents: {
      identity: identity('Julieta', 'López', '4.104.052-9', 'Uruguay', '2022', 'assets/personajes/estudiantes/estudiante_09.png'),
      enrollment: enrollment('Julieta López', 'Gestión Académica', '2º semestre', '19/07/2026', '2022')
    }
  },
  {
    id: 'visitor-01', image: 'assets/personajes/visitantes/visitante_01.png', gender: 'female', role: 'visitante',
    firstName: 'Carmen', lastName: 'Souza', displayName: 'Carmen Souza', age: 45,
    careerOrDepartment: 'Secretaría General', personality: 'apurada', recordId: '4401',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buenas. Vengo a una reunión en Secretaría General.', reactions: reactions(),
    responses: { nombre: 'Carmen Souza.', motivo: 'Tengo una reunión administrativa.', área: 'Secretaría General.', documentos: 'Identidad y pase de visitante.', default: 'Mi pase fue emitido en recepción.' },
    issueResponses: {}, requiredDocuments: ['identity', 'visitorPass'],
    documents: {
      identity: identity('Carmen', 'Souza', '3.807.334-6', 'Brasil', '4401', 'assets/personajes/visitantes/visitante_01.png'),
      visitorPass: { name: 'CARMEN SOUZA', visitReason: 'REUNIÓN ADMINISTRATIVA', authorizedArea: 'SECRETARÍA GENERAL', date: '20/07/2026', time: '09:30', signature: 'RECEPCIÓN', passCode: 'VIS-4401', stamps: [{ type: 'administration', valid: true }], issues: [] }
    }
  },
  {
    id: 'visitor-02', image: 'assets/personajes/visitantes/visitante_02.png', gender: 'male', role: 'visitante',
    firstName: 'Hugo', lastName: 'Núñez', displayName: 'Hugo Núñez', age: 61,
    careerOrDepartment: 'Auditorio', personality: 'impaciente', recordId: '4517',
    correctDecision: 'denied', hiddenError: 'El pase autoriza Biblioteca, pero la visita es al Auditorio.',
    greeting: 'Hola. Vengo como expositor al Auditorio.', reactions: reactions(),
    responses: { nombre: 'Hugo Núñez.', motivo: 'Soy expositor.', área: 'Debo ir al Auditorio.', documentos: 'Identidad y pase.', default: 'En recepción me dieron ese pase.' },
    issueResponses: { authorizedArea: 'Necesito el Auditorio. Biblioteca no me sirve; debe estar mal impreso.' }, requiredDocuments: ['identity', 'visitorPass'],
    documents: {
      identity: identity('Hugo', 'Núñez', '2.918.440-1', 'Uruguay', '4517', 'assets/personajes/visitantes/visitante_02.png'),
      visitorPass: { name: 'HUGO NÚÑEZ', visitReason: 'EXPOSITOR', authorizedArea: 'BIBLIOTECA', date: '20/07/2026', time: '11:00', signature: 'RECEPCIÓN', passCode: 'VIS-4517', stamps: [{ type: 'administration', valid: true }], issues: [{ field: 'authorizedArea', message: 'El área no coincide con el motivo declarado.' }] }
    }
  },
  {
    id: 'provider-01', image: 'assets/personajes/provedores/proveedor_01.png', gender: 'male', role: 'proveedor',
    firstName: 'Raúl', lastName: 'Sosa', displayName: 'Raúl Sosa', age: 41,
    careerOrDepartment: 'Mantenimiento', personality: 'tranquilo', recordId: '4708',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buen día. Vengo por mantenimiento del laboratorio.', reactions: reactions(),
    responses: { nombre: 'Raúl Sosa.', orden: 'Mantenimiento preventivo.', área: 'Laboratorio de Física.', documentos: 'Identidad y orden de servicio.', default: 'La orden está firmada por Administración.' },
    issueResponses: {}, requiredDocuments: ['identity', 'serviceOrder'],
    documents: {
      identity: identity('Raúl', 'Sosa', '4.377.016-4', 'Uruguay', '4708', 'assets/personajes/provedores/proveedor_01.png'),
      serviceOrder: { name: 'RAÚL SOSA', companyService: 'MANTENIMIENTO', reason: 'REVISIÓN ELÉCTRICA', authorizedArea: 'LABORATORIO DE FÍSICA', date: '20/07/2026', signature: 'ADMINISTRACIÓN', approval: 'APROBADO', orderCode: 'SER-4708', stamps: [{ type: 'administration', valid: true }], issues: [] }
    }
  },
  {
    id: 'provider-02', image: 'assets/personajes/provedores/proveedor_02.png', gender: 'female', role: 'proveedor',
    firstName: 'Andrea', lastName: 'Paz', displayName: 'Andrea Paz', age: 36,
    careerOrDepartment: 'Imprenta', personality: 'nerviosa', recordId: '4824',
    correctDecision: 'denied', hiddenError: 'La orden de servicio está fechada el día anterior.',
    greeting: 'Buenas. Traigo materiales impresos para Bedelía.', reactions: reactions(),
    responses: { nombre: 'Andrea Paz.', orden: 'Entrega de materiales impresos.', área: 'Bedelía.', documentos: 'Identidad y orden de servicio.', default: 'La orden me la enviaron ayer.' },
    issueResponses: { date: 'Sí, la orden es de ayer. Me dijeron que igual servía.' }, requiredDocuments: ['identity', 'serviceOrder'],
    documents: {
      identity: identity('Andrea', 'Paz', '4.144.862-0', 'Uruguay', '4824', 'assets/personajes/provedores/proveedor_02.png'),
      serviceOrder: { name: 'ANDREA PAZ', companyService: 'IMPRENTA', reason: 'ENTREGA DE FORMULARIOS', authorizedArea: 'BEDELÍA', date: '19/07/2026', signature: 'ADMINISTRACIÓN', approval: 'APROBADO', orderCode: 'SER-4824', stamps: [{ type: 'administration', valid: true }], issues: [{ field: 'date', message: 'La orden no corresponde a la fecha actual.' }] }
    }
  },
  {
    id: 'admin-01', image: 'assets/personajes/administrativos/administrativo_01.png', gender: 'female', role: 'administrativo',
    firstName: 'Carlos', lastName: 'Viera', displayName: 'Carlos Viera', age: 39, careerOrDepartment: 'Archivo', personality: 'serena', recordId: '6104',
    correctDecision: 'approved', hiddenError: null, greeting: 'Buen día. Tengo autorización para ingresar al archivo restringido.', reactions: reactions(),
    responses: { nombre: 'Carlos Viera.', motivo: 'Debo retirar expedientes del archivo.', documentos: 'Identidad y permiso especial.', default: 'La autorización fue emitida por Rectorado.' }, issueResponses: {},
    requiredDocuments: ['identity', 'specialPermit'], documents: {
      identity: identity('Carlos', 'Viera', '3.954.610-4', 'Uruguay', '6104', 'assets/personajes/administrativos/administrativo_01.png'),
      specialPermit: specialPermit('Carlos Viera', 'Acceso a archivo', '21/07/2026', 'Rectorado', 'Retiro de expedientes', '6104', true)
    }
  },
  {
    id: 'visitor-03', image: 'assets/personajes/visitantes/visitante_03.png', gender: 'male', role: 'visitante',
    firstName: 'Martín', lastName: 'Leiva', displayName: 'Martín Leiva', age: 34, careerOrDepartment: 'Sala de servidores', personality: 'evasivo', recordId: '6271',
    correctDecision: 'denied', hiddenError: 'El permiso especial no tiene sello Institucional.', greeting: 'Me autorizaron a revisar un equipo en la sala de servidores.', reactions: reactions(),
    responses: { nombre: 'Martín Leiva.', motivo: 'Es una revisión técnica urgente.', documentos: 'Identidad y permiso especial.', default: 'Me entregaron el permiso así.' }, issueResponses: { stamp: 'No sé por qué no está sellado. Me dijeron que era urgente.' },
    requiredDocuments: ['identity', 'specialPermit'], documents: {
      identity: identity('Martín', 'Leiva', '4.207.627-1', 'Uruguay', '6271', 'assets/personajes/visitantes/visitante_03.png'),
      specialPermit: specialPermit('Martín Leiva', 'Acceso técnico', '21/07/2026', 'Rectorado', 'Sala de servidores', '6271', false)
    }
  },
  {
    id: 'student-07', image: 'assets/personajes/estudiantes/estudiante_07.png', gender: 'female', role: 'estudiante',
    firstName: 'Lucía', lastName: 'Ferreira', displayName: 'Lucía Ferreira', age: 22, careerOrDepartment: 'Laboratorio', personality: 'nerviosa', recordId: '6388',
    correctDecision: 'denied', hiddenError: 'La autoridad del permiso no está habilitada.', greeting: 'Tengo permiso para trabajar fuera de horario en el laboratorio.', reactions: reactions(),
    responses: { nombre: 'Lucía Ferreira.', motivo: 'Necesito terminar una práctica.', documentos: 'Identidad y permiso especial.', default: 'Mi docente firmó la autorización.' }, issueResponses: { authorizingAuthority: 'La firmó mi docente. Pensé que era suficiente.' },
    requiredDocuments: ['identity', 'specialPermit'], documents: {
      identity: identity('Lucía', 'Ferreira', '5.114.638-8', 'Uruguay', '6388', 'assets/personajes/estudiantes/estudiante_07.png'),
      specialPermit: { ...specialPermit('Lucía Ferreira', 'Laboratorio nocturno', '21/07/2026', 'Docente de curso', 'Práctica final', '6388', true), issues: [{ field: 'authorizingAuthority', message: 'La autorización debe provenir de Rectorado.' }] }
    }
  },
  {
    id: 'teacher-02', image: 'assets/personajes/docentes/profe_4.png', gender: 'female', role: 'docente',
    firstName: 'Mariana', lastName: 'Rossi', displayName: 'Prof. Mariana Rossi', age: 47, careerOrDepartment: 'Investigación', personality: 'directa', recordId: '6495',
    correctDecision: 'approved', hiddenError: null, greeting: 'Rectorado autorizó mi ingreso al depósito de investigación.', reactions: reactions(),
    responses: { nombre: 'Mariana Rossi.', motivo: 'Retiro material de investigación.', documentos: 'Identidad y permiso especial.', default: 'Puede verificar la firma y el sello.' }, issueResponses: {},
    requiredDocuments: ['identity', 'specialPermit'], documents: {
      identity: identity('Mariana', 'Rossi', '3.867.649-5', 'Uruguay', '6495', 'assets/personajes/docentes/profe_4.png'),
      specialPermit: specialPermit('Mariana Rossi', 'Depósito de investigación', '21/07/2026', 'Rectorado', 'Retiro autorizado', '6495', true)
    }
  },
  {
    id: 'student-10', image: 'assets/personajes/estudiantes/estudiante_10.png', gender: 'male', role: 'estudiante',
    firstName: 'Nicolás', lastName: 'Ibarra', displayName: 'Nicolás Ibarra', age: 20, careerOrDepartment: 'Comunicación', personality: 'atento', recordId: '7012',
    correctDecision: 'approved', hiddenError: null, greeting: 'Vengo a validar mi inscripción como estudiante regular.', reactions: reactions(),
    responses: { nombre: 'Nicolás Ibarra.', carrera: 'Comunicación.', documentos: 'Identidad, constancia y certificado.', default: 'Revisé todo antes de venir.' }, issueResponses: {}, requiredDocuments: ['identity', 'enrollment', 'studyCertificate'],
    documents: { identity: identity('Nicolás','Ibarra','5.006.701-2','Uruguay','7012','assets/personajes/estudiantes/estudiante_10.png'), enrollment: enrollment('Nicolás Ibarra','Comunicación','2º semestre','22/07/2026','7012'), studyCertificate: certificate('Nicolás Ibarra','Liceo Central','Promedio 8,7','20/07/2026','7012') }
  },
  {
    id: 'visitor-04', image: 'assets/personajes/visitantes/visitante_04.png', gender: 'female', role: 'visitante',
    firstName: 'Paula', lastName: 'Mora', displayName: 'Paula Mora', age: 42, careerOrDepartment: 'Auditorio', personality: 'segura', recordId: '7146',
    correctDecision: 'denied', hiddenError: 'El código del pase no coincide con la identidad.', greeting: 'Tengo una invitación para el Auditorio.', reactions: reactions(),
    responses: { nombre: 'Paula Mora.', motivo: 'Asisto a una conferencia.', documentos: 'Identidad y pase.', default: 'El pase llegó por correo.' }, issueResponses: { passCode: 'Mi expediente termina en 7146, no en el número que aparece allí.' }, requiredDocuments: ['identity','visitorPass'],
    documents: { identity: identity('Paula','Mora','4.195.714-6','Uruguay','7146','assets/personajes/visitantes/visitante_04.png'), visitorPass: { name:'PAULA MORA', visitReason:'CONFERENCIA', authorizedArea:'AUDITORIO', date:'22/07/2026', time:'15:00', signature:'RECEPCIÓN', passCode:'VIS-7196', stamps:[{type:'administration',valid:true}], issues:[{field:'passCode',message:'Los cuatro dígitos no coinciden.'}] } }
  },
  {
    id: 'provider-03', image: 'assets/personajes/provedores/proveedor_03.png', gender: 'male', role: 'proveedor',
    firstName: 'Soledad', lastName: 'Suárez', displayName: 'Soledad Suárez', age: 38, careerOrDepartment: 'Soporte técnico', personality: 'profesional', recordId: '7280',
    correctDecision: 'approved', hiddenError: null, greeting: 'Traigo una orden para soporte en el laboratorio.', reactions: reactions(),
    responses: { nombre:'Soledad Suárez.', motivo:'Reemplazo de un equipo.', documentos:'Identidad y orden de servicio.', default:'Administración emitió la orden esta mañana.' }, issueResponses:{}, requiredDocuments:['identity','serviceOrder'],
    documents:{ identity:identity('Soledad','Suárez','4.399.728-0','Uruguay','7280','assets/personajes/provedores/proveedor_03.png'), serviceOrder:{name:'Soledad SUÁREZ',companyService:'SOPORTE TÉCNICO',reason:'REEMPLAZO DE EQUIPO',authorizedArea:'LABORATORIO',date:'22/07/2026',signature:'ADMINISTRACIÓN',approval:'APROBADO',orderCode:'SER-7280',stamps:[{type:'administration',valid:true}],issues:[]} }
  },
  {
    id: 'admin-02', image: 'assets/personajes/administrativos/administrativo_02.png', gender: 'male', role: 'administrativo',
    firstName: 'Gabriela', lastName: 'Ramos', displayName: 'Gabriela Ramos', age: 56, careerOrDepartment: 'Rectorado', personality: 'cansado y honesto', recordId: '7393', finalCase: true,
    correctDecision: 'denied', hiddenError: 'El permiso especial venció el día anterior.', greeting: 'Soy quien ordenó esta auditoría. Necesito entrar al archivo antes de que cierre.', reactions: reactions(),
    responses:{ nombre:'Gabriela Ramos.', motivo:'Debo retirar el informe de auditoría.', documentos:'Identidad y permiso especial.', default:'Sé que la fecha es de ayer. Usted decide si la norma admite una excepción.' }, issueResponses:{date:'El permiso venció ayer. Si me rechaza, el informe no llegará hoy al Consejo.'}, requiredDocuments:['identity','specialPermit'],
    documents:{ identity:identity('Gabriela','Ramos','2.844.739-3','Uruguay','7393','assets/personajes/administrativos/administrativo_02.png'), specialPermit:{...specialPermit('Gabriela Ramos','Acceso a archivo','21/07/2026','Rectorado','Retiro de auditoría','7393',true),issues:[{field:'date',message:'El permiso venció el día anterior.'}]} }
  },
  {
    id: 'valerys-01', image: 'assets/personajes/estudiantes/valerys.png', gender: 'female', role: 'estudiante',
    firstName: 'Valerys', lastName: 'Pereira', displayName: 'Valerys Pereira', age: 20,
    careerOrDepartment: 'Artes Digitales', personality: 'encantadora, creativa y muy desordenada', recordId: '9091',
    correctDecision: 'denied', hiddenError: 'El apellido declarado no coincide con el documento.',
    greeting: '¡Hola! Es mi primer día. El documento está casi perfecto; una letra no cambia quién soy, ¿verdad?', reactions: reactions(),
    responses: {
      nombre: { text: 'Soy Valerys Pereira, con I antes de la R.', metadata: { evidenceType: 'statement', issueType: 'nameMismatch', isActualError: true } },
      documentos: 'Traje mi identidad. La imprimieron con demasiada imaginación.',
      default: 'Prometo que mañana voy a traer algo mucho más convincente.'
    },
    issueResponses: { surname: 'Mi apellido verdadero es Pereira. En el documento pusieron Pereyra.' }, requiredDocuments: ['identity'],
    documents: { identity: { ...identity('Valerys','Pereyra','5.111.909-1','Uruguay','9091','assets/personajes/estudiantes/valerys.png'), issues: [{ field: 'surname', message: 'El apellido no coincide con la declaración de la titular.' }] } }
  },
  {
    id: 'valerys-02', image: 'assets/personajes/estudiantes/valerys.png', gender: 'female', role: 'estudiante',
    firstName: 'Valerys', lastName: 'Pereira', displayName: 'Valerys Pereira', age: 20,
    careerOrDepartment: 'Artes Digitales', personality: 'optimista y persistentemente desordenada', recordId: '9091',
    correctDecision: 'denied', hiddenError: 'La carta de admisión pertenece a Valeria Pereira.',
    greeting: '¡Volví! Conseguí la carta. Dice Valeria, pero es un nombre muy parecido a Valerys.', reactions: reactions(),
    responses: { nombre: 'Valerys Pereira. Valeria es otra persona... técnicamente.', carrera: 'Artes Digitales.', documentos: 'Identidad y carta de admisión, como pidió.', default: '¿Cuenta la intención administrativa?' },
    issueResponses: { applicantName: 'La carta dice Valeria. Me la dieron en la ventanilla de al lado y ya estaba cerrando.' }, requiredDocuments: ['identity','admission'],
    documents: {
      identity: identity('Valerys','Pereira','5.111.909-1','Uruguay','9091','assets/personajes/estudiantes/valerys.png'),
      admission: { ...admission('Valeria Pereira','Artes Digitales','Facultad de Diseño','19/07/2026','9091'), issues: [{ field: 'applicantName', message: 'El nombre no coincide con la identidad.' }] }
    }
  },
  {
    id: 'valerys-03', image: 'assets/personajes/estudiantes/valerys.png', gender: 'female', role: 'visitante',
    firstName: 'Valerys', lastName: 'Pereira', displayName: 'Valerys Pereira', age: 20,
    careerOrDepartment: 'Artes Digitales', personality: 'ingeniosa y confiada', recordId: '9091',
    correctDecision: 'denied', hiddenError: 'El pase casero no tiene sello de Administración.',
    greeting: 'Hoy vine como visitante. Diseñé yo misma el pase para ahorrarles trabajo.', reactions: reactions(),
    responses: { nombre: 'Valerys Pereira, otra vez.', motivo: 'Visitar el taller de Artes Digitales.', documentos: 'Identidad y un pase hecho con muchísimo cariño.', default: 'El sello dibujado quedó bastante parecido, ¿no?' },
    issueResponses: { stamp: 'No tiene sello oficial, pero le dibujé uno con regla y marcador.' }, requiredDocuments: ['identity','visitorPass'],
    documents: {
      identity: identity('Valerys','Pereira','5.111.909-1','Uruguay','9091','assets/personajes/estudiantes/valerys.png'),
      visitorPass: { name:'VALERYS PEREIRA',visitReason:'VISITA AL TALLER',authorizedArea:'ARTES DIGITALES',date:'20/07/2026',time:'14:00',signature:'VALERYS',passCode:'VIS-9091',stamps:[],issues:[{field:'stamp',message:'Falta el sello obligatorio de Administración.'}] }
    }
  },
  {
    id: 'valerys-04', image: 'assets/personajes/estudiantes/valerys.png', gender: 'female', role: 'estudiante',
    firstName: 'Valerys', lastName: 'Pereira', displayName: 'Valerys Pereira', age: 20,
    careerOrDepartment: 'Artes Digitales', personality: 'persistente y simpática', recordId: '9091',
    correctDecision: 'denied', hiddenError: 'El permiso fue autorizado por la propia estudiante.',
    greeting: 'Esta vez traje un permiso especial. Lo autoricé personalmente porque conozco muy bien el caso.', reactions: reactions(),
    responses: { nombre: 'Valerys Pereira.', motivo: 'Necesito entrar al taller fuera de horario.', documentos: 'Identidad y permiso especial.', default: 'Soy la máxima autoridad sobre mis propias urgencias.' },
    issueResponses: { authorizingAuthority: 'Lo firmé yo. Nadie conoce mejor que yo lo importante que es terminar mi trabajo.' }, requiredDocuments: ['identity','specialPermit'],
    documents: {
      identity: identity('Valerys','Pereira','5.111.909-1','Uruguay','9091','assets/personajes/estudiantes/valerys.png'),
      specialPermit: { ...specialPermit('Valerys Pereira','Taller nocturno','21/07/2026','Valerys Pereira','Entrega final','9091',true), issues:[{field:'authorizingAuthority',message:'La autoridad debe ser Rectorado, no la titular.'}] }
    }
  },
  {
    id: 'valerys-05', image: 'assets/personajes/estudiantes/valerys.png', gender: 'female', role: 'estudiante',
    firstName: 'Valerys', lastName: 'Pereira', displayName: 'Valerys Pereira', age: 20,
    careerOrDepartment: 'Artes Digitales', personality: 'orgullosa y agradecida', recordId: '9091',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Respire hondo: hoy todo está bien. Revisé cada letra, sello y número tres veces.', reactions: { ...reactions(), approvedCorrect: ['¡Al fin! Sabía que algún día iba a lograrlo. Gracias por no rendirse conmigo.', '¿Vio? Cinco días y ya soy casi una experta en burocracia.'] },
    responses: { nombre:'Valerys Pereira, escrito correctamente.', carrera:'Artes Digitales.', documentos:'Identidad, constancia y certificado. Todo oficial.', default:'Puede revisar tranquila. Esta vez no dibujé ningún sello.' }, issueResponses:{}, requiredDocuments:['identity','enrollment','studyCertificate'],
    documents:{
      identity:identity('Valerys','Pereira','5.111.909-1','Uruguay','9091','assets/personajes/estudiantes/valerys.png'),
      enrollment:enrollment('Valerys Pereira','Artes Digitales','2º semestre','22/07/2026','9091'),
      studyCertificate:certificate('Valerys Pereira','Instituto de Artes','Promedio 8,9','21/07/2026','9091')
    }
  }
];

const DOCUMENT_TYPES = {
  identity: { label: 'Documento de identidad', image: 'assets/documentos/identidad.png', cssClass: 'identity-document', fields: ['name', 'surname', 'documentNumber', 'origin', 'securityCode', 'photo'] },
  admission: { label: 'Carta de admisión', image: 'assets/documentos/carta-admision.png', cssClass: 'admission-document', fields: ['applicantName', 'career', 'faculty', 'fileNumber', 'issueDate', 'signature'] },
  studyCertificate: { label: 'Certificado de estudios', image: 'assets/documentos/certificado-estudios.png', cssClass: 'study-certificate-document', fields: ['applicantName', 'originInstitution', 'academicStatus', 'certificateCode', 'issueDate', 'signature'] },
  enrollment: { label: 'Constancia de inscripción', image: 'assets/documentos/constancia-inscripcion.png', cssClass: 'enrollment-document', fields: ['name', 'studentNumber', 'career', 'semester', 'category', 'issueDate', 'code'] },
  visitorPass: { label: 'Pase de visitante', image: 'assets/documentos/pase-visitante.png', cssClass: 'visitor-pass-document', fields: ['name', 'visitReason', 'authorizedArea', 'date', 'time', 'passCode', 'signature'] },
  serviceOrder: { label: 'Orden de servicio', image: 'assets/documentos/orden-servicio.png', cssClass: 'service-order-document', fields: ['name', 'companyService', 'reason', 'authorizedArea', 'date', 'signature', 'approval', 'orderCode'] },
  specialPermit: { label: 'Permiso especial', image: 'assets/documentos/permiso-especial.png', cssClass: 'special-permit-document', fields: ['name', 'exceptionType', 'date', 'authorizingAuthority', 'observations', 'authorizationCode', 'signature'] },
  missingDocumentRecord: { label: 'Acta de Documentación Faltante', cssClass: 'missing-document-record', fields: ['name', 'documentType', 'statement', 'date', 'status'] }
};

const FIELD_LABELS = {
  name: 'Nombre', surname: 'Apellido', applicantName: 'Nombre completo', documentNumber: 'Número de documento',
  origin: 'Procedencia', securityCode: 'Código de seguridad', career: 'Carrera', faculty: 'Facultad',
  fileNumber: 'Número de expediente', issueDate: 'Fecha de emisión', originInstitution: 'Institución de origen',
  academicStatus: 'Estado académico', certificateCode: 'Código de certificado', studentNumber: 'Número de estudiante',
  semester: 'Período', category: 'Categoría', code: 'Código de constancia', visitReason: 'Motivo',
  authorizedArea: 'Área autorizada', date: 'Fecha', time: 'Hora', passCode: 'Código de pase',
  companyService: 'Empresa o servicio', reason: 'Motivo', approval: 'Aprobación', orderCode: 'Código de orden',
  stamp: 'Sello institucional', exceptionType: 'Excepción', authorizingAuthority: 'Autoridad', 
  observations: 'Observaciones', authorizationCode: 'Código autorización', documentType: 'Documento faltante', 
  statement: 'Declaración', status: 'Estado'
};

const DOCUMENT_LABELS = Object.fromEntries(Object.entries(DOCUMENT_TYPES).map(([key, value]) => [key, value.label]));
const STAMP_ASSETS = { admissions: 'assets/sellos/admisiones.png', institutional: 'assets/sellos/institucional.png', faculty: 'assets/sellos/facultad.png', administration: 'assets/sellos/administracion.png', approved: 'assets/sellos/aporbado.png', denied: 'assets/sellos/denegado.png' };
const CREDITS = { projectName: 'ORT CONTROL', subtitle: 'Un juego de admisiones universitarias', subject: 'Diseño Interactivo', institution: 'Universidad ORT Uruguay', year: '2026', authors: ['Majo'], acknowledgements: 'Inspirado en la lógica burocrática de Papers, Please.' };
