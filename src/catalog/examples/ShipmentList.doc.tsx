"use client";

import React, { useState } from "react";
import {
  IconPackage,
  IconTruck,
  IconCircleCheck,
  IconAlertTriangle,
  IconClock,
  IconDotsVertical,
  IconArrowRight,
  IconExternalLink,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import RecordList from "@/components/ui/RecordList/RecordList";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type ShipStatus = "preparing" | "shipped" | "in_transit" | "delivered" | "returned";
type Carrier = "USPS" | "UPS" | "FedEx" | "DHL";

interface Shipment {
  id: string;
  productName: string;
  productVariant?: string;
  creator: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  campaign: string;
  carrier: Carrier;
  trackingNumber: string;
  status: ShipStatus;
  sentDate: string;
  etaDate?: string;
  deliveredDate?: string;
  value?: string;
}

const STATUS_META: Record<ShipStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  preparing:  { label: "Preparing",  tone: "yellow", icon: IconClock },
  shipped:    { label: "Shipped",    tone: "blue",   icon: IconTruck },
  in_transit: { label: "In transit", tone: "sky",    icon: IconTruck },
  delivered:  { label: "Delivered",  tone: "green",  icon: IconCircleCheck },
  returned:   { label: "Returned",   tone: "red",    icon: IconAlertTriangle },
};

const SHIPMENTS: Shipment[] = [
  { id: "1", productName: "Atlas X Skincare Kit",   productVariant: "Starter set",   creator: "Priya Nair",  creatorInitials: "P", creatorTone: "purple", campaign: "Atlas X",    carrier: "USPS",  trackingNumber: "9261290100830166000163", status: "in_transit", sentDate: "Jun 24", etaDate: "Jul 2",  value: "$89"  },
  { id: "2", productName: "Summer Glow SPF Bundle", productVariant: "SPF 50 + Mist", creator: "Maya Rivers", creatorInitials: "M", creatorTone: "pink",   campaign: "Summer Glow",carrier: "UPS",   trackingNumber: "1Z999AA10123456784",    status: "delivered",  sentDate: "Jun 20", deliveredDate: "Jun 26", value: "$64"  },
  { id: "3", productName: "Spring Drop Capsule Box",                                  creator: "Leo Park",    creatorInitials: "L", creatorTone: "blue",   campaign: "Spring Drop",carrier: "FedEx", trackingNumber: "773985101726",          status: "delivered",  sentDate: "Jun 18", deliveredDate: "Jun 23", value: "$120" },
  { id: "4", productName: "Atlas X Serum Duo",      productVariant: "AM + PM serums",creator: "Nina Cole",   creatorInitials: "N", creatorTone: "green",  campaign: "Atlas X",    carrier: "DHL",   trackingNumber: "1234567890",            status: "shipped",    sentDate: "Jun 26", etaDate: "Jul 3",  value: "$76"  },
  { id: "5", productName: "Summer Glow Travel Kit",                                   creator: "Theo Vance",  creatorInitials: "T", creatorTone: "orange", campaign: "Summer Glow",carrier: "USPS",  trackingNumber: "9261290100830166009999", status: "preparing",  sentDate: "—",      etaDate: "Jul 5",  value: "$42"  },
  { id: "6", productName: "Spring Drop Tee",         productVariant: "M / Sage",      creator: "Maya Rivers", creatorInitials: "M", creatorTone: "pink",   campaign: "Spring Drop",carrier: "UPS",   trackingNumber: "1Z999AA10123456000",    status: "returned",   sentDate: "Jun 15", deliveredDate: "Jun 30", value: "$38"  },
];

/* ------------------------------------------------------------------ */
/* Cell helpers                                                          */
/* ------------------------------------------------------------------ */

function ProductLead({ item }: { item: Shipment }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", background: TONES[item.creatorTone].tint, display: "flex", alignItems: "center", justifyContent: "center", color: TONES[item.creatorTone].solid, flexShrink: 0 }}>
        <IconPackage size={18} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.productName}
        </div>
        {item.productVariant && (
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{item.productVariant}</div>
        )}
      </div>
    </div>
  );
}

function CreatorCell({ item }: { item: Shipment }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 24, padding: "0 6px 0 3px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
      <Avatar initials={item.creatorInitials} tone={item.creatorTone} size="sm" />
      {item.creator}
    </span>
  );
}

function CarrierChip({ carrier }: { carrier: Carrier }) {
  const bg:   Record<Carrier, string> = { USPS: "#004b87", UPS: "#351c15", FedEx: "#4d148c", DHL: "#FFCC00" };
  const text: Record<Carrier, string> = { USPS: "#fff",    UPS: "#fc0",    FedEx: "#ff6600", DHL: "#d40511" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 16, padding: "0 6px", borderRadius: 3, background: bg[carrier], color: text[carrier], fontSize: 9, fontWeight: 800, letterSpacing: "0.03em", flexShrink: 0 }}>
      {carrier}
    </span>
  );
}

function TrackingCell({ item }: { item: Shipment }) {
  const short = item.trackingNumber.length > 12 ? `${item.trackingNumber.slice(0, 12)}…` : item.trackingNumber;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <CarrierChip carrier={item.carrier} />
      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", fontFamily: "monospace" }}>{short}</span>
    </div>
  );
}

