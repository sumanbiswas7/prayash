import type { Page } from '../types';

interface FooterProps {
  setPage: (p: Page) => void;
}

export function Footer({ setPage }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <img src="/assets/logo.png" style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', padding: 2 }} />
              <div>
                <div className="display" style={{ fontSize: 22 }}>Prayash</div>
                <div className="bn" style={{ fontSize: 12, opacity: .7 }}>আমরা থাকবো আগামীর স্বপ্নে</div>
              </div>
            </div>
            <p style={{ opacity: .72, maxWidth: 340, fontSize: 14 }}>
              A community-run welfare organisation based in Tehatta, Nadia — supporting students through books, mentorship and an annual merit festival.
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Explore</div>
            <div className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
              <div><a onClick={() => setPage('events')} style={{ cursor: 'pointer' }}>Events</a></div>
              <div><a onClick={() => setPage('register')} style={{ cursor: 'pointer' }}>Register</a></div>
              <div><a onClick={() => setPage('gallery')} style={{ cursor: 'pointer' }}>Gallery</a></div>
              <div><a onClick={() => setPage('dashboard')} style={{ cursor: 'pointer' }}>Dashboard</a></div>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Get involved</div>
            <div className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
              <div>Donate books</div>
              <div>Volunteer</div>
              <div>Partner schools</div>
              <div>Mentor programme</div>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Reach us</div>
            <div className="stack" style={{ '--gap': '10px', fontSize: 14, opacity: .8 } as React.CSSProperties}>
              <div>Tehatta, Nadia</div>
              <div>West Bengal, 741160</div>
              <div>hello@prayash.org.in</div>
              <div>+91 98xxx xxxxx</div>
            </div>
          </div>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.12)', margin: '48px 0 20px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: .55 }}>
          <div>© 2026 Prayash Manab Kalyan Sangathan · Reg. S/2L/12489</div>
          <div>Built with care in Nadia</div>
        </div>
      </div>
    </footer>
  );
}
