"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconMinus,
  IconShieldCheck,
  IconUsers,
  IconHeart,
  IconMapPin,
  IconSparkles,
  IconAlertCircle,
  IconBrandInstagram,
  IconBrandTiktok,
  IconChevronDown,
  IconChevronUp,
  IconUserCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type SignalStrength = "strong" | "moderate" | "weak" | "flag";

interface ScoreDimension {
  id: string;
  label: string;
  icon: React.ElementType;
  score: number;
  weight: number;
  strength: SignalStrength;
  detail: string;
  signals: { label: string; pass: boolean | null; note?: string }[];
}

interface CreatorMatch {
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  platform: "instagram" | "tiktok";
  followers: string;
  overallScore: number;
  dimensions: ScoreDimension[];
}

/* ---- data ---- */
const CREATORS: CreatorMatch[] = [
  {
    name: "Priya Nair", initials: "PN", tone: "green", handle: "@priya.creates",
    platform: "instagram", followers: "248K", overallScore: 94,
    dimensions: [
      { id: "d1", label: "Audience fit",       icon: IconUsers,      score: 96, weight: 35, strength: "strong",
        detail: "Audience skews 72% female, 22–34, US — perfect match for Aura Labs target.",
        signals: [
          { label: "Gender match (target: 70%+ F)",   pass: true,  note: "72% female" },
          { label: "Age match (target: 22–35)",        pass: true,  note: "68% in range" },
          { label: "US audience (target: 80%+)",       pass: true,  note: "84% US" },
          { label: "Skincare interest (target: 50%+)", pass: true,  note: "61% overlap" },
        ] },
      { id: "d2", label: "Niche relevance",    icon: IconSparkles,   score: 98, weight: 25, strength: "strong",
        detail: "Primary content: skincare routines, product reviews, wellness — exact match.",
        signals: [
          { label: "Skincare content (target: primary)", pass: true,  note: "Primary niche" },
          { label: "Brand voice alignment",              pass: true,  note: "Warm, educational" },
          { label: "Competitor posts (last 90d)",        pass: true,  note: "0 competitor posts" },
        ] },
      { id: "d3", label: "Past performance",   icon: IconHeart,      score: 91, weight: 25, strength: "strong",
        detail: "8 prior brand collabs. Avg ER 8.6%, well above the 5% benchmark.",
        signals: [
          { label: "Avg ER (benchmark: 5%)",             pass: true,  note: "8.6% avg" },
          { label: "Avg views / collab",                 pass: true,  note: "62K avg" },
          { label: "Content quality rating",             pass: true,  note: "4.8 / 5 brand score" },
          { label: "Late deliveries (last 4 collabs)",   pass: true,  note: "0 late" },
        ] },
      { id: "d4", label: "Exclusivity check",  icon: IconShieldCheck, score: 85, weight: 15, strength: "moderate",
        detail: "No skincare conflicts. One wellness brand ends exclusivity Jul 1.",
        signals: [
          { label: "Active skincare exclusivity",        pass: true,  note: "None" },
          { label: "Wellness brand exclusivity",         pass: null,  note: "Ends Jul 1 — just before go-live" },
          { label: "Competitor posting",                 pass: true,  note: "None in 90 days" },
        ] },
    ],
  },
  {
    name: "Marcus Webb", initials: "MW", tone: "purple", handle: "@marcuswebb",
    platform: "tiktok", followers: "1.2M", overallScore: 61,
    dimensions: [
      { id: "d1", label: "Audience fit",       icon: IconUsers,      score: 48, weight: 35, strength: "weak",
        detail: "68% male audience doesn't align well with Aura Labs target (70% female target).",
        signals: [
          { label: "Gender match (target: 70%+ F)",   pass: false, note: "68% male" },
          { label: "Age match (target: 22–35)",        pass: true,  note: "74% in range" },
          { label: "US audience (target: 80%+)",       pass: true,  note: "91% US" },
          { label: "Skincare interest (target: 50%+)", pass: false, note: "22% overlap" },
        ] },
      { id: "d2", label: "Niche relevance",    icon: IconSparkles,   score: 55, weight: 25, strength: "weak",
        detail: "Comedy + lifestyle. No skincare content in last 90 days.",
        signals: [
          { label: "Skincare content (target: primary)", pass: false, note: "Entertainment primary" },
          { label: "Brand voice alignment",              pass: null,  note: "Casual/comedic — misaligned" },
          { label: "Competitor posts (last 90d)",        pass: true,  note: "0 competitor posts" },
        ] },
      { id: "d3", label: "Past performance",   icon: IconHeart,      score: 72, weight: 25, strength: "moderate",
        detail: "3.1% ER on 1.2M — below benchmark. High reach but low engagement quality.",
        signals: [
          { label: "Avg ER (benchmark: 5%)",             pass: false, note: "3.1% avg" },
          { label: "Avg views / collab",                 pass: true,  note: "380K avg" },
          { label: "Content quality rating",             pass: null,  note: "No skincare collabs to rate" },
          { label: "Late deliveries (last 4 collabs)",   pass: true,  note: "0 late" },
        ] },
      { id: "d4", label: "Exclusivity check",  icon: IconShieldCheck, score: 100, weight: 15, strength: "strong",
        detail: "No active exclusivity conflicts.",
        signals: [
          { label: "Active skincare exclusivity",        pass: true, note: "None" },
          { label: "Wellness brand exclusivity",         pass: true, note: "None" },
          { label: "Competitor posting",                 pass: true, note: "None in 90 days" },
        ] },
    ],
  },
];

