import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

const parser = new UAParser();

export async function createClick(link_id) {
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

export async function getClicksForLinks(link_id_list) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .in("link_id", link_id_list);

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
