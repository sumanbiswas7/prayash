import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../data';
import { useAdminState } from '../hooks/useAdminState';
import type { Registration } from '../hooks/useAdminState';
import './Admin.scss';

interface AdminRegistrationsProps {
  authed: boolean;
  setAuthed: (v: boolean) => void;
  onSignOutReady: (fn: () => void) => void;
}

export function AdminRegistrations({ authed, setAuthed, onSignOutReady }: AdminRegistrationsProps) {
  const navigate = useNavigate();

  const {
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
    fetchRegistrations,
    openConfirmForReg,
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

        <div className="admin-regs-page-header">
          <button className="admin-regs-page-back" onClick={() => navigate('/admin')}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Back
          </button>
          <div className="admin-regs-page-title-row">
            <h2 className="display admin-panel__section-title">Registrations</h2>
            {!regsLoading && registrations.length > 0 && (
              <div className="admin-regs-counts">
                <span className="admin-regs-counts__chip admin-regs-counts__chip--paid">{paidCount} paid</span>
                <span className="admin-regs-counts__chip admin-regs-counts__chip--unpaid">{unpaidCount} pending</span>
              </div>
            )}
          </div>
        </div>

        <div className="admin-regs-toolbar">
          <div className="admin-regs-tabs">
            <button className={`admin-regs-tab ${regsTab === 'all' ? 'active' : ''}`} onClick={() => setRegsTab('all')}>All</button>
            <button className={`admin-regs-tab ${regsTab === 'unpaid' ? 'active' : ''}`} onClick={() => setRegsTab('unpaid')}>
              Pending {unpaidCount > 0 && <span className="admin-regs-tab__badge">{unpaidCount}</span>}
            </button>
          </div>
          <input
            className="admin-regs-search"
            type="text"
            placeholder="Search by name or ID…"
            value={regsSearch}
            onChange={e => setRegsSearch(e.target.value)}
          />
          <button
            className="btn btn-ghost btn-sm admin-regs-header__refresh"
            onClick={fetchRegistrations}
            disabled={regsLoading}
          >
            <RefreshIcon spinning={regsLoading} /> Refresh
          </button>
        </div>

        <div className="admin-regs-list card">
          {regsLoading && <RegSkeleton />}

          {!regsLoading && regsError && (
            <div className="admin-regs-empty">
              <p className="admin-regs-empty__text">{regsError}</p>
              <button className="btn btn-outline btn-sm" onClick={fetchRegistrations}>Retry</button>
            </div>
          )}

          {!regsLoading && !regsError && filteredRegs.length === 0 && (
            <div className="admin-regs-empty">
              <p className="admin-regs-empty__text">
                {regsSearch ? 'No results match your search.' : regsTab === 'unpaid' ? 'All fees have been collected.' : 'No registrations yet.'}
              </p>
            </div>
          )}

          {!regsLoading && !regsError && filteredRegs.map((reg: Registration, i) => (
            <div key={reg.registrationId} className={`admin-regs-row ${i > 0 ? 'admin-regs-row--bordered' : ''}`}>
              <div className="admin-regs-row__initial">{reg.studentName[0]?.toUpperCase()}</div>
              <div className="admin-regs-row__info">
                <div className="admin-regs-row__name">{reg.studentName}</div>
                <div className="admin-regs-row__meta muted">{reg.eventName} · {reg.group}</div>
              </div>
              <div className="admin-regs-row__id mono">{reg.registrationId}</div>
              <div className="admin-regs-row__action">
                {reg.feePaid ? (
                  <span className="admin-regs-row__checkbox admin-regs-row__checkbox--paid">
                    <span className="admin-regs-row__checkbox-circle"><Icon.check /></span>
                    Paid
                  </span>
                ) : (
                  <button className="admin-regs-row__checkbox admin-regs-row__checkbox--unpaid" onClick={() => openConfirmForReg(reg.registrationId)}>
                    <span className="admin-regs-row__checkbox-circle" />
                    Mark paid
                  </button>
                )}
              </div>
            </div>
          ))}
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

function RegSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="admin-regs-row admin-regs-row--skeleton">
          <div className="admin-regs-row__initial admin-regs-row__initial--skeleton" />
          <div className="admin-regs-row__info">
            <div className="skeleton-line skeleton-line--name" />
            <div className="skeleton-line skeleton-line--meta" />
          </div>
          <div className="skeleton-line skeleton-line--id" />
          <div className="skeleton-line skeleton-line--badge" />
        </div>
      ))}
    </>
  );
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      style={spinning ? { animation: 'spin 0.7s linear infinite' } : undefined}
    >
      <path d="M13.5 8A5.5 5.5 0 1 1 10 3.07" />
      <path d="M10 1v3h3" />
    </svg>
  );
}
