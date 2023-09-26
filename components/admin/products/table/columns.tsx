"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  thumbnail: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <div className="mx-auto ">
        <Image
          src={row.original.thumbnail}
          width={150}
          height={200}
          alt={row.original.name}
          loading="eager"
          className=" object-contain h-[200px]"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "createdAt",
    header: "Added At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
