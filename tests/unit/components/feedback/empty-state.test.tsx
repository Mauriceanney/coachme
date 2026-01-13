import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FileQuestion } from "lucide-react";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "@/components/feedback/empty-state";

describe("EmptyState", () => {
  it("renders with title only", () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders with title and description", () => {
    render(
      <EmptyState
        title="No workouts yet"
        description="Create your first workout to get started"
      />
    );
    expect(screen.getByText("No workouts yet")).toBeInTheDocument();
    expect(
      screen.getByText("Create your first workout to get started")
    ).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    render(
      <EmptyState
        title="No data"
        icon={<FileQuestion data-testid="custom-icon" />}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No items"
        action={{
          label: "Create Item",
          onClick: handleClick,
        }}
      />
    );
    expect(screen.getByRole("button", { name: "Create Item" })).toBeInTheDocument();
  });

  it("calls onClick when action button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No items"
        action={{
          label: "Create Item",
          onClick: handleClick,
        }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Create Item" }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders all elements together", () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No workouts"
        description="Start tracking your fitness journey"
        icon={<FileQuestion data-testid="icon" />}
        action={{
          label: "Add Workout",
          onClick: handleClick,
        }}
      />
    );

    expect(screen.getByText("No workouts")).toBeInTheDocument();
    expect(
      screen.getByText("Start tracking your fitness journey")
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Workout" })).toBeInTheDocument();
  });
});
