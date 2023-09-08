import AddToCart from "@/components/customer/home/add-to-cart";
import ProductAccordian from "@/components/customer/home/product-accordian";
import ProductCarousel from "@/components/customer/home/product-carousel";
import ProductGallery from "@/components/product-gallery/gallery";
import prismadb from "@/lib/prismadb";
import { Product } from "@/types";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Review from "@/components/customer/home/review";
import CustomIcon from "@/components/ui/icons";
import { Rating } from "react-simple-star-rating";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    <>
      <div className="grid grid-cols-12 gap-3 m-10 ">
        <div className="col-span-12 md:col-span-7">
          <ProductGallery
            images={product?.images || []}
            thumbnail={product?.thumbnail || "none"}
          />
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center sticky top-0">
          <div className="border-b border-gray-200 pb-1 mb-6">
            <h1 className="font-semibold text-xl md:text-2xl">
              {product?.name}
            </h1>
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
            name={product?.name!}
            id={product?.id!}
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
          <div className="grid grid-cols-12 w-full p-5 space-x-3">
            <div className="col-span-3 flex flex-col gap-3">
              <h3 className="text-xl font-bold">Customer Review</h3>
              <div className="flex flex-col justify-centerr">
                <span className="flex items-center">
                  <CustomIcon
                    icon={AiTwotoneStar}
                    color="text-yellow-500"
                    size="20px"
                  />
                  <p className="text-2xl font-black">4.9</p>
                  <small className="self-end text-base text-gray-500">
                    /5.0
                  </small>
                </span>
                <span className="flex text-xs text-gray-500 gap-1">
                  <p> 234 ratings</p>
                  <p>-</p>
                  <p> 128 reviews</p>
                </span>
              </div>
              <Separator />
              <div>
                <h3 className="text-base font-semibold">Review this product</h3>
                <p className="text-xs">
                  Share your thoughts with other customers
                </p>
                <Button
                  variant={"outline"}
                  className="border-primary mt-3 w-full"
                >
                  Write Review
                </Button>
              </div>
            </div>
            <div className="col-span-9">
              <div className="flex flex-col justify-center p-3 gap-3 border-b border-gray-300">
                <Review />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full relative ">
                    <Image
                      src={"/default-avatar.jpg"}
                      fill
                      alt="avatar"
                      className="object-cover object-center rounded-full"
                    />
                  </div>
                  <p className="text-xl font-semibold">Jolly Roger</p>
                </div>
                <p className="text-base">
                  I mam loving my new HP Envy 2-in-1. The screen is 15.6 and
                  touch screen which I love. I love that it has a keyboard that
                  lights up for those long nights of doing homework on the
                  laptop. The Laptop folds all the way{" "}
                </p>
              </div>
              <div className="flex flex-col justify-center p-3 gap-3 border-b border-gray-300">
                <Review />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full relative ">
                    <Image
                      src={"/default-avatar.jpg"}
                      fill
                      alt="avatar"
                      className="object-cover object-center rounded-full"
                    />
                  </div>
                  <p className="text-xl font-semibold">John</p>
                </div>
                <p className="text-base">
                  Great find!My son and I were looking for a laptop replacement.
                  My son is a digital artist and needed a tool for his vivid art
                  and colorful illustrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
