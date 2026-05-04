import { useState } from 'react';
import './Gallery.scss';

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
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <div>
              <div className="eyebrow gallery-header__eyebrow">Gallery</div>
              <h1 className="display gallery-header__title">
                Seven years of{' '}
                <span className="gallery-header__title-accent">showing up.</span>
              </h1>
              <p className="gallery-header__desc">
                Every photo below is from a real day at a real school. We don't stage our work.
              </p>
            </div>
            <div className="gallery-year-picker">
              {years.map((y) => (
                <button
                  key={y}
                  className={`gallery-year-picker__btn ${year === y ? 'gallery-year-picker__btn--active' : 'gallery-year-picker__btn--inactive'}`}
                  onClick={() => setYear(y)}
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

          <div className="gallery-stats">
            <div className="gallery-stats__grid">
              {[
                { n: String(year), l: 'Season' },
                { n: '320', l: 'Participants' },
                { n: '11', l: 'Volunteers' },
                { n: '146', l: 'Certificates printed' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="eyebrow gallery-stats__eyebrow">{s.l}</div>
                  <div className="display gallery-stats__n">{s.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