function TimelineCell({ item }: { item: Shipment }) {
  const meta = STATUS_META[item.status];
  const dateLabel =
    item.status === "delivered" ? `Delivered ${item.deliveredDate}` :
    item.status === "preparing" ? (item.etaDate ? `ETA ${item.etaDate}` : "Pending") :
    item.etaDate ? `ETA ${item.etaDate}` : "—";

  const dateColor =
    item.status === "delivered" ? TONES.green.text :
    item.status === "returned"  ? TONES.red.text :
    "var(--sd-font-secondary)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
      {item.sentDate !== "—" && (
        <>
          <span>Sent {item.sentDate}</span>
          <IconArrowRight size={10} style={{ color: "var(--sd-font-quaternary, var(--sd-font-tertiary))" }} />
        </>
      )}
      <span style={{ color: dateColor, fontWeight: item.status === "delivered" || item.status === "returned" ? 600 : 400 }}>
        {dateLabel}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Summary bar                                                           */
/* ------------------------------------------------------------------ */

function ShipmentSummary({ items }: { items: Shipment[] }) {
  const counts = items.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1;
    return acc;
  }, {} as Record<ShipStatus, number>);

  return (
    <div style={{ display: "flex", gap: 16, padding: "10px 14px", background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)", flexWrap: "wrap" }}>
      {(["preparing", "shipped", "in_transit", "delivered", "returned"] as ShipStatus[]).map((s) => {
        const meta = STATUS_META[s];
        const count = counts[s] ?? 0;
        if (count === 0) return null;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: TONES[meta.tone].solid }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--sd-font-tertiary)" }}>{meta.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-primary)" }}>{count}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

const STATUS_FILTERS: { label: string; value: ShipStatus | "all" }[] = [
  { label: "All",         value: "all" },
  { label: "Preparing",   value: "preparing" },
  { label: "Shipped",     value: "shipped" },
  { label: "In transit",  value: "in_transit" },
  { label: "Delivered",   value: "delivered" },
  { label: "Returned",    value: "returned" },
];

function ShipmentListDemo() {
  const [filter, setFilter] = useState<ShipStatus | "all">("all");
  const visible = filter === "all" ? SHIPMENTS : SHIPMENTS.filter((s) => s.status === filter);

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
      <ShipmentSummary items={SHIPMENTS} />

      {/* Status filter */}
      <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", flexWrap: "wrap" }}>
        {STATUS_FILTERS.map(({ label, value }) => (
          <Button
            key={value}
            variant={filter === value ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      <RecordList
        items={visible}
        getId={(s) => s.id}
        leadHeader="Product"
        lead={(s) => <ProductLead item={s} />}
        columns={[
          {
            key: "creator",
            header: "Creator",
            render: (s) => <CreatorCell item={s} />,
          },
          {
            key: "campaign",
            header: "Campaign",
            render: (s) => <Badge label={s.campaign} tone="blue" size="sm" />,
            collapseOnMobile: true,
          },
          {
            key: "status",
            header: "Status",
            render: (s) => {
              const meta = STATUS_META[s.status];
              return <Badge label={meta.label} tone={meta.tone} icon={meta.icon} />;
            },
          },
          {
            key: "tracking",
            header: "Carrier / Tracking",
            render: (s) => <TrackingCell item={s} />,
            collapseOnMobile: true,
          },
          {
            key: "timeline",
            header: "Timeline",
            grow: true,
            render: (s) => <TimelineCell item={s} />,
          },
          {
            key: "value",
            header: "Value",
            render: (s) => (
              <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
                {s.value ?? "—"}
              </span>
            ),
            collapseOnMobile: true,
          },
        ]}
        actions={(s) => (
          <div style={{ display: "flex", gap: 4 }}>
            {s.status !== "preparing" && (
              <Button variant="secondary" size="sm" leftIcon={<IconExternalLink size={12} />}>
                Track
              </Button>
            )}
            <Button variant="ghost" size="sm" iconOnly aria-label={`More options for ${s.productName}`}>
              <IconDotsVertical size={14} />
            </Button>
          </div>
        )}
        onRowClick={(s) => console.log("open shipment", s.id)}
        emptyMessage="No shipments match this filter."
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "shipment-list",
  title: "Shipments",
  group: "Record Views",
  status: "stable",
  summary: "Product shipment tracker — carrier badges, tracking number, color-coded status, sent → ETA timeline.",
  description:
    "Each row tracks product fulfillment from Preparing → Shipped → In Transit → Delivered. Columns: branded carrier chip (USPS/UPS/FedEx/DHL), truncated tracking number, status badge with tone color, and a Sent → ETA or Delivered date pair. A summary bar counts shipments by stage. Filter by status with the button strip. Built on `RecordList` for CSS-subgrid column alignment.",
  demos: [{ title: "Shipment list", description: "Filter by status. Delivered rows show the delivery date in green; Returned rows show red. Built on RecordList — columns align via CSS subgrid.", block: true, render: () => <ShipmentListDemo /> }],
  props: [],
};

export default doc;
