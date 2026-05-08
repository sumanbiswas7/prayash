import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PROYASH_DATA, Icon } from '../data';
import { DobPicker } from '../components/DobPicker';
import type { Certificate, Achievement, Student, EventRegistration } from '../types';
import './Dashboard.scss';

interface DashboardProps {
  user: Student | null;
  onUpdate: (s: Student) => void;
}

export function Dashboard({ user, onUpdate }: DashboardProps) {
  const [tab, setTab] = useState('profile');
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const firstName = user?.studentName?.split(' ')[0] ?? 'there';

  const age = user?.dob
    ? Math.floor((Date.now() - new Date(user.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <div>
      <section className="dash-hero">
        <div className="container dash-hero__grid">
          <div>
            <div className="eyebrow dash-hero__eyebrow">Student dashboard</div>
            <h1 className="display dash-hero__title">
              Welcome back, <span className="dash-hero__title-accent">{firstName}.</span>
            </h1>
            {user && (
              <div className="bn-display dash-hero__bn">
                {[user.studentNameBn || user.studentName, user.klass, user.school]
                  .filter(Boolean)
                  .join(' · ')}
              </div>
            )}
            <div className="dash-hero__chips">
              {user?.registrationId && (
                <span className="chip dash-hero__chip--green">
                  <span className="chip-dot" /> {user.registrationId}
                </span>
              )}
            </div>
          </div>
          <div className="dash-mini-stats">
            <MiniStat label="Age" n={age !== null ? String(age) : '—'} sub="years old" />
            <MiniStat
              label="Class"
              n={user?.klass?.replace('Class ', '') ?? '—'}
              sub="current standard"
            />
            {/* <MiniStat label="Member since" n={memberSince ?? '—'} sub="registration date" /> */}
          </div>
        </div>
      </section>

      <section className="dash-body">
        <div className="container">
          <div className="dash-tabs__scroll">
            <div className="dash-tabs__bar">
              {[
                { id: 'profile', label: 'Profile' },
                { id: 'regs', label: 'Registrations' },
                // { id: 'medals', label: 'Medal case' },
                // { id: 'certs', label: 'Certificates' },
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
          {tab === 'regs' && <Registrations user={user} />}
          {tab === 'profile' && <Profile user={user} onUpdate={onUpdate} />}
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
        <div className="medal-card__ribbon-l" style={{ background: c.ribbon1 }} />
        <div className="medal-card__ribbon-r" style={{ background: c.ribbon2 }} />
        <div className="medal-card__disc" style={{ background: c.bg }}>
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
          <button key={c.id} onClick={() => onOpen(c)} className="card hover-lift cert-card">
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
        <div className="display cert-art__name">—</div>
        <div className="cert-art__event">
          {event} · {rank}
        </div>
      </div>
      {isWinner && (
        <div className="cert-art__badge" style={{ background: rankColor }}>
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
              <div className="bn-display cert-modal__cert-org">প্রয়াস মেধা পরীক্ষা — ২০২৫</div>
              <div className="mono">Certificate of Merit</div>
            </div>
            <div className="cert-modal__cert-middle">
              <div className="small muted">This is to certify that</div>
              <div className="display cert-modal__cert-name">—</div>
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

function Registrations({ user }: { user: Student | null }) {
  const [regs, setRegs] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewReg, setViewReg] = useState<EventRegistration | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(import.meta.env.VITE_LAMBDA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'get-my-registrations', studentRegistrationId: user.registrationId }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.ok) setRegs(json.registrations);
        else setError(json.error || 'Failed to load');
      })
      .catch(() => setError('Failed to load registrations'))
      .finally(() => setLoading(false));
  }, [user?.registrationId]);

  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display regs-section__title">Your competitions.</h2>
          <p className="regs-section__desc">
            All the competitions you've participated in across every year.
          </p>
        </div>
      </div>

      {loading && (
        <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <p className="muted">Loading…</p>
        </div>
      )}

      {!loading && error && (
        <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--red)', margin: 0 }}>{error}</p>
        </div>
      )}

      {!loading && !error && regs.length === 0 && (
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: '8px' }}>No registrations yet</div>
          <div className="display" style={{ fontSize: '26px' }}>Nothing here yet.</div>
          <p className="muted" style={{ margin: '10px 0 0' }}>
            Head to the Events page to register for a competition.
          </p>
        </div>
      )}

      {viewReg && <RegDetailModal reg={viewReg} user={user} onClose={() => setViewReg(null)} />}

      {!loading && !error && regs.length > 0 && (
        <div className="card regs-table">
          {[...regs]
            .sort((a, b) => Number(b.year) - Number(a.year))
            .map((reg, i) => {
              const confirmed = Number(reg.year) >= new Date().getFullYear();
              const registeredOn = reg.createdAt
                ? new Date(reg.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : null;
              return (
                <div
                  key={reg.id}
                  className="reg-row"
                  style={{ borderTop: i > 0 ? '1px solid var(--rule)' : 'none' }}
                >
                  <div className="display reg-row__year">{reg.year}</div>

                  <div className="reg-row__chips">
                    <span className="chip reg-event-chip">{reg.eventName}</span>
                    <span className="chip reg-group-chip bn">{reg.group}</span>
                    {reg.partnerName && (
                      <span className="chip reg-group-chip">Partner: {reg.partnerName}</span>
                    )}
                  </div>

                  <div className="reg-row__actions">
                    <span
                      className="chip"
                      style={
                        confirmed
                          ? { background: 'var(--green-tint)', color: 'var(--green)' }
                          : { background: 'var(--blue-tint)', color: 'var(--blue)' }
                      }
                    >
                      <span className="chip-dot" />
                      {confirmed ? 'Confirmed' : 'Completed'}
                    </span>
                    {!reg.applicationFee && (
                      <span className="chip reg-row__fee-chip">
                        <span className="chip-dot" /> Pay at venue
                      </span>
                    )}
                    {registeredOn && (
                      <span className="reg-row__date tiny muted">{registeredOn}</span>
                    )}
                    <button className="btn btn-ghost btn-sm reg-row__view" onClick={() => setViewReg(reg)}>
                      View <Icon.arrow />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

function RegDetailModal({
  reg,
  user,
  onClose,
}: {
  reg: EventRegistration;
  user: Student | null;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ev = PROYASH_DATA.events.find((e) => e.id === reg.eventId);
  const colorVar = `var(--${ev?.color ?? 'blue'})`;
  const tintVar = `var(--${ev?.color ?? 'blue'}-tint)`;
  const registeredOn = reg.createdAt
    ? new Date(reg.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      style: { borderRadius: '0' },
    });
    const a = document.createElement('a');
    a.download = `${reg.id}-${reg.eventId}.png`;
    a.href = dataUrl;
    a.click();
  };

  return (
    <div className="reg-detail__overlay" onClick={onClose}>
      <div className="reg-detail__panel" onClick={(e) => e.stopPropagation()}>
        <div className="reg-detail__card" ref={cardRef}>
          <div
            className="reg-detail__header"
            style={{ background: tintVar, borderBottom: `1px solid ${colorVar}` }}
          >
            <div>
              <div className="bn-display reg-detail__event-bn" style={{ color: colorVar }}>
                {ev?.bn ?? reg.eventName}
              </div>
              <div className="display reg-detail__event-en">{ev?.en ?? reg.eventId}</div>
            </div>
            <div className="reg-detail__qr">
              <QRCodeSVG value={reg.id} size={72} />
            </div>
          </div>
          <div className="reg-detail__body">
            <div className="reg-detail__id-box" style={{ borderColor: colorVar }}>
              <div className="mono reg-detail__id-label">Registration ID</div>
              <div className="display reg-detail__id">{reg.id}</div>
            </div>
            <div className="reg-detail__rows">
              <RegDetailRow label="Participant" value={user?.studentName ?? reg.studentName} />
              {user?.klass && <RegDetailRow label="Class" value={user.klass} />}
              {user?.school && <RegDetailRow label="School" value={user.school} />}
              <RegDetailRow label="Group" value={reg.group} isBn />
              {reg.partnerName && <RegDetailRow label="Partner" value={reg.partnerName} />}
              <RegDetailRow label="Year" value={reg.year} />
              <RegDetailRow
                label="Application fee"
                value={reg.applicationFee ? 'Paid' : 'Pay at venue'}
                accent={reg.applicationFee ? 'var(--green)' : 'var(--orange)'}
              />
              {registeredOn && <RegDetailRow label="Registered on" value={registeredOn} />}
            </div>
          </div>
        </div>
        <div className="reg-detail__actions no-print">
          <button className="btn btn-primary btn-sm" onClick={handleDownloadImage}>
            <Icon.dl /> Download image
          </button>
        </div>
      </div>
    </div>
  );
}

function RegDetailRow({
  label,
  value,
  isBn,
  accent,
}: {
  label: string;
  value: string;
  isBn?: boolean;
  accent?: string;
}) {
  return (
    <div className="reg-detail__row">
      <div className="mono reg-detail__row-label">{label}</div>
      <div
        className={`reg-detail__row-value${isBn ? ' bn' : ''}`}
        style={accent ? { color: accent, fontWeight: 600 } : undefined}
      >
        {value}
      </div>
    </div>
  );
}

function Profile({ user, onUpdate }: { user: Student | null; onUpdate: (s: Student) => void }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    studentName: '',
    studentNameBn: '',
    klass: '',
    school: '',
    dob: '',
    address: '',
    guardianName: '',
  });

  const startEdit = () => {
    setForm({
      studentName: user?.studentName ?? '',
      studentNameBn: user?.studentNameBn ?? '',
      klass: user?.klass ?? '',
      school: user?.school ?? '',
      dob: user?.dob ?? '',
      address: user?.address ?? '',
      guardianName: user?.guardianName ?? '',
    });
    setError('');
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'update-profile',
          registrationId: user?.registrationId,
          ...form,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Update failed');
      onUpdate({ ...user!, ...json.student });
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="display profile-section__title">Profile.</h2>
          <p className="profile-section__desc">
            Keep your details current so certificates print correctly.
          </p>
        </div>
        {!editing && (
          <button className="btn btn-outline btn-sm" onClick={startEdit}>
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div>
          <div className="profile-grid">
            <div className="card">
              <div className="eyebrow profile-card__eyebrow">Student</div>
              <div className="stack" style={{ '--gap': '14px' } as React.CSSProperties}>
                <ProfileField label="Full name">
                  <input
                    className="profile-input"
                    value={form.studentName}
                    onChange={(e) => set('studentName', e.target.value)}
                  />
                </ProfileField>
                <ProfileField label="Bengali name">
                  <input
                    className="profile-input bn"
                    value={form.studentNameBn}
                    onChange={(e) => set('studentNameBn', e.target.value)}
                  />
                </ProfileField>
                <ProfileField label="Date of birth">
                  <DobPicker value={form.dob} onChange={(v) => set('dob', v)} />
                </ProfileField>
                <ProfileField label="Class">
                  <div className="profile-class-picker">
                    {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'].map(
                      (c) => (
                        <button
                          key={c}
                          type="button"
                          className={`class-pill${form.klass === `Class ${c}` ? ' class-pill--active' : ''}`}
                          onClick={() => set('klass', `Class ${c}`)}
                        >
                          {c}
                        </button>
                      )
                    )}
                  </div>
                </ProfileField>
                <ProfileField label="School">
                  <input
                    className="profile-input"
                    value={form.school}
                    onChange={(e) => set('school', e.target.value)}
                  />
                </ProfileField>
              </div>
            </div>
            <div className="card">
              <div className="eyebrow profile-card__eyebrow">Contact</div>
              <div className="stack" style={{ '--gap': '14px' } as React.CSSProperties}>
                <ProfileField label="Guardian">
                  <input
                    className="profile-input"
                    value={form.guardianName}
                    onChange={(e) => set('guardianName', e.target.value)}
                  />
                </ProfileField>
                <ProfileField label="Phone">
                  <input
                    className="profile-input"
                    value={user?.phone ? `+91 ${user.phone}` : '—'}
                    disabled
                  />
                </ProfileField>
                <ProfileField label="Email">
                  <input className="profile-input" value={user?.email ?? '—'} disabled />
                </ProfileField>
                <ProfileField label="Address">
                  <input
                    className="profile-input"
                    value={form.address}
                    onChange={(e) => set('address', e.target.value)}
                  />
                </ProfileField>
              </div>
            </div>
          </div>
          {error && <p className="profile-error">{error}</p>}
          <div className="profile-edit-actions">
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button className="btn btn-ghost" onClick={() => setEditing(false)} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-grid">
          <div className="card">
            <div className="eyebrow profile-card__eyebrow">Student</div>
            <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
              <ProfileRow k="Full name" v={user?.studentName ?? '—'} />
              <ProfileRow k="Bengali name" v={user?.studentNameBn || '—'} />
              <ProfileRow k="Date of birth" v={user?.dob || '—'} />
              <ProfileRow k="Class" v={user?.klass ?? '—'} />
              <ProfileRow k="School" v={user?.school ?? '—'} />
            </div>
          </div>
          <div className="card">
            <div className="eyebrow profile-card__eyebrow">Contact</div>
            <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
              <ProfileRow k="Guardian" v={user?.guardianName || '—'} />
              <ProfileRow k="Phone" v={user?.phone ? `+91 ${user.phone}` : '—'} />
              <ProfileRow k="Email" v={user?.email ?? '—'} />
              <ProfileRow k="Address" v={user?.address || '—'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono profile-field__label">{label}</div>
      {children}
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
