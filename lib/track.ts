// Thin wrapper around gtag so components can report GA4 events safely.
// No-ops on the server, before gtag has loaded, or if GA is blocked.
type Params = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof g === 'function') g('event', event, params);
}
