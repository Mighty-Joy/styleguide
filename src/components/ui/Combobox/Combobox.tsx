"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconCheck, IconX } from "@tabler/icons-react";
import styles from "./Combobox.module.css";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  emptyMessage?: string;
  width?: number | string;
}

export default function Combobox({
  options,
  value,
  onChange,
  placeholder = "Search…",
  label,
  hint,
  error,
  disabled = false,
  clearable = false,
  emptyMessage = "No results found",
  width = "100%",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find(o => o.value === value) ?? null;

  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleFocus = () => {
    if (!disabled) {
      setOpen(true);
      setQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  };

  const select = (opt: ComboboxOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
    setQuery("");
    inputRef.current?.focus();
  };

  const displayValue = open ? query : (selected?.label ?? query);

  return (
    <div className={styles.root} style={{ width }} ref={rootRef}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.trigger}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <span className={styles.icon}>
          {clearable && value && !open ? (
            <span className={styles.iconClickable} onClick={clear} role="button" aria-label="Clear">
              <IconX size={13} />
            </span>
          ) : (
            <IconChevronDown size={13} />
          )}
        </span>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>{emptyMessage}</div>
          ) : (
            filtered.map(opt => {
              const Icon = opt.icon;
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  className={`${styles.option} ${active ? styles.optionActive : ""} ${opt.disabled ? styles.optionDisabled : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(opt)}
                >
                  {Icon && <Icon size={14} className={styles.optionIcon} />}
                  <span className={styles.optionContent}>
                    <span className={`${styles.optionLabel} ${active ? styles.optionLabelActive : ""}`}>
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className={styles.optionDesc}>{opt.description}</span>
                    )}
                  </span>
                  {active && <IconCheck size={13} className={styles.optionCheck} />}
                </button>
              );
            })
          )}
        </div>
      )}

      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={`${styles.hint} ${styles.hintError}`}>{error}</span>}
    </div>
  );
}
