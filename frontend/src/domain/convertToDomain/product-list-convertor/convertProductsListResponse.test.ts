import { convertProductsListResponse } from "./convertProductsListResponse";
import { mockData } from "../../utils/mockTestData";

const { mockResponse, mockedProducts } = mockData;
describe("convert products list response to domain", () => {
  test("should return an array of products list with id", () => {
    expect(convertProductsListResponse(mockResponse.data)).toEqual(
      mockedProducts,
    );
  });
});
