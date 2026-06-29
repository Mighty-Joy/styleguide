"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconHash,
  IconBrandInstagram,
  IconBrandTiktok,
  IconEye,
  IconHeart,
  IconArrowUp,
  IconArrowDown,
  IconSearch,
  IconDownload,
  IconRefresh,
  IconExternalLink,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PlatformFilter = "all" | "instagram" | "tiktok";

interface HashtagPost {
  id: string;
  creator: string;
  initials: string;
  tone: "pink" | "blue" | "green" | "purple" | "orange";
  platform: "instagram" | "tiktok";
  postedAt: string;
  hashtags: string[];
  impressions: number;
  reach: number;
  er: number;
  likes: number;
  views?: number;
}

const POSTS: HashtagPost[] = [
  { id: "p1", creator: "Priya Nair",    initials: "PN", tone: "pink",   platform: "instagram", postedAt: "Jun 26", hashtags: ["#AuraLabs","#AuraGlow","#ad","#skincarecommunity"], impressions: 94200, reach: 72000, er: 9.1, likes: 8580, views: undefined },
  { id: "p2", creator: "Marcus Webb",   initials: "MW", tone: "orange", platform: "instagram", postedAt: "Jun 24", hashtags: ["#AuraLabs","#AuraGlow","#ad","#glowup"],           impressions: 67400, reach: 54000, er: 7.8, likes: 5260, views: undefined },
  { id: "p3", creator: "Ji-ho Kim",     initials: "JK", tone: "blue",   platform: "tiktok",    postedAt: "Jun 25", hashtags: ["#AuraLabs","#ad","#skincaretok"],                  impressions: 181000, reach: 141000, er: 6.4, likes: 11600, views: 181000 },
  { id: "p4", creator: "Priya Nair",    initials: "PN", tone: "pink",   platform: "tiktok",    postedAt: "Jun 28", hashtags: ["#AuraLabs","#AuraGlow","#ad"],                     impressions: 44000, reach: 38000, er: 5.9, likes: 2600, views: 44000 },
  { id: "p5", creator: "Amara Diallo",  initials: "AD", tone: "green",  platform: "instagram", postedAt: "Jun 22", hashtags: ["#AuraLabs","#ad","#cleanbeauty"],                  impressions: 31200, reach: 26000, er: 8.3, likes: 2590, views: undefined },
  { id: "p6", creator: "Marcus Webb",   initials: "MW", tone: "orange", platform: "tiktok",    postedAt: "Jun 27", hashtags: ["#AuraLabs","#AuraGlow","#ad","#skintok"],           impressions: 52000, reach: 44000, er: 7.1, likes: 3690, views: 52000 },
];

type SortKey = "impressions" | "er" | "postedAt";

