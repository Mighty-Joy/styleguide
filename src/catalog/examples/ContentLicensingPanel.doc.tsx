"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconDownload,
  IconCheck,
  IconShield,
  IconShieldCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconChevronDown,
  IconChevronUp,
  IconAlertCircle,
  IconPhoto,
  IconVideo,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type Platform = "instagram" | "tiktok";
type UsageRight = "organic" | "paid_media" | "email" | "ooh";
type RightsDuration = "30 days" | "90 days" | "1 year" | "Perpetual";

interface Post {
  id: string;
  creator: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple";
  platform: Platform;
  type: "reel" | "story" | "ugc";
  emoji: string;
  caption: string;
  licensed: boolean;
  duration: RightsDuration;
  rights: UsageRight[];
  paidMedia: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: "p1", creator: "Priya Nair",   initials: "PN", tone: "pink",   platform: "instagram", type: "reel",  emoji: "🌿",
    caption: "\"This glow serum changed my morning routine…\"",
    licensed: true,  duration: "90 days",  rights: ["organic","paid_media"], paidMedia: true,
  },
  {
    id: "p2", creator: "Sofia Reyes",  initials: "SR", tone: "purple", platform: "tiktok",    type: "ugc",   emoji: "✨",
    caption: "\"Honest 30-day review of Aura Labs Luminos\"",
    licensed: true,  duration: "1 year",   rights: ["organic"], paidMedia: false,
  },
  {
    id: "p3", creator: "Marcus Webb",  initials: "MW", tone: "orange", platform: "instagram", type: "reel",  emoji: "💪",
    caption: "\"My go-to pre-workout skincare stack…\"",
    licensed: false, duration: "30 days",  rights: [], paidMedia: false,
  },
  {
    id: "p4", creator: "Ji-ho Kim",    initials: "JK", tone: "blue",   platform: "instagram", type: "story", emoji: "🎀",
    caption: "\"5-step routine ft. @AuraLabs (gifted)\"",
    licensed: false, duration: "30 days",  rights: [], paidMedia: false,
  },
];

const USAGE_LABELS: Record<UsageRight, string> = {
  organic:    "Organic social",
  paid_media: "Paid media",
  email:      "Email marketing",
  ooh:        "Out-of-home",
};
const USAGE_TONES: Record<UsageRight, keyof typeof TONES> = {
  organic:    "blue",
  paid_media: "orange",
  email:      "purple",
  ooh:        "green",
};

const DURATIONS: RightsDuration[] = ["30 days", "90 days", "1 year", "Perpetual"];

