"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type DeliverableStatus = "awaiting_script" | "script_review" | "awaiting_content" | "content_review" | "approved" | "posted";
type Platform = "instagram" | "tiktok" | "youtube";

type ContentItem = {
  id:       number;
  type:     string;
  status:   string;
  thumb:    string;
  platform: Platform;
};

type Deliverable = {
  id:          number;
  title:       string;
  type:        string;
  platform:    Platform;
  status:      DeliverableStatus;
  creator:     string;
  initials:    string;
  handle:      string;
  campaign:    string;
  dueDate:     string;
  amount:      string;
  hashtags:    string[];
  mentions:    string[];
  notes:       string;
  content:     ContentItem[];
};

/* ── seed ───────────────────────────────────────────────── */
const DELIVERABLE: Deliverable = {
  id:       1,
  title:    "Summer Reel #1",
  type:     "Reel",
  platform: "instagram",
  status:   "content_review",
  creator:  "Priya Nair",
  initials: "PN",
  handle:   "@priya.glows",
  campaign: "Summer Glow",
  dueDate:  "Jul 8, 2026",
  amount:   "$1,200",
  hashtags: ["#summerglow", "#aurabeauty", "#skincare"],
  mentions: ["@auralabs"],
  notes:    "Focus on the serum application routine. Show before/after. Keep it under 30s. Bright, natural lighting preferred.",
  content:  [
    { id: 1, type: "Draft", status: "Needs review", thumb: "🎬", platform: "instagram" },
    { id: 2, type: "Script", status: "Approved",    thumb: "📝", platform: "instagram" },
  ],
};

/* ── status config ──────────────────────────────────────── */
const STATUS: Record<DeliverableStatus, { label: string; color: string; bg: string }> = {
  awaiting_script:  { label: "Awaiting script",   color: "#6B7280", bg: "#F3F4F6" },
  script_review:    { label: "Script review",      color: "#F59E0B", bg: "#FFFBEB" },
  awaiting_content: { label: "Awaiting content",   color: "#8B5CF6", bg: "#F5F3FF" },
  content_review:   { label: "Content review",     color: "#EC4899", bg: "#FDF2F8" },
  approved:         { label: "Approved",           color: "#10B981", bg: "#ECFDF5" },
  posted:           { label: "Posted",             color: "#10B981", bg: "#ECFDF5" },
};

const PLATFORM_TONE: Record<Platform, string> = {
  instagram: "pink",
  tiktok:    "blue",
  youtube:   "red",
};

