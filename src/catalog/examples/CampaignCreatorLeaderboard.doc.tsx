"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrophy,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconBrandInstagram,
  IconBrandTiktok,
  IconEye,
  IconHeart,
  IconUsers,
  IconDownload,
  IconRefresh,
  IconChevronRight,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type MetricKey = "er" | "impressions" | "views" | "reach";

interface CreatorStats {
  id: string;
  name: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple";
  platform: ("instagram" | "tiktok")[];
  er: number;
  impressions: number;
  views: number;
  reach: number;
  fee: number;
  trend: "up" | "down" | "flat";
  posts: number;
}

const CREATORS: CreatorStats[] = [
  { id: "c1", name: "Priya Nair",   initials: "PN", tone: "pink",   platform: ["instagram","tiktok"], er: 9.1, impressions: 138200, views: 91000, reach: 110000, fee: 1700, trend: "up",   posts: 2 },
  { id: "c2", name: "Ji-ho Kim",    initials: "JK", tone: "blue",   platform: ["tiktok"],             er: 6.4, impressions: 181000, views: 181000, reach: 141000, fee: 1200, trend: "up",   posts: 1 },
  { id: "c3", name: "Marcus Webb",  initials: "MW", tone: "orange", platform: ["instagram","tiktok"], er: 7.8, impressions: 119400, views: 52000, reach: 98000,  fee: 1400, trend: "flat", posts: 2 },
  { id: "c4", name: "Amara Diallo", initials: "AD", tone: "green",  platform: ["instagram"],          er: 8.3, impressions: 31200,  views: 0,      reach: 26000,  fee: 900,  trend: "down", posts: 1 },
  { id: "c5", name: "Sofia Reyes",  initials: "SR", tone: "purple", platform: ["instagram"],          er: 5.9, impressions: 44000,  views: 0,      reach: 38000,  fee: 900,  trend: "up",   posts: 1 },
];

const METRICS: { key: MetricKey; label: string; icon: React.ElementType; format: (v: number) => string }[] = [
  { key: "er",          label: "ER",          icon: IconHeart,   format: (v) => v.toFixed(1) + "%" },
  { key: "impressions", label: "Impressions", icon: IconEye,     format: (v) => v >= 1000 ? (v/1000).toFixed(0) + "K" : String(v) },
  { key: "reach",       label: "Reach",       icon: IconUsers,   format: (v) => v >= 1000 ? (v/1000).toFixed(0) + "K" : String(v) },
];

const RANK_COLORS = ["#f59e0b","#9ca3af","#cd7c4a"];
const RANK_LABELS = ["1st","2nd","3rd","4th","5th"];

