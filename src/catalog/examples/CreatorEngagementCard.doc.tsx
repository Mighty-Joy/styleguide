"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type DealStatus = "active" | "pending_signature" | "negotiating" | "completed" | "awaiting_payment";
type DealType   = "Paid Post" | "Paid UGC" | "Gifting" | "Affiliate";
type Platform   = "Instagram" | "TikTok" | "YouTube";

type Deliverable = {
  type:   string;
  count:  number;
};

type EngagementCard = {
  id:            number;
  brand:         string;
  initials:      string;
  campaign:      string;
  dealType:      DealType;
  platform:      Platform;
  status:        DealStatus;
  amount:        string;
  deliverables:  Deliverable[];
  nextAction:    string;
  nextDue:       string;
  signedAt?:     string;
};

/* ── seed ───────────────────────────────────────────────── */
const ENGAGEMENTS: EngagementCard[] = [
  {
    id:           1,
    brand:        "Aura Labs",
    initials:     "AL",
    campaign:     "Summer Glow",
    dealType:     "Paid Post",
    platform:     "Instagram",
    status:       "active",
    amount:       "$1,200",
    deliverables: [{ type: "Reel", count: 2 }, { type: "Story", count: 3 }],
    nextAction:   "Film content",
    nextDue:      "Jul 5",
    signedAt:     "Jun 20",
  },
  {
    id:           2,
    brand:        "Nova Skincare",
    initials:     "NS",
    campaign:     "Glow Up",
    dealType:     "Gifting",
    platform:     "TikTok",
    status:       "pending_signature",
    amount:       "Gift only",
    deliverables: [{ type: "TikTok", count: 1 }],
    nextAction:   "Sign contract",
    nextDue:      "Jul 2",
  },
  {
    id:           3,
    brand:        "Lumina Co",
    initials:     "LC",
    campaign:     "Spring Launch",
    dealType:     "Paid UGC",
    platform:     "YouTube",
    status:       "completed",
    amount:       "$3,500",
    deliverables: [{ type: "YouTube Review", count: 1 }],
    nextAction:   "Awaiting payment",
    nextDue:      "",
    signedAt:     "Apr 10",
  },
  {
    id:           4,
    brand:        "Vibe Beauty",
    initials:     "VB",
    campaign:     "Fall Collection",
    dealType:     "Affiliate",
    platform:     "Instagram",
    status:       "negotiating",
    amount:       "15% commission",
    deliverables: [{ type: "Story", count: 4 }, { type: "Post", count: 2 }],
    nextAction:   "Review offer",
    nextDue:      "Jul 8",
  },
];

/* ── status config ──────────────────────────────────────── */
const STATUS: Record<DealStatus, { label: string; tone: string; color: string }> = {
  active:            { label: "Active",              tone: "green",  color: "#10B981" },
  pending_signature: { label: "Sign contract",       tone: "orange", color: "#F59E0B" },
  negotiating:       { label: "Negotiating",         tone: "blue",   color: "#3B82F6" },
  completed:         { label: "Completed",           tone: "gray",   color: "#6B7280" },
  awaiting_payment:  { label: "Awaiting payment",    tone: "purple", color: "#8B5CF6" },
};

const PLATFORM_ICON: Record<Platform, string> = {
  Instagram: "📷",
  TikTok:    "🎵",
  YouTube:   "▶️",
};

