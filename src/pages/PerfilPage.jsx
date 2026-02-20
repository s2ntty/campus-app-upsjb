import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock, Award, TrendingUp, User, Plus, Trash2, Check, Target } from 'lucide-react';
import { getMateriasByCarrera } from '../data/carreras';
import { materiasService, authService, userService } from '../lib/auth-service';
import { objetivosService } from '../lib/objetivos-service';
import ObjetivosModal from '../components/ObjetivosModal';
import CustomAlert from '../components/CustomAlert';

const PerfilPage = ({ userData = {} }) => {
    const [materiasCursando, setMateriasCursando] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingObjetivos, setLoadingObjetivos] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingYear, setEditingYear] = useState(false);
    const [currentYear, setCurrentYear] = useState(userData.anio_cursado || 3);
    
    // Estados para el CustomAlert
    const [alert, setAlert] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null,
        showCancel: false
    });

    // Valores por defecto seguros
    const carreraId = userData.carreraId || 'medicina';
    const stats = userData.stats || { aprobadas: 0, promedio: 0, cursadas: 0 };

    // Obtener total de materias de la carrera
    let totalMaterias = 65;
    try {
        const materias = getMateriasByCarrera(carreraId);
        if (materias && Array.isArray(materias)) {
            totalMaterias = materias.length;
        }
    } catch (error) {
        console.warn('⚠️ Error obteniendo materias, usando default:', error);
    }

    const creditosPorMateria = 10;
    const totalCreditos = totalMaterias * creditosPorMateria;
    const materiasAprobadas = stats.aprobadas || 0;
    const promedioGeneral = stats.promedio || 0;
    const creditosObtenidos = materiasAprobadas * creditosPorMateria;
    const porcentajeCarrera = totalMaterias > 0 ? Math.round((materiasAprobadas / totalMaterias) * 100) : 0;
    const porcentajeCreditos = totalCreditos > 0 ? Math.round((creditosObtenidos / totalCreditos) * 100) : 0;

    // Cargar materias en estado "cursada"
    useEffect(() => {
        const loadMateriasCursando = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (!user) {
                    setLoading(false);
                    return;
                }

                const todasMaterias = await materiasService.getMaterias(user.uid);
                const cursando = todasMaterias.filter(m => m.status === 'cursada');

                // Obtener nombres de las materias del plan de estudios
                const materiasConNombre = cursando.map(materia => {
                    const materiasPlan = getMateriasByCarrera(carreraId);
                    const materiaInfo = materiasPlan.find(m => m.id === materia.materia_id);
                    return {
                        id: materia.materia_id,
                        nombre: materiaInfo ? materiaInfo.nombre : materia.materia_id
                    };
                });

                setMateriasCursando(materiasConNombre);
                setLoading(false);
            } catch (error) {
                console.error('Error cargando materias cursando:', error);
                setLoading(false);
            }
        };

        loadMateriasCursando();
    }, [carreraId]);

    // Cargar objetivos
    useEffect(() => {
        const loadObjetivos = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (!user) {
                    setLoadingObjetivos(false);
                    return;
                }

                const objetivosData = await objetivosService.getObjetivos(user.uid);
                setObjetivos(objetivosData.filter(obj => !obj.completado));
                setLoadingObjetivos(false);
            } catch (error) {
                console.error('Error cargando objetivos:', error);
                setLoadingObjetivos(false);
            }
        };

        loadObjetivos();
    }, []);

    // Funciones para manejar objetivos
    const handleSaveObjetivo = async (objetivoData) => {
        try {
            console.log('🎯 Intentando guardar objetivo...', objetivoData);
            const user = await authService.getCurrentUser();

            if (!user) {
                console.error('❌ No hay usuario autenticado');
                setAlert({
                    isOpen: true,
                    title: 'Error',
                    message: 'Debes iniciar sesión para crear objetivos',
                    type: 'error',
                    onConfirm: null,
                    showCancel: false
                });
                return;
            }

            console.log('👤 Usuario autenticado:', user.uid);
            const nuevoObjetivo = await objetivosService.createObjetivo(user.uid, objetivoData);
            console.log('✅ Objetivo creado exitosamente:', nuevoObjetivo);

            setObjetivos([nuevoObjetivo, ...objetivos]);
            setAlert({
                isOpen: true,
                title: '¡Éxito!',
                message: '¡Objetivo creado exitosamente! 🎉',
                type: 'success',
                onConfirm: null,
                showCancel: false
            });
        } catch (error) {
            console.error('❌ Error guardando objetivo:', error);
            setAlert({
                isOpen: true,
                title: 'Error',
                message: `Error al guardar objetivo: ${error.message}`,
                type: 'error',
                onConfirm: null,
                showCancel: false
            });
        }
    };

    const handleDeleteObjetivo = async (objetivoId) => {
        setAlert({
            isOpen: true,
            title: '¿Estás seguro?',
            message: '¿Estás seguro de eliminar este objetivo?',
            type: 'confirm',
            showCancel: true,
            onConfirm: async () => {
                try {
                    await objetivosService.deleteObjetivo(objetivoId);
                    setObjetivos(objetivos.filter(obj => obj.id !== objetivoId));
                    setAlert({
                        isOpen: true,
                        title: 'Eliminado',
                        message: 'Objetivo eliminado correctamente',
                        type: 'success',
                        onConfirm: null,
                        showCancel: false
                    });
                } catch (error) {
                    console.error('Error eliminando objetivo:', error);
                    setAlert({
                        isOpen: true,
                        title: 'Error',
                        message: `Error al eliminar objetivo: ${error.message}`,
                        type: 'error',
                        onConfirm: null,
                        showCancel: false
                    });
                }
            }
        });
    };

    const handleToggleCompletado = async (objetivoId) => {
        setAlert({
            isOpen: true,
            title: '¿Marcar como completado?',
            message: '¿Marcar este objetivo como completado?',
            type: 'confirm',
            showCancel: true,
            onConfirm: async () => {
                try {
                    await objetivosService.toggleCompletado(objetivoId, true);
                    setObjetivos(objetivos.filter(obj => obj.id !== objetivoId));
                    setAlert({
                        isOpen: true,
                        title: '¡Felicitaciones!',
                        message: '¡Objetivo completado! 🎉',
                        type: 'success',
                        onConfirm: null,
                        showCancel: false
                    });
                } catch (error) {
                    console.error('Error completando objetivo:', error);
                    setAlert({
                        isOpen: true,
                        title: 'Error',
                        message: `Error al completar objetivo: ${error.message}`,
                        type: 'error',
                        onConfirm: null,
                        showCancel: false
                    });
                }
            }
        });
    };

    const handleYearChange = async (newYear) => {
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                setAlert({
                    isOpen: true,
                    title: 'Error',
                    message: 'Debes iniciar sesión',
                    type: 'error',
                    onConfirm: null,
                    showCancel: false
                });
                return;
            }

            await userService.upsertProfile(user.uid, {
                anio_cursado: newYear
            });

            setCurrentYear(newYear);
            setEditingYear(false);
            setAlert({
                isOpen: true,
                title: 'Actualizado',
                message: 'Año actualizado correctamente',
                type: 'success',
                onConfirm: null,
                showCancel: false
            });
        } catch (error) {
            console.error('Error actualizando año:', error);
            setAlert({
                isOpen: true,
                title: 'Error',
                message: `Error al actualizar año: ${error.message}`,
                type: 'error',
                onConfirm: null,
                showCancel: false
            });
        }
    };

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
                            {editingYear ? (
                                <div className="year-selector">
                                    {[1, 2, 3, 4, 5, 6].map((year) => (
                                        <button
                                            key={year}
                                            className={`year-option ${currentYear === year ? 'active' : ''}`}
                                            onClick={() => handleYearChange(year)}
                                        >
                                            {year}°
                                        </button>
                                    ))}
                                    <button
                                        className="year-cancel"
                                        onClick={() => setEditingYear(false)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <span 
                                    className="year-badge editable" 
                                    onClick={() => setEditingYear(true)}
                                    title="Click para cambiar año"
                                >
                                    {currentYear}° Año
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Progreso Académico */}
                <div className="academic-progress-section">
                    {/* Materias Completadas - Card Principal */}
                    <div className="main-progress-card">
                        <div className="main-progress-header">
                            <div className="main-progress-icon">
                                <BookOpen size={24} />
                            </div>
                            <div className="main-progress-text">
                                <h3 className="main-progress-title">Materias Completadas</h3>
                                <p className="main-progress-subtitle">{materiasAprobadas} de {totalMaterias} materias</p>
                            </div>
                            <div className="main-progress-percentage">{porcentajeCarrera}%</div>
                        </div>
                        <div className="main-progress-bar">
                            <div
                                className="main-progress-fill"
                                style={{ width: `${porcentajeCarrera}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Estadísticas - Grid 2 columnas */}
                    <div className="stats-mini-grid">
                        <div className="stat-mini-card">
                            <div className="stat-mini-icon promedio">
                                <Award size={20} />
                            </div>
                            <div className="stat-mini-content">
                                <div className="stat-mini-value">
                                    {promedioGeneral > 0 ? promedioGeneral : '--'}
                                </div>
                                <div className="stat-mini-label">Promedio</div>
                            </div>
                        </div>

                        <div className="stat-mini-card">
                            <div className="stat-mini-icon creditos">
                                <TrendingUp size={20} />
                            </div>
                            <div className="stat-mini-content">
                                <div className="stat-mini-value">{creditosObtenidos}</div>
                                <div className="stat-mini-label">Créditos</div>
                            </div>
                        </div>
                    </div>

                    {/* Progreso de Créditos */}
                    <div className="credits-progress-card">
                        <div className="credits-progress-header">
                            <span className="credits-progress-title">Progreso de Créditos</span>
                            <span className="credits-progress-percentage">{porcentajeCreditos}%</span>
                        </div>
                        <div className="credits-progress-bar">
                            <div
                                className="credits-progress-fill"
                                style={{ width: `${porcentajeCreditos}%` }}
                            ></div>
                        </div>
                        <div className="credits-progress-info">
                            {creditosObtenidos} de {totalCreditos} créditos
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

                        {loading ? (
                            <div className="loading-message">
                                <p>Cargando materias...</p>
                            </div>
                        ) : materiasCursando.length > 0 ? (
                            <div className="current-subjects">
                                {materiasCursando.map((materia) => (
                                    <div key={materia.id} className="subject-item">
                                        <span className="subject-name">{materia.nombre}</span>
                                        <span className="subject-status">En curso</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">📚</div>
                                <h4 className="empty-title">¡Es momento de empezar!</h4>
                                <p className="empty-message">
                                    No estás cursando ninguna materia actualmente.
                                    <br />
                                    ¡Marca algunas materias como "Cursada" para comenzar tu camino académico!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Próximos Objetivos */}
                <div className="objectives-section">
                    <div className="section-header">
                        <h3 className="section-title">Próximos Objetivos</h3>
                        <button className="add-objetivo-btn" onClick={() => setShowModal(true)}>
                            <Plus size={18} />
                            Agregar
                        </button>
                    </div>

                    {loadingObjetivos ? (
                        <div className="loading-message">
                            <p>Cargando objetivos...</p>
                        </div>
                    ) : objetivos.length > 0 ? (
                        <div className="objectives-grid">
                            {objetivos.map((objetivo) => (
                                <div key={objetivo.id} className="objective-card">
                                    <div className="objective-card-inner">
                                        <div className="objective-header">
                                            <div className="objective-icon-badge">
                                                <Target size={20} />
                                            </div>
                                            <div className="objective-actions">
                                                <button
                                                    className="objetivo-action-btn complete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleCompletado(objetivo.id);
                                                    }}
                                                    title="Marcar como completado"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    className="objetivo-action-btn delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteObjetivo(objetivo.id);
                                                    }}
                                                    title="Eliminar objetivo"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="objective-content">
                                            <h4 className="objective-title">{objetivo.titulo}</h4>
                                            {objetivo.fecha_objetivo && (
                                                <div className="objective-date">
                                                    <Calendar size={14} />
                                                    <span>
                                                        {new Date(objetivo.fecha_objetivo).toLocaleDateString('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-objectives">
                            <div className="empty-icon">🎯</div>
                            <h4 className="empty-title">¡Define tus metas!</h4>
                            <p className="empty-message">
                                Aún no tienes objetivos definidos.
                                <br />
                                ¡Crea tu primer objetivo y comienza a alcanzar tus metas académicas!
                            </p>
                            <button className="btn-add-first" onClick={() => setShowModal(true)}>
                                <Plus size={18} />
                                Crear mi primer objetivo
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal de Objetivos */}
                <ObjetivosModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveObjetivo}
                    carreraId={carreraId}
                    userId={userData.uid}
                />

                {/* Custom Alert */}
                <CustomAlert
                    isOpen={alert.isOpen}
                    onClose={() => setAlert({ ...alert, isOpen: false })}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                    onConfirm={alert.onConfirm}
                    showCancel={alert.showCancel}
                />
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
                    transition: all 0.2s ease;
                }

                .year-badge.editable {
                    cursor: pointer;
                    user-select: none;
                }

                .year-badge.editable:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }

                .year-selector {
                    display: flex;
                    gap: var(--spacing-xs);
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .year-option {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    min-width: 36px;
                }

                .year-option:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }

                .year-option.active {
                    background: white;
                    color: var(--primary);
                    border-color: white;
                }

                .year-cancel {
                    background: rgba(239, 68, 68, 0.2);
                    border: 2px solid rgba(239, 68, 68, 0.3);
                    color: white;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    min-width: 36px;
                }

                .year-cancel:hover {
                    background: rgba(239, 68, 68, 0.4);
                    transform: scale(1.05);
                }

                .section-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-lg);
                    letter-spacing: -0.01em;
                }

                .academic-progress-section {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-xl);
                }

                /* Card Principal - Materias Completadas */
                .main-progress-card {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                    position: relative;
                    overflow: hidden;
                }

                .main-progress-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 50%);
                    pointer-events: none;
                }

                .main-progress-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-lg);
                    position: relative;
                    z-index: 1;
                }

                .main-progress-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-lg);
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
                    flex-shrink: 0;
                }

                .main-progress-text {
                    flex: 1;
                }

                .main-progress-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin: 0 0 4px 0;
                }

                .main-progress-subtitle {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0;
                }

                .main-progress-percentage {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #3b82f6;
                    text-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
                }

                .main-progress-bar {
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 999px;
                    overflow: hidden;
                    position: relative;
                    z-index: 1;
                }

                .main-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
                    border-radius: 999px;
                    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
                }

                /* Mini Stats Grid */
                .stats-mini-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                }

                .stat-mini-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    transition: all 0.3s ease;
                }

                .stat-mini-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    border-color: var(--primary-light);
                }

                .stat-mini-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-mini-icon.promedio {
                    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                    color: #059669;
                }

                .stat-mini-icon.creditos {
                    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                    color: #2563eb;
                }

                .stat-mini-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .stat-mini-value {
                    font-size: 1.375rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    line-height: 1;
                }

                .stat-mini-label {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 600;
                }

                /* Credits Progress Card */
                .credits-progress-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                }

                .credits-progress-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-md);
                }

                .credits-progress-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .credits-progress-percentage {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #3b82f6;
                }

                .credits-progress-bar {
                    height: 6px;
                    background: var(--background-secondary);
                    border-radius: 999px;
                    overflow: hidden;
                    margin-bottom: var(--spacing-sm);
                }

                .credits-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
                    border-radius: 999px;
                    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .credits-progress-info {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 500;
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

                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-lg);
                }

                .add-objetivo-btn {
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-lg);
                    background: var(--primary);
                    color: white;
                    border: none;
                    font-size: 0.875rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .add-objetivo-btn:hover {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                }

                .objectives-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: var(--spacing-lg);
                }

                .objective-card {
                    background: linear-gradient(135deg, var(--surface) 0%, var(--background-secondary) 100%);
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--border-light);
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    position: relative;
                }

                .objective-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--primary), var(--primary-light));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .objective-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                    border-color: var(--primary-light);
                }

                .objective-card:hover::before {
                    opacity: 1;
                }

                .objective-card-inner {
                    padding: var(--spacing-lg);
                }

                .objective-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-md);
                }

                .objective-icon-badge {
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-lg);
                    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                .objective-actions {
                    display: flex;
                    gap: var(--spacing-xs);
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                }

                .objective-card:hover .objective-actions {
                    opacity: 1;
                    transform: translateX(0);
                }

                .objetivo-action-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: var(--radius-lg);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(10px);
                }

                .objetivo-action-btn.complete {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--success);
                }

                .objetivo-action-btn.complete:hover {
                    background: var(--success);
                    color: white;
                    transform: scale(1.1);
                }

                .objetivo-action-btn.delete {
                    background: rgba(239, 68, 68, 0.1);
                    color: var(--error);
                }

                .objetivo-action-btn.delete:hover {
                    background: var(--error);
                    color: white;
                    transform: scale(1.1);
                }

                .objective-content {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }

                .objective-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                    line-height: 1.4;
                }

                .objective-date {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    background: var(--background-secondary);
                    border-radius: var(--radius-md);
                    width: fit-content;
                }

                .empty-objectives {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    text-align: center;
                }

                .btn-add-first {
                    margin-top: var(--spacing-md);
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    background: var(--primary);
                    color: white;
                    border: none;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-add-first:hover {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                }

                .development-notice {
                    animation: slideUp 0.6s ease-out 0.4s both;
                }

                .empty-state {
                    text-align: center;
                    padding: var(--spacing-xl);
                }

                .empty-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-md);
                    opacity: 0.8;
                }

                .empty-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-sm) 0;
                }

                .empty-message {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin: 0;
                }

                .loading-message {
                    text-align: center;
                    padding: var(--spacing-lg);
                    color: var(--text-secondary);
                    font-size: 0.875rem;
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

                /* Responsive para pantallas muy pequeñas (iPhone 4, etc.) */
                @media (max-width: 320px) {
                    .stats-mini-grid {
                        gap: var(--spacing-sm);
                    }

                    .stat-mini-card {
                        padding: var(--spacing-md);
                        gap: var(--spacing-sm);
                    }

                    .stat-mini-icon {
                        width: 40px;
                        height: 40px;
                    }

                    .stat-mini-icon svg {
                        width: 18px;
                        height: 18px;
                    }

                    .stat-mini-value {
                        font-size: 1.125rem;
                    }

                    .stat-mini-label {
                        font-size: 0.75rem;
                    }

                    .credits-progress-card {
                        padding: var(--spacing-md);
                    }

                    .credits-progress-title {
                        font-size: 0.875rem;
                    }

                    .credits-progress-percentage {
                        font-size: 1.125rem;
                    }

                    .credits-progress-info {
                        font-size: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default PerfilPage;
