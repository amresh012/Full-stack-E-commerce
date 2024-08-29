import React from "react";
import { CChart } from "@coreui/react-chartjs";

export const LineChart = () => {
  return (
    <CChart
      type="line"
      data={{
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "red",
            borderColor: "red",
            pointBackgroundColor: "red",
            pointBorderColor: "#fff",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
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

export const DoughnutChart = () => {
  return (
    <CChart
      type="doughnut"
      data={{
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
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
