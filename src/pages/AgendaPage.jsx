import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { getHorariosByCarrera } from '../data/carreras';

const AgendaPage = ({ userCarrera, userSede }) => {
    // Obtener horarios específicos de la carrera del usuario
    const horariosCarrera = userCarrera ? getHorariosByCarrera(userCarrera) : [];

    // Si no hay horarios específicos, mostrar mensaje de vacaciones
    if (!horariosCarrera || horariosCarrera.length === 0) {
        return (
            <div className="page-container">
                <h1>Agenda</h1>
                <div style={{ marginTop: '5rem', padding: '3rem 1.5rem', borderRadius: '24px', background: 'rgba(125, 211, 252, 0.05)', backdropFilter: 'blur(5px)', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1.2rem', background: 'var(--pending-bg)', borderRadius: '50%', marginBottom: '0.5rem' }}> <Clock size={40} color="var(--primary)" /> </div>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', fontWeight: '800', lineHeight: '1.2' }}> Horarios Recién<br />en MARZO </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}> ¡Disfruta tus vacaciones! 🏖️ </p>
                </div>
            </div>
        );
    }

    // Agrupar horarios por día
    const horariosPorDia = horariosCarrera.reduce((acc, horario) => {
        if (!acc[horario.dia]) {
            acc[horario.dia] = [];
        }
        acc[horario.dia].push(horario);
        return acc;
    }, {});

    const diasOrden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diasConHorarios = diasOrden.filter(dia => horariosPorDia[dia]);

    return (
        <div className="page-container">
            <h1>Agenda</h1>
            
            {userCarrera && (
                <div className="card" style={{ background: 'var(--primary)', color: 'white', border: 'none', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', opacity: 0.9 }}>
                        <Clock size={18} />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Horarios de {userCarrera}
                        </span>
                    </div>
                    {userSede && (
                        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                            Sede: {userSede}
                        </p>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {diasConHorarios.map(dia => (
                    <div key={dia}>
                        <h3 style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: '700', 
                            color: 'var(--text-primary)', 
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            {dia}
                            <div style={{ height: '1px', flex: 1, background: 'var(--border-light)' }}></div>
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {horariosPorDia[dia]
                                .sort((a, b) => a.hora.localeCompare(b.hora))
                                .map((horario, index) => (
                                <div key={index} className="card" style={{ 
                                    margin: 0, 
                                    padding: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: '1rem',
                                    borderLeft: '4px solid var(--primary)'
                                }}>
                                    <div style={{ 
                                        background: 'var(--primary-light)', 
                                        color: 'var(--primary)',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-lg)',
                                        fontWeight: '700',
                                        fontSize: '0.875rem',
                                        minWidth: '80px',
                                        textAlign: 'center'
                                    }}>
                                        {horario.hora}
                                    </div>
                                    
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                            fontWeight: '600', 
                                            color: 'var(--text-primary)', 
                                            marginBottom: '0.25rem',
                                            fontSize: '1rem'
                                        }}>
                                            {horario.materia}
                                        </h4>
                                        
                                        <div style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            gap: '0.25rem',
                                            fontSize: '0.875rem',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={14} />
                                                <span>{horario.aula}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <User size={14} />
                                                <span>{horario.profesor}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {diasConHorarios.length === 0 && (
                <div style={{ 
                    marginTop: '3rem', 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-light)'
                }}>
                    <Clock size={48} color="var(--text-tertiary)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        No hay horarios disponibles
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Los horarios se actualizarán próximamente
                    </p>
                </div>
            )}
        </div>
    );
};

export default AgendaPage;
