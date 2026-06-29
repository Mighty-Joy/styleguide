"use client";

import React from "react";
import { IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ElementType;
  tone?: keyof typeof TONES;
  /** Signed percentage, e.g. 12.4 or -3.1. Renders a trend row when provided. */
  trend?: number;
  /** Text after the trend percentage. Default "vs last period". */
  trendLabel?: string;
  /** Secondary descriptor below the value, e.g. "of $10,000 budget". */
  secondary?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

function formatTrend(v: number) {
  return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "blue",
  trend,
  trendLabel = "vs last period",
  secondary,
  size = "md",
  onClick,
}: StatCardProps) {
  const t = TONES[tone];

  const positive = trend !== undefined && trend > 0;
  const negative = trend !== undefined && trend < 0;

  const TrendIcon  = positive ? IconTrendingUp : negative ? IconTrendingDown : IconMinus;
  const trendColor = positive ? TONES.green.text : negative ? TONES.red.text : "var(--sd-font-tertiary)";

  const valueSizes  = { sm: 20, md: 28, lg: 36 };
  const labelSizes  = { sm: 10, md: 11, lg: 12 };
  const iconBoxSize = { sm: 28, md: 34, lg: 40 };
  const iconSize    = { sm: 13, md: 16, lg: 20 };
  const padding     = { sm: "10px 12px", md: "14px 16px", lg: "18px 20px" };

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        display: "flex", flexDirection: "column", gap: 8,
        padding: padding[size],
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.1s",
      }}
      onMouseOver={e => onClick && ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)")}
      onMouseOut={e  => onClick && ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: labelSizes[size], fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.3 }}>
          {label}
        </span>
        {Icon && (
          <div style={{
            width: iconBoxSize[size], height: iconBoxSize[size],
            borderRadius: "var(--sd-radius-sm)",
            background: t.tint, color: t.text,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={iconSize[size]} />
          </div>
        )}
      </div>

      <div style={{ fontSize: valueSizes[size], fontWeight: 800, color: "var(--sd-font-primary)", lineHeight: 1.1 }}>
        {value}
      </div>

      {secondary && (
        <div style={{ fontSize: labelSizes[size], color: "var(--sd-font-tertiary)" }}>
          {secondary}
        </div>
      )}

      {trend !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TrendIcon size={12} style={{ color: trendColor, flexShrink: 0 }} />
          <span style={{ fontSize: labelSizes[size], fontWeight: 700, color: trendColor }}>
            {formatTrend(trend)}
          </span>
          <span style={{ fontSize: labelSizes[size], color: "var(--sd-font-tertiary)" }}>
            {trendLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
