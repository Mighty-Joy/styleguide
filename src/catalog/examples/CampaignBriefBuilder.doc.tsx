"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconPlus,
  IconX,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconChevronRight,
  IconEye,
  IconEdit,
  IconPhoto,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Tone = "professional" | "friendly" | "playful" | "educational";

interface Deliverable {
  id: string;
  platform: "instagram" | "tiktok" | "youtube";
  type: string;
  count: number;
}

/* ---- constants ---- */
const TONE_OPTIONS: { value: Tone; label: string; desc: string }[] = [
  { value: "professional", label: "Professional",  desc: "Polished, authoritative" },
  { value: "friendly",     label: "Friendly",      desc: "Warm, relatable"         },
  { value: "playful",      label: "Playful",        desc: "Fun, energetic"          },
  { value: "educational",  label: "Educational",   desc: "Informative, clear"      },
];

const PLATFORM_TYPES: Record<string, string[]> = {
  instagram: ["Reel", "Story", "Static post", "Carousel"],
  tiktok:    ["Video", "Duet"],
  youtube:   ["Dedicated video", "Integration"],
};

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

/* ---- Sections ---- */
const STEPS = ["Overview", "Deliverables", "Creative direction", "Preview"] as const;
type Step = typeof STEPS[number];

/* ---- Demo ---- */
function Demo() {
  const [step, setStep] = useState<Step>("Overview");
  const [saved, setSaved] = useState(false);

  // Overview fields
  const [name,       setName]       = useState("Summer Glow Campaign");
  const [objective,  setObjective]  = useState("Drive awareness for the new Aura Labs Glow Serum among skincare-conscious women aged 22–35. Focus on authentic, skin-transformation storytelling.");
  const [hashtag,    setHashtag]    = useState("#AuraGlow");
  const [mention,    setMention]    = useState("@auralabs");

  // Deliverables
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: "d1", platform: "instagram", type: "Reel", count: 1 },
    { id: "d2", platform: "instagram", type: "Story", count: 3 },
  ]);

  // Creative direction
  const [brandTone,    setBrandTone]    = useState<Tone>("friendly");
  const [dos,          setDos]          = useState(["Show real skin texture", "Include the product in frame", "Film in natural light"]);
  const [donts,        setDonts]        = useState(["Don't mention competitors", "No heavy filters on skin"]);
  const [newDo,        setNewDo]        = useState("");
  const [newDont,      setNewDont]      = useState("");

  const stepIdx = STEPS.indexOf(step);

  function addDeliverable() {
    setDeliverables((ds) => [...ds, { id: `d${Date.now()}`, platform: "instagram", type: "Reel", count: 1 }]);
  }

  function removeDeliverable(id: string) {
    setDeliverables((ds) => ds.filter((d) => d.id !== id));
  }

  function updateDeliverable(id: string, patch: Partial<Deliverable>) {
    setDeliverables((ds) => ds.map((d) => d.id === id ? { ...d, ...patch } : d));
  }

  function addDo()    { if (newDo.trim())    { setDos((xs)    => [...xs,    newDo.trim()]);    setNewDo(""); } }
  function addDont()  { if (newDont.trim())  { setDonts((xs)  => [...xs,    newDont.trim()]);  setNewDont(""); } }

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)",
    background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>Brief builder</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Aura Labs · Summer Glow Campaign</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconEye size={12} />} onClick={() => setStep("Preview")}>Preview</Button>
          <Button variant="primary" size="sm" leftIcon={saved ? <IconCheck size={12} /> : undefined} onClick={save}>
            {saved ? "Saved!" : "Save brief"}
          </Button>
        </div>
      </div>

      {/* Step nav */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{ flex: 1, padding: "9px 0", background: step === s ? "#111" : "transparent", border: "none", borderRight: i < STEPS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: step === s ? "#fff" : "var(--sd-font-tertiary, #999)" }}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {/* ---- Overview ---- */}
      {step === "Overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 5 }}>Campaign name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 5 }}>Campaign objective</label>
            <textarea value={objective} onChange={(e) => setObjective(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 5 }}>Campaign hashtag</label>
              <input value={hashtag} onChange={(e) => setHashtag(e.target.value)} style={inputStyle} placeholder="#YourHashtag" />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 5 }}>Brand mention</label>
              <input value={mention} onChange={(e) => setMention(e.target.value)} style={inputStyle} placeholder="@yourbrand" />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" size="sm" leftIcon={<IconChevronRight size={12} />} onClick={() => setStep("Deliverables")}>
              Next: Deliverables
            </Button>
          </div>
        </div>
      )}

      {/* ---- Deliverables ---- */}
      {step === "Deliverables" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {deliverables.map((d) => {
            const PIc = PLATFORM_ICON[d.platform];
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
                <PIc size={16} style={{ color: "var(--sd-font-secondary, #555)", flexShrink: 0 }} />
                <select
                  value={d.platform}
                  onChange={(e) => updateDeliverable(d.id, { platform: e.target.value as Deliverable["platform"], type: PLATFORM_TYPES[e.target.value][0] })}
                  style={{ height: 32, padding: "0 8px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }}
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
                <select
                  value={d.type}
                  onChange={(e) => updateDeliverable(d.id, { type: e.target.value })}
                  style={{ height: 32, padding: "0 8px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", flex: 1, outline: "none" }}
                >
                  {PLATFORM_TYPES[d.platform].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button onClick={() => updateDeliverable(d.id, { count: Math.max(1, d.count - 1) })} style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>−</button>
                  <span style={{ fontSize: 13, fontWeight: 800, minWidth: 20, textAlign: "center" }}>{d.count}</span>
                  <button onClick={() => updateDeliverable(d.id, { count: d.count + 1 })} style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>+</button>
                </div>
                <button onClick={() => removeDeliverable(d.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
                  <IconX size={13} />
                </button>
              </div>
            );
          })}
          <button onClick={addDeliverable} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: 40, border: "1.5px dashed var(--sd-border-medium, #d1d5db)", borderRadius: 10, background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary, #999)" }}>
            <IconPlus size={13} /> Add deliverable
          </button>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <Button variant="secondary" size="sm" onClick={() => setStep("Overview")}>Back</Button>
            <Button variant="primary" size="sm" leftIcon={<IconChevronRight size={12} />} onClick={() => setStep("Creative direction")}>Next: Creative direction</Button>
          </div>
        </div>
      )}

      {/* ---- Creative direction ---- */}
      {step === "Creative direction" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Tone */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 8 }}>Brand tone</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
              {TONE_OPTIONS.map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setBrandTone(value)}
                  style={{ padding: "8px 10px", borderRadius: 9, border: `1.5px solid ${brandTone === value ? "#111" : "var(--sd-border-default, #e5e7eb)"}`, background: brandTone === value ? "#111" : "transparent", cursor: "pointer", textAlign: "left" }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: brandTone === value ? "#fff" : "var(--sd-font-primary, #111)" }}>{label}</div>
                  <div style={{ fontSize: 10, color: brandTone === value ? "rgba(255,255,255,0.6)" : "var(--sd-font-tertiary, #999)", marginTop: 2 }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dos */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 7 }}>
              <span style={{ color: TONES.green.text }}>✓</span> Dos
            </label>
            {dos.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={10} style={{ color: TONES.green.text }} />
                </div>
                <span style={{ fontSize: 12, flex: 1 }}>{d}</span>
                <button onClick={() => setDos((xs) => xs.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 0 }}><IconX size={11} /></button>
              </div>
            ))}
            <div style={{ display: "flex", gap: 7, marginTop: 5 }}>
              <input value={newDo} onChange={(e) => setNewDo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDo()} placeholder="Add a do..." style={{ ...inputStyle, flex: 1, height: 32 }} />
              <Button variant="secondary" size="sm" onClick={addDo}>Add</Button>
            </div>
          </div>

          {/* Don'ts */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", display: "block", marginBottom: 7 }}>
              <span style={{ color: TONES.red.text }}>✕</span> Don'ts
            </label>
            {donts.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: TONES.red.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconX size={10} style={{ color: TONES.red.text }} />
                </div>
                <span style={{ fontSize: 12, flex: 1 }}>{d}</span>
                <button onClick={() => setDonts((xs) => xs.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 0 }}><IconX size={11} /></button>
              </div>
            ))}
            <div style={{ display: "flex", gap: 7, marginTop: 5 }}>
              <input value={newDont} onChange={(e) => setNewDont(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDont()} placeholder="Add a don't..." style={{ ...inputStyle, flex: 1, height: 32 }} />
              <Button variant="secondary" size="sm" onClick={addDont}>Add</Button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="secondary" size="sm" onClick={() => setStep("Deliverables")}>Back</Button>
            <Button variant="primary" size="sm" leftIcon={<IconEye size={12} />} onClick={() => setStep("Preview")}>Preview brief</Button>
          </div>
        </div>
      )}

      {/* ---- Preview ---- */}
      {step === "Preview" && (
        <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", padding: "18px 20px" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{name}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <Badge label="Brief" tone="gray" size="sm" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Aura Labs · Draft</span>
            </div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5 }}>Objective</div>
              <div style={{ fontSize: 12, lineHeight: 1.7 }}>{objective}</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 7 }}>Deliverables</div>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {deliverables.map((d) => {
                  const PIc = PLATFORM_ICON[d.platform];
                  return (
                    <div key={d.id} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 11, fontWeight: 600 }}>
                      <PIc size={11} style={{ color: "var(--sd-font-secondary, #555)" }} />
                      {d.count}× {d.type}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Dos</div>
                {dos.map((d, i) => <div key={i} style={{ fontSize: 11, color: TONES.green.text, marginBottom: 4 }}>✓ {d}</div>)}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Don'ts</div>
                {donts.map((d, i) => <div key={i} style={{ fontSize: 11, color: TONES.red.text, marginBottom: 4 }}>✕ {d}</div>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ padding: "5px 10px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 11, fontWeight: 700 }}>{hashtag}</div>
              <div style={{ padding: "5px 10px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 11, fontWeight: 700 }}>{mention}</div>
            </div>
          </div>
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", display: "flex", justifyContent: "space-between" }}>
            <Button variant="secondary" size="sm" leftIcon={<IconEdit size={12} />} onClick={() => setStep("Overview")}>Edit brief</Button>
            <Button variant="primary" size="sm" onClick={save}>{saved ? "Saved!" : "Publish brief"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-brief-builder",
  title: "CampaignBriefBuilder",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand-side brief authoring tool — 4-step wizard (Overview → Deliverables → Creative direction → Preview) for building creator briefs.",
  description:
    "The brand's brief composition interface. 4-step segmented nav: (1) Overview — campaign name, objective textarea, hashtag + mention fields. (2) Deliverables — add/remove/reorder cards each with platform select (IG/TikTok/YouTube), type select (Reel/Story/etc.), and count stepper. (3) Creative direction — 4-option brand tone selector (Professional/Friendly/Playful/Educational), dos list with green check chips and add-on-enter input, don'ts list with red × chips and add-on-enter input. (4) Preview — dark gradient header matching the CampaignBriefViewer style; live render of all inputs; Edit brief back-link; Publish brief CTA. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign brief builder",
      description: "Step through Overview → Deliverables → Creative direction → Preview. Add deliverables, edit dos/don'ts, and preview the final brief.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
