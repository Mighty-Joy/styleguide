"use client";

import React, { useRef, useState } from "react";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: TooltipSide;
  /** Delay before showing in ms. Default 400. */
  delay?: number;
  disabled?: boolean;
}

export default function Tooltip({
  content,
  children,
  side = "top",
  delay = 400,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && !disabled && (
        <span className={`${styles.tooltip} ${styles[side]}`} role="tooltip">
          {content}
          <span className={`${styles.arrow} ${styles[`arrow_${side}`]}`} />
        </span>
      )}
    </span>
  );
}
