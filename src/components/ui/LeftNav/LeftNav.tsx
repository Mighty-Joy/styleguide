"use client";

import React from "react";
import styles from "./LeftNav.module.css";

export interface NavItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface NavSection {
  items: NavItem[];
}

export interface LeftNavProps {
  sections: NavSection[];
  value?: string;
  onSelect?: (value: string) => void;
  /** Workspace name shown at the top */
  workspace?: string;
  /** User display name shown at the bottom */
  userName?: string;
  /** User initials for avatar */
  userInitials?: string;
  className?: string;
}

export function LeftNav({
  sections,
  value,
  onSelect,
  workspace = "Superdeal",
  userName,
  userInitials,
  className,
}: LeftNavProps) {
  return (
    <nav className={`${styles.nav} ${className ?? ""}`} aria-label="Main navigation">
      {/* workspace header */}
      <div className={styles.workspace}>
        <span className={styles.wsLogo}>SD</span>
        <span className={styles.wsName}>{workspace}</span>
      </div>

      {/* nav sections */}
      <div className={styles.body}>
        {sections.map((section, si) => (
          <div key={si} className={styles.section}>
            {section.items.map((item) => {
              const active = item.value === value;
              return (
                <button
                  key={item.value}
                  type="button"
                  className={`${styles.item} ${active ? styles.active : ""}`}
                  onClick={() => onSelect?.(item.value)}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.itemIcon}>{item.icon}</span>
                  <span className={styles.itemLabel}>{item.label}</span>
                  {item.badge != null && item.badge > 0 && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* user footer */}
      {userName && (
        <div className={styles.footer}>
          <div className={styles.user}>
            <span className={styles.avatar}>{userInitials ?? userName[0]}</span>
            <span className={styles.userName}>{userName}</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default LeftNav;
