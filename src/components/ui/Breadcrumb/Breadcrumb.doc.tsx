"use client";

import React from "react";
import { IconHome, IconSpeakerphone, IconUsers, IconShieldLock } from "@tabler/icons-react";
import { Breadcrumb } from "./Breadcrumb";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "breadcrumb",
  title: "Breadcrumb",
  group: "Primitives",
  status: "stable",
  summary: "Navigation breadcrumb trail. Chevron or slash separator, optional icons per item, last item is bold current page.",
  demos: [
    {
      title: "Simple",
      render: () => (
        <Breadcrumb items={[
          { label: "Campaigns", href: "#" },
          { label: "Atlas Summer X" },
        ]} />
      ),
    },
    {
      title: "With icons",
      render: () => (
        <Breadcrumb items={[
          { label: "Home",      href: "#", icon: IconHome },
          { label: "Campaigns", href: "#", icon: IconSpeakerphone },
          { label: "Deal #847" },
        ]} />
      ),
    },
    {
      title: "Slash separator",
      render: () => (
        <Breadcrumb
          separator="slash"
          items={[
            { label: "Workspace", href: "#" },
            { label: "Settings",  href: "#" },
            { label: "Team" },
          ]}
        />
      ),
    },
    {
      title: "Chevron separator (default)",
      render: () => (
        <Breadcrumb
          separator="chevron"
          items={[
            { label: "Workspace", href: "#" },
            { label: "Settings",  href: "#" },
            { label: "Team" },
          ]}
        />
      ),
    },
    {
      title: "Deep — 4 levels",
      render: () => (
        <Breadcrumb items={[
          { label: "Workspace",   href: "#", icon: IconHome },
          { label: "Settings",    href: "#" },
          { label: "Team",        href: "#", icon: IconUsers },
          { label: "Permissions", icon: IconShieldLock },
        ]} />
      ),
    },
  ],
  props: [
    {
      title: "BreadcrumbProps",
      rows: [
        { name: "items",     type: "BreadcrumbItem[]",          required: true,  description: "Ordered list of crumbs. The last item is rendered as the current page (bold, no link)." },
        { name: "separator", type: '"slash" | "chevron"',        default: '"chevron"', description: "Separator between crumbs." },
      ],
    },
    {
      title: "BreadcrumbItem",
      rows: [
        { name: "label", type: "string",              required: true,  description: "Display text for this crumb." },
        { name: "href",  type: "string",                               description: "If provided, renders as an anchor link (non-final items only)." },
        { name: "icon",  type: "React.ElementType",                    description: "Optional Tabler icon rendered before the label." },
      ],
    },
  ],
};

export default doc;
