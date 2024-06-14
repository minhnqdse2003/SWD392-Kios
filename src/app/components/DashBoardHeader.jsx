"use client";
import { useSession } from "next-auth/react";
import React from "react";

const DashBoardHeader = () => {
  const { data: session } = useSession();
  return (
    <div className="text-2xl font-bold">
      {session?.user?.name && `Dashboard, Welcome ${session?.user?.name} !`}
    </div>
  );
};

export default DashBoardHeader;
