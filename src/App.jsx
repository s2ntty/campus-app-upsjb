import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CarreraPage from './pages/CarreraPage';
import CalendarioAcademicoPage from './pages/CalendarioAcademicoPage';
import AgendaPage from './pages/AgendaPage';
import PerfilPage from './pages/PerfilPage';

import LoadingScreen from './components/LoadingScreen';

function MainApp({ onLogout, theme, toggleTheme }) {
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

  const savedProfile = localStorage.getItem('user_profile');
  useEffect(() => {
    if (savedProfile) {
      setUserData(JSON.parse(savedProfile));
    }
  }, []); // Mantener este efecto separado para lógica de datos

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
          <Route path="/carrera/medicina" element={<CarreraPage carrera="medicina" />} />
          <Route path="/carrera/informatica" element={<CarreraPage carrera="informatica" />} />

          <Route path="/calendario" element={<CalendarioAcademicoPage />} />
          <Route path="/agenda" element={<AgendaPage />} />

          <Route path="/perfil" element={<PerfilPage onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} userData={userData} setUserData={setUserData} />} />
        </Routes>
        {!isLoading && <NavBar />}
      </div>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const logged = localStorage.getItem('is_logged_in');
    if (logged === 'true') setIsAuthenticated(true);

    // Cargar preferencia de tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const handleLogin = () => {
    localStorage.setItem('is_logged_in', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('is_logged_in');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <MainApp onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;
