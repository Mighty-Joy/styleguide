"use client";

import React from "react";
import { IconFolder, IconDotsVertical } from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

interface Campaign {
  id: string;
  name: string;
  dealsCount: number;
}

const CAMPAIGNS: Campaign[] = [
  { id: "1", name: "Atlas X Summer Launch",   dealsCount: 12 },
  { id: "2", name: "Summer Glow Campaign",    dealsCount: 8  },
  { id: "3", name: "Spring Drop '25",         dealsCount: 5  },
  { id: "4", name: "Holiday Gift Guide 2025", dealsCount: 0  },
  { id: "5", name: "Back to School",          dealsCount: 4  },
  { id: "6", name: "Q3 Micro-Influencer Push",dealsCount: 20 },
];

/* ------------------------------------------------------------------ */
/* CampaignCard                                                          */
/* ------------------------------------------------------------------ */

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div
      style={{
        background: "var(--sd-bg-primary)",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        padding: "10px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        transition: "border-color 0.1s, box-shadow 0.1s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--sd-border-medium)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--sd-shadow-light)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--sd-border-light)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Folder icon */}
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: TONES.green.tint,
        color: TONES.green.solid,
      }}>
        <IconFolder size={16} />
      </div>

      {/* Name + count */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {campaign.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginTop: 1 }}>
          {campaign.dealsCount} deal{campaign.dealsCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* ⋯ menu */}
      <Button variant="tertiary" size="sm" iconOnly aria-label="More" onClick={e => e.stopPropagation()}>
        <IconDotsVertical size={14} />
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

function CampaignCardGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {CAMPAIGNS.map(c => <CampaignCard key={c.id} campaign={c} />)}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-card",
  title: "CampaignCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Simple campaign tile — folder icon, campaign name, and deal count. Matches the app's shared card used on Home and Campaigns pages.",
  description:
    "CampaignCard is the standard campaign unit used in the Home overview grid and the Campaigns list. A folder icon in the brand accent tint sits beside the campaign name and deal count. Hover lifts the card with a subtle border + shadow. The ⋯ icon button opens the campaign context menu. This mirrors the app's `CampaignCard.tsx` exactly: simple, one-design source of truth, no stat chips or progress bars on the card itself.",
  demos: [
    {
      title: "Campaign card grid",
      description: "Six campaigns in a 3-column grid. Hover any card to see the lift state.",
      block: true,
      render: () => <CampaignCardGrid />,
    },
  ],
  props: [],
};

export default doc;
