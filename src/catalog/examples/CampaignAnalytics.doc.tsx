"use client";

import React, { useState } from "react";
import {
  IconEye,
  IconHeart,
  IconClick,
  IconCurrencyDollar,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconUsers,
  IconCircleCheck,
  IconClock,
  IconPhoto,
  IconVideo,
  IconTrendingUp,
  IconChevronDown,
  IconDownload,
  IconCalendar,
} from "@tabler/icons-react";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Mini sparkline (pure CSS/SVG bars — no lib)                          */
/* ------------------------------------------------------------------ */

function SparkBar({ values, tone = "blue", height = 40 }: { values: number[]; tone?: keyof typeof TONES; height?: number }) {
  const max = Math.max(...values);
  const t = TONES[tone];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {values.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 2,
          background: i === values.length - 1 ? t.solid : t.tint,
          height: `${(v / max) * 100}%`,
          minHeight: 3,
          transition: "height 0.3s",
        }} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut chart — SVG                                                     */
/* ------------------------------------------------------------------ */

function DonutChart({ slices }: { slices: { label: string; value: number; tone: keyof typeof TONES }[] }) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  let angle = -90;
  const r = 44, cx = 54, cy = 54, sw = 18;
  const segments = slices.map(s => {
    const pct = s.value / total;
    const deg = pct * 360;
    const start = angle;
    angle += deg;
    return { ...s, pct, start, deg };
  });

  function arc(startDeg: number, endDeg: number) {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <svg width={108} height={108} viewBox="0 0 108 108">
        {segments.map((s, i) => (
          <path key={i} d={arc(s.start, s.start + s.deg - 0.5)}
            fill="none" stroke={TONES[s.tone].solid} strokeWidth={sw}
            strokeLinecap="butt" />
        ))}
        <circle cx={cx} cy={cy} r={r - sw / 2 - 2} fill="var(--sd-bg-primary)" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--sd-font-primary)">{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="var(--sd-font-tertiary)">creators</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {segments.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: TONES[s.tone].solid, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "var(--sd-font-secondary)" }}>{s.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-primary)", marginLeft: "auto" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Platform breakdown row                                               */
/* ------------------------------------------------------------------ */

