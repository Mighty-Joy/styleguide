"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconUsers,
  IconHeart,
  IconEye,
  IconChartBar,
  IconMapPin,
  IconStar,
  IconDotsVertical,
  IconPlus,
  IconMessage2,
  IconExternalLink,
  IconPhoto,
  IconVideo,
  IconBookmark,
  IconChevronRight,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import AvatarGroup from "@/components/ui/AvatarGroup/AvatarGroup";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Platform chip (private — brand colors, not a generic badge)          */
/* ------------------------------------------------------------------ */

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};
const PLATFORM_COLOR: Record<string, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#ff0000",
};

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function PlatformPill({ platform, followers }: { platform: string; followers: number }) {
  const Icon = PLATFORM_ICON[platform];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 26, padding: "0 10px", borderRadius: "var(--sd-radius-pill)", border: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)", fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-secondary)" }}>
      {Icon && <Icon size={13} style={{ color: PLATFORM_COLOR[platform] }} />}
      {fmt(followers)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Content thumbnail card                                               */
/* ------------------------------------------------------------------ */

interface ContentThumb {
  id: string;
  type: "reel" | "post" | "story" | "video";
  views: number;
  likes: number;
  er: number;
  platform: string;
}

const CONTENT: ContentThumb[] = [
  { id: "t1", type: "reel",  views: 184000, likes: 12400, er: 6.7,  platform: "instagram" },
  { id: "t2", type: "post",  views:  52000, likes:  4800, er: 9.2,  platform: "instagram" },
  { id: "t3", type: "reel",  views: 240000, likes: 18000, er: 7.5,  platform: "tiktok"    },
  { id: "t4", type: "video", views: 320000, likes: 24000, er: 7.5,  platform: "youtube"   },
  { id: "t5", type: "reel",  views:  96000, likes:  7200, er: 7.5,  platform: "instagram" },
  { id: "t6", type: "post",  views:  38000, likes:  3600, er: 9.5,  platform: "instagram" },
];

function ContentGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const TONES_PLATFORM: Record<string, keyof typeof TONES> = { instagram: "pink", tiktok: "gray", youtube: "red" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {CONTENT.map(c => {
        const Icon = c.type === "video" || c.type === "reel" ? IconVideo : IconPhoto;
        const tone = TONES_PLATFORM[c.platform] ?? "gray";
        return (
          <div
            key={c.id}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:     "relative",
              aspectRatio:  "4/5",
              borderRadius: "var(--sd-radius-md)",
              background:   TONES[tone].tint,
              border:       "1px solid var(--sd-border-light)",
              overflow:     "hidden",
              cursor:       "pointer",
              transition:   "transform 0.1s",
              transform:    hovered === c.id ? "scale(1.01)" : "scale(1)",
            }}
          >
            {/* Placeholder art */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.35 }}>
              <Icon size={40} style={{ color: TONES[tone].text }} />
            </div>

            {/* Overlay stats on hover */}
            {hovered === c.id && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.72)", padding: "8px 10px", display: "flex", gap: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#fff", fontWeight: 600 }}>
                  <IconEye size={12} /> {fmt(c.views)}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#fff", fontWeight: 600 }}>
                  <IconHeart size={12} /> {fmt(c.likes)}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#fff", fontWeight: 600 }}>
                  <IconChartBar size={12} /> {c.er}%
                </span>
              </div>
            )}

            {/* Platform badge */}
            <div style={{ position: "absolute", top: 6, right: 6 }}>
              {(() => {
                const PIco = PLATFORM_ICON[c.platform];
                return PIco ? <PIco size={13} style={{ color: PLATFORM_COLOR[c.platform], filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} /> : null;
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Past campaigns list                                                  */
/* ------------------------------------------------------------------ */

interface PastCampaign {
  id:     string;
  name:   string;
  brand:  string;
  year:   string;
  tone:   keyof typeof TONES;
  reach:  string;
  er:     string;
  status: "completed" | "live";
}

const CAMPAIGNS: PastCampaign[] = [
  { id: "pc1", name: "Spring Drop",       brand: "Lumi Beauty",  year: "Jun 2026", tone: "pink",      reach: "480K",  er: "5.2%", status: "live"      },
  { id: "pc2", name: "Glow Up Challenge", brand: "Aura Skincare", year: "Mar 2026", tone: "orange",    reach: "1.2M",  er: "7.4%", status: "completed" },
  { id: "pc3", name: "Daily Ritual",      brand: "Ritual Co",    year: "Jan 2026", tone: "turquoise", reach: "720K",  er: "6.8%", status: "completed" },
  { id: "pc4", name: "Holiday Haul",      brand: "Nova Brand",   year: "Dec 2025", tone: "purple",    reach: "2.1M",  er: "8.1%", status: "completed" },
];

function CampaignRow({ c }: { c: PastCampaign }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
      <Avatar name={c.brand} tone={c.tone} shape="rounded" size="md" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>{c.name}</div>
        <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>{c.brand} · {c.year}</div>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-primary)" }}>{c.reach}</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Reach</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-primary)" }}>{c.er}</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>ER</div>
        </div>
        <Badge label={c.status === "live" ? "Live" : "Completed"} tone={c.status === "live" ? "sky" : "gray"} variant="status" dot={c.status === "live"} size="sm" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rate card tab                                                        */
/* ------------------------------------------------------------------ */

interface Rate {
  platform: string;
  type:     string;
  price:    string;
  note?:    string;
}

const RATES: Rate[] = [
  { platform: "instagram", type: "Reel (60s)",    price: "$4,200",  note: "Includes 3 revisions"  },
  { platform: "instagram", type: "Story (3-pack)", price: "$1,800"                                 },
  { platform: "instagram", type: "Static post",    price: "$1,200"                                 },
  { platform: "tiktok",    type: "TikTok video",   price: "$3,500",  note: "Includes music license" },
  { platform: "youtube",   type: "Integration",    price: "$6,000",  note: "60-90s mid-roll"        },
  { platform: "youtube",   type: "Dedicated video", price: "$12,000"                               },
];

function RateRow({ r }: { r: Rate }) {
  const Icon = PLATFORM_ICON[r.platform];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
      {Icon && <Icon size={16} style={{ color: PLATFORM_COLOR[r.platform], flexShrink: 0 }} />}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>{r.type}</div>
        {r.note && <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>{r.note}</div>}
      </div>
      <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 800, color: "var(--sd-font-primary)" }}>{r.price}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Audience bar chart                                                   */
/* ------------------------------------------------------------------ */

const AGE_DEMO = [
  { range: "13–17", pct: 8  },
  { range: "18–24", pct: 38 },
  { range: "25–34", pct: 31 },
  { range: "35–44", pct: 14 },
  { range: "45+",   pct: 9  },
];

const GEO_DEMO = [
  { country: "United States", pct: 62, flag: "🇺🇸" },
  { country: "United Kingdom", pct: 12, flag: "🇬🇧" },
  { country: "Canada",         pct: 9,  flag: "🇨🇦" },
  { country: "Australia",      pct: 7,  flag: "🇦🇺" },
  { country: "Other",          pct: 10, flag: "🌐"  },
];

function AudienceSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {/* Age */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Age split</span>
        {AGE_DEMO.map(a => (
          <div key={a.range} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", width: 40, flexShrink: 0 }}>{a.range}</span>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--sd-bg-tertiary)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${a.pct}%`, borderRadius: 3, background: TONES.purple.solid, transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", width: 30, textAlign: "right" }}>{a.pct}%</span>
          </div>
        ))}
      </div>

      {/* Geography */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Top locations</span>
        {GEO_DEMO.map(g => (
          <div key={g.country} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{g.flag}</span>
            <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.country}</span>
            <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-primary)", flexShrink: 0 }}>{g.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full Creator Profile                                                 */
/* ------------------------------------------------------------------ */

function CreatorProfile() {
  const [tab, setTab] = useState("overview");

  const TABS = [
    { value: "overview",   label: "Overview"   },
    { value: "content",    label: "Content"    },
    { value: "campaigns",  label: "Campaigns"  },
    { value: "rates",      label: "Rates"      },
  ];

  return (
    <div style={{ background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-lg)", border: "1px solid var(--sd-border-light)", overflow: "hidden", maxWidth: 860 }}>

      {/* ---- Hero header ---- */}
      <div style={{ background: "var(--sd-bg-primary)", padding: "24px 24px 0" }}>
        {/* Back + actions row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <Button variant="ghost" size="sm" iconOnly aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Button>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="secondary" size="sm" leftIcon={<IconBookmark size={13} />}>Save</Button>
            <Button variant="secondary" size="sm" leftIcon={<IconMessage2 size={13} />}>Message</Button>
            <Button variant="primary"   size="sm" leftIcon={<IconPlus size={13} />}>Add to campaign</Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="More"><IconDotsVertical size={14} /></Button>
          </div>
        </div>

        {/* Creator identity */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <Avatar name="Priya Nair" tone="purple" size="lg" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary)", letterSpacing: "-0.02em" }}>Priya Nair</span>
              <Badge label="Active" tone="green" variant="status" dot />
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <IconStar size={12} style={{ color: TONES.yellow.solid, fill: TONES.yellow.solid }} />
                <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-primary)" }}>4.9</span>
                <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>(12 campaigns)</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-creator-handle)", fontWeight: 600 }}>@priya.creates</span>
              <span style={{ color: "var(--sd-border-medium)" }}>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
                <IconMapPin size={11} /> Los Angeles, CA
              </span>
            </div>
            {/* Category tags */}
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              {["Beauty", "Lifestyle", "Wellness", "Fashion"].map(t => (
                <Badge key={t} label={t} tone="purple" variant="status" size="sm" />
              ))}
            </div>
          </div>

          {/* Team members managing this creator */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Managed by</span>
            <AvatarGroup
              avatars={[
                { label: "Eric Dahan",   initials: "ED", tone: "green"  },
                { label: "Sophia Kim",   initials: "SK", tone: "blue"   },
              ]}
              size="sm"
              max={3}
            />
          </div>
        </div>

        {/* Platform pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          <PlatformPill platform="instagram" followers={128000} />
          <PlatformPill platform="tiktok"    followers={96000}  />
          <PlatformPill platform="youtube"   followers={42000}  />
          <Button variant="ghost" size="sm" leftIcon={<IconExternalLink size={12} />} style={{ marginLeft: "auto" }}>
            View media kit
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={TABS}
          value={tab}
          onChange={setTab}
          variant="underline"
        />
      </div>

      {/* ---- Tab content ---- */}
      <div style={{ padding: 24 }}>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Key stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              <StatCard label="Total followers" value="266K" icon={IconUsers}    tone="purple" trend={3.2} trendLabel="MoM" />
              <StatCard label="Avg engagement"  value="6.1%" icon={IconHeart}    tone="pink"   trend={0.4} />
              <StatCard label="Avg views"       value="84K"  icon={IconEye}      tone="blue"   trend={12.8} trendLabel="30d" />
              <StatCard label="Campaigns done"  value="12"   icon={IconChartBar} tone="green"  />
            </div>

            {/* Bio */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Bio</span>
              <p style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.65, margin: 0 }}>
                Beauty and wellness creator based in LA. I make content about skincare routines, clean beauty finds, and slow living. Partnered with 12+ brands over 3 years. Audience is 68% female, 25–34, US-based.
              </p>
            </div>

            {/* Audience */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Audience</span>
              <AudienceSection />
            </div>

            {/* Recent content preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Recent content</span>
                <Button variant="ghost" size="sm" rightIcon={<IconChevronRight size={12} />} onClick={() => setTab("content")}>
                  See all
                </Button>
              </div>
              <ContentGrid />
            </div>
          </div>
        )}

        {/* CONTENT */}
        {tab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
              {["All", "Reels", "Posts", "Stories", "Videos"].map(f => (
                <Badge key={f} label={f} tone={f === "All" ? "gray" : "gray"} variant={f === "All" ? "solid" : "outline"} size="sm" />
              ))}
            </div>
            <ContentGrid />
          </div>
        )}

        {/* CAMPAIGNS */}
        {tab === "campaigns" && (
          <div>
            {CAMPAIGNS.map(c => <CampaignRow key={c.id} c={c} />)}
          </div>
        )}

        {/* RATES */}
        {tab === "rates" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
                Rate card as of Jun 2026 · subject to change
              </span>
              <Button variant="secondary" size="sm">Request rate sheet</Button>
            </div>
            {RATES.map(r => <RateRow key={`${r.platform}-${r.type}`} r={r} />)}
            <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-md)", fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", lineHeight: 1.55 }}>
              Rates are estimates. Final pricing may vary based on usage rights, exclusivity windows, and campaign duration. Contact Priya directly or use the rate negotiation flow in Deal Overview.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                  */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-profile",
  title: "Creator Profile",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Full-page creator profile with platform stats, content grid, campaign history, and rate card tabs.",
  description:
    "The Creator Profile is the destination after clicking a creator in discovery or a roster. It shows the complete picture: platform follower counts, audience demographics (age + geo), a media content grid with hover stats, a scrollable campaign history with performance metrics, and a rate card. Four tabs — Overview, Content, Campaigns, Rates — keep the surface scannable while housing deep detail. All person tokens (Avatar, Badge, AvatarGroup) and core KPI blocks (StatCard) compose from shared primitives.",
  demos: [
    {
      title: "Full profile view",
      description: "Priya Nair — beauty creator, LA-based, 3 platforms, 4 tabs.",
      render: () => <CreatorProfile />,
    },
  ],
};

export default doc;
