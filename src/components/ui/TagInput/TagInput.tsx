"use client";

import React, { useState, useRef, useId } from "react";
import { IconX } from "@tabler/icons-react";
import styles from "./TagInput.module.css";

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  label?: string;
  hint?: string;
  error?: string | boolean;
  className?: string;
}

export function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Add tags…",
  maxTags,
  disabled = false,
  label,
  hint,
  error,
  className,
}: TagInputProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [inputVal, setInputVal] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const tags = value ?? internal;

  function setTags(next: string[]) {
    if (!value) setInternal(next);
    onChange?.(next);
  }

  function addTag(raw: string) {
    const tag = raw.trim().replace(/,+$/, "").trim();
    if (!tag || tags.includes(tag)) return;
    if (maxTags !== undefined && tags.length >= maxTags) return;
    setTags([...tags, tag]);
  }

  function removeTag(index: number) {
    setTags(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && inputVal) {
      e.preventDefault();
      addTag(inputVal);
      setInputVal("");
    } else if (e.key === "Backspace" && !inputVal && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (v.endsWith(",")) {
      addTag(v);
      setInputVal("");
    } else {
      setInputVal(v);
    }
  }

  const atMax = maxTags !== undefined && tags.length >= maxTags;
  const errorText = typeof error === "string" ? error : undefined;

  const containerClass = [
    styles.container,
    focused ? styles.focused : "",
    error ? styles.error : "",
    disabled ? styles.disabled : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div
        className={containerClass}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span key={i} className={styles.tag}>
            <span className={styles.tagLabel}>{tag}</span>
            {!disabled && (
              <button
                type="button"
                className={styles.tagRemove}
                onClick={e => { e.stopPropagation(); removeTag(i); }}
                aria-label={`Remove ${tag}`}
              >
                <IconX size={10} />
              </button>
            )}
          </span>
        ))}
        <input
          id={id}
          ref={inputRef}
          className={styles.input}
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); if (inputVal) { addTag(inputVal); setInputVal(""); } }}
          placeholder={tags.length === 0 ? placeholder : atMax ? "" : "Add more…"}
          disabled={disabled || atMax}
          aria-label={label ?? "Tags"}
        />
      </div>
      {(errorText || hint) && (
        <span className={`${styles.hint} ${error ? styles.hintError : ""}`}>
          {errorText ?? hint}
        </span>
      )}
    </div>
  );
}

export default TagInput;
