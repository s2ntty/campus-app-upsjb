import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, GraduationCap, Home, User, ChevronRight, CheckCircle, Circle, Clock, LogOut, Sun, Moon, MapPin, Search, ChevronDown, Rocket, Instagram, Linkedin, Github, Edit2, Camera, Save, X } from 'lucide-react';
import { PLAN_MEDICINA_NUEVO, PLAN_MEDICINA_VIEJO } from './data/planes';

// --- COMPONENTES AUXILIARES ---

const StatusBadge = ({ status }) => {
  const getStyle = (s) => {
    switch (s) {
      case 'aprobada': return { bg: 'var(--success-bg)', color: 'var(--success-text)', icon: <CheckCircle size={14} /> };
      case 'cursada': return { bg: 'var(--warning-bg)', color: 'var(--warning-text)', icon: <Clock size={14} /> };
      default: return { bg: 'var(--pending-bg)', color: 'var(--pending-text)', icon: <Circle size={14} /> };
    }
  };

  const current = getStyle(status);

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '0.35rem 0.85rem',
      borderRadius: '12px',
      background: current.bg,
      color: current.color,
      fontSize: '0.75rem',
      fontWeight: '700',
      letterSpacing: '0.3px',
      transition: 'background 0.3s, color 0.3s'
    }}>
      {current.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// --- PAGINAS ---

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-screen">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="login-logo">
          <GraduationCap size={40} />
        </div>
        <h1 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Campus UNPSJB</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Bienvenido estudiante</p>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', marginLeft: '4px' }}>DNI o Usuario</label>
          <input type="text" className="input-field" placeholder="Ej: 42123456" required />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', marginLeft: '4px' }}>Contraseña</label>
          <input type="password" className="input-field" placeholder="••••••••" required />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

const HomePage = ({ userData }) => (
  <div className="page-container">
    <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Hola, {userData.name.split(' ')[0]} 👋</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>¿Qué vamos a estudiar hoy?</p>
      </div>
      <Link to="/perfil" style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border)', display: 'block' }}>
        {userData.photo ? (
          <img src={userData.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <User size={24} />
          </div>
        )}
      </Link>
    </header>

    {/* Tarjeta de Agenda */}
    <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ opacity: 0.8, fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>HOY A LAS 14:00</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Anatomía I</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Aula 204 • Edificio A</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '10px' }}>
          <BookOpen size={24} />
        </div>
      </div>
    </div>

    <h2 style={{ marginTop: '2rem' }}>Mis Carreras</h2>
    <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
      <Link to="/carrera/medicina" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none', transition: 'transform 0.1s' }}>
        <div style={{ background: 'var(--pending-bg)', padding: '1rem', borderRadius: '14px', color: 'var(--primary)' }}>
          <BookOpen size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text)' }}>Medicina</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>F.C.N y C.S</div>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
      </Link>

      <Link to="/carrera/informatica" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', opacity: 0.6 }}>
        <div style={{ background: 'var(--pending-bg)', padding: '1rem', borderRadius: '14px', color: 'var(--success-text)' }}>
          <GraduationCap size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text)' }}>Lic. en Informática</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Próximamente...</div>
        </div>
      </Link>
    </div>

    {/* Tarjeta del Desarrollador */}
    <div className="card" style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.1)',
      marginTop: 'auto',
      marginBottom: '4.5rem',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }}>
      {/* Efecto de fondo */}
      <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }}></div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
        <h3 style={{ color: 'white', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Desarrollado por S2ntty</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>Conectemos en redes:</p>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <a href="https://www.instagram.com/s2nttyy/" target="_blank" rel="noopener noreferrer" style={{
            background: 'rgba(255,255,255,0.08)', padding: '0.5rem', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Instagram size={18} color="#E1306C" />
          </a>
          <a href="https://www.linkedin.com/in/santino-soto/" target="_blank" rel="noopener noreferrer" style={{
            background: 'rgba(255,255,255,0.08)', padding: '0.5rem', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Linkedin size={18} color="#0077b5" />
          </a>
          <a href="https://github.com/s2ntty" target="_blank" rel="noopener noreferrer" style={{
            background: 'rgba(255,255,255,0.08)', padding: '0.5rem', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Github size={18} color="white" />
          </a>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          <img src="/profile.jpg" alt="Santy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  </div>
);

const CalendarioAcademicoPage = () => {
  // ... (sin cambios, ya implementado)
  const [facultad, setFacultad] = useState('naturales');
  const today = new Date();
  const eventosNaturales = [{ start: '2026-02-09', end: '2026-02-13', titulo: '1° Turno Exámenes Febrero', tipo: 'examen', icon: '📝' }, { start: '2026-02-09', end: '2026-03-06', titulo: 'Curso Nivelación Ingresantes', tipo: 'clase', icon: '🎓' }, { start: '2026-02-23', end: '2026-02-27', titulo: '2° Turno Exámenes Febrero', tipo: 'examen', icon: '📝' }, { start: '2026-03-09', end: '2026-03-27', titulo: 'Inscripción Materias Anuales/1°C', tipo: 'tramite', icon: '✍️' }, { start: '2026-03-16', end: '2026-03-20', titulo: 'Turno Exámenes Marzo', tipo: 'examen', icon: '📝' }, { start: '2026-03-16', end: null, titulo: 'Inicio de Clases 1° Cuatrimestre', tipo: 'inicio', icon: '🚀' }, { start: '2026-03-24', end: null, titulo: 'Feriado: Memoria por la Verdad', tipo: 'feriado', icon: '🇦🇷' }, { start: '2026-04-02', end: null, titulo: 'Feriado: Malvinas', tipo: 'feriado', icon: '🇦🇷' }, { start: '2026-04-20', end: '2026-04-24', titulo: 'Turno Exámenes Abril', tipo: 'examen', icon: '📝' }, { start: '2026-05-01', end: null, titulo: 'Feriado: Día del Trabajador', tipo: 'feriado', icon: '👷' }, { start: '2026-05-18', end: '2026-05-22', titulo: 'Turno Exámenes Mayo', tipo: 'examen', icon: '📝' }, { start: '2026-05-25', end: null, titulo: 'Feriado: Revolución de Mayo', tipo: 'feriado', icon: '🇦🇷' }, { start: '2026-06-08', end: '2026-06-12', titulo: 'Turno Exámenes Junio', tipo: 'examen', icon: '📝' }, { start: '2026-06-26', end: null, titulo: 'Fin 1° Cuatrimestre', tipo: 'fin', icon: '🏁' }, { start: '2026-07-06', end: '2026-08-14', titulo: 'Inscripción Materias 2°C', tipo: 'tramite', icon: '✍️' }, { start: '2026-07-13', end: '2026-07-17', titulo: '1° Turno Exámenes Julio', tipo: 'examen', icon: '📝' }, { start: '2026-07-20', end: '2026-07-31', titulo: 'Receso Invernal', tipo: 'receso', icon: '❄️' }, { start: '2026-08-10', end: '2026-08-18', titulo: '2° Turno Exámenes Julio', tipo: 'examen', icon: '📝' }, { start: '2026-08-10', end: null, titulo: 'Inicio 2° Cuatrimestre', tipo: 'inicio', icon: '🚀' }, { start: '2026-08-24', end: '2026-08-28', titulo: 'Turno Exámenes Agosto', tipo: 'examen', icon: '📝' }, { start: '2026-09-28', end: '2026-10-02', titulo: 'Turno Exámenes Septiembre', tipo: 'examen', icon: '📝' }, { start: '2026-10-19', end: '2026-10-23', titulo: 'Turno Exámenes Octubre', tipo: 'examen', icon: '📝' }, { start: '2026-11-27', end: null, titulo: 'Fin 2° Cuatrimestre', tipo: 'fin', icon: '🏁' }, { start: '2026-11-30', end: '2026-12-04', titulo: '1° Turno Exámenes Diciembre', tipo: 'examen', icon: '🎄' }, { start: '2026-12-14', end: '2026-12-18', titulo: '2° Turno Exámenes Diciembre', tipo: 'examen', icon: '🎄' }];
  const mockDate = today.getFullYear() < 2026 ? new Date('2026-02-01') : today;
  const proximosEventos = eventosNaturales.filter(ev => { const finFecha = ev.end ? new Date(ev.end) : new Date(ev.start); return finFecha >= mockDate; }).sort((a, b) => new Date(a.start) - new Date(b.start));
  const eventoMasCercano = proximosEventos[0];
  const formatFecha = (isoDate) => { if (!isoDate) return ''; const [y, m, d] = isoDate.split('-'); return `${d}/${m}`; };

  return (
    <div className="page-container">
      <h1>Calendario</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <button onClick={() => setFacultad('naturales')} style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', background: facultad === 'naturales' ? 'var(--primary)' : 'transparent', color: facultad === 'naturales' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s' }}>Cs. Naturales</button>
        <button onClick={() => setFacultad('ingenieria')} style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', background: facultad === 'ingenieria' ? 'var(--primary)' : 'transparent', color: facultad === 'ingenieria' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s' }}>Ingeniería</button>
      </div>
      {facultad === 'naturales' && eventoMasCercano && (
        <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', opacity: 0.9 }}> <Rocket size={18} /> <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Próximo Evento</span> </div>
          <h2 style={{ color: 'white', fontSize: '1.4rem', lineHeight: '1.3' }}>{eventoMasCercano.titulo}</h2>
          <div style={{ marginTop: '1rem', display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '600' }}> 📅 {formatFecha(eventoMasCercano.start)} {eventoMasCercano.end ? `- ${formatFecha(eventoMasCercano.end)}` : ''} </div>
        </div>
      )}
      <h3 style={{ marginBottom: '1rem' }}>Cronograma 2026</h3>
      {facultad === 'naturales' ? (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {proximosEventos.slice(1).map((ev, i) => (<div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}> <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--pending-bg)', width: '50px', height: '50px', borderRadius: '12px', fontSize: '1.5rem' }}> {ev.icon} </div> <div style={{ flex: 1 }}> <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.1rem' }}> {formatFecha(ev.start)} {ev.end ? `- ${formatFecha(ev.end)}` : ''} </div> <div style={{ fontWeight: '600', color: 'var(--text)', lineHeight: '1.3' }}>{ev.titulo}</div> </div> </div>))}
          {proximosEventos.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No hay más eventos este año 🎉</p>}
        </div>
      ) : (<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}> <p>Selecciona "Cs. Naturales" para ver el calendario 2026 cargado.</p> </div>)}
    </div>
  );
};

