import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByUserId,
} from "../thunks";

const initialState = {
  products: [],
  isLoading: true,
  error: false,
};

export const fetchShopData = createAsyncThunk(
  "shop/fetchShopData",
  async (user_id, { rejectWithValue, dispatch }) => {
    try {
      const products = await dispatch(fetchProductsByUserId(user_id)).unwrap();

      return { products };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearShopData: (state) => {
      state.products = [];
      state.isLoading = false;
      state.error = null;
    },
    updateProductsData: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      //🟣 Fetch Products
      .addCase(fetchProductsByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByUserId.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //🟣 Fetch Shop Data
      .addCase(fetchShopData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShopData.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productCollections = action.payload.productCollections;
        state.isLoading = false;
      })
      .addCase(fetchShopData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
export const { clearShopData, updateProductsData } = shopSlice.actions;
