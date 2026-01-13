"use client";

import {
  Line,
  LineChart as RechartsLineChart,
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

export interface LineChartProps {
  data: Array<Record<string, string | number>>;
  xAxisKey?: string;
  yAxisKey?: string;
  height?: number;
  showGrid?: boolean;
}

export function LineChart({
  data,
  xAxisKey = "name",
  yAxisKey = "value",
  height = 350,
  showGrid = true,
}: LineChartProps) {
  const chartConfig: ChartConfig = {
    [yAxisKey]: {
      label: yAxisKey.charAt(0).toUpperCase() + yAxisKey.slice(1),
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full"
      style={{ height: `${height}px` }}
    >
      <RechartsLineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey={yAxisKey}
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
}
