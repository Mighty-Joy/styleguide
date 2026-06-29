"use client";

import React from "react";
import { IconPlus, IconDotsVertical, IconTrash, IconEdit, IconX } from "@tabler/icons-react";
import Button from "./Button";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "button",
  title: "Button",
  group: "Inputs & Controls",
  status: "stable",
  summary:
    "The canonical action: black primary, green brand CTA (landing page only), neutral/ghost/danger variants, two sizes, optional icons.",
  description:
    "Use `primary` (black) for the single main action on any product surface. `secondary` and `tertiary` for supporting actions. `danger` for destructive ones. Reserve `brand` (green) exclusively for landing page hero CTAs — it's the brand moment, not the everyday action.",
  source: "apps/web — restyle of the existing button",
  demos: [
    {
      title: "Variants",
      description: "Black is primary. Green (brand) is reserved for the landing page.",
      render: () => (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="danger">Danger</Button>
          <div style={{ width: 1, height: 32, background: "var(--sd-border-light)" }} />
          <Button variant="brand">Brand (landing only)</Button>
        </div>
      ),
    },
    {
      title: "Ghost icon button",
      description: "Round, borderless, shadowless — background becomes light gray on hover. Use for inline row actions, toolbar controls, and close buttons.",
      render: () => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button variant="ghost" iconOnly aria-label="Edit"><IconEdit size={16} /></Button>
          <Button variant="ghost" iconOnly aria-label="More"><IconDotsVertical size={16} /></Button>
          <Button variant="ghost" iconOnly aria-label="Close"><IconX size={16} /></Button>
          <Button variant="ghost" size="sm" iconOnly aria-label="More"><IconDotsVertical size={14} /></Button>
        </div>
      ),
    },
    {
      title: "Sizes",
      render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="sm">Small</Button>
        </div>
      ),
    },
    {
      title: "With icons",
      render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="primary" leftIcon={<IconPlus size={16} />}>
            New deal
          </Button>
          <Button variant="danger" leftIcon={<IconTrash size={16} />}>
            Remove
          </Button>
          <Button variant="secondary" iconOnly aria-label="More">
            <IconDotsVertical size={16} />
          </Button>
          <Button variant="secondary" size="sm" iconOnly aria-label="More">
            <IconDotsVertical size={14} />
          </Button>
        </div>
      ),
    },
    {
      title: "Disabled",
      render: () => (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
        </div>
      ),
    },
  ],
  props: [
    {
      title: "ButtonProps",
      rows: [
        { name: "variant", type: '"primary" | "brand" | "secondary" | "tertiary" | "danger" | "ghost"', default: '"secondary"', description: 'Visual emphasis / intent. "brand" (green) is landing page only. "ghost" is a round borderless icon button.' },
        { name: "size", type: '"md" | "sm"', default: '"md"', description: "Control height." },
        { name: "leftIcon", type: "ReactNode", description: "Icon before the label." },
        { name: "rightIcon", type: "ReactNode", description: "Icon after the label." },
        { name: "iconOnly", type: "boolean", default: "false", description: "Square icon-only button (pass the glyph as children)." },
        { name: "…rest", type: "button HTML attributes", description: "onClick, disabled, type, aria-* … forwarded to <button>." },
      ],
    },
  ],
};

export default doc;
