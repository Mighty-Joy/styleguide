"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { PlatformIcon } from "@/components/ui/PlatformIcon/PlatformIcon";
import {
  IconPackage,
  IconTruck,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconMapPin,
  IconCopy,
  IconPlus,
  IconFilter,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

type ShipStatus = "pending" | "shipped" | "in_transit" | "delivered" | "content_submitted";

const STATUS_META: Record<
  ShipStatus,
  {
    label: string;
    tone: "gray" | "blue" | "orange" | "green" | "turquoise";
    icon: React.ReactNode;
  }
> = {
  pending:           { label: "Pending",           tone: "gray",      icon: <IconClock size={12} /> },
  shipped:           { label: "Shipped",           tone: "blue",      icon: <IconPackage size={12} /> },
  in_transit:        { label: "In transit",        tone: "orange",    icon: <IconTruck size={12} /> },
  delivered:         { label: "Delivered",         tone: "green",     icon: <IconCheck size={12} /> },
  content_submitted: { label: "Content submitted", tone: "turquoise", icon: <IconCheck size={12} /> },
};

interface Shipment {
  id: string;
  creator: string;
  platform: "instagram" | "tiktok" | "youtube";
  followers: string;
  product: string;
  sku: string;
  address: string;
  trackingNumber?: string;
  carrier?: string;
  status: ShipStatus;
  shippedDate?: string;
  deliveredDate?: string;
  deal: string;
  dealValue: string;
}

const DATA: Shipment[] = [
  {
    id: "s1",
    creator: "Priya Nair",
    platform: "instagram",
    followers: "128k",
    product: "Atlas X Starter Kit",
    sku: "AX-KIT-001",
    address: "1420 Sunset Blvd, Los Angeles CA 90026",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    status: "content_submitted",
    shippedDate: "Aug 2",
    deliveredDate: "Aug 5",
    deal: "Atlas X",
    dealValue: "$15k",
  },
  {
    id: "s2",
    creator: "Diego Santos",
    platform: "tiktok",
    followers: "96k",
    product: "Atlas X Full Set",
    sku: "AX-FULL-002",
    address: "88 Main St, Brooklyn NY 11201",
    trackingNumber: "1Z999AA10123456785",
    carrier: "UPS",
    status: "delivered",
    shippedDate: "Aug 5",
    deliveredDate: "Aug 8",
    deal: "Atlas X",
    dealValue: "$11k",
  },
  {
    id: "s3",
    creator: "Marcus Webb",
    platform: "tiktok",
    followers: "210k",
    product: "Atlas X Starter Kit",
    sku: "AX-KIT-001",
    address: "542 Oak Ave, Chicago IL 60611",
    trackingNumber: "1Z999AA10123456786",
    carrier: "FedEx",
    status: "in_transit",
    shippedDate: "Aug 10",
    deal: "Atlas X",
    dealValue: "$22k",
  },
  {
    id: "s4",
    creator: "Hana Kim",
    platform: "instagram",
    followers: "340k",
    product: "Atlas X Pro Bundle",
    sku: "AX-PRO-003",
    address: "776 Peach St, Atlanta GA 30301",
    status: "shipped",
    trackingNumber: "9400111899223485936422",
    carrier: "USPS",
    shippedDate: "Aug 12",
    deal: "Atlas X",
    dealValue: "$18k",
  },
  {
    id: "s5",
    creator: "Liam Park",
    platform: "youtube",
    followers: "890k",
    product: "Atlas X Pro Bundle",
    sku: "AX-PRO-003",
    address: "200 Congress Ave, Austin TX 78701",
    status: "pending",
    deal: "Atlas X",
    dealValue: "$45k",
  },
  {
    id: "s6",
    creator: "Aisha Obi",
    platform: "instagram",
    followers: "210k",
    product: "Atlas X Starter Kit",
    sku: "AX-KIT-001",
    address: "1100 Brickell Ave, Miami FL 33131",
    status: "pending",
    deal: "Atlas X",
    dealValue: "$9k",
  },
];

const STAGE_ORDER: ShipStatus[] = [
  "pending",
  "shipped",
  "in_transit",
  "delivered",
  "content_submitted",
];

function ProgressDots({ status }: { status: ShipStatus }) {
  const idx = STAGE_ORDER.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {STAGE_ORDER.map((s, i) => (
        <React.Fragment key={s}>
          <div
            title={STATUS_META[s].label}
            style={{
              width: i === idx ? 20 : 8,
              height: 8,
              borderRadius: 99,
              background:
                i < idx
                  ? "var(--sd-green-solid, #22c55e)"
                  : i === idx
                  ? "var(--sd-blue-solid, #3b82f6)"
                  : "var(--sd-border-default, #e5e7eb)",
              transition: "all 0.2s",
            }}
          />
          {i < STAGE_ORDER.length - 1 && (
            <div style={{ width: 12, height: 1, background: i < idx ? "var(--sd-green-solid, #22c55e)" : "var(--sd-border-default, #e5e7eb)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ShipmentRow({ ship, selected, onSelect }: { ship: Shipment; selected: boolean; onSelect: () => void }) {
  const meta = STATUS_META[ship.status];

  return (
    <div
      onClick={onSelect}
      style={{
        display: "grid",
        gridTemplateColumns: "36px 2fr 1.5fr 1.5fr 1.5fr 1fr",
        alignItems: "center",
        gap: 0,
        padding: "11px 16px",
        background: selected ? "#f0f7ff" : "#fff",
        borderBottom: "1px solid var(--sd-border-default, #ebebeb)",
        cursor: "pointer",
        transition: "background 0.1s",
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        onClick={(e) => e.stopPropagation()}
        style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#36d080" }}
      />

      {/* Creator */}
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <Avatar name={ship.creator} size="sm" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary, #333)" }}>
            {ship.creator}
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
            <PlatformIcon platform={ship.platform} size={10} />
            {ship.followers} · {ship.dealValue}
          </div>
        </div>
      </div>

      {/* Product */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-primary, #333)" }}>
          {ship.product}
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", fontFamily: "monospace" }}>
          {ship.sku}
        </div>
      </div>

      {/* Address */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
        <IconMapPin size={11} color="var(--sd-font-tertiary, #999)" style={{ marginTop: 2, flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: "var(--sd-font-secondary, #666)", lineHeight: 1.4 }}>
          {ship.address.split(",").slice(-2).join(",").trim()}
        </span>
      </div>

      {/* Tracking */}
      <div>
        {ship.trackingNumber ? (
          <div
            style={{ display: "flex", alignItems: "center", gap: 4 }}
            onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(ship.trackingNumber!); }}
          >
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--sd-font-secondary, #666)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 120 }}>
              {ship.trackingNumber}
            </span>
            <IconCopy size={10} color="var(--sd-font-tertiary, #999)" style={{ cursor: "pointer", flexShrink: 0 }} />
          </div>
        ) : (
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Not shipped</span>
        )}
        {ship.carrier && (
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{ship.carrier}</div>
        )}
      </div>

      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Badge label={meta.label} tone={meta.tone} size="sm" />
      </div>
    </div>
  );
}

type FilterKey = "all" | ShipStatus;

function Demo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterKey>("all");

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === visible.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(visible.map((s) => s.id)));
    }
  }

  const visible = filter === "all" ? DATA : DATA.filter((s) => s.status === filter);
  const counts = Object.fromEntries(
    STAGE_ORDER.map((s) => [s, DATA.filter((d) => d.status === s).length])
  ) as Record<ShipStatus, number>;

  const pendingCount = selected.size;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--sd-font-primary, #333)" }}>
            Product Seeding
          </div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>
            {DATA.length} creators · Atlas X campaign
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {pendingCount > 0 && (
            <Button variant="primary" size="sm" leftIcon={<IconTruck size={13} />}>
              Ship {pendingCount} selected
            </Button>
          )}
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={13} />}>
            Add creator
          </Button>
        </div>
      </div>

      {/* Progress summary */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, background: "#f8f8f8", borderRadius: 10, overflow: "hidden", border: "1px solid var(--sd-border-default, #ebebeb)" }}>
        {STAGE_ORDER.map((s, i) => {
          const meta = STATUS_META[s];
          const count = counts[s];
          const active = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(active ? "all" : s)}
              style={{
                flex: 1,
                padding: "10px 0",
                border: "none",
                borderRight: i < STAGE_ORDER.length - 1 ? "1px solid var(--sd-border-default, #ebebeb)" : "none",
                background: active ? "#e0f2fe" : "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                transition: "background 0.1s",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary, #333)" }}>
                {count}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #ebebeb)", borderRadius: 10, overflow: "hidden" }}>
        {/* Column headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "36px 2fr 1.5fr 1.5fr 1.5fr 1fr",
            gap: 0,
            padding: "8px 16px",
            background: "#fafafa",
            borderBottom: "1px solid var(--sd-border-default, #ebebeb)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--sd-font-tertiary, #999)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          <input
            type="checkbox"
            checked={selected.size === visible.length && visible.length > 0}
            onChange={toggleAll}
            style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#36d080" }}
          />
          <span>Creator</span>
          <span>Product</span>
          <span>Ship to</span>
          <span>Tracking</span>
          <span>Status</span>
        </div>

        {visible.map((ship) => (
          <ShipmentRow
            key={ship.id}
            ship={ship}
            selected={selected.has(ship.id)}
            onSelect={() => toggle(ship.id)}
          />
        ))}

        {visible.length === 0 && (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--sd-font-tertiary, #999)", fontSize: 13 }}>
            No shipments match this filter.
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "product-seeding",
  title: "ProductSeeding",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Product seeding tracker — ship status per creator, tracking numbers, address column, and bulk ship action.",
  description:
    "Campaign view for managing physical product seeding across creators. Five-stage pipeline (Pending → Shipped → In transit → Delivered → Content submitted) with a summary bar that filters by stage. Bulk-select rows to trigger a 'Ship selected' action. Tracking number column is copy-on-click. Uses only Avatar, Badge, Button, and PlatformIcon primitives.",
  demos: [
    {
      title: "Atlas X seeding — 6 creators",
      description: "Click a stage in the summary bar to filter. Select rows and bulk-ship.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
