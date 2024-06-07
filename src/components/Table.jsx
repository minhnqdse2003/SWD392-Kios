"use client";
import { useGetTable } from "@/data/getTableData";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { PaginationController } from "./PaginationController";
import TableSkeleton from "./Skeleton/TableSkeleton";
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@nextui-org/react";
import SelectedRowModal from "@/app/home/SelectedRowModal";
import FilterTab from "@/app/home/FilterTab";
import Toast from "./Toast";

const TableData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: searchParams.get("page") || 1,
    name: searchParams.get("name") || null,
    price: searchParams.get("price") || "all",
    status: searchParams.get("status") || "all",
    category: searchParams.get("category") || "all",
  });

  const filterParams = {
    page: searchParams.get("page") || 1,
    name: searchParams.get("name") || null,
    price: searchParams.get("price") || "all",
    status: searchParams.get("status") || "all",
    category: searchParams.get("category") || "all",
  };

  const { data, error, isLoading } = useGetTable(filterParams);

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
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (event) => {
    console.log(event);
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleFilterAction = () => {
    const dataPost = { ...filters, page: 1 };

    router.push(`/home?${new URLSearchParams(dataPost)}`);
  };

  return (
    <>
      <div className="px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <div className="text-2xl font-bold p-4">Product</div>
        <FilterTab
          filter={filters}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleFilterAction={handleFilterAction}
          disabled={error?.message || null}
        />
        <div className="max-w-full overflow-x-auto border border-black/20 rounded-2xl shadow-xl">
          <Table>
            <TableHeader>
              <TableColumn isHeader>
                <h5 className="text-left font-bold text-black xl:pl-11">
                  Package
                </h5>
              </TableColumn>
              <TableColumn isHeader>
                <h5 className="text-left font-bold text-black ">
                  Invoice date
                </h5>
              </TableColumn>
              <TableColumn isHeader>
                <h5 className="text-left font-bold text-black ">Status</h5>
              </TableColumn>
            </TableHeader>
            <TableBody>
              {!error &&
                data?.map((item, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-black hover:bg-opacity-10"
                    onClick={() => onSelectedRow(item)}
                  >
                    <TableCell>
                      <div className="pl-9 xl:pl-11">
                        <h5 className="font-medium text-black ">
                          {index + 1}. {item.package}
                        </h5>
                        <p className="text-sm">$0.00</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-black ">{item.invoiceDate}</p>
                    </TableCell>
                    <TableCell>
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                        {item.status}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {isLoading && <TableSkeleton />}
        </div>
      </div>

      <PaginationController
        totalContent={1}
        pageSize={5}
        filterParams={filterParams}
      />

      <SelectedRowModal
        isOpen={isOpen}
        onClose={onCloseModal}
        selectedRow={selectedRow}
      />
      {error && (
        <Toast open={error.message} message={error.message} severity="error" />
      )}
    </>
  );
};

export default TableData;
