"use client";

import React, { useState } from "react";
import {
  IconUser,
  IconBuildingStore,
  IconUsers,
  IconBell,
  IconShield,
  IconTrash,
  IconPlus,
  IconCheck,
  IconMail,
  IconUpload,
  IconAlertCircle,
  IconChevronRight,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import Select from "@/components/ui/Select/Select";
import Switch from "@/components/ui/Switch/Switch";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type Role = "Owner" | "Admin" | "Member" | "Viewer";
type MemberStatus = "active" | "invited";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  initials: string;
  tone: keyof typeof TONES;
  joinedDate: string;
}

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

const MEMBERS: TeamMember[] = [
  { id: "1", name: "Eric Dahan",      email: "eric@superdeal.io",    role: "Owner",  status: "active",  initials: "ED", tone: "blue",      joinedDate: "Jan 2024" },
  { id: "2", name: "Sarah Kim",       email: "sarah@superdeal.io",   role: "Admin",  status: "active",  initials: "SK", tone: "purple",    joinedDate: "Mar 2024" },
  { id: "3", name: "Marcus Webb",     email: "marcus@atlasbrands.co",role: "Member", status: "active",  initials: "MW", tone: "green",     joinedDate: "Apr 2024" },
  { id: "4", name: "Priya Nair",      email: "priya@atlasbrands.co", role: "Member", status: "active",  initials: "PN", tone: "turquoise", joinedDate: "May 2024" },
  { id: "5", name: "Jordan Ellis",    email: "jordan@partner.io",    role: "Viewer", status: "invited", initials: "JE", tone: "orange",    joinedDate: "—" },
];

const ROLE_META: Record<Role, { tone: keyof typeof TONES }> = {
  Owner:  { tone: "purple" },
  Admin:  { tone: "blue"   },
  Member: { tone: "green"  },
  Viewer: { tone: "gray"   },
};

const INDUSTRIES = [
  "Fashion & Apparel", "Beauty & Skincare", "Food & Beverage",
  "Health & Fitness", "Technology", "Travel", "Home & Living",
].map(v => ({ value: v, label: v }));

const INVITE_ROLES = (["Admin", "Member", "Viewer"] as Role[]).map(r => ({ value: r, label: r }));

/* ------------------------------------------------------------------ */
/* Sidebar nav                                                           */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "profile",       label: "Profile",          icon: IconUser           },
  { id: "brand",         label: "Brand",            icon: IconBuildingStore  },
  { id: "team",          label: "Team members",     icon: IconUsers          },
  { id: "notifications", label: "Notifications",    icon: IconBell           },
  { id: "security",      label: "Security",         icon: IconShield         },
];

/* ------------------------------------------------------------------ */
/* Sub-views                                                             */
/* ------------------------------------------------------------------ */

function SaveBanner({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 16, borderTop: "1px solid var(--sd-border-light)", marginTop: 24 }}>
      {saved && (
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: TONES.green.text, marginRight: 12 }}>
          <IconCheck size={13} />Saved
        </span>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="secondary" size="sm">Discard</Button>
        <Button variant="primary" size="sm" onClick={onSave}>Save changes</Button>
      </div>
    </div>
  );
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, alignItems: "flex-start", paddingBottom: 20 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{label}</div>
        {hint && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 3, lineHeight: 1.4 }}>{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function ProfileSection() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Eric Dahan");
  const [email, setEmail] = useState("eric@superdeal.io");
  const [bio, setBio] = useState("");

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)", marginBottom: 4 }}>Profile</div>
      <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginBottom: 20 }}>Your personal information and account details.</div>

      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, padding: "16px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
        <Avatar initials="ED" tone="blue" size="lg" />
        <div>
          <Button variant="secondary" size="sm" leftIcon={<IconUpload size={13} />}>Upload photo</Button>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 4 }}>JPG, PNG or GIF · max 2 MB</div>
        </div>
      </div>

      <FieldRow label="Full name">
        <Input value={name} onChange={e => setName(e.target.value)} />
      </FieldRow>
      <FieldRow label="Email address" hint="Used for login and notifications.">
        <Input value={email} onChange={e => setEmail(e.target.value)} leftIcon={<IconMail size={13} />} />
      </FieldRow>
      <FieldRow label="Bio" hint="A short description for your profile.">
        <Textarea value={bio} onChange={setBio} rows={3} placeholder="Tell your team about yourself…" />
      </FieldRow>

      <SaveBanner saved={saved} onSave={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} />
    </div>
  );
}

