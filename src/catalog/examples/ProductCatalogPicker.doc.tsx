"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSearch,
  IconCheck,
  IconPlus,
  IconMinus,
  IconPackage,
  IconAlertTriangle,
  IconFilter,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type ProductStatus = "active" | "low_stock" | "out_of_stock";
type ProductCategory = "serum" | "moisturizer" | "spf" | "cleanser" | "treatment";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: string;
  gradient: string;
  status: ProductStatus;
  stock: number;
  rating: number;
  bestseller?: boolean;
}

const CAT_META: Record<ProductCategory, { label: string; tone: keyof typeof TONES }> = {
  serum:       { label: "Serum",       tone: "pink"   },
  moisturizer: { label: "Moisturizer", tone: "blue"   },
  spf:         { label: "SPF",         tone: "orange" },
  cleanser:    { label: "Cleanser",    tone: "green"  },
  treatment:   { label: "Treatment",   tone: "purple" },
};

const STATUS_META: Record<ProductStatus, { label: string; tone: keyof typeof TONES }> = {
  active:       { label: "In stock",   tone: "green"  },
  low_stock:    { label: "Low stock",  tone: "yellow" },
  out_of_stock: { label: "Out of stock", tone: "red"  },
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Aura Glow Serum",         sku: "AGL-001", category: "serum",       price: "$48", gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", status: "active",       stock: 284,  rating: 5, bestseller: true  },
  { id: "p2", name: "HydraBarrier Moisturizer", sku: "HBM-002", category: "moisturizer", price: "$62", gradient: "linear-gradient(135deg,#e0f2fe,#0ea5e9)", status: "active",       stock: 193,  rating: 4                   },
  { id: "p3", name: "Daily Defense SPF 50",     sku: "DDS-003", category: "spf",         price: "$38", gradient: "linear-gradient(135deg,#fed7aa,#f97316)", status: "low_stock",    stock: 14,   rating: 4, bestseller: true  },
  { id: "p4", name: "Gentle Foam Cleanser",     sku: "GFC-004", category: "cleanser",    price: "$29", gradient: "linear-gradient(135deg,#d1fae5,#10b981)", status: "active",       stock: 441,  rating: 4                   },
  { id: "p5", name: "Retinol Night Serum",      sku: "RNS-005", category: "serum",       price: "$78", gradient: "linear-gradient(135deg,#ede9fe,#7c3aed)", status: "active",       stock: 97,   rating: 5                   },
  { id: "p6", name: "Pore Refining Toner",      sku: "PRT-006", category: "treatment",   price: "$35", gradient: "linear-gradient(135deg,#fce7f3,#db2777)", status: "active",       stock: 58,   rating: 3                   },
  { id: "p7", name: "Vitamin C Brightening",    sku: "VCB-007", category: "serum",       price: "$55", gradient: "linear-gradient(135deg,#fef9c3,#eab308)", status: "out_of_stock", stock: 0,    rating: 5, bestseller: true  },
  { id: "p8", name: "Niacinamide 10% Essence",  sku: "NE-008",  category: "treatment",   price: "$42", gradient: "linear-gradient(135deg,#f0fdf4,#22c55e)", status: "low_stock",    stock: 6,    rating: 4                   },
];