/* ---- Demo ---- */
function Demo() {
  const [sortBy,   setSortBy]   = useState<MetricKey>("er");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  function refresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }

  const sorted = [...CREATORS].sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));

  const topMetricFmt = METRICS.find((m) => m.key === sortBy)!;

  const campaignTotals = {
    impressions: CREATORS.reduce((s, c) => s + c.impressions, 0),
    reach: CREATORS.reduce((s, c) => s + c.reach, 0),
    avgER: (CREATORS.reduce((s, c) => s + c.er, 0) / CREATORS.length).toFixed(1),
  };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Creator leaderboard</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Live rankings</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={11} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} />} onClick={refresh}>
            {refreshing ? "…" : "Refresh"}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Export</Button>
        </div>
      </div>

      {/* Campaign totals */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Total impressions", value: (campaignTotals.impressions / 1000).toFixed(0) + "K", tone: "blue"   as const },
          { label: "Total reach",       value: (campaignTotals.reach / 1000).toFixed(0) + "K",       tone: "purple" as const },
          { label: "Campaign avg ER",   value: campaignTotals.avgER + "%",                            tone: "green"  as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "9px 11px", background: TONES[tone].tint, borderRadius: 9 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.75 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Sort selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, alignSelf: "center", marginRight: 4 }}>Rank by:</span>
        {METRICS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setSortBy(key)}
            style={{ display: "flex", gap: 4, alignItems: "center", padding: "5px 10px", borderRadius: 8, background: sortBy === key ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: sortBy === key ? "#fff" : "var(--sd-font-secondary,#555)" }}>
            <Icon size={11} />
            {label}
          </button>
        ))}
      </div>

      {/* Leaderboard rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((creator, i) => {
          const rank = i + 1;
          const isExpanded = expanded === creator.id;
          const TrendIcon = creator.trend === "up" ? IconTrendingUp : creator.trend === "down" ? IconTrendingDown : IconMinus;
          const trendColor = creator.trend === "up" ? TONES.green.text : creator.trend === "down" ? TONES.red.text : "var(--sd-font-tertiary,#999)";

          return (
            <div key={creator.id} style={{ border: `1.5px solid ${rank === 1 ? "#f59e0b50" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 11, overflow: "hidden", background: rank === 1 ? "#fffbeb" : "transparent" }}>
              <button onClick={() => setExpanded(isExpanded ? null : creator.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {/* Rank badge */}
                <div style={{ width: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {rank <= 3
                    ? <IconTrophy size={18} style={{ color: RANK_COLORS[rank - 1] }} />
                    : <span style={{ fontSize: 11, fontWeight: 800, color: "var(--sd-font-tertiary,#999)" }}>#{rank}</span>}
                </div>

                <Avatar initials={creator.initials} tone={creator.tone} size="sm" />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 800 }}>{creator.name}</span>
                    <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{creator.posts} post{creator.posts !== 1 ? "s" : ""}</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    {creator.platform.map((p) => p === "instagram"
                      ? <IconBrandInstagram key={p} size={10} style={{ color: TONES.pink.text }} />
                      : <IconBrandTiktok   key={p} size={10} style={{ color: TONES.blue.text }} />)}
                  </div>
                </div>

                {/* Primary metric */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: rank === 1 ? "#f59e0b" : "#111" }}>
                    {topMetricFmt.format(creator[sortBy] as number)}
                  </div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{topMetricFmt.label}</div>
                </div>

                <TrendIcon size={14} style={{ color: trendColor, flexShrink: 0 }} />
              </button>

              {/* Expanded: all metrics */}
              {isExpanded && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "10px 13px", background: "var(--sd-bg-secondary,#f9f9f9)", display: "flex", gap: 16 }}>
                  {METRICS.map(({ key, label, icon: Icon, format }) => (
                    <div key={key} style={{ flex: 1, textAlign: "center" }}>
                      <Icon size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                      <div style={{ fontSize: 14, fontWeight: 900, marginTop: 3 }}>{format(creator[key] as number)}</div>
                      <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{label}</div>
                    </div>
                  ))}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: TONES.green.text, marginTop: 16 }}>${creator.fee.toLocaleString()}</div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>Fee paid</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, fontSize: 10, color: "var(--sd-font-tertiary,#999)", textAlign: "center" }}>
        Click a row to expand all metrics · Rankings update as posts go live
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-creator-leaderboard",
  title: "CampaignCreatorLeaderboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Live within-campaign creator rankings — 3 KPI tiles, rank-by selector (ER/impressions/reach), trophy icons for top 3, trend arrows, expandable rows revealing all metrics + fee paid.",
  description:
    "Brand's view of creator performance ranked within a campaign. Header: campaign name + 'Live rankings', Refresh (spin) + Export. 3 campaign totals: 513K total impressions / 413K total reach / 7.5% avg ER in tinted tiles. Rank-by selector: ER / Impressions / Reach chips (dark fill on active). 5 creator rows sorted by selected metric: trophy icon for #1 (gold) / #2 (silver) / #3 (bronze), then #4–5 with number; Avatar sm; name + post count; platform icons (IG pink / TikTok blue); large primary metric value (gold for #1); trend arrow (up green / down red / flat gray). Gold border + #fffbeb bg for rank 1. Click to expand: 3 metric columns (ER/Impressions/Reach each with icon) + Fee paid in green. Pre-seeded: Priya leads ER at 9.1%; Ji-ho leads impressions at 181K; all have trend arrows. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign creator leaderboard",
      description: "Toggle 'Rank by' between ER, Impressions, and Reach to see rankings shift. Click any row to expand all metrics. Priya leads ER; Ji-ho leads impressions.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
