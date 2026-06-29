"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCurrencyDollar,
  IconChevronDown,
  IconChevronUp,
  IconAlertTriangle,
  IconCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type AllocStatus = "on_track" | "at_risk" | "over_budget";

interface CreatorAlloc {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  allocated: number;
  spent: number;
  deliverables: number;
  deliverablesDone: number;
}

interface BudgetLine {
  label: string;
  allocated: number;
  spent: number;
  color: string;
}

/* ---- seed ---- */

const TOTAL_BUDGET = 75_000;

const CREATORS: CreatorAlloc[] = [
  { id: "c1", name: "Priya Nair",    initials: "PN", tone: "green",     allocated: 12_000, spent: 7_200,  deliverables: 3, deliverablesDone: 2 },
  { id: "c2", name: "Diego Santos",  initials: "DS", tone: "orange",    allocated: 18_000, spent: 18_400, deliverables: 4, deliverablesDone: 4 },
  { id: "c3", name: "Hana Kim",      initials: "HK", tone: "pink",      allocated: 9_500,  spent: 4_100,  deliverables: 2, deliverablesDone: 1 },
  { id: "c4", name: "Marcus Webb",   initials: "MW", tone: "purple",    allocated: 14_000, spent: 2_800,  deliverables: 3, deliverablesDone: 0 },
  { id: "c5", name: "Aisha Obi",     initials: "AO", tone: "turquoise", allocated: 8_000,  spent: 8_000,  deliverables: 2, deliverablesDone: 2 },
  { id: "c6", name: "Liam Park",     initials: "LP", tone: "blue",      allocated: 10_000, spent: 6_500,  deliverables: 3, deliverablesDone: 2 },
];

const BUDGET_LINES: BudgetLine[] = [
  { label: "Creator fees",      allocated: 71_500, spent: 47_000, color: "#3b82f6" },
  { label: "Product samples",   allocated: 2_200,  spent: 1_800,  color: "#8b5cf6" },
  { label: "Platform boost",    allocated: 800,    spent: 200,    color: "#f59e0b" },
  { label: "Operations buffer", allocated: 500,    spent: 0,      color: "#6b7280" },
];

/* ---- helpers ---- */

function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;
}

function pct(spent: number, allocated: number) {
  return Math.min(Math.round((spent / allocated) * 100), 100);
}

function allocStatus(spent: number, allocated: number): AllocStatus {
  const p = spent / allocated;
  if (p > 1) return "over_budget";
  if (p > 0.9) return "at_risk";
  return "on_track";
}

const STATUS_META: Record<AllocStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  on_track:   { label: "On track",    tone: "green",  Icon: IconCheck         },
  at_risk:    { label: "At risk",     tone: "yellow", Icon: IconAlertTriangle },
  over_budget:{ label: "Over budget", tone: "red",    Icon: IconAlertTriangle },
};

/* ---- sub-components ---- */

