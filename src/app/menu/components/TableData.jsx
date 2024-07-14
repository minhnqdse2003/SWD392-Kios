"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InformationSection from "./InformationSection";
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  User,
} from "@nextui-org/react";
import { useGetMenu } from "@/data/useGetMenu";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import Toast from "@/components/Toast";
import MenuTab from "./MenuTab";
import "./MenuTab.css"
import { getSearchParamsObject } from "@/utils/getObject";

const columns = [
  { key: "name", name: "Name" },
  { key: "price", name: "Price" },
  { key: "productId", name: "Product ID" },
  { key: "sessionType", name: "Type" },
];

const TableData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchParam = getSearchParamsObject(searchParams);

  const [filters, setFilters] = useState({ ...currentSearchParam, type: currentSearchParam.type || "Morning" });

  const { data, error, isLoading } = useGetMenu(filters);


  useEffect(() => {
    if (!currentSearchParam.type) {
      handleFilterAction({ type: "Morning" });
    }
  }, []);

  const flattenProducts = (data) => {
    if (!data || !data.value || !data.value.data) return [];
    return data.value.data.flatMap((session) =>
      session.products.map((product) => ({
        ...product,
        sessionType: session.type,
        "product-id": product["product-id"], // Đảm bảo key này tồn tại
      }))
    );
  };

  const products = flattenProducts(data);

  const onTypeChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterAction = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    const filteredParam = Object.fromEntries(
      Object.entries(updatedFilters).filter(([, value]) => value !== null)
    );

    router.push(`/menu?${new URLSearchParams(filteredParam)}`);
  };
  return (
    <>
      <div className="p-6 shadow-default sm:px-7.5 xl:pb-1">
        <InformationSection />
        <MenuTab
          filters={filters}
          onTypeChange={onTypeChange}
          handleFilterAction={handleFilterAction}
        />
        <div className="max-w-full overflow-x-auto border border-black/20 rounded-2xl shadow-xl">
          <Table aria-label="Product table">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>
                  <h5 className="font-bold text-black">{column.name}</h5>
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody
              emptyContent={
                !isLoading ? "No rows to display." : <TableSkeleton />
              }
            >
              {!error &&
                products.map((product, index) => (
                  <TableRow
                    className="hover:cursor-pointer hover:bg-gray-100"
                    key={`${product["product-id"]}-${index}`}
                    // onClick={() => onSelectedRow(item)}
                  >
                    <TableCell>
                      <User
                        name={product.name}
                        description={`${product.price} VNĐ`}
                        avatarProps={{
                          src: product.url,
                        }}
                      />
                    </TableCell>
                    <TableCell>{`${product.price} VNĐ`}</TableCell>
                    <TableCell>{product["product-id"]}</TableCell>
                    <TableCell>{product.sessionType}</TableCell>
                    {/* <TableCell key={item?.id + "code"}>{item?.code}</TableCell>
                    <TableCell key={item?.id + "des"}>
                      {item?.description}
                    </TableCell>
                    <TableCell key={item?.id + "cateName"}>
                      {item["category-name"]}
                    </TableCell>
                    <TableCell key={item?.id + "status"}>
                      {item?.status ? "Active" : "InActive"}
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {error && (
        <Toast open={error.message} message={"Fetch failed"} severity="error" />
      )}
    </>
  );
};

export default TableData;
