'use client';

import { useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react';

const hues = ['blue', 'purple', 'forest', 'rose'] as const;

export function HeroSurface({ children }: { children: ReactNode }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [hueIndex, setHueIndex] = useState(0);
  const [changes, setChanges] = useState(0);
  const hue = hues[hueIndex];

  const cycleHue = () => {
    setHueIndex((index) => (index + 1) % hues.length);
    setChanges((count) => count + 1);
  };

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
    {/* Alternating data-bump restarts the squash animation on every change without remounting (keeps keyboard focus). */}
    <button className="island" type="button" data-bump={changes ? changes % 2 : undefined} onClick={(event) => { event.stopPropagation(); cycleHue(); }} aria-label={`Change hero color. Current color: ${hue}.`}>
      <span className="island-swatch" aria-hidden="true" /><span aria-hidden="true">{hue}</span>
    </button>
    <span className="sr-only" aria-live="polite">Hero color: {hue}.</span>
    {/* After the chip in DOM order so keyboard focus matches the visual top-to-bottom order. */}
    {children}
  </div>;
}
