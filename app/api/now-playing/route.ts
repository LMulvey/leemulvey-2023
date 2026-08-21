import { NextResponse } from "next/server";
import { getNowPlaying } from "@/utilities/lastfm";

export const dynamic = "force-dynamic";

export async function GET() {
  const nowPlaying = await getNowPlaying();

  return NextResponse.json(nowPlaying);
}
