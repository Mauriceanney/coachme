"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  filterColumns?: string[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  filterColumns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={`Search ${searchKey}...`}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filterColumns?.map((columnId) => {
          const column = table.getColumn(columnId);
          if (!column) return null;

          const uniqueValues = Array.from(
            new Set(
              table
                .getCoreRowModel()
                .rows.map((row) => row.getValue(columnId))
                .filter(Boolean)
            )
          );

          const options = uniqueValues.map((value) => ({
            label: String(value),
            value: String(value),
          }));

          return (
            <DataTableFacetedFilter
              key={columnId}
              column={column}
              title={columnId}
              options={options}
            />
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
