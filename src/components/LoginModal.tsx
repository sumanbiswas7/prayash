import { Icon } from '../data';
import type { Page } from '../types';

interface LoginModalProps {
  onClose: () => void;
  setPage: (p: Page) => void;
}

export function LoginModal({ onClose, setPage }: LoginModalProps) {
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
        padding: 24,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: 440,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '36px 36px 28px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, var(--cream-2), var(--paper))',
            borderBottom: '1px solid var(--rule)',
          }}
        >
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
          <div className="display" style={{ fontSize: 28 }}>
            Welcome back.
          </div>
          <div className="bn-display muted" style={{ fontSize: 15, marginTop: 4 }}>
            স্বাগতম
          </div>
        </div>
        <div style={{ padding: '28px 36px' }}>
          <div className="stack" style={{ '--gap': '14px' } as React.CSSProperties}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                defaultValue="moynak@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--rule)',
                  background: 'var(--paper)',
                  fontSize: 15,
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <span>Password</span>
                <a className="small" style={{ color: 'var(--blue)', cursor: 'pointer' }}>
                  Forgot?
                </a>
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--rule)',
                  background: 'var(--paper)',
                  fontSize: 15,
                }}
              />
            </div>
            <button
              className="btn btn-primary btn-lg"
              style={{ justifyContent: 'center', marginTop: 8 }}
              onClick={() => {
                onClose();
                setPage('dashboard');
              }}
            >
              Log in <Icon.arrow />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 18 }} className="small muted">
            New here?{' '}
            <a
              style={{ color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}
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
