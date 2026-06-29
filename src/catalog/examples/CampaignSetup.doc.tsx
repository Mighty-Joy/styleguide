"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import { TagInput } from "@/components/ui/TagInput/TagInput";
import { ToggleGroup } from "@/components/ui/ToggleGroup/ToggleGroup";
import { NumberInput } from "@/components/ui/NumberInput/NumberInput";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCheck,
  IconChevronRight,
  IconTarget,
  IconUsers,
  IconPackage,
  IconFileText,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

const STEPS = [
  { key: "basics",    label: "Basics",    icon: <IconTarget size={14} /> },
  { key: "creators",  label: "Creators",  icon: <IconUsers size={14} /> },
  { key: "products",  label: "Products",  icon: <IconPackage size={14} /> },
  { key: "brief",     label: "Brief",     icon: <IconFileText size={14} /> },
];

type StepKey = "basics" | "creators" | "products" | "brief";

function StepIndicator({ current, completed }: { current: StepKey; completed: Set<StepKey> }) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {STEPS.map((step, i) => {
        const done = completed.has(step.key as StepKey);
        const active = step.key === current;
        return (
          <React.Fragment key={step.key}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done ? "#36d080" : active ? "#333" : "var(--sd-bg-tertiary, #f3f3f3)",
                  border: `2px solid ${done ? "#36d080" : active ? "#333" : "var(--sd-border-default, #e5e7eb)"}`,
                  color: done || active ? "#fff" : "var(--sd-font-tertiary, #999)",
                  fontSize: 12,
                  fontWeight: 700,
                  transition: "all 0.2s",
                }}
              >
                {done ? <IconCheck size={14} /> : step.icon}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--sd-font-primary, #333)" : "var(--sd-font-tertiary, #999)",
                }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? "#36d080" : "var(--sd-border-default, #e5e7eb)",
                  margin: "0 8px",
                  marginBottom: 20,
                  transition: "background 0.2s",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---- Step 1: Basics ---- */
function BasicsStep({ onNext }: { onNext: () => void }) {
  const [name, setName] = useState("Atlas X Summer 2025");
  const [goal, setGoal] = useState("awareness");
  const [platforms, setPlatforms] = useState<string[]>(["instagram", "tiktok"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary, #333)", marginBottom: 4 }}>
          Campaign basics
        </div>
        <div style={{ fontSize: 13, color: "var(--sd-font-tertiary, #999)" }}>
          Name your campaign, set the goal, and choose target platforms.
        </div>
      </div>

      <Input
        label="Campaign name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Atlas X Summer Launch"
      />

      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-tertiary, #999)", marginBottom: 6 }}>
          Campaign goal
        </div>
        <ToggleGroup
          options={[
            { value: "awareness", label: "Awareness" },
            { value: "engagement", label: "Engagement" },
            { value: "conversion", label: "Conversion" },
            { value: "retention", label: "Retention" },
          ]}
          value={goal}
          onChange={setGoal}
        />
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-tertiary, #999)", marginBottom: 8 }}>
          Platforms
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "instagram", Icon: IconBrandInstagram, color: "#e1306c" },
            { key: "tiktok",    Icon: IconBrandTiktok,    color: "#010101" },
            { key: "youtube",   Icon: IconBrandYoutube,   color: "#ff0000" },
          ].map(({ key, Icon, color }) => {
            const on = platforms.includes(key);
            return (
              <button
                key={key}
                onClick={() =>
                  setPlatforms((prev) =>
                    on ? prev.filter((p) => p !== key) : [...prev, key]
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: `1.5px solid ${on ? color : "var(--sd-border-default, #e5e7eb)"}`,
                  background: on ? `${color}12` : "transparent",
                  color: on ? color : "var(--sd-font-secondary, #666)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.12s",
                  textTransform: "capitalize",
                }}
              >
                <Icon size={16} />
                {key}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 4 }}>
        <Button variant="primary" onClick={onNext} rightIcon={<IconChevronRight size={14} />}>
          Continue to creators
        </Button>
      </div>
    </div>
  );
}

/* ---- Step 2: Creators ---- */
function CreatorsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [minFollowers, setMinFollowers] = useState(50000);
  const [maxBudget, setMaxBudget] = useState(20000);
  const [niches, setNiches] = useState<string[]>(["skincare", "lifestyle", "wellness"]);
  const [exclusions, setExclusions] = useState<string[]>(["competitor-brand"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary, #333)", marginBottom: 4 }}>
          Creator criteria
        </div>
        <div style={{ fontSize: 13, color: "var(--sd-font-tertiary, #999)" }}>
          Set the audience requirements and per-creator budget range.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <NumberInput
          label="Min. followers"
          value={minFollowers}
          onChange={setMinFollowers}
          step={10000}
          min={1000}
          suffix="followers"
        />
        <NumberInput
          label="Max deal value"
          value={maxBudget}
          onChange={setMaxBudget}
          step={5000}
          min={500}
          prefix="$"
        />
      </div>

      <TagInput
        label="Target niches"
        value={niches}
        onChange={setNiches}
        placeholder="Add niche (e.g. skincare)…"
        hint="Press Enter or comma to add. Used to surface matching creators in Discovery."
      />

      <TagInput
        label="Brand exclusions"
        value={exclusions}
        onChange={setExclusions}
        placeholder="Exclude creators working with…"
        hint="Creators who recently posted for these brands will be filtered out."
      />

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={onNext} rightIcon={<IconChevronRight size={14} />}>
          Continue to products
        </Button>
      </div>
    </div>
  );
}

/* ---- Step 3: Products ---- */
function ProductsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [product, setProduct] = useState("Atlas X Starter Kit");
  const [sku, setSku] = useState("AX-KIT-001");
  const [quantity, setQuantity] = useState(10);
  const [seeding, setSeeding] = useState("yes");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary, #333)", marginBottom: 4 }}>
          Product seeding
        </div>
        <div style={{ fontSize: 13, color: "var(--sd-font-tertiary, #999)" }}>
          Specify which product(s) will be sent to creators.
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-tertiary, #999)", marginBottom: 6 }}>
          Include product seeding?
        </div>
        <ToggleGroup
          options={[
            { value: "yes", label: "Yes — send product" },
            { value: "no",  label: "No — digital only" },
          ]}
          value={seeding}
          onChange={setSeeding}
        />
      </div>

      {seeding === "yes" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input
              label="Product name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Product name"
            />
            <Input
              label="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="SKU or variant ID"
            />
          </div>
          <NumberInput
            label="Quantity to ship"
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={100}
            hint="Total units across all creators in this campaign."
          />
        </>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={onNext} rightIcon={<IconChevronRight size={14} />}>
          Continue to brief
        </Button>
      </div>
    </div>
  );
}

