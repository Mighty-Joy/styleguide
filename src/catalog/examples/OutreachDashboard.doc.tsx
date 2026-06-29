"use client";

import React, { useState } from "react";
import {
  IconSend,
  IconMessageCircle,
  IconCircleCheck,
  IconCircleX,
  IconRefresh,
  IconEye,
  IconBrandInstagram,
  IconBrandTiktok,
  IconUsers,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import RecordList from "@/components/ui/RecordList/RecordList";
import type { RecordColumn } from "@/components/ui/RecordList/RecordList";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type OutreachStatus = "invited" | "responded" | "accepted" | "declined" | "pending";

interface OutreachRecord {
  id: string;
  name: string;
  handle: string;
  tone: keyof typeof TONES;
  platforms: ("instagram" | "tiktok" | "youtube")[];
  followers: string;
  sentDate: string;
  status: OutreachStatus;
  responseTime?: string;
}

const STATUS_META: Record<OutreachStatus, { label: string; tone: keyof typeof TONES }> = {
  invited:   { label: "Invited",   tone: "blue"  },
  responded: { label: "Responded", tone: "sky"   },
  accepted:  { label: "Accepted",  tone: "green" },
  declined:  { label: "Declined",  tone: "red"   },
  pending:   { label: "Pending",   tone: "gray"  },
};

const RECORDS: OutreachRecord[] = [
  { id: "1",  name: "Priya Nair",       handle: "@priya.creates",   tone: "purple", platforms: ["instagram", "tiktok"], followers: "128K", sentDate: "Jun 18", status: "accepted",  responseTime: "4h"   },
  { id: "2",  name: "Maya Rivers",      handle: "@mayabeauty",      tone: "pink",   platforms: ["instagram"],           followers: "84K",  sentDate: "Jun 19", status: "responded", responseTime: "12h"  },
  { id: "3",  name: "James Okafor",     handle: "@jamesokafor",     tone: "blue",   platforms: ["tiktok"],              followers: "210K", sentDate: "Jun 20", status: "invited",   responseTime: undefined },
  { id: "4",  name: "Sophie Lane",      handle: "@sophielane",      tone: "orange", platforms: ["instagram", "tiktok"], followers: "67K",  sentDate: "Jun 20", status: "declined",  responseTime: "2d"   },
  { id: "5",  name: "Carlos Vega",      handle: "@carlosvega",      tone: "turquoise", platforms: ["tiktok"],           followers: "155K", sentDate: "Jun 21", status: "pending",   responseTime: undefined },
  { id: "6",  name: "Lena Park",        handle: "@lenapark.co",     tone: "sky",    platforms: ["instagram"],           followers: "43K",  sentDate: "Jun 21", status: "accepted",  responseTime: "6h"   },
  { id: "7",  name: "Noah Williams",    handle: "@noahfits",        tone: "gray",   platforms: ["instagram", "tiktok"], followers: "92K",  sentDate: "Jun 22", status: "invited",   responseTime: undefined },
  { id: "8",  name: "Aria Chen",        handle: "@ariaxcreative",   tone: "red",    platforms: ["tiktok"],              followers: "180K", sentDate: "Jun 23", status: "responded", responseTime: "1d"   },
];

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
};

function PlatformGlyphs({ platforms }: { platforms: string[] }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {platforms.map((p) => {
        const Icon = PLATFORM_ICONS[p];
        return Icon ? <Icon key={p} size={13} style={{ color: "var(--sd-font-secondary)" }} /> : null;
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Filter pill                                                           */
/* ------------------------------------------------------------------ */

const FILTER_OPTIONS: { key: OutreachStatus | "all"; label: string }[] = [
  { key: "all",       label: "All"       },
  { key: "invited",   label: "Invited"   },
  { key: "responded", label: "Responded" },
  { key: "accepted",  label: "Accepted"  },
  { key: "declined",  label: "Declined"  },
  { key: "pending",   label: "Pending"   },
];

/* ------------------------------------------------------------------ */
/* Demo component                                                        */
/* ------------------------------------------------------------------ */

function OutreachDashboardDemo() {
  const [filter, setFilter] = useState<OutreachStatus | "all">("all");

  const filtered = filter === "all" ? RECORDS : RECORDS.filter(r => r.status === filter);

  const counts = {
    invited:   RECORDS.filter(r => r.status === "invited").length,
    responded: RECORDS.filter(r => r.status === "responded").length,
    accepted:  RECORDS.filter(r => r.status === "accepted").length,
    declined:  RECORDS.filter(r => r.status === "declined").length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "20px 0" }}>
      {/* Summary stat bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Total Invited"   value={RECORDS.length}   icon={IconUsers}         tone="blue"  />
        <StatCard label="Responded"       value={counts.responded} icon={IconMessageCircle} tone="sky"   />
        <StatCard label="Accepted"        value={counts.accepted}  icon={IconCircleCheck}   tone="green" />
        <StatCard label="Declined"        value={counts.declined}  icon={IconCircleX}       tone="red"   />
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {FILTER_OPTIONS.map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Record list */}
      <RecordList
        items={filtered}
        getId={r => r.id}
        leadHeader="Creator"
        lead={r => (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name={r.name} tone={r.tone} size="sm" />
            <div>
              <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>
                {r.name}
              </div>
              <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
                {r.handle} · {r.followers}
              </div>
            </div>
          </div>
        )}
        columns={[
          {
            key: "platforms",
            header: "Platforms",
            render: (r: OutreachRecord) => <PlatformGlyphs platforms={r.platforms} />,
          },
          {
            key: "sentDate",
            header: "Sent",
            render: (r: OutreachRecord) => (
              <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)" }}>
                {r.sentDate}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (r: OutreachRecord) => (
              <Badge
                label={STATUS_META[r.status].label}
                tone={STATUS_META[r.status].tone}
                variant="status"
                dot
                size="sm"
              />
            ),
          },
          {
            key: "responseTime",
            header: "Response",
            render: (r: OutreachRecord) => (
              <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-tertiary)" }}>
                {r.responseTime ?? "—"}
              </span>
            ),
          },
        ] as RecordColumn<OutreachRecord>[]}
        actions={r => (
          <div style={{ display: "flex", gap: 6 }}>
            {(r.status === "invited" || r.status === "pending") && (
              <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={12} />}>
                Resend
              </Button>
            )}
            <Button variant="secondary" size="sm" leftIcon={<IconEye size={12} />}>
              View
            </Button>
          </div>
        )}
        emptyMessage="No creators match this filter."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "outreach-dashboard",
  title: "Outreach Dashboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Creator outreach funnel — track invitations from sent through accepted, with per-creator status and response time.",
  description:
    "The Outreach Dashboard shows the full lifecycle of a campaign's creator outreach: how many were invited, who responded, who accepted or declined, and how quickly. The top stat bar gives at-a-glance funnel health; the filter row lets managers drill into a specific status; the RecordList shows every creator with their current state and one-click actions.",
  demos: [
    {
      title: "Outreach funnel",
      render: () => <OutreachDashboardDemo />,
    },
  ],
  props: [],
};

export default doc;
