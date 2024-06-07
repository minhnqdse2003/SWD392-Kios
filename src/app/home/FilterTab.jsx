import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";

const FilterTab = ({
  filters,
  handleChange,
  handleSelectChange,
  handleFilterAction,
  disabled,
}) => {
  const [name,setName] = useState(filters?.name);

  const onChange = (e) => {
    handleChange(e);
    setName(e.target.value);
  }

  return (
    <div>
      <div className="flex px-4 py-2 bg-gray-50 justify-between items-center gap-4">
        <Input
          className="w-3/5"
          label="Search"
          placeholder="Enter Search Content"
          name="name"
          value={name || ""}
          onChange={onChange}
          startContent={<FaSearch />}
          disabled={!!disabled}
        />

        <Select
          name="price"
          value={filters?.price}
          label="Price"
          onChange={handleSelectChange}
          disabled={!!disabled}
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="asd">Price ASD</SelectItem>
          <SelectItem key="des">Price DES</SelectItem>
        </Select>

        <Select
          name="status"
          value={filters?.status}
          label="Status"
          onChange={handleSelectChange}
          disabled={!!disabled}
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="active">Active</SelectItem>
          <SelectItem key="inactive">Inactive</SelectItem>
        </Select>
        <Select
          name="category"
          value={filters?.category}
          label="Category"
          onChange={handleSelectChange}
          disabled={!!disabled}
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
