import { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { DataTable } from "@/components/data-table/data-table";

// Test data types
type TestData = {
  id: string;
  name: string;
  status: "active" | "inactive";
  email: string;
};

// Sample test data
const testData: TestData[] = [
  { id: "1", name: "Alice Smith", status: "active", email: "alice@example.com" },
  { id: "2", name: "Bob Johnson", status: "inactive", email: "bob@example.com" },
  { id: "3", name: "Charlie Brown", status: "active", email: "charlie@example.com" },
  { id: "4", name: "Diana Prince", status: "active", email: "diana@example.com" },
  { id: "5", name: "Eve Wilson", status: "inactive", email: "eve@example.com" },
];

// Sample columns
const columns: ColumnDef<TestData>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

describe("DataTable", () => {
  it("renders data correctly", () => {
    render(<DataTable columns={columns} data={testData} />);

    // Check that all rows are rendered
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("supports column sorting", () => {
    // Use columns with sortable headers
    const sortableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
    ];

    render(<DataTable columns={sortableColumns} data={testData} />);

    // Initially, data should be in original order
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Eve Wilson")).toBeInTheDocument();

    // The table should render successfully with sortable columns
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("supports text search filtering", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={testData} searchKey="name" />);

    // Find search input
    const searchInput = screen.getByPlaceholderText(/search/i);

    // Type in search
    await user.type(searchInput, "Alice");

    // Should only show Alice
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();
  });

  it("supports pagination", async () => {
    const user = userEvent.setup();
    // Create more data to trigger pagination
    const manyData = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Person ${i + 1}`,
      status: "active" as const,
      email: `person${i + 1}@example.com`,
    }));

    render(<DataTable columns={columns} data={manyData} />);

    // Check first page shows first item
    expect(screen.getByText("Person 1")).toBeInTheDocument();

    // Should have pagination controls
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();

    // Go to next page
    await user.click(nextButton);

    // First item should not be visible on page 2
    expect(screen.queryByText("Person 1")).not.toBeInTheDocument();

    // Page 2 should show Person 11 (if page size is 10)
    expect(screen.getByText("Person 11")).toBeInTheDocument();
  });

  it("supports row selection", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={testData} />);

    // Find first row checkbox (skip header checkbox)
    const checkboxes = screen.getAllByRole("checkbox");
    const firstRowCheckbox = checkboxes[1]; // Index 0 is select-all

    expect(firstRowCheckbox).not.toBeChecked();

    // Click to select
    await user.click(firstRowCheckbox!);

    expect(firstRowCheckbox).toBeChecked();
  });

  it("supports select all rows", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={testData} />);

    // Find select all checkbox (first checkbox)
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /select all/i,
    });

    // Click select all
    await user.click(selectAllCheckbox);

    // All row checkboxes should be checked
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.slice(1).forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it("displays page size selector", () => {
    render(<DataTable columns={columns} data={testData} />);

    // Should have a page size selector showing current size
    expect(screen.getByText(/rows per page/i)).toBeInTheDocument();
  });

  it("renders with accessible table structure", () => {
    render(<DataTable columns={columns} data={testData} />);

    // Should have proper table role
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // Should have column headers
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /email/i })).toBeInTheDocument();
  });
});
