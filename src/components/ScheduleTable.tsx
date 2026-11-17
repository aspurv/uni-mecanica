import React, { useState } from 'react';

interface HorarioData {
  tablaCuerpo: string;
  datos: string[][];
}

const DEFAULT_SCHEDULE: HorarioData = {
  tablaCuerpo: 'tablaCuerpo',
  datos: [
    ['07-08', '', '', '', '', '', '', ''],
    ['08-09', '', 'MC510-C/D / VIRTUAL(T)', 'MC520-C/D / VIRTUAL(T)', '', 'MC500-C/D / VIRTUAL(T)', '', ''],
    ['09-10', '', '', 'MC510-C/D / VIRTUAL(T)', '', '', '', ''],
    ['10-11', '', 'MC510-C/D / VIRTUAL(T)', '', '', '', '', ''],
    ['11-12', '', '', '', '', '', '', ''],
    ['12-13', '', '', '', '', '', '', ''],
    ['13-14', '', '', '', '', '', '', ''],
    ['14-15', '', '', '', '', 'MC520-C/D / VIRTUAL(T)', '', ''],
    ['15-16', '', '', '', '', '', '', ''],
    ['16-17', '', '', '', '', '', '', ''],
    ['17-18', '', '', 'MC520-C/D / VIRTUAL(T)', '', '', '', ''],
    ['18-19', '', '', '', '', '', '', ''],
    ['19-20', '', '', '', '', '', '', ''],
    ['20-21', '', '', '', '', '', '', ''],
    ['21-22', '', '', '', '', '', '', ''],
    ['22-23', '', '', '', '', '', '', '']
  ]
};

const DIAS = ['Hora', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function ScheduleTable() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const getCourseStyle = (course: string) => {
    if (!course) return {};
    if (course.includes('MC510')) {
      return {
        background: 'rgba(59, 130, 246, 0.28)',
        border: '1px solid rgba(96, 165, 250, 0.45)',
        color: '#93c5fd'
      };
    }
    if (course.includes('MC520')) {
      return {
        background: 'rgba(168, 85, 247, 0.28)',
        border: '1px solid rgba(192, 132, 252, 0.45)',
        color: '#d8b4fe'
      };
    }
    if (course.includes('MC500')) {
      return {
        background: 'rgba(16, 185, 129, 0.28)',
        border: '1px solid rgba(52, 211, 153, 0.45)',
        color: '#6ee7b7'
      };
    }
    return {
      background: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      color: '#ffffff'
    };
  };

  return (
    <div className="schedule-container">
      {/* Cabecera */}
      <div className="schedule-header">
        <div className="header-info">
          <h2 className="title">Horario de Clases</h2>
          <p className="subtitle">
            <span className="badge-note">Nota:</span> Presione en una asignatura para ver los detalles.
          </p>
        </div>
        <div className="header-tags">
          <div className="period-pill">
            <span>2024-II</span>
          </div>
          <span className="badge-definitivo">DEFINITIVO</span>
        </div>
      </div>

      <div className="hours-banner">
        <span>⏱️ Carga horaria registrada: <strong>16 HRS semanales</strong></span>
      </div>

      {/* Detalle seleccionado */}
      {selectedCourse && (
        <div className="course-detail-banner">
          <div>
            <span className="course-code">{selectedCourse}</span>
            <p className="course-type">Modalidad: Virtual Teórico | Facultad de Ingeniería Mecánica</p>
          </div>
          <button className="btn-close-detail" onClick={() => setSelectedCourse(null)}>
            ✕ Cerrar
          </button>
        </div>
      )}

      {/* Tabla Glass */}
      <div className="table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              {DIAS.map((dia, idx) => (
                <th key={idx} className={idx === 0 ? 'th-hour' : 'th-day'}>
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEFAULT_SCHEDULE.datos.map((fila, rowIdx) => (
              <tr key={rowIdx}>
                {fila.map((celda, colIdx) => {
                  const isHour = colIdx === 0;
                  const hasData = celda && celda.trim().length > 0;

                  if (isHour) {
                    return (
                      <td key={colIdx} className="td-hour">
                        {celda}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={colIdx}
                      className={`td-slot ${hasData ? 'has-data' : ''}`}
                      onClick={() => hasData && setSelectedCourse(celda)}
                    >
                      {hasData && (
                        <div className="course-pill" style={getCourseStyle(celda)}>
                          {celda}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .schedule-container {
          width: 100%;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .title {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
        }

        .subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin-top: 4px;
        }

        .badge-note {
          color: #60a5fa;
          font-weight: 600;
        }

        .header-tags {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .period-pill {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
        }

        .badge-definitivo {
          padding: 6px 14px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(52, 211, 153, 0.45);
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #6ee7b7;
        }

        .hours-banner {
          margin-bottom: 18px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
        }

        .course-detail-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding: 14px 18px;
          background: rgba(59, 130, 246, 0.18);
          border: 1px solid rgba(96, 165, 250, 0.4);
          border-radius: 12px;
          backdrop-filter: blur(12px);
          animation: slideDown 0.25s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .course-code {
          font-weight: 700;
          font-size: 14px;
          color: #ffffff;
        }

        .course-type {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 2px;
        }

        .btn-close-detail {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 8px;
          padding: 6px 12px;
          color: #ffffff;
          font-size: 12px;
          cursor: pointer;
        }

        .btn-close-detail:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        .table-wrapper {
          overflow-x: auto;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        .schedule-table {
          width: 100%;
          min-width: 820px;
          border-collapse: collapse;
          text-align: center;
        }

        .schedule-table th {
          padding: 14px 12px;
          background: rgba(255, 255, 255, 0.08);
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .th-hour {
          width: 90px;
          color: #93c5fd !important;
        }

        .schedule-table td {
          padding: 8px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          height: 48px;
          font-size: 12px;
        }

        .td-hour {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.65);
          background: rgba(255, 255, 255, 0.03);
          font-family: monospace;
          font-size: 12px;
        }

        .td-slot.has-data {
          cursor: pointer;
        }

        .course-pill {
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.3;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .course-pill:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}
