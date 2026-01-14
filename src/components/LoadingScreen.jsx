import React, { useState, useEffect } from 'react';

const MENSAJES_MOTIVADORES = [
    "Tu esfuerzo de hoy es el éxito de mañana.",
    "Estudiar es sembrar alas para volar.",
    "Lo único imposible es aquello que no intentas.",
    "Cargando tu futuro...",
    "Cada materia aprobada es un paso más cerca.",
    "Confía en tu proceso.",
    "La educación es el arma más poderosa."
];

const LoadingScreen = () => {
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        // Seleccionar mensaje aleatorio al montar
        const randomMsg = MENSAJES_MOTIVADORES[Math.floor(Math.random() * MENSAJES_MOTIVADORES.length)];
        setMensaje(randomMsg);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'var(--background)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.5s ease'
        }}>
            <div style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem'
            }}>
                {/* Círculo de pulso decorativo */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '4px solid var(--primary)',
                    opacity: 0.2,
                    animation: 'pulse-ring 2s infinite'
                }}></div>

                {/* Logo Principal con animación de flotación */}
                <img
                    src="/logo_unpsjb.png"
                    alt="Logo UNPSJB"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        animation: 'soaring 3s ease-in-out infinite',
                        filter: 'drop-shadow(0 10px 15px rgba(37, 99, 235, 0.2))'
                    }}
                />
            </div>

            {/* Barra de progreso sutil */}
            <div style={{
                width: '200px',
                height: '4px',
                background: 'var(--border)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    height: '100%',
                    width: '50%',
                    background: 'var(--primary)',
                    borderRadius: '10px',
                    animation: 'loading-bar 1.5s infinite ease-in-out'
                }}></div>
            </div>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                fontWeight: '500',
                textAlign: 'center',
                padding: '0 2rem',
                animation: 'fade-in 1s ease'
            }}>
                {mensaje}
            </p>

            <style>{`
        @keyframes soaring {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-15px) scale(1.02) rotate(2deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
