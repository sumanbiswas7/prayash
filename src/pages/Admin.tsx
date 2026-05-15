import { useNavigate } from 'react-router-dom';
import { Icon } from '../data';
import { AdminLogin } from '../components/AdminLogin';
import { useAdminState } from '../hooks/useAdminState';
import './Admin.scss';

interface AdminProps {
  authed: boolean;
  setAuthed: (v: boolean) => void;
  onSignOutReady: (fn: () => void) => void;
}

export function Admin({ authed, setAuthed, onSignOutReady }: AdminProps) {
  const navigate = useNavigate();
  const {
    pin, setPin,
    pinError, setPinError,
    showPin, setShowPin,
    registrations,
    regsLoading,
    paidCount,
    unpaidCount,
    handlePin,
  } = useAdminState(authed, setAuthed, onSignOutReady);

  if (!authed) {
    return (
      <AdminLogin
        pin={pin} setPin={setPin}
        pinError={pinError} setPinError={setPinError}
        showPin={showPin} setShowPin={setShowPin}
        handlePin={handlePin}
      />
    );
  }

  return (
    <div className="admin-panel">
      <div className="container admin-panel__body">

        <div className="admin-dash-grid">

          <button
            className="admin-dash-card admin-dash-card--blue"
            onClick={() => navigate('/admin/scan')}
          >
            <div className="admin-dash-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /><rect x="14" y="18" width="3" height="3" /><rect x="18" y="14" width="3" height="3" />
              </svg>
            </div>
            <div className="admin-dash-card__content">
              <div className="admin-dash-card__title">Scan QR</div>
              <div className="admin-dash-card__sub">Scan a participant's receipt to mark their fee</div>
            </div>
            <div className="admin-dash-card__cta">Open scanner <Icon.arrow /></div>
          </button>

          <button
            className="admin-dash-card admin-dash-card--teal"
            onClick={() => navigate('/admin/manual')}
          >
            <div className="admin-dash-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div className="admin-dash-card__content">
              <div className="admin-dash-card__title">Enter ID</div>
              <div className="admin-dash-card__sub">Type a registration ID to mark fee as paid</div>
            </div>
            <div className="admin-dash-card__cta">Enter manually <Icon.arrow /></div>
          </button>

          <button
            className="admin-dash-card admin-dash-card--orange"
            onClick={() => navigate('/admin/registrations')}
          >
            <div className="admin-dash-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            </div>
            <div className="admin-dash-card__content">
              <div className="admin-dash-card__title">Registrations</div>
              <div className="admin-dash-card__sub">View and manage all event registrations</div>
            </div>
            {!regsLoading && registrations.length > 0 && (
              <div className="admin-dash-card__stats">
                <span className="admin-dash-stat admin-dash-stat--green">{paidCount} paid</span>
                <span className="admin-dash-stat admin-dash-stat--orange">{unpaidCount} pending</span>
              </div>
            )}
            <div className="admin-dash-card__cta">View all <Icon.arrow /></div>
          </button>

        </div>

      </div>
    </div>
  );
}
