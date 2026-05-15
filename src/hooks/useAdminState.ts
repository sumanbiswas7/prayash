import { useState, useRef, useCallback, useEffect } from 'react';

export interface ScanResult {
  ok: boolean;
  alreadyPaid: boolean;
  studentName: string;
  eventName: string;
  group: string;
  regId: string;
  error?: string;
}

export interface Registration {
  registrationId: string;
  studentName: string;
  eventName: string;
  group: string;
  feePaid: boolean;
}

interface ConfirmPending {
  id: string;
  source: 'manual' | 'list';
}

export function useAdminState(
  authed: boolean,
  setAuthed: (v: boolean) => void,
  onSignOutReady: (fn: () => void) => void,
) {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [manualId, setManualId] = useState('');
  const [confirmPending, setConfirmPending] = useState<ConfirmPending | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [regsLoading, setRegsLoading] = useState(false);
  const [regsError, setRegsError] = useState('');
  const [regsSearch, setRegsSearch] = useState('');
  const [regsTab, setRegsTab] = useState<'all' | 'unpaid'>('all');
  const pinRef = useRef(sessionStorage.getItem('proyash_admin_pin') ?? '');

  // ── Derived ──────────────────────────────────────────────────────────────
  const paidCount = registrations.filter(r => r.feePaid).length;
  const unpaidCount = registrations.length - paidCount;
  const filteredRegs = registrations
    .filter(r => regsTab === 'unpaid' ? !r.feePaid : true)
    .filter(r => {
      const q = regsSearch.toLowerCase();
      return !q || r.studentName.toLowerCase().includes(q) || r.registrationId.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (a.feePaid !== b.feePaid) return a.feePaid ? 1 : -1;
      return a.studentName.localeCompare(b.studentName);
    });

  // ── API helpers ───────────────────────────────────────────────────────────
  const callMarkPaidApi = async (regId: string) => {
    const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'mark-fee-paid', registrationId: regId, adminSecret: pinRef.current }),
    });
    if (res.status === 403) { setAuthed(false); setPinError('Wrong PIN'); return null; }
    return res.json();
  };

  const markPaid = async (regId: string) => {
    setScanning(false);
    try {
      const json = await callMarkPaidApi(regId);
      if (!json) return;
      if (json.ok) {
        setResult({ ok: true, alreadyPaid: json.alreadyPaid, studentName: json.registration.studentName, eventName: json.registration.eventName, group: json.registration.group, regId });
        setRegistrations(prev => prev.map(r => r.registrationId === regId ? { ...r, feePaid: true } : r));
      } else {
        setResult({ ok: false, alreadyPaid: false, studentName: '', eventName: '', group: '', regId, error: json.error || 'Failed' });
      }
    } catch {
      setResult({ ok: false, alreadyPaid: false, studentName: '', eventName: '', group: '', regId, error: 'Network error' });
    }
  };

  const markPaidFromList = async (regId: string) => {
    try {
      const json = await callMarkPaidApi(regId);
      if (json?.ok) setRegistrations(prev => prev.map(r => r.registrationId === regId ? { ...r, feePaid: true } : r));
    } catch { /* row stays unpaid, user can retry */ }
  };

  const fetchRegistrations = useCallback(async () => {
    setRegsLoading(true);
    setRegsError('');
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'list-registrations', adminSecret: pinRef.current }),
      });
      if (res.status === 403) { setAuthed(false); return; }
      const json = await res.json();
      if (json.ok) setRegistrations(json.registrations);
      else setRegsError(json.error || 'Failed to load registrations');
    } catch {
      setRegsError('Network error');
    } finally {
      setRegsLoading(false);
    }
  }, [setAuthed]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) { setPinError('Enter admin PIN'); return; }
    pinRef.current = pin;
    sessionStorage.setItem('proyash_admin_pin', pin);
    setAuthed(true);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = manualId.trim();
    if (!id) return;
    setConfirmPending({ id, source: 'manual' });
  };

  const openConfirmForReg = (regId: string) => setConfirmPending({ id: regId, source: 'list' });

  const confirmMarkPaid = async () => {
    if (!confirmPending) return;
    setConfirming(true);
    if (confirmPending.source === 'list') await markPaidFromList(confirmPending.id);
    else await markPaid(confirmPending.id);
    setConfirmPending(null);
    setManualId('');
    setConfirming(false);
  };

  const cancelConfirm = () => setConfirmPending(null);

  const signOut = useCallback(() => {
    setAuthed(false);
    setPin('');
    setResult(null);
    setScanning(false);
    setCameraError('');
    setManualId('');
    setConfirmPending(null);
    setRegistrations([]);
    setRegsError('');
    setRegsSearch('');
    setRegsTab('all');
    pinRef.current = '';
    sessionStorage.removeItem('proyash_admin_pin');
  }, [setAuthed]);

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    onSignOutReady(signOut);
  }, [signOut]);

  useEffect(() => {
    if (authed) fetchRegistrations();
  }, [authed]);

  useEffect(() => {
    if (!authed || !scanning) return;

    setCameraError('');
    let scanner: { clear: () => Promise<void> } | null = null;
    let cancelled = false;

    (async () => {
      if ('permissions' in navigator) {
        try {
          const perm = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (perm.state === 'denied' && !cancelled) setCameraError('Camera access is blocked. Enable it in your browser settings to scan.');
          perm.onchange = () => {
            if (!cancelled) setCameraError(perm.state === 'denied' ? 'Camera access is blocked. Enable it in your browser settings to scan.' : '');
          };
        } catch { /* permissions API unsupported */ }
      }

      const { Html5QrcodeScanner, Html5QrcodeScanType } = await import('html5-qrcode');
      if (cancelled) return;
      scanner = new Html5QrcodeScanner(
        'qr-reader',
        { fps: 10, qrbox: { width: 240, height: 240 }, rememberLastUsedCamera: true, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] },
        false,
      );
      (scanner as any).render(
        async (text: string) => { if (scanner) { await scanner.clear(); scanner = null; } markPaid(text.trim()); },
        () => {},
      );
    })();

    return () => {
      cancelled = true;
      if (scanner) scanner.clear().catch(() => {});
    };
  }, [authed, scanning]);

  return {
    pin, setPin,
    pinError, setPinError,
    result, setResult,
    scanning, setScanning,
    showPin, setShowPin,
    cameraError,
    manualId, setManualId,
    confirmPending,
    confirming,
    registrations,
    regsLoading,
    regsError,
    regsSearch, setRegsSearch,
    regsTab, setRegsTab,
    paidCount,
    unpaidCount,
    filteredRegs,
    handlePin,
    fetchRegistrations,
    openConfirmForReg,
    handleManualSubmit,
    confirmMarkPaid,
    cancelConfirm,
    signOut,
  };
}
