"use client";
import React from "react";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── seed data ──────────────────────────────────────────── */
const CAMPAIGNS = [
  { id: "c1", name: "Summer Glow",      deals: 6 },
  { id: "c2", name: "Fall Collection",  deals: 4 },
  { id: "c3", name: "Glow Up UGC",      deals: 2 },
  { id: "c4", name: "Holiday Push",     deals: 8 },
  { id: "c5", name: "Q4 Launch",        deals: 0 },
  { id: "c6", name: "Micro-Influencer", deals: 3 },
];

type Platform = "instagram" | "tiktok" | "youtube" | "ugc";

type DeliverableChip = { platform: Platform; label: string };

type Deal = {
  id:           string;
  name:         string;
  handle:       string;
  initials:     string;
  campaign:     string;
  amount:       string;
  paymentLabel: string;
  deliverables: DeliverableChip[];
  status:       string;
  statusColor:  string;
  actionLabel?: string;
};

const DEALS: Deal[] = [
  {
    id: "d1",
    name: "Priya Nair", handle: "@priya.glows", initials: "PN",
    campaign: "Summer Glow", amount: "$1,200", paymentLabel: "2 payments",
    deliverables: [{ platform: "instagram", label: "Reel" }, { platform: "instagram", label: "Story" }],
    status: "Awaiting signature", statusColor: "#F59E0B",
    actionLabel: "Counter-sign",
  },
  {
    id: "d2",
    name: "Leo Park", handle: "@leopark.ttk", initials: "LP",
    campaign: "Summer Glow", amount: "$800", paymentLabel: "1 payment",
    deliverables: [{ platform: "tiktok", label: "Integration" }],
    status: "Content submitted", statusColor: "#6366F1",
    actionLabel: "Approve content",
  },
  {
    id: "d3",
    name: "Maya Chen", handle: "@mayabeautyco", initials: "MC",
    campaign: "Fall Collection", amount: "$2,400", paymentLabel: "3 payments",
    deliverables: [{ platform: "youtube", label: "Integration" }, { platform: "ugc", label: "Content" }],
    status: "Creator signed", statusColor: "#10B981",
    actionLabel: "Counter-sign",
  },
  {
    id: "d4",
    name: "Sofia Ruiz", handle: "@sofiaruizbeauty", initials: "SR",
    campaign: "Glow Up UGC", amount: "$650", paymentLabel: "1 payment",
    deliverables: [{ platform: "instagram", label: "Story" }, { platform: "instagram", label: "Story" }, { platform: "instagram", label: "Story" }],
    status: "Active", statusColor: "#6B7280",
  },
  {
    id: "d5",
    name: "Amir Hassan", handle: "@amirh.creates", initials: "AH",
    campaign: "Holiday Push", amount: "$3,500", paymentLabel: "2 payments",
    deliverables: [{ platform: "tiktok", label: "Reel" }, { platform: "instagram", label: "Reel" }],
    status: "Payment due", statusColor: "#8B5CF6",
    actionLabel: "Release payment",
  },
];

/* ── helpers ────────────────────────────────────────────── */
const PLATFORM_ICONS: Record<Platform, string> = {
  instagram: "IG",
  tiktok:    "TK",
  youtube:   "YT",
  ugc:       "🎬",
};

function PlatformGlyph({ platform }: { platform: Platform }) {
  return (
    <span style={{
      fontFamily: "var(--sd-font)",
      fontSize:   9,
      fontWeight: 700,
      color:      "var(--sd-font-tertiary)",
      opacity:    0.75,
    }}>
      {PLATFORM_ICONS[platform]}
    </span>
  );
}

/* ── CampaignCard ───────────────────────────────────────── */
function CampaignCard({ name, deals }: { name: string; deals: number }) {
  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          10,
      padding:      "10px 12px",
      background:   "var(--sd-bg-secondary)",
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 12,
      cursor:       "pointer",
    }}>
      <div style={{
        width:          32,
        height:         32,
        borderRadius:   8,
        flexShrink:     0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#EEF2FF",
        color:          "#6366F1",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     13,
          fontWeight:   600,
          color:        "var(--sd-font-primary)",
          whiteSpace:   "nowrap",
          overflow:     "hidden",
          textOverflow: "ellipsis",
        }}>
          {name}
        </div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
          {deals} deal{deals !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

/* ── SectionHeader ──────────────────────────────────────── */
function SectionHeader({ title, actionLabel }: { title: string; actionLabel: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{
        fontFamily:    "var(--sd-font)",
        fontSize:      12,
        fontWeight:    700,
        color:         "var(--sd-font-tertiary)",
      }}>
        {title}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Button variant="secondary" size="sm">+ {actionLabel}</Button>
        <span style={{
          fontFamily:  "var(--sd-font)",
          fontSize:    11,
          color:       "var(--sd-font-tertiary)",
          cursor:      "pointer",
          display:     "flex",
          alignItems:  "center",
          gap:         2,
        }}>
          See all ›
        </span>
      </div>
    </div>
  );
}

