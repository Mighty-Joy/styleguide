"use client";

import React, { useState, useMemo } from "react";
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconDotsVertical,
  IconSearch,
  IconDownload,
  IconFilter,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type SortDir = "asc" | "desc" | null;

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  align?: "left" | "right" | "center";
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  selectable?: boolean;
  stickyHeader?: boolean;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

/* ------------------------------------------------------------------ */
/* DataTable component                                                   */
/* ------------------------------------------------------------------ */

function DataTable<T extends { id: string }>({
  columns,
  rows,
  selectable = false,
  onRowClick,
  emptyMessage = "No data",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); return; }
    if (sortDir === "asc") { setSortDir("desc"); return; }
    setSortKey(null); setSortDir(null);
  };

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return rows;
    return [...rows].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av === bv) return 0;
      const cmp = av! < bv! ? -1 : 1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir]);

  const allSelected = rows.length > 0 && rows.every(r => selected.has(r.id));

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map(r => r.id)));

  const toggleRow = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const SortIcon = ({ col }: { col: Column<T> }) => {
    if (!col.sortable) return null;
    if (sortKey !== col.key) return <IconSelector size={12} style={{ color: "var(--sd-font-tertiary)", opacity: 0.5 }} />;
    return sortDir === "asc"
      ? <IconChevronUp size={12} style={{ color: "var(--sd-accent)" }} />
      : <IconChevronDown size={12} style={{ color: "var(--sd-accent)" }} />;
  };

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {selected.size > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: TONES.blue.tint, borderBottom: "1px solid var(--sd-border-light)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: TONES.blue.text }}>{selected.size} selected</span>
          <Button variant="tertiary" size="sm" onClick={() => setSelected(new Set())}>Clear</Button>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <Button variant="primary" size="sm">Send offer</Button>
            <Button variant="secondary" size="sm">Export</Button>
          </div>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
              {selectable && (
                <th style={{ width: 40, padding: "10px 14px", textAlign: "left" }}>
                  <input type="checkbox" checked={allSelected} onChange={toggleAll}
                    style={{ width: 14, height: 14, cursor: "pointer" }} />
                </th>
              )}
              {columns.map(col => (
                <th key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  style={{
                    width: col.width, padding: "10px 14px", textAlign: col.align ?? "left",
                    fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    cursor: col.sortable ? "pointer" : "default",
                    userSelect: "none", whiteSpace: "nowrap",
                  }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {col.label}<SortIcon col={col} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{ padding: "32px 14px", textAlign: "center", fontSize: 13, color: "var(--sd-font-tertiary)" }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : sorted.map((row, i) => (
              <tr key={row.id}
                onClick={() => onRowClick?.(row)}
                style={{
                  borderBottom: i < sorted.length - 1 ? "1px solid var(--sd-border-light)" : "none",
                  background: selected.has(row.id) ? TONES.blue.tint : "var(--sd-bg-primary)",
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "background 0.08s",
                }}
                onMouseOver={e => { if (!selected.has(row.id)) (e.currentTarget as HTMLTableRowElement).style.background = "var(--sd-bg-secondary)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLTableRowElement).style.background = selected.has(row.id) ? TONES.blue.tint : "var(--sd-bg-primary)"; }}
              >
                {selectable && (
                  <td style={{ padding: "10px 14px" }} onClick={e => { e.stopPropagation(); toggleRow(row.id); }}>
                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleRow(row.id)}
                      style={{ width: 14, height: 14, cursor: "pointer" }} />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} style={{ padding: "10px 14px", textAlign: col.align ?? "left", fontSize: 13, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo data                                                             */
/* ------------------------------------------------------------------ */

interface CreatorRow {
  id: string;
  name: string;
  handle: string;
  initials: string;
  tone: keyof typeof TONES;
  platform: "instagram" | "tiktok" | "youtube";
  category: string;
  followers: number;
  engagement: number;
  avgViews: number;
  status: "active" | "pending" | "paused";
}

const CREATOR_ROWS: CreatorRow[] = [
  { id: "r1", name: "Priya Nair",    handle: "@priya_creates",  initials: "PN", tone: "sky",       platform: "instagram", category: "Beauty",   followers: 184000, engagement: 4.8, avgViews: 22000, status: "active"  },
  { id: "r2", name: "Sam Kim",       handle: "@sam.life",       initials: "SK", tone: "orange",    platform: "tiktok",    category: "Lifestyle",followers: 420000, engagement: 3.9, avgViews: 58000, status: "active"  },
  { id: "r3", name: "Tomohiro V",    handle: "@tomohiro_v",     initials: "TV", tone: "turquoise", platform: "youtube",   category: "Fitness",  followers: 98000,  engagement: 6.2, avgViews: 14000, status: "pending" },
  { id: "r4", name: "Mara Voss",     handle: "@mara.aesthetic", initials: "MV", tone: "purple",    platform: "instagram", category: "Fashion",  followers: 61000,  engagement: 5.1, avgViews: 8000,  status: "paused"  },
  { id: "r5", name: "Lena Fischer",  handle: "@lena.vis",       initials: "LF", tone: "pink",      platform: "instagram", category: "Travel",   followers: 210000, engagement: 4.4, avgViews: 31000, status: "active"  },
  { id: "r6", name: "Jordan Ellis",  handle: "@jordanellis",    initials: "JE", tone: "green",     platform: "youtube",   category: "Tech",     followers: 312000, engagement: 2.8, avgViews: 48000, status: "active"  },
  { id: "r7", name: "Chloe Park",    handle: "@chloe.daily",    initials: "CP", tone: "yellow",    platform: "tiktok",    category: "Food",     followers: 780000, engagement: 5.8, avgViews: 112000,status: "pending" },
  { id: "r8", name: "Ravi Mehta",    handle: "@ravimehta_fit",  initials: "RM", tone: "blue",      platform: "instagram", category: "Fitness",  followers: 145000, engagement: 7.1, avgViews: 19000, status: "active"  },
];

const PLATFORM_ICONS = { instagram: IconBrandInstagram, tiktok: IconBrandTiktok, youtube: IconBrandYoutube };

const STATUS_META = {
  active:  { label: "Active",  tone: "green"  as const },
  pending: { label: "Pending", tone: "yellow" as const },
  paused:  { label: "Paused",  tone: "gray"   as const },
};

function fNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/* ------------------------------------------------------------------ */
/* Demo wrapper with search + toolbar                                    */
/* ------------------------------------------------------------------ */

const CREATOR_COLUMNS: Column<CreatorRow>[] = [
  {
    key: "name", label: "Creator", width: "30%",
    render: r => {
      const t = TONES[r.tone];
      const PlatIcon = PLATFORM_ICONS[r.platform];
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.solid, color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {r.initials}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", display: "flex", alignItems: "center", gap: 2 }}>
              {r.handle} <PlatIcon size={10} />
            </div>
          </div>
        </div>
      );
    },
  },
  {
    key: "category", label: "Category", sortable: true, width: 100,
    render: r => <span style={{ fontSize: 11 }}>{r.category}</span>,
  },
  {
    key: "followers", label: "Followers", sortable: true, width: 90, align: "right",
    render: r => <span style={{ fontWeight: 700 }}>{fNum(r.followers)}</span>,
  },
  {
    key: "engagement", label: "Eng. rate", sortable: true, width: 90, align: "right",
    render: r => (
      <span style={{ fontWeight: 700, color: r.engagement >= 5 ? TONES.green.text : r.engagement >= 3 ? "var(--sd-font-primary)" : TONES.red.text }}>
        {r.engagement}%
      </span>
    ),
  },
  {
    key: "avgViews", label: "Avg views", sortable: true, width: 90, align: "right",
    render: r => <span>{fNum(r.avgViews)}</span>,
  },
  {
    key: "status", label: "Status", width: 90,
    render: r => {
      const m = STATUS_META[r.status];
      const t = TONES[m.tone];
      return (
        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: "var(--sd-radius-pill)", background: t.tint, color: t.text }}>
          {m.label}
        </span>
      );
    },
  },
  {
    key: "actions", label: "", width: 40, align: "right",
    render: () => (
      <Button variant="tertiary" size="sm" iconOnly aria-label="More" onClick={e => e.stopPropagation()}>
        <IconDotsVertical size={14} />
      </Button>
    ),
  },
];

function CreatorTableDemo() {
  const [query, setQuery] = useState("");
  const filtered = CREATOR_ROWS.filter(r =>
    !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.handle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <Input
            variant="elevated"
            leftIcon={<IconSearch size={13} />}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search creators…"
          />
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconFilter size={12} />}>Filter</Button>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
      </div>

      <DataTable
        columns={CREATOR_COLUMNS}
        rows={filtered}
        selectable
        emptyMessage="No creators match your search."
      />

      <div style={{ marginTop: 8, fontSize: 11, color: "var(--sd-font-tertiary)" }}>
        {filtered.length} creator{filtered.length !== 1 ? "s" : ""} · Select rows for bulk actions
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "data-table",
  title: "DataTable",
  group: "Core Components",
  status: "stable",
  summary: "Sortable, selectable data table with column headers, bulk actions, row hover, and empty state.",
  description:
    "DataTable renders a `<table>` element with a sticky-style header row. Click any column header marked `sortable` to sort ascending, click again for descending, third click clears. Sorted column shows a chevron; unsorted sortable columns show a neutral selector icon. `selectable` adds a checkbox column — checking rows shows a bulk-action bar at the top with the selection count and contextual actions. Row `onRowClick` handler for drilldown navigation. Rows highlight on hover. Empty state renders a centered message when `rows` is empty. Column `render` functions accept the full row object — use them for custom cell content (avatars, badges, icons, action menus). Horizontally scrollable on narrow viewports via `overflow-x: auto`.",
  demos: [
    {
      title: "Creator roster table",
      description: "Click column headers to sort (Followers, Eng. rate, Avg views, Category). Check rows for bulk actions. Search filters by name or handle.",
      block: true,
      render: () => <CreatorTableDemo />,
    },
  ],
  props: [
    {
      title: "DataTable",
      rows: [
        { name: "columns",      type: "Column<T>[]",            required: true,  description: "Column definitions. Each has key, label, optional sortable, width, align, and a render function." },
        { name: "rows",         type: "T[]",                    required: true,  description: "Data rows. Each must have a string `id` field used as the React key and selection key." },
        { name: "selectable",   type: "boolean",                required: false, description: "Adds a checkbox column for row selection with bulk-action bar." },
        { name: "onRowClick",   type: "(row: T) => void",       required: false, description: "Called when a data row is clicked. Applies pointer cursor." },
        { name: "emptyMessage", type: "string",                 required: false, description: 'Text shown when rows is empty. Default "No data".' },
      ],
    },
    {
      title: "Column",
      rows: [
        { name: "key",      type: "string",                       required: true,  description: "Used as React key and for sort comparisons. Should match the row field name for sortable columns." },
        { name: "label",    type: "string",                       required: true,  description: "Header cell text." },
        { name: "sortable", type: "boolean",                      required: false, description: "Enables click-to-sort on this column." },
        { name: "width",    type: "number | string",              required: false, description: "Column width (px number or CSS string like '30%')." },
        { name: "align",    type: '"left" | "right" | "center"', required: false, description: 'Cell alignment. Default "left".' },
        { name: "render",   type: "(row: T) => React.ReactNode", required: true,  description: "Cell renderer. Receives the full row object." },
      ],
    },
  ],
};

export default doc;
