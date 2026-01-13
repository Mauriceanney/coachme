"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  horizontal?: boolean;
}

export function BarChart({
  data,
  height = 350,
  horizontal = false,
}: BarChartProps) {
  const chartConfig: ChartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full"
      style={{ height: `${height}px` }}
    >
      <RechartsBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {horizontal ? (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
          </>
        ) : (
          <>
            <XAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis type="number" tickLine={false} axisLine={false} />
          </>
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}
