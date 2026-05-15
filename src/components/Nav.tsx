import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '../data';
import type { Page, Student } from '../types';
import './Nav.scss';

interface NavProps {
  setPage: (p: Page) => void;
  openLogin: () => void;
  user: Student | null;
  onLogout: () => void;
  adminAuthed?: boolean;
  onAdminSignOut?: () => void;
}

const links: { id: Page; label: string; path: string }[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

const dashboardLink = { id: 'dashboard', label: 'Dashboard', path: '/dashboard' } as const;

export function Nav({ setPage, openLogin, user, onLogout, adminAuthed, onAdminSignOut }: NavProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setConfirmLogout(false);
    setOpen(false);
  };

  const visibleLinks = user ? [...links, dashboardLink] : links;

  useEffect(() => {
    if (!user && pathname === '/') {
      document.body.classList.add('has-register-banner');
    } else {
      document.body.classList.remove('has-register-banner');
    }
    return () => document.body.classList.remove('has-register-banner');
  }, [user, pathname]);

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <button className="nav__logo" onClick={() => navigate('home')}>
            <img src="/assets/logo.png" alt="Proyash" />
            <div className="nav__logo-text">
              <div className="en">Proyash</div>
              <div className="bn">মানবকল্যাণ সংগঠন</div>
            </div>
          </button>
          {adminAuthed && <span className="chip nav__admin-chip">Admin</span>}
          {!adminAuthed && (
            <nav className="nav__links">
              {visibleLinks.map((l) => (
                <button
                  key={l.id}
                  className={`nav__link ${pathname === l.path ? 'active' : ''}`}
                  onClick={() => navigate(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          )}
          <div className="nav__spacer" />
          <div className="nav__cta">
            {adminAuthed ? (
              <button
                className="btn btn-sm"
                onClick={onAdminSignOut}
                style={{
                  background: 'color-mix(in srgb, var(--red) 12%, transparent)',
                  color: 'var(--red)',
                  border: '1px solid color-mix(in srgb, var(--red) 25%, transparent)',
                }}
              >
                Sign out
              </button>
            ) : user ? (
              <>
                <button
                  className="nav__avatar"
                  onClick={() => navigate('dashboard')}
                  title={user.studentName}
                >
                  {user.studentName[0].toUpperCase()}
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => setConfirmLogout(true)}
                  style={{
                    background: 'color-mix(in srgb, var(--red) 12%, transparent)',
                    color: 'var(--red)',
                    border: '1px solid color-mix(in srgb, var(--red) 25%, transparent)',
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={openLogin}>
                  Log in
                </button>
                <button className="btn btn-accent btn-sm" onClick={() => navigate('register')}>
                  Register <Icon.arrow />
                </button>
              </>
            )}
          </div>
          <button
            className="nav__hamburger btn btn-ghost btn-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? (
              <Icon.close />
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {!user && pathname === '/' && (
        <div className="nav__register-banner" onClick={() => navigate('register')}>
          <span>Registrations are open</span>
          <span className="nav__register-banner-cta">Register now <Icon.arrow /></span>
        </div>
      )}

      {open && <div className="nav__backdrop" onClick={() => setOpen(false)} />}
      {open && (
        <nav className="nav__mobile-menu">
          {!adminAuthed && visibleLinks.map((l, i) => (
            <button
              key={l.id}
              className={`nav__mobile-link ${pathname === l.path ? 'active' : ''}`}
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => navigate(l.id)}
            >
              {l.label}
            </button>
          ))}
          <div className="nav__mobile-actions" style={{ '--i': adminAuthed ? 0 : visibleLinks.length } as React.CSSProperties}>
            {adminAuthed ? (
              <button
                className="btn"
                onClick={() => { onAdminSignOut?.(); setOpen(false); }}
                style={{
                  background: 'color-mix(in srgb, var(--red) 12%, transparent)',
                  color: 'var(--red)',
                  border: '1px solid color-mix(in srgb, var(--red) 25%, transparent)',
                }}
              >
                Sign out
              </button>
            ) : user ? (
              <>
                <button
                  className="nav__avatar"
                  onClick={() => navigate('dashboard')}
                  title={user.studentName}
                >
                  {user.studentName[0].toUpperCase()}
                </button>
                <button
                  className="btn"
                  onClick={() => setConfirmLogout(true)}
                  style={{
                    background: 'color-mix(in srgb, var(--red) 12%, transparent)',
                    color: 'var(--red)',
                    border: '1px solid color-mix(in srgb, var(--red) 25%, transparent)',
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    openLogin();
                    setOpen(false);
                  }}
                >
                  Log in
                </button>
                <button className="btn btn-accent" onClick={() => navigate('register')}>
                  Register <Icon.arrow />
                </button>
              </>
            )}
          </div>
        </nav>
      )}

      {confirmLogout && (
        <div className="logout-modal__overlay" onClick={() => setConfirmLogout(false)}>
          <div className="logout-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal__top">
              <div className="logout-modal__title">Logging out?</div>
              <p className="muted logout-modal__desc">
                You'll need your email and password to get back in.
              </p>
            </div>
            <div className="logout-modal__actions">
              <button className="btn btn-lg logout-modal__confirm" onClick={handleLogout}>
                Yes, log out
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setConfirmLogout(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
