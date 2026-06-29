"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconHeart,
  IconEye,
  IconShare,
  IconUsers,
  IconClick,
  IconBookmark,
  IconCurrencyDollar,
  IconChevronDown,
  IconChevronUp,
  IconCrown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface PlatformMetric {
  label: string;
  icon: React.ElementType;
  ig: string;
  tt: string;
  igRaw: number;
  ttRaw: number;
  higherIsBetter: boolean;
  format?: "pct" | "dollar" | "number";
}

const METRICS: PlatformMetric[] = [
  { label: "Total reach",      icon: IconUsers,         ig: "214K",  tt: "89K",   igRaw: 214000, ttRaw: 89000,  higherIsBetter: true  },
  { label: "Impressions",      icon: IconEye,           ig: "381K",  tt: "142K",  igRaw: 381000, ttRaw: 142000, higherIsBetter: true  },
  { label: "Engagement rate",  icon: IconHeart,         ig: "8.6%",  tt: "6.2%",  igRaw: 8.6,    ttRaw: 6.2,    higherIsBetter: true,  format: "pct"    },
  { label: "Video views",      icon: IconEye,           ig: "162K",  tt: "98K",   igRaw: 162000, ttRaw: 98000,  higherIsBetter: true  },
  { label: "Saves / Bookmarks",icon: IconBookmark,      ig: "9,820", tt: "1,240", igRaw: 9820,   ttRaw: 1240,   higherIsBetter: true  },
  { label: "Shares",           icon: IconShare,         ig: "3,140", tt: "5,820", igRaw: 3140,   ttRaw: 5820,   higherIsBetter: true  },
  { label: "Profile visits",   icon: IconUsers,         ig: "11,200",tt: "3,410", igRaw: 11200,  ttRaw: 3410,   higherIsBetter: true  },
  { label: "Link clicks",      icon: IconClick,         ig: "2,890", tt: "1,640", igRaw: 2890,   ttRaw: 1640,   higherIsBetter: true  },
  { label: "Attributed sales", icon: IconCurrencyDollar,ig: "$4,820",tt: "$1,980",igRaw: 4820,   ttRaw: 1980,   higherIsBetter: true,  format: "dollar" },
  { label: "CPM",              icon: IconCurrencyDollar,ig: "$7.20", tt: "$9.40", igRaw: 7.2,    ttRaw: 9.4,    higherIsBetter: false, format: "dollar" },
];

const PLATFORM_COLORS = {
  ig: { bg: "linear-gradient(135deg,#fce7f3,#db2777)", text: "#be185d", icon: IconBrandInstagram, name: "Instagram" },
  tt: { bg: "linear-gradient(135deg,#f1f5f9,#334155)", text: "#334155", icon: IconBrandTiktok,    name: "TikTok"    },
};

