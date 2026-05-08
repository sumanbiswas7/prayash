import { useState } from 'react';
import { Icon } from '../data';
import type { Page, Student } from '../types';
import './LoginModal.scss';

interface LoginModalProps {
  onClose: () => void;
  setPage: (p: Page) => void;
  onLogin: (student: Student) => void;
}

export function LoginModal({ onClose, setPage, onLogin }: LoginModalProps) {
  const [tab, setTab] = useState<'password' | 'magic'>('magic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const switchTab = (t: 'password' | 'magic') => {
    setTab(t);
    setMagicSent(false);
    setForgotMode(false);
    setForgotSent(false);
    setError('');
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'login', email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Login failed');
      onLogin(json.student);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'forgot-password', email, origin: window.location.origin }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to send reset email');
      setForgotSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'magic-link-send', email, origin: window.location.origin }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to send link');
      setMagicSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal__overlay" onClick={onClose}>
      <div className="login-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal__header">
          <img src="/assets/logo.png" className="login-modal__logo" alt="Proyash" />
          <div className="display login-modal__title">Welcome back.</div>
          <div className="bn-display muted login-modal__subtitle">স্বাগতম</div>
        </div>

        <div className="login-modal__tabs">
          <button
            className={`login-modal__tab ${tab === 'password' ? 'login-modal__tab--active' : ''}`}
            onClick={() => switchTab('password')}
          >
            Password
          </button>
          <button
            className={`login-modal__tab ${tab === 'magic' ? 'login-modal__tab--active' : ''}`}
            onClick={() => switchTab('magic')}
          >
            Magic link
          </button>
        </div>

        <div className="login-modal__body">
          {tab === 'password' && !forgotMode ? (
            <form className="stack" style={{ '--gap': '14px' } as React.CSSProperties} onSubmit={handlePasswordLogin}>
              <div>
                <label className="login-modal__label">Email</label>
                <input
                  type="email"
                  className="login-modal__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="login-modal__label-row">
                  <span>Password</span>
                  <span
                    className="login-modal__forgot"
                    onClick={() => { setForgotMode(true); setError(''); }}
                  >
                    Forgot password?
                  </span>
                </label>
                <input
                  type="password"
                  className="login-modal__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
              </div>
              {error && <p className="login-modal__error">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary btn-lg login-modal__submit"
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Logging in…' : 'Log in'} <Icon.arrow />
              </button>
            </form>
          ) : tab === 'password' && forgotMode && !forgotSent ? (
            <div className="stack" style={{ '--gap': '14px' } as React.CSSProperties}>
              <div>
                <label className="login-modal__label">Email</label>
                <input
                  type="email"
                  className="login-modal__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              {error && <p className="login-modal__error">{error}</p>}
              <button
                type="button"
                className="btn btn-primary btn-lg login-modal__submit"
                onClick={handleForgotPassword}
                disabled={!email.includes('@') || loading}
                style={{ opacity: !email.includes('@') || loading ? 0.6 : 1 }}
              >
                {loading ? 'Sending…' : 'Send reset link'} <Icon.arrow />
              </button>
              <button
                type="button"
                className="btn btn-ghost login-modal__submit"
                onClick={() => { setForgotMode(false); setError(''); }}
              >
                Back to login
              </button>
            </div>
          ) : tab === 'password' && forgotSent ? (
            <div className="login-modal__magic-sent">
              <div className="login-modal__magic-icon">✉️</div>
              <p>Check your inbox.</p>
              <p className="small muted">
                We sent a password reset link to <strong>{email}</strong>. It expires in 15 minutes.
              </p>
            </div>
          ) : magicSent ? (
            <div className="login-modal__magic-sent">
              <div className="login-modal__magic-icon">✉️</div>
              <p>Check your inbox.</p>
              <p className="small muted">
                We sent a sign-in link to <strong>{email}</strong>. Click it to log in — no
                password needed.
              </p>
            </div>
          ) : (
            <div className="stack" style={{ '--gap': '14px' } as React.CSSProperties}>
              <div>
                <label className="login-modal__label">Email</label>
                <input
                  type="email"
                  className="login-modal__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              {error && <p className="login-modal__error">{error}</p>}
              <button
                type="button"
                className="btn btn-primary btn-lg login-modal__submit"
                onClick={handleMagicLink}
                disabled={!email.includes('@') || loading}
                style={{ opacity: !email.includes('@') || loading ? 0.6 : 1 }}
              >
                {loading ? 'Sending…' : 'Login'} <Icon.arrow />
              </button>
            </div>
          )}

          <div className="small muted login-modal__footer">
            New here?{' '}
            <a
              className="login-modal__register-link"
              onClick={() => { onClose(); setPage('register'); }}
            >
              Register as a student
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
