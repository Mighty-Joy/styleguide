import React from "react";
import type { ComponentDoc } from "@/catalog/types";

interface ScaleRow {
  token: string;
  rem: string;
  px: string;
  weight: number;
  usage: string;
}

const SCALE: ScaleRow[] = [
  { token: "--sd-text-xxl", rem: "1.85rem", px: "30px", weight: 600, usage: "Page title" },
  { token: "--sd-text-xl", rem: "1.54rem", px: "25px", weight: 600, usage: "Section title" },
  { token: "--sd-text-lg", rem: "1.23rem", px: "20px", weight: 500, usage: "Record / card title" },
  { token: "--sd-text-md", rem: "1rem", px: "16px", weight: 400, usage: "Emphasized body" },
  { token: "--sd-text-sm", rem: "0.92rem", px: "~15px", weight: 400, usage: "Body (default)" },
  { token: "--sd-text-xs", rem: "0.85rem", px: "~14px", weight: 500, usage: "Labels, meta, table cells" },
  { token: "--sd-text-xxs", rem: "0.625rem", px: "10px", weight: 500, usage: "Micro labels, overlines" },
];

const WEIGHTS = [
  { w: 400, name: "Regular" },
  { w: 500, name: "Medium" },
  { w: 600, name: "Semibold" },
];

function Scale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {SCALE.map((r) => (
        <div
          key={r.token}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px 120px",
            alignItems: "baseline",
            gap: 16,
            padding: "14px 0",
            borderTop: "1px solid var(--sd-border-light)",
          }}
        >
          <span
            style={{
              fontSize: r.rem,
              fontWeight: r.weight,
              letterSpacing: "-0.01em",
              color: "var(--sd-font-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Superdeal
          </span>
          <code
            style={{
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 12,
              color: "var(--sd-accent-active)",
            }}
          >
            {r.token}
          </code>
          <span style={{ fontSize: 12.5, color: "var(--sd-font-tertiary)" }}>
            {r.rem} · {r.px} · {r.usage}
          </span>
        </div>
      ))}
    </div>
  );
}

function Weights() {
  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      {WEIGHTS.map((x) => (
        <div key={x.w} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 28, fontWeight: x.w, letterSpacing: "-0.02em" }}>
            Aa
          </span>
          <span style={{ fontSize: 12.5, color: "var(--sd-font-tertiary)" }}>
            {x.name} · {x.w}
          </span>
        </div>
      ))}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "typography",
  title: "Typography",
  group: "Foundations",
  status: "stable",
  summary:
    "Inter across the system, weights 400 / 500 / 600, and a 7-step type scale taken verbatim from twenty-ui.",
  description:
    "Typeface and scale follow Twenty (twenty-ui FONT_COMMON): one family — Inter — loaded via next/font, and the exact size steps (xxs → xxl) defined as --sd-text-* tokens. Components reference the tokens, so the whole system tracks Twenty's sizing from one place.",
  source: "twenty-ui FONT_COMMON · src/tokens/tokens.css",
  demos: [
    {
      title: "Typeface",
      description: "Inter — the single family for UI and data.",
      render: () => (
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em" }}>
            Inter
          </span>
          <span style={{ fontSize: 20, color: "var(--sd-font-tertiary)" }}>
            ABCDEFG abcdefg 0123456789
          </span>
        </div>
      ),
    },
    {
      title: "Weights",
      description: "Regular for body, Medium for labels/UI, Semibold for titles.",
      render: () => <Weights />,
    },
    {
      title: "Type scale",
      description: "Each step is a token. px shown at the 16px root.",
      block: true,
      plain: true,
      render: () => <Scale />,
    },
  ],
};

export default doc;
