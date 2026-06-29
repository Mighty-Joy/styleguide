"use client";

import React from "react";
import {
  IconUsers,
  IconEye,
  IconHeart,
  IconMessageCircle,
  IconTrendingUp,
  IconCurrencyDollar,
  IconPhoto,
  IconDownload,
  IconShare,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCircleCheck,
  IconStar,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";

interface CreatorResult {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  platform: Platform;
  followers: string;
  posts: number;
  totalReach: string;
  totalLikes: string;
  avgER: string;
  erDelta: number;
  paidOut: string;
  rating: number;
}

interface TopPost {
  id: string;
  creator: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  platform: Platform;
  title: string;
  views: string;
  likes: string;
  er: string;
  tone: keyof typeof TONES;
}

interface TimelinePoint {
  label: string;
  reach: number;
}

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};
const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#ff0000",
};

const CREATORS: CreatorResult[] = [
  { id: "1", name: "Priya Nair",  initials: "P", tone: "purple", platform: "tiktok",    followers: "820K", posts: 3, totalReach: "2.1M",  totalLikes: "180K",  avgER: "9.7%", erDelta: +1.2, paidOut: "$4,500", rating: 5 },
  { id: "2", name: "Maya Rivers", initials: "M", tone: "pink",   platform: "tiktok",    followers: "2.3M", posts: 2, totalReach: "1.8M",  totalLikes: "148K",  avgER: "8.6%", erDelta: +0.4, paidOut: "$4,200", rating: 5 },
  { id: "3", name: "Nina Cole",   initials: "N", tone: "green",  platform: "instagram", followers: "86K",  posts: 2, totalReach: "128K",  totalLikes: "15.8K", avgER: "12.4%", erDelta: +3.1, paidOut: "$2,800", rating: 4 },
  { id: "4", name: "Leo Park",    initials: "L", tone: "blue",   platform: "youtube",   followers: "540K", posts: 1, totalReach: "56K",   totalLikes: "3.4K",  avgER: "6.8%",  erDelta: -0.2, paidOut: "$2,400", rating: 4 },
];

const TOP_POSTS: TopPost[] = [
  { id: "p1", creator: "Priya Nair",  creatorInitials: "P", creatorTone: "purple", platform: "tiktok",    title: "Morning GRWM ft. Atlas X",      views: "892K", likes: "72.1K", er: "9.7%", tone: "purple" },
  { id: "p2", creator: "Maya Rivers", creatorInitials: "M", creatorTone: "pink",   platform: "tiktok",    title: "Summer Glow Haul",               views: "1.2M", likes: "94.2K", er: "8.6%", tone: "pink"   },
  { id: "p3", creator: "Nina Cole",   creatorInitials: "N", creatorTone: "green",  platform: "instagram", title: "Glow-Up Routine — Summer Edit",  views: "44K",  likes: "5.2K",  er: "12.4%", tone: "green" },
];

const TIMELINE: TimelinePoint[] = [
  { label: "Jun 1",  reach: 12  },
  { label: "Jun 8",  reach: 28  },
  { label: "Jun 15", reach: 76  },
  { label: "Jun 22", reach: 100 },
  { label: "Jun 29", reach: 88  },
  { label: "Jul 6",  reach: 60  },
  { label: "Jul 13", reach: 40  },
];

/* ------------------------------------------------------------------ */
/* Reach bar chart (mini inline)                                         */
/* ------------------------------------------------------------------ */

