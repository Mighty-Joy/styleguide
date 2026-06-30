"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconMessageCircle,
  IconCheck,
  IconX,
  IconPlus,
  IconSend,
  IconPhoto,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type ReviewStatus = "submitted" | "reviewing" | "revision" | "approved";
type FeedbackStatus = "open" | "resolved";

interface Comment {
  id: string;
  pin: number;
  author: string;
  initials: string;
  tone: "blue" | "orange" | "purple";
  time: string;
  text: string;
  status: FeedbackStatus;
}

const STATUS_FLOW: { key: ReviewStatus; label: string; tone: keyof typeof TONES }[] = [
  { key: "submitted", label: "Submitted",  tone: "blue"   },
  { key: "reviewing", label: "Reviewing",  tone: "orange" },
  { key: "revision",  label: "Revision",   tone: "red"    },
  { key: "approved",  label: "Approved",   tone: "green"  },
];

const INIT_COMMENTS: Comment[] = [
  { id: "c1", pin: 1, author: "Alyssa Park",   initials: "AP", tone: "blue",   time: "2h ago",  text: "Love the lighting here — really captures the glow. Can you add the #AuraLabs hashtag in the caption?", status: "resolved" },
  { id: "c2", pin: 2, author: "Alyssa Park",   initials: "AP", tone: "blue",   time: "2h ago",  text: "The product isn't visible enough at the 0:08 mark — please do a close-up of the Luminos bottle here.",    status: "open"     },
  { id: "c3", pin: 3, author: "Dev Kapoor",    initials: "DK", tone: "purple", time: "45m ago", text: "Voiceover audio is a bit low — can you boost it 3–4dB? Otherwise the video is great!",                    status: "open"     },
];

const CONTENT_MOCK_ROWS = [
  { y: "10%",  opacity: 0.15, width: "80%"  },
  { y: "22%",  opacity: 0.25, width: "60%"  },
  { y: "34%",  opacity: 0.18, width: "70%"  },
  { y: "50%",  opacity: 0.22, width: "50%"  },
  { y: "62%",  opacity: 0.15, width: "65%"  },
  { y: "74%",  opacity: 0.18, width: "55%"  },
];

const PIN_POSITIONS: { x: string; y: string }[] = [
  { x: "72%", y: "18%" },
  { x: "38%", y: "55%" },
  { x: "60%", y: "72%" },
];

