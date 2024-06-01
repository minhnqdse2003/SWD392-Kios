import Table from "@/components/Table";
import { getTable } from "@/server/tableActions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["table"],
    queryFn: getTable,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Table />
    </HydrationBoundary>
  );
};

export default page;
