/**
 * Utilidades para validar correlativas y subcorrelativas
 */

/**
 * Verifica si una materia puede ser cursada según las correlativas
 * @param {Object} materia - La materia a verificar
 * @param {Object} materiasEstado - Estado de todas las materias del usuario {materiaId: {status, nota}}
 * @param {Array} todasMaterias - Array con todas las materias de la carrera
 * @returns {Object} {puedeCursar: boolean, razon: string, faltantes: Array}
 */
export const puedeCursarMateria = (materia, materiasEstado, todasMaterias) => {
    // Si no tiene correlativas ni subcorrelativas, puede cursarla
    if ((!materia.correlativas || materia.correlativas.length === 0) && 
        (!materia.subcorrelativas || materia.subcorrelativas.length === 0)) {
        return { puedeCursar: true, razon: '', faltantes: [] };
    }

    const faltantes = [];

    // 1. Verificar CORRELATIVAS (deben estar APROBADAS - final rendido)
    if (materia.correlativas && materia.correlativas.length > 0) {
        for (const correlativaId of materia.correlativas) {
            const estadoCorrelativa = materiasEstado[correlativaId];
            
            // Si no está aprobada, no puede cursar
            if (!estadoCorrelativa || estadoCorrelativa.status !== 'aprobada') {
                const materiaCorrelativa = todasMaterias.find(m => m.id === correlativaId);
                faltantes.push({
                    tipo: 'correlativa',
                    materia: materiaCorrelativa?.nombre || correlativaId,
                    codigo: materiaCorrelativa?.codigo || correlativaId,
                    requerimiento: 'Debe estar APROBADA (final rendido)'
                });
            }
        }
    }

    // 2. Verificar SUBCORRELATIVAS (deben estar al menos CURSADAS)
    if (materia.subcorrelativas && materia.subcorrelativas.length > 0) {
        for (const subcorrelativaId of materia.subcorrelativas) {
            const estadoSubcorrelativa = materiasEstado[subcorrelativaId];
            
            // Si no está al menos cursada, no puede cursar
            if (!estadoSubcorrelativa || 
                (estadoSubcorrelativa.status !== 'cursada' && estadoSubcorrelativa.status !== 'aprobada')) {
                const materiaSubcorrelativa = todasMaterias.find(m => m.id === subcorrelativaId);
                faltantes.push({
                    tipo: 'subcorrelativa',
                    materia: materiaSubcorrelativa?.nombre || subcorrelativaId,
                    codigo: materiaSubcorrelativa?.codigo || subcorrelativaId,
                    requerimiento: 'Debe estar al menos CURSADA'
                });
            }
        }
    }

    // Si hay faltantes, no puede cursar
    if (faltantes.length > 0) {
        const razon = generarMensajeBloqueo(faltantes);
        return { puedeCursar: false, razon, faltantes };
    }

    return { puedeCursar: true, razon: '', faltantes: [] };
};

/**
 * Genera un mensaje descriptivo de por qué está bloqueada la materia
 */
const generarMensajeBloqueo = (faltantes) => {
    const correlativas = faltantes.filter(f => f.tipo === 'correlativa');
    const subcorrelativas = faltantes.filter(f => f.tipo === 'subcorrelativa');

    let mensaje = 'No puedes cursar esta materia porque:\n\n';

    if (correlativas.length > 0) {
        mensaje += '📕 Correlativas faltantes (deben estar APROBADAS):\n';
        correlativas.forEach(f => {
            mensaje += `  • ${f.codigo} - ${f.materia}\n`;
        });
    }

    if (subcorrelativas.length > 0) {
        if (correlativas.length > 0) mensaje += '\n';
        mensaje += '📘 Subcorrelativas faltantes (deben estar CURSADAS):\n';
        subcorrelativas.forEach(f => {
            mensaje += `  • ${f.codigo} - ${f.materia}\n`;
        });
    }

    return mensaje;
};

/**
 * Obtiene el estado de bloqueo de una materia
 * @param {Object} materia - La materia a verificar
 * @param {Object} materiasEstado - Estado de todas las materias
 * @param {Array} todasMaterias - Array con todas las materias
 * @returns {Object} {bloqueada: boolean, razon: string, tipo: string}
 */
export const getEstadoBloqueo = (materia, materiasEstado, todasMaterias) => {
    const estadoActual = materiasEstado[materia.id];

    // Si ya está aprobada o cursada, no está bloqueada
    if (estadoActual && (estadoActual.status === 'aprobada' || estadoActual.status === 'cursada')) {
        return { bloqueada: false, razon: '', tipo: '' };
    }

    // Verificar si puede cursarla
    const resultado = puedeCursarMateria(materia, materiasEstado, todasMaterias);

    if (!resultado.puedeCursar) {
        return {
            bloqueada: true,
            razon: resultado.razon,
            tipo: 'correlativas',
            faltantes: resultado.faltantes
        };
    }

    return { bloqueada: false, razon: '', tipo: '' };
};

/**
 * Obtiene todas las materias que están bloqueadas
 */
export const getMateriasBloquedas = (todasMaterias, materiasEstado) => {
    return todasMaterias.filter(materia => {
        const estado = getEstadoBloqueo(materia, materiasEstado, todasMaterias);
        return estado.bloqueada;
    });
};

/**
 * Obtiene todas las materias disponibles para cursar
 */
export const getMateriasDisponibles = (todasMaterias, materiasEstado) => {
    return todasMaterias.filter(materia => {
        const estadoActual = materiasEstado[materia.id];
        
        // Si ya está aprobada o cursada, no está disponible
        if (estadoActual && (estadoActual.status === 'aprobada' || estadoActual.status === 'cursada')) {
            return false;
        }

        // Verificar si puede cursarla
        const resultado = puedeCursarMateria(materia, materiasEstado, todasMaterias);
        return resultado.puedeCursar;
    });
};

/**
 * Obtiene información resumida de correlativas para mostrar en la UI
 */
export const getInfoCorrelativas = (materia, todasMaterias) => {
    const info = {
        tieneCorrelativas: false,
        correlativas: [],
        subcorrelativas: []
    };

    if (materia.correlativas && materia.correlativas.length > 0) {
        info.tieneCorrelativas = true;
        info.correlativas = materia.correlativas.map(id => {
            const m = todasMaterias.find(mat => mat.id === id);
            return {
                id,
                codigo: m?.codigo || id,
                nombre: m?.nombre || id
            };
        });
    }

    if (materia.subcorrelativas && materia.subcorrelativas.length > 0) {
        info.tieneCorrelativas = true;
        info.subcorrelativas = materia.subcorrelativas.map(id => {
            const m = todasMaterias.find(mat => mat.id === id);
            return {
                id,
                codigo: m?.codigo || id,
                nombre: m?.nombre || id
            };
        });
    }

    return info;
};
