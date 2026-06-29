"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconShieldCheck,
  IconShieldX,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconMinus,
  IconChevronDown,
  IconChevronUp,
  IconBrandInstagram,
  IconBrandTiktok,
  IconEye,
  IconUsers,
  IconBolt,
  IconFlag,
  IconUserCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type RiskLevel = "low" | "medium" | "high";
type SignalResult = "pass" | "warn" | "fail";

interface SafetySignal {
  id: string;
  label: string;
  result: SignalResult;
  detail: string;
  source: string;
}

interface SafetySection {
  id: string;
  title: string;
  score: number;
  riskLevel: RiskLevel;
  signals: SafetySignal[];
}

const RISK_META: Record<RiskLevel, { label: string; color: string; bg: string; tone: keyof typeof TONES }> = {
  low:    { label: "Low risk",    color: TONES.green.text,  bg: TONES.green.tint,  tone: "green"  },
  medium: { label: "Medium risk", color: TONES.yellow.text, bg: TONES.yellow.tint, tone: "yellow" },
  high:   { label: "High risk",   color: TONES.red.text,    bg: TONES.red.tint,    tone: "red"    },
};

const SIGNAL_ICON: Record<SignalResult, { icon: React.ElementType; color: string; bg: string }> = {
  pass: { icon: IconCheck, color: TONES.green.text,  bg: TONES.green.tint  },
  warn: { icon: IconMinus, color: TONES.yellow.text, bg: TONES.yellow.tint },
  fail: { icon: IconX,     color: TONES.red.text,    bg: TONES.red.tint    },
};

const SECTIONS: SafetySection[] = [
  {
    id: "s1", title: "Audience authenticity", score: 91, riskLevel: "low",
    signals: [
      { id: "a1", label: "Fake follower estimate",    result: "pass", detail: "Est. 4.2% suspicious accounts — within the 5% safe threshold.",        source: "HypeAuditor" },
      { id: "a2", label: "Engagement authenticity",   result: "pass", detail: "No suspicious engagement spikes detected in the last 90 days.",         source: "Internal" },
      { id: "a3", label: "Follower growth velocity",  result: "pass", detail: "Organic growth — no unnatural spikes. 1.8% MoM avg.",                   source: "Instagram" },
      { id: "a4", label: "Comment quality",           result: "warn", detail: "8% of recent comments are generic ('Great post!') — slightly elevated.", source: "Internal" },
    ],
  },
  {
    id: "s2", title: "Content safety", score: 96, riskLevel: "low",
    signals: [
      { id: "b1", label: "Controversial content (90d)", result: "pass", detail: "No flagged content in the last 90 days.",                               source: "Internal" },
      { id: "b2", label: "Hate speech / profanity",     result: "pass", detail: "0 posts flagged in last 365 days.",                                      source: "Internal" },
      { id: "b3", label: "Adult / NSFW content",        result: "pass", detail: "No NSFW content detected.",                                              source: "Internal" },
      { id: "b4", label: "Political content",           result: "pass", detail: "No political posts in the last 180 days.",                               source: "Internal" },
    ],
  },
  {
    id: "s3", title: "Competitor associations", score: 74, riskLevel: "medium",
    signals: [
      { id: "c1", label: "Active competitor exclusivity", result: "warn", detail: "Wellnest (wellness) exclusivity runs until Jul 1 — overlaps go-live.",  source: "Contract DB" },
      { id: "c2", label: "Competitor posts (90d)",        result: "pass", detail: "0 skincare competitor posts in 90 days.",                               source: "Internal" },
      { id: "c3", label: "Past competitor paid posts",    result: "warn", detail: "2 paid posts for NovaSkin in Jan 2024 — over 12 months ago.",           source: "Disclosure DB" },
    ],
  },
  {
    id: "s4", title: "FTC & disclosure compliance", score: 88, riskLevel: "low",
    signals: [
      { id: "d1", label: "#ad disclosure on paid posts",  result: "pass", detail: "100% of paid posts carry #ad or #sponsored in the last 8 campaigns.",  source: "FTC DB" },
      { id: "d2", label: "Paid partnership labels",       result: "pass", detail: "Instagram paid partnership tag used on all brand collabs.",              source: "Instagram" },
      { id: "d3", label: "Affiliate disclosure",          result: "warn", detail: "2 affiliate posts in Sep 2023 missing #ad tag — pre-dates 2024 guidelines.", source: "FTC DB" },
    ],
  },
];

function ScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const r   = (size - 6) / 2;
  const c   = 2 * Math.PI * r;
  const fill = (score / 100) * c;
  const color = score >= 85 ? TONES.green.text : score >= 70 ? TONES.yellow.text : TONES.red.text;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--sd-bg-tertiary, #f1f1f1)" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeDasharray={`${fill} ${c}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size > 44 ? 13 : 10, fontWeight: 900, color }}>{score}</span>
      </div>
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [expanded, setExpanded] = useState<string | null>("s3");

  const overallScore = Math.round(SECTIONS.reduce((s, sec) => s + sec.score, 0) / SECTIONS.length);
  const overallRisk: RiskLevel = overallScore >= 85 ? "low" : overallScore >= 70 ? "medium" : "high";
  const warns = SECTIONS.flatMap((s) => s.signals).filter((sig) => sig.result === "warn").length;
  const fails = SECTIONS.flatMap((s) => s.signals).filter((sig) => sig.result === "fail").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <Avatar initials="PN" tone="green" size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Brand safety report</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Priya Nair · @priya.creates · Jun 28, 2025</div>
        </div>
        <Button variant="secondary" size="sm">View full report</Button>
      </div>

      {/* Overall score */}
      <div style={{ display: "flex", gap: 14, padding: "14px 16px", border: `1px solid ${TONES[overallRisk === "low" ? "green" : overallRisk === "medium" ? "yellow" : "red"].tint}`, borderRadius: 12, marginBottom: 14, background: `${TONES[overallRisk === "low" ? "green" : overallRisk === "medium" ? "yellow" : "red"].tint}40` }}>
        <ScoreRing score={overallScore} size={60} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
            {overallRisk === "low" ? "Safe to work with" : overallRisk === "medium" ? "Review flagged items" : "High risk — proceed with caution"}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge label={RISK_META[overallRisk].label} tone={RISK_META[overallRisk].tone} size="sm" dot />
            {warns > 0 && <Badge label={`${warns} warnings`} tone="yellow" size="sm" />}
            {fails > 0 && <Badge label={`${fails} flags`}    tone="red"    size="sm" />}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconFlag size={11} />}>Flag creator</Button>
          <Button variant="primary"   size="sm" leftIcon={<IconUserCheck size={11} />}>Approve</Button>
        </div>
      </div>

      {/* Section accordion */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {SECTIONS.map((sec, i) => {
          const { color, bg, tone } = RISK_META[sec.riskLevel];
          const isOpen = expanded === sec.id;

          return (
            <div key={sec.id} style={{ borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
              <button onClick={() => setExpanded(isOpen ? null : sec.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <ScoreRing score={sec.score} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{sec.title}</div>
                  <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                    {sec.signals.map((sig) => {
                      const { icon: SIcon, color: sc, bg: sbg } = SIGNAL_ICON[sig.result];
                      return (
                        <div key={sig.id} style={{ width: 14, height: 14, borderRadius: 4, background: sbg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <SIcon size={8} style={{ color: sc }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Badge label={RISK_META[sec.riskLevel].label} tone={tone} size="sm" dot />
                {isOpen ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />}
              </button>

              {isOpen && (
                <div style={{ background: "var(--sd-bg-secondary, #f9f9f9)", borderTop: "1px solid var(--sd-border-default, #e5e7eb)" }}>
                  {sec.signals.map((sig, j) => {
                    const { icon: SIcon, color: sc, bg: sbg } = SIGNAL_ICON[sig.result];
                    return (
                      <div key={sig.id} style={{ display: "flex", gap: 10, padding: "9px 14px", borderBottom: j < sec.signals.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, background: sbg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <SIcon size={11} style={{ color: sc }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, fontWeight: 700 }}>{sig.label}</div>
                          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", lineHeight: 1.5 }}>{sig.detail}</div>
                        </div>
                        <span style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, flexShrink: 0 }}>{sig.source}</span>
                      </div>
                    );
                  })}
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
  slug: "brand-safety-report",
  title: "BrandSafetyReport",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Pre-collaboration brand safety check — SVG score rings for audience authenticity, content safety, competitor associations, and FTC compliance with expandable signal lists.",
  description:
    "Lets brands vet a creator before signing a deal. Creator header: avatar, name, report date, View full report button. Overall score panel: SVG ring (60px), risk label, warning/flag count badges, Flag creator + Approve CTAs. 4-section accordion: Audience authenticity (91/100, low risk — 4 signals: fake followers, engagement, growth velocity, comment quality); Content safety (96/100, low risk — 4 signals: controversy, hate speech, NSFW, political); Competitor associations (74/100, medium risk — 3 signals: active exclusivity warning, competitor posts, past paid posts); FTC compliance (88/100, low risk — 3 signals: #ad disclosure, paid partnership label, older affiliate posts). Each section: mini score ring (36px), signal preview mini-icons row, risk badge; expand for signal detail rows with pass/warn/fail icon in tinted square, description, source label. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand safety report",
      description: "Expand sections to see individual signal details. Competitor associations is pre-expanded (medium risk — exclusivity overlap).",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
