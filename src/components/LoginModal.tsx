import { useState } from 'react';
import { Icon } from '../data';
import type { Page } from '../types';
import './LoginModal.scss';

interface LoginModalProps {
  onClose: () => void;
  setPage: (p: Page) => void;
}

export function LoginModal({ onClose, setPage }: LoginModalProps) {
  const [tab, setTab] = useState<'password' | 'magic'>('magic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  const switchTab = (t: 'password' | 'magic') => {
    setTab(t);
    setMagicSent(false);
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
          {tab === 'password' ? (
            <form
              className="stack"
              style={{ '--gap': '14px' } as React.CSSProperties}
              onSubmit={(e) => { e.preventDefault(); onClose(); setPage('dashboard'); }}
            >
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
                  <a className="small login-modal__forgot">Forgot?</a>
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
              <button type="submit" className="btn btn-primary btn-lg login-modal__submit">
                Log in <Icon.arrow />
              </button>
            </form>
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
              <button
                type="button"
                className="btn btn-primary btn-lg login-modal__submit"
                onClick={() => setMagicSent(true)}
                disabled={!email.includes('@')}
              >
                Send magic link <Icon.arrow />
              </button>
            </div>
          )}

          <div className="small muted login-modal__footer">
            New here?{' '}
            <a
              className="login-modal__register-link"
              onClick={() => { onClose(); setPage('register'); }}
            >
              Register for the festival
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
