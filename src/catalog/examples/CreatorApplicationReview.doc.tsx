"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconX,
  IconMessageCircle,
  IconBrandInstagram,
  IconBrandTiktok,
  IconHeart,
  IconEye,
  IconUsers,
  IconStar,
  IconExternalLink,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type AppStatus = "pending" | "accepted" | "passed" | "info_requested";
type Platform = "instagram" | "tiktok";

interface Applicant {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  platform: Platform;
  followers: string;
  er: number;
  avgViews: string;
  niche: string[];
  appliedDate: string;
  status: AppStatus;
  message: string;
  rating?: number;
}

/* ---- seed ---- */
const APPLICANTS: Applicant[] = [
  {
    id: "a1", name: "Priya Nair", initials: "PN", tone: "green", handle: "@priya.creates",
    platform: "instagram", followers: "248K", er: 7.4, avgViews: "62K",
    niche: ["Skincare", "Wellness", "Lifestyle"],
    appliedDate: "Jun 27", status: "pending",
    message: "I've been using Aura Labs products for 6 months and genuinely love the glow serum — would love to share an authentic review with my audience who are obsessed with skincare routines.",
    rating: 5,
  },
  {
    id: "a2", name: "Diego Santos", initials: "DS", tone: "orange", handle: "@diegosantos",
    platform: "tiktok", followers: "512K", er: 5.8, avgViews: "134K",
    niche: ["Fitness", "Health", "Men's Grooming"],
    appliedDate: "Jun 26", status: "pending",
    message: "My audience is 68% male aged 22–34 — a demographic that's increasingly investing in skincare. I think this collaboration could help Aura reach a new segment.",
  },
  {
    id: "a3", name: "Hana Kim", initials: "HK", tone: "pink", handle: "@hanakim_",
    platform: "instagram", followers: "89K", er: 9.2, avgViews: "28K",
    niche: ["K-Beauty", "Skincare", "Travel"],
    appliedDate: "Jun 26", status: "pending",
    message: "As a K-beauty enthusiast I'm passionate about ingredient transparency and effective skincare. My followers trust my reviews because I only work with brands I genuinely believe in.",
    rating: 4,
  },
  {
    id: "a4", name: "Marcus Webb", initials: "MW", tone: "purple", handle: "@marcuswebb",
    platform: "tiktok", followers: "1.2M", er: 3.1, avgViews: "380K",
    niche: ["Comedy", "Lifestyle"],
    appliedDate: "Jun 25", status: "passed",
    message: "I make comedy content and would do a funny skincare routine video. Could be a fun angle for the brand.",
  },
];

const STATUS_META: Record<AppStatus, { label: string; tone: keyof typeof TONES }> = {
  pending:        { label: "Pending",          tone: "yellow" },
  accepted:       { label: "Accepted",         tone: "green"  },
  passed:         { label: "Passed",           tone: "gray"   },
  info_requested: { label: "Info requested",   tone: "blue"   },
};

const PLATFORM_ICON: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
};

function fmt(n: number) { return n.toFixed(1); }

