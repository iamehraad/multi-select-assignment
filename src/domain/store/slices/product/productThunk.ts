import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsList } from "../../../../data/requets/productRequest";

export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetchProductsList();
    return response;
  },
);
