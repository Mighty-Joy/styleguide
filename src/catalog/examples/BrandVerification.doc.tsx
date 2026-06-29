"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconClock,
  IconAlertTriangle,
  IconBuilding,
  IconMapPin,
  IconCreditCard,
  IconWorld,
  IconUpload,
  IconRefresh,
  IconShield,
  IconShieldCheck,
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
  IconFile,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type VerifStatus = "verified" | "pending" | "failed" | "not_started";

interface VerifStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: VerifStatus;
  submittedAt?: string;
  verifiedAt?: string;
  failReason?: string;
  doc?: string;
}

const STATUS_META: Record<VerifStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  verified:    { label: "Verified",     tone: "green",  icon: IconCheck        },
  pending:     { label: "Under review", tone: "blue",   icon: IconClock        },
  failed:      { label: "Action needed",tone: "red",    icon: IconAlertTriangle},
  not_started: { label: "Not started",  tone: "gray",   icon: IconClock        },
};

const INITIAL_STEPS: VerifStep[] = [
  {
    id: "s1",
    title: "Company registration",
    description: "Proof of legal business entity (certificate of incorporation, LLC docs, or equivalent)",
    icon: IconBuilding,
    status: "verified",
    submittedAt: "Jun 15",
    verifiedAt: "Jun 17",
    doc: "Aura_Labs_Certificate_Inc.pdf",
  },
  {
    id: "s2",
    title: "Business address",
    description: "A recent utility bill, bank statement, or official government letter showing your business address",
    icon: IconMapPin,
    status: "failed",
    submittedAt: "Jun 15",
    failReason: "The document submitted is more than 90 days old. Please re-upload a statement dated within the last 3 months.",
    doc: "address_proof_march.pdf",
  },
  {
    id: "s3",
    title: "Payment method",
    description: "Credit card, bank account, or verified payment processor linked to this workspace",
    icon: IconCreditCard,
    status: "pending",
    submittedAt: "Jun 21",
  },
  {
    id: "s4",
    title: "Domain verification",
    description: "Confirm ownership of your brand's website domain by adding a DNS TXT record",
    icon: IconWorld,
    status: "not_started",
  },
];

const BADGE_LEVELS = [
  { min: 0, label: "Unverified",          tone: "red"    as const },
  { min: 1, label: "Partially verified",  tone: "yellow" as const },
  { min: 3, label: "Mostly verified",     tone: "blue"   as const },
  { min: 4, label: "Fully verified",      tone: "green"  as const },
];

