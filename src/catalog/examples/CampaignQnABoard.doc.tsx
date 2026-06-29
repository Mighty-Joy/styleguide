"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconMessageCircle,
  IconCheck,
  IconSend,
  IconThumbUp,
  IconSearch,
  IconPlus,
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconPin,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
interface QnAAnswer {
  id: string;
  from: "brand" | "creator";
  fromName: string;
  text: string;
  timestamp: string;
  isOfficial?: boolean;
}

interface QnAItem {
  id: string;
  question: string;
  askedBy: string;
  askedAt: string;
  answered: boolean;
  pinned?: boolean;
  upvotes: number;
  upvoted: boolean;
  answers: QnAAnswer[];
}

const INITIAL_QA: QnAItem[] = [
  {
    id: "q1",
    question: "What hashtags are required on the Reel — just #ad or also specific brand tags?",
    askedBy: "Priya Nair", askedAt: "Jun 22", answered: true, pinned: true, upvotes: 4, upvoted: false,
    answers: [
      { id: "a1", from: "brand", fromName: "Aura Labs", text: "Use #ad and #AuraLabs on every post. For Reels you should also add #AuraGlow and at least 2 niche tags (e.g. #skincarecommunity, #cleanbeauty). Do NOT use competitor tags.", timestamp: "Jun 22 · 3 PM", isOfficial: true },
    ],
  },
  {
    id: "q2",
    question: "When will the product ship? I need it at least 5 days before filming.",
    askedBy: "Marcus Webb", askedAt: "Jun 24", answered: true, pinned: false, upvotes: 6, upvoted: false,
    answers: [
      { id: "a2", from: "brand", fromName: "Aura Labs", text: "Products will ship by July 5 via FedEx 2-day. You'll get a tracking link as soon as the label is created. Please confirm your shipping address in your profile settings if you haven't already.", timestamp: "Jun 24 · 11 AM", isOfficial: true },
    ],
  },
  {
    id: "q3",
    question: "Is the TikTok deliverable truly optional or is there a bonus for including it?",
    askedBy: "Ji-ho Kim", askedAt: "Jun 25", answered: true, pinned: false, upvotes: 9, upvoted: false,
    answers: [
      { id: "a3", from: "brand", fromName: "Aura Labs", text: "Completely optional! If you include a TikTok video (60s+, same brief), we'll add $300 to your agreed fee automatically — no renegotiation needed. Just tag it with the same hashtags.", timestamp: "Jun 25 · 2 PM", isOfficial: true },
      { id: "a4", from: "creator", fromName: "Priya Nair", text: "I'm including it — easy way to bump the fee and TikTok's algorithm is great right now for skincare content.", timestamp: "Jun 25 · 4 PM" },
    ],
  },
  {
    id: "q4",
    question: "Can we show skincare from other brands in the routine, as long as Aura Labs is the hero?",
    askedBy: "Amara Diallo", askedAt: "Jun 27", answered: false, pinned: false, upvotes: 3, upvoted: false,
    answers: [],
  },
  {
    id: "q5",
    question: "Is the go-live date flexible if I need an extra day for editing?",
    askedBy: "Sofia Reyes", askedAt: "Jun 28", answered: false, pinned: false, upvotes: 2, upvoted: false,
    answers: [],
  },
];

