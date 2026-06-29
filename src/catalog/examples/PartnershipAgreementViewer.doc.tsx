"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import {
  IconDownload,
  IconCheck,
  IconClock,
  IconFileText,
  IconAlertCircle,
  IconChevronDown,
  IconChevronUp,
  IconSignature,
  IconShieldCheck,
  IconCalendar,
  IconCurrencyDollar,
  IconVideo,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type SigStatus = "signed" | "pending" | "declined";

interface Party {
  name: string;
  initials: string;
  role: string;
  status: SigStatus;
  date?: string;
}

interface KeyTerm {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: keyof typeof TONES;
}

interface Section {
  id: string;
  title: string;
  body: string;
}

/* ---- data ---- */
const PARTIES: Party[] = [
  { name: "Aura Labs Inc.",  initials: "AL", role: "Brand",   status: "signed",  date: "Jun 24, 2026" },
  { name: "Priya Nair",      initials: "PN", role: "Creator", status: "pending" },
];

const KEY_TERMS: KeyTerm[] = [
  { icon: IconCurrencyDollar, label: "Compensation",   value: "$2,400 flat fee (50% on sign · 50% on approval)", tone: "green"  },
  { icon: IconVideo,          label: "Deliverables",   value: "1× Instagram Reel · 3× IG Stories",              tone: "blue"   },
  { icon: IconCalendar,       label: "Go-live window", value: "Jul 28 – Aug 4, 2026",                            tone: "orange" },
  { icon: IconShieldCheck,    label: "Exclusivity",    value: "30 days — no competing skincare brands",          tone: "purple" },
  { icon: IconFileText,       label: "Usage rights",   value: "Brand may repost to paid ads for 6 months",      tone: "yellow" },
];

const SECTIONS: Section[] = [
  {
    id: "s1",
    title: "1. Scope of work",
    body: "Creator agrees to produce and publish one (1) Instagram Reel and three (3) Instagram Stories featuring the Aura Labs Summer Glow product line. All content must be published during the go-live window specified in §3 and comply with the brief provided on or before July 5, 2026.",
  },
  {
    id: "s2",
    title: "2. Compensation & payment schedule",
    body: "Brand shall pay Creator a total flat fee of USD $2,400. First payment of $1,200 (50%) will be released within 3 business days of both parties signing this agreement. Second payment of $1,200 (50%) will be released within 5 business days following final content approval by Brand.",
  },
  {
    id: "s3",
    title: "3. Content publishing schedule",
    body: "Creator must publish all deliverables between July 28, 2026 and August 4, 2026 (the 'Go-live Window'). Creator must submit final draft content via the Superdeal platform no later than July 18, 2026 for Brand review and approval.",
  },
  {
    id: "s4",
    title: "4. Exclusivity",
    body: "During the 30-day exclusivity period beginning on the date of first content publication, Creator agrees not to publish sponsored content for any competing skincare, beauty, or personal care brand. Organic (non-sponsored) reviews and personal product use are not restricted.",
  },
  {
    id: "s5",
    title: "5. Usage rights & licensing",
    body: "Creator grants Brand a non-exclusive, worldwide license to repurpose the Creator Content in Brand-owned paid advertising channels for a period of six (6) months from the date of original publication. Creator retains all ownership of original content.",
  },
];

const SIG_META: Record<SigStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  signed:   { label: "Signed",   tone: "green",  Icon: IconCheck       },
  pending:  { label: "Pending",  tone: "yellow", Icon: IconClock       },
  declined: { label: "Declined", tone: "red",    Icon: IconAlertCircle },
};

/* ---- Demo ---- */
function Demo() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["s1", "s2"]));
  const [signed, setSigned] = useState(false);
  const [declined, setDeclined] = useState(false);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const creatorStatus: SigStatus = signed ? "signed" : declined ? "declined" : "pending";

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 640 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <IconFileText size={18} style={{ color: "var(--sd-font-secondary, #555)" }} />
            <span style={{ fontSize: 15, fontWeight: 800 }}>Partnership Agreement</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow Campaign · Aura Labs × Priya Nair · Issued Jun 24, 2026</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Download PDF</Button>
      </div>

      {/* Signature status */}
      <div style={{ padding: "14px 16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>Signatures</div>
        <div style={{ display: "flex", gap: 12 }}>
          {PARTIES.map((p, i) => {
            const status: SigStatus = i === 1 ? creatorStatus : p.status;
            const { label, tone, Icon } = SIG_META[status];
            return (
              <div key={p.name} style={{ flex: 1, padding: "10px 12px", border: `1.5px solid ${status === "signed" ? "#111" : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 10, background: status === "signed" ? "#fafafa" : "transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Avatar initials={p.initials} tone={status === "signed" ? "green" : "gray"} size="sm" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{p.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Badge label={label} tone={tone} size="sm" dot />
                  {p.date && status === "signed" && <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{p.date}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Creator action (only when pending) */}
        {!signed && !declined && (
          <div style={{ display: "flex", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--sd-border-default, #e5e7eb)" }}>
            <div style={{ flex: 1, fontSize: 11, color: "var(--sd-font-tertiary, #999)", alignSelf: "center" }}>
              Review all sections before signing.
            </div>
            <Button variant="secondary" size="sm" onClick={() => setDeclined(true)}>Decline</Button>
            <Button variant="primary" size="sm" leftIcon={<IconSignature size={12} />} onClick={() => setSigned(true)}>
              Sign agreement
            </Button>
          </div>
        )}
        {signed && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconCheck size={11} style={{ color: TONES.green.text }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: TONES.green.text }}>Signed — agreement is now fully executed. First payment of $1,200 is being processed.</span>
          </div>
        )}
        {declined && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", gap: 8 }}>
            <IconAlertCircle size={16} style={{ color: TONES.red.text, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: TONES.red.text }}>Declined — Aura Labs has been notified. No payment will be processed.</span>
          </div>
        )}
      </div>

      {/* Key terms */}
      <div style={{ padding: "14px 16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>Key terms</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {KEY_TERMS.map(({ icon: Icon, label, value, tone }) => (
            <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: TONES[tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <Icon size={13} style={{ color: TONES[tone].text }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agreement sections */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>Agreement text</span>
        </div>
        {SECTIONS.map((sec, i) => (
          <div key={sec.id} style={{ borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
            <button
              onClick={() => toggle(sec.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <span style={{ fontSize: 12, fontWeight: 700 }}>{sec.title}</span>
              {expanded.has(sec.id) ? <IconChevronUp size={14} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} /> : <IconChevronDown size={14} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />}
            </button>
            {expanded.has(sec.id) && (
              <div style={{ padding: "0 16px 14px", fontSize: 12, lineHeight: 1.7, color: "var(--sd-font-secondary, #555)" }}>
                {sec.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "partnership-agreement-viewer",
  title: "PartnershipAgreementViewer",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Partnership contract viewer — signature status for both parties, highlighted key terms, and collapsible agreement sections with sign/decline actions.",
  description:
    "Displayed to creators when a brand issues a campaign agreement. Header: document title, campaign + party names + issue date, Download PDF. Signature panel: side-by-side party cards (brand already signed, creator pending) with avatar, role, badge, and date; Sign + Decline CTAs below; on sign → green confirmation with payment trigger message; on decline → red notice. Key terms strip: compensation, deliverables, go-live window, exclusivity, usage rights — each with tone-matched icon. Agreement text accordion: 5 sections (scope, payment, schedule, exclusivity, usage rights) that expand/collapse individually. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Partnership agreement viewer",
      description: "Expand sections to read the agreement. Click 'Sign agreement' to execute — or 'Decline' to reject.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
