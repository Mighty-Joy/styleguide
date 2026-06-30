"use client";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type MessageRole = "user" | "agent";

type CreatorResult = {
  name: string;
  initials: string;
  handle: string;
  followers: string;
  platform: "instagram" | "tiktok" | "youtube";
};

type Message = {
  id: number;
  role: MessageRole;
  text: string;
  ts: string;
  results?: CreatorResult[];
  isThinking?: boolean;
};

/* ── data ───────────────────────────────────────────────── */
const INITIAL: Message[] = [
  {
    id: 1,
    role: "agent",
    text: "Hi! I'm your Superdeal assistant. I can help you find creators, review deals, approve content, and more. What would you like to do today?",
    ts: "9:00 AM",
  },
  {
    id: 2,
    role: "user",
    text: "Find me 3 Instagram creators in the beauty space with 50k–200k followers for the Summer Glow campaign.",
    ts: "9:01 AM",
  },
  {
    id: 3,
    role: "agent",
    text: "Found 3 creators matching your criteria for the Summer Glow campaign:",
    ts: "9:01 AM",
    results: [
      { name: "Priya Nair",   initials: "PN", handle: "@priya.glows",    followers: "142K", platform: "instagram" },
      { name: "Maya Chen",    initials: "MC", handle: "@mayabeautyco",   followers: "89K",  platform: "instagram" },
      { name: "Sofia Ruiz",   initials: "SR", handle: "@sofiaruizbeauty", followers: "178K", platform: "instagram" },
    ],
  },
  {
    id: 4,
    role: "user",
    text: "Great — invite all three to the campaign.",
    ts: "9:02 AM",
  },
  {
    id: 5,
    role: "agent",
    text: "Done! Invitations sent to Priya Nair, Maya Chen, and Sofia Ruiz. I'll notify you when they accept.",
    ts: "9:02 AM",
  },
];

const PLATFORM_TONE: Record<string, string> = {
  instagram: "pink",
  tiktok:    "blue",
  youtube:   "red",
};

/* ── CreatorResultCard ──────────────────────────────────── */
function CreatorResultCard({ c }: { c: CreatorResult }) {
  return (
    <div style={{
      display:       "flex",
      alignItems:    "center",
      gap:           10,
      padding:       "8px 12px",
      background:    "var(--sd-bg-secondary)",
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  8,
    }}>
      <Avatar size="sm" name={c.name} initials={c.initials} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     13,
          fontWeight:   600,
          color:        "var(--sd-font-primary)",
          whiteSpace:   "nowrap",
          overflow:     "hidden",
          textOverflow: "ellipsis",
        }}>
          {c.name}
        </div>
        <div style={{
          fontFamily: "var(--sd-font)",
          fontSize:   11,
          color:      "var(--sd-font-tertiary)",
        }}>
          {c.handle} · {c.followers}
        </div>
      </div>
      <Badge label={c.platform} tone={PLATFORM_TONE[c.platform] as any} variant="solid" size="sm" />
    </div>
  );
}

/* ── ChatMessage ────────────────────────────────────────── */
function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div style={{
      display:       "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      alignItems:    "flex-start",
      gap:           10,
    }}>
      {/* avatar */}
      {isUser ? (
        <Avatar size="sm" name="Eric Dahan" initials="ED" />
      ) : (
        <div style={{
          width:         32,
          height:        32,
          borderRadius:  "50%",
          background:    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
          flexShrink:    0,
          display:       "flex",
          alignItems:    "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: 14 }}>✦</span>
        </div>
      )}

      {/* bubble */}
      <div style={{
        maxWidth:      "72%",
        display:       "flex",
        flexDirection: "column",
        gap:           8,
        alignItems:    isUser ? "flex-end" : "flex-start",
      }}>
        <div style={{
          padding:      "10px 14px",
          borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          background:   isUser
            ? "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
            : "var(--sd-bg-secondary)",
          border:       isUser ? "none" : "1px solid var(--sd-border-default)",
          color:        isUser ? "#fff" : "var(--sd-font-primary)",
          fontFamily:   "var(--sd-font)",
          fontSize:     13,
          lineHeight:   "1.5",
        }}>
          {msg.text}
        </div>

        {/* creator results */}
        {msg.results && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
            {msg.results.map((c, i) => (
              <CreatorResultCard key={i} c={c} />
            ))}
          </div>
        )}

        {/* timestamp */}
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   10,
          color:      "var(--sd-font-tertiary)",
        }}>
          {msg.ts}
        </span>
      </div>
    </div>
  );
}

