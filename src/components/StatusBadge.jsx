import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';

const StatusBadge = ({ status, nota, modalidad }) => {
    const getStyle = (s) => {
        switch (s) {
            case 'aprobada': 
                return { 
                    bg: 'var(--success-light)', 
                    color: 'var(--success)', 
                    icon: <CheckCircle size={14} /> 
                };
            case 'cursada': 
                return { 
                    bg: 'var(--warning-light)', 
                    color: 'var(--warning)', 
                    icon: <Clock size={14} /> 
                };
            default: 
                return { 
                    bg: 'var(--background-secondary)', 
                    color: 'var(--text-tertiary)', 
                    icon: <Circle size={14} /> 
                };
        }
    };

    const current = getStyle(status);

    const getDisplayText = () => {
        if (status === 'aprobada' && nota) {
            return `${nota} - ${modalidad || 'Aprobada'}`;
        }
        return status === 'aprobada' ? 'Aprobada' : status === 'cursada' ? 'Cursada' : 'Pendiente';
    };

    return (
        <span className="status-badge" style={{
            '--badge-bg': current.bg,
            '--badge-color': current.color
        }}>
            {current.icon}
            <span className="badge-text">{getDisplayText()}</span>
            
            <style jsx>{`
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-full);
                    background: var(--badge-bg);
                    color: var(--badge-color);
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    transition: all 0.2s ease;
                    border: 1px solid transparent;
                    white-space: nowrap;
                    min-width: fit-content;
                }

                .badge-text {
                    font-variant-numeric: tabular-nums;
                }

                .status-badge:hover {
                    transform: scale(1.05);
                }

                /* Asegurar que los colores se muestren correctamente */
                .status-badge[style*="--success-light"] {
                    background: #d1fae5 !important;
                    color: #10b981 !important;
                }

                .status-badge[style*="--warning-light"] {
                    background: #fef3c7 !important;
                    color: #f59e0b !important;
                }

                .status-badge[style*="--background-secondary"] {
                    background: #f1f5f9 !important;
                    color: #94a3b8 !important;
                }

                /* Tema oscuro */
                [data-theme="dark"] .status-badge[style*="--success-light"] {
                    background: rgba(16, 185, 129, 0.2) !important;
                    color: #34d399 !important;
                }

                [data-theme="dark"] .status-badge[style*="--warning-light"] {
                    background: rgba(245, 158, 11, 0.2) !important;
                    color: #fbbf24 !important;
                }

                [data-theme="dark"] .status-badge[style*="--background-secondary"] {
                    background: #334155 !important;
                    color: #cbd5e1 !important;
                }

                /* Estilo especial para materias aprobadas con nota */
                .status-badge[style*="--success-light"] .badge-text {
                    font-weight: 700;
                    font-size: 0.8rem;
                }
            `}</style>
        </span>
    );
};

export default StatusBadge;
