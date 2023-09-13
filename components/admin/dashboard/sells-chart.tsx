// components/MyLineChart.tsx
"use client";
import { Card } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

// components/MyLineChart.tsx
// ...
ChartJS.register(CategoryScale /* ... */);
// ...

interface SellsChartProps {
  labels: string[];
  dataPoints: number[];
}
const SellsChart = ({ labels, dataPoints }: SellsChartProps) => {
  return (
    <Card className="max-w-4xl shadow-lg p-5 rounded-xl ">
      <h2 className="text-primary text-2xl font-black text-center">
        Sales Chart
      </h2>
      <Line
        options={{
          layout: {
            autoPadding: true,
          },
          plugins: {
            title: {
              display: true,
              font: {
                weight: "bold",
                size: 30,
              },
              color: "black",
              text: "Sales Chart",
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              data: dataPoints,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              cubicInterpolationMode: "monotone",
              label: "2023",
            },
          ],
        }}
      />
    </Card>
  );
};
export default SellsChart;
