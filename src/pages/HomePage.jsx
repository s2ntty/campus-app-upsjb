import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, User, ChevronRight, Instagram, Linkedin, Github } from 'lucide-react';

const HomePage = ({ userData, onNavigate }) => {
    const navigate = useNavigate();

    const handleCarreraClick = (path) => {
        onNavigate(() => {
            navigate(path);
        });
    };

    return (
        <div className="page-container">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Hola, {userData.name.split(' ')[0]} 👋</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>¿Qué vamos a estudiar hoy?</p>
                </div>
                <Link to="/perfil" style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border)', display: 'block' }}>
                    {userData.photo ? (
                        <img src={userData.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                            <User size={24} />
                        </div>
                    )}
                </Link>
            </header>

            {/* Tarjeta de Agenda */}
            <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ opacity: 0.8, fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>HOY A LAS 14:00</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Anatomía I</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Aula 204 • Edificio A</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '10px' }}>
                        <BookOpen size={24} />
                    </div>
                </div>
            </div>

            <h2 style={{ marginTop: '2rem' }}>Mis Carreras</h2>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                <div
                    onClick={() => handleCarreraClick('/carrera/medicina')}
                    className="card"
                    style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none', transition: 'transform 0.1s', cursor: 'pointer' }}
                >
                    <div style={{ background: 'var(--pending-bg)', padding: '1rem', borderRadius: '14px', color: 'var(--primary)' }}>
                        <BookOpen size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text)' }}>Medicina</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>F.C.N y C.S</div>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>

                <div
                    onClick={() => handleCarreraClick('/carrera/informatica')}
                    className="card"
                    style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none', transition: 'transform 0.1s', cursor: 'pointer' }}
                >
                    <div style={{ background: 'var(--pending-bg)', padding: '1rem', borderRadius: '14px', color: 'var(--success-text)' }}>
                        <GraduationCap size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text)' }}>Analista Programador</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>F.I.</div>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>
            </div>

            {/* Tarjeta del Desarrollador */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                marginTop: 'auto',
                marginBottom: '4.5rem',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
            }}>
                {/* Efecto de fondo */}
                <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }}></div>

                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                    <h3 style={{ color: 'white', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Desarrollado por S2ntty</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>Conectemos en redes:</p>

                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <a href="https://www.instagram.com/s2nttyy/" target="_blank" rel="noopener noreferrer" style={{
                            background: 'rgba(255,255,255,0.08)', padding: '0.5rem', borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <Instagram size={18} color="#E1306C" />
                        </a>
                        <a href="https://www.linkedin.com/in/santino-soto/" target="_blank" rel="noopener noreferrer" style={{
                            background: 'rgba(255,255,255,0.08)', padding: '0.5rem', borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <Linkedin size={18} color="#0077b5" />
                        </a>
                        <a href="https://github.com/s2ntty" target="_blank" rel="noopener noreferrer" style={{
                            background: 'rgba(255,255,255,0.08)', padding: '0.5rem', borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <Github size={18} color="white" />
                        </a>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '80px', height: '80px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}>
                        <img src="/profile.jpg" alt="Santy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
