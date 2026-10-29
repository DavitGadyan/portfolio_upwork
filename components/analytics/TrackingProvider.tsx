'use client';
import { useEffect } from 'react';
import { track, type EventName } from '@/lib/track';

/** One delegated click listener (CV download, outbound links, language switch). Renders nothing. */
export function TrackingProvider() {
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const el = (ev.target as Element | null)?.closest?.('a, button') as HTMLElement | null;
      if (!el) return;
      const href = el.getAttribute('href') ?? '';
      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 80);
      const named = el.dataset.track as EventName | undefined;
      if (named === 'language_switch') { track('language_switch', { from: el.dataset.trackFrom ?? '', to: el.dataset.trackTo ?? '' }); return; }
      if (/\.pdf($|\?)/i.test(href)) { track('cv_download', { file_name: href.split('/').pop() ?? href, link_text: text }); return; }
      if (/^https?:\/\//i.test(href) && !href.includes(location.hostname)) {
        let host = '';
        try { host = new URL(href).hostname; } catch { /* ignore */ }
        track('outbound_click', { link_url: href, link_domain: host, link_text: text });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
