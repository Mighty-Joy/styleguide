"use client";

import React, { useState } from "react";
import AlertBanner from "./AlertBanner";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "alert-banner",
  title: "AlertBanner",
  group: "Core Components",
  status: "stable",
  summary: "Inline contextual alert with icon, optional title, dismiss, and action link. Four variants: info, success, warning, error.",
  description:
    "Use AlertBanner to surface contextual feedback inline within a page — not as a toast (transient) or modal (blocking). The left border accent and tinted background tie each variant to the TONES system. Pass `onDismiss` to make it closeable; pass `action` to add a text CTA beneath the message.",
  demos: [
    {
      title: "All variants",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 560 }}>
          <AlertBanner variant="info"    message="Your account is on the free plan. Upgrade to unlock unlimited campaigns." />
          <AlertBanner variant="success" message="Campaign published successfully. Creators are being notified." />
          <AlertBanner variant="warning" message="You have 2 creators with unreviewed content due today." />
          <AlertBanner variant="error"   message="Payment failed. Please update your billing details to continue." />
        </div>
      ),
      block: true,
    },
    {
      title: "With title",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 560 }}>
          <AlertBanner variant="info"    title="New feature available" message="Content calendar now supports bulk scheduling. Try it in the calendar view." />
          <AlertBanner variant="warning" title="Seat limit reached"    message="Your workspace has 8 members but your plan supports 5. Some members may lose access." />
          <AlertBanner variant="error"   title="Deal expired"          message="The negotiation window for Atlas Summer X closed 2 days ago. Start a new outreach." />
        </div>
      ),
      block: true,
    },
    {
      title: "With action + dismissible",
      render: () => {
        const [dismissed, setDismissed] = useState(false);
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 560 }}>
            <AlertBanner
              variant="info"
              title="Connect your accounts"
              message="Link your Instagram and TikTok to automatically sync follower stats."
              action={{ label: "Connect accounts", onClick: () => {} }}
            />
            {!dismissed ? (
              <AlertBanner
                variant="success"
                message="Contract signed by Glow Beauty Co. You're ready to start content."
                onDismiss={() => setDismissed(true)}
                action={{ label: "View contract", onClick: () => {} }}
              />
            ) : (
              <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", padding: "10px 0" }}>
                Banner dismissed — re-render to reset.
              </div>
            )}
            <AlertBanner
              variant="warning"
              message="Your API key expires in 3 days. Rotate it to avoid service disruption."
              onDismiss={() => {}}
              action={{ label: "Rotate key", onClick: () => {} }}
            />
          </div>
        );
      },
      block: true,
    },
  ],
  props: [
    {
      title: "AlertBannerProps",
      rows: [
        { name: "variant",   type: '"info"|"success"|"warning"|"error"', required: true,  description: "Visual tone — maps to TONES system (blue/green/orange/red)." },
        { name: "message",   type: "string",                             required: true,  description: "Main message text." },
        { name: "title",     type: "string",                             required: false, description: "Optional bold title above the message." },
        { name: "onDismiss", type: "() => void",                        required: false, description: "Renders an X button; caller controls visibility." },
        { name: "action",    type: "{ label: string; onClick: () => void }", required: false, description: "Text CTA rendered below the message in the tone color." },
      ],
    },
  ],
};

export default doc;
