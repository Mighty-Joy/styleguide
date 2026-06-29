"use client";

import React, { useState } from "react";
import {
  IconCrown,
  IconShield,
  IconUser,
  IconEye,
  IconTrash,
  IconMail,
  IconChevronDown,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import AlertBanner from "@/components/ui/AlertBanner/AlertBanner";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Role = "owner" | "admin" | "manager" | "viewer";
type MemberStatus = "active" | "invited";

interface Member {
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  lastActive: string;
  tone?: keyof typeof TONES;
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const MEMBERS: Member[] = [
  { name: "Eric Dahan",      email: "eric@superdeal.co",    role: "owner",   status: "active",  lastActive: "Just now",     tone: "blue" },
  { name: "Sofia Chen",      email: "sofia@superdeal.co",   role: "admin",   status: "active",  lastActive: "2 hours ago",  tone: "purple" },
  { name: "Marcus Webb",     email: "marcus@superdeal.co",  role: "admin",   status: "active",  lastActive: "Yesterday",    tone: "orange" },
  { name: "Priya Nair",      email: "priya@superdeal.co",   role: "manager", status: "active",  lastActive: "3 hours ago",  tone: "pink" },
  { name: "James Li",        email: "james@superdeal.co",   role: "manager", status: "active",  lastActive: "2 days ago",   tone: "turquoise" },
  { name: "Lea Dupont",      email: "lea@superdeal.co",     role: "manager", status: "active",  lastActive: "1 week ago",   tone: "sky" },
];

const PENDING: { email: string; sentAt: string }[] = [
  { email: "alex@agency.io",    sentAt: "3 days ago" },
  { email: "nina@creator.co",   sentAt: "1 day ago" },
];

/* ------------------------------------------------------------------ */
/* Role config                                                          */
/* ------------------------------------------------------------------ */

const ROLE_CONFIG: Record<Role, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  owner:   { label: "Owner",   tone: "blue",   icon: IconCrown },
  admin:   { label: "Admin",   tone: "purple", icon: IconShield },
  manager: { label: "Manager", tone: "gray",   icon: IconUser },
  viewer:  { label: "Viewer",  tone: "gray",   icon: IconEye },
};

/* ------------------------------------------------------------------ */
/* Member row                                                           */
/* ------------------------------------------------------------------ */

function MemberRow({ member, isCurrentUser }: { member: Member; isCurrentUser: boolean }) {
  const role = ROLE_CONFIG[member.role];
  const RoleIcon = role.icon;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto auto auto",
      alignItems: "center",
      gap: 16,
      padding: "12px 16px",
      borderBottom: "1px solid var(--sd-border-light)",
    }}>
      {/* Identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <Avatar name={member.name} tone={member.tone} size="sm" />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>
              {member.name}
            </span>
            {isCurrentUser && (
              <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>(you)</span>
            )}
          </div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>
            {member.email}
          </div>
        </div>
      </div>

      {/* Last active */}
      <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", whiteSpace: "nowrap" }}>
        {member.lastActive}
      </span>

      {/* Role badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Badge label={role.label} tone={role.tone} variant="status" />
        <Badge label={member.status === "active" ? "Active" : "Invited"} tone={member.status === "active" ? "green" : "yellow"} variant="status" dot={member.status === "active"} />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* Role selector placeholder */}
        {!isCurrentUser && (
          <>
            <button style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)",
              background: "none", border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-sm)", padding: "4px 8px", cursor: "pointer",
            }}>
              <RoleIcon size={11} />
              {role.label}
              <IconChevronDown size={11} />
            </button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Remove member">
              <IconTrash size={13} style={{ color: TONES.red.text }} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main composite                                                       */
/* ------------------------------------------------------------------ */

