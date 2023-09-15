import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userEmail, productId } = await request.json();
  if (!userEmail || !productId) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }

  try {
    // Check if the product is already in the user's wishlist
    const existingWishlistItem = await prismadb.wishlist.findFirst({
      where: {
        productId,
        userEmail,
      },
    });

    if (existingWishlistItem) {
      // If the product is already in the wishlist, remove it
      await prismadb.wishlist.delete({
        where: {
          id: existingWishlistItem.id,
        },
      });
      return NextResponse.json({ message: "removed" }, { status: 200 });
    } else {
      // If the product is not in the wishlist, add it
      const result = await prismadb.wishlist.create({
        data: {
          productId,
          userEmail,
        },
      });

      return NextResponse.json({ message: "added" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 400 });
  } finally {
    await prismadb.$disconnect();
  }
}
