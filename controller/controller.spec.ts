import {
  getEventsFromSupabase,
  getSpeakersFromSupabase,
} from "@/controller/controller";
import { supabase } from "@/lib/supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";
import redis from "@/lib/redisClient";
import { UnhandledError } from "@/errors/databaseerror";

jest.mock("../lib/supabaseClient", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn(),
  },
}));

jest.mock("../lib/redisClient", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe("getEventsFromSupabase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached data if available", async () => {
    const cachedData = [{ event_id: 1, event_title: "Event 1" }];
    jest.spyOn(redis, "get").mockResolvedValueOnce(JSON.stringify(cachedData));

    const result = await getEventsFromSupabase();

    expect(redis.get).toHaveBeenCalledWith("events");
    expect(supabase.from).not.toHaveBeenCalled();
    expect(result).toEqual(cachedData);
  });

  it("should fetch data from Supabase if cache is empty", async () => {
    const supabaseData = [{ event_id: 1, event_title: "Event 1" }];
    const supabaseResponse = { data: supabaseData, error: null };
    jest.spyOn(redis, "get").mockResolvedValueOnce(null);
    (supabase.from("events").select as jest.Mock).mockReturnValueOnce(
      supabaseResponse
    );

    const result = await getEventsFromSupabase();

    expect(redis.get).toHaveBeenCalledWith("events");
    expect(supabase.from).toHaveBeenCalledWith("events");
    expect(redis.set).toHaveBeenCalledWith(
      "events",
      JSON.stringify(supabaseData),
      "EX",
      600
    );
    expect(result).toEqual(supabaseData);
  });

  it("should throw an error if Supabase returns an error", async () => {
    const supabaseError: PostgrestError = {
      code: "PGRST200",
      message: "Table not found",
      hint: "",
      details: "",
    };
    const supabaseResponse = { data: null, error: supabaseError };
    jest.spyOn(redis, "get").mockResolvedValueOnce(null);
    (supabase.from("events").select as jest.Mock).mockReturnValueOnce(
      supabaseResponse
    );

    try {
      await getEventsFromSupabase();
    } catch (error) {
      expect(error).toBeInstanceOf(UnhandledError);
    }

    expect(redis.get).toHaveBeenCalledWith("events");
    expect(supabase.from).toHaveBeenCalledWith("events");
    expect(redis.set).not.toHaveBeenCalled();
  });

  it("should throw an UnhandledError if an unexpected error occurs", async () => {
    const unexpectedError = new Error("Unexpected error");
    jest.spyOn(redis, "get").mockRejectedValueOnce(unexpectedError);

    try {
      await getEventsFromSupabase();
    } catch (error) {
      expect(error).toBeInstanceOf(UnhandledError);
    }

    expect(redis.get).toHaveBeenCalledWith("events");
    expect(supabase.from).not.toHaveBeenCalled();
    expect(redis.set).not.toHaveBeenCalled();
  });
});

describe("getSpeakersFromSupabase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached data if available", async () => {
    const cachedData = [{ speaker_id: 1, speaker_name: "Speaker 1" }];
    jest.spyOn(redis, "get").mockResolvedValueOnce(JSON.stringify(cachedData));

    const result = await getSpeakersFromSupabase();

    expect(redis.get).toHaveBeenCalledWith("speakers");
    expect(supabase.from).not.toHaveBeenCalled();
    expect(result).toEqual(cachedData);
  });

  it("should fetch data from Supabase if cache is empty", async () => {
    const supabaseData = [{ speaker_id: 1, speaker_name: "Speaker 1" }];
    const supabaseResponse = { data: supabaseData, error: null };
    jest.spyOn(redis, "get").mockResolvedValueOnce(null);
    (supabase.from("speakers").select as jest.Mock).mockReturnValueOnce(
      supabaseResponse
    );

    const result = await getSpeakersFromSupabase();

    expect(redis.get).toHaveBeenCalledWith("speakers");
    expect(supabase.from).toHaveBeenCalledWith("speakers");
    expect(redis.set).toHaveBeenCalledWith(
      "speakers",
      JSON.stringify(supabaseData),
      "EX",
      600
    );
    expect(result).toEqual(supabaseData);
  });

  it("should throw an error if Supabase returns an error", async () => {
    const supabaseError: PostgrestError = {
      code: "PGRST200",
      message: "Table not found",
      hint: "",
      details: "",
    };
    const supabaseResponse = { data: null, error: supabaseError };
    jest.spyOn(redis, "get").mockResolvedValueOnce(null);
    (supabase.from("speakers").select as jest.Mock).mockReturnValueOnce(
      supabaseResponse
    );

    try {
      await getSpeakersFromSupabase();
    } catch (error) {
      expect(error).toBeInstanceOf(UnhandledError);
    }

    expect(redis.get).toHaveBeenCalledWith("speakers");
    expect(supabase.from).toHaveBeenCalledWith("speakers");
    expect(redis.set).not.toHaveBeenCalled();
  });

  it("should throw an UnhandledError if an unexpected error occurs", async () => {
    const unexpectedError = new Error("Unexpected error");
    jest.spyOn(redis, "get").mockRejectedValueOnce(unexpectedError);

    try {
      await getSpeakersFromSupabase();
    } catch (error) {
      expect(error).toBeInstanceOf(UnhandledError);
    }

    expect(redis.get).toHaveBeenCalledWith("speakers");
    expect(supabase.from).not.toHaveBeenCalled();
    expect(redis.set).not.toHaveBeenCalled();
  });
});
