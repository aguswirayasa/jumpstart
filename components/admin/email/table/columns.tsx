"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";

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
    id: "select",
    header: ({ table }) => (
      <div className="flex  gap-2 items-center">
        <Checkbox
          className="border-white"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <p className="text-left align-middle font-medium text-white">
          Send email
        </p>
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        value={row.original.email}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);

          console.log(value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
