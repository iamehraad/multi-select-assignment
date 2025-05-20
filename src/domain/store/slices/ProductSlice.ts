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
    toggleItemFromSelectedList: (state, action: PayloadAction<string>) => {
      const existingSelectedProduct = state.selectedProducts.find(
        (productId) => productId === action.payload,
      );
      if (existingSelectedProduct) {
        state.selectedProducts = state.selectedProducts.filter(
          (productId) => productId !== action.payload,
        );
      } else {
        state.selectedProducts.push(action.payload);
      }
    },
  },
});

export const selectProduct = (state: RootState) => state.product;
export const { toggleItemFromSelectedList } = productSlice.actions;
export default productSlice.reducer;
