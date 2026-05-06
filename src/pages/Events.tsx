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
            <div className="eyebrow events-hero__eyebrow">Upcoming events</div>
            <h1 className="display events-hero__title">
              Annual Festival <span className="events-hero__title-accent">2026.</span>
            </h1>
            <div className="bn-display events-hero__bn">প্রয়াস বার্ষিক অনুষ্ঠান — ২০২৬</div>
          </div>
          <div className="events-hero__info-grid">
            <div className="card events-hero__info-card">
              <div className="eyebrow events-hero__info-eyebrow">
                <Icon.cal /> When
              </div>
              <div className="display events-hero__info-title">To Be Announced</div>
              <div className="small muted">Most likely in late 2026</div>
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
            <div className="eyebrow events-list__eyebrow">All events</div>
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
            <div className="card events-detail__card">
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
                    className="chip events-detail__chip events-detail__chip--desktop"
                    style={{
                      color: `var(--${ev.color})`,
                      border: `1px solid var(--${ev.color})`,
                    }}
                  >
                    <span className="chip-dot" /> Opening Soon
                  </div>
                </div>
                <p className="events-detail__desc">{ev.desc}</p>
                <div
                  className="chip events-detail__chip events-detail__chip--mobile"
                  style={{
                    color: `var(--${ev.color})`,
                    border: `1px solid var(--${ev.color})`,
                  }}
                >
                  <span className="chip-dot" /> Opening Soon
                </div>
              </div>

              <div className="events-detail__info-grid">
                <Detail
                  label="Groups"
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
                    <div className="stack" style={{ '--gap': '4px' } as React.CSSProperties}>
                      {ev.duration.map((d, i) => (
                        <div key={i} className="events-detail__duration">
                          {d}
                        </div>
                      ))}
                    </div>
                  }
                />
                <Detail label="Format" value={<span>{ev.format}</span>} />
              </div>

              <hr className="hr" />

              <div className="events-prizes">
                <div className="eyebrow events-prizes__eyebrow">Prizes</div>
                <div className="events-prizes__grid">
                  <PrizeRow rank="1st" medal="Gold" color="yellow" prize="Books & Memento" />
                  <PrizeRow rank="2nd" medal="Silver" color="teal" prize="Books & Memento" />
                  <PrizeRow rank="3rd" medal="Bronze" color="orange" prize="Books & Memento" />
                </div>
              </div>

              <hr className="hr" />

              <div className="events-reg-bar">
                <div>
                  <div className="mono" style={{ marginBottom: '1rem' }}>
                    Notes
                  </div>
                  <div className="small muted events-reg-bar__note">
                    * প্রত্যেক প্রতিযোগিতা শুরুর আধ ঘন্টা আগে প্রত্যেক প্রতিযোগীকে এসে উপস্থিত হয়ে
                    এন্ট্রি ফি জমা দিতে হবে, তবেই প্রতিযোগিতায় তাদের নাম নিশ্চিত হবে। আমাদের বাছাই
                    করা দুঃস্থ-মেধাবীদের কোনো এন্ট্রি ফি লাগবে না।
                    <br />
                    <br />
                    * অনেক ক্ষেত্রেই বহু প্রতিযোগী সকাল থেকে সন্ধ্যা পর্যন্ত আমাদের অনুষ্ঠানে থেকে
                    প্রতিযোগিতায় অংশগ্রহণ করে তাদের কথা ভেবে দুপুরে ভাতের ব্যবস্থা করা হয়েছে।
                    এরজন্য তাদের এন্ট্রি ফি ব্যতীত কোনো অতিরিক্ত টাকা দিতে হবে না।
                    <br />
                    <br />
                    * প্রতিযোগিতায় অংশগ্রহণকারি ছাড়া অন্যরা দুপুরের আহার গ্রহণ করতে চাইলে তাদের
                    7363850993 নম্বরে ফোন করে একদিন আগে জানাতে হবে এবং অনুদান হিসাবে ওই নম্বরের
                    অন্তত 30 টাকা দিয়ে সাহায্য করতে হবে।
                    <br />
                    <br />* অনিবার্য কারণ ছাড়া সময় সূচি মেনেই প্রতিটা অনুষ্ঠান অনুষ্ঠিত হবে।
                  </div>
                </div>
              </div>

              {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
                <button className="btn btn-primary" onClick={() => setPage('register')}>
                  Register for {ev.en} <Icon.arrow />
                </button>
              </div> */}
            </div>

            <div className="events-schedule">
              <div className="eyebrow events-schedule__eyebrow">Most likely schedule</div>

              <div className="events-schedule__venue-label">ঘর · Room</div>
              <div className="card events-schedule__card">
                {[
                  { time: '10:00 AM', title: 'Drawing contest — Group A · বসে আঁকো (ক)' },
                  { time: '11:00 AM', title: 'Drawing contest — Group B & C · বসে আঁকো (খ, গ)' },
                  { time: '12:30 PM', title: 'Essay writing — Group A · গল্প লেখা (ক)' },
                  { time: '1:30 PM', title: 'Essay writing — Group B & C · গল্প লেখা (খ, গ)' },
                  {
                    time: '3:00 PM',
                    title: 'Quiz prelims — Children Group A · বাচ্চাদের কুইজ (ক)',
                  },
                  { time: '4:00 PM', title: 'Quiz prelims — Open · কুইজ (সর্ব সাধারণ)' },
                ].map((r, i, a) => (
                  <div
                    key={i}
                    className="events-schedule__row"
                    style={{
                      borderBottom: i < a.length - 1 ? '1px solid var(--rule)' : 'none',
                      background: i % 2 ? 'var(--cream-2)' : 'transparent',
                    }}
                  >
                    <div className="display events-schedule__time">{r.time}</div>
                    <div>{r.title}</div>
                  </div>
                ))}
              </div>

              <div className="events-schedule__venue-label" style={{ marginTop: '16px' }}>
                মূল মঞ্চ · Main Stage
              </div>
              <div className="card events-schedule__card">
                {[
                  {
                    time: '10:00 AM',
                    title: 'Opening ceremony · Guest reception · গুণীজন সংবর্ধনা',
                  },
                  {
                    time: '11:00 AM',
                    title: 'Book & notebook distribution · Prize giving (Class II–VI)',
                  },
                  { time: '11:30 AM', title: 'Poetry recitation — Group A · কবিতা পাঠ (ক)' },
                  { time: '12:30 PM', title: 'Poetry recitation — Group B · কবিতা পাঠ (খ)' },
                  { time: '1:30 PM', title: 'News reading — Group A · খবর পাঠ (ক)' },
                  { time: '2:30 PM', title: 'News reading — Group B · খবর পাঠ (খ)' },
                  { time: '3:00 PM', title: 'Debate — Open · বিতর্ক (সর্ব সাধারণ)' },
                  { time: '3:30 PM', title: 'Poetry recitation — Group C · কবিতা পাঠ (গ)' },
                  {
                    time: '4:00 PM',
                    title: 'Quiz finals — Children Group A · বাচ্চাদের কুইজ মূল পর্ব',
                  },
                  { time: '5:00 PM', title: 'Quiz finals — Open · কুইজ মূল পর্ব (সর্ব সাধারণ)' },
                  {
                    time: '6:00 PM',
                    title: 'Art exhibition (Soumitra Mondal) · Prize distribution',
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
      <div className="events-prize-row__medal" style={{ background: `var(--${color})` }}>
        {rank}
      </div>
      <div>
        <div className="events-prize-row__name">{medal}</div>
        <div className="small muted">{prize}</div>
      </div>
    </div>
  );
}
