import { fireEvent, render, screen } from "@testing-library/react";
import CommonButton from "./CommonButton";
import { CommonButtonProps } from "../../../../domain/types/components/commonButtonTypes";

describe("Common button", () => {
  const setup = ({ onClick }: Omit<CommonButtonProps, "children">) => {
    render(
      <CommonButton
        dataTestId="jest"
        onClick={onClick}
        className={"jest-class"}
      >
        <span>Hi Bol</span>
      </CommonButton>,
    );
    return screen.getByTestId("common-button-jest");
  };

  test("renders correctly", async () => {
    const button = setup({
      onClick: () => {},
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Hi Bol");
  });

  test("correctly triggers click handler", async () => {
    const clickHandler = jest.fn();
    const button = setup({ onClick: clickHandler });
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });

  test("correctly attaches className", async () => {
    const button = setup({
      onClick: () => {},
    });
    expect(button).toHaveClass("jest-class");
  });
});
