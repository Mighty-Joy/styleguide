"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconDownload,
  IconCreditCard,
  IconChevronRight,
  IconArrowRight,
  IconSparkles,
  IconBolt,
  IconRocket,
  IconStar,
  IconAlertTriangle,
  IconRefresh,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PlanId = "starter" | "growth" | "scale";

interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  icon: React.ElementType;
  tone: keyof typeof TONES;
  features: string[];
  limits: { campaigns: number; creators: number; seats: number };
}

const PLANS: Plan[] = [
  {
    id: "starter", name: "Starter", price: "$149", period: "/mo", icon: IconStar, tone: "gray",
    features: ["Up to 3 active campaigns", "25 creator contacts", "2 team seats", "Basic analytics", "Email support"],
    limits: { campaigns: 3, creators: 25, seats: 2 },
  },
  {
    id: "growth", name: "Growth", price: "$399", period: "/mo", icon: IconBolt, tone: "blue",
    features: ["Up to 15 active campaigns", "250 creator contacts", "5 team seats", "Advanced analytics + exports", "Brand safety reports", "Priority support"],
    limits: { campaigns: 15, creators: 250, seats: 5 },
  },
  {
    id: "scale", name: "Scale", price: "$899", period: "/mo", icon: IconRocket, tone: "purple",
    features: ["Unlimited campaigns", "Unlimited creator contacts", "Unlimited seats", "All analytics + API access", "Dedicated CSM", "Custom contracts"],
    limits: { campaigns: 999, creators: 999, seats: 999 },
  },
];

const USAGE = { campaigns: 11, creators: 187, seats: 4 };

const INVOICES = [
  { id: "inv001", date: "Jun 1, 2025",  amount: "$399", status: "paid"   },
  { id: "inv002", date: "May 1, 2025",  amount: "$399", status: "paid"   },
  { id: "inv003", date: "Apr 1, 2025",  amount: "$399", status: "paid"   },
  { id: "inv004", date: "Mar 1, 2025",  amount: "$149", status: "paid"   },
];

