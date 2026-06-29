"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconMessageCircle,
  IconAlertCircle,
  IconCircleCheck,
  IconSend,
  IconX,
  IconClock,
  IconBrandInstagram,
  IconDotsVertical,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type RevisionStatus = "open" | "in_progress" | "resolved";

interface Revision {
  id: string;
  author: { initials: string; tone: keyof typeof TONES; name: string; role: string };
  timestamp: string;
  body: string;
  status: RevisionStatus;
  timestamp_sec?: string;
}

/* ---- seed ---- */

const REVISIONS: Revision[] = [
  {
    id: "r1",
    author: { initials: "SC", tone: "purple", name: "Sara Chen", role: "Coordinator" },
    timestamp: "Jun 28 · 2:14 PM",
    timestamp_sec: "0:04",
    body: "Product isn't visible until the 5-second mark — we need it on screen within the first 3 seconds to meet the usage brief.",
    status: "open",
  },
  {
    id: "r2",
    author: { initials: "JO", tone: "blue", name: "Jamie Okafor", role: "Manager" },
    timestamp: "Jun 28 · 2:31 PM",
    timestamp_sec: "0:18",
    body: "The claim \"reduces redness in 24 hours\" needs to be replaced with \"visibly calms skin\" — Legal flagged the time-bound claim.",
    status: "open",
  },
  {
    id: "r3",
    author: { initials: "SC", tone: "purple", name: "Sara Chen", role: "Coordinator" },
    timestamp: "Jun 27 · 4:05 PM",
    timestamp_sec: "0:29",
    body: "End card needs the campaign hashtag #SummerGlowAura — currently missing.",
    status: "resolved",
  },
];

const STATUS_META: Record<RevisionStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  open:        { label: "Open",        tone: "yellow", Icon: IconAlertCircle  },
  in_progress: { label: "In progress", tone: "blue",   Icon: IconClock        },
  resolved:    { label: "Resolved",    tone: "green",  Icon: IconCircleCheck  },
};

/* ---- Revision row ---- */

