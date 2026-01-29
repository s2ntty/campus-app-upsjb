import React, { useState } from 'react';
import { X, Award, FileText, Mic } from 'lucide-react';

const NotaModal = ({ isOpen, onClose, onSave, materiaNombre }) => {
    const [nota, setNota] = useState('');
    const [modalidad, setModalidad] = useState('');

    const handleSave = () => {
        if (!nota || !modalidad) {
            alert('Por favor completa todos los campos');
            return;
        }

        const notaNum = parseFloat(nota);
        if (notaNum < 1 || notaNum > 10) {
            alert('La nota debe estar entre 1 y 10');
            return;
        }

        onSave(notaNum, modalidad);
        handleClose();
    };

    const handleClose = () => {
        setNota('');
        setModalidad('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title-section">
                        <div className="modal-icon">
                            <Award size={24} />
                        </div>
                        <div>
                            <h3 className="modal-title">¡Materia Aprobada!</h3>
                            <p className="modal-subtitle">{materiaNombre}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="close-button">
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="input-group">
                        <label className="input-label">Nota obtenida</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={nota}
                            onChange={(e) => setNota(e.target.value)}
                            className="input-field"
                            placeholder="Ej: 8.5"
                            autoFocus
                        />
                        <span className="input-help">Nota del 1 al 10</span>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Modalidad de examen</label>
                        <div className="modalidad-options">
                            <button
                                type="button"
                                className={`modalidad-option ${modalidad === 'Escrito' ? 'active' : ''}`}
                                onClick={() => setModalidad('Escrito')}
                            >
                                <FileText size={20} />
                                <span>Escrito</span>
                            </button>
                            <button
                                type="button"
                                className={`modalidad-option ${modalidad === 'Oral' ? 'active' : ''}`}
                                onClick={() => setModalidad('Oral')}
                            >
                                <Mic size={20} />
                                <span>Oral</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button onClick={handleClose} className="btn btn-secondary">
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="btn btn-primary">
                        Guardar Nota
                    </button>
                </div>
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: var(--spacing-lg);
                    backdrop-filter: blur(4px);
                    animation: fadeIn 0.2s ease-out;
                }

                .modal-container {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-xl);
                    border: 1px solid var(--border-light);
                    width: 100%;
                    max-width: 400px;
                    max-height: 90vh;
                    overflow: hidden;
                    animation: slideUp 0.3s ease-out;
                }

                .modal-header {
                    padding: var(--spacing-xl);
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--success-light);
                }

                .modal-title-section {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .modal-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-lg);
                    background: var(--success);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .modal-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .modal-subtitle {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin: var(--spacing-xs) 0 0 0;
                    font-weight: 500;
                }

                .close-button {
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
                }

                .close-button:hover {
                    background: var(--error-light);
                    color: var(--error);
                    transform: scale(1.1);
                }

                .modal-content {
                    padding: var(--spacing-xl);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .input-help {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                    margin-top: var(--spacing-xs);
                    display: block;
                }

                .modalidad-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-sm);
                }

                .modalidad-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: var(--spacing-lg);
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    background: var(--surface);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-weight: 500;
                }

                .modalidad-option:hover {
                    border-color: var(--primary);
                    background: var(--background-secondary);
                    color: var(--text-primary);
                    transform: translateY(-2px);
                }

                .modalidad-option.active {
                    border-color: var(--primary);
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    transform: translateY(-2px);
                }

                .modal-actions {
                    padding: var(--spacing-xl);
                    border-top: 1px solid var(--border-light);
                    display: flex;
                    gap: var(--spacing-md);
                    background: var(--background-secondary);
                }

                .btn {
                    flex: 1;
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    font-size: 0.875rem;
                    transition: all 0.2s ease;
                    cursor: pointer;
                    border: none;
                }

                .btn-secondary {
                    background: var(--surface);
                    color: var(--text-secondary);
                    border: 1px solid var(--border-light);
                }

                .btn-secondary:hover {
                    background: var(--background-secondary);
                    color: var(--text-primary);
                    transform: translateY(-1px);
                }

                .btn-primary {
                    background: var(--primary);
                    color: white;
                    box-shadow: var(--shadow-primary);
                }

                .btn-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.35);
                }

                .btn:active {
                    transform: translateY(0);
                }

                /* Animaciones */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .modal-overlay {
                        padding: var(--spacing-md);
                    }
                    
                    .modal-header,
                    .modal-content,
                    .modal-actions {
                        padding: var(--spacing-lg);
                    }
                    
                    .modalidad-options {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotaModal;