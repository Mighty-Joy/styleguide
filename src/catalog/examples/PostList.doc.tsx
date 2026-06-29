"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconHeart,
  IconMessageCircle,
  IconEye,
  IconShare3,
  IconDotsVertical,
  IconTrendingUp,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";
import RecordList from "@/components/ui/RecordList/RecordList";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";
type PostType = "Reel" | "Story" | "Post" | "Video";

interface PostItem {
  id: string;
  title: string;
  platform: Platform;
  type: PostType;
  creator: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  campaign: string;
  postedDate: string;
  views: string;
  likes: string;
  comments: string;
  shares?: string;
  engagementRate: string;
}

const POSTS: PostItem[] = [
  { id: "1", title: "Atlas X — Morning Routine",      platform: "instagram", type: "Reel",  creator: "Priya Nair",  creatorInitials: "P", creatorTone: "purple", campaign: "Atlas X",    postedDate: "Jun 28", views: "284K", likes: "18.4K", comments: "412",   shares: "2.1K", engagementRate: "7.2%"  },
  { id: "2", title: "Summer Glow Haul",               platform: "tiktok",    type: "Video", creator: "Nina Cole",   creatorInitials: "N", creatorTone: "green",  campaign: "Summer Glow",postedDate: "Jun 25", views: "1.2M", likes: "94.2K", comments: "3.1K", shares: "8.4K", engagementRate: "8.6%"  },
  { id: "3", title: "Spring Drop Unboxing",           platform: "youtube",   type: "Video", creator: "Leo Park",    creatorInitials: "L", creatorTone: "blue",   campaign: "Spring Drop",postedDate: "Jun 24", views: "56K",  likes: "3.4K",  comments: "289",   shares: "520",  engagementRate: "6.8%"  },
  { id: "4", title: "Atlas X Skincare Honest Review", platform: "instagram", type: "Reel",  creator: "Maya Rivers", creatorInitials: "M", creatorTone: "pink",   campaign: "Atlas X",    postedDate: "Jun 22", views: "128K", likes: "9.8K",  comments: "634",   shares: "1.3K", engagementRate: "9.1%"  },
  { id: "5", title: "Morning GRWM ft. Atlas X",       platform: "tiktok",    type: "Video", creator: "Priya Nair",  creatorInitials: "P", creatorTone: "purple", campaign: "Atlas X",    postedDate: "Jun 20", views: "892K", likes: "72.1K", comments: "2.4K", shares: "6.2K", engagementRate: "9.7%"  },
  { id: "6", title: "Glow-Up Routine — Summer Edit",  platform: "instagram", type: "Post",  creator: "Nina Cole",   creatorInitials: "N", creatorTone: "green",  campaign: "Summer Glow",postedDate: "Jun 17", views: "44K",  likes: "5.2K",  comments: "178",   shares: "380",  engagementRate: "12.4%" },
];

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

const TYPE_TONE: Record<PostType, keyof typeof TONES> = {
  Reel: "purple", Story: "sky", Post: "blue", Video: "orange",
};

/* ------------------------------------------------------------------ */
/* Cell helpers                                                          */
/* ------------------------------------------------------------------ */

function PostLead({ item }: { item: PostItem }) {
  const PIcon = PLATFORM_ICONS[item.platform];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", background: TONES[item.creatorTone].tint, display: "flex", alignItems: "center", justifyContent: "center", color: TONES[item.creatorTone].solid, flexShrink: 0 }}>
        <PIcon size={16} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
          <Badge label={item.type} tone={TYPE_TONE[item.type]} size="sm" />
          <Badge label={item.campaign} tone="gray" size="sm" />
        </div>
      </div>
    </div>
  );
}

function CreatorCell({ item }: { item: PostItem }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 24, padding: "0 6px 0 3px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
      <Avatar initials={item.creatorInitials} tone={item.creatorTone} size="sm" />
      {item.creator}
    </span>
  );
}

