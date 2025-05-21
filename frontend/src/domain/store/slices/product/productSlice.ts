import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { sessionStorageKeys } from "../../../statics/browserStorageKeys";
import { fetchProductsAsync } from "./productThunk";
import { LoadingEnum } from "../../../types/commonTypes";
import { convertProductsListResponse } from "../../../convertToDomain/ convertProductsListResponse";
import { ProductType } from "../../../types/productType";

interface State {
  productsList: ProductType[];
  selectedProducts: string[];
  status: LoadingEnum;
}

const initialState: State = {
  productsList: [],
  selectedProducts: [],
  status: LoadingEnum.IDLE,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload;
    },
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
        state.status = LoadingEnum.LOADING;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = LoadingEnum.IDLE;
        state.productsList = convertProductsListResponse(action.payload);
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.status = LoadingEnum.IDLE;
      });
  },
});

export const selectProduct = (state: RootState) => state.product;
export const {
  toggleItemFromSelectedList,
  clearSelectedProductList,
  setSelectedProducts,
  setSelectedProductsFromSessionStorage,
} = productSlice.actions;
export default productSlice.reducer;
