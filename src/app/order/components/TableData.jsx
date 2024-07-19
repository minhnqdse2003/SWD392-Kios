"use client";

import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import Toast from "@/components/Toast";
import { useGetOrder, usePostOrderStatus } from "@/data/useOrderData";
import { calculateTimePassed } from "@/utils/displayUtils";
import { getSearchParamsObject } from "@/utils/getObject";
import {
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PaginationController } from "./PaginationController";

const cols = [
  { key: 1, name: "Location" },
  { key: 2, name: "Total" },
  { key: 3, name: "Note" },
  { key: 4, name: "Status" },
  { key: 5, name: "Order Time" },
];
const selectionOption = [
  { key: "OnPreparing", label: "On Preparing" },
  { key: "Prepared", label: "Prepared" },
  { key: "OnDelivering", label: "On Delivering" },
  { key: "Delivered", label: "Delivered" },
];

const TableData = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const currentSearchParam = getSearchParamsObject(searchParam);
  const page = currentSearchParam.page || 1;

  const { data, error, isLoading } = useGetOrder({ page });
  const {
    mutate: mutateOrderStatus,
    error: mutateOrderStatusError,
    isSuccess: mutateOrderStatusSucess,
  } = usePostOrderStatus(currentSearchParam);

  const onSelectedRow = (item) => {
    if (item) router.push(`/order/${item?.id}`);
  };

  const handleStatusChange = (item, e) => {
    const requestedData = {
      id: item.id,
      status: e.target.value,
    };

    mutateOrderStatus(requestedData);
  };

  return (
    <div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          {cols.map((item) => (
            <TableColumn isHeader key={item.key}>
              <h5 className="font-bold text-black ">{item.name}</h5>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading ? "No rows to display." : <TableSkeleton />}
        >
          {data &&
            data?.value?.data.map((item) => (
              <TableRow
                className="hover:cursor-pointer"
                key={item?.id}
                onClick={() => onSelectedRow(item)}
              >
                <TableCell key={item?.id + cols[0].name}>
                  {item?.location}
                </TableCell>
                <TableCell key={item?.id + cols[1].name}>
                  {item?.total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>

                <TableCell key={item?.id + cols[2].name}>
                  {item?.note?.trim() !== "" ? item.note : "Note: (Empty)"}
                </TableCell>
                <TableCell>
                  <Select
                    value={item?.status}
                    onChange={(e) => handleStatusChange(item, e)}
                    key={item?.id + cols[3].name}
                    className="max-w-xs"
                    placeholder={item?.status}
                  >
                    {selectionOption.map((animal) => (
                      <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                  </Select>
                </TableCell>

                <TableCell key={item?.id + cols[4].name}>
                  {item && calculateTimePassed(new Date(item["ngay-tao"]))}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {data && data.value && (
        <PaginationController
          totalContent={data.value["total-count"] || 0}
          pageSize={data.value["page-size"] || 10}
          filterParams={currentSearchParam}
        />
      )}

      {error?.message && (
        <Toast message={error.message} open={true} severity={"error"} />
      )}

      {mutateOrderStatusError && (
        <Toast
          message={mutateOrderStatusError.message}
          open={true}
          severity={"error"}
        />
      )}

      {mutateOrderStatusSucess && (
        <Toast
          message={"Update status successfully"}
          open={true}
          severity={"success"}
        />
      )}
    </div>
  );
};

export default TableData;
