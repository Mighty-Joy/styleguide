"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconTrash,
  IconDownload,
  IconFileInvoice,
  IconCheck,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface LineItem {
  id: string;
  deliverable: string;
  platform: string;
  qty: number;
  rate: number;
}

const DELIVERABLE_OPTIONS = ["Reel","Feed post","Story (x5)","TikTok video","YouTube video","UGC package","Usage rights (30d)","Usage rights (1yr)"];
const PLATFORM_OPTIONS    = ["Instagram","TikTok","YouTube","Cross-platform"];
const PAYMENT_METHODS     = ["Bank transfer","Stripe","PayPal","Wise"];

const INIT_ITEMS: LineItem[] = [
  { id: "l1", deliverable: "Reel",             platform: "Instagram", qty: 2, rate: 950  },
  { id: "l2", deliverable: "Story (x5)",        platform: "Instagram", qty: 1, rate: 300  },
  { id: "l3", deliverable: "Usage rights (30d)", platform: "Cross-platform", qty: 1, rate: 400 },
];

const PLATFORM_FEE_PCT = 0.08;

function Demo() {
  const [items,     setItems]     = useState<LineItem[]>(INIT_ITEMS);
  const [dueDate,   setDueDate]   = useState("2026-07-25");
  const [method,    setMethod]    = useState("Bank transfer");
  const [terms,     setTerms]     = useState("Payment due within 14 days of invoice date. Late payments incur a 1.5% monthly fee.");
  const [generated, setGenerated] = useState(false);

  function updateItem<K extends keyof LineItem>(id: string, key: K, val: LineItem[K]) {
    setItems((p) => p.map((it) => it.id === id ? { ...it, [key]: val } : it));
    setGenerated(false);
  }
  function addItem() {
    setItems((p) => [...p, { id: `l${Date.now()}`, deliverable: "Reel", platform: "Instagram", qty: 1, rate: 900 }]);
    setGenerated(false);
  }
  function removeItem(id: string) {
    setItems((p) => p.filter((it) => it.id !== id));
    setGenerated(false);
  }

  const subtotal   = items.reduce((s, it) => s + it.qty * it.rate, 0);
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT);
  const net         = subtotal - platformFee;

  if (generated) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
        {/* Invoice preview */}
        <div style={{ border: "1.5px solid var(--sd-border-default,#e5e7eb)", borderRadius: 14, overflow: "hidden" }}>
          {/* Invoice header */}
          <div style={{ background: "#111", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>INVOICE</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>#INV-2026-0047</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Summer Glow Campaign</div>
              <div style={{ fontSize: 11, color: "#fff", fontWeight: 700, marginTop: 1 }}>Aura Labs</div>
            </div>
          </div>

          <div style={{ padding: "14px 18px" }}>
            {/* Creator + due date */}
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Creator</div>
                <div style={{ fontSize: 12, fontWeight: 800 }}>Priya Nair</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>priya@priya.co</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Due date</div>
                <div style={{ fontSize: 12, fontWeight: 800 }}>{new Date(dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{method}</div>
              </div>
            </div>

            {/* Line items */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                  {["Deliverable","Platform","Qty","Rate","Total"].map((h) => (
                    <th key={h} style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textAlign: h === "Qty" || h === "Rate" || h === "Total" ? "right" : "left", padding: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} style={{ borderBottom: "1px solid var(--sd-border-default,#f1f1f1)" }}>
                    <td style={{ fontSize: 11, padding: "7px 0", fontWeight: 600 }}>{it.deliverable}</td>
                    <td style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", padding: "7px 0" }}>{it.platform}</td>
                    <td style={{ fontSize: 11, textAlign: "right", padding: "7px 0" }}>{it.qty}</td>
                    <td style={{ fontSize: 11, textAlign: "right", padding: "7px 0" }}>${it.rate.toLocaleString()}</td>
                    <td style={{ fontSize: 11, fontWeight: 700, textAlign: "right", padding: "7px 0" }}>${(it.qty * it.rate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 9, padding: "10px 12px", marginBottom: 12 }}>
              {[
                { label: "Subtotal",         val: subtotal,    bold: false, color: "var(--sd-font-secondary,#555)" },
                { label: `Platform fee (${(PLATFORM_FEE_PCT*100).toFixed(0)}%)`, val: -platformFee, bold: false, color: TONES.red.text    },
                { label: "Net payout",        val: net,         bold: true,  color: "#111"                         },
              ].map(({ label, val, bold, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderTop: bold ? "1.5px solid var(--sd-border-default,#e5e7eb)" : "none", marginTop: bold ? 6 : 0, paddingTop: bold ? 9 : 3 }}>
                  <span style={{ fontSize: 11, fontWeight: bold ? 800 : 500, color }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: bold ? 900 : 600, color }}>{val < 0 ? `-$${Math.abs(val).toLocaleString()}` : `$${val.toLocaleString()}`}</span>
                </div>
              ))}
            </div>

            {/* Terms */}
            {terms && (
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", lineHeight: 1.5, marginBottom: 14 }}>{terms}</div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="primary" size="sm" leftIcon={<IconDownload size={11} />} style={{ flex: 1 }}>
                Download PDF
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setGenerated(false)} style={{ flex: 1 }}>
                Edit invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <IconFileInvoice size={14} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        <div style={{ flex: 1, fontSize: 13, fontWeight: 800 }}>Generate invoice</div>
        <Badge label="Priya Nair" tone="pink" />
      </div>

      {/* Line items */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Deliverables</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {items.map((it, idx) => (
            <div key={it.id} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#bbb)", width: 14, textAlign: "center" }}>{idx + 1}</span>
              <select value={it.deliverable} onChange={(e) => updateItem(it.id, "deliverable", e.target.value)}
                style={{ flex: 2, padding: "6px 7px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 10, fontFamily: "inherit" }}>
                {DELIVERABLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <select value={it.platform} onChange={(e) => updateItem(it.id, "platform", e.target.value)}
                style={{ flex: 1.5, padding: "6px 7px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 10, fontFamily: "inherit" }}>
                {PLATFORM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <input type="number" min={1} value={it.qty} onChange={(e) => updateItem(it.id, "qty", Math.max(1, Number(e.target.value)))}
                style={{ width: 36, padding: "6px 5px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 10, textAlign: "center", fontFamily: "inherit" }} />
              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, overflow: "hidden" }}>
                <span style={{ padding: "6px 5px 6px 7px", fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>$</span>
                <input type="number" min={0} value={it.rate} onChange={(e) => updateItem(it.id, "rate", Math.max(0, Number(e.target.value)))}
                  style={{ width: 52, padding: "6px 5px 6px 0", border: "none", outline: "none", fontSize: 10, fontFamily: "inherit" }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, width: 52, textAlign: "right", color: "#111" }}>${(it.qty * it.rate).toLocaleString()}</span>
              <button onClick={() => removeItem(it.id)} disabled={items.length <= 1}
                style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: items.length > 1 ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", opacity: items.length > 1 ? 1 : 0.3, flexShrink: 0 }}>
                <IconTrash size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addItem}
          style={{ marginTop: 8, display: "flex", gap: 5, alignItems: "center", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", background: "none", border: "1px dashed var(--sd-border-default,#e5e7eb)", borderRadius: 8, padding: "7px 12px", cursor: "pointer", width: "100%", justifyContent: "center" }}>
          <IconPlus size={11} /> Add line item
        </button>
      </div>

      {/* Totals strip */}
      <div style={{ background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Subtotal</span>
          <span style={{ fontSize: 10, fontWeight: 700 }}>${subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: TONES.red.text }}>Platform fee (8%)</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: TONES.red.text }}>−${platformFee.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1.5px solid var(--sd-border-default,#e5e7eb)", paddingTop: 7 }}>
          <span style={{ fontSize: 12, fontWeight: 800 }}>Net payout</span>
          <span style={{ fontSize: 14, fontWeight: 900 }}>${net.toLocaleString()}</span>
        </div>
      </div>

      {/* Due date + method */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Due date</div>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
            style={{ width: "100%", padding: "7px 9px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Payment method</div>
          <select value={method} onChange={(e) => setMethod(e.target.value)}
            style={{ width: "100%", padding: "7px 9px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit" }}>
            {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Terms */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Payment terms</div>
        <textarea value={terms} onChange={(e) => setTerms(e.target.value)} rows={2}
          style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, fontSize: 11, fontFamily: "inherit", resize: "none", outline: "none", boxSizing: "border-box" }} />
      </div>

      <Button variant="primary" size="sm" leftIcon={<IconFileInvoice size={11} />}
        onClick={() => setGenerated(true)} style={{ width: "100%" }}>
        Generate invoice
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-invoice-generator",
  title: "BrandInvoiceGenerator",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand generates a payment invoice for a creator — editable deliverable line items, live totals with 8% platform fee deduction, due date, payment method, terms, and a formatted invoice preview with Download PDF.",
  description:
    "Brand creates a structured payment invoice for a creator at end of campaign. Form view: header with creator name (Priya Nair badge). Deliverable table: per-row dropdowns for deliverable type + platform, qty input, $rate input, live subtotal; trash button (disabled when only 1 row); dashed 'Add line item' CTA. Totals strip: subtotal, platform fee −8% (red), net payout bold total. Due date picker + payment method dropdown. Payment terms textarea. 'Generate invoice' primary CTA. Invoice preview: dark #111 header band with 'INVOICE', reference number (#INV-2026-0047), campaign name + brand. Below: creator info + due date + payment method. Line item table (Deliverable/Platform/Qty/Rate/Total). Totals panel (gray bg) with same 3 rows. Terms text. Download PDF primary + Edit invoice secondary. Pre-seeded: 2 Reels ($950 each) + 1 Story pack ($300) + usage rights ($400) = $2,600 subtotal − $208 fee = $2,392 net. Due 2026-07-25, bank transfer. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Invoice builder",
      description: "Edit deliverables, qty, and rates — totals update live. Set the due date and payment method. Click 'Generate invoice' to see the formatted preview. Edit takes you back to the form.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
