"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconLink,
  IconCopy,
  IconCheck,
  IconTrendingUp,
  IconShoppingCart,
  IconCurrencyDollar,
  IconChartBar,
  IconBrandInstagram,
  IconBrandTiktok,
  IconExternalLink,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

const AFFILIATE_CODE = "PRIYA-AURA20";
const AFFILIATE_URL  = "superdeal.co/r/PRIYA-AURA20";

const DAILY_CLICKS = [88, 142, 107, 198, 231, 174, 307];
const DAY_LABELS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

interface TopPost {
  id: string;
  platform: "instagram" | "tiktok";
  type: string;
  date: string;
  caption: string;
  clicks: number;
  conversions: number;
  commission: number;
}

const TOP_POSTS: TopPost[] = [
  { id: "p1", platform: "instagram", type: "Reel",  date: "Jun 21", caption: "Sunday reset routine ft. Aura Labs Luminos ✨",      clicks: 423, conversions: 31, commission: 744  },
  { id: "p2", platform: "tiktok",    type: "Video", date: "Jun 19", caption: "Day 17 — before vs after comparison (wow)",            clicks: 381, conversions: 27, commission: 648  },
  { id: "p3", platform: "instagram", type: "Story", date: "Jun 20", caption: "Use code PRIYA-AURA20 for 20% off → link in bio",      clicks: 247, conversions: 19, commission: 456  },
  { id: "p4", platform: "tiktok",    type: "Video", date: "Jun 14", caption: "30-day serum challenge — my honest review",             clicks: 196, conversions: 12, commission: 288  },
];

const COMMISSION_PER_SALE = 24;
const TIER_THRESHOLD      = 100;
const TIER_BONUS_PCT      = 0.15;

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
      <span style={{ fontSize: 8, fontWeight: 700, color: "var(--sd-font-tertiary,#999)" }}>{value}</span>
      <div style={{ width: "100%", height: 48, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", borderRadius: "3px 3px 0 0", background: TONES.purple.tint, height: `${pct}%`, minHeight: 4, position: "relative", transition: "height 0.3s" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${Math.min(pct, 40)}%`, minHeight: 2, background: TONES.purple.text, borderRadius: "3px 3px 0 0", opacity: 0.6 }} />
        </div>
      </div>
    </div>
  );
}

