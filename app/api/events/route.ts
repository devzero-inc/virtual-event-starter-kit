import { NextResponse } from "next/server";
import {
  AccessDeniedError,
  SupabaseError,
  NotAuthenticatedError,
} from "@/errors/databaseerror";
import { getEventsFromSupabase } from "@/utils/controller";

export async function GET(): Promise<NextResponse> {
  try {
    const events = await getEventsFromSupabase();

    return NextResponse.json({
      status: 200,
      events: events,
    });
  } catch (err) {
    if (err instanceof AccessDeniedError) {
      return NextResponse.json({
        status: 403,
        message: err.message,
      });
    } else if (err instanceof SupabaseError) {
      return NextResponse.json({
        status: 503,
        message: err.message,
      });
    } else if (err instanceof NotAuthenticatedError) {
      return NextResponse.json({
        status: 401,
        message: err.message,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}