/* ---- Demo ---- */
function Demo() {
  const [query,    setQuery]    = useState("");
  const [catFil,   setCatFil]   = useState<ProductCategory | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set(["p1"]));

  function toggle(id: string) {
    const prod = PRODUCTS.find((p) => p.id === id)!;
    if (prod.status === "out_of_stock") return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const visible = PRODUCTS.filter((p) => {
    if (catFil !== "all" && p.category !== catFil) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const selCount  = selected.size;
  const selPrices = PRODUCTS.filter((p) => selected.has(p.id)).map((p) => parseFloat(p.price.replace("$", "")));
  const selTotal  = selPrices.reduce((s, n) => s + n, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Select products to seed</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Priya Nair · Summer Glow Campaign</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>{selCount} selected · ${selTotal.toFixed(0)} total value</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Retail value for reporting</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 9, padding: "7px 12px", marginBottom: 10 }}>
        <IconSearch size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 12, background: "transparent", fontFamily: "inherit" }} />
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={() => setCatFil("all")}
          style={{ padding: "3px 10px", borderRadius: 99, background: catFil === "all" ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: catFil === "all" ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All
        </button>
        {(Object.keys(CAT_META) as ProductCategory[]).map((cat) => {
          const { label, tone } = CAT_META[cat];
          const active = catFil === cat;
          return (
            <button key={cat} onClick={() => setCatFil(active ? "all" : cat)}
              style={{ padding: "3px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 14 }}>
        {visible.map((prod) => {
          const isSelected    = selected.has(prod.id);
          const isOOS         = prod.status === "out_of_stock";
          const { tone: ct }  = CAT_META[prod.category];
          const { label: sl, tone: st } = STATUS_META[prod.status];

          return (
            <div key={prod.id} onClick={() => toggle(prod.id)}
              style={{ border: `2px solid ${isSelected ? TONES.blue.text : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 12, overflow: "hidden", cursor: isOOS ? "not-allowed" : "pointer", opacity: isOOS ? 0.5 : 1, transition: "border-color 0.15s", position: "relative" }}>

              {/* Checkbox */}
              <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: 6, background: isSelected ? TONES.blue.text : "#fff", border: `2px solid ${isSelected ? TONES.blue.text : "var(--sd-border-default, #e5e7eb)"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                {isSelected && <IconCheck size={11} style={{ color: "#fff" }} />}
              </div>

              {/* Bestseller */}
              {prod.bestseller && (
                <div style={{ position: "absolute", top: 8, left: 8, padding: "2px 7px", borderRadius: 99, background: "#f59e0b", fontSize: 9, fontWeight: 800, color: "#fff", zIndex: 2 }}>
                  BESTSELLER
                </div>
              )}

              {/* Image */}
              <div style={{ height: 72, background: prod.gradient }} />

              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 2, lineHeight: 1.3 }}>{prod.name}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", fontFamily: "monospace", marginBottom: 6 }}>{prod.sku}</div>

                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
                  <Badge label={CAT_META[prod.category].label} tone={ct} size="sm" />
                  <Badge label={sl} tone={st} size="sm" dot />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: TONES.orange.text }}>{prod.price}</span>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1,2,3,4,5].map((s) => s <= prod.rating
                      ? <IconStarFilled key={s} size={9} style={{ color: "#f59e0b" }} />
                      : <IconStar       key={s} size={9} style={{ color: "#e5e7eb" }} />
                    )}
                  </div>
                </div>

                {prod.status !== "out_of_stock" && (
                  <div style={{ fontSize: 10, color: prod.stock <= 20 ? TONES.yellow.text : "var(--sd-font-tertiary, #999)", marginTop: 3, fontWeight: prod.stock <= 20 ? 700 : 400 }}>
                    {prod.stock} units available
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "12px 14px", background: "var(--sd-bg-secondary, #f9f9f9)", borderRadius: 10, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>{selCount > 0 ? `${selCount} product${selCount > 1 ? "s" : ""} selected` : "No products selected"}</div>
          {selCount > 0 && <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Retail value: ${selTotal.toFixed(0)}</div>}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setSelected(new Set())} disabled={selCount === 0}>Clear</Button>
        <Button variant="primary"   size="sm" leftIcon={<IconPackage size={11} />} disabled={selCount === 0}>Add to seeding list</Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "product-catalog-picker",
  title: "ProductCatalogPicker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Product selection grid for creator seeding — 8 products with gradient thumbnails, category/status badges, star ratings, stock counts, and multi-select with running total.",
  description:
    "Lets brands pick which products to send a creator for a seeding campaign. Header: campaign + creator context, live 'N selected · $X total value' counter. Search input. 5 category filter chips: Serum / Moisturizer / SPF / Cleanser / Treatment. 2-column product grid: each card has gradient thumbnail (72px), BESTSELLER gold pill (conditional), checkbox in top-right (blue fill when selected, border when not), product name, SKU in monospace, category badge + status badge (In stock / Low stock / Out of stock), price in orange, 5-star rating row, stock count (yellow+bold when ≤20). Out-of-stock cards are 50% opacity and unclickable. Clicking any available card toggles selection (blue 2px border when selected). Footer: 'X products selected', retail value, Clear + Add to seeding list (both disabled when nothing selected). Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Product catalog picker",
      description: "Click products to select/deselect. Filter by category. Search by name. Note low-stock warnings and out-of-stock lockout. Watch the counter update in the footer.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
