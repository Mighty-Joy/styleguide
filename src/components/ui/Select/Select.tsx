"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import styles from "./Select.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  value: string | null;
  onChange: (value: string) => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  size?: "sm" | "md";
  width?: number | string;
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function Select({
  value,
  onChange,
  options = [],
  groups = [],
  placeholder = "Select…",
  label,
  error,
  hint,
  disabled = false,
  clearable = false,
  searchable = false,
  size = "md",
  width = "100%",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Flatten all options for value lookup
  const allOptions = groups.length > 0
    ? groups.flatMap(g => g.options)
    : options;

  const activeOption = allOptions.find(o => o.value === value) ?? null;

  // Filter by query
  const filterOpts = (opts: SelectOption[]) =>
    query ? opts.filter(o => o.label.toLowerCase().includes(query.toLowerCase())) : opts;

  const filteredOptions = filterOpts(options);
  const filteredGroups = groups.map(g => ({ ...g, options: filterOpts(g.options) }))
    .filter(g => g.options.length > 0);

  const hasResults = filteredOptions.length > 0 || filteredGroups.some(g => g.options.length > 0);

  useEffect(() => {
    if (!open) { setQuery(""); return; }
    if (searchable) setTimeout(() => searchRef.current?.focus(), 10);
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const select = (v: string) => { onChange(v); setOpen(false); };

  const triggerH = size === "sm" ? 30 : 36;
  const triggerFs = size === "sm" ? 12 : 13;

  function renderOption(opt: SelectOption) {
    const Icon = opt.icon;
    const active = opt.value === value;
    return (
      <button key={opt.value} type="button" disabled={opt.disabled}
        className={`${styles.option} ${active ? styles.optionActive : ""} ${opt.disabled ? styles.optionDisabled : ""}`}
        onClick={() => select(opt.value)}>
        {Icon && <Icon size={14} className={styles.optionIcon} />}
        <span className={styles.optionContent}>
          <span className={styles.optionLabel}>{opt.label}</span>
          {opt.description && <span className={styles.optionDesc}>{opt.description}</span>}
        </span>
        {active && <IconCheck size={13} className={styles.optionCheck} />}
      </button>
    );
  }

  return (
    <div className={styles.root} style={{ width }} ref={rootRef}>
      {label && <label className={styles.label}>{label}</label>}

      {/* Trigger */}
      <button type="button" disabled={disabled}
        className={`${styles.trigger} ${error ? styles.triggerError : ""} ${open ? styles.triggerOpen : ""} ${disabled ? styles.triggerDisabled : ""}`}
        style={{ height: triggerH, fontSize: triggerFs }}
        onClick={() => !disabled && setOpen(v => !v)}>
        <span className={styles.triggerValue} style={{ color: activeOption ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)" }}>
          {activeOption ? (
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {activeOption.icon && <activeOption.icon size={14} />}
              {activeOption.label}
            </span>
          ) : placeholder}
        </span>
        <span className={styles.triggerControls}>
          {clearable && value && (
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); onChange(""); }}
              role="button" aria-label="Clear">
              <IconX size={12} />
            </span>
          )}
          <IconChevronDown size={14} className={`${styles.caret} ${open ? styles.caretOpen : ""}`} />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          {searchable && (
            <div className={styles.search}>
              <IconSearch size={13} className={styles.searchIcon} />
              <input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search…" className={styles.searchInput} />
            </div>
          )}
          <div className={styles.list}>
            {!hasResults && <div className={styles.empty}>No results</div>}

            {/* Flat options */}
            {filteredOptions.map(renderOption)}

            {/* Grouped options */}
            {filteredGroups.map(g => (
              <div key={g.label}>
                <div className={styles.groupLabel}>{g.label}</div>
                {g.options.map(renderOption)}
              </div>
            ))}
          </div>
        </div>
      )}

      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
