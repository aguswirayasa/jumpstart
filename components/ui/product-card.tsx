import React from "react";

import { ProductCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const ProductCard = (props: ProductCardProps) => {
  return (
    <Card className=" max-h-none max-w-none text-left">
      <CardHeader className="mx-auto ">
        <CldImage
          src={props?.thumbnail || "images/"}
          width={200}
          height={150}
          alt=""
          className=" object-contain h-[110px]"
        />
      </CardHeader>
      <CardContent className="py-0">
        <Link href={`/${props.name}/${props.id}`}>
          <p className="text-sm text-primary font-medium cursor-pointer select-none hover:underline underline-offset-1 min-h-[80px]">
            {props.name.length > 67
              ? `${props.name.slice(0, 67)}...`
              : props.name}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="grid">
        <p>no review</p>
        <p className="font-bold text-base">${props.price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
