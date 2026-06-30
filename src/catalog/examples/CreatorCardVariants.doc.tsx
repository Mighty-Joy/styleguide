"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── shared card shell ──────────────────────────────────── */
function CardShell({
  creator, handle, initials, avatarColor = "#6366F1",
  media, body, status, statusColor = "#6B7280", statusBg = "#F3F4F6",
  trailing, actions, onClick,
}: {
  creator:     string;
  handle:      string;
  initials:    string;
  avatarColor?: string;
  media?:      React.ReactNode;
  body?:       React.ReactNode;
  status:      string;
  statusColor?: string;
  statusBg?:   string;
  trailing?:   React.ReactNode;
  actions?:    React.ReactNode;
  onClick?:    () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display:       "flex",
        flexDirection: "column",
        border:        "1px solid var(--sd-border-default)",
        borderRadius:  12,
        overflow:      "hidden",
        background:    "var(--sd-bg-secondary)",
        cursor:        onClick ? "pointer" : "default",
        transition:    "box-shadow 0.12s ease",
      }}
      onMouseEnter={e => onClick && ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)")}
      onMouseLeave={e => onClick && ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
    >
      {/* thumbnail slot */}
      {media && (
        <div style={{ height: 72, background: "var(--sd-bg-tertiary)", overflow: "hidden", position: "relative" }}>
          {media}
        </div>
      )}

      {/* content */}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* creator identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width:          36,
            height:         36,
            borderRadius:   "50%",
            background:     `${avatarColor}20`,
            border:         `2px solid ${avatarColor}40`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            fontFamily:     "var(--sd-font)",
            fontSize:       12,
            fontWeight:     700,
            color:          avatarColor,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {creator}
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
              {handle}
            </div>
          </div>
          {trailing}
        </div>

        {/* context body */}
        {body && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {body}
          </div>
        )}

        {/* status pill */}
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     10,
          fontWeight:   600,
          color:        statusColor,
          background:   statusBg,
          borderRadius: 100,
          padding:      "3px 10px",
          alignSelf:    "flex-start",
          letterSpacing:"0.02em",
        }}>
          {status}
        </span>
      </div>

      {/* actions footer */}
      {actions && (
        <div style={{
          borderTop:  "1px solid var(--sd-border-default)",
          padding:    "8px 14px",
          display:    "flex",
          gap:        6,
          background: "var(--sd-bg-tertiary)",
        }}>
          {actions}
        </div>
      )}
    </div>
  );
}

/* ── context line ───────────────────────────────────────── */
function ContextLine({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 11, flexShrink: 0 }}>{icon}</span>
      <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
        {children}
      </span>
    </div>
  );
}

/* ── Thumbnail placeholder ──────────────────────────────── */
function Thumb({ emoji, bg = "#E0E7FF" }: { emoji: string; bg?: string }) {
  return (
    <div style={{
      width:          "100%",
      height:         "100%",
      background:     bg,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      fontSize:       28,
    }}>
      {emoji}
    </div>
  );
}

/* ── 1. Deal card ───────────────────────────────────────── */
function DealCard() {
  return (
    <CardShell
      creator="Priya Nair" handle="@priya.glows" initials="PN" avatarColor="#6366F1"
      body={
        <>
          <ContextLine icon="☀️">Summer Glow</ContextLine>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["📷 Reel", "📷 Story ×3"].map(d => (
              <span key={d} style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-secondary)", background: "var(--sd-bg-tertiary)", border: "1px solid var(--sd-border-default)", borderRadius: 6, padding: "2px 7px" }}>
                {d}
              </span>
            ))}
          </div>
        </>
      }
      trailing={
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>$1,200</div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>1 payment</div>
        </div>
      }
      status="Creator signed" statusColor="#10B981" statusBg="#ECFDF5"
      actions={<><Button variant="primary" size="sm">Review deal</Button><Button variant="secondary" size="sm">Message</Button></>}
    />
  );
}

/* ── 2. Content card ────────────────────────────────────── */
function ContentCard() {
  return (
    <CardShell
      creator="Leo Park" handle="@leopark.ttk" initials="LP" avatarColor="#3B82F6"
      media={<Thumb emoji="🎬" bg="#DBEAFE" />}
      body={
        <>
          <ContextLine icon="🎬">Summer Glow · Reel</ContextLine>
          <ContextLine icon="📅">Due Jul 5</ContextLine>
        </>
      }
      status="Script ready" statusColor="#F59E0B" statusBg="#FFFBEB"
      actions={<><Button variant="primary" size="sm">Review</Button><Button variant="secondary" size="sm">Remind</Button></>}
    />
  );
}

/* ── 3. Shipment card ───────────────────────────────────── */
function ShipmentCard() {
  return (
    <CardShell
      creator="Maya Chen" handle="@mayabeautyco" initials="MC" avatarColor="#EC4899"
      media={<Thumb emoji="📦" bg="#FCE7F3" />}
      body={
        <>
          <ContextLine icon="🧴">Glow Serum + 2 more</ContextLine>
          <ContextLine icon="📍">Austin, TX</ContextLine>
        </>
      }
      status="In transit" statusColor="#3B82F6" statusBg="#EFF6FF"
      actions={<><Button variant="primary" size="sm">Track</Button><Button variant="secondary" size="sm">Details</Button></>}
    />
  );
}

