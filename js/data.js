'use strict';

const DAYS = [
  {
    day: 1,
    date: '18/07/2026',
    lore: 'Tras varios ingresos irregulares, Rectorado limita el acceso de hoy a estudiantes y docentes. Toda persona deberá acreditar su identidad antes de pasar.',
    newRule: 'Solo pueden ingresar ESTUDIANTES y DOCENTES. El documento de identidad es obligatorio. Para estudiantes nuevos, el nombre de la carta debe coincidir con la identidad.',
    observations: [
      'Revise primero la categoría de la persona.',
      'Exija documento de identidad en todos los casos.',
      'Compare nombre y apellido cuando exista carta de admisión.'
    ],
    reminder: [
      'Los últimos 4 dígitos identifican el expediente.',
      'Seleccione dos datos o una regla y un dato para compararlos.'
    ],
    introducedDocuments: ['identity', 'admission'],
    allowedRoles: ['estudiante', 'docente'],
    instructionSteps: [
      'Compruebe que la persona sea estudiante o docente.',
      'Verifique que haya presentado documento de identidad.',
      'Si hay carta de admisión, compare el nombre completo y los 4 dígitos del expediente.',
      'Abra el cuaderno rojo para consultar las reglas. Seleccione dos evidencias y pulse COMPARAR.',
      'Abra la bandeja de sellos, seleccione un documento y decida APROBAR o DENEGAR.'
    ],
    receptionistLore: 'Primer día en Admisiones. El flujo fue tranquilo, pero Rectorado dejó claro que cada omisión quedará registrada en su legajo.',
    characterIds: ['student-01', 'student-03', 'teacher-01', 'student-04']
  },
  {
    day: 2,
    date: '19/07/2026',
    lore: 'Una constancia falsa circuló por los grupos estudiantiles. Desde hoy se exige verificar el trayecto académico y el código común del expediente.',
    newRule: 'Se mantienen las reglas del Día 1. Se incorporan CERTIFICADO DE ESTUDIOS y CONSTANCIA DE INSCRIPCIÓN. Carrera, nombre y últimos 4 dígitos deben coincidir.',
    observations: [
      'El código puede tener prefijos distintos, pero debe terminar igual.',
      'Compruebe carrera y período académico.',
      'Revise el sello de la facultad o de Admisiones.'
    ],
    reminder: [
      'No todos presentan los cuatro documentos.',
      'Solo exija los documentos indicados por el caso y las reglas del día.'
    ],
    introducedDocuments: ['studyCertificate', 'enrollment'],
    allowedRoles: ['estudiante', 'docente'],
    instructionSteps: [
      'Aplique todas las reglas del Día 1.',
      'Cuando haya certificado o constancia, compare nombre, carrera y período.',
      'Los códigos ORT-, ADM-, ACA- e INS- deben compartir los mismos 4 dígitos finales.',
      'Un sello ausente o de otra dependencia invalida el documento.',
      'Use el cuaderno para comparar evidencias antes de decidir.'
    ],
    receptionistLore: 'El rumor sobre documentos alterados aumentó la tensión. Algunos aspirantes culpan al sistema; otros parecen conocer demasiado bien sus fallas.',
    characterIds: ['student-02', 'student-05', 'student-06', 'student-09']
  },
  {
    day: 3,
    date: '20/07/2026',
    lore: 'Un proveedor accedió ayer a un área restringida con un pase equivocado. Seguridad delega en Admisiones la revisión de visitantes y servicios externos.',
    newRule: 'VISITANTES y PROVEEDORES pueden ingresar solo con identidad y el permiso correspondiente. El área, la fecha, el motivo y los 4 dígitos deben coincidir.',
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
      'Use la evidencia y el cuaderno antes de sellar.'
    ],
    receptionistLore: 'La oficina ya no parece una simple recepción. Sus decisiones empezaron a afectar a estudiantes, docentes y personal externo, y Dirección observa sus resultados.',
    characterIds: ['visitor-01', 'visitor-02', 'provider-01', 'provider-02']
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
function enrollment(fullName, studentNumber, career, semester, date, recordId, valid = true) {
  return {
    name: fullName.toUpperCase(), studentNumber, career: career.toUpperCase(), semester: semester.toUpperCase(),
    category: 'REGULAR', issueDate: date, code: `INS-26-${recordId}`,
    stamps: valid ? [{ type: 'admissions', valid: true }] : [], issues: []
  };
}

const CHARACTERS = [
  {
    id: 'student-01', image: 'assets/personajes/estudiantes/estudiante_01.png', gender: 'male', role: 'estudiante',
    firstName: 'Lucas', lastName: 'Pereira', displayName: 'Lucas Pereira', age: 19,
    careerOrDepartment: 'Diseño Gráfico', personality: 'nervioso y respetuoso', recordId: '2814',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buenos días... vine a entregar mis documentos para la inscripción.', reactions: reactions(),
    responses: { nombre: 'Mi nombre es Lucas Pereira.', carrera: 'Me inscribí en Diseño Gráfico.', documentos: 'Entregué mi identidad y la carta de admisión.', default: 'Puede revisar los documentos.' },
    issueResponses: {}, requiredDocuments: ['identity', 'admission'],
    documents: {
      identity: identity('Lucas', 'Pereira', '4.859.214-7', 'Tacuarembó', '2814', 'assets/personajes/estudiantes/estudiante_01.png'),
      admission: admission('Lucas Pereira', 'Diseño Gráfico', 'Facultad de Diseño', '18/07/2026', '2814')
    }
  },
  {
    id: 'student-03', image: 'assets/personajes/estudiantes/estudiante_03.png', gender: 'female', role: 'estudiante',
    firstName: 'Valentina', lastName: 'Silva', displayName: 'Valentina Silva', age: 20,
    careerOrDepartment: 'Comunicación', personality: 'amable y segura', recordId: '1874',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buen día. Vengo a completar mi ingreso a Comunicación.', reactions: reactions(),
    responses: { nombre: 'Soy Valentina Silva.', carrera: 'Comunicación.', documentos: 'Presenté identidad y carta de admisión.', default: 'Claro, pregunte lo que necesite.' },
    issueResponses: {}, requiredDocuments: ['identity', 'admission'],
    documents: {
      identity: identity('Valentina', 'Silva', '5.024.115-1', 'Canelones', '1874', 'assets/personajes/estudiantes/estudiante_03.png'),
      admission: admission('Valentina Silva', 'Comunicación', 'Facultad de Comunicación', '18/07/2026', '1874')
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
    correctDecision: 'denied', hiddenError: 'La carta no tiene sello de Admisiones.',
    greeting: 'Hola, estoy un poco apurado. Esta es mi documentación.', reactions: reactions(),
    responses: { nombre: 'Mateo Ramos.', carrera: 'Arquitectura.', documentos: 'Es todo lo que me entregaron.', default: 'No sé si falta algo.' },
    issueResponses: { stamp: 'No me había dado cuenta de que faltaba el sello.' }, requiredDocuments: ['identity', 'admission'],
    documents: {
      identity: identity('Mateo', 'Ramos', '5.201.884-0', 'Maldonado', '8402', 'assets/personajes/estudiantes/estudiante_04.png'),
      admission: admission('Mateo Ramos', 'Arquitectura', 'Facultad de Arquitectura', '18/07/2026', '8402', false)
    }
  },
  {
    id: 'student-02', image: 'assets/personajes/estudiantes/estudiante_02.png', gender: 'female', role: 'estudiante',
    firstName: 'Sofía', lastName: 'Acosta', displayName: 'Sofía Acosta', age: 21,
    careerOrDepartment: 'Diseño Digital', personality: 'serena y reservada', recordId: '1190',
    correctDecision: 'approved', hiddenError: null,
    greeting: 'Buenos días. Traje la documentación del segundo semestre.', reactions: reactions(),
    responses: { nombre: 'Sofía Acosta.', carrera: 'Diseño Digital.', documentos: 'Identidad, carta y constancia.', default: 'Puede revisar todo.' },
    issueResponses: {}, requiredDocuments: ['identity', 'admission', 'enrollment'],
    documents: {
      identity: identity('Sofía', 'Acosta', '4.692.104-3', 'Montevideo', '1190', 'assets/personajes/estudiantes/estudiante_02.png'),
      admission: admission('Sofía Acosta', 'Diseño Digital', 'Facultad de Diseño', '19/07/2026', '1190'),
      enrollment: enrollment('Sofía Acosta', 'EST-1190', 'Diseño Digital', '2º semestre', '19/07/2026', '1190')
    }
  },
  {
    id: 'student-05', image: 'assets/personajes/estudiantes/estudiante_05.png', gender: 'female', role: 'estudiante',
    firstName: 'Camila', lastName: 'Méndez', displayName: 'Camila Méndez', age: 22,
    careerOrDepartment: 'Psicología', personality: 'confiada', recordId: '5539',
    correctDecision: 'denied', hiddenError: 'El apellido del certificado no coincide con la identidad.',
    greeting: 'Hola. Vengo a solicitar la reválida de estudios.', reactions: reactions(),
    responses: { nombre: 'Camila Méndez.', carrera: 'Psicología.', documentos: 'Identidad, carta y certificado.', default: 'Los documentos los emitieron distintas oficinas.' },
    issueResponses: { applicantName: 'Mi apellido es Méndez, con z. El otro debe ser un error de la institución.' }, requiredDocuments: ['identity', 'admission', 'studyCertificate'],
    documents: {
      identity: identity('Camila', 'Méndez', '4.123.987-2', 'Montevideo', '5539', 'assets/personajes/estudiantes/estudiante_05.png'),
      admission: admission('Camila Méndez', 'Psicología', 'Facultad de Psicología', '19/07/2026', '5539'),
      studyCertificate: {
        ...certificate('Camila Mendes', 'Liceo Nº 5', 'Promedio 8,2', '12/07/2026', '5539'),
        issues: [{ field: 'applicantName', message: 'El apellido no coincide con la identidad.' }]
      }
    }
  },
  {
    id: 'student-06', image: 'assets/personajes/estudiantes/estudiante_06.png', gender: 'male', role: 'estudiante',
    firstName: 'Bruno', lastName: 'Costa', displayName: 'Bruno Costa', age: 23,
    careerOrDepartment: 'Analítica de Datos', personality: 'evasivo', recordId: '1985',
    correctDecision: 'denied', hiddenError: 'La constancia tiene un código de expediente diferente.',
    greeting: 'Hola. Necesito confirmar mi inscripción.', reactions: reactions(),
    responses: { nombre: 'Bruno Costa.', carrera: 'Analítica de Datos.', documentos: 'Identidad, carta y constancia.', default: 'Los descargué del sistema.' },
    issueResponses: { code: 'Mi expediente termina en 1985. Si ve otro número, debe ser un error del sistema.' }, requiredDocuments: ['identity', 'admission', 'enrollment'],
    documents: {
      identity: identity('Bruno', 'Costa', '4.086.710-8', 'Uruguay', '1985', 'assets/personajes/estudiantes/estudiante_06.png'),
      admission: admission('Bruno Costa', 'Analítica de Datos', 'Facultad de Ingeniería', '19/07/2026', '1985'),
      enrollment: {
        ...enrollment('Bruno Costa', 'EST-1985', 'Analítica de Datos', '2º semestre', '19/07/2026', '9288'),
        code: 'INS-26-9288', issues: [{ field: 'code', message: 'Los 4 dígitos finales no coinciden con identidad y carta.' }]
      }
    }
  },
  {
    id: 'student-09', image: 'assets/personajes/estudiantes/estudiante_09.png', gender: 'female', role: 'estudiante',
    firstName: 'Julieta', lastName: 'López', displayName: 'Julieta López', age: 20,
    careerOrDepartment: 'Gestión Académica', personality: 'formal', recordId: '2022',
    correctDecision: 'denied', hiddenError: 'La constancia no tiene sello institucional.',
    greeting: 'Buen día. Traigo una constancia para validar mi inscripción.', reactions: reactions(),
    responses: { nombre: 'Julieta López.', documentos: 'Identidad y constancia de inscripción.', default: 'La descargué esta mañana.' },
    issueResponses: { stamp: 'No noté que el sello no aparecía en la descarga.' }, requiredDocuments: ['identity', 'enrollment'],
    documents: {
      identity: identity('Julieta', 'López', '4.104.052-9', 'Uruguay', '2022', 'assets/personajes/estudiantes/estudiante_09.png'),
      enrollment: { ...enrollment('Julieta López', 'EST-2022', 'Gestión Académica', '2º semestre', '19/07/2026', '2022', false), issues: [{ field: 'stamp', message: 'Falta el sello de Admisiones.' }] }
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
  }
];

const DOCUMENT_TYPES = {
  identity: { label: 'Documento de identidad', image: 'assets/documentos/identidad.png', cssClass: 'identity-document', fields: ['name', 'surname', 'documentNumber', 'origin', 'securityCode', 'photo'] },
  admission: { label: 'Carta de admisión', image: 'assets/documentos/carta-admision.png', cssClass: 'admission-document', fields: ['applicantName', 'career', 'faculty', 'fileNumber', 'issueDate', 'signature'] },
  studyCertificate: { label: 'Certificado de estudios', image: 'assets/documentos/certificado-estudios.png', cssClass: 'study-certificate-document', fields: ['applicantName', 'originInstitution', 'academicStatus', 'certificateCode', 'issueDate', 'signature'] },
  enrollment: { label: 'Constancia de inscripción', image: 'assets/documentos/constancia-inscripcion.png', cssClass: 'enrollment-document', fields: ['name', 'studentNumber', 'career', 'semester', 'category', 'issueDate', 'code'] },
  visitorPass: { label: 'Pase de visitante', image: 'assets/documentos/pase-visitante.png', cssClass: 'visitor-pass-document', fields: ['name', 'visitReason', 'authorizedArea', 'date', 'time', 'passCode', 'signature'] },
  serviceOrder: { label: 'Orden de servicio', image: 'assets/documentos/orden-servicio.png', cssClass: 'service-order-document', fields: ['name', 'companyService', 'reason', 'authorizedArea', 'date', 'signature', 'approval', 'orderCode'] },
  specialPermit: { label: 'Permiso especial', image: 'assets/documentos/permiso-especial.png', cssClass: 'special-permit-document', fields: ['name', 'exceptionType', 'date', 'authorizingAuthority', 'observations', 'authorizationCode', 'signature'] }
};

const FIELD_LABELS = {
  name: 'Nombre', surname: 'Apellido', applicantName: 'Nombre completo', documentNumber: 'Número de documento',
  origin: 'Procedencia', securityCode: 'Código de seguridad', career: 'Carrera', faculty: 'Facultad',
  fileNumber: 'Número de expediente', issueDate: 'Fecha de emisión', originInstitution: 'Institución de origen',
  academicStatus: 'Estado académico', certificateCode: 'Código de certificado', studentNumber: 'Número de estudiante',
  semester: 'Período', category: 'Categoría', code: 'Código de constancia', visitReason: 'Motivo',
  authorizedArea: 'Área autorizada', date: 'Fecha', time: 'Hora', passCode: 'Código de pase',
  companyService: 'Empresa o servicio', reason: 'Motivo', approval: 'Aprobación', orderCode: 'Código de orden',
  stamp: 'Sello institucional'
};

const DOCUMENT_LABELS = Object.fromEntries(Object.entries(DOCUMENT_TYPES).map(([key, value]) => [key, value.label]));
const STAMP_ASSETS = { admissions: 'assets/sellos/admisiones.png', institutional: 'assets/sellos/institucional.png', faculty: 'assets/sellos/facultad.png', administration: 'assets/sellos/administracion.png', approved: 'assets/sellos/aporbado.png', denied: 'assets/sellos/denegado.png' };
const CREDITS = { projectName: 'ORT CONTROL', subtitle: 'Un juego de admisiones universitarias', subject: 'Diseño Interactivo', institution: 'Universidad ORT Uruguay', year: '2026', authors: ['Majo'], acknowledgements: 'Inspirado en la lógica burocrática de Papers, Please.' };
