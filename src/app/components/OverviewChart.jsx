"use client";
import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const colorMap = {
  Sáng: "#14B8A6",
  Trưa: "#FACC15",
  Chiều: "#3B82F6",
};

const OverviewChart = ({ daily }) => {
  const sizing = {
    width: 350,
    height: 300,
    legend: {
      direction: "row",
      position: { vertical: "top", horizontal: "middle" },
      padding: 0,
    },
    margin: { top: 50, bottom: 30, left: 30, right: 30 },
  };

  const TOTAL = daily.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
  return (
    <div>
      {daily && (
        <div className="w-fit items-center border rounded-lg bg-white p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <span className="text-lg font-bold">Daily Overview</span>
          <PieChart
            series={[
              {
                data: daily,
                arcLabel: getArcLabel,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
                fontWeight: "bold",
              },
            }}
            {...sizing}
          />
        </div>
      )}
    </div>
  );
};

export default OverviewChart;
