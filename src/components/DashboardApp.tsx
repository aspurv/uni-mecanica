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
    <div className="apple-dashboard">
      {/* Top macOS-style Menu Bar */}
      <header className="apple-menubar">
        <div className="menubar-left">
          <button 
            className="sidebar-toggle" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Alternar barra lateral"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
          <img src={`${base}assets/img/UNI.png`} alt="UNI" className="menubar-logo" />
          <span className="menubar-title">UNI · EARPFIM</span>
          <span className="menubar-badge">{role === 'administrador' ? 'ADMIN' : 'DOCENTE'}</span>
        </div>

        <div className="menubar-right">
          <div className="user-profile-chip">
            <span className="user-avatar">{userName.charAt(0)}</span>
            <span className="user-name-text">{userName}</span>
          </div>
          <button onClick={handleLogout} className="apple-logout-btn">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Apple macOS style translucent sidebar */}
        <aside className={`apple-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-section-title">PORTAL ACADÉMICO</div>
          <nav className="sidebar-nav-list">
            <button
              className={`apple-nav-item ${currentSection === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentSection('home')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Panel Principal</span>
            </button>

            <button
              className={`apple-nav-item ${currentSection === 'horario' ? 'active' : ''}`}
              onClick={() => setCurrentSection('horario')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Horario Académico</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="system-pill">
              <span className="pulse-dot"></span>
              <span>Sistema activo 2026-I</span>
            </div>
          </div>
        </aside>

        {/* Main Content Stage */}
        <main className="apple-main-stage">
          {currentSection === 'home' ? (
            <div className="apple-home-view">
              {/* Apple Hero Header Banner */}
              <div className="apple-hero-card">
                <span className="hero-eyebrow">Facultad de Ingeniería Mecánica</span>
                <h1 className="hero-heading">Bienvenido, {userName.split(',')[0]}</h1>
                <p className="hero-subheading">
                  Sistema de Planificación y Gestión Académica de la Universidad Nacional de Ingeniería.
                </p>
                
                <div className="hero-action-row">
                  <button 
                    className="apple-primary-pill"
                    onClick={() => setCurrentSection('horario')}
                  >
                    Ver mi horario de clases →
                  </button>
                </div>
              </div>

              {/* Apple Feature Grid Cards */}
              <div className="apple-grid-cards">
                <div className="apple-feature-card">
                  <div className="feature-icon-wrapper blue">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3>Carga Lectiva</h3>
                  <p>16 horas lectivas registradas y confirmadas para el ciclo actual.</p>
                  <span className="card-link" onClick={() => setCurrentSection('horario')}>Revisar distribución ›</span>
                </div>

                <div className="apple-feature-card">
                  <div className="feature-icon-wrapper purple">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <h3>Asignaturas FIM</h3>
                  <p>Acceso a cursos MC510, MC520 y MC500 con registros virtuales integrados.</p>
                  <span className="card-link">Ver catálogo ›</span>
                </div>

                <div className="apple-feature-card">
                  <div className="feature-icon-wrapper green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Estado Académico</h3>
                  <p>Planificación validada por el comité de departamento de Ingeniería Mecánica.</p>
                  <span className="card-link">Descargar reporte oficial ›</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="apple-schedule-view">
              <ScheduleTable />
            </div>
          )}
        </main>
      </div>

      <style>{`
        .apple-dashboard {
          min-height: 100vh;
          background: #000000;
          color: #f5f5f7;
          display: flex;
          flex-direction: column;
        }

        /* Top Menu Bar */
        .apple-menubar {
          height: 48px;
          background: rgba(22, 22, 23, 0.85);
          backdrop-filter: blur(25px) saturate(190%);
          -webkit-backdrop-filter: blur(25px) saturate(190%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px;
          position: sticky;
          top: 0;
          z-index: 200;
        }

        .menubar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: #86868b;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .sidebar-toggle:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .menubar-logo {
          width: 22px;
          height: auto;
        }

        .menubar-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #f5f5f7;
        }

        .menubar-badge {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 980px;
          font-size: 10px;
          font-weight: 500;
          color: #86868b;
          padding: 2px 8px;
        }

        .menubar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .user-profile-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          padding: 3px 10px 3px 4px;
          border-radius: 980px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .user-avatar {
          width: 24px;
          height: 24px;
          background: #0071e3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }

        .user-name-text {
          font-size: 12px;
          color: #d1d1d6;
        }

        .apple-logout-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #86868b;
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 980px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .apple-logout-btn:hover {
          color: #ff453a;
          border-color: rgba(255, 69, 58, 0.4);
          background: rgba(255, 69, 58, 0.08);
        }

        /* Layout Body */
        .dashboard-body {
          display: flex;
          flex: 1;
        }

        /* Apple Sidebar */
        .apple-sidebar {
          width: 250px;
          background: rgba(18, 18, 19, 0.7);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 14px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-sidebar.collapsed {
          width: 0;
          padding: 0;
          overflow: hidden;
          border-right: none;
        }

        .sidebar-section-title {
          font-size: 11px;
          font-weight: 600;
          color: #6e6e73;
          letter-spacing: 0.04em;
          padding-left: 10px;
        }

        .sidebar-nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .apple-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #86868b;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: left;
        }

        .apple-nav-item:hover {
          color: #f5f5f7;
          background: rgba(255, 255, 255, 0.06);
        }

        .apple-nav-item.active {
          color: #ffffff;
          background: rgba(0, 113, 227, 0.18);
          font-weight: 500;
        }

        .apple-nav-item.active svg {
          stroke: #2997ff;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .system-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #86868b;
          padding: 6px 10px;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 8px rgba(48, 209, 88, 0.8);
        }

        /* Stage */
        .apple-main-stage {
          flex: 1;
          padding: 36px 40px;
          max-width: 1300px;
          margin: 0 auto;
          width: 100%;
        }

        /* Hero Apple Card */
        .apple-hero-card {
          background: radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0, 113, 227, 0.18), transparent 75%),
                      rgba(22, 22, 23, 0.65);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 48px 44px;
          margin-bottom: 32px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .hero-eyebrow {
          font-size: 13px;
          font-weight: 600;
          color: #2997ff;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .hero-heading {
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f5f5f7;
          margin: 10px 0 12px;
        }

        .hero-subheading {
          font-size: 16px;
          color: #86868b;
          max-width: 650px;
          line-height: 1.5;
          margin-bottom: 28px;
        }

        .apple-primary-pill {
          background: #0071e3;
          color: #ffffff;
          border: none;
          border-radius: 980px;
          padding: 12px 26px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-primary-pill:hover {
          background: #0077ed;
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 113, 227, 0.45);
        }

        /* Apple Grid */
        .apple-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .apple-feature-card {
          background: rgba(22, 22, 23, 0.65);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-feature-card:hover {
          background: rgba(30, 30, 32, 0.85);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .feature-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }

        .feature-icon-wrapper.blue {
          background: rgba(0, 113, 227, 0.16);
          color: #2997ff;
        }

        .feature-icon-wrapper.purple {
          background: rgba(175, 82, 222, 0.16);
          color: #bf5af2;
        }

        .feature-icon-wrapper.green {
          background: rgba(48, 209, 88, 0.16);
          color: #30d158;
        }

        .apple-feature-card h3 {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: #f5f5f7;
        }

        .apple-feature-card p {
          font-size: 13.5px;
          color: #86868b;
          line-height: 1.45;
          flex: 1;
        }

        .card-link {
          font-size: 13px;
          color: #2997ff;
          font-weight: 500;
          cursor: pointer;
          display: inline-block;
          margin-top: 8px;
          transition: color 0.15s;
        }

        .card-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .apple-main-stage {
            padding: 20px 16px;
          }
          .hero-heading {
            font-size: 28px;
          }
          .apple-sidebar {
            position: fixed;
            top: 48px;
            bottom: 0;
            left: 0;
            z-index: 150;
          }
        }
      `}</style>
    </div>
  );
}
