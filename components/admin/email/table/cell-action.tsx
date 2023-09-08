"use client";

import { CustomerColumn } from "./columns";
import { Checkbox } from "@/components/ui/checkbox";

interface CellActionProps {
  data: CustomerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>
      <Checkbox value={data.email} />
    </>
  );
};
