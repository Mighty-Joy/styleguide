"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconLock,
  IconAlertCircle,
  IconRocket,
  IconFileText,
  IconUsers,
  IconPackage,
  IconLink,
  IconCurrencyDollar,
  IconMail,
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type CheckStatus = "done" | "pending" | "blocked";

interface CheckItem {
  id: string;
  label: string;
  description: string;
  status: CheckStatus;
  icon: React.ElementType;
  assignee: string;
  detail?: string;
  actionLabel?: string;
}

/* ---- seed ---- */
const CHECKS_INIT: CheckItem[] = [
  {
    id: "c1", icon: IconFileText, label: "Campaign brief signed off",
    description: "Brand and creator have both approved the final brief.",
    status: "done", assignee: "Brand team",
    detail: "Signed Jun 21 by sarah@auralabs.com and priya.creates@gmail.com.",
  },
  {
    id: "c2", icon: IconFileText, label: "Contracts executed",
    description: "All creator agreements countersigned and stored.",
    status: "done", assignee: "Legal",
    detail: "5 / 5 contracts fully executed. DocuSign confirmations on file.",
  },
  {
    id: "c3", icon: IconPackage, label: "Product samples shipped",
    description: "Product kits dispatched to all confirmed creators.",
    status: "done", assignee: "Logistics",
    detail: "All 5 shipments delivered. Average delivery: Jun 23.",
  },
  {
    id: "c4", icon: IconUsers, label: "Creators briefed",
    description: "Kick-off message sent; creators confirmed receipt.",
    status: "done", assignee: "Campaign manager",
    detail: "Kick-off thread sent Jun 22. 5 / 5 creators confirmed.",
  },
  {
    id: "c5", icon: IconLink, label: "UTM tracking links set up",
    description: "Unique UTM parameters generated for each creator.",
    status: "pending", assignee: "Growth team",
    detail: "3 / 5 links generated. Waiting on Marcus Webb and Aisha Obi handles.",
    actionLabel: "Open UTM builder",
  },
  {
    id: "c6", icon: IconCurrencyDollar, label: "Budget approved",
    description: "Campaign spend approved by finance.",
    status: "done", assignee: "Finance",
    detail: "$42,000 total budget approved Jun 20. PO #2024-189 on file.",
  },
  {
    id: "c7", icon: IconLink, label: "Affiliate codes activated",
    description: "Discount codes live and tested in the e-commerce backend.",
    status: "blocked", assignee: "Engineering",
    detail: "Blocked: staging environment down. ETA from eng: Jun 29 EOD.",
    actionLabel: "View blocker ticket",
  },
  {
    id: "c8", icon: IconMail, label: "Launch announcement ready",
    description: "CRM email drafted and scheduled for launch day.",
    status: "pending", assignee: "Marketing",
    detail: "Email drafted — awaiting final copy approval from CMO.",
    actionLabel: "Review draft",
  },
];

const STATUS_META: Record<CheckStatus, { color: string; bg: string; icon: React.ElementType; label: string; tone: keyof typeof TONES }> = {
  done:    { color: TONES.green.text,  bg: TONES.green.tint,  icon: IconCheck,        label: "Done",    tone: "green"  },
  pending: { color: TONES.yellow.text, bg: TONES.yellow.tint, icon: IconAlertCircle,  label: "Pending", tone: "yellow" },
  blocked: { color: TONES.red.text,    bg: TONES.red.tint,    icon: IconLock,         label: "Blocked", tone: "red"    },
};

