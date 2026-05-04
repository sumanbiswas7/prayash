import { useState } from 'react';
import { PRAYASH_DATA, Icon } from '../data';
import type { Page } from '../types';

interface EventsProps {
  setPage: (p: Page) => void;
}

export function Events({ setPage }: EventsProps) {
  const [selected, setSelected] = useState('quiz');
  const ev = PRAYASH_DATA.events.find((e) => e.id === selected)!;

  return (
    <div>
      <section
        style={{
          padding: '72px 0 40px',
          background: 'var(--cream-2)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div className="container events-header-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              The annual festival
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', margin: 0 }}>
              Medha Pariksha{' '}
              <span style={{ color: 'var(--red)', fontStyle: 'italic', fontWeight: 400 }}>
                2026.
              </span>
            </h1>
            <div
              className="bn-display"
              style={{ fontSize: 22, marginTop: 14, color: 'var(--ink-2)' }}
            >
              প্রয়াস মেধা পরীক্ষা — ২০২৬
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="card" style={{ padding: '18px 20px' }}>
              <div className="eyebrow">
                <Icon.cal /> When
              </div>
              <div className="display" style={{ fontSize: 26, marginTop: 6 }}>
                10–11 Oct 2026
              </div>
              <div className="small muted">Saturday & Sunday</div>
            </div>
            <div className="card" style={{ padding: '18px 20px' }}>
              <div className="eyebrow">
                <Icon.pin /> Where
              </div>
              <div className="display" style={{ fontSize: 22, marginTop: 6, lineHeight: 1.1 }}>
                Tehatta Sridham Chandra Balika Vidyalaya
              </div>
              <div className="small muted" style={{ marginTop: 4 }}>
                Tehatta, Nadia
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="container events-layout">
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              All 10 events
            </div>
            <div className="stack" style={{ '--gap': '6px' } as React.CSSProperties}>
              {PRAYASH_DATA.events.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelected(e.id)}
                  className="hover-lift"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: selected === e.id ? 'var(--ink)' : 'var(--paper)',
                    color: selected === e.id ? 'var(--cream-2)' : 'var(--ink)',
                    border: '1px solid ' + (selected === e.id ? 'var(--ink)' : 'var(--rule)'),
                    borderRadius: 12,
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: `var(--${e.color})`,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{e.en}</div>
                    <div
                      className="bn small"
                      style={{ opacity: selected === e.id ? 0.7 : 0.6, marginTop: 2 }}
                    >
                      {e.bn}
                    </div>
                  </div>
                  {selected === e.id && <Icon.arrow />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div
                style={{
                  background: `var(--${ev.color}-tint)`,
                  borderBottom: `1px solid var(--${ev.color})`,
                  padding: '32px 36px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 20,
                  }}
                >
                  <div>
                    <div
                      className="bn-display"
                      style={{ fontSize: 28, color: `var(--${ev.color})` }}
                    >
                      {ev.bn}
                    </div>
                    <h2 className="display" style={{ fontSize: 56, margin: '6px 0 0' }}>
                      {ev.en}
                    </h2>
                  </div>
                  <div
                    className="chip"
                    style={{
                      background: 'white',
                      color: `var(--${ev.color})`,
                      border: `1px solid var(--${ev.color})`,
                    }}
                  >
                    <span className="chip-dot" /> Registration open
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 18,
                    color: 'var(--ink-2)',
                    marginTop: 18,
                    marginBottom: 0,
                    maxWidth: 640,
                  }}
                >
                  {ev.desc}
                </p>
              </div>

              <div className="event-detail-grid">
                <Detail
                  label="Age groups"
                  value={
                    <div className="stack" style={{ '--gap': '4px' } as React.CSSProperties}>
                      {ev.slots.map((s, i) => (
                        <div key={i} style={{ fontWeight: 500 }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  }
                />
                <Detail
                  label="Duration"
                  value={
                    <span className="display" style={{ fontSize: 22 }}>
                      {ev.duration}
                    </span>
                  }
                />
                <Detail label="Format" value={<span>{ev.format}</span>} />
              </div>

              <hr className="hr" />

              <div style={{ padding: '28px 36px' }}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>
                  Prizes for each age group
                </div>
                <div className="prize-grid">
                  <PrizeRow
                    rank="1st"
                    medal="Gold"
                    color="yellow"
                    prize="Medal + ₹1,500 book voucher + certificate"
                  />
                  <PrizeRow
                    rank="2nd"
                    medal="Silver"
                    color="teal"
                    prize="Medal + ₹1,000 book voucher + certificate"
                  />
                  <PrizeRow
                    rank="3rd"
                    medal="Bronze"
                    color="orange"
                    prize="Medal + ₹500 book voucher + certificate"
                  />
                </div>
                <div className="small muted" style={{ marginTop: 14 }}>
                  Every participant receives a certificate and a book of their choice from our
                  library.
                </div>
              </div>

              <hr className="hr" />

              <div className="event-reg-bar">
                <div>
                  <div className="mono">Registration closes 5 Oct 2026</div>
                  <div className="small muted" style={{ marginTop: 4 }}>
                    Free for students from partner schools. ₹50 for others — waived on request.
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => setPage('register')}>
                  Register for {ev.en} <Icon.arrow />
                </button>
              </div>
            </div>

            <div style={{ marginTop: 36 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                Weekend schedule · Oct 10–11
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {[
                  { time: '08:00', title: 'Gates open · registration desk', day: 'Sat' },
                  { time: '09:30', title: 'Opening ceremony · Bengali anthem', day: 'Sat' },
                  { time: '10:00', title: 'Quiz, Handwriting, Drawing (Group A)', day: 'Sat' },
                  { time: '12:30', title: 'Lunch · rice & dal for all participants', day: 'Sat' },
                  { time: '14:00', title: 'Essay, Abriti preliminaries', day: 'Sat' },
                  { time: '09:00', title: 'Singing, Spelling Bee, Mental Math', day: 'Sun' },
                  { time: '13:00', title: 'Debate finals, Craft showcase', day: 'Sun' },
                  {
                    time: '16:00',
                    title: 'Prize distribution · certificates & medals',
                    day: 'Sun',
                  },
                ].map((r, i, a) => (
                  <div
                    key={i}
                    className="schedule-row"
                    style={{
                      borderBottom: i < a.length - 1 ? '1px solid var(--rule)' : 'none',
                      background: i % 2 ? 'var(--cream-2)' : 'transparent',
                    }}
                  >
                    <div className="mono">{r.day}</div>
                    <div className="display" style={{ fontSize: 18 }}>
                      {r.time}
                    </div>
                    <div>{r.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {label}
      </div>
      <div>{value}</div>
    </div>
  );
}

function PrizeRow({
  rank,
  medal,
  color,
  prize,
}: {
  rank: string;
  medal: string;
  color: string;
  prize: string;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--rule)',
        borderRadius: 12,
        padding: '14px 16px',
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        background: 'var(--paper)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: `var(--${color})`,
          color: 'white',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.15)',
        }}
      >
        {rank}
      </div>
      <div>
        <div style={{ fontWeight: 600 }}>{medal}</div>
        <div className="small muted">{prize}</div>
      </div>
    </div>
  );
}
