import React from "react";
import { TONES } from "@/tokens/tones";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export type BadgeVariant = "status" | "count" | "outline" | "solid";
export type BadgeSize    = "sm" | "md" | "lg";

export interface BadgeProps {
  label: React.ReactNode;
  tone?: keyof typeof TONES;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a colored dot before the label (status variant only). */
  dot?: boolean;
  /** Optional icon component (Tabler). */
  icon?: React.ElementType;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Size tokens                                                           */
/* ------------------------------------------------------------------ */

const HEIGHT: Record<BadgeSize, number>  = { sm: 18, md: 22, lg: 26 };
const FONT:   Record<BadgeSize, number>  = { sm: 10, md: 11, lg: 12 };
const PX:     Record<BadgeSize, string>  = { sm: "0 6px", md: "0 8px", lg: "0 10px" };
const DOT:    Record<BadgeSize, number>  = { sm: 4, md: 5, lg: 6 };
const ICON:   Record<BadgeSize, number>  = { sm: 9, md: 10, lg: 12 };

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function Badge({
  label,
  tone = "blue",
  variant = "status",
  size = "md",
  dot = false,
  icon: Icon,
  className,
}: BadgeProps) {
  const t = TONES[tone];

  let bg: string;
  let color: string;
  let border: string | undefined;

  switch (variant) {
    case "solid":
      bg = t.solid; color = "#fff"; break;
    case "outline":
      bg = "transparent"; color = t.text; border = `1px solid ${t.solid}`; break;
    case "count":
      bg = t.solid; color = "#fff"; break;
    default: // status
      bg = t.tint; color = t.text; break;
  }

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: HEIGHT[size],
        padding: PX[size],
        borderRadius: variant === "count" ? "999px" : "var(--sd-radius-pill)",
        background: bg,
        color,
        border,
        fontSize: FONT[size],
        fontWeight: 600,
        whiteSpace: "nowrap",
        lineHeight: 1,
        letterSpacing: "0.01em",
      }}
    >
      {dot && (
        <span style={{ width: DOT[size], height: DOT[size], borderRadius: "50%", background: t.solid, flexShrink: 0 }} />
      )}
      {Icon && <Icon size={ICON[size]} style={{ flexShrink: 0 }} />}
      {label}
    </span>
  );
}
