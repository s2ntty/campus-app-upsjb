import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, User } from 'lucide-react';

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

export default NavBar;
