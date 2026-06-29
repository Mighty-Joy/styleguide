"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import styles from "./MultiSelect.module.css";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Search…",
  label,
  hint,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const selectedOptions = options.filter((o) => value.includes(o.value));
  const available = options.filter(
    (o) => !value.includes(o.value) && o.label.toLowerCase().includes(search.toLowerCase()),
  );

  const add = (val: string) => {
    onChange?.([...value, val]);
    setSearch("");
    inputRef.current?.focus();
  };
  const remove = (val: string) => onChange?.(value.filter((v) => v !== val));

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        ref={ref}
        className={`${styles.control} ${open ? styles.focused : ""}`}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        <div className={styles.inner}>
          {selectedOptions.map((opt) => (
            <span key={opt.value} className={styles.pill}>
              {opt.label}
              <button
                type="button"
                className={styles.pillRemove}
                aria-label={`Remove ${opt.label}`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  remove(opt.value);
                }}
              >
                <IconX size={10} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            className={styles.input}
            value={search}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                setSearch("");
              }
              if (e.key === "Backspace" && !search && value.length > 0) {
                remove(value[value.length - 1]);
              }
            }}
          />
        </div>

        {open && available.length > 0 && (
          <ul className={styles.menu} role="listbox">
            {available.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={false}
                className={styles.option}
                onMouseDown={(e) => {
                  e.preventDefault();
                  add(opt.value);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}

export default MultiSelect;
