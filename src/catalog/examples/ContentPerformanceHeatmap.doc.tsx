"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconTrendingUp,
  IconClock,
  IconInfoCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Platform = "instagram" | "tiktok";
type Metric = "er" | "views" | "saves";

/* ---- data ---- */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["6–9am", "9am–12pm", "12–3pm", "3–7pm", "7–10pm"];

// ER % values — per [day][slot]
const IG_ER: number[][] = [
  [3.1, 4.2, 5.8, 6.4, 4.9],
  [2.9, 4.8, 6.1, 7.2, 5.3],
  [3.4, 5.2, 6.8, 7.9, 5.7],
  [3.0, 5.0, 7.1, 8.2, 6.1],
  [2.8, 4.4, 6.3, 7.4, 5.5],
  [4.1, 5.8, 7.8, 9.1, 7.2],
  [4.6, 6.4, 8.3, 9.4, 7.8],
];

const TT_ER: number[][] = [
  [2.8, 5.1, 6.2, 5.8, 7.1],
  [3.2, 5.8, 7.0, 6.4, 8.2],
  [3.5, 6.1, 7.5, 7.0, 8.9],
  [3.0, 5.6, 7.1, 6.8, 8.4],
  [2.6, 4.9, 6.4, 6.1, 7.8],
  [4.2, 6.8, 8.1, 7.8, 9.3],
  [4.8, 7.2, 8.6, 8.1, 9.8],
];

const DATA: Record<Platform, number[][]> = {
  instagram: IG_ER,
  tiktok:    TT_ER,
};

function getColor(value: number, min: number, max: number): string {
  const pct = (value - min) / (max - min);
  // White → black gradient
  const lightness = Math.round(95 - pct * 80);
  return `hsl(0, 0%, ${lightness}%)`;
}

function getTextColor(value: number, min: number, max: number): string {
  const pct = (value - min) / (max - min);
  return pct > 0.55 ? "#fff" : "#111";
}

/* ---- Demo ---- */
function Demo() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [hovered, setHovered] = useState<{ day: number; slot: number } | null>(null);

  const grid = DATA[platform];
  const flat = grid.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);

  // Find best slot
  let bestDay = 0, bestSlot = 0, bestVal = 0;
  grid.forEach((row, d) => row.forEach((v, s) => { if (v > bestVal) { bestVal = v; bestDay = d; bestSlot = s; } }));

  // Find worst
  let worstDay = 0, worstSlot = 0, worstVal = 999;
  grid.forEach((row, d) => row.forEach((v, s) => { if (v < worstVal) { worstVal = v; worstDay = d; worstSlot = s; } }));

  const hoverVal = hovered ? grid[hovered.day][hovered.slot] : null;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Posting performance heatmap</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Avg engagement rate by day and time · last 90 days</div>
        </div>
        {/* Platform toggle */}
        <div style={{ display: "flex", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
          {([
            { key: "instagram" as Platform, Icon: IconBrandInstagram, label: "Instagram" },
            { key: "tiktok"    as Platform, Icon: IconBrandTiktok,    label: "TikTok"    },
          ]).map(({ key, Icon, label }) => (
            <button
              key={key}
              onClick={() => setPlatform(key)}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: platform === key ? "#111" : "transparent", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, color: platform === key ? "#fff" : "var(--sd-font-secondary, #555)" }}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Callout strip */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px solid ${TONES.green.tint}`, borderRadius: 10, background: TONES.green.tint }}>
          <IconTrendingUp size={16} style={{ color: TONES.green.text, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: TONES.green.text, textTransform: "uppercase", letterSpacing: "0.04em" }}>Best time to post</div>
            <div style={{ fontSize: 13, fontWeight: 800 }}>{DAYS[bestDay]} · {SLOTS[bestSlot]}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Avg {bestVal.toFixed(1)}% ER</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
          <IconClock size={16} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Lowest performance</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sd-font-secondary, #555)" }}>{DAYS[worstDay]} · {SLOTS[worstSlot]}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Avg {worstVal.toFixed(1)}% ER</div>
          </div>
        </div>
        {hoverVal !== null && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <IconInfoCircle size={16} style={{ color: TONES.blue.text, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: TONES.blue.text, textTransform: "uppercase", letterSpacing: "0.04em" }}>Hovered</div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{DAYS[hovered!.day]} · {SLOTS[hovered!.slot]}</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{hoverVal.toFixed(1)}% ER</div>
            </div>
          </div>
        )}
      </div>

      {/* Heatmap grid */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {/* Column headers (time slots) */}
        <div style={{ display: "grid", gridTemplateColumns: "52px repeat(5, 1fr)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
          <div style={{ padding: "8px 10px" }} />
          {SLOTS.map((s) => (
            <div key={s} style={{ padding: "8px 4px", textAlign: "center", fontSize: 9, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{s}</div>
          ))}
        </div>

        {/* Rows (days) */}
        {grid.map((row, d) => (
          <div key={DAYS[d]} style={{ display: "grid", gridTemplateColumns: "52px repeat(5, 1fr)", borderBottom: d < grid.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
            <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", background: "var(--sd-bg-secondary, #f9f9f9)", borderRight: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              {DAYS[d]}
            </div>
            {row.map((val, s) => {
              const isBest = d === bestDay && s === bestSlot;
              const isHov = hovered?.day === d && hovered?.slot === s;
              return (
                <div
                  key={s}
                  onMouseEnter={() => setHovered({ day: d, slot: s })}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isHov ? "#333" : isBest ? "#111" : getColor(val, min, max),
                    cursor: "default",
                    borderLeft: s > 0 ? "1px solid rgba(0,0,0,0.04)" : "none",
                    outline: isBest ? "2px solid #111" : "none",
                    outlineOffset: -2,
                    transition: "background 0.15s",
                    fontSize: 11,
                    fontWeight: 700,
                    color: isHov || isBest ? "#fff" : getTextColor(val, min, max),
                  }}
                >
                  {val.toFixed(1)}%
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Low ER</span>
          <div style={{ display: "flex", gap: 2 }}>
            {[95, 80, 65, 50, 35, 20].map((l) => (
              <div key={l} style={{ width: 14, height: 14, borderRadius: 3, background: `hsl(0,0%,${l}%)`, border: "1px solid rgba(0,0,0,0.06)" }} />
            ))}
          </div>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>High ER</span>
        </div>
        <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Hover any cell for details</span>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "content-performance-heatmap",
  title: "ContentPerformanceHeatmap",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Posting-time vs. engagement-rate heatmap — 7×5 grid (day × time slot) with white-to-black intensity, best/worst callout strip, and platform toggle.",
  description:
    "Analytics surface showing which days and posting times drive the highest engagement rate. Platform toggle (Instagram / TikTok) swaps the underlying dataset. Callout strip: best time to post (green card with day, slot, avg ER) and lowest performance (gray card). A third card appears on hover showing the hovered cell's values. Heatmap grid: 7 rows (Mon–Sun) × 5 columns (6–9am / 9am–12pm / 12–3pm / 3–7pm / 7–10pm). Cells are white-to-black gradient by ER intensity — ER value printed inside, text flips white when background darkens. Best cell gets a solid black fill and outline ring. Hovered cell goes dark gray. Legend bar below shows the gradient scale. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Content performance heatmap",
      description: "Toggle between Instagram and TikTok. Hover any cell to see its stats in the callout strip.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
