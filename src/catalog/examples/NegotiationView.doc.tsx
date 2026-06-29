"use client";

import React, { useState } from "react";
import {
  IconArchive,
  IconX,
  IconSend,
  IconCheck,
  IconBuildingStore,
  IconUser,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type OfferParty = "brand" | "creator";
type OfferStatus = "sent" | "countered" | "accepted" | "declined";

interface OfferMessage {
  id: string;
  party: OfferParty;
  timestamp: string;
  fee: string;
  deliverables: string;
  deadline: string;
  usageRights: string;
  status: OfferStatus;
  note?: string;
}

/* ------------------------------------------------------------------ */
/* Sample data                                                           */
/* ------------------------------------------------------------------ */

const OFFERS: OfferMessage[] = [
  {
    id: "o1",
    party: "brand",
    timestamp: "Jun 24 · 10:12 AM",
    fee: "$2,000",
    deliverables: "2 Reels + 1 Story",
    deadline: "Jul 15, 2026",
    usageRights: "30 days",
    status: "countered",
    note: "Hi Priya! We'd love to partner for the Summer Glow launch.",
  },
  {
    id: "o2",
    party: "creator",
    timestamp: "Jun 24 · 2:44 PM",
    fee: "$2,800",
    deliverables: "2 Reels + 2 Stories",
    deadline: "Jul 15, 2026",
    usageRights: "60 days",
    status: "countered",
    note: "Thanks! I'd need an extra Story and longer usage window to make this work.",
  },
  {
    id: "o3",
    party: "brand",
    timestamp: "Jun 25 · 9:00 AM",
    fee: "$2,400",
    deliverables: "2 Reels + 1 Story",
    deadline: "Jul 15, 2026",
    usageRights: "60 days",
    status: "countered",
    note: "We can match the 60-day usage — meeting you in the middle on fee.",
  },
  {
    id: "o4",
    party: "creator",
    timestamp: "Jun 25 · 11:30 AM",
    fee: "$2,400",
    deliverables: "2 Reels + 1 Story",
    deadline: "Jul 15, 2026",
    usageRights: "60 days",
    status: "accepted",
    note: "Deal! Looking forward to working together.",
  },
];

/* ------------------------------------------------------------------ */
/* Sub-components                                                        */
/* ------------------------------------------------------------------ */

function TermGrid({ fee, deliverables, deadline, usageRights }: Pick<OfferMessage, "fee" | "deliverables" | "deadline" | "usageRights">) {
  const terms = [
    { label: "Fee", value: fee },
    { label: "Deliverables", value: deliverables },
    { label: "Deadline", value: deadline },
    { label: "Usage rights", value: usageRights },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginTop: 10 }}>
      {terms.map(({ label, value }) => (
        <div key={label}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

function OfferCard({ offer, isLast }: { offer: OfferMessage; isLast: boolean }) {
  const isBrand = offer.party === "brand";
  const tone = isBrand ? TONES.blue : TONES.purple;
  const partyLabel = isBrand ? "Glow Beauty Co." : "Priya Nair";
  const partyTone = isBrand ? "blue" : "purple" as const;

  if (offer.status === "accepted") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar name={partyLabel} tone={partyTone} size="sm" />
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{partyLabel}</span>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{offer.timestamp}</span>
        </div>
        <div style={{
          border: `1.5px solid ${TONES.green.solid}`,
          borderRadius: "var(--sd-radius-md)",
          background: TONES.green.tint,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: TONES.green.solid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconCheck size={15} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: TONES.green.text }}>Offer accepted</div>
            {offer.note && <div style={{ fontSize: 12, color: "var(--sd-font-secondary)", marginTop: 2 }}>{offer.note}</div>}
          </div>
        </div>
        <TermGrid fee={offer.fee} deliverables={offer.deliverables} deadline={offer.deadline} usageRights={offer.usageRights} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar name={partyLabel} tone={partyTone} size="sm" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{partyLabel}</span>
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{offer.timestamp}</span>
        <Badge label={offer.status === "countered" ? "Countered" : "Sent"} tone="gray" variant="status" />
      </div>
      <div style={{
        border: `1px solid ${tone.tint}`,
        borderLeft: `3px solid ${tone.solid}`,
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
        padding: "14px 16px",
      }}>
        {offer.note && (
          <p style={{ fontSize: 13, color: "var(--sd-font-secondary)", margin: "0 0 10px" }}>{offer.note}</p>
        )}
        <TermGrid fee={offer.fee} deliverables={offer.deliverables} deadline={offer.deadline} usageRights={offer.usageRights} />
        {isLast && (
          <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--sd-border-light)" }}>
            <Button size="sm" variant="primary">Accept</Button>
            <Button size="sm" variant="secondary">Counter</Button>
            <Button size="sm" variant="danger">Decline</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function DraftCounterOffer() {
  return (
    <div style={{
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)",
      background: "var(--sd-bg-secondary)",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Draft counter offer</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
        {[
          { label: "Fee", placeholder: "$2,400" },
          { label: "Deliverables", placeholder: "2 Reels + 1 Story" },
          { label: "Deadline", placeholder: "Jul 15, 2026" },
          { label: "Usage rights", placeholder: "60 days" },
        ].map(({ label, placeholder }) => (
          <div key={label}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 4 }}>{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              style={{
                width: "100%", padding: "6px 10px", fontSize: 13,
                border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-sm)",
                background: "var(--sd-bg-primary)", color: "var(--sd-font-primary)",
                outline: "none", boxSizing: "border-box",
              }}
              readOnly
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="sm" variant="primary" leftIcon={<IconSend size={13} />}>Send counter offer</Button>
      </div>
    </div>
  );
}

function NegotiationViewDemo() {
  const [activeOffers] = useState(OFFERS);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 16px",
        borderBottom: "1px solid var(--sd-border-light)",
        background: "var(--sd-bg-primary)",
        borderRadius: "var(--sd-radius-md) var(--sd-radius-md) 0 0",
        border: "1px solid var(--sd-border-light)",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>Summer Glow Campaign</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
            <Avatar name="Priya Nair" tone="purple" size="sm" />
            <span style={{ fontSize: 12, color: "var(--sd-font-secondary)" }}>Priya Nair · @priya.creates</span>
          </div>
        </div>
        <Badge label="In review" tone="sky" variant="status" dot />
        <Button size="sm" variant="ghost" iconOnly aria-label="Archive">
          <IconArchive size={14} />
        </Button>
        <Button size="sm" variant="ghost" iconOnly aria-label="Close">
          <IconX size={14} />
        </Button>
      </div>

      {/* Offer thread */}
      <div style={{
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "var(--sd-bg-secondary)",
        border: "1px solid var(--sd-border-light)",
        borderTop: "none",
      }}>
        {activeOffers.map((offer, i) => (
          <OfferCard key={offer.id} offer={offer} isLast={i === activeOffers.length - 1} />
        ))}
      </div>

      {/* Draft counter */}
      <div style={{
        padding: "14px 16px",
        background: "var(--sd-bg-primary)",
        border: "1px solid var(--sd-border-light)",
        borderTop: "none",
        borderRadius: "0 0 var(--sd-radius-md) var(--sd-radius-md)",
      }}>
        <DraftCounterOffer />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "negotiation-view",
  title: "NegotiationView",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Deal negotiation thread with structured offer cards, term grids, and accept/counter/decline actions.",
  description: "A back-and-forth offer negotiation between brand and creator. Each offer shows structured deal terms (fee, deliverables, deadline, usage rights). The accepted state highlights the final agreed terms with a green confirmation card. A draft counter-offer panel sits at the bottom for composing the next offer.",
  demos: [
    {
      title: "Negotiation thread",
      block: true,
      plain: true,
      render: () => <NegotiationViewDemo />,
    },
  ],
};

export default doc;
