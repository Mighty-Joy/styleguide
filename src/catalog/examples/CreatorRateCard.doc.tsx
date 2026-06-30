"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconEdit,
  IconCheck,
  IconCopy,
  IconShare,
  IconShieldCheck,
  IconVideo,
  IconPhoto,
  IconMessageCircle,
  IconPackage,
  IconStar,
  IconLock,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface RateRow {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  price: number;
  locked: boolean;
}

const IG_RATES: RateRow[] = [
  { id: "ig1", icon: IconVideo,          label: "Reel",         description: "Up to 60s, full edit",             price: 950,  locked: false },
  { id: "ig2", icon: IconPhoto,          label: "Feed post",    description: "1–10 images, caption",             price: 450,  locked: false },
  { id: "ig3", icon: IconMessageCircle,  label: "Story (x5)",   description: "5 frames, 24h, swipe-up link",    price: 300,  locked: false },
  { id: "ig4", icon: IconPackage,        label: "Bundle",       description: "1 Reel + 1 post + 5 stories",     price: 1500, locked: false },
];

const TT_RATES: RateRow[] = [
  { id: "tt1", icon: IconVideo,  label: "TikTok video",  description: "15–60s, trending audio",        price: 800, locked: false },
  { id: "tt2", icon: IconPackage, label: "Series (x3)",  description: "3 videos, 1-week rollout",      price: 2000, locked: false },
];

const EXTRAS: RateRow[] = [
  { id: "ex1", icon: IconShieldCheck, label: "Usage rights (30d)",  description: "Repurpose in brand ads, 30 days",     price: 400,  locked: false },
  { id: "ex2", icon: IconShieldCheck, label: "Usage rights (1yr)",  description: "Full paid media license, 12 months",  price: 1200, locked: false },
  { id: "ex3", icon: IconLock,        label: "Exclusivity (30d)",   description: "No competitor content, 30 days",      price: 600,  locked: false },
  { id: "ex4", icon: IconStar,        label: "Rush delivery",       description: "72h turnaround, +50% base rate",      price: 0,    locked: true  },
];

function PriceRow({ row, editing, onPriceChange }: { row: RateRow; editing: boolean; onPriceChange: (id: string, price: number) => void }) {
  const Icon = row.icon;
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--sd-border-default,#f1f1f1)" }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} style={{ color: "var(--sd-font-tertiary,#999)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700 }}>{row.label}</div>
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{row.description}</div>
      </div>
      {row.locked ? (
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary,#bbb)", fontStyle: "italic" }}>On request</span>
      ) : editing ? (
        <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 7, overflow: "hidden" }}>
          <span style={{ padding: "5px 4px 5px 7px", fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>$</span>
          <input type="number" value={row.price} min={0} onChange={(e) => onPriceChange(row.id, Number(e.target.value))}
            style={{ width: 60, padding: "5px 5px 5px 0", border: "none", outline: "none", fontSize: 11, fontFamily: "inherit" }} />
        </div>
      ) : (
        <span style={{ fontSize: 12, fontWeight: 900, color: "#111" }}>${row.price.toLocaleString()}</span>
      )}
    </div>
  );
}