function WorkspaceSettingsDemo() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Seat warning */}
      <AlertBanner
        variant="warning"
        title="Seat limit exceeded"
        message="Your workspace has 8 members but your Pro plan includes 5 seats. Upgrade to keep everyone's access."
        action={{ label: "Upgrade plan", onClick: () => {} }}
      />

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginBottom: 4 }}>
            Workspace · Settings
          </div>
          <h2 style={{ margin: 0, fontSize: "var(--sd-text-xl)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Team members
          </h2>
        </div>
        <Button variant="primary" size="sm" leftIcon={<IconMail size={13} />}>
          Invite member
        </Button>
      </div>

      {/* Plan strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
        padding: "12px 16px",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
      }}>
        <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", fontWeight: 500 }}>
          Current plan:
        </span>
        <Badge label="Pro · 5 seats" tone="blue" variant="status" />
        <Badge label="8 of 5 members" tone="orange" variant="status" />
        <div style={{ flex: 1 }} />
        <Button variant="secondary" size="sm">Upgrade plan</Button>
      </div>

      {/* Members list */}
      <div style={{
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)",
        overflow: "hidden",
      }}>
        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto auto",
          gap: 16,
          padding: "10px 16px",
          background: "var(--sd-bg-secondary)",
          borderBottom: "1px solid var(--sd-border-light)",
        }}>
          {["Member", "Last active", "Role · Status", ""].map((h, i) => (
            <span key={i} style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {h}
            </span>
          ))}
        </div>

        {MEMBERS.map((m, i) => (
          <MemberRow key={m.email} member={m} isCurrentUser={i === 0} />
        ))}
      </div>

      {/* Pending invites */}
      <div>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)", marginBottom: 10 }}>
          Pending invites ({PENDING.length})
        </div>
        <div style={{
          border: "1px solid var(--sd-border-light)",
          borderRadius: "var(--sd-radius-md)",
          background: "var(--sd-bg-primary)",
          overflow: "hidden",
        }}>
          {PENDING.map((p, i) => (
            <div key={p.email} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px",
              borderBottom: i < PENDING.length - 1 ? "1px solid var(--sd-border-light)" : undefined,
            }}>
              <IconMail size={15} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)" }}>
                {p.email}
              </span>
              <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
                Invited {p.sentAt}
              </span>
              <Badge label="Pending" tone="yellow" variant="status" />
              <Button variant="ghost" size="sm">Resend</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={{
        border: `1px solid ${TONES.red.solid}`,
        borderRadius: "var(--sd-radius-md)",
        padding: "16px 20px",
        background: "var(--sd-bg-primary)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <IconAlertTriangle size={15} style={{ color: TONES.red.text }} />
              <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: TONES.red.text }}>
                Danger zone
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", maxWidth: 480, lineHeight: 1.5 }}>
              Permanently delete this workspace and all its data — campaigns, deals, creators, and settings. This action cannot be undone.
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(v => !v)}>
            {showDeleteConfirm ? "Cancel" : "Delete workspace"}
          </Button>
        </div>

        {showDeleteConfirm && (
          <div style={{
            marginTop: 14, padding: "12px 14px",
            background: TONES.red.tint,
            borderRadius: "var(--sd-radius-sm)",
            border: `1px solid ${TONES.red.solid}`,
          }}>
            <p style={{ margin: "0 0 12px", fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", fontWeight: 600 }}>
              Are you sure? Type <code style={{ background: "var(--sd-bg-tertiary)", padding: "1px 5px", borderRadius: 3 }}>delete</code> to confirm.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Type delete to confirm"
                style={{
                  flex: 1, padding: "7px 10px",
                  border: `1px solid ${TONES.red.solid}`,
                  borderRadius: "var(--sd-radius-sm)",
                  fontSize: "var(--sd-text-sm)",
                  outline: "none",
                  background: "var(--sd-bg-primary)",
                }}
              />
              <Button variant="danger" size="sm">Confirm delete</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                           */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "workspace-settings",
  title: "WorkspaceSettings",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Team member management page — invite, assign roles, remove members, and manage seat limits with a danger zone.",
  demos: [
    {
      title: "Workspace team settings",
      render: () => <WorkspaceSettingsDemo />,
      block: true,
      plain: true,
    },
  ],
};

export default doc;
