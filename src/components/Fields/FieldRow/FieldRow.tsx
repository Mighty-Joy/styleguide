"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./FieldRow.module.css";

export interface FieldRowProps {
  /** Leading key glyph (e.g. a money-bag for Annual Revenue). */
  icon?: React.ReactNode;
  /** Field key label (truncates). */
  label: string;
  /** Display value. When empty, the placeholder shows in a muted color. */
  value?: React.ReactNode;
  placeholder?: string;
  /**
   * Inline editor. When provided, clicking the value opens it inside the
   * elevated overlay; call close() to commit/exit. Click-outside and Escape
   * also close it.
   */
  editor?: (close: () => void) => React.ReactNode;
}

/**
 * One right-panel record field: a muted key (icon + label) and its value.
 * Quiet at rest (Twenty two-tone), with click-to-edit that opens the editor in
 * a shadowed overlay — the "open state" floating box.
 */
export const FieldRow: React.FC<FieldRowProps> = ({
  icon,
  label,
  value,
  placeholder = "Empty",
  editor,
}) => {
  const [editing, setEditing] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const close = () => setEditing(false);

  useEffect(() => {
    if (!editing) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [editing]);

  const isEmpty = value == null || value === "";

  return (
    <div className={styles.row}>
      <span className={styles.key}>
        {icon && <span className={styles.keyIcon}>{icon}</span>}
        <span className={styles.keyLabel}>{label}</span>
      </span>
      <div className={styles.valueWrap} ref={wrapRef}>
        {editing && editor ? (
          <div className={styles.overlay}>{editor(close)}</div>
        ) : editor ? (
          <button
            type="button"
            className={`${styles.value} ${isEmpty ? styles.empty : ""}`}
            onClick={() => setEditing(true)}
          >
            {isEmpty ? placeholder : value}
          </button>
        ) : (
          <span className={`${styles.value} ${isEmpty ? styles.empty : ""}`}>
            {isEmpty ? placeholder : value}
          </span>
        )}
      </div>
    </div>
  );
};

export default FieldRow;
