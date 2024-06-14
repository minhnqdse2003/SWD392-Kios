import OverviewChart from "@/app/components/OverviewChart";
import PopularCategoryChart from "@/app/components/PopularCategoryChart";
import React from "react";

const DashBoardChartReported = () => {
  return (
    <div className="flex flex-row w-full gap-8">
      <OverviewChart />
      <PopularCategoryChart />
    </div>
  );
};

export default DashBoardChartReported;
