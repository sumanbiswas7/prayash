import type { SVGProps } from 'react';
import type {
  Achievement,
  Certificate,
  GalleryItem,
  ProyashEvent,
  Stat,
  Testimonial,
} from './types';

interface ProyashData {
  events: ProyashEvent[];
  achievements: Achievement[];
  certificates: Certificate[];
  stats: Stat[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
}

export const PROYASH_DATA: ProyashData = {
  events: [
    {
      id: 'quiz',
      en: 'Quiz',
      bn: 'কুইজ',
      color: 'blue',
      desc: 'General knowledge, science, literature & current affairs.',
      slots: ['Class III–V', 'Class VI–VIII', 'Class IX–XII'],
      duration: '45 min',
      format: 'Written + Rapid round',
    },
    {
      id: 'drawing',
      en: 'Drawing',
      bn: 'অঙ্কন',
      color: 'orange',
      desc: 'Drawing on a theme announced beforehand.',
      slots: ['Class I–II', 'Class III–V', 'Class VI–VIII'],
      duration: '90 min',
      format: 'Paper & colours provided',
    },
    {
      id: 'abriti',
      en: 'Abriti (Recitation)',
      bn: 'আবৃত্তি',
      color: 'red',
      desc: 'Bengali poetry recitation from our prescribed anthology.',
      slots: ['Class I–V', 'Class VI–X'],
      duration: '3 min / entry',
      format: 'Solo stage',
    },
    {
      id: 'essay',
      en: 'Essay Writing',
      bn: 'প্রবন্ধ',
      color: 'purple',
      desc: "Write in Bengali or English on the year's chosen theme.",
      slots: ['Class VI–VIII', 'Class IX–XII'],
      duration: '75 min',
      format: 'Handwritten',
    },
    {
      id: 'debate',
      en: 'Debate',
      bn: 'বিতর্ক',
      color: 'blue',
      desc: 'Team debates on social issues — Bengali medium.',
      slots: ['Class IX–XII'],
      duration: '60 min / round',
      format: '2 vs 2 teams',
    },
    {
      id: 'golpo',
      en: 'Golpo Lekha (Story Writing)',
      bn: 'গল্প লেখা',
      color: 'teal',
      desc: 'Write an original story in Bengali on a given theme.',
      slots: ['Class I–V', 'Class VI–VIII'],
      duration: '60 min',
      format: 'Handwritten',
    },
    {
      id: 'khobor',
      en: 'Khobor Path (News Reading)',
      bn: 'খবর পাঠ',
      color: 'yellow',
      desc: 'Read a news passage aloud with clarity and expression.',
      slots: ['Class I–V', 'Class VI–VIII', 'Class IX–XII'],
      duration: '5 min / entry',
      format: 'Solo stage',
    },
  ],

  achievements: [
    {
      id: 1,
      event: 'Quiz',
      bn: 'কুইজ',
      year: 2025,
      rank: 1,
      medal: 'Gold',
      color: 'yellow',
      klass: 'Class IX',
      venue: 'Tehatta Sridham Chandra Balika Vidyalaya',
    },
    {
      id: 2,
      event: 'Abriti',
      bn: 'আবৃত্তি',
      year: 2025,
      rank: 3,
      medal: 'Bronze',
      color: 'orange',
      klass: 'Class IX',
      venue: 'Tehatta Sridham Chandra Balika Vidyalaya',
    },
    {
      id: 3,
      event: 'Drawing',
      bn: 'অঙ্কন',
      year: 2024,
      rank: 2,
      medal: 'Silver',
      color: 'teal',
      klass: 'Class VIII',
      venue: 'Tehatta Town Hall',
    },
    {
      id: 4,
      event: 'Golpo Lekha',
      bn: 'গল্প লেখা',
      year: 2024,
      rank: 1,
      medal: 'Gold',
      color: 'yellow',
      klass: 'Class VIII',
      venue: 'Tehatta Town Hall',
    },
    {
      id: 5,
      event: 'Khobor Path',
      bn: 'খবর পাঠ',
      year: 2024,
      rank: 2,
      medal: 'Silver',
      color: 'teal',
      klass: 'Class X',
      venue: 'Tehatta Town Hall',
    },
  ],

  certificates: [
    {
      id: 'c1',
      title: 'Proyash Medha Pariksha 2025',
      bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৫',
      event: 'Quiz',
      rank: '1st Place',
      date: '12 Oct 2025',
    },
    {
      id: 'c2',
      title: 'Proyash Medha Pariksha 2025',
      bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৫',
      event: 'Abriti',
      rank: '3rd Place',
      date: '12 Oct 2025',
    },
    {
      id: 'c3',
      title: 'Proyash Medha Pariksha 2024',
      bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৪',
      event: 'Essay Writing',
      rank: '1st Place',
      date: '20 Oct 2024',
    },
    {
      id: 'c4',
      title: 'Proyash Medha Pariksha 2024',
      bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৪',
      event: 'Drawing',
      rank: '2nd Place',
      date: '20 Oct 2024',
    },
    {
      id: 'c5',
      title: 'Proyash Medha Pariksha 2023',
      bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৩',
      event: 'Participation',
      rank: 'Participant',
      date: '15 Oct 2023',
    },
  ],

  stats: [
    { n: '500+', l: 'Books redistributed', bn: 'বই পুনর্বণ্টন' },
    { n: '200+', l: 'Students supported', bn: 'ছাত্র-ছাত্রী' },
    { n: '7', l: 'Annual events hosted', bn: 'বার্ষিক উৎসব' },
    { n: '20+', l: 'Active Volunteers', bn: 'স্বেচ্ছাসেবক' },
  ],

  testimonials: [
    // {
    //   q: "প্রয়াসকে অনেক ধন্যবাদ এই ধরনের প্রতিযোগিতা অনুষ্ঠিত করার জন্য...... আগামীতে প্রয়াস আরো এগিয়ে চলুক.....",
    //   who: 'Ipsita De',
    //   where: 'Tehatta',
    //   tone: 'teal',
    // },
    {
      q: 'প্রয়াসকে অনেক ধন্যবাদ...... আমাদের ছেলেমেয়েদের  প্রতিভা খুঁজে বের করার জন্য...... প্রতিযোগিতার বিষয়ের অভিনবত্বের জন্য..... প্রয়াসের জন্য অনেক শুভকামনা রইল....',
      who: 'Ipsita De',
      where: 'Tehatta',
      tone: 'teal',
    },
    {
      q: 'আমরা জানি মেধাবী ছাত্রদের কাছে `প্রয়াস  অনুপ্রেরনার প্রতীক |অশেষ ধন্যবাদ প্রয়াস কে',
      who: 'Ashis Biswas',
      where: 'Parent · Tehatta',
      tone: 'purple',
    },
    {
      q: 'অভিনন্দন ও শুভকামনা রইল। এইভাবে সকলের পাশে থাকবেন। প্রয়াসকে অনেক অনেক ভালোবাসা ও শুভেচ্ছা রইল। ❤️❤️💙💙💚💚💚',
      who: 'Mafizul Rahaman Mondal',
      where: 'Tehatta · Public Figure',
      tone: 'blue',
    },
  ],

  gallery: [
    { caption: 'Medha Pariksha 2025 — opening ceremony', label: 'PHOTO · WIDE' },
    { caption: 'Drawing competition in progress', label: 'PHOTO · 4:3' },
    { caption: 'Abriti stage, Class VI–X round', label: 'PHOTO · PORTRAIT' },
    { caption: 'Volunteers sorting donated books', label: 'PHOTO · 4:3' },
    { caption: 'Prize distribution', label: 'PHOTO · WIDE' },
    { caption: 'Students at a partner school', label: 'PHOTO · 4:3' },
  ],
};

type IconProps = SVGProps<SVGSVGElement>;

export const Icon = {
  arrow: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path
        d="M3 8h10m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path
        d="M3 8.5 6.5 12 13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cal: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M2 6h12M5 2v3M11 2v3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path
        d="M8 14s5-4.5 5-8.5A5 5 0 0 0 3 5.5C3 9.5 8 14 8 14Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="6" r="1.7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  dl: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path
        d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  book: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path
        d="M3 3h4.5a1.5 1.5 0 0 1 1.5 1.5V14m0 0H3V3Zm0 0v11m6-11h4v11H9V3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  medal: (p: IconProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <circle cx="8" cy="10" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="m5 6-2-4h4m4 4 2-4H9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  plus: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};
