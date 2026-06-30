"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCurrencyDollar,
  IconClock,
  IconCheck,
  IconChevronDown,
  IconDownload,
  IconFilter,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type PayoutStatus = "paid" | "pending" | "upcoming";

interface Payout {
  id: string;
  month: string;
  campaign: string;
  brand: string;
  deliverable: string;
  amount: number;
  status: PayoutStatus;
  date: string;
  invoiceRef: string;
}

const PAYOUTS: Payout[] = [
  { id: "p1",  month: "June 2026",  campaign: "Summer Glow Campaign",    brand: "Aura Labs",    deliverable: "2× Reels + 5 Stories",    amount: 850,  status: "pending",  date: "Expected Jul 5",   invoiceRef: "INV-2026-0047" },
  { id: "p2",  month: "June 2026",  campaign: "Satin & Co Launch",       brand: "Satin & Co",   deliverable: "Behind-the-scenes Story",  amount: 300,  status: "paid",     date: "Jun 20, 2026",      invoiceRef: "INV-2026-0041" },
  { id: "p3",  month: "June 2026",  campaign: "Summer Glow Campaign",    brand: "Aura Labs",    deliverable: "Contract signing advance",  amount: 850,  status: "paid",     date: "Jun 10, 2026",      invoiceRef: "INV-2026-0038" },
  { id: "p4",  month: "May 2026",   campaign: "GlowLab Spring Series",   brand: "Glow Lab",     deliverable: "3× Reels + 1 YouTube",     amount: 2200, status: "paid",     date: "May 28, 2026",      invoiceRef: "INV-2026-0031" },
  { id: "p5",  month: "May 2026",   campaign: "GlowLab Spring Series",   brand: "Glow Lab",     deliverable: "Usage rights (90d)",        amount: 800,  status: "paid",     date: "May 28, 2026",      invoiceRef: "INV-2026-0032" },
  { id: "p6",  month: "May 2026",   campaign: "Bloom Beauty GRWM",       brand: "Bloom Beauty", deliverable: "1× Reel + captions",        amount: 950,  status: "paid",     date: "May 15, 2026",      invoiceRef: "INV-2026-0027" },
  { id: "p7",  month: "April 2026", campaign: "Velour Skincare Collab",  brand: "Velour",       deliverable: "2× Reels",                  amount: 1800, status: "paid",     date: "Apr 22, 2026",      invoiceRef: "INV-2026-0019" },
  { id: "p8",  month: "April 2026", campaign: "Velour Skincare Collab",  brand: "Velour",       deliverable: "Performance bonus",         amount: 250,  status: "paid",     date: "Apr 22, 2026",      invoiceRef: "INV-2026-0020" },
  { id: "p9",  month: "July 2026",  campaign: "Summer Glow Campaign",    brand: "Aura Labs",    deliverable: "Completion payment",        amount: 850,  status: "upcoming", date: "~Jul 30, 2026",     invoiceRef: "—"             },
];

const STATUS_META: Record<PayoutStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  paid:     { label: "Paid",     tone: "green",  icon: IconCheck   },
  pending:  { label: "Pending",  tone: "orange", icon: IconClock   },
  upcoming: { label: "Upcoming", tone: "gray",   icon: IconClock   },
};

const FILTER_OPTIONS: (PayoutStatus | "all")[] = ["all", "paid", "pending", "upcoming"];

function groupByMonth(payouts: Payout[]): { month: string; items: Payout[]; total: number }[] {
  const map = new Map<string, Payout[]>();
  const ORDER = ["July 2026", "June 2026", "May 2026", "April 2026"];
  ORDER.forEach((m) => map.set(m, []));
  payouts.forEach((p) => {
    if (!map.has(p.month)) map.set(p.month, []);
    map.get(p.month)!.push(p);
  });
  return Array.from(map.entries())
    .filter(([, items]) => items.length > 0)
    .map(([month, items]) => ({ month, items, total: items.reduce((s, p) => s + p.amount, 0) }));
}

