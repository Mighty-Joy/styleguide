"use client";

import React, { useState } from "react";
import {
  IconGift,
  IconCurrencyDollar,
  IconVideo,
  IconBolt,
  IconBulb,
  IconTarget,
  IconUsers,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCheck,
  IconSpeakerphone,
  IconPhoto,
  IconMicrophone,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* RadioCard component                                                   */
/* ------------------------------------------------------------------ */

interface RadioCardOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ElementType;
  tone?: keyof typeof TONES;
  disabled?: boolean;
}

interface RadioCardGroupProps<T extends string = string> {
  value: T | null;
  onChange: (value: T) => void;
  options: RadioCardOption<T>[];
  columns?: 2 | 3 | 4;
  size?: "sm" | "md";
  label?: string;
  hint?: string;
  error?: string;
}

function RadioCardGroup<T extends string>({
  value,
  onChange,
  options,
  columns = 3,
  size = "md",
  label,
  hint,
  error,
}: RadioCardGroupProps<T>) {
  const padding = size === "sm" ? "10px 12px" : "12px 14px";
  const iconBox  = size === "sm" ? 28 : 34;
  const iconSize = size === "sm" ? 13 : 16;
  const titleSz  = size === "sm" ? 12 : 13;
  const descSz   = size === "sm" ? 10 : 11;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{label}</label>}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8 }}>
        {options.map(opt => {
          const selected = value === opt.value;
          const tone = opt.tone ?? "blue";
          const t = TONES[tone];
          const Icon = opt.icon;

          return (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => !opt.disabled && onChange(opt.value)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start",
                gap: Icon ? 8 : 4, padding,
                border: selected ? `2px solid ${t.solid}` : "2px solid var(--sd-border-light)",
                borderRadius: "var(--sd-radius-md)",
                background: selected ? t.tint : "var(--sd-bg-primary)",
                cursor: opt.disabled ? "not-allowed" : "pointer",
                opacity: opt.disabled ? 0.45 : 1,
                textAlign: "left", fontFamily: "var(--sd-font-stack)",
                transition: "border-color 0.1s, background 0.1s",
                position: "relative",
              }}
            >
              {/* Check indicator */}
              <div style={{
                position: "absolute", top: 8, right: 8,
                width: 16, height: 16, borderRadius: "50%",
                border: selected ? "none" : "1.5px solid var(--sd-border-medium)",
                background: selected ? t.solid : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.1s, border-color 0.1s",
              }}>
                {selected && <IconCheck size={9} color="#fff" strokeWidth={3} />}
              </div>

              {/* Icon */}
              {Icon && (
                <div style={{
                  width: iconBox, height: iconBox, borderRadius: "var(--sd-radius-sm)",
                  background: selected ? t.solid : t.tint, color: selected ? "#fff" : t.text,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.1s",
                }}>
                  <Icon size={iconSize} />
                </div>
              )}

              {/* Label + description */}
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 700, color: selected ? t.text : "var(--sd-font-primary)" }}>
                  {opt.label}
                </div>
                {opt.description && (
                  <div style={{ fontSize: descSz, color: selected ? t.text : "var(--sd-font-tertiary)", marginTop: 2, lineHeight: 1.4, opacity: selected ? 0.85 : 1 }}>
                    {opt.description}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {error && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{hint}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demos                                                                 */
/* ------------------------------------------------------------------ */

function DealTypeDemo() {
  const [v, setV] = useState<string | null>("paid");
  return (
    <RadioCardGroup
      label="Deal type"
      value={v}
      onChange={setV}
      columns={4}
      options={[
        { value: "gifting",   label: "Gifting",   description: "Send product, no payment", icon: IconGift,            tone: "orange" },
        { value: "paid",      label: "Paid",       description: "Flat fee per deliverable", icon: IconCurrencyDollar, tone: "green"  },
        { value: "ugc",       label: "UGC",        description: "Raw content, no post",     icon: IconVideo,          tone: "blue"   },
        { value: "affiliate", label: "Affiliate",  description: "Commission on sales",      icon: IconBolt,           tone: "purple" },
      ]}
    />
  );
}

function CampaignObjectiveDemo() {
  const [v, setV] = useState<string | null>(null);
  return (
    <RadioCardGroup
      label="Campaign objective"
      value={v}
      onChange={setV}
      columns={3}
      hint="Choose the primary goal — this shapes how performance is measured."
      options={[
        { value: "awareness",   label: "Brand awareness",  description: "Maximise reach and impressions",              icon: IconSpeakerphone, tone: "blue"   },
        { value: "conversion",  label: "Drive sales",       description: "Track clicks, promo codes, and conversions", icon: IconTarget,       tone: "green"  },
        { value: "ugc_collect", label: "Collect UGC",       description: "Build a library of reusable content",        icon: IconPhoto,        tone: "purple" },
      ]}
    />
  );
}

function PlatformDemo() {
  const [v, setV] = useState<string | null>("instagram");
  return (
    <RadioCardGroup
      label="Primary platform"
      value={v}
      onChange={setV}
      columns={3}
      size="sm"
      options={[
        { value: "instagram", label: "Instagram", description: "Reels, Stories, Feed", icon: IconBrandInstagram, tone: "pink"  },
        { value: "tiktok",    label: "TikTok",    description: "Short-form video",      icon: IconBrandTiktok,    tone: "gray"  },
        { value: "youtube",   label: "YouTube",   description: "Long-form & Shorts",    icon: IconBrandYoutube,   tone: "red"   },
      ]}
    />
  );
}

function CreatorTierDemo() {
  const [v, setV] = useState<string | null>(null);
  return (
    <RadioCardGroup
      label="Target creator tier"
      value={v}
      onChange={setV}
      columns={3}
      options={[
        { value: "nano",  label: "Nano",  description: "1K–10K followers · High trust",        icon: IconUsers,  tone: "turquoise" },
        { value: "micro", label: "Micro", description: "10K–100K · Best ROI",                  icon: IconUsers,  tone: "blue"      },
        { value: "macro", label: "Macro", description: "100K+ · Scale & brand lift",           icon: IconUsers,  tone: "purple"    },
      ]}
    />
  );
}

function ContentTypeDemo() {
  const [v, setV] = useState<string | null>("reel");
  return (
    <RadioCardGroup
      label="Content type"
      value={v}
      onChange={setV}
      columns={4}
      size="sm"
      options={[
        { value: "reel",    label: "Reel",     icon: IconVideo,      tone: "blue"   },
        { value: "story",   label: "Story",    icon: IconPhoto,      tone: "purple" },
        { value: "ugc",     label: "UGC",      icon: IconMicrophone, tone: "gray"   },
        { value: "podcast", label: "Podcast",  icon: IconMicrophone, tone: "orange", disabled: true },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "radio-card",
  title: "RadioCard",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Styled card radio group for mutually exclusive choices — deal type, campaign objective, platform, and creator tier selection.",
  description:
    "RadioCardGroup renders a grid of tappable cards, each representing a mutually exclusive option. Selected card gets a 2px solid border in the option's tone color, a tinted background, and a filled check circle in the top-right corner. The icon box shifts from tinted to solid on selection for clear visual feedback. Two sizes: `md` (34px icon box, 13px title — default) and `sm` (28px box, 12px title — for compact contexts). 2, 3, or 4 column layouts. Individual options can be `disabled`. Standard label/hint/error props. Used throughout campaign creation for choosing deal type, campaign objective, primary platform, creator tier, and content type.",
  demos: [
    { title: "Deal type",           render: () => <DealTypeDemo /> },
    { title: "Campaign objective",  render: () => <CampaignObjectiveDemo /> },
    { title: "Platform (sm size)",  render: () => <PlatformDemo /> },
    { title: "Creator tier",        render: () => <CreatorTierDemo /> },
    { title: "Content type (sm, with disabled)", render: () => <ContentTypeDemo /> },
  ],
  props: [
    {
      title: "RadioCardGroup",
      rows: [
        { name: "value",    type: "T | null",                      required: true,  description: "Currently selected option value, or null for nothing selected." },
        { name: "onChange", type: "(value: T) => void",            required: true,  description: "Called with the new value when a card is clicked." },
        { name: "options",  type: "RadioCardOption<T>[]",          required: true,  description: "Array of option objects." },
        { name: "columns",  type: "2 | 3 | 4",                    required: false, description: "Number of columns. Default 3." },
        { name: "size",     type: '"sm" | "md"',                   required: false, description: 'Card size. Default "md".' },
        { name: "label",    type: "string",                        required: false, description: "Label above the group." },
        { name: "hint",     type: "string",                        required: false, description: "Helper text below." },
        { name: "error",    type: "string",                        required: false, description: "Error message below." },
      ],
    },
    {
      title: "RadioCardOption",
      rows: [
        { name: "value",       type: "string",            required: true,  description: "Unique option identifier." },
        { name: "label",       type: "string",            required: true,  description: "Primary label text." },
        { name: "description", type: "string",            required: false, description: "Secondary description beneath the label." },
        { name: "icon",        type: "React.ElementType", required: false, description: "Leading icon in a toned box." },
        { name: "tone",        type: "keyof typeof TONES",required: false, description: 'Accent color when selected. Default "blue".' },
        { name: "disabled",    type: "boolean",           required: false, description: "Dims and prevents selection." },
      ],
    },
  ],
};

export default doc;
