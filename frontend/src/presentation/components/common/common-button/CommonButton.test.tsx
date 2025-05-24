import { fireEvent, render, screen } from "@testing-library/react";
import CommonButton from "./CommonButton";

describe("Common button", () => {
  const setup = ({ clickHandler }: { clickHandler?: () => void }) => {
    render(
      <CommonButton
        dataTestId="jest"
        onClick={clickHandler ? clickHandler : () => {}}
        className={"jest-class"}
      >
        <span>Hi Bol</span>
      </CommonButton>,
    );
    return screen.getByTestId("common-button-jest");
  };

  test("renders correctly", async () => {
    const button = setup({ clickHandler: undefined });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Hi Bol");
  });

  test("correctly triggers click handler", async () => {
    const clickHandler = jest.fn();
    const button = setup({ clickHandler });
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });

  test("correctly attaches className", async () => {
    const button = setup({ clickHandler: undefined });
    expect(button).toHaveClass("jest-class");
  });
});
