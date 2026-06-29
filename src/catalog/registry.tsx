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
import contentApprovalModal from "@/catalog/examples/ContentApprovalModal.doc";
import statCard from "@/components/ui/StatCard/StatCard.doc";
import campaignAnalytics from "@/catalog/examples/CampaignAnalytics.doc";
import creatorDiscovery from "@/catalog/examples/CreatorDiscovery.doc";
import radioCard from "@/components/ui/RadioCard/RadioCard.doc";
import rateCard from "@/catalog/examples/RateCard.doc";
import campaignCreationWizard from "@/catalog/examples/CampaignCreationWizard.doc";
import dataTable from "@/components/ui/DataTable/DataTable.doc";
import settingsPage from "@/catalog/examples/SettingsPage.doc";
import campaignRoster from "@/catalog/examples/CampaignRoster.doc";
import dealOverview from "@/catalog/examples/DealOverview.doc";
import paymentDashboard from "@/catalog/examples/PaymentDashboard.doc";
import contentCalendar from "@/catalog/examples/ContentCalendar.doc";
import creatorProfile from "@/catalog/examples/CreatorProfile.doc";
import approvalQueue from "@/catalog/examples/ApprovalQueue.doc";
import campaignReport from "@/catalog/examples/CampaignReport.doc";
import campaignTimeline from "@/catalog/examples/CampaignTimeline.doc";
import outreachDashboard from "@/catalog/examples/OutreachDashboard.doc";
import audienceInsights from "@/catalog/examples/AudienceInsights.doc";
import negotiationView from "@/catalog/examples/NegotiationView.doc";
import brandProfile from "@/catalog/examples/BrandProfile.doc";
import bulkInvitePanel from "@/catalog/examples/BulkInvitePanel.doc";
import creatorReviewModal from "@/catalog/examples/CreatorReviewModal.doc";
import creatorComparison from "@/catalog/examples/CreatorComparison.doc";
import campaignBriefViewer from "@/catalog/examples/CampaignBriefViewer.doc";
import creatorOnboarding from "@/catalog/examples/CreatorOnboarding.doc";
import invoiceView from "@/catalog/examples/InvoiceView.doc";
import workspaceSettings from "@/catalog/examples/WorkspaceSettings.doc";
import alertBanner from "@/components/ui/AlertBanner/AlertBanner.doc";
import tagInput from "@/components/ui/TagInput/TagInput.doc";
import numberInput from "@/components/ui/NumberInput/NumberInput.doc";
import combobox from "@/components/ui/Combobox/Combobox.doc";
import rangeSlider from "@/components/ui/RangeSlider/RangeSlider.doc";
import rating from "@/components/ui/Rating/Rating.doc";
import breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb.doc";
import progressBar from "@/components/ui/ProgressBar/ProgressBar.doc";
import sectionCard from "@/components/ui/SectionCard/SectionCard.doc";
import formLayout from "@/components/ui/FormLayout/FormLayout.doc";
import inlineEdit from "@/components/ui/InlineEdit/InlineEdit.doc";
import keyValueList from "@/components/ui/KeyValueList/KeyValueList.doc";
import contentCard from "@/catalog/examples/ContentCard.doc";
import deliverableTracker from "@/catalog/examples/DeliverableTracker.doc";
import postPerformance from "@/catalog/examples/PostPerformance.doc";
import dealPipeline from "@/catalog/examples/DealPipeline.doc";
import productSeeding from "@/catalog/examples/ProductSeeding.doc";
import campaignSetup from "@/catalog/examples/CampaignSetup.doc";
import creatorGrid from "@/catalog/examples/CreatorGrid.doc";
import liveDashboard from "@/catalog/examples/LiveDashboard.doc";
import conversationThread from "@/catalog/examples/ConversationThread.doc";
import performanceBenchmarks from "@/catalog/examples/PerformanceBenchmarks.doc";
import campaignBudgetTracker from "@/catalog/examples/CampaignBudgetTracker.doc";
import quickAddCreatorModal from "@/catalog/examples/QuickAddCreatorModal.doc";
import affiliateCodeManager from "@/catalog/examples/AffiliateCodeManager.doc";
import contractSignatureFlow from "@/catalog/examples/ContractSignatureFlow.doc";
import creatorPaymentHistory from "@/catalog/examples/CreatorPaymentHistory.doc";
import teamActivityFeed from "@/catalog/examples/TeamActivityFeed.doc";
import campaignStatusBoard from "@/catalog/examples/CampaignStatusBoard.doc";
import creatorOnboardingChecklist from "@/catalog/examples/CreatorOnboardingChecklist.doc";
import campaignInviteCard from "@/catalog/examples/CampaignInviteCard.doc";

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
  contentApprovalModal,
  statCard,
  campaignAnalytics,
  creatorDiscovery,
  radioCard,
  rateCard,
  campaignCreationWizard,
  dataTable,
  settingsPage,
  campaignRoster,
  dealOverview,
  contentCalendar,
  paymentDashboard,
  creatorProfile,
  campaignTimeline,
  campaignReport,
  approvalQueue,
  creatorPanel,
  outreachDashboard,
  audienceInsights,
  negotiationView,
  brandProfile,
  bulkInvitePanel,
  creatorReviewModal,
  creatorComparison,
  campaignBriefViewer,
  creatorOnboarding,
  invoiceView,
  workspaceSettings,
  alertBanner,
  tagInput,
  numberInput,
  combobox,
  rangeSlider,
  rating,
  breadcrumb,
  progressBar,
  sectionCard,
  formLayout,
  inlineEdit,
  keyValueList,
  contentCard,
  deliverableTracker,
  postPerformance,
  dealPipeline,
  productSeeding,
  campaignSetup,
  creatorGrid,
  liveDashboard,
  conversationThread,
  performanceBenchmarks,
  campaignBudgetTracker,
  quickAddCreatorModal,
  affiliateCodeManager,
  contractSignatureFlow,
  creatorPaymentHistory,
  teamActivityFeed,
  campaignStatusBoard,
  creatorOnboardingChecklist,
  campaignInviteCard,
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
 * then composed patterns, then the larger layout + pre-built surfaces that come
 * next (Creator Right Panel, app shell …).
 */
