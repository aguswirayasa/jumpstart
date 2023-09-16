"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import { wishlistRequest } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Button } from "./button";

interface WishlistCardProps {
  id: string;
  thumbnail: string | null;
  name: string;
  price: number;
  userEmail: string;
  productId: string;
}

const WishlistCard = (props: WishlistCardProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const wishlistData = {
    userEmail: props.userEmail || "",
    productId: props.id,
  };

  const wishlistMutation = useMutation(
    async (data: wishlistRequest) => {
      const response = await axios.post("/api/wishlist/add-wishlist", data);
      if (response.data.message === "added") {
        toast.success("Item added to wishlist!");
      } else {
        toast.error("Item removed from wishlist!");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wishlist");
        router.refresh();
      },
      onError: (error) => {
        toast.error("Something went wrong, please try again");
      },
    }
  );

  const handleWishlist = (data: wishlistRequest) => {
    wishlistMutation.mutateAsync(data);
  };
  return (
    <Card className=" max-h-none max-w-none text-left">
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
        <p className="text-sm text-primary font-medium   underline-offset-1 min-h-[80px]">
          {props.name.length > 67
            ? `${props.name.slice(0, 67)}...`
            : props.name}
        </p>
      </CardContent>
      <CardFooter className="grid ">
        <span className="flex items-center ">
          <Rating
            initialValue={5}
            size={20}
            disableFillHover={true}
            allowHover={false}
            className="cursor-default"
            readonly
          />
          <p className="text-gray-500 text-sm">(293)</p>
        </span>
        <p className="font-bold text-base">${props.price}</p>

        <Link href={`/product/${props.name}/${props.productId}`}>
          <Button>View Product</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WishlistCard;
