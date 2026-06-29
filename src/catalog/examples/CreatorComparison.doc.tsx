"use client";

import React from "react";
import {
  IconPlus,
  IconDownload,
  IconX,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const CREATORS = [
  {
    name: "Priya Nair",
    handle: "@priya.creates",
    tone: "purple" as const,
    followers: "128K",
    followersN: 128,
    engagement: "4.6%",
    engagementN: 4.6,
    avgViews: "22K",
    estReach: "95K",
    categories: ["Lifestyle", "Beauty"],
    pastDeals: 14,
    avgDeal: "$2,400",
    avgDealN: 2400,
    rating: 4.8,
    responseTime: "< 24h",
    responseScore: 1,
    audience1834: 72,
    platforms: ["instagram", "tiktok"],
  },
  {
    name: "Marcus Webb",
    handle: "@marcuswebb",
    tone: "blue" as const,
    followers: "84K",
    followersN: 84,
    engagement: "6.2%",
    engagementN: 6.2,
    avgViews: "18K",
    estReach: "52K",
    categories: ["Fitness", "Lifestyle"],
    pastDeals: 9,
    avgDeal: "$1,800",
    avgDealN: 1800,
    rating: 4.5,
    responseTime: "1–2 days",
    responseScore: 3,
    audience1834: 58,
    platforms: ["instagram"],
  },
  {
    name: "Sofia Chen",
    handle: "@sofiabeauty",
    tone: "orange" as const,
    followers: "210K",
    followersN: 210,
    engagement: "3.1%",
    engagementN: 3.1,
    avgViews: "38K",
    estReach: "163K",
    categories: ["Beauty", "Travel", "Fashion"],
    pastDeals: 22,
    avgDeal: "$3,200",
    avgDealN: 3200,
    rating: 4.9,
    responseTime: "< 12h",
    responseScore: 0,
    audience1834: 65,
    platforms: ["instagram", "tiktok"],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function bestIdx<T>(arr: T[], fn: (v: T) => number, dir: "max" | "min" = "max"): number {
  let best = 0;
  for (let i = 1; i < arr.length; i++) {
    if (dir === "max" ? fn(arr[i]) > fn(arr[best]) : fn(arr[i]) < fn(arr[best])) best = i;
  }
  return best;
}

function CellHighlight({ isBest, children }: { isBest: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      padding: "10px 14px",
      borderBottom: "1px solid var(--sd-border-light)",
      background: isBest ? TONES.green.tint : "transparent",
      color: isBest ? TONES.green.text : "var(--sd-font-primary)",
      fontWeight: isBest ? 700 : 400,
      fontSize: "var(--sd-text-sm)",
      display: "flex",
      alignItems: "center",
      gap: 6,
      minHeight: 44,
    }}>
      {children}
    </div>
  );
}

function LabelCell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "10px 14px",
      borderBottom: "1px solid var(--sd-border-light)",
      fontSize: "var(--sd-text-xs)",
      fontWeight: 600,
      color: "var(--sd-font-tertiary)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      display: "flex",
      alignItems: "center",
      minHeight: 44,
      background: "var(--sd-bg-secondary)",
    }}>
      {children}
    </div>
  );
}

function PlatformIcons({ platforms }: { platforms: string[] }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {platforms.includes("instagram") && <IconBrandInstagram size={14} color="#E1306C" />}
      {platforms.includes("tiktok") && <IconBrandTiktok size={14} color="var(--sd-font-primary)" />}
    </div>
  );
}

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  return (
    <span style={{ letterSpacing: 1 }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
      <span style={{ marginLeft: 4, fontWeight: 400 }}>{value}</span>
    </span>
  );
}

function PctBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--sd-bg-tertiary)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: color }} />
      </div>
      <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", minWidth: 28 }}>{pct}%</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison table                                                     */
/* ------------------------------------------------------------------ */

