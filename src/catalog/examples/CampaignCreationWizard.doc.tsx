"use client";

import React, { useState } from "react";
import {
  IconSpeakerphone,
  IconTarget,
  IconPhoto,
  IconUsers,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconGift,
  IconCurrencyDollar,
  IconVideo,
  IconBolt,
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconCalendar,
  IconRocket,
  IconBulb,
  IconStar,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { DateRangePicker } from "@/components/ui/DatePicker/DatePicker";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

interface WizardState {
  // Step 1 — Basics
  name: string;
  objective: string | null;
  startDate: string;
  endDate: string;
  // Step 2 — Targeting
  platforms: string[];
  creatorTier: string | null;
  categories: string[];
  // Step 3 — Deliverables
  dealType: string | null;
  contentTypes: string[];
  minDeliverables: number;
  // Step 4 — Budget
  totalBudget: number;
  perCreatorBudget: number;
}

/* ------------------------------------------------------------------ */
/* Shared primitives (inline to avoid import complexity)                */
/* ------------------------------------------------------------------ */

function RadioCard({ value, selected, onSelect, icon: Icon, label, description, tone = "blue" }:
  { value: string; selected: boolean; onSelect: () => void; icon?: React.ElementType; label: string; description?: string; tone?: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <Button variant="ghost" onClick={onSelect} style={{
      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
      padding: "12px 14px",
      border: `2px solid ${selected ? t.solid : "var(--sd-border-light)"}`,
      borderRadius: "var(--sd-radius-md)",
      background: selected ? t.tint : "var(--sd-bg-primary)",
      width: "100%", height: "auto", textAlign: "left", position: "relative",
      transition: "border-color 0.1s, background 0.1s",
    }}>
      <div style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, borderRadius: "50%",
        border: selected ? "none" : "1.5px solid var(--sd-border-medium)",
        background: selected ? t.solid : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {selected && <IconCheck size={9} color="#fff" strokeWidth={3} />}
      </div>
      {Icon && (
        <div style={{ width: 32, height: 32, borderRadius: "var(--sd-radius-sm)", background: selected ? t.solid : t.tint, color: selected ? "#fff" : t.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} />
        </div>
      )}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: selected ? t.text : "var(--sd-font-primary)" }}>{label}</div>
        {description && <div style={{ fontSize: 11, color: selected ? t.text : "var(--sd-font-tertiary)", marginTop: 2, lineHeight: 1.4, opacity: selected ? 0.85 : 1 }}>{description}</div>}
      </div>
    </Button>
  );
}

