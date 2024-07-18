"use client";
import { useGetProduct } from "@/data/useGetProduct";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { PaginationController } from "./PaginationController";
import TableSkeleton from "../../../components/Skeleton/TableSkeleton";
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  User,
  Chip,
} from "@nextui-org/react";

import Toast from "../../../components/Toast";
import InformationSection from "./InformationSection";
import FilterTab from "./FilterTab";
import SelectedRowModal from "./SelectedRowModal";
import { getSearchParamsObject } from "@/utils/getObject";

const columns = [
  {
    key: 1,
    name: "Name",
  },
  {
    key: 2,
    name: "Code",
  },
  {
    key: 3,
    name: "Description",
  },
  {
    key: 4,
    name: "Category",
  },
  {
    key: 5,
    name: "Status",
  },
];

const TableData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchParam = getSearchParamsObject(searchParams);

  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(currentSearchParam);
  const filterParams = currentSearchParam;

  const { data, error, isLoading } = useGetProduct(filterParams);

  const onSelectedRow = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== "") {
      setFilters({ ...filters, [name]: value });
    } else {
      setFilters({ ...filters, [name]: null });
    }
  };

  const handleSelectChange = (event) => {
    if (event.target.value === "all") {
      setFilters({ ...filters, [event.target.name]: null });
    } else {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }
  };

  const handleFilterAction = () => {
    const filteredParam = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== null)
    );

    const dataPost = { ...filteredParam, page: 1 };

    router.push(`/product?${new URLSearchParams(dataPost)}`);
  };

  return (
    <>
      <div className="p-6 shadow-default sm:px-7.5 xl:pb-1">
        <InformationSection />
        <FilterTab
          filter={filters}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleFilterAction={handleFilterAction}
          disabled={error?.message || null}
        />
        <div className="max-w-full overflow-x-auto border border-black/20 rounded-2xl shadow-xl">
          <Table aria-label="Product table">
            <TableHeader>
              {columns.map((item) => (
                <TableColumn key={item?.key}>
                  <h5 className="font-bold text-black">{item.name}</h5>
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody
              emptyContent={
                !isLoading ? "No rows to display." : <TableSkeleton />
              }
            >
              {!error &&
                data?.value?.data.map((item) => (
                  <TableRow
                    className="hover:cursor-pointer hover:bg-gray-100"
                    key={item?.id}
                    onClick={() => onSelectedRow(item)}
                  >
                    <TableCell>
                      <User
                        name={item?.name}
                        description={`${item?.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}`}
                        avatarProps={{
                          src: item?.url,
                        }}
                      />
                    </TableCell>
                    <TableCell key={item?.id + "code"}>{item?.code}</TableCell>
                    <TableCell key={item?.id + "des"}>
                      {item?.description}
                    </TableCell>
                    <TableCell key={item?.id + "cateName"}>
                      {item["category-name"]}
                    </TableCell>
                    <TableCell key={item?.id + "status"}>
                      {item?.status ? (
                        <Chip color="success" className="text-white">
                          On Sales
                        </Chip>
                      ) : (
                        <Chip color="danger">Not Sales</Chip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <PaginationController
        totalContent={data?.value["total-count"]}
        pageSize={data?.value["page-size"]}
        filterParams={filterParams}
      />

      <SelectedRowModal
        isOpen={isOpen}
        onClose={onCloseModal}
        selectedRow={selectedRow}
        filterParam={filterParams}
      />

      {error && (
        <Toast open={error.message} message={"Fetch failed"} severity="error" />
      )}
    </>
  );
};

export default TableData;
