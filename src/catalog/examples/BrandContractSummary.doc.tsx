"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconFileText,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconLock,
  IconPencil,
  IconCalendar,
  IconCurrencyDollar,
  IconShield,
  IconPhoto,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface ContractSection {
  id: string;
  icon: React.ElementType;
  title: string;
  items: { label: string; value: string }[];
}

const SECTIONS: ContractSection[] = [
  {
    id: "campaign",
    icon: IconCalendar,
    title: "Campaign details",
    items: [
      { label: "Campaign",     value: "Summer Glow Campaign"       },
      { label: "Brand",        value: "Aura Labs"                  },
      { label: "Start date",   value: "July 5, 2026"               },
      { label: "End date",     value: "July 25, 2026"              },
      { label: "Duration",     value: "21 days"                    },
    ],
  },
  {
    id: "deliverables",
    icon: IconPhoto,
    title: "Deliverables",
    items: [
      { label: "1",  value: "2× Instagram Reels (45–60s)"          },
      { label: "2",  value: "5× Instagram Stories"                 },
      { label: "3",  value: "Caption must include #AuraLabs #LuminosSerum" },
      { label: "4",  value: "Tag @auralabsofficial in all posts"   },
      { label: "Draft deadline", value: "July 18, 2026"            },
      { label: "Publish window", value: "July 20–25, 2026"         },
    ],
  },
  {
    id: "compensation",
    icon: IconCurrencyDollar,
    title: "Compensation",
    items: [
      { label: "Total fee",      value: "$1,700"                   },
      { label: "On signing",     value: "$850 (50%) · within 5 days" },
      { label: "On completion",  value: "$850 (50%) · within 14 days of final post" },
      { label: "Late payment",   value: "1.5% monthly after grace period" },
    ],
  },
  {
    id: "rights",
    icon: IconShield,
    title: "Content rights & exclusivity",
    items: [
      { label: "Usage rights",    value: "30-day paid media license" },
      { label: "Platforms",       value: "Instagram, TikTok, brand website" },
      { label: "Exclusivity",     value: "No competing skincare brands for 30 days" },
      { label: "Ownership",       value: "Creator retains all IP" },
      { label: "Credit",          value: "Creator must be credited in all brand reposts" },
    ],
  },
];

const TERMS_TEXT = `This Agreement is entered into between Aura Labs ("Brand") and Priya Nair ("Creator") as of the date of electronic signature below.

1. SERVICES. Creator agrees to produce and publish the Deliverables described above in accordance with the campaign brief. All content must reflect the Creator's authentic voice and comply with FTC disclosure guidelines (#ad or #sponsored must appear in captions).

2. COMPENSATION. Brand will pay Creator the Total Fee in two instalments as specified above. Payment will be made via the Creator's registered payment method in Superdeal. All amounts are in USD and exclusive of any applicable taxes, which are the Creator's responsibility.

3. CONTENT RIGHTS. Creator grants Brand a non-exclusive, royalty-free licence to repurpose Deliverables during the Usage Rights period stated above. Brand may not alter content in ways that misrepresent the Creator's views. This licence does not affect the Creator's right to keep the content live on their own channels.

4. EXCLUSIVITY. During the Exclusivity period, Creator agrees not to publish sponsored content for direct competitor brands in the same product category. Personal recommendations are unaffected.

5. TERMINATION. Either party may terminate this Agreement with 48 hours' written notice if the other party materially breaches any term. In the event of termination after work has commenced, Creator retains payment for work completed.

6. GOVERNING LAW. This Agreement is governed by the laws of the State of California, USA.`;

