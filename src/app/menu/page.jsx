import TableData from "@/app/menu/components/TableData";
import { getMenu } from "@/server/menuAction";
import { authOptions } from "@/utils/authOptions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
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
