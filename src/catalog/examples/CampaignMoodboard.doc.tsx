"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconX,
  IconPhoto,
  IconPalette,
  IconLetterT,
  IconTag,
  IconUpload,
  IconCheck,
  IconDots,
  IconEye,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type MoodTab = "references" | "palette" | "typography" | "keywords";

interface RefTile {
  id: string;
  gradient: string;
  label: string;
  tag: string;
}

interface ColorSwatch {
  name: string;
  hex: string;
  usage: string;
}

interface VibeKeyword {
  id: string;
  label: string;
  tone: keyof typeof TONES;
}

/* ---- seed ---- */
const REFERENCES: RefTile[] = [
  { id: "r1", gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", label: "Golden hour warmth",    tag: "Mood"      },
  { id: "r2", gradient: "linear-gradient(135deg,#e0f2fe,#0ea5e9)", label: "Clean skincare shelf",  tag: "Product"   },
  { id: "r3", gradient: "linear-gradient(135deg,#fce7f3,#db2777)", label: "Bold typography",       tag: "Copy"      },
  { id: "r4", gradient: "linear-gradient(135deg,#d1fae5,#059669)", label: "Natural ingredients",   tag: "Lifestyle" },
  { id: "r5", gradient: "linear-gradient(135deg,#ede9fe,#7c3aed)", label: "Minimal flat lay",      tag: "Product"   },
  { id: "r6", gradient: "linear-gradient(135deg,#fff7ed,#ea580c)", label: "Sunset editorial",      tag: "Mood"      },
];

const PALETTE: ColorSwatch[] = [
  { name: "Glow Gold",    hex: "#F59E0B", usage: "Primary CTA, highlights" },
  { name: "Cloud White",  hex: "#FAFAF9", usage: "Backgrounds, clean space" },
  { name: "Deep Amber",   hex: "#92400E", usage: "Text on light, headlines" },
  { name: "Soft Peach",   hex: "#FEE2E2", usage: "Secondary accents, tints" },
  { name: "Night Black",  hex: "#1C1917", usage: "Body copy, borders" },
];

const KEYWORDS_INIT: VibeKeyword[] = [
  { id: "k1",  label: "Radiant",      tone: "yellow"    },
  { id: "k2",  label: "Effortless",   tone: "green"     },
  { id: "k3",  label: "Dewy",         tone: "sky"       },
  { id: "k4",  label: "Sun-kissed",   tone: "orange"    },
  { id: "k5",  label: "Minimal",      tone: "gray"      },
  { id: "k6",  label: "Authentic",    tone: "blue"      },
  { id: "k7",  label: "Luxe",         tone: "purple"    },
  { id: "k8",  label: "Fresh",        tone: "turquoise" },
];

const DONTS = ["Heavy filters", "Dark/moody tones", "Cluttered backgrounds", "Fast-cut edits"];

const TYPO = [
  { role: "Headlines",   spec: "Clash Display · 600 · 32–48px · All caps" },
  { role: "Body copy",   spec: "Inter · 400 · 14–16px · Sentence case"    },
  { role: "CTA labels",  spec: "Inter · 700 · 13px · Uppercase + tracking" },
  { role: "Captions",    spec: "Inter · 500 · 11px · 130% line-height"    },
];

const TAG_META: Record<string, { tone: keyof typeof TONES }> = {
  Mood:      { tone: "purple"    },
  Product:   { tone: "blue"      },
  Copy:      { tone: "pink"      },
  Lifestyle: { tone: "green"     },
};

/* ---- helpers ---- */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r},${g},${b})`;
}
function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

/* ---- Demo ---- */
function Demo() {
  const [tab,      setTab]      = useState<MoodTab>("references");
  const [selected, setSelected] = useState<Set<string>>(new Set(["r1", "r4"]));
  const [keywords, setKeywords] = useState<VibeKeyword[]>(KEYWORDS_INIT);
  const [copied,   setCopied]   = useState<string | null>(null);

  function toggleRef(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  function removeKeyword(id: string) {
    setKeywords((prev) => prev.filter((k) => k.id !== id));
  }
  function copyHex(hex: string) {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1400);
  }

  const TABS: { key: MoodTab; icon: React.ElementType; label: string }[] = [
    { key: "references",  icon: IconPhoto,    label: "References"  },
    { key: "palette",     icon: IconPalette,  label: "Palette"     },
    { key: "typography",  icon: IconLetterT,  label: "Typography"  },
    { key: "keywords",    icon: IconTag,      label: "Keywords"    },
  ];

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>Creative direction</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Badge label="Summer Glow" tone="yellow" />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{selected.size} references pinned</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconEye size={12} />}>Preview brief</Button>
          <Button variant="primary"   size="sm" leftIcon={<IconUpload size={12} />}>Save</Button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16, background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, padding: 4, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        {TABS.map(({ key, icon: Icon, label }) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "6px 10px", borderRadius: 7, background: active ? "#fff" : "transparent", border: active ? "1px solid var(--sd-border-default, #e5e7eb)" : "1px solid transparent", cursor: "pointer", fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--sd-font-primary, #111)" : "var(--sd-font-tertiary, #999)", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}>
              <Icon size={12} />
              {label}
            </button>
          );
        })}
      </div>

      {/* References grid */}
      {tab === "references" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
            {REFERENCES.map((ref) => {
              const isPinned = selected.has(ref.id);
              const tagTone = TAG_META[ref.tag]?.tone ?? "gray";
              return (
                <div key={ref.id} onClick={() => toggleRef(ref.id)}
                  style={{ position: "relative", aspectRatio: "4/3", borderRadius: 10, background: ref.gradient, cursor: "pointer", border: isPinned ? "2.5px solid #111" : "2.5px solid transparent", overflow: "hidden", transition: "border-color 0.15s" }}>
                  {isPinned && (
                    <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconCheck size={11} style={{ color: "#fff" }} />
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)", padding: "22px 10px 8px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{ref.label}</div>
                    <Badge label={ref.tag} tone={tagTone} size="sm" />
                  </div>
                </div>
              );
            })}
            {/* Add tile */}
            <div style={{ aspectRatio: "4/3", borderRadius: 10, border: "2px dashed var(--sd-border-default, #e5e7eb)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", color: "var(--sd-font-tertiary, #999)" }}>
              <IconPlus size={18} />
              <span style={{ fontSize: 11, fontWeight: 600 }}>Add reference</span>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Click tiles to pin them to the creative brief.</div>
        </div>
      )}

      {/* Palette */}
      {tab === "palette" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PALETTE.map((swatch) => (
            <div key={swatch.hex} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
              <div onClick={() => copyHex(swatch.hex)} style={{ width: 40, height: 40, borderRadius: 8, background: swatch.hex, flexShrink: 0, cursor: "pointer", border: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {copied === swatch.hex && <IconCheck size={14} style={{ color: isDark(swatch.hex) ? "#fff" : "#111" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{swatch.name}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{swatch.usage}</div>
              </div>
              <code style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "var(--sd-font-secondary, #555)", cursor: "pointer" }} onClick={() => copyHex(swatch.hex)}>
                {swatch.hex}
              </code>
            </div>
          ))}
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={12} />}>Add colour</Button>
        </div>
      )}

      {/* Typography */}
      {tab === "typography" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TYPO.map((t, i) => (
            <div key={i} style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--sd-font-tertiary, #999)", marginBottom: 4 }}>{t.role}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{t.spec}</div>
            </div>
          ))}
          <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, background: "var(--sd-bg-secondary, #f9f9f9)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--sd-font-tertiary, #999)", marginBottom: 6 }}>Don'ts</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {DONTS.map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: TONES.red.tint, fontSize: 11, fontWeight: 600, color: TONES.red.text }}>
                  <IconX size={9} />{d}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keywords */}
      {tab === "keywords" && (
        <div>
          <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)" }}>Vibe keywords — click to remove</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {keywords.map((kw) => (
              <button key={kw.id} onClick={() => removeKeyword(kw.id)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, background: TONES[kw.tone].tint, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: TONES[kw.tone].text }}>
                {kw.label}
                <IconX size={10} />
              </button>
            ))}
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 99, background: "var(--sd-bg-secondary, #f1f1f1)", border: "1px dashed var(--sd-border-default, #ccc)", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary, #999)" }}>
              <IconPlus size={10} />Add keyword
            </button>
          </div>
          <div style={{ padding: "10px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Campaign tone</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.6 }}>
              Summer Glow should feel warm, approachable, and effortlessly chic. Think golden-hour skin, dewy finishes, and minimal product placements that let the creator's natural beauty shine. Avoid harsh lighting or overly produced studio aesthetics.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-moodboard",
  title: "CampaignMoodboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creative direction board — reference image grid, brand palette, typography specs, and vibe keywords pinned by the brand team to guide creator content.",
  description:
    "The visual creative brief companion. Header: campaign badge, pinned count, Preview brief + Save CTAs. 4-tab layout: References (3-column grid; click tiles to pin/unpin — pinned tiles get a dark border + check badge; each tile has a gradient, label, and category tag; includes an Add reference placeholder); Palette (5 swatches with name, usage note, hex code; click swatch to copy hex with check feedback); Typography (4 type roles with spec strings; don'ts section with red chip list); Keywords (vibe keyword chips with remove-on-click, tone-matched colors, Add keyword button, campaign tone statement). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign moodboard",
      description: "Click the tabs to explore References, Palette, Typography, and Keywords sections. Pin/unpin reference tiles or remove keywords.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
