import React from "react";
import { CChart } from "@coreui/react-chartjs";

export const LineChart = ({label, labels, data}) => {
  return (
    <CChart
      type="line"
      data={{
        labels: labels,
        datasets: [
          {
            label: label,
            backgroundColor: "#41B883",
            borderColor: "#41B883",
            pointBackgroundColor: "#41B883",
            pointBorderColor: "#fff",
            data: data,
          },
          //   {
          //     label: "My Second dataset",
          //     backgroundColor: "rgba(151, 187, 205, 0.2)",
          //     borderColor: "rgba(151, 187, 205, 1)",
          //     pointBackgroundColor: "rgba(151, 187, 205, 1)",
          //     pointBorderColor: "#fff",
          //     data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
          //   },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              color: "rgb(10 36 64)",
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgb(10 36 64)",
            },
            ticks: {
              color: "red",
            },
          },
          y: {
            grid: {
              color: "rgb(10 36 64)",
            },
            ticks: {
              color: "red",
            },
          },
        },
      }}
    />
  );
};

export const DoughnutChart = ({labels, data}) => {
  return (
    <CChart
      type="doughnut"
      data={{
        labels: labels,
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#ea73ff", "#ff7600", "#8263ff", "#e0e329"],
            data: data,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              color: "#0a2440",
            },
          },
        },
      }}
    />
  );
};
