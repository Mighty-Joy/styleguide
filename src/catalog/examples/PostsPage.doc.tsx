"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type Platform   = "Instagram" | "TikTok" | "YouTube";
type PostStatus = "Live" | "Scheduled" | "Draft" | "Pending approval";

type Post = {
  id:        number;
  creator:   string;
  initials:  string;
  handle:    string;
  platform:  Platform;
  type:      string;
  campaign:  string;
  caption:   string;
  status:    PostStatus;
  postedAt:  string;
  views:     string;
  likes:     string;
  comments:  string;
  reach:     string;
};

/* ── seed ───────────────────────────────────────────────── */
const POSTS: Post[] = [
  {
    id: 1, creator: "Priya Nair",  initials: "PN", handle: "@priya.glows",    platform: "Instagram", type: "Reel",
    campaign: "Summer Glow",    caption: "My morning glow routine with @auralabs ☀️✨ #summerglow #skincare",
    status: "Live",              postedAt: "Jun 28",  views: "142K", likes: "8.4K", comments: "312", reach: "98K",
  },
  {
    id: 2, creator: "Leo Park",    initials: "LP", handle: "@leopark.ttk",    platform: "TikTok",    type: "Video",
    campaign: "Summer Glow",    caption: "POV: you tried the Summer Glow serum and it's actually everything 😭",
    status: "Live",              postedAt: "Jun 25",  views: "318K", likes: "21K", comments: "1.2K", reach: "204K",
  },
  {
    id: 3, creator: "Maya Chen",   initials: "MC", handle: "@mayabeautyco",   platform: "Instagram", type: "Story",
    campaign: "Summer Glow",    caption: "Trying the new Aura Labs routine — swipe to see the before/after!",
    status: "Live",              postedAt: "Jun 22",  views: "89K",  likes: "3.1K", comments: "89",  reach: "71K",
  },
  {
    id: 4, creator: "Sofia Ruiz",  initials: "SR", handle: "@sofiaruizbeauty", platform: "Instagram", type: "Post",
    campaign: "Summer Glow",    caption: "Summer skin goals — the Aura Labs glow is real ✨",
    status: "Pending approval",  postedAt: "—",       views: "—",    likes: "—",    comments: "—",   reach: "—",
  },
  {
    id: 5, creator: "Amir Hassan", initials: "AH", handle: "@amirh.creates",  platform: "YouTube",   type: "Review",
    campaign: "Summer Glow",    caption: "Honest Review: Aura Labs Summer Glow Serum — 30 Day Results",
    status: "Scheduled",         postedAt: "Jul 5",   views: "—",    likes: "—",    comments: "—",   reach: "—",
  },
];

/* ── status config ──────────────────────────────────────── */
const STATUS_CFG: Record<PostStatus, { tone: string; icon: string }> = {
  "Live":             { tone: "green",  icon: "●" },
  "Scheduled":        { tone: "blue",   icon: "⏱" },
  "Draft":            { tone: "gray",   icon: "○" },
  "Pending approval": { tone: "orange", icon: "!" },
};

const PLATFORM_ICON: Record<Platform, string> = {
  Instagram: "📷",
  TikTok:    "🎵",
  YouTube:   "▶️",
};

