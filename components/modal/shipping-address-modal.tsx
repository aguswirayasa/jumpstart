/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Card, CardContent } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Address } from "@/types";
import { useCheckoutStore } from "@/lib/store";
import Link from "next/link";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  loading?: boolean;
  selectedAddress: string;
}

export const ShippingAddressModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const setAddress = useCheckoutStore((state) => state.setAddress);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Shipping Address"
      description="Select or add your shipping address"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        {addresses.length <= 0 ? (
          <div>
            <h2 className="text-lg font-semibold">
              You don't have any addresses yet.
            </h2>
            <p className="text-gray-600 text-sm">
              Click the button below to add a new address.
            </p>
            <Link href={"/user/setting"}>
              <Button className="mt-4">Add New Address</Button>
            </Link>
          </div>
        ) : (
          <RadioGroup defaultValue="comfortable">
            {addresses.map((item, index) => (
              <Card key={index}>
                <label
                  onClick={() => {
                    setAddress(item);
                  }}
                >
                  <CardContent className="grid grid-cols-6 pt-6">
                    <div className="col-span-1">
                      <RadioGroupItem
                        value="default"
                        id="r1"
                        checked={selectedAddress === item.id!}
                      />
                    </div>
                    <div className="col-span-5">
                      <p>{item.street}</p>
                      <p>
                        {item.city}, {item.state}, {item.country}
                      </p>
                      <p>{item.postalCode}</p>
                    </div>
                  </CardContent>
                </label>
              </Card>
            ))}
          </RadioGroup>
        )}
      </div>
    </Modal>
  );
};
