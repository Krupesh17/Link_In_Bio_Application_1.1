import supabase from "./supabase";

export async function createAppearance({ user_id, social_icons_position }) {
  try {
    const { data, error } = await supabase
      .from("appearance")
      .insert([
        {
          user_id,
          social_icons_position,
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
