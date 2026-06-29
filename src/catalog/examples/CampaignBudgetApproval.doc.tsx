"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconEdit,
  IconChevronDown,
  IconChevronUp,
  IconCurrencyDollar,
  IconUsers,
  IconCamera,
  IconBrandInstagram,
  IconTrendingUp,
  IconShield,
  IconSend,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type ApprovalState = "pending" | "approved" | "partial" | "rejected";

interface LineItem {
  id: string;
  category: string;
  description: string;
  icon: React.ElementType;
  subItems?: { label: string; amount: number }[];
  amount: number;
  approved: number;
  editable?: boolean;
}

const LINE_ITEMS: LineItem[] = [
  {
    id: "li1", category: "Creator fees", description: "4 creators × agreed rate",
    icon: IconUsers, amount: 5200, approved: 5200,
    subItems: [
      { label: "Priya Nair (IG Reel + TikTok)", amount: 1700 },
      { label: "Marcus Webb (IG Reel)", amount: 1400 },
      { label: "Ji-ho Kim (TikTok video)", amount: 1200 },
      { label: "Amara Diallo (IG Story pack)", amount: 900 },
    ],
  },
  {
    id: "li2", category: "Production allowance",
    description: "Product send + kit reimbursement",
    icon: IconCamera, amount: 600, approved: 600,
  },
  {
    id: "li3", category: "Platform amplification",
    description: "Paid boosting — top 2 posts",
    icon: IconBrandInstagram, amount: 1200, approved: 800, editable: true,
  },
  {
    id: "li4", category: "Performance bonus pool",
    description: "Awarded if ER ≥ 8% — optional",
    icon: IconTrendingUp, amount: 500, approved: 0, editable: true,
  },
  {
    id: "li5", category: "Contingency (5%)",
    description: "Buffer for scope changes",
    icon: IconShield, amount: 375, approved: 375,
  },
];

