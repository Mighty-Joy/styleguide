"use client";

import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "@/components/ui/Button/Button";
import {
  IconDotsVertical,
  IconMessageCircle,
  IconExternalLink,
  IconBolt,
  IconUsers,
  IconPencil,
  IconCopy,
  IconTrash,
  IconDownload,
  IconShare,
  IconArchive,
  IconFlag,
  IconChevronDown,
  IconCircleCheck,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Demo 1: Creator row ⋯ menu                                           */
/* ------------------------------------------------------------------ */

function CreatorMoreMenu() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Dropdown
        trigger={
          <Button variant="tertiary" size="sm" iconOnly aria-label="More actions">
            <IconDotsVertical size={15} />
          </Button>
        }
        sections={[
          [
            { key: "message",  label: "Send message",    icon: IconMessageCircle, onClick: () => setLast("Send message") },
            { key: "profile",  label: "View profile",    icon: IconExternalLink,  onClick: () => setLast("View profile") },
            { key: "deal",     label: "Create deal",     icon: IconBolt,          onClick: () => setLast("Create deal") },
          ],
          [
            { key: "copy",     label: "Copy email",      icon: IconCopy,          onClick: () => setLast("Copy email") },
            { key: "export",   label: "Export data",     icon: IconDownload,      onClick: () => setLast("Export data") },
          ],
          [
            { key: "remove",   label: "Remove from campaign", icon: IconTrash, destructive: true, onClick: () => setLast("Remove from campaign") },
          ],
        ]}
      />
      {last && <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>Last: <strong style={{ color: "var(--sd-font-primary)" }}>{last}</strong></span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 2: Campaign status switcher                                      */
/* ------------------------------------------------------------------ */

type CampaignStatus = "active" | "paused" | "completed" | "archived";
const STATUS_LABELS: Record<CampaignStatus, string> = {
  active: "Active", paused: "Paused", completed: "Completed", archived: "Archived",
};

function StatusSwitcher() {
  const [status, setStatus] = useState<CampaignStatus>("active");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 13, color: "var(--sd-font-tertiary)" }}>Campaign status:</span>
      <Dropdown
        align="start"
        trigger={
          <Button variant="secondary" size="sm" rightIcon={<IconChevronDown size={13} />}>
            {STATUS_LABELS[status]}
          </Button>
        }
        sections={[
          (["active", "paused", "completed", "archived"] as CampaignStatus[]).map(s => ({
            key: s,
            label: STATUS_LABELS[s],
            icon: s === status ? IconCircleCheck : undefined,
            onClick: () => setStatus(s),
          })),
        ]}
        width={160}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 3: Content card actions menu                                     */
/* ------------------------------------------------------------------ */

function ContentCardMenu() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 160, height: 96, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "linear-gradient(135deg,#8b5cf6,#c084fc)", position: "relative", display: "flex", alignItems: "flex-end", padding: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Morning Reel</span>
        <div style={{ position: "absolute", top: 6, right: 6 }}>
          <Dropdown
            side="bottom"
            align="end"
            trigger={
              <Button variant="tertiary" size="sm" iconOnly aria-label="Content actions" style={{ background: "rgba(0,0,0,0.35)", color: "#fff", backdropFilter: "blur(4px)" }}>
                <IconDotsVertical size={13} />
              </Button>
            }
            sections={[
              [
                { key: "approve", label: "Approve",      icon: IconCircleCheck, description: "Move to approved stage", onClick: () => setLast("Approve") },
                { key: "edit",    label: "Edit brief",   icon: IconPencil,     onClick: () => setLast("Edit brief") },
                { key: "share",   label: "Share link",   icon: IconShare,      onClick: () => setLast("Share link") },
              ],
              [
                { key: "flag",    label: "Flag for review", icon: IconFlag,    onClick: () => setLast("Flag for review") },
                { key: "archive", label: "Archive",     icon: IconArchive,    destructive: true, onClick: () => setLast("Archive") },
              ],
            ]}
            width={210}
          />
        </div>
      </div>
      {last && <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>Last: <strong style={{ color: "var(--sd-font-primary)" }}>{last}</strong></span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "dropdown",
  title: "Dropdown",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Context menu and action dropdown. Grouped sections, icons, descriptions, destructive items, placement control.",
  description:
    "Dropdown wraps any trigger element (commonly a ⋯ button) and renders a floating menu panel below or above it. Items are organized into `sections` — each section is an array of items; sections are visually separated by dividers. Each item supports an icon, a description line below the label, a destructive flag (red tint), and a disabled flag. Panel placement is controlled by `side` (bottom/top) and `align` (start/end). Clicks outside dismiss the menu.",
  demos: [
    {
      title: "Creator row — ⋯ context menu",
      description: "3-section menu: primary actions, utilities, destructive remove.",
      block: true,
      render: () => <CreatorMoreMenu />,
    },
    {
      title: "Status switcher dropdown",
      description: "Trigger is a labeled button; align=start; active status shows a check icon.",
      block: true,
      render: () => <StatusSwitcher />,
    },
    {
      title: "Content card overlay menu",
      description: "Trigger is a blurred icon button overlaid on a gradient card. Items include descriptions.",
      block: true,
      render: () => <ContentCardMenu />,
    },
  ],
  props: [
    {
      rows: [
        { name: "trigger",  type: "React.ReactElement",  required: true,  description: "Element that opens the menu on click." },
        { name: "sections", type: "DropdownSection[]",   required: true,  description: "Array of item arrays. Each inner array is a section divided by a separator." },
        { name: "align",    type: "'start' | 'end'",     required: false, default: "'end'",    description: "Panel alignment relative to trigger." },
        { name: "side",     type: "'bottom' | 'top'",    required: false, default: "'bottom'", description: "Which side the panel opens on." },
        { name: "width",    type: "number",              required: false, default: "200",      description: "Panel width in px." },
      ],
    },
    {
      title: "DropdownItem",
      rows: [
        { name: "key",         type: "string",         required: true,  description: "Unique key." },
        { name: "label",       type: "string",         required: true,  description: "Item label." },
        { name: "icon",        type: "React.ElementType", required: false, description: "Tabler icon shown left of label." },
        { name: "description", type: "string",         required: false, description: "Secondary line below the label." },
        { name: "destructive", type: "boolean",        required: false, description: "Renders item in red." },
        { name: "disabled",    type: "boolean",        required: false, description: "Dims the item and disables clicks." },
        { name: "onClick",     type: "() => void",     required: false, description: "Called when the item is clicked." },
      ],
    },
  ],
};

export default doc;
