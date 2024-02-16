import { supabase } from "@/lib/supabaseClient";
import {
  SupabaseError,
  AccessDeniedError,
  UnhandledError,
  NotAuthenticatedError,
} from "@/errors/databaseerror";

export async function getEventsFromSupabase() {
  try {
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
    if (error) {
      switch (error.message) {
        case "Table not found":
          throw new SupabaseError("Table not found");
        case "Access Denied":
          throw new AccessDeniedError("Access Denied");
        case "Not Authenticated":
          throw new NotAuthenticatedError("Not Authenticated");
        default:
          throw new UnhandledError("Internal server error");
      }
    }
    return data;
  } catch (error) {
    console.error("Error fetching events from Supabase:", error);
    throw new UnhandledError("Internal server error");
  }
}

export async function getSpeakersFromSupabase() {
  try {
      const { data, error } = await supabase.from('speakers').select('*');
      if (error) {
          switch (error.message) {
              case 'Table not found':
                  throw new SupabaseError('Table not found');
              case 'Access Denied':
                  throw new AccessDeniedError('Access Denied');
              case 'Not Authenticated':
                  throw new NotAuthenticatedError('Not Authenticated');
              default:
                  throw new UnhandledError('Internal server error');
          }
      }
      return  data;
  } catch (error) {
      console.error('Error fetching speakers from Supabase:', error);
      throw new UnhandledError('Internal server error');
  }
}
