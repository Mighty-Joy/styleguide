"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconPhoto,
  IconVideo,
  IconMicrophone,
  IconBolt,
  IconGift,
  IconCurrencyDollar,
  IconHash,
} from "@tabler/icons-react";
import MultiSelect, { TagInput } from "./MultiSelect";
import type { ComponentDoc } from "@/catalog/types";

/* ---- Platform multi-select ---- */
function PlatformDemo() {
  const [v, setV] = useState<string[]>(["instagram", "tiktok"]);
  return (
    <MultiSelect
      label="Platforms"
      value={v} onChange={setV}
      placeholder="Select platforms…"
      searchable
      chipTone="blue"
      width={280}
      hint="Creator must post on all selected platforms."
      options={[
        { value: "instagram", label: "Instagram", icon: IconBrandInstagram },
        { value: "tiktok",    label: "TikTok",    icon: IconBrandTiktok },
        { value: "youtube",   label: "YouTube",   icon: IconBrandYoutube },
      ]}
    />
  );
}

/* ---- Content type multi-select with max ---- */
function ContentTypeDemo() {
  const [v, setV] = useState<string[]>([]);
  return (
    <MultiSelect
      label="Deliverable types"
      value={v} onChange={setV}
      placeholder="Add types…"
      maxItems={3}
      chipTone="purple"
      width={300}
      hint="Maximum 3 content types per deal."
      options={[
        { value: "reel",    label: "Reel",         icon: IconVideo,      description: "60s max video post" },
        { value: "story",   label: "Story",         icon: IconPhoto,      description: "24-hour disappearing" },
        { value: "ugc",     label: "UGC Video",     icon: IconMicrophone, description: "Raw file, no post required" },
        { value: "podcast", label: "Podcast spot",  icon: IconMicrophone, description: "Audio integration" },
      ]}
    />
  );
}

/* ---- Deal type multi-select ---- */
function DealTypeDemo() {
  const [v, setV] = useState<string[]>(["paid"]);
  return (
    <MultiSelect
      label="Deal types to show"
      value={v} onChange={setV}
      chipTone="green"
      width={260}
      options={[
        { value: "gifting",   label: "Gifting",     icon: IconGift },
        { value: "paid",      label: "Paid",        icon: IconCurrencyDollar },
        { value: "ugc",       label: "UGC",         icon: IconVideo },
        { value: "affiliate", label: "Affiliate",   icon: IconBolt },
      ]}
    />
  );
}

/* ---- Hashtag TagInput ---- */
function HashtagDemo() {
  const [tags, setTags] = useState<string[]>(["superdeal", "gifted", "ad"]);
  return (
    <TagInput
      label="Required hashtags"
      value={tags} onChange={setTags}
      placeholder="#hashtag and press Enter…"
      prefix="#"
      chipTone="purple"
      maxTags={10}
      width={340}
      hint="Creators must include these hashtags in their caption. Press Enter or comma to add."
    />
  );
}

/* ---- Mention TagInput ---- */
function MentionDemo() {
  const [tags, setTags] = useState<string[]>(["atlasxbrands"]);
  return (
    <TagInput
      label="Required mentions"
      value={tags} onChange={setTags}
      placeholder="@handle and press Enter…"
      prefix="@"
      chipTone="sky"
      maxTags={5}
      width={300}
      hint="Creator must tag these accounts in the post or video."
    />
  );
}

/* ---- States ---- */
function StatesDemo() {
  const [v1, setV1] = useState<string[]>(["instagram"]);
  const OPTS = [
    { value: "instagram", label: "Instagram", icon: IconBrandInstagram },
    { value: "tiktok",    label: "TikTok",    icon: IconBrandTiktok },
  ];
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <MultiSelect label="Normal"   value={v1} onChange={setV1} width={200} options={OPTS} />
      <MultiSelect label="Error"    value={[]}  onChange={() => {}} width={200} options={OPTS} error="At least one platform required." />
      <MultiSelect label="Disabled" value={v1} onChange={() => {}} width={200} options={OPTS} disabled />
    </div>
  );
}

