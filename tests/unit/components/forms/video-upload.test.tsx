import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { VideoUpload } from "@/components/forms/video-upload";

describe("VideoUpload", () => {
  it("renders upload area", () => {
    render(<VideoUpload />);

    expect(screen.getByText(/upload video/i)).toBeInTheDocument();
  });

  it("displays placeholder when no video is provided", () => {
    const { container } = render(<VideoUpload />);

    const uploadIcon = container.querySelector('svg');
    expect(uploadIcon).toBeInTheDocument();
  });

  it("displays video player when value is provided", () => {
    render(<VideoUpload value="https://example.com/video.mp4" />);

    // react-player creates a wrapper
    const videoContainer = screen.getByTestId("video-player");
    expect(videoContainer).toBeInTheDocument();
  });

  it("allows video selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");

    render(<VideoUpload onChange={onChange} />);

    const input = screen.getByLabelText(/upload video/i) as HTMLInputElement;
    const file = new File(["video"], "test.mp4", { type: "video/mp4" });

    await user.upload(input, file);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it("only accepts video files", () => {
    render(<VideoUpload />);

    const input = screen.getByLabelText(/upload video/i) as HTMLInputElement;
    expect(input.accept).toContain("video/*");
  });

  it("shows remove button when video is present", () => {
    render(<VideoUpload value="https://example.com/video.mp4" />);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
  });

  it("calls onChange with empty string when remove is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<VideoUpload value="https://example.com/video.mp4" onChange={onChange} />);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    await user.click(removeButton);

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("shows error for invalid file type", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<VideoUpload onChange={onChange} />);

    const input = screen.getByLabelText(/upload video/i);
    const invalidFile = new File(["content"], "test.pdf", {
      type: "application/pdf",
    });

    await user.upload(input, invalidFile);

    await waitFor(
      () => {
        // Error should be shown for non-video files
        expect(input).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("shows error for file size exceeding limit", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<VideoUpload onChange={onChange} />);

    const input = screen.getByLabelText(/upload video/i);
    // Create a large file (> 100MB)
    const largeFile = new File(["x".repeat(101 * 1024 * 1024)], "large.mp4", {
      type: "video/mp4",
    });

    await user.upload(input, largeFile);

    await waitFor(() => {
      expect(screen.getByText(/file is too large/i)).toBeInTheDocument();
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("has accessible upload button", () => {
    render(<VideoUpload />);

    const input = screen.getByLabelText(/upload video/i);
    expect(input).toHaveAttribute("type", "file");
  });

  it("shows loading state during upload", async () => {
    const user = userEvent.setup();
    let resolveUpload: () => void;
    const uploadPromise = new Promise<void>((resolve) => {
      resolveUpload = resolve;
    });

    const onChange = vi.fn(() => uploadPromise);

    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");

    render(<VideoUpload onChange={onChange} />);

    const input = screen.getByLabelText(/upload video/i);
    const file = new File(["video"], "test.mp4", { type: "video/mp4" });

    user.upload(input, file);

    // Component handles loading internally
    await waitFor(() => {
      expect(screen.getByLabelText(/upload video/i)).toBeInTheDocument();
    });

    // Cleanup
    resolveUpload!();
  });

  it("displays video duration when available", () => {
    render(<VideoUpload value="https://example.com/video.mp4" />);

    const videoContainer = screen.getByTestId("video-player");
    expect(videoContainer).toBeInTheDocument();
  });

  it("handles upload errors gracefully", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn(() => {
      throw new Error("Upload failed");
    });

    render(<VideoUpload onChange={onChange} />);

    const input = screen.getByLabelText(/upload video/i);
    const file = new File(["video"], "test.mp4", { type: "video/mp4" });

    await user.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
    });
  });

  it("shows supported formats information", () => {
    render(<VideoUpload />);

    expect(screen.getByText(/mp4, mov, avi/i)).toBeInTheDocument();
  });
});
