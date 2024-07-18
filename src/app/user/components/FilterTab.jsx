"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { set } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const FilterTab = ({ filters, handleFilterAction, handleChange, disabled }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");

  const onChange = (e) => {
    const { name: eventName, value: eventValue } = e.target;

    switch (eventName) {
      case "name":
        setName(eventValue);
        break;
      case "email":
        setEmail(eventValue);
        break;
      case "bankName":
        setBankName(eventValue);
        break;
      default:
        console.warn(`Unexpected input name: ${name}`);
    }
    handleChange(e);
  };
  return (
    <div>
      <div className="flex px-4 py-2 bg-gray-50 justify-between items-center gap-4">
        <Input
          className="w-3/5"
          label="Search By Name"
          key={"Search input user"}
          placeholder="Search..."
          name="name"
          value={name || ""}
          onChange={onChange}
          startContent={<FaSearch />}
          disabled={!!disabled}
        />
        <Input
          className="w-3/5"
          label="Search By Email"
          key={"Search input user"}
          placeholder="Search..."
          name="email"
          value={email || ""}
          onChange={onChange}
          startContent={<FaSearch />}
          disabled={!!disabled}
        />
        <Input
          className="w-3/5"
          label="Search By Bank Name"
          key={"Search input user"}
          placeholder="Search..."
          name="bankName"
          value={bankName || ""}
          onChange={onChange}
          startContent={<FaSearch />}
          disabled={!!disabled}
        />
        <Button
          onClick={handleFilterAction}
          auto
          className="bg-btn text-white"
          css={{ marginLeft: "auto" }}
          disabled={!!disabled}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterTab;