/* ---- Demo ---- */
function Demo() {
  const [expanded, setExpanded] = useState(true);
  const [highlight, setHighlight] = useState<"ig" | "tt" | null>(null);

  // Overall winner by points
  let igWins = 0, ttWins = 0;
  METRICS.forEach((m) => {
    const igBetter = m.higherIsBetter ? m.igRaw > m.ttRaw : m.igRaw < m.ttRaw;
    if (igBetter) igWins++; else ttWins++;
  });
  const winner = igWins > ttWins ? "ig" : "tt";
  const WinIcon = PLATFORM_COLORS[winner].icon;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Platform breakdown — Summer Glow</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Jul 3–18, 2025 · 4 creators · 10 posts</div>
        </div>
        <Button variant="secondary" size="sm">Export CSV</Button>
      </div>

      {/* Platform header cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 14 }}>
        {(["ig","tt"] as const).map((p) => {
          const { bg, text, icon: PIcon, name } = PLATFORM_COLORS[p];
          const isWinner = winner === p;
          const wins     = p === "ig" ? igWins : ttWins;
          return (
            <div key={p}
              onMouseEnter={() => setHighlight(p)}
              onMouseLeave={() => setHighlight(null)}
              style={{ background: bg, borderRadius: 12, padding: "14px 16px", cursor: "pointer", outline: highlight === p ? `2px solid ${text}` : "none", outlineOffset: 1, position: "relative" }}>
              {isWinner && (
                <div style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.85)" }}>
                  <IconCrown size={10} style={{ color: "#f59e0b" }} />
                  <span style={{ fontSize: 9, fontWeight: 800, color: "#111" }}>TOP PLATFORM</span>
                </div>
              )}
              <PIcon size={18} style={{ color: text, marginBottom: 6 }} />
              <div style={{ fontSize: 14, fontWeight: 900, color: text }}>{name}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: text, opacity: 0.7, marginTop: 2 }}>Won {wins}/{METRICS.length} metrics</div>
            </div>
          );
        })}
      </div>

      {/* Metric table */}
      <button onClick={() => setExpanded((e) => !e)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--sd-font-tertiary,#999)", flex: 1 }}>
          Metric comparison ({METRICS.length} metrics)
        </span>
        {expanded ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
      </button>

      {expanded && (
        <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: 0, background: "var(--sd-bg-secondary,#f9f9f9)", padding: "7px 14px", borderBottom: "1px solid var(--sd-border-default,#e5e7eb)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase" }}>Metric</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: PLATFORM_COLORS.ig.text, textAlign: "center", textTransform: "uppercase" }}>Instagram</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: PLATFORM_COLORS.tt.text, textAlign: "center", textTransform: "uppercase" }}>TikTok</div>
          </div>

          {METRICS.map((m, i) => {
            const MIcon = m.icon;
            const igBetter = m.higherIsBetter ? m.igRaw > m.ttRaw : m.igRaw < m.ttRaw;
            const igHl = highlight === "ig" || highlight === null;
            const ttHl = highlight === "tt" || highlight === null;
            return (
              <div key={m.label} style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: 0, padding: "9px 14px", borderBottom: i < METRICS.length - 1 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  <MIcon size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 500 }}>{m.label}</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: igBetter ? 900 : 500, color: igBetter ? TONES.green.text : "#111", opacity: igHl ? 1 : 0.35 }}>{m.ig}</div>
                  {igBetter && <div style={{ width: 6, height: 6, borderRadius: "50%", background: TONES.green.text, margin: "2px auto 0" }} />}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: !igBetter ? 900 : 500, color: !igBetter ? TONES.green.text : "#111", opacity: ttHl ? 1 : 0.35 }}>{m.tt}</div>
                  {!igBetter && <div style={{ width: 6, height: 6, borderRadius: "50%", background: TONES.green.text, margin: "2px auto 0" }} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary callout */}
      <div style={{ marginTop: 12, padding: "10px 14px", background: TONES.blue.tint, borderRadius: 10, fontSize: 11, color: TONES.blue.text }}>
        <strong>Instagram leads</strong> on reach, saves, attributed sales, and CPM efficiency. <strong>TikTok leads</strong> on shares — content spread organically beyond the initial audience. Consider shifting to TikTok-first for the next campaign to amplify virality.
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-multiplatform-breakdown",
  title: "CampaignMultiplatformBreakdown",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Side-by-side campaign performance split by platform — Instagram vs TikTok header cards with win counts, 10-metric comparison table with green dot on winner per row.",
  description:
    "Post-campaign analysis tool comparing the same campaign's performance across Instagram and TikTok. Header: campaign name, date range, creator + post counts, Export CSV. Two platform header cards (gradient backgrounds — pink for IG, slate for TikTok) with platform icon, name, 'Won N/10 metrics' sub-label, crown 'TOP PLATFORM' badge on winner; hover highlights that column in the table below. Collapsible 10-metric comparison table: column headers (metric name | Instagram | TikTok); each row shows metric icon + label, both values — winner in bold green with a 6px green dot beneath. Metrics: Total reach, Impressions, ER, Video views, Saves, Shares, Profile visits, Link clicks, Attributed sales, CPM. Hover a platform card to fade the opposing column. Blue insight callout at bottom summarizing the key cross-platform takeaway. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Platform performance breakdown",
      description: "Hover the Instagram or TikTok card to highlight that column (the other fades). Green dots show the winner per metric. Click the metric comparison header to collapse/expand the table.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
