"use client";

import { useShoppingCart, DebugCart } from "use-shopping-cart";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Variant } from "@/types";
import { Product } from "use-shopping-cart/core";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface AddToCartProps {
  stock: number;
  price: number;
  thumbnail: string;
  name: string;
  id: string;
  variantOptions: Variant[];
}

const AddToCart = ({
  stock,
  price,
  thumbnail,
  name,
  id,
  variantOptions,
}: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(price);
  const [variants, setVariants] = useState(variantOptions[0]?.name || "");
  const [selected, setSelected] = useState(
    variantOptions[0]?.name + "" + 0 || ""
  );
  const { data: session, status } = useSession();
  const checkout = session?.user ? "/cart" : "/sign-in";

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
                // Handle invalid input, e.g., set quantity to 1
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
        <p className="text-xl font-semibold my-3">Subtotal : ${subtotal}</p>
        <div className="space-y-3">
          <div className="space-x-3">
            <Button
              className="space-x-3 select-none"
              disabled={variantStock === 0}
              onClick={() => {
                addItem(product, { count: quantity });
                toast.success("Item added to cart!");
              }}
            >
              <FaCartPlus />
              <p className="font-semibold">Add to cart</p>
            </Button>

            <Button
              className="space-x-3 select-none"
              disabled={variantStock === 0}
            >
              <BsFillBookmarkPlusFill />
              <p className="font-semibold">Add to wishlist</p>
            </Button>
          </div>

          <Button
            className="space-x-3 bg-yellow-500 w-full select-none"
            disabled={variantStock === 0}
          >
            {variantStock === 0 ? (
              <p className="font-bold">Sold Out</p>
            ) : (
              <Link href={checkout}>
                <p className="font-bold">Checkout</p>
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
