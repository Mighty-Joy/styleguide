"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconDownload,
  IconShare,
  IconSparkles,
  IconStar,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconUsers,
  IconChartBar,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

interface MetricCard {
  label: string;
  value: string;
  sub: string;
  trend: number;
  icon: React.ElementType;
  tone: keyof typeof TONES;
}

interface CreatorPerf {
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  views: number;
  er: number;
  emv: number;
  reach: number;
  posts: number;
}

/* ---- data ---- */

const METRICS: MetricCard[] = [
  { label: "ROAS",         value: "4.2×",      sub: "vs 3.1× target",    trend: +35, icon: IconCurrencyDollar, tone: "green"  },
  { label: "EMV",          value: "$142k",      sub: "earned media value",trend: +18, icon: IconSparkles,       tone: "purple" },
  { label: "Total reach",  value: "2.4M",       sub: "unique accounts",   trend: +22, icon: IconUsers,          tone: "blue"   },
  { label: "Total views",  value: "8.1M",       sub: "across all posts",  trend: +41, icon: IconEye,            tone: "yellow" },
  { label: "Avg ER",       value: "6.8%",       sub: "vs 3.2% benchmark", trend: +113,icon: IconHeart,          tone: "pink"   },
  { label: "CPM",          value: "$2.96",      sub: "$4.10 industry avg",trend: -28, icon: IconChartBar,       tone: "orange" },
];

const CREATORS: CreatorPerf[] = [
  { name: "Priya Nair",   initials: "PN", tone: "green",  handle: "@priya.creates", views: 3_200_000, er: 9.4, emv: 58_000, reach: 890_000, posts: 5 },
  { name: "Diego Santos", initials: "DS", tone: "orange", handle: "@diegosantos",   views: 2_100_000, er: 7.2, emv: 39_000, reach: 620_000, posts: 4 },
  { name: "Hana Kim",     initials: "HK", tone: "pink",   handle: "@hanakim_",      views: 1_400_000, er: 6.1, emv: 27_000, reach: 430_000, posts: 3 },
  { name: "Marcus Webb",  initials: "MW", tone: "purple", handle: "@marcuswebb",    views: 890_000,   er: 5.4, emv: 18_000, reach: 310_000, posts: 3 },
  { name: "Aisha Obi",    initials: "AO", tone: "turquoise", handle: "@aishaobi",   views: 510_000,   er: 4.8, emv: 11_000, reach: 220_000, posts: 2 },
];

const BUDGET = { total: 24_000, spent: 22_400, emv: 142_000 };

type SortKey = "views" | "er" | "emv" | "reach";

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

function fmtMoney(n: number): string {
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n}`;
}

/* ---- Demo ---- */

function Demo() {
  const [sort, setSort] = useState<SortKey>("views");

  const sorted = [...CREATORS].sort((a, b) => b[sort] - a[sort]);
  const maxViews = CREATORS[0].views;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Summer Glow — Campaign Report</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Badge label="Completed" tone="green" dot />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Jun 1 – Jul 17, 2026 · 5 creators · 17 posts</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconShare size={12} />}>Share</Button>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {METRICS.map(({ label, value, sub, trend, icon: Icon, tone }) => (
          <div key={label} style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: TONES[tone].tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={12} style={{ color: TONES[tone].text }} />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "var(--sd-font-primary, #111)", marginBottom: 3 }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 10, fontWeight: 700, color: trend > 0 ? TONES.green.text : TONES.red.text }}>
                {trend > 0 ? <IconTrendingUp size={11} /> : <IconTrendingDown size={11} />}
                {trend > 0 ? "+" : ""}{trend}%
              </div>
              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Budget summary */}
      <div style={{ padding: "12px 16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 20, display: "flex", gap: 24, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2 }}>Budget spent</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{fmtMoney(BUDGET.spent)} <span style={{ fontSize: 12, fontWeight: 400, color: "var(--sd-font-tertiary, #999)" }}>/ {fmtMoney(BUDGET.total)}</span></div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${(BUDGET.spent / BUDGET.total) * 100}%`, height: "100%", background: "#111", borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 3 }}>{Math.round((BUDGET.spent / BUDGET.total) * 100)}% utilised · ${(BUDGET.total - BUDGET.spent).toLocaleString()} returned</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2 }}>EMV ratio</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: TONES.green.text }}>{(BUDGET.emv / BUDGET.spent).toFixed(1)}×</div>
        </div>
      </div>

      {/* Creator leaderboard */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>Creator performance</span>
          <div style={{ display: "flex", gap: 4 }}>
            {(["views", "er", "emv", "reach"] as SortKey[]).map((k) => (
              <button key={k} onClick={() => setSort(k)} style={{ padding: "3px 8px", borderRadius: 99, border: "1px solid", borderColor: sort === k ? "#333" : "var(--sd-border-default, #e5e7eb)", background: sort === k ? "#333" : "transparent", color: sort === k ? "#fff" : "var(--sd-font-secondary, #666)", fontSize: 10, fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {k === "er" ? "ER" : k}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              {["#", "Creator", "Views", "ER", "EMV", "Reach", "Posts"].map((h) => (
                <th key={h} style={{ padding: "7px 12px", textAlign: h === "Creator" || h === "#" ? "left" : "right", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => (
              <tr key={c.name} style={{ borderBottom: i < sorted.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
                <td style={{ padding: "9px 12px", width: 28 }}>
                  {i === 0 ? <IconStar size={13} style={{ color: TONES.yellow.text }} /> : <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{i + 1}</span>}
                </td>
                <td style={{ padding: "9px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={c.initials} tone={c.tone} size="sm" />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{c.handle}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                    <div style={{ width: 48, height: 3, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 2 }}>
                      <div style={{ width: `${(c.views / maxViews) * 100}%`, height: "100%", background: "#111", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontWeight: 700 }}>{fmt(c.views)}</span>
                  </div>
                </td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>
                  <span style={{ fontWeight: 700, color: c.er >= 7 ? TONES.green.text : c.er >= 5 ? "var(--sd-font-primary, #111)" : TONES.yellow.text }}>{c.er}%</span>
                </td>
                <td style={{ padding: "9px 12px", textAlign: "right", fontWeight: 700, color: TONES.green.text }}>{fmtMoney(c.emv)}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--sd-font-secondary, #555)" }}>{fmt(c.reach)}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--sd-font-secondary, #555)" }}>{c.posts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-roi-summary",
  title: "CampaignROISummary",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Post-campaign ROI wrap-up — 6 KPI cards (ROAS, EMV, reach, views, ER, CPM), budget utilisation bar, and a sortable creator leaderboard.",
  description:
    "The end-of-campaign performance report. Header: campaign name, completed badge, date range + creator/post counts, Share + Export actions. KPI grid (3×2): ROAS, EMV, total reach, total views, avg ER, CPM — each with trend arrow, % delta vs benchmark, and a tone-matched icon. Budget bar: spent vs total, utilisation %, EMV ratio in green. Creator leaderboard: sortable by Views / ER / EMV / Reach — rank column shows ★ for #1, inline view-bar per row, ER coloured green ≥7% / yellow <5%. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign ROI summary",
      description: "Click the sort pills (Views / ER / EMV / Reach) to re-rank the creator leaderboard.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
