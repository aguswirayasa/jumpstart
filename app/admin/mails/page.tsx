import { CustomerColumn } from "@/components/admin/email/table/columns";
import { CustomerClient } from "@/components/admin/email/table/table-client";
import { getCustomer } from "@/lib/server-utils";
import React from "react";

const page = async () => {
  const customers = await getCustomer();
  const formattedCustomers: CustomerColumn[] = customers!.map((item) => ({
    id: item.id,
    name: item.firstName + " " + item.lastName,
    email: item.email,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerClient data={formattedCustomers} />
      </div>
    </div>
  );
};

export default page;
