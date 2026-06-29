"use client";

import React from "react";
import {
  IconMoneybag,
  IconBuildingFactory2,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import FieldGroup from "./FieldGroup";
import FieldRow from "@/components/Fields/FieldRow";
import {
  FieldTextEditor,
  FieldCurrencyEditor,
} from "@/components/Fields/editors/FieldEditors";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "field-group",
  title: "FieldGroup",
  group: "Fields",
  status: "stable",
  summary:
    "A collapsible labeled section of record fields — the Business / Contact groups in the right panel.",
  description:
    "Groups FieldRows under a heading with a collapse chevron. This is the structure the Creator Right Panel's Info tab is built from: stacked FieldGroups, each holding typed FieldRows.",
  source: "Twenty record field section",
  demos: [
    {
      title: "Business & Contact",
      description:
        "Click a section heading to collapse it; click a field value to edit it. This recreates the right-panel inspector.",
      block: true,
      render: () => (
        <div style={{ width: "100%", maxWidth: 440 }}>
          <FieldGroup label="Business">
            <FieldRow
              icon={<IconMoneybag size={16} />}
              label="Annual Revenue"
              placeholder="Annual Revenue"
              editor={(close) => (
                <FieldCurrencyEditor placeholder="Currency" onClose={close} />
              )}
            />
            <FieldRow
              icon={<IconBuildingFactory2 size={16} />}
              label="Industry"
              value="Consumer Goods"
              editor={(close) => (
                <FieldTextEditor defaultValue="Consumer Goods" onClose={close} />
              )}
            />
          </FieldGroup>
          <FieldGroup label="Contact">
            <FieldRow
              icon={<IconMail size={16} />}
              label="Email"
              value="hi@acme.io"
              editor={(close) => (
                <FieldTextEditor defaultValue="hi@acme.io" onClose={close} />
              )}
            />
            <FieldRow
              icon={<IconPhone size={16} />}
              label="Phone"
              placeholder="Add phone"
              editor={(close) => (
                <FieldTextEditor placeholder="Add phone" onClose={close} />
              )}
            />
          </FieldGroup>
        </div>
      ),
    },
  ],
  props: [
    {
      title: "FieldGroupProps",
      rows: [
        { name: "label", type: "string", required: true, description: 'Section heading, e.g. "Business".' },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Whether the section starts expanded." },
        { name: "children", type: "ReactNode", description: "FieldRows." },
      ],
    },
  ],
};

export default doc;
