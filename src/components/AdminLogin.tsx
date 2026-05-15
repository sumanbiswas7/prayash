import { Icon } from '../data';

interface AdminLoginProps {
  pin: string;
  setPin: (v: string) => void;
  pinError: string;
  setPinError: (v: string) => void;
  showPin: boolean;
  setShowPin: (v: boolean) => void;
  handlePin: (e: React.FormEvent) => void;
}

export function AdminLogin({ pin, setPin, pinError, setPinError, showPin, setShowPin, handlePin }: AdminLoginProps) {
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <img src="/assets/logo.png" className="admin-login__logo" alt="Proyash" />
          <div className="display admin-login__title">Admin access</div>
          <div className="eyebrow muted admin-login__eyebrow">Proyash Admin Panel</div>
        </div>
        <div className="admin-login__body">
          <form className="stack" style={{ '--gap': '14px' } as React.CSSProperties} onSubmit={handlePin}>
            <div>
              <label className="admin-login__label">Admin PIN</label>
              <div className="admin-login__input-wrap">
                <input
                  type={showPin ? 'text' : 'password'}
                  className="admin-login__input"
                  placeholder="••••••••"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setPinError(''); }}
                  autoFocus
                />
                <button
                  type="button"
                  className="admin-login__eye"
                  onClick={() => setShowPin(!showPin)}
                  tabIndex={-1}
                >
                  {showPin ? <Icon.eyeOff /> : <Icon.eye />}
                </button>
              </div>
              {pinError && <p className="admin-login__error">{pinError}</p>}
            </div>
            <button type="submit" className="btn btn-primary btn-lg admin-login__btn">
              Sign in <Icon.arrow />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
