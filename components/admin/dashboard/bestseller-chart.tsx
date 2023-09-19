"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type dataPoints = {
  productId: string;
  productVariant: string;
  totalQuantity: number;
  name: string;
};

interface BestSellerChartProps {
  dataPoints: dataPoints[];
}
const BestSellerChart = ({ dataPoints }: BestSellerChartProps) => {
  const quantities = dataPoints.map((item) => item.totalQuantity);
  const namesWithFirstTwoWords = dataPoints.map((item) => {
    const words = item.name.split(" ");
    if (words.length >= 2) {
      // Remove hyphens from words
      const firstWord = words[0].replace("-", "");
      const secondWord = words[1].replace("-", "");

      return `${firstWord} ${secondWord} ${
        item.productVariant && "(" + item.productVariant + ")"
      }`;
    } else if (words.length === 1) {
      return words[0]; // Keep single word unchanged
    } else {
      return `${item.name} (${
        item.productVariant && "(" + item.productVariant + ")"
      }`; // Use the full name if it has fewer than one word
    }
  });

  return (
    <Card className="h-full shadow-lg p-5 rounded-xl grid justify-end w-fit ">
      <h2 className="text-primary text-2xl font-black text-center">
        Best Seller Product
      </h2>
      <Doughnut
        options={{
          plugins: {
            title: {
              text: "Best Selling Product",
              color: "blue",
              display: true,
            },
            subtitle: {
              display: true,
              color: "blue",
              text: "Top 10 Best Selling Products",
            },
          },
        }}
        data={{
          labels: namesWithFirstTwoWords,
          datasets: [
            {
              label: "Units Sold",
              data: quantities,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
      <Button variant={"outline"}>View More</Button>
    </Card>
  );
};
export default BestSellerChart;
