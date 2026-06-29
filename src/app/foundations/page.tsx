"use client";

/**
 * Twenty (twenty.com) design-system showcase — SELF-CONTAINED.
 *
 * This page documents the Superdeal design language (Twenty-inspired layout, Inter font, brand green, soft grays,
 * 4px/8px radii, subtle shadows, CRM record table + sidebar) using tokens lifted
 * from twenty-ui's theme constants. It is fully scoped via `styleGuide.module.css`
 * and does NOT touch the app's global theme — the rest of the app stays as-is.
 *
 * Visual only / not wired: buttons, inputs and nav are presentational.
 */

import { useState, useRef } from "react";
import { Inter } from "next/font/google";
import {
  IconSearch,
  IconPlus,
  IconChevronDown,
  IconChevronRight,
  IconUser,
  IconTargetArrow,
  IconCheckbox,
  IconDotsVertical,
  IconFilter,
  IconArrowsSort,
  IconLayoutGrid,
  IconList,
  IconCheck,
  IconMail,
  IconPhone,
  IconWorld,
  IconCalendarEvent,
  IconDownload,
  IconTrash,
  IconArrowUpRight,
  IconHome,
  IconUsersGroup,
  IconAt,
  IconHeart,
  IconChecklist,
  IconCircleDashedCheck,
  IconUserCircle,
  IconHistory,
  IconBuilding,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCurrencyDollar,
  IconPencil,
  IconX,
  IconChevronUp,
  IconArrowLeft,
  IconPlayerPlayFilled,
  IconFileText,
  IconMessageCircle,
  IconArrowUp,
  IconSparkles,
  IconLock,
  IconEye,
} from "@tabler/icons-react";
import s from "../styleGuide.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ----------------------------------------------------------------- */
/* token data                                                        */
/* ----------------------------------------------------------------- */
const GRAYS = [
  ["1", "#ffffff"], ["2", "#fcfcfc"], ["3", "#f9f9f9"], ["4", "#f1f1f1"],
  ["5", "#ebebeb"], ["6", "#d6d6d6"], ["7", "#cccccc"], ["8", "#b3b3b3"],
  ["9", "#999999"], ["10", "#838383"], ["11", "#666666"], ["12", "#333333"],
];
// Superdeal green accent ramp (green9 = brand #36d080)
const BLUES = [
  ["1", "#f2fdf8"], ["2", "#e6fbf0"], ["3", "#d2f7e4"], ["4", "#b6f0d2"],
  ["5", "#93e7bc"], ["6", "#6bdca4"], ["7", "#45d28d"], ["8", "#3ed086"],
  ["9", "#36d080"], ["10", "#2bb56e"], ["11", "#1c9159"], ["12", "#0c5132"],
];
// Brand greens used across the Superdeal homepage / logo.
const BRAND_GREENS: [string, string][] = [
  ["Mint (primary)", "#36d080"],
  ["Mint hover", "#2bb86b"],
  ["Emerald", "#16a34a"],
  ["Mid green", "#2e7d32"],
  ["Forest (logo)", "#0b4d2c"],
  ["Light tint", "#e8f5e9"],
];

// MAIN_COLORS_LIGHT — solid (9) + tint (3) per family, as used by Tags.
const ACCENTS: { name: string; solid: string; tint: string; text: string }[] = [
  { name: "green", solid: "#36d080", tint: "#d2f7e4", text: "#1c9159" },
  { name: "blue", solid: "#3e63dd", tint: "#edf2fe", text: "#3a5bc7" },
  { name: "turquoise", solid: "#12a594", tint: "#e0f8f3", text: "#008573" },
  { name: "sky", solid: "#7ce2fe", tint: "#e1f6fd", text: "#00749e" },
  { name: "red", solid: "#e5484d", tint: "#ffefef", text: "#ce2c31" },
  { name: "orange", solid: "#f76b15", tint: "#ffefd6", text: "#cc4e00" },
  { name: "yellow", solid: "#ffe629", tint: "#fffab8", text: "#9e6c00" },
  { name: "purple", solid: "#8e4ec6", tint: "#f7edfe", text: "#8347b9" },
  { name: "pink", solid: "#d6409f", tint: "#fee9f5", text: "#cd1d8d" },
  { name: "gray", solid: "#999999", tint: "#f1f1f1", text: "#666666" },
];

const THREADS: { avs: [string, string][]; senders: string; count: number; subject: string; snippet: string; date: string }[] = [
  { avs: [["R", "orange"], ["A", "yellow"]], senders: "Rey, Atlas", count: 4, subject: "Video #2", snippet: "For sure — looping in the team on the next cut…", date: "Jun 25" },
  { avs: [["R", "orange"], ["A", "yellow"]], senders: "Rey, Atlas", count: 2, subject: "The Blue update", snippet: "Quick recap from this first week…", date: "Jun 24" },
  { avs: [["A", "green"], ["T", "pink"], ["R", "orange"]], senders: "Atlas +2", count: 5, subject: "Attribution", snippet: "Sharing the model we discussed earlier…", date: "Jun 17" },
  { avs: [["E", "gray"], ["A", "yellow"]], senders: "Eric, Atlas", count: 8, subject: "Atlas x Blue — partnership", snippet: "Welcome aboard! Here's what's next…", date: "Jun 17" },
  { avs: [["R", "orange"]], senders: "Rey F", count: 1, subject: "Application landing page", snippet: "Live now — take a look when you can…", date: "Jun 17" },
  { avs: [["E", "gray"], ["T", "pink"]], senders: "Eric, Thomas", count: 5, subject: "Re: Welcome to LA", snippet: "Looks great — see you then…", date: "Jun 4" },
];

// Content cards — composed: nested CreatorChip + DealRef link + status. Name = deliverable title.
const CONTENT_CARDS: { title: string; creator: string; ci: string; cav: string; deal: string; platform: "Instagram" | "TikTok" | "YouTube"; status: string; color: string; due: string; thumb?: string; scriptOnly?: boolean; comments?: number }[] = [
  { title: "Atlas X Unboxing — Reel v2", creator: "Priya Nair", ci: "PN", cav: "#36d080", deal: "Atlas X · $15k", platform: "Instagram", status: "Content ready", color: "purple", due: "Aug 12", thumb: "linear-gradient(135deg,#8e4ec6,#d6409f)", comments: 3 },
  { title: "Hero TikTok — 30s cut", creator: "Diego Santos", ci: "DS", cav: "#f76b15", deal: "Atlas X · $11k", platform: "TikTok", status: "Awaiting content", color: "blue", due: "Aug 14", thumb: "linear-gradient(135deg,#12a594,#3e63dd)" },
  { title: "Day-in-the-life — script", creator: "Marcus Webb", ci: "MW", cav: "#8e4ec6", deal: "Atlas X · $22k", platform: "YouTube", status: "Script ready", color: "purple", due: "Aug 20", scriptOnly: true, comments: 1 },
];
// Post cards — the published artifact; links to its source Content + carries metrics.
const POST_CARDS: { type: string; creator: string; ci: string; cav: string; content: string; platform: "Instagram" | "TikTok" | "YouTube"; status: string; color: string; date: string; views: string; likes: string; thumb: string }[] = [
  { type: "Reel", creator: "Priya Nair", ci: "PN", cav: "#36d080", content: "Reel v2", platform: "Instagram", status: "Live", color: "green", date: "Aug 13", views: "124k", likes: "3.2k", thumb: "linear-gradient(135deg,#8e4ec6,#d6409f)" },
  { type: "Video", creator: "Diego Santos", ci: "DS", cav: "#f76b15", content: "Hero TikTok", platform: "TikTok", status: "Scheduled", color: "blue", date: "Aug 16", views: "—", likes: "—", thumb: "linear-gradient(135deg,#12a594,#3e63dd)" },
  { type: "Video", creator: "Sofia Reyes", ci: "SR", cav: "#3e63dd", content: "GRWM", platform: "TikTok", status: "Live", color: "green", date: "Aug 10", views: "312k", likes: "8.1k", thumb: "linear-gradient(135deg,#f76b15,#ffe629)" },
];
const PLAT_ICON = { Instagram: IconBrandInstagram, TikTok: IconBrandTiktok, YouTube: IconBrandYoutube };
const PLAT_COLOR = { Instagram: "#C13584", TikTok: "#111111", YouTube: "#FF0000" };

