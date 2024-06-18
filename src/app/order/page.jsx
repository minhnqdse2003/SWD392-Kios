import { getOrder } from "@/server/orderAction";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React, { Suspense } from "react";
import InformationHeader from "./components/InformationHeader";
import FilterTab from "./components/FilterTab";
import TableData from "./components/TableData";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const queryClient = new QueryClient();

  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ["order"],
    queryFn: getOrder,
  });

  if (session && session?.user.role !== "Business") {
    redirect("/");
  }

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
