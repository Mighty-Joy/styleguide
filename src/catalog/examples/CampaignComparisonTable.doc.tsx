"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconCheck,
  IconDownload,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: "completed" | "active" | "planned";
  tone: keyof typeof TONES;
  metrics: {
    roas: number;
    emv: number;
    reach: number;
    views: number;
    er: number;
    cpm: number;
    budget: number;
    creators: number;
    posts: number;
  };
}

/* ---- data ---- */
const ALL_CAMPAIGNS: Campaign[] = [
  {
    id: "c1", name: "Summer Glow", brand: "Aura Labs", status: "completed", tone: "green",
    metrics: { roas: 4.2, emv: 142_000, reach: 2_400_000, views: 8_100_000, er: 6.8, cpm: 2.96, budget: 24_000, creators: 5, posts: 17 },
  },
  {
    id: "c2", name: "FitLife Q2", brand: "FitLife", status: "completed", tone: "orange",
    metrics: { roas: 3.1, emv: 94_000, reach: 1_800_000, views: 5_400_000, er: 5.2, cpm: 3.70, budget: 18_000, creators: 4, posts: 12 },
  },
  {
    id: "c3", name: "Tech Drop", brand: "NovaTech", status: "active", tone: "blue",
    metrics: { roas: 5.8, emv: 218_000, reach: 3_100_000, views: 11_200_000, er: 8.1, cpm: 2.14, budget: 32_000, creators: 6, posts: 22 },
  },
  {
    id: "c4", name: "Spring Refresh", brand: "BloomCo", status: "completed", tone: "pink",
    metrics: { roas: 2.4, emv: 61_000, reach: 980_000, views: 2_900_000, er: 4.8, cpm: 4.82, budget: 14_000, creators: 3, posts: 9 },
  },
];

const METRICS: { key: keyof Campaign["metrics"]; label: string; format: (v: number) => string; higherBetter: boolean }[] = [
  { key: "roas",     label: "ROAS",         format: (v) => `${v.toFixed(1)}×`,                  higherBetter: true  },
  { key: "emv",      label: "EMV",          format: (v) => `$${(v / 1000).toFixed(0)}k`,         higherBetter: true  },
  { key: "reach",    label: "Total reach",  format: (v) => `${(v / 1_000_000).toFixed(1)}M`,     higherBetter: true  },
  { key: "views",    label: "Total views",  format: (v) => `${(v / 1_000_000).toFixed(1)}M`,     higherBetter: true  },
  { key: "er",       label: "Avg ER",       format: (v) => `${v.toFixed(1)}%`,                   higherBetter: true  },
  { key: "cpm",      label: "CPM",          format: (v) => `$${v.toFixed(2)}`,                   higherBetter: false },
  { key: "budget",   label: "Budget",       format: (v) => `$${(v / 1000).toFixed(0)}k`,         higherBetter: false },
  { key: "creators", label: "Creators",     format: (v) => String(v),                             higherBetter: true  },
  { key: "posts",    label: "Posts",        format: (v) => String(v),                             higherBetter: true  },
];

const STATUS_TONE: Record<Campaign["status"], keyof typeof TONES> = {
  completed: "gray",
  active:    "green",
  planned:   "blue",
};

