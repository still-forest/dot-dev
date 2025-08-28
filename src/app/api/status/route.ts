import { NextResponse } from "next/server";
import { environment } from "@/lib/config/environment";

export async function GET() {
  return NextResponse.json({ status: "ok", environment });
}
