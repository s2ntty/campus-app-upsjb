import React, { useState, useEffect } from 'react';
import { X, Plus, Target, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import { getMateriasByCarrera } from '../data/carreras';

const ObjetivosModal = ({ isOpen, onClose, onSave, carreraId, userId }) => {
    const [formData, setFormData] = useState({
        tipo: 'personalizado',
        titulo: '',
        descripcion: '',
        materia_id: '',
        fecha_objetivo: ''
    });

    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        if (carreraId) {
            try {
                const materiasCarrera = getMateriasByCarrera(carreraId);
                setMaterias(materiasCarrera || []);
            } catch (error) {
                console.error('Error cargando materias:', error);
            }
        }
    }, [carreraId]);

    const handleTipoChange = (tipo) => {
        setFormData({
            tipo,
            titulo: '',
            descripcion: '',
            materia_id: '',
            fecha_objetivo: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let objetivoData = {
            tipo: formData.tipo,
            titulo: formData.titulo,
            descripcion: formData.descripcion,
            fecha_objetivo: formData.fecha_objetivo || null
        };

        if (formData.tipo === 'materia' && formData.materia_id) {
            objetivoData.materia_id = formData.materia_id;
        }

        onSave(objetivoData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            tipo: 'personalizado',
            titulo: '',
            descripcion: '',
            materia_id: '',
            fecha_objetivo: ''
        });
        onClose();
    };

    const handleMateriaSelect = (materiaId) => {
        const materia = materias.find(m => m.id === materiaId);
        setFormData({
            ...formData,
            materia_id: materiaId,
            titulo: `Aprobar ${materia.nombre}`
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        <Target size={24} />
                        Nuevo Objetivo
                    </h3>
                    <button className="modal-close" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    {/* Selector de tipo */}
                    <div className="form-group">
                        <label className="form-label">Tipo de objetivo</label>
                        <div className="tipo-selector">
                            <button
                                type="button"
                                className={`tipo-btn ${formData.tipo === 'materia' ? 'active' : ''}`}
                                onClick={() => handleTipoChange('materia')}
                            >
                                <BookOpen size={18} />
                                Materia
                            </button>
                            <button
                                type="button"
                                className={`tipo-btn ${formData.tipo === 'año' ? 'active' : ''}`}
                                onClick={() => handleTipoChange('año')}
                            >
                                <GraduationCap size={18} />
                                Año
                            </button>
                            <button
                                type="button"
                                className={`tipo-btn ${formData.tipo === 'personalizado' ? 'active' : ''}`}
                                onClick={() => handleTipoChange('personalizado')}
                            >
                                <Target size={18} />
                                Personalizado
                            </button>
                        </div>
                    </div>

                    {/* Selector de materia */}
                    {formData.tipo === 'materia' && (
                        <div className="form-group">
                            <label className="form-label">Selecciona una materia</label>
                            <select
                                className="form-select"
                                value={formData.materia_id}
                                onChange={(e) => handleMateriaSelect(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar materia...</option>
                                {materias.map((materia) => (
                                    <option key={materia.id} value={materia.id}>
                                        {materia.nombre} - {materia.año}° Año
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Selector de año */}
                    {formData.tipo === 'año' && (
                        <div className="form-group">
                            <label className="form-label">Selecciona el año</label>
                            <select
                                className="form-select"
                                value={formData.titulo}
                                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar año...</option>
                                <option value="Finalizar 1° año">Finalizar 1° año</option>
                                <option value="Finalizar 2° año">Finalizar 2° año</option>
                                <option value="Finalizar 3° año">Finalizar 3° año</option>
                                <option value="Finalizar 4° año">Finalizar 4° año</option>
                                <option value="Finalizar 5° año">Finalizar 5° año</option>
                                <option value="Finalizar 6° año">Finalizar 6° año</option>
                            </select>
                        </div>
                    )}

                    {/* Campo de título personalizado */}
                    {formData.tipo === 'personalizado' && (
                        <div className="form-group">
                            <label className="form-label">Título del objetivo</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Ej: Mejorar mi promedio, Terminar la tesis..."
                                value={formData.titulo}
                                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                required
                                maxLength={100}
                            />
                        </div>
                    )}

                    {/* Fecha objetivo */}
                    <div className="form-group">
                        <label className="form-label">
                            <Calendar size={16} />
                            Fecha objetivo (opcional)
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            value={formData.fecha_objetivo}
                            onChange={(e) => setFormData({ ...formData, fecha_objetivo: e.target.value })}
                        />
                    </div>

                    {/* Botones */}
                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={!formData.titulo}
                        >
                            <Plus size={18} />
                            Crear Objetivo
                        </button>
                    </div>
                </form>

                <style jsx>{`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.7);
                        backdrop-filter: blur(8px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        padding: var(--spacing-md);
                        animation: fadeIn 0.2s ease;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    .modal-content {
                        background: var(--surface);
                        border-radius: var(--radius-xl);
                        width: 100%;
                        max-width: 480px;
                        max-height: 90vh;
                        overflow-y: auto;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        animation: slideUp 0.3s ease;
                        
                        /* Scrollbar personalizado para Firefox */
                        scrollbar-width: thin;
                        scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
                    }

                    /* Scrollbar personalizado para Chrome, Safari y Opera */
                    .modal-content::-webkit-scrollbar {
                        width: 6px;
                    }

                    .modal-content::-webkit-scrollbar-track {
                        background: transparent;
                        border-radius: var(--radius-lg);
                    }

                    .modal-content::-webkit-scrollbar-thumb {
                        background: rgba(59, 130, 246, 0.4);
                        border-radius: var(--radius-lg);
                        transition: background 0.2s ease;
                    }

                    .modal-content::-webkit-scrollbar-thumb:hover {
                        background: rgba(59, 130, 246, 0.7);
                    }

                    .modal-content::-webkit-scrollbar-thumb:active {
                        background: rgba(59, 130, 246, 0.9);
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .modal-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: var(--spacing-md) var(--spacing-lg);
                        border-bottom: 1px solid var(--border-light);
                    }

                    .modal-title {
                        display: flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        font-size: 1.125rem;
                        font-weight: 700;
                        color: var(--text-primary);
                        margin: 0;
                    }

                    .modal-close {
                        width: 32px;
                        height: 32px;
                        border-radius: var(--radius-full);
                        background: var(--background-secondary);
                        border: none;
                        color: var(--text-secondary);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        flex-shrink: 0;
                    }

                    .modal-close:hover {
                        background: var(--error-light);
                        color: var(--error);
                    }

                    .modal-form {
                        padding: var(--spacing-lg);
                        display: flex;
                        flex-direction: column;
                        gap: var(--spacing-md);
                    }

                    .form-group {
                        display: flex;
                        flex-direction: column;
                        gap: var(--spacing-xs);
                    }

                    .form-label {
                        font-size: 0.8125rem;
                        font-weight: 600;
                        color: var(--text-primary);
                        display: flex;
                        align-items: center;
                        gap: var(--spacing-xs);
                    }

                    .tipo-selector {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: var(--spacing-xs);
                    }

                    .tipo-btn {
                        padding: var(--spacing-sm) var(--spacing-xs);
                        border-radius: var(--radius-md);
                        border: 2px solid var(--border-light);
                        background: var(--background-secondary);
                        color: var(--text-secondary);
                        font-size: 0.8125rem;
                        font-weight: 600;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 4px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }

                    .tipo-btn:hover {
                        border-color: var(--primary);
                        background: var(--primary-light);
                    }

                    .tipo-btn.active {
                        border-color: var(--primary);
                        background: var(--primary);
                        color: white;
                    }

                    .form-input,
                    .form-select,
                    .form-textarea {
                        padding: var(--spacing-sm) var(--spacing-md);
                        border-radius: var(--radius-md);
                        border: 2px solid var(--border-light);
                        background: var(--background-secondary);
                        color: var(--text-primary);
                        font-size: 0.875rem;
                        font-family: inherit;
                        transition: all 0.2s ease;
                    }

                    .form-input:focus,
                    .form-select:focus,
                    .form-textarea:focus {
                        outline: none;
                        border-color: var(--primary);
                        background: var(--surface);
                    }

                    .form-textarea {
                        resize: vertical;
                        min-height: 80px;
                    }

                    .modal-actions {
                        display: flex;
                        gap: var(--spacing-sm);
                        padding-top: var(--spacing-sm);
                    }

                    .btn-secondary,
                    .btn-primary {
                        flex: 1;
                        padding: var(--spacing-sm) var(--spacing-md);
                        border-radius: var(--radius-md);
                        font-size: 0.875rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: var(--spacing-xs);
                        border: none;
                    }

                    .btn-secondary {
                        background: var(--background-secondary);
                        color: var(--text-secondary);
                    }

                    .btn-secondary:hover {
                        background: var(--border-light);
                    }

                    .btn-primary {
                        background: var(--primary);
                        color: white;
                    }

                    .btn-primary:hover {
                        background: var(--primary-dark);
                        transform: translateY(-1px);
                    }

                    .btn-primary:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }

                    /* Responsive para pantallas muy pequeñas */
                    @media (max-width: 360px) {
                        .modal-overlay {
                            padding: var(--spacing-sm);
                        }

                        .modal-content {
                            max-width: 100%;
                            border-radius: var(--radius-lg);
                        }

                        .modal-header {
                            padding: var(--spacing-sm) var(--spacing-md);
                        }

                        .modal-title {
                            font-size: 1rem;
                            gap: var(--spacing-xs);
                        }

                        .modal-title svg {
                            width: 20px;
                            height: 20px;
                        }

                        .modal-close {
                            width: 28px;
                            height: 28px;
                        }

                        .modal-form {
                            padding: var(--spacing-md);
                            gap: var(--spacing-sm);
                        }

                        .form-label {
                            font-size: 0.75rem;
                        }

                        .tipo-btn {
                            padding: var(--spacing-xs);
                            font-size: 0.75rem;
                            gap: 2px;
                        }

                        .tipo-btn svg {
                            width: 16px;
                            height: 16px;
                        }

                        .form-input,
                        .form-select {
                            padding: var(--spacing-xs) var(--spacing-sm);
                            font-size: 0.8125rem;
                        }

                        .btn-secondary,
                        .btn-primary {
                            padding: var(--spacing-xs) var(--spacing-sm);
                            font-size: 0.8125rem;
                        }

                        .btn-primary svg,
                        .btn-secondary svg {
                            width: 16px;
                            height: 16px;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ObjetivosModal;
