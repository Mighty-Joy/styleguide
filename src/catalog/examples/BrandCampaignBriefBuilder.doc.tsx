"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconTrash,
  IconCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconFileText,
  IconBookmark,
  IconSend,
  IconTemplate,
  IconX,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type CampaignType = "awareness" | "conversion" | "ugc" | "launch" | "ambassador";

const CAMPAIGN_TYPES: { key: CampaignType; label: string; tone: keyof typeof TONES }[] = [
  { key: "awareness",   label: "Brand awareness",     tone: "blue"   },
  { key: "conversion",  label: "Conversion / sales",  tone: "green"  },
  { key: "ugc",         label: "UGC collection",      tone: "purple" },
  { key: "launch",      label: "Product launch",      tone: "orange" },
  { key: "ambassador",  label: "Ambassador program",  tone: "pink"   },
];

const DELIVERABLE_OPTIONS = ["Reel", "TikTok video", "Feed post", "Story (×5)", "UGC (no post)", "YouTube video", "YouTube short"];

const SAVED_TEMPLATES = [
  { id: "t1", name: "Standard Reel collab",   type: "awareness" as CampaignType },
  { id: "t2", name: "Product launch playbook", type: "launch"    as CampaignType },
];

interface BriefState {
  name: string;
  type: CampaignType;
  platforms: string[];
  deliverables: string[];
  audience: string;
  messaging: string[];
  dos: string[];
  donts: string[];
  hashtags: string[];
  feeMin: number;
  feeMax: number;
}

const DEFAULT_BRIEF: BriefState = {
  name: "Summer Glow — Luminos Serum Launch",
  type: "launch",
  platforms: ["instagram", "tiktok"],
  deliverables: ["Reel", "Story (×5)"],
  audience: "Women 24–38, skincare enthusiasts, clean beauty interest",
  messaging: ["Natural ingredients, dermatologist tested", "Results in 30 days or money back", "Gentle enough for sensitive skin"],
  dos: ["Show the product in natural lighting", "Mention the 30-day money back guarantee", "Use #AuraLabs and #SummerGlow"],
  donts: ["Do not compare to competitor brands", "Avoid medical or clinical claims", "No filters that alter skin appearance"],
  hashtags: ["#AuraLabs", "#SummerGlow", "#LuminosSerum", "#ad"],
  feeMin: 800,
  feeMax: 1800,
};

