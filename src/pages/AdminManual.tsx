import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../data';
import { useAdminState } from '../hooks/useAdminState';
import './Admin.scss';

interface AdminManualProps {
  authed: boolean;
  setAuthed: (v: boolean) => void;
  onSignOutReady: (fn: () => void) => void;
}

export function AdminManual({ authed, setAuthed, onSignOutReady }: AdminManualProps) {
  const navigate = useNavigate();
  const {
    result, setResult,
    manualId, setManualId,
    confirmPending,
    confirming,
    handleManualSubmit,
    confirmMarkPaid,
    cancelConfirm,
  } = useAdminState(authed, setAuthed, onSignOutReady);

  useEffect(() => {
    if (!authed) navigate('/admin', { replace: true });
  }, [authed]);

  if (!authed) return null;

  return (
    <div className="admin-panel">
      <div className="container admin-panel__body">

        <div className="admin-page-header">
          <button className="admin-page-back" onClick={() => navigate('/admin')}>
            <BackIcon /> Back
          </button>
          <div className="admin-page-header__row">
            <div className="admin-page-header__icon admin-page-header__icon--teal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div>
              <h2 className="admin-page-header__title">Enter ID</h2>
              <p className="admin-page-header__desc muted">Type a registration ID to manually mark the fee as paid.</p>
            </div>
          </div>
        </div>

        <div className="admin-manual-card card">
          {!result ? (
            <form className="admin-manual-form" onSubmit={handleManualSubmit}>
              <div className="admin-manual-form__field">
                <label className="admin-manual-form__label">Registration ID</label>
                <input
                  className="admin-manual-form__input"
                  type="text"
                  placeholder="e.g. PRYREG-2026-001"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn btn-primary admin-manual-form__btn" disabled={!manualId.trim()}>
                <Icon.check /> Mark as paid
              </button>
            </form>
          ) : (
            <div className={`admin-scan-result admin-scan-result--${result.ok ? (result.alreadyPaid ? 'warn' : 'ok') : 'err'}`}>
              <div className="admin-scan-result__badge">
                {result.ok ? (result.alreadyPaid ? 'Already paid' : 'Marked paid') : 'Error'}
              </div>
              {result.ok ? (
                <div className="admin-scan-result__info">
                  <div className="admin-scan-result__name">{result.studentName}</div>
                  <div className="admin-scan-result__meta muted">{result.eventName} · {result.group}</div>
                </div>
              ) : (
                <div className="admin-scan-result__info">
                  <div className="admin-scan-result__meta">{result.error}</div>
                </div>
              )}
              <div className="mono admin-scan-result__id">{result.regId}</div>
              <div className="admin-scan-result__actions">
                <button className="btn btn-primary btn-sm" onClick={() => setResult(null)}>
                  Enter another
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin')}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {confirmPending && (
        <div className="admin-confirm-overlay" onClick={cancelConfirm}>
          <div className="admin-confirm-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-confirm-modal__icon"><Icon.check /></div>
            <div className="admin-confirm-modal__title">Mark fee as paid?</div>
            <div className="admin-confirm-modal__id mono">{confirmPending.id}</div>
            <p className="admin-confirm-modal__desc">This will mark the registration fee as collected. This action cannot be undone.</p>
            <div className="admin-confirm-modal__actions">
              <button className="btn btn-outline" onClick={cancelConfirm} disabled={confirming}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmMarkPaid} disabled={confirming}>
                {confirming ? 'Marking…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}
