import supabase from "./supabase";

export async function isUsernameTaken(username) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error && error.code !== "PGRST116") throw error;

    return !!data;
  } catch (error) {
    throw error;
  }
}

export async function createUserProfile({
  user_id,
  name,
  username,
  profile_title,
}) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          user_id,
          name,
          username,
          profile_title,
        },
      ])
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfile({
  user_profile_data,
  user_profile_id,
}) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(user_profile_data)
      .eq("id", user_profile_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfileByUsername(username) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("username", username)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(
      "User profile not found. Please check the username and try again."
    );
  }
}
