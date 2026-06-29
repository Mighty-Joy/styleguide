"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconFileText,
  IconCircleCheck,
  IconClock,
  IconSignature,
  IconBolt,
  IconPhoto,
  IconCalendar,
  IconHash,
  IconShield,
  IconChevronDown,
  IconChevronUp,
  IconDownload,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type ContractStatus = "pending_brand" | "pending_creator" | "signed" | "expired";
type DeliverableType = "Reel" | "Story" | "TikTok" | "UGC";

interface ContractParty {
  name: string;
  role: "Brand" | "Creator";
  initials: string;
  tone: keyof typeof TONES;
  signed: boolean;
  signedAt?: string;
}

interface ContractDeliverable {
  id: string;
  type: DeliverableType;
  platform: "instagram" | "tiktok";
  handle: string;
  dueDate: string;
  usageRights: string;
}

interface ContractData {
  id: string;
  title: string;
  status: ContractStatus;
  issuedDate: string;
  expiryDate: string;
  totalValue: string;
  paymentTerms: string;
  parties: ContractParty[];
  deliverables: ContractDeliverable[];
  legalClauses: { title: string; body: string }[];
}

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const STATUS_META: Record<ContractStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  pending_brand:   { label: "Awaiting brand signature",   tone: "orange", icon: IconClock },
  pending_creator: { label: "Awaiting creator signature", tone: "blue",   icon: IconClock },
  signed:          { label: "Fully executed",             tone: "green",  icon: IconCircleCheck },
  expired:         { label: "Expired",                    tone: "red",    icon: IconClock },
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok,
};

/* ------------------------------------------------------------------ */
/* Seed contract                                                         */
/* ------------------------------------------------------------------ */

const CONTRACT: ContractData = {
  id: "CTR-2025-0842",
  title: "Atlas X Summer — Paid Partnership Agreement",
  status: "pending_creator",
  issuedDate: "Jun 15, 2025",
  expiryDate: "Jul 5, 2025",
  totalValue: "$2,500",
  paymentTerms: "50% on signing · 50% on post approval",
  parties: [
    { name: "Atlas X Brands",  role: "Brand",   initials: "AX", tone: "purple", signed: true,  signedAt: "Jun 15, 2025" },
    { name: "Priya Nair",      role: "Creator", initials: "PN", tone: "sky",    signed: false },
  ],
  deliverables: [
    { id: "1", type: "Reel",    platform: "instagram", handle: "@priya", dueDate: "Aug 10", usageRights: "90 days · paid social" },
    { id: "2", type: "Story",   platform: "instagram", handle: "@priya", dueDate: "Aug 12", usageRights: "None" },
    { id: "3", type: "TikTok",  platform: "tiktok",   handle: "@priya", dueDate: "Aug 15", usageRights: "30 days · organic" },
  ],
  legalClauses: [
    { title: "FTC Disclosure", body: "Creator must clearly disclose the paid partnership in the first 3 seconds of video content and in the caption using #ad or #sponsored." },
    { title: "Content Approval", body: "All content must be submitted for brand review at least 72 hours before the scheduled post date. Brand has the right to request one round of revisions." },
    { title: "Exclusivity", body: "Creator agrees not to promote directly competing skincare or beauty brands for 30 days following the campaign end date." },
  ],
};

/* ------------------------------------------------------------------ */
/* Signature block                                                       */
/* ------------------------------------------------------------------ */