function Demo() {
  const [comments,   setComments]   = useState<Comment[]>(INIT_COMMENTS);
  const [status,     setStatus]     = useState<ReviewStatus>("reviewing");
  const [newText,    setNewText]    = useState("");
  const [activePin,  setActivePin]  = useState<number | null>(null);
  const [approved,   setApproved]   = useState(false);

  function resolve(id: string) {
    setComments((p) => p.map((c) => c.id === id ? { ...c, status: "resolved" } : c));
  }
  function reopen(id: string) {
    setComments((p) => p.map((c) => c.id === id ? { ...c, status: "open" } : c));
  }
  function addComment() {
    if (!newText.trim()) return;
    const next = comments.length + 1;
    setComments((p) => [...p, { id: `c${Date.now()}`, pin: next, author: "You", initials: "YO", tone: "orange", time: "just now", text: newText.trim(), status: "open" }]);
    setNewText("");
  }
  function approve() {
    setStatus("approved");
    setApproved(true);
  }
  function requestRevision() {
    setStatus("revision");
  }

  const open     = comments.filter((c) => c.status === "open").length;
  const resolved = comments.filter((c) => c.status === "resolved").length;
  const allClear = open === 0;

  const statusIdx = STATUS_FLOW.findIndex((s) => s.key === status);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>Draft review</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Priya Nair · Summer Glow Reel #1</div>
        </div>
        <Badge label={STATUS_FLOW[statusIdx].label} tone={STATUS_FLOW[statusIdx].tone} />
      </div>

      {/* Status stepper */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 14 }}>
        {STATUS_FLOW.map((s, i) => {
          const done    = i < statusIdx;
          const current = i === statusIdx;
          return (
            <React.Fragment key={s.key}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 18, height: 18, borderRadius: 99, border: `2px solid ${current ? TONES[s.tone].text : done ? TONES.green.text : "var(--sd-border-default,#e5e7eb)"}`, background: done ? TONES.green.text : current ? TONES[s.tone].tint : "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {done && <IconCheck size={9} style={{ color: "#fff" }} />}
                </div>
                <span style={{ fontSize: 8, fontWeight: current ? 800 : 500, color: current ? TONES[s.tone].text : done ? TONES.green.text : "var(--sd-font-tertiary,#bbb)", whiteSpace: "nowrap" }}>{s.label}</span>
              </div>
              {i < STATUS_FLOW.length - 1 && (
                <div style={{ flex: 1, height: 2, background: done ? TONES.green.text : "var(--sd-border-default,#e5e7eb)", marginBottom: 14, marginLeft: 2, marginRight: 2 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Content preview mock + pin markers */}
      <div style={{ position: "relative", borderRadius: 11, overflow: "hidden", background: "var(--sd-bg-secondary,#f4f4f5)", marginBottom: 12, height: 180, border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
        {/* Gradient mock video frame */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #f9e4e0 0%, #f3d7e8 40%, #dbe8f8 100%)", opacity: 0.7 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconPhoto size={28} style={{ color: "rgba(0,0,0,0.15)" }} />
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 9, fontWeight: 700, color: "rgba(0,0,0,0.4)", background: "rgba(255,255,255,0.7)", padding: "2px 5px", borderRadius: 4 }}>
          Draft · 0:23
        </div>
        {/* Pin markers */}
        {comments.map((c) => {
          const pos = PIN_POSITIONS[c.pin - 1] || { x: "50%", y: "50%" };
          const isActive = activePin === c.pin;
          return (
            <button key={c.id} onClick={() => setActivePin(isActive ? null : c.pin)}
              style={{ position: "absolute", left: pos.x, top: pos.y, transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: 99, background: c.status === "resolved" ? TONES.green.text : isActive ? "#111" : TONES.orange.text, border: "2px solid white", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", cursor: "pointer", fontSize: 9, fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              {c.pin}
            </button>
          );
        })}
      </div>

      {/* Comment summary */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, padding: "7px 10px", borderRadius: 8, background: open > 0 ? TONES.orange.tint : TONES.green.tint, display: "flex", gap: 6, alignItems: "center" }}>
          {open > 0 ? <IconAlertCircle size={12} style={{ color: TONES.orange.text }} /> : <IconCircleCheck size={12} style={{ color: TONES.green.text }} />}
          <span style={{ fontSize: 11, fontWeight: 700, color: open > 0 ? TONES.orange.text : TONES.green.text }}>{open > 0 ? `${open} open` : "All resolved"}</span>
        </div>
        <div style={{ flex: 1, padding: "7px 10px", borderRadius: 8, background: "var(--sd-bg-secondary,#f4f4f5)", display: "flex", gap: 6, alignItems: "center" }}>
          <IconCheck size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
          <span style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)" }}>{resolved} resolved</span>
        </div>
      </div>

      {/* Comments list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {comments.map((c) => {
          const isHighlighted = activePin === c.pin;
          return (
            <div key={c.id} onClick={() => setActivePin(isHighlighted ? null : c.pin)}
              style={{ display: "flex", gap: 9, padding: "9px 11px", borderRadius: 10, border: `1.5px solid ${isHighlighted ? "#111" : "var(--sd-border-default,#e5e7eb)"}`, background: c.status === "resolved" ? "var(--sd-bg-secondary,#f9f9f9)" : "white", cursor: "pointer", opacity: c.status === "resolved" ? 0.7 : 1 }}>
              <div style={{ width: 18, height: 18, borderRadius: 99, background: c.status === "resolved" ? TONES.green.text : TONES.orange.text, color: "#fff", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                {c.pin}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
                  <Avatar initials={c.initials} tone={c.tone} size="sm" />
                  <span style={{ fontSize: 10, fontWeight: 700 }}>{c.author}</span>
                  <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{c.time}</span>
                  {c.status === "resolved" && <Badge label="Resolved" tone="green" size="sm" />}
                </div>
                <div style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)", lineHeight: 1.5 }}>{c.text}</div>
              </div>
              <div onClick={(e) => { e.stopPropagation(); c.status === "open" ? resolve(c.id) : reopen(c.id); }}
                style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, alignSelf: "flex-start" }}>
                {c.status === "open" ? <IconCheck size={11} style={{ color: TONES.green.text }} /> : <IconX size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add comment */}
      <div style={{ display: "flex", gap: 7, alignItems: "flex-end", marginBottom: 14 }}>
        <textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Add feedback or a revision request…" rows={2}
          style={{ flex: 1, padding: "8px 10px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, fontSize: 11, fontFamily: "inherit", resize: "none", outline: "none" }} />
        <button onClick={addComment} disabled={!newText.trim()}
          style={{ width: 34, height: 34, borderRadius: 9, background: newText.trim() ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: newText.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconSend size={13} style={{ color: newText.trim() ? "#fff" : "var(--sd-font-tertiary,#bbb)" }} />
        </button>
      </div>

      {/* Final actions */}
      {status !== "approved" && (
        <div style={{ display: "flex", gap: 7 }}>
          <Button variant="primary" size="sm" leftIcon={<IconCheck size={11} />}
            onClick={approve} disabled={!allClear} style={{ flex: 1 }}>
            {allClear ? "Approve draft" : `Resolve ${open} comment${open > 1 ? "s" : ""} first`}
          </Button>
          <Button variant="secondary" size="sm" onClick={requestRevision} style={{ flex: 1 }}>
            Request revision
          </Button>
        </div>
      )}
      {status === "approved" && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 14px", background: TONES.green.tint, borderRadius: 10 }}>
          <IconCircleCheck size={16} style={{ color: TONES.green.text }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: TONES.green.text }}>Draft approved — Priya can now publish!</span>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-draft-feedback",
  title: "CampaignDraftFeedback",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand reviews a creator's draft content — numbered pin markers on the content preview, timestamped comments with resolve/reopen, add-comment textarea, and Approve / Request revision CTAs.",
  description:
    "Brand team leaves structured feedback on a creator's submitted draft before it can be published. Header: 'Draft review', creator name + deliverable, status badge. 4-step status stepper (Submitted → Reviewing → Revision → Approved) with green ticks for completed steps and colored dot for current. Content preview mock: gradient placeholder (180px), day number + duration badge, 3 numbered orange pins positioned on the frame — click a pin to highlight the matching comment card. Comment summary strip: open count (orange tint) vs resolved count (green when 0). Comment cards: numbered pin dot (orange=open / green=resolved / black=selected), Avatar sm, reviewer name, timestamp, text, resolve checkbox (✓ = resolve, ✗ = reopen). Badge 'Resolved' on closed items. Cards dim to 70% when resolved. Add feedback: textarea + send button (enabled when non-empty). Final actions: 'Approve draft' primary CTA — disabled until all comments resolved, label shows remaining count; 'Request revision' secondary — sets status to Revision. Approve → green success banner. Pre-seeded: 3 comments (1 resolved: hashtag, 2 open: bottle close-up, audio). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Draft content review",
      description: "Click a numbered pin on the content preview to highlight its comment. Resolve comments with the ✓ button. Once all 2 open comments are resolved, the Approve button enables.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
