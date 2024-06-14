import TableData from "@/app/product/components/Table";
import { getProduct } from "@/server/productAction";
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
    queryFn: getProduct,
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