const PEOPLE = [
  { name: "Alyssa Chen", email: "alyssa@acme.io", company: "Acme", av: "#36d080", stage: "Customer", stageColor: "green", city: "Austin", phone: "+1 512 555 0142" },
  { name: "Marcus Webb", email: "m.webb@northwind.com", company: "Northwind", av: "#8e4ec6", stage: "Lead", stageColor: "blue", city: "Denver", phone: "+1 303 555 0199" },
  { name: "Priya Nair", email: "priya@lumen.co", company: "Lumen", av: "#30a46c", stage: "Opportunity", stageColor: "orange", city: "Seattle", phone: "+1 206 555 0107" },
  { name: "Diego Santos", email: "diego@vertex.app", company: "Vertex", av: "#f76b15", stage: "Customer", stageColor: "green", city: "Miami", phone: "+1 305 555 0188" },
  { name: "Hana Kim", email: "hana@meridian.io", company: "Meridian", av: "#d6409f", stage: "Churned", stageColor: "red", city: "Boston", phone: "+1 617 555 0166" },
];

/* ----------------------------------------------------------------- */
/* small presentational helpers                                       */
/* ----------------------------------------------------------------- */
function Tag({ c, children }: { c: typeof ACCENTS[number]; children: React.ReactNode }) {
  return (
    <span className={s.tag} style={{ background: c.tint, color: c.text }}>
      <span className={s.tagDot} />
      {children}
    </span>
  );
}

function Avatar({ color, initials, round }: { color: string; initials: string; round?: boolean }) {
  return (
    <span className={`${s.avatar} ${round ? s.avatarRound : ""}`} style={{ background: color }}>
      {initials}
    </span>
  );
}

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Section order — drives the sticky table-of-contents.
const TOC = [
  "Right panels", "Color", "Typography", "Buttons", "Inputs & controls", "Tabs & toggles",
  "Fields (right panel)", "Creator identity", "Creator mini-cards", "List cards",
  "Content card", "Post card", "Message composer", "Email threads", "Charts & data viz", "Record table",
];
function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={slug(title)} className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>{title}</h2>
        {desc && <span className={s.sectionDesc}>{desc}</span>}
      </div>
      {children}
    </section>
  );
}

