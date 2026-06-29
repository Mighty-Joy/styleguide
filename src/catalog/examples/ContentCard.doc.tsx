"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import { PlatformIcon } from "@/components/ui/PlatformIcon/PlatformIcon";
import {
  IconPlayerPlay,
  IconFileText,
  IconPhoto,
  IconMessageCircle,
  IconDotsVertical,
  IconLink,
  IconCalendar,
  IconExternalLink,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

type ContentStatus =
  | "awaiting_content"
  | "content_ready"
  | "script_ready"
  | "in_review"
  | "approved"
  | "published"
  | "revision_needed";

const STATUS_BADGE: Record<
  ContentStatus,
  { label: string; tone: "gray" | "blue" | "orange" | "green" | "purple" | "red" | "turquoise" }
> = {
  awaiting_content: { label: "Awaiting content", tone: "gray" },
  content_ready:    { label: "Content ready",    tone: "blue" },
  script_ready:     { label: "Script ready",     tone: "purple" },
  in_review:        { label: "In review",        tone: "orange" },
  approved:         { label: "Approved",         tone: "green" },
  published:        { label: "Published",        tone: "turquoise" },
  revision_needed:  { label: "Revision needed",  tone: "red" },
};

type MediaType = "video" | "image" | "document";

const MEDIA_ICON: Record<MediaType, React.ReactNode> = {
  video:    <IconPlayerPlay size={20} />,
  image:    <IconPhoto size={20} />,
  document: <IconFileText size={20} />,
};

const THUMB_BG: Record<MediaType, string> = {
  video:    "linear-gradient(135deg,#6d28d9,#a855f7)",
  image:    "linear-gradient(135deg,#0369a1,#38bdf8)",
  document: "linear-gradient(135deg,#374151,#6b7280)",
};

interface ContentCardProps {
  title: string;
  mediaType: MediaType;
  platform: "instagram" | "tiktok" | "youtube";
  creator: { name: string; followers: string };
  deal: { name: string; value: string };
  dueDate: string;
  commentCount: number;
  status: ContentStatus;
  onReview?: () => void;
}

function ContentCard({
  title,
  mediaType,
  platform,
  creator,
  deal,
  dueDate,
  commentCount,
  status,
  onReview,
}: ContentCardProps) {
  const { label, tone } = STATUS_BADGE[status];

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "14px 16px",
        background: "#fff",
        border: "1px solid var(--sd-border-default, #ebebeb)",
        borderRadius: 10,
        alignItems: "flex-start",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          background: THUMB_BG[mediaType],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {MEDIA_ICON[mediaType]}
        {/* Platform badge */}
        <span
          style={{
            position: "absolute",
            bottom: -4,
            right: -4,
            background: "#fff",
            borderRadius: "50%",
            padding: 2,
            lineHeight: 1,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
          }}
        >
          <PlatformIcon platform={platform} size={12} />
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: "var(--sd-font-primary, #333)", lineHeight: 1.3 }}>
            {title}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Badge label={label} tone={tone} dot />
            <Dropdown
              trigger={
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--sd-font-tertiary, #999)",
                    padding: 2,
                    borderRadius: 4,
                  }}
                >
                  <IconDotsVertical size={16} />
                </button>
              }
              sections={[
                [
                  { key: "brief", label: "Open brief", icon: IconExternalLink },
                  { key: "link",  label: "Copy link",  icon: IconLink },
                ],
                [
                  { key: "revision", label: "Request revision", destructive: true },
                ],
              ]}
            />
          </div>
        </div>

        {/* Creator chip + deal link + date */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          {/* Creator chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Avatar name={creator.name} size="sm" />
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-primary, #333)" }}>
              {creator.name}
            </span>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
              <PlatformIcon platform={platform} size={11} />
            </span>
            <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #666)" }}>{creator.followers}</span>
          </div>

          {/* Deal link */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-font-tertiary, #999)", fontSize: 12 }}>
            <IconLink size={11} />
            <span style={{ color: "var(--sd-font-secondary, #666)" }}>
              {deal.name} · {deal.value}
            </span>
          </div>

          {/* Due date */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-font-tertiary, #999)", fontSize: 12 }}>
            <IconCalendar size={11} />
            <span>{dueDate}</span>
          </div>

          {/* Comments */}
          {commentCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-font-tertiary, #999)", fontSize: 12 }}>
              <IconMessageCircle size={11} />
              <span>{commentCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Review action */}
      {(status === "content_ready" || status === "in_review") && (
        <Button variant="secondary" size="sm" onClick={onReview} style={{ flexShrink: 0 }}>
          Review
        </Button>
      )}
    </div>
  );
}

/* ---- Demo data ---- */
const CARDS: ContentCardProps[] = [
  {
    title: "Atlas X Unboxing — Reel v2",
    mediaType: "video",
    platform: "instagram",
    creator: { name: "Priya Nair", followers: "128k" },
    deal: { name: "Atlas X", value: "$15k" },
    dueDate: "Aug 12",
    commentCount: 3,
    status: "content_ready",
  },
  {
    title: "Hero TikTok — 30s cut",
    mediaType: "video",
    platform: "tiktok",
    creator: { name: "Diego Santos", followers: "96k" },
    deal: { name: "Atlas X", value: "$11k" },
    dueDate: "Aug 14",
    commentCount: 0,
    status: "awaiting_content",
  },
  {
    title: "Day-in-the-life — script",
    mediaType: "document",
    platform: "tiktok",
    creator: { name: "Marcus Webb", followers: "210k" },
    deal: { name: "Atlas X", value: "$22k" },
    dueDate: "Aug 20",
    commentCount: 1,
    status: "script_ready",
  },
  {
    title: "Summer Lookbook Carousel",
    mediaType: "image",
    platform: "instagram",
    creator: { name: "Hana Kim", followers: "340k" },
    deal: { name: "Atlas X", value: "$18k" },
    dueDate: "Aug 25",
    commentCount: 0,
    status: "in_review",
  },
  {
    title: "Brand Story — YouTube integration",
    mediaType: "video",
    platform: "youtube",
    creator: { name: "Liam Park", followers: "890k" },
    deal: { name: "Atlas X", value: "$45k" },
    dueDate: "Sep 1",
    commentCount: 7,
    status: "approved",
  },
];

function Demo() {
  const [cards, setCards] = useState(CARDS);

  function approve(i: number) {
    setCards((prev) =>
      prev.map((c, idx) =>
        idx === i ? { ...c, status: "approved" as ContentStatus } : c
      )
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 680 }}>
      {cards.map((c, i) => (
        <ContentCard key={i} {...c} onReview={() => approve(i)} />
      ))}
    </div>
  );
}

/* ---- Doc ---- */
const doc: ComponentDoc = {
  slug: "content-card",
  title: "ContentCard",
  group: "Patterns",
  status: "stable",
  summary:
    "The canonical content piece card — thumbnail · title · creator chip · deal link · status · review action.",
  description:
    "Mirrors the Content card pattern in the Full Showcase. Shows a colored thumbnail (video/image/doc), content title, inline creator chip with platform + followers, deal reference, due date, comment count, status badge, and contextual Review CTA. Composes Avatar, Badge, Button, Dropdown, and PlatformIcon — no Core Component imports.",
  demos: [
    {
      title: "Content list",
      description: "Five content pieces across statuses — Ready triggers a Review button.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
