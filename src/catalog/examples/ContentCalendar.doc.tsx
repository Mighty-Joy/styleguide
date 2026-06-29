"use client";

import React, { useState } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconVideo,
  IconPhoto,
  IconBlockquote,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";
type ContentType = "reel" | "story" | "post" | "video";
type Stage = "brief" | "script" | "production" | "review" | "approved" | "live" | "completed";

interface ContentItem {
  id: string;
  creatorName: string;
  creatorTone: keyof typeof TONES;
  platform: Platform;
  type: ContentType;
  stage: Stage;
  campaign: string;
  dayIndex: number; // 0=Mon … 6=Sun
}

/* ------------------------------------------------------------------ */
/* Lookup tables                                                        */
/* ------------------------------------------------------------------ */

const STAGE_TONE: Record<Stage, keyof typeof TONES> = {
  brief:      "gray",
  script:     "purple",
  production: "blue",
  review:     "orange",
  approved:   "green",
  live:       "sky",
  completed:  "gray",
};

const STAGE_LABEL: Record<Stage, string> = {
  brief:      "Brief",
  script:     "Script",
  production: "Production",
  review:     "In Review",
  approved:   "Approved",
  live:       "Live",
  completed:  "Completed",
};

const PLATFORM_ICON: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#ff0000",
};

const TYPE_ICON: Record<ContentType, React.ElementType> = {
  reel:  IconVideo,
  story: IconBlockquote,
  post:  IconPhoto,
  video: IconVideo,
};

const TYPE_LABEL: Record<ContentType, string> = {
  reel:  "Reel",
  story: "Story",
  post:  "Post",
  video: "Video",
};

/* ------------------------------------------------------------------ */
/* Week fixture data                                                    */
/* ------------------------------------------------------------------ */

const WEEK_ITEMS: ContentItem[] = [
  { id: "c1",  creatorName: "Priya Nair",  creatorTone: "purple",    platform: "instagram", type: "reel",  stage: "review",     campaign: "Spring Drop",      dayIndex: 0 },
  { id: "c2",  creatorName: "Jake Mills",  creatorTone: "blue",      platform: "tiktok",    type: "video", stage: "production", campaign: "Summer Launch",    dayIndex: 0 },
  { id: "c3",  creatorName: "Sofia Chen",  creatorTone: "orange",    platform: "instagram", type: "story", stage: "approved",   campaign: "Spring Drop",      dayIndex: 1 },
  { id: "c4",  creatorName: "Marcus Lee",  creatorTone: "turquoise", platform: "youtube",   type: "video", stage: "script",     campaign: "Brand Awareness",  dayIndex: 1 },
  { id: "c5",  creatorName: "Priya Nair",  creatorTone: "purple",    platform: "instagram", type: "story", stage: "production", campaign: "Spring Drop",      dayIndex: 2 },
  { id: "c6",  creatorName: "Jake Mills",  creatorTone: "blue",      platform: "instagram", type: "post",  stage: "approved",   campaign: "Summer Launch",    dayIndex: 3 },
  { id: "c7",  creatorName: "Sofia Chen",  creatorTone: "orange",    platform: "tiktok",    type: "reel",  stage: "live",       campaign: "Spring Drop",      dayIndex: 3 },
  { id: "c8",  creatorName: "Marcus Lee",  creatorTone: "turquoise", platform: "instagram", type: "post",  stage: "review",     campaign: "Brand Awareness",  dayIndex: 4 },
  { id: "c9",  creatorName: "Priya Nair",  creatorTone: "purple",    platform: "tiktok",    type: "reel",  stage: "live",       campaign: "Spring Drop",      dayIndex: 4 },
  { id: "c10", creatorName: "Jake Mills",  creatorTone: "blue",      platform: "youtube",   type: "video", stage: "brief",      campaign: "Q3 Campaign",      dayIndex: 5 },
  { id: "c11", creatorName: "Sofia Chen",  creatorTone: "orange",    platform: "instagram", type: "reel",  stage: "approved",   campaign: "Summer Launch",    dayIndex: 6 },
];

/* ------------------------------------------------------------------ */
/* Week day labels (two sets for navigation demo)                      */
/* ------------------------------------------------------------------ */

const WEEKS = [
  ["Mon Jun 16", "Tue Jun 17", "Wed Jun 18", "Thu Jun 19", "Fri Jun 20", "Sat Jun 21", "Sun Jun 22"],
  ["Mon Jun 23", "Tue Jun 24", "Wed Jun 25", "Thu Jun 26", "Fri Jun 27", "Sat Jun 28", "Sun Jun 29"],
  ["Mon Jun 30", "Tue Jul 1",  "Wed Jul 2",  "Thu Jul 3",  "Fri Jul 4",  "Sat Jul 5",  "Sun Jul 6"],
];

const DAY_ABBR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ------------------------------------------------------------------ */
/* ContentCard                                                          */
/* ------------------------------------------------------------------ */

