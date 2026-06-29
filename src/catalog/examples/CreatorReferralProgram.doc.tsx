"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCopy,
  IconCheck,
  IconCurrencyDollar,
  IconUsers,
  IconClock,
  IconGift,
  IconMail,
  IconSend,
  IconTrophy,
  IconChevronRight,
  IconShare,
  IconQrcode,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type ReferralStatus = "approved" | "pending" | "rejected";

interface Referral {
  id: string;
  name: string;
  initials: string;
  tone: "blue" | "green" | "purple" | "orange" | "pink";
  joinedAt: string;
  status: ReferralStatus;
  firstCampaign?: string;
  bonus: number;
  bonusPaid: boolean;
}

const REFERRALS: Referral[] = [
  { id: "r1", name: "Kezia Adeyemi",   initials: "KA", tone: "purple", joinedAt: "Jun 10", status: "approved",  firstCampaign: "NovaSkin Q2",        bonus: 75,  bonusPaid: true  },
  { id: "r2", name: "Luca Bianchi",    initials: "LB", tone: "blue",   joinedAt: "Jun 17", status: "approved",  firstCampaign: "Wellnest Mindfulness", bonus: 75,  bonusPaid: true  },
  { id: "r3", name: "Yasmin Haddad",   initials: "YH", tone: "pink",   joinedAt: "Jun 23", status: "pending",   firstCampaign: undefined,              bonus: 75,  bonusPaid: false },
  { id: "r4", name: "Carlos Mendes",   initials: "CM", tone: "green",  joinedAt: "Jun 25", status: "pending",   firstCampaign: undefined,              bonus: 75,  bonusPaid: false },
  { id: "r5", name: "Sophie Laurent",  initials: "SL", tone: "orange", joinedAt: "Jun 28", status: "approved",  firstCampaign: "Luminos Festival",     bonus: 75,  bonusPaid: false },
];

const STATUS_META: Record<ReferralStatus, { label: string; tone: keyof typeof TONES }> = {
  approved: { label: "Approved",        tone: "green"  },
  pending:  { label: "Pending review",  tone: "yellow" },
  rejected: { label: "Not eligible",    tone: "red"    },
};

const REFERRAL_LINK = "superdeal.io/join?ref=priya_nair_xk7";

