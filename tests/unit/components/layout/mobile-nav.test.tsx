import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";

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
    Menu: () => <svg data-testid="icon-menu" />,
    LayoutDashboard: () => <svg data-testid="icon-dashboard" />,
    Users: () => <svg data-testid="icon-users" />,
    Settings: () => <svg data-testid="icon-settings" />,
  };
});

// Mock Sheet components
vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
    <div data-testid="sheet" data-open={open}>
      {children}
    </div>
  ),
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-trigger">{children}</div>
  ),
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-content">{children}</div>
  ),
  SheetHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-header">{children}</div>
  ),
  SheetTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-title">{children}</div>
  ),
}));

// Mock Button component
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe("MobileNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname.mockReturnValue("/");
  });

  const mockNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Users", href: "/users", icon: Users },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  it("renders the mobile menu trigger button", () => {
    render(<MobileNav items={mockNavItems} />);

    expect(screen.getByTestId("sheet-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("icon-menu")).toBeInTheDocument();
  });

  it("renders Sheet component", () => {
    render(<MobileNav items={mockNavItems} />);

    expect(screen.getByTestId("sheet")).toBeInTheDocument();
  });

  it("renders sheet content with navigation items", () => {
    mockPathname.mockReturnValue("/dashboard");
    render(<MobileNav items={mockNavItems} />);

    expect(screen.getByTestId("sheet-content")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders sheet header with title", () => {
    render(<MobileNav items={mockNavItems} />);

    expect(screen.getByTestId("sheet-header")).toBeInTheDocument();
    expect(screen.getByTestId("sheet-title")).toBeInTheDocument();
  });

  it("renders all navigation items inside sheet", () => {
    mockPathname.mockReturnValue("/dashboard");
    render(<MobileNav items={mockNavItems} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("marks the active route correctly", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(<MobileNav items={mockNavItems} />);

    const links = container.querySelectorAll("a");
    const dashboardLink = Array.from(links).find((link) =>
      link.textContent?.includes("Dashboard")
    );

    expect(dashboardLink).toHaveAttribute("data-active", "true");
  });

  it("renders with correct href attributes", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(<MobileNav items={mockNavItems} />);

    const links = container.querySelectorAll("a");

    expect(links[0]).toHaveAttribute("href", "/dashboard");
    expect(links[1]).toHaveAttribute("href", "/users");
    expect(links[2]).toHaveAttribute("href", "/settings");
  });

  it("handles empty items array", () => {
    mockPathname.mockReturnValue("/");
    render(<MobileNav items={[]} />);

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(0);
  });

  it("renders icons for each navigation item", () => {
    mockPathname.mockReturnValue("/dashboard");
    const { container } = render(<MobileNav items={mockNavItems} />);

    expect(container.querySelector("[data-testid='icon-dashboard']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='icon-users']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='icon-settings']")).toBeInTheDocument();
  });
});
