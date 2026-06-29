"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconCheck, IconX, IconSearch } from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: React.ElementType;
  description?: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  value: string[];
  onChange: (values: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  searchable?: boolean;
  maxItems?: number;
  chipTone?: keyof typeof TONES;
  size?: "sm" | "md";
  width?: number | string;
}

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  maxTags?: number;
  chipTone?: keyof typeof TONES;
  prefix?: string;
  width?: number | string;
}

/* ------------------------------------------------------------------ */
/* Chip                                                                  */
/* ------------------------------------------------------------------ */

function Chip({
  label,
  tone = "blue",
  onRemove,
  icon: Icon,
}: {
  label: string;
  tone?: keyof typeof TONES;
  onRemove?: () => void;
  icon?: React.ElementType;
}) {
  const t = TONES[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      height: 22, padding: "0 6px 0 7px",
      borderRadius: "var(--sd-radius-pill)",
      background: t.tint, color: t.text,
      fontSize: 12, fontWeight: 600,
      flexShrink: 0, maxWidth: 180,
    }}>
      {Icon && <Icon size={11} />}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      {onRemove && (
        <button type="button" onClick={e => { e.stopPropagation(); onRemove(); }}
          style={{ width: 14, height: 14, border: "none", background: "transparent", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 0, marginLeft: 1,
            color: t.text, flexShrink: 0, borderRadius: "50%" }}>
          <IconX size={10} />
        </button>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* MultiSelect                                                           */
/* ------------------------------------------------------------------ */

export default function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
  label,
  error,
  hint,
  disabled = false,
  searchable = false,
  maxItems,
  chipTone = "blue",
  size = "md",
  width = "100%",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOptions = options.filter(o => value.includes(o.value));
  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const atMax = maxItems !== undefined && value.length >= maxItems;

  useEffect(() => {
    if (!open) { setQuery(""); return; }
    if (searchable) setTimeout(() => searchRef.current?.focus(), 10);
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter(x => x !== v));
    else if (!atMax) onChange([...value, v]);
  };

  const remove = (v: string) => onChange(value.filter(x => x !== v));
  const minH = size === "sm" ? 30 : 36;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 4, width }} ref={rootRef}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{label}</label>}

      {/* Trigger */}
      <div
        role="button" tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen(v => !v)}
        onKeyDown={e => { if (!disabled && (e.key === "Enter" || e.key === " ")) setOpen(v => !v); }}
        style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4,
          minHeight: minH, padding: "4px 8px",
          border: `1px solid ${error ? "#ef4444" : open ? "var(--sd-accent)" : "var(--sd-border-medium)"}`,
          borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)",
          cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
          boxShadow: open ? "0 0 0 2px var(--sd-accent-tint-2)" : "none", transition: "border-color 0.1s",
        }}>
        {selectedOptions.map(opt => (
          <Chip key={opt.value} label={opt.label} tone={chipTone} icon={opt.icon}
            onRemove={() => remove(opt.value)} />
        ))}
        {selectedOptions.length === 0 && (
          <span style={{ fontSize: size === "sm" ? 12 : 13, color: "var(--sd-font-tertiary)", flex: 1 }}>
            {placeholder}
          </span>
        )}
        <div style={{ marginLeft: "auto", paddingLeft: 4, flexShrink: 0, display: "flex", alignItems: "center" }}>
          <IconChevronDown size={14} style={{ color: "var(--sd-font-tertiary)", transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none" }} />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 200,
          background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)",
          borderRadius: "var(--sd-radius-md)", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)",
          overflow: "hidden", animation: "pop 0.12s ease",
        }}>
          {searchable && (
            <div style={{ position: "relative", padding: 6, borderBottom: "1px solid var(--sd-border-light)" }}>
              <IconSearch size={13} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--sd-font-tertiary)", pointerEvents: "none" }} />
              <input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…"
                style={{ width: "100%", height: 28, padding: "0 8px 0 28px", border: "1px solid var(--sd-border-light)",
                  borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-secondary)", color: "var(--sd-font-primary)",
                  fontSize: 12, fontFamily: "var(--sd-font-stack)", outline: "none", boxSizing: "border-box" }} />
            </div>
          )}
          <div style={{ padding: 4, maxHeight: 240, overflowY: "auto" }}>
            {atMax && (
              <div style={{ padding: "6px 10px", fontSize: 11, color: "var(--sd-font-tertiary)", fontStyle: "italic" }}>
                Maximum {maxItems} items selected
              </div>
            )}
            {filtered.length === 0 && (
              <div style={{ padding: 12, textAlign: "center", fontSize: 12, color: "var(--sd-font-tertiary)" }}>No results</div>
            )}
            {filtered.map(opt => {
              const Icon = opt.icon;
              const sel = value.includes(opt.value);
              const dis = opt.disabled || (atMax && !sel);
              return (
                <button key={opt.value} type="button" disabled={dis}
                  onClick={() => toggle(opt.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, width: "100%",
                    minHeight: 32, padding: "5px 8px", border: "none",
                    background: sel ? "var(--sd-accent-tint-2)" : "transparent",
                    borderRadius: "var(--sd-radius-sm)", cursor: dis ? "not-allowed" : "pointer",
                    fontFamily: "var(--sd-font-stack)", color: "var(--sd-font-primary)",
                    fontSize: 13, textAlign: "left", opacity: dis && !sel ? 0.4 : 1,
                  }}>
                  {Icon && <Icon size={14} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: sel ? 700 : 400 }}>{opt.label}</div>
                    {opt.description && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{opt.description}</div>}
                  </div>
                  {sel && <IconCheck size={13} style={{ color: "var(--sd-accent)", flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
          {value.length > 0 && (
            <div style={{ padding: "6px 8px", borderTop: "1px solid var(--sd-border-light)" }}>
              <button type="button" onClick={() => { onChange([]); setOpen(false); }}
                style={{ fontSize: 11, color: "var(--sd-font-tertiary)", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--sd-font-stack)", padding: 0 }}>
                Clear all ({value.length})
              </button>
            </div>
          )}
        </div>
      )}

      {error && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{hint}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TagInput                                                              */
/* ------------------------------------------------------------------ */

export function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter…",
  label,
  error,
  hint,
  disabled = false,
  maxTags,
  chipTone = "blue",
  prefix = "",
  width = "100%",
}: TagInputProps) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const atMax = maxTags !== undefined && value.length >= maxTags;

  const addTag = (raw: string) => {
    const tag = (prefix + raw.replace(/^#+@+/, "")).trim();
    if (!tag || value.includes(tag) || atMax) return;
    onChange([...value, tag]);
    setInputVal("");
  };

  const removeTag = (t: string) => onChange(value.filter(x => x !== t));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputVal);
    }
    if (e.key === "Backspace" && !inputVal && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{label}</label>}

      <div
        onClick={() => !disabled && inputRef.current?.focus()}
        style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 5,
          minHeight: 38, padding: "5px 8px",
          border: `1px solid ${error ? "#ef4444" : "var(--sd-border-medium)"}`,
          borderRadius: "var(--sd-radius-sm)", background: disabled ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
          cursor: disabled ? "not-allowed" : "text", opacity: disabled ? 0.5 : 1,
        }}>
        {value.map(t => (
          <Chip key={t} label={prefix + t} tone={chipTone} onRemove={disabled ? undefined : () => removeTag(t)} />
        ))}
        {!atMax && !disabled && (
          <input ref={inputRef} value={inputVal}
            onChange={e => setInputVal(e.target.value.replace(/,/g, ""))}
            onKeyDown={onKeyDown}
            onBlur={() => { if (inputVal.trim()) addTag(inputVal); }}
            placeholder={value.length === 0 ? placeholder : ""}
            style={{ flex: 1, minWidth: 80, border: "none", outline: "none", background: "transparent",
              fontSize: 13, color: "var(--sd-font-primary)", fontFamily: "var(--sd-font-stack)", padding: 0 }}
          />
        )}
        {atMax && value.length > 0 && (
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginLeft: 4 }}>Max {maxTags} tags</span>
        )}
      </div>

      {error && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{hint}</span>}
    </div>
  );
}
