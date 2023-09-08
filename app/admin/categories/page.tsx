import React from "react";
import { format } from "date-fns";

import { CategoriesClient } from "@/components/admin/categories/table/table-client";
import { getCategories } from "@/lib/server-utils";
import { CategoriesColumn } from "@/components/admin/categories/table/columns";

const page = async () => {
  const categories = await getCategories();
  const formattedCategories: CategoriesColumn[] = categories!.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default page;
