import { hasAnalyticsConsent } from './consent';
import { GTM_ID } from './site';

/**
 * The site has no enquiry channels of its own (it is linked from Upwork, whose terms forbid off-platform contact
 * routes), so there are no lead, booking or contact-form events: only engagement signals.
 */
export type EventParams = {
  cv_download: { file_name: string; link_text: string };
  outbound_click: { link_url: string; link_domain: string; link_text: string };
  language_switch: { from: string; to: string };
  consent_update: { analytics: 'granted' | 'denied' };
};
export type EventName = keyof EventParams;

/** Events before consent are dropped, not queued (no pre-consent data is processed). */
export function track<N extends EventName>(name: N, params: EventParams[N]) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    if (!GTM_ID) window.gtag?.('event', name, params); // with a container the dataLayer push is the trigger; gtag would count twice
  } catch {
    /* measurement must never break the page */
  }
}
