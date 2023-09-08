import { format } from "date-fns";
import React from "react";

import { ProductColumn } from "@/components/admin/products/table/columns";
import { ProductsClient } from "@/components/admin/products/table/table-client";
import prismadb from "@/lib/prismadb";

const page = async () => {
  async function getAllProduct() {
    "use server";
    try {
      const products = await prismadb.product.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return products;
    } catch (error) {
      console.log(error);
    } finally {
      await prismadb.$disconnect();
    }
  }
  const products = await getAllProduct();
  const formattedProducts: ProductColumn[] = products!.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    stock: item.stock,
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default page;
