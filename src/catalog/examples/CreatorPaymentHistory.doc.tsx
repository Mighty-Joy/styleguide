"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconDownload,
  IconExternalLink,
  IconClock,
  IconCheck,
  IconAlertCircle,
  IconX,
  IconChevronDown,
  IconFilter,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type PayStatus = "paid" | "pending" | "overdue" | "cancelled";

interface Payment {
  id: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  amount: number;
  description: string;
  campaign: string;
  status: PayStatus;
  method?: string;
  paidDate?: string;
}

interface Creator {
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  totalEarned: number;
  totalPending: number;
  nextPayDate?: string;
}

/* ---- seed data ---- */

const CREATOR: Creator = {
  name: "Priya Nair",
  initials: "PN",
  tone: "green",
  handle: "@priya.creates",
  totalEarned: 14_400,
  totalPending: 1_200,
  nextPayDate: "Jul 3, 2026",
};

const PAYMENTS: Payment[] = [
  { id: "p1",  invoiceNo: "INV-0041", date: "Jun 15, 2026", dueDate: "Jun 22, 2026", amount: 1_200, description: "Summer Glow · Reel delivery (50% milestone)", campaign: "Summer Glow", status: "paid",      method: "Bank transfer", paidDate: "Jun 17, 2026" },
  { id: "p2",  invoiceNo: "INV-0039", date: "Jun 1, 2026",  dueDate: "Jun 8, 2026",  amount: 1_200, description: "Summer Glow · Contract signing (50% upfront)", campaign: "Summer Glow", status: "paid",      method: "Bank transfer", paidDate: "Jun 3, 2026"  },
  { id: "p3",  invoiceNo: "INV-0044", date: "Jun 28, 2026", dueDate: "Jul 5, 2026",  amount: 1_200, description: "Summer Glow · Story set approval (50% milestone)", campaign: "Summer Glow", status: "pending",   method: undefined,        paidDate: undefined      },
  { id: "p4",  invoiceNo: "INV-0036", date: "Apr 10, 2026", dueDate: "Apr 17, 2026", amount: 4_800, description: "Spring Refresh · Full campaign fee", campaign: "Spring Refresh",    status: "paid",      method: "Bank transfer", paidDate: "Apr 12, 2026" },
  { id: "p5",  invoiceNo: "INV-0031", date: "Feb 22, 2026", dueDate: "Mar 1, 2026",  amount: 3_200, description: "Winter Glow · Campaign completion", campaign: "Winter Glow",       status: "paid",      method: "Bank transfer", paidDate: "Feb 25, 2026" },
  { id: "p6",  invoiceNo: "INV-0029", date: "Feb 5, 2026",  dueDate: "Feb 12, 2026", amount: 600,   description: "Winter Glow · Kill fee (campaign cancelled)", campaign: "Winter Glow",       status: "paid",      method: "Bank transfer", paidDate: "Feb 8, 2026"  },
  { id: "p7",  invoiceNo: "INV-0043", date: "Jun 20, 2026", dueDate: "Jun 27, 2026", amount: 200,   description: "Rush revision surcharge", campaign: "Summer Glow", status: "overdue",   method: undefined,        paidDate: undefined      },
  { id: "p8",  invoiceNo: "INV-0022", date: "Nov 30, 2025", dueDate: "Dec 7, 2025",  amount: 2_000, description: "Brand Lift Study · Usage rights extension",  campaign: "Brand Lift", status: "cancelled", method: undefined,        paidDate: undefined      },
];

const STATUS_META: Record<PayStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  paid:      { label: "Paid",      tone: "green",  Icon: IconCheck        },
  pending:   { label: "Pending",   tone: "yellow", Icon: IconClock        },
  overdue:   { label: "Overdue",   tone: "red",    Icon: IconAlertCircle  },
  cancelled: { label: "Cancelled", tone: "gray",   Icon: IconX            },
};

function fmt(n: number) {
  return `$${n.toLocaleString()}`;
}

/* ---- Demo ---- */

