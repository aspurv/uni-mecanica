import React, { useState } from 'react';
import { GlassPanel, GlassBadge, GlassButton } from './glassyui';

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

  const getBadgeTone = (course: string): 'blue' | 'purple' | 'green' | 'neutral' => {
    if (course.includes('MC510')) return 'blue';
    if (course.includes('MC520')) return 'purple';
    if (course.includes('MC500')) return 'green';
    return 'neutral';
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
          <GlassBadge tone="neutral">Periodo 2024-II</GlassBadge>
          <GlassBadge tone="green" dot>DEFINITIVO</GlassBadge>
        </div>
      </div>

      <div className="hours-banner">
        <span>⏱️ Carga horaria registrada: <strong>16 HRS semanales</strong></span>
      </div>

      {/* Detalle seleccionado */}
      {selectedCourse && (
        <GlassPanel variant="card" className="course-detail-banner">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlassBadge tone={getBadgeTone(selectedCourse)} dot>
                {selectedCourse.split(' ')[0]}
              </GlassBadge>
              <span className="course-code">{selectedCourse}</span>
            </div>
            <p className="course-type">Modalidad: Virtual Teórico | Facultad de Ingeniería Mecánica</p>
          </div>
          <GlassButton variant="soft" size="sm" onClick={() => setSelectedCourse(null)}>
            ✕ Cerrar
          </GlassButton>
        </GlassPanel>
      )}

      {/* Tabla Glass */}
      <GlassPanel variant="panel" className="table-wrapper">
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
                        <GlassBadge
                          tone={getBadgeTone(celda)}
                          className="course-badge"
                        >
                          {celda}
                        </GlassBadge>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>

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
          border-bottom: 1px solid var(--lg-border);
        }

        .title {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
        }

        .subtitle {
          font-size: 13px;
          color: var(--lg-muted-foreground);
          margin-top: 4px;
        }

        .badge-note {
          color: #60a5fa;
          font-weight: 600;
        }

        .header-tags {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hours-banner {
          margin-bottom: 18px;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--lg-border);
          border-radius: 12px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
        }

        .course-detail-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding: 16px 20px;
          border-radius: 14px;
          animation: slideDown 0.25s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .course-code {
          font-weight: 600;
          font-size: 13.5px;
          color: #ffffff;
          margin-left: 6px;
        }

        .course-type {
          font-size: 12px;
          color: var(--lg-muted-foreground);
          margin-top: 4px;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .schedule-table {
          width: 100%;
          min-width: 820px;
          border-collapse: collapse;
          text-align: center;
        }

        .schedule-table th {
          padding: 14px 12px;
          background: rgba(255, 255, 255, 0.06);
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid var(--lg-border);
        }

        .th-hour {
          width: 90px;
          color: #93c5fd !important;
        }

        .schedule-table td {
          padding: 8px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.04);
          height: 48px;
          font-size: 12px;
        }

        .td-hour {
          font-weight: 600;
          color: var(--lg-muted-foreground);
          background: rgba(255, 255, 255, 0.02);
          font-family: monospace;
          font-size: 12px;
        }

        .td-slot.has-data {
          cursor: pointer;
        }

        .course-badge {
          display: inline-block;
          font-size: 11px;
          padding: 6px 10px;
          white-space: normal;
          line-height: 1.3;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .course-badge:hover {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
    </div>
  );
}
