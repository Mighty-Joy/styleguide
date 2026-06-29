"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import styles from "./CreatorPanel.module.css";

export interface CreatorPanelTab {
  value: string;
  label: string;
  badge?: number;
  content: React.ReactNode;
}

export interface CreatorPanelProps {
  /** Header slot — identity row + actions, rendered above the tabs */
  header: React.ReactNode;
  tabs: CreatorPanelTab[];
  defaultTab?: string;
  onClose?: () => void;
  onExpand?: () => void;
  className?: string;
}

/**
 * Creator Right Panel shell — sticky header with tab bar, scrollable body.
 * Compose by passing a `header` node and `tabs` with content.
 * The panel handles tab state and scroll isolation; callers own the content.
 */
export function CreatorPanel({
  header,
  tabs,
  defaultTab,
  onClose,
  onExpand,
  className,
}: CreatorPanelProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.value ?? "");
  const content = tabs.find((t) => t.value === active)?.content;

  return (
    <div className={`${styles.panel} ${className ?? ""}`}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerMeta}>{header}</div>
          <div className={styles.headerActions}>
            {onExpand && (
              <button
                type="button"
                className={styles.iconBtn}
                onClick={onExpand}
                aria-label="Expand"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.5 1.5H12.5V5.5M5.5 12.5H1.5V8.5M12.5 1.5L8 7M1.5 12.5L6 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            {onClose && (
              <button
                type="button"
                className={styles.iconBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.tabBar}>
          <Tabs
            tabs={tabs.map((t) => ({ label: t.label, value: t.value, badge: t.badge }))}
            value={active}
            onChange={setActive}
          />
        </div>
      </div>

      <div className={styles.body}>{content}</div>
    </div>
  );
}

export default CreatorPanel;
