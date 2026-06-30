"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type DealStatus = "active" | "pending" | "signed" | "completed" | "void";

type Track = {
  label: string;
  stage: string;
  owner: "brand" | "creator" | "done";
};

type Deal = {
  id: number;
  creator: string;
  initials: string;
  platform: "instagram" | "tiktok" | "youtube";
  campaign: string;
  amount: string;
  status: DealStatus;
  contract: string;
  payment: string;
  tracks: Track[];
};

/* ── data ───────────────────────────────────────────────── */
const DEALS: Deal[] = [
  {
    id: 1,
    creator:  "Priya Nair",
    initials: "PN",
    platform: "instagram",
    campaign: "Summer Glow",
    amount:   "$3,500",
    status:   "active",
    contract: "Signed · Jun 15",
    payment:  "Net 30",
    tracks: [
      { label: "Script",    stage: "Awaiting creator",  owner: "creator" },
      { label: "Content",   stage: "Needs review",       owner: "brand"   },
      { label: "Payment",   stage: "Scheduled Jun 30",   owner: "done"    },
    ],
  },
  {
    id: 2,
    creator:  "Leo Park",
    initials: "LP",
    platform: "tiktok",
    campaign: "Summer Glow",
    amount:   "$1,800",
    status:   "pending",
    contract: "Sent · Awaiting signature",
    payment:  "On delivery",
    tracks: [
      { label: "Contract",  stage: "Awaiting signature", owner: "creator" },
      { label: "Content",   stage: "Not started",        owner: "creator" },
      { label: "Payment",   stage: "Pending contract",   owner: "done"    },
    ],
  },
  {
    id: 3,
    creator:  "Maya Chen",
    initials: "MC",
    platform: "instagram",
    campaign: "Summer Glow",
    amount:   "$2,200",
    status:   "completed",
    contract: "Signed · Jun 1",
    payment:  "Paid Jun 20",
    tracks: [
      { label: "Script",    stage: "Approved",           owner: "done" },
      { label: "Content",   stage: "Approved",           owner: "done" },
      { label: "Payment",   stage: "Paid",               owner: "done" },
    ],
  },
];

/* ── constants ──────────────────────────────────────────── */
const STATUS_CONFIG: Record<DealStatus, { label: string; tone: string; color: string }> = {
  active:    { label: "Active",    tone: "blue",   color: "#3B82F6" },
  pending:   { label: "Pending",   tone: "orange", color: "#F59E0B" },
  signed:    { label: "Signed",    tone: "green",  color: "#10B981" },
  completed: { label: "Completed", tone: "green",  color: "#10B981" },
  void:      { label: "Void",      tone: "gray",   color: "#6B7280" },
};

const OWNER_CONFIG: Record<Track["owner"], { label: string; color: string; bg: string }> = {
  brand:   { label: "Needs you",  color: "#3B82F6", bg: "#EFF6FF" },
  creator: { label: "In progress",color: "#F59E0B", bg: "#FFFBEB" },
  done:    { label: "Done",       color: "#10B981", bg: "#ECFDF5" },
};

const PLATFORM_TONE: Record<string, string> = {
  instagram: "pink",
  tiktok:    "blue",
  youtube:   "red",
};

/* ── TrackPill ──────────────────────────────────────────── */
function TrackPill({ track }: { track: Track }) {
  const cfg = OWNER_CONFIG[track.owner];
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           2,
      padding:       "6px 10px",
      borderRadius:  8,
      background:    cfg.bg,
      border:        `1px solid ${cfg.color}22`,
      minWidth:      90,
    }}>
      <span style={{
        fontFamily: "var(--sd-font)",
        fontSize:   10,
        fontWeight: 600,
        color:      "var(--sd-font-tertiary)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}>
        {track.label}
      </span>
      <span style={{
        fontFamily: "var(--sd-font)",
        fontSize:   11,
        color:      cfg.color,
        fontWeight: 600,
      }}>
        {track.stage}
      </span>
    </div>
  );
}

