import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(
      { message: "category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "delete failed" }, { status: 500 });
  } finally {
    prismadb.$disconnect();
  }
}
