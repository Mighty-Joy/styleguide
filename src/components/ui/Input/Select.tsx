"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import styles from "./Select.module.css";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  hint,
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div ref={ref} className={styles.root}>
        <button
          type="button"
          disabled={disabled}
          className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
          onClick={() => !disabled && setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={selected ? styles.value : styles.placeholder}>
            {selected?.label ?? placeholder}
          </span>
          <IconChevronDown
            size={14}
            className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          />
        </button>

        {open && (
          <ul className={styles.menu} role="listbox">
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`${styles.option} ${opt.value === value ? styles.optionSelected : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange?.(opt.value);
                  setOpen(false);
                }}
              >
                <span className={styles.optCheck}>
                  {opt.value === value && <IconCheck size={13} />}
                </span>
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

export default Select;
