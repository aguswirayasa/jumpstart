import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  const result = await prismadb.category.create({
    data: {
      name,
    },
  });
  console.log("result", result);

  if (result != null) {
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }

  return NextResponse.json({ message: "error" }, { status: 500 });
}
