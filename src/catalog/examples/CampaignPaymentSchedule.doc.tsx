"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconClock,
  IconCircle,
  IconCurrencyDollar,
  IconLock,
  IconReceipt,
  IconAlertTriangle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type MilestoneStatus = "paid" | "pending" | "upcoming" | "overdue";

interface Milestone {
  id: string;
  label: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: MilestoneStatus;
}

const INITIAL_MILESTONES: Milestone[] = [
  { id: "m1", label: "Contract signing bonus",  description: "Paid on contract signature",           amount: 500,  dueDate: "Jun 1",  paidDate: "Jun 1",  status: "paid"     },
  { id: "m2", label: "First deliverable",        description: "Paid after first post approved",       amount: 850,  dueDate: "Jun 15", paidDate: "Jun 16", status: "paid"     },
  { id: "m3", label: "Second deliverable",       description: "Paid after second post approved",      amount: 850,  dueDate: "Jun 22", paidDate: undefined, status: "pending"  },
  { id: "m4", label: "Campaign completion",      description: "Paid after all content published",     amount: 1200, dueDate: "Jun 28", paidDate: undefined, status: "upcoming" },
  { id: "m5", label: "Performance bonus",        description: "If campaign ER exceeds 7% target",     amount: 300,  dueDate: "Jul 5",  paidDate: undefined, status: "upcoming" },
];

const STATUS_META: Record<MilestoneStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  paid:     { label: "Paid",    tone: "green",  icon: IconCheck          },
  pending:  { label: "Due now", tone: "orange", icon: IconClock          },
  upcoming: { label: "Upcoming", tone: "gray",  icon: IconCircle         },
  overdue:  { label: "Overdue", tone: "red",    icon: IconAlertTriangle  },
};

