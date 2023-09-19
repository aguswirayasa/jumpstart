import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        orderItem: true,
      },
    });
    if (product?.orderItem.length !== 0) {
      return NextResponse.json(
        {
          message:
            "You can't delete this product, because there's an order for this product",
        },
        { status: 400 }
      );
    }

    await prismadb.productImage.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    await prismadb.specification.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    await prismadb.review.deleteMany({
      where: {
        productId: params.productId,
      },
    });
    await prismadb.wishlist.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(
      { message: "product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  } finally {
    prismadb.$disconnect();
  }
}
