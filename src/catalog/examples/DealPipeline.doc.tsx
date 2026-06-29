"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconArrowRight,
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconPlus,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

type DealStage =
  | "outreach"
  | "response"
  | "negotiation"
  | "contract"
  | "active"
  | "complete";

const STAGES: { key: DealStage; label: string; color: string; bg: string }[] = [
  { key: "outreach",    label: "Outreach",    color: "#6b7280", bg: "#f3f4f6" },
  { key: "response",   label: "Response",    color: "#2563eb", bg: "#eff6ff" },
  { key: "negotiation",label: "Negotiating", color: "#d97706", bg: "#fffbeb" },
  { key: "contract",   label: "Contract",    color: "#7c3aed", bg: "#f5f3ff" },
  { key: "active",     label: "Active",      color: "#16a34a", bg: "#f0fdf4" },
  { key: "complete",   label: "Complete",    color: "#0891b2", bg: "#ecfeff" },
];

interface Deal {
  id: string;
  creator: string;
  platform: string;
  value: number;
  stage: DealStage;
  daysInStage: number;
  campaign: string;
}

const DEALS: Deal[] = [
  { id: "1",  creator: "Priya Nair",   platform: "instagram", value: 15000, stage: "active",      daysInStage: 3,  campaign: "Atlas X" },
  { id: "2",  creator: "Diego Santos", platform: "tiktok",    value: 11000, stage: "active",      daysInStage: 1,  campaign: "Atlas X" },
  { id: "3",  creator: "Marcus Webb",  platform: "tiktok",    value: 22000, stage: "contract",    daysInStage: 2,  campaign: "Atlas X" },
  { id: "4",  creator: "Hana Kim",     platform: "instagram", value: 18000, stage: "negotiation", daysInStage: 5,  campaign: "Atlas X" },
  { id: "5",  creator: "Liam Park",    platform: "youtube",   value: 45000, stage: "negotiation", daysInStage: 8,  campaign: "Atlas X" },
  { id: "6",  creator: "Aisha Obi",    platform: "instagram", value: 9000,  stage: "response",    daysInStage: 2,  campaign: "Atlas X" },
  { id: "7",  creator: "Sam Torres",   platform: "youtube",   value: 30000, stage: "response",    daysInStage: 4,  campaign: "Atlas X" },
  { id: "8",  creator: "Mia Chen",     platform: "instagram", value: 12000, stage: "outreach",    daysInStage: 1,  campaign: "Atlas X" },
  { id: "9",  creator: "Jay Okafor",   platform: "tiktok",    value: 8000,  stage: "outreach",    daysInStage: 3,  campaign: "Atlas X" },
  { id: "10", creator: "Zara Ahmed",   platform: "youtube",   value: 25000, stage: "complete",    daysInStage: 0,  campaign: "Atlas X" },
];

function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
}

function DealRow({ deal }: { deal: Deal }) {
  const stageInfo = STAGES.find((s) => s.key === deal.stage)!;
  const isStale = deal.daysInStage >= 5;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        borderRadius: 8,
        background: "#fff",
        border: "1px solid var(--sd-border-default, #ebebeb)",
        cursor: "pointer",
        transition: "box-shadow 0.12s",
      }}
    >
      <Avatar name={deal.creator} size="sm" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary, #333)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {deal.creator}
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
          {deal.platform} · {deal.campaign}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary, #333)" }}>
          {fmt(deal.value)}
        </div>
        {deal.daysInStage > 0 && (
          <div style={{ fontSize: 10, color: isStale ? "var(--sd-orange-solid, #f97316)" : "var(--sd-font-tertiary, #999)" }}>
            {deal.daysInStage}d here{isStale ? " ⚠" : ""}
          </div>
        )}
      </div>
    </div>
  );
}

function StageColumn({ stage, deals }: { stage: typeof STAGES[0]; deals: Deal[] }) {
  const [expanded, setExpanded] = useState(true);
  const total = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Stage header */}
      <div
        style={{
          background: stage.bg,
          borderRadius: 10,
          padding: "10px 12px",
          border: `1px solid ${stage.color}22`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: stage.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {stage.label}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: "none", border: "none", cursor: "pointer", color: stage.color, display: "flex", padding: 0 }}
          >
            {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
            {deals.length} deal{deals.length !== 1 ? "s" : ""}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary, #333)" }}>
            {fmt(total)}
          </span>
        </div>
      </div>

      {/* Deal rows */}
      {expanded && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {deals.map((d) => <DealRow key={d.id} deal={d} />)}
          {deals.length === 0 && (
            <div style={{ padding: "20px 0", textAlign: "center", fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>
              No deals
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Demo() {
  const totalValue = DEALS.reduce((s, d) => s + d.value, 0);
  const activeDeals = DEALS.filter((d) => d.stage !== "complete");

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--sd-font-primary, #333)" }}>Deal Pipeline</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>
            {activeDeals.length} active · {fmt(totalValue)} total pipeline
          </div>
        </div>
        <Button variant="brand" size="sm" leftIcon={<IconPlus size={13} />}>
          Add deal
        </Button>
      </div>

      {/* Conversion funnel bar */}
      <div style={{ display: "flex", gap: 2, marginBottom: 20, alignItems: "center" }}>
        {STAGES.map((s, i) => {
          const count = DEALS.filter((d) => d.stage === s.key).length;
          const pct = Math.round((count / DEALS.length) * 100);
          return (
            <React.Fragment key={s.key}>
              <div
                style={{
                  flex: count || 0.2,
                  height: 8,
                  borderRadius: i === 0 ? "99px 0 0 99px" : i === STAGES.length - 1 ? "0 99px 99px 0" : 0,
                  background: s.color,
                  opacity: 0.7 + (count / DEALS.length) * 0.3,
                  minWidth: 8,
                }}
                title={`${s.label}: ${count} (${pct}%)`}
              />
              {i < STAGES.length - 1 && (
                <IconArrowRight size={10} color="var(--sd-border-medium, #ccc)" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Pipeline columns */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", overflowX: "auto", paddingBottom: 8 }}>
        {STAGES.map((s) => (
          <StageColumn
            key={s.key}
            stage={s}
            deals={DEALS.filter((d) => d.stage === s.key)}
          />
        ))}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "deal-pipeline",
  title: "DealPipeline",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Visual deal pipeline — stage columns with creator rows, deal value, days-in-stage staleness indicator, and conversion funnel bar.",
  description:
    "Six-stage pipeline (Outreach → Response → Negotiating → Contract → Active → Complete). Each column shows deal count + total value. Creator rows show name, platform, value, and days-in-stage with orange warning at 5+ days. Conversion funnel bar at top shows relative stage distribution. Columns are collapsible. Uses only Avatar, Badge, and Button primitives.",
  demos: [
    {
      title: "Atlas X campaign pipeline",
      description: "10 deals across 6 stages. Stale deals (5+ days) flagged in orange.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
