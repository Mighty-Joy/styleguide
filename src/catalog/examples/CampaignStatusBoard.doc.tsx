"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBolt,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconPlus,
  IconDotsVertical,
  IconArrowRight,
  IconUsers,
  IconChartBar,
  IconCalendar,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type CampaignHealth = "on_track" | "at_risk" | "overdue" | "completed";
type CampaignPhase  = "briefing" | "outreach" | "content" | "approval" | "live" | "wrap";

interface CampaignRow {
  id: string;
  name: string;
  brand: string;
  tone: keyof typeof TONES;
  health: CampaignHealth;
  phase: CampaignPhase;
  creators: { total: number; confirmed: number };
  content: { total: number; approved: number; pending: number; overdue: number };
  budget: { total: number; spent: number };
  daysLeft: number;
  endDate: string;
  lead: { initials: string; tone: keyof typeof TONES };
}

/* ---- seed ---- */

const CAMPAIGNS: CampaignRow[] = [
  {
    id: "c1", name: "Summer Glow", brand: "Aura Labs", tone: "yellow",
    health: "on_track", phase: "content",
    creators: { total: 6, confirmed: 6 },
    content: { total: 12, approved: 7, pending: 4, overdue: 1 },
    budget: { total: 24_000, spent: 14_200 },
    daysLeft: 18, endDate: "Jul 17",
    lead: { initials: "SC", tone: "purple" },
  },
  {
    id: "c2", name: "FitLife Q2", brand: "FitLife Co.", tone: "green",
    health: "at_risk", phase: "approval",
    creators: { total: 4, confirmed: 3 },
    content: { total: 8, approved: 3, pending: 2, overdue: 3 },
    budget: { total: 16_000, spent: 12_800 },
    daysLeft: 7, endDate: "Jul 6",
    lead: { initials: "LT", tone: "pink" },
  },
  {
    id: "c3", name: "Tech Drop", brand: "Nova Devices", tone: "blue",
    health: "on_track", phase: "outreach",
    creators: { total: 8, confirmed: 5 },
    content: { total: 16, approved: 0, pending: 0, overdue: 0 },
    budget: { total: 40_000, spent: 6_500 },
    daysLeft: 42, endDate: "Aug 10",
    lead: { initials: "JO", tone: "blue" },
  },
  {
    id: "c4", name: "Spring Refresh", brand: "Bloom Studio", tone: "pink",
    health: "completed", phase: "wrap",
    creators: { total: 5, confirmed: 5 },
    content: { total: 10, approved: 10, pending: 0, overdue: 0 },
    budget: { total: 18_000, spent: 17_600 },
    daysLeft: 0, endDate: "Jun 20",
    lead: { initials: "RM", tone: "orange" },
  },
  {
    id: "c5", name: "Winter Skin", brand: "Frost Beauty", tone: "turquoise",
    health: "on_track", phase: "briefing",
    creators: { total: 6, confirmed: 1 },
    content: { total: 12, approved: 0, pending: 0, overdue: 0 },
    budget: { total: 22_000, spent: 800 },
    daysLeft: 68, endDate: "Sep 5",
    lead: { initials: "SC", tone: "purple" },
  },
  {
    id: "c6", name: "Holiday Flash", brand: "GiftBox", tone: "red",
    health: "overdue", phase: "live",
    creators: { total: 3, confirmed: 3 },
    content: { total: 6, approved: 2, pending: 0, overdue: 4 },
    budget: { total: 9_000, spent: 9_400 },
    daysLeft: -3, endDate: "Jun 26",
    lead: { initials: "LT", tone: "pink" },
  },
];

const HEALTH_META: Record<CampaignHealth, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  on_track:  { label: "On track",  tone: "green",  Icon: IconCheck         },
  at_risk:   { label: "At risk",   tone: "yellow", Icon: IconAlertTriangle  },
  overdue:   { label: "Overdue",   tone: "red",    Icon: IconBolt           },
  completed: { label: "Completed", tone: "gray",   Icon: IconCheck          },
};

const PHASE_LABEL: Record<CampaignPhase, string> = {
  briefing: "Briefing",
  outreach: "Outreach",
  content:  "Content",
  approval: "Approval",
  live:     "Live",
  wrap:     "Wrap",
};

const PHASE_ORDER: CampaignPhase[] = ["briefing", "outreach", "content", "approval", "live", "wrap"];

