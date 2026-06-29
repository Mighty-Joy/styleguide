import React from "react";
import type { PropsTableDef } from "../types";
import s from "./DocSite.module.css";

export function PropsTable({ table }: { table: PropsTableDef }) {
  return (
    <div>
      {table.title && <div className={s.propsTitle}>{table.title}</div>}
      <table className={s.table}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r) => (
            <tr key={r.name}>
              <td>
                <span className={s.propName}>{r.name}</span>
                {r.required && <span className={s.required}>*</span>}
              </td>
              <td>
                <span className={s.propType}>{r.type}</span>
              </td>
              <td>
                <span className={s.propDefault}>{r.default ?? "—"}</span>
              </td>
              <td className={s.propDesc}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropsTable;
