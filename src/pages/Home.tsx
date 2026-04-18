import { useState, useEffect, Fragment } from 'react';
import { PRAYASH_DATA, Icon } from '../data';
import type { Page } from '../types';

interface HomeProps {
  setPage: (p: Page) => void;
}

const heroes = [
  {
    kicker: 'Our mission',
    enTitle: ['We keep books', 'moving.'],
    bnTitle: 'আমরা থাকবো আগামীর স্বপ্নে',
    body: 'Prayash collects books from families who no longer need them and places them — carefully, by hand — into the hands of students who do.',
    cta: { label: 'How it works', page: 'events' as Page },
    accent: 'red',
  },
  {
    kicker: 'Medha Pariksha 2026',
    enTitle: ['Our annual festival', 'of merit.'],
    bnTitle: 'প্রয়াস মেধা পরীক্ষা — ২০২৬',
    body: 'Ten competitions. One weekend. Every child who walks in walks out with a certificate — and a reason to come back next year.',
    cta: { label: 'Register a student', page: 'register' as Page },
    accent: 'blue',
  },
  {
    kicker: 'Donate a book',
    enTitle: ['One book. A whole', 'school year.'],
    bnTitle: 'একটি বই · একটি বছর',
    body: 'A textbook sitting on your shelf is a term of school for someone else. We collect, sort, and redistribute — no middlemen.',
    cta: { label: 'Contact us', page: 'contact' as Page },
    accent: 'teal',
  },
];

