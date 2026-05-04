import { useState } from 'react';
import { PROYASH_DATA, Icon } from '../data';
import type { Page } from '../types';
import './Register.scss';

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
    <div className="register">
      <div className="container register__container">
        <div className="register__header">
          <div>
            <div className="eyebrow register__eyebrow">
              Medha Pariksha 2026 · Registration
            </div>
            <h1 className="display register__title">
              Let's get you
              <br />
              <span className="register__title-accent">on the stage.</span>
            </h1>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('home')}>
            ← Back home
          </button>
        </div>

        <div className="register__steps">
          {(['Student', 'Events', 'Review', 'Done'] as const).map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            const stepClass = active
              ? 'register__step--active'
              : done
                ? 'register__step--done'
                : 'register__step--pending';
            const circleClass = active
              ? 'register__step-circle--active'
              : done
                ? 'register__step-circle--done'
                : 'register__step-circle--pending';
            return (
              <div key={label} className={`register__step ${stepClass}`}>
                <div className={`register__step-circle ${circleClass}`}>
                  {done ? <Icon.check /> : n}
                </div>
                <div>
                  <div className="mono register__step-num">Step {n}</div>
                  <div className="register__step-label">{label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {step === 4 ? (
          <SuccessCard data={data} setPage={setPage} />
        ) : (
          <div className="card register__form-card">
            <div className="register__form-body">
              {step === 1 && <Step1 data={data} update={update} />}
              {step === 2 && <Step2 data={data} toggleEvent={toggleEvent} />}
              {step === 3 && <Step3 data={data} update={update} />}
            </div>
            <div className="register__footer-bar">
              <button
                className={`btn btn-ghost ${step === 1 ? 'register__back-btn--disabled' : ''}`}
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
      <label className="form-field__label">
        <span className="form-field__label-text">{label}</span>
        {bn && (
          <span className="bn small muted form-field__label-bn">{bn}</span>
        )}
      </label>
      {children}
      {hint && (
        <div className="small muted form-field__hint">{hint}</div>
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
      <div className="display step1__title">Tell us about the student</div>
      <p className="muted step1__desc">
        Basic details. Guardian contact so we can reach you with venue updates.
      </p>
      <div className="form-grid">
        <Field label="Student's full name" bn="ছাত্রের নাম" col={2}>
          <input
            className="form-input"
            value={data.student}
            onChange={(e) => update('student', e.target.value)}
            placeholder="e.g. Moynak Biswas"
          />
        </Field>
        <Field label="Class / Standard" bn="শ্রেণী">
          <select
            className="form-input"
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
            className="form-input"
            value={data.school}
            onChange={(e) => update('school', e.target.value)}
            placeholder="Name of school"
          />
        </Field>
        <Field label="Guardian's name" bn="অভিভাবক">
          <input
            className="form-input"
            value={data.guardian}
            onChange={(e) => update('guardian', e.target.value)}
            placeholder="Parent or guardian"
          />
        </Field>
        <Field label="Phone (WhatsApp)" bn="মোবাইল" hint="We'll send venue details here.">
          <input
            className="form-input"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+91 98xxx xxxxx"
          />
        </Field>
        <Field label="Email (optional)" bn="ইমেইল" col={2}>
          <input
            className="form-input"
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
      <div className="display step2__title">Pick events</div>
      <p className="muted step2__desc">
        A student can enter up to 4 events. Appropriate age group is selected automatically based on
        the class you chose.
      </p>
      <div className="mono step2__count">{data.events.length} of 4 selected</div>
      <div className="cols-2">
        {PROYASH_DATA.events.map((e) => {
          const on = data.events.includes(e.id);
          const disabled = !on && data.events.length >= 4;
          return (
            <button
              key={e.id}
              disabled={disabled}
              onClick={() => toggleEvent(e.id)}
              className={`step2__event-btn ${disabled ? 'step2__event-btn--disabled' : ''}`}
              style={{
                background: on ? `var(--${e.color}-tint)` : 'var(--paper)',
                border: `1.5px solid ${on ? `var(--${e.color})` : 'var(--rule)'}`,
              }}
            >
              <div
                className="step2__event-check"
                style={{
                  border: `1.5px solid ${on ? `var(--${e.color})` : 'var(--rule-2)'}`,
                  background: on ? `var(--${e.color})` : 'transparent',
                }}
              >
                {on && <Icon.check />}
              </div>
              <div className="step2__event-body">
                <div className="step2__event-name">
                  {e.en}{' '}
                  <span
                    className="bn small step2__event-bn"
                    style={{ color: `var(--${e.color})` }}
                  >
                    {e.bn}
                  </span>
                </div>
                <div className="small muted step2__event-meta">
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
  const selectedEvents = PROYASH_DATA.events.filter((e) => data.events.includes(e.id));
  return (
    <div>
      <div className="display step3__title">Review & submit</div>
      <p className="muted step3__desc">
        Check everything below. You'll get a confirmation on WhatsApp within a day.
      </p>
      <div className="cols-2 step3__summary">
        <ReviewRow label="Student" value={`${data.student || '—'} · ${data.klass || ''}`} />
        <ReviewRow label="School" value={data.school || '—'} />
        <ReviewRow label="Guardian" value={data.guardian || '—'} />
        <ReviewRow label="Phone" value={data.phone || '—'} />
      </div>
      <div className="eyebrow step3__events-eyebrow">Events selected</div>
      <div className="stack step3__selected-events" style={{ '--gap': '6px' } as React.CSSProperties}>
        {selectedEvents.length === 0 ? (
          <div className="muted small">No events selected — go back to step 2.</div>
        ) : (
          selectedEvents.map((e) => (
            <div key={e.id} className="step3__event-row">
              <span
                className="step3__event-dot"
                style={{ background: `var(--${e.color})` }}
              />
              <div className="step3__event-en">{e.en}</div>
              <div className="bn small muted">{e.bn}</div>
              <div className="mono step3__event-duration">{e.duration}</div>
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
          className="form-input form-input--textarea"
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Optional notes"
        />
      </Field>
      <div className="step3__consent">
        <strong>By submitting,</strong> you confirm the student is available on{' '}
        <strong>Oct 10–11, 2026</strong> and you agree to Proyash using event photos for future
        promotion (you can opt out in the dashboard).
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow review-row__eyebrow">{label}</div>
      <div className="review-row__value">{value}</div>
    </div>
  );
}

function SuccessCard({ data, setPage }: { data: FormData; setPage: (p: Page) => void }) {
  const [id] = useState(() => Math.floor(Math.random() * 9000 + 1000));
  return (
    <div className="card success-card">
      <div className="success-card__body">
        <div className="success-card__icon">
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
        <div className="eyebrow success-card__eyebrow">Registration received</div>
        <h2 className="display success-card__title">See you on Oct 10.</h2>
        <div className="bn-display success-card__bn">
          ধন্যবাদ · {data.student || 'ছাত্র'}
        </div>
        <div className="success-card__details">
          <div className="mono">ID</div>
          <div className="success-card__detail-value">PRY-2026-{id}</div>
          <div className="mono">Events</div>
          <div className="success-card__detail-value">{data.events.length} selected</div>
          <div className="mono">Contact</div>
          <div className="success-card__detail-value">{data.phone || '—'}</div>
        </div>
        <div className="btn-row success-card__actions">
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
