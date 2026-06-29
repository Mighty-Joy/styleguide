"use client";

import React, { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconAlertCircle,
  IconCheck,
  IconRefresh,
  IconTarget,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconUsers,
  IconChartBar,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type GoalStatus = "on_track" | "at_risk" | "exceeded" | "behind";

interface Goal {
  id: string;
  label: string;
  icon: React.ElementType;
  current: number;
  target: number;
  unit: string;
  format: (n: number) => string;
  status: GoalStatus;
  trend: number;
  pace: string;
}

/* ---- seed ---- */
const GOALS: Goal[] = [
  { id: "g1", label: "Total reach",    icon: IconUsers,          current: 1_840_000, target: 3_000_000, unit: "accounts", format: (n) => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : `${(n/1e3).toFixed(0)}k`, status: "on_track",  trend: +12, pace: "On pace for Jul 28" },
  { id: "g2", label: "Total views",    icon: IconEye,            current: 6_200_000, target: 8_000_000, unit: "views",    format: (n) => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : `${(n/1e3).toFixed(0)}k`, status: "exceeded",  trend: +41, pace: "Already 77.5% — ahead of schedule" },
  { id: "g3", label: "Avg ER",         icon: IconHeart,          current: 6.2,       target: 5.0,       unit: "%",        format: (n) => `${n.toFixed(1)}%`,                                                status: "exceeded",  trend: +24, pace: "Target already met" },
  { id: "g4", label: "ROAS",           icon: IconCurrencyDollar, current: 3.1,       target: 4.0,       unit: "×",        format: (n) => `${n.toFixed(1)}×`,                                                status: "at_risk",   trend: -8,  pace: "Needs +0.9× to hit target" },
  { id: "g5", label: "Content pieces", icon: IconChartBar,       current: 11,        target: 17,        unit: "posts",    format: (n) => String(n),                                                          status: "on_track",  trend: 0,   pace: "6 posts remaining · 3 due this week" },
];

const STATUS_META: Record<GoalStatus, { label: string; tone: keyof typeof TONES; color: string }> = {
  on_track: { label: "On track",  tone: "blue",   color: "#2563eb" },
  at_risk:  { label: "At risk",   tone: "yellow", color: "#d97706" },
  exceeded: { label: "Exceeded",  tone: "green",  color: "#16a34a" },
  behind:   { label: "Behind",    tone: "red",    color: "#dc2626" },
};

function pct(current: number, target: number) {
  return Math.min(100, Math.round((current / target) * 100));
}

/* ---- Demo ---- */
function Demo() {
  const [refreshed, setRefreshed] = useState(false);
  const [animated,  setAnimated]  = useState(false);

  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);

  function refresh() {
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 1500);
  }

  const onTrack  = GOALS.filter((g) => g.status === "on_track").length;
  const exceeded = GOALS.filter((g) => g.status === "exceeded").length;
  const atRisk   = GOALS.filter((g) => g.status === "at_risk").length;
  const behind   = GOALS.filter((g) => g.status === "behind").length;

  const overallPct = Math.round(GOALS.reduce((s, g) => s + pct(g.current, g.target), 0) / GOALS.length);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>Campaign goals</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Badge label="Active" tone="green" dot />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow · Day 18 of 45</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Overall progress</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{overallPct}%</div>
          </div>
          <button onClick={refresh} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconRefresh size={14} style={{ color: "var(--sd-font-tertiary, #999)", transform: refreshed ? "rotate(360deg)" : "none", transition: "transform 0.4s" }} />
          </button>
        </div>
      </div>

      {/* Status summary chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {[
          { label: `${exceeded} exceeded`, tone: "green"  as const },
          { label: `${onTrack} on track`,  tone: "blue"   as const },
          { label: `${atRisk} at risk`,    tone: "yellow" as const },
          ...(behind > 0 ? [{ label: `${behind} behind`, tone: "red" as const }] : []),
        ].map(({ label, tone }) => (
          <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, background: TONES[tone].tint, fontSize: 11, fontWeight: 700, color: TONES[tone].text }}>
            {label}
          </div>
        ))}
      </div>

      {/* Goal cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {GOALS.map((goal) => {
          const p = pct(goal.current, goal.target);
          const { label, tone, color } = STATUS_META[goal.status];
          const Icon = goal.icon;
          const isExceeded = goal.status === "exceeded";

          return (
            <div key={goal.id} style={{ padding: "12px 16px", border: `1px solid ${isExceeded ? TONES.green.tint : goal.status === "at_risk" ? TONES.yellow.tint : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 12, background: isExceeded ? "rgba(22,163,74,0.02)" : "transparent" }}>
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: TONES[tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={14} style={{ color: TONES[tone].text }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{goal.label}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{goal.pace}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: isExceeded ? TONES.green.text : "var(--sd-font-primary, #111)" }}>
                      {goal.format(goal.current)}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>/ {goal.format(goal.target)}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: goal.trend > 0 ? TONES.green.text : goal.trend < 0 ? TONES.red.text : "var(--sd-font-tertiary, #999)", flexShrink: 0 }}>
                  {goal.trend > 0 ? <IconTrendingUp size={12} /> : goal.trend < 0 ? <IconTrendingDown size={12} /> : <IconMinus size={12} />}
                  {goal.trend !== 0 ? `${Math.abs(goal.trend)}%` : "—"}
                </div>
                <Badge label={label} tone={tone} size="sm" dot />
              </div>

              {/* Progress bar */}
              <div style={{ height: 6, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  width: animated ? `${Math.min(100, p)}%` : "0%",
                  height: "100%",
                  background: color,
                  borderRadius: 3,
                  transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{p}% of target</span>
                {isExceeded && <span style={{ fontSize: 10, fontWeight: 700, color: TONES.green.text, display: "flex", alignItems: "center", gap: 3 }}><IconCheck size={10} /> Target met</span>}
                {goal.status === "at_risk" && <span style={{ fontSize: 10, fontWeight: 700, color: TONES.yellow.text, display: "flex", alignItems: "center", gap: 3 }}><IconAlertCircle size={10} /> Needs attention</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-goal-tracker",
  title: "CampaignGoalTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Mid-campaign KPI goal tracker — animated progress bars per goal with on-track/at-risk/exceeded status, trend arrows, and an overall progress summary.",
  description:
    "The live-campaign progress view for tracking KPI goals in real time. Header: campaign name, Active badge, day count, overall % progress, refresh button. Status summary chips: exceeded / on track / at risk counts in tone-matched pills. Goal cards: icon in tinted circle, label, pace note, current vs target values, trend arrow (green up / red down), status badge, animated fill bar that transitions on mount, % of target footer. Exceeded goals get a green border and tint; at-risk goals get a yellow border. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign goal tracker",
      description: "Progress bars animate in on load. Click the refresh icon to see the rotation animation.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
