import supabase from "./supabase";
import { getUserDeviceType } from "@/helpers/userDeviceTypeDetector";

export async function createClick({ link_id, user_id }) {
  try {
    const device = getUserDeviceType();

    const response = await fetch("https://ipapi.co/json");
    const { city, region, country_name: country } = await response.json();

    const { data, error } = await supabase
      .from("clicks")
      .insert([
        {
          link_id: link_id,
          user_id: user_id,
          country: country?.toLowerCase(),
          region: region?.toLowerCase(),
          city: city?.toLowerCase(),
          device: device?.toLowerCase(),
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getClicksForLink(link_id) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .eq("link_id", link_id);

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteClicksByLinkId(link_id) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .delete()
      .eq("link_id", link_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
