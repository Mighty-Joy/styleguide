"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconEdit,
  IconMessageCircle,
  IconBrandInstagram,
  IconBrandTiktok,
  IconClock,
  IconPhoto,
  IconVideo,
  IconFilter,
  IconChevronDown,
  IconAlertCircle,
  IconEye,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type ContentStatus = "pending" | "approved" | "revision" | "live";
type ContentType   = "reel" | "feed" | "story" | "tiktok";

interface ContentCard {
  id: string;
  creatorName: string;
  creatorInitials: string;
  creatorTone: string;
  platform: "instagram" | "tiktok";
  type: ContentType;
  caption: string;
  gradient: string;
  submittedAt: string;
  status: ContentStatus;
  note?: string;
  revisionNote?: string;
}

const STATUS_META: Record<ContentStatus, { label: string; tone: keyof typeof TONES }> = {
  pending:  { label: "Pending review", tone: "blue"   },
  approved: { label: "Approved",       tone: "green"  },
  revision: { label: "Revision sent",  tone: "yellow" },
  live:     { label: "Live",           tone: "green"  },
};

const TYPE_ICON: Record<ContentType, React.ElementType> = {
  reel:   IconVideo,
  feed:   IconPhoto,
  story:  IconPhoto,
  tiktok: IconVideo,
};

const FEED_INIT: ContentCard[] = [
  {
    id: "f1", creatorName: "Priya Nair",   creatorInitials: "PN", creatorTone: "green",
    platform: "instagram", type: "reel",
    caption: "My summer glow routine ft. @auralabs 🌞 Use PRIYA20 for 20% off! #SummerGlow #SkincareRoutine",
    gradient: "linear-gradient(135deg,#fde68a,#f59e0b,#d97706)",
    submittedAt: "2h ago", status: "pending",
  },
  {
    id: "f2", creatorName: "Hana Kim",     creatorInitials: "HK", creatorTone: "pink",
    platform: "instagram", type: "feed",
    caption: "That dewy skin 🤍 @auralabs has been my go-to this summer. Code HANA25 saves you 25%",
    gradient: "linear-gradient(135deg,#fce7f3,#db2777,#9d174d)",
    submittedAt: "4h ago", status: "revision",
    revisionNote: "Remove the product from the bathroom counter — we need it on a neutral surface. Please repost.",
  },
  {
    id: "f3", creatorName: "Diego Santos", creatorInitials: "DS", creatorTone: "orange",
    platform: "tiktok", type: "tiktok",
    caption: "POV: you finally found a skincare routine that works 😤 #AuraLabs #SummerGlow #FYP",
    gradient: "linear-gradient(135deg,#fed7aa,#ea580c,#9a3412)",
    submittedAt: "Yesterday", status: "approved",
  },
  {
    id: "f4", creatorName: "Aisha Obi",    creatorInitials: "AO", creatorTone: "turquoise",
    platform: "instagram", type: "story",
    caption: "Quick GRWM using my @auralabs kit 💛 Link in bio!",
    gradient: "linear-gradient(135deg,#ccfbf1,#14b8a6,#0f766e)",
    submittedAt: "Yesterday", status: "live",
  },
];