function BrandSection() {
  const [saved, setSaved] = useState(false);
  const [brandName, setBrandName] = useState("Atlas X");
  const [website, setWebsite] = useState("atlasxbrands.com");
  const [industry, setIndustry] = useState("Fashion & Apparel");

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)", marginBottom: 4 }}>Brand</div>
      <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginBottom: 20 }}>Public brand details shown to creators when you reach out.</div>

      {/* Brand logo placeholder */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, padding: "16px 0", borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "var(--sd-radius-md)", background: TONES.purple.tint, border: "1px dashed var(--sd-border-medium)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconBuildingStore size={22} style={{ color: TONES.purple.text }} />
        </div>
        <div>
          <Button variant="secondary" size="sm" leftIcon={<IconUpload size={13} />}>Upload logo</Button>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 4 }}>PNG or SVG · min 256×256px</div>
        </div>
      </div>

      <FieldRow label="Brand name">
        <Input value={brandName} onChange={e => setBrandName(e.target.value)} />
      </FieldRow>
      <FieldRow label="Website">
        <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="yourbrand.com" />
      </FieldRow>
      <FieldRow label="Industry">
        <Select value={industry} onChange={setIndustry} options={INDUSTRIES} />
      </FieldRow>

      <SaveBanner saved={saved} onSave={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} />
    </div>
  );
}

function TeamSection() {
  const [members, setMembers] = useState(MEMBERS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Member");
  const [inviteSent, setInviteSent] = useState(false);

  const remove = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  const sendInvite = () => {
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setInviteEmail("");
    setTimeout(() => setInviteSent(false), 2500);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)", marginBottom: 4 }}>Team members</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>{members.length} member{members.length !== 1 ? "s" : ""} · Manage who has access to your workspace.</div>
        </div>
      </div>

      {/* Invite bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, padding: 14, background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-md)", border: "1px solid var(--sd-border-light)", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Input
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            placeholder="colleague@company.com"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendInvite()}
          />
        </div>
        <div style={{ width: 140 }}>
          <Select
            value={inviteRole}
            onChange={(v) => setInviteRole(v as Role)}
            options={INVITE_ROLES}
            size="sm"
          />
        </div>
        <Button variant="primary" size="sm" leftIcon={inviteSent ? <IconCheck size={13} /> : <IconPlus size={13} />} onClick={sendInvite}>
          {inviteSent ? "Invited!" : "Invite"}
        </Button>
      </div>

      {/* Members table */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
              {["Member", "Role", "Status", "Joined", ""].map(h => (
                <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => {
              return (
                <tr key={m.id} style={{ borderBottom: i < members.length - 1 ? "1px solid var(--sd-border-light)" : "none" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar initials={m.initials} tone={m.tone} size="md" />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <Badge label={m.role} tone={ROLE_META[m.role].tone} variant="status" size="sm" />
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <Badge label={m.status === "invited" ? "Pending invite" : "Active"} tone={m.status === "invited" ? "yellow" : "green"} variant="status" size="sm" />
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--sd-font-tertiary)" }}>{m.joinedDate}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right" }}>
                    {m.role !== "Owner" && (
                      <Button variant="tertiary" size="sm" iconOnly aria-label="Remove" onClick={() => remove(m.id)}>
                        <IconTrash size={13} />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    newDeal: true, dealUpdate: true, contentSubmitted: true,
    contentApproved: false, paymentSent: true, weeklyDigest: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const rows: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: "newDeal",          label: "New deal",              desc: "When a creator accepts your outreach." },
    { key: "dealUpdate",       label: "Deal status change",    desc: "When a deal moves to a new stage." },
    { key: "contentSubmitted", label: "Content submitted",     desc: "When a creator submits content for review." },
    { key: "contentApproved",  label: "Content approved",      desc: "When content passes your review checklist." },
    { key: "paymentSent",      label: "Payment sent",          desc: "When a payment is dispatched to a creator." },
    { key: "weeklyDigest",     label: "Weekly digest",         desc: "A Sunday summary of campaign activity." },
  ];

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)", marginBottom: 4 }}>Notifications</div>
      <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginBottom: 20 }}>Choose which events send you an email or in-app notification.</div>

      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
        {rows.map((r, i) => (
          <div key={r.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: i < rows.length - 1 ? "1px solid var(--sd-border-light)" : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{r.label}</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2 }}>{r.desc}</div>
            </div>
            <Switch checked={prefs[r.key]} onChange={() => toggle(r.key)} size="sm" />
          </div>
        ))}
      </div>

      <SaveBanner saved={saved} onSave={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} />
    </div>
  );
}

function DangerZone() {
  return (
    <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--sd-border-light)" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: TONES.red.text, marginBottom: 12 }}>Danger zone</div>
      <div style={{ border: `1px solid ${TONES.red.solid}40`, borderRadius: "var(--sd-radius-md)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>Delete workspace</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2 }}>Permanently remove this workspace and all its campaigns. This cannot be undone.</div>
        </div>
        <Button variant="danger" size="sm" leftIcon={<IconTrash size={13} />}>Delete</Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Settings shell                                                        */
/* ------------------------------------------------------------------ */

const SECTION_VIEWS: Record<string, React.ReactNode> = {
  profile:       <><ProfileSection /><DangerZone /></>,
  brand:         <BrandSection />,
  team:          <TeamSection />,
  notifications: <NotificationsSection />,
  security:      (
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)", marginBottom: 4 }}>Security</div>
      <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginBottom: 20 }}>Manage your password and two-factor authentication.</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, background: TONES.blue.tint, borderRadius: "var(--sd-radius-md)", border: `1px solid ${TONES.blue.solid}30`, marginBottom: 16 }}>
        <IconAlertCircle size={15} style={{ color: TONES.blue.text, flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: TONES.blue.text }}>Two-factor authentication is not enabled. We strongly recommend enabling it.</span>
        <Button variant="secondary" size="sm" style={{ marginLeft: "auto", flexShrink: 0 }}>Enable 2FA</Button>
      </div>
      <Button variant="secondary" size="sm">Change password</Button>
    </div>
  ),
};

