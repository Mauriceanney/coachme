"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  value = "",
  onChange,
  onClear,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.("");
    onClear?.();
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        role="searchbox"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        className="pl-9 pr-9"
        aria-label="Search"
      />
      {internalValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
