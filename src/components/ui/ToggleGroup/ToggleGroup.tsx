"use client";

import React from "react";
import styles from "./ToggleGroup.module.css";

export interface ToggleOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export type ToggleVariant = "segment" | "button";
export type ToggleSize = "md" | "sm";

export interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  className?: string;
}

export function ToggleGroup({
  options,
  value,
  onChange,
  variant = "segment",
  size = "md",
  className,
}: ToggleGroupProps) {
  return (
    <div
      className={[
        styles.root,
        styles[variant],
        size === "sm" ? styles.sm : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.item} ${active ? styles.active : ""}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default ToggleGroup;
