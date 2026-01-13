"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
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

export interface AreaChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  gradient?: boolean;
}

export function AreaChart({
  data,
  height = 350,
  gradient = true,
}: AreaChartProps) {
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
      <RechartsAreaChart data={data}>
        <defs>
          <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-value)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-value)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          fill={gradient ? "url(#fillValue)" : "var(--color-value)"}
          fillOpacity={gradient ? 1 : 0.4}
        />
      </RechartsAreaChart>
    </ChartContainer>
  );
}
