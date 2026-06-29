"use client";

import React, { useState } from "react";
import {
  IconMapPin,
  IconUsers,
  IconSpeakerphone,
  IconCurrencyDollar,
  IconExternalLink,
  IconBuildingStore,
  IconStar,
  IconCalendar,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import AvatarGroup from "@/components/ui/AvatarGroup/AvatarGroup";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import RecordList from "@/components/ui/RecordList/RecordList";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Sample data                                                           */
/* ------------------------------------------------------------------ */

const PAST_CAMPAIGNS = [
  { id: "c1", name: "Spring Refresh",    dates: "Feb – Mar 2026", creators: 12, status: "completed" as const, avgDeal: "$14,200" },
  { id: "c2", name: "Glow Up Series",   dates: "Oct – Nov 2025", creators: 8,  status: "completed" as const, avgDeal: "$16,400" },
  { id: "c3", name: "Holiday Radiance", dates: "Nov – Dec 2025", creators: 18, status: "completed" as const, avgDeal: "$12,800" },
  { id: "c4", name: "Clean Beauty Edit", dates: "Jul – Aug 2025", creators: 6, status: "completed" as const, avgDeal: "$18,000" },
];

const STATUS_TONE: Record<string, "green" | "blue" | "gray"> = {
  active: "blue",
  completed: "green",
  paused: "gray",
};

const PAST_CREATORS = [
  { initials: "PN", tone: "purple" as const, label: "Priya Nair" },
  { initials: "SK", tone: "pink" as const,   label: "Sofia Kim" },
  { initials: "MJ", tone: "blue" as const,   label: "Marcus James" },
  { initials: "AL", tone: "orange" as const, label: "Ava Lee" },
  { initials: "TW", tone: "sky" as const,    label: "Tia Walsh" },
  { initials: "RC", tone: "red" as const,    label: "Ruby Chen" },
  { initials: "EL", tone: "turquoise" as const, label: "Eli Lopez" },
  { initials: "NB", tone: "yellow" as const, label: "Nadia Bose" },
];

const REVIEWS = [
  {
    id: "r1", name: "Priya Nair", tone: "purple" as const, rating: 5,
    quote: "Super professional team — brief was clear, payments on time, and they gave me real creative freedom. Would work with them again without hesitation.",
    date: "Mar 2026",
  },
  {
    id: "r2", name: "Sofia Kim", tone: "pink" as const, rating: 5,
    quote: "Loved this collab. The product actually matches what they claim and my audience responded really well. Brief could've been a bit shorter but overall great.",
    date: "Nov 2025",
  },
  {
    id: "r3", name: "Marcus James", tone: "blue" as const, rating: 4,
    quote: "Solid brand to work with. Approval process was quick and the team was responsive on Slack. Minor note: the gifting package arrived a week late.",
    date: "Aug 2025",
  },
];

const CONTENT_TYPES = ["Lifestyle", "Beauty", "Skincare", "Fashion", "Self-care"] as const;

/* ------------------------------------------------------------------ */
/* Sub-components                                                        */
/* ------------------------------------------------------------------ */

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ color: TONES.yellow.solid, fontSize: 13, letterSpacing: 1 }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 10,
      padding: "14px 16px",
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)",
      background: "var(--sd-bg-primary)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar name={review.name} tone={review.tone} size="sm" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{review.name}</div>
          <StarRating count={review.rating} />
        </div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{review.date}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>
        "{review.quote}"
      </p>
    </div>
  );
}

