"use client";

import React, { useState } from "react";
import { IconChevronDown, IconCurrencyDollar } from "@tabler/icons-react";
import styles from "./FieldEditors.module.css";

interface TextEditorProps {
  defaultValue?: string;
  placeholder?: string;
  onClose?: () => void;
}

/** Plain transparent text editor for a FieldRow's overlay. */
export function FieldTextEditor({
  defaultValue,
  placeholder,
  onClose,
}: TextEditorProps) {
  const [v, setV] = useState(defaultValue ?? "");
  return (
    <div className={styles.inner}>
      <input
        autoFocus
        className={styles.input}
        value={v}
        placeholder={placeholder}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") onClose?.();
        }}
      />
    </div>
  );
}

interface CurrencyEditorProps {
  code?: string;
  defaultValue?: string;
  placeholder?: string;
  onClose?: () => void;
}

/**
 * Currency editor: a unit select ("USD ⌄") + symbol prefix ("$") + transparent
 * numeric input — Twenty's CurrencyInput composition, inside the overlay.
 * (The unit picker is presentational here; wire a dropdown when productionizing.)
 */
export function FieldCurrencyEditor({
  code = "USD",
  defaultValue,
  placeholder = "Currency",
  onClose,
}: CurrencyEditorProps) {
  const [v, setV] = useState(defaultValue ?? "");
  return (
    <div className={styles.inner}>
      <button type="button" className={styles.unit}>
        {code}
        <IconChevronDown size={13} />
      </button>
      <span className={styles.symbol}>
        <IconCurrencyDollar size={15} />
      </span>
      <input
        autoFocus
        inputMode="decimal"
        className={styles.input}
        value={v}
        placeholder={placeholder}
        onChange={(e) => setV(e.target.value.replace(/[^0-9.,]/g, ""))}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") onClose?.();
        }}
      />
    </div>
  );
}
