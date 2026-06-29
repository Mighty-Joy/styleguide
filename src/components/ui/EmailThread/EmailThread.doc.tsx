"use client";

import React, { useState } from "react";
import { ThreadList, ThreadView } from "./EmailThread";
import type { ThreadData } from "./EmailThread";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Demo data (mirrors the screenshot)                                   */
/* ------------------------------------------------------------------ */

const THREADS: ThreadData[] = [
  {
    id: "1",
    participants: [{ initials: "R", tone: "red" }, { initials: "A", tone: "yellow" }],
    participantLabel: "Rey, ...",
    count: 4,
    subject: "Video #2",
    snippet: "For sure — looping in the tea...",
    date: "Jun 25",
    unread: true,
    messages: [
      { senderInitials: "R", senderName: "Rey Flemings", senderTone: "red", date: "Jun 25 · 10:02 AM", body: "For sure — looping in the team now. Can you share the asset folder when you get a chance?" },
      { senderInitials: "A", senderName: "Atlas Berry", senderTone: "yellow", date: "Jun 25 · 11:14 AM", to: "Rey, Eric", body: "Hey Rey,\n\nFolder's shared — link in the drive. Let me know once you've had a chance to review the B-roll selects.\n\nThe second half is the strongest. I'd lead with that.\n\n— Atlas" },
      { senderInitials: "R", senderName: "Rey Flemings", senderTone: "red", date: "Jun 25 · 2:30 PM", body: "Got it, reviewing now. Back to you by EOD." },
      { senderInitials: "A", senderName: "Atlas Berry", senderTone: "yellow", date: "Jun 25 · 4:45 PM", to: "Rey, Eric", body: "Perfect. No rush — tomorrow morning works too." },
    ],
  },
  {
    id: "2",
    participants: [{ initials: "R", tone: "red" }, { initials: "A", tone: "yellow" }],
    participantLabel: "Rey, ...",
    count: 2,
    subject: "The Blue update",
    snippet: "Quick recap from this...",
    date: "Jun 24",
    messages: [
      {
        senderInitials: "R",
        senderName: "Rey Flemings",
        senderTone: "red",
        date: "3 days ago",
        body: "Atlas + team — we've learned a ton this first week and wanted to share a quick recap before the long weekend.",
      },
      {
        senderInitials: "A",
        senderName: "Atlas Berry",
        senderTone: "yellow",
        date: "3 days ago",
        to: "Eric, Atlas Berry, Thomas Keeling...",
        body: "Rey —\n\nAwesome updates. The immediate sign-up flow is a big win — glad the tests smoothed it out.\n\nReady to jump on the next video when you are. Want to focus on the upcoming roll-up discussion? If so, share the deck and I'll start a draft.\n\n— Atlas",
      },
    ],
  },
  {
    id: "3",
    participants: [{ initials: "A", tone: "yellow" }, { initials: "T", tone: "blue" }, { initials: "R", tone: "red" }],
    participantLabel: "Atla...",
    count: 5,
    subject: "Attribution",
    snippet: "Sharing the model we dis...",
    date: "Jun 17",
    messages: [
      { senderInitials: "A", senderName: "Atlas Berry", senderTone: "yellow", date: "Jun 17 · 9:00 AM", body: "Sharing the model we discussed — see attached. Feedback welcome." },
      { senderInitials: "T", senderName: "Thomas Keeling", senderTone: "blue", date: "Jun 17 · 10:22 AM", to: "Atlas, Rey, Eric", body: "Thanks Atlas. A couple notes in the doc — mostly around the last-touch weighting. Think we need to revisit that section." },
    ],
  },
  {
    id: "4",
    participants: [{ initials: "E", tone: "green" }, { initials: "A", tone: "yellow" }],
    participantLabel: "Eric,...",
    count: 8,
    subject: "Atlas x Blue — partnership",
    snippet: "Welcome a...",
    date: "Jun 17",
    messages: [
      { senderInitials: "E", senderName: "Eric D", senderTone: "green", date: "Jun 17 · 8:00 AM", body: "Welcome Atlas to the Superdeal family! Excited to kick off the Blue partnership. Docs in drive." },
    ],
  },
  {
    id: "5",
    participants: [{ initials: "R", tone: "red" }],
    participantLabel: "Rey F",
    count: 1,
    subject: "Application landing page",
    snippet: "Live now — tak...",
    date: "Jun 17",
    messages: [
      { senderInitials: "R", senderName: "Rey Flemings", senderTone: "red", date: "Jun 17 · 3:15 PM", body: "Live now — take a look and let me know what you think. Link: superdeal.co/apply" },
    ],
  },
  {
    id: "6",
    participants: [{ initials: "E", tone: "green" }, { initials: "T", tone: "blue" }],
    participantLabel: "Eric,...",
    count: 5,
    subject: "Re: Welcome to LA",
    snippet: "Looks great — see ...",
    date: "Jun 4",
    messages: [
      { senderInitials: "T", senderName: "Thomas Keeling", senderTone: "blue", date: "Jun 4 · 11:00 AM", body: "Looks great — see you there! Will bring the deck." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Side-by-side demo                                                    */
/* ------------------------------------------------------------------ */

function EmailThreadDemo() {
  const [selected, setSelected] = useState<ThreadData>(THREADS[1]); // "The Blue update"

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
      {/* left: thread list */}
      <div style={{ flex: "1 1 320px", maxWidth: 480 }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 500, color: "var(--sd-font-tertiary)", marginBottom: 8 }}>
          Grouped thread list (ThreadList / ThreadRow)
        </div>
        <ThreadList
          threads={THREADS}
          label="Inbox"
          count={6}
          onSelect={setSelected}
        />
      </div>

      {/* right: thread view */}
      <div style={{ flex: "1 1 320px", maxWidth: 480 }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 500, color: "var(--sd-font-tertiary)", marginBottom: 8 }}>
          Single thread (ThreadView / ThreadMessage) · click a thread →
        </div>
        <ThreadView
          thread={selected}
          onBack={() => {}}
          onClose={() => {}}
          defaultExpanded={selected.messages.length - 1}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                            */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "email-threads",
  title: "Email threads",
  group: "Messaging",
  status: "stable",
  summary: "Grouped thread list and single-thread view, modeled after Twenty's email inbox pattern.",
  description:
    "`ThreadList` renders an inbox-style list — overlapping participant avatars, count, bold subject, snippet, date. `ThreadView` opens a single thread: back / close header with a subject chip, then stacked messages that expand/collapse on click (last message open by default). Both components are wired together in the Creator Right Panel → Messages tab.",
  source: "apps/web — InboxThreadList, ThreadView",
  demos: [
    {
      title: "Email threads",
      description:
        "Click any thread in the inbox to switch the right panel to that thread. Click a message row in the thread view to expand or collapse it.",
      block: true,
      render: () => <EmailThreadDemo />,
    },
  ],
  props: [
    {
      title: "ThreadListProps",
      rows: [
        { name: "threads", type: "ThreadData[]", required: true, description: "Array of thread objects to display." },
        { name: "onSelect", type: "(thread: ThreadData) => void", required: true, description: "Called when a thread row is clicked." },
        { name: "label", type: "string", description: 'Header label. Default "Inbox".' },
        { name: "count", type: "number", description: "Override the count shown next to the label." },
      ],
    },
    {
      title: "ThreadViewProps",
      rows: [
        { name: "thread", type: "ThreadData", required: true, description: "Thread to display." },
        { name: "onBack", type: "() => void", description: "Renders ← back button when provided." },
        { name: "onClose", type: "() => void", description: "Renders × close button when provided." },
        { name: "defaultExpanded", type: "number", description: "Index of the initially expanded message. Defaults to the last message." },
      ],
    },
    {
      title: "ThreadData shape",
      rows: [
        { name: "id", type: "string", required: true, description: "Unique identifier." },
        { name: "participants", type: "ThreadParticipant[]", required: true, description: "{ initials, tone } for each sender — up to 3 shown as overlapping avatars." },
        { name: "participantLabel", type: "string", required: true, description: 'Truncated names label e.g. "Rey, ...".' },
        { name: "count", type: "number", required: true, description: "Total message count in the thread." },
        { name: "subject", type: "string", required: true, description: "Thread subject line." },
        { name: "snippet", type: "string", required: true, description: "First-message preview text." },
        { name: "date", type: "string", required: true, description: "Display date string." },
        { name: "messages", type: "EmailMessageData[]", required: true, description: "Full messages for the thread view." },
      ],
    },
  ],
};

export default doc;
