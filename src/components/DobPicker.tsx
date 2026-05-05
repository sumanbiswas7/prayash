import { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function ChevronDown() {
  return (
    <svg className="dob-picker__chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DobPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parts = value ? value.split('-') : ['', '', ''];
  const [year, setYear] = useState(parts[0]);
  const [month, setMonth] = useState(parts[1]);
  const [day, setDay] = useState(parts[2]);

  const daysInMonth = month && year ? new Date(parseInt(year), parseInt(month), 0).getDate() : 31;

  const notify = (y: string, m: string, d: string) => {
    if (y && m && d) onChange(`${y}-${m}-${d}`);
    else onChange('');
  };

  const handleMonth = (m: string) => {
    setMonth(m);
    const max = m && year ? new Date(parseInt(year), parseInt(m), 0).getDate() : 31;
    const clampedDay = day && parseInt(day) > max ? '' : day;
    if (clampedDay !== day) setDay(clampedDay);
    notify(year, m, clampedDay);
  };

  const handleDay = (d: string) => {
    setDay(d);
    notify(year, month, d);
  };

  const handleYear = (y: string) => {
    setYear(y);
    const max = month && y ? new Date(parseInt(y), parseInt(month), 0).getDate() : 31;
    const clampedDay = day && parseInt(day) > max ? '' : day;
    if (clampedDay !== day) setDay(clampedDay);
    notify(y, month, clampedDay);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - 5 - i);

  return (
    <div className="dob-picker">
      <div className="dob-picker__segment">
        <select className="dob-picker__select" value={month} onChange={(e) => handleMonth(e.target.value)}>
          <option value="">Month</option>
          {MONTHS.map((name, i) => {
            const val = String(i + 1).padStart(2, '0');
            return <option key={val} value={val}>{name}</option>;
          })}
        </select>
        <ChevronDown />
      </div>
      <div className="dob-picker__segment dob-picker__segment--sm">
        <select className="dob-picker__select" value={day} onChange={(e) => handleDay(e.target.value)}>
          <option value="">Day</option>
          {Array.from({ length: daysInMonth }, (_, i) => {
            const val = String(i + 1).padStart(2, '0');
            return <option key={val} value={val}>{i + 1}</option>;
          })}
        </select>
        <ChevronDown />
      </div>
      <div className="dob-picker__segment dob-picker__segment--sm">
        <select className="dob-picker__select" value={year} onChange={(e) => handleYear(e.target.value)}>
          <option value="">Year</option>
          {years.map((yr) => (
            <option key={yr} value={String(yr)}>{yr}</option>
          ))}
        </select>
        <ChevronDown />
      </div>
    </div>
  );
}
