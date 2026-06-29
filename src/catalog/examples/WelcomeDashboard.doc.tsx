"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconBuildingStore,
  IconUsers,
  IconRocket,
  IconPlugConnected,
  IconChevronRight,
  IconArrowRight,
  IconStar,
  IconSparkles,
  IconLock,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type StepStatus = "done" | "active" | "upcoming";

interface SetupStep {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  estimate: string;
  cta: string;
  status: StepStatus;
}

/* ---- seed ---- */
const INITIAL_STEPS: SetupStep[] = [
  {
    id: "s1", icon: IconBuildingStore,
    title: "Set up your brand profile",
    description: "Add your logo, brand description, and website so creators can learn about you before applying.",
    estimate: "2 min", cta: "Complete profile", status: "done",
  },
  {
    id: "s2", icon: IconUsers,
    title: "Invite your team",
    description: "Bring in campaign managers, legal, and approvers so everyone can collaborate in one place.",
    estimate: "1 min", cta: "Invite teammates", status: "done",
  },
  {
    id: "s3", icon: IconRocket,
    title: "Create your first campaign",
    description: "Define your campaign goal, deliverables, and budget — then start inviting creators.",
    estimate: "5 min", cta: "Create campaign", status: "active",
  },
  {
    id: "s4", icon: IconPlugConnected,
    title: "Connect your store",
    description: "Link Shopify or WooCommerce to track sales driven by creator content automatically.",
    estimate: "3 min", cta: "Connect store", status: "upcoming",
  },
  {
    id: "s5", icon: IconSparkles,
    title: "Discover creators",
    description: "Search our network of 500K+ verified creators by niche, platform, and engagement rate.",
    estimate: "5 min", cta: "Start searching", status: "upcoming",
  },
];

const ACTIVITY = [
  { name: "Sarah Chen",  initials: "SC", tone: "blue"   as const, action: "joined as Campaign Manager",    time: "2h ago" },
  { name: "Tom Reeves",  initials: "TR", tone: "purple" as const, action: "joined as Approver",             time: "3h ago" },
  { name: "Aura Labs",   initials: "AL", tone: "green"  as const, action: "workspace created",              time: "Jun 27" },
];

/* ---- Demo ---- */
function Demo() {
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const done = steps.filter((s) => s.status === "done").length;
  const total = steps.length;
  const pct = Math.round((done / total) * 100);

  function complete(id: string) {
    setSteps((ss) => {
      const idx = ss.findIndex((s) => s.id === id);
      return ss.map((s, i) => {
        if (s.id === id) return { ...s, status: "done" as StepStatus };
        if (i === idx + 1 && ss[idx + 1]?.status === "upcoming") return { ...s, status: "active" as StepStatus };
        return s;
      });
    });
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Hero welcome */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 14, padding: "22px 24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -30, right: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "relative" }}>
          <Badge label="Getting started" tone="blue" size="sm" />
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 8, marginBottom: 4 }}>Welcome to Superdeal, Aura Labs</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 16, maxWidth: 440 }}>
            You're {pct}% set up. Complete the steps below to start running creator campaigns.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.12)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "#fff", borderRadius: 3, transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{done}/{total} complete</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        {/* Setup checklist */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Setup checklist</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isDone = step.status === "done";
              const isActive = step.status === "active";
              const isUpcoming = step.status === "upcoming";
              return (
                <div
                  key={step.id}
                  style={{
                    border: `1.5px solid ${isActive ? "#111" : isDone ? "var(--sd-border-default, #e5e7eb)" : "var(--sd-border-default, #e5e7eb)"}`,
                    borderRadius: 12,
                    padding: "12px 14px",
                    background: isDone ? "var(--sd-bg-secondary, #f9f9f9)" : "#fff",
                    opacity: isUpcoming ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    {/* Icon / check */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: isDone ? "#111" : isActive ? TONES.blue.tint : "var(--sd-bg-tertiary, #f1f1f1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isDone
                        ? <IconCheck size={16} color="#fff" />
                        : isUpcoming
                        ? <IconLock size={15} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                        : <Icon size={16} style={{ color: TONES.blue.text }} />
                      }
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? "var(--sd-font-tertiary, #999)" : "var(--sd-font-primary, #111)", textDecoration: isDone ? "line-through" : "none" }}>
                          {step.title}
                        </span>
                        {isActive && <Badge label="Up next" tone="blue" size="sm" dot />}
                        {isDone && <Badge label="Done" tone="green" size="sm" />}
                      </div>
                      {!isDone && (
                        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", lineHeight: 1.5, marginBottom: isActive ? 10 : 0 }}>
                          {step.description}
                        </div>
                      )}
                      {isActive && (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Button variant="primary" size="sm" leftIcon={<IconArrowRight size={12} />} onClick={() => complete(step.id)}>
                            {step.cta}
                          </Button>
                          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>~{step.estimate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Quick stats (blurred/placeholder state) */}
          <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>Your stats</span>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {[
                { label: "Campaigns",   value: "0" },
                { label: "Creators",    value: "0" },
                { label: "Content live",value: "0" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, fontSize: 10, color: "var(--sd-font-tertiary, #999)", lineHeight: 1.5 }}>
                Stats will populate once your first campaign is live.
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>Recent activity</span>
            </div>
            <div style={{ padding: "8px 0" }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px" }}>
                  <Avatar initials={a.initials} tone={a.tone} size="sm" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{a.action}</div>
                  </div>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Help card */}
          <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, background: TONES.blue.tint }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <IconStar size={13} style={{ color: TONES.blue.text }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: TONES.blue.text }}>Need help?</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5, marginBottom: 8 }}>
              Book a 30-min onboarding call with our team — we'll walk you through your first campaign.
            </div>
            <Button variant="secondary" size="sm">Book a call</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "welcome-dashboard",
  title: "WelcomeDashboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "First-time brand onboarding — dark hero with progress bar, setup checklist with done/active/locked states, sidebar stats and activity feed.",
  description:
    "The screen new brand workspaces land on after signup. Dark gradient hero: workspace name, progress percentage, filled progress bar. Two-column layout: (1) Setup checklist — 5 steps (profile, team, campaign, store, discover); done steps get a filled check circle and strikethrough; active step expands with description, primary CTA, and time estimate; upcoming steps show a lock icon at 60% opacity; clicking a CTA marks it done and promotes the next step. (2) Right sidebar — quick stats panel (0s until first campaign live), recent activity feed (avatar + action + timestamp), and a help card with booking CTA. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Welcome dashboard",
      description: "Click 'Create campaign' to complete step 3 and unlock step 4. The progress bar and percentage update live.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
