import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, X, Save, Camera, User, Sun, Moon, LogOut, ChevronRight, ArrowLeft, FileText, Upload, Trash2, Eye } from 'lucide-react';
import { authService } from '../lib/auth-service';
import { documentosService } from '../lib/documentos-service';
import PDFViewer from '../components/PDFViewer';
import CustomAlert from '../components/CustomAlert';

const ConfiguracionPage = ({ onLogout, theme, toggleTheme, userData, setUserData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(userData);
    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);
    
    // Estados para documentos
    const [documentos, setDocumentos] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(true);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [showPDFViewer, setShowPDFViewer] = useState(false);
    
    // Estados para alertas
    const [alert, setAlert] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null,
        showCancel: false
    });

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

    // Cargar documentos
    useEffect(() => {
        loadDocumentos();
    }, []);

    const loadDocumentos = async () => {
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                setLoadingDocs(false);
                return;
            }

            const docs = await documentosService.getDocumentos(user.uid);
            setDocumentos(docs);
            setLoadingDocs(false);
        } catch (error) {
            console.error('Error cargando documentos:', error);
            setLoadingDocs(false);
        }
    };

    const handlePDFUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Validar archivo
            documentosService.validatePDF(file);

            // Verificar límite de documentos (máximo 2)
            if (documentos.length >= 2) {
                setAlert({
                    isOpen: true,
                    title: 'Límite alcanzado',
                    message: 'Solo puedes guardar hasta 2 documentos. Elimina uno para agregar otro.',
                    type: 'error',
                    onConfirm: null,
                    showCancel: false
                });
                return;
            }

            const user = await authService.getCurrentUser();
            if (!user) {
                setAlert({
                    isOpen: true,
                    title: 'Error',
                    message: 'Debes iniciar sesión',
                    type: 'error',
                    onConfirm: null,
                    showCancel: false
                });
                return;
            }

            // Guardar documento
            await documentosService.saveDocumento(user.uid, file);
            await loadDocumentos();

            setAlert({
                isOpen: true,
                title: '¡Éxito!',
                message: 'Documento guardado correctamente',
                type: 'success',
                onConfirm: null,
                showCancel: false
            });
        } catch (error) {
            setAlert({
                isOpen: true,
                title: 'Error',
                message: error.message,
                type: 'error',
                onConfirm: null,
                showCancel: false
            });
        }

        // Limpiar input
        e.target.value = '';
    };

    const handleDeleteDocumento = (documentoId) => {
        setAlert({
            isOpen: true,
            title: '¿Eliminar documento?',
            message: '¿Estás seguro de eliminar este documento?',
            type: 'confirm',
            showCancel: true,
            onConfirm: async () => {
                try {
                    await documentosService.deleteDocumento(documentoId);
                    await loadDocumentos();
                    setAlert({
                        isOpen: true,
                        title: 'Eliminado',
                        message: 'Documento eliminado correctamente',
                        type: 'success',
                        onConfirm: null,
                        showCancel: false
                    });
                } catch (error) {
                    setAlert({
                        isOpen: true,
                        title: 'Error',
                        message: `Error al eliminar: ${error.message}`,
                        type: 'error',
                        onConfirm: null,
                        showCancel: false
                    });
                }
            }
        });
    };

    const handleViewPDF = (documento) => {
        setSelectedPDF({
            url: documento.archivo_base64,
            name: documento.nombre
        });
        setShowPDFViewer(true);
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

                {/* Documentos Section */}
                <div className="documents-section">
                    <h3 className="section-title">Mis Documentos 📄</h3>
                    
                    {loadingDocs ? (
                        <div className="loading-docs">Cargando documentos...</div>
                    ) : documentos.length === 0 ? (
                        <div className="empty-documents">
                            <div className="empty-icon">📄</div>
                            <h4 className="empty-title">Sin documentos</h4>
                            <p className="empty-message">
                                Agrega tus certificados de alumno regular o códigos de barras de biblioteca
                            </p>
                            <button className="btn-add-doc" onClick={() => pdfInputRef.current.click()}>
                                <Upload size={18} />
                                Agregar primer documento
                            </button>
                        </div>
                    ) : (
                        <div className="documents-grid">
                            {documentos.map((doc) => (
                                <div key={doc.id} className="document-card" onClick={() => handleViewPDF(doc)}>
                                    <div className="document-icon">
                                        <FileText size={32} />
                                    </div>
                                    <div className="document-info">
                                        <h4 className="document-name">{doc.nombre}</h4>
                                        <p className="document-size">{documentosService.formatFileSize(doc.tamano)}</p>
                                    </div>
                                    <div className="document-actions" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            className="doc-action-btn view"
                                            onClick={() => handleViewPDF(doc)}
                                            title="Ver documento"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button 
                                            className="doc-action-btn delete"
                                            onClick={() => handleDeleteDocumento(doc.id)}
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {documentos.length < 2 && (
                                <div className="add-more-container">
                                    <button className="btn-add-doc" onClick={() => pdfInputRef.current.click()}>
                                        <Upload size={18} />
                                        Agregar documento
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <input
                        type="file"
                        ref={pdfInputRef}
                        onChange={handlePDFUpload}
                        style={{ display: 'none' }}
                        accept="application/pdf"
                    />
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
                    margin-bottom: var(--spacing-sm);
                    letter-spacing: -0.01em;
                }

                .section-subtitle {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-lg);
                }

                /* Documents Section */
                .documents-section {
                    animation: slideUp 0.6s ease-out 0.1s both;
                }

                .documents-grid {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }

                .document-card {
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-lg);
                    border: 1px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .document-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    border-color: var(--primary-light);
                }

                .document-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius-lg);
                    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                    color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .document-info {
                    flex: 1;
                    min-width: 0;
                }

                .document-name {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 4px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .document-size {
                    font-size: 0.8125rem;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .document-actions {
                    display: flex;
                    gap: var(--spacing-xs);
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                }

                .document-card:hover .document-actions {
                    opacity: 1;
                    transform: translateX(0);
                }

                .doc-action-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: var(--radius-lg);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .doc-action-btn.view {
                    background: rgba(59, 130, 246, 0.1);
                    color: var(--primary);
                }

                .doc-action-btn.view:hover {
                    background: var(--primary);
                    color: white;
                    transform: scale(1.1);
                }

                .doc-action-btn.delete {
                    background: rgba(239, 68, 68, 0.1);
                    color: var(--error);
                }

                .doc-action-btn.delete:hover {
                    background: var(--error);
                    color: white;
                    transform: scale(1.1);
                }

                .add-more-container {
                    display: flex;
                    justify-content: center;
                    padding: var(--spacing-md) 0;
                }

                .empty-documents {
                    text-align: center;
                    padding: var(--spacing-xl);
                    background: var(--surface);
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--border-light);
                }

                .empty-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-md);
                    opacity: 0.8;
                }

                .empty-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 var(--spacing-sm) 0;
                }

                .empty-message {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin: 0 0 var(--spacing-lg) 0;
                }

                .btn-add-doc {
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    background: var(--primary);
                    color: white;
                    border: none;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-add-doc:hover {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                }

                .loading-docs {
                    text-align: center;
                    padding: var(--spacing-lg);
                    color: var(--text-secondary);
                    font-size: 0.875rem;
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

            {/* PDF Viewer */}
            <PDFViewer
                isOpen={showPDFViewer}
                onClose={() => setShowPDFViewer(false)}
                pdfUrl={selectedPDF?.url}
                fileName={selectedPDF?.name}
            />

            {/* Custom Alert */}
            <CustomAlert
                isOpen={alert.isOpen}
                onClose={() => setAlert({ ...alert, isOpen: false })}
                title={alert.title}
                message={alert.message}
                type={alert.type}
                onConfirm={alert.onConfirm}
                showCancel={alert.showCancel}
            />
        </div>
    );
};

export default ConfiguracionPage;