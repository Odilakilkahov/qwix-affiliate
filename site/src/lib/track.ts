export function trackAffiliateClick(slug: string) {
  const endpoint = import.meta.env.PUBLIC_TRACK_ENDPOINT;
  if (!endpoint) return;
  const payload = JSON.stringify({ type: 'affiliate_click', slug, path: window.location.pathname, at: new Date().toISOString() });
  void fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: payload, keepalive: true }).catch(() => undefined);
}
