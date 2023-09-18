import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { bannerId: string } }
) {
  try {
    await prismadb.banner.delete({
      where: {
        id: params.bannerId,
      },
    });
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "eror" }, { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}
