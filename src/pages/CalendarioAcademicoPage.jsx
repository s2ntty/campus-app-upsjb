import React, { useState } from 'react';
import { Rocket } from 'lucide-react';

const CalendarioAcademicoPage = () => {
    const [facultad, setFacultad] = useState('naturales');
    const today = new Date();

    const eventosNaturales = [{ start: '2026-02-09', end: '2026-02-13', titulo: '1° Turno Exámenes Febrero', tipo: 'examen', icon: '📝' }, { start: '2026-02-09', end: '2026-03-06', titulo: 'Curso Nivelación Ingresantes', tipo: 'clase', icon: '🎓' }, { start: '2026-02-23', end: '2026-02-27', titulo: '2° Turno Exámenes Febrero', tipo: 'examen', icon: '📝' }, { start: '2026-03-09', end: '2026-03-27', titulo: 'Inscripción Materias Anuales/1°C', tipo: 'tramite', icon: '✍️' }, { start: '2026-03-16', end: '2026-03-20', titulo: 'Turno Exámenes Marzo', tipo: 'examen', icon: '📝' }, { start: '2026-03-16', end: null, titulo: 'Inicio de Clases 1° Cuatrimestre', tipo: 'inicio', icon: '🚀' }, { start: '2026-03-24', end: null, titulo: 'Feriado: Memoria por la Verdad', tipo: 'feriado', icon: '🇦🇷' }, { start: '2026-04-02', end: null, titulo: 'Feriado: Malvinas', tipo: 'feriado', icon: '🇦🇷' }, { start: '2026-04-20', end: '2026-04-24', titulo: 'Turno Exámenes Abril', tipo: 'examen', icon: '📝' }, { start: '2026-05-01', end: null, titulo: 'Feriado: Día del Trabajador', tipo: 'feriado', icon: '👷' }, { start: '2026-05-18', end: '2026-05-22', titulo: 'Turno Exámenes Mayo', tipo: 'examen', icon: '📝' }, { start: '2026-05-25', end: null, titulo: 'Feriado: Revolución de Mayo', tipo: 'feriado', icon: '🇦🇷' }, { start: '2026-06-08', end: '2026-06-12', titulo: 'Turno Exámenes Junio', tipo: 'examen', icon: '📝' }, { start: '2026-06-26', end: null, titulo: 'Fin 1° Cuatrimestre', tipo: 'fin', icon: '🏁' }, { start: '2026-07-06', end: '2026-08-14', titulo: 'Inscripción Materias 2°C', tipo: 'tramite', icon: '✍️' }, { start: '2026-07-13', end: '2026-07-17', titulo: '1° Turno Exámenes Julio', tipo: 'examen', icon: '📝' }, { start: '2026-07-20', end: '2026-07-31', titulo: 'Receso Invernal', tipo: 'receso', icon: '❄️' }, { start: '2026-08-10', end: '2026-08-18', titulo: '2° Turno Exámenes Julio', tipo: 'examen', icon: '📝' }, { start: '2026-08-10', end: null, titulo: 'Inicio 2° Cuatrimestre', tipo: 'inicio', icon: '🚀' }, { start: '2026-08-24', end: '2026-08-28', titulo: 'Turno Exámenes Agosto', tipo: 'examen', icon: '📝' }, { start: '2026-09-28', end: '2026-10-02', titulo: 'Turno Exámenes Septiembre', tipo: 'examen', icon: '📝' }, { start: '2026-10-19', end: '2026-10-23', titulo: 'Turno Exámenes Octubre', tipo: 'examen', icon: '📝' }, { start: '2026-11-27', end: null, titulo: 'Fin 2° Cuatrimestre', tipo: 'fin', icon: '🏁' }, { start: '2026-11-30', end: '2026-12-04', titulo: '1° Turno Exámenes Diciembre', tipo: 'examen', icon: '🎄' }, { start: '2026-12-14', end: '2026-12-18', titulo: '2° Turno Exámenes Diciembre', tipo: 'examen', icon: '🎄' }];

    const eventosIngenieria = [
        { start: '2026-02-04', end: '2026-02-10', titulo: '1° Turno Exámenes Febrero', tipo: 'examen', icon: '📝' },
        { start: '2026-02-18', end: '2026-02-24', titulo: '2° Turno Exámenes Febrero', tipo: 'examen', icon: '📝' },
        { start: '2026-03-03', end: '2026-03-20', titulo: 'Inscripción 1°C y Anuales', tipo: 'tramite', icon: '✍️' },
        { start: '2026-03-03', end: '2026-03-20', titulo: 'Reincorporaciones y Cambios', tipo: 'tramite', icon: '🔄' },
        { start: '2026-03-09', end: '2026-03-13', titulo: 'Turno Exámenes Marzo', tipo: 'examen', icon: '📝' },
        { start: '2026-03-16', end: null, titulo: 'Inicio 1° Cuatrimestre y Anuales', tipo: 'inicio', icon: '🚀' },
        { start: '2026-04-13', end: '2026-04-17', titulo: 'Turno Exámenes Abril', tipo: 'examen', icon: '📝' },
        { start: '2026-05-26', end: '2026-06-01', titulo: 'Turno Exámenes Mayo', tipo: 'examen', icon: '📝' },
        { start: '2026-06-22', end: '2026-07-03', titulo: 'Reincorporaciones para 2°C', tipo: 'tramite', icon: '🔄' },
        { start: '2026-06-26', end: null, titulo: 'Fin Dictado 1° Cuatrimestre', tipo: 'fin', icon: '🏁' },
        { start: '2026-06-29', end: '2026-07-10', titulo: 'Entrega de Actas 1°C', tipo: 'tramite', icon: '📋' },
        { start: '2026-07-20', end: '2026-08-07', titulo: 'Inscripción 2°C', tipo: 'tramite', icon: '✍️' },
        { start: '2026-07-27', end: '2026-07-31', titulo: 'Turno Exámenes Julio', tipo: 'examen', icon: '📝' },
        { start: '2026-08-03', end: null, titulo: 'Inicio 2° Cuatrimestre', tipo: 'inicio', icon: '🚀' },
        { start: '2026-08-10', end: '2026-08-14', titulo: 'Turno Exámenes Agosto', tipo: 'examen', icon: '📝' },
        { start: '2026-09-28', end: '2026-10-02', titulo: 'Turno Exámenes Septiembre', tipo: 'examen', icon: '📝' },
        { start: '2026-10-26', end: '2026-10-30', titulo: 'Turno Exámenes Octubre', tipo: 'examen', icon: '📝' },
        { start: '2026-11-20', end: null, titulo: 'Fin Dictado 2°C y Anuales', tipo: 'fin', icon: '🏁' },
        { start: '2026-11-23', end: '2026-11-30', titulo: 'Entrega de Actas 2°C y Anuales', tipo: 'tramite', icon: '📋' },
        { start: '2026-11-30', end: '2026-12-04', titulo: 'Turno Exámenes Noviembre', tipo: 'examen', icon: '📝' },
        { start: '2026-12-14', end: '2026-12-18', titulo: 'Turno Exámenes Diciembre', tipo: 'examen', icon: '🎅' },
    ];

    const eventos = facultad === 'naturales' ? eventosNaturales : eventosIngenieria;
    const mockDate = today.getFullYear() < 2026 ? new Date('2026-02-01') : today;

    const proximosEventos = eventos
        .filter(ev => { const finFecha = ev.end ? new Date(ev.end) : new Date(ev.start); return finFecha >= mockDate; })
        .sort((a, b) => new Date(a.start) - new Date(b.start));

    const eventoMasCercano = proximosEventos[0];
    const formatFecha = (isoDate) => { if (!isoDate) return ''; const [y, m, d] = isoDate.split('-'); return `${d}/${m}`; };

    return (
        <div className="page-container">
            <h1>Calendario</h1>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <button onClick={() => setFacultad('naturales')} style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', background: facultad === 'naturales' ? 'var(--primary)' : 'transparent', color: facultad === 'naturales' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s' }}>Cs. Naturales</button>
                <button onClick={() => setFacultad('ingenieria')} style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', background: facultad === 'ingenieria' ? 'var(--primary)' : 'transparent', color: facultad === 'ingenieria' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s' }}>Ingeniería</button>
            </div>
            {eventoMasCercano && (
                <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', opacity: 0.9 }}> <Rocket size={18} /> <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Próximo Evento</span> </div>
                    <h2 style={{ color: 'white', fontSize: '1.4rem', lineHeight: '1.3' }}>{eventoMasCercano.titulo}</h2>
                    <div style={{ marginTop: '1rem', display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '600' }}> 📅 {formatFecha(eventoMasCercano.start)} {eventoMasCercano.end ? `- ${formatFecha(eventoMasCercano.end)}` : ''} </div>
                </div>
            )}
            <h3 style={{ marginBottom: '1rem' }}>Cronograma 2026 ({facultad === 'naturales' ? 'Naturales' : 'Ingeniería'})</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
                {proximosEventos.slice(1).map((ev, i) => (<div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}> <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--pending-bg)', width: '50px', height: '50px', borderRadius: '12px', fontSize: '1.5rem' }}> {ev.icon} </div> <div style={{ flex: 1 }}> <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.1rem' }}> {formatFecha(ev.start)} {ev.end ? `- ${formatFecha(ev.end)}` : ''} </div> <div style={{ fontWeight: '600', color: 'var(--text)', lineHeight: '1.3' }}>{ev.titulo}</div> </div> </div>))}
                {proximosEventos.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No hay más eventos este año 🎉</p>}
            </div>
        </div>
    );
};

export default CalendarioAcademicoPage;
