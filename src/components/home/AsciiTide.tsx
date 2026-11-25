'use client';

import { useEffect, useRef } from 'react';

const RAMP = ' .:-~=+*#%';
const FONT_SIZE = 14;
const LINE = 18;
const FPS = 24;

// Animated ASCII "tide" for the hero: layered sine waves (a nod to the Batangas coast and AGOS)
// with a ripple that follows the pointer. Decorative only: aria-hidden, paused off-screen,
// and a single still frame when the visitor prefers reduced motion.
export function AsciiTide() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;
    const pointerArea = host.closest('.hero-banner') ?? host;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let cols = 0;
    let rows = 0;
    let cellWidth = FONT_SIZE * 0.667;
    let pointerX = -1e4;
    let pointerY = -1e4;
    let lastFrame = 0;
    let raf = 0;
    let onScreen = true;

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < rows; y++) {
        let line = '';
        for (let x = 0; x < cols; x++) {
          // Rolling crests whose phase bends along x; squaring keeps troughs nearly empty so the bands read as waves.
          const crest = (Math.sin(y * 0.42 + 2.6 * Math.sin(x * 0.05 + t * 0.7) - t * 1.4) + 1) / 2;
          const swell = 0.12 * Math.sin(x * 0.13 - y * 0.21 + t * 0.5);
          const distance = Math.hypot(x - pointerX, (y - pointerY) * (LINE / cellWidth));
          const ripple = 0.5 * Math.sin(distance * 0.5 - t * 4) * Math.exp(-distance * 0.09);
          const level = Math.min(0.999, Math.max(0, crest ** 2.2 + swell + ripple));
          line += RAMP[Math.floor(level * RAMP.length)];
        }
        ctx.fillText(line, 0, y * LINE);
      }
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = host.getBoundingClientRect();
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.font = `700 ${FONT_SIZE}px Monocraft, ui-monospace, monospace`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgb(255 255 255 / .5)';
      cellWidth = ctx.measureText('M').width || cellWidth;
      cols = Math.ceil(width / cellWidth);
      rows = Math.ceil(height / LINE);
      draw(lastFrame);
    };

    const loop = (time: number) => {
      raf = 0;
      if (!onScreen || reducedMotion.matches) return;
      if (time - lastFrame >= 1000 / FPS) {
        lastFrame = time;
        draw(time);
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && onScreen && !reducedMotion.matches) raf = requestAnimationFrame(loop); };

    const onPointerMove = (event: Event) => {
      const { clientX, clientY } = event as PointerEvent;
      const bounds = host.getBoundingClientRect();
      pointerX = (clientX - bounds.left) / cellWidth;
      pointerY = (clientY - bounds.top) / LINE;
    };
    const onPointerLeave = () => { pointerX = -1e4; pointerY = -1e4; };
    const onMotionChange = () => { draw(lastFrame); start(); };

    const resizeObserver = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; start(); });
    pointerArea.addEventListener('pointermove', onPointerMove);
    pointerArea.addEventListener('pointerleave', onPointerLeave);
    reducedMotion.addEventListener('change', onMotionChange);

    // Wait for the blocky font so the first frame is not drawn in a fallback face.
    document.fonts.load(`700 ${FONT_SIZE}px Monocraft`).catch(() => undefined).finally(() => {
      resizeObserver.observe(host);
      visibility.observe(host);
      start();
    });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      pointerArea.removeEventListener('pointermove', onPointerMove);
      pointerArea.removeEventListener('pointerleave', onPointerLeave);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-field" aria-hidden="true" />;
}
