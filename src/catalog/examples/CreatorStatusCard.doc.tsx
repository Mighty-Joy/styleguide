"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconCurrencyDollar,
  IconClock,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconStar,
  IconMessageCircle,
  IconBookmark,
  IconX,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type AvailStatus = "open" | "selective" | "paused";
type ResponseTime = "24h" | "1-2d" | "1w";

const STATUS_META: Record<AvailStatus, { label: string; tone: keyof typeof TONES; detail: string }> = {
  open:      { label: "Open to campaigns",  tone: "green",  detail: "Actively accepting new partnerships"         },
  selective: { label: "Selective",          tone: "yellow", detail: "Reviewing opportunities case by case"         },
  paused:    { label: "Not available",      tone: "gray",   detail: "Not accepting campaigns at this time"         },
};

const RESPONSE_OPTS: { key: ResponseTime; label: string }[] = [
  { key: "24h",  label: "< 24 hours"  },
  { key: "1-2d", label: "1–2 days"    },
  { key: "1w",   label: "~1 week"     },
];

const NICHE_OPTIONS = [
  "Skincare", "Clean beauty", "Wellness", "Fitness", "Nutrition",
  "Fashion", "Travel", "Home & lifestyle", "Mindfulness", "Tech",
];

/* ---- Demo ---- */
function Demo() {
  const [status,    setStatus]    = useState<AvailStatus>("open");
  const [minFee,    setMinFee]    = useState(800);
  const [niches,    setNiches]    = useState(new Set(["Skincare", "Clean beauty", "Wellness"]));
  const [response,  setResponse]  = useState<ResponseTime>("24h");
  const [preview,   setPreview]   = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  function toggleNiche(n: string) {
    setNiches((prev) => {
      const next = new Set(prev);
      if (next.has(n)) { next.delete(n); } else if (next.size < 5) { next.add(n); }
      return next;
    });
  }

  function save() {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 800);
  }

  const { label, tone, detail } = STATUS_META[status];

  /* ---- Brand preview mode ---- */
  if (preview) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12 }}>
          <Badge label="Brand preview" tone="blue" size="sm" dot />
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>This is how your card appears to brands</span>
          <Button variant="secondary" size="sm" leftIcon={<IconEyeOff size={11} />} onClick={() => setPreview(false)} style={{ marginLeft: "auto" }}>Exit preview</Button>
        </div>

        {/* Creator card as brand sees it */}
        <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 14, overflow: "hidden" }}>
          {/* Gradient header */}
          <div style={{ height: 60, background: "linear-gradient(135deg,#fde68a,#f9a8d4,#c4b5fd)", position: "relative" }}>
            <button onClick={() => setBookmarked(!bookmarked)}
              style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: 99, background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconBookmark size={14} style={{ color: bookmarked ? "#f59e0b" : "#888", fill: bookmarked ? "#f59e0b" : "none" }} />
            </button>
          </div>

          <div style={{ padding: "0 14px 14px" }}>
            {/* Avatar + name */}
            <div style={{ marginTop: -20, marginBottom: 10 }}>
              <Avatar initials="PN" tone="pink" size="lg" />
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>Priya Nair</div>
                <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Mumbai, India · Skincare & Wellness</div>
              </div>
              <Badge label={label} tone={tone} size="sm" dot />
            </div>

            {/* Platform stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              {[
                { icon: IconBrandInstagram, label: "248K", sub: "8.6% ER", tone: "pink" as const },
                { icon: IconBrandTiktok,    label: "91K",  sub: "6.2% ER", tone: "blue" as const },
              ].map(({ icon: Icon, label: lbl, sub, tone: t }) => (
                <div key={lbl} style={{ display: "flex", gap: 6, alignItems: "center", padding: "6px 10px", background: TONES[t].tint, borderRadius: 8, flex: 1 }}>
                  <Icon size={13} style={{ color: TONES[t].text }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: TONES[t].text }}>{lbl}</div>
                    <div style={{ fontSize: 9, color: TONES[t].text, opacity: 0.75 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Niches */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
              {[...niches].map((n) => (
                <span key={n} style={{ padding: "3px 9px", borderRadius: 99, background: TONES.purple.tint, border: `1px solid ${TONES.purple.text}30`, fontSize: 10, fontWeight: 600, color: TONES.purple.text }}>{n}</span>
              ))}
            </div>

            {/* Min fee + response */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12, fontSize: 11 }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <IconCurrencyDollar size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                <span>From <strong>${minFee.toLocaleString()}</strong></span>
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <IconClock size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                <span>Responds in <strong>{RESPONSE_OPTS.find((r) => r.key === response)?.label}</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 7 }}>
              <Button variant="primary" size="sm" style={{ flex: 1 }}>Invite to campaign</Button>
              <Button variant="secondary" size="sm" leftIcon={<IconMessageCircle size={11} />}>Message</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Edit mode ---- */
  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Availability status</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Visible to brands browsing the creator marketplace</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconEye size={11} />} onClick={() => setPreview(true)}>Preview</Button>
      </div>

      {/* Status toggle */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Your availability</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {(Object.entries(STATUS_META) as [AvailStatus, typeof STATUS_META[AvailStatus]][]).map(([key, meta]) => (
            <button key={key} onClick={() => setStatus(key)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: `2px solid ${status === key ? TONES[meta.tone].text : "var(--sd-border-default,#e5e7eb)"}`, background: status === key ? TONES[meta.tone].tint : "transparent", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 20, height: 20, borderRadius: 99, border: `2px solid ${status === key ? TONES[meta.tone].text : "var(--sd-border-default,#ccc)"}`, background: status === key ? TONES[meta.tone].text : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {status === key && <IconCheck size={11} style={{ color: "#fff" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: status === key ? TONES[meta.tone].text : "#111" }}>{meta.label}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{meta.detail}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Minimum fee */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Minimum fee per deliverable</div>
          <div style={{ fontSize: 12, fontWeight: 900 }}>${minFee.toLocaleString()}</div>
        </div>
        <input type="range" min={100} max={5000} step={100} value={minFee} onChange={(e) => setMinFee(Number(e.target.value))}
          style={{ width: "100%", accentColor: TONES.orange.text }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 2 }}>
          <span>$100</span><span>$5,000</span>
        </div>
      </div>

      {/* Niches */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Your niches <span style={{ fontWeight: 400, color: "var(--sd-font-tertiary,#999)" }}>(up to 5)</span></div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{niches.size}/5 selected</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {NICHE_OPTIONS.map((n) => {
            const active = niches.has(n);
            return (
              <button key={n} onClick={() => toggleNiche(n)}
                style={{ padding: "4px 11px", borderRadius: 99, border: `1.5px solid ${active ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, background: active ? TONES.purple.tint : "transparent", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? TONES.purple.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Response time */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Typical response time</div>
        <div style={{ display: "flex", gap: 6 }}>
          {RESPONSE_OPTS.map(({ key, label: lbl }) => (
            <button key={key} onClick={() => setResponse(key)}
              style={{ flex: 1, padding: "7px 10px", borderRadius: 9, border: `1.5px solid ${response === key ? "#111" : "var(--sd-border-default,#e5e7eb)"}`, background: response === key ? "#111" : "transparent", fontSize: 11, fontWeight: 700, color: response === key ? "#fff" : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={save} style={{ width: "100%" }}
        leftIcon={saved ? <IconCheck size={11} /> : <IconEdit size={11} />}>
        {saved ? "Status updated!" : saving ? "Saving…" : "Save availability"}
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-status-card",
  title: "CreatorStatusCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator availability editor — Open/Selective/Paused status toggle, min-fee slider, niche multi-select (up to 5), response-time chips, and a brand-preview mode showing the discovery card.",
  description:
    "Creator sets their availability status that brands see in discovery. Edit mode: header + Preview CTA. Status radio group: 3 options (Open/Selective/Paused) each with tinted border + dot ring when selected and detail copy. Min fee slider ($100–$5,000 step 100) with live dollar display. Niche multi-select: 10 chips, up to 5 active (purple tint + border), excess clicks ignored. Response time: 3 chips (< 24h / 1–2 days / ~1 week) dark fill on select. Save → 'Saving…' → 'Status updated!' green check. Preview mode (click Preview): shows exact brand-facing discovery card with gradient hero (60px), Avatar lg bottom-left overhang, name + location + status badge, IG/TikTok stat tiles in tinted pairs, niche chips, min fee + response time row, Invite to campaign primary + Message CTA, bookmark toggle in hero. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator availability status",
      description: "Change status, drag the fee slider, select/deselect niches, choose response time, then click Preview to see the brand-facing discovery card.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
