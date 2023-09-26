"use client";

import { useShoppingCart } from "use-shopping-cart";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Variant, wishlistRequest } from "@/types";
import { Product } from "use-shopping-cart/core";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import WishlistButton from "@/components/ui/wishlist-button";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useWishlistStore } from "@/lib/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToCartProps {
  stock: number;
  price: number;
  thumbnail: string;
  name: string;
  id: string;
  variantOptions: Variant[];
  wished: boolean;
  userEmail: string;
}

const AddToCart = ({
  stock,
  price,
  thumbnail,
  name,
  id,
  variantOptions,
  wished,
  userEmail,
}: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(price);
  const [variants, setVariants] = useState("");
  const [selected, setSelected] = useState("");

  const checkout = userEmail ? "/cart" : "/sign-in";
  const isLogin = userEmail ? true : false;
  const queryClient = useQueryClient();
  const [isWished, setIsWished] = useState(wished);
  const [variantStock, setVariantStock] = useState(stock);
  const { addItem, cartDetails } = useShoppingCart();
  const product: Product = {
    currency: "USD",
    id: variants || name + "   " + "true",
    name,
    image: thumbnail,
    price: price * 100,
    sku: id,
  };
  const wishlistData = {
    userEmail: userEmail || "",
    productId: id,
  };

  useEffect(() => {
    if (!variantOptions || variantOptions.length === 0) {
      setSelected("selected");
    }
  }, []);

  const wishlistMutation = useMutation(
    async (data: wishlistRequest) => {
      const response = await axios.post("/api/wishlist/add-wishlist", data);
      if (response.data.message === "added") {
        toast.success("Item added to wishlist!");
        setIsWished(true);
      } else {
        toast.error("Item removed from wishlist!");
        setIsWished(false);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wishlist");
      },
      onError: (error) => {
        toast.error("Something went wrong, please try again");
      },
    }
  );
  const addToCart = () => {
    addItem(product, { count: quantity });
    setQuantity(1);
    toast.success("Item added to cart!");
  };
  const handleWishlist = (data: wishlistRequest) => {
    wishlistMutation.mutateAsync(data);
  };

  return (
    <div>
      {variantOptions.length !== 0 && (
        <div className="mb-5 space-y-3">
          <h2 className="font-semibold">Select Variant :</h2>

          <p>Color : {variants}</p>
          <div className="flex gap-3 flex-wrap">
            {variantOptions.map((variant, index) => (
              <div
                key={index}
                onClick={() => {
                  setVariants(variant.name);
                  setSelected(variant.name + index);
                  setVariantStock(variant.stock);
                  setQuantity(1);
                }}
                className={`flex items-center  ${
                  selected === variant.name + index
                    ? "border-primary border-2"
                    : "border-gray-500 border"
                } w-fit rounded-xl p-1 gap-3 cursor-pointer select-none`}
              >
                <p>{variant.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="border-2 border-gray-200 p-5 grid place-items-center rounded-lg">
        <div className="flex items-center">
          <Button
            className="rounded-none"
            disabled={quantity <= 1}
            onClick={() => {
              setQuantity((prev) => prev - 1);
              setSubtotal((prev) => prev - price);
            }}
          >
            -
          </Button>
          <Input
            value={quantity}
            className="max-w-[50px] text-center relative rounded-none"
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              if (!isNaN(parsedValue) && parsedValue >= 1) {
                setQuantity(parsedValue);
                setSubtotal(() => price * parsedValue);
              } else {
                // Handle invalid input, e.g., set quantity to 1sss
                setQuantity(1);
                setSubtotal(() => price);
              }
            }}
          />
          <Button
            disabled={quantity >= variantStock}
            className="rounded-none"
            onClick={() => {
              setQuantity((prev) => prev + 1);
              setSubtotal((prev) => prev + price);
            }}
          >
            +
          </Button>
          {variantStock === 0 ? (
            <p className="font-medium text-lg ms-3">Sold Out</p>
          ) : (
            <p className="font-medium text-lg ms-3">
              Available {variantStock} units
            </p>
          )}
        </div>
        <p className="text-xl font-semibold my-3">
          Subtotal : ${subtotal.toFixed(2)}
        </p>
        <div className="space-y-3">
          <div className="grid grid-cols-2 space-x-3">
            <AddToCartButton
              isLogin={isLogin}
              onClick={addToCart}
              showText={true}
              disable={variantStock === 0 || !isLogin || !selected}
              classname="col-span-1"
            />

            <WishlistButton
              isLogin={isLogin}
              showText={true}
              disable={
                variantStock === 0 || wishlistMutation.isLoading || !isLogin
              }
              onClick={() => handleWishlist(wishlistData)}
              isLoading={wishlistMutation.isLoading}
              isWished={isWished}
              classname="col-span-1"
            />
          </div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <Button
                  className="space-x-3 bg-yellow-500 w-full select-none"
                  disabled={variantStock === 0 || !isLogin}
                >
                  {variantStock === 0 ? (
                    <p className="font-bold">Sold Out</p>
                  ) : (
                    <Link href={checkout}>
                      <p className="font-bold">Checkout</p>
                    </Link>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isLogin
                    ? "Proceed to checkout"
                    : "You need to login to use this feauture"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
