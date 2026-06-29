"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconDownload,
  IconShare,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconStar,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

const CREATORS = [
  { id: "c1", name: "Priya Nair",   initials: "PN", tone: "pink"   as const, posts: 4, reach: "218K", er: 8.9,  spent: 1700, status: "top"   },
  { id: "c2", name: "Marcus Webb",  initials: "MW", tone: "orange" as const, posts: 3, reach: "97K",  er: 6.1,  spent: 1200, status: "solid" },
  { id: "c3", name: "Ji-ho Kim",    initials: "JK", tone: "blue"   as const, posts: 4, reach: "183K", er: 7.4,  spent: 1500, status: "solid" },
  { id: "c4", name: "Amara Diallo", initials: "AD", tone: "green"  as const, posts: 2, reach: "54K",  er: 5.2,  spent: 900,  status: "below" },
  { id: "c5", name: "Sofia Reyes",  initials: "SR", tone: "purple" as const, posts: 3, reach: "71K",  er: 9.3,  spent: 1100, status: "top"   },
];

const STATUS_META: Record<string, { label: string; tone: keyof typeof TONES }> = {
  top:   { label: "Top performer", tone: "green"  },
  solid: { label: "Solid",         tone: "blue"   },
  below: { label: "Below target",  tone: "yellow" },
};

const METRICS = [
  { label: "Total reach",        actual: "623K",  target: "500K",  delta: 24.6,  tone: "blue"   as const, Icon: IconUsers          },
  { label: "Total impressions",  actual: "904K",  target: "800K",  delta: 13.0,  tone: "purple" as const, Icon: IconEye            },
  { label: "Avg ER",             actual: "7.4%",  target: "6.0%",  delta: 23.3,  tone: "green"  as const, Icon: IconHeart          },
  { label: "Total spend",        actual: "$6.4K", target: "$7.5K", delta: -14.7, tone: "gray"   as const, Icon: IconCurrencyDollar },
];

function Demo() {
  const [expanded,   setExpanded]   = useState<string | null>("c1");
  const [downloaded, setDownloaded] = useState(false);
  const [shared,     setShared]     = useState(false);

  function download() { setDownloaded(true); setTimeout(() => setDownloaded(false), 2500); }
  function share()    { setShared(true);     setTimeout(() => setShared(false),     2500); }

  const emv  = 55000;
  const spend = 6400;
  const roi   = Math.round((emv - spend) / spend * 100);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 2 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Summer Glow Campaign</div>
            <Badge label="Completed" tone="green" size="sm" dot />
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Jun 1–28, 2026 · 5 creators · Aura Labs</div>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {METRICS.map(({ label, actual, target, delta, tone, Icon }) => (
          <div key={label} style={{ padding: "10px 12px", background: TONES[tone].tint, borderRadius: 10 }}>
            <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 2 }}>
              <Icon size={11} style={{ color: TONES[tone].text }} />
              <span style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.7 }}>{label}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: TONES[tone].text, marginBottom: 2 }}>{actual}</div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {delta > 0
                ? <IconTrendingUp size={10} style={{ color: TONES.green.text }} />
                : <IconTrendingDown size={10} style={{ color: TONES.red.text }} />}
              <span style={{ fontSize: 9, fontWeight: 700, color: delta > 0 ? TONES.green.text : TONES.red.text }}>
                {delta > 0 ? "+" : ""}{delta.toFixed(1)}% vs {target} target
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ROI banner */}
      <div style={{ padding: "10px 13px", background: "#111", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <IconStar size={14} style={{ color: "#fff", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>Estimated ROI</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>EMV ${emv.toLocaleString()} vs spend ${spend.toLocaleString()}</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: TONES.green.text }}>+{roi}%</div>
      </div>

      {/* Creator table */}
      <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Creator performance</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {CREATORS.sort((a, b) => b.er - a.er).map((c, i) => {
          const isOpen = expanded === c.id;
          const st = STATUS_META[c.status];
          return (
            <div key={c.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px" }}>
                <div style={{ width: 18, fontSize: 11, fontWeight: 900, color: i === 0 ? TONES.yellow.text : "var(--sd-font-tertiary,#999)", flexShrink: 0 }}>
                  {i === 0 ? <IconStar size={13} style={{ color: TONES.yellow.text }} /> : `#${i + 1}`}
                </div>
                <Avatar initials={c.initials} tone={c.tone} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{c.posts} posts · {c.reach} reach</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 900, color: c.er >= 8 ? TONES.green.text : c.er >= 6 ? "var(--sd-font-primary,#111)" : TONES.yellow.text }}>
                  {c.er}%
                </span>
                <Badge label={st.label} tone={st.tone} size="sm" />
                <button onClick={() => setExpanded(isOpen ? null : c.id)}
                  style={{ width: 22, height: 22, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isOpen ? <IconChevronUp size={11} /> : <IconChevronDown size={11} />}
                </button>
              </div>
              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "8px 12px", background: "var(--sd-bg-secondary,#f9f9f9)", display: "flex", gap: 8 }}>
                  {[
                    { label: "Reach",   val: c.reach,           tone: "blue"   as const },
                    { label: "ER",      val: c.er + "%",        tone: "green"  as const },
                    { label: "Spent",   val: "$" + c.spent.toLocaleString(), tone: "gray" as const },
                    { label: "Posts",   val: String(c.posts),   tone: "purple" as const },
                  ].map(({ label, val, tone }) => (
                    <div key={label} style={{ flex: 1, padding: "6px 8px", background: TONES[tone].tint, borderRadius: 7, textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: TONES[tone].text }}>{val}</div>
                      <div style={{ fontSize: 8, color: TONES[tone].text, opacity: 0.7 }}>{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 7 }}>
        <Button variant="primary" size="sm" leftIcon={downloaded ? <IconCheck size={11} /> : <IconDownload size={11} />} onClick={download} style={{ flex: 1 }}>
          {downloaded ? "Downloaded!" : "Download PDF"}
        </Button>
        <Button variant="secondary" size="sm" leftIcon={shared ? <IconCheck size={11} /> : <IconShare size={11} />} onClick={share} style={{ flex: 1 }}>
          {shared ? "Link copied!" : "Share report"}
        </Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-wrap-report",
  title: "CampaignWrapReport",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Post-campaign summary report — 4 KPI tiles with vs-target delta arrows, ROI banner, 5-creator performance table ranked by ER with expandable stat breakdowns, Download PDF and Share CTAs.",
  description:
    "End-of-campaign wrap delivered to both brand and creators. Header: campaign name + 'Completed' green dot badge, date range + creator count + brand. 4 KPI tiles in 2×2 grid: reach (blue), impressions (purple), avg ER (green), total spend (gray) — each shows actual value large, target reference small, and trend arrow (up green / down red) with percent delta. ROI banner in #111 dark: star icon, EMV vs spend label, and +N% ROI in green (EMV = reach × CPE model). Creator performance table: 5 rows sorted by ER descending — gold star #1, then #2–5; Avatar sm, name + post count + reach, ER large colored green ≥8%/neutral ≥6%/yellow below, status badge (Top performer/Solid/Below target), expand chevron. Expanded: 4 mini stat tiles (reach blue / ER green / spend gray / posts purple). Download PDF primary → 2.5s 'Downloaded!'. Share report secondary → 2.5s 'Link copied!'. Priya Nair pre-expanded. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign wrap report",
      description: "Expand creator rows for stat breakdowns. Click Download PDF or Share report for the 2.5s confirmation states.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
