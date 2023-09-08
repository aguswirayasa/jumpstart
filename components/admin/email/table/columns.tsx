"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CustomerColumn = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    header: "Send Email",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