/* ---- Demo ---- */
function Demo() {
  const [state, setState]         = useState<ApprovalState>("pending");
  const [expandedId, setExpanded] = useState<string | null>("li1");
  const [approved, setApproved]   = useState<Record<string, number>>(
    Object.fromEntries(LINE_ITEMS.map((li) => [li.id, li.approved]))
  );
  const [financeNote, setFinanceNote] = useState("");
  const [submitting, setSubmitting]   = useState(false);

  const total    = LINE_ITEMS.reduce((s, li) => s + li.amount, 0);
  const approvedTotal = Object.values(approved).reduce((s, v) => s + v, 0);
  const delta    = approvedTotal - total;

  function act(action: ApprovalState) {
    if ((action === "rejected" || action === "partial") && !financeNote.trim()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setState(action); }, 900);
  }

  function fmt(n: number) { return `$${n.toLocaleString()}`; }

  if (state !== "pending") {
    const meta = {
      approved: { label: "Approved",          tone: "green"  as const, icon: IconCheck },
      partial:  { label: "Partially approved", tone: "yellow" as const, icon: IconAlertTriangle },
      rejected: { label: "Rejected",           tone: "red"    as const, icon: IconX },
    }[state];
    const Icon = meta.icon;
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", padding: "28px 0", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 99, background: TONES[meta.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
          <Icon size={22} style={{ color: TONES[meta.tone].text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 800 }}>Budget {meta.label.toLowerCase()}</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginTop: 4 }}>
          {state === "approved" ? fmt(approvedTotal) + " approved in full"
            : state === "partial" ? fmt(approvedTotal) + " of " + fmt(total) + " approved"
            : "Finance did not approve this request"}
        </div>
        {financeNote && (
          <div style={{ margin: "12px auto", maxWidth: 320, padding: "9px 12px", background: TONES[meta.tone].tint, borderRadius: 9, fontSize: 11, color: TONES[meta.tone].text, fontStyle: "italic", textAlign: "left" }}>
            "{financeNote}"
          </div>
        )}
        <Button variant="secondary" size="sm" onClick={() => { setState("pending"); setApproved(Object.fromEntries(LINE_ITEMS.map((li) => [li.id, li.approved]))); setFinanceNote(""); }} style={{ marginTop: 12 }}>
          Reset demo
        </Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Budget approval request</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Submitted by Sarah K. · Jun 26</div>
        </div>
        <Badge label="Awaiting finance" tone="yellow" size="sm" dot />
      </div>

      {/* Summary tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Requested",      value: fmt(total),         tone: "gray"   as const },
          { label: "Approved so far", value: fmt(approvedTotal), tone: "green"  as const },
          { label: "Difference",      value: (delta >= 0 ? "+" : "") + fmt(delta), tone: delta < 0 ? "red" as const : "green" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "9px 11px", background: TONES[tone].tint, borderRadius: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 10, color: TONES[tone].text, opacity: 0.75 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Line items */}
      <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
        {LINE_ITEMS.map((li, i) => {
          const LIcon = li.icon;
          const isOpen = expandedId === li.id;
          const cut = approved[li.id] < li.amount;
          return (
            <div key={li.id} style={{ borderTop: i > 0 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none" }}>
              <button onClick={() => setExpanded(isOpen ? null : li.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <LIcon size={13} style={{ color: "var(--sd-font-secondary,#555)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{li.category}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{li.description}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, minWidth: 90 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{fmt(li.amount)}</div>
                  {cut && <div style={{ fontSize: 10, color: TONES.red.text, fontWeight: 700 }}>→ {fmt(approved[li.id])}</div>}
                </div>
                {isOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />}
              </button>

              {isOpen && (
                <div style={{ padding: "0 14px 12px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {li.subItems && (
                    <div style={{ marginBottom: 10 }}>
                      {li.subItems.map(({ label, amount }) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 11, borderBottom: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                          <span style={{ color: "var(--sd-font-secondary,#555)" }}>{label}</span>
                          <span style={{ fontWeight: 700 }}>{fmt(amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {li.editable && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4, color: "var(--sd-font-secondary,#555)" }}>Approved amount</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {[0, Math.round(li.amount * 0.5), Math.round(li.amount * 0.75), li.amount].map((v) => (
                          <button key={v} onClick={() => setApproved((p) => ({ ...p, [li.id]: v }))}
                            style={{ padding: "5px 10px", borderRadius: 7, border: `1.5px solid ${approved[li.id] === v ? "#111" : "var(--sd-border-default,#e5e7eb)"}`, background: approved[li.id] === v ? "#111" : "transparent", color: approved[li.id] === v ? "#fff" : "var(--sd-font-secondary,#555)", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                            {v === 0 ? "Cut" : fmt(v)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Totals row */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", borderTop: "2px solid #111", background: "var(--sd-bg-secondary,#f4f4f5)" }}>
          <span style={{ fontSize: 12, fontWeight: 800 }}>Total</span>
          <span style={{ fontSize: 12, fontWeight: 900 }}>{fmt(total)} requested · {fmt(approvedTotal)} approved</span>
        </div>
      </div>

      {/* Finance note */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Finance note <span style={{ fontWeight: 400, color: "var(--sd-font-tertiary,#999)" }}>(required for partial or rejection)</span></div>
        <textarea value={financeNote} onChange={(e) => setFinanceNote(e.target.value)} placeholder="Explain your decision to the campaign manager…"
          style={{ width: "100%", minHeight: 70, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "9px 12px", fontSize: 12, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="primary"   size="sm" leftIcon={<IconCheck size={11} />}
          onClick={() => act("approved")} disabled={submitting} style={{ flex: 1, background: TONES.green.text, borderColor: TONES.green.text }}>
          Approve {fmt(approvedTotal)}
        </Button>
        <Button variant="secondary" size="sm" leftIcon={<IconEdit size={11} />}
          onClick={() => act("partial")} disabled={submitting || !financeNote.trim()} style={{ flex: 1 }}>
          Partial approval
        </Button>
        <Button variant="secondary" size="sm" leftIcon={<IconX size={11} />}
          onClick={() => act("rejected")} disabled={submitting || !financeNote.trim()}
          style={{ color: TONES.red.text, borderColor: TONES.red.text }}>
          Reject
        </Button>
      </div>
      <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginTop: 6, textAlign: "center" }}>
        Partial approval and Reject require a finance note
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-budget-approval",
  title: "CampaignBudgetApproval",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Finance team's budget approval panel — 5 itemized line items with expandable sub-items, editable approved amounts on discretionary lines, approve/partial/reject CTA with required finance note.",
  description:
    "Finance review view for campaign budget requests. Header: campaign name, submitter, date, 'Awaiting finance' badge. 3 summary tiles: requested total, approved so far (updates live), difference (red when under). 5 line-item accordion rows: creator fees ($5,200 with 4 sub-items per creator), production allowance ($600, non-editable), platform amplification ($1,200 → editable: Cut/$600/$900/$1,200 option tiles), performance bonus pool ($500 → editable: Cut/$250/$375/$500), contingency ($375, non-editable). Line items with cuts show red '→ $N' approved amount. Totals row: requested vs approved. Finance note textarea (required for partial/reject, optional for full approve). 3 CTAs: Approve (green, always enabled), Partial approval (disabled without note), Reject (red outline, disabled without note). All animate 'Submitting…' → confirmation screen with icon, amounts, finance note quote, Reset demo button. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign budget approval",
      description: "Expand 'Platform amplification' or 'Performance bonus pool' to adjust the approved amount. Add a finance note (required for partial/reject), then click an action button.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
