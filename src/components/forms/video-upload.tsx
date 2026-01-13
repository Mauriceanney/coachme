"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { VideoIcon, X, Loader2 } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as React.ComponentType<{
  url: string;
  controls: boolean;
  width: string;
  height: string;
}>;

export interface VideoUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  className?: string;
}

export function VideoUpload({
  value,
  onChange,
  className,
}: VideoUploadProps) {
  const [preview, setPreview] = React.useState<string>(value || "");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  React.useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 100MB.");
      return;
    }

    try {
      setIsLoading(true);
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(url);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Video upload error:", err);
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
            className="relative aspect-video overflow-hidden rounded-lg border"
            data-testid="video-player"
          >
            <ReactPlayer
              url={preview}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={handleRemove}
            className="absolute right-2 top-2"
            aria-label="Remove video"
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
            accept="video/*"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Upload video"
            disabled={isLoading}
          />
          {isLoading ? (
            <Loader2 className="text-muted-foreground size-10 animate-spin" role="status" />
          ) : (
            <>
              <VideoIcon className="text-muted-foreground mb-4 size-10" />
              <p className="text-foreground text-sm font-medium">Upload Video</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Supported formats: MP4, MOV, AVI (max 100MB)
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
