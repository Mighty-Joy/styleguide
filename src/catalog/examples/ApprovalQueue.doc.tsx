"use client";

import React, { useState } from "react";
import {
  IconCircleCheck,
  IconCircleX,
  IconMessageDots,
  IconPlayerPlay,
  IconDotsVertical,
  IconFilter,
  IconBolt,
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

type Platform    = "instagram" | "tiktok" | "youtube";
type ContentType = "reel" | "story" | "post" | "video";
type ReviewStatus = "pending" | "approved" | "changes_requested" | "rejected";

interface ReviewItem {
  id:           string;
  creatorName:  string;
  creatorTone:  keyof typeof TONES;
  platform:     Platform;
  type:         ContentType;
  campaign:     string;
  submittedAt:  string;
  brief:        string;
  duration?:    string;
  status:       ReviewStatus;
}

/* ------------------------------------------------------------------ */
/* Mock data                                                             */
/* ------------------------------------------------------------------ */

const ITEMS: ReviewItem[] = [
  {
    id: "r1", creatorName: "Priya Nair",   creatorTone: "purple", platform: "instagram", type: "reel",
    campaign: "Atlas X — Spring", submittedAt: "2h ago",
    brief: "60s morning skincare routine featuring the serum. Hooks in first 3 sec.",
    duration: "1:02", status: "pending",
  },
  {
    id: "r2", creatorName: "Maya Rivers",  creatorTone: "pink",   platform: "tiktok",   type: "video",
    campaign: "Summer Glow",      submittedAt: "4h ago",
    brief: "Unboxing + first impressions. Show product code in end screen.",
    duration: "0:48", status: "pending",
  },
  {
    id: "r3", creatorName: "Jake Solomon", creatorTone: "blue",   platform: "instagram", type: "post",
    campaign: "Atlas X — Spring", submittedAt: "6h ago",
    brief: "Still image of product flat-lay. Must include #AtlasX and tag @atlasxbrand.",
    status: "pending",
  },
  {
    id: "r4", creatorName: "Sasha Kim",    creatorTone: "sky",    platform: "youtube",  type: "video",
    campaign: "Glow Up Q3",       submittedAt: "Yesterday",
    brief: "90s integration at 2:30 mark. Product demo + promo code.",
    duration: "8:12", status: "pending",
  },
  {
    id: "r5", creatorName: "Nina Cole",    creatorTone: "orange", platform: "instagram", type: "story",
    campaign: "Summer Glow",      submittedAt: "Yesterday",
    brief: "3-slide story with swipe-up link. Slide 3 must have CTA.",
    status: "pending",
  },
  {
    id: "r6", creatorName: "Priya Nair",   creatorTone: "purple", platform: "tiktok",   type: "reel",
    campaign: "Glow Up Q3",       submittedAt: "2 days ago",
    brief: "Trending audio + product reveal. Caption: #GlowUp #Sponsored.",
    duration: "0:34", status: "changes_requested",
  },
];

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#ff0000",
};

const TYPE_LABEL: Record<ContentType, string> = {
  reel: "Reel", story: "Story", post: "Post", video: "Video",
};

const STATUS_TONE: Record<ReviewStatus, keyof typeof TONES> = {
  pending:           "orange",
  approved:          "green",
  changes_requested: "blue",
  rejected:          "red",
};

const STATUS_LABEL: Record<ReviewStatus, string> = {
  pending:           "Pending",
  approved:          "Approved",
  changes_requested: "Changes Requested",
  rejected:          "Rejected",
};

/* ------------------------------------------------------------------ */
/* ReviewRow                                                             */
/* ------------------------------------------------------------------ */

