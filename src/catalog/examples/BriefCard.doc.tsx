"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconPhoto,
  IconVideo,
  IconBolt,
  IconHash,
  IconCheck,
  IconX,
  IconLink,
  IconClock,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type DeliverableType = "post" | "reel" | "story" | "ugc" | "video";
type Platform = "instagram" | "tiktok" | "youtube";

interface Deliverable {
  id: string;
  type: DeliverableType;
  platform: Platform;
  dueDate: string;
  handle?: string;
  usageRights?: string;
  status: "pending" | "script" | "shot" | "edited" | "approved" | "live";
}

interface BriefData {
  campaignName: string;
  brand: string;
  brandInitials: string;
  brandTone: keyof typeof TONES;
  dealType: "PAID" | "GIFTING" | "UGC" | "AFFILIATE";
  amount?: string;
  headline: string;
  talkingPoints: string[];
  doNots: string[];
  mustMentions: string[];
  hashtags: string[];
  referralLink?: string;
  deliverables: Deliverable[];
  scriptDeadline: string;
  postDeadline: string;
}

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

const DELIVERABLE_TYPE_ICONS: Record<DeliverableType, React.ElementType> = {
  post:  IconPhoto,
  reel:  IconVideo,
  story: IconPhoto,
  ugc:   IconVideo,
  video: IconVideo,
};

const DELIVERABLE_TYPE_LABELS: Record<DeliverableType, string> = {
  post: "Static Post", reel: "Reel", story: "Story", ugc: "UGC Content", video: "Video",
};

const STATUS_META: Record<Deliverable["status"], { label: string; tone: keyof typeof TONES }> = {
  pending:  { label: "Pending",  tone: "yellow" },
  script:   { label: "Script",   tone: "blue" },
  shot:     { label: "Shot",     tone: "yellow" },
  edited:   { label: "Edited",   tone: "orange" },
  approved: { label: "Approved", tone: "purple" },
  live:     { label: "Live",     tone: "green" },
};

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const BRIEF: BriefData = {
  campaignName: "Atlas X Summer",
  brand: "Atlas X",
  brandInitials: "AX",
  brandTone: "purple",
  dealType: "PAID",
  amount: "$2,500",
  headline: "Show your real morning skincare routine featuring the Atlas X Glow Serum.",
  talkingPoints: [
    "You use it every morning before SPF",
    "You noticed a difference in skin texture within 2 weeks",
    "The lightweight formula doesn't pill under makeup",
    "It works for your combination skin type",
  ],
  doNots: [
    "Do not make medical or dermatologist claims",
    "Do not compare to competitor products by name",
    "Do not cover the product label in the frame",
  ],
  mustMentions: [
    "Use the code PRIYA15 for 15% off",
    "Link in bio → atlasxbeauty.com",
    "Disclose: #gifted or #ad in caption",
  ],
  hashtags: ["#AtlasXGlow", "#AtlasXPartner", "#MorningRoutine", "#SkincareRoutine"],
  referralLink: "atlasxbeauty.com/priya",
  deliverables: [
    { id: "1", type: "reel",  platform: "instagram", dueDate: "Aug 10", handle: "@priya",     status: "script" },
    { id: "2", type: "story", platform: "instagram", dueDate: "Aug 12", handle: "@priya",     status: "pending" },
    { id: "3", type: "video", platform: "tiktok",    dueDate: "Aug 15", handle: "@priya",     status: "pending" },
  ],
  scriptDeadline: "Aug 5",
  postDeadline: "Aug 15",
};

