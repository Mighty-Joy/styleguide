"use client";

import React, { useState, useId } from "react";
import styles from "./NumberInput.module.css";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  error?: string | boolean;
  className?: string;
}

export function NumberInput({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  disabled = false,
  label,
  hint,
  error,
  className,
}: NumberInputProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const id = useId();

  const current = value ?? internal;

  function clamp(n: number) {
    let v = n;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  }

  function set(n: number) {
    const clamped = clamp(n);
    if (!isNaN(clamped)) {
      if (value === undefined) setInternal(clamped);
      onChange?.(clamped);
    }
  }

  const atMin = min !== undefined && current <= min;
  const atMax = max !== undefined && current >= max;
  const errorText = typeof error === "string" ? error : undefined;

  const wrapClass = [
    styles.wrapper,
    focused ? styles.focused : "",
    error ? styles.error : "",
    disabled ? styles.disabled : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={wrapClass}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => set(current - step)}
          disabled={disabled || atMin}
          aria-label="Decrease"
          tabIndex={-1}
        >
          −
        </button>
        <div className={styles.inner}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input
            id={id}
            type="number"
            className={styles.input}
            value={current}
            onChange={e => set(parseFloat(e.target.value))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            aria-label={label ?? "Number"}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnRight}`}
          onClick={() => set(current + step)}
          disabled={disabled || atMax}
          aria-label="Increase"
          tabIndex={-1}
        >
          +
        </button>
      </div>
      {(errorText || hint) && (
        <span className={`${styles.hint} ${error ? styles.hintError : ""}`}>
          {errorText ?? hint}
        </span>
      )}
    </div>
  );
}

export default NumberInput;
