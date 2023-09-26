import React from "react";

import { getAllBanners } from "@/lib/server-utils";
import { BannersClient } from "@/components/admin/banners/table/table-client";

const ManageBannersPage = async () => {
  const banners = await getAllBanners();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannersClient data={banners} />
      </div>
    </div>
  );
};

export default ManageBannersPage;
