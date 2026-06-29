"use client";

import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import styles from "./SectionCard.module.css";

export interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  elevated?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PADDING: Record<"none" | "sm" | "md" | "lg", string> = {
  none: "0",
  sm:   "10px 12px",
  md:   "16px",
  lg:   "24px",
};

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  footer,
  padding = "md",
  bordered = true,
  elevated = false,
  collapsible = false,
  defaultCollapsed = false,
  className,
  style,
}: SectionCardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const hasHeader = !!(title || subtitle || action || collapsible);

  return (
    <div
      className={[
        styles.root,
        bordered  ? styles.bordered  : "",
        elevated  ? styles.elevated  : "",
        className ?? "",
      ].filter(Boolean).join(" ")}
      style={style}
    >
      {hasHeader && (
        <div
          className={styles.header}
          onClick={collapsible ? () => setCollapsed(c => !c) : undefined}
          style={{ cursor: collapsible ? "pointer" : "default" }}
        >
          <div className={styles.headerLeft}>
            {title && <span className={styles.title}>{title}</span>}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
          <div className={styles.headerRight}>
            {action && <div onClick={e => e.stopPropagation()}>{action}</div>}
            {collapsible && (
              <IconChevronDown
                size={16}
                className={styles.chevron}
                style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}
              />
            )}
          </div>
        </div>
      )}

      {!collapsed && (
        <div style={{ padding: PADDING[padding] }}>
          {children}
        </div>
      )}

      {!collapsed && footer && (
        <div className={styles.footer}>
          <div style={{ padding: PADDING[padding] }}>
            {footer}
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionCard;
