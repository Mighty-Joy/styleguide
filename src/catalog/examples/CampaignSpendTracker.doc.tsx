"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconCheck,
  IconUsers,
  IconBrandInstagram,
  IconCamera,
  IconShield,
  IconChevronDown,
  IconChevronUp,
  IconCalendar,
  IconDownload,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface SpendCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  budget: number;
  spent: number;
  committed: number;
  tone: keyof typeof TONES;
  items?: { label: string; spent: number; committed: number }[];
}

const CATEGORIES: SpendCategory[] = [
  {
    id: "c1", label: "Creator fees", icon: IconUsers, tone: "blue",
    budget: 5200, spent: 3400, committed: 1800,
    items: [
      { label: "Priya Nair — Summer Glow Reel",        spent: 1700, committed: 0    },
      { label: "Marcus Webb — Routine Reel",           spent: 1400, committed: 0    },
      { label: "Ji-ho Kim — TikTok (contracted)",      spent: 0,    committed: 1200 },
      { label: "Amara Diallo — Story pack (contracted)", spent: 300,  committed: 600  },
    ],
  },
  {
    id: "c2", label: "Platform amplification", icon: IconBrandInstagram, tone: "pink",
    budget: 1200, spent: 800, committed: 0,
    items: [
      { label: "IG Boost — Priya Nair post",  spent: 500, committed: 0 },
      { label: "IG Boost — Marcus Webb post", spent: 300, committed: 0 },
    ],
  },
  {
    id: "c3", label: "Production allowance", icon: IconCamera, tone: "orange",
    budget: 600, spent: 440, committed: 160,
    items: [
      { label: "Product shipments (4 kits)",   spent: 280, committed: 0   },
      { label: "Kit reimbursement — Priya",    spent: 160, committed: 0   },
      { label: "Kit reimbursement — Ji-ho",    spent: 0,   committed: 160 },
    ],
  },
  {
    id: "c4", label: "Performance bonus pool", icon: IconTrendingUp, tone: "green",
    budget: 500, spent: 0, committed: 0,
  },
  {
    id: "c5", label: "Contingency (5%)", icon: IconShield, tone: "gray",
    budget: 375, spent: 0, committed: 0,
  },
];

const TOTAL_BUDGET = CATEGORIES.reduce((s, c) => s + c.budget, 0);