const AgendaPage = () => {
  return (
    <div className="page-container">
      <h1>Agenda</h1>
      <div style={{ marginTop: '5rem', padding: '3rem 1.5rem', borderRadius: '24px', background: 'rgba(125, 211, 252, 0.05)', backdropFilter: 'blur(5px)', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '1.2rem', background: 'var(--pending-bg)', borderRadius: '50%', marginBottom: '0.5rem' }}> <Clock size={40} color="var(--primary)" /> </div>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', fontWeight: '800', lineHeight: '1.2' }}> Horarios Recién<br />en MARZO </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}> ¡Disfruta tus vacaciones! 🏖️ </p>
      </div>
    </div>
  );
};

// ... CarreraPage y MainApp siguen abajo ...

const CarreraPage = ({ carrera }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('nuevo');
  const [materiasEstado, setMateriasEstado] = useState({});
  const [showPlanMenu, setShowPlanMenu] = useState(false);
  useEffect(() => { const savedPlanId = localStorage.getItem('plan_preferido'); if (savedPlanId) setSelectedPlanId(savedPlanId); const saved = localStorage.getItem('avance_medicina'); if (saved) setMateriasEstado(JSON.parse(saved)); }, []);
  const changePlan = (planId) => { setSelectedPlanId(planId); localStorage.setItem('plan_preferido', planId); setShowPlanMenu(false); };
  const toggleStatus = (id) => { setMateriasEstado(prev => { const current = prev[id] || 'pendiente'; const next = current === 'pendiente' ? 'cursada' : (current === 'cursada' ? 'aprobada' : 'pendiente'); const newState = { ...prev, [id]: next }; localStorage.setItem('avance_medicina', JSON.stringify(newState)); return newState; }); };
  const plan = selectedPlanId === 'nuevo' ? PLAN_MEDICINA_NUEVO : PLAN_MEDICINA_VIEJO;
  const planName = selectedPlanId === 'nuevo' ? 'Plan 2025' : 'Plan Viejo';
  const totalMaterias = plan.reduce((acc, year) => acc + year.materias.length, 0);
  const allIdsInPlan = plan.flatMap(y => y.materias.map(m => m.id));
  const aprobadas = Object.keys(materiasEstado).filter(id => materiasEstado[id] === 'aprobada' && allIdsInPlan.includes(Number(id) ? Number(id) : id)).length;
  const porcentaje = totalMaterias > 0 ? Math.round((aprobadas / totalMaterias) * 100) : 0;
  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}> <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Volver </Link>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowPlanMenu(!showPlanMenu)} style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', background: 'var(--pending-bg)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}> {planName} <ChevronDown size={14} /> </button>
          {showPlanMenu && (<div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow)', minWidth: '140px', overflow: 'hidden' }}> <div onClick={() => changePlan('nuevo')} style={{ pad: '10px 15px', padding: '10px', fontSize: '0.85rem', cursor: 'pointer', background: selectedPlanId === 'nuevo' ? 'var(--pending-bg)' : 'transparent', color: 'var(--text)' }}> Plan 2025 </div> <div onClick={() => changePlan('viejo')} style={{ pad: '10px 15px', padding: '10px', fontSize: '0.85rem', cursor: 'pointer', background: selectedPlanId === 'viejo' ? 'var(--pending-bg)' : 'transparent', color: 'var(--text)', borderTop: '1px solid var(--border)' }}> Plan Viejo </div> </div>)}
        </div>
      </div>
      <h1 style={{ marginBottom: '1.5rem' }}>Medicina</h1>
      <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}> <div> <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{porcentaje}<span style={{ fontSize: '1.5rem' }}>%</span></div> <div style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>de la carrera completada</div> </div> <div style={{ textAlign: 'right' }}> <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{aprobadas}</div> <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>MATERIAS</div> </div> </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}> <div style={{ width: `${porcentaje}%`, height: '100%', background: 'white', borderRadius: '10px' }}></div> </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '1rem 0 1.5rem 0', scrollbarWidth: 'none' }}> {plan.map(anio => (<a href={`#anio-${anio.anio}`} key={anio.anio} style={{ flex: '0 0 auto', padding: '0.6rem 1.2rem', background: 'var(--surface)', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '700', boxShadow: '0 4px 6px rgba(0,0,0,0.03)', color: 'var(--text-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}> {anio.nombre ? 'PFO' : `${anio.anio}°`} </a>))} </div>
      {plan.map((anio) => (<div key={anio.anio} id={`anio-${anio.anio}`} style={{ marginBottom: '2.5rem' }}> <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}> <h2 style={{ fontSize: '1.1rem', color: 'var(--text)', margin: 0 }}> {anio.nombre || `${anio.anio}° Año`} </h2> <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div> </div> <div style={{ display: 'grid', gap: '0.75rem' }}> {anio.materias.map((materia) => (<div key={materia.id} className="card" onClick={() => toggleStatus(materia.id)} style={{ margin: 0, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', borderLeft: materiasEstado[materia.id] === 'aprobada' ? '4px solid var(--success-text)' : (materiasEstado[materia.id] === 'cursada' ? '4px solid var(--warning-text)' : '1px solid transparent') }}> <div style={{ flex: 1, paddingRight: '1rem' }}> <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text)' }}>{materia.nombre}</div> <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}> <span>{materia.cuatrimestre}</span> <span>•</span> <span>{materia.horas}hs</span> </div> </div> <StatusBadge status={materiasEstado[materia.id] || 'pendiente'} /> </div>))} </div> </div>))}
    </div>
  );
};

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

// ... NavBar sigue igual ...
const NavBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxWidth: '480px',
    background: 'var(--surface)',
    // Glassmorphism effect
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(var(--surface), 0.9)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '1rem 0.5rem',
    zIndex: 100,
    boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.02)'
  };

  const itemStyle = (active) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: active ? 'var(--primary)' : 'var(--text-secondary)',
    fontSize: '0.65rem', // Un poco mas chico para que entren bien los textos
    gap: '4px',
    fontWeight: active ? '700' : '500',
    transition: 'color 0.2s',
    textDecoration: 'none',
    minWidth: '60px'
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={itemStyle(isActive('/'))}>
        <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span>Inicio</span>
      </Link>
      <Link to="/calendario" style={itemStyle(isActive('/calendario'))}>
        <Calendar size={22} strokeWidth={isActive('/calendario') ? 2.5 : 2} />
        <span>Académico</span>
      </Link>
      <Link to="/agenda" style={itemStyle(isActive('/agenda'))}>
        <Clock size={22} strokeWidth={isActive('/agenda') ? 2.5 : 2} />
        <span>Agenda</span>
      </Link>
      <Link to="/perfil" style={itemStyle(isActive('/perfil'))}>
        <User size={22} strokeWidth={isActive('/perfil') ? 2.5 : 2} />
        <span>Perfil</span>
      </Link>
    </nav>
  );
};

function MainApp({ onLogout, theme, toggleTheme }) {
  // Estado Global del Usuario
  const [userData, setUserData] = useState({
    name: 'Santino',
    carrera: 'Medicina • Sede CR',
    photo: null,
    gender: 'Masculino',
    notes: ''
  });

  useEffect(() => {
    // Cargar perfil guardado
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setUserData(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage userData={userData} />} />
        <Route path="/carrera/medicina" element={<CarreraPage carrera="medicina" />} />
        <Route path="/carrera/informatica" element={<div className="page-container"><h1>En construcción 🚧</h1><Link to="/">Volver</Link></div>} />

        <Route path="/calendario" element={<CalendarioAcademicoPage />} />
        <Route path="/agenda" element={<AgendaPage />} />

        <Route path="/perfil" element={<PerfilPage onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} userData={userData} setUserData={setUserData} />} />
      </Routes>
      <NavBar />
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
