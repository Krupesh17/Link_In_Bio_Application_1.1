import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfileByUserId, fetchUserSession } from "../thunks";
import { fetchDashboardData } from "./dashboardSlice";

const initialState = {
  user: null,
  profile: null,
  isLoading: true,
  error: null,
};

// 🔴 Old "fetchUserData" thunk function.
// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async () => {
//     const { data: sessionData, error: sessionError } =
//       await supabase.auth.getSession();

//     if (sessionError) throw sessionError;

//     const { data: profileData, error: profileError } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("user_id", sessionData?.session?.user?.id)
//       .maybeSingle();

//     if (profileError) throw profileError;

//     return {
//       user: sessionData?.session?.user,
//       profile: profileData,
//     };
//   }
// );

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await dispatch(fetchUserSession()).unwrap();

      const profile = await dispatch(fetchProfileByUserId(user?.id)).unwrap();

      await dispatch(fetchDashboardData(user?.id));

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
      })
      .addCase(fetchUserSession.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearUserData } = userSlice.actions;
