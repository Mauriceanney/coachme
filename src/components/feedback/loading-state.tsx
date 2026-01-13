import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({ text, size = "md" }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div role="status" aria-label="Loading">
        <Spinner size={size} />
      </div>
      {text && (
        <p className={cn("text-muted-foreground", {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-base": size === "lg",
        })}>
          {text}
        </p>
      )}
    </div>
  );
}
