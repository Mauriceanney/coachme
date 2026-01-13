"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "Add tags...",
  suggestions = [],
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;

    if (value.includes(trimmed)) {
      setInputValue("");
      return;
    }

    onChange?.([...value, trimmed]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]!);
    }
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      !value.includes(suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open && filteredSuggestions.length > 0} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "border-input focus-within:border-ring focus-within:ring-ring/50 flex min-h-[40px] w-full flex-wrap gap-2 rounded-md border bg-transparent p-2 focus-within:ring-[3px]",
              value.length > 0 && "py-1.5"
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {value.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="gap-1"
                role="button"
                aria-label={`Tag: ${tag}`}
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                  aria-label={`Remove ${tag}`}
                  className="hover:text-foreground ml-1 text-muted-foreground"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            <Input
              ref={inputRef}
              type="text"
              role="combobox"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder={value.length === 0 ? placeholder : ""}
              className="h-7 flex-1 border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-0"
              aria-expanded={open}
              aria-autocomplete="list"
            />
          </div>
        </PopoverTrigger>
        {filteredSuggestions.length > 0 && (
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." className="hidden" />
              <CommandList>
                <CommandEmpty>No suggestions found.</CommandEmpty>
                <CommandGroup>
                  {filteredSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      onSelect={() => {
                        addTag(suggestion);
                        setOpen(false);
                      }}
                    >
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
