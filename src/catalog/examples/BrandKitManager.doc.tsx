"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconUpload,
  IconCheck,
  IconTrash,
  IconCopy,
  IconEdit,
  IconPlus,
  IconX,
  IconPhoto,
  IconTypography,
  IconPalette,
  IconFileText,
  IconEye,
  IconDownload,
  IconSparkles,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- Demo ---- */
function Demo() {
  const [tab, setTab] = useState<"colors" | "fonts" | "logo" | "voice">("colors");
  const [copiedHex, setCopiedHex]   = useState<string | null>(null);
  const [editingVoice, setEditingVoice] = useState(false);
  const [voiceText, setVoiceText] = useState(
    "Aura Labs speaks with a warm, knowledgeable voice — like a trusted friend who also happens to be a dermatologist. We avoid jargon, celebrate real skin, and lead with education over aspiration. Tone: confident, warm, science-backed."
  );

  const PALETTE = [
    { label: "Brand yellow",  hex: "#F59E0B", name: "Aura Gold",     role: "Primary"   },
    { label: "Deep brown",    hex: "#78350F", name: "Cacao",         role: "Secondary" },
    { label: "Warm cream",    hex: "#FEF3C7", name: "Sunrise Cream", role: "Background"},
    { label: "Charcoal",      hex: "#111827", name: "Midnight",      role: "Text"      },
    { label: "Soft white",    hex: "#FAFAFA", name: "Parchment",     role: "Surface"   },
    { label: "Error red",     hex: "#DC2626", name: "Alert",         role: "Semantic"  },
  ];

  const FONTS = [
    { name: "Canela",    weight: "Display / Headings", sample: "Glow from the inside out.", style: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" } },
    { name: "Inter",     weight: "Body / UI",          sample: "Science-backed. Skin-first.", style: { fontWeight: 400, fontSize: 14 } },
    { name: "JetBrains Mono", weight: "Code / Data",  sample: "#AGL-001 · 9.4% ER",      style: { fontWeight: 400, fontSize: 13, fontFamily: "monospace" } },
  ];

  const DOS = [
    "Use warm, optimistic language",
    "Say 'your skin' not 'your skin type'",
    "Lead with benefit before ingredient",
    "Include a personal story or skin journey reference",
    "Always disclose paid partnership clearly",
  ];
  const DONTS = [
    "Don't promise overnight results",
    "Avoid comparing to competitor brands",
    "Don't use before/after imagery without consent",
    "No medical claims (e.g. 'treats' or 'cures')",
    "Don't use #skincare alone — pair with niche tags",
  ];

  const TABS = [
    { key: "colors" as const, label: "Colors",      icon: IconPalette    },
    { key: "fonts"  as const, label: "Typography",  icon: IconTypography },
    { key: "logo"   as const, label: "Logo & assets", icon: IconPhoto     },
    { key: "voice"  as const, label: "Brand voice",  icon: IconSparkles  },
  ];

  function copyHex(hex: string) {
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#fde68a,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 900 }}>AL</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Aura Labs — Brand kit</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Shared with creators on campaign invite</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Download kit</Button>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16, background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 10, padding: 4, border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
        {TABS.map(({ key, label, icon: TIcon }) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "6px 8px", borderRadius: 7, background: active ? "#fff" : "transparent", border: active ? "1px solid var(--sd-border-default,#e5e7eb)" : "1px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "#111" : "var(--sd-font-tertiary,#999)", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}>
              <TIcon size={12} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Colors */}
      {tab === "colors" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 12 }}>
            {PALETTE.map((c) => (
              <div key={c.hex} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 56, background: c.hex, position: "relative" }}>
                  <button onClick={() => copyHex(c.hex)}
                    style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: 5, background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {copiedHex === c.hex ? <IconCheck size={10} style={{ color: "#111" }} /> : <IconCopy size={10} style={{ color: "#111" }} />}
                  </button>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>{c.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--sd-font-tertiary,#999)" }}>{c.hex}</span>
                    <Badge label={c.role} tone="gray" size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />}>Add color</Button>
        </div>
      )}

      {/* Typography */}
      {tab === "fonts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FONTS.map((f) => (
            <div key={f.name} style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{f.weight}</div>
                </div>
                <Button variant="secondary" size="sm">Download</Button>
              </div>
              <div style={{ ...f.style, lineHeight: 1.3, color: "#111" }}>{f.sample}</div>
            </div>
          ))}
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />}>Add font</Button>
        </div>
      )}

      {/* Logo & assets */}
      {tab === "logo" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Primary logo", bg: "#fff",     borderStyle: "1px solid var(--sd-border-default,#e5e7eb)", version: "Light" },
            { label: "Dark version", bg: "#111",     borderStyle: "none",                                       version: "Dark"  },
            { label: "Icon mark",    bg: "#FEF3C7",  borderStyle: "1px solid var(--sd-border-default,#e5e7eb)", version: "Icon"  },
          ].map(({ label, bg, borderStyle, version }) => (
            <div key={version} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
              <div style={{ width: 80, height: 48, borderRadius: 8, background: bg, border: borderStyle, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: version === "Icon" ? 20 : 16, fontWeight: 900, color: bg === "#111" ? "#fff" : "#111" }}>
                  {version === "Icon" ? "◆" : "Aura Labs"}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>PNG · SVG · 2× Retina</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconEye size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                </button>
                <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Get files</Button>
              </div>
            </div>
          ))}
          <div style={{ padding: "20px", border: "2px dashed var(--sd-border-default,#e5e7eb)", borderRadius: 10, textAlign: "center" }}>
            <IconUpload size={18} style={{ color: "var(--sd-font-tertiary,#999)", marginBottom: 6, display: "block", margin: "0 auto 6px" }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary,#555)" }}>Upload additional assets</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 10 }}>PNG, SVG, PDF · max 20MB</div>
            <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />}>Upload file</Button>
          </div>
        </div>
      )}

      {/* Brand voice */}
      {tab === "voice" && (
        <div>
          <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, marginBottom: 12, position: "relative" }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Voice & tone</div>
            {editingVoice ? (
              <>
                <textarea value={voiceText} onChange={(e) => setVoiceText(e.target.value)}
                  style={{ width: "100%", minHeight: 72, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 7, padding: "7px 10px", fontSize: 12, lineHeight: 1.6, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <Button variant="primary" size="sm" leftIcon={<IconCheck size={11} />} onClick={() => setEditingVoice(false)}>Save</Button>
                  <Button variant="secondary" size="sm" onClick={() => setEditingVoice(false)}>Cancel</Button>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: 12, lineHeight: 1.65, color: "var(--sd-font-secondary,#555)", margin: 0 }}>{voiceText}</p>
                <button onClick={() => setEditingVoice(true)}
                  style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconEdit size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                </button>
              </>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {/* Dos */}
            <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TONES.green.text, marginBottom: 8 }}>Do</div>
              {DOS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6 }}>
                  <IconCheck size={11} style={{ color: TONES.green.text, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 11, lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Don'ts */}
            <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TONES.red.text, marginBottom: 8 }}>Don't</div>
              {DONTS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6 }}>
                  <IconX size={11} style={{ color: TONES.red.text, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 11, lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-kit-manager",
  title: "BrandKitManager",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand identity hub shared with creators — 4-tab layout: color palette (copy hex), typography specimens, logo downloads, and brand voice guide with Do/Don't lists.",
  description:
    "The brand's shareable identity kit that creators receive on campaign invite. Header: brand monogram, brand name + subtitle, Download kit CTA. 4-tab pill layout: Colors — 3-column swatch grid (6 palette entries: Aura Gold/Cacao/Sunrise Cream/Midnight/Parchment/Alert); each swatch has 56px color block with copy-hex button (check icon for 1.5s), name, hex code in monospace, role badge. Typography — 3 font rows (Canela display/Inter body/JetBrains Mono code) each with font name, weight role, live specimen text in the actual style, Download button. Logo & assets — 3 logo rows (Light/Dark/Icon mark) with mini preview panel, file format note, Eye + Get files buttons; upload drop zone below. Brand voice — voice & tone paragraph (click pencil to edit inline with textarea + Save/Cancel); 2-column Do/Don't grid with green check / red × per bullet point. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand kit manager",
      description: "Switch tabs: Colors (click any swatch to copy hex), Typography (specimen text in each font), Logo & assets, Brand voice (click pencil icon to edit the voice paragraph).",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