/* ---- Demo ---- */
function Demo() {
  const [feed,      setFeed]      = useState<ContentCard[]>(FEED_INIT);
  const [filter,    setFilter]    = useState<ContentStatus | "all">("all");
  const [noteOpen,  setNoteOpen]  = useState<string | null>(null);
  const [noteText,  setNoteText]  = useState("");

  function setStatus(id: string, status: ContentStatus) {
    setFeed((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  }
  function sendRevision(id: string) {
    if (!noteText.trim()) return;
    setFeed((prev) => prev.map((c) => c.id === id ? { ...c, status: "revision", revisionNote: noteText } : c));
    setNoteOpen(null);
    setNoteText("");
  }

  const counts = (["pending","approved","revision","live"] as ContentStatus[]).map((s) => ({
    status: s, count: feed.filter((c) => c.status === s).length,
  }));
  const visible = feed.filter((c) => filter === "all" || c.status === filter);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Content submissions</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow · {feed.length} pieces submitted</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconFilter size={12} />}>Filter</Button>
      </div>

      {/* Status tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => setFilter("all")}
          style={{ padding: "4px 10px", borderRadius: 99, background: filter === "all" ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: filter === "all" ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All · {feed.length}
        </button>
        {counts.map(({ status, count }) => {
          const { label, tone } = STATUS_META[status];
          const active = filter === status;
          return (
            <button key={status} onClick={() => setFilter(active ? "all" : status)}
              style={{ padding: "4px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label.split(" ")[0]} · {count}
            </button>
          );
        })}
      </div>

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visible.map((card) => {
          const { label, tone } = STATUS_META[card.status];
          const PIco   = card.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const TIco   = TYPE_ICON[card.type];
          const isNote = noteOpen === card.id;

          return (
            <div key={card.id} style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
              {/* Thumbnail */}
              <div style={{ height: 120, background: card.gradient, position: "relative" }}>
                <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
                  <Badge label={card.type.toUpperCase()} tone="gray" size="sm" />
                  <Badge label={label} tone={tone} size="sm" dot />
                </div>
                <div style={{ position: "absolute", bottom: 10, right: 10, width: 28, height: 28, borderRadius: 8, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TIco size={14} style={{ color: "#fff" }} />
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "12px 14px" }}>
                {/* Creator row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Avatar initials={card.creatorInitials} tone={card.creatorTone as any} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{card.creatorName}</div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <PIco size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                      <IconClock size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{card.submittedAt}</span>
                    </div>
                  </div>
                  <button style={{ display: "flex", gap: 4, alignItems: "center", background: "var(--sd-bg-secondary, #f1f1f1)", border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                    <IconEye size={11} />Preview
                  </button>
                </div>

                {/* Caption */}
                <p style={{ fontSize: 11, lineHeight: 1.6, color: "var(--sd-font-secondary, #555)", margin: "0 0 10px" }}>
                  {card.caption}
                </p>

                {/* Revision note */}
                {card.revisionNote && (
                  <div style={{ padding: "8px 10px", background: TONES.yellow.tint, borderRadius: 8, marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: TONES.yellow.text, marginBottom: 3 }}>Revision note sent</div>
                    <div style={{ fontSize: 11, color: TONES.yellow.text }}>{card.revisionNote}</div>
                  </div>
                )}

                {/* Revision note composer */}
                {isNote && (
                  <div style={{ marginBottom: 10 }}>
                    <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Describe the revision needed…"
                      rows={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <Button variant="primary" size="sm" onClick={() => sendRevision(card.id)}>Send revision</Button>
                      <Button variant="secondary" size="sm" onClick={() => { setNoteOpen(null); setNoteText(""); }}>Cancel</Button>
                    </div>
                  </div>
                )}

                {/* Action row */}
                {card.status === "pending" && !isNote && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="primary"   size="sm" leftIcon={<IconCheck size={11} />} onClick={() => setStatus(card.id, "approved")} style={{ flex: 1 }}>Approve</Button>
                    <Button variant="secondary" size="sm" leftIcon={<IconEdit  size={11} />} onClick={() => setNoteOpen(card.id)}>Request revision</Button>
                  </div>
                )}
                {card.status === "revision" && !isNote && (
                  <button onClick={() => setNoteOpen(card.id)}
                    style={{ fontSize: 11, fontWeight: 700, color: TONES.yellow.text, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", gap: 4, alignItems: "center" }}>
                    <IconAlertCircle size={11} />Awaiting revised submission
                  </button>
                )}
                {card.status === "approved" && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: TONES.green.text, display: "flex", gap: 4, alignItems: "center" }}>
                    <IconCheck size={11} />Approved — ready to publish
                  </span>
                )}
                {card.status === "live" && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: TONES.green.text, display: "flex", gap: 4, alignItems: "center" }}>
                    <IconCheck size={11} />Live on {card.platform}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-content-feed",
  title: "CampaignContentFeed",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand-side content submission feed — gradient thumbnails, per-status filters, inline Approve and Request revision actions with a note composer.",
  description:
    "Centralizes all creator content submissions for a campaign in a scrollable review feed. Header: title, piece count, Filter button. Status filter chips: All + Pending/Approved/Revision/Live with counts. Each card: gradient thumbnail with type and status badges, play/photo icon; creator avatar + name + platform icon + submitted time, Preview button; 2-line caption text; if revision was sent — yellow tint note block showing the feedback. Actions: Pending → Approve (primary) + Request revision (opens inline textarea → Send revision submits note and flips to revision state); Revision → 'Awaiting revised' link; Approved/Live → green checkmark label. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign content feed",
      description: "Filter by status. Click Approve on Priya's reel. Click Request revision, type a note, and send to see the yellow revision block.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
