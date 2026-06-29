import React from "react";
import { TONES, TONE_NAMES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

interface Step {
  step: number;
  hex: string;
  token: string;
}

const GRAY: Step[] = [
  ["#ffffff"], ["#fcfcfc"], ["#f9f9f9"], ["#f1f1f1"], ["#ebebeb"], ["#d6d6d6"],
  ["#cccccc"], ["#b3b3b3"], ["#999999"], ["#838383"], ["#666666"], ["#333333"],
].map(([hex], i) => ({ step: i + 1, hex, token: `--sd-gray-${i + 1}` }));

const GREEN: Step[] = [
  ["#f2fdf8"], ["#e6fbf0"], ["#d2f7e4"], ["#b6f0d2"], ["#93e7bc"], ["#6bdca4"],
  ["#45d28d"], ["#3ed086"], ["#36d080"], ["#2bb56e"], ["#1c9159"], ["#0c5132"],
].map(([hex], i) => ({ step: i + 1, hex, token: `--sd-green-${i + 1}` }));

function Ramp({ steps, brand }: { steps: Step[]; brand?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        width: "100%",
        gap: 0,
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        overflow: "hidden",
      }}
    >
      {steps.map((s) => {
        const dark = s.step >= 8;
        return (
          <div key={s.token} title={s.token}>
            <div
              style={{
                background: s.hex,
                height: 64,
                display: "flex",
                alignItems: "flex-end",
                padding: 6,
                color: dark ? "rgba(255,255,255,0.85)" : "var(--sd-font-tertiary)",
                fontSize: 11,
                fontWeight: s.step === brand ? 800 : 500,
                borderRight: "1px solid var(--sd-border-light)",
              }}
            >
              {s.step}
              {s.step === brand ? " ●" : ""}
            </div>
            <div
              style={{
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 10,
                color: "var(--sd-font-tertiary)",
                padding: "4px 6px",
                textAlign: "center",
              }}
            >
              {s.hex}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface Role {
  swatch: string;
  name: string;
  token: string;
  usage: string;
}
const ROLES: Role[] = [
  { swatch: "var(--sd-accent)", name: "Accent", token: "--sd-accent", usage: "green-9 — primary actions, brand" },
  { swatch: "var(--sd-link)", name: "Link / text-green", token: "--sd-link", usage: "green-11 — legible green text & links" },
  { swatch: "var(--sd-font-primary)", name: "Text primary", token: "--sd-font-primary", usage: "gray-12 — body & titles" },
  { swatch: "var(--sd-font-secondary)", name: "Text secondary", token: "--sd-font-secondary", usage: "gray-11 — quiet nav, meta" },
  { swatch: "var(--sd-bg-tertiary)", name: "Surface tertiary", token: "--sd-bg-tertiary", usage: "gray-4 — chips, hover fills" },
  { swatch: "var(--sd-border-light)", name: "Border light", token: "--sd-border-light", usage: "gray-4 (#f1f1f1) — cards, subtle dividers" },
  { swatch: "var(--sd-border-medium)", name: "Border medium", token: "--sd-border-medium", usage: "gray-5 (#ebebeb) — input borders, hover rings" },
  { swatch: "var(--sd-border-strong)", name: "Border strong", token: "--sd-border-strong", usage: "gray-6 (#d6d6d6) — emphasized dividers" },
  { swatch: "var(--sd-danger)", name: "Danger", token: "--sd-danger", usage: "destructive actions, input errors" },
];

function Roles() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      {ROLES.map((r) => (
        <div key={r.token} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "var(--sd-radius-sm)",
              background: r.swatch,
              border: "1px solid var(--sd-border-light)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontWeight: 600, fontSize: 13, width: 140 }}>{r.name}</span>
          <code
            style={{
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 12,
              color: "var(--sd-accent-active)",
              width: 170,
            }}
          >
            {r.token}
          </code>
          <span style={{ fontSize: 13, color: "var(--sd-font-secondary)" }}>{r.usage}</span>
        </div>
      ))}
    </div>
  );
}

function TwoTone() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 14,
        width: "100%",
      }}
    >
      {TONE_NAMES.map((name) => {
        const t = TONES[name];
        return (
          <div
            key={name}
            style={{
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-md)",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* tag = tint background + text color + solid dot */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                alignSelf: "flex-start",
                height: 20,
                padding: "0 8px",
                borderRadius: "var(--sd-radius-pill)",
                background: t.tint,
                color: t.text,
                fontSize: "var(--sd-text-xs)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: t.solid,
                }}
              />
              {name}
            </span>
            {/* solid = chart series / avatar fill */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "var(--sd-radius-sm)",
                  background: t.solid,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                solid (chart)
              </span>
            </div>
            <div
              style={{
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 10,
                lineHeight: 1.6,
                color: "var(--sd-font-tertiary)",
              }}
            >
              <div>tint {t.tint}</div>
              <div>text {t.text}</div>
              <div>solid {t.solid}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "colors",
  title: "Colors",
  group: "Foundations",
  status: "stable",
  summary:
    "The gray scale, the Superdeal green ramp, and the semantic roles every component reads from.",
  description:
    "All color in the system resolves to these tokens, defined once in tokens.css and shared with apps/web. Components never hard-code hex — they reference the semantic roles, so a single change here cascades everywhere.",
  source: "src/tokens/tokens.css",
  demos: [
    {
      title: "Gray scale",
      description: "12-step neutral ramp (--sd-gray-1 → 12). Backgrounds, text, borders.",
      block: true,
      plain: true,
      render: () => <Ramp steps={GRAY} />,
    },
    {
      title: "Superdeal green",
      description: "Brand accent ramp. Step 9 (#36d080) is the brand green.",
      block: true,
      plain: true,
      render: () => <Ramp steps={GREEN} brand={9} />,
    },
    {
      title: "Semantic roles",
      description: "What each token is for — components reference these, not raw steps.",
      block: true,
      plain: true,
      render: () => <Roles />,
    },
    {
      title: "Two-tone (tags & charts)",
      description:
        "10 families, each a triplet: tint (tag background) + text (label) for tags & status pills, solid for chart series, avatar fills, and the tag dot. Tokens: --sd-tone-<name>-{tint,text,solid}.",
      block: true,
      plain: true,
      render: () => <TwoTone />,
    },
  ],
};

export default doc;
