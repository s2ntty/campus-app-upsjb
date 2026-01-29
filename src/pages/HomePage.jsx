import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, User, ChevronRight, Instagram, Linkedin, Github, Calendar, Clock, MapPin, Bell, Settings } from 'lucide-react';

const HomePage = ({ userData, onNavigate }) => {
    const navigate = useNavigate();

    const handleCarreraClick = (path) => {
        onNavigate(() => {
            navigate(path);
        });
    };

    // Función para determinar el saludo según el género
    const getGreeting = (name, gender) => {
        const firstName = name.split(' ')[0];
        
        if (!gender || gender === '' || gender === 'Prefiero no decir') {
            return `Bienvenid@, ${firstName}`;
        }
        
        switch (gender.toLowerCase()) {
            case 'masculino':
                return `Bienvenido, ${firstName}`;
            case 'femenino':
                return `Bienvenida, ${firstName}`;
            case 'no binario':
            case 'otro':
            default:
                return `Bienvenid@, ${firstName}`;
        }
    };

    const quickActions = [
        { icon: Calendar, label: 'Horarios', path: '/agenda', color: 'var(--primary)' },
        { icon: BookOpen, label: 'Materias', path: userData.carreraId ? `/carrera/${userData.carreraId}` : '/carrera/medicina', color: 'var(--success)' },
        { icon: GraduationCap, label: 'Plan', path: userData.carreraId ? `/carrera/${userData.carreraId}` : '/carrera/medicina', color: 'var(--warning)' },
        { icon: Bell, label: 'Avisos', path: '/agenda', color: 'var(--error)' }
    ];

    return (
        <div className="home-container">
            {/* Header con saludo */}
            <div className="home-header">
                <div className="greeting-section">
                    <div className="greeting-text">
                        <h1 className="greeting-title">{getGreeting(userData.name, userData.gender)}</h1>
                        <p className="greeting-subtitle">¿Qué vamos a estudiar hoy?</p>
                    </div>
                    <div className="profile-actions">
                        <Link to="/configuracion" className="profile-avatar">
                            {userData.photo ? (
                                <img src={userData.photo} alt="Profile" className="avatar-image" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <User size={24} />
                                </div>
                            )}
                            <div className="avatar-status"></div>
                        </Link>
                        <Link to="/configuracion" className="settings-button">
                            <Settings size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="home-content">
                {/* Próxima clase destacada */}
                <div className="next-class-card">
                    <div className="next-class-header">
                        <div className="next-class-badge">
                            <Clock size={14} />
                            <span>Próxima clase</span>
                        </div>
                        <div className="next-class-time">14:00</div>
                    </div>
                    <div className="next-class-content">
                        <h3 className="next-class-title">Anatomía I</h3>
                        <div className="next-class-details">
                            <div className="class-detail">
                                <MapPin size={16} />
                                <span>Aula 204 • Edificio A</span>
                            </div>
                        </div>
                    </div>
                    <div className="next-class-icon">
                        <BookOpen size={24} />
                    </div>
                </div>

                {/* Acciones rápidas */}
                <div className="quick-actions-section">
                    <h2 className="section-title">Acceso rápido</h2>
                    <div className="quick-actions-grid">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="quick-action-item"
                                onClick={() => handleCarreraClick(action.path)}
                            >
                                <div className="quick-action-icon" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                                    <action.icon size={24} />
                                </div>
                                <span className="quick-action-label">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mis carreras - Solo mostrar la carrera del usuario */}
                <div className="careers-section">
                    <h2 className="section-title">Mi Carrera</h2>
                    <div className="careers-list">
                        {userData.carreraId ? (
                            <div
                                onClick={() => handleCarreraClick(`/carrera/${userData.carreraId}`)}
                                className="career-card"
                            >
                                <div className={`career-icon ${userData.carreraId}`}>
                                    <BookOpen size={24} />
                                </div>
                                <div className="career-info">
                                    <h3 className="career-title">{userData.carrera?.split(' • ')[0] || 'Mi Carrera'}</h3>
                                    <p className="career-faculty">{userData.carrera?.split(' • ')[1] || userData.sede}</p>
                                    <div className="career-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '65%' }}></div>
                                        </div>
                                        <span className="progress-text">65% completado</span>
                                    </div>
                                </div>
                                <div className="career-arrow">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        ) : (
                            // Fallback para usuarios sin carrera específica
                            <div
                                onClick={() => handleCarreraClick('/carrera/medicina')}
                                className="career-card"
                            >
                                <div className="career-icon medicina">
                                    <BookOpen size={24} />
                                </div>
                                <div className="career-info">
                                    <h3 className="career-title">Medicina</h3>
                                    <p className="career-faculty">F.C.N y C.S</p>
                                    <div className="career-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '65%' }}></div>
                                        </div>
                                        <span className="progress-text">65% completado</span>
                                    </div>
                                </div>
                                <div className="career-arrow">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tarjeta del desarrollador */}
                <div className="developer-card">
                    <div className="developer-content">
                        <div className="developer-info">
                            <h3 className="developer-title">Desarrollado por S2ntty</h3>
                            <p className="developer-subtitle">Conectemos en redes sociales</p>
                            <div className="social-links">
                                <a href="https://www.instagram.com/s2nttyy/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://www.linkedin.com/in/santino-soto/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                                    <Linkedin size={18} />
                                </a>
                                <a href="https://github.com/s2ntty" target="_blank" rel="noopener noreferrer" className="social-link github">
                                    <Github size={18} />
                                </a>
                            </div>
                        </div>
                        <div className="developer-avatar">
                            <img src="/profile.jpg" alt="Santy" className="developer-image" />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .home-container {
                    min-height: 100vh;
                    background: var(--background);
                    padding-bottom: 100px;
                }

                .home-header {
                    background: var(--surface);
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--border-light);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    backdrop-filter: blur(20px);
                    background: var(--surface-overlay);
                }

                .greeting-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .greeting-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-xs);
                    letter-spacing: -0.02em;
                }

                .greeting-subtitle {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .profile-avatar {
                    position: relative;
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-full);
                    overflow: hidden;
                    border: 2px solid var(--border-light);
                    transition: all 0.2s ease;
                    display: block;
                }

                .profile-avatar:hover {
                    transform: scale(1.05);
                    border-color: var(--primary);
                }

                .profile-actions {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }

                .settings-button {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-full);
                    background: var(--background-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                    border: 1px solid var(--border-light);
                }

                .settings-button:hover {
                    background: var(--surface);
                    color: var(--primary);
                    transform: scale(1.05);
                    border-color: var(--primary);
                }

                .avatar-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .avatar-placeholder {
                    width: 100%;
                    height: 100%;
                    background: var(--background-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                }

                .avatar-status {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 12px;
                    height: 12px;
                    background: var(--success);
                    border: 2px solid var(--surface);
                    border-radius: 50%;
                }

                .home-content {
                    padding: var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .next-class-card {
                    background: var(--primary);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    color: white;
                    position: relative;
                    overflow: hidden;
                    box-shadow: var(--shadow-primary);
                    animation: slideUp 0.6s ease-out;
                }

                .next-class-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .next-class-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-md);
                }

                .next-class-badge {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    background: rgba(255, 255, 255, 0.2);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-full);
                    font-size: 0.75rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                }

                .next-class-time {
                    font-size: 1.25rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                }

                .next-class-content {
                    position: relative;
                    z-index: 1;
                }

                .next-class-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: var(--spacing-sm);
                    letter-spacing: -0.01em;
                }

                .next-class-details {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }

                .class-detail {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-size: 0.875rem;
                    opacity: 0.9;
                }

                .next-class-icon {
                    position: absolute;
                    top: var(--spacing-lg);
                    right: var(--spacing-lg);
                    background: rgba(255, 255, 255, 0.2);
                    padding: var(--spacing-md);
                    border-radius: var(--radius-lg);
                    backdrop-filter: blur(10px);
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-lg);
                    letter-spacing: -0.01em;
                }

                .quick-actions-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: var(--spacing-md);
                }

                .quick-action-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: var(--spacing-lg) var(--spacing-md);
                    background: var(--surface);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    transition: all 0.2s ease;
                    cursor: pointer;
                    box-shadow: var(--shadow-sm);
                }

                .quick-action-item:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                }

                .quick-action-item:active {
                    transform: translateY(0);
                }

                .quick-action-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .quick-action-label {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    text-align: center;
                }

                .careers-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .career-card {
                    background: var(--surface);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: var(--shadow-sm);
                }

                .career-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                    border-color: var(--primary);
                }

                .career-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }

                .career-icon.medicina {
                    background: var(--medicina);
                }

                .career-icon.informatica {
                    background: var(--informatica);
                }

                .career-icon.enfermeria {
                    background: var(--enfermeria);
                }

                .career-icon.geologia {
                    background: var(--geologia);
                }

                .career-icon.ingenieria_petroleo {
                    background: var(--ingenieria-petroleo);
                }

                .career-icon.psicologia {
                    background: var(--psicologia);
                }

                .career-icon.trabajo_social {
                    background: var(--trabajo-social);
                }

                .career-icon.turismo {
                    background: var(--turismo);
                }

                .career-info {
                    flex: 1;
                }

                .career-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-xs);
                    letter-spacing: -0.01em;
                }

                .career-faculty {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-sm);
                    font-weight: 500;
                }

                .career-progress {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }

                .progress-bar {
                    flex: 1;
                    height: 6px;
                    background: var(--background-secondary);
                    border-radius: var(--radius-full);
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: var(--primary);
                    border-radius: var(--radius-full);
                    transition: width 0.3s ease;
                }

                .progress-text {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                    font-weight: 600;
                    white-space: nowrap;
                }

                .career-arrow {
                    color: var(--text-tertiary);
                    transition: all 0.2s ease;
                }

                .career-card:hover .career-arrow {
                    color: var(--primary);
                    transform: translateX(4px);
                }

                .developer-card {
                    background: var(--text-primary);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    position: relative;
                    overflow: hidden;
                    border: 1px solid var(--border-light);
                    margin-top: auto;
                }

                .developer-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -20%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .developer-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: var(--spacing-lg);
                    position: relative;
                    z-index: 1;
                }

                .developer-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: var(--spacing-xs);
                    letter-spacing: -0.01em;
                }

                .developer-subtitle {
                    font-size: 0.875rem;
                    color: #94a3b8;
                    margin-bottom: var(--spacing-md);
                    font-weight: 500;
                }

                .social-links {
                    display: flex;
                    gap: var(--spacing-sm);
                }

                .social-link {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(10px);
                }

                .social-link:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-2px);
                }

                .social-link.instagram {
                    color: #E1306C;
                }

                .social-link.linkedin {
                    color: #0077b5;
                }

                .social-link.github {
                    color: white;
                }

                .developer-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    flex-shrink: 0;
                }

                .developer-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* Animaciones */
                .quick-actions-section {
                    animation: slideUp 0.6s ease-out 0.1s both;
                }

                .careers-section {
                    animation: slideUp 0.6s ease-out 0.2s both;
                }

                .developer-card {
                    animation: slideUp 0.6s ease-out 0.3s both;
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .home-content {
                        padding: var(--spacing-md);
                    }
                    
                    .greeting-title {
                        font-size: 1.25rem;
                    }
                    
                    .next-class-title {
                        font-size: 1.25rem;
                    }
                    
                    .quick-actions-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: var(--spacing-sm);
                    }
                    
                    .career-card {
                        padding: var(--spacing-md);
                        gap: var(--spacing-md);
                    }
                    
                    .developer-content {
                        flex-direction: column;
                        text-align: center;
                        gap: var(--spacing-md);
                    }
                }
            `}</style>
        </div>
    );
};

export default HomePage;
