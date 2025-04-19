"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  type TableOptions,
  type VisibilityState,
} from "@tanstack/react-table"
import { z } from "zod"

import useEffectAfterMount from "@/hooks/use-effect-after-mount"
import { useQueryString } from "@/hooks/use-query-string"

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | "pageCount"
      | "getCoreRowModel"
      | "manualFiltering"
      | "manualPagination"
      | "manualSorting"
    >,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  method?: "push" | "replace"
  scroll?: boolean
  startTransition?: React.TransitionStartFunction
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().optional(),
  ordering: z.string().optional(),
})

export function useDataTable<TData>({
  pageCount = -1,
  method = "replace",
  scroll = false,
  startTransition,
  ...props
}: UseDataTableProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Search params
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams))
  const page = search.page
  const limit = search.limit ?? props.initialState?.pagination?.pageSize ?? 10
  const ordering = search.ordering

  // Create query string
  const { createQueryString } = useQueryString(searchParams)

  // Table states
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(props?.initialState?.columnVisibility || {})
  const [sorting, setSorting] = React.useState<SortingState>(() => {
    if (ordering) {
      const desc = ordering.startsWith("-")
      const id = desc ? ordering.slice(1) : ordering
      return [{ id, desc }]
    }
    return props?.initialState?.sorting || []
  })

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: page - 1,
      pageSize: limit,
    })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  React.useEffect(() => {
    function onUrlChange() {
      const sortQuery =
        sorting.length > 0
          ? `${sorting?.[0]?.desc ? "-" : ""}${sorting?.[0]?.id}`
          : null

      const url = `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize,
        ordering: sortQuery,
      })}`
      method === "push"
        ? router.push(url, { scroll })
        : router.replace(url, { scroll })
    }

    startTransition
      ? startTransition(() => {
          onUrlChange()
        })
      : onUrlChange()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sorting, method, scroll])

  useEffectAfterMount(() => {
    setPagination({ pageIndex: page - 1, pageSize: limit })
  }, [page, limit])

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // Prevent resetting the page on initial render
    if (!mounted) {
      setMounted(true)
      return
    }

    // Initialize new params
    const newParamsObject = {
      page: 1,
    }

    // After cumulating all the changes, push new params
    function onUrlChange() {
      const url = `${pathname}?${createQueryString(newParamsObject)}`

      method === "push"
        ? router.push(url, { scroll })
        : router.replace(url, { scroll })
    }

    startTransition
      ? startTransition(() => {
          onUrlChange()
        })
      : onUrlChange()

    table.setPageIndex(0)
  }, [method, scroll])

  const table = useReactTable({
    ...props,
    pageCount,
    state: {
      pagination,
      columnVisibility,
      rowSelection,
      sorting,
    },
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  return { table }
}