/* ---- Doc ---- */
const doc: ComponentDoc = {
  slug: "multi-select",
  title: "MultiSelect & TagInput",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Multi-value select with chip display and free-form tag entry with prefix support.",
  description:
    "Two components: **MultiSelect** picks multiple values from a predefined options list — selected values appear as removable chips inside the trigger. Supports searchable dropdown, icons + descriptions per option, max item cap, and 'Clear all' footer. **TagInput** is a free-form tag entry field — type a tag and press Enter or comma to create it, Backspace to remove the last one. Supports prefix character (# for hashtags, @ for mentions), max tag count, and all standard label/hint/error states. Both display selected values as tinted chip pills with × remove buttons.",
  demos: [
    { title: "Platform multi-select",            render: () => <PlatformDemo /> },
    { title: "Content type (max 3)",             render: () => <ContentTypeDemo /> },
    { title: "Deal type filter",                 render: () => <DealTypeDemo /> },
    { title: "Hashtag entry (TagInput)",         description: "Type a hashtag and press Enter. Backspace removes the last tag.", render: () => <HashtagDemo /> },
    { title: "Mention entry (TagInput)",         render: () => <MentionDemo /> },
    { title: "States — normal · error · disabled", render: () => <StatesDemo /> },
  ],
  props: [
    {
      title: "MultiSelect",
      rows: [
        { name: "value",       type: "string[]",                       required: true,  description: "Array of selected option values." },
        { name: "onChange",    type: "(values: string[]) => void",     required: true,  description: "Called with the updated selection array." },
        { name: "options",     type: "MultiSelectOption[]",            required: true,  description: "Available options. Each has value, label, optional icon, description, disabled." },
        { name: "placeholder", type: "string",                         required: false, description: "Shown when no values are selected." },
        { name: "searchable",  type: "boolean",                        required: false, description: "Adds a search input at the top of the dropdown." },
        { name: "maxItems",    type: "number",                         required: false, description: "Maximum number of items that can be selected." },
        { name: "chipTone",    type: "keyof typeof TONES",             required: false, description: 'Color of the chip pills. Defaults to "blue".' },
        { name: "disabled",    type: "boolean",                        required: false, description: "Dims and prevents interaction." },
        { name: "label",       type: "string",                         required: false, description: "Label above the trigger." },
        { name: "error",       type: "string",                         required: false, description: "Error message below." },
        { name: "hint",        type: "string",                         required: false, description: "Hint text below. Hidden when error is set." },
        { name: "width",       type: "number | string",                required: false, description: 'CSS width. Defaults to "100%".' },
      ],
    },
    {
      title: "TagInput",
      rows: [
        { name: "value",       type: "string[]",                       required: true,  description: "Current tags array (without prefix)." },
        { name: "onChange",    type: "(tags: string[]) => void",       required: true,  description: "Called with updated tags array." },
        { name: "placeholder", type: "string",                         required: false, description: "Input placeholder text." },
        { name: "prefix",      type: "string",                         required: false, description: 'Character prepended to tags in display (e.g. "#" or "@").' },
        { name: "maxTags",     type: "number",                         required: false, description: "Maximum number of tags." },
        { name: "chipTone",    type: "keyof typeof TONES",             required: false, description: 'Tag chip color. Defaults to "blue".' },
        { name: "disabled",    type: "boolean",                        required: false, description: "Dims and prevents editing." },
        { name: "label",       type: "string",                         required: false, description: "Label above the input." },
        { name: "error",       type: "string",                         required: false, description: "Error message below." },
        { name: "hint",        type: "string",                         required: false, description: "Hint text below." },
        { name: "width",       type: "number | string",                required: false, description: 'CSS width. Defaults to "100%".' },
      ],
    },
  ],
};

export default doc;
