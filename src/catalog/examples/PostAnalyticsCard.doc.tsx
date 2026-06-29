"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconHeart,
  IconMessageCircle,
  IconShare,
  IconBookmark,
  IconEye,
  IconUsers,
  IconBrandInstagram,
  IconBrandTiktok,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconExternalLink,
  IconChartBar,
  IconClock,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface PostVariant {
  id: string;
  label: string;
  platform: "instagram" | "tiktok";
  type: "reel" | "feed" | "story" | "tiktok";
  creatorName: string;
  creatorInitials: string;
  creatorTone: string;
  handle: string;
  postedAt: string;
  caption: string;
  gradient: string;
  metrics: {
    reach: number;
    impressions: number;
    plays: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    er: number;
    linkClicks: number;
  };
  benchmarkER: number;
  peakHour: string;
}

const POSTS: PostVariant[] = [
  {
    id: "p1", label: "Priya — Reel", platform: "instagram", type: "reel",
    creatorName: "Priya Nair", creatorInitials: "PN", creatorTone: "green", handle: "@priya.creates",
    postedAt: "Jun 25 · 7:14 PM", caption: "My summer skincare routine ft. @auralabs ✨ This glow isn't going to maintain itself 🌞 Use code PRIYA20 for 20% off #SummerGlow #SkincareRoutine",
    gradient: "linear-gradient(135deg,#fde68a,#f59e0b,#d97706)",
    metrics: { reach: 182_400, impressions: 241_000, plays: 318_000, likes: 22_800, comments: 1_240, shares: 3_420, saves: 8_900, er: 9.4, linkClicks: 2_180 },
    benchmarkER: 5.0, peakHour: "7–9 PM",
  },
  {
    id: "p2", label: "Marcus — TikTok", platform: "tiktok", type: "tiktok",
    creatorName: "Marcus Webb", creatorInitials: "MW", creatorTone: "purple", handle: "@marcuswebb",
    postedAt: "Jun 26 · 2:30 PM", caption: "POV: you find the one skincare product that actually does something 😭 #SummerGlow #SkincareCheck #FYP",
    gradient: "linear-gradient(135deg,#ede9fe,#7c3aed,#4c1d95)",
    metrics: { reach: 890_000, impressions: 1_140_000, plays: 2_300_000, likes: 58_000, comments: 4_100, shares: 12_400, saves: 6_300, er: 3.6, linkClicks: 890 },
    benchmarkER: 5.0, peakHour: "2–4 PM",
  },
];

function fmt(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}

