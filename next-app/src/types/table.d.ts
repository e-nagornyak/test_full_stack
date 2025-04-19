import "@tanstack/react-table"

import { type RowData } from "@tanstack/table-core" //or vue, svelte, solid, qwik, etc.

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    cellClassName?: string
  }
}
