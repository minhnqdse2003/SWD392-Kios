"use client";
import { useGetTable } from "@/data/getTableData";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { PaginationController } from "./PaginationController";
import TableSkeleton from "./Skeleton/TableSkeleton";

const Table = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const searchParams = useSearchParams();

  const filterParams = {
    page: searchParams.get("page") || 1,
    filteredBy: searchParams.get("filteredBy") || "username",
    ascOrder: searchParams.get("ascOrder") || "true",
  };

  const onSelectedRow = (row) => {
    setSelectedRow(row);
  };

  const { data, error, isLoading } = useGetTable(filterParams);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-black rounded-xl bg-opacity-20">
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black  xl:pl-11">
                      Package
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black ">
                      Invoice date
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black ">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      className="hover:cursor-pointer hover:bg-black hover:bg-opacity-10"
                      key={index}
                      onClick={() => onSelectedRow(item)}
                    >
                      <td className="border-b border-[#eee] px-4 py-5 pl-9  xl:pl-11">
                        <h5 className="font-medium text-black ">
                          {index + " " + item.package}
                        </h5>
                        <p className="text-sm">$0.00</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 ">
                        <p className="text-black ">{item.invoiceDate}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 ">
                        <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                          {item.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <PaginationController
            totalContent={20}
            pageSize={5}
            filterParams={filterParams}
          />
        </>
      )}
      {selectedRow && (
        <div>
          <span>{selectedRow.package}</span>
          <span>{selectedRow.invoiceDate}</span>
          <span>{selectedRow.status}</span>
        </div>
      )}
    </>
  );
};

export default Table;
