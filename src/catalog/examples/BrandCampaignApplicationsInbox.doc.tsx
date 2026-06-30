"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconBookmark,
  IconSearch,
  IconBrandInstagram,
  IconBrandTiktok,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type AppStatus = "pending" | "shortlisted" | "rejected";

interface Applicant {
  id: string;
  name: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple";
  niche: string;
  tier: string;
  tierTone: keyof typeof TONES;
  igFollowers?: string;
  ttFollowers?: string;
  er: number;
  rate: string;
  note: string;
  status: AppStatus;
  appliedAt: string;
}

const INITIAL: Applicant[] = [
  { id: "a1", name: "Zoe Chen",      initials: "ZC", tone: "pink",   niche: "Clean beauty",       tier: "Micro",  tierTone: "blue",   igFollowers: "62K",  ttFollowers: "41K",  er: 7.4, rate: "$1,100–$1,600", note: "Love the Luminos concept — my audience is 80% clean beauty enthusiasts. Would love to create a dedicated Reel!",            status: "shortlisted", appliedAt: "Jun 5"  },
  { id: "a2", name: "Arjun Mehta",   initials: "AM", tone: "blue",   niche: "Men's skincare",      tier: "Micro",  tierTone: "blue",   igFollowers: "48K",  ttFollowers: undefined, er: 5.1, rate: "$900–$1,300",  note: "Interested in the skincare angle from a male perspective — underserved content lane.",                                    status: "pending",     appliedAt: "Jun 6"  },
  { id: "a3", name: "Clara Novak",   initials: "CN", tone: "purple", niche: "Sustainable beauty",  tier: "Nano",   tierTone: "green",  igFollowers: "9K",   ttFollowers: "15K",  er: 11.2, rate: "$300–$500",    note: "Super engaged community — my 11% ER means every post gets real traction. Happy to do 2 Reels + stories!",                status: "pending",     appliedAt: "Jun 7"  },
  { id: "a4", name: "Tomás García",  initials: "TG", tone: "orange", niche: "Lifestyle & wellness", tier: "Mid",    tierTone: "purple", igFollowers: "115K", ttFollowers: "72K",  er: 4.2, rate: "$2,000–$3,200", note: "Working on a wellness series in July — this campaign fits perfectly.",                                                     status: "rejected",    appliedAt: "Jun 7"  },
  { id: "a5", name: "Mei Lin",       initials: "ML", tone: "green",  niche: "K-beauty & skincare", tier: "Micro",  tierTone: "blue",   igFollowers: "71K",  ttFollowers: "53K",  er: 8.1, rate: "$1,300–$1,800", note: "Big fan of Aura Labs products — already use Luminos daily. Authentic fit.",                                               status: "pending",     appliedAt: "Jun 8"  },
];

const TABS: { key: "all" | AppStatus; label: string }[] = [
  { key: "all",         label: "All"         },
  { key: "pending",     label: "Pending"     },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "rejected",    label: "Rejected"    },
];