function ProgressBar({ value, max, color, danger }: { value: number; max: number; color: string; danger?: boolean }) {
  const p = Math.min((value / max) * 100, 100);
  const over = value > max;
  return (
    <div style={{ height: 6, borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", overflow: "hidden" }}>
      <div
        style={{
          width: `${p}%`, height: "100%", borderRadius: 99,
          background: over ? TONES.red.text : danger ? TONES.yellow.text : color,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

function SpendRow({ c }: { c: CreatorAlloc }) {
  const [expanded, setExpanded] = useState(false);
  const status = allocStatus(c.spent, c.allocated);
  const { Icon } = STATUS_META[status];
  const over = c.spent > c.allocated;

  return (
    <>
      <tr
        onClick={() => setExpanded((v) => !v)}
        style={{ cursor: "pointer", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}
      >
        <td style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar initials={c.initials} tone={c.tone} size="sm" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
                {c.deliverablesDone}/{c.deliverables} deliverables
              </div>
            </div>
          </div>
        </td>

        <td style={{ padding: "10px 14px" }}>
          <div style={{ minWidth: 120 }}>
            <ProgressBar
              value={c.spent}
              max={c.allocated}
              color={TONES[c.tone].text}
              danger={status === "at_risk"}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{fmt(c.spent)} spent</span>
              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{fmt(c.allocated)} alloc</span>
            </div>
          </div>
        </td>

        <td style={{ padding: "10px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: over ? TONES.red.text : "var(--sd-font-primary, #111)" }}>
            {fmt(c.spent)}
          </span>
        </td>

        <td style={{ padding: "10px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)" }}>{fmt(c.allocated)}</span>
        </td>

        <td style={{ padding: "10px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: over ? TONES.red.text : TONES.green.text }}>
            {over ? `-${fmt(c.spent - c.allocated)}` : `${fmt(c.allocated - c.spent)}`}
          </span>
        </td>

        <td style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Badge label={STATUS_META[status].label} tone={STATUS_META[status].tone} size="sm" />
            <span style={{ color: "var(--sd-font-tertiary, #999)", marginLeft: 6 }}>
              {expanded ? <IconChevronUp size={13} /> : <IconChevronDown size={13} />}
            </span>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #fafafa)" }}>
          <td colSpan={6} style={{ padding: "10px 14px 14px 48px" }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { label: "Spent to date",   value: fmt(c.spent) },
                { label: "Remaining",        value: over ? "—" : fmt(c.allocated - c.spent) },
                { label: "% utilised",       value: `${pct(c.spent, c.allocated)}%` },
                { label: "Deliverables",     value: `${c.deliverablesDone}/${c.deliverables}` },
                { label: "Cost/deliverable", value: c.deliverablesDone > 0 ? fmt(Math.round(c.spent / c.deliverablesDone)) : "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>{value}</div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ---- Demo ---- */

function Demo() {
  const totalAllocated = CREATORS.reduce((s, c) => s + c.allocated, 0);
  const totalSpent     = CREATORS.reduce((s, c) => s + c.spent, 0);
  const remaining      = TOTAL_BUDGET - totalSpent;
  const unallocated    = TOTAL_BUDGET - totalAllocated;

  const overCount   = CREATORS.filter((c) => allocStatus(c.spent, c.allocated) === "over_budget").length;
  const atRiskCount = CREATORS.filter((c) => allocStatus(c.spent, c.allocated) === "at_risk").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Summary header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total budget",   value: fmt(TOTAL_BUDGET), sub: "campaign total",                         color: "var(--sd-font-primary, #111)" },
          { label: "Allocated",      value: fmt(totalAllocated), sub: `${pct(totalAllocated, TOTAL_BUDGET)}% of budget`, color: "var(--sd-font-primary, #111)" },
          { label: "Spent",          value: fmt(totalSpent),     sub: `${pct(totalSpent, TOTAL_BUDGET)}% of budget`,     color: "var(--sd-font-primary, #111)" },
          { label: "Remaining",      value: fmt(remaining),      sub: "unspent",                               color: remaining < 5000 ? TONES.red.text : TONES.green.text },
          { label: "Unallocated",    value: fmt(unallocated),    sub: "available to assign",                   color: "var(--sd-font-secondary, #555)" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1.2 }}>{value}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Budget line stacked bar */}
      <div style={{ marginBottom: 20, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>Budget breakdown</span>
          <div style={{ display: "flex", gap: 10 }}>
            {overCount > 0 && <Badge label={`${overCount} over budget`} tone="red" size="sm" />}
            {atRiskCount > 0 && <Badge label={`${atRiskCount} at risk`} tone="yellow" size="sm" />}
          </div>
        </div>

        {/* Stacked bar showing allocated vs spent per line */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {BUDGET_LINES.map((line) => (
            <div key={line.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: line.color, display: "inline-block" }} />
                  {line.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
                  {fmt(line.spent)} / {fmt(line.allocated)}
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", position: "relative" }}>
                {/* Allocated track */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: `${line.color}22` }} />
                {/* Spent fill */}
                <div style={{ width: `${pct(line.spent, TOTAL_BUDGET)}%`, height: "100%", borderRadius: 99, background: line.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Per-creator table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Creator</th>
              <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)", minWidth: 160 }}>Utilisation</th>
              <th style={{ padding: "8px 14px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Spent</th>
              <th style={{ padding: "8px 14px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Allocated</th>
              <th style={{ padding: "8px 14px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Variance</th>
              <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {CREATORS.map((c) => <SpendRow key={c.id} c={c} />)}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              <td colSpan={2} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total</td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 800, fontSize: 13, color: "var(--sd-font-primary, #111)" }}>{fmt(totalSpent)}</td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, color: "var(--sd-font-secondary, #555)" }}>{fmt(totalAllocated)}</td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, fontSize: 12, color: totalSpent <= totalAllocated ? TONES.green.text : TONES.red.text }}>
                {totalSpent <= totalAllocated ? `${fmt(totalAllocated - totalSpent)}` : `-${fmt(totalSpent - totalAllocated)}`}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button variant="secondary" size="sm">Adjust allocations</Button>
        <Button variant="primary" size="sm">Export report</Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-budget-tracker",
  title: "CampaignBudgetTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Campaign financial view — total vs allocated vs spent summary cards, stacked budget-line bars, expandable per-creator spend table.",
  description:
    "The financial oversight surface for a running campaign. Top: 5 summary cards (total, allocated, spent, remaining, unallocated). Middle: stacked bar chart across budget lines (creator fees, samples, boost, ops). Bottom: sortable per-creator table with utilisation progress bars, spent/allocated/variance columns, and at-risk/over-budget status badges. Click any row to expand the cost-per-deliverable breakdown. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign budget tracker",
      description: "Click any creator row to expand the per-deliverable cost breakdown.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
