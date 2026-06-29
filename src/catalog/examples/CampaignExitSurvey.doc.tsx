"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconStar,
  IconStarFilled,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconMessageCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type StarValue = 0 | 1 | 2 | 3 | 4 | 5;
type YNNValue  = "yes" | "neutral" | "no" | null;

interface SurveyAnswers {
  overall:     StarValue;
  brief:       StarValue;
  responsiveness: StarValue;
  payment:     StarValue;
  workAgain:   YNNValue;
  suggestion:  string;
}

function StarRow({ label, value, onChange, description }: {
  label: string; value: StarValue; onChange: (v: StarValue) => void; description?: string;
}) {
  const [hover, setHover] = useState(0);
  const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 3 }}>{label}</div>
      {description && <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 7, lineHeight: 1.4 }}>{description}</div>}
      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
        {[1,2,3,4,5].map((s) => {
          const active = (hover || value) >= s;
          return (
            <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => onChange(s as StarValue)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, lineHeight: 1 }}>
              {active
                ? <IconStarFilled size={22} style={{ color: "#f59e0b" }} />
                : <IconStar       size={22} style={{ color: "#d1d5db" }} />}
            </button>
          );
        })}
        {(hover || value) > 0 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: TONES.orange.text, marginLeft: 6 }}>
            {LABELS[hover || value]}
          </span>
        )}
      </div>
    </div>
  );
}

