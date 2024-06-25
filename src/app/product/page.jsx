import TableData from "@/app/product/components/Table";
import { getProduct } from "@/server/productAction";
import { authOptions } from "@/utils/authOptions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["table"],
    queryFn: getProduct,
  });

  const session = await getServerSession(authOptions);

  if (session && session?.user.role !== "Business") {
    redirect("/403");
  }

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TableData />
      </HydrationBoundary>
    </Suspense>
  );
};

export default page;
