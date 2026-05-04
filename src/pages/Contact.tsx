import { useState } from 'react';
import { Icon } from '../data';
import './Contact.scss';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
      setName('');
      setContact('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <section className="contact-section">
        <div className="container contact-layout">
          <div>
            <div className="eyebrow contact-layout__eyebrow">Contact</div>
            <h1 className="display contact-layout__title">
              Have something
              <br />
              <span className="contact-layout__title-accent">to say?</span>
            </h1>
            <p className="contact-layout__desc">
              Have a question or just want to reach out? Feel free to contact us and we'll get back
              to you as soon as possible.
            </p>
            <div
              className="stack contact-layout__items"
              style={{ '--gap': '18px' } as React.CSSProperties}
            >
              <ContactItem label="Location" value="Tehatta, Nadia · West Bengal 741160" />
              <ContactItem label="Email" value="proyaastehatta@gmail.com" />
              <ContactItem label="Phone" value="+91 98xxx xxxxx" />
            </div>
          </div>

          <div className="card contact-form">
            <div className="display contact-form__title">Drop us a line.</div>
            <p className="small muted contact-form__desc">No long forms. Just what we need.</p>

            {status === 'success' ? (
              <div className="contact-form__success">
                <p>Thanks! We'll get back to you soon.</p>
              </div>
            ) : (
              <form
                className="stack"
                style={{ '--gap': '16px' } as React.CSSProperties}
                onSubmit={handleSubmit}
              >
                <div className="cols-2 contact-form__input-row">
                  <input
                    placeholder="Your name"
                    className="contact-form__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    placeholder="Phone or email"
                    className="contact-form__input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
                <textarea
                  placeholder="Tell us more…"
                  className="contact-form__textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                {status === 'error' && (
                  <p className="contact-form__error">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg contact-form__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : <>Send message <Icon.arrow /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="contact-item-grid">
      <div className="mono">{label}</div>
      <div className="contact-item__value">{value}</div>
    </div>
  );
}
