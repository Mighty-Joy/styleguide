"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandPinterest,
  IconCamera,
  IconCheck,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Step indicator                                                        */
/* ------------------------------------------------------------------ */

const STEPS = ["Profile", "Connect Accounts", "Set Rates", "Categories", "Preview"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                background: done ? "var(--sd-bg-inverted)" : active ? "transparent" : "transparent",
                color: done ? "#fff" : active ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                border: done ? "2px solid var(--sd-bg-inverted)" : active ? "2px solid var(--sd-font-primary)" : "2px solid var(--sd-border-light)",
                transition: "all 0.2s",
              }}>
                {done ? <IconCheck size={13} /> : i + 1}
              </div>
              <span style={{
                fontSize: 10, fontWeight: active ? 700 : 500,
                color: done || active ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                whiteSpace: "nowrap",
              }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                height: 2, flex: 2, marginBottom: 20,
                background: i < current ? "var(--sd-bg-inverted)" : "var(--sd-border-light)",
                transition: "background 0.3s",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Profile                                                      */
/* ------------------------------------------------------------------ */

function StepProfile() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ position: "relative" }}>
          <Avatar name="Sophie Lane" tone="sky" size="lg" />
          <div style={{
            position: "absolute", bottom: -4, right: -4,
            width: 20, height: 20, borderRadius: "50%",
            background: "var(--sd-bg-inverted)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", border: "2px solid var(--sd-bg-primary)",
          }}>
            <IconCamera size={10} />
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Full name</label>
            <div style={{ padding: "8px 12px", border: "1px solid var(--sd-border-main)", borderRadius: "var(--sd-radius-sm)", fontSize: 14, color: "var(--sd-font-primary)", background: "var(--sd-bg-primary)" }}>
              Sophie Lane
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Handle</label>
            <div style={{ padding: "8px 12px", border: "1px solid var(--sd-border-main)", borderRadius: "var(--sd-radius-sm)", fontSize: 14, color: "var(--sd-creator-handle)", background: "var(--sd-bg-primary)" }}>
              @sophie.creates
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Bio</label>
        <div style={{ padding: "10px 12px", border: "1px solid var(--sd-border-main)", borderRadius: "var(--sd-radius-sm)", fontSize: 13, color: "var(--sd-font-secondary)", background: "var(--sd-bg-primary)", lineHeight: 1.5, minHeight: 72 }}>
          Lifestyle & beauty creator based in NYC. Passionate about skincare, travel, and sustainable living. Partnered with 40+ brands.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Connect Accounts                                             */
/* ------------------------------------------------------------------ */

const PLATFORMS = [
  { icon: IconBrandInstagram, name: "Instagram",  color: "#E1306C", connected: true,  followers: "128K" },
  { icon: IconBrandTiktok,    name: "TikTok",     color: "#010101", connected: true,  followers: "96K" },
  { icon: IconBrandYoutube,   name: "YouTube",    color: "#FF0000", connected: false, followers: null },
  { icon: IconBrandPinterest, name: "Pinterest",  color: "#E60023", connected: false, followers: null },
];

