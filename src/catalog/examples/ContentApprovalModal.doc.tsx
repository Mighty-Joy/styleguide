"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconPhoto,
  IconVideo,
  IconCircleCheck,
  IconX,
  IconAlertTriangle,
  IconHash,
  IconAt,
  IconExternalLink,
  IconPencil,
  IconEye,
  IconHeart,
  IconMessageCircle,
  IconShare,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Textarea from "@/components/ui/Textarea/Textarea";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type ReviewStatus = "pending" | "approved" | "revision_requested";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ContentDraft {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  platform: "instagram" | "tiktok";
  contentType: "reel" | "story" | "image";
  caption: string;
  hashtags: string[];
  mentions: string[];
  submittedAt: string;
  status: ReviewStatus;
  checklist: ChecklistItem[];
  stats?: { views?: number; likes?: number; comments?: number };
}

/* ------------------------------------------------------------------ */
/* Modal                                                                 */
/* ------------------------------------------------------------------ */

function ContentApprovalModal({
  draft,
  open,
  onClose,
  onApprove,
  onRevision,
}: {
  draft: ContentDraft;
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  onRevision: (note: string) => void;
}) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(draft.checklist);
  const [revisionNote, setRevisionNote] = useState("");
  const [showRevision, setShowRevision] = useState(false);
  const allChecked = checklist.every(c => c.checked);

  const toggleCheck = (id: string) =>
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));

  const PlatIcon = draft.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        zIndex: 1000, animation: "fadeIn 0.1s ease",
      }} />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 680, maxHeight: "88vh",
        background: "var(--sd-bg-primary)",
        borderRadius: "var(--sd-radius-lg, 12px)",
        boxShadow: "0 24px 64px -12px rgba(0,0,0,0.35)",
        display: "flex", flexDirection: "column",
        overflow: "hidden", zIndex: 1001,
        animation: "pop 0.12s ease",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "14px 18px",
          borderBottom: "1px solid var(--sd-border-light)", flexShrink: 0,
        }}>
          {/* Creator avatar */}
          <Avatar name={draft.creatorName} initials={draft.creatorInitials} tone={draft.creatorTone} size="lg" />

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>{draft.creatorName}</span>
              <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>{draft.creatorHandle}</span>
              <PlatIcon size={13} style={{ color: "var(--sd-font-tertiary)" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
              <Badge label={draft.contentType.toUpperCase()} tone="blue" variant="status" size="sm" />
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Submitted {draft.submittedAt}</span>
            </div>
          </div>

          {/* Status */}
          {draft.status === "approved" && (
            <Badge label="Approved" tone="green" variant="status" />
          )}
          {draft.status === "revision_requested" && (
            <Badge label="Revision requested" tone="yellow" variant="status" />
          )}

          <Button variant="ghost" iconOnly aria-label="Close" onClick={onClose}>
            <IconX size={15} />
          </Button>
        </div>

        {/* Body: 2-column */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left: content preview */}
          <div style={{
            width: 280, flexShrink: 0, borderRight: "1px solid var(--sd-border-light)",
            display: "flex", flexDirection: "column", overflowY: "auto",
          }}>
            {/* Thumbnail placeholder */}
            <div style={{
              height: 240, background: "var(--sd-bg-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {draft.contentType === "reel" ? (
                <IconVideo size={40} style={{ color: "var(--sd-font-tertiary)" }} />
              ) : (
                <IconPhoto size={40} style={{ color: "var(--sd-font-tertiary)" }} />
              )}
            </div>

            {/* Caption & meta */}
            <div style={{ padding: "14px 14px", flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Caption</div>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--sd-font-primary)", lineHeight: 1.6 }}>
                {draft.caption}
              </p>

              {draft.hashtags.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Hashtags</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {draft.hashtags.map(h => (
                      <Badge key={h} label={`#${h}`} tone="purple" variant="status" size="sm" />
                    ))}
                  </div>
                </div>
              )}

              {draft.mentions.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Mentions</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {draft.mentions.map(m => (
                      <Badge key={m} label={`@${m}`} tone="sky" variant="status" size="sm" />
                    ))}
                  </div>
                </div>
              )}

              <Button variant="tertiary" size="sm" leftIcon={<IconExternalLink size={11} />}>
                View on {draft.platform === "instagram" ? "Instagram" : "TikTok"}
              </Button>
            </div>
          </div>

          {/* Right: review */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Checklist */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-secondary)", marginBottom: 10 }}>
                Review checklist
                <span style={{ marginLeft: 6, fontSize: 10, color: checklist.filter(c => c.checked).length === checklist.length ? TONES.green.text : "var(--sd-font-tertiary)" }}>
                  {checklist.filter(c => c.checked).length}/{checklist.length} passed
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {checklist.map(item => (
                  <div key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 9, padding: "8px 10px",
                      border: `1px solid ${item.checked ? TONES.green.tint : "var(--sd-border-light)"}`,
                      borderRadius: "var(--sd-radius-sm)",
                      background: item.checked ? TONES.green.tint : "var(--sd-bg-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <Checkbox
                      checked={item.checked}
                      onChange={() => toggleCheck(item.id)}
                      size="sm"
                    />
                    <span style={{ fontSize: 12, color: item.checked ? TONES.green.text : "var(--sd-font-primary)" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revision notes */}
            {showRevision && (
              <div>
                <Textarea
                  value={revisionNote}
                  onChange={(val) => setRevisionNote(val)}
                  placeholder="Describe what needs to change — the creator will see this message…"
                  label="Revision notes *"
                  rows={4}
                />
              </div>
            )}

            {/* Warning if not all checked */}
            {!allChecked && !showRevision && (
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px",
                background: TONES.yellow.tint, borderRadius: "var(--sd-radius-sm)",
                border: `1px solid ${TONES.yellow.solid}20`,
              }}>
                <IconAlertTriangle size={14} style={{ color: TONES.yellow.text, flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 12, color: TONES.yellow.text, lineHeight: 1.5 }}>
                  {checklist.filter(c => !c.checked).length} checklist item{checklist.filter(c => !c.checked).length > 1 ? "s" : ""} not yet verified. You can still approve if satisfied.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 18px", borderTop: "1px solid var(--sd-border-light)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            {!showRevision ? (
              <Button variant="secondary" size="sm" leftIcon={<IconPencil size={13} />} onClick={() => setShowRevision(true)}>
                Request revision
              </Button>
            ) : (
              <>
                <Button variant="tertiary" size="sm" onClick={() => { setShowRevision(false); setRevisionNote(""); }}>
                  Cancel
                </Button>
                <Button variant="secondary" size="sm" disabled={!revisionNote.trim()} onClick={() => { onRevision(revisionNote); setShowRevision(false); }}>
                  Send revision request
                </Button>
              </>
            )}
          </div>

          {!showRevision && (
            <Button variant="primary" size="sm" leftIcon={<IconCircleCheck size={15} />} onClick={onApprove}>
              Approve content
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

const SAMPLE_DRAFT: ContentDraft = {
  id: "d1",
  creatorName: "Priya Nair",
  creatorHandle: "@priya_creates",
  creatorInitials: "PN",
  creatorTone: "sky",
  platform: "instagram",
  contentType: "reel",
  caption: "My morning routine just got a serious upgrade ✨ Been using @atlasxofficial SPF 50 for 3 weeks and genuinely obsessed — lightweight, no white cast, smells incredible. Link in bio for 20% off! #atlasxskin #morningroutine #skincareroutine #superdeal #ad",
  hashtags: ["atlasxskin", "superdeal", "ad"],
  mentions: ["atlasxofficial"],
  submittedAt: "Jun 17, 3:22pm",
  status: "pending",
  checklist: [
    { id: "c1", label: "Required hashtags present (#atlasxskin, #superdeal, #ad)", checked: true },
    { id: "c2", label: "Brand account tagged (@atlasxofficial)", checked: true },
    { id: "c3", label: "FTC disclosure included (#ad or #paid)", checked: true },
    { id: "c4", label: "No competitor products visible", checked: false },
    { id: "c5", label: "Brand guidelines followed (tone, framing)", checked: false },
    { id: "c6", label: "Link in bio set to campaign URL", checked: false },
  ],
};

function ContentApprovalDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ReviewStatus>("pending");

  const statusColors: Record<ReviewStatus, { tone: keyof typeof TONES; label: string }> = {
    pending:            { tone: "gray",   label: "Pending review" },
    approved:           { tone: "green",  label: "Approved" },
    revision_requested: { tone: "yellow", label: "Revision requested" },
  };
  const s = statusColors[status];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary" size="sm" leftIcon={<IconEye size={14} />} onClick={() => setOpen(true)}>
          Review draft
        </Button>
        <Badge label={s.label} tone={s.tone} variant="status" />
        {status !== "pending" && (
          <Button variant="tertiary" size="sm" onClick={() => setStatus("pending")}>Reset</Button>
        )}
      </div>

      <p style={{ fontSize: 12, color: "var(--sd-font-tertiary)", margin: "12px 0 0" }}>
        Click the checklist items to mark them, then use "Approve" or "Request revision" (requires a note). Watch status update.
      </p>

      <ContentApprovalModal
        draft={{ ...SAMPLE_DRAFT, status }}
        open={open}
        onClose={() => setOpen(false)}
        onApprove={() => { setStatus("approved"); setOpen(false); }}
        onRevision={() => { setStatus("revision_requested"); setOpen(false); }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "content-approval-modal",
  title: "ContentApprovalModal",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Two-column modal for reviewing creator content drafts — checklist, revision notes, and approve/reject actions.",
  description:
    "ContentApprovalModal is the primary content review interface. Left panel: content thumbnail (image or video placeholder), caption, hashtag chips (purple), mention chips (sky), and a 'View on platform' link. Right panel: interactive review checklist with checkboxes (clicking marks each requirement as passed — turns green), an unchecked-items warning banner, and an optional revision notes textarea that slides in when 'Request revision' is clicked. Footer: 'Request revision' secondary action (requires a non-empty note to enable 'Send') and 'Approve content' primary action. Status badge in the header reflects the current review state. Escape and backdrop dismiss the modal.",
  demos: [
    {
      title: "Content review flow",
      description: "Click 'Review draft' to open. Check off requirements, then approve or request a revision with a note.",
      render: () => <ContentApprovalDemo />,
    },
  ],
  props: [
    {
      title: "ContentApprovalModal",
      rows: [
        { name: "draft",      type: "ContentDraft",            required: true, description: "Content draft data including creator info, platform, caption, hashtags, mentions, checklist, and current status." },
        { name: "open",       type: "boolean",                 required: true, description: "Controls modal visibility." },
        { name: "onClose",    type: "() => void",              required: true, description: "Called on backdrop click or Escape." },
        { name: "onApprove",  type: "() => void",              required: true, description: "Called when 'Approve content' is clicked." },
        { name: "onRevision", type: "(note: string) => void",  required: true, description: "Called with the revision note text when 'Send revision request' is clicked." },
      ],
    },
  ],
};

export default doc;
