import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const getStyle = (s) => {
        switch (s) {
            case 'aprobada': return { bg: 'var(--success-bg)', color: 'var(--success-text)', icon: <CheckCircle size={14} /> };
            case 'cursada': return { bg: 'var(--warning-bg)', color: 'var(--warning-text)', icon: <Clock size={14} /> };
            default: return { bg: 'var(--pending-bg)', color: 'var(--pending-text)', icon: <Circle size={14} /> };
        }
    };

    const current = getStyle(status);

    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '0.35rem 0.85rem',
            borderRadius: '12px',
            background: current.bg,
            color: current.color,
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.3px',
            transition: 'background 0.3s, color 0.3s'
        }}>
            {current.icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusBadge;
