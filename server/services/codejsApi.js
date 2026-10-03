// Optional integration seam. The MVP intentionally uses local, rule-based matching.
// It remains safe when no external service key is configured.
export async function requestCodeJs(_payload) {
  if (!process.env.CODEJS_API_KEY) return null;
  return null;
}
