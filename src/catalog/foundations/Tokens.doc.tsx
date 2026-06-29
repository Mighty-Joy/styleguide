"use client";

import React from "react";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Shared layout helpers                                                  */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.08em", color: "var(--sd-font-tertiary)",
      marginBottom: 12, fontFamily: "var(--sd-font-stack)",
    }}>
      {children}
    </div>
  );
}

function TokenRow({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "7px 0",
      borderBottom: "1px solid var(--sd-border-light)",
      fontFamily: "var(--sd-font-stack)",
    }}>
      {preview && <div style={{ flexShrink: 0 }}>{preview}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)", fontFamily: "monospace" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Spacing demo                                                           */
/* ------------------------------------------------------------------ */

const SPACING = [
  { token: "--sd-space-1", value: "4px",  cssVar: "var(--sd-space-1)" },
  { token: "--sd-space-2", value: "8px",  cssVar: "var(--sd-space-2)" },
  { token: "--sd-space-3", value: "12px", cssVar: "var(--sd-space-3)" },
  { token: "--sd-space-4", value: "16px", cssVar: "var(--sd-space-4)" },
  { token: "--sd-space-5", value: "24px", cssVar: "var(--sd-space-5)" },
  { token: "--sd-space-6", value: "32px", cssVar: "var(--sd-space-6)" },
];

