// ponytail: days-only resolution; switch to an ISO timestamp if sub-day expiry is ever needed
export function toDurationDays(value) {
  // 'T00:00' without a zone = local midnight, so "today" never reads as the past
  const ms = new Date(`${value}T00:00`).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return null;
  return `${Math.ceil(ms / 86400000)}d`;
}
