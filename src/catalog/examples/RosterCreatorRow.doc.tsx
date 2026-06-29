"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconMessageCircle,
  IconExternalLink,
  IconTrash,
  IconGripVertical,
  IconBolt,
  IconPhoto,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";
type RosterStage = "invited" | "pending" | "review" | "contracted" | "completed";

interface RosterCreator {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  bio: string;
  platforms: { platform: Platform; followers: string }[];
  avgEr: string;
  avgViews: string;
  stage: RosterStage;
  dealAmount?: string;
  deliverablesTotal: number;
  deliverablesDone: number;
  contentThumbs: string[];
}

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

const STAGE_META: Record<RosterStage, { label: string; tone: keyof typeof TONES }> = {
  invited:    { label: "Invited",    tone: "yellow" },
  pending:    { label: "Pending",    tone: "blue" },
  review:     { label: "In Review",  tone: "orange" },
  contracted: { label: "Contracted", tone: "green" },
  completed:  { label: "Completed",  tone: "purple" },
};

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const INITIAL_ROSTER: RosterCreator[] = [
  {
    id: "1", name: "Priya Nair", initials: "P", tone: "purple", handle: "@priya", bio: "Lifestyle & beauty creator. Known for authentic skincare routines and morning GRWM content. Audience is 72% female, 18-34.",
    platforms: [{ platform: "instagram", followers: "340K" }, { platform: "tiktok", followers: "820K" }],
    avgEr: "7.4%", avgViews: "284K", stage: "contracted", dealAmount: "$2,500",
    deliverablesTotal: 3, deliverablesDone: 2, contentThumbs: ["#c084fc","#8b5cf6","#7c3aed"],
  },
  {
    id: "2", name: "Maya Rivers", initials: "M", tone: "pink", handle: "@mayarivers", bio: "Fashion & travel. Real-life moments, no filters. Based in NYC. Partners with clean beauty and premium fashion brands.",
    platforms: [{ platform: "instagram", followers: "128K" }, { platform: "tiktok", followers: "2.3M" }],
    avgEr: "9.1%", avgViews: "128K", stage: "contracted", dealAmount: "$3,800",
    deliverablesTotal: 4, deliverablesDone: 1, contentThumbs: ["#ec4899","#f43f5e"],
  },
  {
    id: "3", name: "Leo Park", initials: "L", tone: "blue", handle: "@leopark", bio: "Tech & productivity. Tutorials, reviews, and workflow hacks for remote workers. YouTube-first creator.",
    platforms: [{ platform: "youtube", followers: "540K" }, { platform: "instagram", followers: "41K" }],
    avgEr: "6.8%", avgViews: "56K", stage: "review", dealAmount: "$1,200",
    deliverablesTotal: 2, deliverablesDone: 0, contentThumbs: ["#3b82f6"],
  },
  {
    id: "4", name: "Nina Cole", initials: "N", tone: "green", handle: "@ninacole", bio: "Fitness & wellness. Daily workouts, meal prep, and honest supplement reviews. Very high engagement micro-influencer.",
    platforms: [{ platform: "tiktok", followers: "86K" }, { platform: "instagram", followers: "22K" }],
    avgEr: "12.4%", avgViews: "44K", stage: "invited",
    deliverablesTotal: 2, deliverablesDone: 0, contentThumbs: [],
  },
];

/* ------------------------------------------------------------------ */
/* Content thumbnail strip                                               */
/* ------------------------------------------------------------------ */

