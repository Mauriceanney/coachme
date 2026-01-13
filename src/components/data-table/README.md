# Data Table Components

Feature-rich, accessible data table components built with TanStack Table v8 and shadcn/ui.

## Components

### Main Component

- **DataTable** - Main table component with sorting, filtering, pagination, and row selection

### Sub-components

- **DataTableColumnHeader** - Sortable column headers with dropdown menu
- **DataTableFacetedFilter** - Multi-select filter with badge display
- **DataTablePagination** - Pagination controls with page size selector
- **DataTableRowActions** - Row action dropdown (view, edit, delete)
- **DataTableToolbar** - Search input and filter controls

## Features

- **Sorting** - Click column headers to sort ascending/descending
- **Filtering** - Search by text and faceted multi-select filters
- **Pagination** - Navigate pages with customizable page size
- **Row Selection** - Select individual rows or all rows
- **Responsive** - Mobile-friendly design
- **Accessible** - WCAG 2.1 AA compliant with ARIA labels
- **Type Safe** - Full TypeScript support with generics

## Usage

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

export function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      filterColumns={["role"]}
    />
  );
}
```

## Advanced Usage

### With Row Selection

```tsx
const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Select row ${row.id}`}
      />
    ),
  },
  // ... other columns
];
```

### With Column Header Sorting

```tsx
import { DataTableColumnHeader } from "@/components/data-table";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
];
```

### With Row Actions

```tsx
import { DataTableRowActions } from "@/components/data-table";

const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={(user) => console.log("View", user)}
        onEdit={(user) => console.log("Edit", user)}
        onDelete={(user) => console.log("Delete", user)}
      />
    ),
  },
];
```

## Props

### DataTable

| Prop | Type | Description |
|------|------|-------------|
| columns | `ColumnDef<TData, TValue>[]` | Column definitions |
| data | `TData[]` | Array of data to display |
| searchKey | `string?` | Column key for search filtering |
| filterColumns | `string[]?` | Column keys for faceted filtering |

### DataTableColumnHeader

| Prop | Type | Description |
|------|------|-------------|
| column | `Column<TData, TValue>` | TanStack Table column |
| title | `string` | Column header text |
| className | `string?` | Additional CSS classes |

### DataTableRowActions

| Prop | Type | Description |
|------|------|-------------|
| row | `Row<TData>` | TanStack Table row |
| onView | `(row: TData) => void?` | View action callback |
| onEdit | `(row: TData) => void?` | Edit action callback |
| onDelete | `(row: TData) => void?` | Delete action callback |

## Testing

All components are fully tested with Vitest and React Testing Library.

```bash
npx vitest run tests/unit/components/data-table/
```

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation supported
- Screen reader friendly
- Focus management for dropdowns and modals
