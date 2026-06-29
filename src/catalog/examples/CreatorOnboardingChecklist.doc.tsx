"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import {
  IconCheck,
  IconCircle,
  IconLock,
  IconPackage,
  IconFileText,
  IconPencil,
  IconClock,
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconArrowRight,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type StepStatus = "complete" | "active" | "locked";

interface ChecklistStep {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status: StepStatus;
  detail?: string;
  cta?: string;
}

/* ---- seed ---- */

const INITIAL_STEPS: ChecklistStep[] = [
  {
    id: "profile",
    icon: IconCircle,
    title: "Complete your profile",
    description: "Add bio, profile photo, and confirm your platform handles.",
    status: "complete",
    detail: "Verified: @priya.creates on IG, TikTok, YouTube",
    cta: "Edit profile",
  },
  {
    id: "contract",
    icon: IconFileText,
    title: "Sign your contract",
    description: "Review and sign the collaboration agreement for Summer Glow.",
    status: "complete",
    detail: "Signed Jun 28, 2026 · countersigned by Aura Labs",
    cta: "View contract",
  },
  {
    id: "product",
    icon: IconPackage,
    title: "Confirm product receipt",
    description: "Let us know when the Summer Glow kit arrives so we can start the timeline.",
    status: "active",
    detail: "Shipped Jun 25 via FedEx · Tracking: 7489203847",
    cta: "Confirm receipt",
  },
  {
    id: "brief",
    icon: IconFileText,
    title: "Read the campaign brief",
    description: "Review talking points, key claims, and posting guidelines before creating content.",
    status: "locked",
    detail: undefined,
    cta: "Open brief",
  },
  {
    id: "content",
    icon: IconPencil,
    title: "Submit first draft",
    description: "Upload your IG Reel draft for review. Aim for 15–30 seconds.",
    status: "locked",
    detail: undefined,
    cta: "Upload draft",
  },
  {
    id: "schedule",
    icon: IconCalendar,
    title: "Schedule your posts",
    description: "Coordinate publish dates with the campaign go-live window.",
    status: "locked",
    detail: undefined,
    cta: "Set schedule",
  },
];

const complete = INITIAL_STEPS.filter((s) => s.status === "complete").length;
const total = INITIAL_STEPS.length;

/* ---- Step row ---- */

function StepRow({ step, index }: { step: ChecklistStep; index: number }) {
  const [expanded, setExpanded] = useState(step.status === "active");
  const Icon = step.icon;

  return (
    <div
      style={{
        display: "flex", gap: 14, padding: "12px 16px",
        background: step.status === "active" ? "rgba(37,99,235,0.02)" : "transparent",
        opacity: step.status === "locked" ? 0.5 : 1,
        transition: "opacity 0.15s",
      }}
    >
      {/* Step marker */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: step.status === "complete" ? "#111"
            : step.status === "active" ? "#fff"
            : "var(--sd-bg-tertiary, #f1f1f1)",
          border: `2px solid ${step.status === "complete" ? "#111" : step.status === "active" ? "#111" : "var(--sd-border-default, #e5e7eb)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {step.status === "complete"
            ? <IconCheck size={13} color="#fff" />
            : step.status === "locked"
            ? <IconLock size={11} color="var(--sd-font-tertiary, #999)" />
            : <span style={{ fontSize: 11, fontWeight: 700 }}>{index + 1}</span>
          }
        </div>
        {/* connector line */}
        <div style={{ width: 2, flex: 1, minHeight: 16, background: "var(--sd-border-default, #e5e7eb)", marginTop: 4 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>{step.title}</span>
          {step.status === "complete" && <Badge label="Done" tone="green" size="sm" />}
          {step.status === "active"   && <Badge label="Up next" tone="blue" size="sm" dot />}
        </div>
        <p style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", margin: 0, lineHeight: 1.5 }}>
          {step.description}
        </p>

        {/* Expanded detail + CTA */}
        {(step.status === "active" || step.status === "complete") && step.detail && (
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}
            >
              {expanded ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />}
              {expanded ? "Hide details" : "Show details"}
            </button>
            {expanded && (
              <div style={{ marginTop: 6, padding: "8px 10px", background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 8, fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>
                {step.detail}
              </div>
            )}
          </div>
        )}

        {step.status === "active" && step.cta && (
          <div style={{ marginTop: 10 }}>
            <Button variant="primary" size="sm" rightIcon={<IconArrowRight size={11} />}>
              {step.cta}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 560 }}>
      {/* Creator header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Avatar initials="PN" tone="green" size="lg" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800 }}>Welcome, Priya!</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow by Aura Labs · Jun 2026</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{complete}/{total} complete</div>
          <div style={{ marginTop: 4, width: 80, height: 5, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 3 }}>
            <div style={{ width: `${(complete / total) * 100}%`, height: "100%", background: "#111", borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Onboarding steps</span>
          <Badge label={`${total - complete} remaining`} tone="yellow" size="sm" />
        </div>
        {INITIAL_STEPS.map((step, i) => (
          <div key={step.id} style={{ borderBottom: i < INITIAL_STEPS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
            <StepRow step={step} index={i} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "var(--sd-font-tertiary, #999)", textAlign: "center" }}>
        Locked steps unlock automatically as you complete each one in order.
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-onboarding-checklist",
  title: "CreatorOnboardingChecklist",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Step-by-step onboarding flow for a newly-added creator — sequential checklist with status markers, expandable detail, and contextual CTAs.",
  description:
    "The creator-facing setup guide for a new campaign. Header: avatar, greeting, campaign label, progress fraction + mini bar. Checklist card: 6 sequential steps (profile, contract, product receipt, brief, content, schedule). Each step row: step marker (filled + check = done, outlined = active, padlock = locked), title, description, done/up-next badge. Active step expands to show shipping detail and the primary CTA button. Locked steps are dimmed. Vertical connector lines link steps. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator onboarding checklist",
      description: "Steps 1 and 2 are complete. Step 3 (product receipt) is active with expandable shipping detail. Steps 4–6 are locked.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
