import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = params.email;

  try {
    const response = await prismadb.users.findUnique({
      where: {
        email,
      },
      select: {
        shippingAddresses: true,
      },
    });

    return NextResponse.json(
      { result: response?.shippingAddresses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ result: null }, { status: 400 });
  } finally {
    await prismadb.$disconnect();
  }
}
