'use client';

import Image from 'next/image';
import { Bot, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { drawRobot, type Look, type Mood } from './robotArt';

const replies = ['beep boop!', 'Hello, human!', '01101000 01101001 (that means hi)', '*happy whirring*', 'Systems nominal. Vibes: excellent.'];
const TICK_MS = 150;

// The antenna light and the heart pick up the tint color.
const colorize = (line: string): ReactNode[] => line.split(/(\([*.]\)|<3)/).map((part, i) => (i % 2 ? <span className="robot-accent" key={i}>{part}</span> : part));

export function PortraitRobot() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const robotRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const [mood, setMood] = useState<Mood>('idle');
  const [look, setLook] = useState<Look>('center');
  const [message, setMessage] = useState('');

  // Blink, antenna and arm frames. Skipped entirely for reduced motion: poses still change, nothing loops.
  useEffect(() => {
    if (!open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((n) => n + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [open]);

  // Moods wear off after a moment.
  useEffect(() => {
    if (mood === 'idle') return;
    const id = window.setTimeout(() => setMood('idle'), 2200);
    return () => window.clearTimeout(id);
  }, [mood, message]);

  // Eyes follow the pointer (mouse, pen, or the last touch).
  useEffect(() => {
    if (!open) return;
    const follow = (event: PointerEvent) => {
      const box = robotRef.current?.getBoundingClientRect();
      if (!box) return;
      const dx = event.clientX - (box.left + box.width / 2);
      setLook(dx < -40 ? 'left' : dx > 40 ? 'right' : 'center');
    };
    window.addEventListener('pointermove', follow);
    window.addEventListener('pointerdown', follow);
    return () => {
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('pointerdown', follow);
    };
  }, [open]);

  const react = (nextMood: Mood, line?: string) => {
    setMood(nextMood);
    setMessage(line ?? replies[Math.floor(Math.random() * replies.length)]);
  };

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    setMood('wave');
    setMessage('Hi! Poke me, or try the buttons.');
  };

  return <div className="portrait-wrap">
    <button className="portrait-button" type="button" onClick={show} aria-haspopup="dialog" aria-label="Portrait of Kyle Andrew Masilang. Open robot mode">
      <span className="portrait"><Image src="/images/kyle-portrait.png" alt="" fill priority sizes="(max-width: 420px) 148px, (max-width: 700px) 168px, (max-width: 1000px) 220px, 264px" /></span>
      <span className="portrait-badge glass" aria-hidden="true"><Bot size={20} /></span>
    </button>

    {/* Native modal dialog: focus trap, Escape to close, and focus returns to the photo. */}
    <dialog ref={dialogRef} className="robot-sheet" aria-labelledby="robot-title" onClose={() => { setOpen(false); setMood('idle'); }} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
      <div className="robot-sheet-inner">
        <span className="sheet-grabber" aria-hidden="true" />
        <header className="robot-header">
          <h2 id="robot-title">Robot mode</h2>
          <button className="robot-close glass" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close robot mode"><X size={20} aria-hidden="true" /></button>
        </header>
        <p className="robot-bubble" aria-live="polite">{message}</p>
        <button ref={robotRef} className="robot" type="button" onClick={() => react('wave')} aria-label="Poke the robot">
          <pre aria-hidden="true">{drawRobot(tick, mood, look).map((line, i) => <span key={i}>{colorize(line)}{'\n'}</span>)}</pre>
        </button>
        <div className="robot-actions">
          <button className="capsule-button capsule-filled" type="button" onClick={() => react('wave', 'o/ Hi there!')}>Wave</button>
          <button className="capsule-button capsule-gray" type="button" onClick={() => react('dance', '*does the robot*')}>Dance</button>
        </div>
      </div>
    </dialog>
  </div>;
}
