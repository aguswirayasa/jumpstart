import prismadb from "@/lib/prismadb";
import { UpdateProduct } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productData: UpdateProduct = await request.json();
  const productId = params?.productId || "";
  console.log(productData);
  try {
    // Cast the price to a number
    const price = Number(productData.price);

    if (isNaN(price)) {
      return NextResponse.json(
        { message: "Invalid price provided" },
        { status: 400 }
      );
    }

    // Fetch the existing product data
    const existingProduct = await prismadb.product.findUnique({
      where: { id: productId },
      include: {
        productImages: true, // Include the images related to the product
        specifications: true, // Include the specifications related to the product
      },
    });

    const productCategories = await prismadb.category.findUnique({
      where: {
        id: productData.categoryId,
      },
    });

    if (!productCategories) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Update the product data
    const updatedProduct = {
      ...existingProduct,
      ...productData, // Update with the incoming data
      price: price, // Assign the parsed price
    };

    // Remove the categoryId field from updatedProductWithCategory
    const { categoryId, images, ...updatedProductWithCategory } =
      updatedProduct;

    // Filter removed images and get their ids
    const removedImageIds = existingProduct.productImages.filter(
      (img) => !productData.images.find((newImg) => newImg.id === img.id)
    );

    // Filter removed specifications and get their ids
    const removedSpecificationIds = existingProduct.specifications.filter(
      (spec) =>
        !productData.specifications.find((newSpec) => newSpec.id === spec.id)
    );

    // Filter newly added images or return an empty array if they already exist
    const newImages = productData.images.filter(
      (newImg) =>
        !existingProduct.productImages.find((img) => img.id === newImg.id)
    );

    // Filter newly added specifications or return an empty array if they already exist
    const newSpecifications = productData.specifications.filter(
      (newSpec) =>
        !existingProduct.specifications.find((spec) => spec.id === newSpec.id)
    );

    console.log("Added specifications", newSpecifications);
    console.log("Removed specifications", removedSpecificationIds);
    console.log("Removed Images", removedImageIds);
    console.log("newly added images", newImages);
    // Update the product in the database
    const result = await prismadb.product.update({
      where: { id: productId },
      data: {
        ...updatedProductWithCategory,
        categoryId: productCategories.id,
        productImages: {
          // Reassign the images after removing deleted ones

          deleteMany: { id: { in: removedImageIds.map((img) => img.id) } },
          create: newImages.map((img) => ({
            url: img.url,
          })),
        },
        specifications: {
          // Reassign the specifications after removing deleted ones
          deleteMany: {
            id: { in: removedSpecificationIds.map((spec) => spec.id) },
          },
          create: newSpecifications.map((spec) => ({
            name: spec.name,
            value: spec.value,
          })),
        },
      },
    });
    console.log("PRODUCT UPDATED");
    console.log(result);
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  } finally {
    await prismadb.$disconnect();
  }
}
