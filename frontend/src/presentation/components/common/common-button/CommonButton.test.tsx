import {fireEvent, render, screen} from "@testing-library/react";
import CommonButton from "./CommonButton";

describe("Common button", () => {
  test("renders correctly", async () => {
    render(
      <CommonButton onClick={() => {}} dataTestId={"jest"}>
        <span>Hi Bol</span>
      </CommonButton>,
    );
    expect(screen.getByTestId("common-button-jest")).toBeInTheDocument();
    expect(screen.getByTestId("common-button-jest").querySelector('span')).toHaveTextContent("Hi Bol");
  });

  test("correctly triggers click handler", async () => {
    const clickHandler = jest.fn();
    render(
        <CommonButton onClick={clickHandler} dataTestId={"jest"}>
          <span>Hi Bol</span>
        </CommonButton>,
    );
    const button = screen.getByTestId("common-button-jest");
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });
});
