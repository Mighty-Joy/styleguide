/**
 * Shared formatting helpers. Ported verbatim from apps/web
 * (components/Agent/creatorPlatform) so creator counts read identically.
 */

/** Compact follower count: 1_500 → "1.5K", 2_300_000 → "2.3M". */
export function formatFollowersCompact(count?: number | null): string {
  if (count == null || count === 0) return "";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}
