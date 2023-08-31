"use client";

import React from "react";

import { ProductCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";

const ProductCard = (props: ProductCardProps) => {
  return (
    <Card className=" max-h-none max-w-none text-left">
      <CardHeader className="mx-auto ">
        <CldImage
          src={props.productImage}
          width={200}
          height={150}
          alt=""
          className=" object-contain h-[110px]"
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-primary font-medium cursor-pointer select-none hover:underline underline-offset-1">
          {props.productName.length > 67
            ? `${props.productName.slice(0, 67)}...`
            : props.productName}
        </p>
      </CardContent>
      <CardFooter className="grid">
        <p>no review</p>
        <p className="font-bold text-base">${props.productPrice}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
