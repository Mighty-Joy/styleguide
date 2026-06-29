"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconClock,
  IconCurrencyDollar,
  IconPhoto,
  IconCalendar,
  IconMapPin,
  IconShieldCheck,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconBrandInstagram,
  IconPackage,
  IconLink,
  IconAlertCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- Demo ---- */
type InviteState = "pending" | "accepted" | "declined" | "negotiating";

function Demo() {
  const [state,    setState]    = useState<InviteState>("pending");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [counter,  setCounter]  = useState(false);

  const DELIVERABLES = [
    { icon: IconPhoto,       label: "2 × Instagram Reels (45–60s)",         note: "Go-live Jul 1–15" },
    { icon: IconPhoto,       label: "1 × Instagram Feed post",              note: "Go-live Jul 8" },
    { icon: IconBrandInstagram, label: "2 × Story frames (day of reel post)", note: "Swipe-up to product page" },
  ];

  const TERMS = [
    { icon: IconCurrencyDollar, label: "Creator fee",        value: "$2,800",           detail: "Net-30 payment via bank transfer after content goes live." },
    { icon: IconCalendar,       label: "Response window",    value: "48 hours",          detail: "Accept or decline by Jul 1, 2025 at 11:59 PM." },
    { icon: IconCalendar,       label: "Content deadline",   value: "Jun 28 (draft)",    detail: "Draft submitted Jun 28 for approval. Go-live Jul 1." },
    { icon: IconShieldCheck,    label: "Exclusivity",        value: "30 days",           detail: "No competing skincare brand posts Jun 15 – Jul 15." },
    { icon: IconMapPin,         label: "Usage rights",       value: "6 months, paid ads",detail: "Aura Labs may repurpose content in paid social ads through Dec 2025." },
    { icon: IconPackage,        label: "Product seeding",    value: "Kit shipped",       detail: "Summer Glow kit arrives Jun 24 (tracking: 1Z999AA1)." },
    { icon: IconLink,           label: "Discount code",      value: "PRIYA20 · 20% off", detail: "Affiliate code. Commission: 15% of attributed revenue." },
  ];

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Brand header */}
      <div style={{ background: "linear-gradient(135deg,#1c1917,#292524)", borderRadius: 12, padding: "18px 20px", marginBottom: 14, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <Avatar initials="AL" tone="yellow" size="md" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 900 }}>Aura Labs</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <IconStar size={11} style={{ color: "#f59e0b" }} /><span style={{ fontSize: 10, opacity: 0.7 }}>4.9 · 38 campaigns completed</span>
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            {state === "pending"     && <Badge label="Invite pending"  tone="blue"   dot />}
            {state === "accepted"    && <Badge label="Accepted"        tone="green"  dot />}
            {state === "declined"    && <Badge label="Declined"        tone="gray"   dot />}
            {state === "negotiating" && <Badge label="Counter sent"    tone="yellow" dot />}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Campaign</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Summer Glow Vol. 2</div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 3 }}>Skincare · 5 creators · Jul 1 – Jul 31</div>
        </div>
      </div>

      {/* Fee callout */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, marginBottom: 14, background: TONES.orange.tint }}>
        <div>
          <div style={{ fontSize: 11, color: TONES.orange.text, fontWeight: 700, marginBottom: 2 }}>Creator fee</div>
          <div style={{ fontSize: 24, fontWeight: 900 }}>$2,800</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--sd-font-secondary, #555)", marginBottom: 3 }}>
            <IconClock size={11} style={{ display: "inline" }} /> Respond within <strong>48h</strong>
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Deadline: Jul 1, 2025</div>
        </div>
      </div>

      {/* Deliverables */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
        <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, fontWeight: 700 }}>
          Deliverables · {DELIVERABLES.length} items
        </div>
        {DELIVERABLES.map((d, i) => {
          const DIcon = d.icon;
          return (
            <div key={i} style={{ display: "flex", gap: 10, padding: "9px 14px", borderBottom: i < DELIVERABLES.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", alignItems: "center" }}>
              <DIcon size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{d.label}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{d.note}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terms accordion */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, fontWeight: 700 }}>Terms</div>
        {TERMS.map((t, i) => {
          const TIcon = t.icon;
          const isOpen = expanded === t.label;
          return (
            <div key={t.label} style={{ borderBottom: i < TERMS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
              <button onClick={() => setExpanded(isOpen ? null : t.label)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <TIcon size={12} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, flex: 1 }}>{t.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{t.value}</span>
                {isOpen ? <IconChevronUp size={11} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} /> : <IconChevronDown size={11} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />}
              </button>
              {isOpen && (
                <div style={{ padding: "0 14px 10px 36px", fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5, borderTop: "1px solid var(--sd-border-default, #e5e7eb)", paddingTop: 8 }}>
                  {t.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Usage rights warning */}
      <div style={{ display: "flex", gap: 8, padding: "9px 12px", background: TONES.yellow.tint, borderRadius: 8, marginBottom: 14, fontSize: 11 }}>
        <IconAlertCircle size={13} style={{ color: TONES.yellow.text, flexShrink: 0, marginTop: 1 }} />
        <span style={{ color: TONES.yellow.text, fontWeight: 600 }}>Usage rights include paid ads for 6 months. Review before accepting.</span>
      </div>

      {/* CTAs */}
      {state === "pending" && (
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="primary" size="sm" leftIcon={<IconCheck size={12} />} onClick={() => setState("accepted")} style={{ flex: 1 }}>
            Accept invite
          </Button>
          <Button variant="secondary" size="sm" onClick={() => { setCounter(true); setState("negotiating"); }}>
            Counter offer
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconX size={12} />} onClick={() => setState("declined")}>
            Decline
          </Button>
        </div>
      )}
      {state === "accepted" && (
        <div style={{ padding: "12px 14px", background: TONES.green.tint, borderRadius: 10, fontSize: 12, fontWeight: 700, color: TONES.green.text, display: "flex", gap: 8, alignItems: "center" }}>
          <IconCheck size={14} />You've accepted! Aura Labs will follow up with the brief and contract.
        </div>
      )}
      {state === "declined" && (
        <div style={{ padding: "12px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, fontSize: 12, color: "var(--sd-font-tertiary, #999)", display: "flex", gap: 8, alignItems: "center" }}>
          <IconX size={14} />Invite declined. Aura Labs has been notified.
        </div>
      )}
      {state === "negotiating" && (
        <div style={{ padding: "12px 14px", background: TONES.yellow.tint, borderRadius: 10, fontSize: 12, fontWeight: 700, color: TONES.yellow.text, display: "flex", gap: 8, alignItems: "center" }}>
          <IconAlertCircle size={14} />Counter offer sent — waiting for Aura Labs to respond.
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-invite-preview",
  title: "CampaignInvitePreview",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator-facing campaign invitation — brand header, fee callout, deliverables list, expandable terms, usage-rights warning, and Accept / Counter offer / Decline CTAs with state transitions.",
  description:
    "The invitation card a creator sees when a brand invites them to a campaign. Dark gradient brand header: brand avatar, name, star rating + campaign count, campaign name/niche/dates, status badge. Fee callout: orange tint, creator fee in large type, 48h countdown, deadline date. Deliverables section: list with icon + label + go-live note. Terms accordion: 7 rows (fee, response window, deadline, exclusivity, usage rights, product kit, affiliate code) — expand each for detail. Yellow usage-rights warning banner. Three CTA states: Accept invite → green confirmation; Counter offer → yellow 'waiting' state; Decline → gray 'notified' state. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign invite preview",
      description: "Expand any term row for detail. Click Accept invite, Counter offer, or Decline to see each state transition.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
