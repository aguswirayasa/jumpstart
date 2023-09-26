import BestSellerChart from "@/components/admin/dashboard/bestseller-chart";
import SellsChart from "@/components/admin/dashboard/sells-chart";
import { Card } from "@/components/ui/card";
import { getBestSellerItem, getSales, getStatistics } from "@/lib/server-utils";
import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { BsFillCartFill } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";

const AdminDashboard = async () => {
  const sales = await getSales();
  const statistics = await getStatistics();
  const labels = sales.map((sale) => sale.createdAt.toISOString().slice(0, 7)); // Format the date as "YYYY-MM"
  const dataPoints = sales.map((sale) => sale.amount);
  const bestSellerItem = await getBestSellerItem();

  return (
    <div className="m-3 md:m-10 space-y-3">
      <h1 className="font-black text-primary text-3xl">Dashboard</h1>
      <div className="grid grid-cols-4  gap-5">
        <Card className="bg-primary gap-x-3 col-span-2 md:col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-lg md:text-xl">
              <FaDollarSign />
            </span>
          </div>
          <div className="col-span-2">
            <h1 className="text-lg md:text-xl font-bold text-white">
              Total Sales
            </h1>
            <p className="text-sm text-white">
              ${statistics.totalSales.toLocaleString("en-US")}
            </p>
          </div>
        </Card>
        <Card className="bg-primary gap-x-3 col-span-2 md:col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-lg md:text-xl">
              <BsFillCartFill />
            </span>
          </div>
          <div className="col-span-2">
            <h2 className="text-lg md:text-xl font-bold text-white">
              Orders Completed
            </h2>
            <p className="text-sm text-white">
              {statistics.totalCompleteOrders}
            </p>
          </div>
        </Card>

        <Card className="bg-primary gap-x-3 col-span-2 md:col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-lg md:text-xl">
              <MdPendingActions />
            </span>
          </div>
          <div className="col-span-2">
            <h2 className="text-lg md:text-xl font-bold text-white">
              Orders Pending
            </h2>
            <p className="text-sm text-white">
              {statistics.totalPendingOrders}
            </p>
          </div>
        </Card>
        <Card className="bg-primary gap-x-3 col-span-2 md:col-span-1 grid grid-cols-3 p-5">
          <div className="col-span-1 flex items-center justify-center">
            <span className="bg-yellow-400 text-primary rounded-full p-5 text-lg md:text-xl">
              <IoBagHandle />
            </span>
          </div>
          <div className="col-span-2">
            <h2 className="text-lg md:text-xl font-bold text-white">
              Total Products
            </h2>
            <p className="text-sm text-white">{statistics.totalProducts}</p>
          </div>
        </Card>
      </div>
      <div className="flex justify-between gap-3  flex-wrap md:flex-nowrap">
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

export default AdminDashboard;