function SpacingDemo() {
  return (
    <div>
      {SPACING.map(s => (
        <TokenRow
          key={s.token}
          name={s.token}
          value={s.value}
          preview={
            <div style={{
              width: s.cssVar, height: 20, minWidth: s.cssVar,
              background: "var(--sd-accent)", borderRadius: 2, flexShrink: 0,
            }} />
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radii demo                                                             */
/* ------------------------------------------------------------------ */

const RADII = [
  { token: "--sd-radius-xs",   value: "2px",   cssVar: "var(--sd-radius-xs)" },
  { token: "--sd-radius-sm",   value: "4px",   cssVar: "var(--sd-radius-sm)" },
  { token: "--sd-radius-md",   value: "8px",   cssVar: "var(--sd-radius-md)" },
  { token: "--sd-radius-xl",   value: "20px",  cssVar: "var(--sd-radius-xl)" },
  { token: "--sd-radius-pill", value: "999px", cssVar: "var(--sd-radius-pill)" },
];

function RadiiDemo() {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
      {RADII.map(r => (
        <div key={r.token} style={{ textAlign: "center" }}>
          <div style={{
            width: 56, height: 56,
            background: "var(--sd-bg-tertiary)",
            border: "1.5px solid var(--sd-border-strong)",
            borderRadius: r.cssVar,
          }} />
          <div style={{ marginTop: 6, fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", fontFamily: "monospace" }}>
            {r.token.replace("--sd-radius-", "")}
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontFamily: "var(--sd-font-stack)" }}>{r.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shadows demo                                                           */
/* ------------------------------------------------------------------ */

function ShadowsDemo() {
  const shadows = [
    { token: "--sd-shadow-light",  label: "Light",  value: "0px 2px 4px rgba(0,0,0,0.04), 0px 0px 4px rgba(0,0,0,0.08)", cssVar: "var(--sd-shadow-light)" },
    { token: "--sd-shadow-strong", label: "Strong", value: "2px 4px 16px rgba(0,0,0,0.16), 0px 2px 4px rgba(0,0,0,0.08)", cssVar: "var(--sd-shadow-strong)" },
  ];
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {shadows.map(s => (
        <div key={s.token}>
          <div style={{
            width: 120, height: 72,
            background: "var(--sd-bg-primary)",
            borderRadius: "var(--sd-radius-md)",
            boxShadow: s.cssVar,
          }} />
          <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: "var(--sd-font-primary)", fontFamily: "var(--sd-font-stack)" }}>{s.label}</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontFamily: "monospace" }}>{s.token}</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontFamily: "var(--sd-font-stack)", maxWidth: 180, marginTop: 2 }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Type scale demo                                                        */
/* ------------------------------------------------------------------ */

const TYPE_SCALE = [
  { token: "--sd-text-xxs", value: "0.625rem · 10px", sample: "Caption / legal" },
  { token: "--sd-text-xs",  value: "0.85rem · ~13.6px", sample: "Small label" },
  { token: "--sd-text-sm",  value: "0.92rem · ~14.7px", sample: "Body / default" },
  { token: "--sd-text-md",  value: "1rem · 16px", sample: "Medium body" },
  { token: "--sd-text-lg",  value: "1.23rem · ~19.7px", sample: "Large body / subheading" },
  { token: "--sd-text-xl",  value: "1.54rem · ~24.6px", sample: "Page heading" },
  { token: "--sd-text-xxl", value: "1.85rem · ~29.6px", sample: "Hero heading" },
];

function TypeScaleDemo() {
  return (
    <div>
      {TYPE_SCALE.map(t => (
        <div key={t.token} style={{
          display: "flex", alignItems: "baseline", gap: 16,
          padding: "6px 0", borderBottom: "1px solid var(--sd-border-light)",
        }}>
          <div style={{ flex: "0 0 200px" }}>
            <div style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", fontFamily: "monospace" }}>{t.token.replace("--sd-text-", "")}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontFamily: "var(--sd-font-stack)" }}>{t.value}</div>
          </div>
          <div style={{
            fontSize: `var(${t.token})`,
            color: "var(--sd-font-primary)",
            fontFamily: "var(--sd-font-stack)",
            fontWeight: 500,
            lineHeight: 1.3,
          }}>
            {t.sample}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Semantic colors demo                                                   */
/* ------------------------------------------------------------------ */

function ColorSwatch({ token, label, hex, border }: { token: string; label: string; hex?: string; border?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
      <div style={{
        width: 32, height: 32, borderRadius: "var(--sd-radius-sm)",
        background: `var(${token})`,
        border: border ? "1px solid var(--sd-border-medium)" : "none",
        flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-primary)", fontFamily: "monospace" }}>{token}</div>
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontFamily: "var(--sd-font-stack)" }}>{label}{hex ? ` · ${hex}` : ""}</div>
      </div>
    </div>
  );
}

function SemanticColorsDemo() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div>
        <SectionLabel>Background</SectionLabel>
        <ColorSwatch token="--sd-bg-primary"    label="Primary"    hex="#ffffff" border />
        <ColorSwatch token="--sd-bg-secondary"  label="Secondary"  hex="#fcfcfc" border />
        <ColorSwatch token="--sd-bg-tertiary"   label="Tertiary"   hex="#f1f1f1" border />
        <ColorSwatch token="--sd-bg-quaternary" label="Quaternary" hex="#ebebeb" border />
        <ColorSwatch token="--sd-bg-inverted"   label="Inverted"   hex="#333333" />
      </div>

      <div>
        <SectionLabel>Font</SectionLabel>
        <ColorSwatch token="--sd-font-primary"   label="Primary"   hex="#333333" border />
        <ColorSwatch token="--sd-font-secondary" label="Secondary" hex="#666666" border />
        <ColorSwatch token="--sd-font-tertiary"  label="Tertiary"  hex="#999999" border />
        <ColorSwatch token="--sd-font-light"     label="Light"     hex="#b3b3b3" border />
        <ColorSwatch token="--sd-font-inverted"  label="Inverted"  hex="#ffffff" border />
      </div>

      <div>
        <SectionLabel>Border</SectionLabel>
        <ColorSwatch token="--sd-border-light"  label="Light"  hex="#f1f1f1" border />
        <ColorSwatch token="--sd-border-medium" label="Medium" hex="#ebebeb" border />
        <ColorSwatch token="--sd-border-strong" label="Strong" hex="#d6d6d6" border />
      </div>

      <div>
        <SectionLabel>Accent — Superdeal green</SectionLabel>
        <ColorSwatch token="--sd-accent"        label="Default (#36d080)" />
        <ColorSwatch token="--sd-accent-hover"  label="Hover (#2bb56e)" />
        <ColorSwatch token="--sd-accent-active" label="Active (#1c9159)" />
        <ColorSwatch token="--sd-accent-tint"   label="Tint (#b6f0d2)"  border />
        <ColorSwatch token="--sd-accent-tint-2" label="Tint 2 (#d2f7e4)" border />
      </div>

      <div>
        <SectionLabel>Danger</SectionLabel>
        <ColorSwatch token="--sd-danger"        label="Default (#e5484d)" />
        <ColorSwatch token="--sd-danger-text"   label="Text (#ce2c31)" border />
        <ColorSwatch token="--sd-danger-border" label="Border (#f3aeaf)" border />
        <ColorSwatch token="--sd-danger-bg"     label="Background (#fff0f0)" border />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "tokens",
  title: "Tokens",
  group: "Foundations",
  status: "stable",
  summary: "All --sd-* CSS custom properties: spacing, radii, shadows, type scale, and semantic color aliases.",
  description:
    "Tokens are the single source of truth for all visual constants in the Superdeal design system. They live in `src/tokens/tokens.css` and are consumed by every component and composite as `var(--sd-*)` CSS variables. **Never hardcode hex values or pixel measurements** — always reference a token. Changing a token cascades everywhere automatically. The token vocabulary is shared with `apps/web`, so changes made here also affect the production app.",
  demos: [
    {
      title: "Spacing",
      description: "4px base grid. Use these for gap, padding, and margin — never arbitrary pixel values.",
      block: true,
      render: () => <SpacingDemo />,
    },
    {
      title: "Radii",
      description: "Five steps from sharp (xs) to fully round (pill). Use md for cards, sm for inputs and badges, pill for chips and avatars.",
      block: true,
      render: () => <RadiiDemo />,
    },
    {
      title: "Shadows",
      description: "Two elevations. Use light for cards and dropdowns; strong for modals and panels.",
      block: true,
      render: () => <ShadowsDemo />,
    },
    {
      title: "Type scale",
      description: "Seven steps from 10px caption to 30px hero. Default body is --sd-text-sm (~14.7px). Labels and badges use --sd-text-xs or smaller.",
      block: true,
      render: () => <TypeScaleDemo />,
    },
    {
      title: "Semantic colors",
      description: "Named by role, not raw value. Background, font, border, accent, and danger families — always use the semantic alias, not the raw gray or green step.",
      block: true,
      render: () => <SemanticColorsDemo />,
    },
  ],
  props: [],
};

export default doc;
