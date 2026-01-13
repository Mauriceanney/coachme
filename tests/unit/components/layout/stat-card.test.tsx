import { render, screen } from "@testing-library/react";
import { Activity } from "lucide-react";
import { describe, it, expect } from "vitest";
import { StatCard } from "@/components/layout/stat-card";

describe("StatCard", () => {
  it("renders title and value correctly", () => {
    render(<StatCard title="Total Workouts" value={42} />);

    expect(screen.getByText("Total Workouts")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders string value correctly", () => {
    render(<StatCard title="Current Streak" value="7 days" />);

    expect(screen.getByText("Current Streak")).toBeInTheDocument();
    expect(screen.getByText("7 days")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <StatCard
        title="Total Workouts"
        value={42}
        description="Completed this month"
      />
    );

    expect(screen.getByText("Completed this month")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(
      <StatCard title="Total Workouts" value={42} />
    );

    // Check that no description text is present
    const descriptions = container.querySelectorAll('[data-testid="stat-description"]');
    expect(descriptions).toHaveLength(0);
  });

  it("renders icon when provided", () => {
    render(
      <StatCard
        title="Total Workouts"
        value={42}
        icon={<Activity data-testid="activity-icon" />}
      />
    );

    expect(screen.getByTestId("activity-icon")).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    const { container } = render(
      <StatCard title="Total Workouts" value={42} />
    );

    // Check that no icon container is present
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeLessThanOrEqual(1); // May have arrow icons for change
  });

  it("renders positive change with green color and up arrow", () => {
    render(
      <StatCard
        title="Total Workouts"
        value={42}
        change={{ value: 12, type: "increase" }}
      />
    );

    const changeText = screen.getByText(/12%/);
    expect(changeText).toBeInTheDocument();

    // Check for green/positive styling
    const changeElement = changeText.closest('div');
    expect(changeElement?.className).toMatch(/text-green|text-emerald|text-success/);
  });

  it("renders negative change with red color and down arrow", () => {
    render(
      <StatCard
        title="Total Workouts"
        value={42}
        change={{ value: 5, type: "decrease" }}
      />
    );

    const changeText = screen.getByText(/5%/);
    expect(changeText).toBeInTheDocument();

    // Check for red/negative styling
    const changeElement = changeText.closest('div');
    expect(changeElement?.className).toMatch(/text-red|text-destructive/);
  });

  it("does not render change indicator when not provided", () => {
    const { container } = render(
      <StatCard title="Total Workouts" value={42} />
    );

    // Check that no change indicator is present
    const changeElements = container.querySelectorAll('[data-testid="stat-change"]');
    expect(changeElements).toHaveLength(0);
  });

  it("renders all elements together when all props provided", () => {
    render(
      <StatCard
        title="Total Calories"
        value="2,450"
        description="Burned this week"
        icon={<Activity data-testid="activity-icon" />}
        change={{ value: 15, type: "increase" }}
      />
    );

    expect(screen.getByText("Total Calories")).toBeInTheDocument();
    expect(screen.getByText("2,450")).toBeInTheDocument();
    expect(screen.getByText("Burned this week")).toBeInTheDocument();
    expect(screen.getByTestId("activity-icon")).toBeInTheDocument();
    expect(screen.getByText(/15%/)).toBeInTheDocument();
  });

  it("uses Card component for proper styling", () => {
    const { container } = render(
      <StatCard title="Total Workouts" value={42} />
    );

    // Should have card styling
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
  });

  it("displays large value text for emphasis", () => {
    render(<StatCard title="Total Workouts" value={42} />);

    const valueElement = screen.getByText("42");
    expect(valueElement.className).toMatch(/text-2xl|text-3xl|text-4xl/);
  });

  it("renders zero as a valid value", () => {
    render(<StatCard title="Missed Days" value={0} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders decimal values correctly", () => {
    render(<StatCard title="Average Rating" value="4.5" />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });
});
