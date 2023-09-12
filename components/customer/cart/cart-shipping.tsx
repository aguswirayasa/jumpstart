"use client";

import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

import CustomIcon from "@/components/ui/icons";
import { Card, CardContent } from "@/components/ui/card";
import { ShippingAddressModal } from "@/components/modal/shipping-address-modal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useStore } from "zustand";
import { useCheckoutStore } from "@/lib/store";

const CartShipping = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [shippingAddress, setShippingAddress] = useState(null);
  const { address } = useCheckoutStore();
  const setAddress = useCheckoutStore((state) => state.setAddress);

  const getShippingAddress = async (email: string) => {
    try {
      const response = await axios.get(`/api/user/${email}/get-address`);

      setShippingAddress(response.data.result);
      console.log(shippingAddress);
      setAddress(response.data.result[0]);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  useEffect(() => {
    getShippingAddress(session?.user?.email!);
  }, [session?.user?.email]);
  return (
    <>
      <ShippingAddressModal
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        addresses={shippingAddress || []}
        selectedAddress={address.id || ""}
      />
      <Card
        className="hover:bg-black/10 transition-all duration-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <h2 className="m-3 font-bold text-xl">Shipping Address</h2>
        <CardContent className="grid grid-cols-6">
          <CustomIcon
            icon={IoLocationSharp}
            className="col-span-1"
            color="text-primary"
          />
          <div className="col-span-5">
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state}, {address.country}
            </p>
            <p>{address.postalCode}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CartShipping;
