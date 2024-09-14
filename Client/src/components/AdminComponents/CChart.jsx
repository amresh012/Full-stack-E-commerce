import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";

export const LineChart = ({label, labels, data}) => {
 const [ChartColors , setChartColors] = useState([])
 console.log(ChartColors)
  useEffect(()=>{
    function generateRandomHexColorsArray(numColors) {
      const colorsArray = [];
    
      for (let i = 0; i < numColors; i++) {
        // Generate random color
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        
        // Ensure it is 6 characters by padding with 0s if needed
        let hexColor = "#" + randomColor.padStart(6, '0');
        
        colorsArray.push(hexColor);
      }
      return colorsArray;
    }
    setChartColors( generateRandomHexColorsArray(50))
  },[])

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

export const DoughnutChart = ({labels, data, ChartColors}) => {
  return (
    <CChart
      type="doughnut"
      data={{
        labels: labels,
        datasets: [
          {
            backgroundColor:ChartColors,
            data: data,
          },
        ],
        // datasets: [
        //   {
        //     backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#ea73ff", "#ff7600", "#8263ff", "#e0e329"],
        //     data: data,
        //   },
        // ],
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
