"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconFileText,
  IconPencil,
  IconDownload,
  IconClock,
  IconShieldCheck,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type FlowStep = "preview" | "sign" | "waiting" | "confirmed";

/* ---- Step indicator ---- */

const STEPS: { key: FlowStep; label: string }[] = [
  { key: "preview",   label: "Review"    },
  { key: "sign",      label: "Sign"      },
  { key: "waiting",   label: "Countersign"},
  { key: "confirmed", label: "Confirmed" },
];

const STEP_ORDER: FlowStep[] = ["preview", "sign", "waiting", "confirmed"];

function StepRail({ current }: { current: FlowStep }) {
  const idx = STEP_ORDER.indexOf(current);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {STEPS.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <React.Fragment key={s.key}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "2px solid",
                borderColor: done || active ? "#111" : "var(--sd-border-medium, #d1d5db)",
                background: done ? "#111" : active ? "#fff" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {done
                  ? <IconCheck size={13} color="#fff" />
                  : <span style={{ fontSize: 11, fontWeight: 700, color: active ? "#111" : "var(--sd-font-tertiary, #999)" }}>{i + 1}</span>
                }
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? "#111" : done ? "var(--sd-font-secondary, #666)" : "var(--sd-font-tertiary, #999)", whiteSpace: "nowrap" }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < idx ? "#111" : "var(--sd-border-medium, #d1d5db)", marginBottom: 18, transition: "background 0.3s" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---- Contract preview pane ---- */

const CONTRACT_TERMS = [
  { label: "Creator",          value: "Priya Nair (@priya.creates)" },
  { label: "Brand",            value: "Summer Glow by Aura Labs" },
  { label: "Campaign",         value: "Summer Glow — Q3 2026" },
  { label: "Fee",              value: "$2,400 USD" },
  { label: "Deliverables",     value: "1× IG Reel, 3× IG Story, 1× TikTok" },
  { label: "Usage rights",     value: "6 months, digital only" },
  { label: "Exclusivity",      value: "30 days post-publish (beauty category)" },
  { label: "Payment terms",    value: "50% on signing · 50% on approval" },
  { label: "Kill fee",         value: "25% if cancelled after brief accepted" },
];

function PreviewPane() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: TONES.blue.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconFileText size={18} style={{ color: TONES.blue.text }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Creator Collaboration Agreement</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Version 2.1 · Prepared Jun 28, 2026</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Badge label="Awaiting signature" tone="yellow" variant="status" dot />
        </div>
      </div>

      {/* Key terms */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Key terms
        </div>
        {CONTRACT_TERMS.map(({ label, value }, i) => (
          <div key={label} style={{ display: "flex", padding: "8px 14px", borderBottom: i < CONTRACT_TERMS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", width: 120, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-primary, #111)" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Excerpt */}
      <div style={{ padding: "12px 14px", background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 8, fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.7, marginBottom: 4 }}>
        <strong>1. Services.</strong> Creator agrees to produce and publish the Deliverables described herein in accordance with the Campaign Brief… <strong>3. Compensation.</strong> Brand shall pay Creator the Fee in two instalments as defined above… <strong>5. Content Ownership.</strong> Creator retains ownership of all content; Brand receives a limited licence for the Usage Rights period…
      </div>
      <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2, paddingLeft: 2 }}>Scroll to read the full agreement before signing.</div>
    </div>
  );
}

/* ---- Signature pane ---- */

function SignPane({ onSigned }: { onSigned: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [sig, setSig] = useState("");
  const valid = agreed && sig.trim().length >= 2;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Add your signature</div>
        <div style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)" }}>By signing, you agree to the terms of the agreement reviewed in the previous step.</div>
      </div>

      {/* Type-to-sign */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #666)", display: "block", marginBottom: 6 }}>Type your full name</label>
        <div style={{ position: "relative" }}>
          <input
            value={sig}
            onChange={(e) => setSig(e.target.value)}
            placeholder="Priya Nair"
            style={{
              width: "100%", height: 44, padding: "0 12px",
              border: "1.5px solid var(--sd-border-medium, #d1d5db)",
              borderRadius: 8, fontSize: 18,
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              color: "#1a1a6e",
              background: "#fafafa",
              outline: "none",
            }}
          />
        </div>
        {sig.trim().length >= 2 && (
          <div style={{ marginTop: 4, fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>
            Signature preview — this text will be applied as your legal signature
          </div>
        )}
      </div>

      {/* Date */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #666)", display: "block", marginBottom: 6 }}>Date</label>
          <div style={{ height: 36, padding: "0 12px", border: "1px solid var(--sd-border-medium, #d1d5db)", borderRadius: 8, background: "var(--sd-bg-tertiary, #f1f1f1)", display: "flex", alignItems: "center", fontSize: 12, color: "var(--sd-font-secondary, #666)" }}>
            June 28, 2026
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #666)", display: "block", marginBottom: 6 }}>IP logged</label>
          <div style={{ height: 36, padding: "0 12px", border: "1px solid var(--sd-border-medium, #d1d5db)", borderRadius: 8, background: "var(--sd-bg-tertiary, #f1f1f1)", display: "flex", alignItems: "center", fontSize: 12, color: "var(--sd-font-secondary, #666)" }}>
            192.168.x.x (auto)
          </div>
        </div>
      </div>

      {/* Consent checkbox */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 20 }}>
        <div
          onClick={() => setAgreed((v) => !v)}
          style={{
            width: 18, height: 18, borderRadius: 4, border: "1.5px solid",
            borderColor: agreed ? "#111" : "var(--sd-border-medium, #d1d5db)",
            background: agreed ? "#111" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 1, cursor: "pointer",
          }}
        >
          {agreed && <IconCheck size={11} color="#fff" />}
        </div>
        <span style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5 }}>
          I have read and agree to the Creator Collaboration Agreement. I understand this is a legally binding document and that my typed name constitutes my electronic signature.
        </span>
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button variant="secondary" size="sm">Download PDF</Button>
        <Button
          variant="primary"
          size="sm"
          disabled={!valid}
          leftIcon={<IconPencil size={13} />}
          onClick={onSigned}
        >
          Sign contract
        </Button>
      </div>
    </div>
  );
}

/* ---- Waiting pane ---- */

function WaitingPane({ onSkip }: { onSkip: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: TONES.yellow.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
        <IconClock size={26} style={{ color: TONES.yellow.text }} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Waiting for brand countersignature</div>
      <div style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.6 }}>
        Your signature was captured successfully. Aura Labs has been notified and will countersign within 1 business day. You'll receive an email with the fully executed contract.
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, border: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 12, color: "var(--sd-font-secondary, #555)", marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: TONES.yellow.text, flexShrink: 0 }} />
        <span><strong>Priya Nair</strong> — signed Jun 28, 2026 at 2:14 PM</span>
        <IconCheck size={13} style={{ color: TONES.green.text }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Download draft</Button>
        <Button variant="primary" size="sm" onClick={onSkip}>Simulate countersign →</Button>
      </div>
    </div>
  );
}

