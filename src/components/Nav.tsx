import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '../data';
import type { Page } from '../types';
import './Nav.scss';

interface NavProps {
  setPage: (p: Page) => void;
  openLogin: () => void;
}

const links: { id: Page; label: string; path: string }[] = [
  { id: 'home', label: 'Home', path: '/' },
  // { id: 'events', label: 'Events', path: '/events' },
  // { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export function Nav({ setPage, openLogin }: NavProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setOpen(false);
  };

  return (
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
          {links.map((l) => (
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
          <button className="btn btn-ghost btn-sm" onClick={openLogin}>
            Log in
          </button>
          <button className="btn btn-accent btn-sm" onClick={() => navigate('register')}>
            Register <Icon.arrow />
          </button>
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
      {open && (
        <nav className="nav__mobile-menu">
          {links.map((l) => (
            <button
              key={l.id}
              className={`nav__mobile-link ${pathname === l.path ? 'active' : ''}`}
              onClick={() => navigate(l.id)}
            >
              {l.label}
            </button>
          ))}
          <div className="nav__mobile-actions">
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
          </div>
        </nav>
      )}
    </header>
  );
}
