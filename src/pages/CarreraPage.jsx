import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { PLAN_MEDICINA_NUEVO, PLAN_MEDICINA_VIEJO, PLAN_APU } from '../data/planes';
import { getCarreraData, getMateriasByCarrera } from '../data/carreras';
import StatusBadge from '../components/StatusBadge';
import NotaModal from '../components/NotaModal';
import { materiasService, authService } from '../lib/auth-service';

const CarreraPage = ({ carrera, onStatsUpdate }) => {
    const isMedicina = carrera === 'medicina';
    const storageKey = `avance_${carrera}`;
    const prefPlanKey = `plan_preferido_${carrera}`;

    // Obtener datos específicos de la carrera
    const carreraData = getCarreraData(carrera);
    const materiasByCarrera = getMateriasByCarrera(carrera);

    const [selectedPlanId, setSelectedPlanId] = useState('nuevo');
    const [materiasEstado, setMateriasEstado] = useState({});
    const [showPlanMenu, setShowPlanMenu] = useState(false);
    const [modalData, setModalData] = useState({ isOpen: false, materiaId: null, materiaNombre: '' });

    useEffect(() => {
        const savedPlanId = localStorage.getItem(prefPlanKey);
        if (savedPlanId) setSelectedPlanId(savedPlanId);

        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                setMateriasEstado(JSON.parse(saved));
            } catch (error) {
                console.error('Error parsing localStorage:', error);
            }
        }

        loadMateriasFromSupabase();
    }, [carrera]);

    const loadMateriasFromSupabase = async () => {
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                console.log('No hay usuario autenticado, usando solo localStorage');
                return;
            }

            console.log('Cargando materias desde Supabase para usuario:', user.uid);
            const materias = await materiasService.getMaterias(user.uid);
            console.log('Materias cargadas:', materias);

            const estadoMap = {};
            if (materias && materias.length > 0) {
                materias.forEach(materia => {
                    estadoMap[materia.materia_id] = {
                        status: materia.status,
                        nota: materia.nota,
                        modalidad: materia.modalidad,
                        updatedAt: materia.updated_at
                    };
                });
                setMateriasEstado(prev => ({ ...prev, ...estadoMap }));
            }
        } catch (error) {
            console.warn('⚠️ Supabase no disponible, usando solo localStorage:', error.message);
            // No hacer nada, seguir usando localStorage
        }
    };

    const changePlan = (planId) => {
        setSelectedPlanId(planId);
        localStorage.setItem(prefPlanKey, planId);
        setShowPlanMenu(false);
    };

    const toggleStatus = (id, materiaNombre) => {
        const currentStatus = materiasEstado[id]?.status || 'pendiente';

        if (currentStatus === 'pendiente') {
            // Cambiar a cursada
            updateMateriaStatus(id, 'cursada');
        } else if (currentStatus === 'cursada') {
            // Abrir modal para aprobar
            setModalData({
                isOpen: true,
                materiaId: id,
                materiaNombre: materiaNombre
            });
        } else {
            // Volver a pendiente
            updateMateriaStatus(id, 'pendiente');
        }
    };

    const updateMateriaStatus = (id, status, nota = null, modalidad = null) => {
        setMateriasEstado(prev => {
            const newState = {
                ...prev,
                [id]: {
                    status,
                    nota,
                    modalidad,
                    updatedAt: new Date().toISOString()
                }
            };
            localStorage.setItem(storageKey, JSON.stringify(newState));
            return newState;
        });

        saveToSupabase(id, status, nota, modalidad);
    };

    const saveToSupabase = async (materiaId, status, nota, modalidad) => {
        try {
            const user = await authService.getCurrentUser();
            if (!user) return;
            await materiasService.upsertMateriaStatus(user.uid, materiaId, status, nota, modalidad);

            // Recargar estadísticas después de guardar
            if (onStatsUpdate) {
                await onStatsUpdate();
            }
        } catch (error) {
            console.warn('⚠️ No se pudo guardar en Supabase, solo guardado localmente:', error.message);
        }
    };

    const handleNotaModalSave = (nota, modalidad) => {
        updateMateriaStatus(modalData.materiaId, 'aprobada', nota, modalidad);
        setModalData({ isOpen: false, materiaId: null, materiaNombre: '' });
    };

    const handleNotaModalClose = () => {
        setModalData({ isOpen: false, materiaId: null, materiaNombre: '' });
    };

    // Configuración de planes según carrera
    let currentPlanData = [];
    let planNameDisplay = '';
    let availablePlans = [];

    if (carreraData && materiasByCarrera.length > 0) {
        // Usar datos de la nueva estructura de carreras
        const materiasPorAño = {};
        materiasByCarrera.forEach(materia => {
            if (!materiasPorAño[materia.año]) {
                materiasPorAño[materia.año] = [];
            }
            materiasPorAño[materia.año].push({
                id: materia.id,
                nombre: materia.nombre,
                cuatrimestre: `${materia.cuatrimestre}° Cuatrimestre`,
                horas: 0, // No especificado en la nueva estructura
                creditos: materia.creditos
            });
        });

        currentPlanData = Object.keys(materiasPorAño)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(año => ({
                anio: parseInt(año),
                nombre: `${año}° Año`,
                materias: materiasPorAño[año]
            }));

        planNameDisplay = `Plan ${carreraData.nombre}`;
        availablePlans = []; // Por ahora no hay planes alternativos para las nuevas carreras
    } else if (isMedicina) {
        // Fallback a la estructura anterior para medicina
        currentPlanData = selectedPlanId === 'nuevo' ? PLAN_MEDICINA_NUEVO : PLAN_MEDICINA_VIEJO;
        planNameDisplay = selectedPlanId === 'nuevo' ? 'Plan 2025' : 'Plan Viejo';
        availablePlans = [
            { id: 'nuevo', label: 'Plan 2025' },
            { id: 'viejo', label: 'Plan Viejo' }
        ];
    } else {
        // Fallback para otras carreras
        currentPlanData = PLAN_APU;
        planNameDisplay = 'Plan APU 2010';
        availablePlans = [];
    }

    const totalMaterias = currentPlanData.reduce((acc, year) => acc + year.materias.length, 0);
    const allIdsInPlan = currentPlanData.flatMap(y => y.materias.map(m => m.id));

    // Contar aprobadas y calcular promedio
    const materiasAprobadas = Object.keys(materiasEstado).filter(id => {
        const materia = materiasEstado[id];
        return materia?.status === 'aprobada' && allIdsInPlan.some(planId => String(planId) === String(id));
    });

    const aprobadas = materiasAprobadas.length;
    const creditosObtenidos = aprobadas * 10; // 10 créditos por materia

    // Calcular promedio real
    const notasAprobadas = materiasAprobadas
        .map(id => materiasEstado[id]?.nota)
        .filter(nota => nota && !isNaN(nota));

    const promedioReal = notasAprobadas.length > 0
        ? (notasAprobadas.reduce((sum, nota) => sum + nota, 0) / notasAprobadas.length).toFixed(2)
        : 0;

    const porcentaje = totalMaterias > 0 ? Math.round((aprobadas / totalMaterias) * 100) : 0;
    const careerTitle = carreraData ? carreraData.nombre : (isMedicina ? 'Medicina' : 'Analista Programador');

    // Si no hay datos de la carrera, mostrar mensaje
    if (!carreraData && !isMedicina && carrera !== 'informatica') {
        return (
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}>
                        <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Volver
                    </Link>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Carrera no encontrada</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        La carrera "{carrera}" no está disponible o no tienes acceso a ella.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}>
                    <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Volver
                </Link>

                {availablePlans.length > 0 ? (
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setShowPlanMenu(!showPlanMenu)} style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', background: 'var(--background-secondary)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-light)' }}>
                            {planNameDisplay} <ChevronDown size={14} />
                        </button>
                        {showPlanMenu && (
                            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', minWidth: '140px', overflow: 'hidden' }}>
                                {availablePlans.map((p, index) => (
                                    <div
                                        key={p.id}
                                        onClick={() => changePlan(p.id)}
                                        style={{
                                            padding: '10px 15px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            background: selectedPlanId === p.id ? 'var(--background-secondary)' : 'transparent',
                                            color: 'var(--text-primary)',
                                            borderTop: index > 0 ? '1px solid var(--border-light)' : 'none'
                                        }}
                                    >
                                        {p.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', background: 'var(--background-secondary)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
                        {planNameDisplay}
                    </div>
                )}
            </div>

            <h1 style={{ marginBottom: '1.5rem' }}>{careerTitle}</h1>

            <div className="card" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>
                            {porcentaje}<span style={{ fontSize: '1.5rem' }}>%</span>
                        </div>
                        <div style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            de la carrera completada
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{aprobadas}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>MATERIAS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.5rem' }}>
                            {promedioReal > 0 ? promedioReal : '--'}
                        </div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>PROMEDIO</div>
                    </div>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                    <div style={{ width: `${porcentaje}%`, height: '100%', background: 'white', borderRadius: '10px' }}></div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.9 }}>
                    {creditosObtenidos} créditos obtenidos • {totalMaterias * 10} créditos totales
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '1rem 0 1.5rem 0', scrollbarWidth: 'none' }}>
                {currentPlanData.map(anio => (
                    <a href={`#anio-${anio.anio}`} key={anio.anio} style={{ flex: '0 0 auto', padding: '0.6rem 1.2rem', background: 'var(--surface)', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '700', boxShadow: 'var(--shadow-sm)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', textDecoration: 'none' }}>
                        {String(anio.anio).length > 2 ? 'Otro' : `${anio.anio}°`}
                    </a>
                ))}
            </div>

            {currentPlanData.map((anio) => (
                <div key={anio.anio} id={`anio-${anio.anio}`} style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                            {anio.nombre || `${anio.anio}° Año`}
                        </h2>
                        <div style={{ height: '1px', flex: 1, background: 'var(--border-light)' }}></div>
                    </div>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {anio.materias.map((materia) => {
                            const materiaData = materiasEstado[materia.id] || {};
                            const borderColor = materiaData.status === 'aprobada'
                                ? 'var(--success)'
                                : materiaData.status === 'cursada'
                                    ? 'var(--warning)'
                                    : 'transparent';

                            return (
                                <div
                                    key={materia.id}
                                    className="card"
                                    onClick={() => toggleStatus(materia.id, materia.nombre)}
                                    style={{
                                        margin: 0,
                                        padding: '1rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        borderLeft: `4px solid ${borderColor}`,
                                        ':hover': { transform: 'translateY(-2px)' }
                                    }}
                                >
                                    <div style={{ flex: 1, paddingRight: '1rem' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                                            {materia.nombre}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span>{materia.cuatrimestre}</span>
                                            {materia.horas > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>{materia.horas}hs</span>
                                                </>
                                            )}
                                            <span>•</span>
                                            <span>{materia.creditos || 10} créditos</span>
                                        </div>
                                    </div>
                                    <StatusBadge
                                        status={materiaData.status || 'pendiente'}
                                        nota={materiaData.nota}
                                        modalidad={materiaData.modalidad}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            <NotaModal
                isOpen={modalData.isOpen}
                onClose={handleNotaModalClose}
                onSave={handleNotaModalSave}
                materiaNombre={modalData.materiaNombre}
            />
        </div>
    );
};

export default CarreraPage;
