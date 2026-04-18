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
import type { Page } from './types';

export default function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  const go = (p: Page) => {
    navigate(p === 'home' ? '/' : `/${p}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div>
      <Nav setPage={go} openLogin={() => setLogin(true)} />
      <Routes>
        <Route path="/" element={<Home setPage={go} />} />
        <Route path="/events" element={<Events setPage={go} />} />
        <Route path="/register" element={<Register setPage={go} />} />
        <Route path="/dashboard" element={<Dashboard setPage={go} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer setPage={go} />
      {login && <LoginModal onClose={() => setLogin(false)} setPage={go} />}
    </div>
  );
}
