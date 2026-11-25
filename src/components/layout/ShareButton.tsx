'use client';

import { useEffect, useState } from 'react';
import { Check, Share } from 'lucide-react';

// Opens the native share sheet on iPhone (and other browsers that support it); otherwise copies the link and shows an iOS-style HUD.
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* the visitor closed the share sheet */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch { /* clipboard unavailable; nothing else to fall back to */ }
  };

  return <>
    <button className="share-button glass" type="button" onClick={share} aria-label={`Share ${title}`}><Share size={20} aria-hidden="true" /></button>
    <span className="sr-only" role="status">{copied ? 'Link copied' : ''}</span>
    {copied && <div className="hud glass" aria-hidden="true"><Check size={28} aria-hidden="true" />Link copied</div>}
  </>;
}