function PhaseBar({ phase }: { phase: CampaignPhase }) {
  const idx = PHASE_ORDER.indexOf(phase);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {PHASE_ORDER.map((p, i) => (
        <div
          key={p}
          title={PHASE_LABEL[p]}
          style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < idx ? "#111"
              : i === idx ? "#555"
              : "var(--sd-border-default, #e5e7eb)",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${n}`;
}

function BudgetBar({ spent, total }: { spent: number; total: number }) {
  const pct = Math.min(100, (spent / total) * 100);
  const over = spent > total;
  return (
    <div style={{ width: "100%", height: 5, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 3 }}>
      <div style={{
        height: "100%", borderRadius: 3,
        width: `${pct}%`,
        background: over ? TONES.red.text : pct > 85 ? TONES.yellow.text : "#111",
        transition: "width 0.3s",
      }} />
    </div>
  );
}

/* ---- Demo ---- */

const HEALTH_FILTERS: (CampaignHealth | "all")[] = ["all", "on_track", "at_risk", "overdue", "completed"];

function Demo() {
  const [healthFilter, setHealthFilter] = useState<CampaignHealth | "all">("all");

  const visible = CAMPAIGNS.filter((c) => healthFilter === "all" || c.health === healthFilter);

  const summary = {
    onTrack:   CAMPAIGNS.filter((c) => c.health === "on_track").length,
    atRisk:    CAMPAIGNS.filter((c) => c.health === "at_risk").length,
    overdue:   CAMPAIGNS.filter((c) => c.health === "overdue").length,
    completed: CAMPAIGNS.filter((c) => c.health === "completed").length,
  };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Summary chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Active",    count: summary.onTrack,   tone: "green"  as const },
          { label: "At risk",   count: summary.atRisk,    tone: "yellow" as const },
          { label: "Overdue",   count: summary.overdue,   tone: "red"    as const },
          { label: "Completed", count: summary.completed, tone: "gray"   as const },
        ].map(({ label, count, tone }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: TONES[tone].text }}>{count}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <Button variant="primary" size="sm" leftIcon={<IconPlus size={12} />}>New campaign</Button>
        </div>
      </div>

      {/* Health filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {HEALTH_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setHealthFilter(f)}
            style={{
              height: 28, padding: "0 10px", borderRadius: 99,
              border: "1px solid",
              borderColor: healthFilter === f ? "#333" : "var(--sd-border-default, #e5e7eb)",
              background: healthFilter === f ? "#333" : "transparent",
              color: healthFilter === f ? "#fff" : "var(--sd-font-secondary, #666)",
              fontSize: 11, fontWeight: 500, cursor: "pointer", textTransform: "capitalize",
            }}
          >
            {f === "all" ? `All (${CAMPAIGNS.length})` : f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Board */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.map((c) => {
          const { Icon, tone, label } = HEALTH_META[c.health];
          const budgetPct = Math.round((c.budget.spent / c.budget.total) * 100);
          const creatorPct = Math.round((c.creators.confirmed / c.creators.total) * 100);
          const approvedPct = c.content.total > 0 ? Math.round((c.content.approved / c.content.total) * 100) : 0;

          return (
            <div
              key={c.id}
              style={{
                border: "1px solid",
                borderColor: c.health === "overdue" ? TONES.red.text : "var(--sd-border-default, #e5e7eb)",
                borderRadius: 12,
                padding: "14px 16px",
                background: c.health === "completed" ? "var(--sd-bg-secondary, #f9f9f9)" : "#fff",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                {/* Color swatch + name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: TONES[c.tone].text, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary, #111)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{c.brand}</div>
                  </div>
                </div>

                {/* Health badge */}
                <Badge label={label} tone={tone} dot size="sm" />

                {/* Phase label */}
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)", whiteSpace: "nowrap" }}>
                  {PHASE_LABEL[c.phase]}
                </span>

                {/* Lead avatar */}
                <Avatar initials={c.lead.initials} tone={c.lead.tone} size="sm" />

                {/* Days left */}
                <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.daysLeft <= 0 ? TONES.red.text : c.daysLeft <= 7 ? TONES.yellow.text : "var(--sd-font-primary, #111)" }}>
                    {c.daysLeft <= 0 ? `${Math.abs(c.daysLeft)}d overdue` : `${c.daysLeft}d left`}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Ends {c.endDate}</div>
                </div>

                {/* Overflow button */}
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
                  <IconDotsVertical size={14} />
                </button>
              </div>

              {/* Phase progress bar */}
              <div style={{ marginBottom: 12 }}>
                <PhaseBar phase={c.phase} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                  {PHASE_ORDER.map((p) => (
                    <span key={p} style={{ fontSize: 9, color: p === c.phase ? "var(--sd-font-primary, #111)" : "var(--sd-font-tertiary, #999)", fontWeight: p === c.phase ? 700 : 400 }}>
                      {PHASE_LABEL[p]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics row */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {/* Creators */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 100 }}>
                  <IconUsers size={12} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Creators</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: creatorPct < 100 ? TONES.yellow.text : "var(--sd-font-primary, #111)" }}>
                      {c.creators.confirmed}/{c.creators.total}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 130 }}>
                  <IconChartBar size={12} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2 }}>Content {approvedPct}%</div>
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                      <div style={{ flex: 1, height: 4, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 2, overflow: "hidden", display: "flex" }}>
                        <div style={{ width: `${approvedPct}%`, background: "#111", height: "100%", transition: "width 0.3s" }} />
                      </div>
                      {c.content.overdue > 0 && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: TONES.red.text, whiteSpace: "nowrap" }}>
                          {c.content.overdue} late
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 140 }}>
                  <IconCurrencyDollar size={12} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2 }}>
                      Budget — {fmt(c.budget.spent)} / {fmt(c.budget.total)}
                    </div>
                    <BudgetBar spent={c.budget.spent} total={c.budget.total} />
                  </div>
                </div>

                {/* Go to campaign */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                  <Button variant="secondary" size="sm" rightIcon={<IconArrowRight size={11} />}>
                    View
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-status-board",
  title: "CampaignStatusBoard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "All-campaigns operational view — health summary chips, phase progress bar, creator fill rate, content approval bar, and budget utilisation per campaign.",
  description:
    "The operational control surface. Summary line: active / at-risk / overdue / completed counts. Health filter pills. Per-campaign card: tone dot, name, brand, health badge, phase label, lead avatar, days left (red if overdue), 6-segment phase rail, creator confirmed/total, content approval progress bar (with overdue count), budget bar (turns yellow >85%, red if over). Overdue campaign borders are red. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign status board",
      description: "Filter by health status using the pills. Each row shows phase position, content progress, and budget burn.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
