import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsList } from "../../../../data/requets/productRequest";
import { FetchApiError } from "../../../types/commonTypes";

export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await fetchProductsList();
    } catch (err) {
      const { status, message } = err as FetchApiError;
      return thunkAPI.rejectWithValue({
        status: status || 500,
        message: message || "Unexpected error",
      });
    }
  },
);
