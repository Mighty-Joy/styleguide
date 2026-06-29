"use client";

import React from "react";
import { KeyValueList } from "./KeyValueList";
import {
  IconCalendar,
  IconMapPin,
  IconLink,
  IconMail,
  IconPhone,
  IconUser,
  IconCurrencyDollar,
  IconBrandInstagram,
  IconBuilding,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

const creatorItems = [
  { label: "Joined",    value: "March 2023" },
  { label: "Location",  value: "Los Angeles, CA", icon: IconMapPin },
  { label: "Website",   value: "priya.creates", icon: IconLink, href: "#", copyable: true },
  { label: "Email",     value: "priya@example.com", icon: IconMail, copyable: true },
  { label: "Phone",     value: "+1 (310) 555-0192", icon: IconPhone, copyable: true },
];

const dealItems = [
  { label: "Status",    value: "In Progress" },
  { label: "Value",     value: "$2,400", icon: IconCurrencyDollar },
  { label: "Start",     value: "Jul 15, 2026", icon: IconCalendar },
  { label: "End",       value: "Aug 30, 2026", icon: IconCalendar },
  { label: "Owner",     value: "Eric Dahan", icon: IconUser },
  { label: "Platform",  value: "Instagram", icon: IconBrandInstagram },
];

const richItems = [
  { label: "Status",   value: <span style={{ background: "#dcfce7", color: "#15803d", borderRadius: 9999, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>Active</span> },
  { label: "Owner",    value: <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 20, height: 20, borderRadius: "50%", background: "#4f46e5", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>ED</span>Eric Dahan</span> },
  { label: "Brand",    value: <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconBuilding size={13} style={{ color: "var(--sd-font-tertiary)" }} />Glow Beauty Co.</span> },
  { label: "Tags",     value: <span style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>{["Beauty","Lifestyle"].map(t => <span key={t} style={{ background: "var(--sd-bg-secondary)", borderRadius: 9999, padding: "1px 8px", fontSize: 11, fontWeight: 500 }}>{t}</span>)}</span> },
];

const doc: ComponentDoc = {
  slug: "key-value-list",
  title: "KeyValueList",
  group: "Core Components",
  status: "stable",
  summary: "Labeled property list — for creator info blocks, deal metadata, invoice details, and any structured key/value display.",
  description: "Three layout modes: `inline` (label left, value right — default), `stacked` (label above value, compact), and `grid` (2-column grid of pairs). Supports icons per row, copyable values, and arbitrary React nodes as values.",
  demos: [
    {
      title: "Inline — creator info",
      render: () => <div style={{ maxWidth: 400 }}><KeyValueList items={creatorItems} /></div>,
      block: true,
    },
    {
      title: "Grid — deal metadata",
      description: "2-column grid for property-heavy panels.",
      render: () => <div style={{ maxWidth: 500 }}><KeyValueList items={dealItems} layout="grid" /></div>,
      block: true,
    },
    {
      title: "With icons",
      render: () => (
        <div style={{ maxWidth: 360 }}>
          <KeyValueList items={creatorItems.filter(i => i.icon)} />
        </div>
      ),
      block: true,
    },
    {
      title: "Copyable values",
      description: "Hover a row to reveal the copy button.",
      render: () => (
        <div style={{ maxWidth: 400 }}>
          <KeyValueList items={[
            { label: "Email",   value: "priya@example.com",   copyable: true },
            { label: "Website", value: "priya.creates",        copyable: true, href: "#" },
          ]} />
        </div>
      ),
      block: true,
    },
    {
      title: "Stacked layout",
      description: "Compact vertical display — label above value.",
      render: () => (
        <div style={{ maxWidth: 400 }}>
          <KeyValueList items={dealItems.slice(0, 4)} layout="stacked" />
        </div>
      ),
      block: true,
    },
    {
      title: "Rich values",
      description: "Values can be any React node — Badges, Avatars, tag chips.",
      render: () => <div style={{ maxWidth: 420 }}><KeyValueList items={richItems} /></div>,
      block: true,
    },
  ],
  props: [
    {
      title: "KeyValueListProps",
      rows: [
        { name: "items",       type: "KeyValueItem[]",                required: true,  description: "Array of label/value pairs to display." },
        { name: "layout",      type: '"inline" | "stacked" | "grid"', required: false, default: '"inline"', description: "inline: label-left row. stacked: label-above compact. grid: 2-col grid." },
        { name: "labelWidth",  type: "number",                        required: false, default: "120",      description: "Label column width in px (inline layout only)." },
      ],
    },
    {
      title: "KeyValueItem",
      rows: [
        { name: "label",    type: "string",            required: true,  description: "Property name." },
        { name: "value",    type: "React.ReactNode",   required: true,  description: "Property value — string, number, or any React element." },
        { name: "icon",     type: "React.ElementType", required: false, description: "Tabler icon shown before the label." },
        { name: "copyable", type: "boolean",           required: false, description: "Shows a copy button on hover. Only works when value is a string." },
        { name: "href",     type: "string",            required: false, description: "Makes the value a link (opens in new tab)." },
      ],
    },
  ],
};

export default doc;
