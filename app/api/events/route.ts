import { NextResponse } from "next/server";
import { getEventsFromSupabase } from "@/utils/controller";
import {
  AccessDeniedError,
  SupabaseError,
  UnhandledError,
  NotAuthenticatedError,
} from "@/errors/databaseerror";

export async function GET() {
  try {
    const data = await getEventsFromSupabase();

    return NextResponse.json({
      message: "retrieved data successfully",
      data: data,
      status: 200,
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
    } else if (err instanceof UnhandledError) {
      return NextResponse.json({
        status: 500,
        message: err.message,
      });
    } else if (err instanceof NotAuthenticatedError) {
      return NextResponse.json({
        status: 401,
        message: err.message,
      });
    }
  }
}
