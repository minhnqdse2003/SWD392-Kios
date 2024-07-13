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
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["business"],
    queryFn: getBusiness,
  });

  const session = await getServerSession(authOptions);

  if (session && session?.user.role !== "Manager") {
    redirect("/403");
  }

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col p-6">
          <InformationHeader />
          {/* <FilterTab /> */}
          <TableData />
        </div>
      </HydrationBoundary>
    </Suspense>
  );
};

export default page;
