"use client";

import React from "react";
import styles from "./Input.module.css";

export type InputVariant = "elevated" | "bare";

const VARIANT_CLASS: Record<InputVariant, string> = {
  elevated: styles.elevated,
  bare: styles.bare,
};

interface FieldShellProps {
  label?: string;
  hint?: string;
  error?: string | boolean;
  className?: string;
  children: React.ReactNode;
}

/** Shared label + control + hint/error scaffold. */
function FieldShell({ label, hint, error, className, children }: FieldShellProps) {
  const errorText = typeof error === "string" ? error : undefined;
  return (
    <label className={`${styles.field} ${className ?? ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      {children}
      {(errorText || hint) && (
        <span className={`${styles.hint} ${error ? styles.hintError : ""}`}>
          {errorText ?? hint}
        </span>
      )}
    </label>
  );
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * "elevated" (default) — the form / "open editor" look: bordered, rounded,
   * drop shadow, focus ring. Use in sign-in, onboarding, modals.
   * "bare" — quiet inline field: transparent, fills on hover, ring on focus,
   * no shadow. Used inside right-panel record fields.
   */
  variant?: InputVariant;
  label?: string;
  hint?: string;
  /** true for an error ring, or a string to also show the message. */
  error?: string | boolean;
  /** Leading icon (e.g. a search glyph) — insets the text. */
  leftIcon?: React.ReactNode;
}

/**
 * The canonical text input. One control, two skins (elevated for forms, bare for
 * inline fields), with label, hint, error state and an optional leading icon.
 * On the --sd-* tokens so it mirrors straight into apps/web.
 */
export const Input: React.FC<InputProps> = ({
  variant = "elevated",
  label,
  hint,
  error,
  leftIcon,
  className,
  ...rest
}) => {
  const control = (
    <input
      className={`${styles.control} ${VARIANT_CLASS[variant]} ${
        error ? styles.error : ""
      }`}
      {...rest}
    />
  );
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {leftIcon ? (
        <span className={styles.iconWrap}>
          {leftIcon}
          {control}
        </span>
      ) : (
        control
      )}
    </FieldShell>
  );
};

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  label?: string;
  hint?: string;
  error?: string | boolean;
}

/** Multi-line variant — same field scaffold, resizable control. */
export const Textarea: React.FC<TextareaProps> = ({
  variant = "elevated",
  label,
  hint,
  error,
  className,
  ...rest
}) => (
  <FieldShell label={label} hint={hint} error={error} className={className}>
    <textarea
      className={`${styles.control} ${styles.textarea} ${
        VARIANT_CLASS[variant]
      } ${error ? styles.error : ""}`}
      {...rest}
    />
  </FieldShell>
);

export default Input;
