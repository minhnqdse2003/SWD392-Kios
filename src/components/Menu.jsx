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
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import SelectedRowModal from "@/app/home/SelectedRowModal";
import Toast from "./Toast";
import "./Menu.css";
const MenuData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("mor");

  const handleButtonClick = (time) => {
    setSelectedButton(time);
    setFilters({ ...filters, time, page: 1 });

    const dataPost = { ...filters, time, page: 1 };
    router.push(`/home?${new URLSearchParams(dataPost)}`);
  };

  const [filters, setFilters] = useState({
    page: searchParams.get("page") || 1,
    name: searchParams.get("name") || null,
    price: searchParams.get("price") || "all",
    status: searchParams.get("status") || "all",
    category: searchParams.get("category") || "all",
    time: searchParams.get("time") || "mor",
  });

  const filterParams = {
    page: searchParams.get("page") || 1,
    name: searchParams.get("name") || null,
    price: searchParams.get("price") || "all",
    status: searchParams.get("status") || "all",
    category: searchParams.get("category") || "all",
    time: searchParams.get("time") || "mor",
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

  return (
    <>
      <div className="px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <div className="text-2xl font-bold p-4">Food Menu</div>
        <div className="max-w-full flex justify-between items-center pb-2.5">
          <ButtonGroup size="lg" fullWidth="true">
            <Button
              className={`w-3/5 menu-btn ${
                selectedButton === "mor" ? "selected" : ""
              }`}
              onClick={() => handleButtonClick("mor")}
            >
              <div>
                <p className="text-sm">Sáng</p>
                <p className="text-sm">(6:00 AM - 11:00 AM)</p>
              </div>
            </Button>
            <Button
              className={`w-3/5 menu-btn ${
                selectedButton === "noon" ? "selected" : ""
              }`}
              onClick={() => handleButtonClick("noon")}
            >
              <div>
                <p className="text-sm">Trưa</p>
                <p className="text-sm">(11:00 AM - 2:00 PM)</p>
              </div>
            </Button>
            <Button
              className={`w-3/5 menu-btn ${
                selectedButton === "night" ? "selected" : ""
              }`}
              onClick={() => handleButtonClick("night")}
            >
              <div>
                <p className="text-sm">Tối</p>
                <p className="text-sm">(2:00 PM - 6:00 AM)</p>
              </div>
            </Button>
          </ButtonGroup>
        </div>

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

export default MenuData;

// const StyledButton = styled(Button)`
//   width: 100%;
// `;
