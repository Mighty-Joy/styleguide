"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconUsers,
  IconHeart,
  IconEye,
  IconRefresh,
  IconLock,
  IconShare,
  IconChevronDown,
  IconChevronUp,
  IconMapPin,
  IconCalendar,
  IconCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- static data ---- */
const AGE_BUCKETS = [
  { label: "13–17", pct: 4  },
  { label: "18–24", pct: 28 },
  { label: "25–34", pct: 41 },
  { label: "35–44", pct: 18 },
  { label: "45–54", pct: 6  },
  { label: "55+",   pct: 3  },
];

const COUNTRIES = [
  { flag: "🇺🇸", name: "United States", pct: 62 },
  { flag: "🇬🇧", name: "United Kingdom", pct: 12 },
  { flag: "🇨🇦", name: "Canada",         pct: 8  },
  { flag: "🇦🇺", name: "Australia",      pct: 6  },
  { flag: "🇮🇳", name: "India",          pct: 5  },
  { flag: "🇩🇪", name: "Germany",        pct: 3  },
  { flag: "🇫🇷", name: "France",         pct: 2  },
  { flag: "🌍",  name: "Other",          pct: 2  },
];

const INTERESTS = [
  "Skincare", "Clean beauty", "Wellness", "Fitness", "Nutrition",
  "Sustainable living", "Home & lifestyle", "Fashion", "Travel", "Mindfulness",
];

const PLATFORM_STATS = [
  {
    platform: "instagram", icon: IconBrandInstagram, tone: "pink" as const,
    handle: "@priya.glow", followers: "248K", er: "8.6%",
    avgReach: "62K", avgViews: "91K", posts: 312,
  },
  {
    platform: "tiktok", icon: IconBrandTiktok, tone: "blue" as const,
    handle: "@priya_nair", followers: "91K", er: "6.2%",
    avgReach: "38K", avgViews: "114K", posts: 87,
  },
];

type Section = "demographics" | "audience" | "platforms";

