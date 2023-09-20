"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type OrdersColumn = {
  id: string;
  customerName: string;
  products: string;
  address: string;
  phoneNumber: string;
  totalPrice: string;
  createdAt: string;
  status: string;
  completedDate: string;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "createdAt",
    header: "Ordered At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "Delivery",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
