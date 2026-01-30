export const PLAN_MEDICINA_NUEVO = [
    {
        anio: 1,
        materias: [
            { id: 1, nombre: 'Biología', cuatrimestre: '1°C', horas: 105, correlativas: [] },
            { id: 2, nombre: 'Comprensión de Textos', cuatrimestre: '1°C', horas: 90, correlativas: [] },
            { id: 3, nombre: 'Anatomía I', cuatrimestre: '1°C', horas: 90, correlativas: [] },
            { id: 4, nombre: 'Histología y Embriología I', cuatrimestre: '1°C', horas: 90, correlativas: [] },
            { id: 5, nombre: 'Biofísica', cuatrimestre: '2°C', horas: 105, correlativas: [1, 2, 3] },
            { id: 6, nombre: 'Anatomía II', cuatrimestre: '2°C', horas: 90, correlativas: [1, 3, 4] },
            { id: 7, nombre: 'Histología y Embriología II', cuatrimestre: '2°C', horas: 90, correlativas: [1, 3, 4] },
            { id: 8, nombre: 'Ciencias Sociales y Medicina', cuatrimestre: '2°C', horas: 75, correlativas: [2] },
        ]
    },
    {
        anio: 2,
        materias: [
            { id: 9, nombre: 'Bioquímica', cuatrimestre: 'Anual', horas: 180, correlativas: [5, 6, 7] },
            { id: 10, nombre: 'Fisiología', cuatrimestre: 'Anual', horas: 240, correlativas: [5, 6, 7] },
            { id: 11, nombre: 'Genética', cuatrimestre: '1°C', horas: 90, correlativas: [6, 7] },
            { id: 12, nombre: 'Inmunología', cuatrimestre: '1°C', horas: 75, correlativas: [6, 7] },
            { id: 13, nombre: 'Salud de la Comunidad', cuatrimestre: '1°C', horas: 75, correlativas: [8] },
            { id: 14, nombre: 'Inglés Médico', cuatrimestre: '2°C', horas: 60, correlativas: [2, 11] },
            { id: 15, nombre: 'Microbiología', cuatrimestre: '2°C', horas: 90, correlativas: [11, 12] },
            { id: 16, nombre: 'Bioestadística', cuatrimestre: '2°C', horas: 90, correlativas: [5] },
        ]
    },
    {
        anio: 3,
        materias: [
            { id: 17, nombre: 'Patología', cuatrimestre: 'Anual', horas: 150, correlativas: [9, 10, 11, 12] },
            { id: 18, nombre: 'Semiología', cuatrimestre: 'Anual', horas: 240, correlativas: [9, 10, 11, 15] },
            { id: 19, nombre: 'Farmacología', cuatrimestre: 'Anual', horas: 210, correlativas: [9, 10, 12, 15] },
            { id: 20, nombre: 'Investigación en Salud y Bioética', cuatrimestre: '1°C', horas: 75, correlativas: [13, 14, 16] },
            { id: 21, nombre: 'Epidemiología', cuatrimestre: '1°C', horas: 75, correlativas: [13, 15, 16] },
            { id: 22, nombre: 'Planificación de la Salud', cuatrimestre: '2°C', horas: 75, correlativas: [21] },
            { id: 23, nombre: 'Diagnóstico por Imágenes', cuatrimestre: '2°C', horas: 75, correlativas: [10] },
        ]
    },
    {
        anio: 4,
        materias: [
            { id: 24, nombre: 'Clínica Médica I', cuatrimestre: 'Anual', horas: 240, correlativas: [17, 18, 19, 23] },
            { id: 25, nombre: 'Promoción de la Salud', cuatrimestre: '1°C', horas: 105, correlativas: [20, 21, 22] },
            { id: 26, nombre: 'Traumatología y Ortopedia', cuatrimestre: '1°C', horas: 60, correlativas: [17, 18, 19, 23] },
            { id: 27, nombre: 'Medicina Legal y Deontología', cuatrimestre: '1°C', horas: 60, correlativas: [17, 20, 21] },
            { id: 28, nombre: 'Infectología', cuatrimestre: '2°C', horas: 75, correlativas: [17, 18, 19, 21] },
            { id: 29, nombre: 'Neurología', cuatrimestre: '2°C', horas: 105, correlativas: [18, 19] },
            { id: 30, nombre: 'Salud Mental', cuatrimestre: '2°C', horas: 105, correlativas: [18, 19] },
        ]
    },
    {
        anio: 5,
        materias: [
            { id: 31, nombre: 'Clínica Médica II', cuatrimestre: 'Anual', horas: 240, correlativas: [24, 28, 29, 30] },
            { id: 32, nombre: 'Cirugía', cuatrimestre: 'Anual', horas: 150, correlativas: [24, 26, 27, 28] },
            { id: 33, nombre: 'Pediatría', cuatrimestre: 'Anual', horas: 150, correlativas: [24, 26, 28] },
            { id: 34, nombre: 'Emergentología', cuatrimestre: '1°C', horas: 105, correlativas: [24, 26, 27, 29] },
            { id: 35, nombre: 'Ginecología', cuatrimestre: '1°C', horas: 105, correlativas: [24, 27] },
            { id: 36, nombre: 'Obstetricia', cuatrimestre: '2°C', horas: 75, correlativas: [30, 35] },
            { id: 37, nombre: 'Medicina General', cuatrimestre: '2°C', horas: 75, correlativas: [25, 28, 34] },
        ]
    },
    {
        anio: 6,
        nombre: 'PFO (Práctica Final Obligatoria)',
        materias: [
            { id: 38, nombre: 'Clínica Médica', cuatrimestre: 'Rotación', horas: 640, correlativas: [] },
            { id: 39, nombre: 'Clínica Quirúrgica', cuatrimestre: 'Rotación', horas: 320, correlativas: [] },
            { id: 40, nombre: 'Clínica Pediátrica', cuatrimestre: 'Rotación', horas: 320, correlativas: [] },
            { id: 41, nombre: 'Clínica Gineco-Obstétrica', cuatrimestre: 'Rotación', horas: 320, correlativas: [] },
            { id: 42, nombre: 'Medicina General y Rural', cuatrimestre: 'Rotación', horas: 320, correlativas: [] },
        ]
    }
];

