import React, { useState, useEffect } from 'react';
import ScheduleTable from './ScheduleTable';

interface DashboardProps {
  initialRole?: 'usuario' | 'administrador';
  initialSection?: 'home' | 'horario';
}

export default function DashboardApp({ initialRole = 'usuario', initialSection = 'home' }: DashboardProps) {
  const [role, setRole] = useState<'usuario' | 'administrador'>(initialRole);
  const [userName, setUserName] = useState<string>('Obregón Ramos, Máximo');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<'home' | 'horario'>(initialSection);
  const [generalMenuOpen, setGeneralMenuOpen] = useState<boolean>(true);

  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('uni_session');
      if (stored) {
        try {
          const session = JSON.parse(stored);
          if (session.nombre) setUserName(session.nombre);
          if (session.rol) setRole(session.rol);
        } catch (e) {
          console.error(e);
        }
      } else {
        // Si no hay sesión, usar datos por defecto
        if (initialRole === 'administrador') {
          setUserName('Administrador FIM');
        }
      }
    }
  }, [initialRole]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('uni_session');
      window.location.href = base;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Glass */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src={`${base}assets/img/UNI.png`} alt="UNI Logo" className="sidebar-logo" />
          <div className="sidebar-title">
            <span className="uni-label">UNI EARPFIM</span>
            <span className="role-label">{role === 'administrador' ? 'ADMINISTRADOR' : 'DOCENTE'}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <button
              className="nav-header-btn"
              onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
            >
              <div className="btn-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>General</span>
              </div>
              <span className={`chevron ${generalMenuOpen ? 'open' : ''}`}>▼</span>
            </button>

            {generalMenuOpen && (
              <div className="nav-subitems">
                <button
                  className={`subitem-btn ${currentSection === 'home' ? 'active' : ''}`}
                  onClick={() => setCurrentSection('home')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Inicio</span>
                </button>

                <button
                  className={`subitem-btn ${currentSection === 'horario' ? 'active' : ''}`}
                  onClick={() => setCurrentSection('horario')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                  <span>{role === 'administrador' ? 'Administración Horario' : 'Mi Horario de Clases'}</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className={`main-wrapper ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {/* Header Bar */}
        <header className="top-header">
          <div className="header-left">
            <button
              className="toggle-sidebar-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Alternar Menú"
            >
              <div className={`hamburger ${sidebarOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <div className="user-greeting">
              <span className="user-icon">👤</span>
              <span className="user-name">{userName}</span>
            </div>
          </div>

          <div className="header-right">
            <button onClick={handleLogout} className="btn-logout" title="Cerrar sesión">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-body">
          {currentSection === 'home' ? (
            <div className="welcome-hero">
              <div className="hero-card">
                <h1 className="welcome-title">
                  BIENVENIDO AL EARPFIM <br />
                  <span className="welcome-zone">
                    ZONA {role === 'administrador' ? 'ADMINISTRADOR' : 'USUARIO'}
                  </span>
                </h1>
                <p className="welcome-desc">
                  Sistema de Planificación de Recursos Académicos y Empresariales de la Facultad de Ingeniería Mecánica.
                </p>

                <div className="welcome-image">
                  <img src={`${base}assets/img/tuerca.gif`} alt="Animación FIM" />
                </div>

                <div className="hero-actions">
                  <button onClick={() => setCurrentSection('horario')} className="btn-hero-action">
                    📅 Ver Horario Académico
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="schedule-view-wrapper">
              <ScheduleTable />
            </div>
          )}
        </main>
      </div>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 270px;
          background: rgba(10, 16, 38, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s ease;
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-logo {
          width: 44px;
          height: auto;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
        }

        .sidebar-title {
          display: flex;
          flex-direction: column;
        }

        .uni-label {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #ffffff;
        }

        .role-label {
          font-size: 11px;
          font-weight: 500;
          color: #60a5fa;
          letter-spacing: 0.08em;
        }

        .sidebar-nav {
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-header-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-family: var(--font-main);
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-header-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .btn-left {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #93c5fd;
        }

        .chevron {
          font-size: 10px;
          transition: transform 0.2s ease;
          color: rgba(255, 255, 255, 0.5);
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .nav-subitems {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-left: 12px;
          margin-top: 6px;
        }

        .subitem-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-main);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .subitem-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .subitem-btn.active {
          background: rgba(59, 130, 246, 0.22);
          border-color: rgba(96, 165, 250, 0.35);
          color: #93c5fd;
          font-weight: 500;
        }

        /* Main Area */
        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .main-wrapper.sidebar-expanded {
          margin-left: 270px;
        }

        .main-wrapper.sidebar-collapsed {
          margin-left: 0;
        }

        /* Header */
        .top-header {
          height: 64px;
          padding: 0 24px;
          background: rgba(10, 16, 38, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .toggle-sidebar-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .toggle-sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .hamburger {
          width: 18px;
          height: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: #ffffff;
          border-radius: 2px;
          transition: 0.2s;
        }

        .user-greeting {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .btn-logout {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: 9999px;
          color: #fca5a5;
          font-family: var(--font-main);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }

        .btn-logout:hover {
          background: rgba(239, 68, 68, 0.28);
          border-color: rgba(239, 68, 68, 0.55);
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(239, 68, 68, 0.25);
        }

        /* Content */
        .content-body {
          flex: 1;
          padding: 32px 28px;
        }

        .welcome-hero {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 140px);
        }

        .hero-card {
          max-width: 680px;
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 48px 36px;
          text-align: center;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
          animation: fadeInHero 0.5s ease-out;
        }

        @keyframes fadeInHero {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .welcome-title {
          font-family: var(--font-heading);
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .welcome-zone {
          font-weight: 700;
          color: #60a5fa;
          text-shadow: 0 0 24px rgba(96, 165, 250, 0.4);
        }

        .welcome-desc {
          margin-top: 14px;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .welcome-image {
          margin: 28px 0;
        }

        .welcome-image img {
          width: 200px;
          height: auto;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
        }

        .btn-hero-action {
          padding: 12px 24px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(37, 99, 235, 0.35);
        }

        .btn-hero-action:hover {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(37, 99, 235, 0.5);
        }

        .schedule-view-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 240px;
          }
          .main-wrapper.sidebar-expanded {
            margin-left: 0;
          }
          .content-body {
            padding: 20px 14px;
          }
        }
      `}</style>
    </div>
  );
}
