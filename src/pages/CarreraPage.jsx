import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { PLAN_MEDICINA_NUEVO, PLAN_MEDICINA_VIEJO, PLAN_APU } from '../data/planes';
import StatusBadge from '../components/StatusBadge';

const CarreraPage = ({ carrera }) => {
    const isMedicina = carrera === 'medicina';
    const storageKey = `avance_${carrera}`;
    const prefPlanKey = `plan_preferido_${carrera}`;

    const [selectedPlanId, setSelectedPlanId] = useState('nuevo');
    const [materiasEstado, setMateriasEstado] = useState({});
    const [showPlanMenu, setShowPlanMenu] = useState(false);

    useEffect(() => {
        const savedPlanId = localStorage.getItem(prefPlanKey);
        if (savedPlanId) setSelectedPlanId(savedPlanId);

        const saved = localStorage.getItem(storageKey);
        if (saved) setMateriasEstado(JSON.parse(saved));
    }, [carrera, storageKey, prefPlanKey]);

    const changePlan = (planId) => {
        setSelectedPlanId(planId);
        localStorage.setItem(prefPlanKey, planId);
        setShowPlanMenu(false);
    };

    const toggleStatus = (id) => {
        setMateriasEstado(prev => {
            const current = prev[id] || 'pendiente';
            const next = current === 'pendiente' ? 'cursada' : (current === 'cursada' ? 'aprobada' : 'pendiente');
            const newState = { ...prev, [id]: next };
            localStorage.setItem(storageKey, JSON.stringify(newState));
            return newState;
        });
    };

    // Configuración de planes según carrera
    let currentPlanData = [];
    let planNameDisplay = '';
    let availablePlans = [];

    if (isMedicina) {
        currentPlanData = selectedPlanId === 'nuevo' ? PLAN_MEDICINA_NUEVO : PLAN_MEDICINA_VIEJO;
        planNameDisplay = selectedPlanId === 'nuevo' ? 'Plan 2025' : 'Plan Viejo';
        availablePlans = [
            { id: 'nuevo', label: 'Plan 2025' },
            { id: 'viejo', label: 'Plan Viejo' }
        ];
    } else {
        // Default to APU/Informatica for now if not medicina
        currentPlanData = PLAN_APU;
        planNameDisplay = 'Plan APU 2010'; // O el nombre oficial que corresponda
        availablePlans = []; // No multiple plans for APU yet
    }

    const totalMaterias = currentPlanData.reduce((acc, year) => acc + year.materias.length, 0);
    const allIdsInPlan = currentPlanData.flatMap(y => y.materias.map(m => m.id));

    // Contar aprobadas (asegurando compatibilidad de tipos id number/string)
    const aprobadas = Object.keys(materiasEstado).filter(id => {
        // Convert input id to number if possible for comparison if IDs in plan are numbers
        // But better to enforce string comparison
        const status = materiasEstado[id];
        if (status !== 'aprobada') return false;

        // Check if this ID exists in current plan
        return allIdsInPlan.some(planId => String(planId) === String(id));
    }).length;

    const porcentaje = totalMaterias > 0 ? Math.round((aprobadas / totalMaterias) * 100) : 0;

    const careerTitle = isMedicina ? 'Medicina' : 'Analista Programador';

    return (
        <div className="page-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}> <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Volver </Link>

                {/* Solo mostrar selector si hay mas de un plan */}
                {availablePlans.length > 0 ? (
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setShowPlanMenu(!showPlanMenu)} style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', background: 'var(--pending-bg)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}> {planNameDisplay} <ChevronDown size={14} /> </button>
                        {showPlanMenu && (
                            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow)', minWidth: '140px', overflow: 'hidden' }}>
                                {availablePlans.map((p, index) => (
                                    <div
                                        key={p.id}
                                        onClick={() => changePlan(p.id)}
                                        style={{
                                            padding: '10px 15px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            background: selectedPlanId === p.id ? 'var(--pending-bg)' : 'transparent',
                                            color: 'var(--text)',
                                            borderTop: index > 0 ? '1px solid var(--border)' : 'none'
                                        }}
                                    >
                                        {p.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', background: 'var(--pending-bg)', padding: '4px 10px', borderRadius: '20px' }}>
                        {planNameDisplay}
                    </div>
                )}
            </div>

            <h1 style={{ marginBottom: '1.5rem' }}>{careerTitle}</h1>

            <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}> <div> <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{porcentaje}<span style={{ fontSize: '1.5rem' }}>%</span></div> <div style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>de la carrera completada</div> </div> <div style={{ textAlign: 'right' }}> <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{aprobadas}</div> <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>MATERIAS</div> </div> </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}> <div style={{ width: `${porcentaje}%`, height: '100%', background: 'white', borderRadius: '10px' }}></div> </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '1rem 0 1.5rem 0', scrollbarWidth: 'none' }}>
                {currentPlanData.map(anio => (
                    <a href={`#anio-${anio.anio}`} key={anio.anio} style={{ flex: '0 0 auto', padding: '0.6rem 1.2rem', background: 'var(--surface)', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '700', boxShadow: '0 4px 6px rgba(0,0,0,0.03)', color: 'var(--text-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                        {String(anio.anio).length > 2 ? 'Otro' : `${anio.anio}°`}
                    </a>
                ))}
            </div>

            {currentPlanData.map((anio) => (
                <div key={anio.anio} id={`anio-${anio.anio}`} style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--text)', margin: 0 }}> {anio.nombre || `${anio.anio}° Año`} </h2>
                        <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
                    </div>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {anio.materias.map((materia) => (
                            <div key={materia.id} className="card" onClick={() => toggleStatus(materia.id)} style={{ margin: 0, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', borderLeft: materiasEstado[materia.id] === 'aprobada' ? '4px solid var(--success-text)' : (materiasEstado[materia.id] === 'cursada' ? '4px solid var(--warning-text)' : '1px solid transparent') }}>
                                <div style={{ flex: 1, paddingRight: '1rem' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text)' }}>{materia.nombre}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span>{materia.cuatrimestre}</span>
                                        {materia.horas > 0 && (
                                            <>
                                                <span>•</span>
                                                <span>{materia.horas}hs</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <StatusBadge status={materiasEstado[materia.id] || 'pendiente'} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarreraPage;
