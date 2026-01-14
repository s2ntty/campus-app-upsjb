import React from 'react';
import { Clock } from 'lucide-react';

const AgendaPage = () => {
    return (
        <div className="page-container">
            <h1>Agenda</h1>
            <div style={{ marginTop: '5rem', padding: '3rem 1.5rem', borderRadius: '24px', background: 'rgba(125, 211, 252, 0.05)', backdropFilter: 'blur(5px)', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1.2rem', background: 'var(--pending-bg)', borderRadius: '50%', marginBottom: '0.5rem' }}> <Clock size={40} color="var(--primary)" /> </div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', fontWeight: '800', lineHeight: '1.2' }}> Horarios Recién<br />en MARZO </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}> ¡Disfruta tus vacaciones! 🏖️ </p>
            </div>
        </div>
    );
};

export default AgendaPage;
