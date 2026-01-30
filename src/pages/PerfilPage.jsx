import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock, Award, TrendingUp, User } from 'lucide-react';

const PerfilPage = ({ userData }) => {
    const [academicStats, setAcademicStats] = useState({
        materiasAprobadas: 0,
        materiasTotal: 65, // Total estimado para medicina
        promedioGeneral: 0,
        añoActual: 3,
        creditosObtenidos: 0,
        creditosTotal: 650 // 65 materias * 10 créditos
    });

    useEffect(() => {
        // Cargar estadísticas desde localStorage
        loadAcademicStats();
    }, []);

    const loadAcademicStats = () => {
        try {
            // Cargar datos de medicina (principal)
            const medicinaData = localStorage.getItem('avance_medicina');
            const informaticaData = localStorage.getItem('avance_informatica');
            
            let totalAprobadas = 0;
            let totalNotas = [];
            let totalCreditos = 0;

            // Procesar medicina
            if (medicinaData) {
                const materias = JSON.parse(medicinaData);
                Object.values(materias).forEach(materia => {
                    if (materia.status === 'aprobada') {
                        totalAprobadas++;
                        totalCreditos += 10;
                        if (materia.nota && !isNaN(materia.nota)) {
                            totalNotas.push(materia.nota);
                        }
                    }
                });
            }

            // Procesar informática (si existe)
            if (informaticaData) {
                const materias = JSON.parse(informaticaData);
                Object.values(materias).forEach(materia => {
                    if (materia.status === 'aprobada') {
                        totalAprobadas++;
                        totalCreditos += 10;
                        if (materia.nota && !isNaN(materia.nota)) {
                            totalNotas.push(materia.nota);
                        }
                    }
                });
            }

            // Calcular promedio
            const promedio = totalNotas.length > 0 
                ? (totalNotas.reduce((sum, nota) => sum + nota, 0) / totalNotas.length)
                : 0;

            setAcademicStats(prev => ({
                ...prev,
                materiasAprobadas: totalAprobadas,
                promedioGeneral: parseFloat(promedio.toFixed(2)),
                creditosObtenidos: totalCreditos
            }));

        } catch (error) {
            console.error('Error cargando estadísticas académicas:', error);
        }
    };

    const porcentajeCarrera = Math.round((academicStats.materiasAprobadas / academicStats.materiasTotal) * 100);
    const porcentajeCreditos = Math.round((academicStats.creditosObtenidos / academicStats.creditosTotal) * 100);

    return (
        <div className="perfil-container">
            {/* Header */}
            <div className="perfil-header">
                <Link to="/" className="back-button">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="perfil-title">Mi Perfil</h1>
                <div className="header-spacer"></div>
            </div>

            <div className="perfil-content">
                {/* Información Personal */}
                <div className="personal-info-card">
                    <div className="profile-avatar-large">
                        {userData.photo ? (
                            <img src={userData.photo} alt="Profile" className="avatar-image-large" />
                        ) : (
                            <div className="avatar-placeholder-large">
                                <User size={48} />
                            </div>
                        )}
                    </div>
                    <div className="personal-info">
                        <h2 className="student-name">{userData.name}</h2>
                        <p className="student-career">{userData.carrera}</p>
                        <div className="student-year">
                            <span className="year-badge">{academicStats.añoActual}° Año</span>
                        </div>
                    </div>
                </div>

                {/* Progreso Académico */}
                <div className="academic-progress-section">
                    <h3 className="section-title">Progreso Académico</h3>
                    
                    {/* Progreso de Carrera */}
                    <div className="progress-card">
                        <div className="progress-header">
                            <div className="progress-icon">
                                <BookOpen size={24} />
                            </div>
                            <div className="progress-info">
                                <h4 className="progress-title">Materias Completadas</h4>
                                <p className="progress-subtitle">
                                    {academicStats.materiasAprobadas} de {academicStats.materiasTotal} materias
                                </p>
                            </div>
                            <div className="progress-percentage">
                                {porcentajeCarrera}%
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${porcentajeCarrera}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <Award size={20} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">
                                    {academicStats.promedioGeneral > 0 ? academicStats.promedioGeneral : '--'}
                                </span>
                                <span className="stat-label">Promedio</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <TrendingUp size={20} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{academicStats.creditosObtenidos}</span>
                                <span className="stat-label">Créditos</span>
                            </div>
                        </div>
                    </div>

                    {/* Progreso de Créditos */}
                    <div className="credits-progress">
                        <div className="credits-header">
                            <span className="credits-title">Progreso de Créditos</span>
                            <span className="credits-percentage">{porcentajeCreditos}%</span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${porcentajeCreditos}%` }}
                            ></div>
                        </div>
                        <div className="credits-info">
                            <span>{academicStats.creditosObtenidos} de {academicStats.creditosTotal} créditos</span>
                        </div>
                    </div>
                </div>

                {/* Estado Actual */}
                <div className="current-status-section">
                    <h3 className="section-title">Estado Actual</h3>
                    
                    <div className="status-card">
                        <div className="status-header">
                            <Calendar size={20} />
                            <span>Cursando actualmente</span>
                        </div>
                        <div className="current-subjects">
                            <div className="subject-item">
                                <span className="subject-name">Anatomía II</span>
                                <span className="subject-status">En curso</span>
                            </div>
                            <div className="subject-item">
                                <span className="subject-name">Fisiología I</span>
                                <span className="subject-status">En curso</span>
                            </div>
                            <div className="subject-item">
                                <span className="subject-name">Bioquímica</span>
                                <span className="subject-status">En curso</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Próximos Objetivos */}
                <div className="objectives-section">
                    <h3 className="section-title">Próximos Objetivos</h3>
                    
                    <div className="objectives-card">
                        <div className="objective-item">
                            <div className="objective-icon">
                                <Clock size={16} />
                            </div>
                            <div className="objective-text">
                                <span className="objective-title">Finalizar 3° año</span>
                                <span className="objective-date">Diciembre 2024</span>
                            </div>
                        </div>
                        
                        <div className="objective-item">
                            <div className="objective-icon">
                                <BookOpen size={16} />
                            </div>
                            <div className="objective-text">
                                <span className="objective-title">Aprobar Anatomía II</span>
                                <span className="objective-date">Próximo parcial</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mensaje de proceso */}
                <div className="development-notice">
                    <div className="notice-content">
                        <h4 className="notice-title">🚧 Sección en desarrollo</h4>
                        <p className="notice-text">
                            Estamos trabajando para agregar más funcionalidades a tu perfil académico.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .perfil-container {
                    min-height: 100vh;
                    background: var(--background);
                    padding-bottom: 100px;
                }

                .perfil-header {
                    background: var(--surface);
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    backdrop-filter: blur(20px);
                    background: var(--surface-overlay);
                }

                .back-button {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-full);
                    background: var(--background-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-primary);
                    transition: all 0.2s ease;
                    border: 1px solid var(--border-light);
                }

                .back-button:hover {
                    background: var(--surface);
                    transform: scale(1.05);
                    border-color: var(--primary);
                }

                .perfil-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .header-spacer {
                    width: 40px;
                }

                .perfil-content {
                    padding: var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .personal-info-card {
                    background: var(--primary);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    color: white;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    animation: slideUp 0.6s ease-out;
                }

                .personal-info-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .profile-avatar-large {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid rgba(255, 255, 255, 0.2);
                    margin: 0 auto var(--spacing-lg);
                    position: relative;
                    z-index: 1;
                }

                .avatar-image-large {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .avatar-placeholder-large {
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.7);
                }

                .student-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0 0 var(--spacing-sm) 0;
                    letter-spacing: -0.01em;
                    position: relative;
                    z-index: 1;
                }

                .student-career {
                    font-size: 1rem;
                    opacity: 0.9;
                    margin: 0 0 var(--spacing-md) 0;
                    font-weight: 500;
                    position: relative;
                    z-index: 1;
                }

                .year-badge {
                    background: rgba(255, 255, 255, 0.2);
                    padding: var(--spacing-xs) var(--spacing-md);
                    border-radius: var(--radius-full);
                    font-size: 0.875rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                }

                .section-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-lg);
                    letter-spacing: -0.01em;
                }

                .academic-progress-section {
                    animation: slideUp 0.6s ease-out 0.1s both;
                }

                .progress-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    margin-bottom: var(--spacing-lg);
                }

                .progress-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-md);
                }

                .progress-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-lg);
                    background: var(--primary);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .progress-info {
                    flex: 1;
                }

                .progress-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-xs) 0;
                }

                .progress-subtitle {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .progress-percentage {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--primary);
                }

                .progress-bar {
                    height: 8px;
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

                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-lg);
                }

                .stat-card {
                    background: var(--surface);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .stat-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-lg);
                    background: var(--success-light);
                    color: var(--success);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-info {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    line-height: 1;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .credits-progress {
                    background: var(--surface);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                }

                .credits-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-sm);
                }

                .credits-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .credits-percentage {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: var(--primary);
                }

                .credits-info {
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    margin-top: var(--spacing-sm);
                }

                .current-status-section {
                    animation: slideUp 0.6s ease-out 0.2s both;
                }

                .status-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                }

                .status-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-lg);
                    color: var(--text-primary);
                    font-weight: 600;
                }

                .current-subjects {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .subject-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-md);
                    background: var(--background-secondary);
                    border-radius: var(--radius-lg);
                }

                .subject-name {
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .subject-status {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--warning);
                    background: var(--warning-light);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-full);
                }

                .objectives-section {
                    animation: slideUp 0.6s ease-out 0.3s both;
                }

                .objectives-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .objective-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md);
                    background: var(--background-secondary);
                    border-radius: var(--radius-lg);
                }

                .objective-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: var(--radius-lg);
                    background: var(--primary-light);
                    color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .objective-text {
                    display: flex;
                    flex-direction: column;
                }

                .objective-title {
                    font-weight: 500;
                    color: var(--text-primary);
                    font-size: 0.875rem;
                }

                .objective-date {
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                }

                .development-notice {
                    animation: slideUp 0.6s ease-out 0.4s both;
                }

                .notice-content {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    text-align: center;
                }

                .notice-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-sm) 0;
                }

                .notice-text {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.5;
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .perfil-content {
                        padding: var(--spacing-md);
                    }
                    
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .student-name {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default PerfilPage;
