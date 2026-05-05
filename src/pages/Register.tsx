import { useState } from 'react';
import { Icon } from '../data';
import type { Page, Student } from '../types';
import './Register.scss';

interface RegisterProps {
  setPage: (p: Page) => void;
  onRegister?: (student: Student) => void;
}

interface FormData {
  studentName: string;
  studentNameBn: string;
  klass: string;
  school: string;
  guardianName: string;
  phone: string;
  email: string;
  password: string;
  notes: string;
}

const STEPS = ['Student', 'Account', 'Review'] as const;

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function Register({ setPage, onRegister }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [registrationId, setRegistrationId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [data, setData] = useState<FormData>({
    studentName: '',
    studentNameBn: '',
    klass: '',
    school: '',
    guardianName: '',
    phone: '',
    email: '',
    password: '',
    notes: '',
  });

  const update = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canAdvance = ({
    1: !!(data.studentName && data.klass && data.school),
    2: !!(data.phone.length >= 10 && emailVerified && data.password.length >= 6),
    3: true,
  } as Record<number, boolean>)[step];

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'register', ...data }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Registration failed');
      setRegistrationId(json.registrationId);
      onRegister?.({
        registrationId: json.registrationId,
        studentName: data.studentName,
        studentNameBn: data.studentNameBn,
        klass: data.klass,
        school: data.school,
        guardianName: data.guardianName,
        phone: data.phone,
        email: data.email,
      });
      setStep(4);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register">
      <div className="container register__container">
        <div className="register__header">
          <div>
            <div className="eyebrow register__eyebrow">Student · Registration</div>
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
          {STEPS.map((label, i) => {
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
          <SuccessCard data={data} registrationId={registrationId} setPage={setPage} />
        ) : (
          <div className="card register__form-card">
            <div className="register__form-body">
              {step === 1 && <Step1 data={data} update={update} />}
              {step === 2 && <Step2 data={data} update={update} emailVerified={emailVerified} setEmailVerified={setEmailVerified} />}
              {step === 3 && <Step3 data={data} update={update} />}
            </div>
            {submitError && <p className="register__submit-error">{submitError}</p>}
            <div className="register__footer-bar">
              <button
                className="btn btn-ghost"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1 || submitting}
                style={{ opacity: step === 1 ? 0.3 : 1 }}
              >
                ← Back
              </button>
              <div className="small muted">Step {step} of 3 · your progress is saved</div>
              <button
                className="btn btn-primary"
                onClick={step === 3 ? handleSubmit : () => setStep((s) => s + 1)}
                disabled={!canAdvance || submitting}
                style={{ opacity: canAdvance && !submitting ? 1 : 0.4 }}
              >
                {step === 3 ? (submitting ? 'Submitting…' : 'Submit registration') : 'Continue'} <Icon.arrow />
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
  required = false,
}: {
  label: string;
  bn?: string;
  children: React.ReactNode;
  hint?: string;
  col?: number;
  required?: boolean;
}) {
  return (
    <div style={{ gridColumn: `span ${col}` }}>
      <label className="form-field__label">
        <span className="form-field__label-text">
          {label}
          {required && <span className="form-field__required"> *</span>}
        </span>
        {bn && <span className="bn small muted form-field__label-bn">{bn}</span>}
      </label>
      {children}
      {hint && <div className="small muted form-field__hint">{hint}</div>}
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
        Basic details about the student participating in Medha Pariksha 2026.
      </p>
      <div className="form-grid">
        <Field label="Student's name" bn="ছাত্রের নাম" col={2} required>
          <input
            className="form-input"
            value={data.studentName}
            onChange={(e) => update('studentName', e.target.value)}
            placeholder="e.g. Tiyash Biswas"
          />
        </Field>
        <Field label="Name in Bengali" bn="বাংলায় নাম" col={2}>
          <input
            className="form-input bn"
            value={data.studentNameBn}
            onChange={(e) => update('studentNameBn', e.target.value)}
            placeholder="যেমন: তিয়াশ বিশ্বাস"
          />
        </Field>
        <Field label="Class / Standard" bn="শ্রেণী" required>
          <div className="class-picker">
            {['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map((c) => (
              <button
                key={c}
                type="button"
                className={`class-pill${data.klass === `Class ${c}` ? ' class-pill--active' : ''}`}
                onClick={() => update('klass', `Class ${c}`)}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>
        <Field label="School" bn="বিদ্যালয়" required>
          <input
            className="form-input"
            value={data.school}
            onChange={(e) => update('school', e.target.value)}
            placeholder="Name of school"
          />
        </Field>
        <Field label="Guardian's name" bn="অভিভাবক" col={2}>
          <input
            className="form-input"
            value={data.guardianName}
            onChange={(e) => update('guardianName', e.target.value)}
            placeholder="Parent or guardian"
          />
        </Field>
      </div>
    </div>
  );
}

function Step2({
  data,
  update,
  emailVerified,
  setEmailVerified,
}: {
  data: FormData;
  update: (k: keyof FormData, v: string) => void;
  emailVerified: boolean;
  setEmailVerified: (v: boolean) => void;
}) {
  const [showPw, setShowPw] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleEmailChange = (val: string) => {
    update('email', val);
    setEmailVerified(false);
    setOtpSent(false);
    setOtpInput('');
    setOtpCode('');
    setOtpError('');
  };

  const sendOtp = async () => {
    setOtpSending(true);
    setOtpError('');
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setOtpCode(code);
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'otp', email: data.email, code, recipientName: data.studentName }),
      });
      if (!res.ok) throw new Error();
      setOtpSent(true);
    } catch {
      setOtpError('Failed to send code. Try again.');
    } finally {
      setOtpSending(false);
    }
  };

  const handleOtpInput = (val: string) => {
    setOtpInput(val);
    if (val.length === 4) {
      if (val === otpCode) {
        setEmailVerified(true);
        setOtpError('');
      } else {
        setEmailVerified(false);
        setOtpError('Incorrect code, try again.');
      }
    }
  };

  return (
    <div>
      <div className="display step1__title">Set up your account</div>
      <p className="muted step1__desc">
        You'll use these to log in and access your dashboard after registering.
      </p>
      <div className="form-grid">
        <Field label="Phone" bn="মোবাইল" col={2} hint="We may contact you here." required>
          <div className="phone-input-wrapper">
            <div className="phone-input-prefix">🇮🇳 +91</div>
            <input
              className="form-input phone-input"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="98765 43210"
              inputMode="numeric"
            />
          </div>
        </Field>
        <Field label="Email" bn="ইমেইল" col={2} required>
          <div className="otp-row">
            <input
              className="form-input"
              type="email"
              value={data.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="your@email.com"
              disabled={emailVerified}
            />
            {emailVerified ? (
              <span className="otp-verified-badge">✓ Verified</span>
            ) : (
              <button
                type="button"
                className="btn btn-outline btn-sm otp-send-btn"
                onClick={sendOtp}
                disabled={!data.email.includes('@') || otpSending}
              >
                {otpSending ? 'Sending…' : otpSent ? 'Resend' : 'Send code'}
              </button>
            )}
          </div>
          {otpSent && !emailVerified && (
            <div className="otp-verify-row">
              <input
                className="form-input otp-input"
                value={otpInput}
                onChange={(e) => handleOtpInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="0000"
                inputMode="numeric"
                maxLength={4}
                autoFocus
              />
            </div>
          )}
          {otpError && <div className="otp-error">{otpError}</div>}
        </Field>
        <Field label="Password" bn="পাসওয়ার্ড" col={2} hint="At least 6 characters." required>
          <div className="password-wrapper">
            <input
              className="form-input"
              type={showPw ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="Create a password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPw((v) => !v)}
              tabIndex={-1}
            >
              <EyeIcon open={showPw} />
            </button>
          </div>
        </Field>
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
  return (
    <div>
      <div className="display step3__title">Review & submit</div>
      <p className="muted step3__desc">
        Check everything below. You'll get a confirmation within a day.
      </p>
      <div className="cols-2 step3__summary">
        <ReviewRow label="Student" value={`${data.studentName} · ${data.klass}`} />
        <ReviewRow label="Bengali name" value={data.studentNameBn} />
        <ReviewRow label="School" value={data.school || '—'} />
        <ReviewRow label="Guardian" value={data.guardianName || '—'} />
        <ReviewRow label="Phone" value={data.phone ? `+91 ${data.phone}` : '—'} />
        <ReviewRow label="Email" value={data.email || '—'} />
      </div>
      <Field
        label="Any suggestions to improve the flow?"
        hint="Share feedback on the registration process, accessibility needs, or language preferences."
      >
        <textarea
          className="form-input form-input--textarea"
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Optional suggestions or notes"
        />
      </Field>
      <div className="step3__consent">
        <strong>Almost there!</strong> We're so excited to have you join us. Can't wait to see you there!
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

function SuccessCard({
  data,
  registrationId,
  setPage,
}: {
  data: FormData;
  registrationId: string;
  setPage: (p: Page) => void;
}) {
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
        <h2 className="display success-card__title">See you soon.</h2>
        <div className="bn-display success-card__bn">
          ধন্যবাদ · {data.studentNameBn || data.studentName}
        </div>
        <div className="success-card__details">
          <div className="mono">ID</div>
          <div className="success-card__detail-value">{registrationId}</div>
          <div className="mono">Phone</div>
          <div className="success-card__detail-value">+91 {data.phone}</div>
          <div className="mono">Email</div>
          <div className="success-card__detail-value">{data.email}</div>
        </div>
        <div className="btn-row success-card__actions">
          <button className="btn btn-primary" onClick={() => setPage('dashboard')}>
            Go to dashboard <Icon.arrow />
          </button>
          <button className="btn btn-outline" onClick={() => setPage('events')}>
            Participate in events <Icon.arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
