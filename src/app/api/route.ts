import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "HiddenPak Frontend API - Proxy to Backend",
    backend: "https://github.com/OwaisAhmaad/hiddenpak_main-api"
  });
}
