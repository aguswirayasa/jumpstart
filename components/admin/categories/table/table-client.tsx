"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { CategoriesColumn, columns } from "./columns";

interface CategoriesClientProps {
  data: CategoriesColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Categories</h1>
        <Button onClick={() => router.push("categories/add-category")}>
          <Plus className="mr-2 h-4 w-4" /> Add Categories
        </Button>
      </div>
      <Separator />
      <DataTable
        searchBar
        searchPlaceholder="Search by category name"
        searchKey="name"
        columns={columns}
        data={data}
      />
    </>
  );
};
