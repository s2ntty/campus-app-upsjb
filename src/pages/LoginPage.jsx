import React, { useState, useEffect } from 'react';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { authService } from '../lib/firebase-config';

const LoginPage = ({ onLogin, onShowRegistration }) => {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // SupabaseStatus ya no es relevante, pero mantengamos la estructura
    const [supabaseStatus, setSupabaseStatus] = useState('checking');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        // Log de configuración de Firebase
        console.log('🔥 Firebase Config cargado correctamente');
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onLogin();
            setLoading(false);
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            console.log('🚀 Intentando Google OAuth...');

            await authService.signInWithGoogle();
            // El redirect se maneja automáticamente por Supabase
        } catch (error) {
            console.error('❌ Error al iniciar sesión con Google:', error);

            // Solo mostrar error si realmente hay un problema técnico
            if (error.message?.includes('popup_closed_by_user')) {
                console.log('👤 Usuario cerró el popup de Google');
                // No mostrar error si el usuario simplemente cerró el popup
            } else {
                alert(`Error al iniciar sesión con Google: ${error.message}`);
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-container">
            {/* Header con gradiente */}
            <div className="login-header">
                <div className="login-header-content">
                    <div className="login-logo-container">
                        <div className="login-logo">
                            <img
                                src="/seagull-logo.png"
                                alt="UNPSJB"
                                className="logo-image"
                            />
                        </div>
                    </div>
                    <div className="login-title-section">
                        <h1 className="login-title">Campus UNPSJB</h1>
                        <p className="login-subtitle">Tu portal académico universitario</p>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="login-form-container">
                <div className="login-welcome">
                    <h2 className="welcome-title">Bienvenido</h2>
                    <p className="welcome-subtitle">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label className="input-label">DNI o Usuario</label>
                        <input
                            type="text"
                            name="username"
                            className="input-field"
                            placeholder="Ej: 42123456"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Contraseña</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input-field password-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="login-options">
                        <label className="checkbox-container">
                            <input type="checkbox" className="checkbox" />
                            <span className="checkbox-label">Recordarme</span>
                        </label>
                        <button type="button" className="forgot-password">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary btn-large btn-full ${loading ? 'btn-loading' : ''}`}
                        disabled={loading || googleLoading}
                    >
                        {loading ? (
                            <div className="loading-content">
                                <div className="loading-spinner"></div>
                                Ingresando...
                            </div>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>

                    {/* Separador */}
                    <div className="login-separator">
                        <div className="separator-line"></div>
                        <span className="separator-text">o continúa con</span>
                        <div className="separator-line"></div>
                    </div>

                    {/* Botón de Google */}
                    <button
                        type="button"
                        className={`btn btn-google btn-large btn-full ${googleLoading ? 'btn-loading' : ''}`}
                        onClick={handleGoogleLogin}
                        disabled={loading || googleLoading}
                    >
                        {googleLoading ? (
                            <div className="loading-content">
                                <div className="loading-spinner"></div>
                                Conectando...
                            </div>
                        ) : (
                            <div className="google-btn-content">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continuar con Google
                            </div>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="footer-text">
                        ¿No tienes cuenta?{' '}
                        <button className="footer-link" onClick={onShowRegistration}>
                            Crear cuenta
                        </button>
                    </p>
                    <p className="footer-text">
                        ¿Problemas para ingresar?{' '}
                        <button className="footer-link">
                            Contacta soporte
                        </button>
                    </p>
                </div>
            </div>

            <style jsx="true">{`
                .login-container {
                    min-height: 100vh;
                    background: var(--background);
                    display: flex;
                    flex-direction: column;
                }

                .login-header {
                    background: var(--primary-gradient);
                    padding: var(--spacing-2xl) var(--spacing-lg) var(--spacing-xl);
                    border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
                    position: relative;
                    overflow: hidden;
                }

                .login-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                    pointer-events: none;
                }

                .login-header-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }

                .login-logo-container {
                    margin-bottom: var(--spacing-lg);
                }

                .login-logo {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-xl);
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .logo-image {
                    width: 50px;
                    height: 50px;
                    object-fit: contain;
                }

                .login-title {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: var(--spacing-sm);
                    letter-spacing: -0.02em;
                }

                .login-subtitle {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                }

                .login-form-container {
                    flex: 1;
                    padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                }

                .login-welcome {
                    text-align: center;
                    margin-bottom: var(--spacing-2xl);
                }

                .welcome-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                    letter-spacing: -0.01em;
                }

                .welcome-subtitle {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .login-form {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }

                .password-input-container {
                    position: relative;
                }

                .password-input {
                    padding-right: 3rem;
                }

                .password-toggle {
                    position: absolute;
                    right: var(--spacing-md);
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: var(--text-tertiary);
                    cursor: pointer;
                    padding: var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    transition: all 0.2s ease;
                }

                .password-toggle:hover {
                    color: var(--text-secondary);
                    background: var(--background-secondary);
                }

                .login-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: var(--spacing-md) 0;
                }

                .checkbox-container {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    cursor: pointer;
                }

                .checkbox {
                    width: 18px;
                    height: 18px;
                    border-radius: var(--radius-sm);
                    border: 2px solid var(--border-medium);
                    background: var(--surface);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .checkbox:checked {
                    background: var(--primary);
                    border-color: var(--primary);
                }

                .checkbox-label {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .forgot-password {
                    font-size: 0.875rem;
                    color: var(--primary);
                    font-weight: 600;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .forgot-password:hover {
                    color: var(--primary-dark);
                    text-decoration: underline;
                }

                .btn-loading {
                    opacity: 0.8;
                    cursor: not-allowed;
                }

                .login-separator {
                    display: flex;
                    align-items: center;
                    margin: var(--spacing-lg) 0;
                    gap: var(--spacing-md);
                }

                .separator-line {
                    flex: 1;
                    height: 1px;
                    background: var(--border-light);
                }

                .separator-text {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                    white-space: nowrap;
                }

                .btn-google {
                    background: var(--surface);
                    color: var(--text-primary);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    transition: all 0.2s ease;
                }

                .btn-google:hover {
                    background: var(--background-secondary);
                    box-shadow: var(--shadow-md);
                    transform: translateY(-1px);
                    border-color: var(--border-medium);
                }

                .btn-google:active {
                    transform: translateY(0);
                }

                .google-btn-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-sm);
                    font-weight: 600;
                }

                .loading-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-sm);
                }

                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .login-footer {
                    margin-top: auto;
                    padding-top: var(--spacing-lg);
                    text-align: center;
                }

                .footer-text {
                    font-size: 0.875rem;
                    color: var(--text-tertiary);
                    line-height: 1.5;
                }

                .footer-link {
                    color: var(--primary);
                    font-weight: 600;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .footer-link:hover {
                    color: var(--primary-dark);
                    text-decoration: underline;
                }

                /* Animaciones de entrada */
                .login-header {
                    animation: slideDown 0.6s ease-out;
                }

                .login-form-container {
                    animation: slideUp 0.6s ease-out 0.2s both;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .login-header {
                        padding: var(--spacing-xl) var(--spacing-md) var(--spacing-lg);
                    }
                    
                    .login-form-container {
                        padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
                    }
                    
                    .login-title {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
