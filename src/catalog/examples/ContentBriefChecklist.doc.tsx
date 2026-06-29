"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconSend,
  IconRefresh,
  IconLock,
  IconChevronDown,
  IconChevronUp,
  IconVideo,
  IconHash,
  IconClock,
  IconStar,
  IconEye,
  IconVolume,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface CheckItem {
  id: string;
  label: string;
  detail: string;
  required: boolean;
  category: string;
  icon: React.ElementType;
}

const ITEMS: CheckItem[] = [
  // Content
  { id: "i1",  label: "Hook leads with the glow result", detail: "First 3 seconds must open on the skin glow effect — not the unboxing.", required: true,  category: "Content",    icon: IconVideo  },
  { id: "i2",  label: "Aura Gold serum featured at 0:10–0:15", detail: "Close-up of the serum bottle clearly visible for ≥2 seconds.", required: true,  category: "Content",    icon: IconEye    },
  { id: "i3",  label: "Morning routine sequence included", detail: "Show cleanse → serum → SPF application in that order.", required: true,  category: "Content",    icon: IconStar   },
  { id: "i4",  label: "SPF layering CTA in last 10 seconds", detail: "Verbal or text overlay: 'Layer with your SPF for the full glow.'", required: true,  category: "Content",    icon: IconVolume },
  { id: "i5",  label: "No competitor brand visible", detail: "Blur, crop out, or cut any frame where competitor products appear.", required: true,  category: "Content",    icon: IconX      },
  // Technical
  { id: "i6",  label: "Duration: 60–90 seconds",  detail: "Final edited video must be between 60s and 90s for Reel format.", required: true,  category: "Technical",  icon: IconClock  },
  { id: "i7",  label: "Vertical format (9:16)",   detail: "Export at 1080×1920. Do not crop existing footage to fit.", required: true,  category: "Technical",  icon: IconVideo  },
  { id: "i8",  label: "Good natural lighting throughout", detail: "No dark or artificially warm bathroom lighting. Natural or ring-lit is fine.", required: false, category: "Technical",  icon: IconEye    },
  // Compliance
  { id: "i9",  label: "#ad in caption and on-screen", detail: "Must appear within the first 3 lines of caption AND as on-screen text.", required: true,  category: "Compliance", icon: IconHash   },
  { id: "i10", label: "#AuraLabs and #AuraGlow in caption", detail: "Both tags required. At least 2 additional niche tags (e.g. #skincarecommunity).", required: true,  category: "Compliance", icon: IconHash   },
  { id: "i11", label: "No purchase claim",         detail: "Do not say 'buy now' or 'link in bio to purchase' — this is a brand awareness campaign.", required: true,  category: "Compliance", icon: IconAlertTriangle },
  // Optional
  { id: "i12", label: "TikTok version included",  detail: "Optional but earns +$300 bonus if submitted alongside the Reel.", required: false, category: "Optional",   icon: IconVideo  },
];

const CATEGORIES = ["Content", "Technical", "Compliance", "Optional"];

