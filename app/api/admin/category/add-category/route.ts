import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, thumbnail } = await request.json();

  try {
    const result = await prismadb.category.create({
      data: {
        name,
        thumbnail,
      },
    });
    if (result != null) {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    prismadb.$disconnect;
  }
}
