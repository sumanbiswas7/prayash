import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Page, Student } from '../types';

interface AuthProps {
  setPage: (p: Page) => void;
  onLogin: (student: Student) => void;
}

export function Auth({ setPage, onLogin }: AuthProps) {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
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
