import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface State {
  selectedProducts: string[];
}

const initialState: State = {
  selectedProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload;
    },
    setSelectedProductsFromSessionStorage: (state) => {
      const savedItems = sessionStorage.getItem("selectedItems");
      if (savedItems) {
        try {
          state.selectedProducts = JSON.parse(savedItems);
        } catch (err) {
          console.error("Error parsing saved items:", err);
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
        "selectedItems",
        JSON.stringify(productListToBeSaved),
      );
    },
    clearSelectedProductList: (state) => {
      console.log("clear called");
      state.selectedProducts = [];
      sessionStorage.removeItem("selectedItems");
    },
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
