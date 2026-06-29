"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconDownload,
  IconShare,
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconStar,
  IconStarFilled,
  IconBrandInstagram,
  IconBrandTiktok,
  IconChartPie,
  IconCheck,
  IconArrowUpRight,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- seed ---- */
const CAMPAIGN = {
  name: "Summer Glow",
  brand: "Aura Labs",
  period: "Jun 1 – Jun 30, 2025",
  status: "Completed",
  budget: 42_000,
  spend:  38_400,
};

const KPIS = [
  { label: "Total reach",    value: "3.2M",    target: "3.0M",    beat: true,  icon: IconUsers,          trend: "+6.7%" },
  { label: "Total views",    value: "8.4M",    target: "8.0M",    beat: true,  icon: IconEye,            trend: "+5%"   },
  { label: "Avg ER",         value: "7.8%",    target: "5.0%",    beat: true,  icon: IconHeart,          trend: "+56%"  },
  { label: "ROAS",           value: "4.3×",    target: "4.0×",    beat: true,  icon: IconCurrencyDollar, trend: "+7.5%" },
  { label: "Campaign spend", value: "$38.4K",  target: "$42K",    beat: true,  icon: IconChartPie,       trend: "−8.6% under" },
  { label: "Creators live",  value: "5 / 5",   target: "5",       beat: true,  icon: IconUsers,          trend: "100%" },
];

const LEADERBOARD = [
  { rank: 1, name: "Priya Nair",   initials: "PN", tone: "green"     as const, handle: "@priya.creates", platform: "instagram", reach: "182K", er: "9.4%", posts: 3, stars: 5 },
  { rank: 2, name: "Hana Kim",     initials: "HK", tone: "pink"      as const, handle: "@hanakim_",      platform: "instagram", reach: "94K",  er: "8.1%", posts: 2, stars: 5 },
  { rank: 3, name: "Diego Santos", initials: "DS", tone: "orange"    as const, handle: "@diegosantos",   platform: "tiktok",    reach: "268K", er: "6.2%", posts: 2, stars: 4 },
  { rank: 4, name: "Aisha Obi",    initials: "AO", tone: "turquoise" as const, handle: "@aishaobi",      platform: "instagram", reach: "71K",  er: "5.8%", posts: 2, stars: 4 },
  { rank: 5, name: "Marcus Webb",  initials: "MW", tone: "purple"    as const, handle: "@marcuswebb",    platform: "tiktok",    reach: "890K", er: "3.6%", posts: 1, stars: 3 },
];

