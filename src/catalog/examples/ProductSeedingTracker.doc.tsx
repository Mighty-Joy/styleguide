"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPackage,
  IconCheck,
  IconTruck,
  IconClock,
  IconAlertCircle,
  IconExternalLink,
  IconCopy,
  IconRefresh,
  IconPlus,
  IconMapPin,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type ShipStatus = "preparing" | "shipped" | "delivered" | "confirmed" | "issue";

interface Shipment {
  id: string;
  creator: { name: string; initials: string; tone: keyof typeof TONES; handle: string };
  address: string;
  carrier: string;
  tracking: string | null;
  status: ShipStatus;
  eta?: string;
  shippedDate?: string;
  confirmedDate?: string;
  note?: string;
}

/* ---- seed ---- */

const SHIPMENTS_SEED: Shipment[] = [
  {
    id: "s1",
    creator: { name: "Priya Nair",   initials: "PN", tone: "green",     handle: "@priya.creates" },
    address: "12 Oak Lane, Austin TX 78701",
    carrier: "FedEx", tracking: "7489203847",
    status: "confirmed", shippedDate: "Jun 25", confirmedDate: "Jun 28",
  },
  {
    id: "s2",
    creator: { name: "Diego Santos", initials: "DS", tone: "orange",    handle: "@diegosantos" },
    address: "500 Sunset Blvd, Los Angeles CA 90028",
    carrier: "UPS", tracking: "1Z9999W99999999999",
    status: "delivered", shippedDate: "Jun 26", eta: "Jun 28",
  },
  {
    id: "s3",
    creator: { name: "Hana Kim",     initials: "HK", tone: "pink",      handle: "@hanakim_" },
    address: "88 Maple Dr, New York NY 10001",
    carrier: "USPS", tracking: "9400111899000000000000",
    status: "shipped", shippedDate: "Jun 27", eta: "Jul 1",
  },
  {
    id: "s4",
    creator: { name: "Marcus Webb",  initials: "MW", tone: "purple",    handle: "@marcuswebb" },
    address: "Address not confirmed",
    carrier: "—", tracking: null,
    status: "preparing",
    note: "Waiting on shipping address — follow up sent Jun 28",
  },
  {
    id: "s5",
    creator: { name: "Aisha Obi",    initials: "AO", tone: "turquoise", handle: "@aishaobi" },
    address: "22 River Rd, Chicago IL 60601",
    carrier: "FedEx", tracking: "7489203901",
    status: "issue", shippedDate: "Jun 24", eta: "Jun 27",
    note: "Delivery attempt failed — recipient unavailable. Re-delivery scheduled Jul 1.",
  },
];

const STATUS_META: Record<ShipStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  preparing:  { label: "Preparing",  tone: "gray",   Icon: IconClock        },
  shipped:    { label: "Shipped",    tone: "blue",   Icon: IconTruck        },
  delivered:  { label: "Delivered",  tone: "yellow", Icon: IconPackage      },
  confirmed:  { label: "Confirmed",  tone: "green",  Icon: IconCheck        },
  issue:      { label: "Issue",      tone: "red",    Icon: IconAlertCircle  },
};

/* ---- Row ---- */

