import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoleSidebar } from "@/components/layout/role-sidebar";

// Mock Next.js navigation
const mockPathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// Mock the sidebar UI components
vi.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <aside data-testid="sidebar">{children}</aside>
  ),
  SidebarContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-content">{children}</div>
  ),
  SidebarHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-header">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <ul data-testid="sidebar-menu">{children}</ul>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="sidebar-menu-item">{children}</li>
  ),
  SidebarMenuButton: ({
    isActive,
    children,
  }: {
    asChild?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
  }) => (
    <button data-testid="sidebar-menu-button" data-active={isActive}>
      {children}
    </button>
  ),
}));

describe("RoleSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname.mockReturnValue("/");
  });

  describe("Admin Role", () => {
    it("renders admin navigation items", () => {
      mockPathname.mockReturnValue("/admin");
      render(<RoleSidebar role="admin" />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Coaches")).toBeInTheDocument();
      expect(screen.getByText("Subscriptions")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Support")).toBeInTheDocument();
      expect(screen.getByText("Communications")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("marks active route correctly for admin dashboard", () => {
      mockPathname.mockReturnValue("/admin");
      const { container } = render(<RoleSidebar role="admin" />);

      const buttons = container.querySelectorAll("[data-testid='sidebar-menu-button']");
      const dashboardButton = Array.from(buttons).find((btn) =>
        btn.textContent?.includes("Dashboard")
      );

      expect(dashboardButton).toHaveAttribute("data-active", "true");
    });

    it("marks active route correctly for admin coaches page", () => {
      mockPathname.mockReturnValue("/admin/coaches");
      const { container } = render(<RoleSidebar role="admin" />);

      const buttons = container.querySelectorAll("[data-testid='sidebar-menu-button']");
      const coachesButton = Array.from(buttons).find((btn) =>
        btn.textContent?.includes("Coaches")
      );

      expect(coachesButton).toHaveAttribute("data-active", "true");
    });
  });

  describe("Coach Role", () => {
    it("renders coach navigation items", () => {
      mockPathname.mockReturnValue("/coach");
      render(<RoleSidebar role="coach" />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Academies")).toBeInTheDocument();
      expect(screen.getByText("Members")).toBeInTheDocument();
      expect(screen.getByText("Programs")).toBeInTheDocument();
      expect(screen.getByText("Library")).toBeInTheDocument();
      expect(screen.getByText("Offers")).toBeInTheDocument();
      expect(screen.getByText("Messaging")).toBeInTheDocument();
      expect(screen.getByText("Community")).toBeInTheDocument();
      expect(screen.getByText("Gamification")).toBeInTheDocument();
      expect(screen.getByText("Analytics")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Alerts")).toBeInTheDocument();
    });

    it("marks active route correctly for coach dashboard", () => {
      mockPathname.mockReturnValue("/coach");
      const { container } = render(<RoleSidebar role="coach" />);

      const buttons = container.querySelectorAll("[data-testid='sidebar-menu-button']");
      const dashboardButton = Array.from(buttons).find((btn) =>
        btn.textContent?.includes("Dashboard")
      );

      expect(dashboardButton).toHaveAttribute("data-active", "true");
    });

    it("marks active route correctly for coach programs page", () => {
      mockPathname.mockReturnValue("/coach/programs");
      const { container } = render(<RoleSidebar role="coach" />);

      const buttons = container.querySelectorAll("[data-testid='sidebar-menu-button']");
      const programsButton = Array.from(buttons).find((btn) =>
        btn.textContent?.includes("Programs")
      );

      expect(programsButton).toHaveAttribute("data-active", "true");
    });
  });

  describe("Member Role", () => {
    it("renders member navigation items", () => {
      mockPathname.mockReturnValue("/member");
      render(<RoleSidebar role="member" />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Programs")).toBeInTheDocument();
      expect(screen.getByText("Progress")).toBeInTheDocument();
      expect(screen.getByText("Messages")).toBeInTheDocument();
      expect(screen.getByText("Community")).toBeInTheDocument();
      expect(screen.getByText("Achievements")).toBeInTheDocument();
      expect(screen.getByText("Discover")).toBeInTheDocument();
      expect(screen.getByText("Notifications")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("marks active route correctly for member dashboard", () => {
      mockPathname.mockReturnValue("/member");
      const { container } = render(<RoleSidebar role="member" />);

      const buttons = container.querySelectorAll("[data-testid='sidebar-menu-button']");
      const dashboardButton = Array.from(buttons).find((btn) =>
        btn.textContent?.includes("Dashboard")
      );

      expect(dashboardButton).toHaveAttribute("data-active", "true");
    });

    it("marks active route correctly for member progress page", () => {
      mockPathname.mockReturnValue("/member/progress");
      const { container } = render(<RoleSidebar role="member" />);

      const buttons = container.querySelectorAll("[data-testid='sidebar-menu-button']");
      const progressButton = Array.from(buttons).find((btn) =>
        btn.textContent?.includes("Progress")
      );

      expect(progressButton).toHaveAttribute("data-active", "true");
    });
  });

  describe("Structure", () => {
    it("renders sidebar wrapper", () => {
      render(<RoleSidebar role="admin" />);
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    it("renders sidebar content area", () => {
      render(<RoleSidebar role="coach" />);
      expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
    });

    it("renders sidebar menu", () => {
      render(<RoleSidebar role="member" />);
      expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
    });

    it("renders correct number of menu items for admin", () => {
      const { container } = render(<RoleSidebar role="admin" />);
      const menuItems = container.querySelectorAll("[data-testid='sidebar-menu-item']");
      expect(menuItems).toHaveLength(7); // 7 admin nav items
    });

    it("renders correct number of menu items for coach", () => {
      const { container } = render(<RoleSidebar role="coach" />);
      const menuItems = container.querySelectorAll("[data-testid='sidebar-menu-item']");
      expect(menuItems).toHaveLength(12); // 12 coach nav items
    });

    it("renders correct number of menu items for member", () => {
      const { container } = render(<RoleSidebar role="member" />);
      const menuItems = container.querySelectorAll("[data-testid='sidebar-menu-item']");
      expect(menuItems).toHaveLength(9); // 9 member nav items
    });
  });
});
