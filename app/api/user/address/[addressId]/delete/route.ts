import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { addressId: string } }
) {
  try {
    await prismadb.shippingAddress.delete({
      where: {
        id: params.addressId,
      },
    });
    return NextResponse.json(
      { message: "address deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "delete failed" }, { status: 500 });
  } finally {
    prismadb.$disconnect();
  }
}
