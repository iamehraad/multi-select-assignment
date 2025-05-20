import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ProductType } from "../../types/ProductType";

interface State {
  selectedProducts: ProductType[];
}

const initialState: State = {
  selectedProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleItemFromSelectedList: (state, action: PayloadAction<ProductType>) => {
      const existingSelectedProduct = state.selectedProducts.find(
        (item) => item.id === action.payload.id,
      );
      if (existingSelectedProduct) {
        state.selectedProducts = state.selectedProducts.filter(
          (item) => item.id !== action.payload.id,
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
