"use client";

import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

import { variantOptions } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface RestockFormProps {
  productStock: string;
  productId: string;
  variantOption: variantOptions[]; // Adjust the type here
  onAddVariant?: (variant: variantOptions) => void;
}

const RestockForm = ({
  productStock,
  variantOption,
  onAddVariant,
  productId,
}: RestockFormProps) => {
  const [variants, setVariants] = useState<variantOptions[]>(variantOption); // Initialize with the prop value
  const queryClient = useQueryClient();
  const [stock, setStock] = useState(productStock || 0);
  const router = useRouter();
  const addVariant = () => {
    setVariants([...variants, { name: "", stock: 0 }]);
  };
  const restocktMutation = useMutation(
    async () => {
      const response = await axios.post(
        `/api/admin/product/${productId}/restock`,
        {
          variants,
          stock,
        }
      );
      if (response.status === 200) {
        toast.success("Stock updated successfully");
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("update");
        router.push("/admin/products");
        router.refresh();
      },
      onError: () => {
        toast.error("Something went wrong, please try again");
      },
    }
  );

  const onSubmit = async () => {
    if (variants.length > 0) {
      const variantsStockSum = variants.reduce(
        (total, variant) => total + variant.stock,
        0
      );

      // Check if the sum matches the stock value
      if (variantsStockSum !== stock) {
        toast.error(
          "The sum of variant stocks does not match the total stock."
        );
        return; // Prevent the mutation from executing
      }
    }
    restocktMutation.mutate();
  };
  return (
    <div>
      <Input
        placeholder="Stock"
        value={stock}
        onChange={(e) => {
          setStock(Number(e.target.value));
        }}
      />
      <div className="mb-3">
        <h2 className="font-medium text-xl mb-3">Product Color Variant</h2>

        {variants.map((variant, index) => (
          <div key={index} className="flex gap-1 items-center mb-3 relative">
            <p className="text-gray-400 text-sm">{index + 1}.</p>
            <Input
              placeholder="Name"
              value={variant.name}
              onChange={(e) => {
                const updatedVariants = [...variants];
                updatedVariants[index].name = e.target.value;
                setVariants(updatedVariants);
              }}
              className="col-span-1"
            />

            <Input
              placeholder="Stock"
              value={variant.stock.toString()} // Convert stock to string for input value
              onChange={(e) => {
                const updatedVariants = [...variants];
                const parsedValue = parseInt(e.target.value);
                if (!isNaN(parsedValue) && parsedValue >= 1) {
                  updatedVariants[index].stock = parsedValue;
                } else {
                  updatedVariants[index].stock = 1;
                }

                setVariants(updatedVariants);
              }}
              className="col-span-1 "
            />
            {!variant.id && (
              <span
                className="text-red-500 text-xl cursor-pointer select-none absolute -left-8    top-2 cur"
                onClick={() => {
                  const updatedVariants = [...variants];
                  updatedVariants.splice(index, 1); // Remove the variant at the specified index
                  setVariants(updatedVariants);
                }}
              >
                <TiDelete />
              </span>
            )}
          </div>
        ))}
        <span
          onClick={addVariant}
          className="flex gap-1 items-center select-none cursor-pointer text-primary"
        >
          <AiFillPlusCircle />
          <p>Add Variant Option</p>
        </span>
        <Button
          type="submit"
          onClick={() => onSubmit()}
          disabled={restocktMutation.isLoading}
          className="self-center mt-10"
        >
          {restocktMutation.isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              <p>Saving changes...</p>
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RestockForm;
