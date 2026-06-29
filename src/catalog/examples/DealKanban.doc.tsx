"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBolt,
  IconCalendar,
  IconPhoto,
  IconPlus,
  IconDotsVertical,
  IconGift,
  IconVideo,
  IconUsers,
  IconTrendingUp,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type DealType = "GIFTING" | "UGC" | "PAID" | "EVENT" | "AFFILIATE";
type DealStage = "outreach" | "interested" | "contracted" | "active" | "completed";
type Platform = "instagram" | "tiktok" | "youtube";

interface Deal {
  id: string;
  creatorName: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  type: DealType;
  platform: Platform;
  amount?: string;
  deliverables: number;
  dueDate?: string;
  stage: DealStage;
}

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const DEAL_TYPE_META: Record<DealType, { label: string; icon: React.ElementType; tone: keyof typeof TONES }> = {
  GIFTING:   { label: "Gifting",   icon: IconGift,       tone: "pink" },
  UGC:       { label: "UGC",       icon: IconVideo,      tone: "blue" },
  PAID:      { label: "Paid Post", icon: IconBolt,       tone: "green" },
  EVENT:     { label: "Event",     icon: IconUsers,      tone: "orange" },
  AFFILIATE: { label: "Affiliate", icon: IconTrendingUp, tone: "purple" },
};

const STAGES: { id: DealStage; label: string; tone: keyof typeof TONES }[] = [
  { id: "outreach",   label: "Outreach",   tone: "yellow" },
  { id: "interested", label: "Interested", tone: "blue" },
  { id: "contracted", label: "Contracted", tone: "orange" },
  { id: "active",     label: "Active",     tone: "sky" },
  { id: "completed",  label: "Completed",  tone: "green" },
];

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok,
  youtube: IconBrandYoutube,
};

const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "#e1306c",
  tiktok: "#010101",
  youtube: "#ff0000",
};

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const INITIAL_DEALS: Deal[] = [
  // Outreach
  { id: "1",  creatorName: "Theo Vance",   creatorInitials: "T", creatorTone: "orange", type: "GIFTING", platform: "instagram", deliverables: 1, dueDate: "Aug 5",  stage: "outreach" },
  { id: "2",  creatorName: "Zara Kim",     creatorInitials: "Z", creatorTone: "sky",    type: "UGC",     platform: "tiktok",   deliverables: 2, dueDate: "Aug 12", stage: "outreach" },
  { id: "3",  creatorName: "Carlos Reyes", creatorInitials: "C", creatorTone: "blue",   type: "PAID",    platform: "youtube",  amount: "$3,200", deliverables: 1,  stage: "outreach" },
  // Interested
  { id: "4",  creatorName: "Maya Rivers",  creatorInitials: "M", creatorTone: "pink",   type: "PAID",    platform: "instagram", amount: "$2,500", deliverables: 3, dueDate: "Aug 15", stage: "interested" },
  { id: "5",  creatorName: "Iris Bloom",   creatorInitials: "I", creatorTone: "purple", type: "GIFTING", platform: "tiktok",   deliverables: 1, dueDate: "Aug 10", stage: "interested" },
  // Contracted
  { id: "6",  creatorName: "Priya Nair",   creatorInitials: "P", creatorTone: "purple", type: "PAID",    platform: "instagram", amount: "$2,500", deliverables: 3, dueDate: "Aug 15", stage: "contracted" },
  { id: "7",  creatorName: "Leo Park",     creatorInitials: "L", creatorTone: "blue",   type: "UGC",     platform: "youtube",  amount: "$4,000", deliverables: 1, dueDate: "Aug 10", stage: "contracted" },
  // Active
  { id: "8",  creatorName: "Nina Cole",    creatorInitials: "N", creatorTone: "green",  type: "PAID",    platform: "tiktok",   amount: "$1,200", deliverables: 2, dueDate: "Jul 30", stage: "active" },
  { id: "9",  creatorName: "Sam Okafor",   creatorInitials: "S", creatorTone: "orange", type: "AFFILIATE",platform: "instagram", deliverables: 4, dueDate: "Jul 25", stage: "active" },
  // Completed
  { id: "10", creatorName: "Jade Liu",     creatorInitials: "J", creatorTone: "sky",    type: "PAID",    platform: "instagram", amount: "$1,800", deliverables: 2, dueDate: "Jun 30", stage: "completed" },
  { id: "11", creatorName: "Amir Hassan",  creatorInitials: "A", creatorTone: "green",  type: "GIFTING", platform: "tiktok",   deliverables: 1, dueDate: "Jun 28", stage: "completed" },
];

/* ------------------------------------------------------------------ */
/* DealCard                                                              */
/* ------------------------------------------------------------------ */

