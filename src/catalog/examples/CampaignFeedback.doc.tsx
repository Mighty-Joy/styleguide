"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconStar,
  IconStarFilled,
  IconCheck,
  IconLock,
  IconEye,
  IconEyeOff,
  IconSend,
  IconShield,
  IconArrowRight,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type ReviewState = "pending" | "submitted" | "both_done";

interface StarRatingProps {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}

function StarRating({ value, onChange, readOnly }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const active = (hover || value) >= s;
        return (
          <button key={s} disabled={readOnly}
            onClick={() => onChange?.(s)}
            onMouseEnter={() => !readOnly && setHover(s)}
            onMouseLeave={() => setHover(0)}
            style={{ background: "none", border: "none", cursor: readOnly ? "default" : "pointer", padding: 0, lineHeight: 1 }}>
            {active
              ? <IconStarFilled size={18} style={{ color: "#f59e0b" }} />
              : <IconStar       size={18} style={{ color: "#d1d5db" }} />}
          </button>
        );
      })}
    </div>
  );
}

const DIMENSIONS_CREATOR = [
  { key: "communication",  label: "Communication"         },
  { key: "professionalism", label: "Professionalism"      },
  { key: "content_quality", label: "Content quality"      },
  { key: "timeliness",      label: "Timeliness"           },
];

const DIMENSIONS_BRAND = [
  { key: "brief_clarity",   label: "Brief clarity"        },
  { key: "responsiveness",  label: "Responsiveness"       },
  { key: "payment_speed",   label: "Payment speed"        },
  { key: "overall_exp",     label: "Overall experience"   },
];

const BRAND_REVIEW = {
  overallRating: 4,
  dimensions: { brief_clarity: 5, responsiveness: 4, payment_speed: 4, overall_exp: 4 },
  written: "The brief was clear and Priya was genuinely great to work with. Content exceeded our expectations — the glow demo at the 0:12 mark performed especially well. Would definitely work together again for future campaigns.",
};

