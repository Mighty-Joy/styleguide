"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconStar,
  IconStarFilled,
  IconCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconChevronDown,
  IconChevronUp,
  IconSend,
  IconFlag,
  IconUserCheck,
  IconClock,
  IconMessageCircle,
  IconPhoto,
  IconBolt,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface Dimension {
  id: string;
  label: string;
  icon: React.ElementType;
  score: number | null;
  maxScore: 5;
  note: string;
  placeholder: string;
}

/* ---- seed ---- */
const DIMENSIONS_INIT: Dimension[] = [
  { id: "d1", label: "Content quality",      icon: IconPhoto,         score: 5, maxScore: 5, note: "Absolutely stunning final output — exceeded expectations on composition and color.", placeholder: "How was the content quality?" },
  { id: "d2", label: "Responsiveness",        icon: IconMessageCircle, score: 4, maxScore: 5, note: "Quick replies throughout, minor delay on the final approval day.",                  placeholder: "How responsive were they?"   },
  { id: "d3", label: "Brief adherence",       icon: IconCheck,         score: 5, maxScore: 5, note: "Followed all guidelines — tone, hashtags, caption structure — to the letter.",      placeholder: "Did they follow the brief?"  },
  { id: "d4", label: "Deliverable timeliness", icon: IconClock,        score: 4, maxScore: 5, note: "Submitted one day late but communicated proactively about the extension.",           placeholder: "Were deliverables on time?"  },
  { id: "d5", label: "Professionalism",       icon: IconUserCheck,     score: 5, maxScore: 5, note: "An absolute pleasure — warm, collaborative, proactive at every stage.",             placeholder: "How professional were they?" },
];

function overallScore(dims: Dimension[]): number | null {
  const rated = dims.filter((d) => d.score !== null);
  if (!rated.length) return null;
  const avg = rated.reduce((s, d) => s + (d.score ?? 0), 0) / rated.length;
  return Math.round(avg * 10) / 10;
}

function scoreColor(score: number | null): string {
  if (score === null) return "var(--sd-font-tertiary, #999)";
  if (score >= 4.5) return TONES.green.text;
  if (score >= 3.5) return TONES.blue.text;
  if (score >= 2.5) return TONES.yellow.text;
  return TONES.red.text;
}

function scoreTone(score: number | null): keyof typeof TONES {
  if (score === null) return "gray";
  if (score >= 4.5) return "green";
  if (score >= 3.5) return "blue";
  if (score >= 2.5) return "yellow";
  return "red";
}

function ScoreLabel({ score }: { score: number | null }) {
  if (score === null) return null;
  const label = score >= 4.5 ? "Outstanding" : score >= 3.5 ? "Great" : score >= 2.5 ? "Good" : "Needs work";
  const tone = scoreTone(score);
  return <Badge label={label} tone={tone} size="sm" dot />;
}