/* ---- Demo ---- */
function Demo() {
  const [queue, setQueue] = useState(APPLICANTS);
  const [idx, setIdx] = useState(0);
  const [note, setNote] = useState("");

  const pending = queue.filter((a) => a.status === "pending");
  const a = queue[idx];
  const PlatformIcon = PLATFORM_ICON[a.platform];
  const { label, tone } = STATUS_META[a.status];

  function decide(status: AppStatus) {
    setQueue((q) => q.map((ap, i) => i === idx ? { ...ap, status } : ap));
    const nextPending = queue.findIndex((ap, i) => i > idx && ap.status === "pending");
    if (nextPending !== -1) setIdx(nextPending);
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", display: "grid", gridTemplateColumns: "220px 1fr", gap: 16, minHeight: 520 }}>
      {/* Sidebar queue */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 12px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Applications</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>{pending.length} pending review</div>
        </div>
        {queue.map((ap, i) => {
          const { label: sl, tone: st } = STATUS_META[ap.status];
          const PIc = PLATFORM_ICON[ap.platform];
          return (
            <button
              key={ap.id}
              onClick={() => setIdx(i)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: i === idx ? "rgba(0,0,0,0.04)" : "transparent", border: "none", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", cursor: "pointer", textAlign: "left" }}
            >
              <Avatar initials={ap.initials} tone={ap.tone} size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ap.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <PIc size={9} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{ap.followers}</span>
                </div>
              </div>
              <Badge label={sl} tone={st} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Detail pane */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Nav header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} style={{ padding: 4, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "none", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.4 : 1, display: "flex" }}>
              <IconChevronLeft size={13} />
            </button>
            <button onClick={() => setIdx(Math.min(queue.length - 1, idx + 1))} disabled={idx === queue.length - 1} style={{ padding: 4, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "none", cursor: idx === queue.length - 1 ? "not-allowed" : "pointer", opacity: idx === queue.length - 1 ? 0.4 : 1, display: "flex" }}>
              <IconChevronRight size={13} />
            </button>
          </div>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{idx + 1} of {queue.length}</span>
          <Badge label={label} tone={tone} size="sm" dot />
        </div>

        <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
          {/* Creator identity */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
            <Avatar initials={a.initials} tone={a.tone} size="lg" />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{a.name}</span>
                {a.rating && (
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: a.rating }).map((_, i) => (
                      <IconStar key={i} size={11} style={{ color: TONES.yellow.text, fill: TONES.yellow.text }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PlatformIcon size={13} style={{ color: "var(--sd-font-secondary, #555)" }} />
                <span style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", fontWeight: 600 }}>{a.handle}</span>
                <button style={{ display: "flex", color: "var(--sd-font-tertiary, #999)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <IconExternalLink size={11} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
                {a.niche.map((n) => (
                  <div key={n} style={{ padding: "2px 7px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 10, fontWeight: 600, color: "var(--sd-font-secondary, #555)" }}>{n}</div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Applied {a.appliedDate}</span>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
            {[
              { icon: IconUsers, label: "Followers", value: a.followers },
              { icon: IconHeart, label: "Avg ER",    value: `${fmt(a.er)}%`, highlight: a.er >= 6 },
              { icon: IconEye,   label: "Avg views", value: a.avgViews },
            ].map(({ icon: Icon, label: lbl, value, highlight }) => (
              <div key={lbl} style={{ padding: "10px 12px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  <Icon size={11} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{lbl}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: highlight ? TONES.green.text : "var(--sd-font-primary, #111)" }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Application message */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 7 }}>
              <IconMessageCircle size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />
              Their message
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "var(--sd-font-secondary, #555)", padding: "10px 12px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 8, borderLeft: `3px solid ${TONES[a.tone].tint}` }}>
              "{a.message}"
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 5 }}>Internal note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for your team..."
              rows={2}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, lineHeight: 1.6, fontFamily: "inherit", outline: "none", resize: "none" }}
            />
          </div>
        </div>

        {/* Decision footer */}
        {a.status === "pending" && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="secondary" size="sm" leftIcon={<IconX size={12} />} onClick={() => decide("passed")}>Pass</Button>
            <Button variant="secondary" size="sm" leftIcon={<IconMessageCircle size={12} />} onClick={() => decide("info_requested")}>Request info</Button>
            <Button variant="primary" size="sm" leftIcon={<IconCheck size={12} />} onClick={() => decide("accepted")}>Accept</Button>
          </div>
        )}
        {a.status !== "pending" && (
          <div style={{ padding: "10px 16px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", display: "flex", justifyContent: "flex-end" }}>
            <Button variant="secondary" size="sm" onClick={() => decide("pending")}>Undo decision</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-application-review",
  title: "CreatorApplicationReview",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand-side review queue for inbound creator applications — sidebar list, detail pane with stats and message, Accept / Pass / Request info decisions.",
  description:
    "The review interface brands use when creators apply to open campaigns. Two-column layout: sidebar queue with applicant avatars, follower counts, and status badges; detail pane with prev/next navigation and per-applicant count. Detail pane: creator identity (avatar, name, handle, star rating, niche chips, platform link), 3-stat strip (followers, avg ER in green when ≥6%, avg views), application message in a left-bordered callout, internal notes textarea. Decision footer: Pass / Request info / Accept — each transitions the applicant's status and auto-advances to the next pending item. Decided items show an Undo decision button. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator application review",
      description: "Click an applicant in the sidebar, then Accept / Pass / Request info to process them. Use the chevrons to navigate the queue.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
