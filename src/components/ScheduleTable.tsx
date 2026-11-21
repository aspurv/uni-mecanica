import React, { useState, useEffect } from 'react';

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
const COURSES = ['Todos', 'MC510', 'MC520', 'MC500'];

export default function ScheduleTable() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filterCourse, setFilterCourse] = useState<string>('Todos');
  const [currentDayIdx, setCurrentDayIdx] = useState<number>(-1);
  const [currentHourStr, setCurrentHourStr] = useState<string>('');
  const [activeCourseNow, setActiveCourseNow] = useState<string | null>(null);

  useEffect(() => {
    // Detectar día de hoy (1 = Lunes, ..., 7 = Domingo)
    const now = new Date();
    const day = now.getDay();
    const mappedDay = day === 0 ? 7 : day; // Domingo = 7
    setCurrentDayIdx(mappedDay);

    const hour = now.getHours();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const slot = `${pad(hour)}-${pad(hour + 1)}`;
    setCurrentHourStr(slot);

    // Buscar si hay clase ahora
    const row = DEFAULT_SCHEDULE.datos.find(r => r[0] === slot);
    if (row && row[mappedDay]) {
      setActiveCourseNow(row[mappedDay]);
    } else {
      setActiveCourseNow(null);
    }
  }, []);

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
          {activeCourseNow ? (
            <span className="apple-status-pill live-pill">
              <span className="live-dot" /> EN CURSO AHORA: {activeCourseNow.split(' ')[0]}
            </span>
          ) : (
            <span className="apple-status-pill neutral">Sin clase en este momento</span>
          )}
          <span className="apple-status-pill green">● Definitivo</span>
          <span className="apple-status-pill neutral">16 hrs / sem</span>
        </div>
      </div>

      {/* Course Filter Bar (Pill Filter) */}
      <div className="filter-bar">
        <span className="filter-label">Filtrar asignatura:</span>
        <div className="filter-pills">
          {COURSES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${filterCourse === c ? 'active' : ''}`}
              onClick={() => setFilterCourse(c)}
            >
              {c}
            </button>
          ))}
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
              <p className="detail-meta">Modalidad Virtual Teórico · FIM UNI</p>
            </div>
          </div>
          <div className="detail-actions">
            <button 
              className="apple-primary-mini-btn"
              onClick={() => alert(`Conectando a sala virtual de ${selectedCourse.split(' ')[0]}...`)}
            >
              🔗 Entrar a Sala
            </button>
            <button className="apple-close-btn" onClick={() => setSelectedCourse(null)}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modern Apple Frosted Table */}
      <div className="table-wrapper-apple">
        <table className="apple-schedule-table">
          <thead>
            <tr>
              {DIAS.map((dia, idx) => {
                const isToday = idx === currentDayIdx;
                return (
                  <th key={idx} className={`${idx === 0 ? 'th-hour' : ''} ${isToday ? 'th-today' : ''}`}>
                    {dia}
                    {isToday && <span className="today-badge">Hoy</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {DEFAULT_SCHEDULE.datos.map((row, rIdx) => {
              const hour = row[0];
              const isCurrentHour = hour === currentHourStr;
              const days = row.slice(1);
              return (
                <tr key={rIdx} className={isCurrentHour ? 'tr-current-hour' : ''}>
                  <td className={`td-hour ${isCurrentHour ? 'td-hour-current' : ''}`}>
                    {hour}
                  </td>
                  {days.map((cell, cIdx) => {
                    const dayNumber = cIdx + 1;
                    const isTodayCell = dayNumber === currentDayIdx;

                    if (!cell) {
                      return <td key={cIdx} className={`td-empty ${isTodayCell ? 'td-today-col' : ''}`} />;
                    }

                    const isDimmed = filterCourse !== 'Todos' && !cell.includes(filterCourse);
                    const style = getCourseStyle(cell);

                    return (
                      <td key={cIdx} className={`td-cell ${isTodayCell ? 'td-today-col' : ''}`}>
                        <div
                          className={`apple-course-chip ${isDimmed ? 'dimmed' : ''}`}
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
          gap: 20px;
          animation: appleFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .schedule-headline-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 16px;
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
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
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

        .live-pill {
          background: rgba(0, 113, 227, 0.2);
          border: 1px solid #0071e3;
          color: #2997ff;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          background: #30d158;
          border-radius: 50%;
          box-shadow: 0 0 10px #30d158;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* Filter Pills */
        .filter-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-label {
          font-size: 12px;
          color: #86868b;
          font-weight: 500;
        }

        .filter-pills {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #86868b;
          font-size: 12px;
          padding: 5px 14px;
          border-radius: 980px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .filter-btn:hover {
          color: #f5f5f7;
          background: rgba(255, 255, 255, 0.12);
        }

        .filter-btn.active {
          background: #0071e3;
          color: #ffffff;
          border-color: #0071e3;
          font-weight: 500;
        }

        /* Detail Callout */
        .course-detail-callout {
          background: rgba(22, 22, 23, 0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 16px 22px;
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

        .detail-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .apple-primary-mini-btn {
          background: #0071e3;
          color: #fff;
          border: none;
          padding: 7px 16px;
          border-radius: 980px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .apple-primary-mini-btn:hover {
          background: #0077ed;
          transform: scale(1.02);
        }

        .apple-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #d1d1d6;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .apple-close-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #fff;
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

        .th-today {
          background: rgba(0, 113, 227, 0.14) !important;
          color: #2997ff !important;
        }

        .today-badge {
          display: block;
          font-size: 10px;
          font-weight: 500;
          color: #2997ff;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
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

        .td-today-col {
          background: rgba(0, 113, 227, 0.03);
        }

        .tr-current-hour {
          background: rgba(255, 255, 255, 0.02);
        }

        .td-hour {
          font-weight: 500;
          color: #86868b;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
          font-variant-numeric: tabular-nums;
        }

        .td-hour-current {
          color: #2997ff;
          font-weight: 600;
          background: rgba(0, 113, 227, 0.12);
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

        .apple-course-chip.dimmed {
          opacity: 0.15;
          filter: grayscale(80%);
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
