// Optional external "CodeJS"-style API wrapper.
// The app works 100% without it — every function here degrades gracefully.

const CODEJS_KEY = process.env.CODEJS_API_KEY || '';
const CODEJS_URL = process.env.CODEJS_API_URL || '';

export async function lookupLocalSecret(placeName) {
  if (!CODEJS_KEY || !CODEJS_URL) {
    return { ok: false, fallback: true, note: 'CodeJS key missing — using local content only.' };
  }
  try {
    const res = await fetch(`${CODEJS_URL}?query=${encodeURIComponent(placeName)}`, {
      headers: { Authorization: `Bearer ${CODEJS_KEY}` },
    });
    if (!res.ok) throw new Error(`CodeJS responded ${res.status}`);
    return await res.json();
  } catch (err) {
    return { ok: false, fallback: true, error: err.message };
  }
}

export const codejsAvailable = () => Boolean(CODEJS_KEY && CODEJS_URL);
