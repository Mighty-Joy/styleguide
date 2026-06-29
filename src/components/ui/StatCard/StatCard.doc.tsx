"use client";

import React from "react";
import {
  IconUsers,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconTrendingUp,
  IconSpeakerphone,
  IconPhoto,
  IconStar,
  IconClick,
} from "@tabler/icons-react";
import { StatCard } from "./StatCard";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Demo helpers                                                          */
/* ------------------------------------------------------------------ */

function GridDemo({ children, cols = 4 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "stat-card",
  title: "StatCard",
  group: "Core Components",
  status: "stable",
  summary: "KPI metric card with toned icon, big value, trend indicator, and optional secondary label.",
  description:
    "StatCard is a compact metric display: a toned icon in the top-right, a label above the value, a large bold value, optional secondary descriptor ('of $10,000 budget'), and an optional signed-percentage trend indicator with a trend icon (↑ green, ↓ red, — gray). Three sizes: `sm` (20px value, compact padding), `md` (28px value, default), `lg` (36px value, for hero stats). Pass `onClick` to make it interactive — adds a hover shadow. 10 tone options map directly to the `TONES` token system. Typically laid out in a 2–4 column grid.",
  demos: [
    {
      title: "Campaign KPIs",
      render: () => (
        <GridDemo cols={4}>
          <StatCard label="Total reach"       value="2.4M"   icon={IconEye}            tone="blue"      trend={18.2}  trendLabel="vs prev campaign" />
          <StatCard label="Engagements"       value="184K"   icon={IconHeart}          tone="pink"      trend={6.4}   trendLabel="vs prev campaign" />
          <StatCard label="Content pieces"    value="28"     icon={IconPhoto}          tone="purple"    trend={0}     trendLabel="vs goal" secondary="of 32 submitted" />
          <StatCard label="Total spend"       value="$42K"   icon={IconCurrencyDollar} tone="green"     trend={-3.1}  trendLabel="vs budget" secondary="of $50,000 budget" />
        </GridDemo>
      ),
    },
    {
      title: "Creator stats",
      render: () => (
        <GridDemo cols={3}>
          <StatCard label="Followers"        value="184K"   icon={IconUsers}          tone="sky"       />
          <StatCard label="Avg engagement"   value="4.8%"   icon={IconTrendingUp}     tone="green"     trend={0.6} />
          <StatCard label="Avg views"        value="22K"    icon={IconEye}            tone="blue"      trend={-1.2} trendLabel="30-day avg" />
        </GridDemo>
      ),
    },
    {
      title: "Dashboard overview",
      render: () => (
        <GridDemo cols={4}>
          <StatCard label="Active campaigns" value="7"      icon={IconSpeakerphone}   tone="purple"    />
          <StatCard label="Creators on deal" value="43"     icon={IconUsers}          tone="blue"      trend={12.0} trendLabel="vs last month" />
          <StatCard label="Avg creator rating" value="4.7" icon={IconStar}           tone="yellow"    />
          <StatCard label="Link clicks"      value="31.2K"  icon={IconClick}          tone="turquoise" trend={22.5} />
        </GridDemo>
      ),
    },
    {
      title: "Sizes — sm · md · lg",
      render: () => (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ width: 160 }}>
            <StatCard size="sm" label="Reach" value="2.4M" icon={IconEye} tone="blue" trend={18.2} />
          </div>
          <div style={{ width: 200 }}>
            <StatCard size="md" label="Reach" value="2.4M" icon={IconEye} tone="blue" trend={18.2} />
          </div>
          <div style={{ width: 240 }}>
            <StatCard size="lg" label="Reach" value="2.4M" icon={IconEye} tone="blue" trend={18.2} />
          </div>
        </div>
      ),
    },
  ],
  props: [
    {
      title: "StatCard",
      rows: [
        { name: "label",       type: "string",                 required: true,  description: "Metric name shown above the value." },
        { name: "value",       type: "string | number",        required: true,  description: "The primary metric value — already formatted (e.g. '2.4M', '$42K', '4.8%')." },
        { name: "icon",        type: "React.ElementType",      required: false, description: "Tabler icon shown in a toned box in the top-right." },
        { name: "tone",        type: "keyof typeof TONES",     required: false, description: 'Icon box color. Default "blue".' },
        { name: "trend",       type: "number",                 required: false, description: "Signed percentage number (e.g. 12.4 or -3.1). Renders a trend icon + colored percentage." },
        { name: "trendLabel",  type: "string",                 required: false, description: 'Text after the trend percentage. Default "vs last period".' },
        { name: "secondary",   type: "string",                 required: false, description: "Secondary label below the value, e.g. 'of $10,000 budget'." },
        { name: "size",        type: '"sm" | "md" | "lg"',     required: false, description: 'Card size. Default "md".' },
        { name: "onClick",     type: "() => void",             required: false, description: "Makes the card interactive — adds hover shadow and cursor pointer." },
      ],
    },
  ],
};

export default doc;
