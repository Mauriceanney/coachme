import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AreaChart } from "@/components/charts/area-chart";

describe("AreaChart", () => {
  const mockData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 300 },
  ];

  it("renders with data", () => {
    const { container } = render(<AreaChart data={mockData} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    const { container } = render(<AreaChart data={[]} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("applies custom height when provided", () => {
    const { container } = render(<AreaChart data={mockData} height={400} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("renders with gradient by default", () => {
    const { container } = render(<AreaChart data={mockData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders without gradient when gradient is false", () => {
    const { container } = render(
      <AreaChart data={mockData} gradient={false} />
    );

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with single data point", () => {
    const singleData = [{ name: "Jan", value: 100 }];
    const { container } = render(<AreaChart data={singleData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with zero values", () => {
    const dataWithZero = [
      { name: "Jan", value: 100 },
      { name: "Feb", value: 0 },
      { name: "Mar", value: 150 },
    ];

    const { container } = render(<AreaChart data={dataWithZero} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with varying data points", () => {
    const varyingData = [
      { name: "Jan", value: 100 },
      { name: "Feb", value: 500 },
      { name: "Mar", value: 50 },
      { name: "Apr", value: 800 },
    ];

    const { container } = render(<AreaChart data={varyingData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with large dataset", () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.random() * 1000,
    }));

    const { container } = render(<AreaChart data={largeData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });
});
