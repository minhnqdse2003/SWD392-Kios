"use client";
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
    key: "total-sale",
    label: "TOTAL SALE",
  },
  {
    key: "total-orders",
    label: "TOTAL ORDER",
  },
];

export default function DashBoardProductsTable({ products }) {
  const rows = products;

  return (
    <div>
      {products && (
        <Table
          aria-label="Example table with custom cells"
          removeWrapper="true"
        >
          <TableHeader>
            {columns.map((item) => (
              <TableColumn key={item?.key} align="start">
                {item?.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent="No product available">
            {rows.map((item) => (
              <TableRow key={item?.key}>
                <TableCell>
                  <User
                    name={item?.name}
                    description={`${item?.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })} VNĐ`}
                    avatarProps={{
                      src: item?.image,
                    }}
                  />
                </TableCell>
                <TableCell key={item?.key}>
                  {item?.["total-sales"].toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>

                <TableCell key={item?.key}>{item?.["total-orders"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
