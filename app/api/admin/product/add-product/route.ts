import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, description, price, categoryId, images, specifications } =
    await request.json();

  const convertedPrice = parseFloat(price);
  try {
    // Create the product using Prisma
    const createdProduct = await prismadb.product.create({
      data: {
        name,
        description,
        price: convertedPrice,
        categoryId,
        specifications: {
          create: specifications.map(
            (spec: { name: string; value: string }) => ({
              name: spec.name,
              value: spec.value,
            })
          ),
        },
        productImages: {
          create: images.map((image: { url: string }) => ({
            url: image.url,
          })),
        },
      },
    });
    console.log("result", createdProduct);
    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  } finally {
    await prismadb.$disconnect(); // Disconnect the Prisma client
  }
}
