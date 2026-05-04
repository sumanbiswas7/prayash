import { useState, useEffect, Fragment } from 'react';
import { PRAYASH_DATA, Icon } from '../data';
import type { Page } from '../types';
import './Home.scss';

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
    const t = setInterval(() => setH((x) => (x + 1) % heroes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const hero = heroes[h];

  return (
    <div>
      {/* HERO */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div>
            <div className="home-hero__kicker-row">
              <span className="hero-kicker">{hero.kicker}</span>
              <span className="home-hero__kicker-line" />
              <div className="home-hero__kicker-dots">
                {heroes.map((_, i) => (
                  <span key={i} className={`rotdot ${i === h ? 'active' : ''}`} />
                ))}
              </div>
            </div>
            <h1 className="display home-hero__title">
              {hero.enTitle[0]}
              <br />
              <span className="home-hero__title-accent" style={{ color: `var(--${hero.accent})` }}>
                {hero.enTitle[1]}
              </span>
            </h1>
            <div className="bn-display home-hero__bn">{hero.bnTitle}</div>
            <p className="home-hero__body">{hero.body}</p>
            <div className="home-hero__actions">
              <button className="btn btn-primary btn-lg" onClick={() => setPage(hero.cta.page)}>
                {hero.cta.label} <Icon.arrow />
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setPage('events')}>
                See this year's events
              </button>
            </div>
          </div>
          <HeroCollage accent={hero.accent} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee home-marquee">
        <div className="marquee-track">
          {Array(2)
            .fill(0)
            .map((_, rep) => (
              <Fragment key={rep}>
                {[
                  'Quiz · কুইজ',
                  'Abriti · আবৃত্তি',
                  'Drawing · অঙ্কন',
                  'Golpo Lekha · গল্প লেখা',
                  'Khobor Path · খবর পাঠ',
                  'Debate · বিতর্ক',
                ].map((t, i) => (
                  <span key={`${rep}-${i}`} className="home-marquee__item">
                    <span className="display home-marquee__item-text">{t}</span>
                    <span className="home-marquee__dot" />
                  </span>
                ))}
              </Fragment>
            ))}
        </div>
      </div>

      {/* STATS */}
      <section className="home-stats">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow home-stats__eyebrow">By the numbers</div>
              <h2 className="display">Rooted locally. Growing steadily.</h2>
            </div>
            <p>
              Prayash runs on volunteers, donated books, and a lot of local trust. Here's what we've built so far.
            </p>
          </div>
          <div className="home-stats__grid">
            {PRAYASH_DATA.stats.map((s, i) => (
              <div key={i} className="home-stats__item">
                <div className="display home-stats__number">{s.n}</div>
                <div className="home-stats__label">{s.l}</div>
                <div className="bn small muted">{s.bn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="home-events">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow home-events__eyebrow">Medha Pariksha 2026</div>
              <h2 className="display">Events for every kid.</h2>
            </div>
            <p>
              From quizzing to golpo lekha — there's a stage for every kind of student. Hosted by us, open to all.
            </p>
          </div>
          <div className="cols-3">
            {PRAYASH_DATA.events.slice(0, 6).map((e) => (
              <div
                key={e.id}
                className="card hover-lift home-events__card"
                onClick={() => setPage('events')}
              >
                <div className="home-events__card-header">
                  <div>
                    <div
                      className="bn-display home-events__card-bn"
                      style={{ color: `var(--${e.color})` }}
                    >
                      {e.bn}
                    </div>
                    <div className="display home-events__card-en">{e.en}</div>
                  </div>
                  <span
                    className="chip"
                    style={{ background: `var(--${e.color}-tint)`, color: `var(--${e.color})` }}
                  >
                    <span className="chip-dot" /> open
                  </span>
                </div>
                <div className="home-events__card-desc">{e.desc}</div>
                <div className="home-events__card-footer">
                  <span>{e.slots.length} age groups</span>
                  <span>·</span>
                  <span>{e.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="home-events__more">
            <button className="btn btn-outline" onClick={() => setPage('events')}>
              See all {PRAYASH_DATA.events.length} events <Icon.arrow />
            </button>
          </div>
        </div>
      </section>

      {/* MISSION SPLIT */}
      <section className="home-mission">
        <div className="container">
          <div className="home-mission__grid">
            <div className="home-mission__text">
              <div className="eyebrow home-mission__eyebrow">What we do</div>
              <h2 className="display home-mission__title">
                A library
                <br />
                <span className="home-mission__title-italic">without a building.</span>
              </h2>
              <div
                className="stack home-mission__stack"
                style={{ '--gap': '18px' } as React.CSSProperties}
              >
                <p>
                  Families donate the books their children have outgrown. We sort them by subject
                  and class, check condition, and carry them to 38 partner schools across Nadia.
                </p>
                <p>
                  Every October we host <em>Prayash Medha Pariksha</em> — a festival of ten
                  competitions where the prizes are, of course, more books.
                </p>
              </div>
              <div className="btn-row home-mission__actions">
                <button
                  className="btn home-mission__btn-donate"
                  onClick={() => setPage('contact')}
                >
                  Donate books <Icon.arrow />
                </button>
                <button
                  className="btn btn-ghost home-mission__btn-gallery"
                  onClick={() => setPage('gallery')}
                >
                  See our work
                </button>
              </div>
            </div>
            <div className="home-mission__photos">
              <div className="home-mission__photo-inner">
                <div className="ph ph-wide home-mission__ph-wide">
                  <span className="ph-label home-mission__ph-label">
                    PHOTO · Book sorting day, Tehatta
                  </span>
                </div>
                <div className="ph home-mission__ph">
                  <span className="ph-label home-mission__ph-label">PHOTO</span>
                </div>
                <div className="ph home-mission__ph">
                  <span className="ph-label home-mission__ph-label">PHOTO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-testimonials">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow home-testimonials__eyebrow">Voices</div>
              <h2 className="display">
                From the people
                <br />
                who love us.
              </h2>
            </div>
          </div>
          <div className="cols-3">
            {PRAYASH_DATA.testimonials.map((t, i) => (
              <div
                key={i}
                className="card"
                style={{
                  background: `var(--${t.tone}-tint)`,
                  borderColor: `var(--${t.tone})`,
                  borderWidth: 1,
                }}
              >
                <div
                  className="display home-testimonials__card-quote"
                  style={{ color: `var(--${t.tone})` }}
                >
                  "
                </div>
                <p className="home-testimonials__card-text">{t.q}</p>
                <hr
                  className="home-testimonials__card-hr"
                  style={{ borderTop: `1px dashed var(--${t.tone})` }}
                />
                <div className="home-testimonials__card-author">
                  <div
                    className="home-testimonials__avatar"
                    style={{ background: `var(--${t.tone})` }}
                  >
                    {t.who
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <div className="home-testimonials__author-name">{t.who}</div>
                    <div className="small muted">{t.where}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="home-cta">
        <div className="container">
          <div className="card home-cta__strip">
            <div>
              <div className="display home-cta__title">
                Medha Pariksha 2026 opens Soon!.
              </div>
              <div className="bn-display home-cta__subtitle">
                প্রয়াস মেধা পরীক্ষা — ২০২৬ · রেজিস্ট্রেশন শীঘ্রই শুরু হবে
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>
              Register now <Icon.arrow />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroCollage({ accent }: { accent: string }) {
  return (
    <div className="hero-collage">
      <div
        className="hero-collage__main"
        style={{
          background: `var(--${accent}-tint)`,
          border: `1px solid var(--${accent})`,
        }}
      >
        <img src="/assets/home-poster.jpg" alt="Student at last year's event" />
      </div>
      <div className="hero-collage__logo-circle">
        <img src="/assets/logo.png" alt="Prayash" />
      </div>
      <div className="hero-collage__float-card">
        <div className="eyebrow">Since 2019</div>
        <div className="display hero-collage__float-card-number">500+ books</div>
        <div className="small muted hero-collage__float-card-sub">moved from shelves to students</div>
      </div>
    </div>
  );
}
