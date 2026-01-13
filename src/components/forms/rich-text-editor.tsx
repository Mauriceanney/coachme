"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write something...",
  disabled = false,
  className,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = React.useState(!value);

  const sanitizeHtml = React.useCallback((html: string): string => {
    // Remove script tags and dangerous attributes
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/on\w+="[^"]*"/g, "")
      .replace(/javascript:/gi, "");
  }, []);

  React.useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      // Sanitize HTML to prevent XSS
      const sanitized = sanitizeHtml(value);
      editorRef.current.innerHTML = sanitized;
      setIsEmpty(!sanitized);
    }
  }, [value, sanitizeHtml]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const text = editorRef.current.textContent || "";
      setIsEmpty(text.trim().length === 0);
      onChange?.(content);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const toolbar = [
    { command: "bold", icon: Bold, label: "Bold" },
    { command: "italic", icon: Italic, label: "Italic" },
    { command: "insertUnorderedList", icon: List, label: "Bullet List" },
    { command: "insertOrderedList", icon: ListOrdered, label: "Ordered List" },
    { command: "formatBlock", icon: Heading2, label: "Heading 2", value: "h2" },
    { command: "formatBlock", icon: Heading3, label: "Heading 3", value: "h3" },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="border-input mb-2 flex flex-wrap gap-1 rounded-t-lg border border-b-0 bg-muted/30 p-2">
        {toolbar.map((item) => (
          <Button
            key={item.command + (item.value || "")}
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => execCommand(item.command, item.value)}
            disabled={disabled}
            aria-label={item.label}
            title={item.label}
          >
            <item.icon className="size-4" />
          </Button>
        ))}
      </div>
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          role="textbox"
          aria-label="Rich text editor"
          aria-multiline="true"
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-[200px] w-full rounded-b-lg border bg-transparent p-3 text-sm outline-none focus-visible:ring-[3px]",
            disabled && "pointer-events-none cursor-not-allowed opacity-50"
          )}
        />
        {isEmpty && !disabled && (
          <div className="text-muted-foreground pointer-events-none absolute left-3 top-3 text-sm">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