export const PLAN_MEDICINA_VIEJO = [
    {
        anio: 1,
        materias: [
            { id: 'v1', nombre: 'Matemática', cuatrimestre: '1°C', horas: 100, correlativas: [] },
            { id: 'v2', nombre: 'Biofísica', cuatrimestre: '1°C', horas: 100, correlativas: [] },
            { id: 'v3', nombre: 'Comprensión de Textos', cuatrimestre: '1°C', horas: 90, correlativas: [] },
            { id: 'v4', nombre: 'Biología', cuatrimestre: '1°C', horas: 100, correlativas: [] },
            { id: 'v5', nombre: 'Investigación en Salud y Bioética', cuatrimestre: '2°C', horas: 70, correlativas: ['v3', 'v4'] },
            { id: 'v6', nombre: 'Bioquímica General', cuatrimestre: '2°C', horas: 90, correlativas: ['v4'] },
            { id: 'v7', nombre: 'Anatomía Funcional', cuatrimestre: '2°C', horas: 140, correlativas: ['v2', 'v3'] },
            { id: 'v8', nombre: 'Histología y Embriología', cuatrimestre: '2°C', horas: 120, correlativas: ['v3', 'v4'] },
        ]
    },
    {
        anio: 2,
        materias: [
            { id: 'v9', nombre: 'Fisiología', cuatrimestre: '1°C', horas: 120, correlativas: ['v7', 'v8'] },
            { id: 'v10', nombre: 'Bioquímica Metabólica', cuatrimestre: '1°C', horas: 100, correlativas: ['v6'] },
            { id: 'v11', nombre: 'Ciencias Sociales y Medicina', cuatrimestre: '1°C', horas: 40, correlativas: ['v5'] },
            { id: 'v12', nombre: 'Microbiología', cuatrimestre: '1°C', horas: 80, correlativas: ['v6'] },
            { id: 'v13', nombre: 'Inmunología', cuatrimestre: '2°C', horas: 50, correlativas: ['v9', 'v10', 'v12'] },
            { id: 'v14', nombre: 'Genética', cuatrimestre: '2°C', horas: 50, correlativas: ['v9', 'v10'] },
            { id: 'v15', nombre: 'Salud de la Comunidad', cuatrimestre: '2°C', horas: 40, correlativas: ['v11'] },
            { id: 'v16', nombre: 'Neurociencias', cuatrimestre: '2°C', horas: 150, correlativas: ['v9', 'v10'] },
        ]
    },
    {
        anio: 3,
        materias: [
            { id: 'v17', nombre: 'Patología', cuatrimestre: 'Anual', horas: 150, correlativas: ['v13'] },
            { id: 'v18', nombre: 'Semiología', cuatrimestre: 'Anual', horas: 280, correlativas: ['v13', 'v16'] },
            { id: 'v19', nombre: 'Farmacología Básica y Clínica', cuatrimestre: 'Anual', horas: 120, correlativas: ['v13', 'v14'] },
            { id: 'v20', nombre: 'Epidemiología', cuatrimestre: '1°C', horas: 50, correlativas: ['v15'] },
            { id: 'v21', nombre: 'Planificación de la Salud', cuatrimestre: '2°C', horas: 30, correlativas: ['v20'] },
            { id: 'v22', nombre: 'Taller de Integración Vertical', cuatrimestre: 'Anual', horas: 96, correlativas: ['v17', 'v18', 'v19', 'v21'] },
        ]
    },
    {
        anio: 4,
        materias: [
            { id: 'v23a', nombre: 'Medicina Interna I', cuatrimestre: 'Anual', horas: 220, correlativas: ['v22'] },
            { id: 'v23b', nombre: 'Infectología', cuatrimestre: 'Anual', horas: 60, correlativas: ['v22'] },
            { id: 'v24', nombre: 'Pediatría I', cuatrimestre: 'Anual', horas: 60, correlativas: ['v22'] },
            { id: 'v25a', nombre: 'Clínica Quirúrgica I', cuatrimestre: 'Anual', horas: 60, correlativas: ['v22'] },
            { id: 'v25b', nombre: 'Otorrinolaringología', cuatrimestre: 'Anual', horas: 20, correlativas: ['v22'] },
            { id: 'v25c', nombre: 'Urología', cuatrimestre: 'Anual', horas: 20, correlativas: ['v22'] },
            { id: 'v25d', nombre: 'Ortopedia y Traumatología', cuatrimestre: 'Anual', horas: 20, correlativas: ['v22'] },
            { id: 'v25e', nombre: 'Diagnóstico por Imágenes I', cuatrimestre: 'Anual', horas: 40, correlativas: ['v22'] },
            { id: 'v26', nombre: 'Toxicología', cuatrimestre: '1°C', horas: 20, correlativas: ['v17', 'v8', 'v19'] },
            { id: 'v27', nombre: 'Promoción de la Salud', cuatrimestre: '1°C', horas: 20, correlativas: ['v21'] },
            { id: 'v28', nombre: 'Obstetricia', cuatrimestre: '1°C', horas: 20, correlativas: ['v22'] },
            { id: 'v29', nombre: 'Emergentología', cuatrimestre: '2°C', horas: 60, correlativas: ['v22'] },
            { id: 'v30', nombre: 'Salud Pública I', cuatrimestre: '2°C', horas: 40, correlativas: ['v27'] },
        ]
    },
    {
        anio: 5,
        materias: [
            { id: 'v31a', nombre: 'Medicina Interna II', cuatrimestre: 'Anual', horas: 220, correlativas: ['v23', 'v24', 'v25', 'v26'] },
            { id: 'v31b', nombre: 'Neurología', cuatrimestre: 'Anual', horas: 20, correlativas: ['v23', 'v24', 'v25', 'v26'] },
            { id: 'v31c', nombre: 'Psiquiatría', cuatrimestre: 'Anual', horas: 20, correlativas: ['v23', 'v24', 'v25', 'v26'] },
            { id: 'v31d', nombre: 'Dermatología', cuatrimestre: 'Anual', horas: 20, correlativas: ['v23', 'v24', 'v25', 'v26'] },
            { id: 'v31e', nombre: 'Oftalmología', cuatrimestre: 'Anual', horas: 20, correlativas: ['v23', 'v24', 'v25', 'v26'] },
            { id: 'v31f', nombre: 'Diagnóstico por Imágenes II', cuatrimestre: 'Anual', horas: 80, correlativas: ['v23', 'v24', 'v25', 'v26'] },
            { id: 'v32', nombre: 'Cirugía II', cuatrimestre: 'Anual', horas: 80, correlativas: ['v23', 'v24', 'v25', 'v29'] },
            { id: 'v33', nombre: 'Pediatría II', cuatrimestre: 'Anual', horas: 80, correlativas: ['v23', 'v24', 'v25'] },
            { id: 'v34', nombre: 'Ginecología', cuatrimestre: '1°C', horas: 80, correlativas: ['v28'] },
            { id: 'v35', nombre: 'Deontología Médica y Legal', cuatrimestre: '2°C', horas: 20, correlativas: ['v30'] },
            { id: 'v36', nombre: 'Salud Pública II', cuatrimestre: '2°C', horas: 40, correlativas: ['v30'] },
        ]
    },
    {
        anio: 6,
        nombre: 'PFO (Práctica Final Obligatoria)',
        materias: [
            { id: 'v37', nombre: 'Clínica Médica', cuatrimestre: 'Cuatrimestral', horas: 640, correlativas: [] },
            { id: 'v38', nombre: 'Cirugía', cuatrimestre: 'Bimestral', horas: 320, correlativas: [] },
            { id: 'v39', nombre: 'Pediatría', cuatrimestre: 'Bimestral', horas: 320, correlativas: [] },
            { id: 'v40', nombre: 'Tocoginecología', cuatrimestre: 'Bimestral', horas: 320, correlativas: [] },
        ]
    }
];

