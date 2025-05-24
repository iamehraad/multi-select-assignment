import productReducer, {
  toggleItemFromSelectedList,
  clearSelectedProductList,
  setSelectedProductsFromSessionStorage,
} from "./productSlice";
import { LoadingEnum } from "../../../types/commonTypes";
import { fetchProductsAsync } from "./productThunk";
import { sessionStorageKeys } from "../../../statics/browserStorageKeys";
import { ProductSliceStatesType } from "../../../types/redux/ProductSliceTypes";

const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

const initialState: ProductSliceStatesType = {
  productsList: [],
  selectedProducts: [],
  loadingStatus: LoadingEnum.LOADING,
  productsError: {
    fetchingProductsList: undefined,
  },
};

describe("productSlice", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should handle toggleItemFromSelectedList (add)", () => {
    const newState = productReducer(
      initialState,
      toggleItemFromSelectedList("just sample1"),
    );
    expect(newState.selectedProducts).toContain("just sample1");
    expect(
      sessionStorage.getItem(sessionStorageKeys.selectedProductsList),
    ).toBe(JSON.stringify(["just sample1"]));
  });

  test("should handle toggleItemFromSelectedList (remove)", () => {
    const stateWithItem = {
      ...initialState,
      selectedProducts: ["just sample1"],
    };
    const newState = productReducer(
      stateWithItem,
      toggleItemFromSelectedList("just sample1"),
    );
    expect(newState.selectedProducts).not.toContain("just sample1");
    expect(
      sessionStorage.getItem(sessionStorageKeys.selectedProductsList),
    ).toBe(JSON.stringify([]));
  });

  test("should handle clearSelectedProductList", () => {
    const stateWithItems = {
      ...initialState,
      selectedProducts: ["just sample1", "just sample2"],
    };
    const newState = productReducer(stateWithItems, clearSelectedProductList());
    expect(newState.selectedProducts).toEqual([]);
    expect(
      sessionStorage.getItem(sessionStorageKeys.selectedProductsList),
    ).toBe(null);
  });

  test("should handle setSelectedProductsFromSessionStorage with valid JSON", () => {
    sessionStorage.setItem(
      sessionStorageKeys.selectedProductsList,
      JSON.stringify(["just sample1", "just sample2"]),
    );
    const newState = productReducer(
      initialState,
      setSelectedProductsFromSessionStorage(),
    );
    expect(newState.selectedProducts).toEqual(["just sample1", "just sample2"]);
  });

  test("should handle setSelectedProductsFromSessionStorage with invalid JSON", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    sessionStorage.setItem(
      sessionStorageKeys.selectedProductsList,
      "INVALID_JSON",
    );
    const newState = productReducer(
      initialState,
      setSelectedProductsFromSessionStorage(),
    );
    expect(consoleSpy).toHaveBeenCalled();
    expect(newState.selectedProducts).toEqual([]);
    consoleSpy.mockRestore();
  });

  test("should handle fetchProductsAsync.pending", () => {
    const action = { type: fetchProductsAsync.pending.type };
    const state = productReducer(initialState, action);
    expect(state.loadingStatus).toBe(LoadingEnum.LOADING);
    expect(state.productsError.fetchingProductsList).toBeUndefined();
  });

  test("should handle fetchProductsAsync.fulfilled", () => {
    const dummyPayload = ["Jest sample product"];
    const mockConverted = [
      { id: "Jestsampleproduct0", name: "Jest sample product" },
    ];

    jest.mock("../../../convertToDomain/product-list-convertor/convertProductsListResponse", () => ({
      convertProductsListResponse: jest.fn(() => mockConverted),
    }));

    const action = {
      type: fetchProductsAsync.fulfilled.type,
      payload: dummyPayload,
    };

    const state = productReducer(initialState, action);
    expect(state.loadingStatus).toBe(LoadingEnum.IDLE);
    expect(state.productsList).toEqual(mockConverted);
    expect(state.productsError.fetchingProductsList).toBeUndefined();
  });

  test("should handle fetchProductsAsync.rejected", () => {
    const error = { message: "Failed" };
    const action = {
      type: fetchProductsAsync.rejected.type,
      payload: error,
    };
    const state = productReducer(initialState, action);
    expect(state.loadingStatus).toBe(LoadingEnum.IDLE);
    expect(state.productsError.fetchingProductsList).toEqual(error);
  });
});
