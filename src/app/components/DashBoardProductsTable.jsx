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
    name: "Milk Tea",
    imageSrc:
      "https://coffeeaffection.com/wp-content/uploads/2022/07/iced-chocolate-milk-tea-on-the-table_Rachata-Teyparsit_Shutterstock.jpg",
    price: 100000,
    total: 6000000,
    totalOrder: 100,
  },
  {
    key: "2",
    name: "Coffee",
    imageSrc:
      "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee-500x375.png",
    price: 80000,
    total: 400000,
    totalOrder: 5,
  },
  {
    key: "3",
    name: "Boba",
    imageSrc:
      "https://thissillygirlskitchen.com/wp-content/uploads/2022/12/BOBA-TEA-RECIPE-31-500x500.jpg",
    price: 50000,
    total: 250000,
    totalOrder: 5,
  },
  {
    key: "4",
    name: "Sandwich",
    imageSrc:
      "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
    price: 40000,
    total: 160000,
    totalOrder: 4,
  },
  {
    key: "5",
    name: "Salad",
    imageSrc:
      "https://www.eatingwell.com/thmb/lI3yRRJ0xLduIxNQoAFehyyY7os=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/romaine-salad-with-orange-and-radish-43311e8909b444aba0d356d951262384.jpg",
    price: 30000,
    total: 120000,
    totalOrder: 4,
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "totalSale",
    label: "TOTAL SALE",
  },
  {
    key: "totalOrder",
    label: "TOTAL ORDER",
  },
];

export default function DashBoardProductsTable() {
  return (
    <Table aria-label="Example table with custom cells" removeWrapper="true">
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
                description={`${item?.price} VNĐ`}
                avatarProps={{
                  src: item?.imageSrc,
                }}
              />
            </TableCell>
            <TableCell key={item?.key}>{item?.total}</TableCell>

            <TableCell key={item?.key}>{item?.totalOrder}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
