import { GET as eventsGet } from "@/app/api/events/route";
import { GET as speakersGet } from "@/app/api/speakers/route";

import {
  getEventsFromSupabase,
  getSpeakersFromSupabase,
} from "@/controller/controller";
import {
  SupabaseError,
  NotAuthenticatedError,
  AccessDeniedError,
  UnhandledError,
} from "@/errors/databaseerror";

jest.mock("../../controller/controller", () => ({
  getEventsFromSupabase: jest.fn(),
  getSpeakersFromSupabase: jest.fn(),
}));

describe("GET api/events", () => {
  it("should return status 200 if events are fetched successfully", async () => {
    (getEventsFromSupabase as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Test Events" },
    ]);

    const response = await eventsGet();
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      status: 200,
      events: [{ id: 1, title: "Test Events" }],
    });
  });

  it("should return status 503 if table is not found", async () => {
    const errMessage = "SUPABASE_ERR";
    (getEventsFromSupabase as jest.Mock).mockRejectedValueOnce(
      new SupabaseError(errMessage)
    );
    const response = await eventsGet();
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      status: 503,
      message: errMessage,
    });
  });

  it("should return status 403 if the user is denied access to the server", async () => {
    const errMessage = "ACCESS_DENIED";

    (getEventsFromSupabase as jest.Mock).mockRejectedValueOnce(
      new AccessDeniedError(errMessage)
    );
    const response = await eventsGet();
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      status: 403,
      message: errMessage,
    });
  });

  it("should return status 500 if it is an unhandled error", async () => {
    const errMessage = "UNHANDLED_ERR";

    (getEventsFromSupabase as jest.Mock).mockRejectedValueOnce(
      new UnhandledError(errMessage)
    );
    const response = await eventsGet();
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      status: 500,
      message: 'Internal server error',
    });
  });

  it("should return status 401 if the user is unauthenticated", async () => {
    const errMessage = "Not Authenticated Error";
    (getEventsFromSupabase as jest.Mock).mockRejectedValueOnce(
      new NotAuthenticatedError(errMessage)
    );
    const response = await eventsGet();
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      status: 401,
      message: errMessage,
    });
  });
});

describe("GET api/speakers", () => {
  it("should return status 200 if speakers are fetched successfully", async () => {
    (getSpeakersFromSupabase as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Test Speakers" },
    ]);
    const response = await speakersGet();
    const jsonResponse = await response!.json();
    expect(jsonResponse).toEqual({
      status: 200,
      speakers: [{ id: 1, title: "Test Speakers" }],
    });
  });

  it("should return status 503 if table is not found", async () => {
    const errMessage = "SUPABASE_ERR";
    (getSpeakersFromSupabase as jest.Mock).mockRejectedValueOnce(
      new SupabaseError(errMessage)
    );
    const response = await speakersGet();
    const jsonResponse = await response!.json();
    expect(jsonResponse).toEqual({
      status: 503,
      message: errMessage,
    });
  });

  it("should return status 403 if user is denied access to the server", async () => {
    const errMessage = "ACCESS_DENIED";
    (getSpeakersFromSupabase as jest.Mock).mockRejectedValueOnce(
      new AccessDeniedError(errMessage)
    );
    const response = await speakersGet();
    const jsonResponse = await response!.json();

    expect(jsonResponse).toEqual({
      status: 403,
      message: errMessage,
    });
  });

  it("should return status 500 if it is an unhandled error", async () => {
    const errMessage = "UNHANDLED_ERR";
    (getSpeakersFromSupabase as jest.Mock).mockRejectedValueOnce(
      new UnhandledError(errMessage)
    );
    const response = await speakersGet();
    const jsonResponse = await response!.json();

    expect(jsonResponse).toEqual({
      status: 500,
      message: 'Internal server error',
    });
  });

  it("should return status 401 if the user is unauthenticated", async () => {
    const errMessage = "AUTH_DENIED";
    (getSpeakersFromSupabase as jest.Mock).mockRejectedValueOnce(
      new NotAuthenticatedError(errMessage)
    );
    const response = await speakersGet();
    const jsonResponse = await response!.json();
    expect(jsonResponse).toEqual({
      status: 401,
      message: errMessage,
    });
  });
});
