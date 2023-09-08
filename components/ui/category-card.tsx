"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/types";
import Image from "next/image";

const CategoryCard = ({ name, thumbnail, id }: Category) => {
  return (
    <Card className="rounded-none border-gray-200 hover:scale-110 cursor-pointer transition-colors duration-200">
      <CardHeader className="grid place-items-center">
        <Image
          src={thumbnail ? thumbnail : "none"}
          alt={name}
          width={100}
          height={100}
          className=" object-contain h-[100px]"
        />
      </CardHeader>
      <CardContent>
        <p className="text-base md:text-lg text-center font-medium">{name}</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
