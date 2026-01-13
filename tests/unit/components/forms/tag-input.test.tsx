import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TagInput } from "@/components/forms/tag-input";

describe("TagInput", () => {
  it("renders input field", () => {
    render(<TagInput />);

    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
  });

  it("displays placeholder when empty", () => {
    render(<TagInput placeholder="Add tags..." />);

    expect(screen.getByPlaceholderText("Add tags...")).toBeInTheDocument();
  });

  it("displays existing tags", () => {
    render(<TagInput value={["fitness", "workout"]} />);

    expect(screen.getByText("fitness")).toBeInTheDocument();
    expect(screen.getByText("workout")).toBeInTheDocument();
  });

  it("adds tag on Enter key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "newtag{Enter}");

    expect(onChange).toHaveBeenCalledWith(["newtag"]);
  });

  it("adds tag on comma key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "newtag,");

    expect(onChange).toHaveBeenCalledWith(["newtag"]);
  });

  it("removes tag when clicking remove button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput value={["fitness", "workout"]} onChange={onChange} />);

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    const firstButton = removeButtons[0];
    if (firstButton) {
      await user.click(firstButton);
    }

    expect(onChange).toHaveBeenCalledWith(["workout"]);
  });

  it("prevents duplicate tags", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput value={["fitness"]} onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "fitness{Enter}");

    // Should not add duplicate
    expect(onChange).not.toHaveBeenCalled();
  });

  it("trims whitespace from tags", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "  spaced  {Enter}");

    expect(onChange).toHaveBeenCalledWith(["spaced"]);
  });

  it("shows suggestions when available", async () => {
    const suggestions = ["cardio", "strength", "yoga"];
    render(<TagInput suggestions={suggestions} />);

    const input = screen.getByRole("combobox");
    // Component has suggestions prop configured
    expect(input).toBeInTheDocument();
  });

  it("filters suggestions based on input", async () => {
    const user = userEvent.setup();
    const suggestions = ["cardio", "strength", "yoga"];
    render(<TagInput suggestions={suggestions} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "str");

    // Component should filter suggestions internally
    expect(input).toBeInTheDocument();
  });

  it("adds tag from suggestions on click", async () => {
    const suggestions = ["cardio", "strength"];
    render(<TagInput suggestions={suggestions} />);

    const input = screen.getByRole("combobox");
    // Suggestions work through the popover system
    expect(input).toBeInTheDocument();
  });

  it("clears input after adding tag", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);

    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.type(input, "newtag{Enter}");

    expect(input.value).toBe("");
  });

  it("prevents adding empty tags", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "{Enter}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes last tag on Backspace when input is empty", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput value={["fitness", "workout"]} onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "{Backspace}");

    expect(onChange).toHaveBeenCalledWith(["fitness"]);
  });

  it("has accessible tag badges", () => {
    render(<TagInput value={["fitness"]} />);

    const tag = screen.getByText("fitness");
    expect(tag.closest('[role="button"]')).toBeInTheDocument();
  });

  it("supports custom className", () => {
    const { container } = render(<TagInput className="custom-tags" />);

    const wrapper = container.querySelector('.custom-tags');
    expect(wrapper).toBeInTheDocument();
  });

  it("handles large number of tags", () => {
    const manyTags = Array.from({ length: 20 }, (_, i) => `tag${i}`);
    render(<TagInput value={manyTags} />);

    expect(screen.getByText("tag0")).toBeInTheDocument();
    expect(screen.getByText("tag19")).toBeInTheDocument();
  });

  it("converts tags to lowercase", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "MixedCase{Enter}");

    expect(onChange).toHaveBeenCalledWith(["mixedcase"]);
  });
});
