"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";

export type BannersColumn = {
  id: string;
  url: string;
  active: boolean;
};

export const columns: ColumnDef<BannersColumn>[] = [
  {
    id: "banner",
    header: "Banner",
    cell: ({ row }) => (
      <div className="mx-auto ">
        <Image
          src={row.original.url}
          width={300}
          height={150}
          alt=""
          loading="lazy"
          className=" object-contain h-[110px]"
        />
      </div>
    ),
  },
  {
    id: "active",
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => <p>{row.original.active ? "Active" : "Inactive"}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
