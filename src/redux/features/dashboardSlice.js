import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAppearanceByUserId,
  fetchClicksByLinkIdList,
  fetchLinksByUserId,
  fetchSocialChannelsByUserId,
} from "../thunks";

const initialState = {
  socialChannels: [],
  appearance: null,
  links: [],
  clicks: [],
  isLoading: true,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (user_id, { rejectWithValue, dispatch }) => {
    try {
      const socialChannels = await dispatch(
        fetchSocialChannelsByUserId(user_id)
      ).unwrap();

      const appearance = await dispatch(
        fetchAppearanceByUserId(user_id)
      ).unwrap();

      const links = await dispatch(fetchLinksByUserId(user_id)).unwrap();

      const publishedLinkIds = links
        ?.filter((link) => link?.link_published === true)
        ?.map((link) => link.id);

      let clicks = [];
      if (publishedLinkIds.length) {
        clicks = await dispatch(
          fetchClicksByLinkIdList(publishedLinkIds)
        ).unwrap();
      }

      return { socialChannels, appearance, links, clicks };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.socialChannels = [];
      state.appearance = null;
      state.links = [];
      state.clicks = [];
      state.isLoading = false;
      state.error = null;
    },
    updateSocialChannelsData: (state, action) => {
      state.socialChannels = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateAppearanceData: (state, action) => {
      state.appearance = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateLinksData: (state, action) => {
      state.links = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateClicksData: (state, action) => {
      state.clicks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      //🟣 Fetch Social Channels
      .addCase(fetchSocialChannelsByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSocialChannelsByUserId.fulfilled, (state, action) => {
        state.socialChannels = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSocialChannelsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //🟣 Fetch Appearance
      .addCase(fetchAppearanceByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppearanceByUserId.fulfilled, (state, action) => {
        state.appearance = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAppearanceByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //🟣 Fetch Links
      .addCase(fetchLinksByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLinksByUserId.fulfilled, (state, action) => {
        state.links = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLinksByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //🟣 Fetch Clicks
      .addCase(fetchClicksByLinkIdList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClicksByLinkIdList.fulfilled, (state, action) => {
        state.clicks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchClicksByLinkIdList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //🟣 Fetch Dashboard Data
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, actions) => {
        state.socialChannels = actions.payload.socialChannels;
        state.appearance = actions.payload.appearance;
        state.links = actions.payload.links;
        state.clicks = actions.payload.clicks;
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
export const {
  clearDashboardData,
  updateSocialChannelsData,
  updateAppearanceData,
  updateLinksData,
  updateClicksData,
} = dashboardSlice.actions;
