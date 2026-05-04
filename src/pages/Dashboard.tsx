import { useState } from 'react';
import { PRAYASH_DATA, Icon } from '../data';
import type { Certificate, Achievement, Page } from '../types';

interface DashboardProps {
  setPage: (p: Page) => void;
}

export function Dashboard({ setPage }: DashboardProps) {
  const [tab, setTab] = useState('medals');
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <div>
      <section
        style={{
          padding: '56px 0 36px',
          borderBottom: '1px solid var(--rule)',
          background: 'var(--cream-2)',
        }}
      >
        <div className="container dash-header-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Student dashboard
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: 0 }}>
              Welcome back,{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--red)', fontWeight: 400 }}>
                Moynak.
              </span>
            </h1>
            <div
              className="bn-display"
              style={{ fontSize: 20, marginTop: 10, color: 'var(--ink-2)' }}
            >
              মৈনাক বিশ্বাস · Class X · Tehatta Sridham Chandra Balika Vidyalaya
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <span
                className="chip"
                style={{ background: 'var(--green-tint)', color: 'var(--green)' }}
              >
                <span className="chip-dot" /> 4 active registrations
              </span>
              <span
                className="chip"
                style={{ background: 'var(--yellow-tint)', color: 'var(--orange)' }}
              >
                🏅 2 gold · 1 silver · 1 bronze
              </span>
            </div>
          </div>
          <div className="mini-stats-grid">
            <MiniStat label="Events entered" n="7" sub="across 3 years" />
            <MiniStat label="Certificates" n="5" sub="all downloadable" />
            <MiniStat label="Books received" n="12" sub="from library" />
          </div>
        </div>
      </section>

      <section style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <div style={{ overflowX: 'auto', marginBottom: 28, paddingBottom: 2 }}>
          <div
            style={{
              display: 'flex',
              gap: 4,
              padding: 4,
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
              borderRadius: 999,
              width: 'fit-content',
            }}
          >
            {[
              { id: 'medals', label: 'Medal case' },
              { id: 'certs', label: 'Certificates' },
              { id: 'regs', label: 'Registrations' },
              { id: 'profile', label: 'Profile' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="nav-link"
                style={{
                  background: tab === t.id ? 'var(--ink)' : 'transparent',
                  color: tab === t.id ? 'var(--cream-2)' : 'var(--ink)',
                }}
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
    <div className="card" style={{ padding: '16px 18px' }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>
        {label}
      </div>
      <div className="display" style={{ fontSize: 36, lineHeight: 1 }}>
        {n}
      </div>
      <div className="small muted" style={{ marginTop: 4 }}>
        {sub}
      </div>
    </div>
  );
}

function MedalCase() {
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display" style={{ fontSize: 40 }}>
            Your medal case.
          </h2>
          <p style={{ color: 'var(--ink-3)', margin: '6px 0 0' }}>
            Every medal you've earned at Medha Pariksha, arranged by year.
          </p>
        </div>
      </div>
      {[2025, 2024].map((year) => {
        const items = PRAYASH_DATA.achievements.filter((a) => a.year === year);
        if (items.length === 0) return null;
        return (
          <div key={year} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18 }}>
              <div className="display" style={{ fontSize: 28 }}>
                {year}
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
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
    <div
      className="card hover-lift"
      style={{ padding: '28px 20px 22px', textAlign: 'center', position: 'relative' }}
    >
      <div style={{ position: 'relative', width: 120, height: 140, margin: '0 auto 18px' }}>
        <div
          style={{
            position: 'absolute',
            top: -6,
            left: 28,
            width: 22,
            height: 56,
            background: c.ribbon1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
            transform: 'rotate(-10deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -6,
            right: 28,
            width: 22,
            height: 56,
            background: c.ribbon2,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
            transform: 'rotate(10deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 104,
            height: 104,
            borderRadius: '50%',
            background: c.bg,
            display: 'grid',
            placeItems: 'center',
            boxShadow:
              'inset 0 -8px 0 rgba(0,0,0,0.18), inset 0 8px 0 rgba(255,255,255,0.25), 0 6px 14px rgba(31,27,22,0.2)',
          }}
        >
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: '50%',
              border: '2px dashed rgba(255,255,255,0.5)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              className="display"
              style={{ fontSize: 22, color: 'white', textShadow: '0 2px 0 rgba(0,0,0,0.2)' }}
            >
              {a.rank === 1 ? '1st' : a.rank === 2 ? '2nd' : '3rd'}
            </div>
          </div>
        </div>
      </div>
      <div className="display" style={{ fontSize: 22 }}>
        {a.event}
      </div>
      <div className="bn-display muted" style={{ fontSize: 14, marginTop: 2 }}>
        {a.bn}
      </div>
      <div className="small muted" style={{ marginTop: 8 }}>
        {a.klass} · {a.year}
      </div>
      <div
        className="chip"
        style={{ marginTop: 14, background: 'var(--cream-3)', color: 'var(--ink-2)' }}
      >
        {a.medal} medal
      </div>
    </div>
  );
}

function Certificates({ onOpen }: { onOpen: (c: Certificate) => void }) {
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display" style={{ fontSize: 40 }}>
            Your certificates.
          </h2>
          <p style={{ color: 'var(--ink-3)', margin: '6px 0 0' }}>
            Tap any certificate to preview and download a high-resolution PDF.
          </p>
        </div>
        <button className="btn btn-outline btn-sm">
          Download all <Icon.dl />
        </button>
      </div>
      <div className="cols-3" style={{ gap: 20 }}>
        {PRAYASH_DATA.certificates.map((c) => (
          <button
            key={c.id}
            onClick={() => onOpen(c)}
            className="card hover-lift"
            style={{
              padding: 0,
              overflow: 'hidden',
              textAlign: 'left',
              cursor: 'pointer',
              border: '1px solid var(--rule)',
            }}
          >
            <div
              style={{
                aspectRatio: '3/4',
                background: 'var(--cream-2)',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid var(--rule)',
              }}
            >
              <CertArt title={c.title} event={c.event} rank={c.rank} />
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div className="bn small" style={{ color: 'var(--ink-3)' }}>
                {c.bn}
              </div>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {c.event} · {c.rank}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 12,
                }}
              >
                <span className="mono">{c.date}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    gap: 6,
                    alignItems: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
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
    <div
      style={{
        position: 'absolute',
        inset: 12,
        border: '2px solid var(--rule-2)',
        borderRadius: 10,
        padding: 16,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src="/assets/logo.png"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: '1px solid var(--ink)',
            marginBottom: 8,
          }}
        />
        <div className="bn-display" style={{ fontSize: 10, color: 'var(--red)' }}>
          প্রয়াস মেধা পরীক্ষা
        </div>
        <div className="mono" style={{ fontSize: 9, marginTop: 2 }}>
          {title.match(/\d{4}/)?.[0]}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div className="display" style={{ fontSize: 14, lineHeight: 1.1 }}>
          Moynak Biswas
        </div>
        <div style={{ fontSize: 9, color: 'var(--ink-3)', marginTop: 3 }}>
          {event} · {rank}
        </div>
      </div>
      {isWinner && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: rankColor,
            color: 'white',
            display: 'grid',
            placeItems: 'center',
            fontSize: 10,
            fontWeight: 700,
            boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15)',
          }}
        >
          {rank.charAt(0)}
        </div>
      )}
      <div className="mono" style={{ fontSize: 8, color: 'var(--ink-4)' }}>
        — Prayash —
      </div>
    </div>
  );
}

function CertModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(31,27,22,0.72)',
        zIndex: 100,
        display: 'grid',
        placeItems: 'center',
        padding: 40,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: 720,
          width: '100%',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="eyebrow">
              {cert.event} · {cert.rank}
            </div>
            <div className="bn" style={{ color: 'var(--ink-3)', fontSize: 13, marginTop: 2 }}>
              {cert.bn}
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <Icon.close />
          </button>
        </div>
        <div
          style={{
            padding: 36,
            background: 'var(--cream-2)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            style={{
              aspectRatio: '3/4',
              width: 360,
              background: 'white',
              border: '3px double var(--rule-2)',
              position: 'relative',
              padding: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src="/assets/logo.png"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1.5px solid var(--ink)',
                  marginBottom: 12,
                }}
              />
              <div className="bn-display" style={{ fontSize: 16, color: 'var(--red)' }}>
                প্রয়াস মেধা পরীক্ষা — ২০২৫
              </div>
              <div className="mono">Certificate of Merit</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="small muted">This is to certify that</div>
              <div
                className="display"
                style={{ fontSize: 32, margin: '8px 0', color: 'var(--red)' }}
              >
                Moynak Biswas
              </div>
              <div className="small">of Class X · Tehatta Sridham Chandra Balika Vidyalaya</div>
              <div style={{ marginTop: 14 }}>
                secured <strong>{cert.rank}</strong> in
              </div>
              <div className="display" style={{ fontSize: 22, marginTop: 2 }}>
                {cert.event}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'flex-end',
              }}
            >
              <div style={{ textAlign: 'center', fontSize: 10 }}>
                <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 4, width: 100 }}>
                  Secretary
                </div>
              </div>
              <div className="mono">{cert.date}</div>
              <div style={{ textAlign: 'center', fontSize: 10 }}>
                <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 4, width: 100 }}>
                  President
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '16px 24px',
            background: 'var(--paper)',
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className="small muted">Verify at prayash.org.in/verify/{cert.id.toUpperCase()}</div>
          <div style={{ display: 'flex', gap: 8 }}>
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
          <h2 className="display" style={{ fontSize: 40 }}>
            Your registrations.
          </h2>
          <p style={{ color: 'var(--ink-3)', margin: '6px 0 0' }}>Current and past festivals.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage('register')}>
          New registration <Icon.plus />
        </button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {regs.map((r, i, a) => (
          <div
            key={r.id}
            className="reg-row"
            style={{
              borderBottom: i < a.length - 1 ? '1px solid var(--rule)' : 'none',
            }}
          >
            <div className="display" style={{ fontSize: 28 }}>
              {r.year}
            </div>
            <div className="mono">{r.id}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {r.events.map((e) => (
                <span
                  key={e}
                  className="chip"
                  style={{ background: 'var(--cream-3)', color: 'var(--ink-2)' }}
                >
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
          <h2 className="display" style={{ fontSize: 40 }}>
            Profile.
          </h2>
          <p style={{ color: 'var(--ink-3)', margin: '6px 0 0' }}>
            Keep your details current so certificates print correctly.
          </p>
        </div>
      </div>
      <div className="profile-grid">
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Student
          </div>
          <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
            <ProfileRow k="Full name" v="Moynak Biswas" />
            <ProfileRow k="Bengali name" v="মৈনাক বিশ্বাস" />
            <ProfileRow k="Date of birth" v="14 March 2011" />
            <ProfileRow k="Class" v="Class X" />
            <ProfileRow k="School" v="Tehatta Sridham Chandra Balika Vidyalaya" />
          </div>
        </div>
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Contact
          </div>
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
      <div style={{ fontWeight: 500 }}>{v}</div>
    </div>
  );
}
