import React, { useState, useEffect } from 'react';
import ScheduleTable from './ScheduleTable';
import { GlassPanel, GlassButton, GlassBadge } from './glassyui';

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
      {/* Sidebar Glassy UI */}
      <aside className={`sidebar lg-glass-surface ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src={`${base}assets/img/UNI.png`} alt="UNI Logo" className="sidebar-logo" />
          <div className="sidebar-title">
            <span className="uni-label">UNI EARPFIM</span>
            <div className="mt-1">
              <GlassBadge tone={role === 'administrador' ? 'purple' : 'blue'} dot>
                {role === 'administrador' ? 'ADMINISTRADOR' : 'DOCENTE'}
              </GlassBadge>
            </div>
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
        <header className="top-header lg-glass-surface">
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
            <GlassButton variant="soft" size="sm" onClick={handleLogout} title="Cerrar sesión">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Cerrar sesión</span>
            </GlassButton>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-body">
          {currentSection === 'home' ? (
            <div className="welcome-hero">
              <GlassPanel variant="card" className="hero-card">
                <div className="flex justify-center mb-4">
                  <GlassBadge tone="blue" dot>SISTEMA UNIVERSITARIO EARPFIM</GlassBadge>
                </div>
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
                  <GlassButton
                    variant="prominent"
                    size="lg"
                    onClick={() => setCurrentSection('horario')}
                  >
                    📅 Ver Horario Académico
                  </GlassButton>
                </div>
              </GlassPanel>
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
          border-right: 1px solid var(--lg-border);
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
          border-bottom: 1px solid var(--lg-border);
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
          border: 1px solid var(--lg-border);
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
          color: var(--lg-muted-foreground);
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
          color: var(--lg-muted-foreground);
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
          border-bottom: 1px solid var(--lg-border);
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
          border: 1px solid var(--lg-border);
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
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
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
          border-radius: 28px;
          padding: 48px 36px;
          text-align: center;
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
          color: var(--lg-muted-foreground);
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

        .schedule-view-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .mt-1 {
          margin-top: 4px;
        }

        .mb-4 {
          margin-bottom: 16px;
        }

        .flex {
          display: flex;
        }

        .justify-center {
          justify-content: center;
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
