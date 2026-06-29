"use client";

import React, { useState } from "react";
import {
  IconLayoutGrid,
  IconList,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconVideoPlus,
  IconPhoto,
  IconFileText,
  IconDotsVertical,
  IconCalendar,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";
type ContentType = "Reel" | "Story" | "Post" | "Video" | "UGC";
type Stage = "Script" | "Shot" | "Edited" | "Approved" | "Live";

const STAGE_ORDER: Stage[] = ["Script", "Shot", "Edited", "Approved", "Live"];

const STAGE_COLOR: Record<Stage, string> = {
  Script:   TONES.blue.solid,
  Shot:     TONES.yellow.solid,
  Edited:   TONES.orange.solid,
  Approved: TONES.purple.solid,
  Live:     TONES.green.solid,
};

const STAGE_TONE: Record<Stage, keyof typeof TONES> = {
  Script: "blue", Shot: "yellow", Edited: "orange", Approved: "purple", Live: "green",
};

interface ContentItem {
  id: string;
  title: string;
  platform: Platform;
  type: ContentType;
  stage: Stage;
  creator: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  campaign: string;
  dueDate: string;
  amount?: string;
}

const CONTENT: ContentItem[] = [
  { id: "1", title: "Atlas X — Morning Routine Reel", platform: "instagram", type: "Reel",   stage: "Edited",   creator: "Priya Nair",   creatorInitials: "P", creatorTone: "purple", campaign: "Atlas X",     dueDate: "Aug 15", amount: "$2,500" },
  { id: "2", title: "Summer Glow IG Stories (×3)",   platform: "instagram", type: "Story",  stage: "Script",   creator: "Maya Rivers",  creatorInitials: "M", creatorTone: "pink",   campaign: "Summer Glow", dueDate: "Aug 20", amount: "$900"  },
  { id: "3", title: "Spring Drop TikTok",             platform: "tiktok",    type: "Video",  stage: "Approved", creator: "Priya Nair",   creatorInitials: "P", creatorTone: "purple", campaign: "Spring Drop", dueDate: "Jul 30", amount: "$3,000" },
  { id: "4", title: "Atlas X Partnership Unboxing",   platform: "youtube",   type: "Video",  stage: "Shot",     creator: "Leo Park",     creatorInitials: "L", creatorTone: "blue",   campaign: "Atlas X",     dueDate: "Aug 10", amount: "$4,000" },
  { id: "5", title: "Summer Glow Product Review",     platform: "tiktok",    type: "UGC",    stage: "Live",     creator: "Nina Cole",    creatorInitials: "N", creatorTone: "green",  campaign: "Summer Glow", dueDate: "Jun 28", amount: "$1,200" },
  { id: "6", title: "Atlas X Skincare Routine Post",  platform: "instagram", type: "Post",   stage: "Script",   creator: "Theo Vance",   creatorInitials: "T", creatorTone: "orange", campaign: "Atlas X",     dueDate: "Sep 5",  amount: "$800"  },
];

/* ------------------------------------------------------------------ */
/* Shared sub-components                                                 */
/* ------------------------------------------------------------------ */

function PlatformIcon({ platform, size = 14 }: { platform: Platform; size?: number }) {
  const icons = { instagram: IconBrandInstagram, tiktok: IconBrandTiktok, youtube: IconBrandYoutube };
  const Icon = icons[platform];
  return <Icon size={size} />;
}

function StagePill({ stage }: { stage: Stage }) {
  return <Badge label={stage} tone={STAGE_TONE[stage]} size="sm" dot />;
}

function Stepper({ stage }: { stage: Stage }) {
  const currentIdx = STAGE_ORDER.indexOf(stage);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {STAGE_ORDER.map((s, i) => (
        <div
          key={s}
          title={s}
          style={{ flex: 1, height: 3, borderRadius: 2, background: i <= currentIdx ? STAGE_COLOR[s] : "var(--sd-bg-quaternary)" }}
        />
      ))}
    </div>
  );
}

function TypeBadge({ type }: { type: ContentType }) {
  const icons: Record<ContentType, React.ReactNode> = {
    Reel: <IconVideoPlus size={10} />, Story: <IconPhoto size={10} />, Post: <IconPhoto size={10} />,
    Video: <IconVideoPlus size={10} />, UGC: <IconFileText size={10} />,
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 18, padding: "0 6px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)", color: "var(--sd-font-primary)", fontSize: 10, fontWeight: 600 }}>
      {icons[type]}{type}
    </span>
  );
}

