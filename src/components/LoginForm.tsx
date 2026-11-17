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
    }, 600);
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
    <div className="login-wrapper">
      <GlassPanel variant="card" className="login-glass-card">
        {/* Header con Escudo y Títulos */}
        <div className="card-header">
          <img 
            src={`${base}assets/img/logo2.png`} 
            alt="UNI Logo" 
            className="uni-logo" 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `${base}assets/img/UNI.png`;
            }}
          />
          <div className="header-titles">
            <span className="uni-title">UNIVERSIDAD NACIONAL DE INGENIERÍA</span>
            <span className="faculty-title">FACULTAD DE INGENIERÍA MECÁNICA</span>
          </div>
        </div>

        {/* Subtítulos */}
        <div className="card-subtitle">
          <div className="badge-row">
            <GlassBadge tone="blue" dot>PORTAL ACADÉMICO</GlassBadge>
          </div>
          <h2 className="intranet-title">INTRANET EARPFIM</h2>
          <p className="intranet-desc">Sistema de Planificación de Recursos Académicos y Empresariales</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <GlassInput
            id="usuario"
            label="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
            autoComplete="username"
            disabled={loading}
          />

          <div className="password-group">
            <GlassInput
              id="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </button>
          </div>

          {error && (
            <div className="error-banner">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <GlassButton
            type="submit"
            variant="prominent"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? 'INGRESANDO...' : 'INICIAR SESIÓN'}
          </GlassButton>
        </form>

        {/* Accesos rápidos de prueba */}
        <div className="quick-access">
          <span className="quick-label">Acceso rápido con Glassy UI:</span>
          <div className="quick-buttons">
            <GlassButton
              type="button"
              variant="soft"
              size="sm"
              onClick={() => handleDemoFill('usuario')}
            >
              👨‍🏫 Docente
            </GlassButton>
            <GlassButton
              type="button"
              variant="soft"
              size="sm"
              onClick={() => handleDemoFill('admin')}
            >
              ⚙️ Administrador
            </GlassButton>
          </div>
        </div>
      </GlassPanel>

      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-glass-card {
          width: 100%;
          max-width: 440px;
          padding: 36px 32px;
          border-radius: 24px;
          animation: cardFloat 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cardFloat {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--lg-border);
        }

        .uni-logo {
          width: 52px;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
        }

        .header-titles {
          display: flex;
          flex-direction: column;
        }

        .uni-title {
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.3;
        }

        .faculty-title {
          font-family: var(--font-heading);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.7);
        }

        .card-subtitle {
          margin-top: 22px;
          margin-bottom: 24px;
          text-align: center;
        }

        .badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }

        .intranet-title {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.03em;
        }

        .intranet-desc {
          font-size: 11.5px;
          color: var(--lg-muted-foreground);
          margin-top: 4px;
          line-height: 1.4;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .password-group {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          top: 36px;
          background: none;
          border: none;
          color: var(--lg-muted-foreground);
          font-size: 11.5px;
          cursor: pointer;
          transition: color 0.2s;
          z-index: 5;
        }

        .toggle-password:hover {
          color: #ffffff;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.45);
          border-radius: 10px;
          color: #fca5a5;
          font-size: 12px;
        }

        .w-full {
          width: 100%;
        }

        .mt-2 {
          margin-top: 8px;
        }

        .quick-access {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid var(--lg-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .quick-label {
          font-size: 11px;
          color: var(--lg-muted-foreground);
        }

        .quick-buttons {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
