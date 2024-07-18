"use client";
import { useGetOrder } from "@/data/useOrderData";
import { displayTime } from "@/utils/displayUtils";
import {
  Table,
  TableBody,
  TableColumn,
  TableCell,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import React from "react";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "price",
    label: "PRICE",
  },
];

export default function DashBoardPaymentTable() {
  const { data, isLoading, error } = useGetOrder(1);

  const orders = () => {
    let orderList = [];

    if (data) {
      for (const order of data.value.data) {
        const { id, code, "ngay-tao": price, total } = order;

        orderList = [
          ...orderList,
          {
            key: id,
            name: code,
            price,
            total,
          },
        ];
      }
    }

    return orderList;
  };

  const rows = orders();

  return (
    <div>
      {!isLoading ? (
        <Table
          aria-label="Example table with custom cells"
          removeWrapper="true"
          hideHeader
        >
          <TableHeader>
            {columns.map((item) => (
              <TableColumn key={item?.key} align="start">
                {item?.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((item) => (
              <TableRow key={item?.key}>
                <TableCell>
                  <User
                    name={item?.name}
                    description={`${displayTime(item?.price)}`}
                  />
                </TableCell>
                <TableCell key={item?.key}>
                  {item?.total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
