"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ElementType;
  description?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export type DropdownSection = DropdownItem[];

export type DropdownAlign = "start" | "end";
export type DropdownSide  = "bottom" | "top";

export interface DropdownProps {
  /** The button/element that opens the menu. */
  trigger: React.ReactElement;
  sections: DropdownSection[];
  align?: DropdownAlign;
  side?: DropdownSide;
  width?: number;
}

export default function Dropdown({
  trigger,
  sections,
  align = "end",
  side = "bottom",
  width = 200,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const originalProps = trigger.props as Record<string, unknown>;
  const triggerWithOpen = React.cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(v => !v);
      if (typeof originalProps.onClick === "function") originalProps.onClick(e);
    },
    "aria-expanded": open,
    "aria-haspopup": "menu",
  } as Record<string, unknown>);

  const menuStyle: React.CSSProperties = {
    width,
    [side === "bottom" ? "top" : "bottom"]: "calc(100% + 4px)",
    [align === "end" ? "right" : "left"]: 0,
  };

  return (
    <div className={styles.root} ref={rootRef}>
      {triggerWithOpen}
      {open && (
        <div className={styles.menu} style={menuStyle} role="menu">
          {sections.map((section, si) => (
            <React.Fragment key={si}>
              {si > 0 && <div className={styles.divider} />}
              {section.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    className={`${styles.item} ${item.destructive ? styles.destructive : ""} ${item.disabled ? styles.disabled : ""}`}
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                  >
                    {Icon && <Icon size={14} className={styles.itemIcon} />}
                    <span className={styles.itemContent}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.description && <span className={styles.itemDesc}>{item.description}</span>}
                    </span>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
