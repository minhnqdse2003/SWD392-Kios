import { getBusiness } from "@/server/userAction";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React, { Suspense } from "react";
import InformationHeader from "./components/InformationHeader";
import FilterTab from "./components/FilterTab";
import TableData from "./components/TableData";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["business"],
    queryFn: getBusiness,
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col p-6">
          <InformationHeader />
          <FilterTab />
          <TableData />
        </div>
      </HydrationBoundary>
    </Suspense>
  );
};

export default page;