function RevisionRow({ rev, onResolve }: { rev: Revision; onResolve: (id: string) => void }) {
  const { Icon, tone, label } = STATUS_META[rev.status];
  const [expanded, setExpanded] = useState(rev.status !== "resolved");

  return (
    <div style={{
      borderRadius: 10, border: "1px solid",
      borderColor: rev.status === "resolved" ? "var(--sd-border-default, #e5e7eb)" : rev.status === "open" ? TONES.yellow.tint : TONES.blue.tint,
      overflow: "hidden",
      background: rev.status === "resolved" ? "var(--sd-bg-secondary, #f9f9f9)" : "#fff",
      opacity: rev.status === "resolved" ? 0.75 : 1,
    }}>
      {/* Header */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", cursor: "pointer" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <Avatar initials={rev.author.initials} tone={rev.author.tone} size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>{rev.author.name}</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{rev.timestamp}</div>
        </div>
        {rev.timestamp_sec && (
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", background: "var(--sd-bg-tertiary, #f1f1f1)", padding: "2px 7px", borderRadius: 99, flexShrink: 0, fontFamily: "monospace" }}>
            {rev.timestamp_sec}
          </div>
        )}
        <Badge label={label} tone={tone} size="sm" />
        {rev.status === "open" && (
          <button
            onClick={(e) => { e.stopPropagation(); onResolve(rev.id); }}
            title="Mark resolved"
            style={{ display: "flex", background: "none", border: "none", cursor: "pointer", color: TONES.green.text, padding: 2 }}
          >
            <IconCheck size={14} />
          </button>
        )}
      </div>

      {/* Body */}
      {expanded && (
        <div style={{ padding: "0 12px 12px 12px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", paddingTop: 10 }}>
          <p style={{ fontSize: 12, color: "var(--sd-font-primary, #111)", margin: 0, lineHeight: 1.6 }}>
            {rev.body}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [revisions, setRevisions] = useState(REVISIONS);
  const [newNote, setNewNote] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [approved, setApproved] = useState(false);

  const openCount = revisions.filter((r) => r.status === "open").length;
  const allResolved = revisions.every((r) => r.status === "resolved");

  function resolve(id: string) {
    setRevisions((rs) => rs.map((r) => r.id === id ? { ...r, status: "resolved" as RevisionStatus } : r));
  }

  function addNote() {
    if (!newNote.trim()) return;
    setRevisions((rs) => [
      {
        id: `r${Date.now()}`,
        author: { initials: "JO", tone: "blue" as const, name: "Jamie Okafor", role: "Manager" },
        timestamp: "Just now",
        timestamp_sec: timestamp || undefined,
        body: newNote.trim(),
        status: "open",
      },
      ...rs,
    ]);
    setNewNote("");
    setTimestamp("");
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 580 }}>
      {/* Content preview strip */}
      <div style={{ display: "flex", gap: 12, padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 16, background: "#fff" }}>
        {/* Thumbnail placeholder */}
        <div style={{ width: 72, height: 72, borderRadius: 8, background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconBrandInstagram size={22} style={{ color: "rgba(255,255,255,0.8)" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Summer Reel v2.mp4</span>
            <Badge label="Draft" tone="yellow" size="sm" />
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginBottom: 8 }}>Priya Nair · IG Reel · Submitted Jun 28 · 00:28</div>
          <div style={{ display: "flex", gap: 6 }}>
            <Badge label={`${openCount} open`} tone={openCount > 0 ? "yellow" : "green"} dot size="sm" />
            <Badge label={`${revisions.filter(r => r.status === "resolved").length} resolved`} tone="gray" size="sm" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {approved ? (
            <Button variant="primary" size="sm" leftIcon={<IconCircleCheck size={13} />} disabled>
              Approved
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<IconCheck size={13} />}
              disabled={!allResolved}
              onClick={() => setApproved(true)}
            >
              Approve
            </Button>
          )}
        </div>
      </div>

      {/* Revision list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {revisions.map((r) => (
          <RevisionRow key={r.id} rev={r} onResolve={resolve} />
        ))}
        {revisions.length === 0 && (
          <div style={{ padding: "32px 0", textAlign: "center", fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>
            No revision notes yet.
          </div>
        )}
      </div>

      {/* Add revision note */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6 }}>
          <IconMessageCircle size={12} />
          Add revision note
        </div>
        <div style={{ padding: "12px 14px" }}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Describe what needs to change and why…"
            rows={3}
            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, lineHeight: 1.6, fontFamily: "inherit", outline: "none", resize: "vertical", marginBottom: 10 }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: 90 }}>
              <input
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="0:00"
                style={{ width: "100%", height: 32, padding: "0 8px", borderRadius: 8, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "monospace", outline: "none", textAlign: "center" }}
              />
            </div>
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>timecode (optional)</span>
            <div style={{ marginLeft: "auto" }}>
              <Button
                variant="primary"
                size="sm"
                disabled={!newNote.trim()}
                leftIcon={<IconSend size={12} />}
                onClick={addNote}
              >
                Add note
              </Button>
            </div>
          </div>
        </div>
      </div>

      {allResolved && !approved && (
        <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 10, background: TONES.green.tint, fontSize: 12, color: TONES.green.text, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <IconCircleCheck size={14} />
          All revisions resolved — you can now approve this draft.
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "revision-request-panel",
  title: "RevisionRequestPanel",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand-side revision workflow — content preview strip, timestamped revision notes with open/resolved status, and add-note form with timecode input.",
  description:
    "The content review surface for brand managers. Content strip: thumbnail, file name, creator, draft badge, open/resolved counts, Approve button (locked until all revisions resolved). Revision list: each note shows avatar, author, timestamp, optional video timecode badge, body text, open/in-progress/resolved status badge, and a one-click resolve checkmark. Resolved notes collapse and dim. Add-note form: free-text area + optional timecode field. Approve button goes green and disabled once clicked. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Revision request panel",
      description: "Click the ✓ on any open revision to mark it resolved. Add new notes with timecodes. Approve unlocks once all revisions are resolved.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