function Demo() {
  const [filter, setFilter] = useState<PayStatus | "all">("all");

  const visible = PAYMENTS.filter((p) => filter === "all" || p.status === filter);

  const overdue = PAYMENTS.filter((p) => p.status === "overdue").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Creator header card */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 18 }}>
        <Avatar initials={CREATOR.initials} tone={CREATOR.tone} size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>{CREATOR.name}</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>{CREATOR.handle}</div>
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Total earned",   value: fmt(CREATOR.totalEarned),  color: "var(--sd-font-primary, #111)" },
            { label: "Pending",        value: fmt(CREATOR.totalPending),  color: TONES.yellow.text },
            { label: "Next payment",   value: CREATOR.nextPayDate ?? "—", color: "var(--sd-font-primary, #111)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color }}>{value}</div>
            </div>
          ))}
        </div>

        {overdue > 0 && (
          <Badge label={`${overdue} overdue`} tone="red" dot />
        )}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "paid", "pending", "overdue", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                height: 28, padding: "0 10px", borderRadius: 99,
                border: "1px solid",
                borderColor: filter === f ? "#333" : "var(--sd-border-default, #e5e7eb)",
                background: filter === f ? "#333" : "transparent",
                color: filter === f ? "#fff" : "var(--sd-font-secondary, #666)",
                fontSize: 11, fontWeight: 500, cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? `All (${PAYMENTS.length})` : f}
            </button>
          ))}
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              {["Invoice", "Date", "Description", "Campaign", "Amount", "Status", ""].map((h) => (
                <th key={h} style={{ padding: "8px 14px", textAlign: h === "Amount" ? "right" : "left", fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary, #999)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((p, i) => {
              const { Icon, tone, label } = STATUS_META[p.status];
              return (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: i < visible.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none",
                    background: p.status === "overdue" ? `${TONES.red.tint}` : "transparent",
                  }}
                >
                  {/* Invoice # */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-secondary, #555)", background: "var(--sd-bg-tertiary, #f1f1f1)", padding: "2px 6px", borderRadius: 4 }}>
                      {p.invoiceNo}
                    </code>
                  </td>

                  {/* Date */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <div style={{ fontSize: 11, color: "var(--sd-font-primary, #111)", fontWeight: 500 }}>{p.date}</div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>
                      {p.status === "paid" && p.paidDate ? `Paid ${p.paidDate}` : `Due ${p.dueDate}`}
                    </div>
                  </td>

                  {/* Description */}
                  <td style={{ padding: "10px 14px", maxWidth: 220 }}>
                    <div style={{ fontSize: 12, color: "var(--sd-font-primary, #111)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.description}
                    </div>
                    {p.method && (
                      <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 1 }}>{p.method}</div>
                    )}
                  </td>

                  {/* Campaign */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>{p.campaign}</span>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{
                      fontSize: 13, fontWeight: 700,
                      color: p.status === "cancelled" ? "var(--sd-font-tertiary, #999)"
                        : p.status === "overdue"   ? TONES.red.text
                        : "var(--sd-font-primary, #111)",
                      textDecoration: p.status === "cancelled" ? "line-through" : "none",
                    }}>
                      {fmt(p.amount)}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: "10px 14px" }}>
                    <Badge label={label} tone={tone} size="sm" />
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button title="Download invoice" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 3 }}>
                        <IconDownload size={13} />
                      </button>
                      <button title="View details" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 3 }}>
                        <IconExternalLink size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Footer totals */}
          <tfoot>
            <tr style={{ borderTop: "2px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
              <td colSpan={4} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {filter === "all" ? `All · ${PAYMENTS.length} invoices` : `${filter} · ${visible.length} invoices`}
              </td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 13, fontWeight: 800, color: "var(--sd-font-primary, #111)" }}>
                {fmt(visible.filter((p) => p.status !== "cancelled").reduce((s, p) => s + p.amount, 0))}
              </td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-payment-history",
  title: "CreatorPaymentHistory",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Per-creator invoice and payment log — total earned/pending header, status filter pills, and sortable invoice table with download actions.",
  description:
    "The financial history view scoped to a single creator. Header card: avatar, name, total earned, pending amount, next payment date, overdue alert badge. Filter pills: All / Paid / Pending / Overdue / Cancelled. Table: invoice number (monospace), date + paid/due sub-line, description + payment method, campaign, amount (struck through if cancelled, red if overdue), status badge, download + view actions. Footer sums visible invoices. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator payment history",
      description: "Use the filter pills to narrow by status. Download and external-link icons are available per row.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
