"use client";

import React, { useState } from "react";
import {
  IconCircleCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconExternalLink,
  IconBookmark,
  IconX,
  IconVideo,
  IconPhoto,
  IconDeviceMobile,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Timeline step                                                        */
/* ------------------------------------------------------------------ */

const STEPS = [
  { label: "Brief", date: "Jul 15", done: true },
  { label: "Content Draft", date: "Jul 28", done: false },
  { label: "Review", date: "Aug 5", done: false },
  { label: "Publish", date: "Aug 15", done: false },
];

function BriefTimeline() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, padding: "8px 0" }}>
      {STEPS.map((step, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: step.done ? TONES.green.solid : "var(--sd-bg-tertiary)",
              border: step.done ? "none" : "2px solid var(--sd-border-medium)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: step.done ? "#fff" : "var(--sd-font-tertiary)",
              fontSize: 11, fontWeight: 700, flexShrink: 0,
            }}>
              {step.done ? <IconCircleCheck size={16} /> : i + 1}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: step.done ? "var(--sd-font-primary)" : "var(--sd-font-secondary)" }}>
                {step.label}
              </div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", marginTop: 2 }}>{step.date}</div>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 0, marginTop: 14, height: 2, width: "100%", minWidth: 24, background: i === 0 ? TONES.green.solid : "var(--sd-border-light)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section card                                                         */
/* ------------------------------------------------------------------ */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)",
      padding: "16px 20px",
      background: "var(--sd-bg-primary)",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Detail strip item                                                    */
/* ------------------------------------------------------------------ */

function DetailItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </span>
      <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)", display: "flex", alignItems: "center", gap: 4 }}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverable row                                                      */
/* ------------------------------------------------------------------ */

function DeliverableRow({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "var(--sd-radius-sm)",
        background: TONES.purple.tint, color: TONES.purple.text,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={14} />
      </div>
      <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", lineHeight: 1.5, paddingTop: 4 }}>{text}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main brief viewer                                                    */
/* ------------------------------------------------------------------ */

function CampaignBrief() {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Brand header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
      }}>
        <Avatar name="Glow Beauty Co." shape="rounded" tone="blue" size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
              Glow Beauty Co.
            </span>
            <Badge label="Verified" tone="blue" variant="status" size="sm" />
          </div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 2 }}>Beauty & Skincare · New York, NY</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<IconExternalLink size={13} />}>
          View brand profile
        </Button>
      </div>

      {/* Campaign hero */}
      <div style={{
        padding: "20px",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <h2 style={{ fontSize: "var(--sd-text-xl)", fontWeight: 800, color: "var(--sd-font-primary)", lineHeight: 1.2, margin: 0 }}>
            Atlas Summer X
          </h2>
          <Badge label="Open for applications" tone="green" variant="status" />
        </div>
        <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginBottom: 16 }}>
          Apply by <strong>July 15, 2026</strong>
        </div>

        {/* Detail strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          padding: "14px 0",
          borderTop: "1px solid var(--sd-border-light)",
          borderBottom: "1px solid var(--sd-border-light)",
        }}>
          <DetailItem label="Budget Range">$2,000–$4,000</DetailItem>
          <DetailItem label="Campaign Dates">Jul 15 – Aug 30</DetailItem>
          <DetailItem label="Platforms">
            <IconBrandInstagram size={14} color="#E1306C" />
            <IconBrandTiktok size={14} />
          </DetailItem>
          <DetailItem label="Spots">
            <span>12 creators</span>
            <span style={{ fontWeight: 400, color: "var(--sd-font-tertiary)" }}>(8 remaining)</span>
          </DetailItem>
        </div>
      </div>

      {/* About */}
      <SectionCard title="About this campaign">
        <p style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.65, margin: 0 }}>
          We're launching our summer skincare collection — a lightweight SPF + hydration line for active lifestyles.
          We're looking for creators who authentically incorporate beauty into their daily routines and can showcase
          the product in real, sun-filled moments. Content should feel natural, not over-produced.
        </p>
      </SectionCard>

      {/* Deliverables */}
      <SectionCard title="Deliverables">
        <DeliverableRow icon={IconVideo} text="2× Instagram Reels (60–90 sec) — must include product demo in natural lighting" />
        <DeliverableRow icon={IconPhoto} text="1× Instagram Story series (3–5 slides) — swipe-up link to product page required" />
        <DeliverableRow icon={IconDeviceMobile} text="1× TikTok video (30–60 sec) — trend-native format encouraged" />
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 4 }}>
          <IconCircleCheck size={14} color={TONES.green.text} />
          <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)" }}>
            Usage rights: 90-day brand repurposing on paid social channels
          </span>
        </div>
      </SectionCard>

      {/* Requirements */}
      <SectionCard title="Creator requirements">
        <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Minimum 50K followers on Instagram or TikTok",
            "Beauty, lifestyle, or wellness niche",
            "US-based audience ≥ 60%",
            "No active competitor brand deals (skincare/SPF)",
            "Engagement rate ≥ 3.0%",
          ].map((req, i) => (
            <li key={i} style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.5 }}>
              {req}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Timeline */}
      <SectionCard title="Campaign timeline">
        <BriefTimeline />
      </SectionCard>

      {/* CTA footer */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "14px 16px",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
      }}>
        <Button variant="primary" leftIcon={<IconCircleCheck size={15} />} style={{ flex: 1 }}>
          Apply Now
        </Button>
        <Button
          variant="secondary"
          leftIcon={saved ? <IconCircleCheck size={15} /> : <IconBookmark size={15} />}
          onClick={() => setSaved(v => !v)}
        >
          {saved ? "Saved" : "Save for Later"}
        </Button>
        <Button variant="ghost" leftIcon={<IconX size={15} />}>
          Pass on this
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                  */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "campaign-brief-viewer",
  title: "CampaignBriefViewer",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Creator-facing campaign brief — what a creator sees after receiving an invite, before negotiation begins.",
  description:
    "Displays all the information a creator needs to evaluate a campaign opportunity: brand identity, budget range, deliverables, requirements, timeline, and a clear apply/pass CTA. Designed to be shown inside a modal or side panel after accepting a campaign invite.",
  demos: [
    {
      title: "Campaign brief",
      block: true,
      plain: true,
      render: () => <CampaignBrief />,
    },
  ],
  props: [],
};

export default doc;
