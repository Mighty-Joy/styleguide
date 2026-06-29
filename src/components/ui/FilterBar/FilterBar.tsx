"use client";

import React, { useRef } from "react";
import { IconSearch, IconX, IconChevronDown, IconLayoutList, IconLayoutGrid } from "@tabler/icons-react";
import styles from "./FilterBar.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export interface FilterChip {
  key: string;
  label: string;
}

export interface SortOption {
  key: string;
  label: string;
}

export type FilterBarView = "list" | "grid";

export interface FilterBarProps {
  /** Current search string. */
  search: string;
  onSearchChange: (value: string) => void;

  /** Active filter chips shown after the search box. */
  chips?: FilterChip[];
  onChipRemove?: (key: string) => void;

  /** Sort selector — rendered as a dropdown trigger. */
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (key: string) => void;

  /** List/grid view toggle. Omit to hide. */
  view?: FilterBarView;
  onViewChange?: (view: FilterBarView) => void;

  /** Trailing slot for custom actions (e.g. an "Add" button). */
  actions?: React.ReactNode;

  placeholder?: string;
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function FilterBar({
  search,
  onSearchChange,
  chips = [],
  onChipRemove,
  sortOptions = [],
  sortValue,
  onSortChange,
  view,
  onViewChange,
  actions,
  placeholder = "Search…",
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = React.useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const activeSort = sortOptions.find(o => o.key === sortValue);

  // Close sort dropdown when clicking outside
  React.useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen]);

  return (
    <div className={styles.root}>
      {/* Search */}
      <div className={styles.searchWrap}>
        <IconSearch size={14} className={styles.searchIcon} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {search && (
          <button type="button" className={styles.clearBtn} onClick={() => onSearchChange("")} aria-label="Clear search">
            <IconX size={12} />
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {chips.map((chip) => (
        <span key={chip.key} className={styles.chip}>
          {chip.label}
          {onChipRemove && (
            <button type="button" className={styles.chipRemove} onClick={() => onChipRemove(chip.key)} aria-label={`Remove ${chip.label}`}>
              <IconX size={9} />
            </button>
          )}
        </span>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Sort dropdown */}
      {sortOptions.length > 0 && (
        <div className={styles.sortWrap} ref={sortRef}>
          <button type="button" className={styles.sortBtn} onClick={() => setSortOpen((v) => !v)}>
            <span className={styles.sortLabel}>{activeSort?.label ?? "Sort"}</span>
            <IconChevronDown size={12} className={`${styles.sortCaret} ${sortOpen ? styles.sortCaretOpen : ""}`} />
          </button>
          {sortOpen && (
            <div className={styles.sortDropdown}>
              {sortOptions.map((opt) => (
                <button key={opt.key} type="button"
                  className={`${styles.sortOption} ${opt.key === sortValue ? styles.sortOptionActive : ""}`}
                  onClick={() => { onSortChange?.(opt.key); setSortOpen(false); }}>
                  {opt.label}
                  {opt.key === sortValue && <span className={styles.sortCheck}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View toggle */}
      {view !== undefined && onViewChange && (
        <div className={styles.viewToggle}>
          <button type="button" className={`${styles.viewBtn} ${view === "list" ? styles.viewBtnActive : ""}`} onClick={() => onViewChange("list")} aria-label="List view">
            <IconLayoutList size={15} />
          </button>
          <button type="button" className={`${styles.viewBtn} ${view === "grid" ? styles.viewBtnActive : ""}`} onClick={() => onViewChange("grid")} aria-label="Grid view">
            <IconLayoutGrid size={15} />
          </button>
        </div>
      )}

      {/* Custom actions slot */}
      {actions}
    </div>
  );
}
