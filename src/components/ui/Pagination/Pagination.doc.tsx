"use client";

import React, { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconDots } from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Pagination component                                                  */
/* ------------------------------------------------------------------ */

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblings?: number;
  size?: "sm" | "md";
  showEdges?: boolean;
}

function getRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(page: number, total: number, siblings: number): (number | "dots")[] {
  const totalVisible = siblings * 2 + 5; // siblings + first + last + 2 dots + current
  if (total <= totalVisible) return getRange(1, total);

  const leftSib = Math.max(page - siblings, 2);
  const rightSib = Math.min(page + siblings, total - 1);

  const showLeft  = leftSib  > 2;
  const showRight = rightSib < total - 1;

  if (!showLeft && showRight) {
    const leftRange = getRange(1, 3 + siblings * 2);
    return [...leftRange, "dots", total];
  }
  if (showLeft && !showRight) {
    const rightRange = getRange(total - (3 + siblings * 2) + 1, total);
    return [1, "dots", ...rightRange];
  }
  return [1, "dots", ...getRange(leftSib, rightSib), "dots", total];
}

function Pagination({
  page,
  totalPages,
  onChange,
  siblings = 1,
  size = "md",
  showEdges = true,
}: PaginationProps) {
  const pages = buildPages(page, totalPages, siblings);
  const btnSize  = size === "sm" ? 28 : 32;
  const fontSize = size === "sm" ? 11 : 13;

  const btnStyle = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    width: btnSize, height: btnSize, minWidth: btnSize,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    border: active ? "none" : "1px solid var(--sd-border-medium)",
    borderRadius: "var(--sd-radius-sm)",
    background: active ? "var(--sd-bg-inverted)" : "var(--sd-bg-primary)",
    color: active ? "var(--sd-font-inverted)" : disabled ? "var(--sd-font-tertiary)" : "var(--sd-font-primary)",
    fontSize, fontWeight: active ? 700 : 500,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    fontFamily: "var(--sd-font-stack)",
    transition: "background 0.1s, border-color 0.1s",
  });

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {/* Prev */}
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => page > 1 && onChange(page - 1)}
        style={btnStyle(false, page <= 1)}
        aria-label="Previous page"
      >
        <IconChevronLeft size={size === "sm" ? 13 : 15} />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "dots" ? (
          <span key={`dots-${i}`} style={{ width: btnSize, height: btnSize, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <IconDots size={14} style={{ color: "var(--sd-font-tertiary)" }} />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            style={btnStyle(p === page)}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => page < totalPages && onChange(page + 1)}
        style={btnStyle(false, page >= totalPages)}
        aria-label="Next page"
      >
        <IconChevronRight size={size === "sm" ? 13 : 15} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demos                                                                 */
/* ------------------------------------------------------------------ */

function BasicDemo() {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pagination page={page} totalPages={10} onChange={setPage} />
      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Page {page} of 10</span>
    </div>
  );
}

function ManyPagesDemo() {
  const [page, setPage] = useState(14);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pagination page={page} totalPages={50} onChange={setPage} siblings={2} />
      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Page {page} of 50 · 2 siblings</span>
    </div>
  );
}

function SmallDemo() {
  const [page, setPage] = useState(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pagination page={page} totalPages={8} onChange={setPage} size="sm" />
      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>sm size — for toolbars and table footers</span>
    </div>
  );
}

function WithContextDemo() {
  const [page, setPage] = useState(2);
  const PER_PAGE = 25;
  const TOTAL = 312;
  const totalPages = Math.ceil(TOTAL / PER_PAGE);
  const start = (page - 1) * PER_PAGE + 1;
  const end   = Math.min(page * PER_PAGE, TOTAL);

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", maxWidth: 520 }}>
      {/* Mock table header */}
      <div style={{ padding: "0 16px", borderBottom: "1px solid var(--sd-border-light)", display: "flex" }}>
        {["Creator", "Platform", "Followers", "Status"].map(h => (
          <div key={h} style={{ flex: 1, padding: "10px 0", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
        ))}
      </div>
      {/* Mock rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid var(--sd-border-light)", display: "flex", alignItems: "center" }}>
          {["Creator name", "Instagram", "184K", "Active"].map(v => (
            <div key={v} style={{ flex: 1, fontSize: 12, color: "var(--sd-font-secondary)" }}>{v}</div>
          ))}
        </div>
      ))}
      {/* Footer */}
      <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
          Showing {start}–{end} of {TOTAL} creators
        </span>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} size="sm" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "pagination",
  title: "Pagination",
  group: "Core Components",
  status: "stable",
  summary: "Page navigation control with smart ellipsis for lists, tables, and search results.",
  description:
    "Pagination renders a prev/next chevron pair with numbered page buttons between them. Smart ellipsis collapses distant pages into a `…` marker — the number of visible sibling pages around the current page is controlled by `siblings` (default 1). Two sizes: `md` (32px buttons, default) for standalone use, `sm` (28px) for table footers and toolbars. Fully controlled: parent owns page state via `page` + `onChange`. Prev/next buttons are disabled at boundaries.",
  demos: [
    { title: "Basic — 10 pages",    render: () => <BasicDemo /> },
    { title: "Many pages with wider siblings", render: () => <ManyPagesDemo /> },
    { title: "sm size",             render: () => <SmallDemo /> },
    { title: "In a table footer",   render: () => <WithContextDemo />, block: true },
  ],
  props: [
    {
      title: "Pagination",
      rows: [
        { name: "page",        type: "number",                  required: true,  description: "Currently active page (1-indexed)." },
        { name: "totalPages",  type: "number",                  required: true,  description: "Total number of pages." },
        { name: "onChange",    type: "(page: number) => void",  required: true,  description: "Called with the new page number when a button is clicked." },
        { name: "siblings",    type: "number",                  required: false, description: "Number of page buttons shown on each side of the current page. Default 1." },
        { name: "size",        type: '"sm" | "md"',             required: false, description: 'Button size. Default "md" (32px). Use "sm" for table footers.' },
      ],
    },
  ],
};

export default doc;
