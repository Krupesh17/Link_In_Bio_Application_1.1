import supabase from "./supabase";

export async function insertProduct({
  user_id,
  username,
  product_url,
  product_title,
  product_image_url,
  product_price,
  product_currency,
  product_index,
}) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          user_id,
          username,
          product_url,
          product_title,
          product_image_url,
          product_price,
          product_currency,
          product_index,
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct({ product_id, data_object }) {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(data_object)
      .eq("id", product_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function upsertProduct(arrayOfProductObjects) {
  try {
    const { data, error } = await supabase
      .from("products")
      .upsert(arrayOfProductObjects)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByUsername(username) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("username", username)
      .order("product_index", { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(product_id) {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", product_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