function Demo() {
  const [posts,     setPosts]    = useState<Post[]>(INITIAL_POSTS);
  const [expanded,  setExpanded] = useState<string | null>("p3");
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const [batching,   setBatching]   = useState(false);
  const [batched,    setBatched]    = useState(false);

  function toggleRight(id: string, right: UsageRight) {
    setPosts((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const cur = p.rights;
      return { ...p, rights: cur.includes(right) ? cur.filter((r) => r !== right) : [...cur, right] };
    }));
  }

  function setDuration(id: string, dur: RightsDuration) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, duration: dur } : p));
  }

  function togglePaidMedia(id: string) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, paidMedia: !p.paidMedia } : p));
  }

  function license(id: string) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, licensed: true } : p));
    setExpanded(null);
  }

  function download(id: string) {
    setDownloaded(id);
    setTimeout(() => setDownloaded(null), 2000);
  }

  function batchLicense() {
    setBatching(true);
    setTimeout(() => {
      setPosts((prev) => prev.map((p) => ({ ...p, licensed: true, rights: p.rights.length ? p.rights : ["organic"], duration: p.duration === "30 days" ? "90 days" : p.duration })));
      setBatching(false);
      setBatched(true);
    }, 900);
  }

  const unlicensedCount = posts.filter((p) => !p.licensed).length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Content licensing</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Manage usage rights for Summer Glow Campaign</div>
        </div>
        {unlicensedCount > 0 && !batched && (
          <Badge label={`${unlicensedCount} unlicensed`} tone="yellow" size="sm" dot />
        )}
        {batched && <Badge label="All licensed" tone="green" size="sm" dot />}
      </div>

      {unlicensedCount > 0 && !batched && (
        <button onClick={batchLicense} disabled={batching}
          style={{ width: "100%", display: "flex", gap: 8, alignItems: "center", padding: "9px 13px", background: TONES.orange.tint, border: `1px solid ${TONES.orange.text}40`, borderRadius: 10, cursor: "pointer", marginBottom: 12, textAlign: "left" }}>
          <IconShield size={13} style={{ color: TONES.orange.text, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: TONES.orange.text }}>License all {unlicensedCount} pending posts</div>
            <div style={{ fontSize: 10, color: TONES.orange.text, opacity: 0.75 }}>Grant organic rights for 90 days to all unlicensed content</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: TONES.orange.text }}>{batching ? "Licensing…" : "License all"}</span>
        </button>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {posts.map((post) => {
          const isOpen = expanded === post.id;
          const PlatformIcon = post.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const platformTone = post.platform === "instagram" ? TONES.pink : TONES.blue;

          return (
            <div key={post.id} style={{ border: `1.5px solid ${post.licensed ? TONES.green.text + "40" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setExpanded(isOpen ? null : post.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: "white", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {post.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
                    <Avatar initials={post.initials} tone={post.tone} size="sm" />
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{post.creator}</span>
                    <PlatformIcon size={11} style={{ color: platformTone.text }} />
                    <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: 0.4 }}>{post.type}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption}</div>
                </div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
                  {post.licensed
                    ? <Badge label="Licensed" tone="green" size="sm" />
                    : <Badge label="Unlicensed" tone="yellow" size="sm" />}
                  {isOpen ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />}
                </div>
              </button>

              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "11px 13px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6 }}>Usage rights</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {(Object.keys(USAGE_LABELS) as UsageRight[]).map((right) => {
                        const active = post.rights.includes(right);
                        const tone = USAGE_TONES[right];
                        return (
                          <button key={right} onClick={() => toggleRight(post.id, right)}
                            style={{ padding: "4px 9px", borderRadius: 7, background: active ? TONES[tone].tint : "var(--sd-bg-tertiary,#f1f1f1)", border: `1.5px solid ${active ? TONES[tone].text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? TONES[tone].text : "var(--sd-font-tertiary,#999)", cursor: "pointer" }}>
                            {USAGE_LABELS[right]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6 }}>Rights duration</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {DURATIONS.map((d) => (
                        <button key={d} onClick={() => setDuration(post.id, d)}
                          style={{ padding: "4px 9px", borderRadius: 7, background: post.duration === d ? TONES.blue.tint : "var(--sd-bg-tertiary,#f1f1f1)", border: `1.5px solid ${post.duration === d ? TONES.blue.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: post.duration === d ? 700 : 500, color: post.duration === d ? TONES.blue.text : "var(--sd-font-tertiary,#999)", cursor: "pointer" }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 0", borderTop: "1px solid var(--sd-border-default,#e5e7eb)", marginBottom: 10 }}>
                    <button onClick={() => togglePaidMedia(post.id)}
                      style={{ width: 34, height: 20, borderRadius: 10, background: post.paidMedia ? TONES.orange.text : "var(--sd-bg-tertiary,#e5e7eb)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 2, left: post.paidMedia ? 16 : 2, transition: "left 0.2s" }} />
                    </button>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700 }}>Paid media authorization</div>
                      <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>Allow this content in paid ad campaigns</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 7 }}>
                    {!post.licensed && (
                      <Button variant="primary" size="sm" leftIcon={<IconShieldCheck size={11} />}
                        onClick={() => license(post.id)} disabled={post.rights.length === 0} style={{ flex: 1 }}>
                        {post.rights.length === 0 ? "Select at least one right" : "License this content"}
                      </Button>
                    )}
                    {post.licensed && (
                      <Button variant="secondary" size="sm" leftIcon={downloaded === post.id ? <IconCheck size={11} /> : <IconDownload size={11} />}
                        onClick={() => download(post.id)} style={{ flex: 1 }}>
                        {downloaded === post.id ? "Downloaded!" : "Download licensed file"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "content-licensing-panel",
  title: "ContentLicensingPanel",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "UGC rights manager for a campaign — 4 post cards with licensed/unlicensed badges, expandable usage-right chips, duration selector, paid-media toggle, per-post license CTA, and batch-license-all banner.",
  description:
    "Brand manages usage rights for all content submitted to a campaign. Header: title, 'N unlicensed' yellow dot badge. Orange batch-license banner with 'License all N pending posts' CTA → 900ms → marks all licensed + upgrades 30-day rights to 90-day default. 4 post cards: emoji thumbnail (38×38 rounded), creator Avatar sm + name, platform icon (IG pink / TikTok blue), content type label (reel/story/ugc), caption preview, Licensed green / Unlicensed yellow badge, expand chevron. Expanded panel: Usage rights 4-chip multi-select (Organic social blue / Paid media orange / Email marketing purple / Out-of-home green) — tinted+bold when active, togglable. Rights duration chips (30d / 90d / 1yr / Perpetual) in blue tint. Paid media authorization toggle (orange on = authorized). License CTA primary — disabled with hint text when no right selected; on click marks licensed, collapses. Licensed post shows Download licensed file secondary → 2s 'Downloaded!'. Priya (licensed, 90d, paid OK) and Sofia (licensed, 1yr) pre-licensed; Marcus and Ji-ho unlicensed with Ji-ho pre-expanded. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Content licensing panel",
      description: "Expand unlicensed posts, pick usage rights, set duration, toggle paid media, then click License. Use 'License all' banner for batch approval. Licensed posts show Download instead.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
