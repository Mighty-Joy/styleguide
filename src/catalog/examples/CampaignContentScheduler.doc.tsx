"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconCheck,
  IconAlertCircle,
  IconCalendarEvent,
  IconVideo,
  IconPhoto,
  IconDots,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Platform  = "instagram" | "tiktok";
type PostType  = "reel" | "feed" | "story" | "tiktok";
type PostStatus = "scheduled" | "live" | "missed" | "draft";

interface ScheduledPost {
  id: string;
  creatorId: string;
  platform: Platform;
  type: PostType;
  status: PostStatus;
  day: number; // 1-based day of July
  label: string;
}

interface Creator {
  id: string;
  name: string;
  initials: string;
  tone: string;
  platform: Platform;
  handle: string;
}

const CREATORS: Creator[] = [
  { id: "c1", name: "Priya Nair",    initials: "PN", tone: "green",  platform: "instagram", handle: "@priya.creates" },
  { id: "c2", name: "Marcus Webb",   initials: "MW", tone: "blue",   platform: "tiktok",    handle: "@marcuswebb"   },
  { id: "c3", name: "Amara Diallo",  initials: "AD", tone: "purple", platform: "instagram", handle: "@amarabeauty"  },
  { id: "c4", name: "Ji-ho Kim",     initials: "JK", tone: "orange", platform: "instagram", handle: "@jiho.skin"    },
];

const POSTS: ScheduledPost[] = [
  { id: "p1",  creatorId: "c1", platform: "instagram", type: "reel",    status: "scheduled", day: 3,  label: "Launch Reel"       },
  { id: "p2",  creatorId: "c1", platform: "instagram", type: "story",   status: "scheduled", day: 3,  label: "Story ×3"          },
  { id: "p3",  creatorId: "c1", platform: "instagram", type: "feed",    status: "draft",     day: 10, label: "Feed post"         },
  { id: "p4",  creatorId: "c2", platform: "tiktok",    type: "tiktok",  status: "scheduled", day: 5,  label: "TikTok (60s)"      },
  { id: "p5",  creatorId: "c2", platform: "tiktok",    type: "tiktok",  status: "draft",     day: 12, label: "TikTok follow-up"  },
  { id: "p6",  creatorId: "c3", platform: "instagram", type: "reel",    status: "live",      day: 1,  label: "Teaser Reel"       },
  { id: "p7",  creatorId: "c3", platform: "instagram", type: "story",   status: "live",      day: 1,  label: "Story ×2"          },
  { id: "p8",  creatorId: "c3", platform: "instagram", type: "feed",    status: "scheduled", day: 8,  label: "Feed collab"       },
  { id: "p9",  creatorId: "c4", platform: "instagram", type: "reel",    status: "missed",    day: 2,  label: "Launch Reel"       },
  { id: "p10", creatorId: "c4", platform: "instagram", type: "story",   status: "scheduled", day: 7,  label: "Story ×3"          },
];

const STATUS_STYLE: Record<PostStatus, { bg: string; text: string; border: string }> = {
  scheduled: { bg: TONES.blue.tint,   text: TONES.blue.text,   border: TONES.blue.text   },
  live:      { bg: TONES.green.tint,  text: TONES.green.text,  border: TONES.green.text  },
  missed:    { bg: TONES.red.tint,    text: TONES.red.text,    border: TONES.red.text    },
  draft:     { bg: TONES.gray.tint,   text: TONES.gray.text,   border: TONES.gray.text   },
};

const TYPE_ICON: Record<PostType, React.ElementType> = {
  reel: IconVideo, feed: IconPhoto, story: IconPhoto, tiktok: IconVideo,
};

// Show days 1–14 of July
const DISPLAY_DAYS = Array.from({ length: 14 }, (_, i) => i + 1);
const DAY_LABELS   = DISPLAY_DAYS.map((d) => ({ d, label: `Jul ${d}` }));