/* ---- Confirmed pane ---- */

function ConfirmedPane() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <IconShieldCheck size={30} style={{ color: TONES.green.text }} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Contract fully executed</div>
      <div style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", maxWidth: 360, margin: "0 auto 22px", lineHeight: 1.6 }}>
        Both parties have signed. This agreement is now legally binding. A copy has been sent to priya@creates.com and brand@auralabs.com.
      </div>

      {/* Signature log */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", maxWidth: 400, margin: "0 auto 20px", textAlign: "left" }}>
        {[
          { party: "Creator", name: "Priya Nair",    date: "Jun 28, 2026 · 2:14 PM" },
          { party: "Brand",   name: "Jamie Okafor",  date: "Jun 28, 2026 · 3:02 PM" },
        ].map(({ party, name, date }, i) => (
          <div key={party} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i === 0 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
            <IconCircleCheck size={16} style={{ color: TONES.green.text, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{party} — {name}</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{date}</div>
            </div>
            <Badge label="Signed" tone="green" size="sm" />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Download executed PDF</Button>
        <Button variant="primary" size="sm">Go to campaign</Button>
      </div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [step, setStep] = useState<FlowStep>("preview");

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 620, margin: "0 auto" }}>
      <StepRail current={step} />

      {step === "preview"   && <PreviewPane />}
      {step === "sign"      && <SignPane onSigned={() => setStep("waiting")} />}
      {step === "waiting"   && <WaitingPane onSkip={() => setStep("confirmed")} />}
      {step === "confirmed" && <ConfirmedPane />}

      {/* Navigation */}
      {step === "preview" && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Download PDF</Button>
          <Button variant="primary" size="sm" onClick={() => setStep("sign")}>Review complete → Sign</Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "contract-signature-flow",
  title: "ContractSignatureFlow",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "4-step contract flow — review key terms, type-to-sign, countersign waiting state, and fully-executed confirmation.",
  description:
    "The end-to-end contract signing experience. Step 1 (Review): key terms table + excerpt with download CTA. Step 2 (Sign): type-to-sign field in serif/italic, auto-date, IP log, consent checkbox — Sign button unlocks only when checkbox is ticked and name ≥2 chars. Step 3 (Countersign): waiting state with who signed + timestamp. Step 4 (Confirmed): green shield, dual-signature audit log, download executed PDF. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Contract signature flow",
      description: "Click through each step. On the Sign step, type a name and check the box to enable signing.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
