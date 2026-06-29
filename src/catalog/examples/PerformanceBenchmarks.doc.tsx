"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconUsers,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type SortKey = "er" | "views" | "reach" | "roas" | "cost";
type SortDir = "asc" | "desc";

interface Campaign {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  status: "active" | "completed" | "paused";
  creators: number;
  reach: number;
  views: number;
  engagements: number;
  er: number;       // engagement rate %
  spend: number;
  roas: number;     // return on ad spend
  costPer1k: number;
  startDate: string;
  industry: "beauty" | "tech" | "fitness" | "lifestyle";
}

/* ---- seed data ---- */

const CAMPAIGNS: Campaign[] = [
  { id: "c1", name: "Summer Glow",     initials: "SG", tone: "green",     status: "active",    creators: 6,  reach: 1_240_000, views: 480_000, engagements: 38_400, er: 8.0,  spend: 18_400, roas: 3.2, costPer1k: 38,  startDate: "Jun 1",  industry: "beauty"    },
  { id: "c2", name: "FitLife Q2",      initials: "FL", tone: "orange",    status: "active",    creators: 9,  reach: 2_100_000, views: 910_000, engagements: 54_600, er: 6.0,  spend: 32_000, roas: 2.6, costPer1k: 35,  startDate: "May 15", industry: "fitness"   },
  { id: "c3", name: "Tech Drop",       initials: "TD", tone: "blue",      status: "completed", creators: 4,  reach: 890_000,   views: 210_000, engagements: 12_600, er: 6.0,  spend: 11_200, roas: 4.1, costPer1k: 53,  startDate: "Apr 3",  industry: "tech"      },
  { id: "c4", name: "Daily Ritual",    initials: "DR", tone: "purple",    status: "completed", creators: 12, reach: 3_800_000, views: 1_140_000,engagements: 91_200, er: 8.0, spend: 58_000, roas: 3.8, costPer1k: 51,  startDate: "Mar 10", industry: "lifestyle" },
  { id: "c5", name: "Winter Skin",     initials: "WS", tone: "turquoise", status: "paused",    creators: 5,  reach: 640_000,   views: 192_000, engagements: 9_600,  er: 5.0,  spend: 8_400,  roas: 1.9, costPer1k: 44,  startDate: "Feb 20", industry: "beauty"    },
];

const STATUS_TONE: Record<Campaign["status"], keyof typeof TONES> = {
  active:    "green",
  completed: "blue",
  paused:    "yellow",
};

function fmt(n: number, unit?: "K" | "M" | "$"): string {
  if (unit === "$") return `$${n >= 1000 ? (n / 1000).toFixed(0) + "k" : n}`;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

/* inline bar — shows value relative to max in column */
function Bar({ value, max, tone = "#111" }: { value: number; max: number; tone?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: tone, transition: "width 0.3s ease" }} />
      </div>
      <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", minWidth: 28, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

/* percentile rank badge */
function Rank({ rank, total }: { rank: number; total: number }) {
  const pct = Math.round(((total - rank) / total) * 100);
  const tone: keyof typeof TONES = pct >= 75 ? "green" : pct >= 40 ? "yellow" : "red";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", fontSize: 10, fontWeight: 700, color: TONES[tone].text, background: TONES[tone].tint, borderRadius: 99, padding: "2px 6px" }}>
      P{pct}
    </span>
  );
}

