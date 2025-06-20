import supabase from "./supabase";

export async function createLink({
  user_id,
  username,
  link_title,
  link_url,
  link_index,
}) {
  try {
    const { data, error } = await supabase
      .from("links")
      .insert([
        {
          user_id,
          username,
          link_title,
          link_url,
          link_index,
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateLink({ link_id, data_object }) {
  try {
    const { data, error } = await supabase
      .from("links")
      .update(data_object)
      .eq("id", link_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function upsertLink(arrayOfLinkObjects) {
  try {
    const { data, error } = await supabase
      .from("links")
      .upsert(arrayOfLinkObjects)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteLink(link_id) {
  try {
    const { data, error } = await supabase
      .from("links")
      .delete()
      .eq("id", link_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinksByUsername(username) {
  try {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("username", username)
      .order("link_index", { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw new Error(
      `Error fetching links for username ${username}. Please try again.`
    );
  }
}