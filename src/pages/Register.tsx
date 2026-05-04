import { useState } from 'react';
import { PRAYASH_DATA, Icon } from '../data';
import type { Page } from '../types';

interface RegisterProps {
  setPage: (p: Page) => void;
}

interface FormData {
  student: string;
  guardian: string;
  klass: string;
  school: string;
  phone: string;
  email: string;
  events: string[];
  address: string;
  notes: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--rule)',
  background: 'var(--paper)',
  fontSize: 15,
};

export function Register({ setPage }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    student: '',
    guardian: '',
    klass: '',
    school: '',
    phone: '',
    email: '',
    events: [],
    address: '',
    notes: '',
  });

  const update = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }));
  const toggleEvent = (id: string) =>
    setData((d) => ({
      ...d,
      events: d.events.includes(id) ? d.events.filter((e) => e !== id) : [...d.events, id],
    }));

  const canAdvance = {
    1: !!(data.student && data.klass && data.school && data.guardian && data.phone),
    2: data.events.length > 0,
    3: true,
  }[step as 1 | 2 | 3];

  return (
    <div style={{ padding: '56px 0 80px' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 32,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Medha Pariksha 2026 · Registration
            </div>
            <h1 className="display" style={{ fontSize: 56, margin: 0 }}>
              Let's get you
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--red)', fontWeight: 400 }}>
                on the stage.
              </span>
            </h1>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('home')}>
            ← Back home
          </button>
        </div>

        <div className="steps-grid">
          {(['Student', 'Events', 'Review', 'Done'] as const).map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div
                key={label}
                style={{
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: active ? 'var(--ink)' : done ? 'var(--green-tint)' : 'var(--paper)',
                  color: active ? 'var(--cream-2)' : done ? 'var(--green)' : 'var(--ink-3)',
                  border:
                    '1px solid ' + (active ? 'var(--ink)' : done ? 'var(--green)' : 'var(--rule)'),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    background: active
                      ? 'var(--cream-2)'
                      : done
                        ? 'var(--green)'
                        : 'var(--cream-3)',
                    color: active ? 'var(--ink)' : done ? 'white' : 'var(--ink-3)',
                  }}
                >
                  {done ? <Icon.check /> : n}
                </div>
                <div>
                  <div className="mono" style={{ color: 'inherit', opacity: 0.7 }}>
                    Step {n}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {step === 4 ? (
          <SuccessCard data={data} setPage={setPage} />
        ) : (
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '32px 36px' }}>
              {step === 1 && <Step1 data={data} update={update} />}
              {step === 2 && <Step2 data={data} toggleEvent={toggleEvent} />}
              {step === 3 && <Step3 data={data} update={update} />}
            </div>
            <div className="reg-footer-bar">
              <button
                className="btn btn-ghost"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                style={{ opacity: step === 1 ? 0.3 : 1 }}
              >
                ← Back
              </button>
              <div className="small muted">Step {step} of 3 · your progress is saved</div>
              <button
                className="btn btn-primary"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
                style={{ opacity: canAdvance ? 1 : 0.4 }}
              >
                {step === 3 ? 'Submit registration' : 'Continue'} <Icon.arrow />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  bn,
  children,
  hint,
  col = 1,
}: {
  label: string;
  bn?: string;
  children: React.ReactNode;
  hint?: string;
  col?: number;
}) {
  return (
    <div style={{ gridColumn: `span ${col}` }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
        {bn && (
          <span className="bn small muted" style={{ marginLeft: 8 }}>
            {bn}
          </span>
        )}
      </label>
      {children}
      {hint && (
        <div className="small muted" style={{ marginTop: 6 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function Step1({
  data,
  update,
}: {
  data: FormData;
  update: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div>
      <div className="display" style={{ fontSize: 28, marginBottom: 6 }}>
        Tell us about the student
      </div>
      <p className="muted" style={{ marginTop: 0, marginBottom: 28 }}>
        Basic details. Guardian contact so we can reach you with venue updates.
      </p>
      <div className="form-grid">
        <Field label="Student's full name" bn="ছাত্রের নাম" col={2}>
          <input
            style={inputStyle}
            value={data.student}
            onChange={(e) => update('student', e.target.value)}
            placeholder="e.g. Moynak Biswas"
          />
        </Field>
        <Field label="Class / Standard" bn="শ্রেণী">
          <select
            style={inputStyle}
            value={data.klass}
            onChange={(e) => update('klass', e.target.value)}
          >
            <option value="">Select class</option>
            {[
              'Class I',
              'Class II',
              'Class III',
              'Class IV',
              'Class V',
              'Class VI',
              'Class VII',
              'Class VIII',
              'Class IX',
              'Class X',
              'Class XI',
              'Class XII',
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="School" bn="বিদ্যালয়">
          <input
            style={inputStyle}
            value={data.school}
            onChange={(e) => update('school', e.target.value)}
            placeholder="Name of school"
          />
        </Field>
        <Field label="Guardian's name" bn="অভিভাবক">
          <input
            style={inputStyle}
            value={data.guardian}
            onChange={(e) => update('guardian', e.target.value)}
            placeholder="Parent or guardian"
          />
        </Field>
        <Field label="Phone (WhatsApp)" bn="মোবাইল" hint="We'll send venue details here.">
          <input
            style={inputStyle}
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+91 98xxx xxxxx"
          />
        </Field>
        <Field label="Email (optional)" bn="ইমেইল" col={2}>
          <input
            style={inputStyle}
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="for certificates download link"
          />
        </Field>
      </div>
    </div>
  );
}

function Step2({ data, toggleEvent }: { data: FormData; toggleEvent: (id: string) => void }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 28, marginBottom: 6 }}>
        Pick events
      </div>
      <p className="muted" style={{ marginTop: 0, marginBottom: 8 }}>
        A student can enter up to 4 events. Appropriate age group is selected automatically based on
        the class you chose.
      </p>
      <div className="mono" style={{ marginBottom: 24 }}>
        {data.events.length} of 4 selected
      </div>
      <div className="cols-2">
        {PRAYASH_DATA.events.map((e) => {
          const on = data.events.includes(e.id);
          const disabled = !on && data.events.length >= 4;
          return (
            <button
              key={e.id}
              disabled={disabled}
              onClick={() => toggleEvent(e.id)}
              style={{
                textAlign: 'left',
                padding: '18px 20px',
                borderRadius: 14,
                background: on ? `var(--${e.color}-tint)` : 'var(--paper)',
                border: `1.5px solid ${on ? `var(--${e.color})` : 'var(--rule)'}`,
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                opacity: disabled ? 0.4 : 1,
                transition: 'all .15s ease',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: `1.5px solid ${on ? `var(--${e.color})` : 'var(--rule-2)'}`,
                  background: on ? `var(--${e.color})` : 'transparent',
                  color: 'white',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {on && <Icon.check />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  {e.en}{' '}
                  <span
                    className="bn small"
                    style={{ color: `var(--${e.color})`, fontWeight: 500 }}
                  >
                    {e.bn}
                  </span>
                </div>
                <div className="small muted" style={{ marginTop: 2 }}>
                  {e.format} · {e.duration}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3({
  data,
  update,
}: {
  data: FormData;
  update: (k: keyof FormData, v: string) => void;
}) {
  const selectedEvents = PRAYASH_DATA.events.filter((e) => data.events.includes(e.id));
  return (
    <div>
      <div className="display" style={{ fontSize: 28, marginBottom: 6 }}>
        Review & submit
      </div>
      <p className="muted" style={{ marginTop: 0, marginBottom: 24 }}>
        Check everything below. You'll get a confirmation on WhatsApp within a day.
      </p>
      <div className="cols-2" style={{ marginBottom: 24 }}>
        <ReviewRow label="Student" value={`${data.student || '—'} · ${data.klass || ''}`} />
        <ReviewRow label="School" value={data.school || '—'} />
        <ReviewRow label="Guardian" value={data.guardian || '—'} />
        <ReviewRow label="Phone" value={data.phone || '—'} />
      </div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>
        Events selected
      </div>
      <div className="stack" style={{ '--gap': '6px', marginBottom: 28 } as React.CSSProperties}>
        {selectedEvents.length === 0 ? (
          <div className="muted small">No events selected — go back to step 2.</div>
        ) : (
          selectedEvents.map((e) => (
            <div
              key={e.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: 'var(--cream-2)',
                border: '1px solid var(--rule)',
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: `var(--${e.color})`,
                }}
              />
              <div style={{ fontWeight: 600 }}>{e.en}</div>
              <div className="bn small muted">{e.bn}</div>
              <div style={{ marginLeft: 'auto' }} className="mono">
                {e.duration}
              </div>
            </div>
          ))
        )}
      </div>
      <Field
        label="Anything we should know?"
        bn="বিশেষ তথ্য"
        hint="Allergies, accessibility needs, language preference."
      >
        <textarea
          style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Optional notes"
        />
      </Field>
      <div
        style={{
          marginTop: 28,
          padding: '16px 20px',
          background: 'var(--yellow-tint)',
          border: '1px solid var(--yellow)',
          borderRadius: 10,
          fontSize: 14,
        }}
      >
        <strong>By submitting,</strong> you confirm the student is available on{' '}
        <strong>Oct 10–11, 2026</strong> and you agree to Prayash using event photos for future
        promotion (you can opt out in the dashboard).
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function SuccessCard({ data, setPage }: { data: FormData; setPage: (p: Page) => void }) {
  const [id] = useState(() => Math.floor(Math.random() * 9000 + 1000));
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
      <div
        style={{
          padding: '60px 40px 40px',
          background: 'linear-gradient(180deg, var(--green-tint), var(--paper))',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: 'var(--green)',
            color: 'white',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5 6.5 12 13 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Registration received
        </div>
        <h2 className="display" style={{ fontSize: 44, margin: 0 }}>
          See you on Oct 10.
        </h2>
        <div className="bn-display" style={{ fontSize: 20, marginTop: 10, color: 'var(--ink-2)' }}>
          ধন্যবাদ · {data.student || 'ছাত্র'}
        </div>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 12,
            padding: '18px 24px',
            margin: '32px auto 0',
            maxWidth: 440,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '8px 20px',
            textAlign: 'left',
          }}
        >
          <div className="mono">ID</div>
          <div style={{ fontWeight: 600 }}>PRY-2026-{id}</div>
          <div className="mono">Events</div>
          <div style={{ fontWeight: 500 }}>{data.events.length} selected</div>
          <div className="mono">Contact</div>
          <div style={{ fontWeight: 500 }}>{data.phone || '—'}</div>
        </div>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 32 }}>
          <button className="btn btn-primary" onClick={() => setPage('dashboard')}>
            Go to dashboard <Icon.arrow />
          </button>
          <button className="btn btn-outline" onClick={() => setPage('events')}>
            See event schedule
          </button>
        </div>
      </div>
    </div>
  );
}
