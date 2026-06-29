"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconDownload,
  IconChevronUp,
  IconChevronDown,
  IconMinus,
  IconCopy,
  IconCheck,
  IconTrendingUp,
  IconCurrencyDollar,
  IconPointer,
  IconShoppingCart,
  IconPercentage,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type SortKey = "clicks" | "orders" | "cvr" | "revenue" | "commission";
type SortDir = "asc" | "desc";
type CodeStatus = "active" | "paused" | "expired";

interface AffiliateRow {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  code: string;
  status: CodeStatus;
  clicks: number;
  orders: number;
  revenue: number;
  commissionPct: number;
}

/* ---- seed ---- */
const ROWS: AffiliateRow[] = [
  { id: "r1", name: "Priya Nair",   initials: "PN", tone: "green",     handle: "@priya.creates", code: "PRIYA20",  status: "active",  clicks: 8_420,  orders: 312, revenue: 28_080, commissionPct: 15 },
  { id: "r2", name: "Diego Santos", initials: "DS", tone: "orange",    handle: "@diegosantos",   code: "DIEGO15",  status: "active",  clicks: 5_810,  orders: 198, revenue: 17_820, commissionPct: 12 },
  { id: "r3", name: "Hana Kim",     initials: "HK", tone: "pink",      handle: "@hanakim_",      code: "HANA25",   status: "active",  clicks: 3_290,  orders: 147, revenue: 13_230, commissionPct: 18 },
  { id: "r4", name: "Marcus Webb",  initials: "MW", tone: "purple",    handle: "@marcuswebb",    code: "MARC10",   status: "paused",  clicks: 12_100, orders: 89,  revenue: 8_010,  commissionPct: 10 },
  { id: "r5", name: "Aisha Obi",    initials: "AO", tone: "turquoise", handle: "@aishaobi",      code: "AISHA20",  status: "expired", clicks: 1_890,  orders: 44,  revenue: 3_960,  commissionPct: 15 },
];

const STATUS_META: Record<CodeStatus, { tone: keyof typeof TONES; label: string }> = {
  active:  { tone: "green",  label: "Active"  },
  paused:  { tone: "yellow", label: "Paused"  },
  expired: { tone: "gray",   label: "Expired" },
};

function fmt(n: number) { return n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n); }
function fmtMoney(n: number) { return `$${n.toLocaleString()}`; }
function cvr(row: AffiliateRow) { return ((row.orders / row.clicks) * 100).toFixed(1); }
function commission(row: AffiliateRow) { return Math.round(row.revenue * (row.commissionPct / 100)); }

