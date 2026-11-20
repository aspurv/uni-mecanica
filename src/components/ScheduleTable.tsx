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
    if (course.includes('MC510')) {
      return {
        bg: 'rgba(0, 113, 227, 0.15)',
        border: 'rgba(0, 113, 227, 0.35)',
        text: '#2997ff',
        dot: '#2997ff'
      };
    }
    if (course.includes('MC520')) {
      return {
        bg: 'rgba(175, 82, 222, 0.15)',
        border: 'rgba(175, 82, 222, 0.35)',
        text: '#bf5af2',
        dot: '#bf5af2'
      };
    }
    if (course.includes('MC500')) {
      return {
        bg: 'rgba(48, 209, 88, 0.15)',
        border: 'rgba(48, 209, 88, 0.35)',
        text: '#30d158',
        dot: '#30d158'
      };
    }
    return {
      bg: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.12)',
      text: '#f5f5f7',
      dot: '#86868b'
    };
  };

  return (
    <div className="apple-schedule-container">
      {/* Apple Header */}
      <div className="schedule-headline-block">
        <div>
          <span className="apple-category">Planificación Académica 2026</span>
          <h1 className="schedule-main-title">Horario Oficial de Asignaturas</h1>
          <p className="schedule-desc">Facultad de Ingeniería Mecánica · Ciclo 2024-II / Definitivo</p>
        </div>
        <div className="apple-badges-row">
          <span className="apple-status-pill green">● Definitivo</span>
          <span className="apple-status-pill neutral">16 hrs / semana</span>
        </div>
      </div>

      {/* Selected Course Floating Banner */}
      {selectedCourse && (
        <div className="course-detail-callout">
          <div className="detail-left">
            <span className="detail-pill" style={{ color: getCourseStyle(selectedCourse).text }}>
              {selectedCourse.split(' ')[0]}
            </span>
            <div>
              <h4 className="detail-title">{selectedCourse}</h4>
              <p className="detail-meta">Modalidad Virtual Teórico · Sistema de Registro FIM</p>
            </div>
          </div>
          <button className="apple-close-btn" onClick={() => setSelectedCourse(null)}>
            ✕ Cerrar
          </button>
        </div>
      )}

      {/* Modern Apple Frosted Table */}
      <div className="table-wrapper-apple">
        <table className="apple-schedule-table">
          <thead>
            <tr>
              {DIAS.map((dia, idx) => (
                <th key={idx} className={idx === 0 ? 'th-hour' : ''}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEFAULT_SCHEDULE.datos.map((row, rIdx) => {
              const hour = row[0];
              const days = row.slice(1);
              return (
                <tr key={rIdx}>
                  <td className="td-hour">{hour}</td>
                  {days.map((cell, cIdx) => {
                    if (!cell) {
                      return <td key={cIdx} className="td-empty" />;
                    }

                    const style = getCourseStyle(cell);
                    return (
                      <td key={cIdx} className="td-cell">
                        <div
                          className="apple-course-chip"
                          style={{
                            backgroundColor: style.bg,
                            borderColor: style.border,
                            color: style.text
                          }}
                          onClick={() => setSelectedCourse(cell)}
                        >
                          <span className="chip-dot" style={{ backgroundColor: style.dot }}></span>
                          <span className="chip-text">{cell}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .apple-schedule-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: appleFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .schedule-headline-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .apple-category {
          font-size: 12px;
          font-weight: 600;
          color: #2997ff;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .schedule-main-title {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f5f5f7;
          margin: 6px 0 4px;
        }

        .schedule-desc {
          font-size: 13.5px;
          color: #86868b;
        }

        .apple-badges-row {
          display: flex;
          gap: 10px;
        }

        .apple-status-pill {
          font-size: 12px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 980px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .apple-status-pill.green {
          background: rgba(48, 209, 88, 0.14);
          color: #30d158;
          border: 1px solid rgba(48, 209, 88, 0.3);
        }

        .apple-status-pill.neutral {
          background: rgba(255, 255, 255, 0.08);
          color: #d1d1d6;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .course-detail-callout {
          background: rgba(22, 22, 23, 0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
        }

        .detail-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .detail-pill {
          background: rgba(255, 255, 255, 0.08);
          padding: 6px 12px;
          border-radius: 980px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .detail-title {
          font-size: 15px;
          font-weight: 600;
          color: #f5f5f7;
        }

        .detail-meta {
          font-size: 12px;
          color: #86868b;
          margin-top: 2px;
        }

        .apple-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #d1d1d6;
          border-radius: 980px;
          padding: 6px 14px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .apple-close-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }

        /* Table */
        .table-wrapper-apple {
          background: rgba(22, 22, 23, 0.65);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow-x: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .apple-schedule-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }

        .apple-schedule-table th {
          background: rgba(30, 30, 32, 0.7);
          padding: 14px 12px;
          font-weight: 600;
          color: #a1a1a6;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          border-right: 1px solid rgba(255, 255, 255, 0.04);
        }

        .th-hour {
          width: 90px;
        }

        .apple-schedule-table td {
          padding: 8px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          border-right: 1px solid rgba(255, 255, 255, 0.04);
          height: 48px;
        }

        .td-hour {
          font-weight: 500;
          color: #86868b;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
          font-variant-numeric: tabular-nums;
        }

        .td-empty {
          background: transparent;
        }

        .apple-course-chip {
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-course-chip:hover {
          transform: scale(1.02);
          filter: brightness(1.2);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }

        .chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .chip-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
