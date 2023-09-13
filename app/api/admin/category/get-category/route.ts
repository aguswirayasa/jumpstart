import { getCategories } from "@/lib/server-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await getCategories();
  return NextResponse.json({ result: response }, { status: 200 });
}