export function Home({ setPage }: HomeProps) {
  const [h, setH] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setH(x => (x + 1) % heroes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const hero = heroes[h];

  return (
    <div>
      {/* HERO */}
      <section style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span className="hero-kicker">{hero.kicker}</span>
              <span style={{ flex: 1, height: 1, background: 'var(--rule-2)', maxWidth: 120 }} />
              <div style={{ display: 'flex', gap: 6 }}>
                {heroes.map((_, i) => <span key={i} className={`rotdot ${i === h ? 'active' : ''}`} />)}
              </div>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(48px, 6.5vw, 92px)', margin: 0 }}>
              {hero.enTitle[0]}<br />
              <span style={{ color: `var(--${hero.accent})`, fontStyle: 'italic', fontWeight: 400 }}>{hero.enTitle[1]}</span>
            </h1>
            <div className="bn-display" style={{ fontSize: 22, marginTop: 18, color: 'var(--ink-2)' }}>{hero.bnTitle}</div>
            <p style={{ maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24 }}>{hero.body}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center' }}>
              <button className="btn btn-primary btn-lg" onClick={() => setPage(hero.cta.page)}>
                {hero.cta.label} <Icon.arrow />
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setPage('events')}>See this year's events</button>
            </div>
          </div>
          <HeroCollage accent={hero.accent} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--cream-2)', padding: '18px 0' }}>
        <div className="marquee-track">
          {Array(2).fill(0).map((_, rep) => (
            <Fragment key={rep}>
              {['Quiz · কুইজ', 'Abriti · আবৃত্তি', 'Drawing · অঙ্কন', 'Essay · প্রবন্ধ', 'Singing · সঙ্গীত', 'Debate · বিতর্ক', 'Spelling Bee', 'Mental Math · মানসিক অঙ্ক', 'Handwriting · হস্তাক্ষর', 'Craft · হস্তশিল্প'].map((t, i) => (
                <span key={`${rep}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 24 }}>
                  <span className="display" style={{ fontSize: 22 }}>{t}</span>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--ink-4)' }} />
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>By the numbers</div>
              <h2 className="display">Small org. Steady work.</h2>
            </div>
            <p>Prayash runs on volunteers, donated books, and a lot of local trust. Here's what the last seven years look like.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid var(--rule)', borderRadius: 'var(--radius-lg)', background: 'var(--paper)', overflow: 'hidden' }}>
            {PRAYASH_DATA.stats.map((s, i) => (
              <div key={i} style={{ padding: '36px 28px', borderRight: i < 3 ? '1px solid var(--rule)' : 'none' }}>
                <div className="display" style={{ fontSize: 56, lineHeight: 1 }}>{s.n}</div>
                <div style={{ marginTop: 14, fontWeight: 600 }}>{s.l}</div>
                <div className="bn small muted">{s.bn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Medha Pariksha 2026</div>
              <h2 className="display">Ten events. Every kid welcome.</h2>
            </div>
            <p>From quizzing to handwriting to singing — there's a stage for every kind of student. Registration is free for students from our partner schools.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {PRAYASH_DATA.events.slice(0, 6).map((e) => (
              <div key={e.id} className="card hover-lift" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setPage('events')}>
                <div style={{ padding: '22px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="bn-display" style={{ fontSize: 20, color: `var(--${e.color})` }}>{e.bn}</div>
                    <div className="display" style={{ fontSize: 28, marginTop: 2 }}>{e.en}</div>
                  </div>
                  <span className="chip" style={{ background: `var(--${e.color}-tint)`, color: `var(--${e.color})` }}>
                    <span className="chip-dot" /> open
                  </span>
                </div>
                <div style={{ padding: '0 22px 20px', color: 'var(--ink-2)', fontSize: 14, minHeight: 52 }}>{e.desc}</div>
                <div style={{ padding: '14px 22px', borderTop: '1px solid var(--rule)', display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <span>{e.slots.length} age groups</span>
                  <span>·</span>
                  <span>{e.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn btn-outline" onClick={() => setPage('events')}>See all 10 events <Icon.arrow /></button>
          </div>
        </div>
      </section>

      {/* MISSION SPLIT */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--ink)', color: 'var(--cream-2)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '56px 48px' }}>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>What we do</div>
              <h2 className="display" style={{ fontSize: 48, marginTop: 16 }}>
                A library<br />
                <span style={{ color: 'var(--yellow)', fontStyle: 'italic', fontWeight: 400 }}>without a building.</span>
              </h2>
              <div className="stack" style={{ '--gap': '18px', marginTop: 32, maxWidth: 440, fontSize: 15, opacity: .82 } as React.CSSProperties}>
                <p style={{ margin: 0 }}>Families donate the books their children have outgrown. We sort them by subject and class, check condition, and carry them to 38 partner schools across Nadia.</p>
                <p style={{ margin: 0 }}>Every October we host <em>Prayash Medha Pariksha</em> — a festival of ten competitions where the prizes are, of course, more books.</p>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
                <button className="btn" style={{ background: 'var(--cream-2)', color: 'var(--ink)' }} onClick={() => setPage('contact')}>Donate books <Icon.arrow /></button>
                <button className="btn btn-ghost" style={{ color: 'var(--cream-2)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setPage('gallery')}>See our work</button>
              </div>
            </div>
            <div style={{ position: 'relative', background: 'var(--ink-2)' }}>
              <div style={{ position: 'absolute', inset: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10 }}>
                <div className="ph ph-wide" style={{ gridColumn: 'span 2', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <span className="ph-label" style={{ background: 'rgba(255,253,247,0.15)', color: 'var(--cream-2)', border: 'none' }}>PHOTO · Book sorting day, Tehatta</span>
                </div>
                <div className="ph" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <span className="ph-label" style={{ background: 'rgba(255,253,247,0.15)', color: 'var(--cream-2)', border: 'none' }}>PHOTO</span>
                </div>
                <div className="ph" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <span className="ph-label" style={{ background: 'rgba(255,253,247,0.15)', color: 'var(--cream-2)', border: 'none' }}>PHOTO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Voices</div>
              <h2 className="display">From the people<br />we work with.</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {PRAYASH_DATA.testimonials.map((t, i) => (
              <div key={i} className="card" style={{ background: `var(--${t.tone}-tint)`, borderColor: `var(--${t.tone})`, borderWidth: 1 }}>
                <div className="display" style={{ fontSize: 56, lineHeight: .5, color: `var(--${t.tone})`, marginBottom: 8 }}>"</div>
                <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0 }}>{t.q}</p>
                <hr style={{ border: 0, borderTop: `1px dashed var(--${t.tone})`, opacity: .5, margin: '24px 0 16px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="ph ph-sq" style={{ width: 44, height: 44, flexShrink: 0, borderRadius: '50%', padding: 0, background: `var(--${t.tone})`, color: 'white', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700, border: 'none' }}>
                    {t.who.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.who}</div>
                    <div className="small muted">{t.where}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: '40px 0 40px' }}>
        <div className="container">
          <div className="card" style={{ background: 'var(--yellow-tint)', border: '1px solid var(--yellow)', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24, padding: '32px 40px' }}>
            <div>
              <div className="display" style={{ fontSize: 34 }}>Medha Pariksha 2026 opens 20 September.</div>
              <div className="bn-display" style={{ fontSize: 18, marginTop: 6, color: 'var(--ink-2)' }}>প্রয়াস মেধা পরীক্ষা — ২০২৬ · রেজিস্ট্রেশন ২০শে সেপ্টেম্বর থেকে</div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Register now <Icon.arrow /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroCollage({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '4/5' }}>
      <div style={{ position: 'absolute', inset: '0 10% 15% 0', background: `var(--${accent}-tint)`, borderRadius: 'var(--radius-lg)', border: `1px solid var(--${accent})`, overflow: 'hidden' }}>
        <div className="ph ph-portrait" style={{ width: '100%', height: '100%', borderRadius: 0, border: 'none', background: 'none' }}>
          <span className="ph-label">PHOTO · Student at last year's event</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: -10, right: -10, width: 120, height: 120, background: 'white', borderRadius: '50%', padding: 10, border: '2px solid var(--ink)', boxShadow: 'var(--shadow-md)', display: 'grid', placeItems: 'center' }}>
        <img src="/assets/logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: -20, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: '14px 18px', boxShadow: 'var(--shadow-md)', minWidth: 200 }}>
        <div className="eyebrow">Since 2019</div>
        <div className="display" style={{ fontSize: 32, marginTop: 4 }}>1,240 books</div>
        <div className="small muted" style={{ marginTop: 2 }}>moved from shelves to students</div>
      </div>
      <div style={{ position: 'absolute', bottom: 60, right: 10, background: 'var(--ink)', color: 'var(--cream-2)', borderRadius: 999, padding: '10px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, boxShadow: 'var(--shadow-md)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--green)' }} />
        Registration open
      </div>
    </div>
  );
}