function Demo() {
  const [filter, setFilter] = useState<PayoutStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = PAYOUTS.filter((p) => filter === "all" || p.status === filter);
  const groups   = groupByMonth(filtered);

  const totalEarned  = PAYOUTS.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = PAYOUTS.filter((p) => p.status === "pending" || p.status === "upcoming").reduce((s, p) => s + p.amount, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 2 }}>
          <IconCurrencyDollar size={14} style={{ color: "var(--sd-font-tertiary,#999)" }} />
          <span style={{ fontSize: 13, fontWeight: 800 }}>Earnings history</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Priya Nair · All campaigns</div>
      </div>

      {/* Summary tiles */}
      <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
        <div style={{ flex: 1, padding: "10px 12px", background: TONES.green.tint, borderRadius: 10 }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
            <IconCheck size={11} style={{ color: TONES.green.text }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: TONES.green.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total earned</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: TONES.green.text, lineHeight: 1 }}>${totalEarned.toLocaleString()}</div>
          <div style={{ fontSize: 9, color: TONES.green.text, opacity: 0.65, marginTop: 2 }}>paid to date</div>
        </div>
        <div style={{ flex: 1, padding: "10px 12px", background: TONES.orange.tint, borderRadius: 10 }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
            <IconClock size={11} style={{ color: TONES.orange.text }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: TONES.orange.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>Awaiting payout</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: TONES.orange.text, lineHeight: 1 }}>${totalPending.toLocaleString()}</div>
          <div style={{ fontSize: 9, color: TONES.orange.text, opacity: 0.65, marginTop: 2 }}>pending + upcoming</div>
        </div>
        <div style={{ flex: 1, padding: "10px 12px", background: TONES.blue.tint, borderRadius: 10 }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
            <IconTrendingUp size={11} style={{ color: TONES.blue.text }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: TONES.blue.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>YTD total</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: TONES.blue.text, lineHeight: 1 }}>${(totalEarned + totalPending).toLocaleString()}</div>
          <div style={{ fontSize: 9, color: TONES.blue.text, opacity: 0.65, marginTop: 2 }}>all payouts 2026</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 14, borderBottom: "1px solid var(--sd-border-default,#e5e7eb)" }}>
        {FILTER_OPTIONS.map((f) => {
          const count = f === "all" ? PAYOUTS.length : PAYOUTS.filter((p) => p.status === f).length;
          const label = f === "all" ? "All" : STATUS_META[f].label;
          const tone  = f !== "all" ? STATUS_META[f].tone : "gray";
          return (
            <button key={f} onClick={() => setFilter(f)}
              style={{ display: "flex", gap: 5, alignItems: "center", padding: "8px 12px", border: "none", borderBottom: `2px solid ${filter === f ? "#111" : "transparent"}`, background: "transparent", cursor: "pointer", fontSize: 11, fontWeight: filter === f ? 800 : 500, color: filter === f ? "#111" : "var(--sd-font-tertiary,#999)", marginBottom: -1 }}>
              {label}
              <span style={{ padding: "1px 5px", borderRadius: 99, background: filter === f ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", fontSize: 9, fontWeight: 800, color: filter === f ? "#fff" : "var(--sd-font-tertiary,#999)" }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grouped payouts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {groups.map((g) => (
          <div key={g.month}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{g.month}</span>
              <span style={{ fontSize: 11, fontWeight: 900 }}>${g.total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {g.items.map((p) => {
                const meta   = STATUS_META[p.status];
                const Icon   = meta.icon;
                const isOpen = expanded === p.id;
                return (
                  <div key={p.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ display: "flex", gap: 9, alignItems: "center", padding: "9px 12px", cursor: "pointer", background: isOpen ? "var(--sd-bg-secondary,#f9f9f9)" : "white" }}
                      onClick={() => setExpanded(isOpen ? null : p.id)}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: TONES[meta.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={13} style={{ color: TONES[meta.tone].text }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 1 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.brand}</span>
                          <Badge label={meta.label} tone={meta.tone} size="sm" />
                        </div>
                        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{p.deliverable}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 900 }}>${p.amount.toLocaleString()}</div>
                        <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{p.date}</div>
                      </div>
                      <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                    </div>
                    {isOpen && (
                      <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "9px 12px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {[
                            { label: "Campaign",  value: p.campaign    },
                            { label: "Invoice",   value: p.invoiceRef  },
                            { label: "Milestone", value: p.deliverable },
                            { label: "Date",      value: p.date        },
                          ].map(({ label, value }) => (
                            <div key={label} style={{ display: "flex", gap: 10 }}>
                              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", width: 70, flexShrink: 0 }}>{label}</span>
                              <span style={{ fontSize: 10, fontWeight: 600 }}>{value}</span>
                            </div>
                          ))}
                          {p.status === "paid" && (
                            <button style={{ marginTop: 4, display: "flex", gap: 5, alignItems: "center", fontSize: 10, fontWeight: 700, color: TONES.blue.text, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                              <IconDownload size={11} /> Download receipt
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <div style={{ padding: "28px", textAlign: "center", color: "var(--sd-font-tertiary,#999)", fontSize: 11 }}>
            No payouts match this filter.
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-earnings-history",
  title: "CreatorEarningsHistory",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's payout history — 3 summary tiles (total earned / awaiting / YTD), 4 filter tabs by status, payouts grouped by month with totals, and expandable rows showing campaign, invoice ref, date, and download receipt.",
  description:
    "Creator tracks all campaign payouts across brands. Header: 'Earnings history', creator name. 3 KPI tiles: Total earned green ($7,150) / Awaiting payout orange ($1,700 pending + upcoming) / YTD blue ($8,850). 4 underline tabs: All (9) / Paid (7) / Pending (1) / Upcoming (1) — count pills, active tab #111. Payouts grouped by month (July/June/May/April 2026) each with month label + group total. Payout rows: status icon tile (green check=paid / orange clock=pending / gray=upcoming), brand name, status badge, deliverable description, amount, date, expand chevron. Expanded: campaign name, invoice ref, milestone, date — 'Download receipt' link for paid items. Pre-seeded: 9 payouts across 5 campaigns (Aura Labs Summer Glow: 3 milestones / Satin & Co / Glow Lab Spring / Bloom Beauty / Velour Skincare). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Earnings history",
      description: "Filter by Paid, Pending, or Upcoming. Expand any row to see the invoice reference and campaign. Paid rows show a download receipt link.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
