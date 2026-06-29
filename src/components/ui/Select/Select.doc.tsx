"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconGift,
  IconVideo,
  IconCurrencyDollar,
  IconCalendarEvent,
  IconLink,
} from "@tabler/icons-react";
import Select from "./Select";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Demos                                                                 */
/* ------------------------------------------------------------------ */

function BasicDemo() {
  const [v, setV] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
      <Select
        label="Platform"
        placeholder="Select platform"
        value={v}
        onChange={setV}
        width={200}
        options={[
          { value: "instagram", label: "Instagram", icon: IconBrandInstagram },
          { value: "tiktok",    label: "TikTok",    icon: IconBrandTiktok },
          { value: "youtube",   label: "YouTube",   icon: IconBrandYoutube },
        ]}
      />
      <Select
        label="Platform (clearable)"
        placeholder="Select platform"
        value={v}
        onChange={setV}
        width={200}
        clearable
        options={[
          { value: "instagram", label: "Instagram", icon: IconBrandInstagram },
          { value: "tiktok",    label: "TikTok",    icon: IconBrandTiktok },
          { value: "youtube",   label: "YouTube",   icon: IconBrandYoutube },
        ]}
      />
    </div>
  );
}

function DealTypeDemo() {
  const [v, setV] = useState<string | null>("gifting");
  return (
    <Select
      label="Deal type"
      value={v}
      onChange={setV}
      width={240}
      options={[
        { value: "gifting",   label: "Gifting",          icon: IconGift,          description: "Product in exchange for content" },
        { value: "ugc",       label: "UGC",              icon: IconVideo,         description: "Usage-rights content, no post required" },
        { value: "paid",      label: "Paid partnership", icon: IconCurrencyDollar, description: "Cash compensation for post" },
        { value: "event",     label: "Event",            icon: IconCalendarEvent, description: "Event attendance + content" },
        { value: "affiliate", label: "Affiliate",        icon: IconLink,          description: "Commission on tracked sales" },
      ]}
    />
  );
}

function SearchableGroupedDemo() {
  const [v, setV] = useState<string | null>(null);
  return (
    <Select
      label="Creator handle"
      placeholder="Search creators…"
      value={v}
      onChange={setV}
      searchable
      clearable
      width={280}
      groups={[
        {
          label: "Active in campaign",
          options: [
            { value: "priya",  label: "@priya_creates",    icon: IconBrandInstagram },
            { value: "sam",    label: "@sam.life",         icon: IconBrandTiktok },
            { value: "mara",   label: "@mara.aesthetic",   icon: IconBrandInstagram },
          ],
        },
        {
          label: "Other creators",
          options: [
            { value: "tomohiro", label: "@tomohiro_v",  icon: IconBrandYoutube },
            { value: "lena",     label: "@lena.vis",    icon: IconBrandInstagram },
          ],
        },
      ]}
    />
  );
}

function StatesDemo() {
  const [v1, setV1] = useState<string | null>("instagram");
  const [v2, setV2] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
      <Select label="Normal"   value={v1} onChange={setV1} width={160}
        options={[{ value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }]} />
      <Select label="Error"    value={v2} onChange={setV2} width={160} error="Please select a platform"
        options={[{ value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }]} />
      <Select label="Disabled" value={v1} onChange={setV1} width={160} disabled
        options={[{ value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }]} />
      <Select label="Hint"     value={v2} onChange={setV2} width={160} hint="The primary channel for the deal"
        options={[{ value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }]} />
    </div>
  );
}

function SizeDemo() {
  const [v, setV] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
      <Select label="Default (md)" value={v} onChange={setV} size="md" width={180}
        options={[{ value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }]} />
      <Select label="Small (sm)"  value={v} onChange={setV} size="sm" width={160}
        options={[{ value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" }]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "select",
  title: "Select",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Custom select with groups, search, icons, descriptions, and clearable support.",
  description:
    "Select replaces the native `<select>` with a fully styled dropdown that supports icons per option, multi-word descriptions, option groups, incremental search, a clearable × button, label + hint + error states, and two height sizes (sm/md). Options are passed as a flat array or as `groups` (array of `{ label, options }`). Supports keyboard focus and click-outside dismiss.",
  demos: [
    {
      title: "Basic + clearable",
      description: "Simple flat option list with and without a clear button.",
      render: () => <BasicDemo />,
    },
    {
      title: "With icons + descriptions",
      description: "Deal type selector — each option has an icon and a description line.",
      render: () => <DealTypeDemo />,
    },
    {
      title: "Searchable + grouped",
      description: "Creator picker with typeahead search and option groups. Type to filter.",
      render: () => <SearchableGroupedDemo />,
    },
    {
      title: "States",
      description: "Normal · error · disabled · hint.",
      render: () => <StatesDemo />,
    },
    {
      title: "Sizes",
      description: "md (36px) is the default; sm (30px) for dense forms and table inline-edits.",
      render: () => <SizeDemo />,
    },
  ],
  props: [
    {
      rows: [
        { name: "value",       type: "string | null",        required: true,  description: "Currently selected option value, or null for no selection." },
        { name: "onChange",    type: "(value: string) => void", required: true, description: "Called when the user picks an option." },
        { name: "options",     type: "SelectOption[]",        required: false, description: "Flat list of options. Mutually exclusive with `groups`." },
        { name: "groups",      type: "SelectGroup[]",         required: false, description: "Grouped options. Each group has `{ label, options }`. Mutually exclusive with `options`." },
        { name: "placeholder", type: "string",                required: false, description: 'Placeholder text when value is null. Defaults to "Select…".' },
        { name: "label",       type: "string",                required: false, description: "Field label rendered above the trigger." },
        { name: "error",       type: "string",                required: false, description: "Error message — renders below trigger in red." },
        { name: "hint",        type: "string",                required: false, description: "Hint text — renders below trigger in tertiary color. Hidden when error is set." },
        { name: "disabled",    type: "boolean",               required: false, description: "Renders the trigger greyed-out and non-interactive." },
        { name: "clearable",   type: "boolean",               required: false, description: "Shows an × inside the trigger when a value is selected." },
        { name: "searchable",  type: "boolean",               required: false, description: "Shows a search input at the top of the dropdown; auto-focuses on open." },
        { name: "size",        type: '"sm" | "md"',           required: false, description: "Trigger height. sm=30px, md=36px (default)." },
        { name: "width",       type: "number | string",       required: false, description: 'Passed as CSS width. Defaults to "100%".' },
      ],
    },
    {
      title: "SelectOption",
      rows: [
        { name: "value",       type: "string",                required: true,  description: "Unique identifier passed to onChange." },
        { name: "label",       type: "string",                required: true,  description: "Display text." },
        { name: "description", type: "string",                required: false, description: "Secondary line shown below label in the dropdown." },
        { name: "icon",        type: "React.ElementType",     required: false, description: "Tabler icon shown left of the label in the option row and in the trigger." },
        { name: "disabled",    type: "boolean",               required: false, description: "Greyed out and non-selectable." },
      ],
    },
  ],
};

export default doc;