interface MetricRowProps { icon: React.ElementType; label: string; value: number; benchmark?: number; isCurrency?: boolean }
function MetricRow({ icon: Icon, label, value, benchmark }: MetricRowProps) {
  const formatted = fmt(value);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
      <Icon size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
      <span style={{ fontSize: 12, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 800 }}>{formatted}</span>
      {benchmark !== undefined && (
        <span style={{ fontSize: 10, color: value >= benchmark ? TONES.green.text : TONES.red.text, fontWeight: 700, display: "flex", alignItems: "center", gap: 2, width: 48, justifyContent: "flex-end" }}>
          {value >= benchmark ? <IconTrendingUp size={10} /> : <IconTrendingDown size={10} />}
          {value >= benchmark ? "above" : "below"}
        </span>
      )}
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [selectedId, setSelectedId] = useState("p1");
  const post = POSTS.find((p) => p.id === selectedId)!;
  const PlatformIcon = post.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
  const erAbove = post.metrics.er > post.benchmarkER;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Post selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {POSTS.map((p) => {
          const PIco = p.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const active = p.id === selectedId;
          return (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", border: `1.5px solid ${active ? "#111" : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 9, background: active ? "#fafafa" : "transparent", cursor: "pointer" }}>
              <PIco size={13} style={{ color: active ? "#111" : "var(--sd-font-tertiary, #999)" }} />
              <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "#111" : "var(--sd-font-tertiary, #999)" }}>{p.label}</span>
              <Badge label={`${p.metrics.er}%`} tone={p.metrics.er >= p.benchmarkER ? "green" : "yellow"} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Post header */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        {/* Gradient thumbnail */}
        <div style={{ width: 64, height: 80, borderRadius: 10, background: post.gradient, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Avatar initials={post.creatorInitials} tone={post.creatorTone as any} size="sm" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{post.creatorName}</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <PlatformIcon size={11} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{post.handle}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Badge label={post.type.toUpperCase()} tone="gray" size="sm" />
            <Badge label={post.postedAt} tone="gray" size="sm" />
          </div>
          <div style={{ marginTop: 5, fontSize: 10, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.caption}
          </div>
        </div>
      </div>

      {/* ER callout */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: erAbove ? TONES.green.tint : TONES.yellow.tint, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: erAbove ? TONES.green.text : TONES.yellow.text }}>
            Engagement rate · {post.metrics.er}%
          </span>
          <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", marginLeft: 6 }}>
            Benchmark: {post.benchmarkER}% · {erAbove ? `+${(post.metrics.er - post.benchmarkER).toFixed(1)}pp above` : `${(post.benchmarkER - post.metrics.er).toFixed(1)}pp below`}
          </span>
        </div>
        {erAbove ? <IconTrendingUp size={16} style={{ color: TONES.green.text }} /> : <IconTrendingDown size={16} style={{ color: TONES.yellow.text }} />}
      </div>

      {/* Metrics */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, fontWeight: 700 }}>Metrics</div>
        <div style={{ padding: "0 14px" }}>
          <MetricRow icon={IconEye}            label="Reach"        value={post.metrics.reach}       />
          <MetricRow icon={IconChartBar}        label="Impressions"  value={post.metrics.impressions} />
          <MetricRow icon={IconEye}             label={post.platform === "tiktok" ? "Video plays" : "Reel plays"} value={post.metrics.plays} />
          <MetricRow icon={IconHeart}           label="Likes"        value={post.metrics.likes}       />
          <MetricRow icon={IconMessageCircle}   label="Comments"     value={post.metrics.comments}    />
          <MetricRow icon={IconShare}           label="Shares"       value={post.metrics.shares}      />
          <MetricRow icon={IconBookmark}        label="Saves"        value={post.metrics.saves}       />
          <MetricRow icon={IconUsers}           label="Link clicks"  value={post.metrics.linkClicks}  />
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0" }}>
            <IconClock size={13} style={{ color: "var(--sd-font-tertiary, #999)" }} />
            <span style={{ fontSize: 12, flex: 1 }}>Peak engagement hour</span>
            <Badge label={post.peakHour} tone="blue" size="sm" />
          </div>
        </div>
      </div>

      <Button variant="secondary" size="sm" leftIcon={<IconExternalLink size={12} />}>View on {post.platform === "instagram" ? "Instagram" : "TikTok"}</Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "post-analytics-card",
  title: "PostAnalyticsCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Single-post deep-dive analytics — reach, impressions, plays, likes, comments, shares, saves, link clicks, ER vs benchmark, and peak engagement hour.",
  description:
    "Granular per-post performance view for campaign reporting. Post selector: toggle between posts with platform icon and ER badge. Post header: gradient thumbnail, avatar, creator name, platform icon, post type + date badges, truncated caption. ER callout banner: tone-matched (green if above benchmark, yellow if below), shows ER %, benchmark, and delta in pp. Metrics accordion: 9 rows — reach, impressions, plays, likes, comments, shares, saves, link clicks, peak engagement hour; each has an icon, label, formatted value; above/below benchmark trend arrows for ER. View on platform CTA button. Toggle between Priya's reel (9.4% ER, above benchmark) and Marcus's TikTok (3.6% ER, below). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Post analytics card",
      description: "Toggle between Priya's Instagram reel (9.4% ER — above benchmark) and Marcus's TikTok (3.6% ER — below benchmark) to compare.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
