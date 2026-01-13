"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
  value?: { from: Date; to: Date };
  onChange?: (value: { from: Date; to: Date } | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (range: unknown) => {
    const dateRange = range as { from?: Date; to?: Date } | undefined;
    if (dateRange?.from && dateRange?.to) {
      onChange?.({ from: dateRange.from, to: dateRange.to });
      setOpen(false);
    } else if (dateRange?.from) {
      // Only from date selected, keep popover open for 'to' date
      onChange?.(undefined);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          aria-label="Select date range"
        >
          <CalendarIcon className="mr-2 size-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "MMM d, yyyy")} -{" "}
                {format(value.to, "MMM d, yyyy")}
              </>
            ) : (
              format(value.from, "MMM d, yyyy")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleSelect}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
