import OverviewChart from "@/app/components/OverviewChart";
import PopularCategoryChart from "@/app/components/PopularCategoryChart";
import React from "react";

const DashBoardChartReported = ({ daily, popular }) => {
  return (
    <div className="flex flex-row w-full gap-8">
      <OverviewChart daily={daily} />
      <PopularCategoryChart popular={popular} />
    </div>
  );
};

export default DashBoardChartReported;
