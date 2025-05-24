import { render, screen } from "@testing-library/react";
import CommonButton from "./CommonButton";

describe("User", () => {
  test("renders heading", async () => {
    render(
      <CommonButton onClick={() => {}} dataTestId={"jest"}>
        <span>Hi Bol</span>
      </CommonButton>,
    );
    expect(screen.getByTestId("common-button-jest")).toBeInTheDocument();
    expect(screen.getByTestId("common-button-jest").querySelector('span')).toHaveTextContent("Hi Bol");
  });
});
