import BestSellerChart from "@/components/admin/dashboard/bestseller-chart";
import SellsChart from "@/components/admin/dashboard/sells-chart";
import { Card } from "@/components/ui/card";
import CustomIcon from "@/components/ui/icons";
import {
  getBestSellerItem,
  getRecentOrders,
  getSales,
  getStatistics,
} from "@/lib/server-utils";
import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { BsFillCartFill } from "react-icons/bs";
import { OrdersClient } from "@/components/admin/orders/table/table-client";
import { formatOrder } from "@/lib/utils";

const page = async () => {
  const sales = await getSales();
  const statistics = await getStatistics();
  const labels = sales.map((sale) => sale.createdAt.toISOString().slice(0, 7)); // Format the date as "YYYY-MM"
  const dataPoints = sales.map((sale) => sale.amount);
  const bestSellerItem = await getBestSellerItem();

  return (
    <div className="m-10 space-y-3">
      <h1 className="font-black text-primary text-3xl">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5">
        <Card className="bg-primary col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-2xl">
              <FaDollarSign />
            </span>
          </div>
          <div className="col-span-2">
            <h1 className="text-2xl font-bold text-white">Total Sales</h1>
            <p className="text-sm text-white">${statistics.totalSales}</p>
          </div>
        </Card>
        <Card className="bg-primary col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-2xl">
              <BsFillCartFill />
            </span>
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-white">Total Orders</h2>
            <p className="text-sm text-white">{statistics.totalOrders}</p>
          </div>
        </Card>
        <Card className="bg-primary col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-2xl">
              <IoBagHandle />
            </span>
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-white">Total Products</h2>
            <p className="text-sm text-white">{statistics.totalProducts}</p>
          </div>
        </Card>
      </div>
      <div className="flex justify-between gap-3">
        <div className="w-full">
          <SellsChart dataPoints={dataPoints} labels={labels} />
        </div>
        <Card className="">
          <BestSellerChart dataPoints={bestSellerItem} />
        </Card>
      </div>
    </div>
  );
};

export default page;
