"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { PlatformIcon } from "@/components/ui/PlatformIcon/PlatformIcon";
import {
  IconEye,
  IconHeart,
  IconMessageCircle,
  IconShare3,
  IconBookmark,
  IconPlayerPlay,
  IconArrowUpRight,
  IconArrowDownRight,
  IconMinus,
  IconExternalLink,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

type Platform = "instagram" | "tiktok" | "youtube";

interface Metric {
  label: string;
  value: string;
  raw: number;
  benchmark: number;
  icon: React.ReactNode;
}

interface PostData {
  id: string;
  creator: string;
  platform: Platform;
  contentType: string;
  caption: string;
  publishedAt: string;
  thumbnailGradient: string;
  metrics: Metric[];
  engagementRate: number;
  benchmarkEngagement: number;
  deal: string;
  spend: string;
}

const POSTS: PostData[] = [
  {
    id: "p1",
    creator: "Priya Nair",
    platform: "instagram",
    contentType: "Reel",
    caption: "Tried the new Atlas X skincare set for 30 days — here's what actually happened 👀 #AtlasX #SkincareRoutine",
    publishedAt: "Aug 12 · 6:00 PM",
    thumbnailGradient: "linear-gradient(135deg,#6d28d9,#a855f7)",
    metrics: [
      { label: "Views",    value: "284k",  raw: 284000, benchmark: 200000, icon: <IconEye size={14} /> },
      { label: "Likes",    value: "18.4k", raw: 18400,  benchmark: 12000,  icon: <IconHeart size={14} /> },
      { label: "Comments", value: "1.2k",  raw: 1200,   benchmark: 800,    icon: <IconMessageCircle size={14} /> },
      { label: "Saves",    value: "4.1k",  raw: 4100,   benchmark: 2500,   icon: <IconBookmark size={14} /> },
    ],
    engagementRate: 8.3,
    benchmarkEngagement: 5.2,
    deal: "Atlas X",
    spend: "$15k",
  },
  {
    id: "p2",
    creator: "Diego Santos",
    platform: "tiktok",
    contentType: "Short",
    caption: "POV: you finally found a skincare brand that doesn't break you out 😭 #AtlasX #GlowUp #SkinTok",
    publishedAt: "Aug 14 · 8:30 PM",
    thumbnailGradient: "linear-gradient(135deg,#0f172a,#1e293b)",
    metrics: [
      { label: "Views",    value: "1.2M",  raw: 1200000, benchmark: 500000, icon: <IconEye size={14} /> },
      { label: "Likes",    value: "96k",   raw: 96000,   benchmark: 45000,  icon: <IconHeart size={14} /> },
      { label: "Comments", value: "3.4k",  raw: 3400,    benchmark: 2000,   icon: <IconMessageCircle size={14} /> },
      { label: "Shares",   value: "12.1k", raw: 12100,   benchmark: 5000,   icon: <IconShare3 size={14} /> },
    ],
    engagementRate: 9.4,
    benchmarkEngagement: 7.8,
    deal: "Atlas X",
    spend: "$11k",
  },
  {
    id: "p3",
    creator: "Marcus Webb",
    platform: "tiktok",
    contentType: "Short",
    caption: "My honest 60-second review of Atlas X Vitamin C serum. Worth it? Let's find out.",
    publishedAt: "Aug 21 · 7:00 PM",
    thumbnailGradient: "linear-gradient(135deg,#064e3b,#10b981)",
    metrics: [
      { label: "Views",    value: "89k",  raw: 89000, benchmark: 120000, icon: <IconEye size={14} /> },
      { label: "Likes",    value: "5.2k", raw: 5200,  benchmark: 9000,   icon: <IconHeart size={14} /> },
      { label: "Comments", value: "430",  raw: 430,   benchmark: 700,    icon: <IconMessageCircle size={14} /> },
      { label: "Shares",   value: "890",  raw: 890,   benchmark: 1200,   icon: <IconShare3 size={14} /> },
    ],
    engagementRate: 7.3,
    benchmarkEngagement: 7.8,
    deal: "Atlas X",
    spend: "$22k",
  },
];

function trend(val: number, benchmark: number) {
  const diff = ((val - benchmark) / benchmark) * 100;
  if (diff > 5)
    return {
      icon: <IconArrowUpRight size={12} />,
      label: `+${Math.round(diff)}%`,
      color: "var(--sd-green-solid, #22c55e)",
    };
  if (diff < -5)
    return {
      icon: <IconArrowDownRight size={12} />,
      label: `${Math.round(diff)}%`,
      color: "var(--sd-red-solid, #ef4444)",
    };
  return {
    icon: <IconMinus size={12} />,
    label: "Avg",
    color: "var(--sd-font-tertiary, #999)",
  };
}

function MetricPill({ metric }: { metric: Metric }) {
  const t = trend(metric.raw, metric.benchmark);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "#f8f8f8",
        borderRadius: 8,
        padding: "8px 12px",
        flex: 1,
        minWidth: 80,
      }}
    >
      <span style={{ color: "var(--sd-font-tertiary, #999)" }}>{metric.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sd-font-primary, #333)", lineHeight: 1 }}>
          {metric.value}
        </div>
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>
          {metric.label}
        </div>
      </div>
      <span style={{ display: "flex", alignItems: "center", gap: 1, fontSize: 11, fontWeight: 600, color: t.color }}>
        {t.icon}
        {t.label}
      </span>
    </div>
  );
}

