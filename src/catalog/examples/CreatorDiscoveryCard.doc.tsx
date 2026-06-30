"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBookmark,
  IconBookmarkFilled,
  IconStar,
  IconUsers,
  IconTrendingUp,
  IconSparkles,
  IconShieldCheck,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface DiscoveryCreator {
  id: string;
  name: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple" | "turquoise";
  niche: string;
  secondaryNiche: string;
  tier: string;
  tierTone: keyof typeof TONES;
  igFollowers: string;
  ttFollowers?: string;
  ytSubs?: string;
  er: number;
  avgViews: string;
  rateMin: number;
  rateMax: number;
  audienceAge: string;
  audienceFemale: number;
  verified: boolean;
  topBrands: string[];
  bio: string;
}

const CREATORS: DiscoveryCreator[] = [
  {
    id: "c1",
    name: "Priya Nair",
    initials: "PN",
    tone: "pink",
    niche: "Clean beauty",
    secondaryNiche: "Skincare",
    tier: "Micro",
    tierTone: "blue",
    igFollowers: "71K",
    ttFollowers: "43K",
    ytSubs: undefined,
    er: 9.2,
    avgViews: "38K",
    rateMin: 1400,
    rateMax: 2000,
    audienceAge: "25–34",
    audienceFemale: 87,
    verified: true,
    topBrands: ["Aura Labs", "Glow Lab", "Satin & Co"],
    bio: "Clean beauty obsessive. Honest reviews, no fluff. Skincare + GRWM Reels every week.",
  },
  {
    id: "c2",
    name: "Ji-ho Kim",
    initials: "JK",
    tone: "blue",
    niche: "K-beauty",
    secondaryNiche: "Skincare routines",
    tier: "Micro",
    tierTone: "blue",
    igFollowers: "88K",
    ttFollowers: "61K",
    ytSubs: undefined,
    er: 7.4,
    avgViews: "47K",
    rateMin: 1200,
    rateMax: 1700,
    audienceAge: "18–28",
    audienceFemale: 79,
    verified: false,
    topBrands: ["Innisfree", "COSRX", "Klairs"],
    bio: "K-beauty translator. I test everything so you don't have to. 7-step routine or nothing.",
  },
  {
    id: "c3",
    name: "Marcus Webb",
    initials: "MW",
    tone: "green",
    niche: "Fitness",
    secondaryNiche: "Lifestyle",
    tier: "Micro",
    tierTone: "blue",
    igFollowers: "62K",
    ttFollowers: undefined,
    ytSubs: "19K",
    er: 6.8,
    avgViews: "34K",
    rateMin: 1300,
    rateMax: 1900,
    audienceAge: "24–35",
    audienceFemale: 42,
    verified: true,
    topBrands: ["Gymshark", "Athletic Greens"],
    bio: "Morning routine + fitness content. Practical tips for busy people who still want to show up.",
  },
];

