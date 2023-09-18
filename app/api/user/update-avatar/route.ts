import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { uid, avatarUrl } = await request.json();

  try {
    const response = await prismadb.users.update({
      data: {
        avatarUrl,
      },
      where: {
        id: uid,
      },
    });

    if (response) {
      return NextResponse.json(
        { message: "Avatar updated successfully" },
        { status: 200 }
      );
    } else {
      // Handle the case where the update did not succeed
      return NextResponse.json(
        { message: "Avatar update failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