const STRENGTH_META: Record<SignalStrength, { color: string; bg: string }> = {
  strong:   { color: TONES.green.text,  bg: TONES.green.tint  },
  moderate: { color: TONES.yellow.text, bg: TONES.yellow.tint },
  weak:     { color: TONES.red.text,    bg: TONES.red.tint    },
  flag:     { color: TONES.orange.text, bg: TONES.orange.tint },
};

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 80 ? TONES.green.text : score >= 60 ? TONES.yellow.text : TONES.red.text;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sd-bg-tertiary, #f1f1f1)" strokeWidth={6} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <span style={{ fontSize: size > 50 ? 15 : 11, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [selectedCreator, setSelectedCreator] = useState(0);
  const [expandedDim, setExpandedDim] = useState<string | null>("d1");

  const creator = CREATORS[selectedCreator];

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Creator selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {CREATORS.map((c, i) => {
          const PIcon = c.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const isActive = i === selectedCreator;
          const scoreColor = c.overallScore >= 80 ? TONES.green.text : c.overallScore >= 60 ? TONES.yellow.text : TONES.red.text;
          return (
            <button
              key={c.name}
              onClick={() => { setSelectedCreator(i); setExpandedDim("d1"); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1.5px solid ${isActive ? "#111" : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 10, background: isActive ? "#fafafa" : "transparent", cursor: "pointer", flex: 1 }}
            >
              <Avatar initials={c.initials} tone={c.tone} size="sm" />
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{c.name}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <PIcon size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{c.followers}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: scoreColor }}>{c.overallScore}</div>
                <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>/ 100</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Score panel */}
      <div style={{ display: "flex", gap: 14, padding: "16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 14, alignItems: "center" }}>
        <ScoreRing score={creator.overallScore} size={72} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>
            {creator.name} × Summer Glow
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginBottom: 8 }}>
            {creator.overallScore >= 80 ? "Strong match — recommended for this campaign." : creator.overallScore >= 65 ? "Moderate match — review the flagged dimensions." : "Weak match — significant audience and niche misalignment."}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {creator.overallScore >= 80
              ? <Badge label="Recommended" tone="green" size="sm" dot />
              : creator.overallScore >= 65
              ? <Badge label="Review needed" tone="yellow" size="sm" dot />
              : <Badge label="Not recommended" tone="red" size="sm" dot />
            }
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Button variant="secondary" size="sm">Skip</Button>
          <Button variant="primary" size="sm" leftIcon={<IconUserCheck size={12} />}>
            {creator.overallScore >= 70 ? "Invite" : "Invite anyway"}
          </Button>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>Score breakdown</span>
        </div>
        {creator.dimensions.map((dim, i) => {
          const DIcon = dim.icon;
          const { color, bg } = STRENGTH_META[dim.strength];
          const isOpen = expandedDim === dim.id;

          return (
            <div key={dim.id} style={{ borderBottom: i < creator.dimensions.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
              {/* Dimension header */}
              <button
                onClick={() => setExpandedDim(isOpen ? null : dim.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 7, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <DIcon size={13} style={{ color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{dim.label}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{dim.detail}</div>
                </div>
                {/* Weight bar */}
                <div style={{ width: 60, textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 900, color }}>{dim.score}</div>
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>{dim.weight}% weight</div>
                </div>
                <div style={{ width: 48 }}>
                  <ScoreRing score={dim.score} size={32} />
                </div>
                {isOpen ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />}
              </button>

              {/* Signals */}
              {isOpen && (
                <div style={{ padding: "4px 16px 12px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
                  {dim.signals.map((sig, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: j < dim.signals.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: sig.pass === true ? TONES.green.tint : sig.pass === false ? TONES.red.tint : TONES.yellow.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {sig.pass === true  ? <IconCheck size={10} style={{ color: TONES.green.text }} /> :
                         sig.pass === false ? <IconX     size={10} style={{ color: TONES.red.text   }} /> :
                                              <IconMinus size={10} style={{ color: TONES.yellow.text }} />}
                      </div>
                      <span style={{ fontSize: 11, flex: 1 }}>{sig.label}</span>
                      {sig.note && <span style={{ fontSize: 10, fontWeight: 600, color: sig.pass === true ? TONES.green.text : sig.pass === false ? TONES.red.text : TONES.yellow.text }}>{sig.note}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-match-score",
  title: "CreatorMatchScore",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "AI-powered creator–campaign fit scorer — circular score ring, 4-dimension breakdown (audience fit, niche, performance, exclusivity) with expandable signal lists.",
  description:
    "Helps brands decide which creators to invite based on data-driven fit scoring. Creator selector: side-by-side cards with overall score. Score panel: SVG ring gauge (green ≥80 / yellow ≥60 / red below), recommendation label, badge (Recommended / Review needed / Not recommended), Skip + Invite CTAs. Dimension breakdown accordion: 4 dimensions (audience fit 35% weight, niche relevance 25%, past performance 25%, exclusivity check 15%); each has an icon, summary sentence, numeric score, mini ring, and expandable signal list. Signal list: green check (pass), red × (fail), yellow − (caution) with result note. Toggle between Priya Nair (94 — recommended) and Marcus Webb (61 — not recommended) to compare. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator match score",
      description: "Toggle between Priya (94) and Marcus (61) to compare scores. Expand dimension rows to see individual signals.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
