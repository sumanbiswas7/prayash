import { useState } from 'react';
import { PROYASH_DATA, Icon } from '../data';
import type { Certificate, Achievement, Page } from '../types';
import './Dashboard.scss';

interface DashboardProps {
  setPage: (p: Page) => void;
}

export function Dashboard({ setPage }: DashboardProps) {
  const [tab, setTab] = useState('medals');
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <div>
      <section className="dash-hero">
        <div className="container dash-hero__grid">
          <div>
            <div className="eyebrow dash-hero__eyebrow">Student dashboard</div>
            <h1 className="display dash-hero__title">
              Welcome back,{' '}
              <span className="dash-hero__title-accent">Moynak.</span>
            </h1>
            <div className="bn-display dash-hero__bn">
              মৈনাক বিশ্বাস · Class X · Tehatta Sridham Chandra Balika Vidyalaya
            </div>
            <div className="dash-hero__chips">
              <span className="chip dash-hero__chip--green">
                <span className="chip-dot" /> 4 active registrations
              </span>
              <span className="chip dash-hero__chip--medal">
                🏅 2 gold · 1 silver · 1 bronze
              </span>
            </div>
          </div>
          <div className="dash-mini-stats">
            <MiniStat label="Events entered" n="7" sub="across 3 years" />
            <MiniStat label="Certificates" n="5" sub="all downloadable" />
            <MiniStat label="Books received" n="12" sub="from library" />
          </div>
        </div>
      </section>

      <section className="dash-body">
        <div className="container">
          <div className="dash-tabs__scroll">
            <div className="dash-tabs__bar">
              {[
                { id: 'medals', label: 'Medal case' },
                { id: 'certs', label: 'Certificates' },
                { id: 'regs', label: 'Registrations' },
                { id: 'profile', label: 'Profile' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`dash-tabs__tab ${tab === t.id ? 'dash-tabs__tab--active' : 'dash-tabs__tab--inactive'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {tab === 'medals' && <MedalCase />}
          {tab === 'certs' && <Certificates onOpen={setActiveCert} />}
          {tab === 'regs' && <Registrations setPage={setPage} />}
          {tab === 'profile' && <Profile />}
        </div>
      </section>

      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />}
    </div>
  );
}

function MiniStat({ label, n, sub }: { label: string; n: string; sub: string }) {
  return (
    <div className="card dash-mini-stat">
      <div className="eyebrow dash-mini-stat__eyebrow">{label}</div>
      <div className="display dash-mini-stat__n">{n}</div>
      <div className="small muted dash-mini-stat__sub">{sub}</div>
    </div>
  );
}

function MedalCase() {
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display medals-section__title">Your medal case.</h2>
          <p className="medals-section__desc">
            Every medal you've earned at Medha Pariksha, arranged by year.
          </p>
        </div>
      </div>
      {[2025, 2024].map((year) => {
        const items = PROYASH_DATA.achievements.filter((a) => a.year === year);
        if (items.length === 0) return null;
        return (
          <div key={year} className="medals-year">
            <div className="medals-year__header">
              <div className="display medals-year__title">{year}</div>
              <div className="medals-year__rule" />
              <div className="mono">
                {items.length} medal{items.length > 1 ? 's' : ''}
              </div>
            </div>
            <div className="medals-grid">
              {items.map((a) => (
                <MedalCard key={a.id} a={a} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MedalCard({ a }: { a: Achievement }) {
  const colorMap: Record<string, { bg: string; ribbon1: string; ribbon2: string }> = {
    Gold: {
      bg: 'linear-gradient(135deg, #F6C13E, #E38E1B)',
      ribbon1: 'var(--red)',
      ribbon2: 'var(--blue)',
    },
    Silver: {
      bg: 'linear-gradient(135deg, #D8D8D8, #A6A6A6)',
      ribbon1: 'var(--teal)',
      ribbon2: 'var(--purple)',
    },
    Bronze: {
      bg: 'linear-gradient(135deg, #D69062, #A05A2E)',
      ribbon1: 'var(--green)',
      ribbon2: 'var(--red)',
    },
  };
  const c = colorMap[a.medal];
  return (
    <div className="card hover-lift medal-card">
      <div className="medal-card__figure">
        <div
          className="medal-card__ribbon-l"
          style={{ background: c.ribbon1 }}
        />
        <div
          className="medal-card__ribbon-r"
          style={{ background: c.ribbon2 }}
        />
        <div
          className="medal-card__disc"
          style={{ background: c.bg }}
        >
          <div className="medal-card__disc-inner">
            <div className="display medal-card__rank">
              {a.rank === 1 ? '1st' : a.rank === 2 ? '2nd' : '3rd'}
            </div>
          </div>
        </div>
      </div>
      <div className="display medal-card__event">{a.event}</div>
      <div className="bn-display muted medal-card__bn">{a.bn}</div>
      <div className="small muted medal-card__meta">
        {a.klass} · {a.year}
      </div>
      <div className="chip medal-card__chip">{a.medal} medal</div>
    </div>
  );
}

function Certificates({ onOpen }: { onOpen: (c: Certificate) => void }) {
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display certs-section__title">Your certificates.</h2>
          <p className="certs-section__desc">
            Tap any certificate to preview and download a high-resolution PDF.
          </p>
        </div>
        <button className="btn btn-outline btn-sm">
          Download all <Icon.dl />
        </button>
      </div>
      <div className="cols-3 certs-section__grid">
        {PROYASH_DATA.certificates.map((c) => (
          <button
            key={c.id}
            onClick={() => onOpen(c)}
            className="card hover-lift cert-card"
          >
            <div className="cert-card__preview">
              <CertArt title={c.title} event={c.event} rank={c.rank} />
            </div>
            <div className="cert-card__info">
              <div className="bn small cert-card__bn">{c.bn}</div>
              <div className="cert-card__title">
                {c.event} · {c.rank}
              </div>
              <div className="cert-card__footer">
                <span className="mono">{c.date}</span>
                <span className="cert-card__pdf-link">
                  <Icon.dl /> PDF
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CertArt({ title, event, rank }: { title: string; event: string; rank: string }) {
  const isWinner = rank.includes('1st') || rank.includes('2nd') || rank.includes('3rd');
  const rankColor = rank.includes('1st')
    ? 'var(--yellow)'
    : rank.includes('2nd')
      ? 'var(--teal)'
      : rank.includes('3rd')
        ? 'var(--orange)'
        : 'var(--blue)';
  return (
    <div className="cert-art">
      <div className="cert-art__top">
        <img src="/assets/logo.png" className="cert-art__logo" alt="Proyash" />
        <div className="bn-display cert-art__org">প্রয়াস মেধা পরীক্ষা</div>
        <div className="mono cert-art__year">{title.match(/\d{4}/)?.[0]}</div>
      </div>
      <div className="cert-art__middle">
        <div className="display cert-art__name">Moynak Biswas</div>
        <div className="cert-art__event">
          {event} · {rank}
        </div>
      </div>
      {isWinner && (
        <div
          className="cert-art__badge"
          style={{ background: rankColor }}
        >
          {rank.charAt(0)}
        </div>
      )}
      <div className="mono cert-art__footer-mono">— Proyash —</div>
    </div>
  );
}

function CertModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <div className="cert-modal__overlay" onClick={onClose}>
      <div className="cert-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal__header">
          <div>
            <div className="eyebrow">
              {cert.event} · {cert.rank}
            </div>
            <div className="bn cert-modal__bn">{cert.bn}</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <Icon.close />
          </button>
        </div>
        <div className="cert-modal__preview">
          <div className="cert-modal__cert">
            <div className="cert-modal__cert-top">
              <img src="/assets/logo.png" className="cert-modal__cert-logo" alt="Proyash" />
              <div className="bn-display cert-modal__cert-org">
                প্রয়াস মেধা পরীক্ষা — ২০২৫
              </div>
              <div className="mono">Certificate of Merit</div>
            </div>
            <div className="cert-modal__cert-middle">
              <div className="small muted">This is to certify that</div>
              <div className="display cert-modal__cert-name">Moynak Biswas</div>
              <div className="small">of Class X · Tehatta Sridham Chandra Balika Vidyalaya</div>
              <div className="cert-modal__cert-secured">
                secured <strong>{cert.rank}</strong> in
              </div>
              <div className="display cert-modal__cert-event">{cert.event}</div>
            </div>
            <div className="cert-modal__cert-footer">
              <div className="cert-modal__cert-sig">
                <div className="cert-modal__cert-sig-line">Secretary</div>
              </div>
              <div className="mono">{cert.date}</div>
              <div className="cert-modal__cert-sig">
                <div className="cert-modal__cert-sig-line">President</div>
              </div>
            </div>
          </div>
        </div>
        <div className="cert-modal__footer">
          <div className="small muted">Verify at proyash.org.in/verify/{cert.id.toUpperCase()}</div>
          <div className="cert-modal__footer-actions">
            <button className="btn btn-outline btn-sm">Share</button>
            <button className="btn btn-primary btn-sm">
              <Icon.dl /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Registrations({ setPage }: { setPage: (p: Page) => void }) {
  const regs = [
    {
      id: 'PRY-2026-4812',
      year: 2026,
      events: ['Quiz', 'Abriti', 'Essay'],
      status: 'Confirmed',
      color: 'green',
    },
    {
      id: 'PRY-2025-2198',
      year: 2025,
      events: ['Quiz', 'Abriti', 'Drawing'],
      status: 'Completed',
      color: 'blue',
    },
    {
      id: 'PRY-2024-1067',
      year: 2024,
      events: ['Essay', 'Drawing'],
      status: 'Completed',
      color: 'blue',
    },
    {
      id: 'PRY-2023-0214',
      year: 2023,
      events: ['Handwriting'],
      status: 'Completed',
      color: 'blue',
    },
  ];
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display regs-section__title">Your registrations.</h2>
          <p className="regs-section__desc">Current and past festivals.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage('register')}>
          New registration <Icon.plus />
        </button>
      </div>
      <div className="card regs-table">
        {regs.map((r, i, a) => (
          <div
            key={r.id}
            className="reg-row"
            style={{
              borderBottom: i < a.length - 1 ? '1px solid var(--rule)' : 'none',
            }}
          >
            <div className="display reg-row__year">{r.year}</div>
            <div className="mono">{r.id}</div>
            <div className="reg-row__events">
              {r.events.map((e) => (
                <span key={e} className="chip">
                  {e}
                </span>
              ))}
            </div>
            <span
              className="chip"
              style={{ background: `var(--${r.color}-tint)`, color: `var(--${r.color})` }}
            >
              <span className="chip-dot" /> {r.status}
            </span>
            <button className="btn btn-ghost btn-sm">View →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display profile-section__title">Profile.</h2>
          <p className="profile-section__desc">
            Keep your details current so certificates print correctly.
          </p>
        </div>
      </div>
      <div className="profile-grid">
        <div className="card">
          <div className="eyebrow profile-card__eyebrow">Student</div>
          <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
            <ProfileRow k="Full name" v="Moynak Biswas" />
            <ProfileRow k="Bengali name" v="মৈনাক বিশ্বাস" />
            <ProfileRow k="Date of birth" v="14 March 2011" />
            <ProfileRow k="Class" v="Class X" />
            <ProfileRow k="School" v="Tehatta Sridham Chandra Balika Vidyalaya" />
          </div>
        </div>
        <div className="card">
          <div className="eyebrow profile-card__eyebrow">Contact</div>
          <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
            <ProfileRow k="Guardian" v="Subhra Biswas" />
            <ProfileRow k="Phone" v="+91 98xxx xxxxx" />
            <ProfileRow k="Email" v="moynak@example.com" />
            <ProfileRow k="Address" v="Village Raghunathpur, Tehatta, Nadia 741160" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="profile-kv">
      <div className="mono">{k}</div>
      <div className="profile-kv__value">{v}</div>
    </div>
  );
}
