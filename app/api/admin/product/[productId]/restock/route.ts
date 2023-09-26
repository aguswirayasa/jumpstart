import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { variants, stock } = await request.json();
  const productId = params?.productId || "";
  const convertedStock = Number(stock);
  try {
    // Update the product stock
    await prismadb.product.update({
      where: { id: productId },
      data: { stock: convertedStock },
    });

    for (const variant of variants) {
      if (variant.id) {
        // If the variant has an ID, update it
        await prismadb.variantOption.update({
          where: { id: variant.id },
          data: { stock: variant.stock },
        });
      } else {
        // If the variant doesn't have an ID, create it
        await prismadb.variantOption.create({
          data: {
            name: variant.name,
            stock: variant.stock,
            productId: productId,
          },
        });
      }
    }
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}
