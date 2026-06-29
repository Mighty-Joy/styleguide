"use client";

import React from "react";
import {
  IconBrandInstagram,
  IconUsers,
  IconHeart,
  IconEye,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Sub-components                                                        */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)",
      textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

function BarRow({
  label, pct, value, color,
}: { label: string; pct: number; value: string; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>{value}</span>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: "var(--sd-bg-tertiary)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: color, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function TwoBarGender({ mPct, fPct }: { mPct: number; fPct: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <BarRow label={`Male · ${mPct}%`}   pct={mPct} value="" color={TONES.blue.solid} />
      <BarRow label={`Female · ${fPct}%`} pct={fPct} value="" color={TONES.pink.solid} />
    </div>
  );
}

function CountryRow({ flag, country, pct }: { flag: string; country: string; pct: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{flag}</span>
      <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", fontWeight: 500, width: 110, flexShrink: 0 }}>{country}</span>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: "var(--sd-bg-tertiary)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: TONES.purple.tint }} />
      </div>
      <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", width: 32, textAlign: "right", flexShrink: 0 }}>{pct}%</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo component                                                        */
/* ------------------------------------------------------------------ */

function AudienceInsightsDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "20px 0", maxWidth: 680 }}>
      {/* Creator header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)" }}>
        <Avatar name="Priya Nair" tone="purple" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--sd-text-md)", fontWeight: 700, color: "var(--sd-font-primary)" }}>Priya Nair</div>
          <div style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-creator-handle)", fontWeight: 500, marginTop: 2 }}>@priya.creates</div>
        </div>
        <Badge label="Instagram" icon={IconBrandInstagram} tone="pink" variant="status" size="md" />
      </div>

      {/* Key metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <StatCard label="Total Followers" value="128K" icon={IconUsers}  tone="purple" trend={2.1} trendLabel="MoM" />
        <StatCard label="Avg Engagement"  value="4.6%" icon={IconHeart}  tone="pink"   trend={0.3}              />
        <StatCard label="Est. Reach / Post" value="22K" icon={IconEye}  tone="blue"                            />
      </div>

      {/* Demographics grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Age breakdown */}
        <div style={{ padding: "16px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Age breakdown</SectionLabel>
          <BarRow label="18 – 24" pct={42} value="42%" color={TONES.purple.solid}  />
          <BarRow label="25 – 34" pct={31} value="31%" color={TONES.purple.solid}  />
          <BarRow label="35 – 44" pct={17} value="17%" color={TONES.purple.tint}   />
          <BarRow label="45 +"    pct={10} value="10%" color={TONES.purple.tint}   />
        </div>

        {/* Gender split */}
        <div style={{ padding: "16px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Gender split</SectionLabel>
          <TwoBarGender mPct={28} fPct={72} />
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: TONES.blue.solid }} />
              <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)" }}>Male 28%</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: TONES.pink.solid }} />
              <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)" }}>Female 72%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top countries */}
      <div style={{ padding: "16px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>Top countries</SectionLabel>
        <CountryRow flag="🇺🇸" country="United States" pct={48} />
        <CountryRow flag="🇨🇦" country="Canada"        pct={18} />
        <CountryRow flag="🇬🇧" country="United Kingdom" pct={12} />
        <CountryRow flag="🇦🇺" country="Australia"     pct={9}  />
        <CountryRow flag="🇫🇷" country="France"        pct={6}  />
      </div>

      {/* Content performance */}
      <div style={{ padding: "16px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>Content performance (30 days)</SectionLabel>
        <BarRow label="Reels"  pct={88} value="12.4K avg views" color={TONES.purple.solid} />
        <BarRow label="Stories" pct={54} value="6.2K avg views"  color={TONES.purple.solid} />
        <BarRow label="Posts"  pct={40} value="4.8K avg likes"  color={TONES.purple.tint}  />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "audience-insights",
  title: "Audience Insights",
  group: "Patterns",
  status: "stable",
  summary: "Creator audience demographics panel — age breakdown, gender split, top countries, and content performance bars.",
  description:
    "Audience Insights surfaces the demographic makeup and content performance data for a single creator. Designed to sit inside a CreatorPanel tab or a standalone drawer. Uses StatCards for the key reach/engagement KPIs, and horizontal bar charts (pure CSS) for all demographic breakdowns.",
  demos: [
    {
      title: "Priya Nair — beauty & lifestyle",
      render: () => <AudienceInsightsDemo />,
    },
  ],
  props: [],
};

export default doc;
