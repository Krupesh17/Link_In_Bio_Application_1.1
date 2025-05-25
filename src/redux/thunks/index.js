import supabase from "@/utils/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserSession = createAsyncThunk(
  "user/fetchUserSession",
  async (_, { rejectWithValue }) => {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      return sessionData?.session?.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfileByUserId = createAsyncThunk(
  "user/fetchProfileByUserId",
  async (user_id, { rejectWithValue }) => {
    try {
      if (!user_id) {
        throw new Error(
          "Failed to fetch the user profile: undefined user_id. Please try again."
        );
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user_id)
        .maybeSingle();

      if (profileError) throw profileError;

      return profileData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSocialChannelsByUserId = createAsyncThunk(
  "fetchSocialChannelsByUserId",
  async (user_id, { rejectWithValue }) => {
    try {
      if (!user_id) {
        throw new Error(
          "Failed to fetch the user's social channels: undefined user_id. Please try again."
        );
      }
      const { data: socialChannelsData, error: socialChannelsError } =
        await supabase.from("socials").select("*").eq("user_id", user_id);

      if (socialChannelsError) throw socialChannelsError;

      const sortedSocialChannelsData = socialChannelsData?.sort(
        (channelA, channelB) =>
          channelA?.social_channel_index - channelB?.social_channel_index
      );

      return sortedSocialChannelsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAppearanceByUserId = createAsyncThunk(
  "fetchAppearanceByUserId",
  async (user_id, { rejectWithValue }) => {
    try {
      if (!user_id) {
        throw new Error(
          "Failed to fetch the user's LinkChain page appearance: undefined user_id. Please try again."
        );
      }

      const { data: appearanceData, error: appearanceError } = await supabase
        .from("appearance")
        .select("*")
        .eq("user_id", user_id)
        .maybeSingle();

      if (appearanceError) throw appearanceError;

      return appearanceData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLinksByUserId = createAsyncThunk(
  "fetchLinksByUserId",
  async (user_id, { rejectWithValue }) => {
    try {
      if (!user_id) {
        throw new Error(
          "Failed to fetch the user's Links: undefined user_id. Please try again."
        );
      }

      const { data: linksData, error: linksError } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", user_id);

      if (linksError) throw linksError;

      const sortedLinksData = linksData?.sort(
        (linkA, linkB) => linkA?.link_index - linkB?.link_index
      );

      return sortedLinksData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
