import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import TableData from "@/components/Table";
import { getTable } from "@/server/tableActions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React, { Suspense } from "react";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["table"],
    queryFn: getTable,
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TableData />
      </HydrationBoundary>
    </Suspense>
  );
};

export default page;
