"use client";

import React from "react";
import { IconStarFilled, IconStar } from "@tabler/icons-react";
import styles from "./Rating.module.css";

export interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  count?: number;
  disabled?: boolean;
  label?: string;
}

const STAR_PX = 16;

export function Rating({
  value = 0,
  max = 5,
  onChange,
  showValue = false,
  count,
  disabled = false,
  label,
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const interactive = !!onChange && !disabled;
  const px = STAR_PX;

  const displayValue = hovered !== null ? hovered : value;

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.row}>
        <div
          className={styles.stars}
          style={{ gap: px < 16 ? 2 : 3 }}
          onMouseLeave={() => interactive && setHovered(null)}
        >
          {Array.from({ length: max }, (_, i) => {
            const starValue = i + 1;
            const filled = starValue <= Math.round(displayValue);
            return (
              <span
                key={i}
                className={interactive ? styles.interactive : undefined}
                onMouseEnter={() => interactive && setHovered(starValue)}
                onClick={() => interactive && onChange(starValue)}
                style={{ color: filled ? "var(--sd-yellow, #F59E0B)" : "var(--sd-border-default, #d4d4d8)", cursor: interactive ? "pointer" : "default", opacity: disabled ? 0.4 : 1 }}
              >
                {filled
                  ? <IconStarFilled size={px} />
                  : <IconStar size={px} />
                }
              </span>
            );
          })}
        </div>
        {showValue && (
          <span className={styles.value} style={{ fontSize: px + 1 }}>
            {value.toFixed(1)}
          </span>
        )}
        {count !== undefined && (
          <span className={styles.count} style={{ fontSize: px }}>
            ({count.toLocaleString()} reviews)
          </span>
        )}
      </div>
    </div>
  );
}

export default Rating;
