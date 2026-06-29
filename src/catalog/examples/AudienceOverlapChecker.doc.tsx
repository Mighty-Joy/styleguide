"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconUsers,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface Creator {
  id: string;
  name: string;
  initials: string;
  tone: string;
  handle: string;
  followers: string;
  niche: string;
  location: string;
}

const CREATORS: Creator[] = [
  { id: "c1", name: "Priya Nair",   initials: "PN", tone: "green",  handle: "@priya.creates", followers: "248K", niche: "Skincare", location: "Mumbai"      },
  { id: "c2", name: "Amara Diallo", initials: "AD", tone: "purple", handle: "@amarabeauty",   followers: "194K", niche: "Beauty",   location: "London"      },
  { id: "c3", name: "Ji-ho Kim",    initials: "JK", tone: "orange", handle: "@jiho.skin",     followers: "312K", niche: "Skincare", location: "Seoul"       },
  { id: "c4", name: "Sofia Reyes",  initials: "SR", tone: "pink",   handle: "@sofiaglows",    followers: "88K",  niche: "Wellness", location: "Los Angeles" },
];

// Pairwise overlap percentages (symmetric)
const OVERLAP: Record<string, Record<string, number>> = {
  c1: { c1: 100, c2: 18, c3: 34, c4: 9  },
  c2: { c1: 18,  c2: 100, c3: 22, c4: 11 },
  c3: { c1: 34,  c2: 22,  c3: 100, c4: 7  },
  c4: { c1: 9,   c2: 11,  c3: 7,  c4: 100 },
};

function overlapColor(pct: number): { bg: string; text: string; tone: keyof typeof TONES } {
  if (pct >= 30) return { bg: TONES.red.tint,    text: TONES.red.text,    tone: "red"    };
  if (pct >= 15) return { bg: TONES.yellow.tint, text: TONES.yellow.text, tone: "yellow" };
  return           { bg: TONES.green.tint,  text: TONES.green.text,  tone: "green"  };
}

// Estimated unique reach given a set of selected creators
function estimateUniqueReach(selected: string[]): number {
  if (selected.length === 0) return 0;
  const followers: Record<string, number> = { c1: 248000, c2: 194000, c3: 312000, c4: 88000 };
  let base = selected.reduce((s, id) => s + followers[id], 0);
  // Deduct average pairwise overlap
  for (let i = 0; i < selected.length; i++) {
    for (let j = i + 1; j < selected.length; j++) {
      const pct = OVERLAP[selected[i]][selected[j]] / 100;
      const smaller = Math.min(followers[selected[i]], followers[selected[j]]);
      base -= Math.round(smaller * pct * 0.5);
    }
  }
  return Math.max(base, 0);
}

