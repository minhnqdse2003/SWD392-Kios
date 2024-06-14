import {
    Table,
    TableColumn,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
    Button,
    ButtonGroup,
  } from "@nextui-org/react";import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import "./MenuTab.css";

const MenuTab = ({ onTimeChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedButton, setSelectedButton] = useState("mor");

  const handleButtonClick = (time) => {
    setSelectedButton(time);
    onTimeChange(time);
  };
  return (
    <>
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
    </>
  );
};

export default MenuTab;
