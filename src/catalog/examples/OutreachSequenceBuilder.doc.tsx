"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconX,
  IconMail,
  IconBrandInstagram,
  IconSend,
  IconClock,
  IconChevronDown,
  IconChevronUp,
  IconGripVertical,
  IconCheck,
  IconArrowDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type StepChannel = "email" | "instagram_dm" | "platform";

interface SequenceStep {
  id: string;
  channel: StepChannel;
  delayDays: number;
  subject?: string;
  message: string;
  expanded: boolean;
}

const CHANNEL_META: Record<StepChannel, { label: string; icon: React.ElementType; color: string; tone: keyof typeof TONES }> = {
  email:          { label: "Email",         icon: IconMail,             color: "#111",    tone: "gray"  },
  instagram_dm:   { label: "Instagram DM",  icon: IconBrandInstagram,   color: "#e1306c", tone: "pink"  },
  platform:       { label: "Platform msg",  icon: IconSend,             color: "#2563eb", tone: "blue"  },
};

const DEFAULT_STEPS: SequenceStep[] = [
  {
    id: "step1", channel: "email", delayDays: 0, expanded: true,
    subject: "Collaboration opportunity — Summer Glow by Aura Labs",
    message: "Hi {{first_name}},\n\nWe're huge fans of your content and would love to partner with you on our upcoming summer launch. The campaign pays ${{fee}} for a Reel + 3 Stories.\n\nInterested? Reply to this email or click below to review the full brief.\n\n— The Superdeal Team",
  },
  {
    id: "step2", channel: "instagram_dm", delayDays: 3, expanded: false,
    message: "Hey {{first_name}}! 👋 Just wanted to follow up on the Summer Glow collab we reached out about. Would love to chat if you're interested!",
  },
  {
    id: "step3", channel: "email", delayDays: 7, expanded: false,
    subject: "Last chance — Summer Glow partnership",
    message: "Hi {{first_name}},\n\nThis is our final follow-up for the Summer Glow campaign. We're finalising our creator list this week — let us know if you'd like to be included!\n\n— The Superdeal Team",
  },
];

const VARIABLES = ["{{first_name}}", "{{fee}}", "{{campaign}}", "{{brand}}", "{{deadline}}"];

/* ---- Step card ---- */

