'use client'

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
          "rgba(1, 121, 254, 0.9)",
          "rgba(108, 92, 231, 0.9)",
          "rgba(0, 212, 255, 0.85)",
          "rgba(0, 245, 160, 0.85)",
          "rgba(255, 118, 74, 0.85)",
        ],
        borderColor: [
          "rgba(1, 121, 254, 1)",
          "rgba(108, 92, 231, 1)",
          "rgba(0, 212, 255, 1)",
          "rgba(0, 245, 160, 1)",
          "rgba(255, 118, 74, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(1, 121, 254, 1)",
          "rgba(108, 92, 231, 1)",
          "rgba(0, 212, 255, 1)",
          "rgba(0, 245, 160, 1)",
          "rgba(255, 118, 74, 1)",
        ],
        hoverBorderWidth: 3,
        hoverOffset: 8,
        borderRadius: 4,
        spacing: 2,
      },
    ],
    labels: accountNames,
  };

  return (
    <div className="animate-chart">
      <Doughnut
        data={data}
        options={{
          cutout: "74%",
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1200,
            easing: "easeInOutQuart",
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(5, 7, 18, 0.97)",
              titleColor: "#fff",
              bodyColor: "#94a3b8",
              borderColor: "rgba(1,121,254,0.3)",
              borderWidth: 1,
              cornerRadius: 14,
              padding: 14,
              boxPadding: 6,
              callbacks: {
                label: (ctx) =>
                  `  $${ctx.parsed.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                title: (items) => ` ${items[0].label}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;