function MetricsCell({ item }: { item: PostItem }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {[
        { Icon: IconEye,           value: item.views,    label: "Views" },
        { Icon: IconHeart,         value: item.likes,    label: "Likes" },
        { Icon: IconMessageCircle, value: item.comments, label: "Comments" },
        ...(item.shares ? [{ Icon: IconShare3, value: item.shares, label: "Shares" }] : []),
      ].map(({ Icon, value, label }) => (
        <div key={label} title={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
          <Icon size={12} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
          <span style={{ fontWeight: 500 }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function ERBadge({ er }: { er: string }) {
  const val = parseFloat(er);
  const tone = val >= 8 ? "green" : val >= 5 ? "blue" : "yellow";
  return <Badge label={er} tone={tone} icon={IconTrendingUp} size="sm" />;
}

/* ------------------------------------------------------------------ */
/* Summary bar                                                           */
/* ------------------------------------------------------------------ */

function SummaryBar() {
  return (
    <div style={{ display: "flex", gap: 24, padding: "10px 14px", background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
      {[
        { label: "Total views",      value: "2.6M" },
        { label: "Total likes",      value: "203K" },
        { label: "Avg. engagement",  value: "9.0%" },
        { label: "Live posts",       value: String(POSTS.length) },
      ].map(({ label, value }) => (
        <div key={label}>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: "var(--sd-text-md)", fontWeight: 700, color: "var(--sd-font-primary)" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

const PLATFORM_FILTERS: { label: string; value: Platform | "all" }[] = [
  { label: "All",       value: "all" },
  { label: "Instagram", value: "instagram" },
  { label: "TikTok",    value: "tiktok" },
  { label: "YouTube",   value: "youtube" },
];

function PostListDemo() {
  const [filter, setFilter] = useState<Platform | "all">("all");
  const visible = filter === "all" ? POSTS : POSTS.filter((p) => p.platform === filter);

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
      <SummaryBar />

      {/* Platform filter */}
      <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)" }}>
        {PLATFORM_FILTERS.map(({ label, value }) => (
          <Button
            key={value}
            variant={filter === value ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      <RecordList
        items={visible}
        getId={(p) => p.id}
        leadHeader="Post"
        lead={(p) => <PostLead item={p} />}
        columns={[
          {
            key: "creator",
            header: "Creator",
            render: (p) => <CreatorCell item={p} />,
          },
          {
            key: "metrics",
            header: "Metrics",
            grow: true,
            render: (p) => <MetricsCell item={p} />,
          },
          {
            key: "er",
            header: "ER%",
            render: (p) => <ERBadge er={p.engagementRate} />,
          },
          {
            key: "date",
            header: "Date",
            render: (p) => (
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", whiteSpace: "nowrap" }}>
                {p.postedDate}
              </span>
            ),
            collapseOnMobile: true,
          },
        ]}
        actions={(p) => (
          <Button variant="ghost" size="sm" iconOnly aria-label={`More options for ${p.title}`}>
            <IconDotsVertical size={14} />
          </Button>
        )}
        onRowClick={(p) => console.log("open post", p.id)}
        emptyMessage="No posts match this filter."
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "post-list",
  title: "Posts",
  group: "Record Views",
  status: "stable",
  summary: "Live post performance list — platform thumbnail, creator, reach & engagement metrics, color-coded ER% badge.",
  description:
    "PostRow surfaces the metrics that matter for a live influencer post: Views, Likes, Comments, Shares, and an engagement-rate badge that color-codes green (≥8%), blue (≥5%), or yellow (<5%). A summary bar above the list aggregates totals and average ER across all posts in the view. Built on `RecordList` for aligned columns and consistent row behavior.",
  demos: [{ title: "Post performance list", description: "Filter by platform. ER badge turns green for top performers (≥8%). Built on RecordList — columns align across all rows via CSS subgrid.", block: true, render: () => <PostListDemo /> }],
  props: [],
};

export default doc;