/* ----------------------------------------------------------------- */
/* charts — dependency-free SVG, green theme                         */
/* ----------------------------------------------------------------- */
function LineArea({ data, id, w = 300, h = 88, color = "#36d080", area = true, dots = true }: { data: number[]; id: string; w?: number; h?: number; color?: string; area?: boolean; dots?: boolean }) {
  const max = Math.max(...data), min = Math.min(...data), pad = 8;
  const xs = data.map((_, i) => pad + (i * (w - 2 * pad)) / (data.length - 1));
  const ys = data.map((v) => h - pad - ((v - min) / (max - min || 1)) * (h - 2 * pad));
  const line = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const fill = `${line} L${xs[xs.length - 1].toFixed(1)},${h} L${xs[0].toFixed(1)},${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {area && <path d={fill} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {dots && xs.map((x, i) => <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="#fff" stroke={color} strokeWidth="1.5" />)}
    </svg>
  );
}

function Donut({ pct, size = 96, color = "#36d080", label }: { pct: number; size?: number; color?: string; label?: string }) {
  const sw = 9, r = size / 2 - sw, c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ebebeb" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 600 }}>{Math.round(pct * 100)}%</span>
        {label && <span style={{ fontSize: 10, color: "#999999" }}>{label}</span>}
      </div>
    </div>
  );
}

function Bars({ data, color = "#36d080", h = 96 }: { data: { label: string; v: number }[]; color?: string; h?: number }) {
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: h }}>
      {data.map((d) => (
        <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
          <div style={{ width: "100%", maxWidth: 26, height: `${(d.v / max) * (h - 18)}px`, background: color, borderRadius: "4px 4px 0 0" }} />
          <span style={{ fontSize: 10, color: "#999999" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* page                                                               */
/* ----------------------------------------------------------------- */
function AvMini({ color, children }: { color: string; children: React.ReactNode }) {
  const c = ACCENTS.find((a) => a.name === color) ?? ACCENTS.find((a) => a.name === "gray")!;
  return <span className={s.avMini} style={{ background: c.tint, color: c.text }}>{children}</span>;
}
function RecChip({ color, ini, name }: { color: string; ini: string; name: string }) {
  return <span className={s.recChip}><AvMini color={color}>{ini}</AvMini>{name}</span>;
}
/* Nested creator reference — bordered chip + open ↗ (image #11).
   Optional platform·follower chips (richer variant for reach context). */
function CreatorChip({ ini, name, color, platforms }: { ini: string; name: string; color: string; platforms?: { p: "Instagram" | "TikTok" | "YouTube"; f: string }[] }) {
  return (
    <span className={s.cellCard}>
      <span className={s.recordChip}>
        <span className={s.chipAv} style={{ background: color, width: 20, height: 20, fontSize: 10 }}>{ini}</span>
        {name}
        {platforms?.map((pl) => {
          const PIcon = PLAT_ICON[pl.p];
          return <span key={pl.p} className={s.platChip} style={{ height: 18 }}><PIcon size={12} color={PLAT_COLOR[pl.p]} /> {pl.f}</span>;
        })}
      </span>
      <span className={s.cellExpand} aria-label={`Open ${name}`}><IconArrowUpRight size={13} /></span>
    </span>
  );
}
/* Quiet underline link to a related record (deal, content) */
function LinkText({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number }>; children: React.ReactNode }) {
  return <span className={s.linkText}><Icon size={12} /><span className={s.lt}>{children}</span></span>;
}
const CREATOR_SOCIAL: Record<string, { p: "Instagram" | "TikTok" | "YouTube"; f: string }[]> = {
  "Priya Nair": [{ p: "Instagram", f: "128k" }, { p: "TikTok", f: "96k" }],
  "Diego Santos": [{ p: "TikTok", f: "96k" }, { p: "YouTube", f: "40k" }],
  "Marcus Webb": [{ p: "YouTube", f: "210k" }],
  "Sofia Reyes": [{ p: "Instagram", f: "84k" }, { p: "TikTok", f: "152k" }],
};

/* iOS-style message composer — auto-grows; target switcher; ⌘↵ to send */
const RECIPIENTS = [
  { key: "creator", label: "To creator", desc: "Send a Superdeal message", icon: IconUser, placeholder: "Message Priya…", note: false, helper: "" },
  { key: "agent", label: "To agent", desc: "Instruct your manager (AI)", icon: IconSparkles, placeholder: "Tell your manager what to draft or do…", note: false, helper: "Drafts a reply for your approval — won't auto-send." },
  { key: "note", label: "Internal note", desc: "Private — the creator can't see this", icon: IconLock, placeholder: "Add a private note…", note: true, helper: "" },
];
function MessageComposer() {
  const [text, setText] = useState("");
  const [ri, setRi] = useState(0);
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const rec = RECIPIENTS[ri];
  const RIcon = rec.icon;
  const has = text.trim().length > 0;
  const grow = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 156) + "px";
  };
  const send = () => {
    if (!has) return;
    setText("");
    requestAnimationFrame(grow);
  };
  return (
    <div className={s.composer}>
      {rec.helper && <div className={s.composerHelper}><IconSparkles size={12} /> {rec.helper}</div>}
      <textarea
        ref={ref}
        className={s.composerInput}
        rows={1}
        placeholder={rec.placeholder}
        value={text}
        onChange={(e) => { setText(e.target.value); grow(); }}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); } }}
      />
      <div className={s.composerBar}>
        <div style={{ position: "relative" }}>
          {menu && (
            <div className={s.composerMenu}>
              {RECIPIENTS.map((r, i) => {
                const MI = r.icon;
                return (
                  <div key={r.key} className={s.composerMenuItem} onClick={() => { setRi(i); setMenu(false); }}>
                    <MI size={16} />
                    <div><div className={s.cmiTitle}>{r.label}</div><div className={s.cmiDesc}>{r.desc}</div></div>
                  </div>
                );
              })}
            </div>
          )}
          <button className={s.recipientPill} onClick={() => setMenu((m) => !m)}>
            <RIcon size={14} /> {rec.label} <IconChevronDown size={13} />
          </button>
        </div>
        {rec.note && <span className={s.noteHint}><IconLock size={11} /> Private</span>}
        <span className={s.composerSpacer} />
        {has && <span className={s.kbdHint}>⌘↵</span>}
        <button className={s.composerIconBtn} aria-label="attach"><IconPlus size={18} /></button>
        <button
          className={`${s.composerSend} ${!has ? s.composerSendOff : rec.note ? s.composerSendNote : ""}`}
          aria-label={rec.note ? "Save note" : "Send"}
          disabled={!has}
          onClick={send}
        >
          {rec.note ? <IconCheck size={17} stroke={2.5} /> : <IconArrowUp size={18} stroke={2.5} />}
        </button>
      </div>
    </div>
  );
}

/* ---- Stackable right panels (uniform size, sister-panel navigation) ---- */
function CreatorPanel({ name, onClose, onOpenSister }: { name: string; onClose: () => void; onOpenSister: (n: string) => void }) {
  const ini = name.split(" ").map((x) => x[0]).join("").slice(0, 2);
  return (
    <>
      <div className={s.inspectorTop}>
        <span className={s.chipAv} style={{ background: "#36d080" }}>{ini}</span>
        <span className={s.inspectorName}>{name}</span>
        <span className={s.inspectorCreated} style={{ color: "#1c9159" }}>@priya.creates</span>
        <span className={s.inspectorClose} onClick={onClose}><IconX size={15} /></span>
      </div>
      <div className={s.inspectorTabs}>
        <span className={`${s.insTab} ${s.insTabActive}`}><IconHome size={15} /> Home</span>
        <span className={s.insTab}><IconMail size={15} /> Messages</span>
        <span className={s.insTab}>+3 More <IconChevronDown size={13} /></span>
      </div>
      <div className={s.insBody}>
        <div className={s.fieldsHead}>Fields</div>
        <div className={s.fieldGroupLabel}>Profile <IconChevronUp size={15} /></div>
        <div className={s.fieldRow}><span className={s.fieldKey}><IconAt size={16} />Username</span><span className={s.fieldVal}>@priya.creates</span></div>
        <div className={s.fieldRow}><span className={s.fieldKey}><IconHeart size={16} />Engagement</span><span className={s.fieldVal}>4.6%</span></div>
        <div className={s.fieldGroupLabel}>Social accounts <IconChevronUp size={15} /></div>
        <div className={s.fieldRow}><span className={s.fieldKey}><IconBrandInstagram size={16} />Instagram</span><span className={s.fieldVal}>128k followers</span></div>
        <div className={s.fieldRow}><span className={s.fieldKey}><IconBrandTiktok size={16} />TikTok</span><span className={s.fieldVal}>96k followers</span></div>
        <div className={s.fieldGroupLabel}>Relations <IconChevronUp size={15} /></div>
        <div className={s.fieldRow} style={{ cursor: "pointer" }} onClick={() => onOpenSister("Eric Dahan")}>
          <span className={s.fieldKey}><IconUserCircle size={16} />Owner</span>
          <span className={s.fieldVal}><RecChip color="green" ini="ED" name="Eric Dahan" /><IconArrowUpRight size={13} color="#999999" /></span>
        </div>
      </div>
      <div className={s.inspectorFoot}>
        <span className={s.composerSpacer} />
        <button className={`${s.btn} ${s.btnSm} ${s.btnSecondary}`}>Options</button>
        <button className={`${s.btn} ${s.btnSm} ${s.btnPrimary}`}>Open ↗</button>
      </div>
    </>
  );
}
function ReviewPanel({ onClose, onOpenCreator }: { onClose: () => void; onOpenCreator: (n: string) => void }) {
  return (
    <>
      <div className={s.inspectorTop}>
        <span style={{ width: 22, height: 22, borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--bg-tertiary)", color: "var(--font-secondary)", flexShrink: 0 }}><IconFileText size={14} /></span>
        <span className={s.inspectorName}>Review content</span>
        <span className={s.inspectorClose} onClick={onClose}><IconX size={15} /></span>
      </div>
      <div className={s.insBody}>
        <div className={s.drawerPreviewWrap}>
          <div className={s.drawerMedia} style={{ background: "linear-gradient(135deg,#8e4ec6,#d6409f)" }}>
            <span className={s.drawerMediaBadge}><IconBrandInstagram size={14} /></span>
            <IconPlayerPlayFilled size={34} />
            <span className={s.drawerDuration}>0:32</span>
          </div>
        </div>
        <div className={s.drawerLabel}>Caption</div>
        <div className={s.drawerCaption}>Unboxing the new Atlas X 💙 first impressions + a close look at the build. #ad @atlasx</div>
        <div className={s.drawerLabel}>Details</div>
        <div className={s.fieldRow} style={{ cursor: "pointer" }} onClick={() => onOpenCreator("Priya Nair")}>
          <span className={s.fieldKey}><IconUser size={16} />Creator</span>
          <span className={s.fieldVal}><RecChip color="green" ini="PN" name="Priya Nair" /><IconArrowUpRight size={13} color="#999999" /></span>
        </div>
        <div className={s.fieldRow}><span className={s.fieldKey}><IconCircleDashedCheck size={16} />Status</span><span className={s.fieldVal}><Tag c={ACCENTS.find((a) => a.name === "purple")!}>Content ready</Tag></span></div>
        <div className={s.drawerLabel}>Feedback</div>
        <div style={{ padding: "0 16px 16px" }}><MessageComposer /></div>
      </div>
      <div className={s.drawerFoot}>
        <button className={`${s.btn} ${s.btnSecondary}`}><IconX size={15} /> Request changes</button>
        <button className={`${s.btn} ${s.btnPrimary}`}><IconCheck size={15} /> Approve</button>
      </div>
    </>
  );
}
type PanelEntry = { kind: "review" } | { kind: "creator"; name: string };

export default function StyleGuidePage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ "Alyssa Chen": true });
  const [toggle, setToggle] = useState(true);
  const [navTab, setNavTab] = useState("Info");
  const [seg, setSeg] = useState("Active");
  const [openThread, setOpenThread] = useState<number | null>(null);
  const [stack, setStack] = useState<PanelEntry[]>([]);
  const pushPanel = (n: string) => setStack((st) => [...st, { kind: "creator", name: n }]);

  return (
    <div className={`${s.root} ${inter.className}`}>
      {/* ---------- MAIN (sidebar removed — full-width showcase) ---------- */}
      <main className={s.main}>
        <div className={s.topbar}>
          <span className={s.crumb}>
            <IconUser size={15} color="#666666" />
            Superdeal
          </span>
          <IconChevronRight size={14} color="#cccccc" />
          <span className={s.crumbMuted}>Design system</span>
        </div>

        {/* sticky table of contents */}
        <nav className={s.toc} aria-label="Sections">
          {TOC.map((t) => (
            <a key={t} href={`#${slug(t)}`} className={s.tocLink}>{t}</a>
          ))}
        </nav>

        <div className={s.content}>
          <h1 className={s.pageTitle}>Superdeal design system</h1>
          <p className={s.pageSubtitle}>
            Twenty-inspired layout, Superdeal green, Inter type. Living reference — scoped preview, not wired to data.
          </p>

          {/* ============== RIGHT PANELS (stacking, uniform, Twenty-style) ============== */}
          <Section title="Right panels" desc="uniform size · Twenty slide · click a record to open a sister panel">
            <div className={s.row}>
              <button className={`${s.btn} ${s.btnSecondary}`} onClick={() => setStack([{ kind: "creator", name: "Priya Nair" }])}>
                <IconUser size={15} /> Open creator inspector
              </button>
              <button className={`${s.btn} ${s.btnSecondary}`} onClick={() => setStack([{ kind: "review" }])}>
                <IconPlayerPlayFilled size={14} /> Open review drawer
              </button>
            </div>
            <p className={s.subLabel} style={{ marginTop: 12 }}>Inside a panel, click the <b>Creator</b> / <b>Owner</b> row (↗) — a sister panel opens to the right and the stack widens.</p>
          </Section>

          {/* ============== COLORS ============== */}
          <Section title="Color" desc="Gray scale · Superdeal green accent · semantic palette · roles">
            <div className={s.stack}>
              <div>
                <p className={s.subLabel}>Gray scale</p>
                <div className={s.swatchScale}>
                  {GRAYS.map(([n, hex]) => (
                    <div
                      key={n}
                      className={s.swatch}
                      style={{ background: hex, color: Number(n) >= 8 ? "#fff" : "#666" }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={s.subLabel}>Accent — Superdeal green (green9 = #36d080)</p>
                <div className={s.swatchScale}>
                  {BLUES.map(([n, hex]) => (
                    <div
                      key={n}
                      className={s.swatch}
                      style={{ background: hex, color: Number(n) >= 9 ? "#04331e" : "#1c9159" }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={s.subLabel}>Color roles — what each token is for</p>
                <div className={s.roleGrid}>
                  {[
                    ["Background", "#ffffff / #fcfcfc / #f1f1f1", "gray 1 / 2 / 4", "#333333"],
                    ["Border", "#f1f1f1 / #ebebeb / #d6d6d6", "gray 4 / 5 / 6 (light → strong)", "#333333"],
                    ["Text", "#333333 / #666666 / #999999", "gray 12 / 11 / 9 (primary → tertiary)", "#ffffff"],
                    ["Primary action", "#36d080", "green9 — buttons, send, brand", "#ffffff"],
                    ["Text link", "#1c9159", "green11 — legible green links", "#ffffff"],
                    ["Secondary link", "#666666", "gray11 — quiet nav / deal links", "#ffffff"],
                    ["Status / tags", "10 families", "2-tone: dot + tinted text", "#333333"],
                  ].map(([role, val, note, fg]) => (
                    <div key={role} className={s.roleRow}>
                      <span className={s.roleSwatch} style={{ background: (val as string).split(" / ")[0], color: fg as string }} />
                      <span className={s.roleName}>{role}</span>
                      <span className={s.roleVal}>{val}</span>
                      <span className={s.roleNote}>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={s.subLabel}>Brand greens (homepage / logo)</p>
                <div className={s.swatchGrid}>
                  {BRAND_GREENS.map(([name, hex]) => (
                    <div key={hex} className={s.swatchCard}>
                      <div className={s.swatchChip} style={{ background: hex }} />
                      <div className={s.swatchMeta}>
                        <div className={s.swatchName}>{name}</div>
                        <div className={s.swatchHex}>{hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={s.subLabel}>Semantic colors — 2-tone (dot + tinted text)</p>
                <div className={s.row}>
                  {ACCENTS.map((c) => (
                    <Tag key={c.name} c={c}>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ============== TYPOGRAPHY ============== */}
          <Section title="Typography" desc="Inter · weights 400 / 500 / 600">
            <div>
              <div className={s.typeRow}>
                <span className={s.typeMeta}>xxl · 600</span>
                <span style={{ fontSize: "1.85rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  Close more deals
                </span>
              </div>
              <div className={s.typeRow}>
                <span className={s.typeMeta}>xl · 600</span>
                <span style={{ fontSize: "1.54rem", fontWeight: 600 }}>Pipeline overview</span>
              </div>
              <div className={s.typeRow}>
                <span className={s.typeMeta}>lg · 500</span>
                <span style={{ fontSize: "1.23rem", fontWeight: 500 }}>Record details</span>
              </div>
              <div className={s.typeRow}>
                <span className={s.typeMeta}>md · 400</span>
                <span style={{ fontSize: "1rem" }}>The quick brown fox jumps over the lazy dog.</span>
              </div>
              <div className={s.typeRow}>
                <span className={s.typeMeta}>sm · 400 (body)</span>
                <span style={{ fontSize: "0.875rem" }}>
                  The quick brown fox jumps over the lazy dog — 0123456789.
                </span>
              </div>
              <div className={s.typeRow}>
                <span className={s.typeMeta}>xs · 500</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#666" }}>
                  LABELS · META · CAPTIONS
                </span>
              </div>
            </div>
          </Section>

          {/* ============== BUTTONS ============== */}
          <Section title="Buttons" desc="variant × accent · pill radius · green = primary action">
            <div className={s.stack}>
              <div className={s.row}>
                <button className={`${s.btn} ${s.btnPrimary}`}>
                  <IconPlus size={15} /> New record
                </button>
                <button className={`${s.btn} ${s.btnDark}`}>Save</button>
                <button className={`${s.btn} ${s.btnSecondary}`}>Cancel</button>
                <button className={`${s.btn} ${s.btnTertiary}`}>Skip</button>
                <button className={`${s.btn} ${s.btnDanger}`}>
                  <IconTrash size={15} /> Delete
                </button>
              </div>

              <div className={s.row}>
                <button className={`${s.btn} ${s.btnSm} ${s.btnPrimary}`}>
                  <IconPlus size={13} /> Add
                </button>
                <button className={`${s.btn} ${s.btnSm} ${s.btnSecondary}`}>
                  <IconDownload size={13} /> Export
                </button>
                <button className={`${s.btn} ${s.btnSm} ${s.btnTertiary}`}>More</button>
                <button className={`${s.btn} ${s.btnIcon} ${s.btnSecondary}`} aria-label="menu">
                  <IconDotsVertical size={16} />
                </button>
                <button className={`${s.btn} ${s.btnIconSm} ${s.btnTertiary}`} aria-label="add">
                  <IconPlus size={15} />
                </button>
              </div>
            </div>
          </Section>

          {/* ============== INPUTS ============== */}
          <Section title="Inputs & controls" desc="text fields · select · checkbox · toggle">
            <div className={s.row} style={{ alignItems: "flex-start", gap: 32 }}>
              <div className={s.stack} style={{ gap: 16 }}>
                <div className={s.field}>
                  <label className={s.fieldLabel}>Full name</label>
                  <input className={s.input} placeholder="Jane Cooper" defaultValue="Alyssa Chen" />
                </div>
                <div className={s.field}>
                  <label className={s.fieldLabel}>Search</label>
                  <div className={s.inputIconWrap}>
                    <IconSearch size={15} />
                    <input className={s.input} placeholder="Search records…" />
                  </div>
                </div>
                <div className={s.field}>
                  <label className={s.fieldLabel}>Email</label>
                  <input className={`${s.input} ${s.inputError}`} defaultValue="not-an-email" />
                  <span className={`${s.fieldHint} ${s.fieldHintError}`}>Enter a valid email address.</span>
                </div>
              </div>

              <div className={s.stack} style={{ gap: 16 }}>
                <div className={s.field}>
                  <label className={s.fieldLabel}>Stage</label>
                  <div className={s.inputIconWrap}>
                    <input className={s.input} defaultValue="Opportunity" style={{ paddingLeft: 10, paddingRight: 30 }} readOnly />
                    <IconChevronDown size={15} style={{ left: "auto", right: 9 }} />
                  </div>
                </div>
                <div className={s.field}>
                  <label className={s.fieldLabel}>Borderless (inline edit · right panel)</label>
                  <input className={s.inputBare} defaultValue="Alyssa Chen" />
                  <input className={s.inputBare} placeholder="Add value…" />
                </div>
                <div className={s.field}>
                  <label className={s.fieldLabel}>Notes</label>
                  <textarea className={`${s.input} ${s.textarea}`} defaultValue="Met at SaaStr. Wants a demo next week." />
                </div>
                <div className={s.row} style={{ gap: 20 }}>
                  <label className={s.checkRow}>
                    <span className={`${s.checkbox} ${s.checkboxOn}`}><IconCheck size={12} stroke={3} /></span>
                    Subscribed
                  </label>
                  <label className={s.checkRow}>
                    <span className={s.checkbox} />
                    Archived
                  </label>
                  <div
                    className={`${s.toggle} ${toggle ? s.toggleOn : ""}`}
                    onClick={() => setToggle((t) => !t)}
                    role="switch"
                    aria-checked={toggle}
                  >
                    <span className={s.toggleKnob} />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ============== TAGS ============== */}
          <Section title="Tags & badges" desc="colored text on tinted background">
            <div className={s.stack}>
              <div className={s.row}>
                {ACCENTS.map((c) => (
                  <Tag key={c.name} c={c}>
                    {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                  </Tag>
                ))}
              </div>
              <div className={s.row}>
                <span className={s.statusPill}>
                  <Avatar color="#36d080" initials="AC" /> Alyssa Chen
                </span>
                <span className={s.statusPill}>
                  <IconWorld size={14} color="#999999" /> acme.io
                </span>
                <span className={s.statusPill}>
                  <IconCalendarEvent size={14} color="#999999" /> Jun 27, 2026
                </span>
                <span className={s.statusPill}>
                  <IconMail size={14} color="#999999" /> 3 emails
                </span>
              </div>
              <div className={s.row}>
                <Avatar color="#36d080" initials="AC" round />
                <Avatar color="#8e4ec6" initials="MW" round />
                <Avatar color="#30a46c" initials="PN" round />
                <Avatar color="#f76b15" initials="DS" />
                <Avatar color="#d6409f" initials="HK" />
              </div>
            </div>
          </Section>

          {/* ============== CARDS ============== */}
          <Section title="List cards" desc="one card per record · horizontal · hover actions">
            <div className={s.listStack}>
              {PEOPLE.map((p) => {
                const c = ACCENTS.find((a) => a.name === p.stageColor)!;
                const initials = p.name.split(" ").map((x) => x[0]).join("");
                return (
                  <div key={p.name} className={s.listCard}>
                    <span className={s.listIdentity}>
                      <Avatar color={p.av} initials={initials} round />
                      <span className={s.listText}>
                        <span className={s.listName}>{p.name}</span>
                        <span className={s.listSub}>{p.company} · {p.city}</span>
                      </span>
                    </span>
                    <span className={s.listRight}>
                      <Tag c={c}>{p.stage}</Tag>
                      <span className={s.listEmail}>{p.email}</span>
                      <span className={s.listActions}>
                        <button className={`${s.btn} ${s.btnSm} ${s.btnSecondary}`}><IconMail size={13} /> Email</button>
                        <button className={`${s.btn} ${s.btnIconSm} ${s.btnTertiary}`} aria-label="more"><IconDotsVertical size={15} /></button>
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ============== CREATOR MINI-CARDS ============== */}
          <Section title="Creator mini-cards" desc="compact references — table cell · inline · list">
            <div className={s.stack}>
              <div>
                <p className={s.subLabel}>Mini-card (avatar + name + @handle)</p>
                <div className={s.miniRowGrid}>
                  <span className={`${s.creatorCard} ${s.creatorChip}`}>
                    <span className={`${s.creatorAv} ${s.creatorAvChip}`} style={{ background: "#36d080" }}>PN</span>
                    <span className={s.creatorName}>Priya Nair</span>
                    <span className={s.creatorUser}>@priya.creates</span>
                  </span>
                  <span className={`${s.creatorCard} ${s.creatorChip}`}>
                    <span className={`${s.creatorAv} ${s.creatorAvChip}`} style={{ background: "#8e4ec6" }}>MW</span>
                    <span className={s.creatorName}>Marcus Webb</span>
                    <span className={s.creatorUser}>@marcus.w</span>
                  </span>
                  <span className={`${s.creatorCard} ${s.creatorChip}`}>
                    <span className={`${s.creatorAv} ${s.creatorAvChip}`} style={{ background: "#ebebeb", color: "#999999" }}>LP</span>
                    <span className={s.creatorName}>Liam Park</span>
                    <span className={s.creatorEmail}>liam.park@gmail.com</span>
                  </span>
                </div>
              </div>
              <div>
                <p className={s.subLabel}>Avatar-only reference (cell / stack)</p>
                <div className={s.miniRowGrid}>
                  <Avatar color="#36d080" initials="PN" round />
                  <Avatar color="#8e4ec6" initials="MW" round />
                  <Avatar color="#f76b15" initials="DS" round />
                  <Avatar color="#d6409f" initials="HK" round />
                  <span style={{ display: "inline-flex" }}>
                    <AvMini color="orange">R</AvMini>
                    <span style={{ marginLeft: -6 }}><AvMini color="yellow">A</AvMini></span>
                    <span style={{ marginLeft: -6 }}><AvMini color="pink">T</AvMini></span>
                  </span>
                </div>
              </div>
            </div>
          </Section>

          {/* ============== CONTENT CARDS (composed) ============== */}
          <Section title="Content card" desc="name + nested creator chip + deal link + status (lego composition)">
            <div className={s.listStack}>
              {CONTENT_CARDS.map((ct) => {
                const tag = ACCENTS.find((a) => a.name === ct.color)!;
                const PIcon = PLAT_ICON[ct.platform];
                return (
                  <div key={ct.title} className={s.composedCard}>
                    {ct.scriptOnly ? (
                      <span className={`${s.composedThumb} ${s.composedThumbScript}`}><IconFileText size={18} /></span>
                    ) : (
                      <span className={s.composedThumb} style={{ background: ct.thumb }}>
                        <IconPlayerPlayFilled size={16} />
                        <span className={s.composedThumbBadge}><PIcon size={9} /></span>
                      </span>
                    )}
                    <div className={s.composedMain}>
                      <div className={s.composedTop}>
                        <span className={s.composedName}>{ct.title}</span>
                        <span className={s.spacer} />
                        <Tag c={tag}>{ct.status}</Tag>
                        <button className={`${s.btn} ${s.btnIconSm} ${s.btnTertiary}`} aria-label="more"><IconDotsVertical size={15} /></button>
                      </div>
                      <div className={s.composedRefs}>
                        <CreatorChip ini={ct.ci} name={ct.creator} color={ct.cav} platforms={CREATOR_SOCIAL[ct.creator]} />
                        <LinkText icon={IconTargetArrow}>{ct.deal}</LinkText>
                        <span className={s.metaInline}><IconCalendarEvent size={12} /> {ct.due}</span>
                        <span className={s.spacer} />
                        {ct.comments ? <span className={s.metaInline}><IconMessageCircle size={13} /> {ct.comments}</span> : null}
                        <button className={`${s.btn} ${s.btnSm} ${s.btnSecondary}`}>Review</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ============== POST CARDS (composed, no name) ============== */}
          <Section title="Post card" desc="no title — platform·type · creator · prominent metrics">
            <div className={s.listStack}>
              {POST_CARDS.map((p) => {
                const tag = ACCENTS.find((a) => a.name === p.color)!;
                const PIcon = PLAT_ICON[p.platform];
                return (
                  <div key={p.creator + p.content} className={s.composedCard} style={{ alignItems: "center" }}>
                    <span className={s.composedThumb} style={{ background: p.thumb }}>
                      <IconPlayerPlayFilled size={16} />
                      <span className={s.composedThumbBadge}><PIcon size={9} /></span>
                    </span>
                    {/* platform · post type — left of the creator card */}
                    <span className={s.postType}><PIcon size={14} color={PLAT_COLOR[p.platform]} /> {p.type}</span>
                    <CreatorChip ini={p.ci} name={p.creator} color={p.cav} platforms={CREATOR_SOCIAL[p.creator]} />
                    <LinkText icon={IconFileText}>{p.content}</LinkText>
                    <span className={s.spacer} />
                    {/* prominent metrics */}
                    {p.views !== "—" ? (
                      <span className={s.postMetrics}>
                        <span className={s.postMetric}><IconEye size={15} /> {p.views}</span>
                        <span className={s.postMetric}><IconHeart size={15} /> {p.likes}</span>
                      </span>
                    ) : <span className={s.metaInline}><IconCalendarEvent size={13} /> {p.date}</span>}
                    <Tag c={tag}>{p.status}</Tag>
                    <button className={`${s.btn} ${s.btnIconSm} ${s.btnTertiary}`} aria-label="more"><IconDotsVertical size={15} /></button>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ============== TABS & TOGGLES ============== */}
          <Section title="Tabs & toggles" desc="underline nav · segmented control · switch">
            <div className={s.stack}>
              <div>
                <p className={s.subLabel}>Tab navigation (SectionTabs)</p>
                <div className={s.tabsRow} style={{ padding: 0 }}>
                  {[
                    { label: "Info", icon: IconUser },
                    { label: "Deals", icon: IconTargetArrow },
                    { label: "Tasks", icon: IconCheckbox },
                    { label: "Messages", icon: IconMail },
                  ].map((t) => {
                    const Icon = t.icon;
                    const on = navTab === t.label;
                    return (
                      <button key={t.label} className={`${s.tab} ${on ? s.tabActive : ""}`} onClick={() => setNavTab(t.label)}>
                        <Icon size={15} /> {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className={s.subLabel}>Segmented toggle (ToggleGroup)</p>
                <div className={s.segCtl}>
                  {[
                    { v: "All", c: 12 },
                    { v: "Active", c: 5 },
                    { v: "Completed", c: 7 },
                  ].map((o) => (
                    <button key={o.v} className={`${s.segBtn} ${seg === o.v ? s.segBtnOn : ""}`} onClick={() => setSeg(o.v)}>
                      {o.v} <span className={s.segCount}>{o.c}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className={s.subLabel}>Switch</p>
                <div
                  className={`${s.toggle} ${toggle ? s.toggleOn : ""}`}
                  onClick={() => setToggle((t) => !t)}
                  role="switch"
                  aria-checked={toggle}
                >
                  <span className={s.toggleKnob} />
                </div>
              </div>
            </div>
          </Section>

          {/* ============== RIGHT-PANEL FIELDS ============== */}
          <Section title="Fields (right panel)" desc="two-tone rows · muted key · value or placeholder">
            <div className={s.fieldsDemo}>
              <div className={s.fieldsHead}>Fields</div>

              <div className={s.fieldGroupLabel}>Deal <IconChevronUp size={15} /></div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconCurrencyDollar size={16} />Amount</span>
                <span className={s.fieldVal}>$ 15k</span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconCircleDashedCheck size={16} />Stage</span>
                <span className={s.fieldVal}><Tag c={ACCENTS.find((a) => a.name === "red")!}>New</Tag></span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconCalendarEvent size={16} />Close date</span>
                <span className={s.fieldVal}>Jun 10, 2026 5:26 PM</span>
              </div>

              <div className={s.fieldGroupLabel}>Relations <IconChevronUp size={15} /></div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconBuilding size={16} />Company</span>
                <span className={s.fieldVal}><RecChip color="purple" ini="T" name="The Blue" /></span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconUser size={16} />Point of …</span>
                <span className={s.fieldVal}><RecChip color="orange" ini="R" name="Rey Flemings" /></span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconUserCircle size={16} />Owner</span>
                <span className={s.fieldVal}><span className={s.fieldEmptyPill}>Owner</span></span>
              </div>

              <div className={s.fieldGroupLabel}>System <IconChevronUp size={15} /></div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconCalendarEvent size={16} />Creation date</span>
                <span className={s.fieldVal}>about 21 hours ago</span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconHistory size={16} />Created by</span>
                <span className={s.fieldVal}><RecChip color="pink" ini="T" name="Thomas Keeling" /></span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.fieldKey}><IconUsersGroup size={16} />Opportunity</span>
                <span className={s.fieldVal}><RecChip color="gray" ini="A" name="Atlas X Blue (1)" /></span>
              </div>

              <div className={s.insSectionRow} style={{ marginTop: 4 }}>Point of Contact <IconPencil size={15} /></div>
              <div style={{ padding: "0 16px 8px" }}><RecChip color="orange" ini="R" name="Rey Flemings" /></div>
            </div>
          </Section>

          {/* ============== CREATOR IDENTITY ============== */}
          <Section title="Creator identity" desc="bordered card · @username (or email) · platform·follower chips">
            <div className={s.stack}>
              <div>
                <p className={s.subLabel}>Identity card — onboarded · invited (email) · platform chips</p>
                <div className={s.row}>
                  <span className={`${s.creatorCard} ${s.creatorFull}`}>
                    <span className={`${s.creatorAv} ${s.creatorAvFull}`} style={{ background: "#36d080" }}>PN</span>
                    <span className={s.creatorName}>Priya Nair</span>
                    <span className={s.creatorUser}>@priya.creates</span>
                    <span className={s.creatorChips}>
                      <span className={s.platChip}><IconBrandInstagram size={14} color="#C13584" /> 128k</span>
                      <span className={s.platChip}><IconBrandTiktok size={14} color="#111111" /> 96k</span>
                    </span>
                  </span>
                </div>
                <div className={s.row} style={{ marginTop: 10 }}>
                  <span className={`${s.creatorCard} ${s.creatorFull}`}>
                    <span className={`${s.creatorAv} ${s.creatorAvFull}`} style={{ background: "#ebebeb", color: "#999999" }}>LP</span>
                    <span className={s.creatorName}>Liam Park</span>
                    <span className={s.creatorEmail}>liam.park@gmail.com</span>
                    <span className={s.invitePending}>Invite pending</span>
                  </span>
                </div>
              </div>
              <div>
                <p className={s.subLabel}>Platform · follower chips</p>
                <div className={s.row}>
                  <span className={s.platChip}><IconBrandInstagram size={14} color="#C13584" /> 128k</span>
                  <span className={s.platChip}><IconBrandTiktok size={14} color="#111111" /> 96k</span>
                  <span className={s.platChip}><IconBrandYoutube size={14} color="#FF0000" /> 40k</span>
                </div>
              </div>
            </div>
          </Section>

          {/* ============== CHARTS & DATA VIZ ============== */}
          <Section title="Charts & data viz" desc="stat cards · funnel · line · donut · bar · sparkline">
            <div className={s.stack}>
              {/* stat cards */}
              <div className={s.statCards} style={{ padding: 0, maxWidth: 780 }}>
                {[
                  { label: "Reach", value: "2.4M", delta: "+18%", up: true, spark: [10, 12, 11, 16, 15, 20, 19, 24] },
                  { label: "Engagement", value: "4.6%", delta: "+0.4%", up: true, spark: [8, 9, 8, 11, 10, 12, 13, 14] },
                  { label: "Spend", value: "$68.4k", delta: "57% of budget", up: false, spark: [4, 6, 9, 12, 14, 18, 22, 26] },
                  { label: "Conversions", value: "1,284", delta: "+9.2%", up: true, spark: [20, 18, 24, 22, 28, 30, 27, 34] },
                ].map((st) => (
                  <div key={st.label} className={s.statCard}>
                    <div className={s.statLabel}>{st.label}</div>
                    <div className={s.statValue}>{st.value}</div>
                    <div className={s.statDelta} style={{ color: st.up ? "#1c9159" : "#666666" }}>{st.delta}</div>
                    <div style={{ marginTop: 8 }}>
                      <LineArea id={`sp-${st.label}`} data={st.spark} w={180} h={30} area={false} dots={false} />
                    </div>
                  </div>
                ))}
              </div>

              <div className={s.chartGrid}>
                {/* line / area */}
                <div className={s.chartCard} style={{ gridColumn: "span 2" }}>
                  <div className={s.chartHead}><span className={s.chartTitle}>Reach over time</span><span className={s.statDelta} style={{ color: "#1c9159" }}>+18%</span></div>
                  <LineArea id="reach-line" data={[12, 18, 16, 24, 22, 30, 28, 36, 33, 42]} w={500} h={120} />
                </div>

                {/* donut */}
                <div className={s.chartCard}>
                  <div className={s.chartHead}><span className={s.chartTitle}>Budget</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Donut pct={0.57} label="spent" />
                    <div className={s.donutLegend}>
                      <span><span className={s.legendDot} style={{ background: "#36d080" }} /> Spent $68.4k</span>
                      <span><span className={s.legendDot} style={{ background: "#ebebeb" }} /> Left $51.6k</span>
                    </div>
                  </div>
                </div>

                {/* bar */}
                <div className={s.chartCard}>
                  <div className={s.chartHead}><span className={s.chartTitle}>Posts by creator</span></div>
                  <Bars data={[{ label: "PN", v: 5 }, { label: "SR", v: 4 }, { label: "DS", v: 3 }, { label: "MW", v: 2 }, { label: "HK", v: 1 }]} />
                </div>

                {/* deliverable progress */}
                <div className={s.chartCard}>
                  <div className={s.chartHead}><span className={s.chartTitle}>Deliverables</span></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
                    {[["Priya Nair", 3, 5], ["Sofia Reyes", 4, 4], ["Diego Santos", 2, 4]].map(([n, d, t]) => (
                      <div key={n as string}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                          <span>{n}</span><span className={s.swatchHex}>{d}/{t}</span>
                        </div>
                        <div className={s.miniProg}><div className={s.miniProgFill} style={{ width: `${((d as number) / (t as number)) * 100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ============== MESSAGE COMPOSER ============== */}
          <Section title="Message composer" desc="iOS-style · auto-grows · creator / agent / internal note">
            <div className={s.stack} style={{ gap: 10 }}>
              <p className={s.subLabel}>Tap the pill to switch target · type to grow upward</p>
              <MessageComposer />
            </div>
          </Section>

          {/* ============== EMAIL THREADS ============== */}
          <Section title="Email threads" desc="grouped thread list · single thread view (Twenty)">
            <div className={s.row} style={{ alignItems: "flex-start", gap: 24 }}>
              {/* grouped thread list */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className={s.subLabel}>Grouped thread list (ThreadList / ThreadPreview)</p>
                <div className={s.threadsCard}>
                  <div className={s.inboxHead}>
                    <span className={s.inboxTitle}>Inbox</span>
                    <span className={s.inboxCount}>6</span>
                    <div className={s.spacer} />
                    <IconPlus size={16} color="#999999" style={{ cursor: "pointer" }} />
                  </div>
                  {THREADS.map((t, i) => (
                    <div key={i} className={s.threadRow} onClick={() => setOpenThread(i)}>
                      <span className={s.avGroup}>{t.avs.map(([ini, color], j) => <AvMini key={j} color={color}>{ini}</AvMini>)}</span>
                      <span className={s.threadSenders}>{t.senders}</span>
                      <span className={s.threadCount}>{t.count}</span>
                      <span className={s.threadSubject}>{t.subject}</span>
                      <span className={s.threadSnippet}>{t.snippet}</span>
                      <span className={s.threadDate}>{t.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* single thread view */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className={s.subLabel}>Single thread (ThreadView / ThreadMessage) · click a thread →</p>
                <div className={s.tvCard}>
                  <div className={s.tvHead}>
                    <span className={s.tvBack} onClick={() => setOpenThread(null)}><IconArrowLeft size={16} /></span>
                    <AvMini color="gray">T</AvMini>
                    <span className={s.tvSubject}>{THREADS[openThread ?? 1].subject}</span>
                    <span className={s.tvCreated}>Created 2 days ago</span>
                    <span className={s.tvClose}><IconX size={14} /></span>
                  </div>
                  {/* collapsed message */}
                  <div className={s.tvMsg}>
                    <div className={s.tvMsgHead}><AvMini color="orange">R</AvMini><span className={s.tvSender}>Rey Flemings</span><span className={s.tvWhen}>3 days ago</span></div>
                    <div className={s.tvPreview}>Atlas + team — we&apos;ve learned a ton this first week and wanted to share a quick recap…</div>
                  </div>
                  {/* expanded message */}
                  <div className={s.tvMsg}>
                    <div className={s.tvMsgHead}><AvMini color="yellow">A</AvMini><span className={s.tvSender}>Atlas Berry</span><span className={s.tvWhen}>3 days ago</span></div>
                    <div className={s.tvSub}>to: Eric, Atlas Berry, Thomas Keeling…</div>
                    <div className={s.tvBody}>{"Rey —\n\nAwesome updates. The immediate sign-up flow is a big win — glad the tests smoothed it out.\n\nReady to jump on the next video when you are. Want to focus on the upcoming roll-up discussion? If so, share the deck and I'll start a draft.\n\n— Atlas"}</div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Record table" desc="Twenty's signature data grid">
            <div className={s.tableWrap}>
              <div className={s.tableTools}>
                <span className={s.tableChip}><IconList size={15} /> All people</span>
                <span className={s.tableChip}><IconFilter size={15} /> Filter</span>
                <span className={s.tableChip}><IconArrowsSort size={15} /> Sort</span>
                <div className={s.spacer} />
                <span className={s.tableChip}><IconLayoutGrid size={15} /></span>
                <button className={`${s.btn} ${s.btnSm} ${s.btnPrimary}`}><IconPlus size={13} /> New</button>
              </div>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th className={s.checkCol}>
                      <span className={s.checkbox} />
                    </th>
                    <th><span className={s.thIcon}><IconTargetArrow size={14} /> Name</span></th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Stage</th>
                    <th>City</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {PEOPLE.map((p) => {
                    const c = ACCENTS.find((a) => a.name === p.stageColor)!;
                    const on = checked[p.name];
                    const initials = p.name.split(" ").map((x) => x[0]).join("");
                    const isActiveCell = p.name === "Alyssa Chen";
                    return (
                      <tr key={p.name}>
                        <td className={s.checkCol}>
                          <span
                            className={`${s.checkbox} ${on ? s.checkboxOn : ""}`}
                            onClick={() => setChecked((m) => ({ ...m, [p.name]: !on }))}
                          >
                            {on && <IconCheck size={12} stroke={3} />}
                          </span>
                        </td>
                        <td>
                          {isActiveCell ? (
                            // Active / focused cell — light bordered card + expand (image #2)
                            <span className={s.cellCard}>
                              <span className={s.recordChip}>
                                <span className={s.chipAv} style={{ background: p.av }}>{initials}</span>
                                {p.name}
                              </span>
                              <span className={s.cellExpand} aria-label="open record">
                                <IconArrowUpRight size={14} />
                              </span>
                            </span>
                          ) : (
                            <span className={s.recordChip}>
                              <span className={s.chipAv} style={{ background: p.av }}>{initials}</span>
                              {p.name}
                            </span>
                          )}
                        </td>
                        <td className={s.linkCell}>{p.email}</td>
                        <td>{p.company}</td>
                        <td><Tag c={c}>{p.stage}</Tag></td>
                        <td className={s.cellMuted}>{p.city}</td>
                        <td className={s.cellMuted}>{p.phone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          <div className={s.footer}>
            Scoped Twenty theme — tokens from <code>twenty-ui/theme</code>, rendered under{" "}
            <code>.styleGuide</code> only. Your app&apos;s global theme is untouched. Route:{" "}
            <code>/style-guide</code>.
          </div>
        </div>
      </main>

      {/* ---------- stacking right-panel overlay ---------- */}
      <div className={`${s.sgBackdrop} ${stack.length ? s.sgBackdropOn : ""}`} onClick={() => setStack([])} />
      <div className={`${s.panelStack} ${stack.length ? s.panelStackOpen : ""}`}>
        {stack.map((e, i) => (
          <div key={`${e.kind}-${i}`} className={s.stackPanel}>
            {e.kind === "review" ? (
              <ReviewPanel onClose={() => setStack((st) => st.slice(0, i))} onOpenCreator={pushPanel} />
            ) : (
              <CreatorPanel name={e.name} onClose={() => setStack((st) => st.slice(0, i))} onOpenSister={pushPanel} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
