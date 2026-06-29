"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconEdit,
  IconMessage,
  IconPhoto,
  IconVideo,
  IconArrowRight,
  IconChevronDown,
  IconChevronUp,
  IconDownload,
  IconEye,
  IconSend,
  IconCircleCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type VersionStatus = "approved" | "revision_requested" | "submitted" | "draft";

interface RevisionNote {
  id: string;
  from: "brand" | "creator";
  text: string;
  timestamp: string;
}

interface ContentVersion {
  id: string;
  version: number;
  status: VersionStatus;
  submittedAt: string;
  thumbnail: string;
  notes: RevisionNote[];
  resolvedAt?: string;
}

const STATUS_META: Record<VersionStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  approved:           { label: "Approved",           tone: "green",  icon: IconCircleCheck   },
  revision_requested: { label: "Revision requested", tone: "yellow", icon: IconAlertTriangle },
  submitted:          { label: "Under review",       tone: "blue",   icon: IconEye           },
  draft:              { label: "Draft",              tone: "gray",   icon: IconEdit          },
};

const VERSIONS: ContentVersion[] = [
  {
    id: "v3",
    version: 3,
    status: "submitted",
    submittedAt: "Jun 28, 2025 · 11:45 AM",
    thumbnail: "linear-gradient(135deg,#d1fae5,#10b981)",
    notes: [
      { id: "n1", from: "creator", text: "Reshot with better lighting. Adjusted the hook to lead with the texture demo as requested. Added the SPF layering scene in the last 10 seconds.", timestamp: "Jun 28 · 11:45 AM" },
    ],
  },
  {
    id: "v2",
    version: 2,
    status: "revision_requested",
    submittedAt: "Jun 25, 2025 · 3:20 PM",
    resolvedAt: "Jun 28 — addressed in v3",
    thumbnail: "linear-gradient(135deg,#fde68a,#f59e0b)",
    notes: [
      { id: "n2", from: "creator", text: "Updated the hook to be more energetic. Included the Aura Gold serum close-up at 0:12 as requested. Removed the competitor mention.", timestamp: "Jun 25 · 3:20 PM" },
      { id: "n3", from: "brand", text: "Great improvement on the hook! Two small things: (1) the lighting in the bathroom scene is a bit dark — if you can reshoot with natural light that would be ideal, and (2) please add the SPF layering CTA in the final 10 seconds.", timestamp: "Jun 26 · 9:12 AM" },
    ],
  },
  {
    id: "v1",
    version: 1,
    status: "revision_requested",
    submittedAt: "Jun 22, 2025 · 2:00 PM",
    resolvedAt: "Jun 25 — addressed in v2",
    thumbnail: "linear-gradient(135deg,#ede9fe,#7c3aed)",
    notes: [
      { id: "n4", from: "creator", text: "First submission for the Summer Glow reel. 63s, includes unboxing, serum application, and morning routine sequence.", timestamp: "Jun 22 · 2:00 PM" },
      { id: "n5", from: "brand", text: "Thanks Priya — love the routine sequence! Three revision requests: (1) the opening hook needs to be stronger — lead with the glow result, not the unboxing; (2) we spotted a mention of a competitor brand at 0:34 — please cut that segment; (3) can you add a close-up of the serum bottle at the Aura Gold reveal moment?", timestamp: "Jun 23 · 10:05 AM" },
    ],
  },
];

