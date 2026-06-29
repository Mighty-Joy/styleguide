"use client";

import React from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./EmptyState.module.css";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
}

export interface EmptyStateProps {
  /** Tabler icon component (pass the component itself, not JSX). */
  icon?: React.ElementType;
  title: string;
  description?: string;
  actions?: EmptyStateAction[];
  /** visual size — 'sm' for inline/cell use, 'md' default, 'lg' for full-pane */
  size?: "sm" | "md" | "lg";
  /** Hint shown below actions, e.g. "Or import from a CSV" */
  hint?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actions = [],
  size = "md",
  hint,
}: EmptyStateProps) {
  const iconSize = size === "sm" ? 20 : size === "lg" ? 40 : 28;

  return (
    <div className={`${styles.root} ${styles[size]}`}>
      {Icon && (
        <div className={styles.iconWrap}>
          <Icon size={iconSize} />
        </div>
      )}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((a) => (
            <Button
              key={a.label}
              variant={a.variant === "ghost" ? "secondary" : "primary"}
              onClick={a.onClick}
            >
              {a.label}
            </Button>
          ))}
        </div>
      )}
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