function ToggleChip({ label, selected, onToggle, icon: Icon, tone = "blue" }:
  { label: string; selected: boolean; onToggle: () => void; icon?: React.ElementType; tone?: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <Button variant={selected ? "secondary" : "ghost"} size="sm" onClick={onToggle}
      style={{
        borderColor: selected ? t.solid : "var(--sd-border-light)",
        background: selected ? t.tint : "transparent",
        color: selected ? t.text : "var(--sd-font-secondary)",
        fontWeight: selected ? 700 : 500,
      }}>
      {Icon && <Icon size={13} />}{label}
    </Button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)", marginBottom: 8 }}>{children}</div>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 6 }}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Step components                                                       */
/* ------------------------------------------------------------------ */

function Step1({ state, set }: { state: WizardState; set: (k: keyof WizardState, v: unknown) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <Input value={state.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Atlas X Summer Launch" label="Campaign name *" />
      </div>

      <div>
        <FieldLabel>Campaign objective *</FieldLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <RadioCard value="awareness"  selected={state.objective === "awareness"}  onSelect={() => set("objective", "awareness")}  icon={IconSpeakerphone} label="Brand awareness"  description="Maximise reach"      tone="blue"   />
          <RadioCard value="conversion" selected={state.objective === "conversion"} onSelect={() => set("objective", "conversion")} icon={IconTarget}       label="Drive sales"     description="Track conversions" tone="green"  />
          <RadioCard value="ugc"        selected={state.objective === "ugc"}        onSelect={() => set("objective", "ugc")}        icon={IconPhoto}        label="Collect UGC"    description="Reusable content"  tone="purple" />
        </div>
      </div>

      <DateRangePicker
        startDate={state.startDate || null}
        endDate={state.endDate || null}
        onStartChange={(d) => set("startDate", d ?? "")}
        onEndChange={(d) => set("endDate", d ?? "")}
        startLabel="Start date *"
        endLabel="End date *"
      />
    </div>
  );
}

function Step2({ state, set }: { state: WizardState; set: (k: keyof WizardState, v: unknown) => void }) {
  const toggleArr = (key: keyof WizardState, val: string) => {
    const arr = state[key] as string[];
    set(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <FieldLabel>Platforms</FieldLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <ToggleChip label="Instagram" icon={IconBrandInstagram} selected={state.platforms.includes("instagram")} onToggle={() => toggleArr("platforms", "instagram")} tone="pink" />
          <ToggleChip label="TikTok"    icon={IconBrandTiktok}    selected={state.platforms.includes("tiktok")}    onToggle={() => toggleArr("platforms", "tiktok")}    tone="gray" />
          <ToggleChip label="YouTube"   icon={IconBrandYoutube}   selected={state.platforms.includes("youtube")}   onToggle={() => toggleArr("platforms", "youtube")}   tone="red"  />
        </div>
      </div>

      <div>
        <FieldLabel>Creator tier</FieldLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <RadioCard value="nano"  selected={state.creatorTier === "nano"}  onSelect={() => set("creatorTier", "nano")}  icon={IconUsers} label="Nano"  description="1K–10K · High trust"  tone="turquoise" />
          <RadioCard value="micro" selected={state.creatorTier === "micro"} onSelect={() => set("creatorTier", "micro")} icon={IconUsers} label="Micro" description="10K–100K · Best ROI"  tone="blue"      />
          <RadioCard value="macro" selected={state.creatorTier === "macro"} onSelect={() => set("creatorTier", "macro")} icon={IconUsers} label="Macro" description="100K+ · Scale & reach" tone="purple"    />
        </div>
      </div>

      <div>
        <FieldLabel>Creator categories</FieldLabel>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Beauty", "Fashion", "Fitness", "Food", "Lifestyle", "Tech", "Travel", "Gaming", "Parenting"].map(cat => (
            <ToggleChip key={cat} label={cat} selected={state.categories.includes(cat)} onToggle={() => toggleArr("categories", cat)} />
          ))}
        </div>
        <Hint>Select all that apply — creators must match at least one category.</Hint>
      </div>
    </div>
  );
}

function Step3({ state, set }: { state: WizardState; set: (k: keyof WizardState, v: unknown) => void }) {
  const toggleArr = (key: keyof WizardState, val: string) => {
    const arr = state[key] as string[];
    set(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <FieldLabel>Deal type *</FieldLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <RadioCard value="gifting"   selected={state.dealType === "gifting"}   onSelect={() => set("dealType", "gifting")}   icon={IconGift}            label="Gifting"   description="Send product, no cash"   tone="orange" />
          <RadioCard value="paid"      selected={state.dealType === "paid"}      onSelect={() => set("dealType", "paid")}      icon={IconCurrencyDollar} label="Paid"      description="Flat fee per creator"    tone="green"  />
          <RadioCard value="ugc"       selected={state.dealType === "ugc"}       onSelect={() => set("dealType", "ugc")}       icon={IconVideo}          label="UGC"       description="Raw file, no post"        tone="blue"   />
          <RadioCard value="affiliate" selected={state.dealType === "affiliate"} onSelect={() => set("dealType", "affiliate")} icon={IconBolt}           label="Affiliate" description="Commission on sales"      tone="purple" />
        </div>
      </div>

      <div>
        <FieldLabel>Content types</FieldLabel>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Reel", "Story set", "Feed post", "TikTok video", "YouTube Short", "UGC video", "UGC photo"].map(ct => (
            <ToggleChip key={ct} label={ct} selected={state.contentTypes.includes(ct)} onToggle={() => toggleArr("contentTypes", ct)} tone="purple" />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Minimum deliverables per creator</FieldLabel>
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <Button key={n} variant={state.minDeliverables === n ? "primary" : "secondary"} size="sm" onClick={() => set("minDeliverables", n)}>
              {n}
            </Button>
          ))}
        </div>
        <Hint>Creator must complete at least this many deliverables to receive payment.</Hint>
      </div>
    </div>
  );
}

