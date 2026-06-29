"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCheck,
  IconCurrencyDollar,
  IconHeart,
  IconUsers,
  IconInfoCircle,
  IconTrendingUp,
  IconCopy,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PlatformKey = "instagram" | "tiktok" | "youtube";
type ContentKey  = "reel" | "story" | "post" | "video" | "short" | "ugc";

interface Platform {
  key: PlatformKey;
  label: string;
  icon: React.ElementType;
  tone: keyof typeof TONES;
}

interface ContentType {
  key: ContentKey;
  label: string;
  platforms: PlatformKey[];
  baseMultiplier: number;
}

const PLATFORMS: Platform[] = [
  { key: "instagram", label: "Instagram", icon: IconBrandInstagram, tone: "pink"  },
  { key: "tiktok",    label: "TikTok",    icon: IconBrandTiktok,    tone: "blue"  },
  { key: "youtube",   label: "YouTube",   icon: IconBrandYoutube,   tone: "red"   },
];

const CONTENT_TYPES: ContentType[] = [
  { key: "reel",   label: "Reel",           platforms: ["instagram"],          baseMultiplier: 1.2  },
  { key: "story",  label: "Story (×5)",      platforms: ["instagram"],          baseMultiplier: 0.4  },
  { key: "post",   label: "Feed post",       platforms: ["instagram"],          baseMultiplier: 0.85 },
  { key: "video",  label: "Dedicated video", platforms: ["tiktok","youtube"],   baseMultiplier: 1.0  },
  { key: "short",  label: "Short",           platforms: ["youtube"],            baseMultiplier: 0.6  },
  { key: "ugc",    label: "UGC (no post)",   platforms: ["instagram","tiktok"], baseMultiplier: 0.55 },
];

const ER_BONUS: Record<string, number> = {
  "< 1%":    0.7,
  "1–3%":    0.9,
  "3–5%":    1.0,
  "5–8%":    1.15,
  "8–12%":   1.3,
  "12%+":    1.5,
};

const EXCLUSIVITY: Record<string, number> = {
  "None":       1.0,
  "30 days":    1.25,
  "60 days":    1.5,
  "90 days":    1.8,
};

function formatMoney(n: number) {
  if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "K";
  return "$" + Math.round(n);
}

/* ---- Core calculation ---- */
function calcRate(followers: number, platform: PlatformKey, contentKey: ContentKey, erKey: string, exKey: string): { low: number; mid: number; high: number } {
  const baseCPM = platform === "youtube" ? 0.12 : platform === "tiktok" ? 0.04 : 0.06;
  const ct   = CONTENT_TYPES.find((c) => c.key === contentKey)!;
  const base = (followers / 1000) * baseCPM * 1000 * ct.baseMultiplier;
  const erM  = ER_BONUS[erKey]  ?? 1.0;
  const exM  = EXCLUSIVITY[exKey] ?? 1.0;
  const mid  = base * erM * exM;
  return { low: Math.round(mid * 0.75), mid: Math.round(mid), high: Math.round(mid * 1.35) };
}