function StepCard({
  step, index, total,
  onToggle, onDelete, onChange,
}: {
  step: SequenceStep;
  index: number;
  total: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onChange: (id: string, patch: Partial<SequenceStep>) => void;
}) {
  const { icon: Icon, label, color, tone } = CHANNEL_META[step.channel];

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {/* Left: step number + connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 28 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{index + 1}</span>
        </div>
        {index < total - 1 && (
          <div style={{ width: 2, flex: 1, minHeight: 20, background: "var(--sd-border-default, #e5e7eb)", margin: "4px 0" }} />
        )}
      </div>

      {/* Card */}
      <div style={{ flex: 1, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", marginBottom: index < total - 1 ? 0 : 0 }}>
        {/* Header */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", cursor: "pointer", background: "var(--sd-bg-secondary, #f9f9f9)" }}
          onClick={() => onToggle(step.id)}
        >
          <div style={{ width: 24, height: 24, borderRadius: 6, background: TONES[tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={12} style={{ color }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700 }}>{label}</span>
          {index > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
              <IconClock size={11} />
              {step.delayDays === 0 ? "Immediately" : `+${step.delayDays} day${step.delayDays !== 1 ? "s" : ""}`}
            </div>
          )}
          {index === 0 && <Badge label="Initial outreach" tone="blue" size="sm" />}
          <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
            <button onClick={(e) => { e.stopPropagation(); onDelete(step.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 3 }}>
              <IconX size={12} />
            </button>
            {step.expanded ? <IconChevronUp size={14} style={{ color: "var(--sd-font-tertiary, #999)" }} /> : <IconChevronDown size={14} style={{ color: "var(--sd-font-tertiary, #999)" }} />}
          </div>
        </div>

        {/* Expanded body */}
        {step.expanded && (
          <div style={{ padding: "12px" }}>
            {/* Delay (for steps after first) */}
            {index > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", whiteSpace: "nowrap" }}>Send after</label>
                <input
                  type="number"
                  min={1}
                  value={step.delayDays}
                  onChange={(e) => onChange(step.id, { delayDays: Number(e.target.value) })}
                  style={{ width: 56, height: 30, textAlign: "center", borderRadius: 6, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 13, fontWeight: 700, outline: "none" }}
                />
                <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>days from previous step</span>
              </div>
            )}

            {/* Subject (email only) */}
            {step.channel === "email" && (
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 4 }}>Subject</label>
                <input
                  value={step.subject || ""}
                  onChange={(e) => onChange(step.id, { subject: e.target.value })}
                  style={{ width: "100%", height: 34, padding: "0 10px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }}
                />
              </div>
            )}

            {/* Message */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 4 }}>Message</label>
              <textarea
                value={step.message}
                onChange={(e) => onChange(step.id, { message: e.target.value })}
                rows={5}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, lineHeight: 1.6, fontFamily: "inherit", outline: "none", resize: "vertical" }}
              />
            </div>

            {/* Variable chips */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", alignSelf: "center" }}>Insert:</span>
              {VARIABLES.map((v) => (
                <button
                  key={v}
                  onClick={() => onChange(step.id, { message: step.message + v })}
                  style={{ padding: "2px 7px", borderRadius: 99, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 10, fontFamily: "monospace", cursor: "pointer", color: "var(--sd-font-secondary, #555)" }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSteps((ss) => ss.map((s) => s.id === id ? { ...s, expanded: !s.expanded } : s));
  }

  function deleteStep(id: string) {
    setSteps((ss) => ss.filter((s) => s.id !== id));
  }

  function change(id: string, patch: Partial<SequenceStep>) {
    setSteps((ss) => ss.map((s) => s.id === id ? { ...s, ...patch } : s));
  }

  function addStep(channel: StepChannel) {
    setSteps((ss) => [
      ...ss,
      { id: `step${Date.now()}`, channel, delayDays: 2, message: "", expanded: true },
    ]);
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const totalDays = steps.reduce((s, step) => s + step.delayDays, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 560 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Outreach sequence</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{steps.length} steps · ~{totalDays} days total</div>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={saved ? <IconCheck size={12} /> : <IconSend size={12} />}
          onClick={save}
        >
          {saved ? "Saved!" : "Save sequence"}
        </Button>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <StepCard step={step} index={i} total={steps.length} onToggle={toggle} onDelete={deleteStep} onChange={change} />
            {i < steps.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 14 }}>
                <IconArrowDown size={12} style={{ color: "var(--sd-font-tertiary, #999)", marginLeft: 7 }} />
                <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>
                  +{steps[i + 1].delayDays} day{steps[i + 1].delayDays !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Add step */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", alignSelf: "center" }}>Add step:</span>
        {(Object.entries(CHANNEL_META) as [StepChannel, typeof CHANNEL_META[StepChannel]][]).map(([key, { label, icon: Icon, color, tone }]) => (
          <button
            key={key}
            onClick={() => addStep(key)}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)" }}
          >
            <Icon size={12} style={{ color }} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "outreach-sequence-builder",
  title: "OutreachSequenceBuilder",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Multi-step outreach sequence editor — expandable step cards with delay timing, channel selector, subject/message fields, and merge-variable chips.",
  description:
    "Lets campaign managers build automated outreach flows. Header: sequence name, total step count and timeline span, Save button. Step cards: numbered circles with vertical connector lines. Each card has channel badge (Email / Instagram DM / Platform), delay-days input for steps 2+, subject field (email only), multi-line message textarea, and merge-variable insert chips ({{first_name}}, {{fee}}, etc.). Add-step bar at the bottom adds a new collapsed step of the chosen channel. Delay inter-step arrows show the gap between cards. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Outreach sequence builder",
      description: "Click any step header to expand/collapse. Edit the delay, subject, or message. Insert variables with the chip buttons. Add additional steps below.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