/* ── PostRow ────────────────────────────────────────────── */
function PostRow({ post }: { post: Post }) {
  const cfg = STATUS_CFG[post.status];
  const isLive = post.status === "Live";

  return (
    <tr style={{ borderBottom: "1px solid var(--sd-border-default)" }}>
      {/* creator */}
      <td style={{ padding: "12px 16px", minWidth: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size="sm" name={post.creator} initials={post.initials} />
          <div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>
              {post.creator}
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
              {PLATFORM_ICON[post.platform]} {post.handle}
            </div>
          </div>
        </div>
      </td>

      {/* caption */}
      <td style={{ padding: "12px 16px", maxWidth: 260 }}>
        <div style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     12,
          color:        "var(--sd-font-secondary)",
          lineHeight:   "1.4",
          display:      "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow:     "hidden",
        }}>
          {post.caption}
        </div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 3 }}>
          {post.type} · {post.campaign}
        </div>
      </td>

      {/* status */}
      <td style={{ padding: "12px 12px", whiteSpace: "nowrap" }}>
        <Badge label={post.status} tone={cfg.tone as any} variant="solid" size="sm" />
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)", marginTop: 3 }}>
          {post.postedAt}
        </div>
      </td>

      {/* stats — only for live posts */}
      <td style={{ padding: "12px 12px", whiteSpace: "nowrap" }}>
        {isLive ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>
              👁 {post.views}
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
              ♥ {post.likes} · 💬 {post.comments}
            </div>
          </div>
        ) : (
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>—</span>
        )}
      </td>

      {/* reach */}
      <td style={{ padding: "12px 12px", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: isLive ? 600 : 400, color: isLive ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)" }}>
          {post.reach}
        </span>
      </td>

      {/* actions */}
      <td style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <Button variant="secondary" size="sm">View</Button>
          {post.status === "Pending approval" && (
            <Button variant="primary" size="sm">Approve</Button>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ── summary stats ──────────────────────────────────────── */
const STATS = [
  { label: "Total posts",  value: "5",    icon: "📄" },
  { label: "Live",         value: "3",    icon: "●"  },
  { label: "Total reach",  value: "373K", icon: "📡" },
  { label: "Total likes",  value: "32.5K",icon: "♥"  },
];

/* ── Demo ───────────────────────────────────────────────── */
function PostsPageDemo() {
  const [platformFilter, setPlatformFilter] = useState<Platform | "All">("All");
  const [statusFilter, setStatusFilter]     = useState<PostStatus | "All">("All");

  const visible = POSTS
    .filter(p => platformFilter === "All" || p.platform === platformFilter)
    .filter(p => statusFilter  === "All" || p.status   === statusFilter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--sd-border-default)", borderRadius: 10, overflow: "hidden" }}>
      {/* page header */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "14px 16px",
        background:     "var(--sd-bg-tertiary)",
        borderBottom:   "1px solid var(--sd-border-default)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>📲</span>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Posts
          </span>
          <span style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     11,
            fontWeight:   600,
            color:        "var(--sd-font-tertiary)",
            background:   "var(--sd-bg-secondary)",
            border:       "1px solid var(--sd-border-default)",
            borderRadius: 100,
            padding:      "1px 8px",
          }}>
            {visible.length}
          </span>
        </div>
        <Button variant="primary" size="sm">+ Add post</Button>
      </div>

      {/* stat bar */}
      <div style={{
        display:       "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderBottom:  "1px solid var(--sd-border-default)",
        background:    "var(--sd-bg-secondary)",
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding:     "12px 16px",
            borderRight: i < STATS.length - 1 ? "1px solid var(--sd-border-default)" : "none",
          }}>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 20, fontWeight: 700, color: "var(--sd-font-primary)", marginTop: 3 }}>
              {s.icon} {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* filter bar */}
      <div style={{
        display:      "flex",
        gap:          8,
        padding:      "10px 16px",
        borderBottom: "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-tertiary)",
        flexWrap:     "wrap",
        alignItems:   "center",
      }}>
        {/* platform filter */}
        <div style={{ display: "flex", gap: 4 }}>
          {(["All", "Instagram", "TikTok", "YouTube"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   platformFilter === p ? 600 : 500,
                padding:      "4px 10px",
                borderRadius: 100,
                border:       `1px solid ${platformFilter === p ? "#6366F1" : "var(--sd-border-default)"}`,
                background:   platformFilter === p ? "#EEF2FF" : "transparent",
                color:        platformFilter === p ? "#6366F1" : "var(--sd-font-tertiary)",
                cursor:       "pointer",
              }}
            >
              {p === "All" ? "All platforms" : `${PLATFORM_ICON[p]} ${p}`}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 18, background: "var(--sd-border-default)" }} />

        {/* status filter */}
        <div style={{ display: "flex", gap: 4 }}>
          {(["All", "Live", "Pending approval", "Scheduled"] as const).map(s => {
            const active = statusFilter === s;
            const cfg = s !== "All" ? STATUS_CFG[s as PostStatus] : null;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  fontFamily:   "var(--sd-font)",
                  fontSize:     11,
                  fontWeight:   active ? 600 : 500,
                  padding:      "4px 10px",
                  borderRadius: 100,
                  border:       `1px solid ${active ? "var(--sd-font-tertiary)" : "var(--sd-border-default)"}`,
                  background:   active ? "var(--sd-bg-secondary)" : "transparent",
                  color:        active ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                  cursor:       "pointer",
                }}
              >
                {s === "All" ? "All statuses" : s}
              </button>
            );
          })}
        </div>
      </div>

      {/* table */}
      <div style={{ overflowX: "auto", background: "var(--sd-bg-secondary)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-tertiary)", borderBottom: "1px solid var(--sd-border-default)" }}>
              {["Creator", "Post", "Status", "Engagement", "Reach", ""].map(h => (
                <th key={h} style={{
                  padding:    "8px 12px",
                  fontFamily: "var(--sd-font)",
                  fontSize:   11,
                  fontWeight: 600,
                  color:      "var(--sd-font-tertiary)",
                  textAlign:  "left",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(p => <PostRow key={p.id} post={p} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "posts-page",
  title:       "Posts Page",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Campaign posts tracker — table of creator posts with live engagement stats, platform and status filters, and approval actions. Maps to PostTable.tsx.",
  description: "The Posts tab inside a campaign workspace. Shows all posts across creators with platform icon, post caption, type, status badge (Live / Scheduled / Pending approval / Draft), engagement stats (views, likes, comments), and reach. Filter by platform and status. Approve pending posts inline. Maps to PostTable.tsx in the app.",
  demos: [
    {
      title:   "Summer Glow Campaign — Posts",
      render:  () => <PostsPageDemo />,
      block:   true,
      plain:   true,
      maxWidth: 880,
    },
  ],
  props: [
    {
      rows: [
        { name: "posts",          type: "Post[]",         required: true,  description: "Array of post objects with creator, platform, caption, status, and engagement stats." },
        { name: "onApprove",      type: "(id: number) => void", required: false, description: "Approve a pending post." },
        { name: "onViewDetails",  type: "(id: number) => void", required: false, description: "Opens PostDetailsDrawer for the selected post." },
        { name: "platformFilter", type: "Platform | 'All'", required: false, description: "Active platform filter." },
        { name: "statusFilter",   type: "PostStatus | 'All'", required: false, description: "Active status filter." },
      ],
    },
  ],
};

export default doc;
