"use client";

import React, { useState } from "react";
import { IconCheckbox, IconMessage } from "@tabler/icons-react";
import { Tabs } from "./Tabs";
import type { ComponentDoc } from "@/catalog/types";

const PANEL_TABS = [
  { label: "Info", value: "info" },
  { label: "Deals", value: "deals", badge: 3 },
  { label: "Tasks", value: "tasks", icon: <IconCheckbox size={14} />, badge: 2 },
  { label: "Messages", value: "messages", icon: <IconMessage size={14} />, badge: 5 },
];

const CHANNEL_TABS = [
  { label: "All", value: "all" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "Pitches", value: "pitches" },
];

function UnderlineDemo() {
  const [tab, setTab] = useState("deals");
  return (
    <div style={{ width: "100%", maxWidth: 440 }}>
      <Tabs tabs={PANEL_TABS} value={tab} onChange={setTab} />
    </div>
  );
}

function PillDemo() {
  const [tab, setTab] = useState("all");
  return <Tabs variant="pill" tabs={CHANNEL_TABS} value={tab} onChange={setTab} />;
}

const doc: ComponentDoc = {
  slug: "tabs",
  title: "Tabs",
  group: "Navigation",
  status: "stable",
  summary:
    "Two variants: underline for panel / page navigation, pill for filter rows and mode switching.",
  description:
    "**Underline** — the Creator Panel tab bar (Info · Deals · Tasks · Messages). Content below changes completely per tab. Supports icons and numeric badges.\n\n**Pill** — compact mutually exclusive selector: filter rows, channel selectors, period pickers (All · Email · SMS). Active item gets a solid black pill. Also replaces a segmented toggle for simple 2–4 option sets — one component handles both navigation and mode selection.",
  source: "apps/web — panel tabs + message channel filter",
  demos: [
    {
      title: "Underline — panel navigation",
      description:
        "The Creator Right Panel tab bar. Badges show pending counts. Supports optional leading icons.",
      render: () => <UnderlineDemo />,
    },
    {
      title: "Pill — filter / mode selector",
      description:
        "Channel selector for Messages. Same component handles period pickers (Week / Month / Year) and view toggles.",
      render: () => <PillDemo />,
    },
  ],
  props: [
    {
      title: "TabsProps",
      rows: [
        { name: "tabs", type: "{ label, value, icon?, badge? }[]", required: true, description: "Tab definitions in display order." },
        { name: "value", type: "string", required: true, description: "Currently active tab value." },
        { name: "onChange", type: "(value: string) => void", required: true, description: "Called on tab click." },
        { name: "variant", type: '"underline" | "pill"', default: '"underline"', description: "Panel nav (underline) vs filter/mode selector (pill)." },
      ],
    },
  ],
};

export default doc;