/* ── ThinkingBubble ─────────────────────────────────────── */
function ThinkingBubble() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width:         32,
        height:        32,
        borderRadius:  "50%",
        background:    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        flexShrink:    0,
        display:       "flex",
        alignItems:    "center",
        justifyContent: "center",
      }}>
        <span style={{ fontSize: 14 }}>✦</span>
      </div>
      <div style={{
        padding:      "10px 16px",
        borderRadius: "4px 16px 16px 16px",
        background:   "var(--sd-bg-secondary)",
        border:       "1px solid var(--sd-border-default)",
        display:      "flex",
        alignItems:   "center",
        gap:          4,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width:        6,
            height:       6,
            borderRadius: "50%",
            background:   "var(--sd-font-tertiary)",
            animation:    `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function AgentChatDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id:   messages.length + 1,
      role: "user",
      text: input.trim(),
      ts:   new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(prev => [
        ...prev,
        {
          id:   prev.length + 1,
          role: "agent",
          text: "I'm on it! Let me process your request for the Summer Glow campaign.",
          ts:   new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1800);
  };

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      height:        560,
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  12,
      overflow:      "hidden",
      background:    "var(--sd-bg-secondary)",
    }}>
      {/* header */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        gap:            10,
        padding:        "12px 16px",
        borderBottom:   "1px solid var(--sd-border-default)",
        background:     "var(--sd-bg-tertiary)",
      }}>
        <div style={{
          width:         32,
          height:        32,
          borderRadius:  "50%",
          background:    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
          display:       "flex",
          alignItems:    "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: 16 }}>✦</span>
        </div>
        <div>
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   13,
            fontWeight: 700,
            color:      "var(--sd-font-primary)",
          }}>
            Superdeal AI
          </div>
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "#10B981",
          }}>
            ● Online
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Badge label="Summer Glow" tone="purple" variant="solid" size="sm" />
        </div>
      </div>

      {/* messages */}
      <div style={{
        flex:       1,
        overflowY:  "auto",
        padding:    "16px",
        display:    "flex",
        flexDirection: "column",
        gap:        16,
      }}>
        {messages.map(m => <ChatMessage key={m.id} msg={m} />)}
        {thinking && <ThinkingBubble />}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           10,
        padding:       "12px 16px",
        borderTop:     "1px solid var(--sd-border-default)",
        background:    "var(--sd-bg-tertiary)",
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask anything about your campaign…"
          style={{
            flex:         1,
            fontFamily:   "var(--sd-font)",
            fontSize:     13,
            color:        "var(--sd-font-primary)",
            background:   "var(--sd-bg-secondary)",
            border:       "1px solid var(--sd-border-default)",
            borderRadius: 8,
            padding:      "9px 14px",
            outline:      "none",
          }}
        />
        <Button variant="primary" size="sm" onClick={send} disabled={!input.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "agent-chat",
  title:       "Agent Chat",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "AI agent chat interface for campaign management — mirrors AgentPage / ChatArea in the app.",
  description: "Full-height chat surface with threaded user/agent messages, creator result cards, a thinking indicator, and a text input. Maps to AgentPage.tsx and ChatArea.tsx. The active campaign is shown in the header for context scoping.",
  demos: [
    {
      title:  "Summer Glow Campaign",
      render: () => <AgentChatDemo />,
      block:  true,
      maxWidth: 880,
    },
  ],
  props: [
    {
      rows: [
        { name: "messages",  type: "Message[]",  required: true,  description: "Ordered list of chat messages with role, text, timestamp, and optional result cards." },
        { name: "thinking",  type: "boolean",    required: false, description: "When true, renders the animated typing indicator below messages." },
        { name: "onSend",    type: "(text: string) => void", required: true, description: "Callback invoked when the user submits a message." },
        { name: "campaign",  type: "string",     required: false, description: "Campaign name shown as a badge in the header for context." },
      ],
    },
  ],
};

export default doc;
