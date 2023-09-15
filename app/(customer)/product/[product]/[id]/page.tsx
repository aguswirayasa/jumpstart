import AddToCart from "@/components/customer/home/add-to-cart";
import ProductGallery from "@/components/product-gallery/gallery";
import prismadb from "@/lib/prismadb";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Review from "@/components/customer/home/review";
import CustomIcon from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { isInWishlist } from "@/lib/server-utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

async function getProductDetails(id: string) {
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
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.log(error);
  } finally {
    prismadb.$disconnect;
  }
}

const page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductDetails(params.id);
  const session = await getServerSession();
  const wished = await isInWishlist(params.id, session?.user.email || "");
  const totalRatings = product?.reviews.length || 0;
  const totalRatingSum =
    product?.reviews.reduce((sum, review) => sum + Number(review.rating), 0) ||
    0;
  const averageRating = totalRatingSum / totalRatings || 0;
  // Assuming you have an array of reviews
  const reviews = product?.reviews || [];

  // Initialize an array to store the count of reviews for each star rating
  const starRatingCounts = [0, 0, 0, 0, 0];

  // Calculate the count of reviews for each star rating
  reviews.forEach((review) => {
    const rating = Number(review.rating);
    if (rating >= 1 && rating <= 5) {
      starRatingCounts[rating - 1]++;
    }
  });

  // Calculate the total number of reviews
  const totalReviews = reviews.length;

  const starRatingProgress = starRatingCounts.map((count) => ({
    progress: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    totalReviews: count, // The total number of reviews for this star rating
  }));

  const sumOfFirstTwoTotalReviews = starRatingProgress
    .slice(starRatingProgress.length - 2, starRatingProgress.length) // Get the first two star ratings
    .reduce((sum, rating) => sum + rating.totalReviews, 0);

  // Calculate the percentage
  const percentage = (sumOfFirstTwoTotalReviews / totalReviews) * 100 || 0;

  return (
    <>
      <div className="grid grid-cols-12 gap-3 m-10 ">
        <div className="col-span-12 md:col-span-7">
          <ProductGallery
            images={product?.productImages || []}
            thumbnail={product?.thumbnail || "none"}
          />
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center  md:sticky md:top-0">
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
            price={Number(product?.price || 0)}
            stock={Number(product?.stock || 0)}
            thumbnail={product?.thumbnail || "none"}
            name={product?.name!}
            id={product?.id!}
            variantOptions={product?.variantOption || []}
            wished={wished}
            userEmail={session?.user.email!}
          />
        </div>
        <div className="grid place-items-center col-span-12 md:col-span-7 border-2 border-gray-200 rounded-lg p-3 gap-3">
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
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
              <h3 className="text-xl font-bold">Customer Review</h3>
              <div className="flex flex-col justify-centerr">
                <span className="flex items-center justify-center">
                  <CustomIcon
                    icon={AiTwotoneStar}
                    color="text-yellow-500"
                    size="20px"
                  />
                  <p className="text-2xl font-black">
                    {averageRating.toFixed(1)}
                  </p>
                  <small className="self-end text-base text-gray-500">
                    /5.0
                  </small>
                </span>
                <p className="text-base font-semibold text-center">
                  {percentage}% buyers feels satisfied
                </p>

                <span className="flex text-xs text-gray-500 gap-1 justify-center">
                  <p>{totalRatings} ratings</p>
                  <p>•</p>
                  <p>{product?.reviews.length || 0} reviews</p>
                </span>
                <div className="my-3">
                  {starRatingProgress.reverse().map((progress, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center "
                    >
                      <span className="flex items-center">
                        <CustomIcon
                          icon={AiTwotoneStar}
                          color="text-yellow-500"
                          size="20px"
                        />
                        <p className="font-bold text-gray-500">{5 - index}</p>
                      </span>
                      <Progress value={progress.progress} className=" mx-2" />
                      <span className="w-2 text-center">
                        <p>{progress.totalReviews}</p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </div>
            <div className="col-span-12 md:col-span-8">
              {product?.reviews?.length || 0 > 0 ? (
                product?.reviews.map((review) => (
                  <div
                    className="flex flex-col justify-center p-3 gap-3 border-b border-gray-300"
                    key={review.id}
                  >
                    <Review rating={Number(review.rating)} />
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full relative ">
                        <Image
                          src={review.user.avatarUrl || "/default-avatar.jpg"}
                          fill
                          alt="avatar"
                          className="object-cover object-center rounded-full"
                        />
                      </div>
                      <p className="text-xl font-semibold">
                        {review.user.firstName.concat(
                          " ",
                          review.user.lastName
                        )}
                      </p>
                    </div>
                    <p className="text-base">{review.content}.</p>
                  </div>
                ))
              ) : (
                <Card className="w-full h-full grid place-items-center">
                  <p className="text-gray-500 text-center font-bold text-lg">
                    No reviews available.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
