"use client";

import React from "react";
import {
  IconMoneybag,
  IconBuildingFactory2,
  IconMail,
  IconWorld,
  IconCircleDashedCheck,
  IconUser,
} from "@tabler/icons-react";
import FieldRow from "./FieldRow";
import {
  FieldTextEditor,
  FieldCurrencyEditor,
} from "@/components/Fields/editors/FieldEditors";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

function Panel({ children }: { children: React.ReactNode }) {
  return <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>;
}

function Tag({ tone, children }: { tone: keyof typeof TONES; children: React.ReactNode }) {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: 20,
        padding: "0 8px",
        borderRadius: "var(--sd-radius-pill)",
        background: t.tint,
        color: t.text,
        fontSize: "var(--sd-text-xs)",
        fontWeight: 500,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.solid }} />
      {children}
    </span>
  );
}

function RefChip({ name, tone }: { name: string; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 22,
        padding: "0 8px 0 4px",
        borderRadius: "var(--sd-radius-pill)",
        background: "var(--sd-bg-tertiary)",
        fontSize: "var(--sd-text-xs)",
        fontWeight: 500,
        color: "var(--sd-font-primary)",
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: t.solid,
          color: "#fff",
          fontSize: 9,
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {name[0]}
      </span>
      {name}
    </span>
  );
}

const doc: ComponentDoc = {
  slug: "field-row",
  title: "FieldRow",
  group: "Fields",
  status: "stable",
  summary:
    "One right-panel record field: a muted key (icon + label) and its value, with click-to-edit that opens in a shadowed overlay.",
  description:
    "Quiet at rest — the value reads as text. Clicking it (when an editor is supplied) opens the editor inside the elevated overlay (Twenty's open-state box: light border + drop shadow); Escape or click-outside closes. Empty fields show a muted placeholder. Values render by type: text, tag, reference, currency…",
  source: "Twenty record field (FieldDisplay + inline edit overlay)",
  demos: [
    {
      title: "Inline editing — text & currency",
      description:
        "Click a value to edit. Annual Revenue opens the currency editor (USD ⌄ + $ + amount) in the floating box, exactly like the right panel.",
      block: true,
      render: () => (
        <Panel>
          <FieldRow
            icon={<IconMoneybag size={16} />}
            label="Annual Revenue"
            placeholder="Annual Revenue"
            editor={(close) => (
              <FieldCurrencyEditor placeholder="Currency" onClose={close} />
            )}
          />
          <FieldRow
            icon={<IconBuildingFactory2 size={16} />}
            label="Industry"
            value="Consumer Goods"
            editor={(close) => (
              <FieldTextEditor defaultValue="Consumer Goods" onClose={close} />
            )}
          />
          <FieldRow
            icon={<IconWorld size={16} />}
            label="Website"
            placeholder="example.com"
            editor={(close) => (
              <FieldTextEditor placeholder="example.com" onClose={close} />
            )}
          />
        </Panel>
      ),
    },
    {
      title: "Value types",
      description:
        "How a value renders by type — text, tag, reference, and the empty placeholder. (Read-only here: no editor passed.)",
      block: true,
      render: () => (
        <Panel>
          <FieldRow icon={<IconMail size={16} />} label="Email" value="hi@acme.io" />
          <FieldRow
            icon={<IconCircleDashedCheck size={16} />}
            label="Status"
            value={<Tag tone="purple">Content ready</Tag>}
          />
          <FieldRow
            icon={<IconUser size={16} />}
            label="Owner"
            value={<RefChip name="Eric Dahan" tone="green" />}
          />
          <FieldRow icon={<IconMoneybag size={16} />} label="Annual Revenue" placeholder="Annual Revenue" />
        </Panel>
      ),
    },
  ],
  props: [
    {
      title: "FieldRowProps",
      rows: [
        { name: "label", type: "string", required: true, description: "Field key label (truncates)." },
        { name: "icon", type: "ReactNode", description: "Leading key glyph." },
        { name: "value", type: "ReactNode", description: "Display value; renders by whatever you pass (text, Tag, chip…)." },
        { name: "placeholder", type: "string", default: '"Empty"', description: "Muted text shown when value is empty." },
        { name: "editor", type: "(close) => ReactNode", description: "Inline editor; clicking the value opens it in the overlay. Omit for read-only." },
      ],
    },
  ],
};

export default doc;
