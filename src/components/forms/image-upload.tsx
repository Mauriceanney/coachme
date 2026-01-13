"use client";

import * as React from "react";
import { ImageIcon, X, Loader2 } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  aspectRatio?: number;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  aspectRatio,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string>(value || "");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    try {
      setIsLoading(true);
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(url);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Image upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange?.("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {preview ? (
        <div className="relative">
          <div
            className={cn(
              "relative overflow-hidden rounded-lg border",
              aspectRatio && "w-full"
            )}
            style={aspectRatio ? { aspectRatio } : undefined}
          >
            <img
              src={preview}
              alt="Preview"
              className="size-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={handleRemove}
            className="absolute right-2 top-2"
            aria-label="Remove image"
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <label
          className={cn(
            "border-input hover:border-primary/50 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-transparent transition-colors",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Upload image"
            disabled={isLoading}
          />
          {isLoading ? (
            <Loader2 className="text-muted-foreground size-10 animate-spin" role="status" />
          ) : (
            <>
              <ImageIcon className="text-muted-foreground mb-4 size-10" />
              <p className="text-foreground text-sm font-medium">Upload Image</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Click to select an image
              </p>
            </>
          )}
        </label>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4" role="alert">
          {error}
        </Alert>
      )}
    </div>
  );
}
