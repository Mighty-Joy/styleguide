"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconX,
  IconCheck,
  IconTrophy,
  IconSend,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface Creator {
  id: string;
  name: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple";
  tier: string;
  tierTone: keyof typeof TONES;
  followers: number;
  er: number;
  avgReach: number;
  pastBrands: number;
  rateMin: number;
  rateMax: number;
  niche: string;
  audienceAge: string;
  platforms: string;
}

const POOL: Creator[] = [
  { id: "c1", name: "Priya Nair",   initials: "PN", tone: "pink",   tier: "Micro",  tierTone: "blue",   followers: 71000,  er: 9.2,  avgReach: 39000, pastBrands: 12, rateMin: 1400, rateMax: 2000, niche: "Clean beauty",      audienceAge: "25–34", platforms: "IG + TikTok"   },
  { id: "c2", name: "Ji-ho Kim",    initials: "JK", tone: "blue",   tier: "Micro",  tierTone: "blue",   followers: 88000,  er: 7.4,  avgReach: 48000, pastBrands: 8,  rateMin: 1200, rateMax: 1700, niche: "K-beauty",           audienceAge: "18–28", platforms: "IG + TikTok"   },
  { id: "c3", name: "Tobias Müller",initials: "TM", tone: "orange", tier: "Mid",    tierTone: "purple", followers: 148000, er: 5.1,  avgReach: 75000, pastBrands: 21, rateMin: 2200, rateMax: 3500, niche: "Fitness & wellness",  audienceAge: "22–38", platforms: "Instagram"     },
  { id: "c4", name: "Sofia Reyes",  initials: "SR", tone: "purple", tier: "Micro",  tierTone: "blue",   followers: 53000,  er: 11.8, avgReach: 29000, pastBrands: 5,  rateMin: 1100, rateMax: 1600, niche: "Skincare",            audienceAge: "20–30", platforms: "TikTok"        },
  { id: "c5", name: "Marcus Webb",  initials: "MW", tone: "green",  tier: "Micro",  tierTone: "blue",   followers: 62000,  er: 6.8,  avgReach: 34000, pastBrands: 15, rateMin: 1300, rateMax: 1900, niche: "Lifestyle & fitness", audienceAge: "24–35", platforms: "IG + YouTube"  },
];

const METRICS: { key: keyof Creator; label: string; fmt: (v: number | string) => string; higher: boolean }[] = [
  { key: "followers",  label: "Followers",     fmt: (v) => (Number(v) >= 1000 ? (Number(v)/1000).toFixed(0)+"K" : String(v)), higher: true  },
  { key: "er",         label: "Avg ER",        fmt: (v) => Number(v).toFixed(1)+"%",                                          higher: true  },
  { key: "avgReach",   label: "Avg reach",     fmt: (v) => (Number(v)/1000).toFixed(0)+"K",                                   higher: true  },
  { key: "pastBrands", label: "Past brands",   fmt: (v) => String(v),                                                         higher: true  },
  { key: "rateMin",    label: "Rate (from)",   fmt: (v) => "$"+Number(v).toLocaleString(),                                    higher: false },
];

