import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon?: React.ReactNode;
  description?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  description,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && (
            <div className="text-muted-foreground h-4 w-4">{icon}</div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div
            data-testid="stat-change"
            className={cn(
              "mt-2 flex items-center text-sm font-medium",
              change.type === "increase"
                ? "text-emerald-600 dark:text-emerald-500"
                : "text-red-600 dark:text-red-500"
            )}
          >
            {change.type === "increase" ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {change.value}%
          </div>
        )}
        {description && (
          <CardDescription
            data-testid="stat-description"
            className="mt-2"
          >
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
