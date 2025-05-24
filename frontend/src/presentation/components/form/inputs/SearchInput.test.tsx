import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { SearchInputProps } from "../../../../domain/types/components/searchInputTypes";

describe("Search input", () => {
  const setup = ({
    searchQuery,
    isDisabled,
    setSearchQuery,
  }: SearchInputProps) => {
    render(
      <SearchInput
        searchQuery={searchQuery}
        isDisabled={isDisabled}
        setSearchQuery={setSearchQuery}
      />,
    );
    return {
      input: screen.getByTestId("search-input"),
      icon: screen.getByTestId("search-input-icon"),
    };
  };

  test("renders correctly", () => {
    const { input, icon } = setup({
      searchQuery: "",
      isDisabled: false,
      setSearchQuery: jest.fn(),
    });
    expect(input).toBeInTheDocument();
    expect(input.getAttribute("disabled")).toBeNull();
    expect(input).toHaveValue("");
    expect(icon).toBeInTheDocument();
  });

  test("renders searchQuery value correctly", () => {
    const { input } = setup({
      searchQuery: "Mehrad",
      isDisabled: false,
      setSearchQuery: jest.fn(),
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Mehrad");
  });

  test("fires onChange method correctly", () => {
    const onChangeHandler = jest.fn();
    const { input } = setup({
      searchQuery: "",
      isDisabled: false,
      setSearchQuery: onChangeHandler,
    });
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Mehrad" } });
    expect(onChangeHandler).toHaveBeenCalledWith("Mehrad");
  });

  test("isDisabled prop will disable input", () => {
    const onChangeHandler = jest.fn();
    const { input } = setup({
      searchQuery: "",
      isDisabled: true,
      setSearchQuery: onChangeHandler,
    });
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });
});
