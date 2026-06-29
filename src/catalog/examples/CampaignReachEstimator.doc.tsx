"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconMinus,
  IconUsers,
  IconEye,
  IconHeart,
  IconRefresh,
  IconBrandInstagram,
  IconBrandTiktok,
  IconCheck,
  IconTrendingUp,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Tier = "nano" | "micro" | "mid" | "macro" | "mega";
type Platform = "instagram" | "tiktok" | "both";

interface TierConfig {
  key: Tier;
  label: string;
  range: string;
  avgFollowers: number;
  avgER: number;
  avgFee: number;
  tone: keyof typeof TONES;
}

const TIERS: TierConfig[] = [
  { key: "nano",  label: "Nano",  range: "1K–10K",    avgFollowers: 5000,    avgER: 9.5, avgFee: 200,   tone: "green"  },
  { key: "micro", label: "Micro", range: "10K–100K",  avgFollowers: 50000,   avgER: 6.5, avgFee: 800,   tone: "blue"   },
  { key: "mid",   label: "Mid",   range: "100K–500K", avgFollowers: 250000,  avgER: 4.8, avgFee: 2500,  tone: "purple" },
  { key: "macro", label: "Macro", range: "500K–1M",   avgFollowers: 750000,  avgER: 3.2, avgFee: 7500,  tone: "orange" },
  { key: "mega",  label: "Mega",  range: "1M+",       avgFollowers: 2500000, avgER: 2.1, avgFee: 25000, tone: "pink"   },
];

const CONTENT_MULTIPLIERS: Record<string, { reach: number; fee: number; label: string }> = {
  reel:    { reach: 1.4,  fee: 1.2,  label: "Reel (IG)"    },
  tiktok:  { reach: 1.6,  fee: 1.0,  label: "TikTok video" },
  story:   { reach: 0.6,  fee: 0.4,  label: "Story"        },
  post:    { reach: 1.0,  fee: 0.8,  label: "Feed post"    },
  ugc:     { reach: 0.0,  fee: 0.6,  label: "UGC only"     },
};

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}
function fmtMoney(n: number) {
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(0) + "K";
  return "$" + n.toLocaleString();
}

