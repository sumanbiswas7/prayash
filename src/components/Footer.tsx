import type { Page } from '../types';
import './Footer.scss';

interface FooterProps {
  setPage: (p: Page) => void;
}

export function Footer({ setPage }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <img src="/assets/logo.png" className="footer__logo" alt="Proyash" />
              <div>
                <div className="footer__brand-name display">Proyash</div>
                <div className="footer__brand-tagline bn">আমরা থাকবো আগামীর স্বপ্নে</div>
              </div>
            </div>
            <p className="footer__desc">
              A community-run welfare organisation based in Tehatta, Nadia — supporting students
              through books, mentorship and an annual merit festival.
            </p>
          </div>
          <div>
            <div className="footer__col-heading">Explore</div>
            <div className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
              <div>
                <a onClick={() => setPage('events')} className="footer__nav-link">
                  Events
                </a>
              </div>
              <div>
                <a onClick={() => setPage('register')} className="footer__nav-link">
                  Register
                </a>
              </div>
              <div>
                <a onClick={() => setPage('gallery')} className="footer__nav-link">
                  Gallery
                </a>
              </div>
              <div>
                <a onClick={() => setPage('dashboard')} className="footer__nav-link">
                  Dashboard
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="footer__col-heading">Get involved</div>
            <div className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
              <div>Donate books</div>
              <div>Volunteer</div>
              <div>Partner schools</div>
              <div>Mentor programme</div>
            </div>
          </div>
          <div>
            <div className="footer__col-heading">Reach us</div>
            <div
              className="stack footer__contact-stack"
              style={{ '--gap': '10px' } as React.CSSProperties}
            >
              <div>Tehatta, Nadia</div>
              <div>West Bengal, 741160</div>
              <div>hello@proyash.org.in</div>
              <div>+91 98xxx xxxxx</div>
            </div>
          </div>
        </div>
        <hr className="footer__divider" />
        <div className="footer__bottom">
          <div>© 2026 Proyash Manab Kalyan Sangathan · Reg. S/2L/12489</div>
          <div>Built with care in Nadia</div>
        </div>
      </div>
    </footer>
  );
}