/* ── Section ────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{
        fontFamily:    "var(--sd-font)",
        fontSize:      10,
        fontWeight:    700,
        color:         "var(--sd-font-tertiary)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

/* ── Drawer ─────────────────────────────────────────────── */
function DrawerPanel({ d, onClose }: { d: Deliverable; onClose: () => void }) {
  const st = STATUS[d.status];

  return (
    <div style={{
      width:         400,
      height:        "100%",
      display:       "flex",
      flexDirection: "column",
      background:    "var(--sd-bg-secondary)",
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  12,
      overflow:      "hidden",
    }}>
      {/* header */}
      <div style={{
        display:      "flex",
        alignItems:   "flex-start",
        gap:          12,
        padding:      "16px",
        borderBottom: "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-tertiary)",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>
              {d.title}
            </span>
            <Badge label={d.type} tone="gray" variant="solid" size="sm" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     11,
              fontWeight:   600,
              color:        st.color,
              background:   st.bg,
              borderRadius: 100,
              padding:      "2px 9px",
            }}>
              {st.label}
            </span>
            <Badge label={d.platform} tone={PLATFORM_TONE[d.platform] as any} variant="solid" size="sm" />
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     18,
            color:        "var(--sd-font-tertiary)",
            background:   "none",
            border:       "none",
            cursor:       "pointer",
            lineHeight:   1,
            padding:      4,
          }}
        >
          ×
        </button>
      </div>

      {/* body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* creator */}
        <Section title="Creator">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar size="sm" name={d.creator} initials={d.initials} />
            <div>
              <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{d.creator}</div>
              <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{d.handle}</div>
            </div>
          </div>
        </Section>

        {/* details grid */}
        <Section title="Deal details">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
            {[
              { label: "Campaign",  value: d.campaign  },
              { label: "Due date",  value: d.dueDate   },
              { label: "Amount",    value: d.amount    },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)", marginBottom: 2 }}>{f.label}</div>
                <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 500, color: "var(--sd-font-primary)" }}>{f.value}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* brief */}
        <Section title="Brief">
          <div style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     12,
            color:        "var(--sd-font-secondary)",
            lineHeight:   "1.6",
            padding:      "10px 12px",
            background:   "var(--sd-bg-tertiary)",
            borderRadius: 8,
            border:       "1px solid var(--sd-border-default)",
          }}>
            {d.notes}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {d.hashtags.map(h => (
              <span key={h} style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   500,
                color:        "#3B82F6",
                background:   "#EFF6FF",
                borderRadius: 4,
                padding:      "2px 7px",
              }}>
                {h}
              </span>
            ))}
            {d.mentions.map(m => (
              <span key={m} style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   500,
                color:        "#8B5CF6",
                background:   "#F5F3FF",
                borderRadius: 4,
                padding:      "2px 7px",
              }}>
                {m}
              </span>
            ))}
          </div>
        </Section>

        {/* content submissions */}
        <Section title="Submissions">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {d.content.map(c => (
              <div key={c.id} style={{
                display:      "flex",
                alignItems:   "center",
                gap:          10,
                padding:      "10px 12px",
                background:   "var(--sd-bg-tertiary)",
                border:       "1px solid var(--sd-border-default)",
                borderRadius: 8,
              }}>
                <div style={{
                  width:          44,
                  height:         44,
                  borderRadius:   8,
                  background:     "var(--sd-border-default)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       22,
                  flexShrink:     0,
                }}>
                  {c.thumb}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{c.type}</div>
                  <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{c.status}</div>
                </div>
                <Button variant="secondary" size="sm">Review</Button>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* footer actions */}
      <div style={{
        padding:      "12px 16px",
        borderTop:    "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-tertiary)",
        display:      "flex",
        gap:          8,
      }}>
        <Button variant="primary" size="sm">Approve content</Button>
        <Button variant="secondary" size="sm">Request revision</Button>
        <Button variant="secondary" size="sm">Message creator</Button>
      </div>
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function DeliverableDetailDrawerDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {/* trigger */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
          Open deliverable drawer
        </Button>
        <div style={{
          padding:      "14px 16px",
          background:   "var(--sd-bg-tertiary)",
          borderRadius: 8,
          border:       "1px solid var(--sd-border-default)",
          fontFamily:   "var(--sd-font)",
          fontSize:     12,
          color:        "var(--sd-font-tertiary)",
          maxWidth:     200,
        }}>
          Clicking a deliverable row in the content table opens this drawer with full detail.
        </div>
      </div>

      {/* drawer panel */}
      {open && <DrawerPanel d={DELIVERABLE} onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "deliverable-detail-drawer",
  title:       "Deliverable Detail Drawer",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Right-hand drawer showing full deliverable context — creator, brief, submissions, and review actions. Maps to DeliverableDetailDrawer.tsx.",
  description: "Opened when clicking a deliverable row in the content table. Shows creator identity, deal details (campaign, due date, amount), brief notes with hashtags/mentions, content submission cards, and primary review actions (approve, request revision, message). Maps to DeliverableDetailDrawer.tsx in the app.",
  demos: [
    {
      title:  "Summer Glow · Priya Nair",
      render: () => <DeliverableDetailDrawerDemo />,
      block:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "deliverable", type: "Deliverable",   required: true,  description: "Full deliverable object with creator, deal, brief, and content submissions." },
        { name: "opened",      type: "boolean",       required: true,  description: "Controls drawer visibility." },
        { name: "onClose",     type: "() => void",    required: true,  description: "Close callback." },
        { name: "onSuccess",   type: "() => void",    required: false, description: "Called after approve or revision request to refresh parent." },
      ],
    },
  ],
};

export default doc;