function CreatorCardExpanded({ c, saved, onSave, onInvite, invited }: {
  c: DiscoveryCreator;
  saved: boolean;
  onSave: () => void;
  onInvite: () => void;
  invited: boolean;
}) {
  return (
    <div style={{ border: "1.5px solid var(--sd-border-default,#e5e7eb)", borderRadius: 14, overflow: "hidden" }}>
      {/* Header band */}
      <div style={{ height: 44, background: `linear-gradient(135deg, ${TONES[c.tone].tint}, ${TONES[c.tierTone].tint})`, position: "relative" }}>
        <button onClick={onSave}
          style={{ position: "absolute", top: 8, right: 10, width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {saved
            ? <IconBookmarkFilled size={14} style={{ color: TONES.orange.text }} />
            : <IconBookmark size={14} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
        </button>
      </div>

      <div style={{ padding: "0 14px 14px", position: "relative" }}>
        {/* Avatar overlapping header */}
        <div style={{ marginTop: -22, marginBottom: 8, display: "flex", alignItems: "flex-end", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <Avatar initials={c.initials} tone={c.tone} size="lg" />
            {c.verified && (
              <div style={{ position: "absolute", bottom: 0, right: -2, width: 16, height: 16, borderRadius: 99, background: TONES.blue.text, border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconShieldCheck size={9} style={{ color: "#fff" }} />
              </div>
            )}
          </div>
          <div style={{ paddingBottom: 2 }}>
            <div style={{ fontSize: 13, fontWeight: 900 }}>{c.name}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 2, flexWrap: "wrap" }}>
              <Badge label={c.tier} tone={c.tierTone} size="sm" />
              <Badge label={c.niche} tone={c.tone as keyof typeof TONES} size="sm" />
              {c.secondaryNiche && <Badge label={c.secondaryNiche} tone="gray" size="sm" />}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)", lineHeight: 1.5, margin: "0 0 12px" }}>{c.bio}</p>

        {/* Platform stats */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          {c.igFollowers && (
            <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "5px 9px", background: TONES.pink.tint, borderRadius: 8 }}>
              <IconBrandInstagram size={12} style={{ color: TONES.pink.text }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: TONES.pink.text }}>{c.igFollowers}</span>
            </div>
          )}
          {c.ttFollowers && (
            <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "5px 9px", background: TONES.blue.tint, borderRadius: 8 }}>
              <IconBrandTiktok size={12} style={{ color: TONES.blue.text }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: TONES.blue.text }}>{c.ttFollowers}</span>
            </div>
          )}
          {c.ytSubs && (
            <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "5px 9px", background: TONES.red.tint, borderRadius: 8 }}>
              <IconBrandYoutube size={12} style={{ color: TONES.red.text }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: TONES.red.text }}>{c.ytSubs}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "5px 9px", background: TONES.green.tint, borderRadius: 8 }}>
            <IconTrendingUp size={12} style={{ color: TONES.green.text }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: TONES.green.text }}>{c.er}% ER</span>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "5px 9px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 8 }}>
            <IconUsers size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
            <span style={{ fontSize: 11, color: "var(--sd-font-secondary,#555)" }}>{c.avgViews} avg</span>
          </div>
        </div>

        {/* Audience + rate */}
        <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
          <div style={{ flex: 1, padding: "8px 10px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 9 }}>
            <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginBottom: 2 }}>Audience</div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>{c.audienceAge} · {c.audienceFemale}% F</div>
          </div>
          <div style={{ flex: 1, padding: "8px 10px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 9 }}>
            <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginBottom: 2 }}>Rate range</div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>${c.rateMin.toLocaleString()}–${c.rateMax.toLocaleString()}</div>
          </div>
        </div>

        {/* Past brands */}
        {c.topBrands.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Past brands</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {c.topBrands.map((b) => (
                <span key={b} style={{ padding: "3px 8px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 6, fontSize: 10, fontWeight: 600, color: "var(--sd-font-secondary,#555)" }}>{b}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <Button variant="primary" size="sm" leftIcon={invited ? undefined : <IconSparkles size={11} />}
          onClick={onInvite} disabled={invited} style={{ width: "100%" }}>
          {invited ? "Invite sent!" : "Invite to campaign"}
        </Button>
      </div>
    </div>
  );
}

function Demo() {
  const [saved,    setSaved]    = useState<Set<string>>(new Set(["c1"]));
  const [invited,  setInvited]  = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSave(id: string) {
    setSaved((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function invite(id: string) {
    setInvited((p) => new Set([...p, id]));
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>Creator results</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>23 creators match · Clean beauty + Skincare · IG + TikTok</div>
      </div>

      {/* Card grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CREATORS.map((c) => {
          const isExpanded = expanded === c.id;
          if (isExpanded) {
            return (
              <div key={c.id}>
                <CreatorCardExpanded
                  c={c}
                  saved={saved.has(c.id)}
                  invited={invited.has(c.id)}
                  onSave={() => toggleSave(c.id)}
                  onInvite={() => invite(c.id)}
                />
                <button onClick={() => setExpanded(null)}
                  style={{ width: "100%", marginTop: 4, display: "flex", gap: 4, alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--sd-font-tertiary,#999)", background: "none", border: "none", cursor: "pointer" }}>
                  <IconChevronUp size={11} /> Show less
                </button>
              </div>
            );
          }
          return (
            <div key={c.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, padding: "11px 13px", display: "flex", gap: 11, alignItems: "center" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Avatar initials={c.initials} tone={c.tone} size="md" />
                {c.verified && (
                  <div style={{ position: "absolute", bottom: -1, right: -3, width: 14, height: 14, borderRadius: 99, background: TONES.blue.text, border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconShieldCheck size={8} style={{ color: "#fff" }} />
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 800 }}>{c.name}</span>
                  <Badge label={c.tier} tone={c.tierTone} size="sm" />
                </div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 4 }}>{c.niche} · {c.igFollowers}{c.ttFollowers ? ` + ${c.ttFollowers}` : ""}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: TONES.green.text, background: TONES.green.tint, padding: "2px 6px", borderRadius: 5 }}>{c.er}% ER</span>
                  <span style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)", background: "var(--sd-bg-secondary,#f4f4f5)", padding: "2px 6px", borderRadius: 5 }}>${c.rateMin.toLocaleString()}+</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
                <button onClick={() => toggleSave(c.id)}
                  style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {saved.has(c.id)
                    ? <IconBookmarkFilled size={13} style={{ color: TONES.orange.text }} />
                    : <IconBookmark size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
                </button>
                <button onClick={() => setExpanded(c.id)}
                  style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-discovery-card",
  title: "CreatorDiscoveryCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand-facing creator discovery list — compact row cards with Avatar, tier badge, ER + rate chips, Save bookmark, and expand chevron; expanded state shows full profile with platform stats, audience, past brands, and Invite CTA.",
  description:
    "Brand browses filtered creator results. Header: result count + active filter summary. Creator list: compact row per creator — Avatar md with optional verified shield badge (blue), name, tier badge, niche + follower counts, ER green chip, rate-from chip, Save bookmark (orange filled when saved), expand chevron. Expand → full profile card: gradient header band (tone-tinted), Avatar lg with verified badge overlapping, name, tier + niche + secondary-niche badges. Bio paragraph. Platform stat tiles (IG pink / TikTok blue / YouTube red — only present platforms) + ER green tile + avg-views gray tile. Audience age + female-% tile + rate range tile. Past brands chip list. 'Invite to campaign' primary CTA → 'Invite sent!' after click. Collapse button below card. Pre-seeded: 3 creators (Priya Nair / Ji-ho Kim / Marcus Webb) representing clean-beauty, K-beauty, and fitness. Priya pre-saved, all others unsaved. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator discovery results",
      description: "Click the expand chevron to see a creator's full profile. Save creators with the bookmark. Invite from the expanded card. Priya Nair is pre-saved.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
