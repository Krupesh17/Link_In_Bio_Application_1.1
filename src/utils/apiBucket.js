import supabase from "./supabase";

export async function uploadFile({ path, file }) {
  try {
    const { error: storageError } = await supabase.storage
      .from("users-storage-bucket")
      .upload(path, file);

    if (storageError) throw storageError;
  } catch (error) {
    throw error;
  }
}

export async function deleteFile(path) {
  try {
    const { error: storageError } = await supabase.storage
      .from("users-storage-bucket")
      .remove([path]);

    if (storageError) throw storageError;
  } catch (error) {
    throw error;
  }
}
