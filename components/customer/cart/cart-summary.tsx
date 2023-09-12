"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHydration } from "@/hooks/useHydration";
import { useCheckoutStore } from "@/lib/store";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

const CartSummary = () => {
  const { formattedTotalPrice, totalPrice, cartDetails, clearCart } =
    useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useHydration();
  const searchParams = useSearchParams();
  const { address } = useCheckoutStore();

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
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        disabled={isLoading}
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
