import prismadb from "@/lib/prismadb";
import { ReviewRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    comment,
    orderItemsId,
    rating,
    productId,
    userEmail,
    productVariant,
  }: ReviewRequest = await request.json();
  try {
    const response = await prismadb.review.create({
      data: {
        content: comment,
        rating,
        productId,
        userEmail,
        productVariant,
      },
    });
    if (response) {
      await prismadb.orderItem.update({
        data: {
          isReviewed: true,
        },
        where: {
          id: orderItemsId,
        },
      });
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }
    return NextResponse.json({ message: "error" }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 400 });
  } finally {
    await prismadb.$disconnect();
  }
}