function ComparisonTable() {
  const bestEngagement = bestIdx(CREATORS, c => c.engagementN);
  const bestFollowers  = bestIdx(CREATORS, c => c.followersN);
  const bestDeal       = bestIdx(CREATORS, c => c.avgDealN);
  const bestRating     = bestIdx(CREATORS, c => c.rating);
  const bestResponse   = bestIdx(CREATORS, c => c.responseScore, "min");
  const bestAudience   = bestIdx(CREATORS, c => c.audience1834);

  const COL = `160px repeat(${CREATORS.length}, 1fr)`;

  return (
    <div style={{
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-lg)",
      overflow: "hidden",
      background: "var(--sd-bg-primary)",
    }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <span style={{ fontSize: "var(--sd-text-md)", fontWeight: 700, color: "var(--sd-font-primary)", flex: 1 }}>
          Compare Creators
        </span>
        <Button variant="ghost" size="sm" leftIcon={<IconPlus size={14} />}>Add creator</Button>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={14} />}>Export</Button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: COL }}>

        {/* Creator header row */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)" }} />
        {CREATORS.map((c, i) => (
          <div key={i} style={{ padding: "12px 14px", borderBottom: "1px solid var(--sd-border-light)", borderLeft: "1px solid var(--sd-border-light)", position: "relative" }}>
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <Button variant="ghost" size="sm" iconOnly aria-label="Remove"><IconX size={13} /></Button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", paddingTop: 4 }}>
              <Avatar name={c.name} tone={c.tone} size="lg" />
              <div>
                <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>{c.name}</div>
                <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 2 }}>{c.handle}</div>
              </div>
              <PlatformIcons platforms={c.platforms} />
              <Button variant="primary" size="sm" style={{ width: "100%" }}>Add to Campaign</Button>
            </div>
          </div>
        ))}

        {/* Followers */}
        <LabelCell>Followers</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={i === bestFollowers}>{c.followers}</CellHighlight>
          </div>
        ))}

        {/* Engagement */}
        <LabelCell>Engagement Rate</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={i === bestEngagement}>{c.engagement}</CellHighlight>
          </div>
        ))}

        {/* Avg Views */}
        <LabelCell>Avg Views</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={false}>{c.avgViews}</CellHighlight>
          </div>
        ))}

        {/* Est Reach */}
        <LabelCell>Est. Reach</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={false}>{c.estReach}</CellHighlight>
          </div>
        ))}

        {/* Categories */}
        <LabelCell>Content Types</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", borderLeft: "1px solid var(--sd-border-light)", display: "flex", flexWrap: "wrap", gap: 4, minHeight: 44, alignItems: "center" }}>
            {c.categories.map(cat => (
              <Badge key={cat} label={cat} variant="status" size="sm" />
            ))}
          </div>
        ))}

        {/* Past Deals */}
        <LabelCell>Past Deals</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={false}>{c.pastDeals}</CellHighlight>
          </div>
        ))}

        {/* Avg Deal Value */}
        <LabelCell>Avg Deal Value</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={i === bestDeal}>{c.avgDeal}</CellHighlight>
          </div>
        ))}

        {/* Rating */}
        <LabelCell>Rating</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={i === bestRating}>
              <StarRating value={c.rating} />
            </CellHighlight>
          </div>
        ))}

        {/* Response Time */}
        <LabelCell>Response Time</LabelCell>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--sd-border-light)" }}>
            <CellHighlight isBest={i === bestResponse}>{c.responseTime}</CellHighlight>
          </div>
        ))}

        {/* Audience 18-34 — last row, no border-bottom */}
        <div style={{ padding: "10px 14px", background: "var(--sd-bg-secondary)", fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center" }}>
          Audience 18–34
        </div>
        {CREATORS.map((c, i) => (
          <div key={i} style={{ padding: "10px 14px", borderLeft: "1px solid var(--sd-border-light)", display: "flex", alignItems: "center" }}>
            <PctBar
              pct={c.audience1834}
              color={i === bestAudience ? TONES.green.solid : TONES.blue.solid}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                  */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-comparison",
  title: "CreatorComparison",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Side-by-side creator comparison table for evaluating 2–3 creators before committing to deals.",
  description:
    "Use before deal creation to compare creators across key metrics. Best values per row are highlighted in green. Supports up to 3 creators; the Add button would expand the grid. All metric data is display-only — connect to real API data in the app.",
  demos: [
    {
      title: "Creator comparison",
      block: true,
      plain: true,
      render: () => <ComparisonTable />,
    },
  ],
  props: [],
};

export default doc;
