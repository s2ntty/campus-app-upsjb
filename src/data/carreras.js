// Datos específicos por carrera para filtrar contenido relevante
export const carrerasData = {
  medicina: {
    id: 'medicina',
    nombre: 'Medicina',
    facultad: 'F.C.N y C.S',
    sedes: ['Comodoro Rivadavia', 'Trelew'],
    duracion: '6 años',
    modalidad: 'Presencial',
    descripcion: 'Carrera de grado orientada a la formación de médicos generalistas',
    materias: [
      // Primer año
      { id: 'anatomia_1', nombre: 'Anatomía I', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'biologia_celular', nombre: 'Biología Celular', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'quimica_biologica', nombre: 'Química Biológica', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'anatomia_2', nombre: 'Anatomía II', año: 1, cuatrimestre: 2, creditos: 10, correlativas: ['anatomia_1'] },
      { id: 'fisiologia_1', nombre: 'Fisiología I', año: 1, cuatrimestre: 2, creditos: 10, correlativas: ['biologia_celular'] },
      { id: 'histologia', nombre: 'Histología', año: 1, cuatrimestre: 2, creditos: 10, correlativas: [] },
      
      // Segundo año
      { id: 'fisiologia_2', nombre: 'Fisiología II', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['fisiologia_1'] },
      { id: 'microbiologia', nombre: 'Microbiología', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['quimica_biologica'] },
      { id: 'farmacologia_1', nombre: 'Farmacología I', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['fisiologia_1'] },
      { id: 'patologia_1', nombre: 'Patología I', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['histologia'] },
      { id: 'farmacologia_2', nombre: 'Farmacología II', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['farmacologia_1'] },
      { id: 'semiologia', nombre: 'Semiología', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['anatomia_2'] }
    ],
    horarios: [
      { materia: 'Anatomía I', dia: 'Lunes', hora: '14:00-17:00', aula: 'Aula 204', profesor: 'Dr. García' },
      { materia: 'Biología Celular', dia: 'Martes', hora: '08:00-11:00', aula: 'Lab 1', profesor: 'Dra. Martínez' },
      { materia: 'Química Biológica', dia: 'Miércoles', hora: '14:00-17:00', aula: 'Aula 301', profesor: 'Dr. López' },
      { materia: 'Anatomía II', dia: 'Jueves', hora: '14:00-17:00', aula: 'Aula 204', profesor: 'Dr. García' },
      { materia: 'Fisiología I', dia: 'Viernes', hora: '08:00-11:00', aula: 'Aula 105', profesor: 'Dra. Rodríguez' }
    ],
    eventos: [
      { titulo: 'Congreso de Medicina', fecha: '2026-03-15', tipo: 'congreso', descripcion: 'Congreso anual de medicina' },
      { titulo: 'Examen Final Anatomía', fecha: '2026-02-20', tipo: 'examen', descripcion: 'Examen final de Anatomía I' },
      { titulo: 'Práctica Hospitalaria', fecha: '2026-04-01', tipo: 'practica', descripcion: 'Inicio de prácticas en hospital' }
    ]
  },

  informatica: {
    id: 'informatica',
    nombre: 'Analista Programador',
    facultad: 'F.I.',
    sedes: ['Comodoro Rivadavia', 'Puerto Madryn'],
    duracion: '3 años',
    modalidad: 'Presencial',
    descripcion: 'Tecnicatura orientada al desarrollo de software y análisis de sistemas',
    materias: [
      // Primer Año - 1° Cuatrimestre
      { 
        id: 'IF001', 
        codigo: 'IF001',
        nombre: 'Elementos de Informática', 
        año: 1, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: [],
        subcorrelativas: []
      },
      { 
        id: 'MA045', 
        codigo: 'MA045',
        nombre: 'Álgebra', 
        año: 1, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: [],
        subcorrelativas: []
      },
      { 
        id: 'IF002', 
        codigo: 'IF002',
        nombre: 'Expresión de Problemas y Algoritmos', 
        año: 1, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: [],
        subcorrelativas: []
      },
      
      // Primer Año - 2° Cuatrimestre
      { 
        id: 'IF003', 
        codigo: 'IF003',
        nombre: 'Algorítmica y Programación I', 
        año: 1, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: ['IF002'], // Requiere aprobar IF002
        subcorrelativas: []
      },
      { 
        id: 'MA046', 
        codigo: 'MA046',
        nombre: 'Análisis Matemático', 
        año: 1, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: [],
        subcorrelativas: []
      },
      { 
        id: 'MA008', 
        codigo: 'MA008',
        nombre: 'Elementos de Lógica y Matemática Discreta', 
        año: 1, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: [],
        subcorrelativas: []
      },
      
      // Segundo Año - 1° Cuatrimestre
      { 
        id: 'IF004', 
        codigo: 'IF004',
        nombre: 'Sistemas y Organizaciones', 
        año: 2, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: [],
        subcorrelativas: []
      },
      { 
        id: 'IF005', 
        codigo: 'IF005',
        nombre: 'Arquitectura de Computadoras', 
        año: 2, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: ['IF001'], // Requiere aprobar IF001
        subcorrelativas: []
      },
      { 
        id: 'IF006', 
        codigo: 'IF006',
        nombre: 'Algorítmica y Programación II', 
        año: 2, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: ['IF003'], // Requiere aprobar IF003
        subcorrelativas: ['MA008'] // Requiere cursar MA008
      },
      
      // Segundo Año - 2° Cuatrimestre
      { 
        id: 'IF007', 
        codigo: 'IF007',
        nombre: 'Bases de Datos I', 
        año: 2, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: ['IF006'], // Requiere aprobar IF006
        subcorrelativas: []
      },
      { 
        id: 'MA006', 
        codigo: 'MA006',
        nombre: 'Estadística', 
        año: 2, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: ['MA045'], // Requiere aprobar MA045
        subcorrelativas: ['MA046'] // Requiere cursar MA046
      },
      { 
        id: 'IF008', 
        codigo: 'IF008',
        nombre: 'Programación Orientada a Objetos', 
        año: 2, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: ['IF006'], // Requiere aprobar IF006
        subcorrelativas: []
      },
      
      // Tercer Año - 1° Cuatrimestre
      { 
        id: 'IF009', 
        codigo: 'IF009',
        nombre: 'Laboratorio de Programación y Lenguajes', 
        año: 3, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: ['IF008'], // Requiere aprobar IF008
        subcorrelativas: []
      },
      { 
        id: 'IF010', 
        codigo: 'IF010',
        nombre: 'Análisis y Diseño de Sistemas', 
        año: 3, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: ['IF004', 'IF007'], // Requiere aprobar IF004 e IF007
        subcorrelativas: []
      },
      { 
        id: 'IF011', 
        codigo: 'IF011',
        nombre: 'Sistemas Operativos', 
        año: 3, 
        cuatrimestre: 1, 
        creditos: 10, 
        correlativas: ['IF005', 'IF006'], // Requiere aprobar IF005 e IF006
        subcorrelativas: []
      },
      
      // Tercer Año - 2° Cuatrimestre
      { 
        id: 'IF012', 
        codigo: 'IF012',
        nombre: 'Desarrollo de Software', 
        año: 3, 
        cuatrimestre: 2, 
        creditos: 10, 
        correlativas: ['IF008', 'IF010'], // Requiere aprobar IF008 e IF010
        subcorrelativas: []
      }
    ],
    horarios: [
      { materia: 'Elementos de Informática', dia: 'Lunes', hora: '18:00-21:00', aula: 'Lab Info 1', profesor: 'Ing. Pérez' },
      { materia: 'Álgebra', dia: 'Martes', hora: '18:00-21:00', aula: 'Aula 15', profesor: 'Prof. González' },
      { materia: 'Expresión de Problemas y Algoritmos', dia: 'Miércoles', hora: '18:00-21:00', aula: 'Aula 12', profesor: 'Ing. Silva' },
      { materia: 'Algorítmica y Programación I', dia: 'Jueves', hora: '18:00-21:00', aula: 'Lab Info 2', profesor: 'Ing. Pérez' },
      { materia: 'Bases de Datos I', dia: 'Viernes', hora: '18:00-21:00', aula: 'Lab Info 1', profesor: 'Ing. Morales' }
    ],
    eventos: [
      { titulo: 'Hackathon UNPSJB', fecha: '2026-03-10', tipo: 'competencia', descripcion: 'Competencia de programación' },
      { titulo: 'Examen Final Programación', fecha: '2026-02-25', tipo: 'examen', descripcion: 'Examen final de Programación I' },
      { titulo: 'Charla Tecnologías Web', fecha: '2026-04-05', tipo: 'charla', descripcion: 'Charla sobre nuevas tecnologías web' }
    ]
  },

  enfermeria: {
    id: 'enfermeria',
    nombre: 'Enfermería',
    facultad: 'F.C.N y C.S',
    sedes: ['Comodoro Rivadavia', 'Trelew', 'Esquel'],
    duracion: '4 años',
    modalidad: 'Presencial',
    descripcion: 'Licenciatura en Enfermería orientada al cuidado integral de la salud',
    materias: [
      { id: 'fundamentos_enfermeria', nombre: 'Fundamentos de Enfermería', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'anatomia_enfermeria', nombre: 'Anatomía y Fisiología', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'microbiologia_enfermeria', nombre: 'Microbiología', año: 1, cuatrimestre: 2, creditos: 10, correlativas: [] },
      { id: 'enfermeria_medica', nombre: 'Enfermería Médica', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['fundamentos_enfermeria'] },
      { id: 'enfermeria_quirurgica', nombre: 'Enfermería Quirúrgica', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['enfermeria_medica'] },
      { id: 'enfermeria_pediatrica', nombre: 'Enfermería Pediátrica', año: 3, cuatrimestre: 1, creditos: 10, correlativas: ['enfermeria_quirurgica'] }
    ],
    horarios: [
      { materia: 'Fundamentos de Enfermería', dia: 'Lunes', hora: '08:00-12:00', aula: 'Aula 301', profesor: 'Lic. Fernández' },
      { materia: 'Anatomía y Fisiología', dia: 'Martes', hora: '14:00-18:00', aula: 'Lab Anatomía', profesor: 'Dr. Ruiz' },
      { materia: 'Microbiología', dia: 'Miércoles', hora: '08:00-12:00', aula: 'Lab Micro', profesor: 'Dra. Castro' }
    ],
    eventos: [
      { titulo: 'Jornadas de Enfermería', fecha: '2026-05-12', tipo: 'jornada', descripcion: 'Jornadas académicas de enfermería' },
      { titulo: 'Práctica Hospitalaria', fecha: '2026-03-01', tipo: 'practica', descripcion: 'Inicio de prácticas clínicas' }
    ]
  },

  geologia: {
    id: 'geologia',
    nombre: 'Geología',
    facultad: 'F.C.N y C.S',
    sedes: ['Comodoro Rivadavia'],
    duracion: '5 años',
    modalidad: 'Presencial',
    descripcion: 'Licenciatura en Geología con orientación en recursos naturales',
    materias: [
      { id: 'geologia_general', nombre: 'Geología General', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'matematica_geologia', nombre: 'Matemática', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'fisica_geologia', nombre: 'Física', año: 1, cuatrimestre: 2, creditos: 10, correlativas: [] },
      { id: 'mineralogia', nombre: 'Mineralogía', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['geologia_general'] },
      { id: 'petrologia', nombre: 'Petrología', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['mineralogia'] },
      { id: 'geologia_estructural', nombre: 'Geología Estructural', año: 3, cuatrimestre: 1, creditos: 10, correlativas: ['petrologia'] }
    ],
    horarios: [
      { materia: 'Geología General', dia: 'Lunes', hora: '14:00-18:00', aula: 'Aula Geo 1', profesor: 'Dr. Mendoza' },
      { materia: 'Matemática', dia: 'Martes', hora: '08:00-12:00', aula: 'Aula 20', profesor: 'Prof. Vargas' },
      { materia: 'Física', dia: 'Miércoles', hora: '14:00-18:00', aula: 'Lab Física', profesor: 'Dr. Herrera' }
    ],
    eventos: [
      { titulo: 'Campaña de Campo', fecha: '2026-04-15', tipo: 'campo', descripcion: 'Campaña de relevamiento geológico' },
      { titulo: 'Congreso Geológico', fecha: '2026-09-20', tipo: 'congreso', descripcion: 'Congreso argentino de geología' }
    ]
  },

  ingenieria_petroleo: {
    id: 'ingenieria_petroleo',
    nombre: 'Ingeniería en Petróleo',
    facultad: 'F.I.',
    sedes: ['Comodoro Rivadavia'],
    duracion: '5 años',
    modalidad: 'Presencial',
    descripcion: 'Ingeniería especializada en exploración y explotación petrolera',
    materias: [
      { id: 'matematica_ing', nombre: 'Análisis Matemático I', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'fisica_ing', nombre: 'Física I', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'quimica_ing', nombre: 'Química General', año: 1, cuatrimestre: 2, creditos: 10, correlativas: [] },
      { id: 'geologia_petroleo', nombre: 'Geología del Petróleo', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['quimica_ing'] },
      { id: 'perforacion', nombre: 'Perforación', año: 3, cuatrimestre: 1, creditos: 10, correlativas: ['geologia_petroleo'] },
      { id: 'produccion', nombre: 'Producción', año: 3, cuatrimestre: 2, creditos: 10, correlativas: ['perforacion'] }
    ],
    horarios: [
      { materia: 'Análisis Matemático I', dia: 'Lunes', hora: '08:00-12:00', aula: 'Aula 5', profesor: 'Dr. Acosta' },
      { materia: 'Física I', dia: 'Martes', hora: '14:00-18:00', aula: 'Lab Física', profesor: 'Ing. Torres' },
      { materia: 'Química General', dia: 'Miércoles', hora: '08:00-12:00', aula: 'Lab Química', profesor: 'Dra. Vega' }
    ],
    eventos: [
      { titulo: 'Visita a Yacimiento', fecha: '2026-05-10', tipo: 'visita', descripcion: 'Visita técnica a yacimiento petrolero' },
      { titulo: 'Simposio Petrolero', fecha: '2026-08-15', tipo: 'simposio', descripcion: 'Simposio de ingeniería petrolera' }
    ]
  },

  psicologia: {
    id: 'psicologia',
    nombre: 'Psicología',
    facultad: 'F.H y C.S',
    sedes: ['Comodoro Rivadavia', 'Trelew'],
    duracion: '5 años',
    modalidad: 'Presencial',
    descripcion: 'Licenciatura en Psicología con orientación clínica y social',
    materias: [
      { id: 'intro_psicologia', nombre: 'Introducción a la Psicología', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'neuroanatomia', nombre: 'Neuroanatomía', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'psicologia_general', nombre: 'Psicología General', año: 1, cuatrimestre: 2, creditos: 10, correlativas: ['intro_psicologia'] },
      { id: 'psicologia_evolutiva', nombre: 'Psicología Evolutiva', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['psicologia_general'] },
      { id: 'psicopatologia', nombre: 'Psicopatología', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['psicologia_evolutiva'] },
      { id: 'psicologia_clinica', nombre: 'Psicología Clínica', año: 3, cuatrimestre: 1, creditos: 10, correlativas: ['psicopatologia'] }
    ],
    horarios: [
      { materia: 'Introducción a la Psicología', dia: 'Lunes', hora: '18:00-22:00', aula: 'Aula 8', profesor: 'Lic. Moreno' },
      { materia: 'Neuroanatomía', dia: 'Martes', hora: '18:00-22:00', aula: 'Lab Neuro', profesor: 'Dr. Blanco' },
      { materia: 'Psicología General', dia: 'Miércoles', hora: '18:00-22:00', aula: 'Aula 10', profesor: 'Lic. Díaz' }
    ],
    eventos: [
      { titulo: 'Jornadas de Psicología', fecha: '2026-06-05', tipo: 'jornada', descripcion: 'Jornadas de psicología clínica' },
      { titulo: 'Práctica Profesional', fecha: '2026-03-15', tipo: 'practica', descripcion: 'Inicio de prácticas profesionales' }
    ]
  },

  trabajo_social: {
    id: 'trabajo_social',
    nombre: 'Trabajo Social',
    facultad: 'F.H y C.S',
    sedes: ['Comodoro Rivadavia'],
    duracion: '4 años',
    modalidad: 'Presencial',
    descripcion: 'Licenciatura en Trabajo Social orientada a la intervención social',
    materias: [
      { id: 'intro_trabajo_social', nombre: 'Introducción al Trabajo Social', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'sociologia', nombre: 'Sociología', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'antropologia', nombre: 'Antropología', año: 1, cuatrimestre: 2, creditos: 10, correlativas: [] },
      { id: 'metodologia_intervencion', nombre: 'Metodología de Intervención', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['intro_trabajo_social'] },
      { id: 'politicas_sociales', nombre: 'Políticas Sociales', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['sociologia'] },
      { id: 'trabajo_social_comunitario', nombre: 'Trabajo Social Comunitario', año: 3, cuatrimestre: 1, creditos: 10, correlativas: ['metodologia_intervencion'] }
    ],
    horarios: [
      { materia: 'Introducción al Trabajo Social', dia: 'Lunes', hora: '18:00-22:00', aula: 'Aula 25', profesor: 'Lic. Ramos' },
      { materia: 'Sociología', dia: 'Martes', hora: '18:00-22:00', aula: 'Aula 26', profesor: 'Dr. Sánchez' },
      { materia: 'Antropología', dia: 'Miércoles', hora: '18:00-22:00', aula: 'Aula 27', profesor: 'Lic. Ortega' }
    ],
    eventos: [
      { titulo: 'Congreso de Trabajo Social', fecha: '2026-07-20', tipo: 'congreso', descripcion: 'Congreso nacional de trabajo social' },
      { titulo: 'Práctica Comunitaria', fecha: '2026-04-01', tipo: 'practica', descripcion: 'Práctica en organizaciones comunitarias' }
    ]
  },

  turismo: {
    id: 'turismo',
    nombre: 'Turismo',
    facultad: 'F.H y C.S',
    sedes: ['Puerto Madryn', 'Ushuaia'],
    duracion: '4 años',
    modalidad: 'Presencial',
    descripcion: 'Licenciatura en Turismo con orientación en gestión y desarrollo turístico',
    materias: [
      { id: 'intro_turismo', nombre: 'Introducción al Turismo', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'geografia_turistica', nombre: 'Geografía Turística', año: 1, cuatrimestre: 1, creditos: 10, correlativas: [] },
      { id: 'historia_argentina', nombre: 'Historia Argentina', año: 1, cuatrimestre: 2, creditos: 10, correlativas: [] },
      { id: 'gestion_turistica', nombre: 'Gestión Turística', año: 2, cuatrimestre: 1, creditos: 10, correlativas: ['intro_turismo'] },
      { id: 'marketing_turistico', nombre: 'Marketing Turístico', año: 2, cuatrimestre: 2, creditos: 10, correlativas: ['gestion_turistica'] },
      { id: 'desarrollo_sustentable', nombre: 'Desarrollo Sustentable', año: 3, cuatrimestre: 1, creditos: 10, correlativas: ['marketing_turistico'] }
    ],
    horarios: [
      { materia: 'Introducción al Turismo', dia: 'Lunes', hora: '14:00-18:00', aula: 'Aula Turismo 1', profesor: 'Lic. Navarro' },
      { materia: 'Geografía Turística', dia: 'Martes', hora: '14:00-18:00', aula: 'Aula 30', profesor: 'Prof. Campos' },
      { materia: 'Historia Argentina', dia: 'Miércoles', hora: '14:00-18:00', aula: 'Aula 31', profesor: 'Dr. Molina' }
    ],
    eventos: [
      { titulo: 'Feria de Turismo', fecha: '2026-09-15', tipo: 'feria', descripcion: 'Feria internacional de turismo' },
      { titulo: 'Viaje de Estudios', fecha: '2026-05-20', tipo: 'viaje', descripcion: 'Viaje de estudios a destinos turísticos' }
    ]
  }
};

// Función para obtener datos de una carrera específica
export const getCarreraData = (carreraId) => {
  return carrerasData[carreraId] || null;
};

// Función para obtener materias de una carrera
export const getMateriasByCarrera = (carreraId) => {
  const carrera = carrerasData[carreraId];
  return carrera ? carrera.materias : [];
};

// Función para obtener horarios de una carrera
export const getHorariosByCarrera = (carreraId) => {
  const carrera = carrerasData[carreraId];
  return carrera ? carrera.horarios : [];
};

// Función para obtener eventos de una carrera
export const getEventosByCarrera = (carreraId) => {
  const carrera = carrerasData[carreraId];
  return carrera ? carrera.eventos : [];
};

// Función para filtrar contenido por carrera y sede
export const getFilteredContent = (carreraId, sede = null) => {
  const carrera = carrerasData[carreraId];
  if (!carrera) return null;

  // Si se especifica una sede, verificar que la carrera esté disponible en esa sede
  if (sede && !carrera.sedes.includes(sede)) {
    return null;
  }

  return {
    ...carrera,
    // Filtrar horarios por sede si es necesario
    horarios: carrera.horarios,
    // Filtrar eventos por sede si es necesario
    eventos: carrera.eventos
  };
};

export default carrerasData;