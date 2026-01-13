import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";

describe("ConfirmationDialog", () => {
  it("renders when open", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        onConfirm={handleConfirm}
      />
    );

    expect(screen.getByText("Delete Item")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this item?")
    ).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={false}
        onOpenChange={handleOpenChange}
        title="Delete Item"
        description="Are you sure?"
        onConfirm={handleConfirm}
      />
    );

    expect(screen.queryByText("Delete Item")).not.toBeInTheDocument();
  });

  it("renders default confirm and cancel labels", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Confirm"
        description="Proceed?"
        onConfirm={handleConfirm}
      />
    );

    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders custom confirm and cancel labels", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Delete"
        description="Are you sure?"
        confirmLabel="Delete Forever"
        cancelLabel="Go Back"
        onConfirm={handleConfirm}
      />
    );

    expect(
      screen.getByRole("button", { name: "Delete Forever" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Confirm"
        description="Proceed?"
        onConfirm={handleConfirm}
      />
    );

    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(handleConfirm).toHaveBeenCalledOnce();
  });

  it("calls onOpenChange with false when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Confirm"
        description="Proceed?"
        onConfirm={handleConfirm}
      />
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders with default variant", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Confirm"
        description="Proceed?"
        onConfirm={handleConfirm}
      />
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    expect(confirmButton).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Delete Account"
        description="This action cannot be undone"
        onConfirm={handleConfirm}
        variant="destructive"
      />
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    expect(confirmButton).toBeInTheDocument();
  });
});
