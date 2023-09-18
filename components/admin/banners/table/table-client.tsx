"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { BannersColumn, columns } from "./columns";

interface BannersClientProps {
  data: BannersColumn[];
}

export const BannersClient: React.FC<BannersClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Banners</h1>
        <Button onClick={() => router.push("banners/add-banner")}>
          <Plus className="mr-2 h-4 w-4" /> Add Banner
        </Button>
      </div>
      <Separator />
      <DataTable
        searchPlaceholder="Search by status"
        searchKey="status"
        columns={columns}
        data={data}
        searchBar={false}
      />
    </>
  );
};