function CampaignTab() {
  return (
    <RecordList
      items={PAST_CAMPAIGNS}
      getId={c => c.id}
      leadHeader="Campaign"
      lead={c => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{c.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
            <IconCalendar size={11} style={{ color: "var(--sd-font-tertiary)" }} />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{c.dates}</span>
          </div>
        </div>
      )}
      columns={[
        {
          key: "creators",
          header: "Creators",
          render: c => (
            <span style={{ fontSize: 13, color: "var(--sd-font-secondary)" }}>
              {c.creators}
            </span>
          ),
        },
        {
          key: "status",
          header: "Status",
          render: c => <Badge label={c.status} tone={STATUS_TONE[c.status]} variant="status" />,
        },
        {
          key: "deal",
          header: "Avg deal",
          render: c => (
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>
              {c.avgDeal}
            </span>
          ),
        },
      ]}
    />
  );
}

function CreatorsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 0" }}>
      <div style={{ fontSize: 13, color: "var(--sd-font-secondary)" }}>
        <strong style={{ color: "var(--sd-font-primary)" }}>48</strong> creators have worked with Glow Beauty Co. across all campaigns.
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <AvatarGroup avatars={PAST_CREATORS} max={6} size="md" />
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>+40 more</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <Badge label="Beauty" tone="pink" variant="status" />
        <Badge label="Lifestyle" tone="purple" variant="status" />
        <Badge label="Skincare" tone="turquoise" variant="status" />
        <Badge label="Fashion" tone="blue" variant="status" />
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "8px 0" }}>
      {REVIEWS.map(r => <ReviewCard key={r.id} review={r} />)}
    </div>
  );
}

const BRAND_TABS = [
  { value: "campaigns", label: "Campaigns" },
  { value: "creators",  label: "Creators" },
  { value: "reviews",   label: "Reviews" },
];

function BrandProfileDemo() {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 16,
        padding: "20px",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
      }}>
        <Avatar initials="GB" shape="rounded" tone="blue" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--sd-font-primary)" }}>Glow Beauty Co.</span>
            <Badge label="Verified" tone="blue" variant="status" dot />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
            <Badge label="Skincare" tone="pink" variant="status" />
            <Badge label="Beauty" tone="turquoise" variant="status" />
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-font-tertiary)", fontSize: 12 }}>
              <IconMapPin size={11} />
              New York, NY
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button size="sm" variant="secondary" rightIcon={<IconExternalLink size={12} />}>
              glowbeautyco.com
            </Button>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{
        padding: "16px 20px",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>About</div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.65 }}>
          Glow Beauty Co. is a clean skincare brand founded in 2019, focused on science-backed formulas that work for all skin types. We partner with creators who genuinely love skincare and have an authentic relationship with their audience.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Founded", value: "2019" },
            { label: "HQ", value: "New York, NY" },
            { label: "Company size", value: "51–200 employees" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", marginTop: 2 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <StatCard label="Active campaigns" value="3"  icon={IconSpeakerphone} tone="blue" />
        <StatCard label="Creators worked with" value="48" icon={IconUsers} tone="purple" />
        <StatCard label="Avg deal value" value="$15K" icon={IconCurrencyDollar} tone="green" trend={8.2} trendLabel="vs last year" />
      </div>

      {/* Preferred content types */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)" }}>Preferred content:</span>
        {CONTENT_TYPES.map(t => (
          <Badge key={t} label={t} tone="gray" variant="status" />
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
        overflow: "hidden",
      }}>
        <div style={{ padding: "0 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
          <Tabs
            tabs={BRAND_TABS}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
        <div style={{ padding: "16px" }}>
          {activeTab === "campaigns" && <CampaignTab />}
          {activeTab === "creators"  && <CreatorsTab />}
          {activeTab === "reviews"   && <ReviewsTab />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "brand-profile",
  title: "BrandProfile",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Brand/advertiser profile page — hero, stats, past campaigns, creator roster, and reviews as seen by a creator evaluating a deal.",
  description: "Shown to creators when they receive a deal offer or browse for brand partnerships. Presents the brand's identity, key metrics, past campaigns with deal values, a creator roster from previous work, and text reviews from past creator partners.",
  demos: [
    {
      title: "Brand profile",
      block: true,
      plain: true,
      render: () => <BrandProfileDemo />,
    },
  ],
};

export default doc;
