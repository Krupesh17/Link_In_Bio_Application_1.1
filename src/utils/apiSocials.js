import supabase from "./supabase";

export async function createSocialChannel({
  user_id,
  social_channel_name,
  social_channel_slug,
  social_channel_value,
  social_channel_visible,
  social_channel_index,
}) {
  try {
    const { data, error } = await supabase
      .from("socials")
      .insert([
        {
          user_id,
          social_channel_name,
          social_channel_slug,
          social_channel_value,
          social_channel_visible,
          social_channel_index,
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSocialChannelsByUserId(user_id) {
  try {
    const { data, error } = await supabase
      .from("socials")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateSocialChannel({ social_channel_id, data_object }) {
  try {
    const { data, error } = await supabase
      .from("socials")
      .update(data_object)
      .eq("id", social_channel_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function upsertSocialChannel(arrayOfSocialChannelObjects) {
  try {
    const { data, error } = await supabase
      .from("socials")
      .upsert(arrayOfSocialChannelObjects)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteSocialChannel(social_channel_id) {
  try {
    const { data, error } = await supabase
      .from("socials")
      .delete()
      .eq("id", social_channel_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
