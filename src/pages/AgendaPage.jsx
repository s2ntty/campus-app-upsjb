import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { getHorariosByCarrera } from '../data/carreras';

const AgendaPage = ({ userCarrera, userSede }) => {
    // Obtener horarios específicos de la carrera del usuario
    const horariosCarrera = userCarrera ? getHorariosByCarrera(userCarrera) : [];

    // Colores vibrantes por día
    const coloresPorDia = {
        'Lunes': {
            primary: '#3b82f6',
            light: '#60a5fa',
            bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            shadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
        },
        'Martes': {
            primary: '#a855f7',
            light: '#c084fc',
            bg: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
            shadow: '0 8px 24px rgba(168, 85, 247, 0.25)'
        },
        'Miércoles': {
            primary: '#10b981',
            light: '#34d399',
            bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            shadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
        },
        'Jueves': {
            primary: '#8b5cf6',
            light: '#a78bfa',
            bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            shadow: '0 8px 24px rgba(139, 92, 246, 0.25)'
        },
        'Viernes': {
            primary: '#f59e0b',
            light: '#fbbf24',
            bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            shadow: '0 8px 24px rgba(245, 158, 11, 0.25)'
        },
        'Sábado': {
            primary: '#ec4899',
            light: '#f472b6',
            bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            shadow: '0 8px 24px rgba(236, 72, 153, 0.25)'
        }
    };

    // Si no hay horarios específicos, mostrar mensaje de vacaciones
    if (!horariosCarrera || horariosCarrera.length === 0) {
        return (
            <div className="page-container">
                <h1 style={{ marginBottom: '1.5rem' }}>Agenda</h1>
                <div style={{ marginTop: '3rem', padding: '3rem 1.5rem', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.05)', backdropFilter: 'blur(5px)', border: '1px solid var(--border-light)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1.2rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', marginBottom: '0.5rem' }}>
                        <Clock size={40} color="#3b82f6" />
                    </div>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: '800', lineHeight: '1.2' }}>
                        Horarios Recién<br />en MARZO
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
                        ¡Disfruta tus vacaciones! 🏖️
                    </p>
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

    // Obtener nombre de carrera más legible
    const getNombreCarrera = (carreraId) => {
        const nombres = {
            'informatica': 'INFORMÁTICA',
            'medicina': 'MEDICINA',
            'enfermeria': 'ENFERMERÍA',
            'geologia': 'GEOLOGÍA',
            'ingenieria_petroleo': 'INGENIERÍA EN PETRÓLEO',
            'psicologia': 'PSICOLOGÍA',
            'trabajo_social': 'TRABAJO SOCIAL',
            'turismo': 'TURISMO'
        };
        return nombres[carreraId] || carreraId.toUpperCase();
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--background)',
            paddingBottom: '100px'
        }}>
            {/* Header */}
            <div style={{
                padding: 'var(--spacing-lg)',
                paddingTop: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-md)'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em'
                }}>
                    Agenda
                </h1>
            </div>

            {/* Tarjeta de Información de Carrera */}
            {userCarrera && (
                <div style={{
                    padding: '0 var(--spacing-lg)',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--spacing-lg)',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        {/* Decoración de fondo */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-20%',
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                            borderRadius: '50%'
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '0.5rem'
                            }}>
                                <Clock size={18} color="white" />
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: 'rgba(255, 255, 255, 0.9)'
                                }}>
                                    HORARIOS DE {getNombreCarrera(userCarrera)}
                                </span>
                            </div>
                            {userSede && (
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}>
                                    Sede: {userSede}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Horarios por día */}
            <div style={{
                padding: '0 var(--spacing-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-xl)'
            }}>
                {diasConHorarios.map(dia => {
                    const colores = coloresPorDia[dia];
                    return (
                        <div key={dia}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'var(--text-primary)',
                                marginBottom: 'var(--spacing-lg)',
                                letterSpacing: '-0.01em'
                            }}>
                                {dia}
                            </h3>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-md)'
                            }}>
                                {horariosPorDia[dia]
                                    .sort((a, b) => a.hora.localeCompare(b.hora))
                                    .map((horario, index) => (
                                        <div key={index} style={{
                                            background: colores.bg,
                                            borderRadius: 'var(--radius-xl)',
                                            padding: 'var(--spacing-lg)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: colores.shadow,
                                            border: `1px solid ${colores.light}20`
                                        }}>
                                            {/* Decoración de fondo */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '-30%',
                                                right: '-15%',
                                                width: '150px',
                                                height: '150px',
                                                background: `radial-gradient(circle, ${colores.light}30 0%, transparent 70%)`,
                                                borderRadius: '50%'
                                            }}></div>

                                            <div style={{
                                                position: 'relative',
                                                zIndex: 1,
                                                display: 'flex',
                                                gap: 'var(--spacing-lg)',
                                                alignItems: 'flex-start'
                                            }}>
                                                {/* Hora */}
                                                <div style={{
                                                    background: colores.light,
                                                    color: 'white',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: 'var(--radius-lg)',
                                                    fontWeight: '700',
                                                    fontSize: '0.875rem',
                                                    minWidth: '90px',
                                                    textAlign: 'center',
                                                    boxShadow: `0 4px 12px ${colores.primary}40`,
                                                    flexShrink: 0
                                                }}>
                                                    {horario.hora}
                                                </div>

                                                {/* Información de la materia */}
                                                <div style={{ flex: 1, color: 'white' }}>
                                                    <h4 style={{
                                                        fontWeight: '700',
                                                        fontSize: '1.125rem',
                                                        marginBottom: '0.5rem',
                                                        letterSpacing: '-0.01em'
                                                    }}>
                                                        {horario.materia}
                                                    </h4>

                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.375rem',
                                                        fontSize: '0.875rem',
                                                        opacity: 0.95
                                                    }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem'
                                                        }}>
                                                            <MapPin size={14} />
                                                            <span>{horario.aula}</span>
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem'
                                                        }}>
                                                            <User size={14} />
                                                            <span>{horario.profesor}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {diasConHorarios.length === 0 && (
                <div style={{
                    margin: '3rem var(--spacing-lg)',
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
