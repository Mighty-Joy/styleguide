"use client";

import React, { useState, useRef } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconUpload,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconVideo,
  IconPhoto,
  IconX,
  IconCheck,
  IconHash,
  IconAt,
  IconInfoCircle,
  IconLoader2,
  IconFileText,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type DeliverableType = "ig_reel" | "ig_story" | "tiktok" | "youtube_short";
type SubmitState = "idle" | "uploading" | "submitted";

interface Deliverable {
  id: DeliverableType;
  label: string;
  icon: React.ElementType;
  platform: string;
  tone: keyof typeof TONES;
  hint: string;
}

const DELIVERABLES: Deliverable[] = [
  { id: "ig_reel",      label: "IG Reel",       icon: IconBrandInstagram, platform: "Instagram", tone: "pink",   hint: "15–30 seconds · vertical video" },
  { id: "ig_story",     label: "IG Story",       icon: IconBrandInstagram, platform: "Instagram", tone: "pink",   hint: "Up to 15 seconds per frame" },
  { id: "tiktok",       label: "TikTok",         icon: IconBrandTiktok,    platform: "TikTok",    tone: "gray",   hint: "30–60 seconds · vertical video" },
  { id: "youtube_short",label: "YouTube Short",  icon: IconBrandYoutube,   platform: "YouTube",   tone: "red",    hint: "Under 60 seconds · vertical" },
];

const CHAR_LIMIT = 2200;

/* ---- Upload drop zone ---- */

function DropZone({ file, onFile, onClear }: { file: File | null; onFile: (f: File) => void; onClear: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }

  if (file) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, background: TONES.green.tint }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconVideo size={18} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary, #111)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{(file.size / 1_048_576).toFixed(1)} MB</div>
        </div>
        <button onClick={onClear} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 4 }}>
          <IconX size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
      style={{
        border: `2px dashed ${dragging ? "#111" : "var(--sd-border-medium, #d1d5db)"}`,
        borderRadius: 10, padding: "28px 0", textAlign: "center",
        background: dragging ? "var(--sd-bg-tertiary, #f1f1f1)" : "transparent",
        cursor: "pointer", transition: "all 0.15s",
      }}
    >
      <input ref={ref} type="file" accept="video/*,image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      <IconUpload size={22} style={{ color: "var(--sd-font-tertiary, #999)", marginBottom: 8 }} />
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)", marginBottom: 2 }}>Drag & drop your file here</div>
      <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>MP4, MOV, JPG, PNG · max 500 MB</div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [deliverable, setDeliverable] = useState<DeliverableType>("ig_reel");
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [mentions, setMentions] = useState("");
  const [notes, setNotes] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const selected = DELIVERABLES.find((d) => d.id === deliverable)!;
  const captionLen = caption.length;
  const canSubmit = file !== null && caption.trim().length > 0 && submitState === "idle";

  function handleSubmit() {
    if (!canSubmit) return;
    setSubmitState("uploading");
    setTimeout(() => setSubmitState("submitted"), 2200);
  }

  if (submitState === "submitted") {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 560, textAlign: "center", padding: "40px 20px" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <IconCheck size={26} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Draft submitted!</div>
        <div style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", marginBottom: 20 }}>
          Your {selected.label} draft is with the team for review. You'll be notified within 48 hours.
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Button variant="secondary" size="sm" onClick={() => { setSubmitState("idle"); setFile(null); setCaption(""); setHashtags(""); setMentions(""); setNotes(""); }}>
            Submit another
          </Button>
          <Button variant="primary" size="sm">View in dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 560 }}>
      {/* Section: Deliverable */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Deliverable type</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {DELIVERABLES.map((d) => {
            const Icon = d.icon;
            const active = deliverable === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setDeliverable(d.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                  padding: "10px 8px", borderRadius: 10,
                  border: `2px solid ${active ? "#111" : "var(--sd-border-default, #e5e7eb)"}`,
                  background: active ? "#111" : "transparent",
                  cursor: "pointer", transition: "all 0.12s",
                }}
              >
                <Icon size={16} style={{ color: active ? "#fff" : TONES[d.tone].text }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: active ? "#fff" : "var(--sd-font-secondary, #666)", whiteSpace: "nowrap" }}>{d.label}</span>
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: "var(--sd-font-tertiary, #999)", display: "flex", alignItems: "center", gap: 4 }}>
          <IconInfoCircle size={11} />
          {selected.hint}
        </div>
      </div>

      {/* Section: File */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>File</div>
        <DropZone file={file} onFile={setFile} onClear={() => setFile(null)} />
      </div>

      {/* Section: Caption */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Caption</label>
          <span style={{ fontSize: 10, color: captionLen > CHAR_LIMIT ? TONES.red.text : "var(--sd-font-tertiary, #999)" }}>
            {captionLen} / {CHAR_LIMIT.toLocaleString()}
          </span>
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write your caption here. Keep it natural and on-brand…"
          rows={4}
          style={{
            width: "100%", padding: "10px 12px", borderRadius: 10,
            border: "1px solid var(--sd-border-medium, #d1d5db)",
            background: "#fff", fontSize: 12, lineHeight: 1.6, resize: "vertical",
            fontFamily: "inherit", outline: "none", color: "var(--sd-font-primary, #111)",
          }}
        />
      </div>

      {/* Hashtags + Mentions row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {[
          { label: "Hashtags", Icon: IconHash, value: hashtags, onChange: setHashtags, placeholder: "#summerglow #skincare" },
          { label: "Mentions", Icon: IconAt,   value: mentions, onChange: setMentions, placeholder: "@auralabs" },
        ].map(({ label, Icon, value, onChange, placeholder }) => (
          <div key={label}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>{label}</label>
            <div style={{ position: "relative" }}>
              <Icon size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--sd-font-tertiary, #999)", pointerEvents: "none" }} />
              <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{ width: "100%", height: 36, paddingLeft: 28, paddingRight: 10, borderRadius: 8, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Notes to reviewer */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Notes to reviewer <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span></label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything the brand team should know about this draft…"
          style={{ width: "100%", height: 36, padding: "0 12px", borderRadius: 8, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="secondary" size="sm">Save draft</Button>
        <Button
          variant="primary"
          size="sm"
          disabled={!canSubmit}
          leftIcon={submitState === "uploading" ? (
            <span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>
              <IconLoader2 size={13} />
            </span>
          ) : <IconUpload size={13} />}
          onClick={handleSubmit}
        >
          {submitState === "uploading" ? "Uploading…" : "Submit draft"}
        </Button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "content-submission-form",
  title: "ContentSubmissionForm",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator-facing draft upload — deliverable type selector, drag-and-drop file zone, caption with char count, hashtags, mentions, and reviewer notes.",
  description:
    "The form a creator uses to submit a content draft for review. Deliverable selector: 4-up grid (IG Reel, IG Story, TikTok, YouTube Short) with platform icons — selected tile goes black. Drag-and-drop file zone shows file name + size once attached. Caption textarea with 2,200-char counter. Hashtag and mention inputs with icon prefixes. Optional notes-to-reviewer field. Submit button locked until file + caption are filled; shows spinner during upload; transitions to a green success confirmation screen. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Content submission form",
      description: "Select a deliverable type, attach a file (or any file for demo), write a caption, then Submit draft.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