const TOP_CONTENT = [
  { creator: "Priya Nair",   initials: "PN", tone: "green"  as const, type: "Reel",  platform: "instagram", gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", reach: "182K", er: "9.4%", plays: "318K" },
  { creator: "Hana Kim",     initials: "HK", tone: "pink"   as const, type: "Reel",  platform: "instagram", gradient: "linear-gradient(135deg,#fce7f3,#db2777)", reach: "94K",  er: "8.1%", plays: "211K" },
  { creator: "Diego Santos", initials: "DS", tone: "orange" as const, type: "TikTok",platform: "tiktok",    gradient: "linear-gradient(135deg,#fed7aa,#ea580c)", reach: "268K", er: "6.2%", plays: "840K" },
];

const RECS = [
  "Re-invite Priya Nair and Hana Kim — both exceeded ER targets and delivered on time.",
  "Brief Marcus Webb on skincare-first creative direction for better audience alignment.",
  "Add 2 nano creators next cycle for higher trust-signal content in the awareness mix.",
  "Move go-live day to Tuesday — heatmap data shows peak ER on Tuesday evenings.",
];

function StarRow({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1,2,3,4,5].map((i) => (
        i <= n
          ? <IconStarFilled key={i} size={11} style={{ color: "#f59e0b" }} />
          : <IconStar       key={i} size={11} style={{ color: "var(--sd-border-default, #d1d5db)" }} />
      ))}
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [tab, setTab] = useState<"overview" | "creators" | "content" | "recs">("overview");

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Hero header */}
      <div style={{ background: "linear-gradient(135deg,#1c1917,#292524)", borderRadius: 12, padding: "18px 20px", marginBottom: 16, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.5, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{CAMPAIGN.brand}</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{CAMPAIGN.name}</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>{CAMPAIGN.period}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Badge label="Completed" tone="green" size="sm" dot />
          </div>
        </div>
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { label: "Budget",      value: `$${(CAMPAIGN.budget/1000).toFixed(0)}K` },
            { label: "Spend",       value: `$${(CAMPAIGN.spend/1000).toFixed(1)}K`  },
            { label: "Utilization", value: `${Math.round(CAMPAIGN.spend/CAMPAIGN.budget*100)}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 9, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 900, marginTop: 2 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, marginBottom: 14, background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, padding: 4, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        {(["overview","creators","content","recs"] as const).map((t) => {
          const labels: Record<string, string> = { overview: "KPIs", creators: "Leaderboard", content: "Top content", recs: "Next steps" };
          const active = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: "6px 8px", borderRadius: 7, background: active ? "#fff" : "transparent", border: active ? "1px solid var(--sd-border-default, #e5e7eb)" : "1px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "#111" : "var(--sd-font-tertiary, #999)", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}>
              {labels[t]}
            </button>
          );
        })}
      </div>

      {/* KPIs */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {KPIS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} style={{ padding: "12px 14px", border: `1px solid ${TONES.green.tint}`, borderRadius: 10, background: "rgba(22,163,74,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <Icon size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                  <IconCheck size={11} style={{ color: TONES.green.text }} />
                </div>
                <div style={{ fontSize: 17, fontWeight: 900 }}>{kpi.value}</div>
                <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600, marginTop: 2 }}>{kpi.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 5, fontSize: 10, fontWeight: 700, color: TONES.green.text }}>
                  <IconTrendingUp size={10} />{kpi.trend} vs target ({kpi.target})
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard */}
      {tab === "creators" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {LEADERBOARD.map((c) => {
            const PIco = c.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
            return (
              <div key={c.rank} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
                <div style={{ width: 22, fontSize: 14, fontWeight: 900, color: c.rank <= 3 ? "#111" : "var(--sd-font-tertiary, #999)", textAlign: "center" }}>#{c.rank}</div>
                <Avatar initials={c.initials} tone={c.tone} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{c.name}</div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <PIco size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                    <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{c.handle}</span>
                  </div>
                </div>
                <div style={{ textAlign: "center", width: 44 }}>
                  <div style={{ fontSize: 13, fontWeight: 900, color: TONES.green.text }}>{c.er}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>ER</div>
                </div>
                <div style={{ textAlign: "center", width: 44 }}>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>{c.reach}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>reach</div>
                </div>
                <StarRow n={c.stars} />
              </div>
            );
          })}
        </div>
      )}

      {/* Top content */}
      {tab === "content" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {TOP_CONTENT.map((c, i) => {
            const PIco = c.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
            return (
              <div key={i} style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 80, background: c.gradient, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 6, left: 8 }}>
                    <Badge label={c.type} tone="gray" size="sm" />
                  </div>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                    <Avatar initials={c.initials} tone={c.tone} size="sm" />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700 }}>{c.creator}</div>
                      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <PIco size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <div><div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Reach</div><div style={{ fontSize: 13, fontWeight: 900 }}>{c.reach}</div></div>
                    <div><div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>ER</div><div style={{ fontSize: 13, fontWeight: 900, color: TONES.green.text }}>{c.er}</div></div>
                    <div><div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Plays</div><div style={{ fontSize: 13, fontWeight: 900 }}>{c.plays}</div></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommendations */}
      {tab === "recs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {RECS.map((rec, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "11px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: TONES.blue.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <IconArrowUpRight size={11} style={{ color: TONES.blue.text }} />
              </div>
              <span style={{ fontSize: 12, lineHeight: 1.6 }}>{rec}</span>
            </div>
          ))}
          <Button variant="primary" size="sm" leftIcon={<IconDownload size={12} />} style={{ marginTop: 6, alignSelf: "flex-start" }}>Export PDF report</Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-summary-report",
  title: "CampaignSummaryReport",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Post-campaign executive summary — dark hero header, 4-tab layout: KPI scorecard, creator leaderboard, top content grid, and next-campaign recommendations.",
  description:
    "The end-of-campaign wrap-up artifact delivered to brand stakeholders. Dark gradient hero: brand name, campaign name, period, Completed badge, budget / spend / utilization strip. 4-tab layout: KPIs — 6 metric cards (reach, views, ER, ROAS, spend, creator count), each with target, actual, trend vs target, and a green check; Leaderboard — 5 ranked creators with avatar, platform icon, ER in green, reach, star rating; Top content — 3-column grid with gradient thumbnail, type badge, avatar, reach/ER/plays stats; Next steps — 4 data-driven recommendations derived from the campaign results, with Export PDF CTA. All 6 KPIs beat their targets in the demo. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign summary report",
      description: "Toggle tabs: KPIs (all targets exceeded), Leaderboard (ranked by ER), Top Content, and Next Steps recommendations.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
