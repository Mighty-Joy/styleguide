"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconPlus,
  IconCheck,
  IconX,
  IconCalendar,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type Platform = "instagram" | "tiktok" | "youtube";
type PostStatus = "published" | "scheduled" | "draft";

interface CalPost {
  id: string;
  day: number;
  platform: Platform;
  status: PostStatus;
  caption: string;
  type: string;
  brand?: string;
}

const PLATFORM_META: Record<Platform, { icon: React.ElementType; tone: keyof typeof TONES; label: string }> = {
  instagram: { icon: IconBrandInstagram, tone: "pink",   label: "Instagram" },
  tiktok:    { icon: IconBrandTiktok,    tone: "blue",   label: "TikTok"    },
  youtube:   { icon: IconBrandYoutube,   tone: "red",    label: "YouTube"   },
};

const STATUS_META: Record<PostStatus, { label: string; tone: keyof typeof TONES }> = {
  published: { label: "Published", tone: "green"  },
  scheduled: { label: "Scheduled", tone: "blue"   },
  draft:     { label: "Draft",     tone: "gray"   },
};

const POSTS: CalPost[] = [
  { id: "p1",  day: 2,  platform: "instagram", status: "published", caption: "Sunday reset routine ft. Aura Labs Luminos", type: "Reel",  brand: "Aura Labs"  },
  { id: "p2",  day: 5,  platform: "tiktok",    status: "published", caption: "POV: testing a serum for 30 days (day 1)",   type: "Video", brand: "Aura Labs"  },
  { id: "p3",  day: 7,  platform: "instagram", status: "published", caption: "Weekend GRWM — no-makeup makeup look",        type: "Reel"                       },
  { id: "p4",  day: 9,  platform: "instagram", status: "published", caption: "Skincare shelfie (swipe for deets ✨)",       type: "Post"                       },
  { id: "p5",  day: 12, platform: "tiktok",    status: "published", caption: "Day 10 update — the glow is REAL",            type: "Video", brand: "Aura Labs"  },
  { id: "p6",  day: 14, platform: "youtube",   status: "published", caption: "My full skincare routine | ft. new drops",    type: "Video"                      },
  { id: "p7",  day: 16, platform: "instagram", status: "published", caption: "Stories: behind the scenes of a shoot",       type: "Story", brand: "Satin & Co" },
  { id: "p8",  day: 19, platform: "tiktok",    status: "published", caption: "Day 17 — before vs after comparison",         type: "Video", brand: "Aura Labs"  },
  { id: "p9",  day: 21, platform: "instagram", status: "published", caption: "Morning skincare + Reel tutorial",             type: "Reel"                       },
  { id: "p10", day: 23, platform: "instagram", status: "scheduled", caption: "Luminos 30-day final review (gifted)",         type: "Reel",  brand: "Aura Labs"  },
  { id: "p11", day: 24, platform: "tiktok",    status: "scheduled", caption: "TikTok: final serum review + giveaway",        type: "Video", brand: "Aura Labs"  },
  { id: "p12", day: 26, platform: "instagram", status: "draft",     caption: "Summer haul ft. clean beauty faves",           type: "Reel"                       },
  { id: "p13", day: 28, platform: "youtube",   status: "draft",     caption: "June favourites — full review video",           type: "Video"                      },
];

const DAYS_OF_WEEK = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_DAYS = 30;
const MONTH_START_DOW = 0; // June 2026 starts on Monday → offset 1; using 0 for Sunday start grid

