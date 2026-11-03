'use client';

import { useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react';

const hues = ['purple', 'indigo', 'forest', 'rose'] as const;

export function HeroSurface({ children }: { children: ReactNode }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [hueIndex, setHueIndex] = useState(0);
  const hue = hues[hueIndex];

  const cycleHue = () => setHueIndex((index) => (index + 1) % hues.length);

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !bannerRef.current) return;
    const bounds = bannerRef.current.getBoundingClientRect();
    bannerRef.current.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
    bannerRef.current.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
  };

  const handleBannerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('.portrait-wrap, button, a')) return;
    if (window.getSelection()?.toString()) return;
    cycleHue();
  };

  return <div ref={bannerRef} className="hero-banner" data-hue={hue} onPointerMove={followPointer} onClick={handleBannerClick}>
    {children}
    <button className="hero-hue-keyboard" type="button" onClick={(event) => { event.stopPropagation(); cycleHue(); }} aria-label={`Change hero color. Current color: ${hue}.`}>Change color</button>
    <span className="sr-only" aria-live="polite">Hero color: {hue}.</span>
  </div>;
}
