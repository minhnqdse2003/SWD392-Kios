import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const FilterTab = ({
  filters,
  handleChange,
  handleSelectChange,
  handleFilterAction,
  disabled,
}) => {
  const [name, setName] = useState(filters?.name);
  const [code, setCode] = useState(filters?.code);

  const onChange = (e) => {
    const { name: eventName, value: eventValue } = e.target;

    switch (eventName) {
      case "name":
        setName(eventValue);
        break;
      case "code":
        setCode(eventValue);
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
          key={"Search input"}
          placeholder="Search..."
          name="name"
          value={name || ""}
          onChange={onChange}
          startContent={<FaSearch />}
          disabled={!!disabled}
        />
        <Input
          className="w-3/5"
          label="Search By Code"
          key={"Search input"}
          placeholder="Search..."
          name="code"
          value={code || ""}
          onChange={onChange}
          startContent={<FaSearch />}
          disabled={!!disabled}
        />

        <Select
          name="isAscOrder"
          value={filters?.isAscOrder}
          label="Order by"
          onChange={handleSelectChange}
          disabled={!!disabled}
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="true">Ascending</SelectItem>
          <SelectItem key="false">Descending</SelectItem>
        </Select>

        <Select
          name="status"
          value={filters?.status}
          label="Status"
          onChange={handleSelectChange}
          disabled={!!disabled}
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="true">Active</SelectItem>
          <SelectItem key="false">Inactive</SelectItem>
        </Select>
        <Select
          name="category"
          value={filters?.category}
          label="Category"
          onChange={handleSelectChange}
          disabled={!!disabled}
          placeholder="Select a category..."
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="drink">Drink</SelectItem>
          <SelectItem key="food">Food</SelectItem>
        </Select>
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
