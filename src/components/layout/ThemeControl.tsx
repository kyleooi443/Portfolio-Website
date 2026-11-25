'use client';

import { useSyncExternalStore, type CSSProperties } from 'react';
import { Contrast, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'Auto', icon: Contrast },
];

// Runs in <head> before first paint so a saved choice never flashes the wrong theme.
export const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener('themechange', onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener('themechange', onChange);
  };
};

const readTheme = (): Theme => {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : 'system';
  } catch {
    return 'system';
  }
};

function applyTheme(theme: Theme) {
  try {
    if (theme === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', theme);
  } catch { /* private mode: the choice still applies for this visit */ }
  const root = document.documentElement;
  if (theme === 'system') delete root.dataset.theme;
  else root.dataset.theme = theme;
  // Keep Safari's toolbar tint in step with the page.
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    const dark = theme === 'dark' || (theme === 'system' && (meta.getAttribute('media') ?? '').includes('dark'));
    meta.setAttribute('content', dark ? '#000000' : '#F2F2F7');
  }
  window.dispatchEvent(new Event('themechange'));
}

// iOS segmented control built on native radios, so arrow keys and screen readers work without extra code.
export function ThemeControl({ name, compact = false }: { name: string; compact?: boolean }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'system' as Theme);
  const index = options.findIndex((option) => option.value === theme);
  return <fieldset className={`segmented${compact ? ' segmented-compact' : ''}`} style={{ '--i': index } as CSSProperties}>
    <legend className="sr-only">Appearance</legend>
    {options.map(({ value, label, icon: Icon }) => <label key={value} title={compact ? label : undefined}>
      <input className="sr-only" type="radio" name={name} value={value} checked={theme === value} onChange={() => applyTheme(value)} />
      <Icon size={16} aria-hidden="true" />
      <span className={compact ? 'sr-only' : undefined}>{label}</span>
    </label>)}
  </fieldset>;
}
