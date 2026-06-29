"use client";

import React, { useId } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: SwitchSize;
  id?: string;
}

/* ------------------------------------------------------------------ */
/* Size map                                                              */
/* ------------------------------------------------------------------ */

const SIZES: Record<SwitchSize, { track: [number, number]; thumb: number }> = {
  sm: { track: [32, 18], thumb: 14 },
  md: { track: [40, 22], thumb: 18 },
  lg: { track: [48, 26], thumb: 22 },
};

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  id,
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const { track: [trackW, trackH], thumb } = SIZES[size];

  return (
    <label htmlFor={inputId}
      style={{ display: "flex", alignItems: "flex-start", gap: 10,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <input
        id={inputId} type="checkbox" checked={checked} disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {/* Track */}
      <div style={{
        position: "relative", flexShrink: 0,
        width: trackW, height: trackH,
        borderRadius: trackH,
        background: checked ? "var(--sd-accent)" : "var(--sd-border-heavy, #D1D5DB)",
        transition: "background 0.18s",
        marginTop: label ? 2 : 0,
      }}>
        {/* Thumb */}
        <div style={{
          position: "absolute", top: "50%",
          left: checked ? trackW - thumb - 2 : 2,
          transform: "translateY(-50%)",
          width: thumb, height: thumb,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.18s",
        }} />
      </div>
      {(label || description) && (
        <div>
          {label && (
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--sd-font-primary)", lineHeight: 1.4 }}>
              {label}
            </div>
          )}
          {description && (
            <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginTop: 2, lineHeight: 1.4 }}>
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
}
