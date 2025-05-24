import { fireEvent, render, screen } from "@testing-library/react";
import CommonButton from "./CommonButton";
import {CommonButtonProps} from "../../../../domain/types/components/commonButtonTypes";

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

  test("renders correctly", () => {
    const button = setup({ onClick: () => {} });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Hi Bol");
  });

  test("correctly triggers click handler", () => {
    const clickHandler = jest.fn();
    const button = setup({ onClick: clickHandler });
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });

  test("correctly attaches className", () => {
    const button = setup({ onClick : () => {} });
    expect(button).toHaveClass("jest-class");
  });
});
