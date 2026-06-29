"use client";

import React, { useState } from "react";
import {
  IconAlertTriangle,
  IconTrash,
  IconUserPlus,
  IconMailFast,
  IconBolt,
  IconCheck,
} from "@tabler/icons-react";
import Modal from "./Modal";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ---- Demo 1: Confirm / destructive ---- */
function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="danger" leftIcon={<IconTrash size={13} />} onClick={() => { setOpen(true); setDone(false); }}>
        Remove creator
      </Button>
      {done && <span style={{ fontSize: 12, color: TONES.red.text }}>Creator removed.</span>}
      <Modal open={open} onClose={() => setOpen(false)} size="sm"
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: TONES.red.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconAlertTriangle size={14} style={{ color: TONES.red.solid }} />
            </span>
            Remove Priya Nair from campaign?
          </div>
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" leftIcon={<IconTrash size={13} />} onClick={() => { setDone(true); setOpen(false); }}>
              Remove creator
            </Button>
          </>
        }>
        <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.6 }}>
          This will remove <strong>Priya Nair</strong> from <strong>Atlas X Summer</strong> and cancel any active deliverables. This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

/* ---- Demo 2: Invite user form modal ---- */
function InviteDemo() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [sent, setSent] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="primary" leftIcon={<IconUserPlus size={13} />} onClick={() => { setOpen(true); setSent(false); setEmail(""); }}>
        Invite team member
      </Button>
      {sent && <span style={{ fontSize: 12, color: TONES.green.text }}><IconCheck size={12} style={{ verticalAlign: "middle" }} /> Invite sent!</span>}
      <Modal open={open} onClose={() => setOpen(false)} size="sm"
        title={<div style={{ display: "flex", alignItems: "center", gap: 7 }}><IconMailFast size={15} />Invite team member</div>}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setSent(true); setOpen(false); }} disabled={!email}>
              Send invite
            </Button>
          </>
        }>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="teammate@brand.com" />
          <Select label="Role" value={role} onChange={setRole} options={[
            { value: "admin",  label: "Admin — full access" },
            { value: "member", label: "Member — manage campaigns" },
            { value: "viewer", label: "Viewer — read only" },
          ]} />
          <p style={{ margin: 0, fontSize: 12, color: "var(--sd-font-tertiary)", padding: "10px 12px",
            background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", lineHeight: 1.5 }}>
            An email will be sent to the address above with a link to join your workspace.
          </p>
        </div>
      </Modal>
    </div>
  );
}

/* ---- Demo 3: Quick-add deal modal ---- */
function QuickDealDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="primary" leftIcon={<IconBolt size={13} />} onClick={() => setOpen(true)}>
        New deal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} size="md"
        title="Create deal"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" leftIcon={<IconBolt size={13} />} onClick={() => setOpen(false)}>Create deal</Button>
          </>
        }>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Campaign" placeholder="Select campaign…" />
          <Input label="Creator handle" placeholder="@handle" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Deal type" placeholder="Paid, Gifting…" />
            <Input label="Value ($)" placeholder="0" type="number" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ---- Doc ---- */
const doc: ComponentDoc = {
  slug: "modal",
  title: "Modal",
  group: "Feedback",
  status: "stable",
  summary: "Backdrop + panel dialog — confirm/destructive, form, and informational variants.",
  description:
    "Modal renders a fixed-position backdrop + centered panel. Open/close is controlled by the `open` prop. Pressing Escape or clicking the backdrop (default) closes it. The panel consists of an optional header (title + × close button), a scrollable body, and an optional footer for CTA buttons. Four widths: sm=380px, md=500px, lg=640px, xl=800px. Body scroll is enabled by default so tall content doesn't overflow the viewport. Used for: confirm/destructive dialogs (remove creator, delete campaign), form modals (invite team member, quick-add deal), and preview overlays.",
  demos: [
    {
      title: "Confirm / destructive",
      description: "Small modal with a red icon in the title, body warning, and a destructive confirm CTA.",
      render: () => <ConfirmDemo />,
    },
    {
      title: "Invite team member (form modal)",
      description: "Form modal with email + role inputs and an info callout. Send button disabled until email is filled.",
      render: () => <InviteDemo />,
    },
    {
      title: "Quick-add deal",
      description: "Medium modal with a two-column form grid for campaign, handle, type, and value.",
      render: () => <QuickDealDemo />,
    },
  ],
  props: [
    {
      rows: [
        { name: "open",            type: "boolean",         required: true,  description: "Controls visibility." },
        { name: "onClose",         type: "() => void",      required: true,  description: "Called when Escape is pressed, backdrop is clicked, or × is clicked." },
        { name: "title",           type: "React.ReactNode", required: false, description: "Rendered in the header. Omit to skip the header entirely." },
        { name: "children",        type: "React.ReactNode", required: true,  description: "Modal body content." },
        { name: "footer",          type: "React.ReactNode", required: false, description: "Footer content — typically Cancel + confirm CTA buttons." },
        { name: "size",            type: '"sm"|"md"|"lg"|"xl"', required: false, description: "Panel width: sm=380, md=500, lg=640, xl=800px. All clamp to viewport - 32px." },
        { name: "closeOnBackdrop", type: "boolean",         required: false, description: "Whether clicking the backdrop closes the modal. Default true." },
        { name: "hideClose",       type: "boolean",         required: false, description: "Hides the × button in the header. Useful for forced-choice dialogs." },
      ],
    },
  ],
};

export default doc;
