"use client";

import React, { useState, useMemo } from "react";
import {
  IconSearch,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconFilter,
  IconX,
  IconStar,
  IconUsers,
  IconTrendingUp,
  IconPlus,
  IconCheck,
  IconChevronDown,
  IconAdjustments,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";

interface DiscoveryCreator {
  id: string;
  name: string;
  handle: string;
  initials: string;
  tone: keyof typeof TONES;
  platforms: Platform[];
  category: string;
  followers: number;
  engagement: number;
  avgViews: number;
  added: boolean;
}

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const CREATORS: DiscoveryCreator[] = [
  { id: "c1",  name: "Priya Nair",      handle: "@priya_creates",   initials: "PN", tone: "sky",       platforms: ["instagram"],                 category: "Beauty",   followers: 184000, engagement: 4.8, avgViews: 22000, added: false },
  { id: "c2",  name: "Sam Kim",         handle: "@sam.life",        initials: "SK", tone: "orange",    platforms: ["tiktok"],                    category: "Lifestyle",followers: 420000, engagement: 3.9, avgViews: 58000, added: false },
  { id: "c3",  name: "Tomohiro V",      handle: "@tomohiro_v",      initials: "TV", tone: "turquoise", platforms: ["youtube"],                   category: "Fitness",  followers: 98000,  engagement: 6.2, avgViews: 14000, added: true  },
  { id: "c4",  name: "Mara Voss",       handle: "@mara.aesthetic",  initials: "MV", tone: "purple",    platforms: ["instagram", "tiktok"],      category: "Fashion",  followers: 61000,  engagement: 5.1, avgViews: 8000,  added: false },
  { id: "c5",  name: "Lena Fischer",    handle: "@lena.vis",        initials: "LF", tone: "pink",      platforms: ["instagram"],                 category: "Travel",   followers: 210000, engagement: 4.4, avgViews: 31000, added: true  },
  { id: "c6",  name: "Jordan Ellis",    handle: "@jordanellis",     initials: "JE", tone: "green",     platforms: ["youtube", "instagram"],     category: "Tech",     followers: 312000, engagement: 2.8, avgViews: 48000, added: false },
  { id: "c7",  name: "Chloe Park",      handle: "@chloe.daily",     initials: "CP", tone: "yellow",    platforms: ["tiktok"],                   category: "Food",     followers: 780000, engagement: 5.8, avgViews: 112000,added: false },
  { id: "c8",  name: "Ravi Mehta",      handle: "@ravimehta_fit",   initials: "RM", tone: "blue",      platforms: ["instagram", "youtube"],     category: "Fitness",  followers: 145000, engagement: 7.1, avgViews: 19000, added: false },
  { id: "c9",  name: "Sofia Alves",     handle: "@sofia.creates",   initials: "SA", tone: "red",       platforms: ["instagram"],                 category: "Beauty",   followers: 93000,  engagement: 6.4, avgViews: 12000, added: false },
  { id: "c10", name: "Marcus Webb",     handle: "@marcus_w",        initials: "MW", tone: "gray",      platforms: ["tiktok", "youtube"],        category: "Gaming",   followers: 1200000,engagement: 3.2, avgViews: 240000,added: false },
  { id: "c11", name: "Aiko Tanaka",     handle: "@aikot",           initials: "AT", tone: "pink",      platforms: ["instagram", "tiktok"],      category: "Fashion",  followers: 540000, engagement: 4.6, avgViews: 72000, added: false },
  { id: "c12", name: "Dev Patel",       handle: "@devpatellife",    initials: "DP", tone: "blue",      platforms: ["youtube"],                   category: "Tech",     followers: 220000, engagement: 5.0, avgViews: 35000, added: false },
];

const CATEGORIES = ["All", "Beauty", "Fashion", "Fitness", "Food", "Lifestyle", "Tech", "Travel", "Gaming"];

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/* ------------------------------------------------------------------ */
/* Creator card                                                          */
/* ------------------------------------------------------------------ */

function CreatorDiscoveryCard({ creator, onToggle }: { creator: DiscoveryCreator; onToggle: () => void }) {
  const t = TONES[creator.tone];
  return (
    <div style={{
      border: `1px solid ${creator.added ? TONES.green.solid + "40" : "var(--sd-border-light)"}`,
      borderRadius: "var(--sd-radius-md)",
      background: creator.added ? TONES.green.tint + "30" : "var(--sd-bg-primary)",
      overflow: "hidden",
      transition: "border-color 0.15s, background 0.15s",
    }}>
      {/* Cover area */}
      <div style={{
        height: 64, background: t.tint,
        position: "relative",
      }}>
        {creator.added && (
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <Badge label="Added" tone="green" variant="solid" size="sm" icon={IconCheck} />
          </div>
        )}
      </div>

      {/* Avatar */}
      <div style={{ padding: "0 12px", marginTop: -20 }}>
        <Avatar initials={creator.initials} tone={creator.tone} size="lg" bordered />
      </div>

      {/* Info */}
      <div style={{ padding: "6px 12px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)", marginBottom: 1 }}>{creator.name}</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginBottom: 8 }}>{creator.handle}</div>

        {/* Platforms */}
        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
          {creator.platforms.map(p => {
            const Icon = PLATFORM_ICONS[p];
            return (
              <div key={p} style={{ width: 20, height: 20, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={11} style={{ color: "var(--sd-font-tertiary)" }} />
              </div>
            );
          })}
          <Badge label={creator.category} tone={creator.tone} variant="status" size="sm" />
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
          {[
            { icon: IconUsers,      label: "Followers",  value: formatFollowers(creator.followers) },
            { icon: IconTrendingUp, label: "Engagement", value: `${creator.engagement}%` },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", padding: "5px 7px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
                <s.icon size={10} style={{ color: "var(--sd-font-tertiary)" }} />
                <span style={{ fontSize: 9, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sd-font-primary)" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          variant={creator.added ? "secondary" : "primary"}
          size="sm"
          leftIcon={creator.added ? <IconCheck size={12} /> : <IconPlus size={12} />}
          onClick={onToggle}
          style={{ width: "100%" }}
        >
          {creator.added ? "Added to roster" : "Add to campaign"}
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main view                                                             */
/* ------------------------------------------------------------------ */

function CreatorDiscoveryView() {
  const [query, setQuery]           = useState("");
  const [category, setCategory]     = useState("All");
  const [platform, setPlatform]     = useState<Platform | "all">("all");
  const [minEng, setMinEng]         = useState<number | null>(null);
  const [followerTier, setFollowerTier] = useState<string>("all");
  const [showFilters, setShowFilters]   = useState(false);
  const [creators, setCreators]         = useState(CREATORS);

  const toggle = (id: string) =>
    setCreators(prev => prev.map(c => c.id === id ? { ...c, added: !c.added } : c));

  const filtered = useMemo(() => creators.filter(c => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.handle.toLowerCase().includes(query.toLowerCase())) return false;
    if (category !== "All" && c.category !== category) return false;
    if (platform !== "all" && !c.platforms.includes(platform)) return false;
    if (minEng !== null && c.engagement < minEng) return false;
    if (followerTier === "nano"   && c.followers >= 100_000) return false;
    if (followerTier === "micro"  && (c.followers < 10_000 || c.followers >= 100_000)) return false;
    if (followerTier === "macro"  && c.followers < 100_000) return false;
    return true;
  }), [creators, query, category, platform, minEng, followerTier]);

  const addedCount = creators.filter(c => c.added).length;

  const activeFilters = [
    platform !== "all"   && `Platform: ${platform}`,
    category !== "All"   && `Category: ${category}`,
    minEng !== null      && `Eng ≥ ${minEng}%`,
    followerTier !== "all" && `Tier: ${followerTier}`,
  ].filter(Boolean) as string[];

  return (
    <div style={{ background: "var(--sd-bg-primary)" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search creators…" leftIcon={<IconSearch size={13} />} />
        </div>

        {/* Platform filter */}
        {(["all", "instagram", "tiktok", "youtube"] as const).map(p => {
          const Icon = p === "all" ? null : PLATFORM_ICONS[p];
          return (
            <Button key={p} variant={platform === p ? "primary" : "secondary"} size="sm"
              leftIcon={Icon ? <Icon size={13} /> : undefined}
              onClick={() => setPlatform(p)}>
              {p === "all" ? "All platforms" : p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          );
        })}

        {/* Filters toggle */}
        <Button variant={showFilters ? "primary" : "secondary"} size="sm"
          leftIcon={<IconAdjustments size={13} />}
          onClick={() => setShowFilters(v => !v)}>
          Filters
          {activeFilters.length > 0 && (
            <span style={{ minWidth: 16, height: 16, borderRadius: "var(--sd-radius-pill)", background: "rgba(255,255,255,0.25)", fontSize: 9, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 4px", marginLeft: 2 }}>
              {activeFilters.length}
            </span>
          )}
        </Button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div style={{ display: "flex", gap: 16, padding: "12px 14px", marginBottom: 12, background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-md)", flexWrap: "wrap" }}>
          {/* Follower tier */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Follower tier</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[["all","Any"], ["nano","Nano (<10K)"], ["micro","Micro (10K-100K)"], ["macro","Macro (100K+)"]].map(([v, l]) => (
                <Button key={v} variant={followerTier === v ? "primary" : "secondary"} size="sm" onClick={() => setFollowerTier(v)}>{l}</Button>
              ))}
            </div>
          </div>

          {/* Min engagement */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Min engagement</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[[null,"Any"],[2,"2%+"],[4,"4%+"],[6,"6%+"]].map(([v, l]) => (
                <Button key={String(v)} variant={minEng === v ? "primary" : "secondary"} size="sm" onClick={() => setMinEng(v as number | null)}>{l as string}</Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {CATEGORIES.map(cat => (
          <Button key={cat} variant={category === cat ? "primary" : "secondary"} size="sm" onClick={() => setCategory(cat)}>{cat}</Button>
        ))}
      </div>

      {/* Result count + roster status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
          {filtered.length} creator{filtered.length !== 1 ? "s" : ""} found
        </span>
        {addedCount > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: TONES.green.text, fontWeight: 600 }}>
            <IconCheck size={13} />
            {addedCount} added to campaign
          </div>
        )}
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          {activeFilters.map(f => (
            <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 22, padding: "0 8px", borderRadius: "var(--sd-radius-pill)", background: TONES.blue.tint, color: TONES.blue.text, fontSize: 11, fontWeight: 600 }}>
              {f}
            </span>
          ))}
          <Button variant="tertiary" size="sm" onClick={() => { setCategory("All"); setPlatform("all"); setMinEng(null); setFollowerTier("all"); }}>
            Clear all
          </Button>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--sd-font-tertiary)", fontSize: 13 }}>
          No creators match your filters. Try adjusting your search.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {filtered.map(c => <CreatorDiscoveryCard key={c.id} creator={c} onToggle={() => toggle(c.id)} />)}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-discovery",
  title: "CreatorDiscovery",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Marketplace grid for finding and adding creators to a campaign — search, platform filter, category pills, follower tier, engagement filter.",
  description:
    "CreatorDiscovery is the creator marketplace browse view — the surface brands use to find new creators and add them to a campaign. Top bar: a search input + platform toggle buttons (All / Instagram / TikTok / YouTube) + a Filters expander with badge count. Expanded filters: follower tier (Nano <10K / Micro 10K–100K / Macro 100K+) and min engagement rate (2% / 4% / 6%+). Category pills below (Beauty, Fashion, Fitness, Food, etc.) filter the grid horizontally. Result count and 'N added to campaign' counter update live. Each creator card shows: gradient cover using the creator's tone, avatar with initials, name, handle, platform icons, category pill, follower count and engagement rate in a 2-col stat grid, and an 'Add to campaign' / 'Added' toggle CTA. The card border and background shift green when added. Zero external deps.",
  demos: [
    {
      title: "Full discovery view",
      description: "Search, filter by platform and category, expand Filters for tier and engagement controls. Click 'Add to campaign' cards to toggle roster membership.",
      block: true,
      render: () => <CreatorDiscoveryView />,
    },
  ],
  props: [],
};

export default doc;
