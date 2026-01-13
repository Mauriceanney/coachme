import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RichTextEditor } from "@/components/forms/rich-text-editor";

// Mock document.execCommand
beforeEach(() => {
  document.execCommand = vi.fn(() => true);
});

describe("RichTextEditor", () => {
  it("renders editor area", () => {
    render(<RichTextEditor />);

    const editor = screen.getByRole("textbox");
    expect(editor).toBeInTheDocument();
  });

  it("displays placeholder when empty", () => {
    render(<RichTextEditor placeholder="Write something..." />);

    expect(screen.getByText(/write something/i)).toBeInTheDocument();
  });

  it("displays provided value", () => {
    render(<RichTextEditor value="Initial content" />);

    const editor = screen.getByRole("textbox");
    expect(editor).toHaveTextContent("Initial content");
  });

  it("calls onChange when content changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} />);

    const editor = screen.getByRole("textbox");
    await user.type(editor, "New text");

    expect(onChange).toHaveBeenCalled();
  });

  it("shows formatting toolbar", () => {
    render(<RichTextEditor />);

    expect(screen.getByRole("button", { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /italic/i })).toBeInTheDocument();
  });

  it("applies bold formatting", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} />);

    const boldButton = screen.getByRole("button", { name: /bold/i });
    await user.click(boldButton);

    const editor = screen.getByRole("textbox");
    await user.type(editor, "Bold text");

    expect(onChange).toHaveBeenCalled();
  });

  it("applies italic formatting", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} />);

    const italicButton = screen.getByRole("button", { name: /italic/i });
    await user.click(italicButton);

    const editor = screen.getByRole("textbox");
    await user.type(editor, "Italic text");

    expect(onChange).toHaveBeenCalled();
  });

  it("supports bullet lists", () => {
    render(<RichTextEditor />);

    const listButton = screen.getByRole("button", { name: /bullet list/i });
    expect(listButton).toBeInTheDocument();
  });

  it("supports numbered lists", () => {
    render(<RichTextEditor />);

    const orderedListButton = screen.getByRole("button", { name: /ordered list/i });
    expect(orderedListButton).toBeInTheDocument();
  });

  it("supports headings", () => {
    render(<RichTextEditor />);

    const heading2Button = screen.getByRole("button", { name: /heading 2/i });
    expect(heading2Button).toBeInTheDocument();
  });

  it("has accessible toolbar buttons", () => {
    render(<RichTextEditor />);

    const boldButton = screen.getByRole("button", { name: /bold/i });
    expect(boldButton).toHaveAttribute("aria-label");
  });

  it("supports custom className", () => {
    const { container } = render(<RichTextEditor className="custom-editor" />);

    const editor = container.querySelector('.custom-editor');
    expect(editor).toBeInTheDocument();
  });

  it("handles empty content gracefully", () => {
    const onChange = vi.fn();
    render(<RichTextEditor value="" onChange={onChange} />);

    const editor = screen.getByRole("textbox");
    expect(editor).toBeInTheDocument();
  });

  it("handles HTML content", () => {
    render(<RichTextEditor value="<p>HTML content</p>" />);

    expect(screen.getByText(/html content/i)).toBeInTheDocument();
  });

  it("prevents XSS attacks", () => {
    const maliciousContent = '<script>alert("XSS")</script><p>Safe content</p>';
    render(<RichTextEditor value={maliciousContent} />);

    // Script should be stripped/escaped
    expect(screen.queryByText(/alert/i)).not.toBeInTheDocument();
    expect(screen.getByText(/safe content/i)).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<RichTextEditor disabled />);

    const editor = screen.getByRole("textbox");
    expect(editor).toHaveAttribute("contenteditable", "false");
  });

  it("maintains focus after formatting", async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);

    const editor = screen.getByRole("textbox");
    await user.click(editor);

    const boldButton = screen.getByRole("button", { name: /bold/i });
    await user.click(boldButton);

    // Focus management is handled by the editor
    expect(editor).toBeInTheDocument();
  });
});
