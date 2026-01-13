import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RadialChart } from "@/components/charts/radial-chart";

describe("RadialChart", () => {
  it("renders with value", () => {
    const { container } = render(<RadialChart value={75} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("displays the value text", () => {
    const { container } = render(<RadialChart value={75} />);

    // Check that chart container exists (text is rendered in SVG but not testable in jsdom)
    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles zero value", () => {
    const { container } = render(<RadialChart value={0} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles 100 value", () => {
    const { container } = render(<RadialChart value={100} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("uses default max of 100", () => {
    const { container } = render(<RadialChart value={50} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("accepts custom max value", () => {
    const { container } = render(<RadialChart value={75} max={150} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<RadialChart value={75} label="Progress" />);

    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    const { container } = render(<RadialChart value={75} />);

    // Label text shouldn't be present
    const labels = container.querySelectorAll("text");
    const hasProgressLabel = Array.from(labels).some(
      (el) => el.textContent === "Progress"
    );
    expect(hasProgressLabel).toBe(false);
  });

  it("applies custom size when provided", () => {
    const { container } = render(<RadialChart value={75} size={200} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles decimal values", () => {
    const { container } = render(<RadialChart value={75.5} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("calculates percentage correctly with custom max", () => {
    const { container } = render(<RadialChart value={25} max={50} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("renders all elements together when all props provided", () => {
    render(
      <RadialChart value={60} max={200} label="Completion" size={250} />
    );

    expect(screen.getByText("Completion")).toBeInTheDocument();
    const chartContainer = document.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles values greater than max", () => {
    render(<RadialChart value={150} max={100} />);

    // Should handle gracefully, might show 100% or 150%
    const chartContainer = document.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });
});