/* ── Card ───────────────────────────────────────────────── */
function EngagementRow({ e, expanded, onToggle }: {
  e:        EngagementCard;
  expanded: boolean;
  onToggle: () => void;
}) {
  const st = STATUS[e.status];
  const isCompleted = e.status === "completed";

  return (
    <div style={{
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 12,
      overflow:     "hidden",
      opacity:      isCompleted ? 0.8 : 1,
    }}>
      {/* main row */}
      <div
        onClick={onToggle}
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        14,
          padding:    "14px 16px",
          cursor:     "pointer",
          background: expanded ? "var(--sd-bg-tertiary)" : "var(--sd-bg-secondary)",
        }}
      >
        {/* brand avatar */}
        <Avatar size="md" name={e.brand} initials={e.initials} />

        {/* brand / campaign */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily:  "var(--sd-font)",
            fontSize:    14,
            fontWeight:  700,
            color:       "var(--sd-font-primary)",
            whiteSpace:  "nowrap",
            overflow:    "hidden",
            textOverflow:"ellipsis",
          }}>
            {e.brand}
          </div>
          <div style={{
            fontFamily:  "var(--sd-font)",
            fontSize:    11,
            color:       "var(--sd-font-tertiary)",
            whiteSpace:  "nowrap",
            overflow:    "hidden",
            textOverflow:"ellipsis",
          }}>
            {e.campaign} · {e.dealType}
          </div>
        </div>

        {/* platform + amount */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            {e.amount}
          </span>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
            {PLATFORM_ICON[e.platform]} {e.platform}
          </span>
        </div>

        {/* status */}
        <div style={{ flexShrink: 0 }}>
          <Badge label={st.label} tone={st.tone as any} variant="solid" size="sm" />
        </div>

        {/* chevron */}
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   12,
          color:      "var(--sd-font-tertiary)",
          flexShrink: 0,
          transform:  expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.15s ease",
        }}>
          ▾
        </span>
      </div>

      {/* expanded detail */}
      {expanded && (
        <div style={{
          borderTop: "1px solid var(--sd-border-default)",
          padding:   "14px 16px",
          background:"var(--sd-bg-secondary)",
          display:   "flex",
          flexDirection:"column",
          gap:       14,
        }}>
          {/* deliverables */}
          <div>
            <div style={{
              fontFamily:    "var(--sd-font)",
              fontSize:      10,
              fontWeight:    700,
              color:         "var(--sd-font-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom:  6,
            }}>
              Deliverables
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {e.deliverables.map(d => (
                <span key={d.type} style={{
                  fontFamily:   "var(--sd-font)",
                  fontSize:     11,
                  fontWeight:   500,
                  color:        "var(--sd-font-secondary)",
                  background:   "var(--sd-bg-tertiary)",
                  border:       "1px solid var(--sd-border-default)",
                  borderRadius: 6,
                  padding:      "3px 9px",
                }}>
                  {d.count}× {d.type}
                </span>
              ))}
            </div>
          </div>

          {/* meta row */}
          <div style={{ display: "flex", gap: 24 }}>
            {e.signedAt && (
              <div>
                <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)", marginBottom: 2 }}>Signed</div>
                <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{e.signedAt}</div>
              </div>
            )}
            {e.nextDue && (
              <div>
                <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)", marginBottom: 2 }}>Next due</div>
                <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{e.nextDue}</div>
              </div>
            )}
          </div>

          {/* action footer */}
          {!isCompleted && (
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="primary" size="sm">{e.nextAction}</Button>
              <Button variant="secondary" size="sm">Message brand</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function CreatorEngagementCardDemo() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [filter, setFilter]     = useState<"active" | "all">("active");

  const visible = filter === "active"
    ? ENGAGEMENTS.filter(e => e.status !== "completed")
    : ENGAGEMENTS;

  const activeCount = ENGAGEMENTS.filter(e => e.status !== "completed").length;
  const totalEarned = "$4,700";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 540 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 16, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            My Deals
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
            {activeCount} active · {totalEarned} total earned
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "var(--sd-bg-tertiary)", borderRadius: 8, padding: 3, border: "1px solid var(--sd-border-default)" }}>
          {(["active", "all"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   filter === f ? 600 : 500,
                padding:      "4px 12px",
                borderRadius: 6,
                border:       "none",
                background:   filter === f ? "var(--sd-bg-secondary)" : "transparent",
                color:        filter === f ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                cursor:       "pointer",
                boxShadow:    filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f === "active" ? "Active" : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* deal cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.map(e => (
          <EngagementRow
            key={e.id}
            e={e}
            expanded={expanded === e.id}
            onToggle={() => setExpanded(expanded === e.id ? null : e.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "creator-engagement-card",
  title:       "Creator Engagement Card",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Creator-facing deal card list — brand avatar, campaign, amount, status, and expandable detail with deliverables + action. Maps to CreatorEngagementCard.tsx.",
  description: "Mobile-first card list for a creator's deals. Each row shows brand identity, campaign name, deal type, payment amount, platform, and status badge. Expanding a row reveals deliverables, signed/due dates, and primary actions (next task, message brand). Tabbed between active and all. Maps to CreatorEngagementCard.tsx in the app — the main surface for creators managing their brand partnerships.",
  demos: [
    {
      title:  "Priya Nair — My Deals",
      render: () => <CreatorEngagementCardDemo />,
      block:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "engagements", type: "EngagementCard[]", required: true,  description: "Array of deal objects with brand, campaign, status, amount, deliverables, and next action." },
        { name: "onAction",    type: "(id: number, action: string) => void", required: false, description: "Primary CTA callback — sign contract, film content, etc." },
        { name: "onMessage",   type: "(id: number) => void", required: false, description: "Opens message thread with the brand." },
      ],
    },
  ],
};

export default doc;
