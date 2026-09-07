// Cloudflare Pages Function
// Route: /api/check  (because this file lives at functions/api/check.js)
// Usage: GET /api/check?url=example.com

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function isBlockedHost(hostname) {
  const h = hostname.toLowerCase();
  if (['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(h)) return true;
  if (h.endsWith('.local')) return true;
  // very basic private-range guard (not exhaustive, but enough for this MVP)
  if (/^(10\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.)/.test(h)) return true;
  return false;
}

export async function onRequestGet(context) {
  const { request } = context;
  const { searchParams } = new URL(request.url);
  let target = (searchParams.get('url') || '').trim();

  if (!target) {
    return json({ error: 'Hianyzik az url parameter.' }, 400);
  }

  if (!/^https?:\/\//i.test(target)) {
    target = 'https://' + target;
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return json({ error: 'Ervenytelen cim.' }, 400);
  }

  if (isBlockedHost(parsed.hostname)) {
    return json({ error: 'Ez a cim nem ellenorizheto.' }, 400);
  }

  const started = Date.now();

  const doFetch = async (method) => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    try {
      return await fetch(parsed.toString(), {
        method,
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'CsakNalamBot/1.0 (+https://csaknalam.hu)' },
        cf: { cacheTtl: 0 },
      });
    } finally {
      clearTimeout(t);
    }
  };

  try {
    let resp = await doFetch('HEAD');
    if (resp.status === 405 || resp.status === 501) {
      resp = await doFetch('GET');
    }
    const latencyMs = Date.now() - started;
    return json({
      url: parsed.toString(),
      up: resp.status < 500,
      status: resp.status,
      latencyMs,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    const latencyMs = Date.now() - started;
    return json({
      url: parsed.toString(),
      up: false,
      status: null,
      error: err.name === 'AbortError' ? 'timeout' : 'network_error',
      latencyMs,
      checkedAt: new Date().toISOString(),
    });
  }
}
