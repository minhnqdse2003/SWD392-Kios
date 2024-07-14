import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import "./MenuTab.css";

const MenuTab = ({ filters, onTypeChange, handleFilterAction }) => {
  const [selectedButton, setSelectedButton] = useState(filters?.type || "Morning");

  useEffect(() => {
    // Khi component mount, tự động chọn "Morning" nếu chưa có type được chọn
    if (!filters?.type) {
      handleButtonClick("Morning");
    }
  }, []);

  const handleButtonClick = (type) => {
    setSelectedButton(type);
    onTypeChange({ target: { name: "type", value: type } });
    handleFilterAction({ type });
  };

  return (
    <div className="max-w-full flex justify-between items-center pb-2.5">
      <ButtonGroup size="lg" fullWidth="true">
        <Button
          className={`w-3/5 menu-btn ${selectedButton === "Morning" ? "selected" : ""}`}
          onClick={() => handleButtonClick("Morning")}
        >
          <div>
            <p className="text-sm">Sáng</p>
            <p className="text-sm">(6:00 AM - 11:00 AM)</p>
          </div>
        </Button>
        <Button
          className={`w-3/5 menu-btn ${selectedButton === "Afternoon" ? "selected" : ""}`}
          onClick={() => handleButtonClick("Afternoon")}
        >
          <div>
            <p className="text-sm">Trưa</p>
            <p className="text-sm">(11:00 AM - 2:00 PM)</p>
          </div>
        </Button>
        <Button
          className={`w-3/5 menu-btn ${selectedButton === "Evening" ? "selected" : ""}`}
          onClick={() => handleButtonClick("Evening")}
        >
          <div>
            <p className="text-sm">Tối</p>
            <p className="text-sm">(2:00 PM - 6:00 AM)</p>
          </div>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MenuTab;