/* ---- Step 4: Brief ---- */
function BriefStep({ onBack, onFinish }: { onBack: () => void; onFinish: () => void }) {
  const [title, setTitle] = useState("Atlas X Summer Skincare");
  const [objective, setObjective] = useState("Showcase the Atlas X skincare set in your daily routine. Focus on the Vitamin C serum and SPF moisturizer — these are our hero products this season.");
  const [dos, setDos] = useState<string[]>(["Show before/after results", "Tag @atlasxbeauty", "Use #AtlasXSummer"]);
  const [donts, setDonts] = useState<string[]>(["Mention competitor brands", "Show without natural lighting"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary, #333)", marginBottom: 4 }}>
          Campaign brief
        </div>
        <div style={{ fontSize: 13, color: "var(--sd-font-tertiary, #999)" }}>
          This brief will be shared with every creator you invite to this campaign.
        </div>
      </div>

      <Input
        label="Brief title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        label="Objective & key message"
        value={objective}
        onChange={setObjective}
        rows={4}
        hint="What should creators communicate? Be clear about hero products and tone."
      />

      <TagInput
        label="Do's"
        value={dos}
        onChange={setDos}
        placeholder="Add a do…"
        hint="Specific things creators should include in their content."
      />

      <TagInput
        label="Don'ts"
        value={donts}
        onChange={setDonts}
        placeholder="Add a don't…"
        hint="Brand safety rules and restrictions."
      />

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="brand" onClick={onFinish} leftIcon={<IconCheck size={13} />}>
          Create campaign
        </Button>
      </div>
    </div>
  );
}

/* ---- Main demo ---- */
function Demo() {
  const [step, setStep] = useState<StepKey>("basics");
  const [completed, setCompleted] = useState<Set<StepKey>>(new Set());
  const [done, setDone] = useState(false);

  function advance(from: StepKey, to: StepKey) {
    setCompleted((prev) => new Set([...prev, from]));
    setStep(to);
  }

  if (done) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          background: "#f0fdf4",
          borderRadius: 12,
          border: "1px solid #86efac",
        }}
      >
        <IconCheck size={40} color="#16a34a" style={{ marginBottom: 12 }} />
        <div style={{ fontSize: 18, fontWeight: 700, color: "#15803d" }}>Campaign created!</div>
        <div style={{ fontSize: 13, color: "#16a34a", marginTop: 6 }}>
          Atlas X Summer 2025 is ready. Add creators from Discovery to get started.
        </div>
        <Button variant="primary" style={{ marginTop: 20 }} onClick={() => { setStep("basics"); setCompleted(new Set()); setDone(false); }}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 540, fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <StepIndicator current={step} completed={completed} />

      <div style={{ background: "#fff", border: "1px solid var(--sd-border-default, #ebebeb)", borderRadius: 12, padding: 24 }}>
        {step === "basics" && <BasicsStep onNext={() => advance("basics", "creators")} />}
        {step === "creators" && <CreatorsStep onNext={() => advance("creators", "products")} onBack={() => setStep("basics")} />}
        {step === "products" && <ProductsStep onNext={() => advance("products", "brief")} onBack={() => setStep("creators")} />}
        {step === "brief" && <BriefStep onBack={() => setStep("products")} onFinish={() => { setCompleted(new Set(["basics", "creators", "products", "brief"])); setDone(true); }} />}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-setup",
  title: "CampaignSetup",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "4-step campaign creation wizard — basics, creator criteria, product seeding, and brief builder.",
  description:
    "Stepped campaign creation flow: Basics (name, goal, platforms) → Creators (min followers, budget, niches, exclusions) → Products (seeding toggle, SKU, quantity) → Brief (objective, do's and don'ts). Progress indicator shows completed vs active steps. Final step uses a green brand CTA. Composes Input, Textarea, TagInput, NumberInput, ToggleGroup, and Button — all primitives.",
  demos: [
    {
      title: "4-step campaign wizard",
      description: "Walk through each step. All fields are interactive. Final step creates the campaign.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
