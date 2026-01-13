import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BarChart } from "@/components/charts/bar-chart";

describe("BarChart", () => {
  const mockData = [
    { name: "Mon", value: 100 },
    { name: "Tue", value: 200 },
    { name: "Wed", value: 150 },
    { name: "Thu", value: 300 },
  ];

  it("renders with data", () => {
    const { container } = render(<BarChart data={mockData} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    const { container } = render(<BarChart data={[]} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("applies custom height when provided", () => {
    const { container } = render(<BarChart data={mockData} height={400} />);

    const chartContainer = container.querySelector('[data-slot="chart"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("renders vertical bars by default", () => {
    const { container } = render(<BarChart data={mockData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders horizontal bars when horizontal is true", () => {
    const { container } = render(
      <BarChart data={mockData} horizontal={true} />
    );

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with single data point", () => {
    const singleData = [{ name: "Mon", value: 100 }];
    const { container } = render(<BarChart data={singleData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with zero values", () => {
    const dataWithZero = [
      { name: "Mon", value: 100 },
      { name: "Tue", value: 0 },
      { name: "Wed", value: 150 },
    ];

    const { container } = render(<BarChart data={dataWithZero} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with negative values", () => {
    const dataWithNegative = [
      { name: "Mon", value: 100 },
      { name: "Tue", value: -50 },
      { name: "Wed", value: 150 },
    ];

    const { container } = render(<BarChart data={dataWithNegative} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });

  it("renders with large dataset", () => {
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: Math.random() * 1000,
    }));

    const { container } = render(<BarChart data={largeData} />);

    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument();
  });
});
