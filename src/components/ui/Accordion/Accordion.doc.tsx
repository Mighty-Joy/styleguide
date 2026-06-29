"use client";

import React, { useState } from "react";
import {
  IconChevronDown,
  IconFileText,
  IconShieldCheck,
  IconCurrencyDollar,
  IconBolt,
  IconPhoto,
  IconAlertTriangle,
  IconTrash,
} from "@tabler/icons-react";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Accordion types & component                                           */
/* ------------------------------------------------------------------ */

interface AccordionItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ElementType;
  content: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  variant?: "default" | "bordered" | "flush";
  size?: "sm" | "md";
}

function Accordion({ items, multiple = false, variant = "default", size = "md" }: AccordionProps) {
  const defaultOpen = new Set(items.filter(i => i.defaultOpen).map(i => i.id));
  const [open, setOpen] = useState<Set<string>>(defaultOpen);

  const toggle = (id: string) => {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const titleSize   = size === "sm" ? 12 : 13;
  const paddingV    = size === "sm" ? 10 : 13;
  const paddingH    = size === "sm" ? 12 : 14;
  const iconSize    = size === "sm" ? 13 : 15;

  const getWrapperStyle = (): React.CSSProperties => {
    if (variant === "bordered") return {
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)",
      overflow: "hidden",
    };
    if (variant === "flush") return {
      borderTop: "1px solid var(--sd-border-light)",
    };
    return {};
  };

  const getItemStyle = (idx: number, isOpen: boolean, isLast: boolean): React.CSSProperties => {
    if (variant === "bordered") return {
      borderBottom: isLast ? "none" : "1px solid var(--sd-border-light)",
    };
    if (variant === "flush") return {
      borderBottom: "1px solid var(--sd-border-light)",
    };
    // default: card-per-item
    return {
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)",
      marginBottom: isLast ? 0 : 6,
      overflow: "hidden",
      boxShadow: isOpen ? "0 0 0 2px var(--sd-accent-tint-2)" : "none",
      borderColor: isOpen ? "var(--sd-accent)" : "var(--sd-border-light)",
      transition: "border-color 0.15s, box-shadow 0.15s",
    };
  };

  return (
    <div style={getWrapperStyle()}>
      {items.map((item, idx) => {
        const isOpen = open.has(item.id);
        const isLast = idx === items.length - 1;
        const Icon = item.icon;

        return (
          <div key={item.id} style={getItemStyle(idx, isOpen, isLast)}>
            {/* Trigger */}
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: `${paddingV}px ${paddingH}px`,
                background: isOpen ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
                border: "none", cursor: item.disabled ? "not-allowed" : "pointer",
                fontFamily: "var(--sd-font-stack)", opacity: item.disabled ? 0.45 : 1,
                textAlign: "left", transition: "background 0.1s",
              }}
            >
              {Icon && (
                <Icon size={iconSize} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: titleSize, fontWeight: 600, color: "var(--sd-font-primary)" }}>
                  {item.title}
                </div>
                {item.description && (
                  <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2 }}>
                    {item.description}
                  </div>
                )}
              </div>
              <IconChevronDown
                size={14}
                style={{
                  color: "var(--sd-font-tertiary)", flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.18s ease",
                }}
              />
            </button>

            {/* Content */}
            {isOpen && (
              <div style={{
                padding: `0 ${paddingH}px ${paddingV}px ${paddingH}px`,
                background: "var(--sd-bg-primary)",
                borderTop: "1px solid var(--sd-border-light)",
                paddingTop: paddingV,
              }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo data                                                             */
/* ------------------------------------------------------------------ */

const BRIEF_SECTIONS: AccordionItem[] = [
  {
    id: "overview", title: "Campaign Overview", icon: IconFileText, defaultOpen: true,
    description: "Goals, timeline, and target audience",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div><span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary)", display: "block", marginBottom: 3 }}>Objective</span>
          <span style={{ fontSize: 13, color: "var(--sd-font-primary)" }}>Drive awareness and trial for Atlas X's new SPF 50 skincare line among Gen-Z women aged 18–26.</span></div>
        <div><span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary)", display: "block", marginBottom: 3 }}>Timeline</span>
          <span style={{ fontSize: 13, color: "var(--sd-font-primary)" }}>Content live: July 1–14, 2025</span></div>
      </div>
    ),
  },
  {
    id: "deliverables", title: "Deliverables", icon: IconPhoto,
    description: "1 Reel · 3 Stories · 1 UGC video",
    content: (
      <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 13, color: "var(--sd-font-primary)", lineHeight: 1.7 }}>
        <li>1 × Instagram Reel (30–45s) featuring product morning routine</li>
        <li>3 × Instagram Stories (link sticker on slide 3)</li>
        <li>1 × UGC unboxing video (raw file, no post required)</li>
      </ul>
    ),
  },
  {
    id: "compensation", title: "Compensation", icon: IconCurrencyDollar,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--sd-font-secondary)" }}>Instagram Reel</span>
          <span style={{ fontWeight: 700, color: "var(--sd-font-primary)" }}>$1,500</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--sd-font-secondary)" }}>Stories (3×)</span>
          <span style={{ fontWeight: 700, color: "var(--sd-font-primary)" }}>$900</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--sd-font-secondary)" }}>UGC Video</span>
          <span style={{ fontWeight: 700, color: "var(--sd-font-primary)" }}>$400</span>
        </div>
        <div style={{ height: 1, background: "var(--sd-border-light)", margin: "4px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 600, color: "var(--sd-font-primary)" }}>Total</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--sd-font-primary)" }}>$2,800</span>
        </div>
      </div>
    ),
  },
  {
    id: "requirements", title: "Content Requirements", icon: IconBolt,
    content: (
      <div style={{ fontSize: 13, color: "var(--sd-font-primary)", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 12 }}>Required hashtags</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["#atlasxskin", "#superdeal", "#ad"].map(h => (
              <span key={h} style={{ background: "var(--sd-bg-secondary)", padding: "2px 8px", borderRadius: "var(--sd-radius-pill)", fontSize: 11, fontWeight: 600 }}>{h}</span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 12 }}>Required mentions</div>
          <span style={{ fontSize: 12, color: "var(--sd-font-secondary)" }}>@atlasxofficial must be tagged in all posts</span>
        </div>
      </div>
    ),
  },
  {
    id: "legal", title: "Legal & Compliance", icon: IconShieldCheck,
    content: (
      <div style={{ fontSize: 12, color: "var(--sd-font-secondary)", lineHeight: 1.6 }}>
        Creator must disclose the paid partnership per FTC guidelines. All content is subject to brand approval 5 business days before posting. Brand retains the right to use content for 12 months in paid media.
      </div>
    ),
  },
];

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "q1", title: "What is a deal vs. a campaign?",
    content: <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-primary)", lineHeight: 1.6 }}>A <strong>campaign</strong> is the top-level project (e.g. "Atlas X Summer Launch"). A <strong>deal</strong> is a single creator relationship within that campaign — one deal per creator, tracking their offer, contract, deliverables, and payment.</p>,
  },
  {
    id: "q2", title: "How do I send an offer?",
    content: <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-primary)", lineHeight: 1.6 }}>Open the creator's deal card in the Kanban or Roster view, set the terms in the Offer tab, and click "Send offer." The creator receives an email with a link to review and accept or counter.</p>,
  },
  {
    id: "q3", title: "When does a creator get paid?",
    content: <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-primary)", lineHeight: 1.6 }}>Payment is triggered after all deliverables are approved and marked as posted. Finance processes payments weekly via bank transfer. Creators receive funds within 5–7 business days.</p>,
  },
  {
    id: "q4", title: "Can I add multiple creators to one deal?",
    content: <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-primary)", lineHeight: 1.6 }}>No — each deal is 1:1 with a creator. Add multiple creators via the Roster tab, then manage each relationship as a separate deal card on the campaign Kanban.</p>,
  },
];

