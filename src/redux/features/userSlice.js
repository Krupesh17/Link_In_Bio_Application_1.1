import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfileByUserId, fetchUserSession } from "../thunks";
import { fetchDashboardData } from "./dashboardSlice";
import { fetchShopData } from "./shopSlice";

const initialState = {
  user: null,
  profile: null,
  isLoading: true,
  isInitialized: false, // Add this to track if auth has been checked
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await dispatch(fetchUserSession()).unwrap();

      const profile = await dispatch(fetchProfileByUserId(user?.id)).unwrap();

      await dispatch(fetchDashboardData(user?.id));

      await dispatch(fetchShopData(user?.id));

      return { user, profile };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.profile = null;
      state.isLoading = false;
      state.isInitialized = true; // Mark as initialized even when clearing
      state.error = null;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
      state.isLoading = false;
    },
    updateProfileData: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateUserData: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //🟣 Fetch User Session
      .addCase(fetchUserSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(fetchUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload;
      })

      //🟣 Fetch Profile Data
      .addCase(fetchProfileByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileByUserId.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload;
      })

      //🟣 Fetch User + Profile Together
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {
  clearUserData,
  setInitialized,
  updateProfileData,
  updateUserData,
} = userSlice.actions;
