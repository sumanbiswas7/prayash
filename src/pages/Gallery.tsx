import { useState, useEffect, useCallback } from 'react';
import './Gallery.scss';

type Photo = {
  src: string;
  orientation: 'landscape' | 'portrait';
  caption?: string;
};

const photosByYear: Record<number, Photo[]> = {
  2025: [
    // Row 1: landscape | portrait
    { src: '/assets/gallery 2025/stage 4.png', orientation: 'landscape', caption: 'On stage · Quiz Medha Pariksha 2025' },
    { src: '/assets/gallery 2025/gadhadhar sir 1.png', orientation: 'portrait' },
    // Row 2: portrait | landscape
    { src: '/assets/gallery 2025/prize distribution 2 1.png', orientation: 'portrait', caption: 'Certificate distribution' },
    { src: '/assets/gallery 2025/drawing 3.png', orientation: 'landscape', caption: 'Drawing competition' },
    // Row 3: landscape | portrait
    { src: '/assets/gallery 2025/stage 3 1.png', orientation: 'landscape' },
    { src: '/assets/gallery 2025/candid 3 1.png', orientation: 'portrait' },
    // Row 4: portrait | landscape
    { src: '/assets/gallery 2025/candid 1 1.png', orientation: 'portrait' },
    { src: '/assets/gallery 2025/cholo dekhi 1.png', orientation: 'landscape' },
    // Row 5: landscape | portrait
    { src: '/assets/gallery 2025/prize distribution 3 1.png', orientation: 'landscape' },
    { src: '/assets/gallery 2025/candind 2 1.png', orientation: 'portrait' },
    // Row 6: portrait | landscape
    { src: '/assets/gallery 2025/prize distribution 4.png', orientation: 'portrait' },
    { src: '/assets/gallery 2025/drawing 2 1.png', orientation: 'landscape', caption: 'Young artists at work' },
  ],
  2024: [],
  2023: [],
};

const years = [2025, 2024, 2023];

export function Gallery() {
  const [year, setYear] = useState(2025);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next');
  const photos = photosByYear[year] ?? [];

  const navigate = useCallback(
    (step: 1 | -1) => {
      setSlideDir(step === 1 ? 'next' : 'prev');
      setLightbox((i) => (i !== null ? (i + step + photos.length) % photos.length : null));
    },
    [photos.length],
  );

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, navigate, close]);

  const activePhoto = lightbox !== null ? photos[lightbox] : null;

  return (
    <div>
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <div>
              <div className="eyebrow gallery-header__eyebrow">Gallery</div>
              <h1 className="display gallery-header__title">
                Years of <span className="gallery-header__title-accent">showing up.</span>
              </h1>
              <p className="gallery-header__desc">
                Here's a collection of moments captured at our 2025 Annual Event.
              </p>
            </div>
            <div className="gallery-year-picker">
              {years.map((y) => (
                <button
                  key={y}
                  className={`gallery-year-picker__btn ${year === y ? 'gallery-year-picker__btn--active' : 'gallery-year-picker__btn--inactive'}`}
                  onClick={() => setYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {photos.length > 0 ? (
            <div className="gallery-photo-grid">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className={`gallery-photo gallery-photo--${photo.orientation}`}
                  onClick={() => {
                    setSlideDir('next');
                    setLightbox(i);
                  }}
                >
                  <img src={photo.src} alt={photo.caption ?? 'Proyash event'} />
                  {photo.caption && (
                    <span className="gallery-photo__caption">{photo.caption}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <span className="display gallery-empty__year">{year}</span>
              <p className="gallery-empty__msg">Photos coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {activePhoto && (
        <div className="gallery-lightbox" onClick={close}>
          <button className="gallery-lightbox__close" onClick={close}>
            ×
          </button>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            ‹
          </button>

          <div
            key={lightbox}
            className={`gallery-lightbox__frame gallery-lightbox__frame--${slideDir}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activePhoto.src} alt={activePhoto.caption ?? 'Proyash event'} />
            {activePhoto.caption && (
              <div className="gallery-lightbox__caption">{activePhoto.caption}</div>
            )}
          </div>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
          >
            ›
          </button>

          <div className="gallery-lightbox__counter">
            {(lightbox ?? 0) + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