const SETTINGS_ITEMS: AccordionItem[] = [
  {
    id: "notifications", title: "Notification preferences", defaultOpen: true,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["Creator accepted offer", "New message received", "Content submitted for review", "Contract signed", "Payment processed"].map(label => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "var(--sd-font-primary)" }}>{label}</span>
            <input type="checkbox" defaultChecked style={{ width: 14, height: 14, cursor: "pointer" }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "billing", title: "Billing & payment", disabled: true,
    description: "Managed by your account admin",
    content: <div />,
  },
  {
    id: "danger", title: "Danger zone", icon: IconAlertTriangle,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: "var(--sd-font-secondary)" }}>Deleting a campaign permanently removes all deals, creator data, and content history. This cannot be undone.</p>
        <Button variant="danger" size="sm" leftIcon={<IconTrash size={13} />} style={{ alignSelf: "flex-start" }}>
          Delete campaign
        </Button>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "accordion",
  title: "Accordion",
  group: "Core Components",
  status: "stable",
  summary: "Collapsible sections for brief details, FAQ content, and settings panels.",
  description:
    "Accordion renders an ordered list of collapsible panels. Each item has a trigger row (title, optional icon, optional description subtitle, chevron) and a content area that expands on click. Single-open mode (default) collapses any open panel before expanding the next; `multiple` allows any number open simultaneously. Three visual variants: `default` renders separate card-per-item with active border/glow; `bordered` wraps all items in one card with internal dividers; `flush` uses hairline dividers only (no card background). Two sizes: `sm` and `md`. Disabled state dims the trigger and prevents toggle. Used inside BriefCard (campaign brief sections), ContractCard (legal clauses), and settings panels.",
  demos: [
    {
      title: "Campaign brief sections (default, single-open)",
      description: "Click panels to expand. Only one can be open at a time. Try each section.",
      render: () => (
        <div style={{ maxWidth: 480 }}>
          <Accordion items={BRIEF_SECTIONS} />
        </div>
      ),
    },
    {
      title: "FAQ — bordered variant, multiple open",
      description: "Bordered wraps all items in one card with dividers. Multiple allows any number open simultaneously.",
      render: () => (
        <div style={{ maxWidth: 480 }}>
          <Accordion items={FAQ_ITEMS} variant="bordered" multiple />
        </div>
      ),
    },
    {
      title: "Settings panel — flush variant",
      description: "Flush uses only hairline dividers — no card chrome. Default notification pref panel open; billing disabled.",
      render: () => (
        <div style={{ maxWidth: 400 }}>
          <Accordion items={SETTINGS_ITEMS} variant="flush" />
        </div>
      ),
    },
    {
      title: "Small size",
      description: "sm size for dense contexts like sidebar sub-sections.",
      render: () => (
        <div style={{ maxWidth: 360 }}>
          <Accordion
            size="sm"
            variant="bordered"
            multiple
            items={FAQ_ITEMS.slice(0, 3).map(i => ({ ...i, defaultOpen: false }))}
          />
        </div>
      ),
    },
  ],
  props: [
    {
      title: "Accordion",
      rows: [
        { name: "items",    type: "AccordionItem[]",              required: true,  description: "Ordered list of panels." },
        { name: "multiple", type: "boolean",                      required: false, description: "Allow multiple panels open simultaneously. Default false (single-open)." },
        { name: "variant",  type: '"default" | "bordered" | "flush"', required: false, description: 'Visual style. Default: "default" (card per item).' },
        { name: "size",     type: '"sm" | "md"',                  required: false, description: 'Trigger padding and font size. Default: "md".' },
      ],
    },
    {
      title: "AccordionItem",
      rows: [
        { name: "id",          type: "string",          required: true,  description: "Unique key." },
        { name: "title",       type: "string",          required: true,  description: "Trigger label." },
        { name: "description", type: "string",          required: false, description: "Secondary subtitle in the trigger row." },
        { name: "icon",        type: "React.ElementType", required: false, description: "Leading icon in the trigger." },
        { name: "content",     type: "React.ReactNode", required: true,  description: "Expanded panel content." },
        { name: "defaultOpen", type: "boolean",         required: false, description: "Open on initial render." },
        { name: "disabled",    type: "boolean",         required: false, description: "Dims trigger and prevents toggle." },
      ],
    },
  ],
};

export default doc;
