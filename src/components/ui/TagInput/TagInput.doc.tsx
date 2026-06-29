"use client";

import React from "react";
import { TagInput } from "./TagInput";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "tag-input",
  title: "TagInput",
  group: "Primitives",
  status: "stable",
  summary: "Multi-value text input — type and press Enter or comma to add tags, Backspace to remove the last one.",
  description:
    "Use TagInput for keywords, categories, skills, or any multi-value string list. Supports controlled and uncontrolled modes, a max tag limit, and the same label/hint/error scaffold as Input.",
  demos: [
    {
      title: "Default — empty",
      render: () => <TagInput placeholder="Add tags…" />,
    },
    {
      title: "Pre-populated",
      description: "Use `defaultValue` to seed tags on mount.",
      render: () => <TagInput defaultValue={["Lifestyle", "Beauty", "Fashion"]} />,
    },
    {
      title: "With label + hint",
      render: () => (
        <TagInput
          label="Content categories"
          hint="Press Enter or comma to add. Backspace removes the last tag."
          defaultValue={["Lifestyle"]}
        />
      ),
    },
    {
      title: "Error state",
      render: () => (
        <TagInput
          label="Required tags"
          error="At least one category is required."
        />
      ),
    },
    {
      title: "Disabled",
      render: () => (
        <TagInput
          label="Categories"
          defaultValue={["Beauty", "Skincare"]}
          disabled
        />
      ),
    },
    {
      title: "Max tags reached",
      description: "`maxTags={3}` — input disabled once limit is hit.",
      render: () => (
        <TagInput
          label="Top 3 niches"
          hint="Maximum 3 tags allowed."
          defaultValue={["Lifestyle", "Beauty", "Fashion"]}
          maxTags={3}
        />
      ),
    },
  ],
  props: [
    {
      title: "TagInputProps",
      rows: [
        { name: "value",        type: "string[]",           description: "Controlled tag list." },
        { name: "defaultValue", type: "string[]",           default: "[]",     description: "Initial tags for uncontrolled use." },
        { name: "onChange",     type: "(tags: string[]) => void", description: "Called whenever the tag list changes." },
        { name: "placeholder",  type: "string",             default: '"Add tags…"', description: "Input placeholder shown when empty." },
        { name: "maxTags",      type: "number",             description: "Maximum number of tags. Input is disabled once reached." },
        { name: "disabled",     type: "boolean",            default: "false",  description: "Disables all interaction." },
        { name: "label",        type: "string",             description: "Field label rendered above the input." },
        { name: "hint",         type: "string",             description: "Helper text below the input." },
        { name: "error",        type: "string | boolean",   description: "Error state — `true` for red border only, string to also show message." },
      ],
    },
  ],
};

export default doc;
