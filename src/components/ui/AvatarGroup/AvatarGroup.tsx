import React from "react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import styles from "./AvatarGroup.module.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarItem {
  initials: string;
  tone?: keyof typeof TONES;
  /** Optional image URL — falls back to initials if not provided or fails to load. */
  src?: string;
  label?: string;
}

export interface AvatarGroupProps {
  avatars: AvatarItem[];
  /** Max visible avatars before "+N" overflow indicator. Default 4. */
  max?: number;
  size?: AvatarSize;
  /** Show tooltip with labels on hover. Default true. */
  showTooltip?: boolean;
}

const SIZE_PX:    Record<AvatarSize, number> = { sm: 24, md: 32, lg: 40 };
const FONT_PX:    Record<AvatarSize, number> = { sm: 9,  md: 11, lg: 13 };
const OVERLAP_PX: Record<AvatarSize, number> = { sm: 7,  md: 10, lg: 12 };

const TONE_KEYS = Object.keys(TONES) as (keyof typeof TONES)[];
function toneForIndex(i: number): keyof typeof TONES {
  return TONE_KEYS[i % TONE_KEYS.length];
}

export default function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  showTooltip = true,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const px = SIZE_PX[size];
  const fp = FONT_PX[size];
  const overlap = OVERLAP_PX[size];

  return (
    <div
      className={styles.root}
      style={{ height: px, paddingLeft: overlap }}
      title={showTooltip ? avatars.map(a => a.label ?? a.initials).join(", ") : undefined}
    >
      {visible.map((a, i) => (
        <div key={i} className={styles.slot} style={{ marginLeft: -overlap }}>
          <Avatar
            initials={a.initials}
            name={a.label}
            src={a.src}
            tone={a.tone ?? toneForIndex(i)}
            size={size}
            bordered
          />
        </div>
      ))}
      {overflow > 0 && (
        <div className={styles.slot} style={{ marginLeft: -overlap }}>
          <div style={{
            width: px, height: px, borderRadius: "50%",
            background: "var(--sd-bg-tertiary)", color: "var(--sd-font-secondary)",
            fontSize: fp, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid var(--sd-bg-primary)", flexShrink: 0,
          }}>
            +{overflow}
          </div>
        </div>
      )}
    </div>
  );
}