/* ---- Demo ---- */
function Demo() {
  const [items,    setItems]    = useState<QnAItem[]>(INITIAL_QA);
  const [query,    setQuery]    = useState("");
  const [filter,   setFilter]   = useState<"all" | "answered" | "unanswered">("all");
  const [newQ,     setNewQ]     = useState("");
  const [askOpen,  setAskOpen]  = useState(false);
  const [askSent,  setAskSent]  = useState(false);
  const [replyId,  setReplyId]  = useState<string | null>(null);
  const [replyTxt, setReplyTxt] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["q1", "q2", "q3"]));

  function toggleExpand(id: string) {
    setExpanded((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function upvote(id: string) {
    setItems((prev) => prev.map((q) => q.id === id ? { ...q, upvotes: q.upvoted ? q.upvotes - 1 : q.upvotes + 1, upvoted: !q.upvoted } : q));
  }
  function askQuestion() {
    if (!newQ.trim()) return;
    setItems((prev) => [...prev, {
      id: `q${Date.now()}`, question: newQ, askedBy: "Priya Nair", askedAt: "Just now",
      answered: false, upvotes: 0, upvoted: false, answers: [],
    }]);
    setNewQ(""); setAskSent(true);
    setTimeout(() => { setAskSent(false); setAskOpen(false); }, 1800);
  }
  function sendReply(qId: string) {
    if (!replyTxt.trim()) return;
    setItems((prev) => prev.map((q) => q.id === qId ? {
      ...q, answered: true,
      answers: [...q.answers, { id: `ans${Date.now()}`, from: "brand", fromName: "Aura Labs", text: replyTxt, timestamp: "Just now", isOfficial: true }],
    } : q));
    setReplyTxt(""); setReplyId(null);
  }

  const visible = items
    .filter((q) => {
      if (filter === "answered"   && !q.answered) return false;
      if (filter === "unanswered" &&  q.answered) return false;
      if (query && !q.question.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const unanswered = items.filter((q) => !q.answered).length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Campaign Q&A</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · {items.length} questions</div>
        </div>
        {unanswered > 0 && <Badge label={`${unanswered} need answers`} tone="red" size="sm" dot />}
        <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />} onClick={() => setAskOpen(true)}>Ask a question</Button>
      </div>

      {/* Ask form */}
      {askOpen && (
        <div style={{ padding: "12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, marginBottom: 12, background: "var(--sd-bg-secondary,#f9f9f9)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Ask the brand a question</div>
          <textarea value={newQ} onChange={(e) => setNewQ(e.target.value)} placeholder="Type your question — all creators on this campaign can see it…"
            style={{ width: "100%", minHeight: 60, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, padding: "8px 10px", fontSize: 12, lineHeight: 1.5, fontFamily: "inherit", resize: "vertical", marginBottom: 8, boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="primary" size="sm" leftIcon={askSent ? <IconCheck size={11} /> : <IconSend size={11} />} onClick={askQuestion} disabled={!newQ.trim()}>
              {askSent ? "Question sent!" : "Post question"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setAskOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Search + filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "6px 10px" }}>
          <IconSearch size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }} />
        </div>
        {(["all","answered","unanswered"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "4px 10px", borderRadius: 99, background: filter === f ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: filter === f ? "#fff" : "var(--sd-font-secondary,#555)", textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Q&A list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((q) => {
          const isOpen = expanded.has(q.id);
          return (
            <div key={q.id} style={{ border: `1px solid ${!q.answered ? TONES.red.text + "30" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 12, overflow: "hidden" }}>
              {/* Question row */}
              <div style={{ display: "flex", gap: 10, padding: "11px 14px", alignItems: "flex-start" }}>
                {/* Upvote */}
                <button onClick={() => upvote(q.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 6px", borderRadius: 7, background: q.upvoted ? TONES.blue.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1px solid ${q.upvoted ? TONES.blue.text : "transparent"}`, cursor: "pointer", flexShrink: 0 }}>
                  <IconThumbUp size={11} style={{ color: q.upvoted ? TONES.blue.text : "var(--sd-font-tertiary,#999)" }} />
                  <span style={{ fontSize: 9, fontWeight: 800, color: q.upvoted ? TONES.blue.text : "var(--sd-font-tertiary,#999)" }}>{q.upvotes}</span>
                </button>

                <div style={{ flex: 1 }} onClick={() => toggleExpand(q.id)}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                    {q.pinned && <IconPin size={11} style={{ color: TONES.orange.text }} />}
                    <span style={{ fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{q.question}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
                    {q.askedBy} · {q.askedAt} · {q.answers.length} {q.answers.length === 1 ? "answer" : "answers"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
                  {q.answered
                    ? <Badge label="Answered" tone="green" size="sm" dot />
                    : <Badge label="No answer yet" tone="red" size="sm" />}
                  <button onClick={() => toggleExpand(q.id)} style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
                  </button>
                </div>
              </div>

              {/* Answers */}
              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {q.answers.map((ans, ai) => (
                    <div key={ans.id} style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: ai < q.answers.length - 1 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none" }}>
                      <Avatar initials={ans.from === "brand" ? "AL" : "PN"} tone={ans.from === "brand" ? "orange" : "green"} size="sm" />
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                          <span style={{ fontSize: 11, fontWeight: 700 }}>{ans.fromName}</span>
                          {ans.isOfficial && <Badge label="Official" tone="orange" size="sm" />}
                          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{ans.timestamp}</span>
                        </div>
                        <div style={{ fontSize: 12, lineHeight: 1.6 }}>{ans.text}</div>
                      </div>
                    </div>
                  ))}

                  {/* Brand reply input */}
                  {replyId === q.id ? (
                    <div style={{ padding: "10px 14px", display: "flex", gap: 8 }}>
                      <Avatar initials="AL" tone="orange" size="sm" />
                      <div style={{ flex: 1 }}>
                        <textarea value={replyTxt} onChange={(e) => setReplyTxt(e.target.value)} placeholder="Write an official answer…"
                          style={{ width: "100%", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, padding: "7px 10px", fontSize: 12, fontFamily: "inherit", resize: "none", boxSizing: "border-box", minHeight: 60 }} />
                        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                          <Button variant="primary" size="sm" leftIcon={<IconSend size={11} />} onClick={() => sendReply(q.id)} disabled={!replyTxt.trim()}>Post answer</Button>
                          <Button variant="secondary" size="sm" onClick={() => setReplyId(null)}>Cancel</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    !q.answered && (
                      <div style={{ padding: "8px 14px 10px" }}>
                        <Button variant="secondary" size="sm" leftIcon={<IconMessageCircle size={11} />} onClick={() => setReplyId(q.id)}>Answer this question</Button>
                      </div>
                    )
                  )}
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
  slug: "campaign-qna-board",
  title: "CampaignQnABoard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Campaign-shared Q&A board — creators ask questions, brand answers officially. Upvotes, pinned questions, answered/unanswered filter, and inline reply input for brand.",
  description:
    "A shared FAQ board where all creators on a campaign can ask questions and see official brand answers. Header: campaign name, question count, 'N need answers' red badge, Ask a question CTA. Ask form (slide-in): multi-line textarea + Post question (disabled until text entered, shows green confirmation). Search + filter chips (All/Answered/Unanswered). Pinned questions float to top (pin icon in orange). Each Q item: upvote column (thumb-up + count, blue tint when upvoted), question text, asker name + date + answer count, Answered/No answer badge, expand chevron. Expand reveals: answer thread — brand answers have AL orange avatar + 'Official' orange badge; creator answers have their avatar; each shows name + timestamp + text. Unanswered questions show 'Answer this question' secondary CTA → opens inline brand reply textarea. Pre-seeded: hashtag requirements (answered, pinned, 4 upvotes), product shipping (answered, 6 upvotes), TikTok bonus clarification (answered, creator follow-up visible, 9 upvotes), can-we-show-other-brands (unanswered, 3 upvotes), go-live flexibility (unanswered, 2 upvotes). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign Q&A board",
      description: "First 3 questions expanded. Click upvote thumbs. Click 'Answer this question' on unanswered items to post an official brand response. Click 'Ask a question' to add a new one.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
