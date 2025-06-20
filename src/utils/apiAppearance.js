import supabase from "./supabase";

export async function createAppearance({
  user_id,
  social_icons_position,
  username,
}) {
  try {
    const { data, error } = await supabase
      .from("appearance")
      .insert([
        {
          user_id,
          social_icons_position,
          username,
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateAppearance({ id, data_object }) {
  try {
    const { data, error } = await supabase
      .from("appearance")
      .update(data_object)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAppearanceByUsername(username) {
  try {
    const { data, error } = await supabase
      .from("appearance")
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
      `Error fetching appearance for username ${username}. Please try again.`
    );
  }
}
