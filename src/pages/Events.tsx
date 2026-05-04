import { useState } from 'react';
import { PROYASH_DATA, Icon } from '../data';
import type { Page } from '../types';
import './Events.scss';

interface EventsProps {
  setPage: (p: Page) => void;
}

export function Events({ setPage }: EventsProps) {
  const [selected, setSelected] = useState('quiz');
  const ev = PROYASH_DATA.events.find((e) => e.id === selected)!;

  return (
    <div>
      <section className="events-hero">
        <div className="container events-hero__grid">
          <div>
            <div className="eyebrow events-hero__eyebrow">The annual festival</div>
            <h1 className="display events-hero__title">
              Medha Pariksha{' '}
              <span className="events-hero__title-accent">2026.</span>
            </h1>
            <div className="bn-display events-hero__bn">
              প্রয়াস মেধা পরীক্ষা — ২০২৬
            </div>
          </div>
          <div className="events-hero__info-grid">
            <div className="card events-hero__info-card">
              <div className="eyebrow events-hero__info-eyebrow">
                <Icon.cal /> When
              </div>
              <div className="display events-hero__info-title">10–11 Oct 2026</div>
              <div className="small muted">Saturday & Sunday</div>
            </div>
            <div className="card events-hero__info-card">
              <div className="eyebrow events-hero__info-eyebrow">
                <Icon.pin /> Where
              </div>
              <div className="display events-hero__info-where-title">
                Tehatta Sridham Chandra Balika Vidyalaya
              </div>
              <div className="small muted events-hero__info-sub">Tehatta, Nadia</div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-body">
        <div className="container events-layout">
          <div>
            <div className="eyebrow events-list__eyebrow">All 10 events</div>
            <div className="stack" style={{ '--gap': '6px' } as React.CSSProperties}>
              {PROYASH_DATA.events.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelected(e.id)}
                  className={`hover-lift events-list__item ${selected === e.id ? 'events-list__item--selected' : 'events-list__item--default'}`}
                >
                  <span
                    className="events-list__item-dot"
                    style={{ background: `var(--${e.color})` }}
                  />
                  <div className="events-list__item-body">
                    <div className="events-list__item-en">{e.en}</div>
                    <div
                      className={`bn small events-list__item-bn`}
                      style={{ opacity: selected === e.id ? 0.7 : 0.6 }}
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
            <div
              className="card events-detail__card"
            >
              <div
                className="events-detail__header"
                style={{
                  background: `var(--${ev.color}-tint)`,
                  borderBottom: `1px solid var(--${ev.color})`,
                }}
              >
                <div className="events-detail__header-inner">
                  <div>
                    <div
                      className="bn-display events-detail__bn"
                      style={{ color: `var(--${ev.color})` }}
                    >
                      {ev.bn}
                    </div>
                    <h2 className="display events-detail__title">{ev.en}</h2>
                  </div>
                  <div
                    className="chip events-detail__chip"
                    style={{
                      color: `var(--${ev.color})`,
                      border: `1px solid var(--${ev.color})`,
                    }}
                  >
                    <span className="chip-dot" /> Registration open
                  </div>
                </div>
                <p className="events-detail__desc">{ev.desc}</p>
              </div>

              <div className="events-detail__info-grid">
                <Detail
                  label="Age groups"
                  value={
                    <div className="stack" style={{ '--gap': '4px' } as React.CSSProperties}>
                      {ev.slots.map((s, i) => (
                        <div key={i} className="events-detail__slot">
                          {s}
                        </div>
                      ))}
                    </div>
                  }
                />
                <Detail
                  label="Duration"
                  value={
                    <span className="display events-detail__duration">{ev.duration}</span>
                  }
                />
                <Detail label="Format" value={<span>{ev.format}</span>} />
              </div>

              <hr className="hr" />

              <div className="events-prizes">
                <div className="eyebrow events-prizes__eyebrow">Prizes for each age group</div>
                <div className="events-prizes__grid">
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
                <div className="small muted events-prizes__note">
                  Every participant receives a certificate and a book of their choice from our
                  library.
                </div>
              </div>

              <hr className="hr" />

              <div className="events-reg-bar">
                <div>
                  <div className="mono">Registration closes 5 Oct 2026</div>
                  <div className="small muted events-reg-bar__note">
                    Free for students from partner schools. ₹50 for others — waived on request.
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => setPage('register')}>
                  Register for {ev.en} <Icon.arrow />
                </button>
              </div>
            </div>

            <div className="events-schedule">
              <div className="eyebrow events-schedule__eyebrow">Weekend schedule · Oct 10–11</div>
              <div className="card events-schedule__card">
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
                    className="events-schedule__row"
                    style={{
                      borderBottom: i < a.length - 1 ? '1px solid var(--rule)' : 'none',
                      background: i % 2 ? 'var(--cream-2)' : 'transparent',
                    }}
                  >
                    <div className="mono">{r.day}</div>
                    <div className="display events-schedule__time">{r.time}</div>
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
      <div className="eyebrow events-detail__info-eyebrow">{label}</div>
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
    <div className="events-prize-row">
      <div
        className="events-prize-row__medal"
        style={{ background: `var(--${color})` }}
      >
        {rank}
      </div>
      <div>
        <div className="events-prize-row__name">{medal}</div>
        <div className="small muted">{prize}</div>
      </div>
    </div>
  );
}
