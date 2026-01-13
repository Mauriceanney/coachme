import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatComparison } from "@/components/charts/stat-comparison";

describe("StatComparison", () => {
  it("renders label", () => {
    render(<StatComparison current={100} previous={80} label="Workouts" />);

    expect(screen.getByText("Workouts")).toBeInTheDocument();
  });

  it("displays current value", () => {
    render(<StatComparison current={100} previous={80} label="Workouts" />);

    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("calculates percentage increase correctly", () => {
    render(<StatComparison current={100} previous={80} label="Workouts" />);

    // (100 - 80) / 80 * 100 = 25%
    expect(screen.getByText(/25\.0%/)).toBeInTheDocument();
  });

  it("calculates percentage decrease correctly", () => {
    render(<StatComparison current={80} previous={100} label="Workouts" />);

    // (80 - 100) / 100 * 100 = -20%
    expect(screen.getByText(/20\.0%/)).toBeInTheDocument();
  });

  it("shows positive indicator for increase", () => {
    const { container } = render(
      <StatComparison current={100} previous={80} label="Workouts" />
    );

    const changeElement = container.querySelector('[data-testid="stat-change"]');
    expect(changeElement?.className).toMatch(/text-green|text-emerald|text-success/);
  });

  it("shows negative indicator for decrease", () => {
    const { container } = render(
      <StatComparison current={80} previous={100} label="Workouts" />
    );

    const changeElement = container.querySelector('[data-testid="stat-change"]');
    expect(changeElement?.className).toMatch(/text-red|text-destructive/);
  });

  it("handles zero previous value", () => {
    render(<StatComparison current={100} previous={0} label="Workouts" />);

    expect(screen.getByText("100")).toBeInTheDocument();
    // When previous is 0, typically shows as 100% increase or infinity
  });

  it("handles zero current value", () => {
    render(<StatComparison current={0} previous={100} label="Workouts" />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("handles equal values (no change)", () => {
    render(<StatComparison current={100} previous={100} label="Workouts" />);

    expect(screen.getByText("0.0%")).toBeInTheDocument();
  });

  it("formats as number by default", () => {
    render(<StatComparison current={1234} previous={1000} label="Steps" />);

    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("formats as currency when format is currency", () => {
    render(
      <StatComparison
        current={1234.56}
        previous={1000}
        label="Revenue"
        format="currency"
      />
    );

    expect(screen.getByText(/\$1,234\.56|\$1234\.56/)).toBeInTheDocument();
  });

  it("formats as percentage when format is percentage", () => {
    render(
      <StatComparison
        current={85}
        previous={75}
        label="Completion Rate"
        format="percentage"
      />
    );

    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("handles negative values", () => {
    render(<StatComparison current={-50} previous={-100} label="Loss" />);

    expect(screen.getByText("-50")).toBeInTheDocument();
  });

  it("handles decimal values", () => {
    render(
      <StatComparison current={99.9} previous={100.1} label="Average" />
    );

    expect(screen.getByText("99.9")).toBeInTheDocument();
  });

  it("renders all elements together", () => {
    render(
      <StatComparison
        current={1500}
        previous={1200}
        label="Total Revenue"
        format="currency"
      />
    );

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText(/\$1,500|\$1500/)).toBeInTheDocument();
    expect(screen.getByText(/25\.0%/)).toBeInTheDocument();
  });
});