/* ---- Demo ---- */
function Demo() {
  const [expanded, setExpanded] = useState<string | null>("c1");

  const totalSpent     = CATEGORIES.reduce((s, c) => s + c.spent, 0);
  const totalCommitted = CATEGORIES.reduce((s, c) => s + c.committed, 0);
  const totalProjected = totalSpent + totalCommitted;
  const remaining      = TOTAL_BUDGET - totalProjected;
  const spentPct       = (totalSpent / TOTAL_BUDGET) * 100;
  const committedPct   = (totalCommitted / TOTAL_BUDGET) * 100;

  const daysTotal    = 45;
  const daysElapsed  = 22;
  const daysLeft     = daysTotal - daysElapsed;
  const budgetPace   = (spentPct / (daysElapsed / daysTotal)) - 100; // positive = over pace
  const paceStatus   = Math.abs(budgetPace) < 10 ? "on_track" : budgetPace > 10 ? "over" : "under";

  function fmt(n: number) { return `$${n.toLocaleString()}`; }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Budget tracker</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Day {daysElapsed} of {daysTotal}</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Badge
            label={paceStatus === "on_track" ? "On pace" : paceStatus === "over" ? "Over pace" : "Under pace"}
            tone={paceStatus === "on_track" ? "green" : paceStatus === "over" ? "red" : "yellow"}
            size="sm" dot
          />
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Export</Button>
        </div>
      </div>

      {/* KPI tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7, marginBottom: 14 }}>
        {[
          { label: "Total budget",    value: fmt(TOTAL_BUDGET), tone: "gray"   as const },
          { label: "Spent",           value: fmt(totalSpent),   tone: "blue"   as const },
          { label: "Committed",       value: fmt(totalCommitted), tone: "orange" as const },
          { label: "Remaining",       value: fmt(remaining),    tone: remaining < 500 ? "red" as const : "green" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "9px 10px", background: TONES[tone].tint, borderRadius: 9 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.75, marginTop: 1 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Stacked progress bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <div style={{ fontSize: 10, fontWeight: 700 }}>Spend progress</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{Math.round(spentPct + committedPct)}% of budget allocated</div>
        </div>
        <div style={{ height: 10, borderRadius: 5, background: "var(--sd-bg-tertiary,#f1f1f1)", overflow: "hidden", display: "flex" }}>
          <div style={{ width: `${spentPct}%`, height: "100%", background: TONES.blue.text, transition: "width 0.5s" }} />
          <div style={{ width: `${committedPct}%`, height: "100%", background: TONES.orange.text + "80", transition: "width 0.5s" }} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
          {[
            { label: "Spent", color: TONES.blue.text },
            { label: "Committed", color: TONES.orange.text + "80" },
            { label: "Available", color: "var(--sd-bg-tertiary,#e5e7eb)" },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 9 }}>{label}</span>
            </div>
          ))}
          {/* Pace marker */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 5, alignItems: "center" }}>
            <div style={{ width: 2, height: 10, background: "#111", borderRadius: 1 }} />
            <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>Pace target ({Math.round((daysElapsed / daysTotal) * 100)}%)</span>
          </div>
        </div>
      </div>

      {/* Alert if over pace */}
      {paceStatus === "over" && (
        <div style={{ display: "flex", gap: 8, padding: "8px 12px", background: TONES.red.tint, borderRadius: 9, marginBottom: 12, alignItems: "center" }}>
          <IconAlertTriangle size={13} style={{ color: TONES.red.text, flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: TONES.red.text, fontWeight: 600 }}>
            Spend is ahead of pace. At current rate, projected to overspend by {fmt(Math.round(totalProjected * (daysTotal / daysElapsed) - TOTAL_BUDGET))}.
          </div>
        </div>
      )}

      {/* Projection */}
      <div style={{ padding: "9px 12px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 10, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>Projected final spend</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Based on current pace + committed</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 900 }}>{fmt(totalProjected + 280)}</div>
            <div style={{ fontSize: 10, color: remaining > 0 ? TONES.green.text : TONES.red.text, fontWeight: 700 }}>
              {fmt(Math.abs(TOTAL_BUDGET - (totalProjected + 280)))} {TOTAL_BUDGET - (totalProjected + 280) >= 0 ? "under" : "over"} budget
            </div>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>By category</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CATEGORIES.map((cat) => {
          const CIcon = cat.icon;
          const catPct        = ((cat.spent + cat.committed) / cat.budget) * 100;
          const spentPctLocal = (cat.spent / cat.budget) * 100;
          const isOpen = expanded === cat.id;

          return (
            <div key={cat.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setExpanded(isOpen ? null : cat.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 13px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: TONES[cat.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CIcon size={12} style={{ color: TONES[cat.tone].text }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{cat.label}</div>
                  <div style={{ height: 4, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 2, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${Math.min(spentPctLocal, 100)}%`, height: "100%", background: TONES[cat.tone].text }} />
                    <div style={{ width: `${Math.min((cat.committed / cat.budget) * 100, 100 - spentPctLocal)}%`, height: "100%", background: TONES[cat.tone].text + "60" }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, minWidth: 110 }}>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>{fmt(cat.spent + cat.committed)} <span style={{ fontWeight: 400, color: "var(--sd-font-tertiary,#999)" }}>/ {fmt(cat.budget)}</span></div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{Math.round(catPct)}% used</div>
                </div>
                {cat.items ? (isOpen ? <IconChevronUp size={11} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} /> : <IconChevronDown size={11} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />) : <div style={{ width: 11 }} />}
              </button>

              {isOpen && cat.items && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {cat.items.map(({ label, spent: s, committed: c }, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 13px", borderBottom: i < cat.items!.length - 1 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none" }}>
                      <span style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>{label}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {s > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: TONES[cat.tone].text }}>{fmt(s)} paid</span>}
                        {c > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: TONES.orange.text }}>{fmt(c)} due</span>}
                        {s === 0 && c === 0 && <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>—</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-spend-tracker",
  title: "CampaignSpendTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Real-time campaign budget burn tracker — 4 KPI tiles, stacked spend/committed progress bar with pace marker, projected final spend, and per-category accordion with line-item breakdown.",
  description:
    "Finance and campaign manager view of budget utilization. Header: campaign name, day N of 45, on-pace/over-pace/under-pace badge, Export CTA. 4 KPI tiles: total budget ($7,875), spent ($4,640 blue), committed ($1,960 orange), remaining ($1,275 green or red). Stacked horizontal bar: spent (blue solid) + committed (orange semi) + available (gray); pace target marker at the 49% (day 22/45) position. Legend row. Red alert banner when over pace with projected overspend amount. Projection card: 'Projected final spend' + dollar + under/over budget label. 5 category rows: Creator fees ($5,200 budget, expandable → 4 sub-items with paid/due labels), Platform amplification ($1,200, expandable → 2 boost entries), Production ($600, expandable → 3 items), Performance bonus ($500, no sub-items), Contingency ($375, no sub-items). Each category has a 4px dual-tone mini progress bar. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign spend tracker",
      description: "Creator fees row is pre-expanded showing per-creator paid vs committed. Click any category with a chevron to expand line items.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
