"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconClock,
  IconCurrencyDollar,
  IconBrandInstagram,
  IconBrandTiktok,
  IconAlertCircle,
  IconLock,
  IconSend,
  IconChevronDown,
  IconChevronUp,
  IconInfoCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PayStatus = "pending" | "approved" | "held" | "processing";
type PayMethod = "bank" | "paypal" | "stripe";

interface PayRow {
  id: string;
  creatorName: string;
  creatorInitials: string;
  creatorTone: string;
  platform: "instagram" | "tiktok";
  campaign: string;
  milestone: string;
  amount: number;
  method: PayMethod;
  invoiceRef: string;
  dueDate: string;
  status: PayStatus;
  holdReason?: string;
}

const METHOD_META: Record<PayMethod, { label: string; tone: keyof typeof TONES }> = {
  bank:    { label: "Bank transfer", tone: "blue"   },
  paypal:  { label: "PayPal",        tone: "sky"    },
  stripe:  { label: "Stripe",        tone: "purple" },
};

const ROWS_INIT: PayRow[] = [
  { id: "p1", creatorName: "Priya Nair",   creatorInitials: "PN", creatorTone: "green",     platform: "instagram", campaign: "Summer Glow",   milestone: "Milestone 2 of 3", amount: 2_800, method: "bank",    invoiceRef: "INV-2025-041", dueDate: "Jun 30", status: "pending" },
  { id: "p2", creatorName: "Hana Kim",     creatorInitials: "HK", creatorTone: "pink",      platform: "instagram", campaign: "Summer Glow",   milestone: "Milestone 2 of 3", amount: 2_100, method: "paypal",  invoiceRef: "INV-2025-042", dueDate: "Jun 30", status: "pending" },
  { id: "p3", creatorName: "Diego Santos", creatorInitials: "DS", creatorTone: "orange",    platform: "tiktok",    campaign: "Summer Glow",   milestone: "Final payment",    amount: 3_200, method: "bank",    invoiceRef: "INV-2025-043", dueDate: "Jul 2",  status: "pending" },
  { id: "p4", creatorName: "Marcus Webb",  creatorInitials: "MW", creatorTone: "purple",    platform: "tiktok",    campaign: "FitLife Q2",    milestone: "Milestone 1 of 2", amount: 4_500, method: "stripe",  invoiceRef: "INV-2025-044", dueDate: "Jun 28", status: "held", holdReason: "Content not yet approved — 1 reel outstanding." },
  { id: "p5", creatorName: "Aisha Obi",    creatorInitials: "AO", creatorTone: "turquoise", platform: "instagram", campaign: "Summer Glow",   milestone: "Completion bonus",  amount: 500,  method: "paypal",  invoiceRef: "INV-2025-045", dueDate: "Jul 5",  status: "pending" },
];

