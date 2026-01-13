import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorState({
  title = "Error",
  message,
  retry,
}: ErrorStateProps) {
  return (
    <Card className="w-full border-destructive/50">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-destructive">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{message}</p>
        {retry && (
          <Button onClick={retry.onClick} variant="outline">
            {retry.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
