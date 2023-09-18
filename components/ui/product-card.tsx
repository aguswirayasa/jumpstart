"use client";

import React from "react";
import Link from "next/link";

import { ProductCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

const ProductCard = (props: ProductCardProps) => {
  return (
    <Card className=" w-full h-full shadow-lg text-left">
      <CardHeader className="mx-auto ">
        <Image
          src={props?.thumbnail || "images/"}
          width={200}
          height={150}
          alt=""
          loading="lazy"
          className=" object-contain h-[110px]"
        />
      </CardHeader>
      <CardContent className="py-0">
        <Link href={`/product/${props.name}/${props.id}`}>
          <p className="text-sm text-primary font-medium cursor-pointer select-none hover:underline underline-offset-1 min-h-[80px]">
            {props?.name?.length > 67
              ? `${props.name.slice(0, 67)}...`
              : props.name}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="grid">
        <span className="flex items-center ">
          <Rating initialValue={props.averageRating} size={20} readonly />
          <p className="text-gray-500 text-sm">({props.totalReviews})</p>
        </span>
        <p className="font-bold text-base">${props.price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
