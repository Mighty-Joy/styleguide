"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconUsers,
  IconTrendingUp,
  IconCurrencyDollar,
  IconChartBar,
  IconMinus,
  IconPlus,
  IconEye,
  IconHeart,
  IconInfoCircle,
  IconSparkles,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface Tier {
  id: string;
  name: string;
  range: string;
  avgFollowers: number;
  avgER: number;
  avgCost: number;
  tone: keyof typeof TONES;
  count: number;
  description: string;
}

/* ---- seed ---- */
const TIERS_INIT: Tier[] = [
  { id: "nano",  name: "Nano",  range: "1K – 10K",   avgFollowers: 6_000,     avgER: 7.2, avgCost: 300,    tone: "green",     count: 0, description: "Highest ER, hyper-niche communities. Best for trust-led categories." },
  { id: "micro", name: "Micro", range: "10K – 100K", avgFollowers: 55_000,    avgER: 5.4, avgCost: 1_200,  tone: "blue",      count: 3, description: "Strong engagement + reach balance. Most brand-safe sweet spot." },
  { id: "mid",   name: "Mid",   range: "100K – 500K", avgFollowers: 280_000,  avgER: 3.8, avgCost: 4_500,  tone: "purple",    count: 2, description: "Scalable reach with credibility. Good for broad awareness pushes." },
  { id: "macro", name: "Macro", range: "500K – 1M",  avgFollowers: 720_000,   avgER: 2.6, avgCost: 12_000, tone: "orange",    count: 0, description: "Mass reach, lower ER. Pairs best with high-ER micro as anchor." },
  { id: "mega",  name: "Mega",  range: "1M+",         avgFollowers: 2_400_000, avgER: 1.8, avgCost: 35_000, tone: "red",       count: 0, description: "Celebrity-tier reach. Reserved for hero campaigns with large budgets." },
];

const TOTAL_BUDGET = 42_000;

function fmt(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}

function fmtMoney(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
}

/* ---- Demo ---- */
function Demo() {
  const [tiers, setTiers] = useState<Tier[]>(TIERS_INIT);

  function changeCount(id: string, delta: number) {
    setTiers((prev) => prev.map((t) => t.id === id ? { ...t, count: Math.max(0, t.count + delta) } : t));
  }

  const spent        = tiers.reduce((s, t) => s + t.count * t.avgCost, 0);
  const remaining    = TOTAL_BUDGET - spent;
  const totalCreators = tiers.reduce((s, t) => s + t.count, 0);
  const totalReach   = tiers.reduce((s, t) => s + t.count * t.avgFollowers, 0);
  const weightedER   = totalCreators === 0 ? 0 : tiers.reduce((s, t) => s + t.count * t.avgER, 0) / totalCreators;
  const budgetPct    = Math.min(100, Math.round((spent / TOTAL_BUDGET) * 100));
  const overBudget   = remaining < 0;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>Creator tier mix</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow · Budget: {fmtMoney(TOTAL_BUDGET)}</div>
        </div>
        <Button variant="primary" size="sm" leftIcon={<IconSparkles size={12} />} disabled={totalCreators === 0 || overBudget}>
          Apply mix
        </Button>
      </div>

      {/* Budget bar */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{fmtMoney(spent)} allocated</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: overBudget ? TONES.red.text : TONES.green.text }}>
            {overBudget ? `${fmtMoney(Math.abs(remaining))} over budget` : `${fmtMoney(remaining)} remaining`}
          </span>
        </div>
        <div style={{ height: 8, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${budgetPct}%`, height: "100%", background: overBudget ? TONES.red.text : budgetPct > 85 ? TONES.yellow.text : "#111", borderRadius: 4, transition: "width 0.3s ease" }} />
        </div>
      </div>

      {/* Tier rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {tiers.map((tier) => {
          const tierSpend = tier.count * tier.avgCost;
          const tierReach = tier.count * tier.avgFollowers;
          const hasCreators = tier.count > 0;
          return (
            <div key={tier.id} style={{ padding: "12px 14px", border: `1.5px solid ${hasCreators ? TONES[tier.tone].tint : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 10, background: hasCreators ? `${TONES[tier.tone].tint}50` : "transparent", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Tier label */}
                <div style={{ width: 48 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{tier.name}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>{tier.range}</div>
                </div>

                {/* Stats */}
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Avg ER</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: TONES[tier.tone].text }}>{tier.avgER}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Avg cost</div>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>{fmtMoney(tier.avgCost)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Avg reach</div>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>{fmt(tier.avgFollowers)}</div>
                  </div>
                </div>

                {/* Stepper */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => changeCount(tier.id, -1)} disabled={tier.count === 0}
                    style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", cursor: tier.count === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: tier.count === 0 ? 0.4 : 1 }}>
                    <IconMinus size={11} />
                  </button>
                  <span style={{ width: 20, textAlign: "center", fontSize: 14, fontWeight: 900 }}>{tier.count}</span>
                  <button onClick={() => changeCount(tier.id, 1)}
                    style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconPlus size={11} />
                  </button>
                </div>

                {/* Per-tier spend */}
                {hasCreators && (
                  <div style={{ textAlign: "right", width: 52 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: TONES[tier.tone].text }}>{fmtMoney(tierSpend)}</div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>{fmt(tierReach)} reach</div>
                  </div>
                )}
              </div>
              {hasCreators && (
                <div style={{ marginTop: 6, fontSize: 10, color: TONES[tier.tone].text, fontStyle: "italic" }}>{tier.description}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary KPIs */}
      {totalCreators > 0 && (
        <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, background: "var(--sd-bg-secondary, #f9f9f9)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Projected mix performance</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { icon: IconUsers,          label: "Creators",    value: String(totalCreators),  tone: "gray"   as const },
              { icon: IconEye,            label: "Est. reach",  value: fmt(totalReach),         tone: "blue"   as const },
              { icon: IconHeart,          label: "Blended ER",  value: `${weightedER.toFixed(1)}%`, tone: "green" as const },
              { icon: IconCurrencyDollar, label: "Total spend", value: fmtMoney(spent),         tone: overBudget ? "red" as const : "gray" as const },
            ].map(({ icon: Icon, label, value, tone }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <Icon size={13} style={{ color: TONES[tone].text, marginBottom: 3, display: "block", margin: "0 auto 3px" }} />
                <div style={{ fontSize: 14, fontWeight: 900, color: tone === "red" ? TONES.red.text : "var(--sd-font-primary, #111)" }}>{value}</div>
                <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-tier-calculator",
  title: "CreatorTierCalculator",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Budget allocation planner across creator tiers — adjust nano/micro/mid/macro/mega counts with steppers, see blended ER and total reach in real time.",
  description:
    "Helps brands decide on the right mix of creator tiers for a campaign. Header: campaign name, total budget, Apply mix CTA (disabled until mix set). Animated budget bar: fills as spend increases, turns yellow above 85%, red on over-budget. 5 tier rows (nano/micro/mid/macro/mega): each shows avg ER, avg cost, avg reach; +/− stepper to set creator count; when count > 0 shows tier spend, projected reach, and a description sentence with a tone-matched border highlight. Summary KPI strip at the bottom: total creators, estimated reach, blended weighted ER, total spend (red if over budget). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator tier calculator",
      description: "Use the +/− steppers to build your creator mix. Budget bar and projected KPIs update in real time.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
