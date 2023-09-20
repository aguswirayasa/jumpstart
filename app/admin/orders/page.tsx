import { OrdersColumn } from "@/components/admin/orders/table/columns";
import { OrdersClient } from "@/components/admin/orders/table/table-client";
import { getOrders } from "@/lib/server-utils";
import { Item } from "@radix-ui/react-accordion";
import { format } from "date-fns";
import React from "react";

const page = async () => {
  const orders = await getOrders();
  const formattedOrders: OrdersColumn[] = orders!.map((item) => {
    const products = item.orderItems
      .map((orderItem) => {
        const productName = orderItem.product.name;
        const variantName = orderItem.productVariant;

        // Check if a variant name exists
        if (!variantName?.includes("true") && variantName) {
          return `${productName} (${variantName})`;
        } else {
          return productName;
        }
      })
      .join("\n");

    return {
      id: item.id,
      address: item.address,
      customerName: item.user?.firstName + " " + item.user?.lastName,
      phoneNumber: item.phone,
      status: item.status,
      totalPrice: "$" + item.totalPrice.toLocaleString("en-US"),
      products: products,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
      completedDate: item.completedDate
        ? format(item.completedDate, "MMMM do, yyyy")
        : "Not completed",
    };
  });

  console.log();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default page;
