import type { ComponentDoc, NavEntry, PlannedDoc } from "./types";

import colors from "@/catalog/foundations/Colors.doc";
import typography from "@/catalog/foundations/Typography.doc";
import tokens from "@/catalog/foundations/Tokens.doc";
import icons from "@/catalog/foundations/Icons.doc";
import avatar from "@/components/ui/Avatar/Avatar.doc";
import button from "@/components/ui/Button/Button.doc";
import input from "@/components/ui/Input/Input.doc";
import tabs from "@/components/ui/Tabs/Tabs.doc";
import leftNav from "@/components/ui/LeftNav/LeftNav.doc";
import creatorPanel from "@/components/Creator/CreatorPanel/CreatorPanel.doc";
import fieldGroup from "@/components/Fields/FieldGroup/FieldGroup.doc";
import fieldRow from "@/components/Fields/FieldRow/FieldRow.doc";
import platformIcon from "@/components/ui/PlatformIcon/PlatformIcon.doc";
import creatorIdentity from "@/components/Creator/CreatorIdentity/CreatorIdentity.doc";
import creatorPlatformChips from "@/components/Creator/CreatorPlatformChips/CreatorPlatformChips.doc";
import creatorCell from "@/components/Creator/CreatorCell/CreatorCell.doc";
import recordList from "@/components/ui/RecordList/RecordList.doc";
import creatorRecordList from "@/catalog/examples/CreatorRecordList.doc";
import contentList from "@/catalog/examples/ContentList.doc";
import postList from "@/catalog/examples/PostList.doc";
import taskList from "@/catalog/examples/TaskList.doc";
import shipmentList from "@/catalog/examples/ShipmentList.doc";
import creatorCard from "@/components/Creator/CreatorCard/CreatorCard.doc";
import campaignCard from "@/catalog/examples/CampaignCard.doc";
import appShell from "@/catalog/examples/AppShell.doc";
import dealKanban from "@/catalog/examples/DealKanban.doc";
import homeView from "@/catalog/examples/HomeView.doc";
import emptyState from "@/components/ui/EmptyState/EmptyState.doc";
import filterBar from "@/components/ui/FilterBar/FilterBar.doc";
import rosterCreatorRow from "@/catalog/examples/RosterCreatorRow.doc";
import avatarGroup from "@/components/ui/AvatarGroup/AvatarGroup.doc";
import toast from "@/components/ui/Toast/Toast.doc";
import briefCard from "@/catalog/examples/BriefCard.doc";
import tooltip from "@/components/ui/Tooltip/Tooltip.doc";
import dropdown from "@/components/ui/Dropdown/Dropdown.doc";
import skeleton from "@/components/ui/Skeleton/Skeleton.doc";
import multiSelect from "@/components/ui/MultiSelect/MultiSelect.doc";
import datePicker from "@/components/ui/DatePicker/DatePicker.doc";
import fileUpload from "@/components/ui/FileUpload/FileUpload.doc";
import modal from "@/components/ui/Modal/Modal.doc";
import textarea from "@/components/ui/Textarea/Textarea.doc";
import pageHeader from "@/catalog/examples/PageHeader.doc";
import switchDoc from "@/components/ui/Switch/Switch.doc";
import checkbox from "@/components/ui/Checkbox/Checkbox.doc";
import progressStepper from "@/catalog/examples/ProgressStepper.doc";
import badge from "@/components/ui/Badge/Badge.doc";
import toggleGroup from "@/components/ui/ToggleGroup/ToggleGroup.doc";
import select from "@/components/ui/Select/Select.doc";
import contractCard from "@/catalog/examples/ContractCard.doc";
import rightPanel from "@/catalog/examples/RightPanel.doc";
import notificationPanel from "@/catalog/examples/NotificationPanel.doc";
import emailThread from "@/components/ui/EmailThread/EmailThread.doc";
import inboxView from "@/catalog/examples/InboxView.doc";
import activityTimeline from "@/catalog/examples/ActivityTimeline.doc";
import mediaGallery from "@/catalog/examples/MediaGallery.doc";
import accordion from "@/components/ui/Accordion/Accordion.doc";
import searchModal from "@/catalog/examples/SearchModal.doc";
import pagination from "@/components/ui/Pagination/Pagination.doc";
import statCard from "@/components/ui/StatCard/StatCard.doc";
import creatorDiscovery from "@/catalog/examples/CreatorDiscovery.doc";
import radioCard from "@/components/ui/RadioCard/RadioCard.doc";
import dataTable from "@/components/ui/DataTable/DataTable.doc";
import settingsPage from "@/catalog/examples/SettingsPage.doc";
import dealOverview from "@/catalog/examples/DealOverview.doc";
import paymentDashboard from "@/catalog/examples/PaymentDashboard.doc";
import creatorProfile from "@/catalog/examples/CreatorProfile.doc";
import campaignTimeline from "@/catalog/examples/CampaignTimeline.doc";
import approvalQueue from "@/catalog/examples/ApprovalQueue.doc";
import negotiationView from "@/catalog/examples/NegotiationView.doc";
import tagInput from "@/components/ui/TagInput/TagInput.doc";
import numberInput from "@/components/ui/NumberInput/NumberInput.doc";
import combobox from "@/components/ui/Combobox/Combobox.doc";
import progressBar from "@/components/ui/ProgressBar/ProgressBar.doc";
import inlineEdit from "@/components/ui/InlineEdit/InlineEdit.doc";
import contentCard from "@/catalog/examples/ContentCard.doc";
import deliverableTracker from "@/catalog/examples/DeliverableTracker.doc";
import dealPipeline from "@/catalog/examples/DealPipeline.doc";
import productSeeding from "@/catalog/examples/ProductSeeding.doc";
import campaignSetup from "@/catalog/examples/CampaignSetup.doc";
import creatorGrid from "@/catalog/examples/CreatorGrid.doc";
import conversationThread from "@/catalog/examples/ConversationThread.doc";
import quickAddCreatorModal from "@/catalog/examples/QuickAddCreatorModal.doc";
import contractSignatureFlow from "@/catalog/examples/ContractSignatureFlow.doc";
import creatorOnboardingChecklist from "@/catalog/examples/CreatorOnboardingChecklist.doc";
import contentSubmissionForm from "@/catalog/examples/ContentSubmissionForm.doc";
import revisionRequestPanel from "@/catalog/examples/RevisionRequestPanel.doc";
import productSeedingTracker from "@/catalog/examples/ProductSeedingTracker.doc";
import creatorInsightsPanel from "@/catalog/examples/CreatorInsightsPanel.doc";
import creatorPayoutWallet from "@/catalog/examples/CreatorPayoutWallet.doc";
import discoveryFiltersPanel from "@/catalog/examples/DiscoveryFiltersPanel.doc";
import teamMemberManagement from "@/catalog/examples/TeamMemberManagement.doc";
import brandCampaignTimeline from "@/catalog/examples/BrandCampaignTimeline.doc";
import creatorDiscoveryCard from "@/catalog/examples/CreatorDiscoveryCard.doc";
import integrationSettings from "@/catalog/examples/IntegrationSettings.doc";
import contentKanban from "@/catalog/examples/ContentKanban.doc";
import agentChat from "@/catalog/examples/AgentChat.doc";
import dealCard from "@/catalog/examples/DealCard.doc";
import campaignCreatorsTable from "@/catalog/examples/CampaignCreatorsTable.doc";
import brandSafetyPage from "@/catalog/examples/BrandSafetyPage.doc";
import dealTaskCard from "@/catalog/examples/DealTaskCard.doc";
import creatorTodoList from "@/catalog/examples/CreatorTodoList.doc";
import deliverableDetailDrawer from "@/catalog/examples/DeliverableDetailDrawer.doc";
import campaignTabLayout from "@/catalog/examples/CampaignTabLayout.doc";
import creatorEngagementCard from "@/catalog/examples/CreatorEngagementCard.doc";

