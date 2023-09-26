"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHydration } from "@/hooks/useHydration";
import { useCheckoutStore, useProfileStore } from "@/lib/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

const CartSummary = () => {
  const { formattedTotalPrice, totalPrice, cartDetails, clearCart } =
    useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useHydration();
  const session = useSession();
  const user = session.data?.user;
  const searchParams = useSearchParams();
  const { address } = useCheckoutStore();
  const router = useRouter();
  const setAvatar = useProfileStore((state) => state.setAvatarUrl);
  const setName = useProfileStore((state) => state.setName);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/checkout", {
        cartDetails,
        totalPrice,
        shippingAddress: address,
      });
      if (response.status === 200) {
        window.location = response.data.url;
      } else if (response.status === 400) {
        toast.error("Stock not available, please check the product you order");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("Stock not available, please check the product you order");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      clearCart();
    }

    if (searchParams.get("canceled")) {
      toast.error("Order Canceled.");
    }
  }, [searchParams]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="border border-gray-200 shadow-lg rounded-lg p-5 ">
      <h1 className="text-lg md:text-xl font-bold mb-3 ">Shopping Summary</h1>
      <span className="flex justify-between">
        <p className="font-semibold">Subtotal:</p>
        <p>{formattedTotalPrice}</p>
      </span>
      <Separator className="my-5" />
      <span className="flex justify-between text-lg md:text-xl font-bold">
        <p className="">Grandtotal:</p>
        <p>{formattedTotalPrice}</p>
      </span>
      <Button
        className="w-full mt-5"
        onClick={handleCheckout}
        disabled={isLoading || !totalPrice || !address}
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
