"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCopy,
  IconCheck,
  IconLink,
  IconRefresh,
  IconExternalLink,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconPlus,
  IconChevronDown,
  IconChevronUp,
  IconTrash,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type Platform = "instagram" | "tiktok" | "youtube";

interface TrackingLink {
  id: string;
  platform: Platform;
  url: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

interface CreatorCode {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  promoCode: string;
  uses: number;
  revenue: number;
  links: TrackingLink[];
}

/* ---- seed ---- */

const CREATORS: CreatorCode[] = [
  {
    id: "c1", name: "Priya Nair", initials: "PN", tone: "green",
    promoCode: "PRIYA20", uses: 341, revenue: 8_194,
    links: [
      { id: "l1", platform: "instagram", url: "https://sd.link/priya-ig", clicks: 4_820, conversions: 241, revenue: 5_784 },
      { id: "l2", platform: "tiktok",    url: "https://sd.link/priya-tt", clicks: 2_130, conversions: 100, revenue: 2_410 },
    ],
  },
  {
    id: "c2", name: "Diego Santos", initials: "DS", tone: "orange",
    promoCode: "DIEGO15", uses: 512, revenue: 12_288,
    links: [
      { id: "l3", platform: "tiktok",    url: "https://sd.link/diego-tt", clicks: 9_100, conversions: 364, revenue: 8_736 },
      { id: "l4", platform: "youtube",   url: "https://sd.link/diego-yt", clicks: 3_400, conversions: 148, revenue: 3_552 },
    ],
  },
  {
    id: "c3", name: "Hana Kim", initials: "HK", tone: "pink",
    promoCode: "HANA10", uses: 88, revenue: 1_936,
    links: [
      { id: "l5", platform: "instagram", url: "https://sd.link/hana-ig", clicks: 1_240, conversions: 62, revenue: 1_488 },
    ],
  },
  {
    id: "c4", name: "Marcus Webb", initials: "MW", tone: "purple",
    promoCode: "MARCUS25", uses: 0, revenue: 0,
    links: [],
  },
];

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};
const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#ff0000",
};

