'use client';

import { useSyncExternalStore } from 'react';

// "HH:MM" in Batangas (24h). A primitive snapshot, so React only re-renders when the minute changes.
const manila = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
};

const numerals = Array.from({ length: 12 }, (_, i) => i + 1);

// World Clock style widget face. The server renders the dial without hands, so hydration never mismatches.
export function WorldClock({ city }: { city: string }) {
  const time = useSyncExternalStore(subscribe, () => manila.format(new Date()), () => null);
  const [hours, minutes] = time ? time.split(':').map(Number) : [0, 0];
  const label = time ? `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}` : '';

  return <>
    <svg className="clock-face" viewBox="0 0 100 100" role="img" aria-label={time ? `Local time in ${city}: ${label}` : `Local time in ${city}`}>
      <circle className="clock-dial" cx="50" cy="50" r="49" />
      {numerals.map((n) => {
        const angle = (n / 12) * 2 * Math.PI;
        return <text className="clock-num" key={n} x={50 + 38 * Math.sin(angle)} y={50 - 38 * Math.cos(angle)}>{n}</text>;
      })}
      {time && <>
        <line className="clock-hand clock-hand-hour" x1="50" y1="50" x2="50" y2="27" transform={`rotate(${(hours % 12) * 30 + minutes / 2} 50 50)`} />
        <line className="clock-hand clock-hand-minute" x1="50" y1="50" x2="50" y2="17" transform={`rotate(${minutes * 6} 50 50)`} />
      </>}
      <circle className="clock-pin" cx="50" cy="50" r="3" />
    </svg>
    <div>
      <p className="widget-title">{city}</p>
      <p className="widget-time" aria-hidden="true">{label || ' '}</p>
    </div>
  </>;
}
