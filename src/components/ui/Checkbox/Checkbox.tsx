"use client";

import React, { useId } from "react";
import { IconCheck, IconMinus } from "@tabler/icons-react";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps {
  checked: boolean | "indeterminate";
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  id?: string;
}

export interface RadioProps {
  checked?: boolean;
  onChange?: () => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  id?: string;
  name?: string;
  value?: string;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  name?: string;
  direction?: "row" | "column";
  gap?: number;
}

/* ------------------------------------------------------------------ */
/* Checkbox                                                              */
/* ------------------------------------------------------------------ */

export default function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  id,
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const boxSize = size === "sm" ? 14 : 16;
  const isChecked = checked === true;
  const isIndet  = checked === "indeterminate";
  const active   = isChecked || isIndet;

  return (
    <label htmlFor={inputId}
      style={{ display: "flex", alignItems: "flex-start", gap: 8,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <input
        id={inputId} type="checkbox" checked={isChecked} disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width: boxSize, height: boxSize, flexShrink: 0,
        borderRadius: 3,
        border: `2px solid ${active ? "var(--sd-accent)" : "var(--sd-border-medium)"}`,
        background: active ? "var(--sd-accent)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.12s",
        marginTop: label ? (size === "sm" ? 1 : 2) : 0,
      }}>
        {isChecked && <IconCheck size={boxSize - 4} style={{ color: "#fff", strokeWidth: 3 }} />}
        {isIndet  && <IconMinus  size={boxSize - 4} style={{ color: "#fff", strokeWidth: 3 }} />}
      </div>
      {(label || description) && (
        <div>
          {label && <div style={{ fontSize: size === "sm" ? 12 : 13, fontWeight: 500, color: "var(--sd-font-primary)", lineHeight: 1.4 }}>{label}</div>}
          {description && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2, lineHeight: 1.4 }}>{description}</div>}
        </div>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Radio                                                                 */
/* ------------------------------------------------------------------ */

export function Radio({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  id,
  name,
  value,
}: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const boxSize = size === "sm" ? 14 : 16;
  const dotSize = size === "sm" ? 6 : 7;

  return (
    <label htmlFor={inputId}
      style={{ display: "flex", alignItems: "flex-start", gap: 8,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <input
        id={inputId} type="radio" name={name} value={value} checked={checked} disabled={disabled}
        onChange={() => onChange?.()}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width: boxSize, height: boxSize, flexShrink: 0,
        borderRadius: "50%",
        border: `2px solid ${checked ? "var(--sd-accent)" : "var(--sd-border-medium)"}`,
        background: "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "border-color 0.12s",
        marginTop: label ? (size === "sm" ? 1 : 2) : 0,
      }}>
        {checked && <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", background: "var(--sd-accent)" }} />}
      </div>
      {(label || description) && (
        <div>
          {label && <div style={{ fontSize: size === "sm" ? 12 : 13, fontWeight: 500, color: "var(--sd-font-primary)", lineHeight: 1.4 }}>{label}</div>}
          {description && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2, lineHeight: 1.4 }}>{description}</div>}
        </div>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* RadioGroup                                                            */
/* ------------------------------------------------------------------ */

export function RadioGroup({ value, onChange, children, name, direction = "column", gap }: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? autoName;
  const defaultGap = direction === "row" ? 16 : 8;

  return (
    <div style={{ display: "flex", flexDirection: direction, gap: gap ?? defaultGap }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: () => child.props.value != null && onChange(child.props.value),
            name: groupName,
          } as Partial<RadioProps>);
        }
        return child;
      })}
    </div>
  );
}
