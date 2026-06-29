"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import styles from "./InlineEdit.module.css";

export interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  validate?: (v: string) => string | null;
  label?: string;
  renderValue?: (v: string) => React.ReactNode;
}

export function InlineEdit({
  value,
  onSave,
  placeholder = "Click to edit",
  disabled = false,
  multiline = false,
  validate,
  label,
  renderValue,
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function startEdit() {
    if (disabled) return;
    setDraft(value);
    setError(null);
    setEditing(true);
  }

  function handleSave() {
    if (validate) {
      const err = validate(draft);
      if (err) { setError(err); return; }
    }
    onSave(draft);
    setEditing(false);
    setError(null);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
    setError(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !multiline) { e.preventDefault(); handleSave(); }
    if (e.key === "Escape") handleCancel();
  }

  if (!editing) {
    return (
      <div
        className={`${styles.display} ${disabled ? styles.disabled : ""}`}
        onClick={startEdit}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? undefined : 0}
        onKeyDown={(e) => { if (!disabled && (e.key === "Enter" || e.key === " ")) startEdit(); }}
        aria-label={label}
      >
        <span className={styles.displayText}>
          {renderValue ? renderValue(value) : (value || <span className={styles.placeholder}>{placeholder}</span>)}
        </span>
        {!disabled && <IconPencil size={12} className={styles.pencil} />}
      </div>
    );
  }

  const sharedProps = {
    ref: inputRef as React.RefObject<HTMLInputElement>,
    className: styles.input,
    value: draft,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft(e.target.value);
      if (error && validate) setError(validate(e.target.value));
    },
    onKeyDown: handleKeyDown,
    placeholder,
    "aria-label": label,
    style: { resize: "none" as const },
  };

  return (
    <div className={styles.editWrapper}>
      <div className={styles.editRow}>
        {multiline
          ? <textarea {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} ref={inputRef as unknown as React.RefObject<HTMLTextAreaElement>} rows={3} />
          : <input {...sharedProps} />
        }
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.saveBtn}`}
            onClick={handleSave}
            disabled={!!error}
            aria-label="Save"
          >
            <IconCheck size={13} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.cancelBtn}`}
            onClick={handleCancel}
            aria-label="Cancel"
          >
            <IconX size={13} />
          </button>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default InlineEdit;
