import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";

describe("BreadcrumbNav", () => {
  it("renders all breadcrumb items", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile" },
    ];

    render(<BreadcrumbNav items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders first items as clickable links", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile" },
    ];

    render(<BreadcrumbNav items={items} />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });

  it("renders last item as non-clickable text", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile" },
    ];

    render(<BreadcrumbNav items={items} />);

    const profileText = screen.getByText("Profile");
    expect(profileText).not.toHaveAttribute("href");
    expect(profileText.tagName).not.toBe("A");
  });

  it("shows separators between items", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile" },
    ];

    const { container } = render(<BreadcrumbNav items={items} />);

    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBeGreaterThanOrEqual(2);
  });

  it("has proper accessibility attributes", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Profile" },
    ];

    render(<BreadcrumbNav items={items} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("renders single item correctly", () => {
    const items = [{ label: "Home" }];

    render(<BreadcrumbNav items={items} />);

    const homeText = screen.getByText("Home");
    expect(homeText).toBeInTheDocument();
    expect(homeText).not.toHaveAttribute("href");
  });

  it("handles empty items array", () => {
    const { container } = render(<BreadcrumbNav items={[]} />);

    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies current page styling to last item", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Profile" },
    ];

    render(<BreadcrumbNav items={items} />);

    const profileText = screen.getByText("Profile");
    expect(profileText).toHaveAttribute("aria-current", "page");
  });
});
