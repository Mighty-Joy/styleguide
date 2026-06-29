"use client";

import React from "react";
import styles from "./FormLayout.module.css";

export interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  required?: boolean;
}

export interface FormLayoutProps {
  children: React.ReactNode;
  dividers?: boolean;
}

export function FormSection({ title, description, children, required }: FormSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.label}>
        <span className={styles.title}>
          {title}
          {required && <span className={styles.required}> *</span>}
        </span>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      <div className={styles.field}>
        {children}
      </div>
    </div>
  );
}

export function FormLayout({ children, dividers = true }: FormLayoutProps) {
  const items = React.Children.toArray(children);
  return (
    <div className={styles.layout}>
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {child}
          {dividers && i < items.length - 1 && <hr className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
}
