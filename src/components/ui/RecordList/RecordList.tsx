"use client";

import React from "react";
import styles from "./RecordList.module.css";

/**
 * The canonical record list. Use this for record-with-actions views (campaign
 * roster, shipments, posts, …) instead of a dense data grid. One component,
 * responsive across surfaces: aligned columns on desktop (CSS subgrid), stacked
 * cards on mobile.
 *
 * Anatomy per row: optional select checkbox · `lead` (identity, grows) ·
 * `columns` (aligned cells) · `actions` (trailing cluster). Clicking the row
 * fires `onRowClick`, except on inner controls (button / link / input / label).
 *
 * Re-authored lean from apps/web `components/ui/RecordList`: identical generic
 * render-function API; Mantine `Checkbox` swapped for a small on-brand native
 * checkbox so it stays dependency-free.
 */
export interface RecordColumn<T> {
  key: string;
  header?: React.ReactNode;
  render: (item: T) => React.ReactNode;
  /** Take the remaining horizontal space on desktop (default: shrink to content). */
  grow?: boolean;
  /** Hide this column in the mobile (stacked) layout. */
  collapseOnMobile?: boolean;
}

export interface RecordListProps<T> {
  items: T[];
  getId: (item: T) => string;
  /** Primary identity cell — always visible, grows to fill. */
  lead: (item: T) => React.ReactNode;
  leadHeader?: React.ReactNode;
  columns?: RecordColumn<T>[];
  /** Trailing action cluster. */
  actions?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  selection?: {
    selectedIds: string[];
    onToggle: (id: string) => void;
    ariaLabel?: (item: T) => string;
  };
  emptyMessage?: string;
}

function RecordList<T>({
  items,
  getId,
  lead,
  leadHeader,
  columns = [],
  actions,
  onRowClick,
  selection,
  emptyMessage = "Nothing here yet.",
}: RecordListProps<T>) {
  // Desktop grid template: [select?] [lead grows] [columns…] [actions?].
  const tracks: string[] = [];
  if (selection) tracks.push("auto");
  tracks.push("minmax(160px, 1.5fr)");
  for (const c of columns) tracks.push(c.grow ? "1fr" : "auto");
  if (actions) tracks.push("auto");
  const gridTemplateColumns = tracks.join(" ");

  const hasHeader =
    leadHeader != null || columns.some((c) => c.header != null);

  const handleRowClick = (item: T) => (e: React.MouseEvent) => {
    if (!onRowClick) return;
    const target = e.target as HTMLElement;
    // Don't navigate when an inner control was clicked.
    if (target.closest('button, [role="button"], a, input, label')) return;
    onRowClick(item);
  };

  return (
    <div className={styles.list} style={{ gridTemplateColumns }}>
      {hasHeader && (
        <div className={styles.header}>
          {selection && <span />}
          <span>{leadHeader}</span>
          {columns.map((c) => (
            <span
              key={c.key}
              className={c.collapseOnMobile ? styles.collapse : undefined}
            >
              {c.header}
            </span>
          ))}
          {actions && <span />}
        </div>
      )}

      {items.length === 0 ? (
        <div className={styles.empty}>{emptyMessage}</div>
      ) : (
        items.map((item) => {
          const id = getId(item);
          return (
            <div
              key={id}
              data-record-row
              className={`${styles.row}${onRowClick ? ` ${styles.rowClickable}` : ""}`}
              onClick={handleRowClick(item)}
            >
              {selection && (
                <span
                  className={styles.selectCell}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selection.selectedIds.includes(id)}
                    onChange={() => selection.onToggle(id)}
                    aria-label={selection.ariaLabel?.(item)}
                  />
                </span>
              )}
              <div className={styles.lead}>{lead(item)}</div>
              {columns.map((c) => (
                <div
                  key={c.key}
                  className={`${styles.cell}${
                    c.collapseOnMobile ? ` ${styles.collapse}` : ""
                  }`}
                >
                  {c.render(item)}
                </div>
              ))}
              {actions && <div className={styles.actions}>{actions(item)}</div>}
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecordList;
