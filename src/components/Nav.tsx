import { useLocation } from 'react-router-dom';
import { Icon } from '../data';
import type { Page } from '../types';

interface NavProps {
  setPage: (p: Page) => void;
  openLogin: () => void;
}

const links: { id: Page; label: string; path: string }[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'register', label: 'Register', path: '/register' },
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export function Nav({ setPage, openLogin }: NavProps) {
  const { pathname } = useLocation();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <button className="nav-logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <img src="/assets/logo.png" alt="Prayash" />
          <div className="nav-logo-text">
            <div className="en">Prayash</div>
            <div className="bn">প্রয়াস · মানবকল্যাণ সংগঠন</div>
          </div>
        </button>
        <nav className="nav-links">
          {links.map(l => (
            <button key={l.id} className={`nav-link ${pathname === l.path ? 'active' : ''}`} onClick={() => setPage(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-spacer" />
        <button className="btn btn-ghost btn-sm" onClick={openLogin}>Log in</button>
        <button className="btn btn-accent btn-sm" onClick={() => setPage('register')}>
          Register <Icon.arrow />
        </button>
      </div>
    </header>
  );
}