function Demo() {
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL);
  const [tab,        setTab]        = useState<"all" | AppStatus>("all");
  const [query,      setQuery]      = useState("");
  const [expanded,   setExpanded]   = useState<string | null>("a1");

  function setStatus(id: string, status: AppStatus) {
    setApplicants((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  }

  const counts: Record<string, number> = {
    all: applicants.length,
    pending: applicants.filter((a) => a.status === "pending").length,
    shortlisted: applicants.filter((a) => a.status === "shortlisted").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
  };

  const visible = applicants.filter((a) => {
    if (tab !== "all" && a.status !== tab) return false;
    if (query && !a.name.toLowerCase().includes(query.toLowerCase()) && !a.niche.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Applications</div>
          <Badge label={`${applicants.length} total`} tone="blue" size="sm" />
          {counts.shortlisted > 0 && <Badge label={`${counts.shortlisted} shortlisted`} tone="green" size="sm" />}
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · Aura Labs</div>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "7px 11px", marginBottom: 10 }}>
        <IconSearch size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applicants…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 11, fontFamily: "inherit" }} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 12, borderBottom: "1px solid var(--sd-border-default,#e5e7eb)" }}>
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ display: "flex", gap: 5, alignItems: "center", padding: "8px 12px", border: "none", borderBottom: `2px solid ${tab === t.key ? "#111" : "transparent"}`, background: "transparent", cursor: "pointer", fontSize: 11, fontWeight: tab === t.key ? 800 : 500, color: tab === t.key ? "#111" : "var(--sd-font-tertiary,#999)", marginBottom: -1 }}>
            {t.label}
            {counts[t.key] > 0 && (
              <span style={{ width: 16, height: 16, borderRadius: 99, background: tab === t.key ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", fontSize: 9, fontWeight: 800, color: tab === t.key ? "#fff" : "var(--sd-font-tertiary,#999)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {counts[t.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Applicant cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.map((a) => {
          const isOpen = expanded === a.id;
          return (
            <div key={a.id} style={{ border: `1.5px solid ${a.status === "shortlisted" ? TONES.green.text + "50" : a.status === "rejected" ? "var(--sd-border-default,#f1f1f1)" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 11, overflow: "hidden", opacity: a.status === "rejected" ? 0.6 : 1 }}>
              {/* Summary row */}
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px" }}>
                <Avatar initials={a.initials} tone={a.tone} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 1 }}>
                    <span style={{ fontSize: 11, fontWeight: 800 }}>{a.name}</span>
                    <Badge label={a.tier} tone={a.tierTone} size="sm" />
                    {a.status === "shortlisted" && <Badge label="Shortlisted" tone="green" size="sm" />}
                    {a.status === "rejected"    && <Badge label="Rejected"    tone="gray"  size="sm" />}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{a.niche} · {a.er}% ER · {a.rate}</div>
                </div>
                <button onClick={() => setExpanded(isOpen ? null : a.id)}
                  style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isOpen ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />}
                </button>
              </div>

              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "10px 12px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {/* Stats */}
                  <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
                    {a.igFollowers && (
                      <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 8px", background: TONES.pink.tint, borderRadius: 7 }}>
                        <IconBrandInstagram size={11} style={{ color: TONES.pink.text }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: TONES.pink.text }}>{a.igFollowers}</span>
                      </div>
                    )}
                    {a.ttFollowers && (
                      <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 8px", background: TONES.blue.tint, borderRadius: 7 }}>
                        <IconBrandTiktok size={11} style={{ color: TONES.blue.text }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: TONES.blue.text }}>{a.ttFollowers}</span>
                      </div>
                    )}
                    <div style={{ padding: "4px 8px", background: TONES.green.tint, borderRadius: 7 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: TONES.green.text }}>{a.er}% ER</span>
                    </div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", alignSelf: "center", marginLeft: "auto" }}>Applied {a.appliedAt}</div>
                  </div>
                  {/* Note */}
                  <div style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)", fontStyle: "italic", lineHeight: 1.5, marginBottom: 10 }}>"{a.note}"</div>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: 6 }}>
                    {a.status !== "shortlisted" && (
                      <Button variant="primary" size="sm" leftIcon={<IconBookmark size={11} />}
                        onClick={() => setStatus(a.id, "shortlisted")} style={{ flex: 1 }}>
                        Shortlist
                      </Button>
                    )}
                    {a.status === "shortlisted" && (
                      <Button variant="secondary" size="sm" leftIcon={<IconCheck size={11} />}
                        onClick={() => setStatus(a.id, "pending")} style={{ flex: 1 }}>
                        Remove from shortlist
                      </Button>
                    )}
                    {a.status !== "rejected" && (
                      <button onClick={() => setStatus(a.id, "rejected")}
                        style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconX size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {visible.length === 0 && (
          <div style={{ padding: "28px", textAlign: "center", color: "var(--sd-font-tertiary,#999)", fontSize: 11 }}>
            No applications match your filter.
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-campaign-applications-inbox",
  title: "BrandCampaignApplicationsInbox",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand's incoming creator applications inbox — search, 4 filter tabs (All/Pending/Shortlisted/Rejected) with counts, expandable applicant cards with stats + note + Shortlist/Reject actions.",
  description:
    "Brand reviews creator applications to an open campaign. Header: 'Applications' + total count badge + shortlisted count badge, campaign + brand name. Search by name or niche. 4 underline tabs (All / Pending / Shortlisted / Rejected) each with count pill; active tab has #111 underline. Expandable applicant cards: summary row — Avatar sm, name, tier badge, status badge when shortlisted/rejected, niche + ER + rate, expand chevron. Expanded (tinted bg): IG pink + TikTok blue stat tiles (only present platforms), ER green tile, applied date; italic application note in quotes; Shortlist primary CTA + X reject. Shortlisted → 'Remove from shortlist' secondary replaces Shortlist; status badge appears in row. Rejected → card dims to 60% opacity, X hidden. All status changes are live without reload. 5 applicants: Zoe Chen (pre-shortlisted, pre-expanded), Arjun/Clara/Mei Lin (pending), Tomás García (pre-rejected). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign applications inbox",
      description: "Expand applicant cards to see stats and application notes. Shortlist or reject candidates. Use tabs to filter by status. Search by name or niche.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
