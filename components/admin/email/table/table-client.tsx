"use client";

import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { CustomerColumn, columns } from "./columns";

interface CustomerClientProps {
  data: CustomerColumn[];
}

export const CustomerClient: React.FC<CustomerClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Bulk Mail</h1>
        <Button onClick={() => router.push("categories/add-category")}>
          <Send className="mr-2 h-4 w-4" /> Send Email
        </Button>
      </div>
      <Separator />
      <DataTable
        searchPlaceholder="Search by customer name"
        searchKey="name"
        columns={columns}
        data={data}
      />
    </>
  );
};
