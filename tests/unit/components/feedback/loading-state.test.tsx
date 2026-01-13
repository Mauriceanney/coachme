import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingState } from "@/components/feedback/loading-state";

describe("LoadingState", () => {
  it("renders spinner with default size", () => {
    render(<LoadingState />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("renders spinner with small size", () => {
    render(<LoadingState size="sm" />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("renders spinner with medium size", () => {
    render(<LoadingState size="md" />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("renders spinner with large size", () => {
    render(<LoadingState size="lg" />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    render(<LoadingState text="Loading workouts..." />);
    expect(screen.getByText("Loading workouts...")).toBeInTheDocument();
  });

  it("renders without text when not provided", () => {
    const { container } = render(<LoadingState />);
    expect(container.textContent).toBe("");
  });

  it("renders spinner and text together", () => {
    render(<LoadingState text="Please wait" size="lg" />);
    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });
});
