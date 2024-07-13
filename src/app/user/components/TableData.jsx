"use client";

import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import Toast from "@/components/Toast";
import {
  useDeleteBusiness,
  useGetBusiness,
  useUpdateBusiness,
} from "@/data/useGetUser";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Input,
} from "@nextui-org/react";
import React, { use, useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import FilterTab from "./FilterTab";
import { useRouter, useSearchParams } from "next/navigation";
import { getSearchParamsObject, objectToFormData } from "@/utils/getObject";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdDelete, MdEdit, MdOutlineDescription } from "react-icons/md";
import { BiSolidDollarCircle } from "react-icons/bi";

const cols = [
  { key: 1, name: "Name" },
  { key: 4, name: "Bank Account Number" },
  { key: 5, name: "Bank Account Name" },
  { key: 6, name: "Bank Name" },
];

const TableData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchParam = getSearchParamsObject(searchParams);
  const [filters, setFilters] = useState(currentSearchParam);
  const filterParams = currentSearchParam;
  const { data, error, isLoading } = useGetBusiness(filterParams);
  const [selectedRow, setSelectedRow] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isIncludeImage, setIsIncludeImage] = useState({
    message: null,
    isImport: false,
  });

  const [initialFormValue, setInitialFormValue] = useState({
    name: null,
    bankAccountName: null,
    bankAccountNumber: null,
    bankName: null,
    image: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    "image-file": null,
    "bank-account-name": "",
    "bank-account-number": "",
    "bank-name": "",
  });

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        name: selectedRow.name || "",
        "image-file": null,
        "bank-account-name": selectedRow["bank-account-name"] || "",
        "bank-account-number": selectedRow["bank-account-number"] || "",
        "bank-name": selectedRow["bank-name"] || "",
      });
      setPreviewUrl(selectedRow.url || "");
    }
  }, [selectedRow]);

  const onClose = useCallback(() => {
    setInitialFormValue({
      name: null,
      bankAccountName: null,
      bankAccountNumber: null,
      bankName: null,
      image: null,
    });
    setPreviewUrl(null);
    setSelectedRow(null);
    setIsDisabled(true);
  }, []);

  const { mutate: deleteBusiness } = useDeleteBusiness(onClose, filterParams);
  const { mutate: updateBusiness } = useUpdateBusiness(onClose, filterParams);

  const [isDisabled, setIsDisabled] = useState(true);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handleDelete = () => {
    if (selectedRow?.id) {
      console.log("Delete business", selectedRow.id);
      deleteBusiness(selectedRow.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      alert("Invalid image format. Please select a JPEG, PNG, or GIF image.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      "image-file": selectedFile,
    }));
    setIsIncludeImage({ isImport: true, message: null });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpdate = () => {
    if (selectedRow?.id) {
      const formObject = {
        id: selectedRow.id,
        ...formData,
      };

      const formDataObj = new FormData();

      Object.keys(formObject).forEach((key) => {
        if (key === "image-file" && formObject[key]) {
          formDataObj.append("image-file", formObject[key]);
        } else {
          formDataObj.append(key, formObject[key]);
        }
      });

      updateBusiness(formDataObj);
    }
  };

  const onSelectedRow = (item) => {
    setSelectedRow({
      ...item,
      bankAccountNumber: item["bank-account-number"],
      bankAccountName: item["bank-account-name"],
      bankName: item["bank-name"],
    });
    setPreviewUrl(item?.url);
    setInitialFormValue({
      name: item?.name,
      bankAccountName: item.bankAccountName,
      bankAccountNumber: item.bankAccountNumber,
      bankName: item.bankName,
      image: item.url,
    });
  };

  const onValueChange = (e) => {
    setInitialFormValue({
      ...initialFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const formParams = [
    {
      label: "Name",
      placeholder: "Enter business name...",
      name: "name",
      value: initialFormValue?.name || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bank Account Name",
      placeholder: "Enter Bank Account Name...",
      name: "bank-account-name",
      value: initialFormValue?.bankAccountName || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bank Account Number",
      placeholder: "Enter Bank Account Number...",
      name: "bank-account-number",
      value: initialFormValue?.bankAccountNumber || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bank Name",
      placeholder: "Enter Bank Name...",
      name: "bank-name",
      value: initialFormValue?.bankName || "",
      onChange: onValueChange,
      type: "text",
    },
  ];

  const processForm = async (data) => {
    console.log(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== "") {
      setFilters({ ...filters, [name]: value });
    } else {
      setFilters({ ...filters, [name]: null });
    }
  };

  const handleFilterAction = () => {
    const filteredParam = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== null)
    );
    console.log(currentSearchParam);
    const dataPost = { ...filteredParam, "page-number": 1 };

    router.push(`/user?${new URLSearchParams(dataPost)}`);
  };

  return (
    <div>
      <div>
        <FilterTab
          filter={filters}
          handleChange={handleChange}
          handleFilterAction={handleFilterAction}
          disabled={error?.message || null}
        />
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          {cols.map((item) => (
            <TableColumn isHeader key={item?.key}>
              <h5 className="font-bold text-black ">{item.name}</h5>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading ? "No rows to display." : <TableSkeleton />}
        >
          {data?.value?.data.map((item) => (
            <TableRow
              className="hover:cursor-pointer hover:bg-gray-100"
              key={item?.id}
              onClick={() => onSelectedRow(item)}
            >
              <TableCell key={item?.id + cols[0].name}>
                <User
                  name={item?.name}
                  avatarProps={{
                    src: item?.url,
                  }}
                  description={item?.email}
                />
              </TableCell>
              <TableCell key={item?.id + cols[1].name}>
                {item["bank-account-number"]}
              </TableCell>

              <TableCell key={item?.id + cols[2].name}>
                {item["bank-account-name"]}
              </TableCell>
              <TableCell key={item?.id + cols[3].name}>
                {item["bank-name"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRow && (
        <Modal
          placement="top"
          isOpen={selectedRow}
          onClose={onClose}
          scrollBehavior="inside"
          className="h-[calc(100vh-8.5rem)] scrollbar-custom overflow-y-scroll"
          classNames={{
            wrapper: "justify-end",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <div className="flex items-center justify-between w-full pr-[15px]">
                    Business Details
                    <Button
                      className="bg-btn text-btn-text"
                      type="submit"
                      color="primary"
                      auto
                      onPress={handleDelete}
                    >
                      <MdDelete size={36} />
                    </Button>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <label className="w-full h-[300px] border-gray-400 border rounded-3xl flex justify-center items-center cursor-pointer relative ">
                    <div className="relative h-[300px] w-full overflow-hidden ">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full hover:scale-110 transition-all duration-400 object-cover"
                      />
                    </div>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      disabled={isDisabled}
                    />
                  </label>

                  {formParams.map((param) => (
                    <Input
                      key={param.name}
                      variant={isDisabled ? "flat" : "bordered"}
                      label={param.label}
                      placeholder={param.placeholder}
                      name={param.name}
                      value={formData[param.name]}
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  ))}
                </ModalBody>
                <ModalFooter className="flex flex-row justify-between">
                  <div className="flex items-center justify-between w-full">
                    <Button
                      className="w-2/5"
                      type="button"
                      color="default"
                      auto
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <div className="flex items-center space-x-2.5 ">
                      <Button
                        className="px-0 bg-transparent"
                        size="sm"
                        color={isDisabled}
                        auto
                        onPress={toggleDisabled}
                      >
                        <MdEdit color={isDisabled} />
                      </Button>
                      <Button
                        className="bg-btn text-btn-text"
                        type="submit"
                        color="primary"
                        auto
                        onPress={handleUpdate}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {error?.message && (
        <Toast message={error.message} open={true} severity={"error"} />
      )}
    </div>
  );
};

export default TableData;