function PostCard({ post }: { post: PostData }) {
  const erTrend = trend(post.engagementRate, post.benchmarkEngagement);

  return (
    <div
      style={{
        border: "1px solid var(--sd-border-default, #ebebeb)",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--sd-border-default, #ebebeb)" }}>
        {/* Thumbnail */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            background: post.thumbnailGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <IconPlayerPlay size={18} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Creator chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Avatar name={post.creator} size="sm" />
            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--sd-font-primary, #333)" }}>
              {post.creator}
            </span>
            <PlatformIcon platform={post.platform} size={13} />
            <Badge label={post.contentType} tone="gray" size="sm" />
          </div>
          {/* Caption */}
          <div
            style={{
              fontSize: 12,
              color: "var(--sd-font-secondary, #666)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 400,
            }}
          >
            {post.caption}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          {/* ER pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: erTrend.color === "var(--sd-green-solid, #22c55e)" ? "#dcfce7" : "#fef2f2",
              borderRadius: 99,
              padding: "3px 10px",
            }}
          >
            <IconTrendingUp size={12} color={erTrend.color} />
            <span style={{ fontSize: 12, fontWeight: 700, color: erTrend.color }}>
              {post.engagementRate}% ER
            </span>
          </div>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{post.publishedAt}</span>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: 8, padding: 12 }}>
        {post.metrics.map((m) => (
          <MetricPill key={m.label} metric={m} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderTop: "1px solid var(--sd-border-default, #ebebeb)",
          background: "#fafafa",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>
          {post.deal} · {post.spend}
        </span>
        <Button variant="ghost" size="sm" rightIcon={<IconExternalLink size={12} />}>
          View on platform
        </Button>
      </div>
    </div>
  );
}

type SortKey = "er" | "views" | "deal";

function Demo() {
  const [sort, setSort] = useState<SortKey>("er");

  const sorted = [...POSTS].sort((a, b) => {
    if (sort === "er") return b.engagementRate - a.engagementRate;
    if (sort === "views")
      return b.metrics[0].raw - a.metrics[0].raw;
    return 0;
  });

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Post performance</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>
            {POSTS.length} posts · ↑ vs benchmark
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["er", "views"] as SortKey[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                padding: "4px 10px",
                borderRadius: 99,
                border: "1px solid",
                borderColor: sort === s ? "#333" : "var(--sd-border-default, #e5e7eb)",
                background: sort === s ? "#333" : "transparent",
                color: sort === s ? "#fff" : "var(--sd-font-secondary, #666)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {s === "er" ? "By ER" : "By views"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sorted.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "post-performance",
  title: "PostPerformance",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Per-post analytics card — metrics (views/likes/comments/saves), engagement rate vs benchmark, and platform deep-link.",
  description:
    "Mirrors the 'Post card' pattern from the Full Showcase. Each card shows a content thumbnail, creator chip with platform, caption preview, ER badge (color-coded vs benchmark), and 4 metric pills — each showing value + trend vs benchmark. Sort by ER or views. Uses only Avatar, Badge, Button, and PlatformIcon.",
  demos: [
    {
      title: "Atlas X campaign posts",
      description: "3 posts sorted by engagement rate — green/red arrows show vs benchmark.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