function DealCard({ deal, onMove }: { deal: Deal; onMove: (id: string, stage: DealStage) => void }) {
  const meta = DEAL_TYPE_META[deal.type];
  const DealIcon = meta.icon;
  const PlatformIcon = PLATFORM_ICONS[deal.platform];
  const t = TONES[deal.creatorTone];

  const stageIdx = STAGES.findIndex(s => s.id === deal.stage);

  return (
    <div style={{ background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: "10px 12px 10px", cursor: "pointer", transition: "border-color 0.1s, box-shadow 0.1s" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--sd-border-medium)"; el.style.boxShadow = "0 2px 8px -2px rgba(0,0,0,0.10)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--sd-border-light)"; el.style.boxShadow = "none"; }}
    >
      {/* Deal type + platform */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <Badge label={meta.label} tone={meta.tone} icon={DealIcon} size="sm" />
        <span title={deal.platform} style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--sd-bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", color: PLATFORM_COLORS[deal.platform] }}>
          <PlatformIcon size={11} />
        </span>
      </div>

      {/* Creator */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <Avatar initials={deal.creatorInitials} tone={deal.creatorTone} size="sm" />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{deal.creatorName}</span>
      </div>

      {/* Amount + deliverables */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: deal.dueDate ? 8 : 0 }}>
        {deal.amount && (
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>{deal.amount}</span>
        )}
        {!deal.amount && (
          <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>Gifting</span>
        )}
        <span style={{ display: "flex", alignItems: "center", gap: 3, marginLeft: "auto", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
          <IconPhoto size={11} />{deal.deliverables} deliverable{deal.deliverables !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Due date + move buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--sd-border-light)" }}>
        {deal.dueDate ? (
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--sd-font-tertiary)" }}>
            <IconCalendar size={10} />{deal.dueDate}
          </span>
        ) : <span />}
        <div style={{ display: "flex", gap: 3 }}>
          {stageIdx > 0 && (
            <Button variant="ghost" iconOnly size="sm" aria-label={`Move to ${STAGES[stageIdx - 1].label}`}
              onClick={() => onMove(deal.id, STAGES[stageIdx - 1].id)}>
              ←
            </Button>
          )}
          {stageIdx < STAGES.length - 1 && (
            <Button variant="ghost" iconOnly size="sm" aria-label={`Move to ${STAGES[stageIdx + 1].label}`}
              onClick={() => onMove(deal.id, STAGES[stageIdx + 1].id)}>
              →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Kanban column                                                         */
/* ------------------------------------------------------------------ */

function KanbanColumn({ stage, deals, onMove }: {
  stage: typeof STAGES[0];
  deals: Deal[];
  onMove: (id: string, to: DealStage) => void;
}) {
  const t = TONES[stage.tone];
  const totalValue = deals
    .filter(d => d.amount)
    .reduce((sum, d) => sum + parseFloat(d.amount!.replace(/[$,]/g, "")), 0);

  return (
    <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Column header */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 2px 4px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.solid }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>{stage.label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "0 6px", height: 16, display: "flex", alignItems: "center" }}>{deals.length}</span>
        {totalValue > 0 && (
          <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)" }}>
            ${(totalValue / 1000).toFixed(1)}K
          </span>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {deals.map(deal => <DealCard key={deal.id} deal={deal} onMove={onMove} />)}
      </div>

      {/* Add deal */}
      <Button variant="tertiary" size="sm" leftIcon={<IconPlus size={12} />}>
        Add deal
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Board demo                                                            */
/* ------------------------------------------------------------------ */

function DealKanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);

  const move = (id: string, stage: DealStage) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage } : d));
  };

  const totalPipeline = deals
    .filter(d => d.amount && d.stage !== "completed")
    .reduce((sum, d) => sum + parseFloat(d.amount!.replace(/[$,]/g, "")), 0);

  const totalWon = deals
    .filter(d => d.amount && d.stage === "completed")
    .reduce((sum, d) => sum + parseFloat(d.amount!.replace(/[$,]/g, "")), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Board toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>Deal Pipeline</span>
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)", background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "2px 8px", fontWeight: 600 }}>{deals.length} deals</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: "var(--sd-font-secondary)", fontWeight: 500 }}>Pipeline: <strong style={{ color: "var(--sd-font-primary)" }}>${(totalPipeline / 1000).toFixed(1)}K</strong></span>
        <span style={{ fontSize: 12, color: TONES.green.text, fontWeight: 500 }}>Won: <strong>${(totalWon / 1000).toFixed(1)}K</strong></span>
        <Button variant="primary" size="sm" leftIcon={<IconPlus size={13} />}>
          New deal
        </Button>
      </div>

      {/* Board */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
        {STAGES.map(stage => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            deals={deals.filter(d => d.stage === stage.id)}
            onMove={move}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "deal-kanban",
  title: "Deal Pipeline",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Kanban board for the deal pipeline — 5 stages, deal type badges, creator identity, amount, move arrows.",
  description:
    "The Deal Pipeline board maps to the `EngagementStatus` lifecycle from `apps/web`: Outreach → Interested → Contracted → Active → Completed. Each DealCard shows the deal type badge (Gifting/UGC/Paid Post/Event/Affiliate) in a toned pill, the creator avatar + name, amount (or 'Gifting'), deliverable count, due date, and ← → move buttons. Column headers show deal count + total committed value. Click ← → arrows to move a deal between stages.",
  demos: [
    {
      title: "Deal pipeline board",
      description: "Click the ← → arrows on any deal card to move it between stages. Pipeline and Won totals update live.",
      block: true,
      render: () => <DealKanbanBoard />,
    },
  ],
  props: [],
};

export default doc;
