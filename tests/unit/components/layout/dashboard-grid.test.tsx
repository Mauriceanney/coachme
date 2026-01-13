import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DashboardGrid } from "@/components/layout/dashboard-grid";

describe("DashboardGrid", () => {
  it("renders children correctly", () => {
    render(
      <DashboardGrid>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </DashboardGrid>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });

  it("applies default 3-column grid class", () => {
    const { container } = render(
      <DashboardGrid>
        <div>Child</div>
      </DashboardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid");
    // Should have responsive classes for 3 columns
    expect(grid.className).toContain("lg:grid-cols-3");
  });

  it("applies 1-column grid class when columns=1", () => {
    const { container } = render(
      <DashboardGrid columns={1}>
        <div>Child</div>
      </DashboardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("lg:grid-cols-1");
  });

  it("applies 2-column grid class when columns=2", () => {
    const { container } = render(
      <DashboardGrid columns={2}>
        <div>Child</div>
      </DashboardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("lg:grid-cols-2");
  });

  it("applies 4-column grid class when columns=4", () => {
    const { container } = render(
      <DashboardGrid columns={4}>
        <div>Child</div>
      </DashboardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("lg:grid-cols-4");
  });

  it("applies responsive classes for mobile", () => {
    const { container } = render(
      <DashboardGrid columns={3}>
        <div>Child</div>
      </DashboardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    // Should be 1 column on mobile
    expect(grid.className).toContain("grid-cols-1");
    // Should be 2 columns on medium screens
    expect(grid.className).toContain("md:grid-cols-2");
  });

  it("applies gap between grid items", () => {
    const { container } = render(
      <DashboardGrid>
        <div>Child</div>
      </DashboardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("gap");
  });

  it("renders multiple children in grid layout", () => {
    render(
      <DashboardGrid columns={2}>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
        <div data-testid="item-3">Item 3</div>
        <div data-testid="item-4">Item 4</div>
      </DashboardGrid>
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
    expect(screen.getByTestId("item-4")).toBeInTheDocument();
  });
});