function Demo() {
  const [brief,     setBrief]     = useState<BriefState>(DEFAULT_BRIEF);
  const [step,      setStep]      = useState(0);
  const [saved,     setSaved]     = useState(false);
  const [published, setPublished] = useState(false);
  const [loadOpen,  setLoadOpen]  = useState(false);

  function update<K extends keyof BriefState>(key: K, val: BriefState[K]) {
    setBrief((p) => ({ ...p, [key]: val }));
    setSaved(false);
    setPublished(false);
  }

  function togglePlatform(p: string) {
    update("platforms", brief.platforms.includes(p) ? brief.platforms.filter((x) => x !== p) : [...brief.platforms, p]);
  }
  function toggleDeliverable(d: string) {
    update("deliverables", brief.deliverables.includes(d) ? brief.deliverables.filter((x) => x !== d) : [...brief.deliverables, d]);
  }
  function updateList(key: "messaging" | "dos" | "donts" | "hashtags", i: number, val: string) {
    const arr = [...brief[key]]; arr[i] = val; update(key, arr);
  }
  function addListItem(key: "messaging" | "dos" | "donts" | "hashtags") {
    update(key, [...brief[key], ""]);
  }
  function removeListItem(key: "messaging" | "dos" | "donts" | "hashtags", i: number) {
    update(key, brief[key].filter((_, j) => j !== i));
  }

  const STEPS = ["Campaign", "Deliverables", "Messaging", "Compensation"];
  const canPublish = brief.name && brief.deliverables.length > 0 && brief.messaging.some((m) => m.trim());

  if (published) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "32px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: 99, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <IconSend size={28} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>Brief published!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginBottom: 14 }}>Creators can now view and apply to this campaign.</div>
        <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Badge label={brief.name} tone="blue" size="sm" />
          <Badge label={CAMPAIGN_TYPES.find((t) => t.key === brief.type)?.label ?? ""} tone={CAMPAIGN_TYPES.find((t) => t.key === brief.type)?.tone ?? "gray"} size="sm" />
          <Badge label={`${brief.deliverables.length} deliverables`} tone="purple" size="sm" />
          <Badge label={`$${brief.feeMin}–$${brief.feeMax}`} tone="green" size="sm" />
        </div>
        <Button variant="secondary" size="sm" onClick={() => { setPublished(false); setStep(0); }}>Edit brief</Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Campaign brief builder</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Aura Labs · Draft</div>
        </div>
        <button onClick={() => setLoadOpen(!loadOpen)}
          style={{ display: "flex", gap: 5, alignItems: "center", padding: "5px 10px", borderRadius: 7, background: "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, color: "var(--sd-font-secondary,#555)" }}>
          <IconFileText size={11} />Load template
        </button>
      </div>

      {loadOpen && (
        <div style={{ marginBottom: 12, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
          {SAVED_TEMPLATES.map((t) => {
            const ct = CAMPAIGN_TYPES.find((x) => x.key === t.type);
            return (
              <button key={t.id} onClick={() => { update("name", t.name); update("type", t.type); setLoadOpen(false); }}
                style={{ width: "100%", display: "flex", gap: 9, alignItems: "center", padding: "10px 13px", background: "white", border: "none", borderBottom: "1px solid var(--sd-border-default,#e5e7eb)", cursor: "pointer", textAlign: "left" }}>
                <IconFileText size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                <span style={{ flex: 1, fontSize: 11, fontWeight: 600 }}>{t.name}</span>
                {ct && <Badge label={ct.label} tone={ct.tone} size="sm" />}
              </button>
            );
          })}
          <button onClick={() => setLoadOpen(false)}
            style={{ width: "100%", padding: "8px", background: "var(--sd-bg-secondary,#f9f9f9)", border: "none", cursor: "pointer", fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
            Cancel
          </button>
        </div>
      )}

      {/* Step tabs */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16, background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 9, padding: 3 }}>
        {STEPS.map((label, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ flex: 1, padding: "6px 0", borderRadius: 7, background: step === i ? "white" : "transparent", border: "none", cursor: "pointer", fontSize: 10, fontWeight: step === i ? 800 : 600, color: step === i ? "var(--sd-font-primary,#111)" : "var(--sd-font-tertiary,#999)", boxShadow: step === i ? "0 1px 3px rgba(0,0,0,0.07)" : "none" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Step 0: Campaign basics */}
      {step === 0 && (
        <div>
          <div style={{ marginBottom: 11 }}>
            <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 5 }}>Campaign name</label>
            <input value={brief.name} onChange={(e) => update("name", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 11 }}>
            <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 6 }}>Campaign type</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {CAMPAIGN_TYPES.map((ct) => (
                <button key={ct.key} onClick={() => update("type", ct.key)}
                  style={{ padding: "5px 10px", borderRadius: 7, background: brief.type === ct.key ? TONES[ct.tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${brief.type === ct.key ? TONES[ct.tone].text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: brief.type === ct.key ? 700 : 500, color: brief.type === ct.key ? TONES[ct.tone].text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                  {ct.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 11 }}>
            <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 6 }}>Platforms</label>
            <div style={{ display: "flex", gap: 6 }}>
              {([["instagram","Instagram",IconBrandInstagram,"pink"],["tiktok","TikTok",IconBrandTiktok,"blue"],["youtube","YouTube",IconBrandYoutube,"red"]] as const).map(([key,label,Icon,tone]) => (
                <button key={key} onClick={() => togglePlatform(key)}
                  style={{ flex: 1, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", padding: "7px 0", borderRadius: 8, background: brief.platforms.includes(key) ? TONES[tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${brief.platforms.includes(key) ? TONES[tone].text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", fontSize: 10, fontWeight: 700, color: brief.platforms.includes(key) ? TONES[tone].text : "var(--sd-font-secondary,#555)" }}>
                  <Icon size={12} />{label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 5 }}>Target audience</label>
            <input value={brief.audience} onChange={(e) => update("audience", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
        </div>
      )}

      {/* Step 1: Deliverables */}
      {step === 1 && (
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 7 }}>Required deliverables</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {DELIVERABLE_OPTIONS.map((d) => (
              <button key={d} onClick={() => toggleDeliverable(d)}
                style={{ padding: "5px 10px", borderRadius: 7, background: brief.deliverables.includes(d) ? TONES.purple.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${brief.deliverables.includes(d) ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: brief.deliverables.includes(d) ? 700 : 500, color: brief.deliverables.includes(d) ? TONES.purple.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                {brief.deliverables.includes(d) && <IconCheck size={9} style={{ marginRight: 4, verticalAlign: "middle" }} />}{d}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 7 }}>Required hashtags</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
              {brief.hashtags.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 4, alignItems: "center", padding: "3px 8px", borderRadius: 99, background: TONES.blue.tint, fontSize: 10, fontWeight: 700, color: TONES.blue.text }}>
                  {h}
                  <button onClick={() => removeListItem("hashtags", i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}>
                    <IconX size={9} style={{ color: TONES.blue.text }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Messaging */}
      {step === 2 && (
        <div>
          {[
            { key: "messaging" as const, label: "Key messages", color: "green" as const },
            { key: "dos"       as const, label: "Do's",          color: "blue"  as const },
            { key: "donts"     as const, label: "Don'ts",        color: "red"   as const },
          ].map(({ key, label, color }) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 6 }}>{label}</label>
              {brief[key].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: TONES[color].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 9 }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: TONES[color].text }}>{i + 1}</span>
                  </div>
                  <input value={item} onChange={(e) => updateList(key, i, e.target.value)}
                    style={{ flex: 1, padding: "7px 9px", borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit" }} />
                  <button onClick={() => removeListItem(key, i)} style={{ width: 28, height: 34, borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconTrash size={11} style={{ color: "var(--sd-font-tertiary,#bbb)" }} />
                  </button>
                </div>
              ))}
              {brief[key].length < 5 && (
                <button onClick={() => addListItem(key)}
                  style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 10, color: TONES[color].text, background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}>
                  <IconPlus size={11} />Add {key === "messaging" ? "message" : key === "dos" ? "do" : "don't"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Compensation */}
      {step === 3 && (
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, display: "block", marginBottom: 10 }}>Fee range per creator</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[["Min fee", "feeMin"] as const, ["Max fee", "feeMax"] as const].map(([label, field]) => (
              <div key={field}>
                <label style={{ fontSize: 10, fontWeight: 600, display: "block", marginBottom: 5 }}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ padding: "0 9px", fontSize: 12, fontWeight: 700, borderRight: "1px solid var(--sd-border-default,#e5e7eb)", color: "var(--sd-font-tertiary,#999)" }}>$</div>
                  <input type="number" value={brief[field]} onChange={(e) => update(field, Number(e.target.value))}
                    style={{ flex: 1, padding: "8px 9px", border: "none", outline: "none", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 12px", background: TONES.green.tint, borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 11, color: TONES.green.text }}>Creator fee range</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: TONES.green.text }}>${brief.feeMin.toLocaleString()}–${brief.feeMax.toLocaleString()}</span>
          </div>

          <div style={{ display: "flex", gap: 7 }}>
            <Button variant="secondary" size="sm" leftIcon={<IconBookmark size={11} />} onClick={() => setSaved(true)} style={{ flex: 1 }}>
              {saved ? "Saved as template" : "Save as template"}
            </Button>
            <Button variant="primary" size="sm" leftIcon={<IconSend size={11} />} onClick={() => setPublished(true)} disabled={!canPublish} style={{ flex: 2 }}>
              Publish brief
            </Button>
          </div>
        </div>
      )}

      {step < 3 && (
        <div style={{ display: "flex", gap: 7, marginTop: 16 }}>
          {step > 0 && <Button variant="secondary" size="sm" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</Button>}
          <Button variant="primary" size="sm" style={{ flex: 2 }} onClick={() => setStep(step + 1)}>Continue</Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-campaign-brief-builder",
  title: "BrandCampaignBriefBuilder",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "4-tab campaign brief editor — campaign type, platform, and audience on tab 1; deliverable chips and hashtags on tab 2; key messages, do's, don'ts on tab 3; fee range and publish on tab 4.",
  description:
    "Brand builds a structured campaign brief to share with creators. Header + 'Load template' drawer (2 pre-seeded: Standard Reel collab, Product launch playbook). 4-tab segmented control: Campaign, Deliverables, Messaging, Compensation. Tab 1 Campaign: campaign name text input; 5 campaign type chips (Awareness blue / Conversion green / UGC purple / Launch orange / Ambassador pink); 3 platform toggles (IG/TikTok/YouTube) with icon; target audience text input. Tab 2 Deliverables: 7 deliverable-type chips multi-select (Reel/TikTok/Post/Story ×5/UGC/YouTube/Short) purple tint; required hashtags as removable blue chips. Tab 3 Messaging: 3 numbered-list sections (Key messages green / Do's blue / Don'ts red), each item editable inline + trash; +Add row CTA capped at 5. Tab 4 Compensation: min/max fee inputs with $ prefix; fee range summary tile green; Save as template secondary + Publish brief primary (disabled until name + deliverable + message filled) → success screen with 4 summary badges + Edit brief CTA. Pre-seeded with Luminos Serum Launch brief. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign brief builder",
      description: "Step through the 4 tabs. Edit messaging items inline, add or remove list entries. On tab 4, save as template or publish the brief.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
