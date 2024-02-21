import { supabase } from "@/lib/supabaseClient";

export async function getEventsFromSupabase() {
  const { data, error } = await supabase.from("events").select(`
      event_id,
      event_title,
      event_timing,
      event_type,
      created_at,
      updated_at,
      speakers (
        speaker_name
      )
    `);
  return data;
}

export async function getSpeakersFromSupabase() {
  const { data, error } = await supabase.from("speakers").select("*");
  return data;
}