/* ---- Demo ---- */
function Demo() {
  const [counts, setCounts] = useState<Record<Tier, number>>({ nano: 0, micro: 3, mid: 1, macro: 0, mega: 0 });
  const [contentType, setContentType] = useState("reel");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [calculating, setCalculating] = useState(false);
  const [calculated, setCalculated] = useState(true);

  function changeCount(tier: Tier, delta: number) {
    setCounts((prev) => ({ ...prev, [tier]: Math.max(0, prev[tier] + delta) }));
    setCalculated(false);
  }

  function calculate() {
    setCalculating(true);
    setTimeout(() => { setCalculating(false); setCalculated(true); }, 700);
  }

  const mult = CONTENT_MULTIPLIERS[contentType];
  const totalCreators = Object.values(counts).reduce((s, v) => s + v, 0);

  const projectedReach = TIERS.reduce((s, t) => {
    const reachRate = platform === "both" ? 1.3 : 1.0;
    return s + counts[t.key] * t.avgFollowers * 0.55 * mult.reach * reachRate;
  }, 0);
  const projectedImpressions = projectedReach * 1.45;
  const projectedER = totalCreators > 0
    ? TIERS.reduce((s, t) => s + counts[t.key] * t.avgER, 0) / totalCreators
    : 0;
  const projectedEngagements = projectedImpressions * (projectedER / 100);
  const feeLow  = TIERS.reduce((s, t) => s + counts[t.key] * t.avgFee * mult.fee * 0.8, 0);
  const feeHigh = TIERS.reduce((s, t) => s + counts[t.key] * t.avgFee * mult.fee * 1.2, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800 }}>Campaign reach estimator</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Plan your creator mix before launching</div>
      </div>

      {/* Platform + content type */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Platform</div>
          <div style={{ display: "flex", gap: 5 }}>
            {([["instagram","IG",IconBrandInstagram,"pink"],["tiktok","TikTok",IconBrandTiktok,"blue"],["both","Both","","gray"]] as const).map(([key, label, Icon, tone]) => (
              <button key={key} onClick={() => { setPlatform(key as Platform); setCalculated(false); }}
                style={{ flex: 1, padding: "5px 6px", borderRadius: 8, background: platform === key ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, color: platform === key ? "#fff" : "var(--sd-font-secondary,#555)", display: "flex", gap: 4, alignItems: "center", justifyContent: "center" }}>
                {Icon && <Icon size={10} />}{label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Content type</div>
          <select value={contentType} onChange={(e) => { setContentType(e.target.value); setCalculated(false); }}
            style={{ width: "100%", padding: "6px 8px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit" }}>
            {Object.entries(CONTENT_MULTIPLIERS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tier counts */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Creator mix</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TIERS.map((t) => (
            <div key={t.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 52, flexShrink: 0 }}>
                <Badge label={t.label} tone={t.tone} size="sm" />
              </div>
              <div style={{ width: 72, fontSize: 10, color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }}>{t.range}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <button onClick={() => changeCount(t.key, -1)} disabled={counts[t.key] === 0}
                  style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: counts[t.key] === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: counts[t.key] === 0 ? 0.4 : 1 }}>
                  <IconMinus size={11} />
                </button>
                <div style={{ width: 28, textAlign: "center", fontSize: 13, fontWeight: 900 }}>{counts[t.key]}</div>
                <button onClick={() => changeCount(t.key, 1)}
                  style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconPlus size={11} />
                </button>
              </div>
              <div style={{ flex: 1, height: 4, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 2 }}>
                {counts[t.key] > 0 && (
                  <div style={{ width: `${Math.min(counts[t.key] * 20, 100)}%`, height: "100%", background: TONES[t.tone].text, borderRadius: 2 }} />
                )}
              </div>
              <div style={{ width: 60, fontSize: 10, color: "var(--sd-font-tertiary,#999)", textAlign: "right", flexShrink: 0 }}>
                ~{fmtMoney(t.avgFee * mult.fee)}/ea
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="primary" size="sm" style={{ width: "100%", marginBottom: 14 }}
        onClick={calculate} disabled={totalCreators === 0 || calculating || calculated}
        leftIcon={calculated ? <IconCheck size={11} /> : <IconTrendingUp size={11} />}>
        {calculating ? "Calculating…" : calculated ? "Up to date" : "Calculate projections"}
      </Button>

      {/* Projections */}
      {calculated && totalCreators > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Projections — {totalCreators} creator{totalCreators !== 1 ? "s" : ""} · {mult.label}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[
              { label: "Est. reach",        value: fmt(projectedReach),       tone: "blue"   as const, icon: IconUsers       },
              { label: "Est. impressions",  value: fmt(projectedImpressions), tone: "purple" as const, icon: IconEye         },
              { label: "Avg ER",            value: projectedER.toFixed(1) + "%", tone: "green" as const, icon: IconHeart    },
              { label: "Est. engagements",  value: fmt(projectedEngagements), tone: "orange" as const, icon: IconHeart       },
            ].map(({ label, value, tone, icon: Icon }) => (
              <div key={label} style={{ padding: "10px 12px", background: TONES[tone].tint, borderRadius: 10 }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
                  <Icon size={12} style={{ color: TONES[tone].text }} />
                  <span style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.75 }}>{label}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
            <IconCurrencyDollar size={14} style={{ color: TONES.gray.text, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>Estimated budget</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Creator fees only, based on market rates</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 900 }}>{fmtMoney(feeLow)}–{fmtMoney(feeHigh)}</div>
          </div>
        </div>
      )}
      {totalCreators === 0 && (
        <div style={{ padding: "20px", textAlign: "center", color: "var(--sd-font-tertiary,#999)", fontSize: 11 }}>
          Add creators above to see projections
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-reach-estimator",
  title: "CampaignReachEstimator",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Pre-launch campaign planner — 5 creator tier rows with +/− counters, platform + content type selectors, and live projection tiles (reach, impressions, avg ER, engagements, budget range).",
  description:
    "Brand estimates campaign performance before selecting creators. Platform selector (IG/TikTok/Both). Content type dropdown (Reel 1.4× reach / TikTok 1.6× / Story 0.6× / Post 1× / UGC 0). 5 tier rows (Nano 1K–10K / Micro 10K–100K / Mid 100K–500K / Macro 500K–1M / Mega 1M+): each has tier badge, follower range, +/− counter, thin progress bar filling per count (max 5), est. fee per creator. Calculate button disabled when no creators or already up to date. Projection grid: 4 tinted tiles — reach (blue), impressions (purple), avg ER (green), estimated engagements (orange). Budget range row in gray: market-rate low–high. Pre-seeded: 3 Micro + 1 Mid (IG Reel). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign reach estimator",
      description: "Adjust the creator mix with +/− buttons. Change platform or content type, then click 'Calculate projections' to update the projection tiles.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