function Demo() {
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [paying,     setPaying]     = useState<string | null>(null);
  const [receipt,    setReceipt]    = useState<string | null>(null);

  function markPaid(id: string) {
    setPaying(id);
    setTimeout(() => {
      setMilestones((prev) => prev.map((m) => m.id === id ? { ...m, status: "paid", paidDate: "Jun 29" } : m));
      setPaying(null);
    }, 900);
  }

  function showReceipt(id: string) {
    setReceipt(id === receipt ? null : id);
  }

  const totalBudget = milestones.reduce((s, m) => s + m.amount, 0);
  const totalPaid   = milestones.filter((m) => m.status === "paid").reduce((s, m) => s + m.amount, 0);
  const totalPending = milestones.filter((m) => m.status === "pending").reduce((s, m) => s + m.amount, 0);
  const paidPct = Math.round((totalPaid / totalBudget) * 100);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>Payment schedule</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Priya Nair</div>
      </div>

      {/* Summary tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Total fee",  value: "$" + totalBudget.toLocaleString(),  tone: "gray"   as const },
          { label: "Paid",       value: "$" + totalPaid.toLocaleString(),    tone: "green"  as const },
          { label: "Remaining",  value: "$" + (totalBudget - totalPaid).toLocaleString(), tone: "blue" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "9px 10px", background: TONES[tone].tint, borderRadius: 9, textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.7 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Payment progress</span>
          <span style={{ fontSize: 10, fontWeight: 700 }}>{paidPct}% paid</span>
        </div>
        <div style={{ height: 6, background: "var(--sd-bg-tertiary,#e5e7eb)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, background: TONES.green.text, width: paidPct + "%", transition: "width 0.4s ease" }} />
        </div>
      </div>

      {totalPending > 0 && (
        <div style={{ display: "flex", gap: 7, alignItems: "center", padding: "8px 11px", background: TONES.orange.tint, borderRadius: 9, marginBottom: 12 }}>
          <IconClock size={12} style={{ color: TONES.orange.text, flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: TONES.orange.text }}>
            <strong>${totalPending.toLocaleString()}</strong> due now — release payment to proceed
          </div>
        </div>
      )}

      {/* Milestone list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {milestones.map((m, i) => {
          const meta    = STATUS_META[m.status];
          const isLast  = i === milestones.length - 1;
          const showRec = receipt === m.id;

          return (
            <div key={m.id} style={{ display: "flex", gap: 10 }}>
              {/* Connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: m.status === "paid" ? TONES.green.text : m.status === "pending" ? TONES.orange.text : m.status === "overdue" ? TONES.red.text : "var(--sd-bg-tertiary,#f1f1f1)", border: `2px solid ${m.status === "paid" ? TONES.green.text : m.status === "pending" ? TONES.orange.text : "var(--sd-border-default,#e5e7eb)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <meta.icon size={13} style={{ color: m.status === "upcoming" ? "var(--sd-font-tertiary,#bbb)" : "#fff" }} />
                </div>
                {!isLast && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: m.status === "paid" ? TONES.green.text + "40" : "var(--sd-border-default,#e5e7eb)", marginTop: 3, marginBottom: 3 }} />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: isLast ? 0 : 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 1, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{m.label}</span>
                      <Badge label={meta.label} tone={meta.tone} size="sm" />
                    </div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 2 }}>{m.description}</div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#bbb)" }}>
                      Due {m.dueDate}{m.paidDate ? ` · Paid ${m.paidDate}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: m.status === "paid" ? TONES.green.text : m.status === "pending" ? TONES.orange.text : "var(--sd-font-primary,#111)" }}>
                      ${m.amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {m.status === "pending" && (
                  <div style={{ marginTop: 7 }}>
                    <Button variant="primary" size="sm" leftIcon={paying === m.id ? undefined : <IconCurrencyDollar size={11} />}
                      onClick={() => markPaid(m.id)} disabled={paying === m.id} style={{ width: "100%" }}>
                      {paying === m.id ? "Processing…" : `Release $${m.amount.toLocaleString()} payment`}
                    </Button>
                  </div>
                )}
                {m.status === "paid" && (
                  <div style={{ marginTop: 5 }}>
                    <button onClick={() => showReceipt(m.id)}
                      style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 10, color: TONES.green.text, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <IconReceipt size={11} />{showRec ? "Hide receipt" : "View receipt"}
                    </button>
                    {showRec && (
                      <div style={{ marginTop: 6, padding: "8px 10px", background: TONES.green.tint, borderRadius: 8, fontSize: 10 }}>
                        <div style={{ fontWeight: 700, color: TONES.green.text, marginBottom: 3 }}>Payment receipt</div>
                        <div style={{ color: TONES.green.text, opacity: 0.8 }}>Amount: ${m.amount.toLocaleString()}</div>
                        <div style={{ color: TONES.green.text, opacity: 0.8 }}>Date: {m.paidDate}</div>
                        <div style={{ color: TONES.green.text, opacity: 0.8 }}>Ref: SD-{m.id.toUpperCase()}-2026</div>
                      </div>
                    )}
                  </div>
                )}
                {m.status === "upcoming" && (
                  <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 5, fontSize: 10, color: "var(--sd-font-tertiary,#bbb)" }}>
                    <IconLock size={10} />
                    Unlocks after previous milestone paid
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-payment-schedule",
  title: "CampaignPaymentSchedule",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Campaign payment milestone tracker — 3 summary tiles, progress bar, and a vertical timeline of 5 milestones (paid/due now/upcoming) with release-payment CTA and expandable receipts.",
  description:
    "Brand manages creator fee disbursements across milestones. Header: 'Payment schedule' + campaign + creator name. 3 summary tiles: total fee gray / paid green / remaining blue. Progress bar with live fill showing % paid. Orange alert banner when a payment is due. 5 milestone rows in a vertical timeline: circle nodes (green check for paid / orange clock for due now / hollow gray for upcoming) connected by 1px lines (green-tinted below paid milestones). Each row: label + status badge, description, due date + paid date when applicable, amount right-aligned (green when paid / orange when due). Pending rows show 'Release $N payment' primary CTA → 900ms 'Processing…' → marks paid, transitions node to green, updates tiles + bar. Paid rows show 'View receipt' toggle → green receipt card with amount/date/reference. Upcoming rows show lock icon + 'Unlocks after previous milestone paid'. Pre-seeded: Contract bonus (paid Jun 1) + First deliverable (paid Jun 16) + Second deliverable (PENDING — $850 CTA) + Campaign completion (upcoming) + Performance bonus (upcoming, ER-conditional). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign payment schedule",
      description: "Click 'Release payment' on the Second deliverable to mark it paid and see the tiles + bar update. Click 'View receipt' on paid milestones to expand the receipt card.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