/* ── DealRow ────────────────────────────────────────────── */
function DealRow({ deal }: { deal: Deal }) {
  const MAX_CHIPS = 4;
  const shown = deal.deliverables.slice(0, MAX_CHIPS);
  const extra = deal.deliverables.length - shown.length;

  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          12,
      padding:      "10px 14px",
      background:   "var(--sd-bg-secondary)",
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 12,
      cursor:       "pointer",
    }}>
      {/* avatar */}
      <div style={{
        width:          34,
        height:         34,
        borderRadius:   "50%",
        background:     "#EEF2FF",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     "var(--sd-font)",
        fontSize:       11,
        fontWeight:     700,
        color:          "#6366F1",
        flexShrink:     0,
      }}>
        {deal.initials}
      </div>

      {/* identity + body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>
          {deal.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginTop: 3 }}>
          {/* campaign context */}
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
            {deal.campaign}
          </span>
          {/* amount (hero) */}
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            {deal.amount}
          </span>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
            {deal.paymentLabel}
          </span>
          {/* deliverable chips */}
          {shown.map((d, i) => (
            <span key={i} style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          4,
              padding:      "3px 8px",
              borderRadius: 8,
              background:   "var(--sd-bg-tertiary)",
              fontFamily:   "var(--sd-font)",
              fontSize:     11,
            }}>
              <PlatformGlyph platform={d.platform} />
              {d.label}
            </span>
          ))}
          {extra > 0 && (
            <span style={{
              padding:    "3px 8px",
              borderRadius:8,
              background: "var(--sd-bg-tertiary)",
              fontFamily: "var(--sd-font)",
              fontSize:   11,
              color:      "var(--sd-font-tertiary)",
            }}>
              +{extra}
            </span>
          )}
        </div>
      </div>

      {/* trailing: status pill + action */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     10,
          fontWeight:   600,
          color:        deal.statusColor,
          background:   `${deal.statusColor}18`,
          borderRadius: 100,
          padding:      "3px 10px",
          whiteSpace:   "nowrap",
        }}>
          {deal.status}
        </span>
        {deal.actionLabel && (
          <Button variant="primary" size="sm">{deal.actionLabel}</Button>
        )}
      </div>
    </div>
  );
}

/* ── PageHeader ─────────────────────────────────────────── */
function PageHeader() {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 22, fontWeight: 800, color: "var(--sd-font-primary)" }}>
        Home
      </div>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", marginTop: 3 }}>
        An overview of your recent activity and quick actions
      </div>
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function BrandHomeViewDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PageHeader />

      {/* campaigns */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SectionHeader title="Campaigns" actionLabel="Create campaign" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {CAMPAIGNS.map(c => <CampaignCard key={c.id} {...c} />)}
        </div>
      </div>

      {/* active deals */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
        <SectionHeader title="Active deals" actionLabel="Create deal" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {DEALS.map(d => <DealRow key={d.id} deal={d} />)}
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug:        "brand-home-view",
  title:       "Brand Home View",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Brand home — page header, 3-col campaign grid, and active deal rows with deliverable chips and action buttons.",
  description: "The brand operator home page (HomeView.tsx). PageHeader, then a 3-column SimpleGrid of minimal CampaignCards (folder icon + name + deal count), followed by a stack of DealCreatorCard rows showing creator identity, campaign, amount, deliverable chips, status pill, and optional action button. Action-needed deals float to the top.",
  demos: [
    { title: "Aura Labs home", render: () => <BrandHomeViewDemo />, block: true, plain: true, maxWidth: 880 },
  ],
  props: [
    {
      rows: [
        { name: "campaigns",   type: "WorkspaceCampaign[]", required: true,  description: "Up to 6 campaigns from useCampaign store, shown as folder tiles." },
        { name: "deals",       type: "HomeDeal[]",          required: true,  description: "Up to 5 active deals, action-needed first." },
        { name: "onNewCampaign", type: "() => void",        required: false, description: "Opens CreateCampaignModal." },
        { name: "onNewDeal",   type: "() => void",          required: false, description: "Opens CreateDealModal." },
        { name: "onOpenDeal",  type: "(id: string) => void",required: false, description: "Navigate to deal detail page." },
      ],
    },
  ],
};

export default doc;