function YNNRow({ label, value, onChange }: { label: string; value: YNNValue; onChange: (v: YNNValue) => void }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>{label}</div>
      <div style={{ display: "flex", gap: 7 }}>
        {([["yes","Definitely yes","green"],["neutral","Maybe","yellow"],["no","Probably not","red"]] as const).map(([key, lbl, tone]) => (
          <button key={key} onClick={() => onChange(key as YNNValue)}
            style={{ flex: 1, padding: "8px 12px", borderRadius: 9, border: `2px solid ${value === key ? TONES[tone].text : "var(--sd-border-default,#e5e7eb)"}`, background: value === key ? TONES[tone].tint : "transparent", cursor: "pointer", fontSize: 11, fontWeight: 700, color: value === key ? TONES[tone].text : "var(--sd-font-secondary,#555)" }}>
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [step,     setStep]     = useState(0);
  const [answers,  setAnswers]  = useState<SurveyAnswers>({
    overall: 0, brief: 0, responsiveness: 0, payment: 0,
    workAgain: null, suggestion: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);

  function set<K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance() {
    if (step === 0) return answers.overall > 0;
    if (step === 1) return answers.brief > 0 && answers.responsiveness > 0 && answers.payment > 0;
    if (step === 2) return answers.workAgain !== null;
    return true;
  }

  function submit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1000);
  }

  const STEPS = ["Overall experience", "Specific ratings", "Work together again", "Suggestions"];
  const totalSteps = STEPS.length;

  if (done) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "28px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: 99, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
          <IconCheck size={24} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>Thank you, Priya!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", lineHeight: 1.6, maxWidth: 280, margin: "0 auto 14px" }}>
          Your feedback has been shared with Aura Labs. Honest reviews help make the platform better for everyone.
        </div>
        <Badge label={`You rated this campaign ${answers.overall}/5 stars`} tone="orange" size="sm" />
        <div style={{ marginTop: 14 }}>
          <Button variant="secondary" size="sm" onClick={() => { setDone(false); setStep(0); setAnswers({ overall: 0, brief: 0, responsiveness: 0, payment: 0, workAgain: null, suggestion: "" }); }}>
            Reset demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>Campaign feedback</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Aura Labs · Summer Glow Campaign</div>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, alignItems: "center" }}>
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
              <div style={{ width: 24, height: 24, borderRadius: 99, background: i < step ? TONES.green.text : i === step ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${i < step ? TONES.green.text : i === step ? "#111" : "var(--sd-border-default,#e5e7eb)"}` }}>
                {i < step
                  ? <IconCheck size={12} style={{ color: "#fff" }} />
                  : <span style={{ fontSize: 10, fontWeight: 800, color: i === step ? "#fff" : "var(--sd-font-tertiary,#999)" }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 9, color: i === step ? "#111" : "var(--sd-font-tertiary,#999)", fontWeight: i === step ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ height: 2, flex: 0.5, background: i < step ? TONES.green.text : "var(--sd-border-default,#e5e7eb)", borderRadius: 1, marginBottom: 16 }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 0: Overall */}
      {step === 0 && (
        <div>
          <StarRow
            label="Overall campaign experience"
            description="How would you rate working on this campaign from start to finish?"
            value={answers.overall}
            onChange={(v) => set("overall", v)}
          />
          {answers.overall > 0 && answers.overall <= 3 && (
            <div style={{ padding: "8px 12px", background: TONES.yellow.tint, borderRadius: 9, fontSize: 11, color: TONES.yellow.text, marginBottom: 8, lineHeight: 1.5 }}>
              We're sorry to hear this wasn't a great experience. Your detailed feedback on the next steps will help us improve.
            </div>
          )}
        </div>
      )}

      {/* Step 1: Specific ratings */}
      {step === 1 && (
        <div>
          <StarRow label="Brief quality" description="Was the campaign brief clear, detailed, and actionable?" value={answers.brief} onChange={(v) => set("brief", v)} />
          <StarRow label="Brand responsiveness" description="How quickly and helpfully did Aura Labs respond to your messages?" value={answers.responsiveness} onChange={(v) => set("responsiveness", v)} />
          <StarRow label="Payment experience" description="Was payment processed correctly and on time?" value={answers.payment} onChange={(v) => set("payment", v)} />
        </div>
      )}

      {/* Step 2: Work again */}
      {step === 2 && (
        <YNNRow
          label="Would you work with Aura Labs again?"
          value={answers.workAgain}
          onChange={(v) => set("workAgain", v)}
        />
      )}

      {/* Step 3: Suggestions */}
      {step === 3 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Any suggestions for improvement? <span style={{ fontWeight: 400, color: "var(--sd-font-tertiary,#999)" }}>(optional)</span></div>
          <textarea value={answers.suggestion} onChange={(e) => set("suggestion", e.target.value)}
            placeholder="What could Aura Labs or the platform do better? Share anything that comes to mind…"
            style={{ width: "100%", minHeight: 100, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, padding: "10px 12px", fontSize: 12, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.55 }} />
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 4 }}>
            Your feedback is anonymous to future creators but shared with Aura Labs.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {step > 0 && (
          <Button variant="secondary" size="sm" leftIcon={<IconArrowLeft size={11} />} onClick={() => setStep(step - 1)}>Back</Button>
        )}
        <div style={{ flex: 1 }} />
        {step < totalSteps - 1 ? (
          <Button variant="primary" size="sm" onClick={() => setStep(step + 1)} disabled={!canAdvance()} leftIcon={<IconArrowRight size={11} />}>
            Next
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={submit} disabled={submitting}
            leftIcon={submitting ? undefined : <IconCheck size={11} />}>
            {submitting ? "Submitting…" : "Submit feedback"}
          </Button>
        )}
      </div>

      <div style={{ marginTop: 10, textAlign: "center", fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
        Step {step + 1} of {totalSteps}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-exit-survey",
  title: "CampaignExitSurvey",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Post-campaign 4-step creator exit survey — overall star rating, 3 dimension ratings, work-again 3-way toggle, free-text suggestions, with step indicator and animated thank-you screen.",
  description:
    "Creator submits post-campaign feedback after a campaign ends. 4-step wizard with numbered step indicator (completed steps turn green with check). Step 1 — Overall experience: 5-star hover with word label (Poor/Fair/Good/Very good/Excellent); yellow callout if ≤3 stars encouraging detail. Step 2 — Specific ratings: 3 independent star rows for brief quality / brand responsiveness / payment experience. Step 3 — Work again: 3-way button (Definitely yes green / Maybe yellow / Probably not red), tint + border on select. Step 4 — Suggestions: optional multi-line textarea with anonymous-to-future-creators note. Back/Next navigation; Next disabled until required fields filled. Submit → 'Submitting…' → green success screen: Thank you, Priya! + campaign rating badge + Reset demo. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign exit survey",
      description: "Click stars on step 1 (try ≤3 to see the yellow callout). Next unlocks when required fields filled. Complete all 4 steps and submit to see the thank-you screen.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
