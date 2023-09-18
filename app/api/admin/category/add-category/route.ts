import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, thumbnail, id } = await request.json();

  try {
    const result = await prismadb.category.upsert({
      where: { id }, // Specify the condition for upsert based on the category's ID
      update: {
        name,
        thumbnail,
      },
      create: {
        name,
        thumbnail,
      },
    });

    if (result != null) {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    await prismadb.$disconnect(); // Corrected the disconnect method
  }
}
