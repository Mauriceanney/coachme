import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "@/components/forms/search-input";

describe("SearchInput", () => {
  it("renders input with placeholder", () => {
    render(<SearchInput placeholder="Search workouts..." />);

    const input = screen.getByPlaceholderText("Search workouts...");
    expect(input).toBeInTheDocument();
  });

  it("displays provided value", () => {
    render(<SearchInput value="test query" />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("test query");
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);

    const input = screen.getByRole("searchbox");
    await user.type(input, "new search");

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith("new search");
  });

  it("shows search icon", () => {
    const { container } = render(<SearchInput />);

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it("shows clear button when value is not empty", () => {
    render(<SearchInput value="test" />);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<SearchInput value="" />);

    const clearButton = screen.queryByRole("button", { name: /clear/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it("calls onClear when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchInput value="test" onClear={onClear} />);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledOnce();
  });

  it("has accessible label", () => {
    render(<SearchInput />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("aria-label");
  });

  it("supports custom className", () => {
    const { container } = render(<SearchInput className="custom-class" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("clears input when clear button is clicked and onChange is provided", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchInput value="test" onChange={onChange} />);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(onChange).toHaveBeenCalledWith("");
  });
});
