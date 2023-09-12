"use client";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { BsCartX, BsPlusLg } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import CustomIcon from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartItem = () => {
  const {
    cartDetails,
    incrementItem,
    decrementItem,
    removeItem,
    setItemQuantity,
  } = useShoppingCart();

  return (
    <div className="border border-gray-200 shadow-lg rounded-lg">
      {Object.keys(cartDetails!).length > 0 ? (
        // Render cart items when cartDetails is not empty
        <>
          {Object.entries(cartDetails!).map(([itemId, itemDetails]) => (
            <>
              <Card
                key={itemId}
                className="shadow-none relative border-none rounded-none grid md:flex justify-start items-start"
              >
                <CardHeader className=" p-5 relative">
                  <div className=" mx-auto  md:max-w-[300px] ">
                    <Image
                      src={itemDetails.image!}
                      alt={itemDetails.name}
                      width={300}
                      height={300}
                      className=" max-h-[100px]  md:max-w-[200px] object-contain rounded-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-5 max-w-md">
                  <h3 className="font-bold">{itemDetails.name}</h3>
                  <p className="font-medium">{itemDetails.formattedValue}</p>
                  {!itemId.includes("true") && <Badge>{itemId} </Badge>}
                </CardContent>
                <CardFooter className="">
                  <span
                    className="absolute top-0 right-5 flex items-center m-3 cursor-pointer"
                    onClick={() => removeItem(itemId)}
                  >
                    <GrClose />
                  </span>
                  <span className="absolute bottom-0 right-0 m-5 text-primary text-xl flex gap-1 items-center">
                    <CustomIcon
                      icon={AiOutlinePlusCircle}
                      color="text-primary"
                      key={"20px"}
                      onClick={() => incrementItem(itemId, { count: 1 })}
                    />
                    <Input
                      className="w-10 text-center border-none text-black"
                      value={itemDetails.quantity}
                      onChange={(e) =>
                        setItemQuantity(itemId, Number(e.target.value))
                      }
                    />

                    <CustomIcon
                      icon={AiOutlineMinusCircle}
                      color="text-primary"
                      key={"20px"}
                      onClick={() => decrementItem(itemId, { count: 1 })}
                    />
                  </span>
                </CardFooter>
              </Card>
              <Separator />
            </>
          ))}
        </>
      ) : (
        // Render this when cartDetails is empty
        <>
          <Card className="grid place-items-center md:h-[400px]">
            <CardContent className="flex flex-col items-center">
              <CustomIcon
                icon={BsCartX}
                color="text-gray-600"
                size="50px"
                className="mb-3"
              />
              <h2 className="text-xl md:text-2xl font-bold">
                Your Cart is Empty
              </h2>
              <p className="text-lg text-gray-400">Add product to your cart</p>
              <Link href={"/"}>
                <Button className="flex items-center gap-1 mt-3">
                  <CustomIcon icon={BsPlusLg} color="text-white" />
                  <p>Add Product</p>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CartItem;
