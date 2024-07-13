import { getOrderById } from "@/server/orderAction";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React, { Suspense } from "react";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DetailOrder from "../components/DetailOrder";
import InformationHeader from "../components/InformationHeader";

const page = async ({ params }) => {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  if (session && session?.user.role !== "Business") {
    redirect("/");
  }

  await queryClient.prefetchQuery({
    queryKey: ["order", params.id],
    queryFn: () => getOrderById(params.id),
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col p-6">
          <InformationHeader />
          <DetailOrder />
        </div>
      </HydrationBoundary>
    </Suspense>
  );
};

export default page;
