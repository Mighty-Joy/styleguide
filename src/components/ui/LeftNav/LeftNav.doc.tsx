"use client";

import React, { useState } from "react";
import {
  IconHome,
  IconUsers,
  IconBriefcase,
  IconContract,
  IconCheckbox,
  IconMessage,
  IconSettings,
  IconSearch,
} from "@tabler/icons-react";
import { LeftNav } from "./LeftNav";
import type { ComponentDoc } from "@/catalog/types";

const MAIN_SECTIONS = [
  {
    items: [
      { label: "Home", value: "home", icon: <IconHome size={16} /> },
      { label: "Creators", value: "creators", icon: <IconUsers size={16} /> },
      { label: "Campaigns", value: "campaigns", icon: <IconBriefcase size={16} /> },
      { label: "Deals", value: "deals", icon: <IconContract size={16} /> },
      { label: "Tasks", value: "tasks", icon: <IconCheckbox size={16} />, badge: 4 },
      { label: "Messages", value: "messages", icon: <IconMessage size={16} />, badge: 12 },
    ],
  },
  {
    items: [
      { label: "Search", value: "search", icon: <IconSearch size={16} /> },
      { label: "Settings", value: "settings", icon: <IconSettings size={16} /> },
    ],
  },
];

function NavDemo() {
  const [active, setActive] = useState("creators");
  return (
    <div
      style={{
        height: 460,
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        overflow: "hidden",
        display: "inline-flex",
      }}
    >
      <LeftNav
        sections={MAIN_SECTIONS}
        value={active}
        onSelect={setActive}
        workspace="Superdeal"
        userName="Eric Dahan"
        userInitials="ED"
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "left-nav",
  title: "LeftNav",
  group: "Navigation",
  status: "stable",
  summary:
    "The application's persistent left sidebar — workspace identity, grouped nav items with badges, user footer.",
  description:
    "Sits in the app shell's left column. Items are grouped into sections (main nav, utilities). Active item gets a filled background. Unread badges use the accent tint. The workspace logo + name sit at the top; the signed-in user at the bottom.",
  source: "apps/web — left sidebar",
  demos: [
    {
      title: "App sidebar",
      description:
        "Click an item to change the active state. Tasks and Messages show unread badges.",
      block: true,
      render: () => <NavDemo />,
    },
  ],
  props: [
    {
      title: "LeftNavProps",
      rows: [
        { name: "sections", type: "{ items: NavItem[] }[]", required: true, description: "Groups of nav items separated by visual spacing." },
        { name: "value", type: "string", description: "The active item's value." },
        { name: "onSelect", type: "(value: string) => void", description: "Called on item click." },
        { name: "workspace", type: "string", default: '"Superdeal"', description: "Workspace name in the header." },
        { name: "userName", type: "string", description: "Displays a user footer row when provided." },
        { name: "userInitials", type: "string", description: "Avatar text. Defaults to first character of userName." },
      ],
    },
    {
      title: "NavItem",
      rows: [
        { name: "label", type: "string", required: true, description: "Item label." },
        { name: "value", type: "string", required: true, description: "Unique identifier." },
        { name: "icon", type: "ReactNode", required: true, description: "16px Tabler icon." },
        { name: "badge", type: "number", description: "Unread / pending count. Hidden when 0 or undefined." },
      ],
    },
  ],
};

export default doc;