/* sortable column header */
function ColHeader({ label, sortKey, current, dir, onSort }: {
  label: string; sortKey: SortKey;
  current: SortKey; dir: SortDir;
  onSort: (k: SortKey) => void;
}) {
  const active = current === sortKey;
  const Icon = active ? (dir === "desc" ? IconChevronDown : IconChevronUp) : IconChevronDown;
  return (
    <th
      onClick={() => onSort(sortKey)}
      style={{
        padding: "8px 12px", textAlign: "right", whiteSpace: "nowrap",
        cursor: "pointer", userSelect: "none",
        color: active ? "var(--sd-font-primary, #111)" : "var(--sd-font-tertiary, #999)",
        fontWeight: active ? 700 : 500, fontSize: 11,
        background: "transparent", border: "none",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
        {label}
        <Icon size={10} style={{ opacity: active ? 1 : 0.4 }} />
      </span>
    </th>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [sortKey, setSortKey] = useState<SortKey>("er");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set(["c1", "c2", "c3"]));
  const [showAll, setShowAll] = useState(false);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir((d) => d === "desc" ? "asc" : "desc");
    else { setSortKey(k); setSortDir("desc"); }
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const visible = showAll ? CAMPAIGNS : CAMPAIGNS.filter((c) => selected.has(c.id));

  const sorted = [...visible].sort((a, b) => {
    const v = { er: [a.er, b.er], views: [a.views, b.views], reach: [a.reach, b.reach], roas: [a.roas, b.roas], cost: [a.costPer1k, b.costPer1k] }[sortKey];
    return sortDir === "desc" ? v[1] - v[0] : v[0] - v[1];
  });

  const maxViews = Math.max(...CAMPAIGNS.map((c) => c.views));
  const maxReach = Math.max(...CAMPAIGNS.map((c) => c.reach));

  // rank within ALL campaigns (even unselected) for percentile
  const ranked = (key: "er" | "roas") => (id: string) => {
    const sorted2 = [...CAMPAIGNS].sort((a, b) => a[key] - b[key]);
    return sorted2.findIndex((c) => c.id === id) + 1;
  };
  const erRank  = ranked("er");
  const roasRank = ranked("roas");

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>Campaign benchmarks</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginTop: 1 }}>
            Showing {visible.length} of {CAMPAIGNS.length} campaigns · sorted by {sortKey.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show selected" : "Show all"}
          </Button>
          <Button variant="primary" size="sm">Export CSV</Button>
        </div>
      </div>

      {/* Campaign selector */}
      {!showAll && (
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {CAMPAIGNS.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleSelect(c.id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                height: 28, padding: "0 10px", borderRadius: 99,
                border: "1px solid",
                borderColor: selected.has(c.id) ? TONES[c.tone].text : "var(--sd-border-default, #e5e7eb)",
                background: selected.has(c.id) ? TONES[c.tone].tint : "transparent",
                cursor: "pointer", fontSize: 12, fontWeight: 500,
                color: selected.has(c.id) ? TONES[c.tone].text : "var(--sd-font-secondary, #666)",
              }}
            >
              <Avatar initials={c.initials} tone={c.tone} size="xs" />
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)", whiteSpace: "nowrap" }}>Campaign</th>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Status</th>
              <ColHeader label="ER"         sortKey="er"    current={sortKey} dir={sortDir} onSort={toggleSort} />
              <ColHeader label="Views"      sortKey="views" current={sortKey} dir={sortDir} onSort={toggleSort} />
              <ColHeader label="Reach"      sortKey="reach" current={sortKey} dir={sortDir} onSort={toggleSort} />
              <ColHeader label="ROAS"       sortKey="roas"  current={sortKey} dir={sortDir} onSort={toggleSort} />
              <ColHeader label="CPM"        sortKey="cost"  current={sortKey} dir={sortDir} onSort={toggleSort} />
              <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Views vs best</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom: i < sorted.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none",
                  background: i % 2 === 0 ? "transparent" : "var(--sd-bg-secondary, #fafafa)",
                }}
              >
                {/* Campaign */}
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={c.initials} tone={c.tone} size="sm" />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{c.creators} creators · {c.startDate}</div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td style={{ padding: "10px 12px" }}>
                  <Badge label={c.status} tone={STATUS_TONE[c.status]} size="sm" />
                </td>

                {/* ER */}
                <td style={{ padding: "10px 12px", textAlign: "right" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                    <span style={{ fontWeight: 700, color: c.er >= 7 ? TONES.green.text : c.er >= 5 ? "var(--sd-font-primary, #111)" : TONES.red.text }}>
                      {c.er.toFixed(1)}%
                    </span>
                    <Rank rank={erRank(c.id)} total={CAMPAIGNS.length} />
                  </div>
                </td>

                {/* Views */}
                <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>
                  {fmt(c.views)}
                </td>

                {/* Reach */}
                <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--sd-font-secondary, #555)" }}>
                  {fmt(c.reach)}
                </td>

                {/* ROAS */}
                <td style={{ padding: "10px 12px", textAlign: "right" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                    <span style={{ fontWeight: 700, color: c.roas >= 3 ? TONES.green.text : c.roas >= 2 ? "var(--sd-font-primary, #111)" : TONES.red.text }}>
                      {c.roas.toFixed(1)}×
                    </span>
                    <Rank rank={roasRank(c.id)} total={CAMPAIGNS.length} />
                  </div>
                </td>

                {/* CPM */}
                <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--sd-font-secondary, #555)" }}>
                  ${c.costPer1k}
                </td>

                {/* Bar */}
                <td style={{ padding: "10px 14px", minWidth: 140 }}>
                  <Bar value={c.views} max={maxViews} tone={TONES[c.tone].text} />
                </td>
              </tr>
            ))}
          </tbody>

          {/* Summary row */}
          <tfoot>
            <tr style={{ borderTop: "2px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              <td colSpan={2} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Avg ({sorted.length})
              </td>
              <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontSize: 12, color: "var(--sd-font-primary, #111)" }}>
                {(sorted.reduce((s, c) => s + c.er, 0) / sorted.length).toFixed(1)}%
              </td>
              <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontSize: 12, color: "var(--sd-font-primary, #111)" }}>
                {fmt(Math.round(sorted.reduce((s, c) => s + c.views, 0) / sorted.length))}
              </td>
              <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 12, color: "var(--sd-font-secondary, #555)" }}>
                {fmt(Math.round(sorted.reduce((s, c) => s + c.reach, 0) / sorted.length))}
              </td>
              <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontSize: 12, color: "var(--sd-font-primary, #111)" }}>
                {(sorted.reduce((s, c) => s + c.roas, 0) / sorted.length).toFixed(1)}×
              </td>
              <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 12, color: "var(--sd-font-secondary, #555)" }}>
                ${Math.round(sorted.reduce((s, c) => s + c.costPer1k, 0) / sorted.length)}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
        {[
          { label: "P75+ = top quartile",  color: TONES.green.text,  bg: TONES.green.tint  },
          { label: "P40–74 = mid",          color: TONES.yellow.text, bg: TONES.yellow.tint },
          { label: "< P40 = below avg",     color: TONES.red.text,    bg: TONES.red.tint    },
        ].map(({ label, color, bg }) => (
          <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color }}>
            <span style={{ display: "inline-block", width: 20, height: 12, borderRadius: 99, background: bg, border: `1px solid ${color}22` }} />
            {label}
          </span>
        ))}
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>· Percentile within your campaigns</span>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "performance-benchmarks",
  title: "PerformanceBenchmarks",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Cross-campaign comparison table — sortable metrics, percentile rank badges, inline progress bars, and summary averages.",
  description:
    "The reporting surface for comparing campaign performance. Campaign selector pills let you pick 1–N campaigns to compare. Columns: ER (with percentile rank), views, reach, ROAS (with percentile rank), CPM, and a views-vs-best inline bar. Click any column header to sort. Footer shows averages across visible rows. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign benchmark table",
      description: "Click column headers to sort. Toggle campaigns via the selector pills. Show All reveals every campaign.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
