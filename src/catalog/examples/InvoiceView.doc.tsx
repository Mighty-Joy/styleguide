"use client";

import React, { useState } from "react";
import {
  IconDownload,
  IconShare,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Line items                                                            */
/* ------------------------------------------------------------------ */

const LINE_ITEMS = [
  { description: "Instagram Reels (×2)",   qty: 2, unit: 1200, total: 2400 },
  { description: "TikTok Video",            qty: 1, unit:  800, total:  800 },
  { description: "Usage Rights (90 days)", qty: 1, unit:  400, total:  400 },
  { description: "Platform fee (−10%)",    qty: null, unit: null, total: -360, isFee: true },
];

const GRAND_TOTAL = 3240;

/* ------------------------------------------------------------------ */
/* Paid / Pending variants                                               */
/* ------------------------------------------------------------------ */

function InvoiceDetail({ paid }: { paid: boolean }) {
  const [markedPaid, setMarkedPaid] = useState(paid);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--sd-font-primary)", letterSpacing: "-0.02em" }}>
            Invoice #INV-2024-0847
          </div>
          <div style={{ marginTop: 6 }}>
            {markedPaid
              ? <Badge label="Paid" tone="green" variant="status" dot />
              : <Badge label="Pending payment" tone="yellow" variant="status" dot />
            }
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={13} />}>Download PDF</Button>
          <Button variant="ghost" size="sm" iconOnly aria-label="Share"><IconShare size={14} /></Button>
        </div>
      </div>

      {/* From / To */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* From */}
        <div style={{ padding: 16, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-secondary)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>From</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Avatar name="Glow Beauty Co" shape="rounded" tone="blue" size="sm" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Glow Beauty Co.</span>
          </div>
          {["123 Brand Ave, Suite 400", "New York, NY 10001", "Tax ID: 12-3456789"].map(line => (
            <div key={line} style={{ fontSize: 12, color: "var(--sd-font-tertiary)", lineHeight: 1.6 }}>{line}</div>
          ))}
        </div>
        {/* To */}
        <div style={{ padding: 16, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-secondary)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>To</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Avatar name="Priya Nair" tone="purple" size="sm" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Priya Nair</div>
              <div style={{ fontSize: 12, color: "var(--sd-creator-handle)" }}>@priya.creates</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", lineHeight: 1.6 }}>priya@priyacreates.com</div>
        </div>
      </div>

      {/* Campaign context */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
        border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
      }}>
        <Avatar name="Atlas Summer X" shape="rounded" tone="blue" size="sm" />
        <span style={{ fontSize: 13, color: "var(--sd-font-secondary)" }}>
          <strong style={{ color: "var(--sd-font-primary)" }}>Atlas Summer X Campaign</strong> · Jul–Aug 2026
        </span>
      </div>

      {/* Line items */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
        {/* Table header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 64px 96px 96px",
          padding: "10px 16px", background: "var(--sd-bg-secondary)",
          borderBottom: "1px solid var(--sd-border-light)",
        }}>
          {["Description", "Qty", "Unit Price", "Total"].map((h, i) => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: i > 0 ? "right" : "left" }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {LINE_ITEMS.map(({ description, qty, unit, total, isFee }) => (
          <div
            key={description}
            style={{
              display: "grid", gridTemplateColumns: "1fr 64px 96px 96px",
              padding: "12px 16px",
              borderBottom: "1px solid var(--sd-border-light)",
              background: isFee ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
            }}
          >
            <span style={{ fontSize: 13, color: isFee ? "var(--sd-font-tertiary)" : "var(--sd-font-primary)", fontWeight: isFee ? 500 : 400 }}>{description}</span>
            <span style={{ fontSize: 13, color: "var(--sd-font-tertiary)", textAlign: "right" }}>{qty ?? "—"}</span>
            <span style={{ fontSize: 13, color: "var(--sd-font-tertiary)", textAlign: "right" }}>{unit ? `$${unit.toLocaleString()}` : "—"}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: isFee ? TONES.red.text : "var(--sd-font-primary)", textAlign: "right" }}>
              {total < 0 ? `−$${Math.abs(total).toLocaleString()}` : `$${total.toLocaleString()}`}
            </span>
          </div>
        ))}

        {/* Total row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 64px 96px 96px",
          padding: "14px 16px", background: "var(--sd-bg-secondary)",
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--sd-font-primary)", gridColumn: "1 / 4" }}>Total</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: "var(--sd-font-primary)", textAlign: "right" }}>
            ${GRAND_TOTAL.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Payment details */}
      {markedPaid && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
          border: `1px solid ${TONES.green.tint}`, borderRadius: "var(--sd-radius-md)",
          background: TONES.green.tint,
        }}>
          <IconCircleCheck size={16} style={{ color: TONES.green.text, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: TONES.green.text, fontWeight: 600 }}>
            Paid Jun 28, 2026 · Via bank transfer · Ref: TXN-8472991
          </span>
        </div>
      )}

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Payment timeline</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {[
            { label: "Invoice created", date: "Jun 20, 2026", done: true },
            { label: "Approved by brand", date: "Jun 24, 2026", done: true },
            { label: "Payment sent", date: markedPaid ? "Jun 28, 2026" : "Pending", done: markedPaid },
          ].map(({ label, date, done }, i, arr) => (
            <React.Fragment key={label}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: done ? "var(--sd-bg-inverted)" : "var(--sd-bg-tertiary)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {done
                    ? <IconCircleCheck size={14} style={{ color: "#fff" }} />
                    : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sd-border-main)" }} />
                  }
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: done ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)" }}>{label}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{date}</div>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ height: 2, flex: 2, marginBottom: 28, background: done ? "var(--sd-bg-inverted)" : "var(--sd-border-light)" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
        {markedPaid ? (
          <Button variant="ghost" size="sm" leftIcon={<IconAlertCircle size={13} />}>Dispute invoice</Button>
        ) : (
          <>
            <Button variant="primary" size="sm" leftIcon={<IconCircleCheck size={13} />} onClick={() => setMarkedPaid(true)}>
              Mark as paid
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<IconAlertCircle size={13} />}>Dispute</Button>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "invoice-view",
  title: "Invoice View",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Full invoice detail page with line items, from/to parties, payment status, timeline, and mark-as-paid action.",
  description: "Displays a single invoice between a brand and creator: from/to identity blocks, campaign context strip, a line-item table with totals, a payment details confirmation strip, a 3-step horizontal payment timeline, and action footer. Supports both Paid (with green confirmation) and Pending (with Mark as paid CTA) states.",
  demos: [
    {
      title: "Paid invoice",
      description: "Completed payment — shows green confirmation strip, full timeline, and dispute option.",
      block: true,
      plain: true,
      render: () => <InvoiceDetail paid={true} />,
    },
    {
      title: "Pending invoice",
      description: "Awaiting payment — shows Mark as paid CTA. Click to transition to paid state.",
      block: true,
      plain: true,
      render: () => <InvoiceDetail paid={false} />,
    },
  ],
};

export default doc;