function fmt(n: number, dollar?: boolean) {
  const prefix = dollar ? "$" : "";
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${prefix}${(n / 1_000).toFixed(1)}k`;
  return `${prefix}${n}`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button
      onClick={copy}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "3px 8px", borderRadius: 6,
        border: "1px solid var(--sd-border-medium, #d1d5db)",
        background: copied ? TONES.green.tint : "var(--sd-bg-secondary, #f9f9f9)",
        color: copied ? TONES.green.text : "var(--sd-font-secondary, #666)",
        fontSize: 11, fontWeight: 600, cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {copied ? <IconCheck size={11} /> : <IconCopy size={11} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeRow({ creator }: { creator: CreatorCode }) {
  const [expanded, setExpanded] = useState(false);
  const hasLinks = creator.links.length > 0;
  const cvr = creator.links.length > 0
    ? (creator.links.reduce((s, l) => s + l.conversions, 0) / creator.links.reduce((s, l) => s + l.clicks, 0) * 100).toFixed(1)
    : "—";

  return (
    <>
      <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        {/* Creator */}
        <td style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: TONES[creator.tone].solid, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {creator.initials}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>{creator.name}</span>
          </div>
        </td>

        {/* Promo code */}
        <td style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <code style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", color: "var(--sd-font-primary, #111)", background: "var(--sd-bg-tertiary, #f1f1f1)", padding: "2px 7px", borderRadius: 5 }}>
              {creator.promoCode}
            </code>
            <CopyButton text={creator.promoCode} />
          </div>
        </td>

        {/* Uses */}
        <td style={{ padding: "10px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 12, fontWeight: creator.uses > 0 ? 700 : 400, color: creator.uses > 0 ? "var(--sd-font-primary, #111)" : "var(--sd-font-tertiary, #999)" }}>
            {creator.uses > 0 ? creator.uses.toLocaleString() : "—"}
          </span>
        </td>

        {/* Revenue */}
        <td style={{ padding: "10px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: creator.revenue > 0 ? TONES.green.text : "var(--sd-font-tertiary, #999)" }}>
            {creator.revenue > 0 ? fmt(creator.revenue, true) : "—"}
          </span>
        </td>

        {/* CVR */}
        <td style={{ padding: "10px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)" }}>{cvr}{cvr !== "—" ? "%" : ""}</span>
        </td>

        {/* Links count + expand */}
        <td style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Badge label={`${creator.links.length} link${creator.links.length !== 1 ? "s" : ""}`} tone={hasLinks ? "blue" : "gray"} size="sm" />
            {hasLinks && (
              <button
                onClick={() => setExpanded((v) => !v)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}
              >
                {expanded ? <IconChevronUp size={13} /> : <IconChevronDown size={13} />}
              </button>
            )}
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
              <IconPlus size={13} />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded: per-platform tracking links */}
      {expanded && creator.links.map((link) => {
        const PIcon = PLATFORM_ICONS[link.platform];
        return (
          <tr key={link.id} style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #fafafa)" }}>
            <td style={{ padding: "8px 14px 8px 48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>
                <PIcon size={12} style={{ color: PLATFORM_COLOR[link.platform] }} />
                <span style={{ textTransform: "capitalize" }}>{link.platform}</span>
              </div>
            </td>
            <td style={{ padding: "8px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                  {link.url}
                </span>
                <CopyButton text={link.url} />
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex" }}>
                  <IconExternalLink size={11} />
                </button>
              </div>
            </td>
            <td style={{ padding: "8px 14px", textAlign: "right", fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>
              {fmt(link.clicks)} clicks
            </td>
            <td style={{ padding: "8px 14px", textAlign: "right", fontSize: 11, fontWeight: 600, color: TONES.green.text }}>
              {fmt(link.revenue, true)}
            </td>
            <td style={{ padding: "8px 14px", textAlign: "right", fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>
              {(link.conversions / link.clicks * 100).toFixed(1)}%
            </td>
            <td style={{ padding: "8px 14px" }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
                <IconTrash size={12} />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

/* ---- Demo ---- */

function Demo() {
  const totalRevenue  = CREATORS.reduce((s, c) => s + c.revenue, 0);
  const totalUses     = CREATORS.reduce((s, c) => s + c.uses, 0);
  const totalClicks   = CREATORS.flatMap((c) => c.links).reduce((s, l) => s + l.clicks, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 18 }}>
        {[
          { label: "Total revenue",    value: fmt(totalRevenue, true), color: TONES.green.text },
          { label: "Code uses",        value: totalUses.toLocaleString(), color: "var(--sd-font-primary, #111)" },
          { label: "Link clicks",      value: fmt(totalClicks), color: "var(--sd-font-primary, #111)" },
          { label: "Avg CVR",          value: "4.1%",  color: "var(--sd-font-primary, #111)" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>Codes & tracking links</span>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={12} />}>Regenerate all</Button>
            <Button variant="primary" size="sm" leftIcon={<IconLink size={12} />}>New link</Button>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              {["Creator", "Promo code", "Uses", "Revenue", "CVR", "Links"].map((h) => (
                <th key={h} style={{ padding: "8px 14px", textAlign: h === "Creator" || h === "Links" ? "left" : "right", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CREATORS.map((c) => <CodeRow key={c.id} creator={c} />)}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              <td colSpan={2} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total</td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, fontSize: 12 }}>{totalUses.toLocaleString()}</td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, fontSize: 12, color: TONES.green.text }}>{fmt(totalRevenue, true)}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
        Click the ↓ chevron on any row to expand per-platform tracking links. Click "Copy" to copy a code or URL to clipboard.
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "affiliate-code-manager",
  title: "AffiliateCodeManager",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Per-creator promo codes and UTM tracking links — expandable rows, copy-on-click, revenue attribution, and CVR.",
  description:
    "The attribution management surface for a campaign. Summary cards: total revenue, code uses, link clicks, avg CVR. Table rows: creator, promo code (copy button), uses, revenue (green), CVR. Expand any row to see per-platform tracking links with click/conversion/revenue breakdown and copy-to-clipboard. Marcus Webb row shows the zero-attribution state. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Affiliate codes & tracking links",
      description: "Click the ↓ chevron on Priya or Diego to expand per-platform links. Copy buttons use the clipboard API.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