function SignatureBlock({ party }: { party: ContractParty }) {
  const t = TONES[party.tone];
  return (
    <div style={{ flex: 1, padding: "12px 14px", border: `1px solid ${party.signed ? TONES.green.solid : "var(--sd-border-medium)"}`, borderRadius: "var(--sd-radius-sm)", background: party.signed ? TONES.green.tint : "var(--sd-bg-secondary)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Avatar name={party.name} initials={party.initials} tone={party.tone} size="md" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>{party.name}</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{party.role}</div>
        </div>
      </div>
      {party.signed ? (
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: TONES.green.text, fontStyle: "italic", marginBottom: 4 }}>{party.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: TONES.green.text }}>
            <IconCircleCheck size={12} /> Signed {party.signedAt}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ height: 32, borderBottom: "1px solid var(--sd-border-medium)", marginBottom: 6 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--sd-font-tertiary)" }}>
            <IconSignature size={12} /> Signature required
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Clause section (collapsible)                                          */
/* ------------------------------------------------------------------ */

function ClauseSection({ clause }: { clause: ContractData["legalClauses"][0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--sd-border-light)" }}>
      <Button variant="ghost" onClick={() => setOpen(v => !v)}
        style={{ width: "100%", justifyContent: "space-between", borderRadius: "var(--sd-radius-sm)", padding: "10px 16px", height: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconShield size={13} style={{ color: "var(--sd-font-tertiary)" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{clause.title}</span>
        </div>
        {open ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary)" }} />}
      </Button>
      {open && (
        <p style={{ margin: "0 16px 12px", fontSize: 12, color: "var(--sd-font-secondary)", lineHeight: 1.6 }}>{clause.body}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ContractCard                                                          */
/* ------------------------------------------------------------------ */

function ContractCard({ contract }: { contract: ContractData }) {
  const sm = STATUS_META[contract.status];
  const StatusIcon = sm.icon;

  return (
    <div style={{ background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", maxWidth: 600 }}>
      {/* Header */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconFileText size={18} style={{ color: "var(--sd-font-tertiary)" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.3 }}>{contract.title}</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 3 }}>{contract.id}</div>
          </div>
          <Badge label={sm.label} tone={sm.tone} icon={StatusIcon} />
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { label: "Value",    value: contract.totalValue },
            { label: "Issued",   value: contract.issuedDate },
            { label: "Expires",  value: contract.expiryDate },
            { label: "Payment",  value: contract.paymentTerms },
          ].map(({ label, value }) => (
            <div key={label} style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)", marginTop: 1 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div style={{ borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ padding: "10px 16px 6px", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Deliverables</div>
        {contract.deliverables.map((d) => {
          const PlatIcon = PLATFORM_ICONS[d.platform];
          return (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderTop: "1px solid var(--sd-border-light)" }}>
              <span style={{ width: 28, height: 28, background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconPhoto size={13} style={{ color: "var(--sd-font-tertiary)" }} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>
                  {d.type} · <PlatIcon size={11} style={{ verticalAlign: "middle" }} /> {d.handle}
                </div>
                <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>Usage: {d.usageRights}</div>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                <IconCalendar size={10} />{d.dueDate}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legal clauses */}
      <div style={{ borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ padding: "10px 16px 6px", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Legal terms</div>
        {contract.legalClauses.map(c => <ClauseSection key={c.title} clause={c} />)}
      </div>

      {/* Signature blocks */}
      <div style={{ padding: "12px 16px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Signatures</div>
        <div style={{ display: "flex", gap: 10 }}>
          {contract.parties.map(p => <SignatureBlock key={p.name} party={p} />)}
        </div>

        {/* CTA */}
        {contract.status === "pending_creator" && (
          <div style={{ marginTop: 12 }}>
            <Button variant="primary" style={{ width: "100%" }} leftIcon={<IconSignature size={15} />}>
              Review & sign contract
            </Button>
          </div>
        )}

        {/* Download */}
        <div style={{ marginTop: 8 }}>
          <Button variant="tertiary" size="sm" style={{ width: "100%" }} leftIcon={<IconDownload size={13} />}>
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "contract-card",
  title: "ContractCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Deal contract overview — parties, deliverables, collapsible legal terms, and signature blocks.",
  description:
    "ContractCard renders the complete deal contract in a single card: status badge (Awaiting brand / Awaiting creator / Fully executed / Expired), meta row (value, issued date, expiry, payment terms), deliverable list with platform icon + usage rights + due date, collapsible legal clause accordion (FTC disclosure, content approval, exclusivity), and signature blocks for both parties. Signed parties show a styled signature and green confirmation; unsigned show an empty signature line + 'Review & sign' CTA.",
  demos: [
    {
      title: "Contract awaiting creator signature",
      description: "Brand has signed. Creator signature block shows the 'Review & sign' CTA. Click clause headers to expand.",
      block: true,
      render: () => <ContractCard contract={CONTRACT} />,
    },
  ],
  props: [],
};

export default doc;