/* ---- Demo ---- */
function Demo() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const postsByCreatorAndDay = (creatorId: string, day: number) =>
    POSTS.filter((p) => p.creatorId === creatorId && p.day === day);

  const scheduled = POSTS.filter((p) => p.status === "scheduled").length;
  const live      = POSTS.filter((p) => p.status === "live").length;
  const missed    = POSTS.filter((p) => p.status === "missed").length;
  const draft     = POSTS.filter((p) => p.status === "draft").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Content scheduler — Summer Glow</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Jul 1–14, 2025 · {POSTS.length} posts across {CREATORS.length} creators</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />}>Add post</Button>
      </div>

      {/* Status summary */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { label: `${live} Live`,      tone: "green"  as const },
          { label: `${scheduled} Scheduled`, tone: "blue" as const },
          { label: `${draft} Draft`,    tone: "gray"   as const },
          { label: `${missed} Missed`,  tone: "red"    as const },
        ].map(({ label, tone }) => (
          <Badge key={label} label={label} tone={tone} size="sm" dot />
        ))}
      </div>

      {/* Gantt grid */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 640 }}>
          {/* Day header row */}
          <div style={{ display: "grid", gridTemplateColumns: "140px repeat(14, 1fr)", gap: 2, marginBottom: 4 }}>
            <div />
            {DAY_LABELS.map(({ d, label }) => (
              <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: d <= 2 ? TONES.green.text : d === 3 ? TONES.blue.text : "var(--sd-font-tertiary,#aaa)", textTransform: "uppercase", letterSpacing: "0.03em", padding: "2px 0", borderBottom: d <= 2 ? `2px solid ${TONES.green.text}` : d === 3 ? `2px solid ${TONES.blue.text}` : "2px solid transparent" }}>
                {label}
              </div>
            ))}
          </div>

          {/* Creator rows */}
          {CREATORS.map((creator, ci) => (
            <div key={creator.id} style={{ display: "grid", gridTemplateColumns: "140px repeat(14, 1fr)", gap: 2, marginBottom: 4, alignItems: "center" }}>
              {/* Creator cell */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 6px 4px 0" }}>
                <Avatar initials={creator.initials} tone={creator.tone as any} size="sm" />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>{creator.name.split(" ")[0]}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>
                    {creator.platform === "instagram" ? <IconBrandInstagram size={9} /> : <IconBrandTiktok size={9} />}
                    {" "}{creator.handle}
                  </div>
                </div>
              </div>

              {/* Day cells */}
              {DISPLAY_DAYS.map((day) => {
                const posts = postsByCreatorAndDay(creator.id, day);
                if (posts.length === 0) {
                  return (
                    <div key={day} style={{ height: 32, borderRadius: 5, background: "var(--sd-bg-secondary,#f9f9f9)", border: "1px dashed var(--sd-border-default,#e5e7eb)" }} />
                  );
                }
                const first = posts[0];
                const st    = STATUS_STYLE[first.status];
                const TIcon = TYPE_ICON[first.type];
                return (
                  <div key={day}
                    style={{ height: 32, borderRadius: 5, background: st.bg, border: `1px solid ${st.border}20`, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, cursor: "pointer", position: "relative" }}
                    title={`${first.label} · ${first.status}`}>
                    <TIcon size={9} style={{ color: st.text }} />
                    {posts.length > 1 && (
                      <span style={{ fontSize: 8, fontWeight: 800, color: st.text }}>+{posts.length - 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
        {(Object.entries(STATUS_STYLE) as [PostStatus, typeof STATUS_STYLE[PostStatus]][]).map(([st, style]) => (
          <div key={st} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: style.bg, border: `1px solid ${style.border}` }} />
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", textTransform: "capitalize" }}>{st}</span>
          </div>
        ))}
      </div>

      {/* Missed warning */}
      {missed > 0 && (
        <div style={{ marginTop: 12, display: "flex", gap: 8, padding: "9px 12px", background: TONES.red.tint, borderRadius: 9 }}>
          <IconAlertCircle size={14} style={{ color: TONES.red.text, flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 11, color: TONES.red.text }}>
            <strong>{missed} missed post{missed > 1 ? "s" : ""}</strong> — Ji-ho Kim's launch reel (Jul 2) was not submitted on time. Consider rescheduling or replacing this creator slot.
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-content-scheduler",
  title: "CampaignContentScheduler",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Gantt-style content posting schedule across 4 creators and 14 days — colored cells for live/scheduled/draft/missed posts with per-creator row and missed-post alert.",
  description:
    "Gives brand managers a visual overview of when every creator's content is going live. Header: campaign name, date range, post + creator counts, Add post CTA. Status summary badges: Live (green), Scheduled (blue), Draft (gray), Missed (red). Gantt grid: left column has creator avatar + first name + platform icon + handle; 14 day columns (Jul 1–14) with mini date labels, past days in green, today in blue. Each cell: colored tinted square (32px tall) with content-type icon; if multiple posts on same day, shows +N overflow. Empty day cells: dashed gray. 10 pre-seeded posts: Amara's teaser reel + story live Jul 1, Ji-ho's missed launch Jul 2, Priya's reel + story scheduled Jul 3, Marcus TikTok Jul 5, Ji-ho story Jul 7, Amara feed Jul 8, Priya feed draft Jul 10, Marcus TikTok draft Jul 12. Bottom legend. Red alert banner when missed > 0 naming the creator and suggesting action. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign content scheduler",
      description: "Gantt grid showing 4 creators × 14 days. Hover any colored cell for post details. Live cells (Jul 1) green, scheduled blue, missed red (Jul 2 — Ji-ho), drafts gray.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