/* ---- Demo ---- */
function Demo() {
  const [platform,    setPlatform]    = useState<PlatformKey>("instagram");
  const [followers,   setFollowers]   = useState(50000);
  const [erKey,       setErKey]       = useState("5–8%");
  const [contentKey,  setContentKey]  = useState<ContentKey>("reel");
  const [exKey,       setExKey]       = useState("None");
  const [calculated,  setCalculated]  = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [copied,      setCopied]      = useState(false);

  function handleCalc() {
    setCalculating(true);
    setTimeout(() => { setCalculating(false); setCalculated(true); }, 600);
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const filteredContent = CONTENT_TYPES.filter((c) => c.platforms.includes(platform));
  const rate = calculated ? calcRate(followers, platform, contentKey, erKey, exKey) : null;

  const FOLLOWER_STEPS = [1000,5000,10000,25000,50000,100000,250000,500000,1000000];
  const followerIdx = FOLLOWER_STEPS.findIndex((v) => v >= followers) ?? FOLLOWER_STEPS.length - 1;

  function fmtFollowers(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
    return String(n);
  }

  const tier =
    followers >= 1_000_000 ? { label: "Mega",  tone: "pink"   as const } :
    followers >= 500_000   ? { label: "Macro",  tone: "orange" as const } :
    followers >= 100_000   ? { label: "Mid",    tone: "purple" as const } :
    followers >= 10_000    ? { label: "Micro",  tone: "blue"   as const } :
                             { label: "Nano",   tone: "green"  as const };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800 }}>Rate calculator</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Find your fair market rate based on your stats</div>
      </div>

      {/* Platform */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Platform</div>
        <div style={{ display: "flex", gap: 6 }}>
          {PLATFORMS.map(({ key, label, icon: Icon, tone }) => (
            <button key={key} onClick={() => { setPlatform(key); setCalculated(false); setContentKey(filteredContent.find((c) => c.platforms.includes(key))?.key ?? "reel"); }}
              style={{ flex: 1, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", padding: "7px 10px", borderRadius: 9, background: platform === key ? TONES[tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${platform === key ? TONES[tone].text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: platform === key ? TONES[tone].text : "var(--sd-font-secondary,#555)" }}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Followers slider */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Follower count</div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>{fmtFollowers(followers)}</span>
            <Badge label={tier.label} tone={tier.tone} size="sm" />
          </div>
        </div>
        <input type="range" min={0} max={FOLLOWER_STEPS.length - 1} step={1} value={followerIdx < 0 ? FOLLOWER_STEPS.length - 1 : followerIdx}
          onChange={(e) => { setFollowers(FOLLOWER_STEPS[Number(e.target.value)]); setCalculated(false); }}
          style={{ width: "100%", accentColor: TONES[tier.tone].text }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 2 }}>
          <span>1K</span><span>1M+</span>
        </div>
      </div>

      {/* ER */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Avg engagement rate</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {Object.keys(ER_BONUS).map((key) => (
            <button key={key} onClick={() => { setErKey(key); setCalculated(false); }}
              style={{ padding: "4px 9px", borderRadius: 7, background: erKey === key ? TONES.green.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${erKey === key ? TONES.green.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: erKey === key ? 700 : 500, color: erKey === key ? TONES.green.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Content type */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Content type</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {filteredContent.map(({ key, label }) => (
            <button key={key} onClick={() => { setContentKey(key); setCalculated(false); }}
              style={{ padding: "4px 9px", borderRadius: 7, background: contentKey === key ? TONES.blue.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${contentKey === key ? TONES.blue.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: contentKey === key ? 700 : 500, color: contentKey === key ? TONES.blue.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Exclusivity */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Exclusivity window</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {Object.keys(EXCLUSIVITY).map((key) => (
            <button key={key} onClick={() => { setExKey(key); setCalculated(false); }}
              style={{ padding: "4px 9px", borderRadius: 7, background: exKey === key ? TONES.orange.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${exKey === key ? TONES.orange.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: exKey === key ? 700 : 500, color: exKey === key ? TONES.orange.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
              {key}
            </button>
          ))}
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={handleCalc} disabled={calculating || calculated} style={{ width: "100%", marginBottom: 14 }}
        leftIcon={calculated ? <IconCheck size={11} /> : <IconTrendingUp size={11} />}>
        {calculating ? "Calculating…" : calculated ? "Result up to date" : "Calculate my rate"}
      </Button>

      {/* Result */}
      {rate && (
        <div style={{ padding: "14px", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 12, border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Suggested rate range</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 12 }}>
            {[
              { label: "Conservative",  value: formatMoney(rate.low),  tone: "gray"   as const, sub: "floor" },
              { label: "Market rate",   value: formatMoney(rate.mid),  tone: "blue"   as const, sub: "recommended" },
              { label: "Premium",       value: formatMoney(rate.high), tone: "orange" as const, sub: "ceiling" },
            ].map(({ label, value, tone, sub }) => (
              <div key={label} style={{ padding: "10px 10px", background: TONES[tone].tint, borderRadius: 9, textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
                <div style={{ fontSize: 9, color: TONES[tone].text, fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: 8, color: TONES[tone].text, opacity: 0.65 }}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 10, lineHeight: 1.5, display: "flex", gap: 6 }}>
            <IconInfoCircle size={11} style={{ flexShrink: 0, marginTop: 1 }} />
            Based on {fmtFollowers(followers)} followers, {erKey} ER, {CONTENT_TYPES.find((c) => c.key === contentKey)?.label} on {platform}, {exKey.toLowerCase()} exclusivity.
          </div>
          <Button variant="secondary" size="sm" leftIcon={copied ? <IconCheck size={11} /> : <IconCopy size={11} />} onClick={handleCopy} style={{ width: "100%" }}>
            {copied ? "Rate copied to clipboard!" : `Copy rate: ${formatMoney(rate.mid)}`}
          </Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-earnings-calculator",
  title: "CreatorEarningsCalculator",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator rate calculator — platform selector, follower slider with tier badge, ER chips, content-type chips, exclusivity window chips, and a 3-column result (conservative/market/premium) with copy CTA.",
  description:
    "Creators use this to find their fair market rate before entering negotiations. Platform selector: IG/TikTok/YouTube with icon + tinted active state (content type chips filter to platform). Follower slider: 9 steps (1K→1M) with live count display + tier badge (Nano green / Micro blue / Mid purple / Macro orange / Mega pink) updating as you drag. Engagement rate chips: 6 bands (< 1% / 1–3% / 3–5% / 5–8% / 8–12% / 12%+) in green tint when active. Content type chips: filter by platform (IG: Reel/Story/Post/UGC; TikTok: Video/UGC; YouTube: Video/Short). Exclusivity: None/30/60/90 days in orange tint — higher exclusivity multiplies the rate. Calculate button disabled when up to date. Result card: 3 tiles (Conservative gray / Market rate blue recommended / Premium orange), each with label + tier word. Info line summarizing inputs. 'Copy rate: $N' CTA → 2s 'Rate copied!' confirmation. Pre-seeded: Instagram, 50K followers (Micro), 5–8% ER, Reel, No exclusivity. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator rate calculator",
      description: "Select a platform, drag the follower slider, pick your ER band and content type, then click Calculate. Add exclusivity to see the rate bump.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