/* ---- Demo ---- */
function Demo() {
  const [checks, setChecks]   = useState<CheckItem[]>(CHECKS_INIT);
  const [expanded, setExpanded] = useState<string | null>("c5");
  const [launched, setLaunched] = useState(false);

  function markDone(id: string) {
    setChecks((prev) => prev.map((c) => c.id === id ? { ...c, status: "done" } : c));
  }

  const done    = checks.filter((c) => c.status === "done").length;
  const blocked = checks.filter((c) => c.status === "blocked").length;
  const pending = checks.filter((c) => c.status === "pending").length;
  const total   = checks.length;
  const pct     = Math.round((done / total) * 100);
  const canLaunch = blocked === 0 && pending === 0;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>Launch readiness</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Badge label="Summer Glow" tone="yellow" />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Go-live: Jul 1 · {done} / {total} checks passed</span>
          </div>
        </div>
        {launched ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: TONES.green.tint, fontSize: 12, fontWeight: 700, color: TONES.green.text }}>
            <IconRocket size={14} />Campaign live!
          </div>
        ) : (
          <Button variant="primary" size="sm" leftIcon={<IconRocket size={12} />} disabled={!canLaunch} onClick={() => setLaunched(true)}>
            Launch campaign
          </Button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{pct}% ready</span>
          <div style={{ display: "flex", gap: 6 }}>
            {done    > 0 && <span style={{ fontSize: 10, color: TONES.green.text, fontWeight: 700 }}>{done} done</span>}
            {pending > 0 && <span style={{ fontSize: 10, color: TONES.yellow.text, fontWeight: 700 }}>{pending} pending</span>}
            {blocked > 0 && <span style={{ fontSize: 10, color: TONES.red.text, fontWeight: 700 }}>{blocked} blocked</span>}
          </div>
        </div>
        <div style={{ height: 7, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ width: `${pct}%`, background: canLaunch ? TONES.green.text : "#111", borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
        </div>
        {!canLaunch && (
          <div style={{ marginTop: 6, fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
            {blocked > 0 ? `${blocked} blocker${blocked > 1 ? "s" : ""} must be resolved before launch.` : `${pending} item${pending > 1 ? "s" : ""} pending — resolve to unlock launch.`}
          </div>
        )}
      </div>

      {/* Checklist */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {checks.map((check, i) => {
          const { color, bg, icon: SIcon, tone } = STATUS_META[check.status];
          const CIcon = check.icon;
          const isOpen = expanded === check.id;
          return (
            <div key={check.id} style={{ borderBottom: i < checks.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", background: check.status === "blocked" ? "rgba(220,38,38,0.02)" : "transparent" }}>
              <button onClick={() => setExpanded(isOpen ? null : check.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {/* Status circle */}
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SIcon size={12} style={{ color }} />
                </div>
                {/* Category icon */}
                <CIcon size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{check.label}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{check.description}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{check.assignee}</span>
                  <Badge label={STATUS_META[check.status].label} tone={tone} size="sm" dot />
                  {isOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />}
                </div>
              </button>
              {/* Expanded detail */}
              {isOpen && check.detail && (
                <div style={{ padding: "0 14px 12px 60px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", paddingTop: 10 }}>
                  <div style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", marginBottom: 8 }}>{check.detail}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {check.actionLabel && (
                      <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: color, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        {check.actionLabel} <IconExternalLink size={10} />
                      </button>
                    )}
                    {check.status !== "done" && (
                      <button onClick={() => markDone(check.id)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: TONES.green.text, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        <IconCheck size={10} /> Mark as done
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-launch-checklist",
  title: "CampaignLaunchChecklist",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Pre-launch gate checklist — 8 readiness checks (brief, contracts, shipping, briefing, UTM links, budget, affiliate codes, announcement) with expandable detail and a gated Launch button.",
  description:
    "Ensures every pre-launch dependency is confirmed before a campaign goes live. Header: campaign badge, go-live date, check progress count, gated Launch campaign button (disabled until all checks pass). Progress bar: animated fill showing % ready, split labels for done/pending/blocked counts, helper text on blockers. Checklist accordion: 8 items — status circle (green check / yellow alert / red lock), category icon, label, description, assignee name, status badge; expand to see detail text, optional action link (UTM builder, blocker ticket, draft review), and Mark as done shortcut. Blocked items get a faint red row background. Launch button becomes active when all 8 pass — click to see the green launched state. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign launch checklist",
      description: "Click items to expand detail. Use 'Mark as done' on Pending items to resolve them — once all 8 pass the Launch button activates.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