/* ---- Demo ---- */
function Demo() {
  const [sections,  setSections] = useState<Set<Section>>(new Set(["demographics", "platforms"]));
  const [shared,    setShared]   = useState(false);
  const [sharing,   setSharing]  = useState(false);

  function toggle(s: Section) {
    setSections((prev) => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  }

  function share() {
    setSharing(true);
    setTimeout(() => { setSharing(false); setShared(true); }, 900);
  }

  const femPct = 72; const malePct = 26; const otherPct = 2;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Audience insights</div>
          <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
            <Badge label="Mumbai, India" tone="gray" size="sm" />
            <Badge label="Updated Jun 28" tone="blue" size="sm" dot />
            <Badge label="Data from Instagram" tone="pink" size="sm" />
          </div>
        </div>
        <Button variant={shared ? "primary" : "secondary"} size="sm"
          leftIcon={shared ? <IconCheck size={11} /> : <IconShare size={11} />}
          onClick={share} disabled={sharing}>
          {shared ? "Shared!" : sharing ? "Sharing…" : "Share with brand"}
        </Button>
      </div>

      {/* Platform cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {PLATFORM_STATS.map((p) => {
          const PIcon = p.icon;
          return (
            <div key={p.platform} style={{ padding: "11px 13px", background: TONES[p.tone].tint, borderRadius: 11 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
                <PIcon size={14} style={{ color: TONES[p.tone].text }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: TONES[p.tone].text }}>{p.handle}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                {[
                  { label: "Followers", value: p.followers },
                  { label: "Avg ER",    value: p.er        },
                  { label: "Avg reach", value: p.avgReach  },
                  { label: "Avg views", value: p.avgViews  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: TONES[p.tone].text }}>{value}</div>
                    <div style={{ fontSize: 9, color: TONES[p.tone].text, opacity: 0.7 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Demographics section */}
      <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
        <button onClick={() => toggle("demographics")}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <IconUsers size={14} style={{ color: "var(--sd-font-secondary,#555)" }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>Demographics</span>
          </div>
          {sections.has("demographics") ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>

        {sections.has("demographics") && (
          <div style={{ padding: "0 14px 14px", borderTop: "1px solid var(--sd-border-default,#e5e7eb)" }}>
            {/* Gender */}
            <div style={{ marginBottom: 14, paddingTop: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 8, color: "var(--sd-font-secondary,#555)" }}>Gender</div>
              <div style={{ height: 12, borderRadius: 6, overflow: "hidden", display: "flex" }}>
                <div style={{ width: `${femPct}%`, background: TONES.pink.text, transition: "width 0.5s" }} />
                <div style={{ width: `${malePct}%`, background: TONES.blue.text }} />
                <div style={{ flex: 1, background: TONES.gray.text + "60" }} />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                {[
                  { label: "Female", pct: femPct, tone: "pink" as const },
                  { label: "Male",   pct: malePct, tone: "blue" as const },
                  { label: "Other",  pct: otherPct, tone: "gray" as const },
                ].map(({ label, pct, tone }) => (
                  <div key={label} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: TONES[tone].text, flexShrink: 0 }} />
                    <span style={{ fontSize: 10 }}>{label} <strong>{pct}%</strong></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 8, color: "var(--sd-font-secondary,#555)" }}>Age</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {AGE_BUCKETS.map(({ label, pct }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 36, fontSize: 10, color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }}>{label}</div>
                    <div style={{ flex: 1, height: 6, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: pct === Math.max(...AGE_BUCKETS.map(b => b.pct)) ? TONES.purple.text : TONES.purple.text + "80", borderRadius: 3, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ width: 28, fontSize: 10, fontWeight: pct >= 30 ? 800 : 500, textAlign: "right", color: pct >= 30 ? "#111" : "var(--sd-font-tertiary,#999)", flexShrink: 0 }}>{pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top countries */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 8, color: "var(--sd-font-secondary,#555)" }}>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <IconMapPin size={11} />Top countries
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {COUNTRIES.map(({ flag, name, pct }) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, flexShrink: 0 }}>{flag}</span>
                    <div style={{ flex: 1, height: 5, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: TONES.sky.text, borderRadius: 3 }} />
                    </div>
                    <div style={{ width: 70, display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>{name}</span>
                      <span style={{ fontSize: 10, fontWeight: 700 }}>{pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interests section */}
      <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
        <button onClick={() => toggle("audience")}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <IconHeart size={14} style={{ color: "var(--sd-font-secondary,#555)" }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>Top interests</span>
          </div>
          {sections.has("audience") ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>

        {sections.has("audience") && (
          <div style={{ padding: "10px 14px 14px", borderTop: "1px solid var(--sd-border-default,#e5e7eb)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {INTERESTS.map((interest, i) => (
                <span key={interest} style={{ padding: "4px 10px", borderRadius: 99, background: i < 3 ? TONES.green.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${i < 3 ? TONES.green.text + "40" : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 11, fontWeight: i < 3 ? 700 : 500, color: i < 3 ? TONES.green.text : "var(--sd-font-secondary,#555)" }}>
                  {interest}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 8 }}>Top 3 highlighted — highest audience overlap with campaign niches</div>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <div style={{ display: "flex", gap: 7, padding: "8px 11px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 9 }}>
        <IconLock size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", lineHeight: 1.5 }}>
          Sharing sends an anonymized snapshot. No individual follower data is shared. You control what brands can see in Privacy settings.
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-insights-panel",
  title: "CreatorInsightsPanel",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's shareable audience insight snapshot — 2 platform stat cards (IG/TikTok), gender split bar, age distribution bars, top 8 countries, interest chips, privacy note, Share with brand CTA.",
  description:
    "The demographic and performance data a creator shares with a brand during discovery or vetting. Header: Mumbai, India badge + 'Updated Jun 28' blue dot badge + 'Data from Instagram' badge. Share with brand CTA → 'Sharing…' → 'Shared!' green. Two platform cards side-by-side: Instagram (pink tint, @priya.glow, 248K followers, 8.6% ER, 62K avg reach, 91K avg views) and TikTok (blue tint, @priya_nair, 91K followers, 6.2% ER, 38K avg reach, 114K avg views). Demographics accordion (pre-expanded): gender split segmented bar (72% female pink / 26% male blue / 2% other) with legend; age bars for 6 buckets (25–34 at 41% is heaviest, bold); 8 country rows with flag emoji + horizontal bar + percentage (US 62% dominant). Interests accordion (collapsed by default): 10 interest chips with top 3 (Skincare/Clean beauty/Wellness) in green tint as most relevant. Bottom: privacy note with lock icon — anonymized snapshot, no individual data. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator audience insights",
      description: "Click section headers to collapse/expand Demographics and Top interests. Click 'Share with brand' to simulate sharing the panel.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
