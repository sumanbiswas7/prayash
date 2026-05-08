import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Page, Student } from '../types';

interface AuthProps {
  setPage: (p: Page) => void;
  onLogin: (student: Student) => void;
}

function ResetPasswordForm({ token, setPage }: { token: string; setPage: (p: Page) => void }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'reset-password', token, newPassword }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Reset failed');
      setDone(true);
      setTimeout(() => setPage('home'), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <div className="display" style={{ fontSize: 28, marginBottom: 12 }}>Password updated!</div>
        <p className="muted">You can now log in with your new password.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <div className="display" style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>Set new password</div>
      <p className="muted" style={{ textAlign: 'center', marginBottom: 24 }}>Choose a new password for your account.</p>
      <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--rule)', fontSize: 15, boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Same password again"
            required
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--rule)', fontSize: 15, boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ fontSize: 13, color: '#e05252', margin: 0 }}>{error}</p>}
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, justifyContent: 'center', marginTop: 4 }}
        >
          {loading ? 'Saving…' : 'Save new password'}
        </button>
      </form>
    </div>
  );
}

export function Auth({ setPage, onLogin }: AuthProps) {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMsg, setErrorMsg] = useState('');

  const mode = searchParams.get('mode');
  const token = searchParams.get('token');

  useEffect(() => {
    if (mode === 'reset') return;

    if (!token) {
      setStatus('error');
      setErrorMsg('No token found in this link.');
      return;
    }

    fetch(import.meta.env.VITE_LAMBDA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'magic-link-verify', token }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (!json.ok) throw new Error(json.error || 'Verification failed');
        onLogin(json.student);
        setStatus('success');
        setTimeout(() => setPage('home'), 1500);
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.message);
      });
  }, []);

  if (mode === 'reset') {
    return (
      <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '40px 24px' }}>
        {token
          ? <ResetPasswordForm token={token} setPage={setPage} />
          : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✗</div>
              <div className="display" style={{ fontSize: 28, marginBottom: 12 }}>Link invalid</div>
              <p className="muted" style={{ marginBottom: 24 }}>No reset token found.</p>
              <button className="btn btn-primary" onClick={() => setPage('home')}>Back home</button>
            </div>
          )
        }
      </div>
    );
  }

  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        {status === 'verifying' && (
          <>
            <div className="display" style={{ fontSize: 28, marginBottom: 12 }}>Signing you in…</div>
            <p className="muted">Hang tight while we verify your link.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div className="display" style={{ fontSize: 28, marginBottom: 12 }}>You're in!</div>
            <p className="muted">Redirecting you now…</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✗</div>
            <div className="display" style={{ fontSize: 28, marginBottom: 12 }}>Link invalid</div>
            <p className="muted" style={{ marginBottom: 24 }}>{errorMsg}</p>
            <button className="btn btn-primary" onClick={() => setPage('home')}>
              Back home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
