"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";

export interface RadialChartProps {
  value: number;
  max?: number;
  label?: string;
  size?: number;
}

export function RadialChart({
  value,
  max = 100,
  label,
  size = 200,
}: RadialChartProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const chartData = [
    {
      name: label || "progress",
      value: percentage,
      fill: "var(--color-progress)",
    },
  ];

  const chartConfig: ChartConfig = {
    progress: {
      label: label || "Progress",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <ChartContainer
        config={chartConfig}
        className="mx-auto"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={450}
          innerRadius={60}
          outerRadius={80}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fill="var(--color-progress)"
            background
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-2xl font-bold"
          >
            {percentage.toFixed(percentage % 1 === 0 ? 0 : 1)}%
          </text>
        </RadialBarChart>
      </ChartContainer>
      {label && (
        <p className="text-sm text-muted-foreground">{label}</p>
      )}
    </div>
  );
}
