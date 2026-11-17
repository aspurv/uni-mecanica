import React, { useState } from 'react';

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

    // Simulación de autenticación con guardado en localStorage
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

      // Guardar sesión en cliente para navegación en la SPA/Astro
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
      <div className="login-glass-card">
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
          <h2 className="intranet-title">INTRANET EARPFIM</h2>
          <p className="intranet-desc">Sistema de Planificación de Recursos Académicos y Empresariales</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <div className="input-container">
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su usuario"
                autoComplete="username"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-container">
              <input
                id="password"
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

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'INGRESANDO...' : 'INICIAR SESIÓN'}
          </button>
        </form>

        {/* Accesos rápidos de prueba */}
        <div className="quick-access">
          <span className="quick-label">Acceso rápido de prueba:</span>
          <div className="quick-buttons">
            <button type="button" onClick={() => handleDemoFill('usuario')} className="quick-btn">
              👨‍🏫 Docente
            </button>
            <button type="button" onClick={() => handleDemoFill('admin')} className="quick-btn">
              ⚙️ Administrador
            </button>
          </div>
        </div>
      </div>

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
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25);
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
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

        .intranet-title {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.03em;
        }

        .intranet-desc {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 4px;
          line-height: 1.4;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-container input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          color: #ffffff;
          font-family: var(--font-main);
          font-size: 13.5px;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-container input:focus {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(96, 165, 250, 0.65);
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
        }

        .input-container input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 11.5px;
          cursor: pointer;
          transition: color 0.2s;
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

        .btn-submit {
          margin-top: 8px;
          padding: 13px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4);
        }

        .btn-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(37, 99, 235, 0.55);
        }

        .btn-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .quick-access {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .quick-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        .quick-buttons {
          display: flex;
          gap: 10px;
        }

        .quick-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 6px 12px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 11.5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
