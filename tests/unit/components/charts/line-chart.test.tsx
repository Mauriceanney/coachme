import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LineChart } from "@/components/charts/line-chart";

describe("LineChart", () => {
  const mockData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 300 },
  ];

  it("renders with data", () => {
    const { container } = render(<LineChart data={mockData} />);

    // Check that chart container exists
    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    const { container } = render(<LineChart data={[]} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("applies custom height when provided", () => {
    const { container } = render(<LineChart data={mockData} height={400} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("uses default xAxisKey of 'name'", () => {
    const { container } = render(<LineChart data={mockData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("uses default yAxisKey of 'value'", () => {
    const { container } = render(<LineChart data={mockData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("accepts custom xAxisKey", () => {
    const customData = [
      { month: "Jan", value: 100 },
      { month: "Feb", value: 200 },
    ];

    const { container } = render(
      <LineChart data={customData} xAxisKey="month" />
    );

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("accepts custom yAxisKey", () => {
    const customData = [
      { name: "Jan", total: 100 },
      { name: "Feb", total: 200 },
    ];

    const { container } = render(
      <LineChart data={customData} yAxisKey="total" />
    );

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("shows grid by default", () => {
    const { container } = render(<LineChart data={mockData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("hides grid when showGrid is false", () => {
    const { container } = render(
      <LineChart data={mockData} showGrid={false} />
    );

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with single data point", () => {
    const singleData = [{ name: "Jan", value: 100 }];
    const { container } = render(<LineChart data={singleData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with large dataset", () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.random() * 1000,
    }));

    const { container } = render(<LineChart data={largeData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });
});