function ReviewRow({
  item,
  selected,
  onToggleSelect,
  onApprove,
  onRequestChanges,
}: {
  item:              ReviewItem;
  selected:          boolean;
  onToggleSelect:    () => void;
  onApprove:         () => void;
  onRequestChanges:  () => void;
}) {
  const hasVideo = item.type === "reel" || item.type === "video";

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "14px 16px",
      borderBottom: "1px solid var(--sd-border-light)",
      background: selected ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
      transition: "background 0.1s",
    }}>
      {/* Select */}
      <div style={{ paddingTop: 2, flexShrink: 0 }}>
        <Checkbox checked={selected} onChange={onToggleSelect} size="sm" />
      </div>

      {/* Thumbnail */}
      <div style={{
        position: "relative", width: 72, height: 52, flexShrink: 0,
        borderRadius: "var(--sd-radius-sm)",
        background: `linear-gradient(135deg, ${TONES[item.creatorTone].tint} 0%, var(--sd-bg-tertiary) 100%)`,
        border: "1px solid var(--sd-border-light)",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <PlatformIcon platform={item.platform} size={22} />

        {hasVideo && item.duration && (
          <div style={{
            position: "absolute", bottom: 4, right: 4,
            display: "flex", alignItems: "center", gap: 2,
            background: "rgba(0,0,0,0.55)", borderRadius: 3, padding: "1px 4px",
          }}>
            <IconPlayerPlay size={8} style={{ color: "#fff", fill: "#fff" }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: "#fff" }}>{item.duration}</span>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Creator + platform row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Avatar name={item.creatorName} tone={item.creatorTone} size="sm" />
          <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
            {item.creatorName}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <PlatformIcon platform={item.platform} size={12} />
            <Badge label={TYPE_LABEL[item.type]} tone="gray" size="sm" />
          </div>
          <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
            {item.campaign}
          </span>
          <span style={{ marginLeft: "auto", fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", flexShrink: 0 }}>
            {item.submittedAt}
          </span>
        </div>

        {/* Brief excerpt */}
        <p style={{
          margin: 0, fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", lineHeight: 1.5,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.brief}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          {item.status === "pending" ? (
            <>
              <Button
                variant="primary" size="sm"
                leftIcon={<IconCircleCheck size={13} />}
                onClick={onApprove}
              >
                Approve
              </Button>
              <Button
                variant="secondary" size="sm"
                leftIcon={<IconMessageDots size={13} />}
                onClick={onRequestChanges}
              >
                Request changes
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<IconCircleX size={13} />}>
                Reject
              </Button>
            </>
          ) : (
            <Badge
              label={STATUS_LABEL[item.status]}
              tone={STATUS_TONE[item.status]}
              variant="status"
              dot
            />
          )}
          <div style={{ marginLeft: "auto" }}>
            <Button variant="ghost" size="sm" iconOnly aria-label="More">
              <IconDotsVertical size={13} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ApprovalQueue                                                         */
/* ------------------------------------------------------------------ */

function ApprovalQueue() {
  const [items, setItems]     = useState<ReviewItem[]>(ITEMS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [campaign, setCampaign] = useState<string>("all");

  const campaigns = ["all", ...Array.from(new Set(ITEMS.map(i => i.campaign)))];
  const filtered  = items.filter(i => campaign === "all" || i.campaign === campaign);
  const pending   = filtered.filter(i => i.status === "pending");

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function approve(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: "approved" as ReviewStatus } : i));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  }

  function requestChanges(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: "changes_requested" as ReviewStatus } : i));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  }

  function bulkApprove() {
    const ids = Array.from(selected);
    setItems(prev => prev.map(i => ids.includes(i.id) ? { ...i, status: "approved" as ReviewStatus } : i));
    setSelected(new Set());
  }

  const allPendingSelected = pending.length > 0 && pending.every(i => selected.has(i.id));

  function toggleSelectAll() {
    if (allPendingSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pending.map(i => i.id)));
    }
  }

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", overflow: "hidden" }}>

      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        padding: "12px 16px", borderBottom: "1px solid var(--sd-border-light)",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Content Approval
          </span>
          {pending.length > 0 && (
            <Badge label={String(pending.length)} tone="orange" variant="count" />
          )}
        </div>

        {/* Campaign filter */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <IconFilter size={14} style={{ color: "var(--sd-font-tertiary)", marginTop: 6 }} />
          {campaigns.map(c => (
            <Button
              key={c}
              size="sm"
              variant={campaign === c ? "primary" : "secondary"}
              onClick={() => setCampaign(c)}
            >
              {c === "all" ? "All campaigns" : c}
            </Button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "8px 16px", borderBottom: "1px solid var(--sd-border-light)",
        background: "var(--sd-bg-secondary)",
      }}>
        <Checkbox
          checked={allPendingSelected}
          onChange={toggleSelectAll}
          size="sm"
        />
        <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Creator / Content
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Submitted
        </span>
      </div>

      {/* Rows */}
      {filtered.length === 0 ? (
        <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--sd-font-tertiary)", fontSize: "var(--sd-text-sm)" }}>
          No content to review for this campaign.
        </div>
      ) : (
        filtered.map(item => (
          <ReviewRow
            key={item.id}
            item={item}
            selected={selected.has(item.id)}
            onToggleSelect={() => toggleSelect(item.id)}
            onApprove={() => approve(item.id)}
            onRequestChanges={() => requestChanges(item.id)}
          />
        ))
      )}

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 16px",
          background: "var(--sd-bg-inverted)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-inverted)", flex: 1 }}>
            {selected.size} selected
          </span>
          <Button
            variant="secondary" size="sm"
            leftIcon={<IconBolt size={13} />}
            onClick={bulkApprove}
          >
            Approve all
          </Button>
          <Button
            variant="secondary" size="sm"
            leftIcon={<IconMessageDots size={13} />}
          >
            Request changes
          </Button>
          <Button
            variant="secondary" size="sm"
            leftIcon={<IconCircleX size={13} />}
          >
            Reject all
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
  slug: "approval-queue",
  title: "Approval Queue",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Content review queue — pending submissions across campaigns with approve, request-changes, and bulk actions.",
  description:
    "The Approval Queue consolidates all content submissions awaiting brand review into a single actionable list. Each row shows a thumbnail with duration, creator avatar and name, content type, campaign tag, brief excerpt, and per-item Approve / Request Changes / Reject buttons. Filter by campaign to focus review. Select multiple pending items for bulk approval. Approved or flagged items update in place. Pairs with `ContentApprovalModal` for deep-dive review, and `MediaGallery` for asset browsing.",
  demos: [
    {
      title: "Approval Queue",
      description: "6 submissions across 3 campaigns. Filter by campaign, approve/reject individually, or select multiple for bulk actions.",
      block: true,
      render: () => <ApprovalQueue />,
    },
  ],
  props: [],
};

export default doc;