function Demo() {
  const [expanded,  setExpanded]  = useState<string | null>("deliverables");
  const [agreed,    setAgreed]    = useState(false);
  const [signing,   setSigning]   = useState(false);
  const [signed,    setSigned]    = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  function sign() {
    if (!agreed) return;
    setSigning(true);
    setTimeout(() => { setSigning(false); setSigned(true); }, 900);
  }

  if (signed) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
        <div style={{ padding: "22px 18px", background: TONES.green.tint, borderRadius: 14, border: `1.5px solid ${TONES.green.text}40`, textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 99, background: TONES.green.text, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <IconPencil size={22} style={{ color: "#fff" }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 900, color: TONES.green.text, marginBottom: 4 }}>Contract signed!</div>
          <div style={{ fontSize: 11, color: TONES.green.text, opacity: 0.8, marginBottom: 6 }}>Summer Glow Campaign · Aura Labs</div>
          <div style={{ fontSize: 10, color: TONES.green.text, opacity: 0.6, marginBottom: 16 }}>Signed by Priya Nair · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · via Superdeal</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" size="sm" style={{ flex: 1 }}>
              Download PDF
            </Button>
            <Button variant="primary" size="sm" style={{ flex: 1 }}>
              View campaign brief
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 12 }}>
        <IconFileText size={14} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Contract review</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Aura Labs</div>
        </div>
        <Badge label="Pending signature" tone="orange" />
      </div>

      {/* Key terms sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {SECTIONS.map((s) => {
          const isOpen = expanded === s.id;
          const Icon   = s.icon;
          return (
            <div key={s.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 11, overflow: "hidden" }}>
              <button onClick={() => setExpanded(isOpen ? null : s.id)}
                style={{ width: "100%", display: "flex", gap: 9, alignItems: "center", padding: "10px 12px", background: isOpen ? "var(--sd-bg-secondary,#f9f9f9)" : "white", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: TONES.blue.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} style={{ color: TONES.blue.text }} />
                </div>
                <span style={{ flex: 1, fontSize: 11, fontWeight: 700 }}>{s.title}</span>
                {isOpen ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
              </button>
              {isOpen && (
                <div style={{ padding: "2px 12px 12px", background: "var(--sd-bg-secondary,#f9f9f9)", borderTop: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                  {s.items.map((it) => (
                    <div key={it.label} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: "1px solid var(--sd-border-default,#f1f1f1)" }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary,#999)", width: 90, flexShrink: 0 }}>{it.label}</span>
                      <span style={{ fontSize: 11, color: "#111", flex: 1 }}>{it.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full terms toggle */}
      <button onClick={() => setShowTerms(!showTerms)}
        style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11, color: "var(--sd-font-tertiary,#999)", background: "none", border: "none", cursor: "pointer", marginBottom: showTerms ? 8 : 14 }}>
        <IconFileText size={12} />
        {showTerms ? "Hide full terms" : "Read full contract terms"}
        {showTerms ? <IconChevronUp size={11} /> : <IconChevronDown size={11} />}
      </button>

      {showTerms && (
        <div style={{ maxHeight: 160, overflowY: "auto", padding: "10px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, marginBottom: 14, fontSize: 10, lineHeight: 1.7, color: "var(--sd-font-secondary,#555)", whiteSpace: "pre-wrap" }}>
          {TERMS_TEXT}
        </div>
      )}

      {/* Agreement checkbox */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "11px 13px", background: agreed ? TONES.green.tint : "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 10, border: `1.5px solid ${agreed ? TONES.green.text + "50" : "var(--sd-border-default,#e5e7eb)"}`, marginBottom: 12, cursor: "pointer" }}
        onClick={() => setAgreed(!agreed)}>
        <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${agreed ? TONES.green.text : "var(--sd-border-default,#ccc)"}`, background: agreed ? TONES.green.text : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
          {agreed && <IconCheck size={10} style={{ color: "#fff" }} />}
        </div>
        <span style={{ fontSize: 11, color: agreed ? TONES.green.text : "var(--sd-font-secondary,#555)", lineHeight: 1.5 }}>
          I have reviewed and agree to the terms of this contract. I understand this constitutes a legally binding agreement.
        </span>
      </div>

      {/* E-sign CTA */}
      <Button variant="primary" size="sm" leftIcon={signing ? undefined : <IconPencil size={11} />}
        onClick={sign} disabled={!agreed || signing} style={{ width: "100%" }}>
        {signing ? "Signing…" : agreed ? "Sign contract" : "Agree to terms to sign"}
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-contract-summary",
  title: "BrandContractSummary",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Contract review and e-sign flow — 4 collapsible key-term sections (campaign details, deliverables, compensation, rights), scrollable full-terms panel, agreement checkbox, and e-sign CTA with a green confirmation screen.",
  description:
    "Creator or brand reviews a campaign contract before signing. Header: 'Contract review', campaign + brand, 'Pending signature' orange badge. 4 collapsible sections each with a blue icon tile and chevron: Campaign details (name/brand/dates/duration), Deliverables (2 Reels + 5 Stories + hashtag/tag rules + draft & publish deadlines), Compensation ($1,700 split 50/50 on signing + completion), Content rights & exclusivity (30-day paid media / no competitors / Creator retains IP). 'Deliverables' pre-expanded. 'Read full contract terms' link toggles a 160px scrollable panel with 6-clause legalese. Agreement checkbox: taps toggle; turns green tint with green border when checked; label text also goes green. 'Sign contract' primary CTA — disabled until checkbox checked; shows 'Agree to terms to sign' when unchecked. 900ms 'Signing…' → green success screen: pencil icon, 'Contract signed!', campaign + brand, signed-by timestamp, Download PDF + View campaign brief CTAs. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Contract review & e-sign",
      description: "Expand sections to review the key terms. Click 'Read full contract terms' for the full text. Check the agreement box, then sign.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
