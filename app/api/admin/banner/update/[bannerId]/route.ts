import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { bannerId: string } }
) {
  try {
    const { status } = await request.json();

    // Update the banner's active status in the database
    await prismadb.banner.update({
      where: {
        id: params.bannerId,
      },
      data: {
        active: !status,
      },
    });

    // Return a success response with a message
    return NextResponse.json(
      { message: "Banner status updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    // Handle errors gracefully and return an error response
    return NextResponse.json(
      {
        message: "An error occurred while updating banner status.",
      },
      { status: 500 }
    );
  } finally {
    await prismadb.$disconnect();
  }
}
