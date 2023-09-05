import AddToCart from "@/components/customer/home/add-to-cart";
import ProductAccordian from "@/components/customer/home/product-accordian";
import ProductCarousel from "@/components/customer/home/product-carousel";
import ProductGallery from "@/components/product-gallery/gallery";
import prismadb from "@/lib/prismadb";
import { Product } from "@/types";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getProductDetails(id: string): Promise<Product | undefined> {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        productImages: true,
        specifications: true,
        variantOption: true,
      },
    });

    return {
      id: product?.id || "",
      name: product?.name || "",
      description: product?.description || "",
      thumbnail: product?.thumbnail || "",
      price: product?.price + "" || "0",
      stock: product?.stock + "" || "0",
      categoryId: product?.category.id || "",
      images: product?.productImages || [],
      specifications: product?.specifications || [],
      variantOptions: product?.variantOption || [],
    };
  } catch (error) {
    console.log(error);
  } finally {
    prismadb.$disconnect;
  }
}

const page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductDetails(params.id);
  return (
    <div className="grid grid-cols-12 gap-3 m-10 ">
      <div className="col-span-12 md:col-span-7">
        <ProductGallery
          images={product?.images || []}
          thumbnail={product?.thumbnail || "none"}
        />
      </div>
      <div className="col-span-12 md:col-span-5 flex flex-col justify-center sticky top-0">
        <div className="border-b border-gray-200 pb-1 mb-6">
          <h1 className="font-semibold text-xl md:text-2xl">{product?.name}</h1>
          <span className="flex gap-3">
            <span className="text-gray-500">
              <b className="text-primary">5.0</b> ratings
            </span>
            <span className="text-gray-500">
              <b className="text-primary">5.000</b> reviews
            </span>
          </span>
          <p className="text-lg font-bold md:text-3xl text-primary ">
            ${product?.price}
          </p>
        </div>

        <AddToCart
          price={parseInt(product?.price || "0")}
          stock={parseInt(product?.stock || "0")}
          thumbnail={product?.thumbnail || "none"}
          variantOptions={product?.variantOptions || []}
        />
      </div>
      <div className="grid place-items-center col-span-7 border-2 border-gray-200 rounded-lg p-3 gap-3">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-left w-full">
            Product Description
          </h2>
          <p className="text-base text-justify">{product?.description}</p>
        </div>
        <div className="w-full space-y-3">
          <h2 className="text-xl font-bold text-left w-full">
            Product Specification
          </h2>
          <Table>
            <TableBody>
              {product?.specifications?.map((specification, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 && "bg-primary/10"}`}
                >
                  <TableCell className="font-semibold">
                    {specification.name}
                  </TableCell>
                  <TableCell>{specification.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