/* ---- Demo ---- */
function Demo() {
  const [rows,     setRows]     = useState<PayRow[]>(ROWS_INIT);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [batchSent, setBatchSent] = useState(false);

  function toggleRow(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      const row = rows.find((r) => r.id === id);
      if (row?.status === "held") return prev;
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  function toggleAll() {
    const eligible = rows.filter((r) => r.status === "pending").map((r) => r.id);
    const allSelected = eligible.every((id) => selected.has(id));
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(eligible));
  }
  function holdRow(id: string) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "held", holdReason: "Manually placed on hold by reviewer." } : r));
    setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }
  function releaseRow(id: string) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "pending", holdReason: undefined } : r));
  }
  function processBatch() {
    setRows((prev) => prev.map((r) => selected.has(r.id) ? { ...r, status: "processing" } : r));
    setSelected(new Set());
    setBatchSent(true);
    setTimeout(() => setBatchSent(false), 3000);
  }

  const eligible   = rows.filter((r) => r.status === "pending");
  const allChecked = eligible.length > 0 && eligible.every((r) => selected.has(r.id));
  const batchTotal = rows.filter((r) => selected.has(r.id)).reduce((s, r) => s + r.amount, 0);
  const totalPending = eligible.reduce((s, r) => s + r.amount, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Approve payments</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{eligible.length} pending · ${totalPending.toLocaleString()} to be paid</div>
        </div>
        {selected.size > 0 && (
          <Button variant="primary" size="sm" leftIcon={<IconSend size={12} />} onClick={processBatch}>
            Process {selected.size} · ${batchTotal.toLocaleString()}
          </Button>
        )}
      </div>

      {batchSent && (
        <div style={{ display: "flex", gap: 8, padding: "10px 14px", background: TONES.green.tint, borderRadius: 10, marginBottom: 12, fontSize: 12, fontWeight: 700, color: TONES.green.text, alignItems: "center" }}>
          <IconCheck size={13} />Payments queued — creators will receive funds within 1–3 business days.
        </div>
      )}

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {/* Select-all header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <input type="checkbox" checked={allChecked} onChange={toggleAll}
            style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#111" }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", flex: 1 }}>Creator · Invoice</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", width: 80 }}>Amount</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", width: 88 }}>Method</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", width: 60 }}>Due</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", width: 70 }}>Status</span>
          <span style={{ width: 44 }} />
        </div>

        {rows.map((row, i) => {
          const PIco    = row.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const mMeta   = METHOD_META[row.method];
          const isHeld  = row.status === "held";
          const isProc  = row.status === "processing";
          const isOpen  = expanded === row.id;
          const checked = selected.has(row.id);

          return (
            <div key={row.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", opacity: isHeld ? 0.7 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: isHeld ? TONES.yellow.tint + "40" : "transparent" }}>
                <input type="checkbox" checked={checked} disabled={isHeld || isProc} onChange={() => toggleRow(row.id)}
                  style={{ width: 14, height: 14, cursor: isHeld || isProc ? "not-allowed" : "pointer", accentColor: "#111", flexShrink: 0 }} />

                {/* Creator */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar initials={row.creatorInitials} tone={row.creatorTone as any} size="sm" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{row.creatorName}</div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <PIco size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{row.campaign} · {row.milestone}</span>
                    </div>
                    <code style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>{row.invoiceRef}</code>
                  </div>
                </div>

                {/* Amount */}
                <div style={{ width: 80, fontWeight: 900, fontSize: 13 }}>${row.amount.toLocaleString()}</div>

                {/* Method */}
                <div style={{ width: 88 }}><Badge label={mMeta.label} tone={mMeta.tone} size="sm" /></div>

                {/* Due */}
                <div style={{ width: 60, fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)" }}>{row.dueDate}</div>

                {/* Status */}
                <div style={{ width: 70 }}>
                  {row.status === "pending"    && <Badge label="Pending"    tone="blue"   size="sm" dot />}
                  {row.status === "held"        && <Badge label="On hold"   tone="yellow" size="sm" dot />}
                  {row.status === "processing"  && <Badge label="Sent"      tone="green"  size="sm" dot />}
                  {row.status === "approved"    && <Badge label="Approved"  tone="green"  size="sm" dot />}
                </div>

                {/* Action */}
                <div style={{ width: 44, display: "flex", justifyContent: "flex-end", gap: 4 }}>
                  {isHeld && (
                    <button onClick={() => releaseRow(row.id)} title="Release hold"
                      style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconCheck size={11} style={{ color: TONES.green.text }} />
                    </button>
                  )}
                  {!isHeld && !isProc && (
                    <button onClick={() => holdRow(row.id)} title="Place on hold"
                      style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconLock size={11} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                    </button>
                  )}
                  <button onClick={() => setExpanded(isOpen ? null : row.id)}
                    style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isOpen ? <IconChevronUp size={11} /> : <IconChevronDown size={11} />}
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ padding: "8px 14px 12px 54px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
                  {row.holdReason && (
                    <div style={{ display: "flex", gap: 6, fontSize: 11, color: TONES.yellow.text, fontWeight: 600, marginBottom: 6 }}>
                      <IconAlertCircle size={12} style={{ flexShrink: 0, marginTop: 1 }} />{row.holdReason}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
                    Invoice ref: <strong>{row.invoiceRef}</strong> · Payment method: <strong>{mMeta.label}</strong> · Campaign: <strong>{row.campaign}</strong>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, padding: "10px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
          {selected.size > 0 ? `${selected.size} selected` : "Select payments to process"}
        </span>
        <span style={{ fontSize: 14, fontWeight: 900 }}>
          {selected.size > 0 ? `$${batchTotal.toLocaleString()} to process` : `$${totalPending.toLocaleString()} total pending`}
        </span>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "payment-batch-approver",
  title: "PaymentBatchApprover",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand batch payment approval — checkbox table of pending creator invoices with hold/release controls, select-all, and a dynamic 'Process N · $X' CTA.",
  description:
    "Lets brand finance teams review and batch-approve multiple creator payments in one action. Header: pending count, total $ pending, dynamic Process CTA (appears on selection). Success banner on submit. Checkbox table: select-all header row; 5 payment rows — creator avatar + campaign + milestone + invoice ref, amount, payment method badge (Bank/PayPal/Stripe in tone), due date, status badge (Pending/On hold/Sent). Per-row controls: hold lock icon (pending → held, removes from selection), release check (held → pending), expand chevron. Held rows dimmed with yellow background. Expand shows hold reason + invoice + method detail. Footer total: shows selected count + amount or total pending. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Payment batch approver",
      description: "Check creators, use 'Select all', or hold individual rows. Click the Process button to send the batch. Expand any row for detail.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