/* ---- Demo ---- */
function Demo() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [sortKey,  setSortKey]  = useState<SortKey>("impressions");
  const [query,    setQuery]    = useState("");
  const [refreshing, setRefreshing] = useState(false);

  function refresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }

  const visible = POSTS
    .filter((p) => {
      if (platform !== "all" && p.platform !== platform) return false;
      if (query && !p.creator.toLowerCase().includes(query.toLowerCase()) && !p.hashtags.some((h) => h.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortKey === "impressions") return b.impressions - a.impressions;
      if (sortKey === "er") return b.er - a.er;
      return 0;
    });

  const totalImpressions = POSTS.reduce((s, p) => s + p.impressions, 0);
  const totalReach       = POSTS.reduce((s, p) => s + p.reach, 0);
  const avgER            = (POSTS.reduce((s, p) => s + p.er, 0) / POSTS.length).toFixed(1);
  const totalPosts       = POSTS.length;

  function fmt(n: number) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000)    return (n / 1000).toFixed(1) + "K";
    return String(n);
  }

  const HASHTAGS = ["#AuraLabs", "#AuraGlow", "#ad", "#skincarecommunity", "#glowup"];
  const HASHTAG_COUNTS: Record<string, number> = {};
  POSTS.forEach((p) => p.hashtags.forEach((h) => { HASHTAG_COUNTS[h] = (HASHTAG_COUNTS[h] || 0) + 1; }));

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Hashtag tracker</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Jun 20–Jul 14</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={11} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} />} onClick={refresh}>
            {refreshing ? "Updating…" : "Refresh"}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Export</Button>
        </div>
      </div>

      {/* KPI tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7, marginBottom: 14 }}>
        {[
          { label: "Total posts",   value: totalPosts,             tone: "gray"   as const, sub: "across all creators" },
          { label: "Impressions",   value: fmt(totalImpressions),  tone: "blue"   as const, sub: "+12% vs target"       },
          { label: "Unique reach",  value: fmt(totalReach),        tone: "purple" as const, sub: "estimated"            },
          { label: "Avg ER",        value: avgER + "%",            tone: "green"  as const, sub: "target: 6%"           },
        ].map(({ label, value, tone, sub }) => (
          <div key={label} style={{ padding: "9px 10px", background: TONES[tone].tint, borderRadius: 9 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.75 }}>{label}</div>
            <div style={{ fontSize: 8, color: TONES[tone].text, opacity: 0.55, marginTop: 1 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Hashtag usage chips */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Tracked hashtags</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {HASHTAGS.map((tag) => {
            const count = HASHTAG_COUNTS[tag] || 0;
            const required = tag === "#AuraLabs" || tag === "#ad";
            return (
              <div key={tag} style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 10px", borderRadius: 99, background: required ? TONES.blue.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${required ? TONES.blue.text + "40" : "var(--sd-border-default,#e5e7eb)"}` }}>
                <IconHash size={10} style={{ color: required ? TONES.blue.text : "var(--sd-font-tertiary,#999)" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: required ? TONES.blue.text : "var(--sd-font-secondary,#555)" }}>{tag.replace("#","")}</span>
                <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", fontWeight: 400 }}>{count} posts</span>
                {required && <Badge label="Required" tone="blue" size="sm" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "6px 10px" }}>
          <IconSearch size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by creator or hashtag…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }} />
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {(["all","instagram","tiktok"] as PlatformFilter[]).map((p) => {
            const Icon = p === "instagram" ? IconBrandInstagram : p === "tiktok" ? IconBrandTiktok : null;
            return (
              <button key={p} onClick={() => setPlatform(p)}
                style={{ padding: "5px 9px", borderRadius: 8, background: platform === p ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", display: "flex", gap: 4, alignItems: "center", fontSize: 11, fontWeight: 700, color: platform === p ? "#fff" : "var(--sd-font-secondary,#555)" }}>
                {Icon && <Icon size={11} />}
                {p === "all" ? "All" : ""}
              </button>
            );
          })}
        </div>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
          style={{ padding: "5px 8px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit", background: "transparent" }}>
          <option value="impressions">Sort: impressions</option>
          <option value="er">Sort: ER</option>
        </select>
      </div>

      {/* Post table */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {visible.map((post, i) => {
          const PIcon = post.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const ptone = post.platform === "instagram" ? "pink" as const : "blue" as const;
          return (
            <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flex: "0 0 130px" }}>
                <Avatar initials={post.initials} tone={post.tone} size="sm" />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{post.creator}</div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <PIcon size={10} style={{ color: TONES[ptone].text }} />
                    <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{post.postedAt}</span>
                  </div>
                </div>
              </div>

              {/* Hashtag chips */}
              <div style={{ flex: 1, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {post.hashtags.slice(0, 3).map((h) => (
                  <span key={h} style={{ padding: "2px 6px", borderRadius: 4, background: "var(--sd-bg-secondary,#f4f4f5)", fontSize: 9, color: "var(--sd-font-tertiary,#999)", fontFamily: "monospace" }}>{h}</span>
                ))}
                {post.hashtags.length > 3 && <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>+{post.hashtags.length - 3}</span>}
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", gap: 14, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{fmt(post.impressions)}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>impressions</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: post.er >= 8 ? TONES.green.text : post.er >= 6 ? "#111" : TONES.yellow.text }}>{post.er}%</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>ER</div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <IconExternalLink size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-hashtag-tracker",
  title: "CampaignHashtagTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand's campaign hashtag monitoring panel — 4 KPI tiles, tracked hashtag chips with required badge, post list with per-creator impressions + ER, platform filter, sort, and search.",
  description:
    "Brand monitors all posts using campaign hashtags. Header: campaign name + date range, Refresh (spin animation) + Export CTAs. 4 KPI tiles: 6 posts / 469K impressions +12% vs target (blue) / 375K unique reach (purple) / 7.4% avg ER vs 6% target (green). Tracked hashtag chips: #AuraLabs (blue required badge, 6 posts), #AuraGlow (5 posts), #ad (blue required, 6 posts), #skincarecommunity (2 posts), #glowup (1 post). Search bar + platform filter (All/IG icon/TikTok icon) + sort dropdown (impressions/ER). 6 post rows: avatar, creator name + platform icon + date, up to 3 hashtag monospace pills (+N overflow), impressions large font, ER colored green ≥8%/gray ≥6%/yellow <6%, external link icon. Ji-ho Kim TikTok leads (181K impressions). Priya Nair IG second (94K, 9.1% ER green). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign hashtag tracker",
      description: "Filter by Instagram or TikTok platform buttons. Search by creator name or hashtag. Change sort to ER to see Priya Nair's 9.1% rise to the top.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