/* ---- Demo ---- */
function Demo() {
  const [selected, setSelected] = useState<string[]>(["c1", "c2", "c3"]);

  function toggle(id: string) {
    setSelected((ss) =>
      ss.includes(id)
        ? ss.length > 2 ? ss.filter((s) => s !== id) : ss
        : ss.length < 3 ? [...ss, id] : ss
    );
  }

  const campaigns = ALL_CAMPAIGNS.filter((c) => selected.includes(c.id));

  // Per-metric: who wins?
  function winner(key: keyof Campaign["metrics"], hb: boolean): string {
    let best = campaigns[0];
    campaigns.forEach((c) => {
      if (hb ? c.metrics[key] > best.metrics[key] : c.metrics[key] < best.metrics[key]) best = c;
    });
    return best.id;
  }

  // Count wins per campaign
  const wins: Record<string, number> = {};
  campaigns.forEach((c) => { wins[c.id] = 0; });
  METRICS.forEach(({ key, higherBetter }) => {
    const w = winner(key, higherBetter);
    wins[w] = (wins[w] || 0) + 1;
  });
  const champion = campaigns.reduce((a, b) => (wins[a.id] >= wins[b.id] ? a : b));

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Campaign comparison</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Select 2–3 campaigns to compare side by side</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
      </div>

      {/* Campaign selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {ALL_CAMPAIGNS.map((c) => {
          const active = selected.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 9, border: `1.5px solid ${active ? "#111" : "var(--sd-border-default, #e5e7eb)"}`, background: active ? "#111" : "transparent", cursor: "pointer" }}
            >
              {active && <IconCheck size={11} color="#fff" />}
              <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#fff" : "var(--sd-font-secondary, #555)" }}>{c.name}</span>
              <Badge label={c.status} tone={STATUS_TONE[c.status]} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Summary winner */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px solid ${TONES.green.tint}`, borderRadius: 10, marginBottom: 16, background: TONES.green.tint }}>
        <IconTrendingUp size={16} style={{ color: TONES.green.text, flexShrink: 0 }} />
        <div>
          <span style={{ fontSize: 12, fontWeight: 800, color: TONES.green.text }}>{champion.name}</span>
          <span style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)" }}> wins {wins[champion.id]} of {METRICS.length} metrics</span>
        </div>
        <Badge label="Overall winner" tone="green" size="sm" />
      </div>

      {/* Comparison table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {/* Campaign header columns */}
        <div style={{ display: "grid", gridTemplateColumns: `140px repeat(${campaigns.length}, 1fr)`, borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
          <div style={{ padding: "10px 14px", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Metric</div>
          {campaigns.map((c) => (
            <div key={c.id} style={{ padding: "10px 12px", borderLeft: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: TONES[c.tone].text, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                {c.id === champion.id && <IconCheck size={11} style={{ color: TONES.green.text, flexShrink: 0 }} />}
              </div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{c.brand}</div>
              <div style={{ marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}>
                <Badge label={`${wins[c.id]}/${METRICS.length} wins`} tone={c.id === champion.id ? "green" : "gray"} size="sm" />
              </div>
            </div>
          ))}
        </div>

        {/* Metric rows */}
        {METRICS.map(({ key, label, format, higherBetter }, rowIdx) => {
          const win = winner(key, higherBetter);
          const vals = campaigns.map((c) => c.metrics[key]);
          const best = higherBetter ? Math.max(...vals) : Math.min(...vals);
          const worst = higherBetter ? Math.min(...vals) : Math.max(...vals);

          return (
            <div
              key={key}
              style={{ display: "grid", gridTemplateColumns: `140px repeat(${campaigns.length}, 1fr)`, borderBottom: rowIdx < METRICS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}
            >
              <div style={{ padding: "11px 14px", fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)", display: "flex", alignItems: "center" }}>{label}</div>
              {campaigns.map((c) => {
                const val = c.metrics[key];
                const isWin  = c.id === win;
                const isWorst = !isWin && val === worst && campaigns.length > 2;
                return (
                  <div
                    key={c.id}
                    style={{ padding: "11px 12px", borderLeft: "1px solid var(--sd-border-default, #e5e7eb)", background: isWin ? TONES.green.tint : "transparent", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 800, color: isWin ? TONES.green.text : isWorst ? TONES.red.text : "var(--sd-font-primary, #111)" }}>
                      {format(val)}
                    </span>
                    {isWin && <IconTrendingUp size={12} style={{ color: TONES.green.text }} />}
                    {isWorst && <IconTrendingDown size={12} style={{ color: TONES.red.text }} />}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-comparison-table",
  title: "CampaignComparisonTable",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Side-by-side campaign comparison — metric rows with winner highlighted in green and worst in red, campaign selector, and overall winner callout.",
  description:
    "Select 2–3 campaigns to compare across 9 metrics: ROAS, EMV, reach, views, avg ER, CPM, budget, creator count, post count. Campaign selector chips toggle in/out (min 2, max 3). Header: each campaign column shows name, brand, tone dot, and win count badge. Overall winner callout in green above the table. Per-row: metric name in the stub column; each campaign cell shows the formatted value, green tint + TrendingUp icon for the winner, red text + TrendingDown for the worst (when 3 campaigns). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign comparison table",
      description: "Click campaign chips to swap which campaigns are compared. Green cells win that metric; red loses.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