export const NAV: { group: string; entries: NavEntry[] }[] = [
  {
    group: "Foundations",
    entries: [colors, typography, tokens, icons],
  },
  {
    // Layer 1 — atomic building blocks everything else is made from.
    // Nothing in this group may import another component from this list.
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
      rangeSlider,
      rating,
      breadcrumb,
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
    // Layer 2 — compose Primitives + tokens into reusable domain objects.
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
      alertBanner,
      sectionCard,
      formLayout,
      inlineEdit,
      keyValueList,
    ],
  },
  {
    group: "Creator",
    entries: [creatorCard, creatorGrid],
  },
  {
    group: "Patterns",
    entries: [creatorRecordList, activityTimeline, searchModal, mediaGallery, contentCalendar, audienceInsights, contentCard],
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
      contentApprovalModal,
      campaignAnalytics,
      creatorDiscovery,
      rateCard,
      campaignCreationWizard,
      campaignRoster,
      dealOverview,
      paymentDashboard,
      creatorProfile,
      campaignTimeline,
      campaignReport,
      approvalQueue,
      outreachDashboard,
      negotiationView,
      brandProfile,
      bulkInvitePanel,
      creatorReviewModal,
      creatorComparison,
      campaignBriefViewer,
      creatorOnboarding,
      invoiceView,
      workspaceSettings,
      settingsPage,
      deliverableTracker,
      postPerformance,
      dealPipeline,
      productSeeding,
      campaignSetup,
      liveDashboard,
      performanceBenchmarks,
      campaignBudgetTracker,
      quickAddCreatorModal,
      affiliateCodeManager,
      contractSignatureFlow,
      creatorPaymentHistory,
      teamActivityFeed,
      campaignStatusBoard,
      creatorOnboardingChecklist,
      campaignInviteCard,
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