/** Real, documented components (have demos + props). */
export const DOCS: ComponentDoc[] = [
  colors,
  typography,
  tokens,
  icons,
  avatar,
  button,
  input,
  tabs,
  leftNav,
  fieldGroup,
  fieldRow,
  platformIcon,
  creatorIdentity,
  creatorPlatformChips,
  creatorCell,
  recordList,
  creatorRecordList,
  contentList,
  postList,
  taskList,
  shipmentList,
  creatorCard,
  campaignCard,
  appShell,
  dealKanban,
  homeView,
  emptyState,
  filterBar,
  rosterCreatorRow,
  avatarGroup,
  toast,
  briefCard,
  tooltip,
  dropdown,
  skeleton,
  multiSelect,
  datePicker,
  fileUpload,
  modal,
  textarea,
  pageHeader,
  switchDoc,
  checkbox,
  progressStepper,
  badge,
  toggleGroup,
  select,
  contractCard,
  rightPanel,
  notificationPanel,
  emailThread,
  inboxView,
  activityTimeline,
  mediaGallery,
  accordion,
  searchModal,
  pagination,
  statCard,
  creatorDiscovery,
  radioCard,
  dataTable,
  settingsPage,
  dealOverview,
  paymentDashboard,
  creatorProfile,
  campaignTimeline,
  approvalQueue,
  creatorPanel,
  negotiationView,
  tagInput,
  numberInput,
  combobox,
  progressBar,
  inlineEdit,
  contentCard,
  deliverableTracker,
  dealPipeline,
  productSeeding,
  campaignSetup,
  creatorGrid,
  conversationThread,
  quickAddCreatorModal,
  contractSignatureFlow,
  creatorOnboardingChecklist,
  contentSubmissionForm,
  revisionRequestPanel,
  productSeedingTracker,
  creatorInsightsPanel,
  creatorPayoutWallet,
  discoveryFiltersPanel,
  teamMemberManagement,
  brandCampaignTimeline,
  creatorDiscoveryCard,
  integrationSettings,
  contentKanban,
  agentChat,
  dealCard,
  campaignCreatorsTable,
  brandSafetyPage,
  dealTaskCard,
  creatorTodoList,
  deliverableDetailDrawer,
  campaignTabLayout,
  creatorEngagementCard,
];

