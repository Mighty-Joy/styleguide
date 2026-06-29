"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconPlus,
  IconTrash,
  IconStar,
  IconCalendar,
  IconFileText,
  IconCurrencyDollar,
  IconShield,
  IconChevronRight,
  IconSparkles,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Platform = "instagram" | "tiktok" | "youtube";
type ContentType = "reel" | "story" | "post" | "video" | "ugc";

interface Deliverable {
  id: string;
  platform: Platform;
  type: ContentType;
  count: number;
}

type RightsWindow = "30 days" | "90 days" | "6 months" | "1 year" | "Perpetual";
type RenewalTerm = "Auto-renew" | "Manual renewal" | "No renewal";

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

const CONTENT_LABELS: Record<ContentType, string> = {
  reel: "Reel",
  story: "Story (set)",
  post: "Feed post",
  video: "Video",
  ugc: "UGC",
};

const PLATFORM_TONE: Record<Platform, keyof typeof TONES> = {
  instagram: "pink",
  tiktok: "blue",
  youtube: "red",
};

/* ---- Demo ---- */
function Demo() {
  const [step,       setStep]       = useState(0);
  const [duration,   setDuration]   = useState<3 | 6 | 12>(6);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: "d1", platform: "instagram", type: "reel",  count: 2 },
    { id: "d2", platform: "instagram", type: "story", count: 4 },
  ]);
  const [monthlyFee, setMonthlyFee] = useState(2400);
  const [signBonus,  setSignBonus]  = useState(500);
  const [rights,     setRights]     = useState<RightsWindow>("90 days");
  const [renewal,    setRenewal]    = useState<RenewalTerm>("Auto-renew");
  const [exclusivity, setExclusivity] = useState(true);
  const [launched,   setLaunched]   = useState(false);
  const [launching,  setLaunching]  = useState(false);

  function addDeliverable() {
    const id = "d" + Date.now();
    setDeliverables((prev) => [...prev, { id, platform: "instagram", type: "post", count: 1 }]);
  }
  function removeDeliverable(id: string) {
    setDeliverables((prev) => prev.filter((d) => d.id !== id));
  }
  function updateDeliverable(id: string, field: keyof Deliverable, value: string | number) {
    setDeliverables((prev) => prev.map((d) => d.id === id ? { ...d, [field]: value } : d));
  }

  function launch() {
    setLaunching(true);
    setTimeout(() => { setLaunching(false); setLaunched(true); }, 900);
  }

  const totalValue = monthlyFee * duration + signBonus;
  const steps = ["Duration & fee", "Deliverables", "Rights & renewal", "Preview"];

  if (launched) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "32px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: 99, background: TONES.purple.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <IconSparkles size={28} style={{ color: TONES.purple.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>Ambassador program created!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginBottom: 16 }}>
          {duration}-month program · ${monthlyFee.toLocaleString()}/mo · {deliverables.length} deliverable type{deliverables.length !== 1 ? "s" : ""}
        </div>
        <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Badge label={`${duration} months`} tone="purple" size="sm" />
          <Badge label={`$${totalValue.toLocaleString()} total value`} tone="green" size="sm" />
          {exclusivity && <Badge label="Exclusivity" tone="orange" size="sm" />}
          <Badge label={renewal} tone="blue" size="sm" />
        </div>
        <Button variant="secondary" size="sm" onClick={() => { setLaunched(false); setStep(0); }}>Reset demo</Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800 }}>New ambassador program</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Long-term creator partnership — Aura Labs</div>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {steps.map((label, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: "100%", height: 3, borderRadius: 2, background: i <= step ? TONES.purple.text : "var(--sd-bg-tertiary,#e5e7eb)" }} />
            <span style={{ fontSize: 9, fontWeight: i === step ? 800 : 500, color: i <= step ? TONES.purple.text : "var(--sd-font-tertiary,#999)" }}>
              {i < step ? <IconCheck size={9} style={{ color: TONES.purple.text }} /> : label}
            </span>
          </button>
        ))}
      </div>

      {/* Step 0: Duration & fee */}
      {step === 0 && (
        <div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Program duration</div>
            <div style={{ display: "flex", gap: 7 }}>
              {([3, 6, 12] as const).map((d) => (
                <button key={d} onClick={() => setDuration(d)}
                  style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: duration === d ? TONES.purple.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `2px solid ${duration === d ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: duration === d ? TONES.purple.text : "var(--sd-font-primary,#111)" }}>{d}</div>
                  <div style={{ fontSize: 9, color: duration === d ? TONES.purple.text : "var(--sd-font-tertiary,#999)" }}>months</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Monthly retainer</div>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, overflow: "hidden" }}>
              <div style={{ padding: "0 10px", fontSize: 14, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", borderRight: "1px solid var(--sd-border-default,#e5e7eb)" }}>$</div>
              <input type="number" value={monthlyFee} onChange={(e) => setMonthlyFee(Number(e.target.value))}
                style={{ flex: 1, padding: "9px 12px", border: "none", outline: "none", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }} />
              <div style={{ padding: "0 10px", fontSize: 11, color: "var(--sd-font-tertiary,#999)", borderLeft: "1px solid var(--sd-border-default,#e5e7eb)" }}>/mo</div>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Signing bonus <span style={{ fontWeight: 500, color: "var(--sd-font-tertiary,#999)" }}>(optional)</span></div>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, overflow: "hidden" }}>
              <div style={{ padding: "0 10px", fontSize: 14, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", borderRight: "1px solid var(--sd-border-default,#e5e7eb)" }}>$</div>
              <input type="number" value={signBonus} onChange={(e) => setSignBonus(Number(e.target.value))}
                style={{ flex: 1, padding: "9px 12px", border: "none", outline: "none", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }} />
            </div>
          </div>

          {/* Total */}
          <div style={{ padding: "10px 13px", background: TONES.green.tint, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: TONES.green.text }}>Total program value</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: TONES.green.text }}>${totalValue.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Step 1: Deliverables */}
      {step === 1 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Monthly deliverables</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
            {deliverables.map((d) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 11px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
                <select value={d.platform} onChange={(e) => updateDeliverable(d.id, "platform", e.target.value)}
                  style={{ padding: "4px 7px", borderRadius: 7, border: `1.5px solid ${TONES[PLATFORM_TONE[d.platform]].text}`, fontSize: 10, fontFamily: "inherit", fontWeight: 700, color: TONES[PLATFORM_TONE[d.platform]].text, background: TONES[PLATFORM_TONE[d.platform]].tint, cursor: "pointer" }}>
                  {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => (
                    <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>
                  ))}
                </select>
                <select value={d.type} onChange={(e) => updateDeliverable(d.id, "type", e.target.value)}
                  style={{ flex: 1, padding: "4px 7px", borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 10, fontFamily: "inherit" }}>
                  {(Object.keys(CONTENT_LABELS) as ContentType[]).map((t) => (
                    <option key={t} value={t}>{CONTENT_LABELS[t]}</option>
                  ))}
                </select>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <button onClick={() => updateDeliverable(d.id, "count", Math.max(1, d.count - 1))}
                    style={{ width: 22, height: 22, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>−</button>
                  <span style={{ width: 18, textAlign: "center", fontSize: 12, fontWeight: 900 }}>{d.count}</span>
                  <button onClick={() => updateDeliverable(d.id, "count", d.count + 1)}
                    style={{ width: 22, height: 22, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>+</button>
                </div>
                <button onClick={() => removeDeliverable(d.id)}
                  style={{ width: 24, height: 24, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconTrash size={12} style={{ color: "var(--sd-font-tertiary,#bbb)" }} />
                </button>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />} onClick={addDeliverable} style={{ width: "100%", marginBottom: 12 }}>
            Add deliverable type
          </Button>
          <div style={{ padding: "8px 11px", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 9, fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
            These deliverables are expected from the creator <strong>each month</strong> of the program.
          </div>
        </div>
      )}

      {/* Step 2: Rights & renewal */}
      {step === 2 && (
        <div>
          <div style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Content usage rights</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {(["30 days","90 days","6 months","1 year","Perpetual"] as const).map((r) => (
                <button key={r} onClick={() => setRights(r)}
                  style={{ padding: "5px 10px", borderRadius: 7, background: rights === r ? TONES.blue.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${rights === r ? TONES.blue.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: rights === r ? 700 : 500, color: rights === r ? TONES.blue.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Renewal terms</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {(["Auto-renew","Manual renewal","No renewal"] as const).map((r) => (
                <button key={r} onClick={() => setRenewal(r)}
                  style={{ padding: "5px 10px", borderRadius: 7, background: renewal === r ? TONES.purple.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${renewal === r ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: renewal === r ? 700 : 500, color: renewal === r ? TONES.purple.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 13 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Category exclusivity</div>
            <div style={{ display: "flex", gap: 7 }}>
              {[true, false].map((v) => (
                <button key={String(v)} onClick={() => setExclusivity(v)}
                  style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: exclusivity === v ? (v ? TONES.orange.tint : TONES.gray.tint) : "var(--sd-bg-secondary,#f4f4f5)", border: `2px solid ${exclusivity === v ? (v ? TONES.orange.text : TONES.gray.text) : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: exclusivity === v ? (v ? TONES.orange.text : TONES.gray.text) : "var(--sd-font-secondary,#555)" }}>{v ? "Exclusive" : "Non-exclusive"}</div>
                  <div style={{ fontSize: 9, color: exclusivity === v ? (v ? TONES.orange.text : TONES.gray.text) : "var(--sd-font-tertiary,#999)" }}>{v ? "No competing brands" : "Creator stays free"}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Program summary</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            {[
              { icon: IconCalendar,      label: "Duration",          value: `${duration} months`,                   tone: "purple" as const },
              { icon: IconCurrencyDollar, label: "Monthly retainer", value: `$${monthlyFee.toLocaleString()}/mo`,  tone: "green"  as const },
              { icon: IconStar,           label: "Signing bonus",     value: signBonus > 0 ? `$${signBonus.toLocaleString()}` : "None",  tone: "yellow" as const },
              { icon: IconCurrencyDollar, label: "Total value",       value: `$${totalValue.toLocaleString()}`,    tone: "green"  as const },
              { icon: IconShield,         label: "Content rights",    value: rights,                                tone: "blue"   as const },
              { icon: IconFileText,       label: "Renewal",           value: renewal,                               tone: "purple" as const },
            ].map(({ icon: Icon, label, value, tone }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 11px", background: TONES[tone].tint, borderRadius: 9 }}>
                <Icon size={13} style={{ color: TONES[tone].text, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 11, color: TONES[tone].text }}>{label}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: TONES[tone].text }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Monthly deliverables</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
            {deliverables.map((d) => (
              <div key={d.id} style={{ padding: "4px 9px", borderRadius: 7, background: TONES[PLATFORM_TONE[d.platform]].tint, fontSize: 10, fontWeight: 700, color: TONES[PLATFORM_TONE[d.platform]].text }}>
                {d.count}× {PLATFORM_LABELS[d.platform]} {CONTENT_LABELS[d.type]}
              </div>
            ))}
            {exclusivity && <Badge label="Exclusivity" tone="orange" size="sm" />}
          </div>

          <Button variant="primary" size="sm" onClick={launch} disabled={launching || deliverables.length === 0}
            leftIcon={launching ? undefined : <IconSparkles size={11} />} style={{ width: "100%" }}>
            {launching ? "Creating program…" : "Create ambassador program"}
          </Button>
        </div>
      )}

      {/* Nav */}
      {step < 3 && (
        <div style={{ display: "flex", gap: 7, marginTop: 16 }}>
          {step > 0 && <Button variant="secondary" size="sm" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</Button>}
          <Button variant="primary" size="sm" style={{ flex: 2 }} onClick={() => setStep(step + 1)}
            leftIcon={<IconChevronRight size={11} />}>
            {step === 2 ? "Preview" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-ambassador-setup",
  title: "CampaignAmbassadorSetup",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "4-step ambassador program wizard — duration & fee, monthly deliverables builder, rights & renewal, and a full summary preview with Create CTA.",
  description:
    "Brand sets up a long-term creator ambassador program. 4-step flow with color-coded progress bar segments turning purple on completion. Step 1 Duration & fee: 3/6/12-month toggle cards (purple tint when active); monthly retainer number input; optional signing bonus; live total program value tile in green tint. Step 2 Deliverables: editable rows — platform dropdown (IG pink / TikTok blue / YouTube red border+bg), content type dropdown, +/− count; Add deliverable type secondary CTA; note that these are per-month expectations. Step 3 Rights & renewal: content usage rights chips (30 days / 90 days / 6 months / 1 year / Perpetual) blue tint; renewal terms chips (Auto-renew / Manual / No renewal) purple tint; exclusivity toggle (Exclusive orange / Non-exclusive gray) as 2-card selector. Step 4 Preview: 6 summary rows each tinted by category (duration purple / retainer green / bonus yellow / total green / rights blue / renewal purple) + deliverable chips + exclusivity badge. Create ambassador program primary → 900ms → success screen: sparkle icon in purple, summary line, 4 summary badges, Reset demo. Back/Continue nav; Preview jumps from step 2. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Ambassador program wizard",
      description: "Adjust duration and fee on step 1. Build monthly deliverables on step 2. Set rights and exclusivity on step 3. Review and launch on step 4.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