/* ── DealRow ────────────────────────────────────────────── */
function DealRow({ deal, expanded, onToggle }: {
  deal: Deal;
  expanded: boolean;
  onToggle: () => void;
}) {
  const st = STATUS_CONFIG[deal.status];

  return (
    <div style={{
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 10,
      overflow:     "hidden",
    }}>
      {/* header row */}
      <div
        onClick={onToggle}
        style={{
          display:        "flex",
          alignItems:     "center",
          gap:            14,
          padding:        "12px 16px",
          background:     "var(--sd-bg-secondary)",
          cursor:         "pointer",
          userSelect:     "none",
        }}
      >
        {/* creator */}
        <Avatar size="sm" name={deal.creator} initials={deal.initials} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     13,
            fontWeight:   600,
            color:        "var(--sd-font-primary)",
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}>
            {deal.creator}
          </div>
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
          }}>
            {deal.campaign}
          </div>
        </div>

        {/* platform */}
        <Badge label={deal.platform} tone={PLATFORM_TONE[deal.platform] as any} variant="solid" size="sm" />

        {/* amount */}
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   14,
          fontWeight: 700,
          color:      "var(--sd-font-primary)",
          minWidth:   70,
          textAlign:  "right",
        }}>
          {deal.amount}
        </span>

        {/* status */}
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     11,
          fontWeight:   600,
          color:        st.color,
          background:   `${st.color}18`,
          borderRadius: 100,
          padding:      "3px 10px",
          whiteSpace:   "nowrap",
        }}>
          {st.label}
        </span>

        {/* chevron */}
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   16,
          color:      "var(--sd-font-tertiary)",
          transform:  expanded ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.15s",
        }}>
          ›
        </span>
      </div>

      {/* expanded detail */}
      {expanded && (
        <div style={{
          padding:    "12px 16px 16px",
          borderTop:  "1px solid var(--sd-border-default)",
          background: "var(--sd-bg-tertiary)",
          display:    "flex",
          flexDirection: "column",
          gap:        14,
        }}>
          {/* meta row */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "Contract", value: deal.contract },
              { label: "Payment",  value: deal.payment  },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{
                  fontFamily:    "var(--sd-font)",
                  fontSize:      10,
                  fontWeight:    600,
                  color:         "var(--sd-font-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}>
                  {f.label}
                </span>
                <span style={{
                  fontFamily: "var(--sd-font)",
                  fontSize:   13,
                  color:      "var(--sd-font-primary)",
                  fontWeight: 500,
                }}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          {/* tracks */}
          <div>
            <div style={{
              fontFamily:    "var(--sd-font)",
              fontSize:      10,
              fontWeight:    600,
              color:         "var(--sd-font-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom:  8,
            }}>
              Tracks
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {deal.tracks.map((t, i) => <TrackPill key={i} track={t} />)}
            </div>
          </div>

          {/* actions */}
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" size="sm">View deal</Button>
            <Button variant="secondary" size="sm">Message creator</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function DealCardDemo() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        marginBottom:   4,
      }}>
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   14,
          fontWeight: 600,
          color:      "var(--sd-font-primary)",
        }}>
          Summer Glow — Active Deals
        </span>
        <Button variant="primary" size="sm">+ New deal</Button>
      </div>
      {DEALS.map(deal => (
        <DealRow
          key={deal.id}
          deal={deal}
          expanded={expanded === deal.id}
          onToggle={() => setExpanded(expanded === deal.id ? null : deal.id)}
        />
      ))}
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "deal-card",
  title:       "Deal Card",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Expandable deal row showing creator, amount, status, and per-track progress — maps to DealOverviewCard + DealTrackCard.",
  description: "Collapsed: creator identity, platform, deal amount, and status pill. Expanded: contract and payment meta plus per-track status pills (brand needs you / in progress / done). Mirrors the DealOverviewCard / DealTrackCard pattern in the app.",
  demos: [
    {
      title:  "Summer Glow Campaign",
      render: () => <DealCardDemo />,
      block:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "deal",      type: "Deal",     required: true,  description: "Deal object with creator, amount, status, contract info, and track array." },
        { name: "expanded",  type: "boolean",  required: false, description: "Whether the detail section is visible." },
        { name: "onToggle",  type: "() => void", required: true, description: "Toggle callback for expand/collapse." },
      ],
    },
  ],
};

export default doc;
