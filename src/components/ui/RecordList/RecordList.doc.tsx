"use client";

import React, { useState } from "react";
import { IconArrowUpRight, IconDotsVertical } from "@tabler/icons-react";
import Button from "@/components/ui/Button/Button";
import RecordList from "./RecordList";
import CreatorCell from "@/components/Creator/CreatorCell";
import type { CreatorPlatform } from "@/components/Creator/CreatorIdentity";
import type { ComponentDoc } from "@/catalog/types";

interface Creator {
  id: string;
  name: string;
  handle: string;
  stage: string;
  followers: Partial<Record<CreatorPlatform, number>>;
}

const CREATORS: Creator[] = [
  { id: "1", name: "Maya Rivers", handle: "@mayarivers", stage: "Contracted", followers: { instagram: 128000, tiktok: 2300000 } },
  { id: "2", name: "Leo Park", handle: "@leopark", stage: "In review", followers: { youtube: 540000, instagram: 41000 } },
  { id: "3", name: "Nina Cole", handle: "@ninacole", stage: "Invited", followers: { tiktok: 86000 } },
];

const STAGE_COLOR: Record<string, string> = {
  Contracted: "var(--sd-accent-active)",
  "In review": "#b76a00",
  Invited: "var(--sd-font-tertiary)",
};

function StageTag({ stage }: { stage: string }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: STAGE_COLOR[stage] ?? "var(--sd-font-secondary)",
      }}
    >
      {stage}
    </span>
  );
}

const lead = (c: Creator) => (
  <CreatorCell name={c.name} handle={c.handle} followers={c.followers} />
);

const stageColumn = {
  key: "stage",
  header: "Stage",
  render: (c: Creator) => <StageTag stage={c.stage} />,
  collapseOnMobile: true,
};

const rowActions = () => (
  <>
    <Button variant="secondary" size="sm" iconOnly aria-label="Open">
      <IconArrowUpRight size={16} />
    </Button>
    <Button variant="secondary" size="sm" iconOnly aria-label="More">
      <IconDotsVertical size={16} />
    </Button>
  </>
);

function BasicDemo() {
  return (
    <RecordList<Creator>
      items={CREATORS}
      getId={(c) => c.id}
      leadHeader="Creator"
      lead={lead}
      columns={[stageColumn]}
      actions={rowActions}
      onRowClick={() => {}}
    />
  );
}

function SelectionDemo() {
  const [selected, setSelected] = useState<string[]>(["1"]);
  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return (
    <div style={{ width: "100%" }}>
      <RecordList<Creator>
        items={CREATORS}
        getId={(c) => c.id}
        leadHeader="Creator"
        lead={lead}
        columns={[stageColumn]}
        actions={rowActions}
        selection={{
          selectedIds: selected,
          onToggle: toggle,
          ariaLabel: (c) => `Select ${c.name}`,
        }}
      />
      <div style={{ marginTop: 12, fontSize: 13, color: "var(--sd-font-tertiary)" }}>
        {selected.length} selected
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "record-list",
  title: "RecordList",
  group: "Core Components",
  status: "stable",
  summary:
    "The canonical responsive list for record-with-actions views. Aligned columns on desktop (CSS subgrid), stacked cards on mobile.",
  description:
    "Generic over your row type. You supply render functions: `lead` (identity, grows), optional aligned `columns`, and a trailing `actions` cluster. Row clicks fire onRowClick except on inner controls. Resize the window below 640px to see rows collapse into cards.",
  source: "apps/web/src/components/ui/RecordList.tsx",
  demos: [
    {
      title: "Lead · columns · actions",
      description: "A creator roster: CreatorCell lead, a Stage column, row actions.",
      block: true,
      render: () => <BasicDemo />,
    },
    {
      title: "With selection",
      description: "Pass `selection` to get a leading checkbox column.",
      block: true,
      render: () => <SelectionDemo />,
    },
    {
      title: "Empty state",
      block: true,
      render: () => (
        <RecordList<Creator>
          items={[]}
          getId={(c) => c.id}
          lead={lead}
          emptyMessage="No creators in this campaign yet."
        />
      ),
    },
  ],
  props: [
    {
      title: "RecordListProps<T>",
      rows: [
        { name: "items", type: "T[]", required: true, description: "The rows to render." },
        { name: "getId", type: "(item: T) => string", required: true, description: "Stable id per row (keys + selection)." },
        { name: "lead", type: "(item: T) => ReactNode", required: true, description: "Primary identity cell — always visible, grows." },
        { name: "leadHeader", type: "ReactNode", description: "Header label over the lead column." },
        { name: "columns", type: "RecordColumn<T>[]", default: "[]", description: "Aligned cells after the lead." },
        { name: "actions", type: "(item: T) => ReactNode", description: "Trailing action cluster per row." },
        { name: "onRowClick", type: "(item: T) => void", description: "Fires on row click (skips inner controls)." },
        { name: "selection", type: "{ selectedIds; onToggle; ariaLabel? }", description: "Enables the leading checkbox column." },
        { name: "emptyMessage", type: "string", default: '"Nothing here yet."', description: "Shown when items is empty." },
      ],
    },
    {
      title: "RecordColumn<T>",
      rows: [
        { name: "key", type: "string", required: true, description: "Stable column key." },
        { name: "header", type: "ReactNode", description: "Column header label." },
        { name: "render", type: "(item: T) => ReactNode", required: true, description: "Cell renderer." },
        { name: "grow", type: "boolean", default: "false", description: "Take remaining width on desktop." },
        { name: "collapseOnMobile", type: "boolean", default: "false", description: "Hide in the stacked mobile layout." },
      ],
    },
  ],
};

export default doc;
