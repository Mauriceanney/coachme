import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ErrorState } from "@/components/feedback/error-state";

describe("ErrorState", () => {
  it("renders with message only", () => {
    render(<ErrorState message="Failed to load data" />);
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  it("renders with default title", () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<ErrorState title="Loading Failed" message="Could not fetch data" />);
    expect(screen.getByText("Loading Failed")).toBeInTheDocument();
    expect(screen.getByText("Could not fetch data")).toBeInTheDocument();
  });

  it("renders retry button when provided", () => {
    const handleRetry = vi.fn();
    render(
      <ErrorState
        message="Failed to load"
        retry={{
          label: "Try Again",
          onClick: handleRetry,
        }}
      />
    );
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });

  it("calls onClick when retry button is clicked", async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();
    render(
      <ErrorState
        message="Failed to load"
        retry={{
          label: "Retry",
          onClick: handleRetry,
        }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(handleRetry).toHaveBeenCalledOnce();
  });

  it("does not render retry button when not provided", () => {
    render(<ErrorState message="Error occurred" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders all elements together", () => {
    const handleRetry = vi.fn();
    render(
      <ErrorState
        title="Connection Error"
        message="Unable to reach the server"
        retry={{
          label: "Retry Connection",
          onClick: handleRetry,
        }}
      />
    );

    expect(screen.getByText("Connection Error")).toBeInTheDocument();
    expect(screen.getByText("Unable to reach the server")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Retry Connection" })
    ).toBeInTheDocument();
  });
});
