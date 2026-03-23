import { NextResponse } from "next/server";
import { rooms } from "@/app/data/rooms";

export async function GET() {
  return NextResponse.json({ rooms });
}
