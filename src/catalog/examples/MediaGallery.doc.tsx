"use client";

import React, { useState } from "react";
import {
  IconDownload,
  IconCircleCheck,
  IconPlayerPlay,
  IconDotsVertical,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import PlatformIcon from "@/components/ui/PlatformIcon/PlatformIcon";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type Platform   = "instagram" | "tiktok" | "youtube";
type ContentType = "reel" | "story" | "post" | "video";
type AssetStatus = "approved" | "in_review" | "draft" | "rejected";

interface MediaAsset {
  id: string;
  creatorName: string;
  creatorTone: keyof typeof TONES;
  platform: Platform;
  type: ContentType;
  status: AssetStatus;
  date: string;
  duration?: string;
  campaign: string;
}

/* ------------------------------------------------------------------ */
/* Mock data                                                             */
/* ------------------------------------------------------------------ */

const ASSETS: MediaAsset[] = [
  { id: "1",  creatorName: "Priya Nair",    creatorTone: "purple", platform: "instagram", type: "reel",  status: "approved",  date: "Jul 28", duration: "0:48", campaign: "Atlas X" },
  { id: "2",  creatorName: "Maya Rivers",   creatorTone: "pink",   platform: "tiktok",   type: "video", status: "in_review", date: "Jul 27", duration: "1:12", campaign: "Summer Glow" },
  { id: "3",  creatorName: "Jake Solomon",  creatorTone: "blue",   platform: "instagram", type: "post",  status: "approved",  date: "Jul 26", campaign: "Atlas X" },
  { id: "4",  creatorName: "Sasha Kim",     creatorTone: "sky",    platform: "youtube",  type: "video", status: "draft",     date: "Jul 25", duration: "4:32", campaign: "Glow Up" },
  { id: "5",  creatorName: "Nina Cole",     creatorTone: "orange", platform: "instagram", type: "story", status: "approved",  date: "Jul 24", campaign: "Summer Glow" },
  { id: "6",  creatorName: "Priya Nair",    creatorTone: "purple", platform: "tiktok",   type: "video", status: "rejected",  date: "Jul 23", duration: "0:32", campaign: "Atlas X" },
  { id: "7",  creatorName: "Maya Rivers",   creatorTone: "pink",   platform: "instagram", type: "reel",  status: "in_review", date: "Jul 22", duration: "0:55", campaign: "Summer Glow" },
  { id: "8",  creatorName: "Jake Solomon",  creatorTone: "blue",   platform: "youtube",  type: "video", status: "approved",  date: "Jul 21", duration: "6:14", campaign: "Glow Up" },
  { id: "9",  creatorName: "Sasha Kim",     creatorTone: "sky",    platform: "instagram", type: "reel",  status: "draft",     date: "Jul 20", duration: "0:41", campaign: "Atlas X" },
  { id: "10", creatorName: "Nina Cole",     creatorTone: "orange", platform: "tiktok",   type: "video", status: "approved",  date: "Jul 19", duration: "1:05", campaign: "Summer Glow" },
  { id: "11", creatorName: "Priya Nair",    creatorTone: "purple", platform: "instagram", type: "story", status: "in_review", date: "Jul 18", campaign: "Glow Up" },
  { id: "12", creatorName: "Jake Solomon",  creatorTone: "blue",   platform: "tiktok",   type: "video", status: "approved",  date: "Jul 17", duration: "0:58", campaign: "Atlas X" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                               */
/* ------------------------------------------------------------------ */

const PLATFORM_TONE: Record<Platform, keyof typeof TONES> = {
  instagram: "pink",
  tiktok:    "gray",
  youtube:   "red",
};

const STATUS_TONE: Record<AssetStatus, keyof typeof TONES> = {
  approved:  "green",
  in_review: "orange",
  draft:     "gray",
  rejected:  "red",
};

const STATUS_LABEL: Record<AssetStatus, string> = {
  approved:  "Approved",
  in_review: "In Review",
  draft:     "Draft",
  rejected:  "Rejected",
};

const TYPE_LABEL: Record<ContentType, string> = {
  reel: "Reel", story: "Story", post: "Post", video: "Video",
};

const PLATFORM_OPTIONS: { label: string; value: Platform | "all" }[] = [
  { label: "All",       value: "all" },
  { label: "Instagram", value: "instagram" },
  { label: "TikTok",   value: "tiktok" },
  { label: "YouTube",  value: "youtube" },
];

const TYPE_OPTIONS: { label: string; value: ContentType | "all" }[] = [
  { label: "All",   value: "all" },
  { label: "Reel",  value: "reel" },
  { label: "Story", value: "story" },
  { label: "Post",  value: "post" },
  { label: "Video", value: "video" },
];

const STATUS_OPTIONS: { label: string; value: AssetStatus | "all" }[] = [
  { label: "All",       value: "all" },
  { label: "Approved",  value: "approved" },
  { label: "In Review", value: "in_review" },
  { label: "Draft",     value: "draft" },
  { label: "Rejected",  value: "rejected" },
];

/* ------------------------------------------------------------------ */
/* MediaCard                                                             */
/* ------------------------------------------------------------------ */

function MediaCard({
  asset,
  selectionMode,
  selected,
  onSelect,
}: {
  asset: MediaAsset;
  selectionMode: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const platformTone = TONES[PLATFORM_TONE[asset.platform]];
  const hasVideo = asset.duration !== undefined;

  return (
    <div
      style={{
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        overflow: "hidden",
        outline: selected ? "2px solid var(--sd-bg-inverted)" : "2px solid transparent",
        outlineOffset: 1,
        cursor: "pointer",
        background: "var(--sd-bg-primary)",
        transition: "outline-color 0.1s, box-shadow 0.1s",
        boxShadow: hovered && !selected ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
      }}
      onClick={selectionMode ? onSelect : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", paddingBottom: "56.25%" /* 16:9 */ }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${platformTone.tint} 0%, var(--sd-bg-tertiary) 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <PlatformIcon platform={asset.platform} size={36} />
        </div>

        {/* Platform badge — top left */}
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            background: "var(--sd-bg-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}>
            <PlatformIcon platform={asset.platform} size={13} />
          </div>
        </div>

        {/* Checkbox — top right, visible in selection mode or hover */}
        {(selectionMode || hovered) && (
          <div
            style={{ position: "absolute", top: 8, right: 8 }}
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
          >
            <Checkbox checked={selected} onChange={onSelect} size="sm" />
          </div>
        )}

        {/* Approved checkmark overlay */}
        {asset.status === "approved" && !selectionMode && (
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <IconCircleCheck size={18} style={{ color: TONES.green.solid, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }} />
          </div>
        )}

        {/* Video play + duration — bottom right */}
        {hasVideo && (
          <div style={{
            position: "absolute", bottom: 6, right: 6,
            display: "flex", alignItems: "center", gap: 3,
            background: "rgba(0,0,0,0.55)", borderRadius: 4,
            padding: "2px 6px",
          }}>
            <IconPlayerPlay size={10} style={{ color: "#fff", fill: "#fff" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{asset.duration}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "8px 10px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
            <Avatar name={asset.creatorName} tone={asset.creatorTone} size="sm" />
            <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 500, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {asset.creatorName}
            </span>
          </div>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", flexShrink: 0 }}>{asset.date}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Badge label={TYPE_LABEL[asset.type]} tone="gray" size="sm" />
          <Badge label={STATUS_LABEL[asset.status]} tone={STATUS_TONE[asset.status]} variant="status" size="sm" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MediaGallery                                                          */
/* ------------------------------------------------------------------ */

function MediaGallery() {
  const [platform,  setPlatform]  = useState<Platform | "all">("all");
  const [type,      setType]      = useState<ContentType | "all">("all");
  const [status,    setStatus]    = useState<AssetStatus | "all">("all");
  const [selecting, setSelecting] = useState(false);
  const [selected,  setSelected]  = useState<Set<string>>(new Set());

  const filtered = ASSETS.filter(
    (a) =>
      (platform === "all" || a.platform === platform) &&
      (type     === "all" || a.type     === type)     &&
      (status   === "all" || a.status   === status),
  );

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectionMode() {
    setSelecting((v) => !v);
    setSelected(new Set());
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* Platform row */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {PLATFORM_OPTIONS.map((p) => (
              <Button
                key={p.value}
                variant={platform === p.value ? "primary" : "secondary"}
                size="sm"
                onClick={() => setPlatform(p.value as Platform | "all")}
              >
                {p.label}
              </Button>
            ))}
          </div>
          {/* Type + status row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {TYPE_OPTIONS.map((t) => (
                <Button
                  key={t.value}
                  variant={type === t.value ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setType(t.value as ContentType | "all")}
                >
                  {t.label}
                </Button>
              ))}
            </div>
            <div style={{ width: 1, height: 20, background: "var(--sd-border-light)" }} />
            <div style={{ display: "flex", gap: 4 }}>
              {STATUS_OPTIONS.map((s) => (
                <Button
                  key={s.value}
                  variant={status === s.value ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setStatus(s.value as AssetStatus | "all")}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: select toggle */}
        <Button
          variant={selecting ? "primary" : "secondary"}
          size="sm"
          onClick={toggleSelectionMode}
        >
          {selecting ? "Done" : "Select"}
        </Button>
      </div>

      {/* Results count */}
      <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
        {filtered.length} asset{filtered.length !== 1 ? "s" : ""}
        {selected.size > 0 && ` · ${selected.size} selected`}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: "48px 0", textAlign: "center", color: "var(--sd-font-tertiary)", fontSize: "var(--sd-text-sm)" }}>
          No assets match these filters.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map((asset) => (
            <MediaCard
              key={asset.id}
              asset={asset}
              selectionMode={selecting}
              selected={selected.has(asset.id)}
              onSelect={() => toggleSelect(asset.id)}
            />
          ))}
        </div>
      )}

      {/* Bulk action bar */}
      {selecting && selected.size > 0 && (
        <div style={{
          position: "sticky", bottom: 0,
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: "var(--sd-bg-inverted)",
          borderRadius: "var(--sd-radius-md)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-inverted)", flex: 1 }}>
            {selected.size} selected
          </span>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<IconCircleCheck size={13} />}
            onClick={() => { setSelected(new Set()); setSelecting(false); }}
          >
            Approve
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<IconDownload size={13} />}
          >
            Download
          </Button>
          <Button variant="ghost" iconOnly size="sm" aria-label="More actions">
            <IconDotsVertical size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "media-gallery",
  title: "Media Gallery",
  group: "Patterns",
  status: "stable",
  summary: "Filterable asset grid for browsing and selecting content pieces — reels, stories, posts, and videos.",
  description:
    "A responsive 3-column grid of content assets with platform, type, and status filters. Supports a selection mode for bulk actions (approve, download). Each card shows a platform-tinted thumbnail, creator identity, content type badge, and status badge. Used in campaign content review, asset library browsing, and approval queues.",
  demos: [
    {
      title: "Media Gallery",
      description: "Filter by platform, type, or status. Click **Select** to enter bulk-selection mode — pick cards, then approve or download in one action.",
      block: true,
      render: () => <MediaGallery />,
    },
  ],
  props: [],
};

export default doc;