function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <div style={{ display: "flex", gap: 0, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", minHeight: 480 }}>
      {/* Sidebar */}
      <div style={{ width: 200, borderRight: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)", padding: "8px 0", flexShrink: 0 }}>
        <div style={{ padding: "10px 16px 6px", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Settings</div>
        {SECTIONS.map(s => {
          const isActive = active === s.id;
          const Icon = s.icon;
          return (
            <Button key={s.id} variant="ghost" onClick={() => setActive(s.id)}
              style={{
                width: "100%", height: "auto", borderRadius: 0, justifyContent: "flex-start",
                padding: "8px 16px", background: isActive ? "var(--sd-bg-primary)" : "transparent",
                borderLeft: `2px solid ${isActive ? "var(--sd-font-primary)" : "transparent"}`,
                textAlign: "left",
              }}>
              <Icon size={14} style={{ color: isActive ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)", flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "var(--sd-font-primary)" : "var(--sd-font-secondary)" }}>{s.label}</span>
              {isActive && <IconChevronRight size={11} style={{ marginLeft: "auto", color: "var(--sd-font-tertiary)" }} />}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
        {SECTION_VIEWS[active]}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "settings-page",
  title: "SettingsPage",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Brand workspace settings — profile, brand, team management, notifications, and security in a sidebar-nav shell.",
  description:
    "SettingsPage is a two-column shell: a 200px sidebar with icon + label nav links (active state: black left border + bold label) and a main content area that swaps views. Five sections: **Profile** (avatar upload, name, email, bio — with save/discard and a Danger Zone for workspace deletion), **Brand** (logo, name, website, industry dropdown), **Team** (invite bar with email + role select, members table with role badges + pending status + remove action), **Notifications** (toggle switches per event type), **Security** (2FA alert banner + change password). All forms have a sticky Save/Discard footer that shows a brief 'Saved ✓' confirmation on submit.",
  demos: [
    {
      title: "Settings page",
      description: "Click sidebar nav to switch sections. Team: invite via the bar, remove members with the trash icon. Notifications: toggle switches. Profile/Brand: edit fields and save.",
      block: true,
      render: () => <SettingsPage />,
    },
  ],
  props: [],
};

export default doc;
