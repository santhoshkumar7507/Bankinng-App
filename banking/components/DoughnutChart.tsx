"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data = {
    datasets: [
      {
        label: "Balance",
        data: balances,
        backgroundColor: [
          "rgba(1, 121, 254, 0.85)",
          "rgba(108, 92, 231, 0.85)",
          "rgba(46, 144, 250, 0.85)",
          "rgba(0, 176, 155, 0.85)",
        ],
        borderColor: [
          "rgba(1, 121, 254, 1)",
          "rgba(108, 92, 231, 1)",
          "rgba(46, 144, 250, 1)",
          "rgba(0, 176, 155, 1)",
        ],
        borderWidth: 1.5,
        hoverBackgroundColor: [
          "rgba(1, 121, 254, 1)",
          "rgba(108, 92, 231, 1)",
          "rgba(46, 144, 250, 1)",
          "rgba(0, 176, 155, 1)",
        ],
        hoverBorderWidth: 2,
        hoverOffset: 6,
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "72%",
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: "easeInOutQuart",
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(8, 8, 16, 0.95)",
            titleColor: "#fff",
            bodyColor: "#94a3b8",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            cornerRadius: 12,
            padding: 12,
            callbacks: {
              label: (ctx) => ` $${ctx.parsed.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            },
          },
        },
      }}
    />
  );
};

export default DoughnutChart;