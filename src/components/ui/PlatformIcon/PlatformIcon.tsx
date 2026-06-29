import React from "react";

/**
 * Canonical brand-colored social platform glyph. Inline SVG — Instagram in its
 * purple→pink→orange gradient, TikTok with its offset cyan/magenta mark, YouTube
 * in red — so platform glyphs read as recognizable brand marks instead of flat
 * grey icons.
 *
 * Decorative by default (`aria-hidden`) — the platform is conveyed by the
 * surrounding handle/label/count. Use this everywhere a platform glyph appears
 * (CreatorIdentity, CreatorPlatformChips, record cells) so it stays consistent.
 *
 * Ported from apps/web `components/ui/PlatformIcon` — pure SVG, no deps.
 */
export type PlatformKey = "instagram" | "tiktok" | "youtube" | string;

interface PlatformIconProps {
  platform: PlatformKey;
  size?: number;
  /** Set a label to make the glyph non-decorative (e.g. when it stands alone). */
  label?: string;
}

const TIKTOK_PATH =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

function normalize(
  platform: string,
): "instagram" | "tiktok" | "youtube" | null {
  const p = platform.toLowerCase();
  if (p.startsWith("insta") || p === "ig") return "instagram";
  if (p.startsWith("tik")) return "tiktok";
  if (p.startsWith("you") || p === "yt") return "youtube";
  return null;
}

export function PlatformIcon({ platform, size = 14, label }: PlatformIconProps) {
  const key = normalize(platform);
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    role: label ? ("img" as const) : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: { flexShrink: 0, display: "block" as const },
  };

  if (key === "instagram") {
    return (
      <svg {...common} fill="none">
        <defs>
          <linearGradient
            id="pi-ig-grad"
            x1="2"
            y1="22"
            x2="22"
            y2="2"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEDA75" />
            <stop offset=".25" stopColor="#FA7E1E" />
            <stop offset=".5" stopColor="#D62976" />
            <stop offset=".75" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5.5"
          stroke="url(#pi-ig-grad)"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4.5"
          stroke="url(#pi-ig-grad)"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.4" fill="url(#pi-ig-grad)" />
      </svg>
    );
  }

  if (key === "tiktok") {
    return (
      <svg {...common}>
        {/* Offset cyan + magenta marks behind the note — the signature TikTok
            treatment; the foreground note adapts to text color via currentColor. */}
        <path d={TIKTOK_PATH} fill="#25F4EE" transform="translate(-1.1 1.1)" />
        <path d={TIKTOK_PATH} fill="#FE2C55" transform="translate(1.1 -1.1)" />
        <path d={TIKTOK_PATH} fill="currentColor" />
      </svg>
    );
  }

  if (key === "youtube") {
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
        <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#fff" />
      </svg>
    );
  }

  return null;
}

export default PlatformIcon;
