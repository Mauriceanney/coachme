"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatComparisonProps {
  current: number;
  previous: number;
  label: string;
  format?: "number" | "currency" | "percentage";
}

export function StatComparison({
  current,
  previous,
  label,
  format = "number",
}: StatComparisonProps) {
  const change = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
  const isIncrease = change > 0;
  const isDecrease = change < 0;

  const formatValue = (value: number) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      case "percentage":
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{formatValue(current)}</div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isIncrease
                ? "text-green-600 dark:text-green-500"
                : isDecrease
                  ? "text-red-600 dark:text-red-500"
                  : "text-muted-foreground"
            }`}
            data-testid="stat-change"
          >
            {isIncrease && <ArrowUp className="h-4 w-4" />}
            {isDecrease && <ArrowDown className="h-4 w-4" />}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          vs previous period
        </p>
      </CardContent>
    </Card>
  );
}
