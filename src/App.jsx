import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import HomePage from './pages/HomePage';
import CarreraPage from './pages/CarreraPage';
import CalendarioAcademicoPage from './pages/CalendarioAcademicoPage';
import AgendaPage from './pages/AgendaPage';
import PerfilPage from './pages/PerfilPage';
import ConfiguracionPage from './pages/ConfiguracionPage';

import LoadingScreen from './components/LoadingScreen';
import { authService, userService } from './lib/supabase';

function MainApp({ onLogout, theme, toggleTheme, user }) {
  // Estado Global del Usuario
  const [userData, setUserData] = useState({
    name: 'Santino',
    carrera: 'Medicina • Sede CR',
    photo: null,
    gender: 'Masculino',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial "smooth"
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Si hay usuario de Google, usar sus datos
    if (user) {
      setUserData(prev => ({
        ...prev,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || prev.name,
        photo: user.user_metadata?.avatar_url || prev.photo,
        email: user.email
      }));
    } else {
      // Fallback a localStorage para usuarios manuales
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        setUserData(JSON.parse(savedProfile));
      }
    }
  }, [user]);

  const triggerLoading = (callback, duration = 1500) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, duration);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}>
        <Routes>
          <Route path="/" element={<HomePage userData={userData} onNavigate={triggerLoading} />} />
          
          {/* Rutas dinámicas basadas en la carrera del usuario */}
          {userData.carreraId && (
            <Route 
              path={`/carrera/${userData.carreraId}`} 
              element={<CarreraPage carrera={userData.carreraId} />} 
            />
          )}
          
          {/* Rutas de carrera específicas para compatibilidad */}
          <Route path="/carrera/medicina" element={<CarreraPage carrera="medicina" />} />
          <Route path="/carrera/informatica" element={<CarreraPage carrera="informatica" />} />
          <Route path="/carrera/enfermeria" element={<CarreraPage carrera="enfermeria" />} />
          <Route path="/carrera/geologia" element={<CarreraPage carrera="geologia" />} />
          <Route path="/carrera/ingenieria_petroleo" element={<CarreraPage carrera="ingenieria_petroleo" />} />
          <Route path="/carrera/psicologia" element={<CarreraPage carrera="psicologia" />} />
          <Route path="/carrera/trabajo_social" element={<CarreraPage carrera="trabajo_social" />} />
          <Route path="/carrera/turismo" element={<CarreraPage carrera="turismo" />} />

          <Route path="/calendario" element={<CalendarioAcademicoPage userCarrera={userData.carreraId} userSede={userData.sede} />} />
          <Route path="/agenda" element={<AgendaPage userCarrera={userData.carreraId} userSede={userData.sede} />} />

          <Route path="/perfil" element={<PerfilPage userData={userData} />} />
          <Route path="/configuracion" element={<ConfiguracionPage onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} userData={userData} setUserData={setUserData} />} />
        </Routes>
        {!isLoading && <NavBar />}
      </div>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
          
          // Crear o actualizar perfil
          await authService.createOrUpdateProfile(currentUser);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        setShowRegistration(false);
        
        // Crear o actualizar perfil
        await authService.createOrUpdateProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setShowRegistration(false);
      }
    });

    // Cargar preferencia de tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const handleLogin = () => {
    // Para login manual (sin Google)
    localStorage.setItem('is_logged_in', 'true');
    setIsAuthenticated(true);
    setShowRegistration(false);
  };

  const handleRegister = () => {
    // Para registro manual (sin Google)
    localStorage.setItem('is_logged_in', 'true');
    setIsAuthenticated(true);
    setShowRegistration(false);
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      localStorage.removeItem('is_logged_in');
      localStorage.removeItem('user_profile');
      setIsAuthenticated(false);
      setShowRegistration(false);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleShowLogin = () => {
    setShowRegistration(false);
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <MainApp onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} user={user} />
      ) : showRegistration ? (
        <RegistroPage onRegister={handleRegister} onShowLogin={handleShowLogin} />
      ) : (
        <LoginPage onLogin={handleLogin} onShowRegistration={handleShowRegistration} />
      )}
    </BrowserRouter>
  );
}

export default App;
