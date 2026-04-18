import { Icon } from '../data';

export function Contact() {
  return (
    <div>
      <section style={{ padding: '72px 0 80px' }}>
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60 }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Contact
            </div>
            <h1
              className="display"
              style={{ fontSize: 'clamp(44px, 5.5vw, 72px)', margin: 0, lineHeight: 1 }}
            >
              We read every
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--teal)', fontWeight: 400 }}>
                message.
              </span>
            </h1>
            <p style={{ marginTop: 20, color: 'var(--ink-2)', fontSize: 17, maxWidth: 460 }}>
              For book donations, school partnerships, volunteering, or media — write to us. We
              usually reply within two days.
            </p>
            <div
              className="stack"
              style={{ '--gap': '18px', marginTop: 40 } as React.CSSProperties}
            >
              <ContactItem label="Office" value="Tehatta, Nadia · West Bengal 741160" />
              <ContactItem label="Email" value="hello@prayash.org.in" />
              <ContactItem label="Phone" value="+91 98xxx xxxxx · 10am–7pm, Mon–Sat" />
              <ContactItem
                label="Book pickup"
                value="For donations within Nadia, we come to you."
              />
            </div>
          </div>

          <div className="card" style={{ padding: 32 }}>
            <div className="display" style={{ fontSize: 24, marginBottom: 4 }}>
              Drop us a line.
            </div>
            <p className="small muted" style={{ marginTop: 0, marginBottom: 24 }}>
              No long forms. Just what we need.
            </p>
            <div className="stack" style={{ '--gap': '16px' } as React.CSSProperties}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input
                  placeholder="Your name"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid var(--rule)',
                    background: 'var(--paper)',
                    fontSize: 15,
                  }}
                />
                <input
                  placeholder="Phone or email"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid var(--rule)',
                    background: 'var(--paper)',
                    fontSize: 15,
                  }}
                />
              </div>
              <select
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--rule)',
                  background: 'var(--paper)',
                  fontSize: 15,
                }}
              >
                <option>What's this about?</option>
                <option>Donating books</option>
                <option>Volunteering</option>
                <option>School partnership</option>
                <option>Event question</option>
                <option>Other</option>
              </select>
              <textarea
                placeholder="Tell us more…"
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--rule)',
                  background: 'var(--paper)',
                  fontSize: 15,
                  minHeight: 130,
                  resize: 'vertical',
                }}
              />
              <button className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>
                Send message <Icon.arrow />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        gap: 20,
        padding: '14px 0',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div className="mono">{label}</div>
      <div style={{ fontWeight: 500 }}>{value}</div>
    </div>
  );
}
