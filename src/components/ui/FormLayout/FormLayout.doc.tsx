"use client";

import React from "react";
import { FormLayout, FormSection } from "./FormLayout";
import { SectionCard } from "@/components/ui/SectionCard/SectionCard";
import type { ComponentDoc } from "@/catalog/types";

const InputMock = ({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) => (
  <input
    style={{ width: "100%", boxSizing: "border-box", padding: "7px 10px", border: "1px solid var(--sd-border-default)", borderRadius: "var(--sd-radius-sm)", fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", background: "var(--sd-bg-primary)" }}
    defaultValue={defaultValue}
    placeholder={placeholder}
  />
);

const TextareaMock = ({ placeholder }: { placeholder?: string }) => (
  <textarea
    rows={3}
    style={{ width: "100%", boxSizing: "border-box", padding: "7px 10px", border: "1px solid var(--sd-border-default)", borderRadius: "var(--sd-radius-sm)", fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", background: "var(--sd-bg-primary)", resize: "vertical", fontFamily: "inherit" }}
    placeholder={placeholder}
  />
);

const doc: ComponentDoc = {
  slug: "form-layout",
  title: "FormLayout",
  group: "Core Components",
  status: "stable",
  summary: "Two-column settings form layout — label + description on the left, field(s) on the right.",
  description: "FormLayout + FormSection provide the standard settings page structure used across all configuration surfaces in Superdeal. The left column carries the field name and a one-line explanation; the right column holds the actual inputs. At <640px viewports the layout collapses to a single column.",
  demos: [
    {
      title: "Basic",
      block: true,
      render: () => (
        <div style={{ maxWidth: 680 }}>
          <FormLayout>
            <FormSection title="Display name" description="Shown on your public profile and deal invites.">
              <InputMock defaultValue="Glow Beauty Co." />
            </FormSection>
            <FormSection title="Email address" description="Used for login and notifications.">
              <InputMock defaultValue="hello@glowbeauty.co" />
            </FormSection>
            <FormSection title="Bio" description="A short description of your brand (max 280 characters).">
              <TextareaMock placeholder="We create clean beauty products for everyday glow..." />
            </FormSection>
          </FormLayout>
        </div>
      ),
    },
    {
      title: "In a SectionCard",
      block: true,
      render: () => (
        <SectionCard
          title="Account settings"
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", border: "1px solid var(--sd-border-default)", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)", cursor: "pointer", color: "var(--sd-font-secondary)" }}>Cancel</button>
              <button style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", border: "none", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-inverted)", cursor: "pointer", color: "#fff" }}>Save changes</button>
            </div>
          }
          style={{ maxWidth: 680 } as React.CSSProperties}
        >
          <FormLayout>
            <FormSection title="Display name" description="Shown on your public profile.">
              <InputMock defaultValue="Priya Nair" />
            </FormSection>
            <FormSection title="Handle" description="Your @handle on Superdeal.">
              <InputMock defaultValue="@priya.creates" />
            </FormSection>
          </FormLayout>
        </SectionCard>
      ),
    },
    {
      title: "Required fields",
      block: true,
      render: () => (
        <div style={{ maxWidth: 680 }}>
          <FormLayout>
            <FormSection title="Campaign name" description="Shown to all invited creators." required>
              <InputMock placeholder="e.g. Atlas Summer X" />
            </FormSection>
            <FormSection title="Budget" description="Total campaign budget in USD." required>
              <InputMock placeholder="$10,000" />
            </FormSection>
            <FormSection title="Notes" description="Optional internal notes — not visible to creators.">
              <TextareaMock placeholder="Optional..." />
            </FormSection>
          </FormLayout>
        </div>
      ),
    },
    {
      title: "No dividers",
      block: true,
      render: () => (
        <div style={{ maxWidth: 680 }}>
          <FormLayout dividers={false}>
            <FormSection title="First name">
              <InputMock defaultValue="Eric" />
            </FormSection>
            <FormSection title="Last name">
              <InputMock defaultValue="Dahan" />
            </FormSection>
          </FormLayout>
        </div>
      ),
    },
  ],
  props: [
    {
      title: "FormLayoutProps",
      rows: [
        { name: "children",  type: "ReactNode", required: true, description: "One or more <FormSection> elements." },
        { name: "dividers",  type: "boolean",   default: "true", description: "Render a horizontal rule between sections." },
      ],
    },
    {
      title: "FormSectionProps",
      rows: [
        { name: "title",       type: "string",    required: true,  description: "Field label shown in the left column." },
        { name: "description", type: "string",    description: "Explanatory text shown below the title." },
        { name: "children",    type: "ReactNode", required: true,  description: "The field(s) rendered in the right column." },
        { name: "required",    type: "boolean",   default: "false", description: "Appends a red * to the title." },
      ],
    },
  ],
};

export default doc;
