import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../data';
import { useAdminState } from '../hooks/useAdminState';
import './Admin.scss';

interface AdminScanProps {
  authed: boolean;
  setAuthed: (v: boolean) => void;
  onSignOutReady: (fn: () => void) => void;
}

export function AdminScan({ authed, setAuthed, onSignOutReady }: AdminScanProps) {
  const navigate = useNavigate();
  const {
    result, setResult,
    scanning, setScanning,
    cameraError,
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
            <div className="admin-page-header__icon admin-page-header__icon--blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /><rect x="14" y="18" width="3" height="3" /><rect x="18" y="14" width="3" height="3" />
              </svg>
            </div>
            <div>
              <h2 className="admin-page-header__title">Scan QR Code</h2>
              <p className="admin-page-header__desc muted">Scan a participant's competition receipt to mark their fee as paid.</p>
            </div>
          </div>
        </div>

        <div className="admin-scanner-card card">
          {!scanning && !result && (
            <div className="admin-scanner-idle">
              <div className="admin-scanner-idle__frame">
                <span className="admin-scanner-idle__corner admin-scanner-idle__corner--tl" />
                <span className="admin-scanner-idle__corner admin-scanner-idle__corner--tr" />
                <span className="admin-scanner-idle__corner admin-scanner-idle__corner--bl" />
                <span className="admin-scanner-idle__corner admin-scanner-idle__corner--br" />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)' }}>
                  <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /><rect x="14" y="18" width="3" height="3" /><rect x="18" y="14" width="3" height="3" />
                </svg>
              </div>
              <p className="admin-scanner-idle__desc">
                Ask the participant to show their <strong>competition receipt</strong> — the QR code is printed on it.
              </p>
              <button className="btn btn-primary" onClick={() => setScanning(true)}>Start scanning</button>
            </div>
          )}

          {scanning && !result && (
            <div className="admin-scanner-active">
              <div className="admin-scanner-active__header">
                <span className="admin-scanner-active__dot" />
                <span>Scanning receipt</span>
                <button className="btn btn-ghost btn-sm admin-scanner-active__stop" onClick={() => setScanning(false)}>Stop</button>
              </div>
              {cameraError && (
                <div className="admin-scanner-cam-error">
                  <Icon.cameraOff className="admin-scanner-cam-error__icon" />
                  <p>{cameraError}</p>
                </div>
              )}
              <div id="qr-reader" className="admin-scanner-active__reader" />
            </div>
          )}

          {result && (
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
                <button className="btn btn-primary btn-sm" onClick={() => { setResult(null); setScanning(true); }}>
                  Scan next
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin')}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
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