function Step4({ state, set }: { state: WizardState; set: (k: keyof WizardState, v: unknown) => void }) {
  const creatorCount = state.creatorTier ? (state.creatorTier === "nano" ? 20 : state.creatorTier === "micro" ? 10 : 5) : 10;
  const estimatedTotal = state.perCreatorBudget * creatorCount;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <Input type="number" value={String(state.totalBudget)} onChange={e => set("totalBudget", parseInt(e.target.value) || 0)} label="Total campaign budget (USD)" placeholder="0" />
      </div>

      <div>
        <Input type="number" value={String(state.perCreatorBudget)} onChange={e => set("perCreatorBudget", parseInt(e.target.value) || 0)} label="Max per creator (USD)" placeholder="0" hint="This is the ceiling per creator — individual deals can be negotiated below this." />
      </div>

      {/* Estimate card */}
      <div style={{ padding: "14px 16px", background: TONES.blue.tint, borderRadius: "var(--sd-radius-md)", border: `1px solid ${TONES.blue.solid}30` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: TONES.blue.text, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Budget estimate</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["Total budget",         `$${state.totalBudget.toLocaleString()}`],
            ["Max per creator",      `$${state.perCreatorBudget.toLocaleString()}`],
            ["Estimated creators",   `~${Math.floor(state.totalBudget / (state.perCreatorBudget || 1))}`],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: TONES.blue.text }}>{label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: TONES.blue.text }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step5({ state }: { state: WizardState }) {
  const rows = [
    { label: "Campaign name",    value: state.name || "—" },
    { label: "Objective",        value: state.objective ? { awareness: "Brand awareness", conversion: "Drive sales", ugc: "Collect UGC" }[state.objective] ?? "—" : "—" },
    { label: "Dates",            value: state.startDate && state.endDate ? `${state.startDate} → ${state.endDate}` : "—" },
    { label: "Platforms",        value: state.platforms.length ? state.platforms.join(", ") : "—" },
    { label: "Creator tier",     value: state.creatorTier ?? "—" },
    { label: "Categories",       value: state.categories.length ? state.categories.join(", ") : "—" },
    { label: "Deal type",        value: state.dealType ?? "—" },
    { label: "Content types",    value: state.contentTypes.length ? state.contentTypes.join(", ") : "—" },
    { label: "Min deliverables", value: String(state.minDeliverables) },
    { label: "Total budget",     value: `$${state.totalBudget.toLocaleString()}` },
    { label: "Max per creator",  value: `$${state.perCreatorBudget.toLocaleString()}` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "12px 14px", background: TONES.green.tint, borderRadius: "var(--sd-radius-md)", display: "flex", alignItems: "center", gap: 8 }}>
        <IconCheck size={16} style={{ color: TONES.green.solid, flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: TONES.green.text }}>Everything looks good! Review and launch.</span>
      </div>

      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            display: "flex", gap: 12, padding: "8px 14px",
            borderBottom: i < rows.length - 1 ? "1px solid var(--sd-border-light)" : "none",
            background: i % 2 === 0 ? "var(--sd-bg-primary)" : "var(--sd-bg-secondary)",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", width: 130, flexShrink: 0 }}>{r.label}</span>
            <span style={{ fontSize: 12, color: "var(--sd-font-primary)" }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wizard shell                                                          */
/* ------------------------------------------------------------------ */

const STEPS = [
  { id: 1, label: "Basics",       icon: IconBulb,        description: "Name, objective, dates" },
  { id: 2, label: "Targeting",    icon: IconUsers,        description: "Platform, tier, categories" },
  { id: 3, label: "Deliverables", icon: IconPhoto,        description: "Deal type, content" },
  { id: 4, label: "Budget",       icon: IconCurrencyDollar, description: "Total & per-creator spend" },
  { id: 5, label: "Review",       icon: IconStar,         description: "Confirm & launch" },
];

const DEFAULT: WizardState = {
  name: "", objective: null, startDate: "2025-07-01", endDate: "2025-07-31",
  platforms: ["instagram"], creatorTier: "micro", categories: ["Beauty"],
  dealType: "paid", contentTypes: ["Reel"], minDeliverables: 2,
  totalBudget: 25000, perCreatorBudget: 2500,
};

function CampaignCreationWizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(DEFAULT);
  const [launched, setLaunched] = useState(false);

  const set = (key: keyof WizardState, value: unknown) =>
    setState(prev => ({ ...prev, [key]: value }));

  const canContinue = () => {
    if (step === 1) return state.name.trim() && state.objective && state.startDate && state.endDate;
    if (step === 3) return state.dealType;
    return true;
  };

  if (launched) {
    return (
      <div style={{ textAlign: "center", padding: "48px 20px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: TONES.green.tint, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconRocket size={28} style={{ color: TONES.green.solid }} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary)", marginBottom: 8 }}>Campaign launched! 🚀</div>
        <div style={{ fontSize: 13, color: "var(--sd-font-secondary)", marginBottom: 20 }}>"{state.name}" is live. Start adding creators from the Roster.</div>
        <Button variant="secondary" size="sm" onClick={() => { setLaunched(false); setStep(1); setState(DEFAULT); }}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {/* Step header */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--sd-border-light)", overflowX: "auto" }}>
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          const Icon = s.icon;
          return (
            <Button key={s.id} variant="ghost" onClick={() => done && setStep(s.id)}
              style={{
                flex: 1, flexDirection: "column", height: "auto", padding: "10px 8px",
                background: active ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
                borderBottom: active ? "2px solid var(--sd-bg-inverted)" : "2px solid transparent",
                borderRadius: 0, cursor: done ? "pointer" : "default",
                borderRight: i < STEPS.length - 1 ? "1px solid var(--sd-border-light)" : "none",
              }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? TONES.green.solid : active ? "var(--sd-bg-inverted)" : "var(--sd-bg-secondary)",
                color: done || active ? "#fff" : "var(--sd-font-tertiary)" }}>
                {done ? <IconCheck size={12} strokeWidth={3} /> : <Icon size={12} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "var(--sd-font-primary)" : done ? TONES.green.text : "var(--sd-font-tertiary)" }}>{s.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Step body */}
      <div style={{ padding: "20px 20px 12px" }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)" }}>{STEPS[step - 1].label}</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginTop: 2 }}>{STEPS[step - 1].description}</div>
        </div>

        {step === 1 && <Step1 state={state} set={set} />}
        {step === 2 && <Step2 state={state} set={set} />}
        {step === 3 && <Step3 state={state} set={set} />}
        {step === 4 && <Step4 state={state} set={set} />}
        {step === 5 && <Step5 state={state} />}
      </div>

      {/* Footer nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid var(--sd-border-light)" }}>
        <Button variant="secondary" size="sm" leftIcon={<IconChevronLeft size={14} />} disabled={step === 1} onClick={() => setStep(s => Math.max(1, s - 1))}>
          Back
        </Button>

        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Step {step} of {STEPS.length}</span>

        {step < 5 ? (
          <Button variant="primary" size="sm" rightIcon={<IconChevronRight size={14} />} disabled={!canContinue()} onClick={() => canContinue() && setStep(s => Math.min(5, s + 1))}>
            Continue
          </Button>
        ) : (
          <Button variant="primary" size="sm" leftIcon={<IconRocket size={14} />} onClick={() => setLaunched(true)}>
            Launch campaign
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "campaign-creation-wizard",
  title: "CampaignCreationWizard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "5-step campaign creation flow combining RadioCard, ToggleChip, Input, and Budget fields into a guided wizard.",
  description:
    "CampaignCreationWizard is the primary campaign onboarding surface. 5 steps: **Basics** (name input, objective RadioCard — Awareness/Conversion/UGC, date range), **Targeting** (platform chips, creator tier RadioCard — Nano/Micro/Macro, category multi-select chips), **Deliverables** (deal type RadioCard — Gifting/Paid/UGC/Affiliate, content type chips, min deliverables counter), **Budget** (total budget + per-creator ceiling inputs, live estimate card showing estimated creator count), **Review** (summary table of all selected values, 'Launch campaign' CTA). Step header shows icon + label for each step; completed steps get a green check dot and are click-navigable. Continue button is disabled until required fields are filled. On launch, shows a success screen with 'Start over'.",
  demos: [
    {
      title: "5-step campaign creation",
      description: "Click through all 5 steps. Back-navigation returns to completed steps. Try launching to see the success screen.",
      block: true,
      render: () => <CampaignCreationWizard />,
    },
  ],
  props: [],
};

export default doc;
