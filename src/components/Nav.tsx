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
}

const links: { id: Page; label: string; path: string }[] = [
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'home', label: 'Home', path: '/' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

const dashboardLink = { id: 'dashboard', label: 'Dashboard', path: '/dashboard' } as const;

function TabIcon({ id }: { id: string }) {
  switch (id) {
    case 'home':
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 9.5L10 3l7 6.5V18h-4v-5H7v5H3V9.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'events':
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 8h14M7 2v4M13 2v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'gallery':
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect
            x="11"
            y="2"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="2"
            y="11"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="11"
            y="11"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'contact':
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'dashboard':
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function Nav({ setPage, openLogin, user, onLogout }: NavProps) {
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

  // useEffect(() => {
  //   if (!user && pathname === '/') {
  //     document.body.classList.add('has-register-banner');
  //   } else {
  //     document.body.classList.remove('has-register-banner');
  //   }
  //   return () => document.body.classList.remove('has-register-banner');
  // }, [user, pathname]);

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
          <div className="nav__spacer" />
          <div className="nav__cta">
            {user ? (
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
                {pathname !== '/register' && (
                  <button className="btn btn-accent btn-sm" onClick={() => navigate('register')}>
                    Register <Icon.arrow />
                  </button>
                )}
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

      {/* {!user && pathname === '/' && (
        <div className="nav__register-banner" onClick={() => navigate('register')}>
          <span>Registrations are open</span>
          <span className="nav__register-banner-cta">Register now <Icon.arrow /></span>
        </div>
      )} */}

      {open && <div className="nav__backdrop" onClick={() => setOpen(false)} />}
      {open && (
        <nav className="nav__mobile-menu">
          {visibleLinks.map((l) => (
            <button
              key={l.id}
              className={`nav__mobile-link ${pathname === l.path ? 'active' : ''}`}
              onClick={() => navigate(l.id)}
            >
              {l.label}
            </button>
          ))}
          <div className="nav__mobile-actions">
            {user ? (
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

      <nav className="nav__bottom-bar">
        {visibleLinks.map((l) => (
          <button
            key={l.id}
            className={`nav__bottom-tab ${pathname === l.path ? 'active' : ''}`}
            onClick={() => navigate(l.id)}
          >
            <span className="nav__bottom-tab-icon">
              <TabIcon id={l.id} />
            </span>
            <span className="nav__bottom-tab-label">{l.label}</span>
          </button>
        ))}
        {!user && (
          <button className="nav__bottom-tab" onClick={openLogin}>
            <span className="nav__bottom-tab-icon">
              <TabIcon id="login" />
            </span>
            <span className="nav__bottom-tab-label">Login</span>
          </button>
        )}
      </nav>

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
