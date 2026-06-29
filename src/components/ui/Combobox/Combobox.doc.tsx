"use client";

import React, { useState } from "react";
import { IconSpeakerphone, IconUsers, IconPhoto } from "@tabler/icons-react";
import Combobox from "./Combobox";
import type { ComponentDoc } from "@/catalog/types";

const CAMPAIGNS = [
  { value: "atlas-x", label: "Atlas Summer X" },
  { value: "glow-q3", label: "Glow Beauty Q3" },
  { value: "back-school", label: "Back to School" },
  { value: "spring-launch", label: "Spring Product Launch" },
  { value: "holiday-24", label: "Holiday 2024" },
  { value: "collab-drop", label: "Collab Drop Series" },
  { value: "wellness-week", label: "Wellness Week" },
  { value: "influencer-day", label: "Global Creator Day" },
];

const CREATORS = [
  { value: "priya", label: "Priya Nair", description: "128K followers · 4.6% engagement", icon: IconUsers },
  { value: "marcus", label: "Marcus Webb", description: "84K followers · 6.2% engagement", icon: IconUsers },
  { value: "sofia", label: "Sofia Chen", description: "210K followers · 3.1% engagement", icon: IconUsers },
  { value: "james", label: "James Park", description: "67K followers · 5.8% engagement", icon: IconUsers },
  { value: "lena", label: "Lena Torres", description: "156K followers · 4.2% engagement", icon: IconUsers },
];

function ControlledDemo({ clearable = false }: { clearable?: boolean }) {
  const [val, setVal] = useState("");
  return (
    <Combobox
      options={CAMPAIGNS}
      value={val}
      onChange={setVal}
      placeholder="Search campaigns…"
      clearable={clearable}
      width={280}
    />
  );
}

function PreselectedDemo() {
  const [val, setVal] = useState("glow-q3");
  return (
    <Combobox
      options={CAMPAIGNS}
      value={val}
      onChange={setVal}
      placeholder="Search campaigns…"
      clearable
      width={280}
    />
  );
}

const doc: ComponentDoc = {
  slug: "combobox",
  title: "Combobox",
  group: "Primitives",
  status: "stable",
  summary: "Searchable dropdown — type to filter options, click to select. Extends Select with inline type-ahead.",
  description:
    "Use `Combobox` when the option list is long enough that filtering by typing is faster than scrolling. For short lists (≤ 8 options), prefer `Select`. For multi-selection, use `MultiSelect`.\n\nThe input field doubles as the search box — typing filters the dropdown in real time. Selecting an option replaces the query with the option label.",
  demos: [
    {
      title: "Basic",
      description: "8 campaign options, type to filter.",
      render: () => <ControlledDemo />,
    },
    {
      title: "With descriptions",
      description: "Options with subtitle text — creator name + follower stats.",
      render: () => {
        const [val, setVal] = useState("");
        return (
          <Combobox
            options={CREATORS}
            value={val}
            onChange={setVal}
            placeholder="Search creators…"
            width={300}
          />
        );
      },
    },
    {
      title: "Pre-selected value",
      description: "Opens with an existing selection — type to change it.",
      render: () => <PreselectedDemo />,
    },
    {
      title: "Clearable",
      description: "Shows an × icon when a value is selected. Click to clear.",
      render: () => <ControlledDemo clearable />,
    },
    {
      title: "With label, hint, and error",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Combobox
            options={CAMPAIGNS}
            value=""
            onChange={() => {}}
            label="Campaign"
            hint="Type to search all active campaigns"
            placeholder="Search campaigns…"
            width={280}
          />
          <Combobox
            options={CAMPAIGNS}
            value=""
            onChange={() => {}}
            label="Campaign"
            error="Please select a campaign"
            placeholder="Search campaigns…"
            width={280}
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      render: () => (
        <Combobox
          options={CAMPAIGNS}
          value="atlas-x"
          onChange={() => {}}
          disabled
          width={280}
        />
      ),
    },
  ],
  props: [
    {
      title: "ComboboxProps",
      rows: [
        { name: "options",       type: "ComboboxOption[]", required: true,  description: "The list of selectable options." },
        { name: "value",         type: "string",           required: false, description: "Controlled selected value." },
        { name: "onChange",      type: "(v: string) => void", required: false, description: "Called when an option is selected." },
        { name: "placeholder",   type: "string",           required: false, default: '"Search…"', description: "Shown when no value and input is empty." },
        { name: "label",         type: "string",           required: false, description: "Field label rendered above." },
        { name: "hint",          type: "string",           required: false, description: "Helper text below the field." },
        { name: "error",         type: "string",           required: false, description: "Error message — overrides hint, turns border red." },
        { name: "disabled",      type: "boolean",          required: false, default: "false", description: "Disables the field." },
        { name: "clearable",     type: "boolean",          required: false, default: "false", description: "Shows an × icon to clear the selection." },
        { name: "emptyMessage",  type: "string",           required: false, default: '"No results found"', description: "Shown when filter matches nothing." },
        { name: "width",         type: "number | string",  required: false, default: '"100%"', description: "Controls the trigger width." },
      ],
    },
    {
      title: "ComboboxOption",
      rows: [
        { name: "value",       type: "string",          required: true,  description: "Unique key." },
        { name: "label",       type: "string",          required: true,  description: "Display text." },
        { name: "description", type: "string",          required: false, description: "Secondary text shown below the label." },
        { name: "icon",        type: "React.ElementType", required: false, description: "Tabler icon shown left of the label." },
        { name: "disabled",    type: "boolean",         required: false, description: "Grays out the option and prevents selection." },
      ],
    },
  ],
};

export default doc;
