import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    name,
    description,
    price,
    categoryId,
    images,
    specifications,
    stock,
    thumbnail,
    variants,
  } = await request.json();

  const convertedPrice = parseFloat(price);
  console.log("converted price:", convertedPrice);
  const convertedStock = parseInt(stock);
  try {
    // Create the product using Prisma
    const createdProduct = await prismadb.product.create({
      data: {
        name,
        description,
        price: convertedPrice,
        categoryId,
        stock: convertedStock,
        thumbnail,
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
        variantOption: variants
          ? {
              create: variants.map(
                (variant: {
                  type: string;
                  name: string;
                  priceDiff: Float32Array;
                  stock: number;
                }) => ({
                  name: variant.name,
                  stock: variant.stock,
                })
              ),
            }
          : undefined, // Use undefined if variants is null
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
