"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconUser,
  IconCurrencyDollar,
  IconPhoto,
  IconShield,
  IconCheck,
  IconChevronRight,
  IconSparkles,
  IconLock,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface Step {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  cta: string;
  tone: keyof typeof TONES;
  required: boolean;
}

const STEPS: Step[] = [
  { id: "s1", icon: IconBrandInstagram, title: "Connect Instagram",     description: "Link your IG account so brands can see your stats.",          cta: "Connect Instagram",  tone: "pink",   required: true  },
  { id: "s2", icon: IconBrandTiktok,    title: "Connect TikTok",        description: "Optionally add TikTok to show cross-platform reach.",           cta: "Connect TikTok",    tone: "blue",   required: false },
  { id: "s3", icon: IconUser,           title: "Write your bio",        description: "Tell brands who you are and what content you create.",           cta: "Add bio",            tone: "purple", required: true  },
  { id: "s4", icon: IconCurrencyDollar, title: "Set your rate card",    description: "Define starting rates for Reels, Stories, and UGC content.",   cta: "Set rates",          tone: "green",  required: true  },
  { id: "s5", icon: IconPhoto,          title: "Upload portfolio piece", description: "Add at least one past campaign or content sample.",             cta: "Upload sample",      tone: "orange", required: true  },
  { id: "s6", icon: IconShield,         title: "Verify payment method", description: "Add a payout method to receive your campaign payments.",        cta: "Add payment info",   tone: "gray",   required: true  },
];

function Demo() {
  const [completed, setCompleted] = useState<Set<string>>(new Set(["s1", "s3"]));
  const [active,    setActive]    = useState<string | null>(null);
  const [pending,   setPending]   = useState<string | null>(null);
  const [done,      setDone]      = useState(false);

  const required = STEPS.filter((s) => s.required);
  const completedRequired = required.filter((s) => completed.has(s.id));
  const progress = Math.round((completedRequired.length / required.length) * 100);
  const allRequired = completedRequired.length === required.length;

  function handleCta(id: string) {
    setPending(id);
    setTimeout(() => {
      setCompleted((prev) => new Set([...prev, id]));
      setPending(null);
      setActive(null);
    }, 900);
  }

  if (done) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "32px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: 99, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <IconSparkles size={28} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>Profile live!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginBottom: 14, lineHeight: 1.5 }}>
          Your creator profile is now visible to brands.<br />You will start receiving campaign invites soon.
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {STEPS.filter((s) => completed.has(s.id)).map((s) => (
            <span key={s.id} style={{ display: "flex", gap: 4, alignItems: "center", padding: "3px 9px", borderRadius: 99, background: TONES[s.tone].tint, fontSize: 10, fontWeight: 700, color: TONES[s.tone].text }}>
              <IconCheck size={9} />{s.title}
            </span>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={() => { setDone(false); setCompleted(new Set(["s1","s3"])); setActive(null); }}>
          Reset demo
        </Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Set up your creator profile</div>
          <Badge label={`${completedRequired.length}/${required.length} required`} tone={allRequired ? "green" : "blue"} size="sm" />
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Complete these steps to start receiving campaign invites.</div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Profile completeness</span>
          <span style={{ fontSize: 10, fontWeight: 800, color: progress === 100 ? TONES.green.text : "var(--sd-font-primary,#111)" }}>{progress}%</span>
        </div>
        <div style={{ height: 6, background: "var(--sd-bg-tertiary,#e5e7eb)", borderRadius: 3 }}>
          <div style={{ width: progress + "%", height: "100%", background: allRequired ? TONES.green.text : TONES.blue.text, borderRadius: 3, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {STEPS.map((step) => {
          const isDone    = completed.has(step.id);
          const isOpen    = active === step.id;
          const isPending = pending === step.id;

          return (
            <div key={step.id} style={{ border: "1.5px solid " + (isDone ? TONES[step.tone].text + "50" : "var(--sd-border-default,#e5e7eb)"), borderRadius: 11, overflow: "hidden" }}>
              <button onClick={() => setActive(isOpen ? null : step.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: isDone ? TONES[step.tone].tint : "white", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: isDone ? TONES[step.tone].text : "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isDone
                    ? <IconCheck size={14} style={{ color: "#fff" }} />
                    : <step.icon size={14} style={{ color: TONES[step.tone].text }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isDone ? TONES[step.tone].text : "var(--sd-font-primary,#111)", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                    {step.title}
                    {!step.required && <span style={{ fontSize: 9, fontWeight: 500, color: "var(--sd-font-tertiary,#999)" }}>optional</span>}
                    {isDone && <Badge label="Done" tone={step.tone} size="sm" />}
                  </div>
                  {!isOpen && !isDone && (
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 1 }}>{step.description}</div>
                  )}
                </div>
                {!isDone && (
                  <IconChevronRight size={13} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                )}
              </button>

              {isOpen && !isDone && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "10px 13px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  <div style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)", marginBottom: 10, lineHeight: 1.5 }}>{step.description}</div>
                  <Button variant="primary" size="sm" onClick={() => handleCta(step.id)} disabled={isPending}
                    leftIcon={isPending ? undefined : <step.icon size={11} />} style={{ width: "100%" }}>
                    {isPending ? "Connecting…" : step.cta}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button variant="primary" size="sm" onClick={() => setDone(true)} disabled={!allRequired} style={{ width: "100%" }}
        leftIcon={allRequired ? <IconSparkles size={11} /> : <IconLock size={11} />}>
        {allRequired
          ? "Go live — publish my profile"
          : "Complete " + (required.length - completedRequired.length) + " more required step" + (required.length - completedRequired.length !== 1 ? "s" : "") + " to continue"}
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-onboarding-checklist",
  title: "CreatorOnboardingChecklist",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "New creator profile setup — 6 collapsible steps (Connect IG, TikTok optional, Bio, Rate card, Portfolio, Payment), animated progress bar, and a locked Go Live CTA until all required steps complete.",
  description:
    "First-time creator onboarding flow. Header: title + required-step count badge (turns green when all done). Progress bar with live width transition showing required-only percentage. 6 step rows: 30×30 icon tile (fills with tone color + white check when done), title, 'optional' label where applicable, 'Done' badge when complete, chevron that rotates 90° when open. Expand-and-incomplete shows description + full-width CTA → 900ms loading → marks done, collapses, activates tone background. Pre-completed: Instagram (pink) + Bio (purple). TikTok marked optional. 'Go live' button at bottom: locked with padlock icon and descriptive disabled label while required steps remain; sparkle icon when all done → success screen: green sparkle circle, 'Profile live!', completed step chips in respective tones, Reset demo. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator onboarding checklist",
      description: "Click any incomplete step to expand and complete it. The progress bar advances on each completion. Go live unlocks once all 5 required steps are done.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