/* ── 4. Post card ───────────────────────────────────────── */
function PostCard() {
  return (
    <CardShell
      creator="Sofia Ruiz" handle="@sofiaruizbeauty" initials="SR" avatarColor="#10B981"
      media={<Thumb emoji="📲" bg="#D1FAE5" />}
      body={
        <>
          <ContextLine icon="📊">142K views · 8.4K likes</ContextLine>
          <ContextLine icon="📅">Posted Jun 28</ContextLine>
        </>
      }
      status="Live" statusColor="#10B981" statusBg="#ECFDF5"
      actions={<><Button variant="secondary" size="sm">View post</Button><Button variant="secondary" size="sm">Stats</Button></>}
    />
  );
}

/* ── 5. Marketplace card ────────────────────────────────── */
function MarketplaceCard() {
  return (
    <CardShell
      creator="Amir Hassan" handle="@amirh.creates" initials="AH" avatarColor="#8B5CF6"
      body={
        <>
          <ContextLine icon="👥">2.1M followers · YouTube</ContextLine>
          <ContextLine icon="💰">$2,000–$4,000 / post</ContextLine>
        </>
      }
      status="Available" statusColor="#6366F1" statusBg="#EEF2FF"
      actions={<><Button variant="primary" size="sm">Invite</Button><Button variant="secondary" size="sm">Profile</Button></>}
    />
  );
}

/* ── Demo ───────────────────────────────────────────────── */
type Variant = "deal" | "content" | "shipment" | "post" | "marketplace";

const VARIANTS: { id: Variant; label: string; description: string }[] = [
  { id: "deal",        label: "Deal",        description: "Amount + status + deliverable chips · used in DealCreatorCard" },
  { id: "content",     label: "Content",     description: "Thumbnail + deliverable + due date · used in ContentCreatorCard" },
  { id: "shipment",    label: "Shipment",    description: "Product + destination + tracking · used in ShipmentCreatorCard" },
  { id: "post",        label: "Post",        description: "Engagement stats + post date · used in PostCreatorCard" },
  { id: "marketplace", label: "Marketplace", description: "Followers + rate + availability · used in MarketplaceCreatorCard" },
];

const CARD: Record<Variant, React.ReactNode> = {
  deal:        <DealCard />,
  content:     <ContentCard />,
  shipment:    <ShipmentCard />,
  post:        <PostCard />,
  marketplace: <MarketplaceCard />,
};

function CreatorCardVariantsDemo() {
  const [active, setActive] = useState<Variant>("deal");
  const info = VARIANTS.find(v => v.id === active)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* variant switcher */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {VARIANTS.map(v => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     12,
              fontWeight:   active === v.id ? 700 : 500,
              padding:      "6px 14px",
              borderRadius: 100,
              border:       `1px solid ${active === v.id ? "#6366F1" : "var(--sd-border-default)"}`,
              background:   active === v.id ? "#EEF2FF" : "transparent",
              color:        active === v.id ? "#6366F1" : "var(--sd-font-tertiary)",
              cursor:       "pointer",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* description */}
      <div style={{
        fontFamily:   "var(--sd-font)",
        fontSize:     12,
        color:        "var(--sd-font-tertiary)",
        padding:      "8px 12px",
        background:   "var(--sd-bg-tertiary)",
        borderRadius: 8,
        border:       "1px solid var(--sd-border-default)",
      }}>
        <strong style={{ color: "var(--sd-font-secondary)" }}>{info.label}</strong> — {info.description}
      </div>

      {/* single card preview */}
      <div style={{ maxWidth: 280 }}>
        {CARD[active]}
      </div>

      {/* all 5 side by side */}
      <div>
        <div style={{
          fontFamily:    "var(--sd-font)",
          fontSize:      10,
          fontWeight:    700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color:         "var(--sd-font-tertiary)",
          marginBottom:  12,
        }}>
          All variants
        </div>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap:                 12,
        }}>
          {VARIANTS.map(v => (
            <div key={v.id}>
              <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {v.label}
              </div>
              {CARD[v.id]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "creator-card-variants",
  title:       "Creator Card Variants",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "All 5 creator card variants (Deal, Content, Shipment, Post, Marketplace) — the standard card shell used across every record list in the app.",
  description: "The creator card is the canonical row unit across every list in the app. Each variant uses the same shell (avatar + name/handle + context body + status pill + actions footer) but surfaces different contextual data. Switch between variants using the selector. Maps to DealCreatorCard, ContentCreatorCard, ShipmentCreatorCard, PostCreatorCard, and MarketplaceCreatorCard in the app.",
  demos: [
    {
      title:   "Creator Card Variants",
      render:  () => <CreatorCardVariantsDemo />,
      block:   true,
      plain:   true,
      maxWidth: 880,
    },
  ],
  props: [
    {
      rows: [
        { name: "creator",     type: "CreatorRef",     required: true,  description: "Creator identity — name, handle, avatar." },
        { name: "status",      type: "string",         required: true,  description: "Status pill label (e.g. 'Creator signed', 'In transit', 'Live')." },
        { name: "statusColor", type: "string",         required: false, description: "CSS color for the status pill text." },
        { name: "media",       type: "React.ReactNode",required: false, description: "Thumbnail slot — 72px tall, shown in Content / Shipment / Post variants." },
        { name: "body",        type: "React.ReactNode",required: false, description: "Context lines (deliverable, date, destination, stats)." },
        { name: "trailing",    type: "React.ReactNode",required: false, description: "Right-aligned trailing content — amount in Deal, follower count in Marketplace." },
        { name: "actions",     type: "React.ReactNode",required: false, description: "Footer action buttons (primary + secondary)." },
        { name: "onClick",     type: "() => void",     required: false, description: "Opens detail drawer or navigates to detail page." },
      ],
    },
  ],
};

export default doc;
