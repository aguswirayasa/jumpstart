import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { newPassword } = await request.json();

  // Validate the request data
  if (!newPassword) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request data",
        errors: [
          {
            field: "newPassword",
            message: "New password is required",
          },
        ],
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  try {
    await prismadb.users.update({
      where: {
        id: params.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
        errors: [
          {
            field: "server",
            message: "An unexpected error occurred on the server",
          },
        ],
      },
      { status: 500 }
    );
  } finally {
    prismadb.$disconnect();
  }
}
