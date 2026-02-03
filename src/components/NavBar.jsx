import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, User } from 'lucide-react';

const NavBar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/calendario', icon: Calendar, label: 'Académico' },
        { path: '/agenda', icon: Clock, label: 'Agenda' },
        { path: '/perfil', icon: User, label: 'Perfil' }
    ];

    return (
        <nav className="nav-bar">
            <div className="nav-container">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`nav-item ${active ? 'nav-item-active' : ''}`}
                        >
                            <div className="nav-icon-container">
                                <Icon 
                                    size={22} 
                                    strokeWidth={active ? 2.5 : 2} 
                                    className="nav-icon"
                                />
                                {active && <div className="nav-indicator"></div>}
                            </div>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <style jsx>{`
                .nav-bar {
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    max-width: 430px;
                    z-index: 1000;
                    padding: 0 var(--spacing-md) var(--spacing-md);
                }

                .nav-container {
                    background: var(--surface);
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.95);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-2xl);
                    display: flex;
                    justify-content: space-around;
                    padding: var(--spacing-md) var(--spacing-sm);
                    box-shadow: var(--shadow-xl);
                    position: relative;
                    overflow: hidden;
                }

                .nav-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--surface);
                    opacity: 0.9;
                    z-index: -1;
                }

                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-lg);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-decoration: none;
                    color: var(--text-tertiary);
                    min-width: 60px;
                    position: relative;
                    z-index: 1;
                }

                .nav-item:hover {
                    color: var(--text-secondary);
                    background: var(--background-secondary);
                }

                .nav-item-active {
                    color: var(--primary);
                    background: rgba(99, 102, 241, 0.08);
                }

                .nav-item-active:hover {
                    color: var(--primary);
                    background: rgba(99, 102, 241, 0.12);
                }

                .nav-icon-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                }

                .nav-icon {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .nav-item-active .nav-icon {
                    transform: translateY(-1px);
                }

                .nav-indicator {
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background: var(--primary);
                    border-radius: 50%;
                    animation: indicatorPulse 2s ease-in-out infinite;
                }

                .nav-label {
                    font-size: 0.65rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: center;
                    line-height: 1;
                }

                .nav-item-active .nav-label {
                    font-weight: 700;
                    transform: translateY(-0.5px);
                }

                /* Animaciones */
                @keyframes indicatorPulse {
                    0%, 100% {
                        opacity: 1;
                        transform: translateX(-50%) scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: translateX(-50%) scale(1.2);
                    }
                }

                /* Efecto de entrada */
                .nav-container {
                    animation: slideUpNav 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes slideUpNav {
                    from {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Tema oscuro */
                [data-theme="dark"] .nav-container {
                    background: rgba(30, 41, 59, 0.95);
                    border-color: var(--border-light);
                }

                [data-theme="dark"] .nav-container::before {
                    background: var(--surface);
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .nav-bar {
                        padding: 0 var(--spacing-sm) var(--spacing-sm);
                    }
                    
                    .nav-container {
                        padding: var(--spacing-sm) var(--spacing-xs);
                    }
                    
                    .nav-item {
                        padding: var(--spacing-sm) var(--spacing-sm);
                        min-width: 50px;
                    }
                    
                    .nav-label {
                        font-size: 0.6rem;
                    }
                }

                /* Microinteracciones */
                .nav-item:active {
                    transform: scale(0.95);
                }

                .nav-item:active .nav-icon {
                    transform: translateY(0);
                }

                /* Efecto de hover mejorado */
                @media (hover: hover) {
                    .nav-item:hover .nav-icon {
                        transform: translateY(-2px);
                    }
                    
                    .nav-item:hover .nav-label {
                        transform: translateY(-1px);
                    }
                }
            `}</style>
        </nav>
    );
};

export default NavBar;
