import {
  AccessDeniedError,
  SupabaseError,
  UnhandledError,
  NotAuthenticatedError,
} from "@/errors/databaseerror";
import { getSpeakersFromSupabase } from "@/controller/controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const speakers = await getSpeakersFromSupabase();

    return NextResponse.json({
      status: 200,
      speakers: speakers,
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
