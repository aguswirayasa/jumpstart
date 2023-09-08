"use client";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { OrdersColumn, columns } from "./columns";

interface OrdersClientProps {
  data: OrdersColumn[];
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Orders</h1>
      </div>
      <Separator />
      <DataTable
        searchPlaceholder="Search by customer name"
        searchKey="customerName"
        columns={columns}
        data={data}
      />
    </>
  );
};
