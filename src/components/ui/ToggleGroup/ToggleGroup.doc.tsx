"use client";

import React, { useState } from "react";
import {
  IconLayoutGrid,
  IconLayoutList,
  IconChartBar,
} from "@tabler/icons-react";
import { ToggleGroup } from "./ToggleGroup";
import type { ComponentDoc } from "@/catalog/types";

function SegmentDemo() {
  const [period, setPeriod] = useState("month");
  return (
    <ToggleGroup
      value={period}
      onChange={setPeriod}
      options={[
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
        { label: "Quarter", value: "quarter" },
        { label: "Year", value: "year" },
      ]}
    />
  );
}

function ButtonDemo() {
  const [view, setView] = useState("grid");
  return (
    <ToggleGroup
      variant="button"
      value={view}
      onChange={setView}
      options={[
        { label: "Grid", value: "grid", icon: <IconLayoutGrid size={14} /> },
        { label: "List", value: "list", icon: <IconLayoutList size={14} /> },
        { label: "Chart", value: "chart", icon: <IconChartBar size={14} /> },
      ]}
    />
  );
}

function SmallDemo() {
  const [v, setV] = useState("active");
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <ToggleGroup
        size="sm"
        value={v}
        onChange={setV}
        options={[
          { label: "Active", value: "active" },
          { label: "Archived", value: "archived" },
        ]}
      />
      <ToggleGroup
        variant="button"
        size="sm"
        value={v}
        onChange={setV}
        options={[
          { label: "Active", value: "active" },
          { label: "Archived", value: "archived" },
        ]}
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "toggle-group",
  title: "ToggleGroup",
  group: "Navigation",
  status: "stable",
  summary:
    "Segmented control or button group for mutually exclusive selections — period pickers, view switchers, filter toggles.",
  description:
    "Two variants: `segment` (pill container, lifted active item — iOS-style) for period/mode pickers; `button` (bordered button row) for view switchers with icons. Both available in md and sm sizes.",
  source: "apps/web — period picker + view toggle",
  demos: [
    {
      title: "Segment (default)",
      description: "Use for time period selectors and mode pickers.",
      render: () => <SegmentDemo />,
    },
    {
      title: "Button group",
      description: "Use for view switchers — pairs well with icons.",
      render: () => <ButtonDemo />,
    },
    {
      title: "Small",
      description: "Both variants at sm size, for use in panel headers and toolbars.",
      render: () => <SmallDemo />,
    },
  ],
  props: [
    {
      title: "ToggleGroupProps",
      rows: [
        { name: "options", type: "{ label, value, icon? }[]", required: true, description: "The toggle options." },
        { name: "value", type: "string", required: true, description: "Currently selected value." },
        { name: "onChange", type: "(value: string) => void", required: true, description: "Called when selection changes." },
        { name: "variant", type: '"segment" | "button"', default: '"segment"', description: "Pill container vs bordered button row." },
        { name: "size", type: '"md" | "sm"', default: '"md"', description: "Control height." },
      ],
    },
  ],
};

export default doc;
