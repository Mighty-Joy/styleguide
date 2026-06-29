"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import {
  IconCurrencyDollar,
  IconClock,
  IconCheck,
  IconArrowUpRight,
  IconDownload,
  IconBrandPaypal,
  IconBuildingBank,
  IconChevronRight,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PayStatus = "paid" | "pending" | "upcoming" | "processing";

interface EarningRow {
  id: string;
  campaign: string;
  brand: string;
  amount: number;
  status: PayStatus;
  dueDate?: string;
  paidDate?: string;
  deliverables: string;
}

/* ---- seed ---- */
const EARNINGS: EarningRow[] = [
  { id: "e1", campaign: "Summer Glow",   brand: "Aura Labs",    amount: 2400, status: "paid",       paidDate: "Jun 18",  deliverables: "Reel + 3× Story" },
  { id: "e2", campaign: "FitLife Q2",    brand: "FitLife",      amount: 1800, status: "paid",       paidDate: "Jun 12",  deliverables: "2× Reel" },
  { id: "e3", campaign: "Tech Drop",     brand: "NovaTech",     amount: 3200, status: "processing",                       deliverables: "TikTok + Reel" },
  { id: "e4", campaign: "Spring Refresh",brand: "BloomCo",      amount: 1200, status: "pending",    dueDate: "Jul 5",    deliverables: "3× Story" },
  { id: "e5", campaign: "Winter Skin",   brand: "Derma+",       amount: 2800, status: "upcoming",   dueDate: "Jul 28",   deliverables: "Reel + Tutorial" },
  { id: "e6", campaign: "Holiday Flash", brand: "SparkBrands",  amount: 4000, status: "upcoming",   dueDate: "Aug 14",   deliverables: "2× TikTok" },
];

const STATUS_META: Record<PayStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  paid:       { label: "Paid",       tone: "green",  Icon: IconCheck        },
  processing: { label: "Processing", tone: "blue",   Icon: IconClock        },
  pending:    { label: "Pending",    tone: "yellow", Icon: IconClock        },
  upcoming:   { label: "Upcoming",   tone: "gray",   Icon: IconArrowUpRight },
};

function fmtMoney(n: number) { return `$${n.toLocaleString()}`; }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const MONTHLY = [820, 1200, 0, 3100, 1800, 4200];
const maxBar = Math.max(...MONTHLY);

/* ---- Demo ---- */
function Demo() {
  const [tab, setTab] = useState<"all" | PayStatus>("all");

  const paid       = EARNINGS.filter((e) => e.status === "paid").reduce((s, e) => s + e.amount, 0);
  const pending    = EARNINGS.filter((e) => e.status === "pending" || e.status === "processing").reduce((s, e) => s + e.amount, 0);
  const upcoming   = EARNINGS.filter((e) => e.status === "upcoming").reduce((s, e) => s + e.amount, 0);
  const total      = paid + pending + upcoming;

  const visible = tab === "all" ? EARNINGS : EARNINGS.filter((e) => e.status === tab);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>My earnings</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Priya Nair · @priya.creates · Updated today</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export CSV</Button>
      </div>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total earned", value: fmtMoney(total), tone: "gray" as const, sub: "all time" },
          { label: "Paid out",     value: fmtMoney(paid),  tone: "green" as const, sub: "confirmed" },
          { label: "Pending",      value: fmtMoney(pending), tone: "yellow" as const, sub: "in review" },
          { label: "Upcoming",     value: fmtMoney(upcoming), tone: "blue" as const, sub: "contracted" },
        ].map(({ label, value, tone, sub }) => (
          <div key={label} style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: tone === "gray" ? "var(--sd-font-primary, #111)" : TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div style={{ padding: "14px 16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>Monthly earnings</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: TONES.green.text, fontWeight: 700 }}>
            <IconTrendingUp size={13} />
            +62% vs last period
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 60 }}>
          {MONTHS.map((m, i) => (
            <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", background: MONTHLY[i] > 0 ? "#111" : "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: "3px 3px 0 0", height: `${Math.max(4, (MONTHLY[i] / maxBar) * 48)}px`, transition: "height 0.3s" }} />
              <span style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", fontWeight: 600 }}>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout method */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[
          { label: "PayPal",        icon: IconBrandPaypal,   active: true,  detail: "priya@email.com" },
          { label: "Bank transfer", icon: IconBuildingBank,  active: false, detail: "••• 4821" },
        ].map(({ label, icon: Icon, active, detail }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1.5px solid ${active ? "#111" : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 10, flex: 1, cursor: "pointer", background: active ? "#fafafa" : "transparent" }}>
            <Icon size={18} style={{ color: active ? "#111" : "var(--sd-font-tertiary, #999)" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: active ? "#111" : "var(--sd-font-secondary, #555)" }}>{label}</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{detail}</div>
            </div>
            {active && <span style={{ marginLeft: "auto" }}><Badge label="Default" tone="gray" size="sm" /></span>}
          </div>
        ))}
      </div>

      {/* Earnings table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {/* Filter tabs */}
        <div style={{ display: "flex", padding: "0 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", gap: 2 }}>
          {(["all", "paid", "processing", "pending", "upcoming"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ padding: "9px 10px", background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, borderBottom: `2px solid ${tab === t ? "#111" : "transparent"}`, color: tab === t ? "#111" : "var(--sd-font-tertiary, #999)", textTransform: "capitalize" }}
            >
              {t}
            </button>
          ))}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              {["Campaign", "Deliverables", "Amount", "Date", "Status"].map((h) => (
                <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((e, i) => {
              const { label, tone, Icon } = STATUS_META[e.status];
              return (
                <tr key={e.id} style={{ borderBottom: i < visible.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{e.campaign}</div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{e.brand}</div>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>{e.deliverables}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 800, fontSize: 13 }}>{fmtMoney(e.amount)}</td>
                  <td style={{ padding: "10px 14px", fontSize: 11, color: "var(--sd-font-tertiary, #999)", whiteSpace: "nowrap" }}>
                    {e.paidDate ? `Paid ${e.paidDate}` : e.dueDate ? `Due ${e.dueDate}` : "—"}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <Badge label={label} tone={tone} size="sm" dot />
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
  slug: "creator-earnings-overview",
  title: "CreatorEarningsOverview",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator-facing earnings dashboard — KPI strip, monthly bar chart, payout method selector, and filterable per-campaign payment table.",
  description:
    "The creator's financial summary screen. Header: creator identity, export CSV. KPI strip: total earned, paid out, pending, upcoming — each in tone-matched color. Monthly bar chart: 6-month view with trend callout. Payout method row: PayPal and bank transfer cards with active/default badge. Earnings table: filterable by All / Paid / Processing / Pending / Upcoming tabs — campaign name, brand, deliverables, amount, date, status badge per row. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator earnings overview",
      description: "Click the filter tabs (All / Paid / Processing / Pending / Upcoming) to narrow the payment table.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