function ReachTimeline() {
  const max = Math.max(...TIMELINE.map((t) => t.reach));
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60, paddingBottom: 4 }}>
        {TIMELINE.map((pt) => (
          <div key={pt.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", height: `${(pt.reach / max) * 56}px`, background: pt.reach === max ? TONES.purple.solid : TONES.purple.tint, borderRadius: "4px 4px 0 0", minHeight: 4 }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {TIMELINE.map((pt) => (
          <div key={pt.label} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "var(--sd-font-tertiary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {pt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Creator results table row                                             */
/* ------------------------------------------------------------------ */

function CreatorRow({ c }: { c: CreatorResult }) {
  const PIcon = PLATFORM_ICONS[c.platform];
  const erUp = c.erDelta > 0;
  const TrendIcon = erUp ? IconArrowUpRight : IconArrowDownRight;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 80px 60px 90px 90px 90px 80px 80px", gap: 0, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
      {/* Creator */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar initials={c.initials} tone={c.tone} size="sm" />
        <div>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)" }}>{c.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
            <PIcon size={10} style={{ color: PLATFORM_COLORS[c.platform] }} />
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>{c.followers}</span>
          </div>
        </div>
      </div>
      {/* Posts */}
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-primary)" }}>{c.posts}</span>
      {/* Stars */}
      <div style={{ display: "flex", gap: 1 }}>
        {[1,2,3,4,5].map((n) => (
          <IconStar key={n} size={9} style={{ color: n <= c.rating ? TONES.yellow.solid : "var(--sd-border-strong)", fill: n <= c.rating ? TONES.yellow.solid : "none" }} />
        ))}
      </div>
      {/* Total reach */}
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-primary)" }}>{c.totalReach}</span>
      {/* Total likes */}
      <span style={{ fontSize: 11, color: "var(--sd-font-secondary)" }}>{c.totalLikes}</span>
      {/* Avg ER */}
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-primary)" }}>{c.avgER}</span>
        <TrendIcon size={10} style={{ color: erUp ? TONES.green.text : TONES.red.text }} />
      </div>
      {/* Paid out */}
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{c.paidOut}</span>
      {/* Badge */}
      <Badge label="Done" tone="green" size="sm" icon={IconCircleCheck} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Top post card                                                         */
/* ------------------------------------------------------------------ */

function TopPostCard({ post }: { post: TopPost }) {
  const PIcon = PLATFORM_ICONS[post.platform];
  const erVal = parseFloat(post.er);
  const erTone = erVal >= 10 ? "green" : erVal >= 7 ? "blue" : "yellow";
  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      <div style={{ height: 80, background: TONES[post.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <IconPhoto size={24} style={{ color: TONES[post.tone].solid, opacity: 0.4 }} />
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <PIcon size={14} style={{ color: PLATFORM_COLORS[post.platform] }} />
        </div>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "var(--sd-font-primary)", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--sd-font-tertiary)" }}>
            <IconEye size={10} />{post.views}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--sd-font-tertiary)" }}>
            <IconHeart size={10} />{post.likes}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 20, padding: "0 5px 0 3px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 10, fontWeight: 500, color: "var(--sd-font-secondary)" }}>
            <Avatar initials={post.creatorInitials} tone={post.creatorTone} size="sm" />
            {post.creator.split(" ")[0]}
          </span>
          <Badge label={`ER ${post.er}`} tone={erTone} size="sm" icon={IconTrendingUp} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                        */
/* ------------------------------------------------------------------ */

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: "var(--sd-text-md)", fontWeight: 700, color: "var(--sd-font-primary)" }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Table header                                                           */
/* ------------------------------------------------------------------ */

function TableHeader() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 80px 60px 90px 90px 90px 80px 80px", gap: 0, padding: "6px 0", borderBottom: "2px solid var(--sd-border-light)" }}>
      {["Creator", "Posts", "Rating", "Reach", "Likes", "Avg ER", "Paid", "Status"].map((h) => (
        <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                   */
/* ------------------------------------------------------------------ */

function CampaignReportDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 920, margin: "0 auto" }}>
      {/* Report header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 20px 16px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-lg)", background: "var(--sd-bg-primary)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--sd-font-primary)", letterSpacing: "-0.02em" }}>Atlas X — Summer Campaign</span>
            <Badge label="Completed" tone="gray" icon={IconCircleCheck} />
          </div>
          <div style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-tertiary)" }}>Jun 1 – Jul 15, 2026 · 4 creators · 8 posts</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconShare size={13} />}>Share</Button>
          <Button variant="primary"   size="sm" leftIcon={<IconDownload size={13} />}>Export PDF</Button>
        </div>
      </div>

      {/* KPI summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        <StatCard label="Total reach"      value="4.1M"  icon={IconUsers}          tone="purple"  trend={34.2}  trendLabel="vs goal"   />
        <StatCard label="Total likes"      value="347K"  icon={IconHeart}          tone="pink"    trend={12.8}  trendLabel="vs prev"   />
        <StatCard label="Avg engagement"   value="9.4%"  icon={IconTrendingUp}     tone="green"   trend={1.6}   trendLabel="benchmark" />
        <StatCard label="Content pieces"   value="8"     icon={IconPhoto}          tone="blue"    secondary="of 8 target"               />
        <StatCard label="Total spend"      value="$13.9K" icon={IconCurrencyDollar} tone="orange"  secondary="of $15,000 budget"         />
      </div>

      {/* Two-col: reach chart + platform split */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 16 }}>
        <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 16, background: "var(--sd-bg-primary)" }}>
          <SectionHead title="Reach over time" sub="Total unique impressions by week" />
          <ReachTimeline />
        </div>
        <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 16, background: "var(--sd-bg-primary)" }}>
          <SectionHead title="By platform" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {([
              { label: "TikTok",    icon: IconBrandTiktok,    pct: 72, value: "3.0M", tone: "purple" as const, color: "#010101" },
              { label: "Instagram", icon: IconBrandInstagram, pct: 22, value: "920K", tone: "pink"   as const, color: "#e1306c" },
              { label: "YouTube",   icon: IconBrandYoutube,   pct: 6,  value: "56K",  tone: "blue"   as const, color: "#ff0000" },
            ] as const).map((p) => {
              const PIcon = p.icon;
              return (
                <div key={p.label}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)" }}>
                      <PIcon size={12} style={{ color: p.color }} />{p.label}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-primary)" }}>{p.value}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: "var(--sd-bg-tertiary)" }}>
                    <div style={{ width: `${p.pct}%`, height: "100%", borderRadius: 3, background: TONES[p.tone].solid }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Creator results */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 16, background: "var(--sd-bg-primary)" }}>
        <SectionHead title="Creator results" sub="Performance breakdown per creator" />
        <TableHeader />
        {CREATORS.map((c) => <CreatorRow key={c.id} c={c} />)}
      </div>

      {/* Top posts */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 16, background: "var(--sd-bg-primary)" }}>
        <SectionHead title="Top posts" sub="Highest-performing content this campaign" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {TOP_POSTS.map((p) => <TopPostCard key={p.id} post={p} />)}
        </div>
      </div>

      {/* Key takeaways */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 16, background: "var(--sd-bg-primary)" }}>
        <SectionHead title="Key takeaways" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { tone: "green"  as const, text: "Campaign exceeded reach target by 37% — TikTok Reels drove 72% of total impressions." },
            { tone: "green"  as const, text: "Nina Cole achieved the highest ER at 12.4%, 2× the category benchmark. Recommend renewal." },
            { tone: "yellow" as const, text: "Leo Park delivered quality content but YouTube reach was lower than projected (56K vs 90K target)." },
            { tone: "blue"   as const, text: "$1,100 budget remaining — suggest reallocating to TikTok for Q3 carry-forward." },
          ].map(({ tone, text }, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: "var(--sd-radius-sm)", background: TONES[tone].tint }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: TONES[tone].solid, flexShrink: 0, marginTop: 5 }} />
              <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-report",
  title: "Campaign Report",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Post-campaign wrap-up — KPI summary, reach timeline, platform split, per-creator results table, top posts, and key takeaways.",
  description:
    "The final deliverable at the end of a campaign. Combines five sections: a 5-stat KPI bar (reach, likes, ER, content count, spend), a weekly reach trend chart with platform breakdown, a creator results table (posts, star rating, reach, engagement, paid out), top content cards ranked by ER, and a color-coded takeaways list. Export PDF and Share buttons live in the header. All cells use Avatar, Badge, StatCard, and Button primitives.",
  demos: [
    {
      title: "Campaign report",
      description: "Full campaign wrap-up for the Atlas X Summer Campaign: 4 creators, 8 posts, 4.1M total reach, 9.4% avg ER. Includes reach chart, platform split, creator table, and top posts.",
      block: true,
      render: () => <CampaignReportDemo />,
    },
  ],
  props: [],
};

export default doc;