/* ---- Demo ---- */
function Demo() {
  const [checked,   setChecked]   = useState<Set<string>>(new Set(["i1","i2","i3","i6","i7","i9"]));
  const [open,      setOpen]      = useState<Set<string>>(new Set(["Content","Compliance"]));
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  function toggleItem(id: string) {
    setChecked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function toggleSection(cat: string) {
    setOpen((prev) => { const n = new Set(prev); n.has(cat) ? n.delete(cat) : n.add(cat); return n; });
  }

  const required     = ITEMS.filter((i) => i.required);
  const checkedReq   = required.filter((i) => checked.has(i.id));
  const allReqDone   = checkedReq.length === required.length;
  const pct          = Math.round((checkedReq.length / required.length) * 100);

  function submit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1000);
  }

  if (submitted) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "32px 0" }}>
        <div style={{ width: 48, height: 48, borderRadius: 99, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
          <IconCheck size={22} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 800 }}>Content submitted!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginTop: 4 }}>Aura Labs will review within 1–2 business days.</div>
        <Button variant="secondary" size="sm" onClick={() => { setSubmitted(false); setChecked(new Set(["i1","i2","i3","i6","i7","i9"])); }} style={{ marginTop: 14 }}>
          Reset demo
        </Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Pre-submission checklist</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Reel deliverable</div>
        </div>
        <Badge label={allReqDone ? "Ready to submit" : `${checkedReq.length}/${required.length} required`} tone={allReqDone ? "green" : "yellow"} size="sm" dot />
      </div>

      {/* Progress ring (simplified as bar) */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <div style={{ fontSize: 10, fontWeight: 700 }}>Required items</div>
          <div style={{ fontSize: 10, color: allReqDone ? TONES.green.text : "var(--sd-font-tertiary,#999)", fontWeight: 700 }}>{pct}%</div>
        </div>
        <div style={{ height: 8, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: allReqDone ? TONES.green.text : TONES.blue.text, borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>
        {!allReqDone && (
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 4 }}>
            {required.length - checkedReq.length} required item{required.length - checkedReq.length !== 1 ? "s" : ""} remaining
          </div>
        )}
      </div>

      {/* Sections */}
      {CATEGORIES.map((cat) => {
        const catItems   = ITEMS.filter((i) => i.category === cat);
        const catChecked = catItems.filter((i) => checked.has(i.id)).length;
        const isOpen     = open.has(cat);
        const catTone    = cat === "Optional" ? "purple" as const : cat === "Compliance" ? "orange" as const : cat === "Technical" ? "blue" as const : "green" as const;

        return (
          <div key={cat} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 11, marginBottom: 8, overflow: "hidden" }}>
            <button onClick={() => toggleSection(cat)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 13px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{cat}</span>
                {cat === "Optional" && <Badge label="Bonus" tone="purple" size="sm" />}
              </div>
              <span style={{ fontSize: 10, color: catChecked === catItems.length ? TONES[catTone].text : "var(--sd-font-tertiary,#999)", fontWeight: 700 }}>
                {catChecked}/{catItems.length}
              </span>
              {isOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
            </button>

            {isOpen && (
              <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                {catItems.map((item, ii) => {
                  const IIcon = item.icon;
                  const done  = checked.has(item.id);
                  return (
                    <button key={item.id} onClick={() => toggleItem(item.id)}
                      style={{ width: "100%", display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 13px", background: done ? TONES[catTone].tint + "50" : "transparent", border: "none", cursor: "pointer", textAlign: "left", borderBottom: ii < catItems.length - 1 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none" }}>
                      {/* Checkbox */}
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${done ? TONES[catTone].text : "var(--sd-border-default,#d1d5db)"}`, background: done ? TONES[catTone].text : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.15s" }}>
                        {done && <IconCheck size={12} style={{ color: "#fff" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
                          <IIcon size={11} style={{ color: done ? TONES[catTone].text : "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: done ? "#111" : "var(--sd-font-secondary,#333)", textDecoration: done ? "none" : "none" }}>{item.label}</span>
                          {!item.required && <Badge label="Optional" tone="gray" size="sm" />}
                        </div>
                        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", lineHeight: 1.5 }}>{item.detail}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Submit zone */}
      <div style={{ marginTop: 14, padding: "12px 14px", background: allReqDone ? TONES.green.tint : "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 11, border: `1.5px solid ${allReqDone ? TONES.green.text + "40" : "var(--sd-border-default,#e5e7eb)"}` }}>
        {!allReqDone && (
          <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 10 }}>
            <IconLock size={13} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", lineHeight: 1.5 }}>
              Complete all required items to unlock content submission.
            </div>
          </div>
        )}
        <Button variant="primary" size="sm" onClick={submit} disabled={!allReqDone || submitting}
          leftIcon={submitting ? undefined : <IconSend size={11} />} style={{ width: "100%" }}>
          {submitting ? "Submitting…" : allReqDone ? "Submit content for review" : `${required.length - checkedReq.length} required items remaining`}
        </Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "content-brief-checklist",
  title: "ContentBriefChecklist",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's pre-submission checklist — 12 items across Content/Technical/Compliance/Optional sections, animated progress bar, submit locked until all required items checked.",
  description:
    "Creator self-checks their content against the campaign brief before submitting for brand review. Header: campaign + deliverable label, dynamic badge (Ready to submit green / '6/9 required' yellow). Progress bar: fills and turns green when all required items checked. 4 collapsible sections — Content (5 items: hook, serum close-up, routine sequence, SPF CTA, no competitor — all required), Technical (3 items: 60–90s duration, 9:16 format, natural lighting — lighting optional), Compliance (3 items: #ad on-screen + in caption, brand hashtags, no purchase claim — all required), Optional (1 item: TikTok version +$300 bonus, purple 'Bonus' badge). Each item: animated checkbox (border + tint fill on check), icon, label, detail copy in gray. Optional items show 'Optional' gray badge. Submit zone: padlocked message + disabled button until all 9 required items checked; unlocks to green 'Submit content for review' → 'Submitting…' → green success screen. Pre-checked: 6 of 9 required. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Content brief checklist",
      description: "Content and Compliance sections open. Click items to check them off — watch the progress bar fill. Check the remaining 3 required items to unlock the submit button.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
