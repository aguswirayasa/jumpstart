"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Products</h1>
        <Button onClick={() => router.push("products/add-product")}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <Separator />
      <DataTable
        searchPlaceholder="Search by product name"
        searchKey="name"
        columns={columns}
        data={data}
      />
    </>
  );
};