/** Planned entries — render a "coming soon" stub, keep the roadmap visible. */
const planned = (
  slug: string,
  title: string,
  group: string,
  summary: string,
): PlannedDoc => ({ slug, title, group, status: "planned", summary });

/**
 * Ordered navigation. Mirrors the COMPONENTS.md taxonomy: primitives first,
 * then composed patterns, then the larger layout + pre-built surfaces.
 */
export const NAV: { group: string; entries: NavEntry[] }[] = [
  {
    group: "Foundations",
    entries: [colors, typography, tokens, icons],
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
    group: "Core Components",
    entries: [
      platformIcon,
      avatarGroup,
      creatorIdentity,
      creatorPlatformChips,
      creatorCell,
      recordList,
      emptyState,
      filterBar,
      progressStepper,
      accordion,
      pagination,
      statCard,
      dataTable,
      inlineEdit,
    ],
  },
  {
    group: "Creator",
    entries: [creatorCard, creatorGrid],
  },
  {
    group: "Patterns",
    entries: [creatorRecordList, activityTimeline, searchModal, mediaGallery, contentCard],
  },
  {
    group: "Record Views",
    entries: [contentList, postList, taskList, shipmentList],
  },
  {
    group: "Messaging",
    entries: [emailThread, inboxView, conversationThread],
  },
  {
    group: "Layout",
    entries: [appShell, rightPanel, pageHeader],
  },
  {
    group: "Pre-built / Composite",
    entries: [
      homeView,
      creatorPanel,
      campaignCard,
      dealKanban,
      rosterCreatorRow,
      briefCard,
      contractCard,
      notificationPanel,
      creatorDiscovery,
      dealOverview,
      paymentDashboard,
      creatorProfile,
      campaignTimeline,
      brandCampaignTimeline,
      approvalQueue,
      negotiationView,
      settingsPage,
      deliverableTracker,
      dealPipeline,
      productSeeding,
      productSeedingTracker,
      campaignSetup,
      quickAddCreatorModal,
      contractSignatureFlow,
      creatorOnboardingChecklist,
      contentSubmissionForm,
      revisionRequestPanel,
      creatorInsightsPanel,
      creatorPayoutWallet,
      discoveryFiltersPanel,
      creatorDiscoveryCard,
      teamMemberManagement,
      integrationSettings,
      contentKanban,
      agentChat,
      dealCard,
      campaignCreatorsTable,
      brandSafetyPage,
      dealTaskCard,
      creatorTodoList,
      deliverableDetailDrawer,
      campaignTabLayout,
      creatorEngagementCard,
    ],
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
