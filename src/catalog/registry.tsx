import type { ComponentDoc, NavEntry, PlannedDoc } from "./types";

/* ── Foundations ────────────────────────────────────────── */
import colors      from "@/catalog/foundations/Colors.doc";
import typography  from "@/catalog/foundations/Typography.doc";
import tokens      from "@/catalog/foundations/Tokens.doc";
import icons       from "@/catalog/foundations/Icons.doc";
import architecture from "@/catalog/foundations/Architecture.doc";

/* ── Primitives ─────────────────────────────────────────── */
import avatar      from "@/components/ui/Avatar/Avatar.doc";
import badge       from "@/components/ui/Badge/Badge.doc";
import button      from "@/components/ui/Button/Button.doc";
import input       from "@/components/ui/Input/Input.doc";
import textarea    from "@/components/ui/Textarea/Textarea.doc";
import select      from "@/components/ui/Select/Select.doc";
import multiSelect from "@/components/ui/MultiSelect/MultiSelect.doc";
import datePicker  from "@/components/ui/DatePicker/DatePicker.doc";
import fileUpload  from "@/components/ui/FileUpload/FileUpload.doc";
import toggleGroup from "@/components/ui/ToggleGroup/ToggleGroup.doc";
import switchDoc   from "@/components/ui/Switch/Switch.doc";
import checkbox    from "@/components/ui/Checkbox/Checkbox.doc";
import radioCard   from "@/components/ui/RadioCard/RadioCard.doc";
import dropdown    from "@/components/ui/Dropdown/Dropdown.doc";
import modal       from "@/components/ui/Modal/Modal.doc";
import tooltip     from "@/components/ui/Tooltip/Tooltip.doc";
import toast       from "@/components/ui/Toast/Toast.doc";
import skeleton    from "@/components/ui/Skeleton/Skeleton.doc";
import tagInput    from "@/components/ui/TagInput/TagInput.doc";
import numberInput from "@/components/ui/NumberInput/NumberInput.doc";
import combobox    from "@/components/ui/Combobox/Combobox.doc";
import progressBar from "@/components/ui/ProgressBar/ProgressBar.doc";

/* ── Navigation ─────────────────────────────────────────── */
import tabs        from "@/components/ui/Tabs/Tabs.doc";
import leftNav     from "@/components/ui/LeftNav/LeftNav.doc";

/* ── Fields ─────────────────────────────────────────────── */
import fieldGroup  from "@/components/Fields/FieldGroup/FieldGroup.doc";
import fieldRow    from "@/components/Fields/FieldRow/FieldRow.doc";

/* ── Core Components ────────────────────────────────────── */
import platformIcon        from "@/components/ui/PlatformIcon/PlatformIcon.doc";
import avatarGroup         from "@/components/ui/AvatarGroup/AvatarGroup.doc";
import creatorIdentity     from "@/components/Creator/CreatorIdentity/CreatorIdentity.doc";
import creatorPlatformChips from "@/components/Creator/CreatorPlatformChips/CreatorPlatformChips.doc";
import creatorCell         from "@/components/Creator/CreatorCell/CreatorCell.doc";
import recordList          from "@/components/ui/RecordList/RecordList.doc";
import emptyState          from "@/components/ui/EmptyState/EmptyState.doc";
import filterBar           from "@/components/ui/FilterBar/FilterBar.doc";
import accordion           from "@/components/ui/Accordion/Accordion.doc";
import pagination          from "@/components/ui/Pagination/Pagination.doc";
import statCard            from "@/components/ui/StatCard/StatCard.doc";
import dataTable           from "@/components/ui/DataTable/DataTable.doc";
import inlineEdit          from "@/components/ui/InlineEdit/InlineEdit.doc";

/* ── Creator ─────────────────────────────────────────────── */
import creatorCard         from "@/components/Creator/CreatorCard/CreatorCard.doc";
import creatorPanel        from "@/components/Creator/CreatorPanel/CreatorPanel.doc";

/* ── Email ───────────────────────────────────────────────── */
import emailThread         from "@/components/ui/EmailThread/EmailThread.doc";

/** All documented components. */
export const DOCS: ComponentDoc[] = [
  colors,
  typography,
  tokens,
  icons,
  architecture,
  // primitives
  avatar,
  badge,
  button,
  input,
  textarea,
  select,
  multiSelect,
  datePicker,
  fileUpload,
  toggleGroup,
  switchDoc,
  checkbox,
  radioCard,
  dropdown,
  modal,
  tooltip,
  toast,
  skeleton,
  tagInput,
  numberInput,
  combobox,
  progressBar,
  // navigation
  tabs,
  leftNav,
  // fields
  fieldGroup,
  fieldRow,
  // core
  platformIcon,
  avatarGroup,
  creatorIdentity,
  creatorPlatformChips,
  creatorCell,
  recordList,
  emptyState,
  filterBar,
  accordion,
  pagination,
  statCard,
  dataTable,
  inlineEdit,
  // creator
  creatorCard,
  creatorPanel,
  // email
  emailThread,
];

/** Ordered navigation. */
export const NAV: { group: string; entries: NavEntry[] }[] = [
  {
    group: "Foundations",
    entries: [colors, typography, tokens, icons, architecture],
  },
  {
    group: "Primitives",
    entries: [
      avatar,
      badge,
      button,
      input,
      textarea,
      select,
      multiSelect,
      datePicker,
      fileUpload,
      toggleGroup,
      switchDoc,
      checkbox,
      radioCard,
      dropdown,
      modal,
      tooltip,
      toast,
      skeleton,
      tagInput,
      numberInput,
      combobox,
      progressBar,
    ],
  },
  {
    group: "Navigation",
    entries: [tabs, leftNav],
  },
  {
    group: "Fields",
    entries: [fieldGroup, fieldRow],
  },
  {
    group: "Core",
    entries: [
      platformIcon,
      avatarGroup,
      creatorIdentity,
      creatorPlatformChips,
      creatorCell,
      recordList,
      emptyState,
      filterBar,
      accordion,
      pagination,
      statCard,
      dataTable,
      inlineEdit,
      emailThread,
    ],
  },
  {
    group: "Creator",
    entries: [creatorCard, creatorPanel],
  },
];

export function getDoc(slug: string): ComponentDoc | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function getEntry(slug: string): NavEntry | undefined {
  for (const g of NAV) {
    const hit = g.entries.find((e) => e.slug === slug);
    if (hit) return hit;
  }
  return undefined;
}
