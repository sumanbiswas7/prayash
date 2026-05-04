import { Icon } from '../data';
import type { Page } from '../types';
import './LoginModal.scss';

interface LoginModalProps {
  onClose: () => void;
  setPage: (p: Page) => void;
}

export function LoginModal({ onClose, setPage }: LoginModalProps) {
  return (
    <div className="login-modal__overlay" onClick={onClose}>
      <div className="login-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal__header">
          <img src="/assets/logo.png" className="login-modal__logo" alt="Proyash" />
          <div className="display login-modal__title">Welcome back.</div>
          <div className="bn-display muted login-modal__subtitle">স্বাগতম</div>
        </div>
        <div className="login-modal__body">
          <div className="stack" style={{ '--gap': '14px' } as React.CSSProperties}>
            <div>
              <label className="login-modal__label">Email</label>
              <input
                defaultValue="moynak@example.com"
                className="login-modal__input"
              />
            </div>
            <div>
              <label className="login-modal__label-row">
                <span>Password</span>
                <a className="small login-modal__forgot">Forgot?</a>
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                className="login-modal__input"
              />
            </div>
            <button
              className="btn btn-primary btn-lg login-modal__submit"
              onClick={() => {
                onClose();
                setPage('dashboard');
              }}
            >
              Log in <Icon.arrow />
            </button>
          </div>
          <div className="small muted login-modal__footer">
            New here?{' '}
            <a
              className="login-modal__register-link"
              onClick={() => {
                onClose();
                setPage('register');
              }}
            >
              Register for the festival
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
