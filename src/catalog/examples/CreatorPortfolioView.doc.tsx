"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconHeart,
  IconEye,
  IconMessageCircle,
  IconBookmark,
  IconStar,
  IconExternalLink,
  IconUsers,
  IconTrendingUp,
  IconPlayerPlay,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PostPlatform = "instagram" | "tiktok" | "youtube";
type PostType = "reel" | "story" | "static" | "video" | "carousel";
type FilterTab = "all" | PostPlatform;

interface Post {
  id: string;
  platform: PostPlatform;
  type: PostType;
  caption: string;
  likes: number;
  comments: number;
  views: number;
  saves?: number;
  er: number;
  gradient: string;
  sponsored?: boolean;
  top?: boolean;
}

/* ---- data ---- */
const POSTS: Post[] = [
  { id: "p1",  platform: "instagram", type: "reel",     caption: "My 5-step morning skincare routine #skintok",        likes: 18_400, comments: 342, views: 280_000, saves: 4_200, er: 9.2, gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", sponsored: false, top: true },
  { id: "p2",  platform: "tiktok",    type: "video",    caption: "Testing viral SPF products so you don't have to",     likes: 31_000, comments: 891, views: 520_000,             er: 8.1, gradient: "linear-gradient(135deg,#a5f3fc,#0ea5e9)", sponsored: false },
  { id: "p3",  platform: "instagram", type: "carousel", caption: "Ingredient breakdown: niacinamide vs vitamin C",      likes: 9_800,  comments: 214, views: 94_000,  saves: 6_700, er: 11.4,gradient: "linear-gradient(135deg,#fda4af,#e11d48)", sponsored: false, top: true },
  { id: "p4",  platform: "instagram", type: "reel",     caption: "Summer Glow by @auralabs — honest review",            likes: 12_100, comments: 198, views: 162_000, saves: 2_100, er: 8.8, gradient: "linear-gradient(135deg,#bbf7d0,#22c55e)", sponsored: true },
  { id: "p5",  platform: "tiktok",    type: "video",    caption: "POV: you finally found a serum that works",           likes: 44_200, comments: 1_240, views: 810_000,            er: 7.4, gradient: "linear-gradient(135deg,#ddd6fe,#7c3aed)", sponsored: false },
  { id: "p6",  platform: "youtube",   type: "video",    caption: "Full skincare routine ft. affordable drugstore picks", likes: 6_800,  comments: 412, views: 98_000,              er: 8.2, gradient: "linear-gradient(135deg,#fed7aa,#ea580c)", sponsored: false },
  { id: "p7",  platform: "instagram", type: "static",   caption: "Minimalist shelfie — current lineup",                 likes: 7_200,  comments: 88,  views: 61_000,  saves: 1_400, er: 6.1, gradient: "linear-gradient(135deg,#e0e7ff,#6366f1)", sponsored: false },
  { id: "p8",  platform: "tiktok",    type: "video",    caption: "Dermatologist reacts to my skincare routine",          likes: 28_100, comments: 762, views: 440_000,             er: 7.9, gradient: "linear-gradient(135deg,#cffafe,#06b6d4)", sponsored: false },
  { id: "p9",  platform: "instagram", type: "reel",     caption: "Gua sha tutorial for beginners",                      likes: 15_600, comments: 276, views: 198_000, saves: 8_900, er: 10.2,gradient: "linear-gradient(135deg,#fce7f3,#ec4899)", sponsored: false },
];

const PLATFORM_ICON: Record<PostPlatform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

const TYPE_LABEL: Record<PostType, string> = {
  reel: "Reel", story: "Story", static: "Post", video: "Video", carousel: "Carousel",
};

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

/* ---- Post tile ---- */
function PostTile({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  const PIcon = PLATFORM_ICON[post.platform];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 10, overflow: "hidden", position: "relative", aspectRatio: "1", background: post.gradient, cursor: "pointer" }}
    >
      {/* Top badges */}
      <div style={{ position: "absolute", top: 7, left: 7, display: "flex", gap: 4, zIndex: 2 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PIcon size={12} color="#fff" />
        </div>
        {post.sponsored && <Badge label="Paid" tone="yellow" size="sm" />}
        {post.top && (
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconStar size={11} color="#fbbf24" fill="#fbbf24" />
          </div>
        )}
      </div>

      {/* Play icon for video types */}
      {(post.type === "reel" || post.type === "video") && !hovered && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconPlayerPlay size={14} color="#fff" fill="#fff" />
          </div>
        </div>
      )}

      {/* Hover overlay */}
      {hovered && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px 9px", zIndex: 3 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", lineHeight: 1.4, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.caption}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { icon: IconEye,          val: post.views   },
              { icon: IconHeart,        val: post.likes   },
              { icon: IconMessageCircle,val: post.comments },
              ...(post.saves ? [{ icon: IconBookmark, val: post.saves }] : []),
            ].map(({ icon: Icon, val }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 3, color: "#fff", fontSize: 10, fontWeight: 600 }}>
                <Icon size={10} />
                {fmt(val)}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 4, fontSize: 10, color: TONES.green.tint, fontWeight: 700 }}>ER {post.er.toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<"er" | "views" | "recent">("er");

  const igPosts  = POSTS.filter((p) => p.platform === "instagram");
  const ttPosts  = POSTS.filter((p) => p.platform === "tiktok");

  const avgER = (POSTS.reduce((s, p) => s + p.er, 0) / POSTS.length).toFixed(1);
  const totalViews = POSTS.reduce((s, p) => s + p.views, 0);

  let visible = filter === "all" ? POSTS : POSTS.filter((p) => p.platform === filter);
  if (sortBy === "er")    visible = [...visible].sort((a, b) => b.er - a.er);
  if (sortBy === "views") visible = [...visible].sort((a, b) => b.views - a.views);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Creator header */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        <Avatar initials="PN" tone="green" size="lg" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 16, fontWeight: 800 }}>Priya Nair</span>
            <Badge label="Verified" tone="blue" size="sm" />
          </div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginBottom: 8 }}>@priya.creates · Skincare & Wellness · Austin, TX</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { icon: IconBrandInstagram, val: "248K",        label: "IG followers" },
              { icon: IconBrandTiktok,    val: "184K",        label: "TT followers" },
              { icon: IconTrendingUp,     val: `${avgER}%`,   label: "Avg ER"       },
              { icon: IconEye,            val: fmt(totalViews),label: "Total views" },
              { icon: IconUsers,          val: "8",           label: "Collabs"      },
            ].map(({ icon: Icon, val, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Icon size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                <span style={{ fontSize: 12, fontWeight: 800 }}>{val}</span>
                <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconExternalLink size={12} />}>View profile</Button>
          <Button variant="primary" size="sm">Invite to campaign</Button>
        </div>
      </div>

      {/* Filter + sort bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 0, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
          {([
            { key: "all",       label: `All (${POSTS.length})` },
            { key: "instagram", label: `IG (${igPosts.length})` },
            { key: "tiktok",    label: `TikTok (${ttPosts.length})` },
            { key: "youtube",   label: `YT (1)` },
          ] as { key: FilterTab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{ padding: "6px 12px", background: filter === key ? "#111" : "transparent", border: "none", borderRight: "1px solid var(--sd-border-default, #e5e7eb)", cursor: "pointer", fontSize: 11, fontWeight: 600, color: filter === key ? "#fff" : "var(--sd-font-tertiary, #999)" }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {(["er", "views", "recent"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              style={{ padding: "5px 9px", borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: sortBy === s ? "#111" : "transparent", color: sortBy === s ? "#fff" : "var(--sd-font-tertiary, #999)", fontSize: 10, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}
            >
              {s === "er" ? "Top ER" : s === "views" ? "Most viewed" : "Recent"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {visible.map((post) => <PostTile key={post.id} post={post} />)}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-portfolio-view",
  title: "CreatorPortfolioView",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator content portfolio — header with platform stats, 3-column media grid with hover overlays showing ER and engagement, filter by platform and sort by ER / views.",
  description:
    "Content showcase used inside creator profiles and discovery reviews. Header: avatar, verified badge, handle + niche + location, inline stat strip (IG followers, TT followers, avg ER, total views, collab count), View profile + Invite to campaign CTAs. Filter bar: All / IG / TikTok / YouTube tab counts; sort pills: Top ER / Most viewed / Recent. 3-column aspect-ratio-1 grid: each tile has platform icon + star (top performer) + paid badge overlaid top-left, play button for reels/videos, and a hover overlay revealing caption snippet + likes/comments/views/saves + ER in green. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator portfolio view",
      description: "Filter by platform, sort by ER or views. Hover any tile to see the engagement breakdown.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
