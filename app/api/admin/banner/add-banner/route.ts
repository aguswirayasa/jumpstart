import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { banner } = await request.json();

  try {
    await prismadb.banner.create({
      data: {
        url: banner,
        active: false,
      },
    });

    // Banner creation successful
    return NextResponse.json(
      { message: "Banner created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating banner:", error);

    // Handle the error and return an appropriate response
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  } finally {
    await prismadb.$disconnect();
  }
}
