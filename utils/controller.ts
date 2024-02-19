import { supabase } from "@/lib/supabaseClient";
import {
  SupabaseError,
  AccessDeniedError,
  UnhandledError,
  NotAuthenticatedError,
} from "@/errors/databaseerror";
import redis from "@/lib/redisClient";

export async function getEventsFromSupabase() {

  const cacheKey = 'events';

  try {

    let cachedData = await redis.get(cacheKey);
    if(cachedData) {
      return JSON.parse(cachedData);
    }

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
    } else {
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 600);
    }
    return data;
  } catch (error) {
    console.error("Error fetching events from Supabase:", error);
    throw new UnhandledError("Internal server error");
  }
}

export async function getSpeakersFromSupabase() {

  const cacheKey = 'speakers';

  try {

    let cachedData = await redis.get(cacheKey);
    if(cachedData) {
      return JSON.parse(cachedData);
    }

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
      } else {
        await redis.set(cacheKey, JSON.stringify(data), 'EX', 600);
      }
      return  data;
  } catch (error) {
      console.error('Error fetching speakers from Supabase:', error);
      throw new UnhandledError('Internal server error');
  }
}