function PlatformRow({ icon: Icon, name, reach, pct, tone }: { icon: React.ElementType; name: string; reach: string; pct: number; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: "var(--sd-radius-sm)", background: t.tint, color: t.text, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{name}</span>
          <span style={{ fontSize: 12, color: "var(--sd-font-secondary)" }}>{reach}</span>
        </div>
        <div style={{ height: 4, background: "var(--sd-bg-secondary)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: t.solid, borderRadius: 2 }} />
        </div>
      </div>
      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", width: 36, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Creator performance table row                                        */
/* ------------------------------------------------------------------ */

function CreatorPerfRow({ name, handle, initials, tone, platform: PlatIcon, reach, eng, status }:
  { name: string; handle: string; initials: string; tone: keyof typeof TONES; platform: React.ElementType; reach: string; eng: string; status: "approved" | "pending" | "live" }) {
  const statusMeta = { approved: { label: "Approved", tone: "green" as const }, pending: { label: "Pending", tone: "yellow" as const }, live: { label: "Live", tone: "blue" as const } }[status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderBottom: "1px solid var(--sd-border-light)" }}>
      <Avatar initials={initials} tone={tone} size="md" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", display: "flex", alignItems: "center", gap: 3 }}>
          {handle} <PlatIcon size={10} />
        </div>
      </div>
      <span style={{ fontSize: 12, color: "var(--sd-font-secondary)", width: 56, textAlign: "right" }}>{reach}</span>
      <span style={{ fontSize: 12, color: "var(--sd-font-secondary)", width: 40, textAlign: "right" }}>{eng}</span>
      <Badge label={statusMeta.label} tone={statusMeta.tone} size="sm" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full CampaignAnalytics view                                           */
/* ------------------------------------------------------------------ */

type TabId = "overview" | "content" | "creators" | "spend";

function CampaignAnalyticsView() {
  const [tab, setTab] = useState<TabId>("overview");
  const [dateRange, setDateRange] = useState("Jun 1 – Jun 30");

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview",  label: "Overview"  },
    { id: "content",   label: "Content"   },
    { id: "creators",  label: "Creators"  },
    { id: "spend",     label: "Spend"     },
  ];

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)" }}>Atlas X Summer</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2 }}>12 creators · Jun 1 – Jun 30, 2025</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconCalendar size={12} />} rightIcon={<IconChevronDown size={11} />}>
            {dateRange}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>
            Export
          </Button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ borderBottom: "1px solid var(--sd-border-light)", padding: "0 16px" }}>
        <Tabs
          tabs={TABS.map(t => ({ label: t.label, value: t.id }))}
          value={tab}
          onChange={(v) => setTab(v as TabId)}
          variant="underline"
        />
      </div>

      {/* Tab body */}
      <div style={{ padding: 16 }}>

        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              <StatCard label="Total reach"    value="2.4M"  icon={IconEye}            tone="blue"   trend={18.2} trendLabel="vs goal" />
              <StatCard label="Engagements"    value="184K"  icon={IconHeart}          tone="pink"   trend={6.4}  trendLabel="vs avg" />
              <StatCard label="Link clicks"    value="31.2K" icon={IconClick}          tone="turquoise" trend={22.5} />
              <StatCard label="Total spend"    value="$42K"  icon={IconCurrencyDollar} tone="green"  secondary="of $50K budget" trend={-16.0} trendLabel="under budget" />
            </div>

            {/* Reach sparkline + platform breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>Reach over time</span>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Daily</span>
                </div>
                <SparkBar values={[80, 120, 95, 180, 210, 175, 240, 310, 280, 350, 410, 390, 440, 480]} tone="blue" height={56} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Jun 1</span>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Jun 30</span>
                </div>
              </div>

              <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 14 }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>Platform breakdown</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <PlatformRow icon={IconBrandInstagram} name="Instagram" reach="1.6M" pct={67} tone="pink" />
                  <PlatformRow icon={IconBrandTiktok}    name="TikTok"    reach="560K" pct={23} tone="gray" />
                  <PlatformRow icon={IconBrandYoutube}   name="YouTube"   reach="240K" pct={10} tone="red" />
                </div>
              </div>
            </div>

            {/* Creator deal status donut */}
            <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 14 }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>Creator deal status</span>
              </div>
              <DonutChart slices={[
                { label: "Content live",    value: 7,  tone: "green"  },
                { label: "In review",       value: 3,  tone: "blue"   },
                { label: "Revision needed", value: 1,  tone: "yellow" },
                { label: "Offer sent",      value: 1,  tone: "gray"   },
              ]} />
            </div>
          </div>
        )}

        {tab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <StatCard label="Posts live"      value="28"   icon={IconPhoto} tone="blue"   />
              <StatCard label="Avg engagement"  value="4.8%" icon={IconHeart} tone="pink"   trend={0.6} />
              <StatCard label="Avg views"       value="22K"  icon={IconEye}   tone="purple" trend={14.2} />
            </div>

            {/* Content type breakdown */}
            <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
              <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--sd-border-light)", fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>
                Content by type
              </div>
              {[
                { type: "Reel", icon: IconVideo, count: 12, reach: "1.4M", eng: "5.2%", tone: "blue" as const },
                { type: "Story", icon: IconPhoto, count: 10, reach: "680K", eng: "3.8%", tone: "purple" as const },
                { type: "Feed post", icon: IconPhoto, count: 4, reach: "280K", eng: "4.1%", tone: "green" as const },
                { type: "UGC video", icon: IconVideo, count: 2, reach: "—", eng: "—", tone: "gray" as const },
              ].map(row => {
                const t = TONES[row.tone];
                return (
                  <div key={row.type} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderBottom: "1px solid var(--sd-border-light)" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "var(--sd-radius-sm)", background: t.tint, color: t.text, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <row.icon size={13} />
                    </div>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{row.type}</span>
                    <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)", width: 24 }}>{row.count}×</span>
                    <span style={{ fontSize: 12, color: "var(--sd-font-secondary)", width: 60, textAlign: "right" }}>{row.reach}</span>
                    <span style={{ fontSize: 12, color: "var(--sd-font-secondary)", width: 48, textAlign: "right" }}>{row.eng}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "creators" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <StatCard label="Creators" value="12" icon={IconUsers}        tone="blue"   />
              <StatCard label="Completed" value="7"  icon={IconCircleCheck} tone="green"  />
              <StatCard label="In progress" value="5" icon={IconClock}      tone="yellow" />
            </div>

            <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
              <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid var(--sd-border-light)", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                <span style={{ flex: 1 }}>Creator</span>
                <span style={{ width: 56, textAlign: "right" }}>Reach</span>
                <span style={{ width: 40, textAlign: "right" }}>Eng.</span>
                <span style={{ width: 56, textAlign: "right" }}>Status</span>
              </div>
              <CreatorPerfRow name="Priya Nair"   handle="@priya_creates" initials="PN" tone="sky"       platform={IconBrandInstagram} reach="420K" eng="5.1%" status="live"     />
              <CreatorPerfRow name="Lena Fischer"  handle="@lena.vis"      initials="LF" tone="pink"      platform={IconBrandInstagram} reach="380K" eng="4.8%" status="live"     />
              <CreatorPerfRow name="Tomohiro V"   handle="@tomohiro_v"    initials="TV" tone="turquoise" platform={IconBrandYoutube}   reach="210K" eng="6.2%" status="approved" />
              <CreatorPerfRow name="Sam Kim"      handle="@sam.life"      initials="SK" tone="orange"    platform={IconBrandTiktok}    reach="560K" eng="3.9%" status="pending"  />
              <CreatorPerfRow name="Mara Voss"    handle="@mara.aesthetic" initials="MV" tone="purple"   platform={IconBrandInstagram} reach="184K" eng="4.4%" status="pending"  />
            </div>
          </div>
        )}

        {tab === "spend" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <StatCard label="Total budget"   value="$50K" icon={IconCurrencyDollar} tone="gray"  />
              <StatCard label="Spent"          value="$42K" icon={IconCurrencyDollar} tone="green" secondary="84% of budget" trend={-16.0} trendLabel="remaining" />
              <StatCard label="Avg per creator" value="$3.5K" icon={IconUsers}        tone="blue"  />
            </div>

            {/* Spend sparkline */}
            <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", padding: 14 }}>
              <div style={{ marginBottom: 10, fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>Budget utilization</div>
              <div style={{ height: 8, background: "var(--sd-bg-secondary)", borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ width: "84%", height: "100%", background: TONES.green.solid, borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                <span>$0</span><span style={{ color: TONES.green.text, fontWeight: 700 }}>$42K spent</span><span>$50K</span>
              </div>
            </div>

            {/* Spend by creator */}
            <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
              <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--sd-border-light)", fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>By creator</div>
              {[
                { name: "Priya Nair",    amount: "$7,500", pct: 18, tone: "sky"   as const },
                { name: "Lena Fischer",  amount: "$6,200", pct: 15, tone: "pink"  as const },
                { name: "Tomohiro V",    amount: "$5,800", pct: 14, tone: "turquoise" as const },
                { name: "Sam Kim",       amount: "$5,400", pct: 13, tone: "orange" as const },
                { name: "Others (8)",    amount: "$17,100", pct: 40, tone: "gray" as const },
              ].map(row => {
                const t = TONES[row.tone];
                return (
                  <div key={row.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: "1px solid var(--sd-border-light)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: t.solid, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: "var(--sd-font-primary)" }}>{row.name}</span>
                    <div style={{ width: 100, height: 4, background: "var(--sd-bg-secondary)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${row.pct}%`, height: "100%", background: t.solid, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)", width: 52, textAlign: "right" }}>{row.amount}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "campaign-analytics",
  title: "CampaignAnalytics",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Four-tab campaign reporting surface — KPI cards, reach sparkline, platform breakdown, creator table, and spend tracking.",
  description:
    "CampaignAnalytics is the primary campaign reporting surface. It uses a 4-tab layout: **Overview** (KPI grid of reach/engagements/clicks/spend, daily reach sparkline bars, platform reach breakdown with progress bars, creator deal status donut chart), **Content** (post count/avg engagement/avg views stats, content-type breakdown table with reach and engagement per type), **Creators** (creator performance table with per-creator reach, engagement rate, and deal status), **Spend** (budget vs. spent stats, utilization progress bar, per-creator spend breakdown). All charts are zero-dependency — sparklines use CSS flex bars, the donut uses inline SVG arcs. StatCard from the Core Components group handles all KPI tiles.",
  demos: [
    {
      title: "Full campaign analytics",
      description: "Click the Overview / Content / Creators / Spend tabs to explore all four reporting surfaces.",
      block: true,
      render: () => <CampaignAnalyticsView />,
    },
  ],
  props: [],
};

export default doc;
