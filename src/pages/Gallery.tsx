import { useState } from 'react';

export function Gallery() {
  const years = [2025, 2024, 2023, 2022];
  const [year, setYear] = useState(2025);
  const grid = [
    { span: 'col', aspect: '16/10', label: 'Opening ceremony · Medha Pariksha', color: 'blue' },
    { span: null, aspect: '3/4', label: 'Abriti preliminaries', color: 'red' },
    { span: null, aspect: '3/4', label: 'Drawing competition', color: 'orange' },
    { span: null, aspect: '1/1', label: 'Quiz rapid round', color: 'teal' },
    { span: null, aspect: '1/1', label: 'Lunch break', color: 'green' },
    { span: 'col', aspect: '16/10', label: 'Prize distribution', color: 'yellow' },
    { span: null, aspect: '4/3', label: 'Book donation drive', color: 'purple' },
    { span: null, aspect: '4/3', label: 'Students with new books', color: 'teal' },
  ];

  return (
    <div>
      <section style={{ padding: '64px 0 32px' }}>
        <div className="container">
          <div className="gallery-header">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                Gallery
              </div>
              <h1 className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', margin: 0 }}>
                Seven years of{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--blue)', fontWeight: 400 }}>
                  showing up.
                </span>
              </h1>
              <p style={{ marginTop: 18, color: 'var(--ink-2)', maxWidth: 560, fontSize: 17 }}>
                Every photo below is from a real day at a real school. We don't stage our work.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 4,
                padding: 4,
                background: 'var(--paper)',
                border: '1px solid var(--rule)',
                borderRadius: 999,
              }}
            >
              {years.map((y) => (
                <button
                  key={y}
                  className="nav-link"
                  onClick={() => setYear(y)}
                  style={{
                    background: year === y ? 'var(--ink)' : 'transparent',
                    color: year === y ? 'var(--cream-2)' : 'var(--ink)',
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-photo-grid">
            {grid.map((g, i) => (
              <div
                key={`${year}-${i}`}
                className={`ph hover-lift${g.span === 'col' ? ' gallery-wide' : ''}`}
                style={{
                  aspectRatio: g.aspect,
                  background: `var(--${g.color}-tint)`,
                  borderColor: `var(--${g.color})`,
                }}
              >
                <span className="ph-label">
                  PHOTO · {g.label} · {year}
                </span>
              </div>
            ))}
          </div>

          <div
            className="gallery-stats-grid"
            style={{
              marginTop: 48,
              padding: '32px 36px',
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {[
              { n: String(year), l: 'Season' },
              { n: '320', l: 'Participants' },
              { n: '11', l: 'Volunteers' },
              { n: '146', l: 'Certificates printed' },
            ].map((s, i) => (
              <div key={i}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  {s.l}
                </div>
                <div className="display" style={{ fontSize: 40, lineHeight: 1 }}>
                  {s.n}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
