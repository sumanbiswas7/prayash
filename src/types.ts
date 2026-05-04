export type Page = 'home' | 'events' | 'register' | 'dashboard' | 'gallery' | 'contact';

export interface ProyashEvent {
  id: string;
  en: string;
  bn: string;
  color: string;
  desc: string;
  slots: string[];
  duration: string;
  format: string;
}

export interface Achievement {
  id: number;
  event: string;
  bn: string;
  year: number;
  rank: number;
  medal: string;
  color: string;
  klass: string;
  venue: string;
}

export interface Certificate {
  id: string;
  title: string;
  bn: string;
  event: string;
  rank: string;
  date: string;
}

export interface Stat {
  n: string;
  l: string;
  bn: string;
}

export interface Testimonial {
  q: string;
  who: string;
  where: string;
  tone: string;
}

export interface GalleryItem {
  caption: string;
  label: string;
}
