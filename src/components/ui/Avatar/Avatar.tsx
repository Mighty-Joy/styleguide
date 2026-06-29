"use client";

import React from "react";
import { TONES } from "@/tokens/tones";
import styles from "./Avatar.module.css";

export type AvatarSize  = "sm" | "md" | "lg";
export type AvatarShape = "circle" | "rounded";

export interface AvatarProps {
  /** Initials to display, e.g. "EJ". Auto-derived from `name` if omitted. */
  initials?: string;
  /** Full name — used to derive initials and deterministically pick a tone. */
  name?: string;
  /** Photo URL. Falls back to initials when omitted or image fails to load. */
  src?: string;
  /** Tone family for the initials background. Defaults to a hash of `name`. */
  tone?: keyof typeof TONES;
  /** sm = 24px · md = 32px · lg = 40px */
  size?: AvatarSize;
  /** Circle (default) or gently-rounded square. */
  shape?: AvatarShape;
  alt?: string;
  /** Add a white ring border — useful when stacking avatars in a group. */
  bordered?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Size scale                                                           */
/* ------------------------------------------------------------------ */
const PX: Record<AvatarSize, number> = { sm: 24, md: 32, lg: 40 };
const FS: Record<AvatarSize, number> = { sm: 9,  md: 11, lg: 13 };

const RADIUS: Record<AvatarShape, string> = {
  circle:  "50%",
  rounded: "var(--sd-radius-md)",
};

/* Deterministic tone from name — same letter always gets same color */
const TONE_KEYS = Object.keys(TONES) as (keyof typeof TONES)[];
function toneFromString(s: string): keyof typeof TONES {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffff;
  return TONE_KEYS[h % TONE_KEYS.length];
}

function deriveInitials(name?: string, initials?: string): string {
  if (initials) return initials.slice(0, 2).toUpperCase();
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({
  initials,
  name,
  src,
  tone,
  size    = "md",
  shape   = "circle",
  alt,
  bordered = false,
  className,
}: AvatarProps) {
  const [imgFailed, setImgFailed] = React.useState(false);

  const px     = PX[size];
  const fs     = FS[size];
  const letters = deriveInitials(name, initials);
  const resolvedTone = tone ?? toneFromString(name ?? initials ?? "?");
  const color  = TONES[resolvedTone];

  const base: React.CSSProperties = {
    width: px, height: px,
    borderRadius: RADIUS[shape],
    flexShrink: 0,
    overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
    ...(bordered ? { border: "2px solid var(--sd-bg-primary)" } : {}),
  };

  const cls = [styles.root, className].filter(Boolean).join(" ");
  const ariaLabel = alt ?? name ?? letters;

  if (src && !imgFailed) {
    return (
      <div style={base} className={cls} aria-label={ariaLabel}>
        <img
          src={src}
          alt={ariaLabel}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      style={{ ...base, background: color.solid, color: "#fff", fontSize: fs, fontWeight: 700, lineHeight: 1 }}
      className={cls}
      aria-label={ariaLabel}
    >
      {letters}
    </div>
  );
}
