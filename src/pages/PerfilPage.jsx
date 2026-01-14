import React, { useState, useRef } from 'react';
import { Edit2, X, Save, Camera, User, Sun, Moon, LogOut } from 'lucide-react';

const PerfilPage = ({ onLogout, theme, toggleTheme, userData, setUserData }) => {
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
        <div className="page-container" style={{ paddingBottom: '6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1>Mi Perfil</h1>
                {!isEditing ? (
                    <button onClick={handleEdit} style={{ color: 'var(--primary)', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>
                        <Edit2 size={16} /> Editar
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleCancel} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', padding: '5px' }}><X size={20} /></button>
                        <button onClick={handleSave} style={{ color: 'var(--primary)', background: 'transparent', border: 'none', padding: '5px' }}><Save size={20} /></button>
                    </div>
                )}
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--surface-alt)', background: 'var(--surface-alt)' }}>
                        {tempData.photo ? (
                            <img src={tempData.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}><User size={40} /></div>
                        )}
                    </div>
                    {isEditing && (
                        <button
                            onClick={() => fileInputRef.current.click()}
                            style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', cursor: 'pointer' }}
                        >
                            <Camera size={16} />
                        </button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                </div>

                {!isEditing ? (
                    <>
                        <h2 style={{ margin: '0 0 0.5rem 0' }}>{userData.name}</h2>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{userData.carrera}</p>
                        {userData.gender && <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{userData.gender}</p>}
                    </>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            value={tempData.name}
                            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                            className="input-field"
                            placeholder="Tu Nombre"
                        />
                        <select
                            value={tempData.gender}
                            onChange={(e) => setTempData({ ...tempData, gender: e.target.value })}
                            className="input-field"
                        >
                            <option value="">Seleccionar Género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="No Binario">No Binario</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                )}
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Mis Notas 📝</h3>
            <div className="card" style={{ padding: '0' }}>
                <textarea
                    style={{ width: '100%', minHeight: '120px', border: 'none', background: 'transparent', padding: '1rem', resize: 'none', color: 'var(--text)', fontSize: '0.95rem', fontFamily: 'inherit' }}
                    placeholder="Escribe aquí tus recordatorios, ideas o notas..."
                    value={isEditing ? tempData.notes : userData.notes}
                    onChange={(e) => isEditing && setTempData({ ...tempData, notes: e.target.value })}
                    readOnly={!isEditing}
                />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Configuración</h3>

            <div className="card" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {theme === 'dark' ? <Moon size={20} color="var(--primary)" /> : <Sun size={20} color="var(--primary)" />}
                    <span style={{ fontWeight: '600' }}>Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                </div>
                <div style={{ width: '40px', height: '22px', background: theme === 'dark' ? 'var(--primary)' : 'var(--border)', borderRadius: '20px', position: 'relative', transition: 'background 0.3s' }}>
                    <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: theme === 'dark' ? '20px' : '2px', transition: 'left 0.3s' }} />
                </div>
            </div>

            <button className="btn-primary" onClick={onLogout} style={{ background: 'var(--danger)', marginTop: '2rem' }}>
                <LogOut size={18} style={{ marginRight: '8px' }} /> Cerrar Sesión
            </button>
        </div>
    );
};

export default PerfilPage;
