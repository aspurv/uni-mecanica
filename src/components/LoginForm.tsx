import React, { useState } from 'react';
import { GlassPanel, GlassInput, GlassButton, GlassBadge } from './glassyui';

export default function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !password.trim()) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const userLower = usuario.trim().toLowerCase();
      
      let rol = 'usuario';
      let nombre = usuario.trim();

      if (userLower.includes('admin')) {
        rol = 'administrador';
        nombre = 'Administrador FIM';
      } else {
        nombre = 'Obregón Ramos, Máximo';
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('uni_session', JSON.stringify({
          usuario: usuario.trim(),
          nombre: nombre,
          rol: rol,
          timestamp: Date.now()
        }));

        const destination = rol === 'administrador' ? 'administrador' : 'usuario';
        window.location.href = `${base}${destination}`;
      }
    }, 500);
  };

  const handleDemoFill = (role: 'usuario' | 'admin') => {
    if (role === 'admin') {
      setUsuario('admin.fim');
      setPassword('admin123');
    } else {
      setUsuario('docente.obregon');
      setPassword('docente123');
    }
    setError('');
  };

  return (
    <div className="apple-login-container">
      {/* Top subtle Apple-style navigation header */}
      <header className="apple-global-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <img 
              src={`${base}assets/img/UNI.png`} 
              alt="UNI" 
              className="brand-icon"
            />
            <span className="brand-text">Universidad Nacional de Ingeniería</span>
          </div>
          <span className="nav-tag">FIM · EARPFIM</span>
        </div>
      </header>

      {/* Main Apple Card */}
      <div className="login-card-container">
        <div className="apple-card">
          <div className="card-top">
            <img 
              src={`${base}assets/img/logo2.png`} 
              alt="FIM Logo" 
              className="hero-logo" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `${base}assets/img/UNI.png`;
              }}
            />
            <h1 className="hero-title">Iniciar sesión</h1>
            <p className="hero-subtitle">Intranet EARPFIM · Facultad de Ingeniería Mecánica</p>
          </div>

          <form onSubmit={handleSubmit} className="apple-form">
            <div className="input-block">
              <label className="field-label" htmlFor="usuario">ID de usuario</label>
              <input
                id="usuario"
                type="text"
                className="apple-input"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="usuario@uni.pe"
                autoComplete="username"
                disabled={loading}
              />
            </div>

            <div className="input-block">
              <div className="label-with-action">
                <label className="field-label" htmlFor="password">Contraseña</label>
                <button
                  type="button"
                  className="link-subtle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="apple-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="apple-error-callout">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="apple-button-primary"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión…' : 'Continuar'}
            </button>
          </form>

          {/* Quick Access Pills */}
          <div className="quick-access-box">
            <span className="quick-title">Cuentas demo de prueba</span>
            <div className="pill-group">
              <button
                type="button"
                className="apple-pill-btn"
                onClick={() => handleDemoFill('usuario')}
              >
                Docente
              </button>
              <button
                type="button"
                className="apple-pill-btn"
                onClick={() => handleDemoFill('admin')}
              >
                Administrador
              </button>
            </div>
          </div>
        </div>

        {/* Footer info style Apple */}
        <footer className="apple-footer">
          <p>Copyright © 2026 Universidad Nacional de Ingeniería. Todos los derechos reservados.</p>
          <div className="footer-links">
            <span>Privacidad</span>
            <span>Términos de uso</span>
            <span>Soporte UNI</span>
          </div>
        </footer>
      </div>

      <style>{`
        .apple-login-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #000000;
          color: #f5f5f7;
          position: relative;
        }

        .apple-global-nav {
          height: 44px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          padding: 0 24px;
        }

        .nav-content {
          max-width: 1024px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 20px;
          height: auto;
          opacity: 0.9;
        }

        .brand-text {
          font-size: 12px;
          font-weight: 500;
          color: #d1d1d6;
          letter-spacing: -0.01em;
        }

        .nav-tag {
          font-size: 11px;
          color: #86868b;
          font-weight: 400;
        }

        .login-card-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 20px 24px;
        }

        .apple-card {
          width: 100%;
          max-width: 440px;
          background: rgba(22, 22, 23, 0.75);
          backdrop-filter: blur(30px) saturate(190%);
          -webkit-backdrop-filter: blur(30px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 44px 38px 36px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
          animation: appleFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes appleFadeIn {
          from {
            opacity: 0;
            transform: scale(0.985) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .card-top {
          text-align: center;
          margin-bottom: 32px;
        }

        .hero-logo {
          width: 58px;
          height: auto;
          margin-bottom: 18px;
          filter: drop-shadow(0 4px 16px rgba(0, 113, 227, 0.25));
        }

        .hero-title {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #f5f5f7;
          margin-bottom: 6px;
        }

        .hero-subtitle {
          font-size: 13px;
          color: #86868b;
          letter-spacing: -0.01em;
        }

        .apple-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 12px;
          font-weight: 500;
          color: #a1a1a6;
          letter-spacing: -0.01em;
        }

        .label-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .link-subtle {
          background: none;
          border: none;
          color: #2997ff;
          font-size: 12px;
          cursor: pointer;
          padding: 0;
        }

        .link-subtle:hover {
          text-decoration: underline;
        }

        .apple-input {
          width: 100%;
          height: 48px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          padding: 0 16px;
          color: #f5f5f7;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-input:focus {
          border-color: #0071e3;
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.25);
          outline: none;
        }

        .apple-input::placeholder {
          color: #55555a;
        }

        .apple-error-callout {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 69, 58, 0.12);
          border: 1px solid rgba(255, 69, 58, 0.3);
          border-radius: 12px;
          padding: 12px 14px;
          color: #ff453a;
          font-size: 13px;
        }

        .apple-button-primary {
          width: 100%;
          height: 48px;
          background: #0071e3;
          color: #ffffff;
          border: none;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.015em;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 4px;
        }

        .apple-button-primary:hover:not(:disabled) {
          background: #0077ed;
          transform: scale(1.01);
          box-shadow: 0 4px 16px rgba(0, 113, 227, 0.4);
        }

        .apple-button-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .quick-access-box {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .quick-title {
          font-size: 12px;
          color: #86868b;
        }

        .pill-group {
          display: flex;
          gap: 10px;
        }

        .apple-pill-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #d1d1d6;
          border-radius: 980px;
          padding: 7px 18px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apple-pill-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.24);
        }

        .apple-footer {
          margin-top: 36px;
          text-align: center;
          font-size: 11px;
          color: #6e6e73;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .footer-links span {
          cursor: pointer;
          transition: color 0.15s;
        }

        .footer-links span:hover {
          color: #a1a1a6;
        }
      `}</style>
    </div>
  );
}
