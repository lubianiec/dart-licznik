// ElevenLabs CORS proxy dla dart-licznik.
// ElevenLabs blokuje wywołania wprost z przeglądarki (brak CORS) — ten Worker
// tylko dokleja nagłówki CORS i przekazuje żądanie dalej. Klucz ElevenLabs
// leci w nagłówku od klienta (z appki), Worker go NIE przechowuje.
//
// Deploy: dash.cloudflare.com → Workers & Pages → Create → Quick Edit
// → wklej całość → Deploy → skopiuj URL (https://xxx.workers.dev) do appki.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'xi-api-key, Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }
    const key = request.headers.get('xi-api-key');
    if (!key) return new Response('Brak nagłówka xi-api-key', { status: 400, headers: CORS });

    const voice = new URL(request.url).searchParams.get('voice') || '21m00Tcm4TlvDq8ikWAM';
    const body = await request.text();

    const upstream = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voice, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body,
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { ...CORS, 'Content-Type': upstream.headers.get('Content-Type') || 'audio/mpeg' },
    });
  },
};
