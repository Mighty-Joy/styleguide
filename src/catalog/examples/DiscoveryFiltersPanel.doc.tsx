"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconX,
  IconCheck,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconUsers,
  IconHeart,
  IconMapPin,
  IconSparkles,
  IconSearch,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- helpers ---- */
type FilterSection = "platforms" | "niches" | "followers" | "er" | "location" | "audience" | "exclusivity";

const PLATFORMS = [
  { id: "instagram", label: "Instagram",  icon: IconBrandInstagram, tone: "pink"     as const },
  { id: "tiktok",    label: "TikTok",     icon: IconBrandTiktok,    tone: "gray"     as const },
  { id: "youtube",   label: "YouTube",    icon: IconBrandYoutube,   tone: "red"      as const },
];

const NICHES = [
  "Skincare", "Beauty", "Wellness", "Fitness", "Fashion", "Food", "Travel", "Parenting", "Sustainable living", "Tech", "Gaming", "Finance",
];

const LOCATIONS = ["United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "Brazil"];

const AUDIENCE_AGES = ["13–17", "18–24", "25–34", "35–44", "45+"];
const AUDIENCE_GENDERS = ["Female", "Male", "Non-binary"];

const FOLLOWER_BANDS = [
  { label: "Nano",  sub: "1K–10K",    value: "nano"   },
  { label: "Micro", sub: "10K–100K",  value: "micro"  },
  { label: "Mid",   sub: "100K–500K", value: "mid"    },
  { label: "Macro", sub: "500K–1M",   value: "macro"  },
  { label: "Mega",  sub: "1M+",       value: "mega"   },
];

const ER_BANDS = [
  { label: "Any",    value: "any"  },
  { label: "≥2%",    value: "2"    },
  { label: "≥4%",    value: "4"    },
  { label: "≥6%",    value: "6"    },
  { label: "≥8%",    value: "8"    },
];

/* ---- Demo ---- */
function Demo() {
  const [openSections, setOpenSections] = useState<Set<FilterSection>>(
    new Set(["platforms", "niches", "followers", "er"])
  );
  const [platforms,   setPlatforms]   = useState<Set<string>>(new Set(["instagram"]));
  const [niches,      setNiches]      = useState<Set<string>>(new Set(["Skincare", "Wellness"]));
  const [followers,   setFollowers]   = useState<Set<string>>(new Set(["micro", "mid"]));
  const [erMin,       setErMin]       = useState("4");
  const [locations,   setLocations]   = useState<Set<string>>(new Set(["United States"]));
  const [audAges,     setAudAges]     = useState<Set<string>>(new Set());
  const [audGenders,  setAudGenders]  = useState<Set<string>>(new Set());
  const [excl,        setExcl]        = useState<"any" | "available" | "none">("available");
  const [applying,    setApplying]    = useState(false);
  const [applied,     setApplied]     = useState(false);

  const matchCount = 47; // demo static

  function toggleSection(s: FilterSection) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }

  function toggleSet<T>(set: Set<T>, val: T, setter: React.Dispatch<React.SetStateAction<Set<T>>>) {
    setter((prev) => {
      const next = new Set(prev);
      next.has(val) ? next.delete(val) : next.add(val);
      return next;
    });
  }

  function clearAll() {
    setPlatforms(new Set()); setNiches(new Set()); setFollowers(new Set());
    setErMin("any"); setLocations(new Set()); setAudAges(new Set());
    setAudGenders(new Set()); setExcl("any");
    setApplied(false);
  }

  function apply() {
    setApplying(true);
    setTimeout(() => { setApplying(false); setApplied(true); }, 900);
  }

  const activeCount =
    platforms.size + niches.size + followers.size +
    (erMin !== "any" ? 1 : 0) + locations.size + audAges.size + audGenders.size +
    (excl !== "any" ? 1 : 0);

  function SectionHeader({ id, label, icon: Icon, count }: { id: FilterSection; label: string; icon: React.ElementType; count?: number }) {
    const open = openSections.has(id);
    return (
      <button onClick={() => toggleSection(id)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <Icon size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        <span style={{ flex: 1, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#111" }}>{label}</span>
        {count ? <Badge label={String(count)} tone="blue" size="sm" /> : null}
        {open ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
      </button>
    );
  }

  function ChipGroup<T extends string>({
    options, selected, onToggle, tone = "blue",
  }: {
    options: T[]; selected: Set<T>; onToggle: (v: T) => void; tone?: keyof typeof TONES;
  }) {
    return (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingBottom: 10 }}>
        {options.map((opt) => {
          const active = selected.has(opt);
          return (
            <button key={opt} onClick={() => onToggle(opt)}
              style={{ padding: "4px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? TONES[tone].text : "var(--sd-font-secondary,#555)" }}>
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  const divider = <div style={{ height: 1, background: "var(--sd-border-default,#e5e7eb)", margin: "0 0 2px" }} />;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <IconFilter size={14} style={{ color: "#111" }} />
        <span style={{ fontSize: 13, fontWeight: 800, flex: 1 }}>Filter creators</span>
        {activeCount > 0 && <Badge label={`${activeCount} active`} tone="blue" size="sm" />}
        {activeCount > 0 && (
          <button onClick={clearAll} style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>
            Clear all
          </button>
        )}
      </div>

      {/* Search creators */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "7px 12px", marginBottom: 14 }}>
        <IconSearch size={13} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
        <input placeholder="Search by name or handle…" style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit", background: "transparent" }} />
      </div>

      {/* Platforms */}
      <SectionHeader id="platforms" label="Platforms" icon={IconBrandInstagram} count={platforms.size || undefined} />
      {openSections.has("platforms") && (
        <div style={{ display: "flex", gap: 8, paddingBottom: 10 }}>
          {PLATFORMS.map(({ id, label, icon: PIco, tone }) => {
            const active = platforms.has(id);
            return (
              <button key={id} onClick={() => toggleSet(platforms, id, setPlatforms)}
                style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 9, background: active ? TONES[tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer" }}>
                <PIco size={13} style={{ color: active ? TONES[tone].text : "var(--sd-font-tertiary,#999)" }} />
                <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? TONES[tone].text : "var(--sd-font-secondary,#555)" }}>{label}</span>
              </button>
            );
          })}
        </div>
      )}
      {divider}

      {/* Niches */}
      <SectionHeader id="niches" label="Niche / Category" icon={IconSparkles} count={niches.size || undefined} />
      {openSections.has("niches") && (
        <ChipGroup options={NICHES} selected={niches} onToggle={(v) => toggleSet(niches, v, setNiches)} tone="purple" />
      )}
      {divider}

      {/* Followers */}
      <SectionHeader id="followers" label="Follower tier" icon={IconUsers} count={followers.size || undefined} />
      {openSections.has("followers") && (
        <div style={{ display: "flex", gap: 6, paddingBottom: 10, flexWrap: "wrap" }}>
          {FOLLOWER_BANDS.map(({ label, sub, value }) => {
            const active = followers.has(value);
            return (
              <button key={value} onClick={() => toggleSet(followers, value, setFollowers)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 12px", borderRadius: 9, background: active ? TONES.blue.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${active ? TONES.blue.text : "transparent"}`, cursor: "pointer" }}>
                <span style={{ fontSize: 11, fontWeight: active ? 700 : 600, color: active ? TONES.blue.text : "#111" }}>{label}</span>
                <span style={{ fontSize: 9, color: active ? TONES.blue.text : "var(--sd-font-tertiary,#999)" }}>{sub}</span>
              </button>
            );
          })}
        </div>
      )}
      {divider}

      {/* ER */}
      <SectionHeader id="er" label="Min. engagement rate" icon={IconHeart} count={erMin !== "any" ? 1 : undefined} />
      {openSections.has("er") && (
        <div style={{ display: "flex", gap: 6, paddingBottom: 10, flexWrap: "wrap" }}>
          {ER_BANDS.map(({ label, value }) => {
            const active = erMin === value;
            return (
              <button key={value} onClick={() => setErMin(value)}
                style={{ padding: "4px 12px", borderRadius: 99, background: active ? TONES.green.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${active ? TONES.green.text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 500, color: active ? TONES.green.text : "var(--sd-font-secondary,#555)" }}>
                {label}
              </button>
            );
          })}
        </div>
      )}
      {divider}

      {/* Location */}
      <SectionHeader id="location" label="Creator location" icon={IconMapPin} count={locations.size || undefined} />
      {openSections.has("location") && (
        <ChipGroup options={LOCATIONS} selected={locations} onToggle={(v) => toggleSet(locations, v, setLocations)} tone="orange" />
      )}
      {divider}

      {/* Audience demo */}
      <SectionHeader id="audience" label="Audience demographics" icon={IconUsers} count={(audAges.size + audGenders.size) || undefined} />
      {openSections.has("audience") && (
        <div style={{ paddingBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Age range</div>
          <ChipGroup options={AUDIENCE_AGES} selected={audAges} onToggle={(v) => toggleSet(audAges, v, setAudAges)} tone="sky" />
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6, marginTop: 4 }}>Gender majority</div>
          <ChipGroup options={AUDIENCE_GENDERS} selected={audGenders} onToggle={(v) => toggleSet(audGenders, v, setAudGenders)} tone="pink" />
        </div>
      )}
      {divider}

      {/* Exclusivity */}
      <SectionHeader id="exclusivity" label="Exclusivity status" icon={IconCheck} count={excl !== "any" ? 1 : undefined} />
      {openSections.has("exclusivity") && (
        <div style={{ display: "flex", gap: 6, paddingBottom: 12 }}>
          {(["any", "available", "none"] as const).map((v) => {
            const active = excl === v;
            const label = v === "any" ? "Any" : v === "available" ? "Available for exclusivity" : "No exclusivity";
            return (
              <button key={v} onClick={() => setExcl(v)}
                style={{ flex: 1, padding: "6px 8px", borderRadius: 9, background: active ? TONES.yellow.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${active ? TONES.yellow.text : "transparent"}`, cursor: "pointer", fontSize: 10, fontWeight: active ? 700 : 500, color: active ? TONES.yellow.text : "var(--sd-font-secondary,#555)", textAlign: "center" }}>
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Apply */}
      <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
        <Button variant="secondary" size="sm" onClick={clearAll} disabled={activeCount === 0}>Clear</Button>
        <Button variant="primary" size="sm" onClick={apply} style={{ flex: 1 }}
          leftIcon={applied ? <IconCheck size={11} /> : <IconFilter size={11} />}>
          {applied ? `${matchCount} matches` : applying ? "Filtering…" : `Show results · ${matchCount}`}
        </Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "discovery-filters-panel",
  title: "DiscoveryFiltersPanel",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Advanced creator search sidebar — 7 collapsible filter sections: platforms, niche chips, follower tiers, min ER, location, audience demographics, and exclusivity status.",
  description:
    "The sidebar filter panel used in creator discovery. Header: 'Filter creators' with active filter count badge and Clear all link. Creator name/handle search input. 7 collapsible sections (accordion, multiple open): Platforms (Instagram/TikTok/YouTube icon buttons with tone tints); Niche (12 chips in purple: Skincare, Wellness, Fitness, etc.); Follower tier (5 tier buttons with sub-labels Nano→Mega); Min ER (5 bands from Any to ≥8% in green); Creator location (8 country chips in orange: US, UK, Canada, etc.); Audience demographics (age range sky chips: 13–17 → 45+; gender pink chips: Female/Male/Non-binary); Exclusivity status (3 yellow chips: Any / Available for exclusivity / No exclusivity). Each section header shows count badge when filters are active. Footer: Clear (disabled when 0 active), Apply button ('Show results · 47' when idle, 'Filtering…' during 900ms animation, '47 matches' with check after). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Discovery filters panel",
      description: "Toggle filter sections open/closed. Select platforms, niches, follower tiers, ER min, locations, audience age/gender, exclusivity. Click Show results to apply.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
