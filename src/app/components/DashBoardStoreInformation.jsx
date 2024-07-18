"use client";

import { Chip } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa6";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import DashBoardProductsTable from "@/app/components/DashBoardProductsTable";
import DashBoardPaymentTable from "@/app/components/DashBoardPaymentTable";
import DashBoardChartReported from "./DashBoardChartReported";
import { useGetBusinessDashBoard } from "@/data/useGetUser";

const DashBoardStoreInformation = () => {
  const { data, isLoading, error } = useGetBusinessDashBoard();

  return (
    <div>
      {data ? (
        <div className="mb-4">
          <div className="flex flex-row items-center gap-[4em] mb-4">
            <div className="flex gap-11 flex-col w-1/5">
              <div className="flex flex-row justify-between p-4 bg-white w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] border rounded-lg">
                <div className="bg-slate-100 p-3.5 items-center h-full border rounded-md">
                  <FaUsers color="#7f5af0" className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <p className="text-small">Staff</p>
                  <p className="text-xl font-bold">6</p>
                </div>
              </div>

              <div className="flex flex-row p-4 border rounded-lg bg-white w-full justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="bg-slate-100 p-3.5 items-center h-full border rounded-md">
                  <FaDoorOpen color="#7f5af0" className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <p className="text-small">Opening Time</p>
                  <p className="text-xl font-bold">8:00 AM</p>
                </div>
              </div>

              <div className="flex flex-row p-4 justify-between bg-white w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] border rounded-lg">
                <div className="bg-slate-100 p-3.5 items-center h-full border rounded-md">
                  <BsFillDoorClosedFill
                    color="#7f5af0"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <p className="text-small">Closing Time</p>
                  <p className="text-xl font-bold">6:00 PM</p>
                </div>
              </div>
            </div>
            <DashBoardChartReported
              daily={data?.value["daily-sales"]}
              popular={data?.value["popular-category-sales"]}
            />
          </div>

          <div className="flex flex-row gap-4 mb-4  bg-white p-4 border rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <Image
              src={
                "https://lh3.googleusercontent.com/p/AF1QipM1BA3zI2zYTVJ-QNudJtT3bpJ9Y9TSEGzPBeSQ=s680-w680-h510"
              }
              alt="Store Image"
              width={300}
              height={300}
              className="border rounded-md"
            />
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-start">
                <p>Store Name</p>
                <Chip color="success" className="text-white">
                  Open
                </Chip>
              </div>
              <div className="flex flex-row gap-2">
                <p>
                  Location: <strong>G Floor</strong>
                </p>
                <p>
                  Mail: <strong>example@gmai.com</strong>
                </p>
                <p>
                  Phone: <strong>0918722083</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 w-full">
            <div className="w-1/2 flex flex-col gap-4 border rounded-lg bg-white p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-lg font-bold">Products</p>
                <span className="flex flex-row gap-1 items-center text-black/50">
                  <p className="text-medium">Top Sale</p>
                  <MdKeyboardDoubleArrowDown />
                </span>
              </div>
              <DashBoardProductsTable products={data?.value["product-sales"]} />
            </div>
            <div className="w-1/2 flex flex-col gap-4 border rounded-lg bg-white p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <span className="text-lg font-bold">Recent Transactions</span>
              <DashBoardPaymentTable />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DashBoardStoreInformation;