function ContentThumbs({ colors: thumbColors, total, done }: { colors: string[]; total: number; done: number }) {
  const empty = total - thumbColors.length;
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {thumbColors.map((bg, i) => (
        <div key={i} style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", background: bg, border: "1px solid var(--sd-border-light)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          {i < done && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>
            </div>
          )}
        </div>
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <div key={`e-${i}`} style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", border: "1px dashed var(--sd-border-medium)", background: "var(--sd-bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconPhoto size={13} style={{ color: "var(--sd-font-tertiary)" }} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single roster row                                                     */
/* ------------------------------------------------------------------ */

function RosterRow({
  creator,
  onRemove,
}: {
  creator: RosterCreator;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const t = TONES[creator.tone];
  const stageMeta = STAGE_META[creator.stage];
  const pct = creator.deliverablesTotal > 0
    ? Math.round((creator.deliverablesDone / creator.deliverablesTotal) * 100)
    : 0;

  return (
    <div style={{ borderBottom: "1px solid var(--sd-border-light)", background: "var(--sd-bg-primary)" }}>
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px", height: 60 }}>
        {/* Drag handle */}
        <div style={{ color: "var(--sd-font-tertiary)", cursor: "grab", flexShrink: 0 }}>
          <IconGripVertical size={16} />
        </div>

        {/* Avatar */}
        <Avatar initials={creator.initials} tone={creator.tone} size="lg" />

        {/* Identity */}
        <div style={{ flex: "0 0 180px", minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{creator.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
            <span style={{ fontSize: 11, color: "var(--sd-accent-active)", fontWeight: 500 }}>{creator.handle}</span>
            {creator.platforms.map(({ platform, followers }) => {
              const PIcon = PLATFORM_ICONS[platform];
              return (
                <span key={platform} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, color: "var(--sd-font-tertiary)" }}>
                  · <PIcon size={9} />{followers}
                </span>
              );
            })}
          </div>
        </div>

        {/* Stage badge */}
        <div style={{ flex: "0 0 100px" }}>
          <Badge label={stageMeta.label} tone={stageMeta.tone} size="sm" dot />
        </div>

        {/* Deliverables progress */}
        <div style={{ flex: "0 0 130px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--sd-font-tertiary)", marginBottom: 3 }}>
            <span>Deliverables</span>
            <span style={{ fontWeight: 600, color: "var(--sd-font-primary)" }}>{creator.deliverablesDone}/{creator.deliverablesTotal}</span>
          </div>
          <div style={{ height: 4, background: "var(--sd-bg-quaternary)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? TONES.green.solid : TONES.blue.solid, borderRadius: 2 }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ flex: "0 0 100px", display: "flex", gap: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>{creator.avgEr}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Avg ER</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>{creator.avgViews}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Avg Views</div>
          </div>
        </div>

        {/* Deal amount */}
        <div style={{ flex: "0 0 72px", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>
          {creator.dealAmount ? (
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <IconBolt size={11} style={{ color: TONES.green.solid }} />
              {creator.dealAmount}
            </span>
          ) : (
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>No deal</span>
          )}
        </div>

        {/* Actions */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <Button variant="secondary" size="sm" iconOnly aria-label="Message creator">
            <IconMessageCircle size={14} />
          </Button>
          <Button variant="secondary" size="sm" iconOnly aria-label="View profile">
            <IconExternalLink size={14} />
          </Button>
          <Button variant="secondary" size="sm" iconOnly aria-label="Remove from roster" onClick={() => onRemove(creator.id)}>
            <IconTrash size={14} />
          </Button>
          <Button variant="secondary" size="sm" iconOnly aria-label="Expand" onClick={() => setExpanded(v => !v)}>
            {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </Button>
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div style={{ padding: "12px 16px 14px 62px", background: "var(--sd-bg-secondary)", borderTop: "1px solid var(--sd-border-light)", display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Bio */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Bio</div>
            <p style={{ margin: 0, fontSize: 12, color: "var(--sd-font-secondary)", lineHeight: 1.55 }}>{creator.bio}</p>
          </div>
          {/* Content thumbnails */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
              Content ({creator.deliverablesDone}/{creator.deliverablesTotal} done)
            </div>
            <ContentThumbs colors={creator.contentThumbs} total={creator.deliverablesTotal} done={creator.deliverablesDone} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Roster demo                                                           */
/* ------------------------------------------------------------------ */

function RosterDemo() {
  const [roster, setRoster] = useState(INITIAL_ROSTER);

  const remove = (id: string) => setRoster(prev => prev.filter(c => c.id !== id));

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {/* Roster header */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 12px", height: 44, background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Campaign Roster</span>
        <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, background: "var(--sd-bg-tertiary)", color: "var(--sd-font-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "1px 7px" }}>{roster.length} creators</span>
      </div>

      {/* Column headers */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px", height: 30, background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ width: 16 }} />
        <div style={{ width: 38 }} />
        {[["Creator", "180px"], ["Stage", "100px"], ["Deliverables", "130px"], ["Stats", "100px"], ["Deal", "72px"]].map(([label, w]) => (
          <span key={label} style={{ flex: `0 0 ${w}`, fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        ))}
      </div>

      {/* Rows */}
      {roster.length === 0 ? (
        <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--sd-font-tertiary)", fontSize: 13 }}>
          All creators removed. Refresh to reset.
        </div>
      ) : (
        roster.map(c => <RosterRow key={c.id} creator={c} onRemove={remove} />)
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "roster-creator-row",
  title: "Roster Creator Row",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Campaign roster row — creator identity, stage badge, deliverable progress, stats, deal amount, expand for bio + content thumbs.",
  description:
    "The Roster Creator Row is the unit shown in the Campaign Creators tab. Each row shows a drag handle, creator avatar + name + handle + platform follower counts, stage badge, deliverable progress bar, avg ER + views stats, and deal amount. Click the chevron to expand the row and reveal the creator bio and content thumbnail strip (with ✓ overlaid on completed pieces). Row actions: Message, View Profile, Remove. Clicking Remove removes the creator from the roster live.",
  demos: [
    {
      title: "Campaign roster",
      description: "4 creators at various stages. Click ↓ to expand bio + content thumbnails. Click the trash icon to remove from roster.",
      block: true,
      render: () => <RosterDemo />,
    },
  ],
  props: [],
};

export default doc;