/* ---- Demo ---- */
function Demo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["c1", "c2", "c3", "c4"]));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selArr   = Array.from(selected);
  const selList  = CREATORS.filter((c) => selected.has(c.id));
  const rawReach = selList.reduce((s, c) => s + parseInt(c.followers.replace("K","")) * 1000, 0);
  const uniqueReach = estimateUniqueReach(selArr);
  const overlap_pct = rawReach > 0 ? Math.round(((rawReach - uniqueReach) / rawReach) * 100) : 0;
  const highOverlaps = selArr.flatMap((a) => selArr.filter((b) => b > a && OVERLAP[a][b] >= 20));

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Audience overlap checker</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Select creators to analyze</div>
        </div>
      </div>

      {/* Creator selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 }}>
        {CREATORS.map((c) => {
          const inSet = selected.has(c.id);
          return (
            <div key={c.id} onClick={() => toggle(c.id)}
              style={{ display: "flex", gap: 9, alignItems: "center", padding: "9px 12px", border: `2px solid ${inSet ? "#111" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 10, cursor: "pointer", background: inSet ? "var(--sd-bg-secondary,#f9f9f9)" : "#fff" }}>
              <Avatar initials={c.initials} tone={c.tone as any} size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.followers} · {c.niche}</div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: 5, background: inSet ? "#111" : "transparent", border: inSet ? "none" : "2px solid var(--sd-border-default,#e5e7eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {inSet && <IconCheck size={10} style={{ color: "#fff" }} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reach summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Combined reach",      value: `${Math.round(rawReach/1000)}K`,    tone: "blue"   as const },
          { label: "Est. unique reach",   value: `${Math.round(uniqueReach/1000)}K`, tone: "green"  as const },
          { label: "Overlap deducted",    value: `${overlap_pct}%`,                  tone: overlap_pct >= 20 ? "red" as const : "yellow" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "10px 12px", background: TONES[tone].tint, borderRadius: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 10, color: TONES[tone].text, opacity: 0.8 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Overlap matrix */}
      {selList.length >= 2 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Pairwise audience overlap</div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <div style={{ minWidth: 320 }}>
              {/* Column headers */}
              <div style={{ display: "grid", gridTemplateColumns: `100px repeat(${selList.length},1fr)`, gap: 4, marginBottom: 4 }}>
                <div />
                {selList.map((c) => (
                  <div key={c.id} style={{ textAlign: "center" }}>
                    <Avatar initials={c.initials} tone={c.tone as any} size="sm" />
                    <div style={{ fontSize: 9, fontWeight: 700, marginTop: 3 }}>{c.name.split(" ")[0]}</div>
                  </div>
                ))}
              </div>
              {/* Matrix rows */}
              {selList.map((rowC) => (
                <div key={rowC.id} style={{ display: "grid", gridTemplateColumns: `100px repeat(${selList.length},1fr)`, gap: 4, marginBottom: 4, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Avatar initials={rowC.initials} tone={rowC.tone as any} size="sm" />
                    <span style={{ fontSize: 10, fontWeight: 700 }}>{rowC.name.split(" ")[0]}</span>
                  </div>
                  {selList.map((colC) => {
                    const pct = OVERLAP[rowC.id][colC.id];
                    const isSelf = rowC.id === colC.id;
                    const { bg, text } = overlapColor(isSelf ? 0 : pct);
                    return (
                      <div key={colC.id} style={{ height: 34, borderRadius: 7, background: isSelf ? "var(--sd-bg-secondary,#f4f4f5)" : bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: isSelf ? "var(--sd-font-tertiary,#bbb)" : text }}>
                          {isSelf ? "—" : `${pct}%`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Warnings */}
      {highOverlaps.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {highOverlaps.map((pair) => {
            const [a, b] = pair.split(",") as [string, string]; // won't happen, using different logic below
            return null;
          })}
          {selArr.flatMap((a) =>
            selArr.filter((b) => b > a && OVERLAP[a][b] >= 20).map((b) => {
              const ca = CREATORS.find((c) => c.id === a)!;
              const cb = CREATORS.find((c) => c.id === b)!;
              const pct = OVERLAP[a][b];
              const { tone } = overlapColor(pct);
              return (
                <div key={`${a}-${b}`} style={{ display: "flex", gap: 9, padding: "9px 12px", background: TONES[tone].tint, borderRadius: 10 }}>
                  {pct >= 30 ? <IconAlertTriangle size={14} style={{ color: TONES[tone].text, flexShrink: 0 }} /> : <IconInfoCircle size={14} style={{ color: TONES[tone].text, flexShrink: 0 }} />}
                  <div style={{ flex: 1, fontSize: 11, color: TONES[tone].text }}>
                    <strong>{ca.name}</strong> × <strong>{cb.name}</strong> share an estimated <strong>{pct}% audience overlap</strong> — both are {ca.niche}/{cb.niche} creators in similar demographics.
                    {pct >= 30 ? " Consider replacing one to maximize unique reach." : " Low risk — monitor attribution."}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {highOverlaps.length === 0 && selList.length >= 2 && (
        <div style={{ display: "flex", gap: 9, padding: "9px 12px", background: TONES.green.tint, borderRadius: 10 }}>
          <IconCheck size={14} style={{ color: TONES.green.text, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: TONES.green.text }}>No high-overlap pairs detected. This creator mix offers strong audience diversification.</span>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "audience-overlap-checker",
  title: "AudienceOverlapChecker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator audience overlap matrix — select up to 4 creators to see pairwise overlap %, estimated unique reach deduction, and warnings on high-overlap pairs.",
  description:
    "Helps brand managers build a creator roster that maximizes unique reach rather than overlapping audiences. Creator selector: 2-column grid, each card has avatar, name, followers, niche, click to toggle (black 2px border + check when selected). 3 KPI tiles: Combined reach (blue), Estimated unique reach (green), Overlap deducted % (yellow/red if high). Pairwise matrix: row × column grid of overlap percentages — self cells show '—' in gray; cells color-coded: green <15%, yellow 15–29%, red ≥30%. Each creator's avatar + first name as row and column header. Warning banners below: red alert for ≥30% overlap pairs (Priya × Ji-ho = 34% — both skincare creators in similar demographics, suggests replacing one); yellow info for 15–29% pairs (Priya × Amara 18%); green 'good diversity' banner when no high-overlap pairs. All 4 creators selected by default. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Audience overlap checker",
      description: "All 4 creators selected by default. Toggle any creator off to remove them from the matrix and recalculate. Red cells and banners flag the Priya × Ji-ho 34% skincare overlap.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
