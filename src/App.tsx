import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';
import type { Page, Student } from './types';

export default function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<Student | null>(() => {
    try {
      const stored = localStorage.getItem('proyash_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const saveUser = (u: Student | null) => {
    if (u) localStorage.setItem('proyash_user', JSON.stringify(u));
    else localStorage.removeItem('proyash_user');
    setUser(u);
  };

  const go = (p: Page) => {
    navigate(p === 'home' ? '/' : `/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div>
      <Nav
        setPage={go}
        openLogin={() => setLogin(true)}
        user={user}
        onLogout={() => saveUser(null)}
      />
      <Routes>
        <Route path="/" element={<Home setPage={go} />} />
        <Route path="/events" element={<Events setPage={go} />} />
        <Route path="/register" element={<Register setPage={go} onRegister={(student) => saveUser(student)} />} />
        <Route path="/dashboard" element={<Dashboard setPage={go} user={user} onUpdate={saveUser} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth setPage={go} onLogin={(student) => saveUser(student)} />} />
      </Routes>
      <Footer setPage={go} />
      {login && <LoginModal onClose={() => setLogin(false)} setPage={go} onLogin={(student) => { saveUser(student); }} />}
    </div>
  );
}
