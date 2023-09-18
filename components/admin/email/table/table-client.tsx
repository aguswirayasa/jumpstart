"use client";

import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { CustomerColumn, columns } from "./columns";
import { DataTableEmails } from "./data-table-emails";
import SendMailModal from "@/components/modal/send-mail-moda";

interface CustomerClientProps {
  data: CustomerColumn[];
}

export const CustomerClient: React.FC<CustomerClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Bulk Mail</h1>
        <SendMailModal />
      </div>
      <Separator />
      <DataTableEmails
        searchPlaceholder="Search by customer name"
        searchKey="name"
        columns={columns}
        data={data}
      />
    </>
  );
};