function UsageBar({ used, max, tone }: { used: number; max: number; tone: keyof typeof TONES }) {
  const pct = max === 999 ? 0 : Math.min((used / max) * 100, 100);
  const isHigh = pct >= 80;
  const barTone = isHigh ? "red" : tone;
  return (
    <div style={{ height: 5, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: TONES[barTone].text, borderRadius: 3, transition: "width 0.6s ease" }} />
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [currentPlan, setCurrentPlan] = useState<PlanId>("growth");
  const [upgrading, setUpgrading] = useState(false);
  const [selected, setSelected] = useState<PlanId>("growth");

  const plan = PLANS.find((p) => p.id === currentPlan)!;
  const PlanIcon = plan.icon;

  function changePlan(id: PlanId) {
    setSelected(id);
    setUpgrading(true);
    setTimeout(() => { setCurrentPlan(id); setUpgrading(false); }, 1000);
  }

  const nextBilling = "Jul 1, 2025";
  const usagePct = (USAGE.campaigns / plan.limits.campaigns) * 100;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Current plan banner */}
      <div style={{ padding: "16px", background: `linear-gradient(135deg,${TONES[plan.tone].tint},${TONES[plan.tone].tint}80)`, borderRadius: 12, border: `1px solid ${TONES[plan.tone].text}30`, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: TONES[plan.tone].tint, border: `1px solid ${TONES[plan.tone].text}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PlanIcon size={18} style={{ color: TONES[plan.tone].text }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 800 }}>{plan.name} plan</span>
              <Badge label="Current" tone={plan.tone} size="sm" dot />
            </div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>
              {plan.price}{plan.period} · Renews {nextBilling}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="secondary" size="sm" leftIcon={<IconCreditCard size={11} />}>Billing</Button>
            <Button variant="secondary" size="sm">Cancel plan</Button>
          </div>
        </div>

        {/* Usage meters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 14 }}>
          {[
            { label: "Active campaigns", used: USAGE.campaigns, max: plan.limits.campaigns },
            { label: "Creator contacts",  used: USAGE.creators,  max: plan.limits.creators  },
            { label: "Team seats",        used: USAGE.seats,     max: plan.limits.seats      },
          ].map(({ label, used, max }) => {
            const isUnlimited = max === 999;
            const pct = isUnlimited ? 0 : Math.round((used / max) * 100);
            const isHigh = !isUnlimited && pct >= 80;
            return (
              <div key={label} style={{ background: "rgba(255,255,255,0.7)", borderRadius: 9, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", fontWeight: 600 }}>{label}</span>
                  {isHigh && <IconAlertTriangle size={11} style={{ color: TONES.red.text }} />}
                </div>
                <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 5 }}>
                  {used}{isUnlimited ? "" : <span style={{ fontSize: 10, fontWeight: 500, color: "var(--sd-font-tertiary,#999)" }}>/{max}</span>}
                </div>
                {!isUnlimited && <UsageBar used={used} max={max} tone={plan.tone} />}
                {isUnlimited && <div style={{ fontSize: 10, color: TONES.green.text, fontWeight: 700 }}>Unlimited</div>}
              </div>
            );
          })}
        </div>

        {usagePct >= 70 && currentPlan !== "scale" && (
          <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: `${TONES.yellow.tint}`, borderRadius: 8 }}>
            <IconAlertTriangle size={13} style={{ color: TONES.yellow.text, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: TONES.yellow.text, flex: 1 }}>You're at {Math.round(usagePct)}% of your campaign limit. Consider upgrading.</span>
            <button onClick={() => setSelected("scale")} style={{ fontSize: 11, fontWeight: 700, color: TONES.yellow.text, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>View plans</button>
          </div>
        )}
      </div>

      {/* Plan picker */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Change plan</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
        {PLANS.map((p) => {
          const PIco = p.icon;
          const isCurrent = p.id === currentPlan;
          const isSelected = selected === p.id;
          return (
            <div key={p.id}
              onClick={() => !isCurrent && setSelected(p.id)}
              style={{ padding: "12px", border: `2px solid ${isSelected ? TONES[p.tone].text : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 12, cursor: isCurrent ? "default" : "pointer", background: isSelected ? TONES[p.tone].tint : "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <PIco size={15} style={{ color: TONES[p.tone].text }} />
                <span style={{ fontSize: 12, fontWeight: 800 }}>{p.name}</span>
                {isCurrent && <Badge label="Current" tone={p.tone} size="sm" />}
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 8 }}>{p.price}<span style={{ fontSize: 10, fontWeight: 400, color: "var(--sd-font-tertiary,#999)" }}>{p.period}</span></div>
              {p.features.slice(0, 3).map((f) => (
                <div key={f} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <IconCheck size={10} style={{ color: TONES[p.tone].text, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>{f}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {selected !== currentPlan && (
        <div style={{ marginBottom: 16 }}>
          <Button variant="primary" size="sm" onClick={() => changePlan(selected)} style={{ width: "100%" }}
            leftIcon={upgrading ? <IconRefresh size={11} /> : <IconArrowRight size={11} />}>
            {upgrading ? "Updating plan…" : `Switch to ${PLANS.find(p => p.id === selected)?.name}`}
          </Button>
        </div>
      )}

      {/* Invoice history */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Invoice history</div>
      <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {INVOICES.map((inv, i) => (
          <div key={inv.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderBottom: i < INVOICES.length - 1 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{inv.date}</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", fontFamily: "monospace" }}>{inv.id}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800 }}>{inv.amount}</span>
            <Badge label="Paid" tone="green" size="sm" dot />
            <button style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconDownload size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "billing-and-subscription",
  title: "BillingAndSubscription",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Workspace billing screen — current plan banner with usage meters, 3-plan picker (Starter/Growth/Scale), switch-plan CTA, and invoice history with PDF downloads.",
  description:
    "Lets brand workspace admins manage their subscription. Current plan banner (tinted to plan color): plan icon, name, 'Current' badge, price + renewal date, Billing + Cancel buttons. 3 usage meters in frosted sub-cards: Active campaigns (11/15, 73% — nearing limit), Creator contacts (187/250), Team seats (4/5); bar fills in plan color, turns red at ≥80%. Yellow alert banner when campaign usage ≥70% with a 'View plans' link. Plan picker: 3 cards (Starter $149/Growth $399/Scale $899) with 2px border + tint on selected, plan icon, price, first 3 feature bullets with check icons, 'Current' badge on active. Selecting a different plan shows a 'Switch to X' primary button that animates 'Updating plan…' for 1 second then switches. Invoice history: 4 entries (Jan–Jun, latest first) with date, invoice ID in monospace, amount, green 'Paid' badge, download icon. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Billing and subscription",
      description: "Click Starter or Scale plan cards to select, then click Switch to see the transition. Growth is the pre-selected current plan. The campaign usage bar is at 73% — triggering the yellow warning.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
