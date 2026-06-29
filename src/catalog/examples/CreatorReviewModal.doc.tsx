"use client";

import React, { useState } from "react";
import {
  IconX,
  IconThumbUp,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Star rating row                                                       */
/* ------------------------------------------------------------------ */

function StarRow({ label, rating }: { label: string; rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ flex: 1, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)" }}>{label}</span>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} style={{ fontSize: 16, color: i <= rating ? "#F59E0B" : "var(--sd-border-medium)", lineHeight: 1 }}>
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal content                                                         */
/* ------------------------------------------------------------------ */

function CreatorReviewModal() {
  const [overallRating, setOverallRating] = useState(4);
  const [hovered, setHovered] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [feedback, setFeedback] = useState(
    "Priya was a pleasure to work with — highly professional, delivered all assets ahead of schedule, and the quality exceeded our expectations. Her audience engagement was exceptional."
  );

  const displayRating = hovered || overallRating;

  return (
    <div style={{
      width: 480,
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-lg)",
      background: "var(--sd-bg-primary)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
      overflow: "hidden",
    }}>
      {/* Modal header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 16px",
        borderBottom: "1px solid var(--sd-border-light)",
      }}>
        <Avatar name="Priya Nair" tone="purple" size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>
            Review Creator
          </div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>
            Priya Nair · @priya.creates
          </div>
        </div>
        <Button variant="ghost" size="sm" iconOnly aria-label="Close">
          <IconX size={14} />
        </Button>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Campaign context */}
        <div style={{
          fontSize: "var(--sd-text-xs)",
          color: "var(--sd-font-tertiary)",
          background: "var(--sd-bg-secondary)",
          borderRadius: "var(--sd-radius-sm)",
          padding: "8px 12px",
          lineHeight: 1.5,
        }}>
          For: <strong style={{ color: "var(--sd-font-primary)" }}>Atlas Summer X Campaign</strong>
          {" · "}Completed June 2026
        </div>

        {/* Overall star rating */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Overall Rating
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                onClick={() => setOverallRating(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  fontSize: 26, lineHeight: 1,
                  color: i <= displayRating ? "#F59E0B" : "var(--sd-border-medium)",
                  transition: "color 0.1s, transform 0.1s",
                  transform: i === hovered ? "scale(1.2)" : "scale(1)",
                }}
                aria-label={`${i} star${i !== 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
            <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-tertiary)", marginLeft: 6 }}>
              {displayRating}/5
            </span>
          </div>
        </div>

        {/* Dimension ratings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Dimension Ratings
          </div>
          <StarRow label="Communication"    rating={5} />
          <StarRow label="Content Quality"  rating={4} />
          <StarRow label="On-time Delivery" rating={4} />
          <StarRow label="Professionalism"  rating={5} />
        </div>

        {/* Written feedback */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Written Feedback
          </label>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              resize: "vertical",
              border: "1px solid var(--sd-border-medium)",
              borderRadius: "var(--sd-radius-sm)",
              padding: "10px 12px",
              fontSize: "var(--sd-text-sm)",
              color: "var(--sd-font-primary)",
              background: "var(--sd-bg-primary)",
              lineHeight: 1.55,
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={e => { e.currentTarget.style.borderColor = "var(--sd-border-heavy)"; }}
            onBlur={e  => { e.currentTarget.style.borderColor = "var(--sd-border-medium)"; }}
          />
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", textAlign: "right" }}>
            {feedback.length} / 500
          </div>
        </div>

        {/* Tags row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Tags
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button
              onClick={() => setRecommend(r => !r)}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              aria-pressed={recommend}
            >
              <Badge
                label={
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <IconThumbUp size={11} />
                    Would recommend
                  </span>
                }
                tone={recommend ? "green" : "gray"}
                variant={recommend ? "status" : "outline"}
                size="sm"
              />
            </button>
            <Badge label="Lifestyle" tone="purple" variant="status" size="sm" />
            <Badge label="Beauty"    tone="pink"   variant="status" size="sm" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "flex-end", gap: 8,
        padding: "12px 20px",
        borderTop: "1px solid var(--sd-border-light)",
        background: "var(--sd-bg-secondary)",
      }}>
        <Button variant="ghost" size="sm">Skip for now</Button>
        <Button variant="primary" size="sm">Submit Review</Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-review-modal",
  title: "CreatorReviewModal",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Post-campaign creator review modal — overall star rating, four dimension ratings, written feedback, and content tags.",
  description:
    "Shown to brand managers after a campaign completes. Collects an overall 5-star rating, per-dimension scores (Communication, Content Quality, Delivery, Professionalism), a written paragraph, and quick-tag chips. The 'Would recommend' tag toggles between confirmed and unset states.",
  demos: [
    {
      title: "Creator review modal",
      block: true,
      render: () => (
        <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
          <CreatorReviewModal />
        </div>
      ),
    },
  ],
  props: [],
};

export default doc;