/* ---- Demo ---- */
function Demo() {
  const [myState, setMyState] = useState<ReviewState>("pending");
  const [overallRating, setOverallRating] = useState(0);
  const [dimRatings, setDimRatings] = useState<Record<string, number>>({});
  const [written, setWritten] = useState("");
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function setDim(key: string, val: number) {
    setDimRatings((prev) => ({ ...prev, [key]: val }));
  }

  function submit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setMyState("both_done"); }, 1100);
  }

  const canSubmit = overallRating > 0 && Object.keys(dimRatings).length === DIMENSIONS_CREATOR.length && written.trim().length >= 10;
  const bothDone = myState === "both_done";

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Post-campaign review</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Aura Labs × Priya Nair</div>
        </div>
        <Badge label={bothDone ? "Both reviews in" : myState === "submitted" ? "Your review submitted" : "Awaiting your review"} tone={bothDone ? "green" : myState === "submitted" ? "blue" : "yellow"} size="sm" dot />
      </div>

      {/* Blind-reveal note */}
      <div style={{ display: "flex", gap: 8, padding: "9px 12px", background: TONES.blue.tint, borderRadius: 9, marginBottom: 16, alignItems: "flex-start" }}>
        <IconShield size={14} style={{ color: TONES.blue.text, flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 11, color: TONES.blue.text, lineHeight: 1.5 }}>
          <strong>Blind review:</strong> both sides submit independently. Neither sees the other's review until both have submitted — just like Airbnb.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* === Creator's review of brand === */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 10 }}>Your review of Aura Labs</div>

          {myState === "pending" && (
            <>
              {/* Overall */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 5, color: "var(--sd-font-secondary,#555)" }}>Overall rating</div>
                <StarRating value={overallRating} onChange={setOverallRating} />
                {overallRating > 0 && (
                  <div style={{ fontSize: 10, color: TONES.orange.text, marginTop: 3, fontWeight: 600 }}>
                    {["","Poor","Fair","Good","Very good","Excellent!"][overallRating]}
                  </div>
                )}
              </div>

              {/* Dimensions */}
              <div style={{ marginBottom: 12 }}>
                {DIMENSIONS_BRAND.map(({ key, label }) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
                    <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)", fontWeight: 600 }}>{label}</div>
                    <StarRating value={dimRatings[key] || 0} onChange={(v) => setDim(key, v)} />
                  </div>
                ))}
              </div>

              {/* Would you recommend */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 5, color: "var(--sd-font-secondary,#555)" }}>Would you work with this brand again?</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {([true, false] as const).map((v) => (
                    <button key={String(v)} onClick={() => setRecommend(v)}
                      style={{ flex: 1, padding: "6px 10px", borderRadius: 8, border: `1.5px solid ${recommend === v ? (v ? TONES.green.text : TONES.red.text) : "var(--sd-border-default,#e5e7eb)"}`, background: recommend === v ? (v ? TONES.green.tint : TONES.red.tint) : "transparent", cursor: "pointer", fontSize: 11, fontWeight: 700, color: recommend === v ? (v ? TONES.green.text : TONES.red.text) : "var(--sd-font-secondary,#555)" }}>
                      {v ? "Yes, definitely" : "Probably not"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Written */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 5, color: "var(--sd-font-secondary,#555)" }}>Written feedback (min. 10 chars)</div>
                <textarea value={written} onChange={(e) => setWritten(e.target.value)} placeholder="Share your honest experience with this brand…"
                  style={{ width: "100%", minHeight: 80, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, padding: "8px 10px", fontSize: 11, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5 }} />
                <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 2 }}>{written.length} chars</div>
              </div>

              <Button variant="primary" size="sm" onClick={submit} disabled={!canSubmit || submitting}
                leftIcon={submitting ? undefined : <IconSend size={11} />} style={{ width: "100%" }}>
                {submitting ? "Submitting…" : "Submit review"}
              </Button>
            </>
          )}

          {myState === "submitted" && !bothDone && (
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 99, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <IconCheck size={18} style={{ color: TONES.green.text }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Review submitted!</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 3 }}>Waiting for Aura Labs to submit theirs…</div>
              <div style={{ marginTop: 10 }}>
                <Badge label="Their review: pending" tone="yellow" size="sm" dot />
              </div>
            </div>
          )}

          {bothDone && (
            <div style={{ padding: "12px", background: TONES.green.tint, borderRadius: 10 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                <IconCheck size={12} style={{ color: TONES.green.text }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: TONES.green.text }}>Your review of Aura Labs</span>
              </div>
              <StarRating value={overallRating || 4} readOnly />
              <div style={{ fontSize: 11, marginTop: 6, lineHeight: 1.5, color: "var(--sd-font-secondary,#333)" }}>
                {written || "Great campaign experience — clear brief, quick payments, and very open to creative input during the revision process."}
              </div>
            </div>
          )}
        </div>

        {/* === Brand's review of creator === */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 10 }}>Aura Labs' review of you</div>

          {!bothDone ? (
            <div style={{ padding: "20px 12px", border: "1.5px dashed var(--sd-border-default,#e5e7eb)", borderRadius: 12, textAlign: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 99, background: "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <IconLock size={16} style={{ color: "var(--sd-font-tertiary,#999)" }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>Hidden until both submit</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 3, lineHeight: 1.5 }}>
                Aura Labs has already submitted their review. You'll see it as soon as you submit yours.
              </div>
              <div style={{ marginTop: 8 }}>
                <Badge label="Brand review: ready to reveal" tone="blue" size="sm" dot />
              </div>
            </div>
          ) : (
            <div style={{ padding: "12px", background: TONES.blue.tint, borderRadius: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <Avatar initials="AL" tone="orange" size="sm" />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>Aura Labs</div>
                  <StarRating value={BRAND_REVIEW.overallRating} readOnly />
                </div>
              </div>

              {DIMENSIONS_CREATOR.map(({ key, label }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>{label}</div>
                  <StarRating value={BRAND_REVIEW.dimensions[key as keyof typeof BRAND_REVIEW.dimensions] ?? 4} readOnly />
                </div>
              ))}

              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: 11, lineHeight: 1.55, color: "var(--sd-font-secondary,#333)", fontStyle: "italic" }}>
                "{BRAND_REVIEW.written}"
              </div>
              <div style={{ marginTop: 6 }}>
                <Badge label="Would work together again" tone="green" size="sm" dot />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA row after both done */}
      {bothDone && (
        <div style={{ marginTop: 14, padding: "10px 14px", background: TONES.green.tint, borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
          <IconCheck size={14} style={{ color: TONES.green.text, flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 11, color: TONES.green.text, fontWeight: 700 }}>Both reviews submitted — they're now visible to each other and count toward your reputation scores.</div>
          <Button variant="secondary" size="sm">View profile</Button>
        </div>
      )}

      {/* Simulate brand already submitted */}
      {myState === "pending" && (
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <button onClick={() => setMyState("submitted")}
            style={{ fontSize: 10, color: TONES.blue.text, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            (Demo: skip to state where your review is submitted)
          </button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-feedback",
  title: "CampaignFeedback",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Post-campaign mutual blind review — creator rates brand across 4 dimensions, brand's review stays locked until both submit (Airbnb-style reveal). 5-star hover, dimension breakdown, written feedback.",
  description:
    "Blind mutual review after a campaign completes. Header: campaign name, pair names, status badge (Awaiting / Your review submitted / Both reviews in). Blue 'blind review' info callout explains the Airbnb-style mechanics. Two-column layout: LEFT — creator's review form: overall 5-star hover rating with Excellent/Poor labels, 4 dimension star rows (brief clarity, responsiveness, payment speed, overall experience), Yes/Definitely vs Probably not recommend buttons (green/red tint on selection), written textarea (10-char minimum, live char count), Submit button disabled until all fields filled. RIGHT — brand's review: locked (dashed border, padlock icon, 'hidden until both submit' message + 'Brand review: ready to reveal' badge); after reveal: AL orange avatar, 4-star rating, 4 dimension rows (communication, professionalism, content quality, timeliness), italicized written quote, 'Would work together again' green badge. After both submit: green banner across bottom — 'Both reviews visible to each other'. Demo link to skip states. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Post-campaign mutual feedback",
      description: "Fill in all stars + a 10+ char written review and click Submit. Brand's review reveals immediately (simulating blind unlock). Or use the demo shortcut link to skip ahead.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
