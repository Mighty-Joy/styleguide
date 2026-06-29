"use client";

import React, { useState } from "react";
import {
  IconHome, IconFolder, IconUsers, IconSettings, IconSearch, IconBell,
  IconChevronLeft, IconChevronRight, IconChevronUp, IconChevronDown,
  IconArrowUpRight, IconArrowLeft,
  IconSpeakerphone, IconTarget, IconBolt, IconGift, IconCurrencyDollar,
  IconCalendar, IconRocket, IconBulb, IconStar, IconBriefcase,
  IconBrandInstagram, IconBrandTiktok, IconBrandYoutube, IconUserCircle,
  IconUserCheck, IconHeart, IconPhoto, IconVideo, IconMicrophone, IconCamera,
  IconFileText, IconFile, IconDownload, IconUpload, IconLink, IconExternalLink,
  IconClipboard, IconNote,
  IconPlus, IconEdit, IconTrash, IconX, IconCheck, IconDotsVertical,
  IconDots, IconSend, IconShare, IconCopy, IconFilter, IconSelector,
  IconAlertCircle, IconInfoCircle, IconCircleCheck, IconCircleX, IconEye,
  IconEyeOff, IconLock, IconLockOpen, IconFlag,
  IconChartBar, IconChartLine, IconTrendingUp, IconTrendingDown,
  IconPercentage, IconCoin,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

interface IconEntry {
  name: string;
  component: React.ElementType;
}

const GROUPS: { label: string; icons: IconEntry[] }[] = [
  {
    label: "Navigation & Layout",
    icons: [
      { name: "IconHome", component: IconHome },
      { name: "IconFolder", component: IconFolder },
      { name: "IconUsers", component: IconUsers },
      { name: "IconSettings", component: IconSettings },
      { name: "IconSearch", component: IconSearch },
      { name: "IconBell", component: IconBell },
      { name: "IconChevronLeft", component: IconChevronLeft },
      { name: "IconChevronRight", component: IconChevronRight },
      { name: "IconChevronUp", component: IconChevronUp },
      { name: "IconChevronDown", component: IconChevronDown },
      { name: "IconArrowUpRight", component: IconArrowUpRight },
      { name: "IconArrowLeft", component: IconArrowLeft },
    ],
  },
  {
    label: "Campaigns & Deals",
    icons: [
      { name: "IconSpeakerphone", component: IconSpeakerphone },
      { name: "IconTarget", component: IconTarget },
      { name: "IconBolt", component: IconBolt },
      { name: "IconGift", component: IconGift },
      { name: "IconCurrencyDollar", component: IconCurrencyDollar },
      { name: "IconCalendar", component: IconCalendar },
      { name: "IconRocket", component: IconRocket },
      { name: "IconBulb", component: IconBulb },
      { name: "IconStar", component: IconStar },
      { name: "IconBriefcase", component: IconBriefcase },
    ],
  },
  {
    label: "Creator",
    icons: [
      { name: "IconBrandInstagram", component: IconBrandInstagram },
      { name: "IconBrandTiktok", component: IconBrandTiktok },
      { name: "IconBrandYoutube", component: IconBrandYoutube },
      { name: "IconUserCircle", component: IconUserCircle },
      { name: "IconUserCheck", component: IconUserCheck },
      { name: "IconHeart", component: IconHeart },
      { name: "IconPhoto", component: IconPhoto },
      { name: "IconVideo", component: IconVideo },
      { name: "IconMicrophone", component: IconMicrophone },
      { name: "IconCamera", component: IconCamera },
    ],
  },
  {
    label: "Content & Files",
    icons: [
      { name: "IconFileText", component: IconFileText },
      { name: "IconFile", component: IconFile },
      { name: "IconDownload", component: IconDownload },
      { name: "IconUpload", component: IconUpload },
      { name: "IconLink", component: IconLink },
      { name: "IconExternalLink", component: IconExternalLink },
      { name: "IconClipboard", component: IconClipboard },
      { name: "IconNote", component: IconNote },
    ],
  },
  {
    label: "Actions",
    icons: [
      { name: "IconPlus", component: IconPlus },
      { name: "IconEdit", component: IconEdit },
      { name: "IconTrash", component: IconTrash },
      { name: "IconX", component: IconX },
      { name: "IconCheck", component: IconCheck },
      { name: "IconDotsVertical", component: IconDotsVertical },
      { name: "IconDots", component: IconDots },
      { name: "IconSend", component: IconSend },
      { name: "IconShare", component: IconShare },
      { name: "IconCopy", component: IconCopy },
      { name: "IconFilter", component: IconFilter },
      { name: "IconSelector", component: IconSelector },
    ],
  },
  {
    label: "Status & Feedback",
    icons: [
      { name: "IconAlertCircle", component: IconAlertCircle },
      { name: "IconInfoCircle", component: IconInfoCircle },
      { name: "IconCircleCheck", component: IconCircleCheck },
      { name: "IconCircleX", component: IconCircleX },
      { name: "IconEye", component: IconEye },
      { name: "IconEyeOff", component: IconEyeOff },
      { name: "IconLock", component: IconLock },
      { name: "IconLockOpen", component: IconLockOpen },
      { name: "IconFlag", component: IconFlag },
    ],
  },
  {
    label: "Data & Analytics",
    icons: [
      { name: "IconChartBar", component: IconChartBar },
      { name: "IconChartLine", component: IconChartLine },
      { name: "IconTrendingUp", component: IconTrendingUp },
      { name: "IconTrendingDown", component: IconTrendingDown },
      { name: "IconPercentage", component: IconPercentage },
      { name: "IconCoin", component: IconCoin },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Icon tile                                                             */
/* ------------------------------------------------------------------ */

function IconTile({ name, component: Icon }: IconEntry) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(`import { ${name} } from "@tabler/icons-react";`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <button
      type="button"
      title={`Click to copy: import { ${name} } from "@tabler/icons-react"`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 76,
        height: 68,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        border: copied ? "1px solid #36d080" : "1px solid transparent",
        borderRadius: "var(--sd-radius-md)",
        background: copied
          ? "#d2f7e4"
          : hovered
          ? "var(--sd-bg-secondary)"
          : "transparent",
        cursor: "pointer",
        padding: "8px 4px",
        transition: "background 0.1s, border-color 0.1s",
        fontFamily: "var(--sd-font-stack)",
        position: "relative",
      }}
    >
      <Icon
        size={20}
        style={{ color: copied ? "#1c9159" : "var(--sd-font-secondary)", flexShrink: 0 }}
      />
      <span
        style={{
          fontSize: 9,
          color: copied ? "#1c9159" : "var(--sd-font-tertiary)",
          textAlign: "center",
          lineHeight: 1.2,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          paddingInline: 4,
          fontWeight: copied ? 700 : 400,
        }}
      >
        {copied ? "Copied!" : name.replace("Icon", "")}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Icon grid                                                             */
/* ------------------------------------------------------------------ */

function IconGrid() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{
        padding: "10px 14px",
        background: "var(--sd-bg-secondary)",
        borderRadius: "var(--sd-radius-md)",
        fontSize: 12,
        color: "var(--sd-font-tertiary)",
        border: "1px solid var(--sd-border-light)",
      }}>
        Click any icon to copy its import statement to clipboard.
        All icons are from <strong style={{ color: "var(--sd-font-secondary)" }}>@tabler/icons-react</strong> — the only icon library used in Superdeal.
      </div>

      {GROUPS.map(group => (
        <div key={group.label}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--sd-font-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: 10,
            paddingBottom: 6,
            borderBottom: "1px solid var(--sd-border-light)",
          }}>
            {group.label}
            <span style={{ fontWeight: 400, marginLeft: 6, opacity: 0.6 }}>
              ({group.icons.length})
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {group.icons.map(icon => (
              <IconTile key={icon.name} {...icon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "icons",
  title: "Icons",
  group: "Foundations",
  status: "stable",
  summary: "All @tabler/icons-react icons used in Superdeal, organized by context. Click any icon to copy its import.",
  description:
    "Superdeal uses **@tabler/icons-react** exclusively — no Lucide, no Font Awesome, no inline SVGs other than generated charts. Icons are organized into 7 context groups: Navigation & Layout, Campaigns & Deals, Creator, Content & Files, Actions, Status & Feedback, and Data & Analytics. Click any tile to copy `import { IconName } from \"@tabler/icons-react\"` to clipboard. Standard icon sizes: **20px** for UI icons, **16px** for small inline icons, **13–14px** for row-level micro-icons. Stroke width defaults to 2 (Tabler default). Color: inherit from `var(--sd-font-secondary)` or `var(--sd-font-tertiary)` unless the icon carries semantic color (e.g. danger red, green success).",
  demos: [
    {
      title: "All icons",
      description: "Click any icon to copy its import statement.",
      block: true,
      render: () => <IconGrid />,
    },
  ],
  props: [],
};

export default doc;