/* ------------------------------------------------------------------ */
/* Section wrapper                                                       */
/* ------------------------------------------------------------------ */

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid var(--sd-border-light)" }}>
      <Button variant="ghost" onClick={() => setOpen(v => !v)}
        style={{ width: "100%", justifyContent: "space-between", borderRadius: "var(--sd-radius-sm)", padding: "10px 16px", height: "auto" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</span>
        {open ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary)" }} />}
      </Button>
      {open && <div style={{ padding: "0 16px 12px" }}>{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BriefCard                                                             */
/* ------------------------------------------------------------------ */

function BriefCard({ brief }: { brief: BriefData }) {
  const brandTone = TONES[brief.brandTone];

  return (
    <div style={{ background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", maxWidth: 560 }}>
      {/* Header */}
      <div style={{ background: brandTone.tint, borderBottom: "1px solid var(--sd-border-light)", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials={brief.brandInitials} tone={brief.brandTone} size="md" shape="rounded" />
          <div>
            <div style={{ fontSize: 11, color: brandTone.text, fontWeight: 500, opacity: 0.75 }}>{brief.brand}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: brandTone.text, letterSpacing: "-0.01em" }}>{brief.campaignName}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 11, color: brandTone.text, fontWeight: 500, opacity: 0.75 }}>Deal value</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: brandTone.text }}>{brief.amount ?? "Gifting"}</div>
          </div>
        </div>
      </div>

      {/* Headline */}
      <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--sd-font-primary)", lineHeight: 1.45 }}>{brief.headline}</p>
      </div>

      {/* Deliverables */}
      <Section title="Deliverables">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {brief.deliverables.map((d) => {
            const PlatIcon = PLATFORM_ICONS[d.platform];
            const TypeIcon = DELIVERABLE_TYPE_ICONS[d.type];
            const sm = STATUS_META[d.status];
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", border: "1px solid var(--sd-border-light)" }}>
                <span style={{ width: 28, height: 28, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sd-font-secondary)", flexShrink: 0 }}>
                  <TypeIcon size={14} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{DELIVERABLE_TYPE_LABELS[d.type]}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>
                    <PlatIcon size={10} />{d.handle}
                  </div>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                  <IconCalendar size={10} />{d.dueDate}
                </span>
                <Badge label={sm.label} tone={sm.tone} size="sm" />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", border: "1px solid var(--sd-border-light)" }}>
            <IconClock size={12} style={{ color: "var(--sd-font-tertiary)" }} />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Script due</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-primary)", marginLeft: "auto" }}>{brief.scriptDeadline}</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", border: "1px solid var(--sd-border-light)" }}>
            <IconBolt size={12} style={{ color: TONES.green.solid }} />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Post by</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-primary)", marginLeft: "auto" }}>{brief.postDeadline}</span>
          </div>
        </div>
      </Section>

      {/* Talking points */}
      <Section title="Talking points">
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
          {brief.talkingPoints.map((pt, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.45 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: TONES.green.tint, color: TONES.green.solid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <IconCheck size={9} />
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </Section>

      {/* Do nots */}
      <Section title="Do not" defaultOpen={false}>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
          {brief.doNots.map((pt, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.45 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#fee2e2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <IconX size={9} />
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </Section>

      {/* Must mentions */}
      <Section title="Must mention" defaultOpen={false}>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
          {brief.mustMentions.map((pt, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.45 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: TONES.blue.tint, color: TONES.blue.solid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <IconBolt size={9} />
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </Section>

      {/* Hashtags + link */}
      <div style={{ padding: "10px 16px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Hashtags & links</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {brief.hashtags.map(tag => (
            <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 3, height: 22, padding: "0 8px", borderRadius: "var(--sd-radius-pill)", background: "var(--sd-bg-tertiary)", color: "var(--sd-font-secondary)", fontSize: 12, fontWeight: 500 }}>
              <IconHash size={10} />{tag.replace("#", "")}
            </span>
          ))}
          {brief.referralLink && (
            <Badge label={brief.referralLink} tone="blue" icon={IconLink} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "brief-card",
  title: "BriefCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Campaign creative brief card — deliverables, talking points, do-nots, must-mentions, hashtags. Collapsible sections.",
  description:
    "BriefCard is shown to creators inside the deal view. It communicates the full campaign brief in one card: gradient header with brand initials + deal value, headline copy, an accordion of collapsible sections (Deliverables with status badges + deadline chips, Talking Points with green ✓ bullets, Do Nots with red × bullets, Must Mentions with blue ⚡ bullets), and a hashtag/referral-link strip at the bottom. All sections are independently collapsible.",
  demos: [
    {
      title: "Campaign brief",
      description: "Full brief for an Atlas X paid deal. Click section headers to collapse/expand.",
      block: true,
      render: () => <BriefCard brief={BRIEF} />,
    },
  ],
  props: [],
};

export default doc;
