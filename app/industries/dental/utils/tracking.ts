declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(eventName: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, timestamp: new Date().toISOString(), ...params });
      if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
      window.dispatchEvent(new CustomEvent('dental_conversion_event', { detail: { eventName, params } }));
    }
  } catch {
    // silent
  }
}