/* ---- Demo ---- */
function Demo() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["v3", "v2"]));
  const [replyText, setReplyText] = useState("");
  const [replied, setReplied] = useState(false);

  function toggleVersion(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function sendReply() {
    setReplied(true);
    setReplyText("");
    setTimeout(() => setReplied(false), 2000);
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Content revision history</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Priya Nair · Summer Glow Reel · v{VERSIONS.length} submitted</div>
        </div>
        <Badge label="Under review" tone="blue" size="sm" dot />
      </div>

      {/* Version timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {VERSIONS.map((ver, vi) => {
          const { label, tone, icon: SIcon } = STATUS_META[ver.status];
          const isOpen = expanded.has(ver.id);
          const isLatest = vi === 0;

          return (
            <div key={ver.id} style={{ border: `1px solid ${isLatest ? TONES.blue.text + "40" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 12, overflow: "hidden", background: isLatest ? `${TONES.blue.tint}30` : "#fff" }}>
              {/* Version header */}
              <button onClick={() => toggleVersion(ver.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {/* Thumbnail */}
                <div style={{ width: 40, height: 28, borderRadius: 6, background: ver.thumbnail, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 800 }}>Version {ver.version}</span>
                    {isLatest && <Badge label="Latest" tone="blue" size="sm" />}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{ver.submittedAt}</div>
                </div>
                <Badge label={label} tone={tone} size="sm" dot />
                {isOpen ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />}
              </button>

              {/* Expanded */}
              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {/* Notes thread */}
                  <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {ver.notes.map((note) => {
                      const isBrand = note.from === "brand";
                      return (
                        <div key={note.id} style={{ display: "flex", gap: 8, alignSelf: isBrand ? "flex-start" : "flex-end", maxWidth: "88%" }}>
                          {isBrand && <Avatar initials="AL" tone="orange" size="sm" />}
                          <div style={{ background: isBrand ? "#fff" : TONES.blue.tint, borderRadius: isBrand ? "4px 10px 10px 10px" : "10px 4px 10px 10px", padding: "9px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", marginBottom: 4 }}>
                              {isBrand ? "Aura Labs" : "Priya Nair"} · {note.timestamp}
                            </div>
                            <div style={{ fontSize: 11, lineHeight: 1.55 }}>{note.text}</div>
                          </div>
                          {!isBrand && <Avatar initials="PN" tone="green" size="sm" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Resolved note */}
                  {ver.resolvedAt && (
                    <div style={{ margin: "0 14px 10px", padding: "6px 10px", background: TONES.green.tint, borderRadius: 7, fontSize: 10, color: TONES.green.text, fontWeight: 700, display: "flex", gap: 6, alignItems: "center" }}>
                      <IconCircleCheck size={11} />
                      {ver.resolvedAt}
                    </div>
                  )}

                  {/* Actions for latest version */}
                  {isLatest && (
                    <div style={{ padding: "0 14px 12px" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <Button variant="primary"   size="sm" leftIcon={<IconCheck size={11} />} style={{ flex: 1, background: TONES.green.text, borderColor: TONES.green.text }}>Approve</Button>
                        <Button variant="secondary" size="sm" leftIcon={<IconEdit  size={11} />}>Request revision</Button>
                        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Download</Button>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ flex: 1, display: "flex", gap: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "7px 12px", alignItems: "center", background: "#fff" }}>
                          <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Add a note…"
                            style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }} />
                        </div>
                        <Button variant="secondary" size="sm" leftIcon={replied ? <IconCheck size={11} /> : <IconSend size={11} />} onClick={sendReply} disabled={!replyText.trim()}>
                          {replied ? "Sent" : "Send"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "content-revision-history",
  title: "ContentRevisionHistory",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Full version history of content through approval cycles — gradient version thumbnails, chat-bubble revision threads, resolved badges, and Approve/Request revision CTAs on the latest.",
  description:
    "Shows the complete audit trail of a creator's content submission through revision rounds. Header: creator name, content type, version count, current status badge. 3 version accordion cards (v3 latest, v1 oldest): each header has a gradient color thumbnail, version number, 'Latest' badge (v3 only), submission timestamp, status badge (Under review / Revision requested); expand chevron. Expanded: chat-bubble thread alternating between brand (left, AL avatar, white bubble) and creator (right, PN avatar, blue tint bubble), each with sender name + timestamp. Resolved versions show a green 'addressed in vN' banner. Latest version (v3) footer: Approve (green primary), Request revision, Download; free-text note input + Send. Pre-seeded: v1 — creator submits → brand requests hook/competitor/close-up fixes → resolved; v2 — creator addresses → brand requests lighting + SPF CTA → resolved; v3 — creator addresses both → currently under review. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Content revision history",
      description: "v3 and v2 expanded by default. Click any version header to expand/collapse. Latest version (v3) has Approve / Request revision / Download CTAs and a reply input.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
