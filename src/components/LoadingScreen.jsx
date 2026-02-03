import React, { useState, useEffect } from 'react';

const MENSAJES_MOTIVADORES = [
    "Preparando tu experiencia académica...",
    "Cargando tu futuro universitario...",
    "Conectando con el conocimiento...",
    "Iniciando tu jornada de aprendizaje...",
    "Desplegando tus oportunidades...",
    "Activando tu potencial académico...",
    "Construyendo tu camino al éxito..."
];

const LoadingScreen = () => {
    const [mensaje, setMensaje] = useState("");
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Seleccionar mensaje aleatorio al montar
        const randomMsg = MENSAJES_MOTIVADORES[Math.floor(Math.random() * MENSAJES_MOTIVADORES.length)];
        setMensaje(randomMsg);

        // Mostrar contenido después de un pequeño delay
        setTimeout(() => setShowContent(true), 300);
    }, []);

    return (
        <div className="premium-loading-container">
            {/* Fondo con gradiente animado */}
            <div className="animated-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Patrón de puntos decorativo */}
            <div className="dot-pattern"></div>

            {/* Contenido principal */}
            <div className={`loading-content ${showContent ? 'show' : ''}`}>
                {/* Logo principal */}
                <div className="logo-section">
                    <div className="logo-container">
                        <div className="logo-glow"></div>
                        <div className="seagull-logo">
                            <img
                                src="/seagull-logo.png"
                                alt="Campus UNPSJB"
                                className="logo-svg"
                            />
                        </div>
                    </div>

                    {/* Anillos decorativos */}
                    <div className="decorative-rings">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                    </div>
                </div>

                {/* Título y subtítulo */}
                <div className="text-section">
                    <h1 className="app-title">Campus UNPSJB</h1>
                    <p className="app-subtitle">Tu portal académico universitario</p>
                </div>

                {/* Mensaje motivador */}
                <div className="message-section">
                    <p className="loading-message">{mensaje}</p>
                </div>

                {/* Indicador de carga animado */}
                <div className="loading-indicator">
                    <div className="pulse-dots">
                        <div className="pulse-dot"></div>
                        <div className="pulse-dot"></div>
                        <div className="pulse-dot"></div>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .premium-loading-container {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: linear-gradient(135deg, var(--background) 0%, var(--background-secondary) 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    perspective: 1000px;
                }

                .animated-background {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .gradient-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.3;
                    animation: float 8s ease-in-out infinite;
                }

                .orb-1 {
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, var(--primary), transparent);
                    top: 20%;
                    left: 10%;
                    animation-delay: 0s;
                }

                .orb-2 {
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, var(--primary-light), transparent);
                    top: 60%;
                    right: 20%;
                    animation-delay: 3s;
                }

                .orb-3 {
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(circle, var(--primary-dark), transparent);
                    bottom: 30%;
                    left: 60%;
                    animation-delay: 6s;
                }

                .dot-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                    animation: pattern-move 20s linear infinite;
                    opacity: 0.5;
                }

                .loading-content {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-2xl);
                    text-align: center;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .loading-content.show {
                    opacity: 1;
                    transform: translateY(0);
                }

                .logo-section {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo-container {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--surface);
                    border-radius: var(--radius-2xl);
                    box-shadow: var(--shadow-xl);
                    border: 1px solid var(--border-light);
                    z-index: 5;
                    animation: logo-pulse 3s ease-in-out infinite;
                }

                .logo-glow {
                    position: absolute;
                    inset: -20px;
                    background: var(--primary);
                    border-radius: var(--radius-2xl);
                    filter: blur(30px);
                    opacity: 0.3;
                    animation: glow-pulse 4s ease-in-out infinite;
                }

                .seagull-logo {
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
                    animation: logo-float 4s ease-in-out infinite;
                }

                .seagull-logo svg {
                    width: 100%;
                    height: 100%;
                }

                .logo-svg {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .decorative-rings {
                    position: absolute;
                    inset: -40px;
                }

                .ring {
                    position: absolute;
                    border: 2px solid transparent;
                    border-radius: 50%;
                    background: linear-gradient(45deg, var(--primary), var(--primary-light), var(--primary-dark), var(--primary));
                    background-clip: padding-box;
                    opacity: 0.6;
                }

                .ring::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, var(--primary), var(--primary-light), var(--primary-dark), var(--primary));
                    z-index: -1;
                }

                .ring-1 {
                    width: 160px;
                    height: 160px;
                    top: 20px;
                    left: 20px;
                    animation: ring-rotate 12s linear infinite;
                }

                .ring-2 {
                    width: 200px;
                    height: 200px;
                    top: 0;
                    left: 0;
                    animation: ring-rotate 18s linear infinite reverse;
                    opacity: 0.4;
                }

                .ring-3 {
                    width: 240px;
                    height: 240px;
                    top: -20px;
                    left: -20px;
                    animation: ring-rotate 24s linear infinite;
                    opacity: 0.2;
                }

                .text-section {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                    animation: text-fade-in 1s ease-out 0.5s both;
                }

                .app-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    letter-spacing: -0.02em;
                    margin: 0;
                    background: var(--primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .app-subtitle {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                    margin: 0;
                }

                .message-section {
                    animation: message-fade-in 1s ease-out 0.8s both;
                }

                .loading-message {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                    margin: 0;
                    max-width: 300px;
                    line-height: 1.5;
                    animation: message-glow 3s ease-in-out infinite;
                }

                .loading-indicator {
                    animation: indicator-fade-in 1s ease-out 1.2s both;
                }

                .pulse-dots {
                    display: flex;
                    gap: var(--spacing-sm);
                    align-items: center;
                    justify-content: center;
                }

                .pulse-dot {
                    width: 12px;
                    height: 12px;
                    background: var(--primary);
                    border-radius: 50%;
                    animation: pulse-dot 1.5s ease-in-out infinite;
                    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
                }

                .pulse-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .pulse-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }

                /* Animaciones */
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0) rotate(0deg); 
                    }
                    50% { 
                        transform: translateY(-30px) rotate(180deg); 
                    }
                }

                @keyframes pattern-move {
                    0% { 
                        transform: translateX(0) translateY(0); 
                    }
                    100% { 
                        transform: translateX(40px) translateY(40px); 
                    }
                }

                @keyframes logo-pulse {
                    0%, 100% { 
                        transform: scale(1); 
                    }
                    50% { 
                        transform: scale(1.05); 
                    }
                }

                @keyframes glow-pulse {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 0.5; 
                        transform: scale(1.1); 
                    }
                }

                @keyframes logo-float {
                    0%, 100% { 
                        transform: translateY(0) rotate(0deg); 
                    }
                    50% { 
                        transform: translateY(-5px) rotate(2deg); 
                    }
                }

                @keyframes ring-rotate {
                    0% { 
                        transform: rotate(0deg); 
                    }
                    100% { 
                        transform: rotate(360deg); 
                    }
                }

                @keyframes text-fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes message-fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes indicator-fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes message-glow {
                    0%, 100% { 
                        opacity: 0.8; 
                    }
                    50% { 
                        opacity: 1; 
                    }
                }

                @keyframes pulse-dot {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: scale(1.2);
                        opacity: 0.7;
                    }
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .logo-container {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .seagull-logo {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .app-title {
                        font-size: 1.75rem;
                    }
                    
                    .app-subtitle {
                        font-size: 0.9rem;
                    }
                    
                    .loading-message {
                        font-size: 0.9rem;
                        max-width: 280px;
                    }
                }

                /* Tema oscuro */
                [data-theme="dark"] .logo-container {
                    background: var(--surface);
                    border-color: var(--border-light);
                }

                [data-theme="dark"] .app-title {
                    background: var(--primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;