"use client";

import React, { useState } from "react";
import {
  IconArrowUpRight,
  IconDotsVertical,
  IconCircleCheck,
  IconCircleX,
  IconMessage2,
  IconBolt,
  IconSend,
} from "@tabler/icons-react";
import RecordList from "@/components/ui/RecordList";
import CreatorCell from "@/components/Creator/CreatorCell";
import type { CreatorPlatform } from "@/components/Creator/CreatorIdentity";
import { TONES } from "@/tokens/tones";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type RowStage = "invited" | "pending" | "review" | "approved" | "rejected" | "contracted";

interface RosterCreator {
  id: string;
  name: string;
  handle: string;
  stage: RowStage;
  deliverables: string;
  followers: Partial<Record<CreatorPlatform, number>>;
  unreadComments?: number;
}

const ROSTER: RosterCreator[] = [
  { id: "1", name: "Maya Rivers",  handle: "@mayarivers", stage: "review",     deliverables: "3 of 4", followers: { instagram: 128000, tiktok: 2300000 }, unreadComments: 2 },
  { id: "2", name: "Leo Park",     handle: "@leopark",    stage: "contracted", deliverables: "1 of 2", followers: { youtube: 540000, instagram: 41000 } },
  { id: "3", name: "Nina Cole",    handle: "@ninacole",   stage: "approved",   deliverables: "2 of 2", followers: { tiktok: 86000, instagram: 22000 }, unreadComments: 1 },
  { id: "4", name: "Theo Vance",   handle: "@theovance",  stage: "invited",    deliverables: "—",      followers: { youtube: 12000 } },
  { id: "5", name: "Priya Nair",   handle: "@priya",      stage: "review",     deliverables: "—",      followers: { instagram: 340000, tiktok: 820000 }, unreadComments: 4 },
  { id: "6", name: "Jordan Lee",   handle: "@jordanlee",  stage: "rejected",   deliverables: "—",      followers: { instagram: 55000 } },
];

/* ------------------------------------------------------------------ */
/* Stage pill                                                            */
/* ------------------------------------------------------------------ */

const STAGE_TONE: Record<RowStage, keyof typeof TONES | null> = {
  invited: "blue", pending: "yellow", review: "orange",
  approved: "green", rejected: "red", contracted: null,
};
const STAGE_LABEL: Record<RowStage, string> = {
  invited: "Invited", pending: "Pending", review: "In review",
  approved: "Approved", rejected: "Rejected", contracted: "Contracted",
};

function StagePill({ stage }: { stage: RowStage }) {
  const tone = STAGE_TONE[stage];
  const label = STAGE_LABEL[stage];
  if (!tone) {
    return <Badge label={label} tone="green" variant="outline" />;
  }
  return <Badge label={label} tone={tone} variant="status" dot />;
}

/* ------------------------------------------------------------------ */
/* Row actions — exactly mirrors apps/web CreatorsTable                 */
/* ------------------------------------------------------------------ */

function CommentsBtn({ count }: { count?: number }) {
  return (
    <div style={{ position: "relative" }}>
      <Button variant="secondary" size="sm" iconOnly aria-label="Comments">
        <IconMessage2 size={16} />
      </Button>
      {count != null && count > 0 && (
        <span style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, border: "1.5px solid var(--sd-bg-primary)", zIndex: 1, pointerEvents: "none" }}>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
}

function RejectBtn({ onReject }: { onReject: () => void }) {
  return (
    <Button variant="danger" size="sm" leftIcon={<IconCircleX size={14} />} onClick={onReject}>
      Reject
    </Button>
  );
}

function ApproveBtn({ onApprove }: { onApprove: () => void }) {
  return (
    <Button variant="primary" size="sm" leftIcon={<IconCircleCheck size={14} />} onClick={onApprove}>
      Approve
    </Button>
  );
}

function CreateDealBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="secondary" size="sm" leftIcon={<IconBolt size={12} />} onClick={onClick}>
      Deal
    </Button>
  );
}

function SendBtn({ label = "Send" }: { label?: string }) {
  return (
    <Button variant="secondary" size="sm" leftIcon={<IconSend size={14} />}>
      {label}
    </Button>
  );
}

