"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconShare,
  IconCheck,
  IconCurrencyDollar,
  IconCalendar,
  IconVideo,
  IconPhoto,
  IconUsers,
  IconHeart,
  IconLock,
  IconBrandInstagram,
  IconBrandTiktok,
  IconMapPin,
  IconStar,
  IconStarFilled,
  IconChevronDown,
  IconChevronUp,
  IconBolt,
  IconAlertCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- Demo ---- */
function Demo() {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [eligOpen, setEligOpen] = useState(false);
  const [tab, setTab] = useState<"overview" | "brand" | "terms">("overview");

  const DELIVERABLES = [
    { icon: IconVideo, label: "1× Instagram Reel (60s)",       note: "Script approval required"    },
    { icon: IconPhoto, label: "3× Instagram Stories",          note: "Swipe-up link included"      },
    { icon: IconVideo, label: "1× TikTok video (optional)",    note: "+$300 if included"           },
  ];

  const REQUIREMENTS = [
    { label: "Min. 50K Instagram followers",     pass: true  },
    { label: "Skincare / beauty niche",           pass: true  },
    { label: "Min. 4% engagement rate",           pass: true  },
    { label: "US or UK based audience (≥60%)",   pass: true  },
    { label: "No active competitor exclusivity",  pass: false },
  ];

  const TIMELINE = [
    { date: "Jul 1",  label: "Brief shared",       done: true  },
    { date: "Jul 8",  label: "Contract signed",     done: false },
    { date: "Jul 14", label: "Content submitted",   done: false },
    { date: "Jul 18", label: "Content approved",    done: false },
    { date: "Jul 22", label: "Go live",             done: false },
    { date: "Aug 5",  label: "Payment",             done: false },
  ];

  const failCount = REQUIREMENTS.filter((r) => !r.pass).length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#fde68a,#f59e0b,#d97706)", borderRadius: 14, padding: "18px 20px", marginBottom: 14, position: "relative" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 44, height: 44, borderRadius: 11, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: 16, fontWeight: 900 }}>AL</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginBottom: 2 }}>Aura Labs</div>
            <div style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>Summer Glow Campaign</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Badge label="Skincare" tone="gray" size="sm" />
              <Badge label="Instagram + TikTok" tone="gray" size="sm" />
              <Badge label="🔥 10 spots left" tone="orange" size="sm" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => setSaved((s) => !s)}
              style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {saved ? <IconBookmarkFilled size={15} style={{ color: "#f59e0b" }} /> : <IconBookmark size={15} style={{ color: "#111" }} />}
            </button>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconShare size={14} style={{ color: "#111" }} />
            </button>
          </div>
        </div>

        {/* Key stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 14 }}>
          {[
            { icon: IconCurrencyDollar, label: "Creator fee", value: "$1,200–$1,800" },
            { icon: IconCalendar,       label: "Go live",     value: "Jul 22, 2025"  },
            { icon: IconUsers,          label: "Creators",    value: "5 selected"    },
            { icon: IconHeart,          label: "Min. ER",     value: "4%"            },
          ].map(({ icon: Ico, label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.85)", borderRadius: 8, padding: "7px 9px" }}>
              <Ico size={11} style={{ color: "#111", display: "block", marginBottom: 3 }} />
              <div style={{ fontSize: 11, fontWeight: 900 }}>{value}</div>
              <div style={{ fontSize: 9, color: "rgba(0,0,0,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility check */}
      <div style={{ border: `1px solid ${failCount > 0 ? TONES.red.text : TONES.green.text}30`, borderRadius: 10, padding: "10px 12px", marginBottom: 12, background: failCount > 0 ? `${TONES.red.tint}60` : `${TONES.green.tint}60` }}>
        <button onClick={() => setEligOpen((e) => !e)}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          {failCount > 0
            ? <IconAlertCircle size={14} style={{ color: TONES.red.text }} />
            : <IconCheck size={14} style={{ color: TONES.green.text }} />}
          <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: failCount > 0 ? TONES.red.text : TONES.green.text }}>
            {failCount > 0 ? `${failCount} eligibility requirement not met` : "You meet all requirements"}
          </span>
          {eligOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>
        {eligOpen && (
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            {REQUIREMENTS.map((r) => (
              <div key={r.label} style={{ display: "flex", gap: 7, alignItems: "center" }}>
                {r.pass
                  ? <IconCheck size={11} style={{ color: TONES.green.text, flexShrink: 0 }} />
                  : <IconAlertCircle size={11} style={{ color: TONES.red.text, flexShrink: 0 }} />}
                <span style={{ fontSize: 11, color: r.pass ? "#111" : TONES.red.text, fontWeight: r.pass ? 400 : 700 }}>{r.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 2, marginBottom: 14, background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 10, padding: 4, border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
        {(["overview","brand","terms"] as const).map((t) => {
          const active = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: "6px 8px", borderRadius: 7, background: active ? "#fff" : "transparent", border: active ? "1px solid var(--sd-border-default,#e5e7eb)" : "1px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "#111" : "var(--sd-font-tertiary,#999)", textTransform: "capitalize", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.05)" : "none" }}>
              {t === "brand" ? "About brand" : t}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--sd-font-secondary,#555)", marginBottom: 12 }}>
            We're launching our hero Summer Glow serum in July and want 5 authentic skincare creators to document their 4-week glow journey. The ideal creator uses a warm, educational style and has an audience that genuinely cares about clean ingredient formulations.
          </p>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Deliverables</div>
          {DELIVERABLES.map((d) => {
            const DIco = d.icon;
            return (
              <div key={d.label} style={{ display: "flex", gap: 9, alignItems: "center", padding: "8px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, marginBottom: 6 }}>
                <DIco size={13} style={{ color: TONES.blue.text, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{d.label}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{d.note}</div>
                </div>
              </div>
            );
          })}
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, marginTop: 12 }}>Timeline</div>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "var(--sd-border-default,#e5e7eb)", borderRadius: 1 }} />
            {TIMELINE.map((step) => (
              <div key={step.date} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, position: "relative" }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: step.done ? TONES.green.text : "var(--sd-border-default,#e5e7eb)", position: "absolute", left: -20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {step.done && <IconCheck size={8} style={{ color: "#fff" }} />}
                </div>
                <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", width: 36, flexShrink: 0 }}>{step.date}</span>
                <span style={{ fontSize: 11, fontWeight: step.done ? 700 : 400, color: step.done ? TONES.green.text : "#111" }}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About brand */}
      {tab === "brand" && (
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#fde68a,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 900 }}>AL</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>Aura Labs</div>
              <div style={{ display: "flex", gap: 5 }}>
                {[1,2,3,4,5].map((s) => <IconStarFilled key={s} size={11} style={{ color: "#f59e0b" }} />)}
                <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>4.9 · 38 campaigns</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--sd-font-secondary,#555)", marginBottom: 10 }}>
            Aura Labs is a clean skincare brand born in San Francisco in 2019. Known for science-backed formulas with no hidden ingredients — our bestselling Aura Glow Serum has a 9.4% average ER across creator campaigns and a 94% repurchase rate.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {[
              { label: "Avg payout time", value: "7 days"  },
              { label: "Repeat creators",  value: "68%"     },
              { label: "Campaigns run",    value: "38"      },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "9px 10px", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 9, textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 900 }}>{value}</div>
                <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terms */}
      {tab === "terms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Usage rights",    value: "30 days for paid amplification" },
            { label: "Exclusivity",     value: "20-day skincare exclusivity post go-live" },
            { label: "Revisions",       value: "Up to 2 rounds included" },
            { label: "FTC disclosure",  value: "#ad required on all posts" },
            { label: "Content ownership", value: "Creator retains copyright; brand has license" },
            { label: "Late penalty",    value: "10% fee reduction per day after deadline" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: 10, padding: "9px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9 }}>
              <div style={{ width: 120, fontSize: 11, fontWeight: 700, flexShrink: 0, color: "var(--sd-font-tertiary,#999)" }}>{label}</div>
              <div style={{ fontSize: 11 }}>{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Button variant="secondary" size="sm" leftIcon={saved ? <IconBookmarkFilled size={11} style={{ color: "#f59e0b" }} /> : <IconBookmark size={11} />} onClick={() => setSaved((s) => !s)}>
          {saved ? "Saved" : "Save"}
        </Button>
        <Button variant="primary" size="sm"
          leftIcon={applied ? <IconCheck size={11} /> : <IconBolt size={11} />}
          onClick={() => setApplied(true)}
          disabled={applied}
          style={{ flex: 1, background: applied ? TONES.green.text : undefined, borderColor: applied ? TONES.green.text : undefined }}>
          {applied ? "Application sent!" : failCount > 0 ? "Apply anyway" : "Apply now"}
        </Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-spotlight",
  title: "CampaignSpotlight",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator-facing campaign marketplace listing — golden hero with key stats, eligibility checker, 3-tab layout (Overview/About brand/Terms), and Apply + Save CTAs.",
  description:
    "The campaign detail page a creator lands on from the marketplace. Golden gradient hero: brand monogram, campaign name, category + platform + scarcity badges, 4 key stat tiles (fee range/go-live/creator count/min ER). Eligibility check bar: collapsible accordion showing 5 requirements with pass/fail icons — pre-loaded with 1 fail (active competitor exclusivity) triggering a red 'requirement not met' header. 3-tab pill nav: Overview — brand brief paragraph, 3 deliverable rows with icons and notes, 6-step vertical timeline with green dots for completed steps; About brand — brand identity with 5-star rating, bio, 3 KPI tiles (payout time, repeat creators, campaigns run); Terms — 6 term rows (usage rights, exclusivity, revisions, FTC, ownership, late penalty) in a key-value layout. Footer CTAs: Save (bookmark toggle, gold when saved) + Apply now (full-width primary, green 'Application sent!' after click; still clickable with 'Apply anyway' when eligibility fails). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign spotlight",
      description: "Click 'View eligibility' to expand the requirement check (1 fail). Switch tabs. Click Save to bookmark (toggle). Click Apply now for the green confirmation.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
