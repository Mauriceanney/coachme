import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/layout/app-shell";

// Mock the sidebar components before importing
vi.mock("@/components/ui/sidebar", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
}));

// Mock the RoleSidebar component
vi.mock("@/components/layout/role-sidebar", () => ({
  RoleSidebar: ({ role }: { role: string }) => (
    <div data-testid="role-sidebar" data-role={role}>
      Sidebar for {role}
    </div>
  ),
}));

describe("AppShell", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <AppShell role="admin">
        <div data-testid="test-content">Dashboard Content</div>
      </AppShell>
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });

  it("wraps content in SidebarProvider", () => {
    render(
      <AppShell role="coach">
        <div>Content</div>
      </AppShell>
    );

    expect(screen.getByTestId("sidebar-provider")).toBeInTheDocument();
  });

  it("passes role prop to RoleSidebar correctly for admin", () => {
    render(
      <AppShell role="admin">
        <div>Content</div>
      </AppShell>
    );

    const sidebar = screen.getByTestId("role-sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute("data-role", "admin");
    expect(screen.getByText("Sidebar for admin")).toBeInTheDocument();
  });

  it("passes role prop to RoleSidebar correctly for coach", () => {
    render(
      <AppShell role="coach">
        <div>Content</div>
      </AppShell>
    );

    const sidebar = screen.getByTestId("role-sidebar");
    expect(sidebar).toHaveAttribute("data-role", "coach");
    expect(screen.getByText("Sidebar for coach")).toBeInTheDocument();
  });

  it("passes role prop to RoleSidebar correctly for member", () => {
    render(
      <AppShell role="member">
        <div>Content</div>
      </AppShell>
    );

    const sidebar = screen.getByTestId("role-sidebar");
    expect(sidebar).toHaveAttribute("data-role", "member");
    expect(screen.getByText("Sidebar for member")).toBeInTheDocument();
  });

  it("renders main content area with correct structure", () => {
    const { container } = render(
      <AppShell role="admin">
        <div>Test Content</div>
      </AppShell>
    );

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toContainHTML("<div>Test Content</div>");
  });

  it("has flex layout for min-h-screen container", () => {
    const { container } = render(
      <AppShell role="coach">
        <div>Content</div>
      </AppShell>
    );

    // Check that the wrapper div has the correct classes
    const wrapper = container.querySelector(".flex.min-h-screen");
    expect(wrapper).toBeInTheDocument();
  });

  it("main element has flex-1 and overflow-auto classes", () => {
    const { container } = render(
      <AppShell role="member">
        <div>Content</div>
      </AppShell>
    );

    const main = container.querySelector("main");
    expect(main).toHaveClass("flex-1", "overflow-auto");
  });
});
