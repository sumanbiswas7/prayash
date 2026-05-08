import { useState, useEffect, useRef } from 'react';
import './Admin.scss';

interface ScanResult {
  ok: boolean;
  alreadyPaid: boolean;
  studentName: string;
  eventName: string;
  group: string;
  regId: string;
  error?: string;
}

export function Admin() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const pinRef = useRef('');

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) { setPinError('Enter admin PIN'); return; }
    pinRef.current = pin;
    setAuthed(true);
  };

  const markPaid = async (regId: string) => {
    setScanning(false);
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'mark-fee-paid', registrationId: regId, adminSecret: pinRef.current }),
      });
      const json = await res.json();
      if (res.status === 403) {
        setAuthed(false);
        setPinError('Wrong PIN');
        return;
      }
      if (json.ok) {
        setResult({ ok: true, alreadyPaid: json.alreadyPaid, studentName: json.registration.studentName, eventName: json.registration.eventName, group: json.registration.group, regId });
      } else {
        setResult({ ok: false, alreadyPaid: false, studentName: '', eventName: '', group: '', regId, error: json.error || 'Failed' });
      }
    } catch {
      setResult({ ok: false, alreadyPaid: false, studentName: '', eventName: '', group: '', regId, error: 'Network error' });
    }
  };

  useEffect(() => {
    if (!authed || !scanning) return;

    let scanner: { clear: () => Promise<void> } | null = null;
    let cancelled = false;

    (async () => {
      const { Html5QrcodeScanner } = await import('html5-qrcode');
      if (cancelled) return;
      scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: { width: 240, height: 240 }, rememberLastUsedCamera: true }, false);
      (scanner as any).render(
        async (text: string) => {
          if (scanner) { await scanner.clear(); scanner = null; }
          markPaid(text.trim());
        },
        () => {},
      );
    })();

    return () => {
      cancelled = true;
      if (scanner) scanner.clear().catch(() => {});
    };
  }, [authed, scanning]);

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login__box">
          <div className="admin-login__brand">
            <div className="bn-display admin-login__brand-bn">প্রয়াস</div>
            <div className="eyebrow admin-login__brand-label">Admin Panel</div>
          </div>
          <form onSubmit={handlePin} className="admin-login__form">
            <div className="admin-login__field">
              <label className="admin-login__label">PIN</label>
              <input
                type="password"
                className="admin-login__input"
                placeholder="••••••••"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(''); }}
                autoFocus
              />
              {pinError && <div className="admin-login__error">{pinError}</div>}
            </div>
            <button type="submit" className="btn btn-primary admin-login__btn">Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__topbar">
        <div className="container admin-panel__topbar-inner">
          <div className="admin-panel__topbar-left">
            <span className="bn-display admin-panel__topbar-bn">প্রয়াস</span>
            <span className="chip admin-panel__topbar-chip">Admin</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => { setAuthed(false); setPin(''); setResult(null); setScanning(false); }}>
            Sign out
          </button>
        </div>
      </div>

      <div className="container admin-panel__body">
        <div className="admin-panel__section-head">
          <h2 className="display admin-panel__section-title">Fee collection</h2>
          <p className="muted admin-panel__section-desc">Scan a participant's QR code to mark their registration fee as paid.</p>
        </div>

        <div className="admin-scanner-card card">
          {!scanning && !result && (
            <div className="admin-scanner-idle">
              <div className="admin-scanner-idle__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /><rect x="14" y="18" width="3" height="3" /><rect x="18" y="14" width="3" height="3" />
                </svg>
              </div>
              <div className="admin-scanner-idle__text">Scanner is idle</div>
              <button className="btn btn-primary" onClick={() => setScanning(true)}>Start scanning</button>
            </div>
          )}

          {scanning && !result && (
            <div className="admin-scanner-active">
              <div className="admin-scanner-active__header">
                <span className="admin-scanner-active__dot" /> Scanning…
                <button className="btn btn-ghost btn-sm admin-scanner-active__stop" onClick={() => setScanning(false)}>Stop</button>
              </div>
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
              <button className="btn btn-outline btn-sm admin-scan-result__next" onClick={() => { setResult(null); setScanning(true); }}>
                Scan next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
