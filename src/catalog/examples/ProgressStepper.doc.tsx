"use client";

import React, { useState } from "react";
import {
  IconCheck,
  IconCircleDot,
  IconFileText,
  IconBolt,
  IconPhoto,
  IconCalendar,
  IconBrandInstagram,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ================================================================== */
/* Progress bar                                                          */
/* ================================================================== */

interface ProgressBarProps {
  value: number;       // 0-100
  tone?: keyof typeof TONES;
  size?: "xs" | "sm" | "md";
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

function ProgressBar({ value, tone = "blue", size = "sm", label, showValue = false, animated = false }: ProgressBarProps) {
  const t = TONES[tone];
  const h = { xs: 4, sm: 6, md: 10 }[size];
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          {label && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-secondary)" }}>{label}</span>}
          {showValue && <span style={{ fontSize: 11, fontWeight: 700, color: t.text }}>{clamped}%</span>}
        </div>
      )}
      <div style={{ width: "100%", height: h, borderRadius: h, background: t.tint, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${clamped}%`,
          background: t.solid,
          borderRadius: h,
          transition: "width 0.4s ease",
          backgroundImage: animated
            ? `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 16px)`
            : "none",
          backgroundSize: "28px 28px",
          animation: animated ? "progress-stripe 0.6s linear infinite" : "none",
        }} />
      </div>
    </div>
  );
}

/* ================================================================== */
/* Stepper                                                               */
/* ================================================================== */

type StepStatus = "completed" | "current" | "upcoming";

interface Step {
  key: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
}

interface StepperProps {
  steps: Step[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
}

function Stepper({ steps, currentIndex, onStepClick, orientation = "horizontal" }: StepperProps) {
  const getStatus = (i: number): StepStatus =>
    i < currentIndex ? "completed" : i === currentIndex ? "current" : "upcoming";

  if (orientation === "vertical") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => {
          const status = getStatus(i);
          const isLast = i === steps.length - 1;
          const Icon = step.icon;
          return (
            <div key={step.key} style={{ display: "flex", gap: 12 }}>
              {/* Indicator column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <button type="button"
                  onClick={() => onStepClick?.(i)}
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    border: `2px solid ${status === "upcoming" ? "var(--sd-border-medium)" : status === "current" ? TONES.blue.solid : TONES.green.solid}`,
                    background: status === "completed" ? TONES.green.solid : status === "current" ? TONES.blue.tint : "var(--sd-bg-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: onStepClick ? "pointer" : "default",
                    transition: "all 0.15s",
                  }}>
                  {status === "completed"
                    ? <IconCheck size={13} style={{ color: "#fff", strokeWidth: 3 }} />
                    : Icon
                      ? <Icon size={13} style={{ color: status === "current" ? TONES.blue.solid : "var(--sd-font-tertiary)" }} />
                      : <span style={{ fontSize: 11, fontWeight: 700, color: status === "current" ? TONES.blue.solid : "var(--sd-font-tertiary)" }}>{i + 1}</span>
                  }
                </button>
                {!isLast && (
                  <div style={{ width: 2, flex: 1, minHeight: 28,
                    background: i < currentIndex ? TONES.green.solid : "var(--sd-border-light)",
                    margin: "4px 0" }} />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingBottom: isLast ? 0 : 24, paddingTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: status === "current" ? 700 : 500,
                  color: status === "upcoming" ? "var(--sd-font-tertiary)" : "var(--sd-font-primary)" }}>
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginTop: 2, lineHeight: 1.5 }}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {steps.map((step, i) => {
        const status = getStatus(i);
        const isLast = i === steps.length - 1;
        const Icon = step.icon;
        return (
          <React.Fragment key={step.key}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 80 }}>
              <button type="button"
                onClick={() => onStepClick?.(i)}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: `2px solid ${status === "upcoming" ? "var(--sd-border-medium)" : status === "current" ? TONES.blue.solid : TONES.green.solid}`,
                  background: status === "completed" ? TONES.green.solid : status === "current" ? TONES.blue.tint : "var(--sd-bg-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: onStepClick ? "pointer" : "default",
                  transition: "all 0.15s",
                }}>
                {status === "completed"
                  ? <IconCheck size={14} style={{ color: "#fff", strokeWidth: 3 }} />
                  : Icon
                    ? <Icon size={14} style={{ color: status === "current" ? TONES.blue.solid : "var(--sd-font-tertiary)" }} />
                    : <span style={{ fontSize: 11, fontWeight: 700, color: status === "current" ? TONES.blue.solid : "var(--sd-font-tertiary)" }}>{i + 1}</span>
                }
              </button>
              <div style={{ fontSize: 11, fontWeight: status === "current" ? 700 : 500, textAlign: "center", lineHeight: 1.3,
                color: status === "upcoming" ? "var(--sd-font-tertiary)" : "var(--sd-font-primary)" }}>
                {step.label}
              </div>
            </div>
            {!isLast && (
              <div style={{ flex: 1, height: 2, marginTop: 15,
                background: i < currentIndex ? TONES.green.solid : "var(--sd-border-light)", transition: "background 0.2s" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/* Demos                                                                 */
/* ================================================================== */

function ProgressBarDemo() {
  const [v, setV] = useState(60);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <ProgressBar value={v} label="Campaign progress" showValue />
      <ProgressBar value={33}  tone="orange" label="Script" showValue size="sm" />
      <ProgressBar value={66}  tone="green"  label="Content approved" showValue size="sm" />
      <ProgressBar value={100} tone="purple" label="Contracts signed" showValue size="sm" />
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {[0, 25, 50, 75, 100].map(n => (
          <Button key={n} variant={v === n ? "primary" : "secondary"} size="sm" onClick={() => setV(n)} style={{ flex: 1 }}>
            {n}%
          </Button>
        ))}
      </div>
    </div>
  );
}

const CAMPAIGN_STEPS: Step[] = [
  { key: "brief",      label: "Brief",       icon: IconFileText,       description: "Set campaign goals and requirements" },
  { key: "creators",   label: "Creators",    icon: IconBolt,           description: "Invite or approve creators" },
  { key: "contract",   label: "Contract",    icon: IconFileText,       description: "Send and collect signatures" },
  { key: "content",    label: "Content",     icon: IconPhoto,          description: "Review and approve uploads" },
  { key: "live",       label: "Go live",     icon: IconPlayerPlay,     description: "Post approval and tracking" },
];

function HorizontalStepperDemo() {
  const [current, setCurrent] = useState(2);
  return (
    <div style={{ maxWidth: 560 }}>
      <Stepper steps={CAMPAIGN_STEPS} currentIndex={current} onStepClick={setCurrent} orientation="horizontal" />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <Button variant="secondary" size="sm" onClick={() => setCurrent(i => Math.max(0, i - 1))} disabled={current === 0}>
          ← Back
        </Button>
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)", alignSelf: "center" }}>
          Step {current + 1} of {CAMPAIGN_STEPS.length}
        </span>
        <Button variant="primary" size="sm" onClick={() => setCurrent(i => Math.min(CAMPAIGN_STEPS.length - 1, i + 1))} disabled={current === CAMPAIGN_STEPS.length - 1}>
          Next →
        </Button>
      </div>
    </div>
  );
}

const DEAL_STEPS: Step[] = [
  { key: "outreach",    label: "Outreach",    description: "Creator invited to deal" },
  { key: "interested",  label: "Interested",  description: "Creator accepted the invite" },
  { key: "contracted",  label: "Contracted",  description: "Agreement signed by both parties" },
  { key: "active",      label: "Active",      description: "Content in production" },
  { key: "completed",   label: "Completed",   description: "All deliverables live" },
];

function VerticalStepperDemo() {
  const [current, setCurrent] = useState(2);
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <Stepper steps={DEAL_STEPS} currentIndex={current} onStepClick={setCurrent} orientation="vertical" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
        {DEAL_STEPS.map((s, i) => (
          <Button key={s.key} variant={current === i ? "primary" : "secondary"} size="sm" onClick={() => setCurrent(i)}>
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Doc                                                                   */
/* ================================================================== */

const doc: ComponentDoc = {
  slug: "progress-stepper",
  title: "Progress + Stepper",
  group: "Core Components",
  status: "stable",
  summary: "Linear progress bar and horizontal/vertical step indicator for campaign setup and deal pipeline flows.",
  description:
    "Two related components: **ProgressBar** renders a filled track with optional label + percentage value. Supports 4 tones, 3 sizes (xs/sm/md), and a striped animated variant for in-flight states. **Stepper** renders a numbered or icon-annotated step sequence — horizontal for campaign setup wizards, vertical for deal pipeline status. Completed steps show a filled accent circle with ✓; the current step shows an accent-bordered ring with a tint fill; upcoming steps are neutral. Steps are clickable when `onStepClick` is provided. Used in the CampaignSetup flow (5 steps: Brief → Creators → Contract → Content → Go live) and the DealPipeline sidebar (5 stages: Outreach → Completed).",
  demos: [
    {
      title: "Progress bar",
      description: "Click the percentage buttons to animate the bar. xs tracks are used for per-metric breakdowns inside campaign cards.",
      render: () => <ProgressBarDemo />,
    },
    {
      title: "Horizontal stepper — campaign setup",
      description: "Click any step bubble or the nav buttons to advance. Connector lines fill as steps complete.",
      render: () => <HorizontalStepperDemo />,
    },
    {
      title: "Vertical stepper — deal pipeline",
      description: "Used in the Right Panel overview tab to show deal stage alongside a timeline of events.",
      render: () => <VerticalStepperDemo />,
    },
  ],
  props: [],
};

export default doc;
