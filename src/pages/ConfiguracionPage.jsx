import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, X, Save, Camera, User, Sun, Moon, LogOut, ChevronRight, ArrowLeft } from 'lucide-react';

const ConfiguracionPage = ({ onLogout, theme, toggleTheme, userData, setUserData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(userData);
    const fileInputRef = useRef(null);

    const handleEdit = () => {
        setIsEditing(true);
        setTempData(userData);
    };

    const handleSave = () => {
        setUserData(tempData);
        localStorage.setItem('user_profile', JSON.stringify(tempData));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempData(userData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData({ ...tempData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="config-container">
            {/* Header */}
            <div className="config-header">
                <Link to="/" className="back-button">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="config-title">Configuración</h1>
                {!isEditing ? (
                    <button onClick={handleEdit} className="edit-button">
                        <Edit2 size={18} />
                    </button>
                ) : (
                    <div className="edit-actions">
                        <button onClick={handleCancel} className="cancel-button">
                            <X size={18} />
                        </button>
                        <button onClick={handleSave} className="save-button">
                            <Save size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div className="config-content">
                {/* Perfil Section */}
                <div className="profile-section">
                    <div className="profile-photo-container">
                        <div className="profile-photo">
                            {tempData.photo ? (
                                <img src={tempData.photo} alt="Profile" className="photo-image" />
                            ) : (
                                <div className="photo-placeholder">
                                    <User size={40} />
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="photo-edit-button"
                            >
                                <Camera size={16} />
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>

                    <div className="profile-info">
                        {!isEditing ? (
                            <>
                                <h2 className="profile-name">{userData.name}</h2>
                                <p className="profile-career">{userData.carrera}</p>
                                {userData.gender && (
                                    <p className="profile-gender">{userData.gender}</p>
                                )}
                            </>
                        ) : (
                            <div className="edit-form">
                                <div className="input-group">
                                    <label className="input-label">Nombre completo</label>
                                    <input
                                        type="text"
                                        value={tempData.name}
                                        onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                        className="input-field"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Carrera</label>
                                    <input
                                        type="text"
                                        value={tempData.carrera}
                                        onChange={(e) => setTempData({ ...tempData, carrera: e.target.value })}
                                        className="input-field"
                                        placeholder="Tu carrera universitaria"
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Género</label>
                                    <select
                                        value={tempData.gender}
                                        onChange={(e) => setTempData({ ...tempData, gender: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="">Seleccionar género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="No Binario">No Binario</option>
                                        <option value="Otro">Otro</option>
                                        <option value="Prefiero no decir">Prefiero no decir</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Notas Section */}
                <div className="notes-section">
                    <h3 className="section-title">Mis Notas 📝</h3>
                    <div className="notes-card">
                        <textarea
                            className="notes-textarea"
                            placeholder="Escribe aquí tus recordatorios, ideas o notas..."
                            value={isEditing ? tempData.notes : userData.notes}
                            onChange={(e) => isEditing && setTempData({ ...tempData, notes: e.target.value })}
                            readOnly={!isEditing}
                        />
                    </div>
                </div>

                {/* Configuración Section */}
                <div className="settings-section">
                    <h3 className="section-title">Preferencias</h3>

                    <div className="setting-item" onClick={toggleTheme}>
                        <div className="setting-info">
                            <div className="setting-icon">
                                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            </div>
                            <div className="setting-text">
                                <span className="setting-name">Tema</span>
                                <span className="setting-description">
                                    Modo {theme === 'dark' ? 'oscuro' : 'claro'}
                                </span>
                            </div>
                        </div>
                        <div className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}>
                            <div className="toggle-thumb"></div>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="logout-section">
                    <button className="logout-button" onClick={onLogout}>
                        <LogOut size={20} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .config-container {
                    min-height: 100vh;
                    background: var(--background);
                    padding-bottom: 100px;
                }

                .config-header {
                    background: var(--surface);
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    backdrop-filter: blur(20px);
                    background: var(--surface-overlay);
                }

                .back-button {
                    width: 36px;
                    height: 36px;
                    border-radius: var(--radius-full);
                    background: var(--background-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-primary);
                    transition: all 0.2s ease;
                    border: 1px solid var(--border-light);
                }

                .back-button:hover {
                    background: var(--surface);
                    transform: scale(1.05);
                    border-color: var(--primary);
                }

                .config-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .edit-button {
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: var(--radius-full);
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .edit-button:hover {
                    background: var(--primary-dark);
                    transform: scale(1.05);
                }

                .edit-actions {
                    display: flex;
                    gap: var(--spacing-sm);
                }

                .cancel-button, .save-button {
                    width: 36px;
                    height: 36px;
                    border-radius: var(--radius-full);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .cancel-button {
                    background: var(--background-secondary);
                    color: var(--text-secondary);
                }

                .cancel-button:hover {
                    background: var(--error-light);
                    color: var(--error);
                }

                .save-button {
                    background: var(--primary);
                    color: white;
                }

                .save-button:hover {
                    background: var(--primary-dark);
                    transform: scale(1.05);
                }

                .config-content {
                    padding: var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .profile-section {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    text-align: center;
                    animation: slideUp 0.6s ease-out;
                }

                .profile-photo-container {
                    position: relative;
                    display: inline-block;
                    margin-bottom: var(--spacing-lg);
                }

                .profile-photo {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid var(--border-light);
                    background: var(--background-secondary);
                    position: relative;
                }

                .photo-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .photo-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-tertiary);
                }

                .photo-edit-button {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: var(--shadow-md);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .photo-edit-button:hover {
                    background: var(--primary-dark);
                    transform: scale(1.1);
                }

                .profile-name {
                    font-size: 1.375rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-sm) 0;
                    letter-spacing: -0.01em;
                }

                .profile-career {
                    font-size: 0.9375rem;
                    color: var(--text-secondary);
                    margin: 0 0 var(--spacing-xs) 0;
                    font-weight: 500;
                }

                .profile-gender {
                    font-size: 0.8125rem;
                    color: var(--text-tertiary);
                    margin: 0;
                    font-weight: 500;
                }

                .edit-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                    text-align: left;
                }

                .notes-section {
                    animation: slideUp 0.6s ease-out 0.1s both;
                }

                .section-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-lg);
                    letter-spacing: -0.01em;
                }

                .notes-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    overflow: hidden;
                }

                .notes-textarea {
                    width: 100%;
                    min-height: 120px;
                    border: none;
                    background: transparent;
                    padding: var(--spacing-lg);
                    resize: none;
                    color: var(--text-primary);
                    font-size: 0.95rem;
                    font-family: inherit;
                    line-height: 1.6;
                    outline: none;
                }

                .notes-textarea::placeholder {
                    color: var(--text-tertiary);
                }

                .settings-section {
                    animation: slideUp 0.6s ease-out 0.2s both;
                }

                .setting-item {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .setting-item:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                }

                .setting-info {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .setting-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: var(--radius-lg);
                    background: var(--primary);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .setting-text {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }

                .setting-name {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .setting-description {
                    font-size: 0.8125rem;
                    color: var(--text-secondary);
                }

                .toggle-switch {
                    width: 50px;
                    height: 28px;
                    background: var(--border-medium);
                    border-radius: var(--radius-full);
                    position: relative;
                    transition: all 0.3s ease;
                }

                .toggle-switch.active {
                    background: var(--primary);
                }

                .toggle-thumb {
                    width: 24px;
                    height: 24px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow-sm);
                }

                .toggle-switch.active .toggle-thumb {
                    left: 24px;
                }

                .logout-section {
                    animation: slideUp 0.6s ease-out 0.3s both;
                }

                .logout-button {
                    width: 100%;
                    background: var(--error);
                    color: white;
                    border: none;
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    font-size: 1rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-sm);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: var(--shadow-sm);
                }

                .logout-button:hover {
                    background: #dc2626;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }

                .logout-button:active {
                    transform: translateY(0);
                }

                /* Responsive */
                @media (max-width: 375px) {
                    .config-content {
                        padding: var(--spacing-md);
                    }
                    
                    .profile-section {
                        padding: var(--spacing-lg);
                    }
                    
                    .profile-name {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ConfiguracionPage;