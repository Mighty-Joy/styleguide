"use client";

import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "tertiary"
  | "danger"
  | "ghost";
export type ButtonSize = "md" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon before the label. */
  leftIcon?: React.ReactNode;
  /** Icon after the label. */
  rightIcon?: React.ReactNode;
  /** Square icon-only button (children is the glyph, no label). */
  iconOnly?: boolean;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  brand: styles.brand,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  danger: styles.danger,
  ghost: styles.ghost,
};

/**
 * The canonical button. Black primary action, green brand CTA (landing page
 * only), neutral/ghost/danger variants, two sizes, optional icons.
 */
const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  leftIcon,
  rightIcon,
  iconOnly = false,
  className,
  children,
  type = "button",
  ...rest
}) => {
  const classes = [
    styles.btn,
    VARIANT_CLASS[variant],
    size === "sm" ? styles.sm : "",
    iconOnly ? (size === "sm" ? styles.iconOnlySm : styles.iconOnly) : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;
