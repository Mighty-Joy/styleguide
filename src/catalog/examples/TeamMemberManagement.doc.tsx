"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconUserPlus,
  IconCheck,
  IconX,
  IconTrash,
  IconDots,
  IconCrown,
  IconShield,
  IconEye,
  IconMail,
  IconClock,
  IconChevronDown,
  IconSend,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Role = "admin" | "manager" | "viewer";
type MemberStatus = "active" | "pending" | "deactivated";

interface Member {
  id: string;
  name: string;
  initials: string;
  tone: string;
  email: string;
  role: Role;
  status: MemberStatus;
  joinedAt: string;
  lastActive: string;
}

const ROLE_META: Record<Role, { label: string; icon: React.ElementType; tone: keyof typeof TONES; description: string }> = {
  admin:   { label: "Admin",   icon: IconCrown,  tone: "purple", description: "Full access — billing, settings, all campaigns" },
  manager: { label: "Manager", icon: IconShield, tone: "blue",   description: "Create + manage campaigns, invite creators"    },
  viewer:  { label: "Viewer",  icon: IconEye,    tone: "gray",   description: "Read-only — view campaigns and reports"         },
};

const MEMBERS_INIT: Member[] = [
  { id: "m1", name: "Sarah Chen",    initials: "SC", tone: "purple", email: "sarah@auralabs.com",   role: "admin",   status: "active",      joinedAt: "Jan 2024",  lastActive: "Today"       },
  { id: "m2", name: "Tom Reeves",    initials: "TR", tone: "blue",   email: "tom@auralabs.com",     role: "manager", status: "active",      joinedAt: "Mar 2024",  lastActive: "Today"       },
  { id: "m3", name: "Mia Park",      initials: "MP", tone: "green",  email: "mia@auralabs.com",     role: "manager", status: "active",      joinedAt: "Jun 2024",  lastActive: "Yesterday"   },
  { id: "m4", name: "Dev Kapoor",    initials: "DK", tone: "orange", email: "dev@auralabs.com",     role: "viewer",  status: "active",      joinedAt: "Oct 2024",  lastActive: "3 days ago"  },
  { id: "m5", name: "Lucia Ferrero", initials: "LF", tone: "pink",   email: "lucia@auralabs.com",   role: "manager", status: "pending",     joinedAt: "—",         lastActive: "Invite sent Jun 28" },
  { id: "m6", name: "James Wu",      initials: "JW", tone: "gray",   email: "james@auralabs.com",   role: "viewer",  status: "deactivated", joinedAt: "Feb 2024",  lastActive: "Apr 2025"    },
];