function MoreBtn() {
  return (
    <Button variant="tertiary" size="sm" iconOnly aria-label="More">
      <IconDotsVertical size={15} />
    </Button>
  );
}

function RowActions({ creator, onStageChange }: { creator: RosterCreator; onStageChange: (id: string, stage: RowStage) => void }) {
  const { stage } = creator;

  const handleApprove = () => { onStageChange(creator.id, "approved"); };
  const handleReject  = () => { onStageChange(creator.id, "rejected"); };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
      {/* Approve / Reject for review stage */}
      {stage === "review" && (
        <>
          <RejectBtn onReject={handleReject} />
          <ApproveBtn onApprove={handleApprove} />
        </>
      )}

      {/* Approved / Rejected state badges */}
      {stage === "approved" && <Badge label="Approved" tone="green" variant="outline" />}
      {stage === "rejected" && <Badge label="Rejected" tone="red" variant="outline" />}

      {/* Send / Remind for outreach stage */}
      {stage === "invited" && <SendBtn label="Remind" />}

      {/* Create Deal (for contracted / approved) */}
      {(stage === "contracted" || stage === "approved") && (
        <CreateDealBtn onClick={() => {}} />
      )}

      {/* Open creator profile */}
      {stage === "contracted" && (
        <Button variant="tertiary" size="sm" iconOnly aria-label="View profile">
          <IconArrowUpRight size={15} />
        </Button>
      )}

      {/* Comments — always visible for campaign creators */}
      <CommentsBtn count={creator.unreadComments} />

      {/* ⋯ more */}
      <MoreBtn />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

function CampaignRoster() {
  const [selected, setSelected] = useState<string[]>([]);
  const [roster, setRoster] = useState<RosterCreator[]>(ROSTER);
  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const handleStageChange = (id: string, stage: RowStage) => {
    setRoster((prev) => prev.map((c) => c.id === id ? { ...c, stage } : c));
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Summer Launch · Roster</h4>
        <span style={{ fontSize: 13, color: "var(--sd-font-tertiary)" }}>
          {selected.length ? `${selected.length} selected` : `${roster.length} creators`}
        </span>
      </div>
      <RecordList<RosterCreator>
        items={roster}
        getId={(c) => c.id}
        leadHeader="Creator"
        lead={(c) => (
          <CreatorCell name={c.name} handle={c.handle} followers={c.followers} />
        )}
        columns={[
          {
            key: "stage",
            header: "Stage",
            render: (c) => <StagePill stage={c.stage} />,
            collapseOnMobile: true,
          },
          {
            key: "deliverables",
            header: "Deliverables",
            render: (c) => (
              <span style={{ fontSize: 13, color: "var(--sd-font-secondary)" }}>
                {c.deliverables}
              </span>
            ),
            collapseOnMobile: true,
          },
        ]}
        actions={(c) => <RowActions creator={c} onStageChange={handleStageChange} />}
        selection={{ selectedIds: selected, onToggle: toggle, ariaLabel: (c) => `Select ${c.name}` }}
        onRowClick={() => {}}
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-record-list",
  title: "Creator Record List",
  group: "Patterns",
  status: "stable",
  summary:
    "The full creator roster pattern: CreatorCell in RecordList with stage pill, Reject/Approve review buttons, Comments badge, and Create Deal action.",
  description:
    "Mirrors the exact row action layout from `apps/web CreatorsTable`. Creators in **review** stage show Reject (red pill, CircleX) + Approve (green pill, CircleCheck) buttons. Once acted on, the row transitions to an **Approved** or **Rejected** state badge. **Contracted** and **Approved** rows show the Create Deal lightning button. The Comments icon button carries a red unread-count badge. All rows share the ⋯ more-actions overflow. Invited creators see a Remind send button instead.",
  source: "Composes ui/RecordList + Creator/CreatorCell",
  demos: [
    {
      title: "Campaign roster — review + actions",
      description: "Click Reject or Approve to transition the creator's stage. Comments badge shows unread count. Resize below 640px to see mobile cards.",
      block: true,
      render: () => <CampaignRoster />,
    },
  ],
};

export default doc;
