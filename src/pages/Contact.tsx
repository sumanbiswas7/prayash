import { Icon } from '../data';
import './Contact.scss';

export function Contact() {
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
            <div className="stack" style={{ '--gap': '16px' } as React.CSSProperties}>
              <div className="cols-2 contact-form__input-row">
                <input
                  placeholder="Your name"
                  className="contact-form__input"
                />
                <input
                  placeholder="Phone or email"
                  className="contact-form__input"
                />
              </div>
              <textarea
                placeholder="Tell us more…"
                className="contact-form__textarea"
              />
              <button className="btn btn-primary btn-lg contact-form__submit">
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
    <div className="contact-item-grid">
      <div className="mono">{label}</div>
      <div className="contact-item__value">{value}</div>
    </div>
  );
}