function CreatorChip({ initials, name, tone }: { initials: string; name: string; tone: keyof typeof TONES }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 24, padding: "0 6px 0 3px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
      <Avatar initials={initials} tone={tone} size="sm" />
      {name}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ContentCard (grid view)                                               */
/* ------------------------------------------------------------------ */

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", overflow: "hidden", cursor: "pointer", transition: "border-color 0.1s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--sd-border-medium)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--sd-border-light)")}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", height: 128, background: TONES[item.creatorTone].tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <PlatformIcon platform={item.platform} size={32} />
        {/* platform badge top-left */}
        <div style={{ position: "absolute", top: 8, left: 8, width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <PlatformIcon platform={item.platform} size={12} />
        </div>
        {/* type badge top-right */}
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <TypeBadge type={item.type} />
        </div>
        {/* stepper overlay at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 8px 8px" }}>
          <Stepper stage={item.stage} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)", lineHeight: 1.35, marginBottom: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {item.title}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
          <CreatorChip initials={item.creatorInitials} name={item.creator} tone={item.creatorTone} />
          <span style={{ display: "inline-flex", alignItems: "center", height: 20, padding: "0 7px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 11, color: "var(--sd-font-tertiary)", fontWeight: 500 }}>
            {item.campaign}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <StagePill stage={item.stage} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {item.amount && <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{item.amount}</span>}
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--sd-font-tertiary)" }}>
              <IconCalendar size={10} />{item.dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ContentRow (list view)                                                */
/* ------------------------------------------------------------------ */

function ContentRow({ item }: { item: ContentItem }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 14px", height: 52, cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sd-bg-secondary)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Thumbnail mini */}
      <div style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", background: TONES[item.creatorTone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: TONES[item.creatorTone].text }}>
        <PlatformIcon platform={item.platform} size={16} />
      </div>

      {/* Title */}
      <div style={{ flex: "0 0 220px", minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.title}
        </div>
      </div>

      {/* Creator */}
      <div style={{ flex: "0 0 130px" }}>
        <CreatorChip initials={item.creatorInitials} name={item.creator} tone={item.creatorTone} />
      </div>

      {/* Platform + type */}
      <div style={{ flex: "0 0 80px", display: "flex", alignItems: "center", gap: 5, color: "var(--sd-font-secondary)", fontSize: "var(--sd-text-xs)", fontWeight: 500 }}>
        <PlatformIcon platform={item.platform} size={12} />
        {item.type}
      </div>

      {/* Stepper + stage */}
      <div style={{ flex: "0 0 160px", display: "flex", flexDirection: "column", gap: 4 }}>
        <Stepper stage={item.stage} />
        <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontWeight: 500 }}>{item.stage}</span>
      </div>

      {/* Due date */}
      <div style={{ flex: "0 0 60px", display: "flex", alignItems: "center", gap: 4, fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
        <IconCalendar size={11} />{item.dueDate}
      </div>

      {/* Amount */}
      <div style={{ flex: "0 0 56px", textAlign: "right", fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>
        {item.amount ?? "—"}
      </div>

      {/* Actions */}
      <Button variant="tertiary" size="sm" iconOnly aria-label="More">
        <IconDotsVertical size={14} />
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

function ContentListDemo() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>Content</span>
        <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "1px 7px", fontWeight: 600 }}>{CONTENT.length}</span>
        <span style={{ flex: 1 }} />
        {(["grid", "list"] as const).map((v) => (
          <Button key={v} variant={view === v ? "primary" : "secondary"} size="sm" iconOnly onClick={() => setView(v)} aria-label={v}>
            {v === "grid" ? <IconLayoutGrid size={13} /> : <IconList size={13} />}
          </Button>
        ))}
      </div>

      {/* content */}
      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {CONTENT.map((item) => <ContentCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 14px", height: 34, background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
            {[["Content", "248px"], ["Creator", "130px"], ["Platform", "80px"], ["Stage", "160px"], ["Due", "60px"], ["Amount", "56px"]].map(([label, w]) => (
              <span key={label} style={{ flex: label === "Stage" ? "0 0 160px" : `0 0 ${w}`, fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
            ))}
          </div>
          {CONTENT.map((item) => <ContentRow key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                            */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "content-list",
  title: "Content",
  group: "Record Views",
  status: "stable",
  summary: "Content piece records in grid (thumbnail cards) and list (compact rows) views, with a 5-stage production stepper.",
  description:
    "Content items track the production lifecycle from Script → Shot → Edited → Approved → Live. The `Stepper` renders 5 colored segments (blue → yellow → orange → purple → green). Grid view shows thumbnail gradients with platform + type badges; list view uses `RecordList` with consistent column widths. Stage, creator, campaign, due date, and amount are surfaced in both layouts.",
  demos: [
    {
      title: "Content — grid & list views",
      description: "Toggle between grid (card thumbnails) and list (compact rows). The stage stepper updates in both views.",
      block: true,
      render: () => <ContentListDemo />,
    },
  ],
  props: [],
};

export default doc;
