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
import { authService, userService, supabase } from './lib/firebase-config';

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
  // Estado para controlar si el usuario necesita completar registro
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  console.log('🚀 App Initializing...', { isAuthenticated, needsOnboarding, loading });

  useEffect(() => {
    let mounted = true;

    // Función para manejar el estado de la sesión
    const handleSession = async (session) => {
      if (!mounted) return;

      // Detectar si venimos de un redirect de OAuth
      const isRedirect = window.location.hash.includes('access_token') ||
        window.location.search.includes('code=');

      if (session?.user) {
        console.log('✅ Usuario autenticado:', session.user.email);
        setUser(session.user);

        // Verificar si el usuario tiene perfil completo (carrera)
        try {
          const profile = await userService.getProfile(session.user.uid);
          if (profile && profile.carrera) {
            console.log('✅ Perfil completo');
            setIsAuthenticated(true);
            setNeedsOnboarding(false);
          } else {
            console.log('⚠️ Perfil incompleto, requiere onboarding');
            setIsAuthenticated(true);
            setNeedsOnboarding(true);
          }
        } catch (error) {
          console.error("Error verificando perfil:", error);
          // Si falla, asumimos que necesita onboarding por seguridad
          setIsAuthenticated(true);
          setNeedsOnboarding(true);
        }

        setShowRegistration(false);
        setLoading(false); // Carga completada con éxito
      } else {
        // Si no hay sesión PERO estamos en un flujo de OAuth, esperamos
        if (isRedirect) {
          console.log('⏳ Detectado OAuth en proceso. Esperando evento SIGNED_IN...');
          return;
        }

        console.log('👋 No hay usuario activo');
        setUser(null);
        setIsAuthenticated(false);
        setNeedsOnboarding(false);
        // Respetar estado de login manual si existe
        if (localStorage.getItem('is_logged_in') === 'true') {
          setIsAuthenticated(true);
        }
        setLoading(false); // Carga completada (sin usuario)
      }
    };

    // 1. Escuchar cambios de autenticación
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      console.log('🔄 Evento de Auth:', event);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') {
        await handleSession(session);
      } else if (event === 'SIGNED_OUT') {
        await handleSession(null);
      }
    });

    // 2. Verificar sesión inicial
    const initAuth = async () => {
      try {
        console.log('🔍 Verificando sesión inicial...');

        // Detectar si venimos de un redirect de OAuth
        const isRedirect = window.location.hash.includes('access_token') ||
          window.location.search.includes('code=');

        if (isRedirect) {
          console.log('🔄 Redirect de OAuth detectado, esperando procesamiento del cliente...');
          // No detenemos loading aquí, dejamos que onAuthStateChange maneje el evento SIGNED_IN
          // Timeout de seguridad por si falla
          setTimeout(() => {
            if (mounted && loading) {
              console.log('⚠️ Timeout de espera de OAuth');
              setLoading(false);
            }
          }, 10000);
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        await handleSession(session);

      } catch (error) {
        console.error('❌ Error en auth inicial:', error);
        setLoading(false);
      }
    };

    initAuth();

    // Cargar preferencia de tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    return () => {
      mounted = false;
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

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      localStorage.removeItem('is_logged_in');
      localStorage.removeItem('user_profile');
      setIsAuthenticated(false);
      setShowRegistration(false);
      setNeedsOnboarding(false);
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
      {isAuthenticated && !needsOnboarding ? (
        <MainApp onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} user={user} />
      ) : isAuthenticated && needsOnboarding ? (
        <RegistroPage onRegister={handleOnboardingComplete} user={user} onLogout={handleLogout} />
      ) : showRegistration ? (
        <RegistroPage onRegister={handleRegister} onShowLogin={handleShowLogin} />
      ) : (
        <LoginPage onLogin={handleLogin} onShowRegistration={handleShowRegistration} />
      )}
    </BrowserRouter>
  );
}

export default App;