function Demo() {
  const [igRates,  setIgRates]  = useState<RateRow[]>(IG_RATES);
  const [ttRates,  setTtRates]  = useState<RateRow[]>(TT_RATES);
  const [extras,   setExtras]   = useState<RateRow[]>(EXTRAS);
  const [editing,  setEditing]  = useState(false);
  const [copied,   setCopied]   = useState(false);

  function updatePrice(list: RateRow[], setList: (r: RateRow[]) => void) {
    return (id: string, price: number) => setList(list.map((r) => r.id === id ? { ...r, price } : r));
  }

  function copyLink() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const minRate = Math.min(...igRates.map((r) => r.price), ...ttRates.map((r) => r.price));
  const maxRate = Math.max(...igRates.map((r) => r.price), ...ttRates.map((r) => r.price), extras.map((r) => r.price).reduce((a,b) => Math.max(a,b), 0));

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Creator identity */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
        <div style={{ position: "relative" }}>
          <Avatar initials="PN" tone="pink" size="lg" />
          <div style={{ position: "absolute", bottom: 0, right: -2, width: 16, height: 16, borderRadius: 99, background: TONES.blue.text, border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconShieldCheck size={9} style={{ color: "#fff" }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>Priya Nair</span>
            <Badge label="Micro" tone="blue" />
            <Badge label="Verified" tone="blue" />
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <Badge label="Clean beauty" tone="pink" size="sm" />
            <Badge label="Skincare" tone="gray" size="sm" />
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 4 }}>priya@priya.co · Rates from ${minRate.toLocaleString()}</div>
        </div>
        <button onClick={() => setEditing(!editing)}
          style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", background: editing ? "#111" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {editing ? <IconCheck size={13} style={{ color: "#fff" }} /> : <IconEdit size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>
      </div>

      {/* Platform stat strip */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[
          { icon: IconBrandInstagram, tone: "pink"  as const, label: "71K followers", sub: "9.2% ER" },
          { icon: IconBrandTiktok,    tone: "blue"  as const, label: "43K followers", sub: "7.1% ER" },
        ].map(({ icon: Icon, tone, label, sub }) => (
          <div key={tone} style={{ flex: 1, display: "flex", gap: 7, alignItems: "center", padding: "7px 10px", background: TONES[tone].tint, borderRadius: 9 }}>
            <Icon size={14} style={{ color: TONES[tone].text }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: TONES[tone].text }}>{label}</div>
              <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.7 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram section */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
          <IconBrandInstagram size={13} style={{ color: TONES.pink.text }} />
          <span style={{ fontSize: 11, fontWeight: 800 }}>Instagram</span>
        </div>
        {igRates.map((r) => <PriceRow key={r.id} row={r} editing={editing} onPriceChange={updatePrice(igRates, setIgRates)} />)}
      </div>

      {/* TikTok section */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
          <IconBrandTiktok size={13} style={{ color: TONES.blue.text }} />
          <span style={{ fontSize: 11, fontWeight: 800 }}>TikTok</span>
        </div>
        {ttRates.map((r) => <PriceRow key={r.id} row={r} editing={editing} onPriceChange={updatePrice(ttRates, setTtRates)} />)}
      </div>

      {/* Add-ons */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Add-ons</div>
        {extras.map((r) => <PriceRow key={r.id} row={r} editing={editing} onPriceChange={updatePrice(extras, setExtras)} />)}
      </div>

      {/* Bulk note */}
      <div style={{ padding: "9px 12px", background: TONES.green.tint, borderRadius: 9, marginBottom: 14, fontSize: 11, color: TONES.green.text, fontWeight: 600, lineHeight: 1.5 }}>
        Bundle discount: 10% off for campaigns with 3+ deliverables. Reach out to discuss long-term retainer rates.
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 7 }}>
        <Button variant="primary" size="sm" style={{ flex: 1 }}>
          Request a quote
        </Button>
        <button onClick={copyLink}
          style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {copied ? <IconCheck size={13} style={{ color: TONES.green.text }} /> : <IconCopy size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>
        <button style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconShare size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        </button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-rate-card",
  title: "CreatorRateCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's shareable rate card — Avatar header with platform stat tiles, per-platform rate tables (IG + TikTok), add-ons section, bundle-discount note, and Request a quote / copy-link CTAs. Edit mode unlocks price inputs.",
  description:
    "Creator publishes their official rate card to share with brands or to include in media kits. Header: Avatar lg with verified shield badge, name, Micro + Verified badges, niche chips (Clean beauty / Skincare), email + 'Rates from $N'. Edit toggle (pencil/check icon) switches all price values to inline inputs. Platform stat strip: IG pink + TikTok blue tiles with follower count + ER. Instagram section: 4 rows (Reel $950 / Feed post $450 / Story x5 $300 / Bundle $1,500); each row has icon tile, label, description, price. TikTok section: 2 rows (video $800 / Series x3 $2,000). Add-ons section: 4 rows (usage rights 30d $400 / usage rights 1yr $1,200 / exclusivity 30d $600 / rush delivery 'On request' locked). Bundle-discount green note (10% off 3+ deliverables). CTAs: 'Request a quote' primary, copy-link icon (2s 'copied' green check), share icon. Pre-seeded: Priya Nair / priya@priya.co / IG 71K 9.2% ER / TikTok 43K. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator rate card",
      description: "Click the pencil icon (top right) to enter edit mode and update your prices live. Click the check to save. Copy or share the card link with brands.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
