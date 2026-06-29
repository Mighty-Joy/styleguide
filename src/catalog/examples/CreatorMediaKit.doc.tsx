"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconUsers,
  IconHeart,
  IconEye,
  IconStar,
  IconStarFilled,
  IconDownload,
  IconShare,
  IconCheck,
  IconMapPin,
  IconTag,
  IconQuote,
  IconCurrencyDollar,
  IconPhoto,
  IconVideo,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- Demo ---- */
function Demo() {
  const [tab, setTab] = useState<"overview" | "audience" | "rates" | "work">("overview");
  const [copied, setCopied] = useState(false);

  function shareKit() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const PLATFORMS = [
    { icon: IconBrandInstagram, name: "Instagram", handle: "@priya.creates", followers: "248K", er: "8.6%",  avgViews: "62K",  tone: "pink"   as const },
    { icon: IconBrandTiktok,    name: "TikTok",    handle: "@priya.tiktok",  followers: "91K",  er: "6.2%",  avgViews: "38K",  tone: "gray"   as const },
  ];

  const NICHES = ["Skincare", "Wellness", "Beauty", "GRWM", "Sustainable living"];

  const AUDIENCE = [
    { label: "Female",       pct: 72, tone: "pink"  as const },
    { label: "Age 22–34",    pct: 68, tone: "blue"  as const },
    { label: "US-based",     pct: 84, tone: "green" as const },
    { label: "Skincare interest", pct: 61, tone: "purple" as const },
  ];

  const RATES = [
    { icon: IconVideo, format: "Instagram Reel (60s)", rate: "$1,400",  note: "Usage rights: +20%" },
    { icon: IconPhoto, format: "Instagram Feed post",  rate: "$800",    note: "1 revision included" },
    { icon: IconPhoto, format: "Instagram Story ×3",   rate: "$400",    note: "Link sticker included" },
    { icon: IconVideo, format: "TikTok video",         rate: "$900",    note: "Organic + paid" },
    { icon: IconVideo, format: "YouTube integration",  rate: "$2,200",  note: "60s mid-roll" },
  ];

  const PAST_WORK = [
    { brand: "Aura Labs",  gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", category: "Skincare", result: "9.4% ER · 182K reach" },
    { brand: "GlowCo",    gradient: "linear-gradient(135deg,#fce7f3,#db2777)", category: "Skincare", result: "7.2% ER · 94K reach" },
    { brand: "FitLife",   gradient: "linear-gradient(135deg,#d1fae5,#059669)", category: "Wellness", result: "6.8% ER · TikTok" },
    { brand: "Wellnest",  gradient: "linear-gradient(135deg,#e0f2fe,#0ea5e9)", category: "Wellness", result: "8.1% ER · 112K reach" },
  ];

  const TESTIMONIALS = [
    { brand: "Aura Labs",  text: "Priya went above and beyond on every deliverable. Content was on-brand, on-time, and performed well above our ER benchmark.", stars: 5 },
    { brand: "GlowCo",    text: "Amazing creator — very professional and easy to work with. Our best-performing collab of the year.", stars: 5 },
    { brand: "Wellnest",  text: "Great content with a very authentic voice. We'd work with Priya again in a heartbeat.", stars: 4 },
  ];

  const TABS: { key: typeof tab; label: string }[] = [
    { key: "overview",  label: "Overview"   },
    { key: "audience",  label: "Audience"   },
    { key: "rates",     label: "Rate card"  },
    { key: "work",      label: "Past work"  },
  ];

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#fde68a,#f59e0b,#d97706)", borderRadius: 12, padding: "20px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <Avatar initials="PN" tone="green" size="lg" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>Priya Nair</div>
            <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 2, marginBottom: 8 }}>
              <IconMapPin size={11} style={{ color: "rgba(0,0,0,0.5)" }} />
              <span style={{ fontSize: 11, color: "rgba(0,0,0,0.6)" }}>Mumbai, India · English / Hindi</span>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {NICHES.map((n) => (
                <div key={n} style={{ padding: "2px 8px", borderRadius: 99, background: "rgba(0,0,0,0.12)", fontSize: 10, fontWeight: 700, color: "rgba(0,0,0,0.7)" }}>{n}</div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="secondary" size="sm" leftIcon={copied ? <IconCheck size={11} /> : <IconShare size={11} />} onClick={shareKit}>
              {copied ? "Copied!" : "Share"}
            </Button>
            <Button variant="primary" size="sm" leftIcon={<IconDownload size={11} />}>Download PDF</Button>
          </div>
        </div>

        {/* Platform stats */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {PLATFORMS.map((p) => {
            const PIco = p.icon;
            return (
              <div key={p.name} style={{ flex: 1, background: "rgba(255,255,255,0.9)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 6 }}>
                  <PIco size={13} style={{ color: "#111" }} />
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{p.handle}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {[
                    { label: "Followers", value: p.followers },
                    { label: "Avg ER",    value: p.er        },
                    { label: "Avg views", value: p.avgViews  },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: 13, fontWeight: 900 }}>{value}</div>
                      <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, marginBottom: 14, background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, padding: 4, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)}
              style={{ flex: 1, padding: "6px 8px", borderRadius: 7, background: active ? "#fff" : "transparent", border: active ? "1px solid var(--sd-border-default, #e5e7eb)" : "1px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "#111" : "var(--sd-font-tertiary, #999)", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--sd-font-secondary, #555)", marginBottom: 14 }}>
            Skincare and wellness creator based in Mumbai with a highly engaged female audience (72% women, 22–34). Known for her warm, educational content style and dewy-skin aesthetic. 4 years of brand partnership experience across skincare, wellness, and beauty — specializing in campaigns that drive both reach and real conversions.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ padding: "10px 12px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
                  {[1,2,3,4,5].map((s) => s <= t.stars ? <IconStarFilled key={s} size={11} style={{ color: "#f59e0b" }} /> : <IconStar key={s} size={11} style={{ color: "#e5e7eb" }} />)}
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", marginLeft: 4 }}>{t.brand}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5, fontStyle: "italic" }}>"{t.text}"</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audience */}
      {tab === "audience" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {AUDIENCE.map((a) => (
            <div key={a.label} style={{ padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{a.label}</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: TONES[a.tone].text }}>{a.pct}%</span>
              </div>
              <div style={{ height: 6, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${a.pct}%`, height: "100%", background: TONES[a.tone].text, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <div style={{ padding: "10px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, border: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
            Data sourced from Instagram Insights · Updated monthly
          </div>
        </div>
      )}

      {/* Rates */}
      {tab === "rates" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {RATES.map((r) => {
            const RIcon = r.icon;
            return (
              <div key={r.format} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: TONES.orange.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <RIcon size={13} style={{ color: TONES.orange.text }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{r.format}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{r.note}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 900, color: TONES.orange.text }}>{r.rate}</div>
              </div>
            );
          })}
          <div style={{ padding: "10px 14px", background: TONES.blue.tint, borderRadius: 10, fontSize: 11, color: TONES.blue.text, fontWeight: 600 }}>
            Bundle pricing available for 3+ deliverables. Exclusivity: +25% per 30-day period.
          </div>
        </div>
      )}

      {/* Past work */}
      {tab === "work" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {PAST_WORK.map((w) => (
            <div key={w.brand} style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: 72, background: w.gradient }} />
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 12, fontWeight: 800 }}>{w.brand}</div>
                <Badge label={w.category} tone="gray" size="sm" />
                <div style={{ fontSize: 10, color: TONES.green.text, fontWeight: 700, marginTop: 5 }}>{w.result}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-media-kit",
  title: "CreatorMediaKit",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's shareable media kit — golden hero with platform stats, 4-tab layout: overview with testimonials, audience demographics, rate card, and past brand work grid.",
  description:
    "The creator-controlled pitch document sent to brands. Golden gradient hero: avatar, name, location, language, niche chips, Share (copy link) and Download PDF CTAs; platform stat cards (Instagram + TikTok) with followers/ER/avg views. 4-tab layout: Overview — bio paragraph and 3 brand testimonials with star ratings; Audience — 4 demographic bars (gender, age, location, interest) with animated fills; Rate card — 5 format rows (Reel, Feed, Story, TikTok, YouTube) with orange icon, format name, notes, and price; Past work — 2×2 grid with gradient thumbnails, brand name, category badge, result line in green. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator media kit",
      description: "Toggle tabs: Overview (bio + testimonials), Audience (demographic bars), Rate card (format pricing), Past work (brand grid). Click Share to see the copy-link confirmation.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