function StepConnectAccounts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p style={{ fontSize: 13, color: "var(--sd-font-secondary)", margin: "0 0 6px", lineHeight: 1.5 }}>
        Connect your social accounts so brands can see your real follower and engagement data.
      </p>
      {PLATFORMS.map(({ icon: Icon, name, color, connected, followers }) => (
        <div key={name} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 14px",
          border: `1px solid ${connected ? "var(--sd-border-main)" : "var(--sd-border-light)"}`,
          borderRadius: "var(--sd-radius-md)",
          background: connected ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
        }}>
          <div style={{ width: 32, height: 32, borderRadius: "var(--sd-radius-sm)", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={18} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{name}</div>
            {connected && followers && (
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{followers} followers</div>
            )}
          </div>
          {connected
            ? <Badge label="Connected" tone="green" variant="status" dot />
            : <Button variant="secondary" size="sm">Connect</Button>
          }
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Set Rates                                                    */
/* ------------------------------------------------------------------ */

const RATES = [
  { label: "Instagram Reel",     price: "$1,200" },
  { label: "Instagram Story",    price: "$400" },
  { label: "TikTok Video",       price: "$900" },
  { label: "YouTube Integration",price: "$2,500" },
  { label: "Usage Rights (90d)", price: "$500" },
];

function StepSetRates() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontSize: 13, color: "var(--sd-font-secondary)", margin: "0 0 6px", lineHeight: 1.5 }}>
        Set your base rates per deliverable. You can negotiate individually on each deal.
      </p>
      {RATES.map(({ label, price }) => (
        <div key={label} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 14px",
          border: "1px solid var(--sd-border-light)",
          borderRadius: "var(--sd-radius-sm)",
          background: "var(--sd-bg-primary)",
        }}>
          <span style={{ fontSize: 13, color: "var(--sd-font-secondary)", fontWeight: 500 }}>{label}</span>
          <div style={{
            padding: "4px 12px",
            border: "1px solid var(--sd-border-main)",
            borderRadius: "var(--sd-radius-sm)",
            fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)",
            background: "var(--sd-bg-secondary)",
            minWidth: 72, textAlign: "center",
          }}>
            {price}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 — Categories                                                   */
/* ------------------------------------------------------------------ */

const ALL_CATEGORIES = ["Lifestyle", "Beauty", "Fashion", "Travel", "Food", "Fitness", "Gaming", "Tech", "Home", "Parenting", "Business", "Pets"];

function StepCategories() {
  const [selected, setSelected] = useState(["Lifestyle", "Beauty", "Fashion"]);

  function toggle(cat: string) {
    setSelected(s => s.includes(cat) ? s.filter(c => c !== cat) : [...s, cat]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 13, color: "var(--sd-font-secondary)", margin: 0, lineHeight: 1.5 }}>
        Select the content categories that best describe your niche. Brands use these to find you.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {ALL_CATEGORIES.map(cat => {
          const active = selected.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--sd-radius-pill)",
                border: `1.5px solid ${active ? "var(--sd-bg-inverted)" : "var(--sd-border-light)"}`,
                background: active ? "var(--sd-bg-inverted)" : "var(--sd-bg-primary)",
                color: active ? "#fff" : "var(--sd-font-secondary)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>{selected.length} selected</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 5 — Preview                                                      */
/* ------------------------------------------------------------------ */

function StepPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 13, color: "var(--sd-font-secondary)", margin: 0 }}>Here's how your profile will appear to brands.</p>
      <div style={{
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-lg)",
        padding: 20, background: "var(--sd-bg-primary)",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar name="Sophie Lane" tone="sky" size="lg" />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sd-font-primary)" }}>Sophie Lane</div>
            <div style={{ fontSize: 13, color: "var(--sd-creator-handle)", fontWeight: 500 }}>@sophie.creates</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <Badge label="Lifestyle" tone="sky" variant="status" />
              <Badge label="Beauty" tone="pink" variant="status" />
              <Badge label="Fashion" tone="purple" variant="status" />
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Followers",    value: "224K" },
            { label: "Engagement",   value: "4.6%" },
            { label: "Avg Reel",     value: "$1,200" },
            { label: "Response",     value: "< 24h" },
          ].map(({ label, value }) => (
            <div key={label} style={{ padding: "10px 12px", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sd-font-primary)", marginTop: 3 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wizard wrapper                                                        */
/* ------------------------------------------------------------------ */

const STEP_CONTENT = [
  <StepProfile key="profile" />,
  <StepConnectAccounts key="connect" />,
  <StepSetRates key="rates" />,
  <StepCategories key="categories" />,
  <StepPreview key="preview" />,
];

function CreatorOnboardingWizard({ initialStep = 1 }: { initialStep?: number }) {
  const [step, setStep] = useState(initialStep);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-lg)",
        background: "var(--sd-bg-primary)",
        padding: 28,
        display: "flex", flexDirection: "column", gap: 0,
      }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary)" }}>Set up your creator profile</div>
          <div style={{ fontSize: 13, color: "var(--sd-font-tertiary)", marginTop: 3 }}>Step {step + 1} of {STEPS.length} — {STEPS[step]}</div>
        </div>

        <StepIndicator current={step} />

        {/* Step content */}
        <div style={{ minHeight: 240 }}>
          {STEP_CONTENT[step]}
        </div>

        {/* Footer nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--sd-border-light)" }}>
          <Button variant="secondary" size="sm" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
            Back
          </Button>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>{step + 1} / {STEPS.length}</div>
          <Button variant="primary" size="sm" onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}>
            {step === STEPS.length - 1 ? "Finish setup" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-onboarding",
  title: "Creator Onboarding",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Multi-step wizard guiding a new creator through profile setup, account connections, rate setting, and category selection.",
  description: "Five-step onboarding flow: Profile → Connect Accounts → Set Rates → Categories → Preview. Uses useState to track the current step with animated step indicators. Connects platform accounts, configures deliverable pricing, selects content categories, and previews the public profile before publishing.",
  demos: [
    {
      title: "Connect Accounts step (step 2)",
      description: "Shows the platform connection step — most visually interesting with the connected/unconnected states.",
      block: true,
      plain: true,
      render: () => <CreatorOnboardingWizard initialStep={1} />,
    },
    {
      title: "Categories step (step 4)",
      description: "Interactive category chip grid with toggle selection.",
      block: true,
      plain: true,
      render: () => <CreatorOnboardingWizard initialStep={3} />,
    },
    {
      title: "Profile preview (step 5)",
      description: "Final preview of the creator card before going live.",
      block: true,
      plain: true,
      render: () => <CreatorOnboardingWizard initialStep={4} />,
    },
  ],
};

export default doc;