/* ---- StarRow ---- */
function StarRow({ score, max = 5, onChange }: { score: number | null; max?: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? score ?? 0;

  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => {
        const val = i + 1;
        const filled = val <= active;
        return (
          <button key={i}
            onMouseEnter={() => onChange && setHovered(val)}
            onMouseLeave={() => onChange && setHovered(null)}
            onClick={() => onChange?.(val)}
            style={{ background: "none", border: "none", padding: 0, cursor: onChange ? "pointer" : "default", color: filled ? "#f59e0b" : "var(--sd-border-default, #d1d5db)", display: "flex" }}>
            {filled ? <IconStarFilled size={16} /> : <IconStar size={16} />}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [dimensions, setDimensions] = useState<Dimension[]>(DIMENSIONS_INIT);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [recommend, setRecommend] = useState<boolean | null>(true);

  function setScore(id: string, val: number) {
    setDimensions((prev) => prev.map((d) => d.id === id ? { ...d, score: d.score === val ? null : val } : d));
  }

  const overall = overallScore(dimensions);
  const allRated = dimensions.every((d) => d.score !== null);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
        <Avatar initials="PN" tone="green" size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Priya Nair</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
            <IconBrandInstagram size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>@priya.creates · 248K</span>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>·</span>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Summer Glow campaign</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <Badge label="Completed" tone="green" size="sm" dot />
            <Badge label="3 posts · 2 stories" tone="gray" size="sm" />
          </div>
        </div>
        {overall !== null && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: scoreColor(overall), lineHeight: 1 }}>{overall.toFixed(1)}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>/ 5.0 overall</div>
          </div>
        )}
      </div>

      {/* Overall badge */}
      {overall !== null && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "10px 14px", background: TONES[scoreTone(overall)].tint, borderRadius: 10 }}>
          <IconBolt size={14} style={{ color: TONES[scoreTone(overall)].text, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: TONES[scoreTone(overall)].text }}>
            {overall >= 4.5 ? "Outstanding creator — highly recommend for future campaigns." : overall >= 3.5 ? "Great collab — minor areas to follow up on next time." : "Solid performance with some areas to improve."}
          </span>
          <span style={{ marginLeft: "auto" }}><ScoreLabel score={overall} /></span>
        </div>
      )}

      {/* Dimension cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {dimensions.map((dim) => {
          const DIcon = dim.icon;
          const isOpen = expandedNote === dim.id;
          return (
            <div key={dim.id} style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: dim.score !== null ? TONES[scoreTone(dim.score)].tint : "var(--sd-bg-secondary, #f1f1f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <DIcon size={13} style={{ color: dim.score !== null ? TONES[scoreTone(dim.score)].text : "var(--sd-font-tertiary, #999)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{dim.label}</div>
                </div>
                <StarRow score={dim.score} onChange={(v) => setScore(dim.id, v)} />
                <button onClick={() => setExpandedNote(isOpen ? null : dim.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
                  {isOpen ? <IconChevronUp size={13} /> : <IconChevronDown size={13} />}
                </button>
              </div>
              {isOpen && (
                <div style={{ padding: "0 14px 12px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", paddingTop: 10 }}>
                  <textarea
                    defaultValue={dim.note}
                    placeholder={dim.placeholder}
                    rows={2}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", background: "var(--sd-bg-secondary, #fafafa)", boxSizing: "border-box" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Re-invite toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Re-invite for future campaigns?</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Saved to creator's profile for your team.</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { val: true,  icon: IconUserCheck, label: "Yes", tone: "green" as const },
            { val: false, icon: IconFlag,       label: "No",  tone: "red"   as const },
          ].map(({ val, icon: Icon, label, tone }) => (
            <button key={String(val)} onClick={() => setRecommend(val)}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${recommend === val ? TONES[tone].text : "var(--sd-border-default, #e5e7eb)"}`, background: recommend === val ? TONES[tone].tint : "transparent", cursor: "pointer", fontSize: 12, fontWeight: 700, color: recommend === val ? TONES[tone].text : "var(--sd-font-tertiary, #999)" }}>
              <Icon size={12} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      {submitted ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: TONES.green.tint, borderRadius: 10, fontSize: 12, fontWeight: 700, color: TONES.green.text }}>
          <IconCheck size={14} />Scorecard saved to Priya's creator profile.
        </div>
      ) : (
        <Button variant="primary" size="sm" leftIcon={<IconSend size={12} />} disabled={!allRated || recommend === null} onClick={() => setSubmitted(true)}>
          Submit scorecard
        </Button>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-scorecard",
  title: "CreatorScorecard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Post-campaign creator rating card — 5 star-rated dimensions, re-invite decision, and scorecard submission that saves to the creator's profile.",
  description:
    "Lets brand teams rate creator performance after a campaign closes. Creator header: avatar, handle, follower count, campaign name, completion + deliverable badges, overall score readout. Overall summary banner: tone-matched tint with headline sentence and rating badge. 5 rated dimensions — content quality, responsiveness, brief adherence, timeliness, professionalism — each with a clickable star row (1–5), optional notes textarea on expand, and icon in a tone-matched tinted circle. Re-invite toggle: Yes (green) / No (red) with border highlight. Submit button: disabled until all dimensions rated and re-invite selected; on submit shows a green confirmation banner. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator scorecard",
      description: "Click the stars on any dimension to change the rating. Expand rows to edit notes. Toggle the re-invite decision, then submit.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
