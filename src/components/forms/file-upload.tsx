"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  className?: string;
}

export function FileUpload({
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  onUpload,
  multiple = false,
  className,
}: FileUploadProps) {
  const [error, setError] = React.useState<string>("");

  const acceptTypes = accept
    ? {
        [accept.split(",")[0]?.trim() || "*/*"]: accept
          .split(",")
          .map((t) => t.trim()),
      }
    : {};

  const dropzoneOptions = {
    accept: acceptTypes,
    maxSize,
    multiple,
    onDrop: (acceptedFiles: File[], fileRejections: unknown[]) => {
      const rejections = fileRejections as Array<{
        errors: Array<{ code: string }>;
      }>;
      setError("");

      if (rejections.length > 0) {
        const rejection = rejections[0];
        if (rejection?.errors[0]?.code === "file-too-large") {
          setError("File is too large. Please upload a smaller file.");
        } else if (rejection?.errors[0]?.code === "file-invalid-type") {
          setError("File type not accepted. Please upload a valid file.");
        } else {
          setError("Error uploading file. Please try again.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles);
      }
    },
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  const acceptedTypes = accept
    ?.split(",")
    .map((type) => type.trim().replace(".", "").replace("*", "all"))
    .join(", ");

  const maxSizeInMB = Math.round(maxSize / (1024 * 1024));

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-input hover:border-primary/50 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-transparent px-6 py-10 transition-colors",
          isDragActive && "border-primary bg-primary/5"
        )}
      >
        <input {...getInputProps()} aria-label="Upload files" />
        <Upload className="text-muted-foreground mb-4 size-10" />
        <p className="text-foreground mb-2 text-center text-sm font-medium">
          Drag & drop files here, or click to select
        </p>
        <p className="text-muted-foreground text-center text-xs">
          {acceptedTypes && `Accepted formats: ${acceptedTypes}`}
          {acceptedTypes && maxSizeInMB && " • "}
          {maxSizeInMB && `Max size: ${maxSizeInMB}MB`}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4" role="alert">
          {error}
        </Alert>
      )}
    </div>
  );
}
