"use client";

import React from "react";
import Avatar from "./Avatar";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "avatar",
  title: "Avatar",
  group: "Primitives",
  status: "stable",
  summary: "Circular or rounded-square identity token — initials with deterministic tone color, or a photo with initials fallback.",
  description:
    "Use `Avatar` for any person who isn't a creator in the Superdeal sense — team members, reviewers, brand managers, campaign owners. For creator identities (with @handle and platform chips), use `CreatorIdentity` instead.\n\nTone is auto-derived from the name so the same person always gets the same color across all surfaces.",
  demos: [
    {
      title: "Sizes",
      description: "sm (24px) · md (32px) · lg (40px)",
      render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="Eric Dahan" size="sm" />
          <Avatar name="Eric Dahan" size="md" />
          <Avatar name="Eric Dahan" size="lg" />
        </div>
      ),
    },
    {
      title: "Tone override",
      description: "Pass `tone` to fix the background color regardless of name.",
      render: () => (
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {(["blue","green","red","orange","purple","pink","yellow","turquoise","sky","gray"] as const).map(t => (
            <Avatar key={t} initials={t.slice(0, 2).toUpperCase()} tone={t} size="md" />
          ))}
        </div>
      ),
    },
    {
      title: "Photo + fallback",
      description: "When `src` loads it shows the photo; when it fails it falls back to initials.",
      render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="Sophie Lane" src="https://i.pravatar.cc/64?img=47" size="md" />
          <Avatar name="Mark Chen"   src="/no-such-image.jpg"              size="md" />
          <Avatar name="Lena Park"                                          size="md" />
        </div>
      ),
    },
    {
      title: "Rounded shape",
      description: "Use `shape=\"rounded\"` for brand/entity avatars (companies, campaigns).",
      render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="Acme Corp"    shape="rounded" size="md" />
          <Avatar name="Brand Studio" shape="rounded" size="lg" tone="purple" />
        </div>
      ),
    },
    {
      title: "Bordered (for groups)",
      description: "Add `bordered` when avatars overlap — the white ring separates them cleanly.",
      render: () => (
        <div style={{ display: "flex", marginLeft: 8 }}>
          {["Alice B", "Carlos D", "Eva F"].map((n, i) => (
            <div key={n} style={{ marginLeft: -8 }}>
              <Avatar name={n} size="md" bordered />
            </div>
          ))}
        </div>
      ),
    },
  ],
  props: [
    {
      title: "AvatarProps",
      rows: [
        { name: "name",     type: "string",  description: "Full name — used to derive initials and auto-assign a deterministic tone." },
        { name: "initials", type: "string",  description: "Override the displayed initials (max 2 chars)." },
        { name: "src",      type: "string",  description: "Photo URL. Falls back to initials on error." },
        { name: "tone",     type: "keyof TONES", description: "Background tone for the initials variant. Defaults to a hash of the name." },
        { name: "size",     type: '"sm"|"md"|"lg"', default: '"md"', description: "24 / 32 / 40 px." },
        { name: "shape",    type: '"circle"|"rounded"',        default: '"circle"', description: "Circle for people, rounded-square for entities." },
        { name: "bordered", type: "boolean", default: "false",  description: "White ring border — use when stacking in a group." },
        { name: "alt",      type: "string",  description: "Accessible label (defaults to `name` or initials)." },
      ],
    },
  ],
};

export default doc;