function ContentCard({
  item,
  selected,
  onSelect,
}: {
  item: ContentItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const PlatformIcon = PLATFORM_ICON[item.platform];
  const TypeIcon     = TYPE_ICON[item.type];

  return (
    <div
      onClick={onSelect}
      style={{
        background:   "var(--sd-bg-primary)",
        border:       `1px solid ${selected ? "var(--sd-border-medium)" : "var(--sd-border-light)"}`,
        borderRadius: "var(--sd-radius-sm)",
        padding:      "8px 10px",
        cursor:       "pointer",
        boxShadow:    selected ? "0 0 0 2px var(--sd-bg-inverted)" : "none",
        transition:   "box-shadow 0.12s, border-color 0.12s",
        display:      "flex",
        flexDirection: "column",
        gap:          5,
      }}
    >
      {/* Creator row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Avatar name={item.creatorName} tone={item.creatorTone} size="sm" />
        <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-primary)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.creatorName}
        </span>
      </div>

      {/* Platform + type */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <PlatformIcon size={12} style={{ color: PLATFORM_COLOR[item.platform], flexShrink: 0 }} />
        <TypeIcon size={11} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
        <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", fontWeight: 500 }}>
          {TYPE_LABEL[item.type]}
        </span>
      </div>

      {/* Stage badge */}
      <Badge label={STAGE_LABEL[item.stage]} tone={STAGE_TONE[item.stage]} variant="status" size="sm" />

      {/* Campaign name */}
      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", lineHeight: 1.3 }}>
        {item.campaign}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ContentCalendar                                                      */
/* ------------------------------------------------------------------ */

function ContentCalendar() {
  const [weekOffset, setWeekOffset]   = useState(1); // default to Jun 23–29
  const [selectedId, setSelectedId]   = useState<string | null>(null);

  const dayLabels = WEEKS[weekOffset] ?? WEEKS[1];
  const weekRange = `${dayLabels[0].slice(4)} – ${dayLabels[6].slice(4)}, 2026`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-lg)", border: "1px solid var(--sd-border-light)", overflow: "hidden" }}>

      {/* ---- Header ---- */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 12px", background: "var(--sd-bg-primary)", borderBottom: "1px solid var(--sd-border-light)" }}>
        <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
          Content Calendar
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Previous week"
            onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
          >
            <IconChevronLeft size={14} />
          </Button>
          <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-secondary)", minWidth: 150, textAlign: "center" }}>
            {weekRange}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Next week"
            onClick={() => setWeekOffset(w => Math.min(WEEKS.length - 1, w + 1))}
          >
            <IconChevronRight size={14} />
          </Button>
        </div>
        <Button variant="secondary" size="sm">
          + Add deliverable
        </Button>
      </div>

      {/* ---- Day columns ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {DAY_ABBR.map((abbr, dayIdx) => {
          const label     = dayLabels[dayIdx];
          const dateNum   = label?.split(" ")[2] ?? "";
          const isToday   = weekOffset === 1 && dayIdx === 2; // Wed Jun 25 = "today"
          const dayItems  = weekOffset === 1 ? WEEK_ITEMS.filter(c => c.dayIndex === dayIdx) : [];

          return (
            <div
              key={abbr}
              style={{
                borderRight:    dayIdx < 6 ? "1px solid var(--sd-border-light)" : "none",
                background:     isToday ? "var(--sd-bg-tertiary)" : "var(--sd-bg-primary)",
                minHeight:      220,
              }}
            >
              {/* Day header */}
              <div style={{
                padding:        "10px 10px 8px",
                borderBottom:   "1px solid var(--sd-border-light)",
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "flex-start",
                gap:            2,
              }}>
                <span style={{
                  fontSize:   "var(--sd-text-xs)",
                  fontWeight: isToday ? 800 : 600,
                  color:      isToday ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  {abbr}
                </span>
                <span style={{
                  fontSize:   "var(--sd-text-sm)",
                  fontWeight: 700,
                  color:      isToday ? "var(--sd-bg-inverted)" : "var(--sd-font-secondary)",
                  width:      20, height: 20,
                  display:    "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  background: isToday ? "var(--sd-bg-inverted)" : "transparent",
                  ...(isToday ? { color: "#fff" } : {}),
                }}>
                  {dateNum}
                </span>
              </div>

              {/* Content cards */}
              <div style={{ padding: "8px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
                {dayItems.length > 0 ? (
                  dayItems.map(item => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      selected={selectedId === item.id}
                      onSelect={() => setSelectedId(id => id === item.id ? null : item.id)}
                    />
                  ))
                ) : (
                  <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", paddingTop: 6, paddingLeft: 2 }}>
                    No content
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Legend ---- */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderTop: "1px solid var(--sd-border-light)", background: "var(--sd-bg-primary)", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Stage:
        </span>
        {(["brief", "script", "production", "review", "approved", "live"] as Stage[]).map(s => (
          <Badge key={s} label={STAGE_LABEL[s]} tone={STAGE_TONE[s]} variant="status" size="sm" />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                  */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "content-calendar",
  title: "Content Calendar",
  group: "Patterns",
  status: "stable",
  summary: "Weekly calendar view of campaign deliverables — content cards across creators, platforms, and stages.",
  description:
    "The Content Calendar gives campaign managers a bird's-eye view of what content is in flight across all creators for a given week. Each day column shows deliverable cards with the creator avatar, platform, content type, stage badge, and campaign name. Use the week arrows to navigate; click any card to select it. Today's column is lightly tinted for quick orientation. The stage legend at the bottom maps badge tones to pipeline stages.",
  demos: [
    {
      title: "Weekly view",
      description: "Jun 23–29, 2026 — week offset 1 shows 11 deliverables across 4 creators.",
      render: () => <ContentCalendar />,
    },
  ],
};

export default doc;