/* ---- Demo ---- */
function Demo() {
  const [steps,    setSteps]    = useState<VerifStep[]>(INITIAL_STEPS);
  const [expanded, setExpanded] = useState<string | null>("s2");
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploaded,  setUploaded]  = useState<string | null>(null);

  function toggleExpand(id: string) {
    setExpanded((prev) => prev === id ? null : id);
  }

  function resubmit(id: string) {
    setUploading(id);
    setTimeout(() => {
      setUploading(null);
      setUploaded(id);
      setSteps((prev) => prev.map((s) => s.id === id ? { ...s, status: "pending", submittedAt: "Jun 29", failReason: undefined, doc: "address_proof_june.pdf" } : s));
      setTimeout(() => setUploaded(null), 2500);
    }, 1200);
  }

  function startDNS(id: string) {
    setSteps((prev) => prev.map((s) => s.id === id ? { ...s, status: "pending", submittedAt: "Jun 29" } : s));
  }

  const verified = steps.filter((s) => s.status === "verified").length;
  const level = [...BADGE_LEVELS].reverse().find((l) => verified >= l.min)!;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header status banner */}
      <div style={{ padding: "14px 16px", background: TONES[level.tone].tint, borderRadius: 12, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: 99, background: TONES[level.tone].text + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {verified === steps.length
            ? <IconShieldCheck size={20} style={{ color: TONES[level.tone].text }} />
            : <IconShield      size={20} style={{ color: TONES[level.tone].text }} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 800 }}>Aura Labs</span>
            <Badge label={level.label} tone={level.tone} size="sm" dot />
          </div>
          <div style={{ fontSize: 11, color: TONES[level.tone].text }}>
            {verified} of {steps.length} verification steps complete
          </div>
          {/* Progress bar */}
          <div style={{ height: 5, background: TONES[level.tone].text + "25", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
            <div style={{ width: `${(verified / steps.length) * 100}%`, height: "100%", background: TONES[level.tone].text, borderRadius: 3, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* Benefit callout when not fully verified */}
      {verified < steps.length && (
        <div style={{ padding: "8px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, marginBottom: 14, fontSize: 11, color: "var(--sd-font-secondary,#555)", lineHeight: 1.5 }}>
          <strong>Why verify?</strong> Verified brands get a trust badge on campaign listings, faster creator approval rates, and access to premium creator tiers.
        </div>
      )}

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((step) => {
          const SIcon = step.icon;
          const { label, tone, icon: StatusIcon } = STATUS_META[step.status];
          const isOpen = expanded === step.id;

          return (
            <div key={step.id} style={{ border: `1px solid ${step.status === "failed" ? TONES.red.text + "40" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => toggleExpand(step.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {/* Status circle */}
                <div style={{ width: 30, height: 30, borderRadius: 99, background: TONES[tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <StatusIcon size={14} style={{ color: TONES[tone].text }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{step.title}</div>
                  {step.status !== "not_started" && (
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
                      {step.status === "verified"
                        ? `Verified ${step.verifiedAt}`
                        : step.status === "failed"
                        ? "Resubmission required"
                        : `Submitted ${step.submittedAt} · review in progress`}
                    </div>
                  )}
                </div>
                <Badge label={label} tone={tone} size="sm" dot />
                {isOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />}
              </button>

              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "10px 14px 12px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  <div style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)", lineHeight: 1.6, marginBottom: 10 }}>
                    {step.description}
                  </div>

                  {/* Existing doc */}
                  {step.doc && (
                    <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "7px 10px", background: "#fff", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, marginBottom: 10 }}>
                      <IconFile size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 11, fontFamily: "monospace" }}>{step.doc}</span>
                      <IconExternalLink size={11} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0, cursor: "pointer" }} />
                    </div>
                  )}

                  {/* Fail reason */}
                  {step.status === "failed" && step.failReason && (
                    <div style={{ padding: "8px 10px", background: TONES.red.tint, borderRadius: 8, fontSize: 11, color: TONES.red.text, lineHeight: 1.55, marginBottom: 10 }}>
                      <strong>Why it was rejected:</strong> {step.failReason}
                    </div>
                  )}

                  {/* Actions */}
                  {step.status === "failed" && (
                    <Button variant="primary" size="sm" leftIcon={uploaded === step.id ? <IconCheck size={11} /> : uploading === step.id ? undefined : <IconUpload size={11} />}
                      onClick={() => resubmit(step.id)} disabled={!!uploading}>
                      {uploaded === step.id ? "Resubmitted!" : uploading === step.id ? "Uploading…" : "Re-upload document"}
                    </Button>
                  )}
                  {step.status === "not_started" && step.id === "s4" && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6, color: "var(--sd-font-secondary,#555)" }}>Add this TXT record to your DNS</div>
                      <div style={{ padding: "7px 10px", background: "#111", borderRadius: 7, fontFamily: "monospace", fontSize: 11, color: "#a3e635", marginBottom: 8 }}>
                        superdeal-verify=aura-labs-xk7p2m
                      </div>
                      <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={11} />} onClick={() => startDNS(step.id)}>
                        I've added the record — verify now
                      </Button>
                    </div>
                  )}
                  {step.status === "not_started" && step.id !== "s4" && (
                    <Button variant="secondary" size="sm" leftIcon={<IconUpload size={11} />}>Upload document</Button>
                  )}
                  {step.status === "pending" && (
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Typically reviewed within 1–2 business days. No action needed.</div>
                  )}
                  {step.status === "verified" && (
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      <IconCheck size={11} style={{ color: TONES.green.text }} />
                      <span style={{ fontSize: 10, color: TONES.green.text, fontWeight: 600 }}>Verified {step.verifiedAt} · No action needed</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-verification",
  title: "BrandVerification",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand identity verification panel — 4 steps (company registration/address/payment/domain) with verified/pending/failed/not-started states, contextual re-upload and DNS TXT record flows.",
  description:
    "Brand's verification progress page. Header banner: brand name, dynamic level badge (Unverified/Partially/Mostly/Fully based on count), '2 of 4 complete', animated progress bar in badge tone color. 'Why verify?' callout (trust badge, faster approval, premium creator access) shown until fully verified. 4 accordion steps — Company registration: verified Jun 17, document pill with filename + open icon. Business address: FAILED with red border, red 'Why it was rejected' box ('document over 90 days old'), Re-upload document CTA → 'Uploading…' → 'Resubmitted!' + step turns pending. Payment method: pending Jun 21, 'review in progress, no action needed'. Domain verification: not started, shows monospace DNS TXT record block + 'I've added the record — verify now' secondary CTA → step turns pending. S2 (failed) pre-expanded. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand verification",
      description: "Business address step is pre-expanded (failed). Click 'Re-upload document' to simulate resubmission. Expand domain step to see the DNS TXT record and verify flow.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
