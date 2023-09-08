"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CategoriesColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
