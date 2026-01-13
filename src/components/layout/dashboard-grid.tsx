import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function DashboardGrid({ children, columns = 3 }: DashboardGridProps) {
  const columnClasses = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6",
        columnClasses[columns]
      )}
    >
      {children}
    </div>
  );
}
