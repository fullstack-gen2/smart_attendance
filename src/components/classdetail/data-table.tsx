"use client";

import { Input } from "@/components/ui/input";
import { ListFilter, UserRoundSearch } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  TableMeta,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showStudentActions?: boolean;
  showAddStudentButton?: boolean;
  studentSummaryText?: string;
  showNote?: boolean;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    expandedRowId?: string | null;
    toggleExpandedRow?: (rowId: string) => void;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showStudentActions = false,
  showAddStudentButton = true,
  studentSummaryText,
  showNote = true,
}: DataTableProps<TData, TValue>) {
  const params = useParams<{ classcode?: string | string[] }>();
  const classcode = Array.isArray(params.classcode)
    ? params.classcode[0]
    : params.classcode;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      expandedRowId,
      toggleExpandedRow: (rowId: string) => {
        setExpandedRowId((current) => (current === rowId ? null : rowId));
      },
    } satisfies TableMeta<TData>,
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-3 pb-4">
        <Input
          placeholder="Search name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <Link
            href={classcode ? `/class/${classcode}/class_list` : "/class"}
            aria-label="Student list options"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-50"
          >
            <UserRoundSearch className="h-5 w-5" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Filter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 transition hover:bg-gray-50"
              >
                <ListFilter className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 p-1">
              <DropdownMenuItem asChild className="justify-center text-sm text-gray-500 hover:text-black focus:text-black">
                <Link href={classcode ? `/class/${classcode}/report` : "/class"}>
                  Day Report
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="justify-center text-sm text-gray-500 hover:text-black focus:text-black">
                <Link href={classcode ? `/class/${classcode}/report/weekly_report` : "/class"}>
                  Weekly Report
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="justify-center text-sm text-gray-500 hover:text-black focus:text-black">
                <Link href={classcode ? `/class/${classcode}/report/monthly_report` : "/class"}>
                  Monthly Report
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="justify-center text-sm text-gray-500 hover:text-black focus:text-black">
                <Link href={classcode ? `/class/${classcode}/report/warning_report` : "/class"}>
                  Student Warning
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {showStudentActions && (
        <div className="mb-4 flex items-end justify-between gap-4">
          {showNote ? (
            <div className="text-sm">
              <p className="font-medium text-black">
                Note:
                <span className="ml-2 font-normal text-red-500">
                  Student with red name is already reach warning
                </span>
              </p>
              <p className="pl-12 text-amber-500">
                Student with yellow name is almost reach warning
              </p>
            </div>
          ) : (
            <div></div>
          )}
          {showAddStudentButton ? (
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Add Student
            </button>
          ) : (
            <p className="text-sm text-[#1f1f1f]">{studentSummaryText}</p>
          )}
        </div>
      )}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rowData = row.original as TData & {
                  id?: string;
                  permissionReason?: string;
                  lateReason?: string;
                };
                const hasExpandedDetails =
                  !!rowData.permissionReason || !!rowData.lateReason;
                const isExpanded =
                  !!rowData.id &&
                  hasExpandedDetails &&
                  expandedRowId === String(rowData.id);

                return (
                  <React.Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {isExpanded && (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="bg-white px-8 py-4"
                        >
                          <div className="space-y-2 text-right text-sm">
                            {rowData.permissionReason && (
                              <p>
                                <span className="text-red-500">Permission:</span>{" "}
                                <span className="text-[#1f1f1f]">
                                  {rowData.permissionReason}
                                </span>
                              </p>
                            )}
                            {rowData.lateReason && (
                              <p>
                                <span className="text-amber-500">Late:</span>{" "}
                                <span className="text-[#1f1f1f]">
                                  {rowData.lateReason}
                                </span>
                              </p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