function Demo() {
  const [selectedDay, setSelectedDay] = useState<number | null>(23);
  const [filterPlatform, setFilterPlatform] = useState<Platform | null>(null);

  const postsOnDay = (day: number) => POSTS.filter((p) => p.day === day && (!filterPlatform || p.platform === filterPlatform));
  const selectedPosts = selectedDay ? postsOnDay(selectedDay) : [];

  const published = POSTS.filter((p) => p.status === "published").length;
  const scheduled = POSTS.filter((p) => p.status === "scheduled").length;
  const draft     = POSTS.filter((p) => p.status === "draft").length;

  // June 2026: starts on Monday (dow=1)
  const startOffset = 1;
  const totalCells = Math.ceil((MONTH_DAYS + startOffset) / 7) * 7;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <IconCalendar size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        <div style={{ flex: 1, fontSize: 13, fontWeight: 800 }}>June 2026</div>
        <div style={{ display: "flex", gap: 5 }}>
          {([null, "instagram", "tiktok", "youtube"] as (Platform | null)[]).map((p) => {
            const active = filterPlatform === p;
            if (!p) return (
              <button key="all" onClick={() => setFilterPlatform(null)}
                style={{ padding: "3px 8px", borderRadius: 6, background: active ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, color: active ? "#fff" : "var(--sd-font-secondary,#555)" }}>
                All
              </button>
            );
            const meta = PLATFORM_META[p];
            const Icon = meta.icon;
            return (
              <button key={p} onClick={() => setFilterPlatform(p)}
                style={{ width: 26, height: 26, borderRadius: 6, background: active ? TONES[meta.tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${active ? TONES[meta.tone].text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={12} style={{ color: active ? TONES[meta.tone].text : "var(--sd-font-tertiary,#999)" }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[
          { label: "Published", count: published, tone: "green"  as const },
          { label: "Scheduled", count: scheduled, tone: "blue"   as const },
          { label: "Draft",     count: draft,     tone: "gray"   as const },
        ].map(({ label, count, tone }) => (
          <div key={label} style={{ flex: 1, padding: "6px 8px", background: TONES[tone].tint, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: TONES[tone].text }}>{count}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.7 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Day-of-week header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#bbb)", paddingBottom: 4 }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 12 }}>
        {Array.from({ length: totalCells }).map((_, i) => {
          const day = i - startOffset + 1;
          const isValid = day >= 1 && day <= MONTH_DAYS;
          const posts = isValid ? postsOnDay(day) : [];
          const isSelected = selectedDay === day;
          const isToday = day === 22;

          return (
            <button key={i} onClick={() => isValid ? setSelectedDay(isSelected ? null : day) : undefined}
              style={{ aspectRatio: "1", borderRadius: 7, border: `${isSelected ? 2 : 1}px solid ${isSelected ? "#111" : isToday ? TONES.orange.text : "var(--sd-border-default,#e5e7eb)"}`, background: isSelected ? "#111" : isToday ? TONES.orange.tint : "white", cursor: isValid ? "pointer" : "default", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "4px 2px 2px", opacity: isValid ? 1 : 0 }}>
              {isValid && (
                <>
                  <span style={{ fontSize: 9, fontWeight: isToday || isSelected ? 800 : 500, color: isSelected ? "#fff" : isToday ? TONES.orange.text : "var(--sd-font-secondary,#555)", marginBottom: 2 }}>{day}</span>
                  <div style={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
                    {posts.slice(0, 3).map((p) => (
                      <div key={p.id} style={{ width: 5, height: 5, borderRadius: 99, background: p.status === "draft" ? "var(--sd-bg-tertiary,#ccc)" : TONES[PLATFORM_META[p.platform].tone].text, opacity: p.status === "scheduled" ? 0.5 : 1 }} />
                    ))}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day detail */}
      {selectedDay && (
        <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, padding: "11px 13px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>
            June {selectedDay}
            {selectedPosts.length === 0 && <span style={{ fontSize: 10, fontWeight: 500, color: "var(--sd-font-tertiary,#999)", marginLeft: 7 }}>No posts</span>}
          </div>
          {selectedPosts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {selectedPosts.map((post) => {
                const platMeta = PLATFORM_META[post.platform];
                const statMeta = STATUS_META[post.status];
                const PlatIcon = platMeta.icon;
                return (
                  <div key={post.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: TONES[platMeta.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <PlatIcon size={14} style={{ color: TONES[platMeta.tone].text }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 1, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: TONES[platMeta.tone].text }}>{platMeta.label} · {post.type}</span>
                        <Badge label={statMeta.label} tone={statMeta.tone} size="sm" />
                        {post.brand && <Badge label={post.brand} tone="orange" size="sm" />}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)", lineHeight: 1.4 }}>{post.caption}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />} style={{ width: "100%" }}>
              Schedule a post for June {selectedDay}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-content-calendar",
  title: "CreatorContentCalendar",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator monthly posting calendar — 30-day grid with platform-colored dots (published solid / scheduled faded / draft gray), 3 stat tiles, platform filter, and a selected-day detail panel.",
  description:
    "Creator tracks their content output and scheduled posts for the month. Header: month name, platform filter tabs (All/IG/TikTok/YouTube). 3 stat tiles: Published green / Scheduled blue / Draft gray — counts from seeded posts. Day-of-week row. 30-cell calendar grid: each cell has the day number + up to 3 platform dots (pink=IG / blue=TikTok / red=YouTube; solid=published, 50% opacity=scheduled, gray=draft). Today (Jun 22) has orange tint. Selected day has black border. Click a day → detail panel below: list of posts for that day each with platform icon tile (tinted bg), platform + type label, status badge, optional brand badge, caption text. Empty day → 'Schedule a post' secondary CTA. Pre-seeded: 13 posts across the month — 9 published, 2 scheduled (Jun 23–24, Aura Labs campaign), 2 drafts (Jun 26 + 28). Jun 23 pre-selected showing 1 scheduled Reel. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator content calendar",
      description: "Click any day with dots to see that day's posts. Filter by platform using the icon buttons. Jun 23 shows a scheduled Aura Labs Reel. Jun 22 is today.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
