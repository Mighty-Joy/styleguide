"use client";

import React, { useId } from "react";

export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  resize?: "none" | "vertical" | "both";
  id?: string;
}

export default function Textarea({
  value,
  onChange,
  placeholder,
  label,
  hint,
  error,
  disabled = false,
  rows = 4,
  maxLength,
  showCount = false,
  resize = "vertical",
  id,
}: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const count = value.length;
  const overLimit = maxLength !== undefined && count > maxLength;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <label htmlFor={inputId}
          style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={{
          width: "100%",
          padding: "8px 10px",
          border: `1px solid ${error || overLimit ? "#ef4444" : "var(--sd-border-medium)"}`,
          borderRadius: "var(--sd-radius-sm)",
          background: disabled ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
          color: "var(--sd-font-primary)",
          fontSize: 13,
          fontFamily: "var(--sd-font-stack)",
          lineHeight: 1.6,
          resize,
          outline: "none",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "auto",
          boxSizing: "border-box",
          transition: "border-color 0.1s",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {error && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>{error}</span>}
          {hint && !error && <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{hint}</span>}
        </div>
        {(showCount || maxLength !== undefined) && (
          <span style={{ fontSize: 11, color: overLimit ? "#ef4444" : "var(--sd-font-tertiary)", fontWeight: overLimit ? 600 : 400 }}>
            {count}{maxLength !== undefined ? ` / ${maxLength}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}
