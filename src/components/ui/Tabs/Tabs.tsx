"use client";

import React from "react";
import styles from "./Tabs.module.css";

export interface TabOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  badge?: number;
}

export type TabVariant = "underline" | "pill";

export interface TabsProps {
  tabs: TabOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: TabVariant;
  className?: string;
}

export function Tabs({
  tabs,
  value,
  onChange,
  variant = "underline",
  className,
}: TabsProps) {
  return (
    <div
      className={[styles.root, styles[variant], className ?? ""].filter(Boolean).join(" ")}
      role="tablist"
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.tab} ${active ? styles.active : ""}`}
            onClick={() => onChange(tab.value)}
          >
            {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
            {tab.label}
            {tab.badge != null && tab.badge > 0 && (
              <span className={styles.badge}>{tab.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
