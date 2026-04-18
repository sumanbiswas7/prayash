import type { SVGProps } from 'react';
import type { Achievement, Certificate, GalleryItem, PrayashEvent, Stat, Testimonial } from './types';

interface PrayashData {
  events: PrayashEvent[];
  achievements: Achievement[];
  certificates: Certificate[];
  stats: Stat[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
}

export const PRAYASH_DATA: PrayashData = {
  events: [
    { id: 'quiz', en: 'Quiz', bn: 'কুইজ', color: 'blue', desc: 'General knowledge, science, literature & current affairs.', slots: ['Class III–V', 'Class VI–VIII', 'Class IX–XII'], duration: '45 min', format: 'Written + Rapid round' },
    { id: 'drawing', en: 'Drawing', bn: 'অঙ্কন', color: 'orange', desc: 'On-the-spot drawing on a theme announced at the venue.', slots: ['Class I–II', 'Class III–V', 'Class VI–VIII'], duration: '90 min', format: 'Paper & colours provided' },
    { id: 'abriti', en: 'Abriti (Recitation)', bn: 'আবৃত্তি', color: 'red', desc: 'Bengali poetry recitation from our prescribed anthology.', slots: ['Class I–V', 'Class VI–X'], duration: '3 min / entry', format: 'Solo stage' },
    { id: 'essay', en: 'Essay Writing', bn: 'প্রবন্ধ', color: 'purple', desc: 'Write in Bengali or English on the year\'s chosen theme.', slots: ['Class VI–VIII', 'Class IX–XII'], duration: '75 min', format: 'Handwritten' },
    { id: 'singing', en: 'Singing', bn: 'সঙ্গীত', color: 'teal', desc: 'Rabindra sangeet, folk or modern — one song per entry.', slots: ['Under 10', 'Under 14', 'Open'], duration: '4 min / entry', format: 'Solo, harmonium allowed' },
    { id: 'handwriting', en: 'Handwriting', bn: 'হস্তাক্ষর', color: 'green', desc: 'A passage is dictated — neatness and legibility judged.', slots: ['Class I–III', 'Class IV–VI', 'Class VII–IX'], duration: '30 min', format: 'Pen & paper provided' },
    { id: 'debate', en: 'Debate', bn: 'বিতর্ক', color: 'blue', desc: 'Team debates on social issues — Bengali medium.', slots: ['Class IX–XII'], duration: '60 min / round', format: '2 vs 2 teams' },
    { id: 'spelling', en: 'Spelling Bee', bn: 'বানান প্রতিযোগিতা', color: 'orange', desc: 'Spelling in Bengali and English — elimination rounds.', slots: ['Class III–V', 'Class VI–VIII'], duration: '60 min', format: 'Oral elimination' },
    { id: 'math', en: 'Mental Math', bn: 'মানসিক অঙ্ক', color: 'red', desc: 'Quick arithmetic and reasoning — no calculator.', slots: ['Class III–V', 'Class VI–VIII'], duration: '40 min', format: 'MCQ' },
    { id: 'craft', en: 'Craft', bn: 'হস্তশিল্প', color: 'teal', desc: 'Bring a finished craft piece — judged on originality.', slots: ['Class I–V', 'Class VI–X'], duration: 'Showcase', format: 'Bring your work' },
  ],

  achievements: [
    { id: 1, event: 'Quiz', bn: 'কুইজ', year: 2025, rank: 1, medal: 'Gold', color: 'yellow', klass: 'Class IX', venue: 'Tehatta Sridham Chandra Balika Vidyalaya' },
    { id: 2, event: 'Abriti', bn: 'আবৃত্তি', year: 2025, rank: 3, medal: 'Bronze', color: 'orange', klass: 'Class IX', venue: 'Tehatta Sridham Chandra Balika Vidyalaya' },
    { id: 3, event: 'Drawing', bn: 'অঙ্কন', year: 2024, rank: 2, medal: 'Silver', color: 'teal', klass: 'Class VIII', venue: 'Tehatta Town Hall' },
    { id: 4, event: 'Essay', bn: 'প্রবন্ধ', year: 2024, rank: 1, medal: 'Gold', color: 'yellow', klass: 'Class VIII', venue: 'Tehatta Town Hall' },
  ],

  certificates: [
    { id: 'c1', title: 'Prayash Medha Pariksha 2025', bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৫', event: 'Quiz', rank: '1st Place', date: '12 Oct 2025' },
    { id: 'c2', title: 'Prayash Medha Pariksha 2025', bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৫', event: 'Abriti', rank: '3rd Place', date: '12 Oct 2025' },
    { id: 'c3', title: 'Prayash Medha Pariksha 2024', bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৪', event: 'Essay Writing', rank: '1st Place', date: '20 Oct 2024' },
    { id: 'c4', title: 'Prayash Medha Pariksha 2024', bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৪', event: 'Drawing', rank: '2nd Place', date: '20 Oct 2024' },
    { id: 'c5', title: 'Prayash Medha Pariksha 2023', bn: 'প্রয়াস মেধা পরীক্ষা — ২০২৩', event: 'Participation', rank: 'Participant', date: '15 Oct 2023' },
  ],

  stats: [
    { n: '1,240+', l: 'Books redistributed', bn: 'বই পুনর্বণ্টন' },
    { n: '420', l: 'Students supported', bn: 'ছাত্র-ছাত্রী' },
    { n: '11', l: 'Annual events hosted', bn: 'বার্ষিক উৎসব' },
    { n: '38', l: 'Partner schools', bn: 'অংশীদার বিদ্যালয়' },
  ],

  testimonials: [
    { q: 'The books I got from Prayash last year helped me clear my board exams. This year I\'m volunteering too.', who: 'Riya Das', where: 'Class XI · Tehatta', tone: 'teal' },
    { q: 'My daughter won Bronze in Abriti and now she recites at our village functions. Prayash gave her a stage.', who: 'Subhra Biswas', where: 'Parent · Karimpur', tone: 'purple' },
    { q: 'We donated 60 books from our home library. They went to a school we never knew existed, 20km away.', who: 'Anirban Ghosh', where: 'Donor · Kolkata', tone: 'blue' },
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
  arrow: (p: IconProps) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: (p: IconProps) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5 6.5 12 13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cal: (p: IconProps) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 6h12M5 2v3M11 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  pin: (p: IconProps) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 14s5-4.5 5-8.5A5 5 0 0 0 3 5.5C3 9.5 8 14 8 14Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="6" r="1.7" stroke="currentColor" strokeWidth="1.3"/></svg>,
  dl: (p: IconProps) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  book: (p: IconProps) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3h4.5a1.5 1.5 0 0 1 1.5 1.5V14m0 0H3V3Zm0 0v11m6-11h4v11H9V3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  medal: (p: IconProps) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="10" r="4" stroke="currentColor" strokeWidth="1.3"/><path d="m5 6-2-4h4m4 4 2-4H9" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  plus: (p: IconProps) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  close: (p: IconProps) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};
