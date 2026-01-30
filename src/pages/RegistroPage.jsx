import React, { useState } from 'react';
import { GraduationCap, Eye, EyeOff, User, Mail, Phone, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { authService } from '../lib/firebase-config';

const RegistroPage = ({ onRegister, onShowLogin, user, onLogout }) => {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Si ya hay usuario (viene de Google), empezamos en el paso 2
    const [currentStep, setCurrentStep] = useState(user ? 2 : 1);

    const [formData, setFormData] = useState({
        // Datos personales
        nombre: user?.displayName?.split(' ')[0] || '',
        apellido: user?.displayName?.split(' ').slice(1).join(' ') || '',
        dni: '',
        email: user?.email || '',
        telefono: '',
        fechaNacimiento: '',
        genero: '',

        // Datos académicos
        carrera: '',
        sede: '',
        anioIngreso: '',

        // Credenciales (solo si no viene de Google)
        password: '',
        confirmPassword: ''
    });

    const carreras = [
        { id: 'medicina', nombre: 'Medicina', facultad: 'F.C.N y C.S', sedes: ['Comodoro Rivadavia', 'Trelew'] },
        { id: 'informatica', nombre: 'Analista Programador', facultad: 'F.I.', sedes: ['Comodoro Rivadavia', 'Puerto Madryn'] },
        { id: 'enfermeria', nombre: 'Enfermería', facultad: 'F.C.N y C.S', sedes: ['Comodoro Rivadavia', 'Trelew', 'Esquel'] },
        { id: 'geologia', nombre: 'Geología', facultad: 'F.C.N y C.S', sedes: ['Comodoro Rivadavia'] },
        { id: 'ingenieria_petroleo', nombre: 'Ingeniería en Petróleo', facultad: 'F.I.', sedes: ['Comodoro Rivadavia'] },
        { id: 'psicologia', nombre: 'Psicología', facultad: 'F.H y C.S', sedes: ['Comodoro Rivadavia', 'Trelew'] },
        { id: 'trabajo_social', nombre: 'Trabajo Social', facultad: 'F.H y C.S', sedes: ['Comodoro Rivadavia'] },
        { id: 'turismo', nombre: 'Turismo', facultad: 'F.H y C.S', sedes: ['Puerto Madryn', 'Ushuaia'] }
    ];

    const generos = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' },
        { value: 'No binario', label: 'No binario' },
        { value: 'Prefiero no decir', label: 'Prefiero no decir' }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    // Actualizar formulario si llega un usuario (ej: después del login con Google)
    React.useEffect(() => {
        if (user) {
            console.log("👤 Usuario detectado en RegistroPage:", user.email);
            setFormData(prev => ({
                ...prev,
                nombre: user.displayName?.split(' ')[0] || prev.nombre,
                apellido: user.displayName?.split(' ').slice(1).join(' ') || prev.apellido,
                email: user.email || prev.email,
                // Si ya tenemos fecha de nacimiento o género guardado en el user_metadata, podríamos usarlo aquí
            }));
            // Avanzar al paso 2 automáticamente si estamos en el 1
            setCurrentStep(prev => prev === 1 ? 2 : prev);
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNextStep = () => {
        if (currentStep < 3) {
            // Si viene de Google y estamos en paso 2, saltamos paso 3 (password) y terminamos
            if (user && currentStep === 2) {
                completeRegistration();
            } else {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            // Si viene de Google y estamos en paso 2, no dejamos volver al 1
            if (user && currentStep === 2) return;
            setCurrentStep(currentStep - 1);
        }
    };

    const completeRegistration = async () => {
        setLoading(true);
        try {
            // Guardar datos del usuario en localStorage
            const userData = {
                name: `${formData.nombre} ${formData.apellido}`,
                carrera: `${carreras.find(c => c.id === formData.carrera)?.nombre} • Sede ${formData.sede}`,
                email: formData.email,
                dni: formData.dni,
                telefono: formData.telefono,
                fechaNacimiento: formData.fechaNacimiento,
                gender: formData.genero,
                carreraId: formData.carrera,
                sede: formData.sede,
                anioIngreso: formData.anioIngreso,
                photo: user?.photoURL || null,
                notes: ''
            };

            localStorage.setItem('user_profile', JSON.stringify(userData));

            // Si hay usuario (Google), actualizamos su perfil en Firestore
            if (user) {
                await authService.createOrUpdateProfile({
                    ...user,
                    user_metadata: {
                        ...user.user_metadata,
                        full_name: userData.name,
                        avatar_url: userData.photo
                    },
                    ...userData // Pasamos todos los datos extra
                });
            }

            onRegister();
        } catch (error) {
            console.error("Error completando registro:", error);
            alert("Hubo un error al guardar tus datos. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!user && formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        completeRegistration();
    };

    const handleGoogleRegister = async () => {
        try {
            setGoogleLoading(true);
            console.log('🚀 Intentando Google OAuth registro...');

            await authService.signUpWithGoogle();
            // El estado cambiará en App.jsx y nos redirigirá o actualizará
        } catch (error) {
            console.error('❌ Error al registrarse con Google:', error);

            // Solo mostrar error si realmente hay un problema técnico
            if (error.message?.includes('popup_closed_by_user')) {
                console.log('👤 Usuario cerró el popup de Google');
            } else {
                alert(`Error al registrarse con Google: ${error.message}`);
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.nombre && formData.apellido && formData.dni && formData.email && formData.genero;
            case 2:
                // Si viene de Google, requerimos DNI y Genero aquí también por si acaso no lo llenó antes (ya que paso 1 se salta)
                const basicDataOk = user ? (formData.dni && formData.genero) : true;
                return basicDataOk && formData.carrera && formData.sede && formData.anioIngreso;
            case 3:
                return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
            default:
                return false;
        }
    };

    const selectedCarrera = carreras.find(c => c.id === formData.carrera);

    return (
        <div className="registro-container">
            {/* Header con progreso */}
            <div className="registro-header">
                <div className="registro-header-content">
                    <div className="registro-logo-container">
                        <div className="registro-logo">
                            <img
                                src="/seagull-logo.png"
                                alt="UNPSJB"
                                className="logo-image"
                            />
                        </div>
                    </div>
                    <div className="registro-title-section">
                        <h1 className="registro-title">Crear Cuenta</h1>
                        <p className="registro-subtitle">Únete a la comunidad UNPSJB</p>
                    </div>

                    {/* Indicador de progreso */}
                    <div className="progress-indicator">
                        <div className="progress-steps">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
                                    <div className="step-number">{step}</div>
                                    <div className="step-label">
                                        {step === 1 && 'Personal'}
                                        {step === 2 && 'Académico'}
                                        {step === 3 && 'Seguridad'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="registro-form-container">
                {user ? (
                    <div className="google-welcome-section" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>¡Hola, {user.displayName?.split(' ')[0]}! 👋</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Para terminar tu registro, necesitamos unos datos más.</p>
                        {onLogout && (
                            <button
                                onClick={onLogout}
                                className="btn-link"
                                style={{
                                    marginTop: '0.5rem',
                                    color: 'var(--primary)',
                                    fontSize: '0.9rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                ¿No eres tú? Cambiar cuenta
                            </button>
                        )}
                    </div>
                ) : (
                    /* Botón de Google - Siempre visible si no hay usuario */
                    <div className="google-register-section">
                        <button
                            type="button"
                            className={`btn btn-google btn-large btn-full ${googleLoading ? 'btn-loading' : ''}`}
                            onClick={handleGoogleRegister}
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
                                    Registrarse con Google
                                </div>
                            )}
                        </button>

                        {/* Separador */}
                        <div className="register-separator">
                            <div className="separator-line"></div>
                            <span className="separator-text">o completa el formulario</span>
                            <div className="separator-line"></div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleRegister} className="registro-form">
                    {/* Paso 1: Datos Personales (Solo si no hay usuario) */}
                    {currentStep === 1 && !user && (
                        <div className="form-step">
                            <div className="step-header">
                                <h2 className="step-title">Datos Personales</h2>
                                <p className="step-subtitle">Información básica para tu perfil</p>
                            </div>

                            <div className="form-grid">
                                <div className="input-group">
                                    <label className="input-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="input-field"
                                        placeholder="Tu nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Apellido</label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        className="input-field"
                                        placeholder="Tu apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    className="input-field"
                                    placeholder="Ej: 42123456"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    placeholder="tu.email@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-grid">
                                <div className="input-group">
                                    <label className="input-label">Teléfono (opcional)</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        className="input-field"
                                        placeholder="Ej: 2974123456"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        name="fechaNacimiento"
                                        className="input-field"
                                        value={formData.fechaNacimiento}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Género</label>
                                <div className="select-container">
                                    <select
                                        name="genero"
                                        className="input-field select-field"
                                        value={formData.genero}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecciona tu género</option>
                                        {generos.map((genero) => (
                                            <option key={genero.value} value={genero.value}>
                                                {genero.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="select-icon" size={20} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Paso 2: Datos Académicos */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <div className="step-header">
                                <h2 className="step-title">Información Académica</h2>
                                <p className="step-subtitle">Selecciona tu carrera y sede</p>
                            </div>

                            {/* Si viene de Google, mostramos DNI y Género aquí porque saltamos el paso 1 */}
                            {user && (
                                <div className="form-grid">
                                    <div className="input-group">
                                        <label className="input-label">DNI</label>
                                        <input
                                            type="text"
                                            name="dni"
                                            className="input-field"
                                            placeholder="Ej: 42123456"
                                            value={formData.dni}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Género</label>
                                        <div className="select-container">
                                            <select
                                                name="genero"
                                                className="input-field select-field"
                                                value={formData.genero}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Selecciona tu género</option>
                                                {generos.map((genero) => (
                                                    <option key={genero.value} value={genero.value}>
                                                        {genero.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="select-icon" size={20} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="input-group">
                                <label className="input-label">Carrera</label>
                                <div className="select-container">
                                    <select
                                        name="carrera"
                                        className="input-field select-field"
                                        value={formData.carrera}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecciona tu carrera</option>
                                        {carreras.map((carrera) => (
                                            <option key={carrera.id} value={carrera.id}>
                                                {carrera.nombre} - {carrera.facultad}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="select-icon" size={20} />
                                </div>
                            </div>

                            {selectedCarrera && (
                                <div className="input-group">
                                    <label className="input-label">Sede</label>
                                    <div className="select-container">
                                        <select
                                            name="sede"
                                            className="input-field select-field"
                                            value={formData.sede}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Selecciona tu sede</option>
                                            {selectedCarrera.sedes.map((sede) => (
                                                <option key={sede} value={sede}>
                                                    {sede}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="select-icon" size={20} />
                                    </div>
                                </div>
                            )}

                            <div className="input-group">
                                <label className="input-label">Año de Ingreso</label>
                                <div className="select-container">
                                    <select
                                        name="anioIngreso"
                                        className="input-field select-field"
                                        value={formData.anioIngreso}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecciona el año</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="select-icon" size={20} />
                                </div>
                            </div>

                            {selectedCarrera && (
                                <div className="career-preview">
                                    <div className="career-preview-header">
                                        <GraduationCap size={24} />
                                        <div>
                                            <h3 className="career-preview-title">{selectedCarrera.nombre}</h3>
                                            <p className="career-preview-faculty">{selectedCarrera.facultad}</p>
                                        </div>
                                    </div>
                                    {formData.sede && (
                                        <div className="career-preview-details">
                                            <div className="preview-detail">
                                                <MapPin size={16} />
                                                <span>Sede {formData.sede}</span>
                                            </div>
                                            {formData.anioIngreso && (
                                                <div className="preview-detail">
                                                    <Calendar size={16} />
                                                    <span>Ingreso {formData.anioIngreso}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Paso 3: Seguridad */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <div className="step-header">
                                <h2 className="step-title">Crear Contraseña</h2>
                                <p className="step-subtitle">Protege tu cuenta con una contraseña segura</p>
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

                            <div className="input-group">
                                <label className="input-label">Confirmar Contraseña</label>
                                <div className="password-input-container">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="input-field password-input"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <div className="error-message">
                                        Las contraseñas no coinciden
                                    </div>
                                )}
                            </div>

                            <div className="password-requirements">
                                <h4 className="requirements-title">Requisitos de contraseña:</h4>
                                <ul className="requirements-list">
                                    <li className={formData.password.length >= 8 ? 'valid' : ''}>
                                        Mínimo 8 caracteres
                                    </li>
                                    <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                                        Al menos una mayúscula
                                    </li>
                                    <li className={/[0-9]/.test(formData.password) ? 'valid' : ''}>
                                        Al menos un número
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Botones de navegación */}
                    <div className="form-navigation">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                className="btn btn-secondary btn-large"
                                onClick={handlePrevStep}
                                // Hide "Anterior" if we are in onboarding mode (step 2 locked)
                                style={user ? { visibility: 'hidden' } : {}}
                            >
                                Anterior
                            </button>
                        )}

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                className={`btn btn-primary btn-large ${!isStepValid() ? 'btn-disabled' : ''}`}
                                onClick={handleNextStep}
                                disabled={!isStepValid()}
                            >
                                {user ? 'Finalizar Registro' : 'Siguiente'}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className={`btn btn-primary btn-large ${loading ? 'btn-loading' : ''} ${!isStepValid() ? 'btn-disabled' : ''}`}
                                disabled={loading || !isStepValid()}
                            >
                                {loading ? (
                                    <div className="loading-content">
                                        <div className="loading-spinner"></div>
                                        Creando cuenta...
                                    </div>
                                ) : (
                                    'Crear Cuenta'
                                )}
                            </button>
                        )}
                    </div>
                </form>

                <div className="registro-footer">
                    <p className="footer-text">
                        ¿Ya tienes cuenta?{' '}
                        <button className="footer-link" onClick={onShowLogin}>
                            Iniciar Sesión
                        </button>
                    </p>
                </div>
            </div>

            <style jsx="true">{`
                .registro-container {
                    min-height: 100vh;
                    background: var(--background);
                    display: flex;
                    flex-direction: column;
                }

                .registro-header {
                    background: var(--primary-gradient);
                    padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
                    border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
                    position: relative;
                    overflow: hidden;
                }

                .registro-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                    pointer-events: none;
                }

                .registro-header-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }

                .registro-logo-container {
                    margin-bottom: var(--spacing-md);
                }

                .registro-logo {
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-lg);
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .logo-image {
                    width: 35px;
                    height: 35px;
                    object-fit: contain;
                }

                .registro-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: var(--spacing-xs);
                    letter-spacing: -0.02em;
                }

                .registro-subtitle {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                    margin-bottom: var(--spacing-lg);
                }

                .progress-indicator {
                    margin-top: var(--spacing-lg);
                }

                .progress-steps {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-md);
                }

                .progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-xs);
                    flex: 1;
                }

                .step-number {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.7);
                    transition: all 0.3s ease;
                }

                .progress-step.active .step-number {
                    background: white;
                    border-color: white;
                    color: var(--primary);
                }

                .step-label {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .progress-step.active .step-label {
                    color: white;
                }

                .progress-bar {
                    height: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-full);
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: white;
                    border-radius: var(--radius-full);
                    transition: width 0.3s ease;
                }

                .registro-form-container {
                    flex: 1;
                    padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                }

                .google-register-section {
                    margin-bottom: var(--spacing-xl);
                }

                .register-separator {
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
                    color: var(--text-tertiary);
                    font-weight: 500;
                    white-space: nowrap;
                }

                .btn-google {
                    background: white;
                    color: var(--text-primary);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    transition: all 0.2s ease;
                }

                .btn-google:hover {
                    background: var(--background-secondary);
                    box-shadow: var(--shadow-md);
                    transform: translateY(-1px);
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

                .registro-form {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .form-step {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    animation: slideIn 0.3s ease-out;
                }

                .step-header {
                    text-align: center;
                    margin-bottom: var(--spacing-xl);
                }

                .step-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                    letter-spacing: -0.01em;
                }

                .step-subtitle {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-lg);
                }

                .input-group {
                    margin-bottom: var(--spacing-lg);
                }

                .select-container {
                    position: relative;
                }

                .select-field {
                    appearance: none;
                    padding-right: 3rem;
                }

                .select-icon {
                    position: absolute;
                    right: var(--spacing-md);
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-tertiary);
                    pointer-events: none;
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

                .error-message {
                    margin-top: var(--spacing-xs);
                    font-size: 0.75rem;
                    color: var(--error);
                    font-weight: 500;
                }

                .password-requirements {
                    background: var(--surface);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md);
                    margin-top: var(--spacing-md);
                }

                .requirements-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                }

                .requirements-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }

                .requirements-list li {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                    position: relative;
                    padding-left: var(--spacing-md);
                }

                .requirements-list li::before {
                    content: '✗';
                    position: absolute;
                    left: 0;
                    color: var(--error);
                    font-weight: 700;
                }

                .requirements-list li.valid {
                    color: var(--success);
                }

                .requirements-list li.valid::before {
                    content: '✓';
                    color: var(--success);
                }

                .career-preview {
                    background: var(--surface);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    margin-top: var(--spacing-md);
                }

                .career-preview-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-md);
                }

                .career-preview-header svg {
                    color: var(--primary);
                    flex-shrink: 0;
                }

                .career-preview-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-xs);
                }

                .career-preview-faculty {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .career-preview-details {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }

                .preview-detail {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }

                .preview-detail svg {
                    color: var(--text-tertiary);
                    flex-shrink: 0;
                }

                .form-navigation {
                    display: flex;
                    gap: var(--spacing-md);
                    margin-top: auto;
                    padding-top: var(--spacing-xl);
                }

                .form-navigation .btn {
                    flex: 1;
                }

                .btn-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .btn-loading {
                    opacity: 0.8;
                    cursor: not-allowed;
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

                .registro-footer {
                    margin-top: var(--spacing-lg);
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
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .footer-link:hover {
                    color: var(--primary-dark);
                    text-decoration: underline;
                }

                /* Animaciones */
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .registro-header {
                    animation: slideDown 0.6s ease-out;
                }

                .registro-form-container {
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
                    .registro-header {
                        padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
                    }
                    
                    .registro-form-container {
                        padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
                    }
                    
                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: var(--spacing-md);
                    }
                    
                    .progress-steps {
                        gap: var(--spacing-sm);
                    }
                    
                    .step-number {
                        width: 28px;
                        height: 28px;
                        font-size: 0.75rem;
                    }
                    
                    .step-label {
                        font-size: 0.625rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegistroPage;