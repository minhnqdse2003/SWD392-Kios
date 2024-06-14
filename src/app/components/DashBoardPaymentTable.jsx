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

const rows = [
  {
    key: "1",
    name: "21359",
    imageSrc: "https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg",
    price: "24/12/2024 12:00 PM",
    total: 6000000,
  },
  {
    key: "2",
    name: "21359",
    imageSrc: "https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg",
    price: "24/12/2024 12:00 PM",
    total: 6000000,
  },
  {
    key: "3",
    name: "21359",
    imageSrc: "https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg",
    price: "24/12/2024 12:00 PM",
    total: 6000000,
  },
  {
    key: "4",
    name: "21359",
    imageSrc: "https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg",
    price: "24/12/2024 12:00 PM",
    total: 6000000,
  },
  {
    key: "5",
    name: "21359",
    imageSrc: "https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg",
    price: "24/12/2024 12:00 PM",
    total: 6000000,
  },
];

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
  return (
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
                description={`${item?.price} VNĐ`}
                avatarProps={{
                  src: item?.imageSrc,
                }}
              />
            </TableCell>
            <TableCell key={item?.key}>{item?.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
