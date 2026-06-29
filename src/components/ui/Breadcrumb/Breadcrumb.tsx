"use client";

import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron";
}

export function Breadcrumb({ items, separator = "chevron" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.root}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const Icon = item.icon;
          return (
            <li key={i} className={styles.item}>
              {i > 0 && (
                <span className={styles.sep} aria-hidden>
                  {separator === "chevron"
                    ? <IconChevronRight size={12} />
                    : <span>/</span>
                  }
                </span>
              )}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {Icon && <Icon size={13} style={{ marginRight: 4, flexShrink: 0 }} />}
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className={styles.link}>
                  {Icon && <Icon size={13} style={{ marginRight: 4, flexShrink: 0 }} />}
                  {item.label}
                </a>
              ) : (
                <span className={styles.plain}>
                  {Icon && <Icon size={13} style={{ marginRight: 4, flexShrink: 0 }} />}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
