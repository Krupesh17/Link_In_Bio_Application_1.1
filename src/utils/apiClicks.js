import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

export async function createClick({ link_id, user_id }) {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, region, country_name: country } = await response.json();

    const { data, error } = await supabase
      .from("clicks")
      .insert([
        {
          link_id: link_id,
          user_id: user_id,
          country: country,
          region: region,
          city: city,
          device: device,
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