export const PLAN_APU = [
    {
        anio: 1,
        materias: [
            { id: 'IF001', nombre: 'Elementos de informática', cuatrimestre: '1°C', horas: 105, correlativas: [] },
            { id: 'MA045', nombre: 'Álgebra', cuatrimestre: '1°C', horas: 135, correlativas: [] },
            { id: 'IF002', nombre: 'Expresión de Problemas y Algoritmos', cuatrimestre: '1°C', horas: 90, correlativas: [] },
            { id: 'IF003', nombre: 'Algorítmica y Programación I', cuatrimestre: '2°C', horas: 120, correlativas: ['IF002'] },
            { id: 'MA046', nombre: 'Análisis Matemático', cuatrimestre: '2°C', horas: 150, correlativas: [] },
            { id: 'MA008', nombre: 'Lógica y Matemática Discreta', cuatrimestre: '2°C', horas: 120, correlativas: [] },
        ]
    },
    {
        anio: 2,
        materias: [
            { id: 'IF004', nombre: 'Sistemas y Organizaciones', cuatrimestre: '1°C', horas: 90, correlativas: [] },
            { id: 'IF005', nombre: 'Arquitectura de Computadoras', cuatrimestre: '1°C', horas: 120, correlativas: ['IF001'] },
            { id: 'IF006', nombre: 'Algorítmica y Programación II', cuatrimestre: '1°C', horas: 120, correlativas: ['IF003', 'MA008'] },
            { id: 'IF007', nombre: 'Bases de Datos I', cuatrimestre: '2°C', horas: 135, correlativas: ['IF006'] },
            { id: 'MA006', nombre: 'Estadística', cuatrimestre: '2°C', horas: 90, correlativas: ['MA045', 'MA046'] },
            { id: 'IF008', nombre: 'Programación Orientada a Objetos', cuatrimestre: '2°C', horas: 120, correlativas: ['IF006'] },
        ]
    },
    {
        anio: 3,
        materias: [
            { id: 'IF009', nombre: 'Laboratorio de Programación y Lenguajes', cuatrimestre: '1°C', horas: 90, correlativas: ['IF008'] },
            { id: 'IF010', nombre: 'Análisis y Diseño de Sistemas', cuatrimestre: '1°C', horas: 135, correlativas: ['IF004', 'IF007'] },
            { id: 'IF011', nombre: 'Sistemas Operativos', cuatrimestre: '1°C', horas: 150, correlativas: ['IF005', 'IF006'] },
            { id: 'IF012', nombre: 'Desarrollo de Software', cuatrimestre: '2°C', horas: 135, correlativas: ['IF008', 'IF010'] },
        ]
    },
    {
        anio: 'Requisitos',
        nombre: 'Otros Requisitos',
        materias: [
            { id: 'FA007', nombre: 'Acreditación de Idioma Inglés', cuatrimestre: '-', horas: 0, correlativas: [] },
            { id: 'FA102', nombre: 'Estrategias Comunicacionales', cuatrimestre: '-', horas: 0, correlativas: ['10 Asignaturas'] },
        ]
    }
];
