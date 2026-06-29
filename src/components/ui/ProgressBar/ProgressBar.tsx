"use client";

import React from "react";
import { TONES } from "@/tokens/tones";
import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  value: number;
  max?: number;
  tone?: keyof typeof TONES;
  /** Bar height in px. Default 6. */
  height?: number;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
  rounded?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  tone = "blue",
  height = 6,
  label,
  showValue = false,
  animated = false,
  striped = false,
  rounded = true,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const h = height;
  const radius = rounded ? h / 2 : 2;
  const color = TONES[tone];

  const fillStyle: React.CSSProperties = {
    width: `${pct}%`,
    height: "100%",
    borderRadius: radius,
    background: striped
      ? `repeating-linear-gradient(
          45deg,
          ${color.solid},
          ${color.solid} 8px,
          rgba(255,255,255,0.15) 8px,
          rgba(255,255,255,0.15) 16px
        )`
      : color.solid,
    transition: "width 0.3s ease",
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      {(label || showValue) && (
        <div className={styles.labelRow}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && (
            <span className={styles.value}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={styles.track}
        style={{ height: h, borderRadius: radius }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={animated && pct < 100 ? styles.fillAnimated : styles.fill}
          style={fillStyle}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