function Demo() {
  const [copied,   setCopied]   = useState(false);
  const [period,   setPeriod]   = useState<"7d" | "30d">("7d");

  const totalClicks      = TOP_POSTS.reduce((s, p) => s + p.clicks, 0);
  const totalConversions = TOP_POSTS.reduce((s, p) => s + p.conversions, 0);
  const totalCommission  = TOP_POSTS.reduce((s, p) => s + p.commission, 0);
  const conversionRate   = ((totalConversions / totalClicks) * 100).toFixed(1);
  const maxClicks        = Math.max(...DAILY_CLICKS);

  const tierProgress = Math.min(totalConversions, TIER_THRESHOLD);
  const tierPct      = Math.round((tierProgress / TIER_THRESHOLD) * 100);
  const nearTier     = tierPct >= 80;

  function copyLink() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 2 }}>
          <IconChartBar size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
          <span style={{ fontSize: 13, fontWeight: 800 }}>Affiliate performance</span>
          <Badge label="Summer Glow" tone="orange" size="sm" />
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Aura Labs · Last 7 days</div>
      </div>

      {/* Affiliate link */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "9px 12px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 10, marginBottom: 14 }}>
        <IconLink size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary,#555)", fontFamily: "monospace" }}>{AFFILIATE_URL}</span>
        <span style={{ padding: "2px 7px", background: TONES.green.tint, borderRadius: 5, fontSize: 9, fontWeight: 800, color: TONES.green.text }}>20% OFF</span>
        <button onClick={copyLink}
          style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {copied ? <IconCheck size={11} style={{ color: TONES.green.text }} /> : <IconCopy size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>
      </div>

      {/* KPI tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
        {[
          { icon: IconExternalLink,    label: "Clicks",        value: totalClicks.toLocaleString(), tone: "blue"   as const, sub: "link taps"      },
          { icon: IconShoppingCart,    label: "Conversions",   value: totalConversions.toString(),  tone: "green"  as const, sub: "purchases"      },
          { icon: IconTrendingUp,      label: "Conv. rate",    value: conversionRate + "%",          tone: "purple" as const, sub: "clicks → buys"  },
          { icon: IconCurrencyDollar,  label: "Commission",    value: "$" + totalCommission.toLocaleString(), tone: "orange" as const, sub: "@$24/sale" },
        ].map(({ icon: Icon, label, value, tone, sub }) => (
          <div key={label} style={{ padding: "10px 12px", background: TONES[tone].tint, borderRadius: 10 }}>
            <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 4 }}>
              <Icon size={12} style={{ color: TONES[tone].text }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: TONES[tone].text, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: TONES[tone].text, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.65, marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Daily clicks chart */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Daily clicks</div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
          {DAILY_CLICKS.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: "var(--sd-font-tertiary,#999)" }}>{v}</span>
              <div style={{ width: "100%", height: 52, display: "flex", alignItems: "flex-end", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: "4px 4px 0 0" }}>
                <div style={{ width: "100%", height: `${Math.round((v / maxClicks) * 100)}%`, minHeight: 4, background: i === 6 ? TONES.purple.text : TONES.purple.tint, borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
              </div>
              <span style={{ fontSize: 8, color: "var(--sd-font-tertiary,#bbb)" }}>{DAY_LABELS[i]}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", textAlign: "right", marginTop: 3 }}>Sun highest: 307 clicks</div>
      </div>

      {/* Tier bonus tracker */}
      <div style={{ padding: "10px 12px", border: `1.5px solid ${nearTier ? TONES.green.text : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 10, marginBottom: 14, background: nearTier ? TONES.green.tint : "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>Tier bonus</span>
          <span style={{ fontSize: 11, fontWeight: 900, color: TONES.green.text }}>{tierProgress}/{TIER_THRESHOLD} sales</span>
        </div>
        <div style={{ height: 7, borderRadius: 4, background: "var(--sd-bg-tertiary,#e5e7eb)", overflow: "hidden", marginBottom: 5 }}>
          <div style={{ height: "100%", width: `${tierPct}%`, borderRadius: 4, background: TONES.green.text, transition: "width 0.5s" }} />
        </div>
        <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>
          {tierProgress < TIER_THRESHOLD
            ? `${TIER_THRESHOLD - tierProgress} more sales to unlock +${TIER_BONUS_PCT * 100}% bonus rate ($${(COMMISSION_PER_SALE * (1 + TIER_BONUS_PCT)).toFixed(0)}/sale)`
            : `+${TIER_BONUS_PCT * 100}% bonus unlocked — earning $${(COMMISSION_PER_SALE * (1 + TIER_BONUS_PCT)).toFixed(0)}/sale`}
        </div>
      </div>

      {/* Top posts */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Top converting posts</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {TOP_POSTS.map((post, idx) => {
            const PlatIcon = post.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
            const platTone = post.platform === "instagram" ? "pink" : "blue";
            return (
              <div key={post.id} style={{ display: "flex", gap: 9, alignItems: "center", padding: "8px 10px", background: idx === 0 ? TONES.purple.tint : "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 9, border: `1px solid ${idx === 0 ? TONES.purple.text + "30" : "transparent"}` }}>
                <span style={{ fontSize: 10, fontWeight: 900, width: 14, color: idx === 0 ? TONES.purple.text : "var(--sd-font-tertiary,#bbb)" }}>#{idx + 1}</span>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: TONES[platTone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PlatIcon size={13} style={{ color: TONES[platTone].text }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-secondary,#555)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.caption}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 1 }}>{post.type} · {post.date}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: TONES.green.text }}>${post.commission.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{post.conversions} sales</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-affiliate-dashboard",
  title: "CampaignAffiliateDashboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's affiliate link performance dashboard — unique code + copy link, 4 KPI tiles (clicks/conversions/conv. rate/commission), 7-day click bar chart, tier-bonus progress bar, and top converting posts ranked by commission.",
  description:
    "Creator tracks their affiliate link performance for a brand campaign. Header: 'Affiliate performance', campaign badge, brand + period. Affiliate link strip: monospace URL, 20% OFF discount badge, copy button (2s green check). 4 KPI tiles 2×2 grid: Clicks (blue), Conversions (green), Conv. rate (purple), Commission (orange) — each with icon, label, large value, sub-label. 7-day click bar chart: 7 columns (Mon–Sun), bars proportional to max (307 on Sun), current day darker; value above each bar. Tier bonus tracker: progress bar (89/100 sales = 89%), border turns green when ≥80%, message shows X more sales to unlock +15% bonus ($27.60/sale). Top converting posts: 4 rows ranked #1–4; #1 has purple tint bg; each row has rank, platform icon tile, truncated caption, date, commission + sales count. Pre-seeded: 1,247 total clicks / 89 conversions / 7.1% rate / $2,136 total commission. 11 more sales to tier bonus. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Affiliate performance dashboard",
      description: "Copy the affiliate link with the copy button. Track 7-day click trends in the bar chart. 11 more conversions to unlock the +15% tier bonus rate.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
