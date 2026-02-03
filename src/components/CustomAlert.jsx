import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const CustomAlert = ({ isOpen, onClose, title, message, type = 'info', onConfirm, showCancel = false }) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={48} />;
            case 'error':
                return <AlertCircle size={48} />;
            case 'confirm':
                return <Info size={48} />;
            default:
                return <Info size={48} />;
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'success':
                return '#10b981';
            case 'error':
                return '#ef4444';
            case 'confirm':
                return '#3b82f6';
            default:
                return '#3b82f6';
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    return (
        <div className="custom-alert-overlay" onClick={onClose}>
            <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
                <div className="custom-alert-icon" style={{ color: getIconColor() }}>
                    {getIcon()}
                </div>
                
                {title && <h3 className="custom-alert-title">{title}</h3>}
                <p className="custom-alert-message">{message}</p>

                <div className="custom-alert-actions">
                    {showCancel ? (
                        <>
                            <button className="custom-alert-btn cancel" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="custom-alert-btn confirm" onClick={handleConfirm}>
                                Aceptar
                            </button>
                        </>
                    ) : (
                        <button className="custom-alert-btn confirm" onClick={handleConfirm}>
                            Aceptar
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                .custom-alert-overlay {
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
                    z-index: 9999;
                    padding: var(--spacing-lg);
                    animation: fadeIn 0.2s ease-out;
                }

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

                .custom-alert-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    max-width: 400px;
                    width: 100%;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                    border: 1px solid var(--border-light);
                    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: center;
                }

                .custom-alert-icon {
                    margin: 0 auto var(--spacing-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.1);
                }

                .custom-alert-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-md) 0;
                    letter-spacing: -0.01em;
                }

                .custom-alert-message {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin: 0 0 var(--spacing-xl) 0;
                }

                .custom-alert-actions {
                    display: flex;
                    gap: var(--spacing-md);
                    justify-content: center;
                }

                .custom-alert-btn {
                    flex: 1;
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    min-width: 100px;
                }

                .custom-alert-btn.confirm {
                    background: var(--primary);
                    color: white;
                }

                .custom-alert-btn.confirm:hover {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                }

                .custom-alert-btn.confirm:active {
                    transform: translateY(0);
                }

                .custom-alert-btn.cancel {
                    background: var(--background-secondary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-light);
                }

                .custom-alert-btn.cancel:hover {
                    background: var(--surface);
                    border-color: var(--border);
                }

                @media (max-width: 480px) {
                    .custom-alert-card {
                        max-width: 100%;
                        margin: 0 var(--spacing-md);
                    }

                    .custom-alert-actions {
                        flex-direction: column-reverse;
                    }

                    .custom-alert-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default CustomAlert;
