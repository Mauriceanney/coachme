import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

// Mock Next.js navigation
const mockPathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// Mock lucide-react icons
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    LayoutDashboard: () => <svg data-testid="icon-dashboard" />,
    Users: () => <svg data-testid="icon-users" />,
    Settings: () => <svg data-testid="icon-settings" />,
  };
});

// Mock use-mobile hook
vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("SidebarNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname.mockReturnValue("/");
  });

  const mockNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Users", href: "/users", icon: Users },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  it("renders all navigation items", () => {
    mockPathname.mockReturnValue("/dashboard");
    render(
      <SidebarProvider>
        <SidebarNav items={mockNavItems} />
      </SidebarProvider>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders icons for each navigation item", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(
      <SidebarProvider>
        <SidebarNav items={mockNavItems} />
      </SidebarProvider>
    );

    expect(container.querySelector("[data-testid='icon-dashboard']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='icon-users']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='icon-settings']")).toBeInTheDocument();
  });

  it("marks the active route correctly", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(
      <SidebarProvider>
        <SidebarNav items={mockNavItems} />
      </SidebarProvider>
    );

    const links = container.querySelectorAll("a");
    const dashboardLink = Array.from(links).find((link) =>
      link.textContent?.includes("Dashboard")
    );

    expect(dashboardLink).toHaveAttribute("data-active", "true");
  });

  it("does not mark inactive routes as active", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(
      <SidebarProvider>
        <SidebarNav items={mockNavItems} />
      </SidebarProvider>
    );

    const links = container.querySelectorAll("a");
    const usersLink = Array.from(links).find((link) =>
      link.textContent?.includes("Users")
    );
    const settingsLink = Array.from(links).find((link) =>
      link.textContent?.includes("Settings")
    );

    expect(usersLink).not.toHaveAttribute("data-active", "true");
    expect(settingsLink).not.toHaveAttribute("data-active", "true");
  });

  it("renders with correct href attributes", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(
      <SidebarProvider>
        <SidebarNav items={mockNavItems} />
      </SidebarProvider>
    );

    const links = container.querySelectorAll("a");

    expect(links[0]).toHaveAttribute("href", "/dashboard");
    expect(links[1]).toHaveAttribute("href", "/users");
    expect(links[2]).toHaveAttribute("href", "/settings");
  });

  it("handles empty items array", () => {
    mockPathname.mockReturnValue("/");
    const { container } = render(
      <SidebarProvider>
        <SidebarNav items={[]} />
      </SidebarProvider>
    );

    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(0);
  });

  it("wraps items in a menu structure", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(
      <SidebarProvider>
        <SidebarNav items={mockNavItems} />
      </SidebarProvider>
    );

    const menu = container.querySelector("ul");
    expect(menu).toBeInTheDocument();

    const menuItems = container.querySelectorAll("li");
    expect(menuItems).toHaveLength(3);
  });
});
