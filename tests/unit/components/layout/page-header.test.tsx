import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHeader } from "@/components/layout/page-header";

describe("PageHeader", () => {
  it("renders title correctly", () => {
    render(<PageHeader title="Dashboard" />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Dashboard");
  });

  it("renders description when provided", () => {
    render(
      <PageHeader
        title="Dashboard"
        description="Manage your fitness journey"
      />
    );

    expect(screen.getByText("Manage your fitness journey")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <PageHeader
        title="Dashboard"
        actions={<button>Add New</button>}
      />
    );

    expect(screen.getByRole("button", { name: "Add New" })).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<PageHeader title="Dashboard" />);

    // Only the title should be present, no description paragraph
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("does not render actions when not provided", () => {
    const { container } = render(<PageHeader title="Dashboard" />);

    // No action buttons should be present
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(0);
  });

  it("renders all elements together when all props provided", () => {
    render(
      <PageHeader
        title="Workouts"
        description="Track your progress"
        actions={
          <>
            <button>Filter</button>
            <button>Add Workout</button>
          </>
        }
      />
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Workouts");
    expect(screen.getByText("Track your progress")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Workout" })).toBeInTheDocument();
  });
});