/* ---- Demo ---- */
function Demo() {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [copied, setCopied] = useState<string | null>(null);

  function setSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  }

  const sorted = [...ROWS].sort((a, b) => {
    let av = 0, bv = 0;
    if (sortKey === "clicks")     { av = a.clicks;         bv = b.clicks;         }
    if (sortKey === "orders")     { av = a.orders;         bv = b.orders;         }
    if (sortKey === "cvr")        { av = a.orders / a.clicks; bv = b.orders / b.clicks; }
    if (sortKey === "revenue")    { av = a.revenue;        bv = b.revenue;        }
    if (sortKey === "commission") { av = commission(a);    bv = commission(b);    }
    return sortDir === "desc" ? bv - av : av - bv;
  });

  const totals = {
    clicks:     ROWS.reduce((s, r) => s + r.clicks, 0),
    orders:     ROWS.reduce((s, r) => s + r.orders, 0),
    revenue:    ROWS.reduce((s, r) => s + r.revenue, 0),
    commission: ROWS.reduce((s, r) => s + commission(r), 0),
  };
  const avgCvr = ((totals.orders / totals.clicks) * 100).toFixed(1);
  const maxClicks = Math.max(...ROWS.map((r) => r.clicks));

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <IconMinus size={10} style={{ color: "var(--sd-font-tertiary, #999)", opacity: 0.4 }} />;
    return sortDir === "desc"
      ? <IconChevronDown size={10} style={{ color: "#111" }} />
      : <IconChevronUp   size={10} style={{ color: "#111" }} />;
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Affiliate performance</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow · All time · 5 creators</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export CSV</Button>
      </div>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
        {[
          { icon: IconPointer,  label: "Total clicks",   value: fmt(totals.clicks),          trend: "+18%" },
          { icon: IconShoppingCart,  label: "Total orders",   value: fmt(totals.orders),           trend: "+24%" },
          { icon: IconPercentage,    label: "Avg CVR",        value: `${avgCvr}%`,                 trend: "+0.4pp" },
          { icon: IconCurrencyDollar,label: "Affiliate rev",  value: fmtMoney(totals.revenue),     trend: "+31%" },
        ].map(({ icon: Icon, label, value, trend }) => (
          <div key={label} style={{ padding: "11px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
              <Icon size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2, fontSize: 10, fontWeight: 700, color: TONES.green.text }}>
              <IconTrendingUp size={10} />
              {trend} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Commission owed callout */}
      <div style={{ padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Total commission owed · this period</span>
          <div style={{ fontSize: 20, fontWeight: 900, marginTop: 2 }}>{fmtMoney(totals.commission)}</div>
        </div>
        <Button variant="primary" size="sm" leftIcon={<IconCurrencyDollar size={12} />}>Process payouts</Button>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Creator</th>
              <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Code</th>
              {([
                { key: "clicks" as SortKey,     label: "Clicks"    },
                { key: "orders" as SortKey,     label: "Orders"    },
                { key: "cvr" as SortKey,        label: "CVR"       },
                { key: "revenue" as SortKey,    label: "Revenue"   },
                { key: "commission" as SortKey, label: "Commission"},
              ]).map(({ key, label }) => (
                <th key={key} style={{ padding: "8px 10px", textAlign: "right", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", cursor: "pointer", userSelect: "none" }} onClick={() => setSort(key)}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>{label} <SortIcon k={key} /></span>
                </th>
              ))}
              <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const cvrVal = parseFloat(cvr(row));
              const comm   = commission(row);
              const { tone: st, label: sl } = STATUS_META[row.status];
              return (
                <tr key={row.id} style={{ borderBottom: i < sorted.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", opacity: row.status === "expired" ? 0.65 : 1 }}>
                  {/* Creator */}
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar initials={row.initials} tone={row.tone} size="sm" />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>{row.name}</div>
                        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{row.handle}</div>
                      </div>
                    </div>
                  </td>
                  {/* Code */}
                  <td style={{ padding: "10px 10px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 6, padding: "3px 8px" }}>
                      <code style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>{row.code}</code>
                      <button onClick={() => copyCode(row.code)} style={{ background: "none", border: "none", cursor: "pointer", color: copied === row.code ? TONES.green.text : "var(--sd-font-tertiary, #999)", display: "flex", padding: 0 }}>
                        {copied === row.code ? <IconCheck size={10} /> : <IconCopy size={10} />}
                      </button>
                    </div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>{row.commissionPct}% rate</div>
                  </td>
                  {/* Clicks with mini bar */}
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}>{fmt(row.clicks)}</div>
                    <div style={{ marginTop: 3, height: 3, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 2, width: 56, marginLeft: "auto" }}>
                      <div style={{ width: `${(row.clicks / maxClicks) * 100}%`, height: "100%", background: "#111", borderRadius: 2 }} />
                    </div>
                  </td>
                  {/* Orders */}
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700 }}>{row.orders}</td>
                  {/* CVR */}
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>
                    <span style={{ fontWeight: 700, color: cvrVal >= 4 ? TONES.green.text : cvrVal >= 2 ? "var(--sd-font-primary, #111)" : TONES.red.text }}>{cvrVal}%</span>
                  </td>
                  {/* Revenue */}
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 800 }}>{fmtMoney(row.revenue)}</td>
                  {/* Commission */}
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 700, color: TONES.orange.text }}>{fmtMoney(comm)}</td>
                  {/* Status */}
                  <td style={{ padding: "10px 10px" }}>
                    <Badge label={sl} tone={st} size="sm" dot />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "affiliate-performance-dashboard",
  title: "AffiliatePerformanceDashboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Affiliate link performance tracker — KPI strip, commission owed callout, and a sortable table of per-creator clicks, CVR, revenue, and commission.",
  description:
    "Brand-side view of how affiliate codes are driving sales. KPI strip (4 cards): total clicks, orders, avg CVR, affiliate revenue — each with period-over-period trend. Commission owed callout with Process payouts CTA. Sortable table: creator avatar + handle, monospace code chip with copy button + commission rate, clicks with inline mini-bar, orders, CVR (green ≥4% / red <2%), revenue, commission in orange, status badge (Active/Paused/Expired). Expired rows at 65% opacity. Click any column header to sort ascending/descending. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Affiliate performance dashboard",
      description: "Click column headers (Clicks, Orders, CVR, Revenue, Commission) to sort. Copy codes with the clipboard icon.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
