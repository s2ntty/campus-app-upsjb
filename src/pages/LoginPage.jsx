import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onLogin();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="login-screen">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div className="login-logo">
                    <GraduationCap size={40} />
                </div>
                <h1 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Campus UNPSJB</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Bienvenido estudiante</p>
            </div>

            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', marginLeft: '4px' }}>DNI o Usuario</label>
                    <input type="text" className="input-field" placeholder="Ej: 42123456" required />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', marginLeft: '4px' }}>Contraseña</label>
                    <input type="password" className="input-field" placeholder="••••••••" required />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
