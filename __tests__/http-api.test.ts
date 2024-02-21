import { getEvents } from "@/http/api";

global.fetch = jest.fn();

describe("getEvents function", () => {
  it("should fetch events correctly", async () => {
    const mockData = {
      message: "retrieved data successfully",
      data: [
        {
          event_id: "a7efc63d-3e11-4bcb-b414-854235f7a5d6",
          event_title: "How to Create a Next.js App",
          evet_timing: "2:00pm - 3:00pm",
          evet_type: "Devzero Stage",
          created_at: "2021-02-01T00:00:00.000Z",
          updated_at: "2021-02-01T00:00:00.000Z",
          speakers: {
            speaker_name: "John Doe",
          },
        },
      ],
      status: 200,
    };

    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getEvents();

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith("/api/events");
  });

  it("should throw an error if fetch fails", async () => {
    const mockError = new Error("Failed to fetch");
    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    try {
      await getEvents();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