/* ---- Demo ---- */
function Demo() {
  const [members,    setMembers]    = useState<Member[]>(MEMBERS_INIT);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole,  setInviteRole]  = useState<Role>("manager");
  const [inviteSent,  setInviteSent]  = useState(false);
  const [roleMenuId,  setRoleMenuId]  = useState<string | null>(null);

  function changeRole(id: string, role: Role) {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role } : m));
    setRoleMenuId(null);
  }
  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }
  function sendInvite() {
    if (!inviteEmail.trim()) return;
    const parts = inviteEmail.split("@")[0].split(".");
    const name = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    setMembers((prev) => [...prev, {
      id: `m${Date.now()}`, name, initials: name.split(" ").map((p) => p[0]).join("").slice(0,2).toUpperCase(),
      tone: "sky", email: inviteEmail, role: inviteRole, status: "pending", joinedAt: "—", lastActive: "Invite sent just now",
    }]);
    setInviteSent(true);
    setInviteEmail("");
    setTimeout(() => { setInviteSent(false); setInviteOpen(false); }, 2000);
  }

  const active      = members.filter((m) => m.status === "active");
  const pending     = members.filter((m) => m.status === "pending");
  const deactivated = members.filter((m) => m.status === "deactivated");

  function MemberRow({ m }: { m: Member }) {
    const { label, icon: RIcon, tone } = ROLE_META[m.role];
    const roleMenuOpen = roleMenuId === m.id;
    const isCurrentUser = m.id === "m1";
    const isPending = m.status === "pending";
    const isDeactivated = m.status === "deactivated";

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", opacity: isDeactivated ? 0.5 : 1 }}>
        <Avatar initials={m.initials} tone={m.tone as any} size="sm" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{m.name}</span>
            {isCurrentUser && <Badge label="You" tone="gray" size="sm" />}
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{m.email}</div>
        </div>
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", width: 80 }}>{m.lastActive}</div>

        {/* Role selector */}
        <div style={{ position: "relative" }}>
          <button onClick={() => !isCurrentUser && setRoleMenuId(roleMenuOpen ? null : m.id)}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px", borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: TONES[tone].tint, cursor: isCurrentUser ? "default" : "pointer", fontSize: 11, fontWeight: 700, color: TONES[tone].text }}>
            <RIcon size={11} />
            {label}
            {!isCurrentUser && <IconChevronDown size={10} />}
          </button>
          {roleMenuOpen && (
            <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, background: "#fff", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden", minWidth: 200 }}>
              {(["admin","manager","viewer"] as Role[]).map((r) => {
                const { label: rl, icon: RI, tone: rt, description } = ROLE_META[r];
                const active = m.role === r;
                return (
                  <button key={r} onClick={() => changeRole(m.id, r)}
                    style={{ width: "100%", display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 12px", background: active ? TONES[rt].tint : "transparent", border: "none", cursor: "pointer", textAlign: "left", borderBottom: r !== "viewer" ? "1px solid var(--sd-border-default, #f1f1f1)" : "none" }}>
                    <RI size={13} style={{ color: TONES[rt].text, marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: TONES[rt].text }}>{rl}</div>
                      <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{description}</div>
                    </div>
                    {active && <IconCheck size={12} style={{ color: TONES[rt].text, marginLeft: "auto", flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {!isCurrentUser && (
          <button onClick={() => removeMember(m.id)}
            style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sd-font-tertiary, #999)" }}>
            {isPending ? <IconX size={12} /> : <IconTrash size={12} />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Team members</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Aura Labs · {active.length} active · {pending.length} pending</div>
        </div>
        <Button variant="primary" size="sm" leftIcon={<IconUserPlus size={12} />} onClick={() => setInviteOpen(true)}>
          Invite member
        </Button>
      </div>

      {/* Invite form */}
      {inviteOpen && (
        <div style={{ padding: "14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, marginBottom: 14, background: "var(--sd-bg-secondary, #f9f9f9)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Invite a new team member</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 8, padding: "7px 11px", background: "#fff" }}>
              <IconMail size={12} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
              <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="teammate@company.com"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }} />
            </div>
            <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value as Role)}
              style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 8, padding: "7px 10px", fontSize: 12, fontFamily: "inherit", background: "#fff", cursor: "pointer" }}>
              {(["admin","manager","viewer"] as Role[]).map((r) => (
                <option key={r} value={r}>{ROLE_META[r].label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button variant="primary" size="sm" leftIcon={inviteSent ? <IconCheck size={11} /> : <IconSend size={11} />} onClick={sendInvite} disabled={!inviteEmail.trim()}>
              {inviteSent ? "Invite sent!" : "Send invite"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setInviteOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Members table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {/* Active */}
        <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Active · {active.length}
        </div>
        {active.map((m, i) => (
          <div key={m.id} style={{ borderBottom: i < active.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
            <MemberRow m={m} />
          </div>
        ))}

        {/* Pending */}
        {pending.length > 0 && (
          <>
            <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 10, fontWeight: 700, color: TONES.yellow.text, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Pending invites · {pending.length}
            </div>
            {pending.map((m, i) => (
              <div key={m.id} style={{ borderBottom: i < pending.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", background: `${TONES.yellow.tint}40` }}>
                <MemberRow m={m} />
              </div>
            ))}
          </>
        )}

        {/* Deactivated */}
        {deactivated.length > 0 && (
          <>
            <div style={{ padding: "8px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Deactivated · {deactivated.length}
            </div>
            {deactivated.map((m) => (
              <div key={m.id}>
                <MemberRow m={m} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "team-member-management",
  title: "TeamMemberManagement",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Workspace team management — active/pending/deactivated member table with role-change dropdown (Admin/Manager/Viewer), invite form, and per-member remove actions.",
  description:
    "Lets brand admins manage who has access to the workspace. Header: member count, pending count, Invite member CTA. Invite form: email input + role selector (Admin/Manager/Viewer) + Send invite (disabled until email entered); on send adds a new pending row and shows green 'Invite sent!' confirmation. Three-section table: Active (4 members), Pending invites (1, yellow tint), Deactivated (1, dimmed 50%). Each row: avatar, name, 'You' badge on current user, email, last active date, role pill button (opens dropdown with role descriptions + check on current role), remove/revoke button (trash for active, × for pending). Your own row is protected — role can't be changed, no remove button. Inline role change immediately updates the pill. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Team member management",
      description: "Click a role pill to open the dropdown and change a member's role. Click Invite member to open the invite form. Remove members with the trash icon.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