/* ---- Demo ---- */
function Demo() {
  const [copied,   setCopied]   = useState(false);
  const [email,    setEmail]    = useState("");
  const [inviting, setInviting] = useState(false);
  const [invited,  setInvited]  = useState(false);
  const [tab,      setTab]      = useState<"activity" | "leaderboard">("activity");

  function copyLink() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function sendInvite() {
    if (!email.trim()) return;
    setInviting(true);
    setTimeout(() => { setInviting(false); setInvited(true); setEmail(""); setTimeout(() => setInvited(false), 2500); }, 900);
  }

  const totalReferrals = REFERRALS.length;
  const approved       = REFERRALS.filter((r) => r.status === "approved").length;
  const pending        = REFERRALS.filter((r) => r.status === "pending").length;
  const earned         = REFERRALS.filter((r) => r.bonusPaid).reduce((s, r) => s + r.bonus, 0);
  const pending_earn   = REFERRALS.filter((r) => !r.bonusPaid && r.status === "approved").reduce((s, r) => s + r.bonus, 0);

  const LEADERBOARD = [
    { rank: 1, name: "Ji-ho Kim",    initials: "JK", tone: "blue"  as const, referrals: 12, earned: 900 },
    { rank: 2, name: "Amara Diallo", initials: "AD", tone: "green" as const, referrals: 9,  earned: 675 },
    { rank: 3, name: "Priya Nair",   initials: "PN", tone: "pink"  as const, referrals: 5,  earned: 375, isMe: true },
    { rank: 4, name: "Marcus Webb",  initials: "MW", tone: "gray"  as const, referrals: 3,  earned: 225 },
    { rank: 5, name: "Sofia Reyes",  initials: "SR", tone: "purple"as const, referrals: 2,  earned: 150 },
  ];

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: TONES.orange.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconGift size={18} style={{ color: TONES.orange.text }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Refer a creator</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Earn $75 for every creator you refer who completes their first campaign</div>
        </div>
      </div>

      {/* Stats tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 7, marginBottom: 14 }}>
        {[
          { label: "Total referred", value: totalReferrals, tone: "gray"   as const },
          { label: "Approved",       value: approved,       tone: "green"  as const },
          { label: "Pending",        value: pending,        tone: "yellow" as const },
          { label: "Earned",         value: `$${earned}`,   tone: "orange" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "9px 10px", background: TONES[tone].tint, borderRadius: 9 }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.8 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Pending earnings note */}
      {pending_earn > 0 && (
        <div style={{ display: "flex", gap: 8, padding: "8px 12px", background: TONES.green.tint, borderRadius: 9, marginBottom: 14, alignItems: "center" }}>
          <IconCurrencyDollar size={13} style={{ color: TONES.green.text, flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: TONES.green.text, fontWeight: 700 }}>
            ${pending_earn} pending — Sophie Laurent's campaign just ended, payout in 3–5 days.
          </div>
        </div>
      )}

      {/* Referral link */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Your referral link</div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{ flex: 1, padding: "8px 12px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 9, fontSize: 11, fontFamily: "monospace", color: "var(--sd-font-secondary,#555)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {REFERRAL_LINK}
          </div>
          <Button variant="secondary" size="sm" leftIcon={copied ? <IconCheck size={11} /> : <IconCopy size={11} />} onClick={copyLink}>
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconShare size={11} />}>Share</Button>
        </div>
      </div>

      {/* Email invite */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Invite by email</div>
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "7px 12px" }}>
            <IconMail size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="friend@email.com"
              style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }} />
          </div>
          <Button variant="primary" size="sm" leftIcon={invited ? <IconCheck size={11} /> : <IconSend size={11} />} onClick={sendInvite} disabled={!email.trim() || inviting}>
            {invited ? "Sent!" : inviting ? "Sending…" : "Invite"}
          </Button>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {(["activity","leaderboard"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: "6px", borderRadius: 8, background: tab === t ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: tab === t ? "#fff" : "var(--sd-font-secondary,#555)", textTransform: "capitalize" }}>
            {t === "activity" ? "My referrals" : "Leaderboard"}
          </button>
        ))}
      </div>

      {/* Activity tab */}
      {tab === "activity" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {REFERRALS.map((r) => {
            const { label, tone } = STATUS_META[r.status];
            return (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
                <Avatar initials={r.initials} tone={r.tone} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
                    Joined {r.joinedAt}{r.firstCampaign ? ` · ${r.firstCampaign}` : ""}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <Badge label={label} tone={tone} size="sm" dot />
                  <div style={{ fontSize: 10, marginTop: 3, fontWeight: 700, color: r.bonusPaid ? TONES.green.text : r.status === "approved" ? TONES.orange.text : "var(--sd-font-tertiary,#999)" }}>
                    {r.bonusPaid ? `+$${r.bonus} paid` : r.status === "approved" ? `+$${r.bonus} pending` : "Bonus locked"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard tab */}
      {tab === "leaderboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {LEADERBOARD.map((entry) => (
            <div key={entry.rank} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", border: `1.5px solid ${entry.isMe ? TONES.orange.text + "60" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 10, background: entry.isMe ? TONES.orange.tint : "transparent" }}>
              <div style={{ width: 22, textAlign: "center", flexShrink: 0 }}>
                {entry.rank === 1
                  ? <IconTrophy size={14} style={{ color: "#f59e0b" }} />
                  : <span style={{ fontSize: 11, fontWeight: 800, color: "var(--sd-font-tertiary,#999)" }}>#{entry.rank}</span>}
              </div>
              <Avatar initials={entry.initials} tone={entry.tone} size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{entry.name}{entry.isMe && " (you)"}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{entry.referrals} referrals</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 900, color: TONES.green.text }}>${entry.earned}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-referral-program",
  title: "CreatorReferralProgram",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator referral dashboard — unique link with copy/share, email invite input, stats tiles (total/approved/pending/earned), referral activity list with bonus states, and leaderboard tab.",
  description:
    "Creator's referral program hub. Header: gift icon, headline + $75 per completed-campaign bonus explained. 4 stat tiles: total referred (5), approved (3), pending (2), earned ($150 — in orange TONES). Pending-earnings callout (green: Sophie Laurent's $75 pending payout). Referral link: monospace display box + Copy (2s 'Copied!' confirmation) + Share. Email invite: mail icon input + Invite button → 'Sending…' → 'Sent!' 2.5s. Tab switcher — 'My referrals' | 'Leaderboard'. My referrals: 5 rows each with avatar, name, joined date + first campaign if approved, status badge (Approved/Pending review), bonus status (paid green / pending orange / locked gray). Leaderboard: 5 creators ranked with trophy icon for #1, avatar, name, referral count, earned amount; current user (Priya Nair, #3) highlighted in orange tint border. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator referral program",
      description: "Click Copy to grab your link (confirmation 2s). Type an email and click Invite. Switch between 'My referrals' and 'Leaderboard' tabs.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