function Demo() {
  const [selected,  setSelected]  = useState<string[]>(["c1","c4","c2"]);
  const [winner,    setWinner]    = useState<string | null>(null);
  const [invited,   setInvited]   = useState(false);
  const [addOpen,   setAddOpen]   = useState(false);

  const creators = selected.map((id) => POOL.find((c) => c.id === id)!);

  function remove(id: string) { setSelected((p) => p.filter((x) => x !== id)); setWinner(null); }
  function add(id: string) { setSelected((p) => [...p, id]); setAddOpen(false); }
  function invite() { setInvited(true); setTimeout(() => setInvited(false), 2500); }

  const available = POOL.filter((c) => !selected.includes(c.id));

  // Per-metric: find best value
  function getBest(metric: typeof METRICS[number]) {
    const vals = creators.map((c) => Number(c[metric.key]));
    const best = metric.higher ? Math.max(...vals) : Math.min(...vals);
    return best;
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>Creator comparison</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Compare up to 3 shortlisted creators side by side</div>
      </div>

      {/* Comparison table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          {/* Creator headers */}
          <thead>
            <tr>
              <td style={{ width: 90, paddingBottom: 10 }} />
              {creators.map((c) => (
                <td key={c.id} style={{ paddingBottom: 10, textAlign: "center", verticalAlign: "top" }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    {winner === c.id && (
                      <div style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: 99, background: TONES.yellow.text, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                        <IconTrophy size={10} style={{ color: "#fff" }} />
                      </div>
                    )}
                    <Avatar initials={c.initials} tone={c.tone} size="md" />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, marginTop: 5 }}>{c.name.split(" ")[0]}</div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 3, marginBottom: 4 }}>
                    <Badge label={c.tier} tone={c.tierTone} size="sm" />
                  </div>
                  <button onClick={() => remove(c.id)}
                    style={{ width: 22, height: 22, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                    <IconX size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                  </button>
                </td>
              ))}
              {selected.length < 3 && (
                <td style={{ textAlign: "center", verticalAlign: "top", paddingBottom: 10 }}>
                  <button onClick={() => setAddOpen(!addOpen)}
                    style={{ width: 40, height: 40, borderRadius: 99, border: "1.5px dashed var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                    <IconPlus size={14} style={{ color: "var(--sd-font-tertiary,#bbb)" }} />
                  </button>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#bbb)", marginTop: 5 }}>Add</div>
                </td>
              )}
            </tr>
          </thead>

          {/* Metric rows */}
          <tbody>
            {METRICS.map((metric, i) => {
              const best = getBest(metric);
              return (
                <tr key={metric.key} style={{ background: i % 2 === 0 ? "var(--sd-bg-secondary,#f9f9f9)" : "white" }}>
                  <td style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary,#999)", padding: "9px 8px 9px 0", whiteSpace: "nowrap" }}>{metric.label}</td>
                  {creators.map((c) => {
                    const val = Number(c[metric.key]);
                    const isBest = val === best;
                    return (
                      <td key={c.id} style={{ textAlign: "center", padding: "9px 6px" }}>
                        <span style={{ fontSize: 12, fontWeight: isBest ? 900 : 600, color: isBest ? TONES.green.text : "var(--sd-font-primary,#111)", background: isBest ? TONES.green.tint : "transparent", padding: isBest ? "2px 7px" : "2px 0", borderRadius: 5 }}>
                          {metric.fmt(val)}
                        </span>
                      </td>
                    );
                  })}
                  {selected.length < 3 && <td />}
                </tr>
              );
            })}
            {/* Niche + audience rows (text, no winner) */}
            {[
              { label: "Niche",    key: "niche"       as const },
              { label: "Age",      key: "audienceAge" as const },
              { label: "Platform", key: "platforms"   as const },
            ].map((row, i) => (
              <tr key={row.key} style={{ background: (METRICS.length + i) % 2 === 0 ? "var(--sd-bg-secondary,#f9f9f9)" : "white" }}>
                <td style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary,#999)", padding: "9px 8px 9px 0" }}>{row.label}</td>
                {creators.map((c) => (
                  <td key={c.id} style={{ textAlign: "center", padding: "9px 6px", fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>
                    {c[row.key] as string}
                  </td>
                ))}
                {selected.length < 3 && <td />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add creator picker */}
      {addOpen && available.length > 0 && (
        <div style={{ marginTop: 10, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
          {available.map((c) => (
            <button key={c.id} onClick={() => add(c.id)}
              style={{ width: "100%", display: "flex", gap: 9, alignItems: "center", padding: "9px 12px", background: "white", border: "none", borderBottom: "1px solid var(--sd-border-default,#e5e7eb)", cursor: "pointer", textAlign: "left" }}>
              <Avatar initials={c.initials} tone={c.tone} size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{c.niche} · {c.er}% ER</div>
              </div>
              <Badge label={c.tier} tone={c.tierTone} size="sm" />
            </button>
          ))}
        </div>
      )}

      {/* Winner select + invite */}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Select winner to invite</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {creators.map((c) => (
            <button key={c.id} onClick={() => setWinner(c.id)}
              style={{ flex: 1, padding: "7px 0", borderRadius: 9, background: winner === c.id ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: winner === c.id ? "#fff" : "var(--sd-font-secondary,#555)", display: "flex", gap: 5, alignItems: "center", justifyContent: "center" }}>
              {winner === c.id && <IconCheck size={11} />}{c.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <Button variant="primary" size="sm" leftIcon={invited ? <IconCheck size={11} /> : <IconSend size={11} />}
          onClick={invite} disabled={!winner || invited} style={{ width: "100%" }}>
          {invited ? "Invite sent!" : winner ? `Invite ${POOL.find((c) => c.id === winner)?.name.split(" ")[0]}` : "Select a creator to invite"}
        </Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-creator-compare",
  title: "BrandCreatorCompare",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Side-by-side creator comparison table — up to 3 columns with Avatar, tier badge, 5 metric rows (best value highlighted green), text rows for niche/audience/platform, winner selector, and Invite CTA.",
  description:
    "Brand compares shortlisted creators before selecting one to invite. Up to 3 creator columns: Avatar md with trophy badge for winner, first name, tier badge, X to remove. Metric rows (alternating row bg): Followers, Avg ER, Avg reach, Past brands, Rate from — best value per row highlighted green tint + bold. Text rows: Niche, Audience age, Platform (no winner highlight). Dashed '+' cell to add a 4th creator from the remaining pool → picker dropdown with Avatar sm, name, niche, ER, tier badge. Winner-select row below table: 3 pill buttons, selected turns #111 black with check; 'Invite [name]' primary CTA enables once winner chosen → 2.5s 'Invite sent!'. Pre-loaded: Priya Nair vs Sofia Reyes vs Ji-ho Kim. Priya best in ER (9.2%), Sofia best in ER (11.8%), Ji-ho highest reach. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator comparison",
      description: "Remove a creator with ×. Click '+' to add another from the pool. Green highlights the best value per metric row. Select a winner and click Invite.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