function ShipRow({ ship, onConfirm }: { ship: Shipment; onConfirm: (id: string) => void }) {
  const [copied, setCopied] = useState(false);
  const { label, tone, Icon } = STATUS_META[ship.status];

  function copyTracking() {
    if (!ship.tracking) return;
    navigator.clipboard.writeText(ship.tracking).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <tr style={{
      borderBottom: "1px solid var(--sd-border-default, #e5e7eb)",
      background: ship.status === "issue" ? TONES.red.tint : "transparent",
    }}>
      {/* Creator */}
      <td style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Avatar initials={ship.creator.initials} tone={ship.creator.tone} size="sm" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{ship.creator.name}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{ship.creator.handle}</div>
          </div>
        </div>
      </td>

      {/* Address */}
      <td style={{ padding: "10px 14px", maxWidth: 180 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
          <IconMapPin size={11} style={{ color: "var(--sd-font-tertiary, #999)", marginTop: 1, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.4 }}>{ship.address}</span>
        </div>
      </td>

      {/* Tracking */}
      <td style={{ padding: "10px 14px" }}>
        {ship.tracking ? (
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <code style={{ fontSize: 10, fontFamily: "monospace", color: "var(--sd-font-secondary, #555)", background: "var(--sd-bg-tertiary, #f1f1f1)", padding: "2px 5px", borderRadius: 4, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
              {ship.tracking}
            </code>
            <button onClick={copyTracking} title="Copy" style={{ background: "none", border: "none", cursor: "pointer", color: copied ? TONES.green.text : "var(--sd-font-tertiary, #999)", display: "flex" }}>
              {copied ? <IconCheck size={11} /> : <IconCopy size={11} />}
            </button>
            <button title="Track" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex" }}>
              <IconExternalLink size={11} />
            </button>
          </div>
        ) : (
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>—</span>
        )}
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>{ship.carrier}</div>
      </td>

      {/* ETA / dates */}
      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
        {ship.confirmedDate ? (
          <div style={{ fontSize: 11, color: TONES.green.text, fontWeight: 600 }}>Confirmed {ship.confirmedDate}</div>
        ) : ship.eta ? (
          <>
            <div style={{ fontSize: 11, fontWeight: 600 }}>ETA {ship.eta}</div>
            {ship.shippedDate && <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Shipped {ship.shippedDate}</div>}
          </>
        ) : ship.shippedDate ? (
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Shipped {ship.shippedDate}</div>
        ) : (
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>—</span>
        )}
      </td>

      {/* Status */}
      <td style={{ padding: "10px 14px" }}>
        <Badge label={label} tone={tone} size="sm" dot />
        {ship.note && (
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 3, maxWidth: 160 }}>{ship.note}</div>
        )}
      </td>

      {/* Action */}
      <td style={{ padding: "10px 14px" }}>
        {ship.status === "delivered" && (
          <Button variant="primary" size="sm" onClick={() => onConfirm(ship.id)}>
            Mark received
          </Button>
        )}
        {ship.status === "issue" && (
          <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={11} />}>
            Retry
          </Button>
        )}
        {ship.status === "preparing" && (
          <Button variant="secondary" size="sm" leftIcon={<IconTruck size={11} />}>
            Add tracking
          </Button>
        )}
      </td>
    </tr>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [shipments, setShipments] = useState(SHIPMENTS_SEED);

  function confirm(id: string) {
    setShipments((ss) => ss.map((s) => s.id === id ? { ...s, status: "confirmed" as ShipStatus, confirmedDate: "Jun 29" } : s));
  }

  const counts = {
    total:     shipments.length,
    confirmed: shipments.filter((s) => s.status === "confirmed").length,
    delivered: shipments.filter((s) => s.status === "delivered").length,
    shipped:   shipments.filter((s) => s.status === "shipped").length,
    issues:    shipments.filter((s) => s.status === "issue").length,
  };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Summary strip */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { label: "Confirmed receipt", value: counts.confirmed, tone: "green"  as const },
          { label: "Delivered",         value: counts.delivered, tone: "yellow" as const },
          { label: "In transit",        value: counts.shipped,   tone: "blue"   as const },
          { label: "Issues",            value: counts.issues,    tone: "red"    as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 99 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: TONES[tone].text }}>{value}</span>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{label}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <Button variant="primary" size="sm" leftIcon={<IconPlus size={12} />}>Add shipment</Button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginBottom: 4 }}>
          <span>Product receipt progress</span>
          <span>{counts.confirmed} / {counts.total} confirmed</span>
        </div>
        <div style={{ height: 6, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${(counts.confirmed / counts.total) * 100}%`, height: "100%", background: "#111", borderRadius: 3, transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              {["Creator", "Ship to", "Tracking", "Timeline", "Status", ""].map((h) => (
                <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <ShipRow key={s.id} ship={s} onConfirm={confirm} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "product-seeding-tracker",
  title: "ProductSeedingTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Per-creator shipment tracking — status summary strip, receipt progress bar, and a table with tracking numbers, ETAs, and action buttons.",
  description:
    "The logistics tracking surface for product seeding campaigns. Summary strip: confirmed / delivered / in-transit / issues counts with tone-matched pills. Progress bar: N of total confirmed. Table rows: avatar + creator, ship-to address, monospace tracking number with copy + external-link, ETA / shipped / confirmed dates, status badge with note, and a contextual action button (Mark received for delivered; Add tracking for preparing; Retry for issue). Issue rows get a red tint. Clicking Mark received promotes status to confirmed and updates the progress bar. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Product seeding tracker",
      description: "Click 'Mark received' on Diego's row to confirm receipt and watch the progress bar advance.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
