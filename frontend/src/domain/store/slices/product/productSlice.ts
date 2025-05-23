import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { sessionStorageKeys } from "../../../statics/browserStorageKeys";
import { fetchProductsAsync } from "./productThunk";
import { FetchApiError, LoadingEnum } from "../../../types/commonTypes";
import { convertProductsListResponse } from "../../../convertToDomain/ convertProductsListResponse";
import { ProductType } from "../../../types/productType";

interface State {
  productsList: ProductType[];
  selectedProducts: string[];
  loadingStatus: LoadingEnum;
  productsError: {
    fetchingProductsList?: {
      status: number;
      message: string;
    };
  };
}

const initialState: State = {
  productsList: [],
  selectedProducts: [],
  loadingStatus: LoadingEnum.LOADING,
  productsError: {
    fetchingProductsList: undefined,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProductsFromSessionStorage: (state) => {
      const savedItems = sessionStorage.getItem(
        sessionStorageKeys.selectedProductsList,
      );
      if (savedItems) {
        try {
          state.selectedProducts = JSON.parse(savedItems);
        } catch (err) {
          console.error("Error on setSelectedProductsFromSessionStorage:", err);
        }
      }
    },
    toggleItemFromSelectedList: (state, action: PayloadAction<string>) => {
      let productListToBeSaved = state.selectedProducts;
      const existingSelectedProduct = state.selectedProducts.find(
        (productId) => productId === action.payload,
      );
      if (existingSelectedProduct) {
        productListToBeSaved = productListToBeSaved.filter(
          (productId) => productId !== action.payload,
        );
      } else {
        productListToBeSaved.push(action.payload);
      }
      state.selectedProducts = productListToBeSaved;
      sessionStorage.setItem(
        sessionStorageKeys.selectedProductsList,
        JSON.stringify(productListToBeSaved),
      );
    },
    clearSelectedProductList: (state) => {
      state.selectedProducts = [];
      sessionStorage.removeItem(sessionStorageKeys.selectedProductsList);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.productsError.fetchingProductsList = undefined;
        state.loadingStatus = LoadingEnum.LOADING;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.productsError.fetchingProductsList = undefined;
        state.loadingStatus = LoadingEnum.IDLE;
        state.productsList = convertProductsListResponse(action.payload);
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.productsError.fetchingProductsList =
          action.payload as FetchApiError;
        state.loadingStatus = LoadingEnum.IDLE;
      });
  },
});

export const selectProduct = (state: RootState) => state.product;
export const {
  toggleItemFromSelectedList,
  clearSelectedProductList,
  setSelectedProductsFromSessionStorage,
} = productSlice.actions;
export default productSlice.reducer;
